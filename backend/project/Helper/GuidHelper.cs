public static class GuidHelper
{
    public static Guid ParseOrThrow(string input, string? paramName = null)
    {
        if (!Guid.TryParse(input, out var guid))
        {
            throw new ArgumentException($"Invalid GUID format for {paramName ?? "parameter"}.");
        }
        return guid;
    }
}
