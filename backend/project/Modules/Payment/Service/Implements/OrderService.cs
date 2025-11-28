using System;
using project.Models;
using project.Modules.Payment.DTOs;
using project.Modules.Payment.Repositories.Interfaces;
using project.Modules.Payment.Service.Interfaces;

namespace project.Modules.Payment.Service.Implements;

public class OrderService : IOrderService
{
    private readonly IOrderRepository _orderRepo;
    private readonly ICourseRepository _courseRepo;

     public OrderService(IOrderRepository orderRepo, ICourseRepository courseRepo)
    {
        _orderRepo = orderRepo;
        _courseRepo = courseRepo;
    }

      public async Task<OrderResponseDto> CreateOrderAsync(OrderCreateDto dto, string studentId)
    {
        if (dto.OrderDetails == null || !dto.OrderDetails.Any())
            throw new Exception("Order must have at least one course.");

        var order = new Orders
        {
            StudentId = studentId,
            Status = "pending",
            TotalPrice = 0
        };

        foreach (var detail in dto.OrderDetails)
        {
            var course = await _courseRepo.GetCourseByIdAsync(detail.CourseId); // Course.Id
            if (course == null)
                throw new Exception($"Course {detail.CourseId} does not exist or is not published.");

            // Tính giá sau giảm: DiscountPrice là % giảm
            decimal priceToUse = course.Price;
            if (course.DiscountPrice.HasValue && course.DiscountPrice.Value > 0)
            {
                priceToUse = course.Price * (1 - course.DiscountPrice.Value / 100m);
            }

            order.OrderDetails.Add(new OrderDetail
            {
                CourseId = course.Id,
                Price = priceToUse
            });

            order.TotalPrice += priceToUse;
        }

        await _orderRepo.AddAsync(order);
        await _orderRepo.SaveChangesAsync();

        return new OrderResponseDto
        {
            OrderId = order.Id,
            TotalPrice = order.TotalPrice,
            Status = order.Status,
            CreatedAt = order.CreatedAt
        };
    }
   

}

