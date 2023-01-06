import { AuthenticationService } from "../../services/common/auth/authentication.service";
import { ThemeService } from "../../services/common/theme.service";
import { LocalStorageService } from "../../services/common/localStorage.service";
import { DiKeysService } from "./di.keys.service";
import { TodoService } from "../../services/todo.service";
import { Container } from "inversify";
import { TokenService } from "../../services/common/auth/token.service";
import { VideoService } from "../../services/video.service";
import { UserService } from "../../services/user.service";

export const addServices = (container: Container) => {
	container.bind(AuthenticationService).toSelf();
	container.bind(TokenService).toSelf();
	container.bind(TodoService).toSelf();
	container.bind(ThemeService).toSelf();
	container.bind(VideoService).toSelf();
	container.bind(UserService).toSelf();
	container.bind<LocalStorageService>(DiKeysService.localStorage.jwt).toConstantValue(new LocalStorageService("authentication:jwt"));
};
