import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import notFound from './app/middlewares/notFound';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
// import { router } from './app/routes';


const app: Application = express();
app.use(cors({
    origin: config.API_BASE_URL,
    credentials: true
}));

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use("/api/v1", router);

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: "Welcome to health care!",
        today: new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }),

    })
});

// Global Error Handler
app.use(globalErrorHandler);
// No Found Route
app.use(notFound);

export default app;