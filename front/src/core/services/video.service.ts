import {inject, injectable} from "inversify";
import {BackendApi} from "../apis/backend";

@injectable()
export class VideoService {
    @inject(BackendApi)
    private backendApiClient!: BackendApi;


    async getVideos(idUser: string) {
        return await this.backendApiClient
    }
}