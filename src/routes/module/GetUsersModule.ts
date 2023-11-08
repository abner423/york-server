import { GetUsersController } from "../../controller";
import { GetUsersService } from "../../service";

export const getUsersModule = (): GetUsersController => {
    const service = new GetUsersService();
    return new GetUsersController(service);
}