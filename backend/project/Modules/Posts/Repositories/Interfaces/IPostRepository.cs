using System;
using project.Models.Posts;


public interface IPostRepository
{

    // Lấy danh sách bài đăng của thành viên

    Task<IEnumerable<Post>> GetPostsByStudentIdAsync(string studentId);
    
    
}
