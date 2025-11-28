using System;
using Microsoft.EntityFrameworkCore;
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

    public async Task<Payment?> GetByIdAsync(string id)
    {
        return await _context.Payments
            .Include(p => p.Order)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
