using Videyo.Api.Abstractions.Assemblers;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports.Playlist;

namespace Videyo.Api.Core.Assemblers;

public class PlaylistAssembler : BaseAssembler<Playlist, PlaylistEntity>
{
	public override Playlist Convert(PlaylistEntity obj)
	{
		return new Playlist
		{
			Id = obj.Id.AsGuid(),
			Label = obj.Label,
			User = obj.User,
			IdVideos = obj.IdVideos,
			Type = obj.Type
		};
	}

	public override PlaylistEntity Convert(Playlist obj)
	{
		return new PlaylistEntity
		{
			Id = obj.Id.AsObjectId(),
			Label = obj.Label,
			User = obj.User,
			IdVideos = obj.IdVideos,
			Type = obj.Type,
		};
	}
}