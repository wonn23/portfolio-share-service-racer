import { Router } from "express";
import { User, Award } from "../db";
import { tokenValidator } from "../middlewares/tokenValidator";
import { validationParams } from "../utils/parameterValidator";

import { userAuthService } from "../services/userService";
import { AwardService } from "../services/awardService";
import { AwardModel } from "../db/schemas/award";

const awardRouter = Router();
awardRouter.use(tokenValidator);

/**
 * @description
 *      로그인 세션을 체크하고
 *      세션id로 user를 찾은 후
 *      해당 유저의 Award 를 추가합니다.
 *
 * @param
 *      {title,description}
 */
awardRouter.post("/create", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }
    const { userId, title, description } = req.body; // userId 오브젝트 아이디 아님
    const user_id = req.currentUserId;

    const user = await userAuthService.getUserInfo({ user_id });

    console.log(`user Service : ${user._id}`);
    const newAward = new AwardModel({
      user: user._id,
      title: title,
      description: description,
    });

    const added = await AwardService.addAward({ newAward });

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

/**
 * @description
 *      /education/list 로  post 요청시
 *      특정 user의 모든 education 정보를
 *      Array 로 응답합니다.
 *
 * @param {email: "String"}
 */
awardRouter.post("/list", async function (req, res, next) {
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
      const finded = AwardModel.find({ user: u._id });
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
 *      로그인 세션을 체크하고
 *      세션id로 user를 찾은 후
 *      해당 유저의 Award 를 업데이트합니다.
 *
 * @param
 *      {id,title,description}
 */

awardRouter.post("/update", async function (req, res, next) {
  try {
    const params = Object.values(req.body);

    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }

    const { id, title, description } = req.body;

    const user_id = req.currentUserId;

    const award = Award.findById({ user_id });
    award.then((award) => {
      if (!award) {
        console.log("일치하는 수상이력이 없습니다.");
        res.status(404).send({ message: "일치하는 수상이력이 없습니다." });
        return;
      }
      const award_id = award._id;
      const toUpdate = new AwardModel(
        { award_id },
        { title: title, description: description }
      );

      const updated = toUpdate.updateOne();
      if (!updated) {
        console.log("업데이트 되었습니다.");
        res.status(404).json({ message: "업데이트 되었습니다." });
        return;
      }
      console.log("업데이트 되었습니다.");
      res.status(200).json(updated);
    });
  } catch (error) {
    next(error);
  }
});

// award 수정
awardRouter.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { fieldToUpdate, newValue } = req.body;
  try {
    // Call the update method of the Education model
    const updatedAward = await Award.update({
      user_id: id,
      fieldToUpdate,
      newValue,
    });

    res.status(200).json(updatedAward);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
    next(error);
  }
});

awardRouter.delete("/:_id", tokenValidator, async function (req, res, next) {
  const awardId = req.params._id;
  try {
    const result = await AwardService.deleteAward({ awardId });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
