using System;
using project.Models;



public class PaymentRepository : IPaymentRepository
{
      private readonly DBContext _context;

    public PaymentRepository(DBContext context)
    {
        _context = context;
    }

    public async Task<Payment> AddAsync(Payment payment)
    {
        await _context.Payments.AddAsync(payment);
        return payment;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
