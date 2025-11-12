public static class GuidHelper
{
    public static Guid ParseOrThrow(string input, string? paramName = null)
    {
        Console.WriteLine($"[DEBUG] Parsing '{input}'");

        if (string.IsNullOrWhiteSpace(input))
            throw new ArgumentException($"{paramName ?? "Parameter"} cannot be null or empty.");

        input = input.Trim();

        if (!Guid.TryParse(input, out var guid))
            throw new ArgumentException($"Invalid GUID format for {paramName ?? "parameter"}: '{input}'");

        return guid;
    }
}
