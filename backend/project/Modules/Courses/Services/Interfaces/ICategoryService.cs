public interface ICategoryService
{
    Task<IEnumerable<Category>> GetAllCategoriesAsync();
    Task<Category?> GetCategoryByIdAsync(string id);
    // Task AddCategoryAsync(Category category);
    // Task UpdateCategoryAsync(Category category);
    // Task DeleteCategoryAsync(int id);
}