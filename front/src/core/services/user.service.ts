import {inject, injectable} from "inversify";
import {BackendApi} from "../apis/backend";
import { User, VideoBase } from "../apis/backend/generated";

@injectable()
export class UserService {
    @inject(BackendApi)
    private backendApiClient!: BackendApi;


    async add (username: User["username"]) {
        await this.backendApiClient.user.addUser(username);
    }

    async getUsers() {
        return this.backendApiClient.user.getUsers();
    }
}