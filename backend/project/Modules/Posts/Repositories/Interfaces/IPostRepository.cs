using System;
using project.Models.Posts;


public interface IPostRepository
{



    // Lấy danh sách tất cả bài đăng 
    Task<IEnumerable<Post>> GetAllPostsAsync();

    // Lấy danh sách bài đăng của 1 thành viên
    Task<IEnumerable<Post>> GetPostsByMemberIdAsync(string memberId);

    // Lấy chi tiết bài viết 
    Task<Post?> GetPostByIdAsync(string id);

    // Tìm kiếm bài viết theo tag

    Task<IEnumerable<Post>> SearchPostsByTagAsync(string tag);


    // Thêm bài post
    Task<Post> AddPostAsync(Post post);

    // Xóa mềm post

    Task<bool> SoftDeletePostAsync(string postId);





     
    
    
}
