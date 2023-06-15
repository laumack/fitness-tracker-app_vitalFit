import express, { Express } from "express";
import apiRouter from "./routes/api.router";
import cors from "cors";
import { customErr, errLog } from "./error-handler";

const app: Express = express();
app.use(express.json());
app.use(cors());

app.use("/api", apiRouter);

app.use(customErr);
app.use(errLog);

export default app;
