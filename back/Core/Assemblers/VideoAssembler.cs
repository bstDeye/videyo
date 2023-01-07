using Videyo.Api.Abstractions.Assemblers;
using Videyo.Api.Abstractions.Extensions;
using Videyo.Api.Abstractions.Models;
using Videyo.Api.Abstractions.Transports;

namespace Videyo.Api.Core.Assemblers;

public class VideoAssembler : BaseAssembler<Video, VideoEntity>
{
    public override Video Convert(VideoEntity obj)
    {
        return new Video
        {
            Id = obj.Id.AsGuid(),
            Label = obj.Label,
            User = obj.User,
            Origin = obj.Origin,
            Comments = obj.Comments,
            NbLikes = obj.NbLikes,
        };
    }

    public override VideoEntity Convert(Video obj)
    {
        return new VideoEntity
        {
            Id = obj.Id.AsObjectId(),
            Label = obj.Label,
            User = obj.User,
            Origin = obj.Origin,
            Comments = obj.Comments,
            NbLikes = obj.NbLikes,
        };
    }
}