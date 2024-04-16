import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';
// import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';

import helmet from 'helmet';

import { AppModule } from './app.module';
import { cleanEnv, port, str } from 'envalid';
import { CREDENTIALS, HOST, ORIGIN, PORT } from './app.config';
import { ErrorMiddleware } from './middlewares/error.middleware';

async function bootstrap() {
    try {
        validateEnv();
        const app = await NestFactory.create(AppModule, {
            cors: {
                origin: ORIGIN,
                credentials: CREDENTIALS,
            },
        });
        Logger.log(HOST, PORT);
        app.use(helmet());
        // app.use(cookieParser(APP_SECRET));
        app.use(compression());
        app.use(bodyParser.json({ limit: '50mb' }));
        app.use(
            bodyParser.urlencoded({
                limit: '50mb',
                extended: true,
                parameterLimit: 50000,
            }),
        );

        app.useGlobalPipes(new ValidationPipe());
        app.useGlobalFilters(new ErrorMiddleware());
    } catch (err) {
        Logger.error(`❌  Error starting server, ${err}`);
        process.exit();
    }

}

function validateEnv() {
    cleanEnv(process.env, {
        DATABASE_URL: str(),
        PORT: port(),
    });
}

bootstrap().catch((e) => {
    Logger.error(`❌  Error starting server, ${e}`);
    throw e;
});
