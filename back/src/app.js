import cors from "cors";
import express from "express";
import { awardRouter } from "./routers/awardRouter";
// import { cerificateRouter } from "./routers/certificateRouter";
// import { educationRouter } from "./routers/educationRouter";
// import { projectRouter } from "./routers/projectRouter";
import { userAuthRouter } from "./routers/userRouter";


import { ErrorHandler } from "./middlewares/errorHandler";
import { tokenValidator } from "./middlewares/tokenValidator";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(userAuthRouter);

// app.get("/education");
// app.use("/education", educationRouter);

app.get("/award")
app.use("/award", awardRouter);

// app.get("/certificate")
// app.use("/certificate", cerificateRouter);
//
// app.get("/project")
// app.use("/certificate", projectRouter);


app.use(ErrorHandler);

export { app };
