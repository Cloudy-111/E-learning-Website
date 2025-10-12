public class CategoryService : ICategoryService
{
    private readonly ICategoryRepository _categoryRepository;

    public CategoryService(ICategoryRepository categoryRepository)
    {
        _categoryRepository = categoryRepository;
    }

    public async Task<IEnumerable<Category>> GetAllCategoriesAsync()
    {
        return await _categoryRepository.GetAllCategoriesAsync();
    }

    public async Task<Category?> GetCategoryByIdAsync(string id)
    {
        var category = await _categoryRepository.GetCategoryByIdAsync(id) ?? throw new KeyNotFoundException($"Category with id {id} not found.");
        return category;
    }

    // public async Task AddCategoryAsync(Category category)
    // {
    //     await _categoryRepository.AddCategoryAsync(category);
    // }

    // public async Task UpdateCategoryAsync(Category category)
    // {
    //     await _categoryRepository.UpdateCategoryAsync(category);
    // }

    // public async Task DeleteCategoryAsync(int id)
    // {
    //     await _categoryRepository.DeleteCategoryAsync(id);
    // }
}