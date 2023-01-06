import {inject, injectable} from "inversify";
import {BackendApi} from "../apis/backend";
import { User, VideoBase } from "../apis/backend/generated";

@injectable()
export class VideoService {
    @inject(BackendApi)
    private backendApiClient!: BackendApi;


    async add (idUser: User["id"], video: VideoBase) {
        await this.backendApiClient.video.addVideo(video, idUser);
    }
}