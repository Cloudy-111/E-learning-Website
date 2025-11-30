using System;
using project.Modules.Payments.DTOs;
using project.Modules.Payments.Service.Interfaces;
using QRCoder;

namespace project.Modules.Payments.Service.Implements;

public class PaymentService : IPaymentService
{
    private readonly IPaymentRepository _paymentRepo;
    private readonly DBContext _dbContext;

    public PaymentService(IPaymentRepository paymentRepo,  DBContext dbContext)
    {
        _paymentRepo = paymentRepo;
        _dbContext = dbContext;
    }

    public async Task<PaymentQrDto> GeneratePaymentQrAsync(string paymentId, string studentId)
    {
        var payment = await _paymentRepo.GetByIdAsync(paymentId);
        if (payment == null)
            throw new Exception("Payment not found.");

        if (payment.Order.StudentId != studentId)
            throw new Exception("You are not allowed to access this payment.");

        // Tạo QR duy nhất bằng cách thêm timestamp/nonce
        var nonce = Guid.NewGuid().ToString(); // mỗi lần gọi khác nhau
        string paymentUrl = $"https://your-payment-gateway.com/pay?transactionId={payment.TransactionId}&amount={payment.Amount}&nonce={nonce}";

        using var qrGenerator = new QRCoder.QRCodeGenerator();
        using var qrData = qrGenerator.CreateQrCode(paymentUrl, QRCoder.QRCodeGenerator.ECCLevel.Q);
        using var qrCode = new QRCoder.QRCode(qrData);
        using var bitmap = qrCode.GetGraphic(20);
        using var ms = new MemoryStream();
        bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Png);
        string qrBase64 = Convert.ToBase64String(ms.ToArray());

        return new PaymentQrDto
        {
            PaymentId = payment.Id,
            TransactionId = payment.TransactionId,
            OrderId = payment.OrderId,
            Amount = payment.Amount,
            Status = payment.Order.Status,
            CreatedAt = payment.CreatedAt,
            QrCode = $"data:image/png;base64,{qrBase64}"
        };
    }

      // 2Xử lý webhook callback từ cổng thanh toán
    public async Task<bool> HandleWebhookAsync(PaymentWebhookDto dto)
    {
        using var transaction = await _dbContext.Database.BeginTransactionAsync();
        try
        {
            var payment = await _paymentRepo.GetByTransactionIdAsync(dto.TransactionId);
            if (payment == null)
                throw new Exception("Payment not found.");

            if (dto.Status != "success")
                throw new Exception("Payment not successful.");

            var order = payment.Order;
            if (order.Status == "paid")
                return true; // đã thanh toán rồi

            // Cập nhật order
            order.Status = "paid";
            order.UpdatedAt = DateTime.UtcNow;
            _dbContext.Orders.Update(order);

            // Cập nhật payment UpdatedAt
            payment.UpdatedAt = DateTime.UtcNow;
            _dbContext.Payments.Update(payment);

            await _dbContext.SaveChangesAsync();
            await transaction.CommitAsync();

            return true;
        }
        catch
        {
            await transaction.RollbackAsync();
            throw;
        }
    }
   

}
