import { LoginService } from "../../service";
import { LoginController } from "../../controller";

export const loginModule = (): LoginController => {
    const service = new LoginService();
    return new LoginController(service);
}