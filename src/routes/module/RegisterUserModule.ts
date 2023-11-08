import { RegisterUserService } from "../../service";
import { RegisterUserController } from "../../controller";

export const registerUserModule = (): RegisterUserController => {
    const service = new RegisterUserService();
    return new RegisterUserController(service);
}