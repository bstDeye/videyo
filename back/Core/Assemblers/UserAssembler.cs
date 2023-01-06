using Videyo.Api.Abstractions.Assemblers;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Core.Assemblers;

public class UserAssembler : BaseAssembler<User, UserEntity>
{
	public override User Convert(UserEntity obj)
	{
		return new User
		{
			Id = obj.Id.AsGuid(),
			Username = obj.Username,
			Playlists = obj.Playlists,
		};
	}

	public override UserEntity Convert(User obj)
	{
		return new UserEntity
		{
			Id = obj.Id.AsObjectId(),
			Username = obj.Username,
			Playlists = obj.Playlists,
		};
	}
}