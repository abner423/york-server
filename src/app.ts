require('dotenv/config');
require('express-async-errors');

import express from 'express';
import { routes } from './routes/routes';
import { Event, Level, User, UserEvent, UserLevel, UserLevelSignup } from './db/model'
import errorHandler from './config/ErroHandler';
import expressPinoLogger from "express-pino-logger";
import { logger } from './config/AppLogger';
import bcrypt from "bcrypt";
import { AppUtils } from './utils/AppUtils';
import Schedule from './db/model/Schedule';

class App {

    public server: express.Application;
    isDev = process.env.NODE_ENV === 'development'

    constructor() {
        this.server = express();
        this.server.use(expressPinoLogger({ logger: logger }));
        this.middlewares();
        this.routes();
        this.server.use(errorHandler);
        this.init()
    }

    async init() {
        await this.dbInit();
        await this.populateLevel();
        await this.populateAdminUsersIfNotExists();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }

    async dbInit() {
        logger.info("Creating database ...")

        await Event.sync({ alter: this.isDev });
        await Level.sync({ alter: this.isDev });
        await User.sync({ alter: this.isDev });
        await UserEvent.sync({ alter: this.isDev });
        await UserLevel.sync({ alter: this.isDev });
        await UserLevelSignup.sync({ alter: this.isDev });
        await Schedule.sync({ alter: this.isDev });

        logger.info("Database initialized !")
    }

    async populateLevel() {
        const level = await Level.findOne();
        if (!level) {
            logger.info("Populating Levels")
            await Level.create({
                name: "Signup Gift"
            })
            await Level.create({
                name: "Level 1"
            })
            await Level.create({
                name: "Level 2"
            })
            await Level.create({
                name: "Level 3"
            })
            await Level.create({
                name: "Level 4"
            })
            logger.info("Levels inserted")
        }
    }

    async populateAdminUsersIfNotExists() {
        const existsAdminInserted = await User.findOne({ where: { isAdmin: true } });

        if (!existsAdminInserted) {
            logger.info("Inserting admin users ...");

            const defaultPassword = "york@123";

            let userAdmin01 = {
                fullName: "Admin User 01",
                phone: "",
                password: defaultPassword,
                affiliation: "",
                email: "admin01@email.com",
            }

            let userAdmin02 = {
                fullName: "Admin User 02",
                phone: "",
                password: defaultPassword,
                affiliation: "",
                email: "admin02@email.com"
            }

            await this.saveAdminUserWithPasswordHash(userAdmin01);
            await this.saveAdminUserWithPasswordHash(userAdmin02);

            logger.info("Admin users inserted...");
        }
    }

    private async saveAdminUserWithPasswordHash(user: any) {
        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));

        await bcrypt
            .hash(user.password, salt)
            .then(async (passwordHashed) => {
                await User.create({
                    id: AppUtils.generateRandomId(),
                    fullName: user.fullName,
                    phone: user.phone,
                    password: passwordHashed,
                    affiliation: user.affiliation,
                    email: user.email,
                    isAdmin: true
                });
            })
            .catch(_err => {
                logger.error("Error to save admin user")
            });
    }
}

export default new App().server;