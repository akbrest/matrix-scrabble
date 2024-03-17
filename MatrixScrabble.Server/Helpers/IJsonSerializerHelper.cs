namespace MatrixScrabble.Server.Helpers;

public interface IJsonSerializerHelper
{
	bool TryDeserialize<T>(string json, out T? result);
}
