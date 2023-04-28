import { login_required } from "../middlewares/login_required";
import { Router } from "express";
import { User } from "../db";
import { EducationModel } from "../db/schemas/education";
import { Education } from "../db/models/Education";
import { EducationModel } from "../db/schemas/education";
import { educationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(login_required);

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
      const finded = EducationModel.find({ user: user_id });
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
 *      @param {institution, major, degree, period, startDate, endDate}
 */
educationRouter.post("/create", async function (req, res, next) {
  try {
    const { institution, major, degree, startDate, endDate } = req.body;
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
        startDate: startDate,
        endDate: endDate,
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
educationRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { fieldToUpdate, newValue } = req.body;
  try {
    // Call the update method of the Education model
    const updatedEducation = await Education.update({
      user_id: id,
      fieldToUpdate,
      newValue,
    });

    res.status(200).json(updatedEducation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    next(error);
  }
});

educationRouter.delete("/:_id/", login_required, async function (req, res, next) {
  const educationId = req.params._id;
  try {
    const result = await educationService.deleteEducation({ educationId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { educationRouter };
