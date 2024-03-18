using System.Text.Json;
using System.Text.Json.Serialization;

namespace MatrixScrabble.Server.Helpers;

public class JsonSerializerHelper : IJsonSerializerHelper
{
	private readonly JsonSerializerOptions _options;

	public JsonSerializerHelper()
	{
		_options = new JsonSerializerOptions
		{
			UnmappedMemberHandling = JsonUnmappedMemberHandling.Disallow,
			PropertyNameCaseInsensitive = true
		};
	}

	public bool TryDeserialize<T>(string json, out T? result)
	{
		if (string.IsNullOrWhiteSpace(json))
			throw new ArgumentException($"'{nameof(json)}' cannot be null or whitespace.", nameof(json));

		try
		{
			result = JsonSerializer.Deserialize<T>(json, _options);

			return true;
		}
		catch (JsonException)
		{
			result = default;
			return false;
		}
	}
}
