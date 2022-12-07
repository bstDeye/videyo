using Example.Api.Abstractions.Assemblers;
using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Core.Assemblers
{
	public class UserAssembler : BaseAssembler<User, UserEntity>
	{
		public override User Convert(UserEntity obj)
		{
			return new User
			{
				Id = obj.Id.AsGuid(),
				LikedVideos = obj.LikedVideos,
				Username = obj.Username,
				Password = obj.Password,
				PlaylistIds = obj.PlaylistIds,
				SentComments = obj.SentComments
			};
		}

		public override UserEntity Convert(User obj)
		{
			return new UserEntity
			{
				Id = obj.Id.AsObjectId(),
				LikedVideos = obj.LikedVideos,
				Username = obj.Username,
				Password = obj.Password,
				PlaylistIds = obj.PlaylistIds,
				SentComments = obj.SentComments
			};
		}
	}
}