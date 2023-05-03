import { Router } from "express";
import { Education, User } from "../db";
import { Education } from "../db/models/Education";
import { tokenValidator } from "../middlewares/tokenValidator";
import { Router } from "express";
import { validationParams } from "../utils/parameterValidator";
import { v4 as uuidv4 } from "uuid";

import { User } from "../db";
import { EducationModel } from "../db/schemas/education";
import { userAuthService } from "../services/userService";
import { educationService } from "../services/educationService";

const educationRouter = Router();
educationRouter.use(tokenValidator);

/**
 * @description
 *      /education/create 로  post 요청시
 *      session에 등록된 user의 education 정보를 등록합니다.
 *
 *
 *      @param {school, major, status}
 */
educationRouter.post("/create", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }
    const { school, major, status } = req.body;
    const user_id = req.currentUserId;

    const user = await userAuthService.getUserInfo({ user_id });

    console.log(`user Service : ${user._id}`);
    const education = new EducationModel({
      user: user._id,
      school: school,
      major: major,
      status: status,
    });

    const added = await educationService.createEducation({ education });

    if (!added) {
      console.log("데이터베이스 입력에 실패했습니다.");
      res.status(404).json({ message: "데이터베이스 입력에 실패했습니다." });
      return;
    }
    console.log("데이터베이스 입력에 성공했습니다.");
    res.status(200).json({ message: "데이터베이스 입력 되었습니다." });
  } catch (error) {
    next(error);
  }
});

educationRouter.post("/add", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }
    const { school, major, status } = req.body;

    const user_id = req.currentUserId;
    const user = await userAuthService.getUserInfo({ user_id });

    const eduId = uuidv4();

    console.log(`user Service : ${user._id}`);
    const education = new EducationModel({
      user: user._id,
      educationId: eduId,
      school: school,
      major: major,
      status: status,
    });

    const added = await educationService.addEducation({ education });

    if (!added) {
      console.log("데이터베이스 입력에 실패했습니다.");
      res.status(404).json({ message: "데이터베이스 입력에 실패했습니다." });
      return;
    }
    console.log("데이터베이스 입력에 성공했습니다.");
    res.status(200).json({ message: "데이터베이스 입력 되었습니다." });
  } catch (error) {
    next(error);
  }
});

educationRouter.post("/list", async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const user = User.findById({ user_id });

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

/*
 * @description
 *      /education/update 로 Post 요청시
 *      userid,school,major,status
 *      를 DB에 업데이트합니다.
 *
 *      @params
 *      {userId,school, major, status}
 */
educationRouter.patch("/:_id", async function (req, res, next) {
  try {
    const { _id } = req.params;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { user, school, major, status } = req.body ?? null;

    if (!user) {
      throw new Error("해당 유저 아이디가 없습니다. 다시 확인해 주세요.");
    }

    const toUpdate = { school, major, status };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updateEducation = await educationService.updateEducation({
      _id,
      user,
      toUpdate,
    });

    res.status(200).json(updateEducation);
  } catch (error) {
    next(error);
  }
});

educationRouter.delete(
  "/:_id",
  tokenValidator,
  async function (req, res, next) {
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
  }
);

export { educationRouter };
