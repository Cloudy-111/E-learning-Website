using System;
using project.Modules.Payments.DTOs;

namespace project.Modules.Payments.Service.Interfaces;

public interface IPaymentService
{
  Task<PaymentQrDto> GeneratePaymentQrAsync(string paymentId, string studentId);
  Task<bool> ConfirmPaymentAsync(string transactionId, string studentId);}
