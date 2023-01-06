import { inject, injectable } from "inversify";
import { PlaylistClient, UserClient, VideoClient } from "./generated";
import { TokenService } from "../../services/common/auth/token.service";
import axios from "axios";


@injectable()
export class BackendApi {
	public video: VideoClient;
	public user: UserClient;
	public playlist: PlaylistClient;

	constructor(@inject(TokenService) tokenService: TokenService) {
		const instance = axios.create({ withCredentials: true, transformResponse: [] });

		instance.interceptors.request.use((value) => {
			value.headers!["Authorization"] = `Bearer ${tokenService.getToken()}`;
			return value;
		});

		this.video = new VideoClient(window.config.endpoints.core, instance);
		this.user = new UserClient(window.config.endpoints.core, instance);
		this.playlist = new PlaylistClient(window.config.endpoints.core, instance);
	}
}
