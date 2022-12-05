namespace Example.Api.Web.Utils
{
	public class AuthUtility
	{
		public static readonly string UsernameField = "auth_username";

		public static readonly string TokenField = "auth_token";

		public static string GetUsername(HttpRequest request)
		{
			return request.Headers[UsernameField].First();
		}

		public static string GetToken(HttpRequest request)
		{
			return request.Headers[TokenField].First();
		}
	}
}