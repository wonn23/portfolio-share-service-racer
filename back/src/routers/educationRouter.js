import { login_required } from "../middlewares/login_required";
import { Router } from "express";
import { User } from "../db";
import { EducationModel } from "../db/schemas/education";

const educationRouter = Router();
educationRouter.use(login_required);

/**
 * @description
 *      응답 테스트 라우터입니다.
 */
educationRouter.post("/test", async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    console.log(req.body);

    res.status(200).json({ message: "" });
    console.log(user_id);
  } catch (error) {
    next(error);
  }
});

/**
 * @description
 *      /education/list 로  post 요청시
 *      특정 user의 모든 education 정보를
 *      Array 로 응답합니다.
 *
 * @param {email:"String"}
 */
educationRouter.post("/list", async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const { email } = req.body;
    if (!email) {
      res.status(404).json({ message: "파라미터를 확인해주세요" });
    }
    const user = User.findByEmail({ email });

    user.then((u) => {
      if (!u) {
        res.status(404).json({ message: "유저를 찾을수 없습니다." });
      }
      const finded = EducationModel.find({ user: u._id });
      finded.then((data) => {
        res.send(data);
      });
    });
  } catch (e) {
    next(e);
  }
});

/**
 * @description
 *      /education/create 로  post 요청시
 *      session에 등록된 user의 education 정보를 등록합니다.
 *
 *      @param {institution, major, degree, period, startDate, endDate, final}
 */
educationRouter.post("/create", async function (req, res, next) {
  try {
    const { institution, major, degree, period, startDate, endDate, final } =
      req.body;
    const user_id = req.currentUserId;
    const user = User.findById({ user_id });
    user.then((user) => {
      if (!user) {
        console.log("일치하는 유저가 없습니다.");
        res.status(404).send({ message: "일치하는 유저가 없습니다." });
      }
      const education = new EducationModel({
        user: user_id,
        institution: institution,
        major: major,
        degree: degree,
        period: period,
        startDate: startDate,
        endDate: endDate,
        final: final,
      });
      console.log(education);

      const created = education.save();
      if (!created) {
        console.log("데이터베이스 입력에 실패했습니다.");
        res.status(404).json({ message: "데이터베이스 입력에 실패했습니다." });
        return;
      }
      res.send("데이터베이스 입력에 성공했습니다.");
    });
  } catch (error) {
    next(error);
  }
});

// education 수정
educationRouter.patch(
  "/:user_id/edit",
  login_required,
  asyncHandler(async (req, res, next) => {
    const { user_id } = req.params;
    if (user_id != req.currentUserId) {
      throw new Error("수정할 수 있는 권한이 없습니다.");
    }
    const { institution, major, degree, period, startDate, endDate, final } =
      req.body;
    const education = {
      institution,
      major,
      degree,
      period,
      startDate,
      endDate,
      final,
    };
    const editEducation = await educationService.editEducation({ education });
    if (editEducation.errorMessage) {
      throw new Error(editEducation.errorMssage);
    }
    res.status(200).send(editEducation);
  })
);

export { educationRouter };
