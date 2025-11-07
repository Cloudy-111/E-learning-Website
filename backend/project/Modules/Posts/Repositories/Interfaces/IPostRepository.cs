using System;
using project.Models.Posts;


public interface IPostRepository
{



    // Lấy danh sách tất cả bài đăng 
    Task<IEnumerable<Post>> GetAllPostsAsync();

    // Lấy danh sách bài đăng của 1 thành viên ( bài công khai )
    Task<IEnumerable<Post>> GetPostsByMemberIdAsync(string memberId);

    // Lấy danh sách bài đăng của 1 thành viên ( do thành viên ấy tự xem )

    Task<IEnumerable<Post>> GetPostsByMemberPrivateIdAsync(string memberId);

    // Lấy chi tiết bài viết 
    Task<Post?> GetPostByIdAsync(string id);
    
    // Lấy chi tiết bài viết bao gồm cả đã xóa
    Task<Post?> GetAllPostByIdAsync(string id);

    // Tìm kiếm bài viết theo tag

    Task<IEnumerable<Post>> SearchPostsByTagAsync(string tag);


    // Thêm bài post
    Task<Post> AddPostAsync(Post post);


    // Câp nhật post
    Task UpdateAsync(Post post);
     
    // Xóa hẳn post
    Task RemoveAsync(Post post);





     
    
    
}
