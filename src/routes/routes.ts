import { Router } from "express";
import { authAdmin, authUser } from "../config/auth";
import { claimPrizeModule, createEventModule, editEventModule, getUsersModule, loginModule, registerUserModule } from "./module";
import { getEventsModule } from "./module/GetEventsModule";
import { getSingleUserModule } from "./module/GetSingleUserModule";
import { registerPresenceModule } from "./module/RegisterPresenceModule";

const routes = Router();


routes.get('/events', authUser, getEventsModule().execute);
routes.get('/user', authUser, getSingleUserModule().execute);
routes.get('/users', authAdmin, getUsersModule().execute);

routes.post('/login', loginModule().execute);
routes.post('/signup', registerUserModule().execute);
routes.post('/events', authAdmin, createEventModule().execute);
routes.post('/claim', authAdmin, claimPrizeModule().execute);
routes.post('/presence', authAdmin, registerPresenceModule().execute);

routes.put('/events', authAdmin, editEventModule().execute)

export { routes };
