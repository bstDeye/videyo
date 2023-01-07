using System.IdentityModel.Tokens.Jwt;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using Videyo.Api.Abstractions.Interfaces.Services;
using Videyo.Api.Adapters.AuthenticationApi;

namespace Videyo.Api.Core.Services;

internal class AuthenticationService : IAuthenticationService
{
    private readonly IAuthenticationClient _authenticationApi;
    private readonly SecurityKey _publicKey;

    public AuthenticationService(IAuthenticationClient authenticationApi)
    {
        _authenticationApi = authenticationApi;
        _publicKey = GetPublicKey().Result;
    }


    public bool ValidateJwt(string? token, out JwtSecurityToken? validatedToken)
    {
        validatedToken = null;

        if (string.IsNullOrWhiteSpace(token))
            return false;


        token = token[("Bearer".Length + 1)..];

        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            tokenHandler.ValidateToken(token, new()
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = _publicKey,
                ValidateIssuer = false,
                ValidateAudience = false,
                ClockSkew = TimeSpan.Zero
            }, out var securityToken);

            validatedToken = (JwtSecurityToken?)securityToken;

            return true;
        }
        catch
        {
            return false;
        }
    }

    private async Task<SecurityKey> GetPublicKey()
    {
        var key = (await _authenticationApi.GetValidationKeyAsync()).Data;
        var rsa = RSA.Create();

        rsa.ImportFromPem(key);

        return new RsaSecurityKey(rsa);
    }
}