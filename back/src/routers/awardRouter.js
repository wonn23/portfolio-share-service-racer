import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import { User, Award } from "../db";
import { AwardService } from "../services/awardService";
import { AwardModel } from "../db/schemas/award";
import { validationParams } from "../utils/parameterValidator";

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

    const { title, description } = req.body;

    const user_id = req.currentUserId;
    const user = User.findById({ user_id });
    user.then((user) => {
      if (!user) {
        console.log("일치하는 유저가 없습니다.");
        res.status(404).send({ message: "일치하는 유저가 없습니다." });
        return;
      }
      const award = new AwardModel({
        user: user._id,
        title: title,
        description: description,
      });
      const created = education.save();
      if (!created) {
        console.log("데이터베이스 입력에 실패했습니다.");
        res.status(404).json({ message: "데이터베이스 입력에 실패했습니다." });
        return;
      }
      console.log("데이터베이스 입력에 성공했습니다.");
      res.status(200).json({ message: "데이터베이스 입력 되었습니다." });
    });
  } catch (error) {
    next(error);
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

awardRouter.put("/awards/:id", async function (req, res, next) {
  try {
    // URI로부터 수상 데이터 id를 추출함.
    const awardId = req.params.id;

    // body data 로부터 업데이트할 수상 정보를 추출함.
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;

    const toUpdate = { title, description };

    // 위 추출된 정보를 이용하여 db의 데이터 수정하기
    const award = await AwardService.setAward({ awardId, toUpdate });

    if (award.errorMessage) {
      throw new Error(award.errorMessage);
    }

    res.status(200).send(award);
  } catch (error) {
    next(error);
  }
});

awardRouter.delete("/awards/:id", async function (req, res, next) {
  try {
    // req (request) 에서 id 가져오기
    const awardId = req.params.id;

    // 위 id를 이용하여 db에서 데이터 삭제하기
    const result = await AwardService.deleteAward({ awardId });

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

awardRouter.get("/awardlist/:userId", async function (req, res, next) {
  try {
    // 특정 사용자의 전체 수상 목록을 얻음
    // @ts-ignore
    const userId = req.params.userId;
    const awardList = await AwardService.getAwardList({ userId });
    res.status(200).send(awardList);
  } catch (error) {
    next(error);
  }
});

export { awardRouter };
