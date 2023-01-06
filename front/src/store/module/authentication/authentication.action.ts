import { createActionBase } from "../../common/common.actions";
import { User } from "../../../core/apis/authentication/generated";

const createAction = createActionBase("authentication");

export const setUserFromToken = createAction<User>("setUserFromToken");
