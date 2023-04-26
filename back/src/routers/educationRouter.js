import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { User, Education } from "../db";
import { EducationModel } from "../db/schemas/education";

const educationRouter = Router();
educationRouter.use(login_required);
educationRouter.post("/", async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    console.log(req.body);

    res.send("200");
    console.log(user_id);
  } catch (error) {
    next(error);
  }
});

educationRouter.post("/list", async function (req, res, next) {
  try {
  } catch (e) {
    next(e);
  }
});
educationRouter.post(
  "/create",
  login_required,
  async function (req, res, next) {
    try {
      const { institution, major, degree, period, startDate, endDate, final } =
        req.body;
      const user_id = req.currentUserId;
      const user = User.findById({ user_id });
      user.then((user) => {
        if (!user) {
          console.log("일치하는 유저가 없습니다.");
          res.send("일치하는 유저가 없습니다.");
        }
        const userobj = user._id;
        const education = new EducationModel({
          user: user._id,
          institution: institution,
          major: major,
          degree: degree,
          period: period,
          startDate: startDate,
          endDate: endDate,
        });
        console.log(education);

        const created = education.save();
        if (!created) {
          console.log("데이터베이스 입력에 실패했습니다.");
          res.send("데이터베이스 입력에 실패했습니다.");
          return;
        }
        res.send("데이터베이스 입력에 성공했습니다.");
      });
    } catch (error) {
      next(error);
    }
  }
);

export { educationRouter };
