import cors from "cors";
import express from "express";
import { errorHandler } from "./middlewares/error.middleware.js";
import { apiRouter } from "./routes/index.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", apiRouter);

app.use(errorHandler);
