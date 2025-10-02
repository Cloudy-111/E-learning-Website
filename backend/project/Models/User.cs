using Microsoft.AspNetCore.Identity;

public class User : IdentityUser
{
    public string? Fullname { get; set; }
}