import { Container } from "inversify";
import { addApis } from "./apis/di.api";
import { addServices } from "./services/di.service";

export const container = new Container({ defaultScope: "Singleton" });


addApis(container);
addServices(container);