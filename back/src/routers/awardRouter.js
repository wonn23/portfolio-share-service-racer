import { Router } from "express";
import { User } from "../db";
import { tokenValidator } from "../middlewares/tokenValidator";
import { validationParams } from "../utils/parameterValidator";

import { userAuthService } from "../services/userService";
import { AwardModel } from "../db/schemas/award";
import { AwardService } from "../services/awardService";

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
    const { title, description } = req.body; // userId 오브젝트 아이디 아님
    const user_id = req.currentUserId;

    const user = await userAuthService.getUserInfo({ user_id });

    console.log(`user Service : ${user._id}`);
    const newAward = new AwardModel({
      userId: user._id,
      title: title,
      description: description,
    });

    const created = await AwardService.createAward({ newAward });

    if (!created) {
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
awardRouter.get("/", async function (req, res, next) {
  try {
    const userId = req.currentUserId;
    const awardList = await AwardService.getAward({ userId });
    if (awardList.errorMessage) {
      throw new Error(awardList.errorMessage);
    }
    return res.status(200).send(awardList);
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
 *      {_id,title,description}
 */

// award 수정
awardRouter.put("/:_id", async function (req, res, next) {
  try {
    const { _id } = req.params;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { userId, title, description } = req.body ?? null;

    if (!userId) {
      throw new Error("해당 유저 아이디가 없습니다. 다시 확인해 주세요.");
    }

    const toUpdate = { title, description };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updateAward = await AwardService.updateAward({
      _id,
      userId,
      toUpdate,
    });

    res.status(200).json(updateAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/:_id", tokenValidator, async function (req, res, next) {
  const _id = req.params._id;
  try {
    const result = await AwardService.deleteAward({ _id });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
