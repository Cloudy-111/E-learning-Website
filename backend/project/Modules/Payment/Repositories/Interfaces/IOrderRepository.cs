using System;
using project.Models;

namespace project.Modules.Payment.Repositories.Interfaces;

public interface IOrderRepository
{
    Task<Orders?> GetByIdAsync(string id);
    Task<Orders> AddAsync(Orders order);
    Task SaveChangesAsync();
}
