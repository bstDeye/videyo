﻿using Example.Api.Abstractions.Models;
using Example.Api.Abstractions.Transports;

namespace Example.Api.Abstractions.Interfaces.Repositories
{
	public interface IPlaylistRepository
	{
		Task<PlaylistEntity> Add(PlaylistBase playlist);
		Task<List<PlaylistEntity>> GetAll();
	}
}