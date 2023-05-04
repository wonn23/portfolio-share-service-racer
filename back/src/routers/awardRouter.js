import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import { validationParams } from "../utils/parameterValidator";

import { userAuthService } from "../services/userService";
import { AwardModel } from "../db/schemas/award";
import { awardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(tokenValidator);

// 해당 user의 award 추가
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
    const { association, contest, startDate, prize, detail } = req.body; // userId 오브젝트 아이디 아님
    const user_id = req.currentUserId;

    const user = await userAuthService.getUserInfo({ user_id });

    console.log(`user Service : ${user._id}`);
    const newAward = new AwardModel({
      userId: user._id,
      association: association,
      contest: contest,
      startDate: startDate,
      prize: prize,
      detail: detail,
    });

    const created = await awardService.createAward({ newAward });

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

// userId로 award 조회
awardRouter.get("/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const awardList = await awardService.getAward({ userId });
    if (awardList.errorMessage) {
      throw new Error(awardList.errorMessage);
    }
    return res.status(200).send(awardList);
  } catch (e) {
    next(e);
  }
});

// award 수정
awardRouter.put("/:_id", async function (req, res, next) {
  try {
    const { _id } = req.params;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { userId, association, contest, startDate, prize, detail } =
      req.body ?? null;

    if (!userId) {
      throw new Error("해당 유저 아이디가 없습니다. 다시 확인해 주세요.");
    }

    const toUpdate = { association, contest, startDate, prize, detail };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updateAward = await awardService.updateAward({
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
    const result = await awardService.deleteAward({ _id });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
