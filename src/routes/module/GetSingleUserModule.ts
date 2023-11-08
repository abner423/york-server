import { GetSingleUserController } from "../../controller";
import { GetSingleUserService } from "../../service";

export const getSingleUserModule = (): GetSingleUserController => {
    const service = new GetSingleUserService();
    return new GetSingleUserController(service);
}