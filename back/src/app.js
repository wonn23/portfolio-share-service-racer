import cors from "cors";
import express from "express";

import { awardRouter } from "./routers/awardRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { projectRouter } from "./routers/projectRouter";
import { userAuthRouter } from "./routers/userRouter";

import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});
app.get("/education");

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use("/education", educationRouter);

app.get("/education");
app.use("/education", educationRouter);

app.get("/award");
app.use("/award", awardRouter);

app.get("/certificate");
app.use("/certificate", certificateRouter);

app.get("/project");
app.use("/project", projectRouter);

app.use(errorHandler);

export { app };
