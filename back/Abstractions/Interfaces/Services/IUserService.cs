using Videyo.Api.Abstractions.Transports;
using Videyo.Api.Abstractions.Transports.User;

namespace Videyo.Api.Abstractions.Interfaces.Services;

public interface IUserService
{
    Task<User> Add(string username);

    Task<List<User>> GetUsers();
}