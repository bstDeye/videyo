using Example.Api.Abstractions.Assemblers;
using Example.Api.Abstractions.Extensions;
using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Core.Assemblers
{
	public class PlaylistAssembler : BaseAssembler<Playlist, PlaylistEntity>
	{
		public override Playlist Convert(PlaylistEntity obj)
		{
			return new Playlist
			{
				Id = obj.Id.AsGuid(),
				Label = obj.Label,
				User = obj.User,
				Type = obj.Type,
				IdVideos = obj.IdVideos
			};
		}

		public override PlaylistEntity Convert(Playlist obj)
		{
			return new PlaylistEntity
			{
				Id = obj.Id.AsObjectId(),
				Label = obj.Label,
				User = obj.User,
				Type = obj.Type,
				IdVideos = obj.IdVideos,
			};
		}
	}
}