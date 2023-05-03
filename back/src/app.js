import cors from "cors";
import express from "express";
import { awardRouter } from "./routers/awardRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { projectRouter } from "./routers/projectRouter";
import { userAuthRouter } from "./routers/userRouter";

import { ErrorHandler } from "./middlewares/errorHandler";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userAuthRouter);

app.get("/education");
app.use("/education", educationRouter);

app.get("/award")
app.use("/award", awardRouter);

app.get("/certificate")
app.use("/certificate", certificateRouter);

app.get("/project")
app.use("/project", projectRouter);


app.use(ErrorHandler);

export { app };
