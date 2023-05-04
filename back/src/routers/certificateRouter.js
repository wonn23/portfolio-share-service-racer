import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import { validationParams } from "../utils/parameterValidator";

import { userAuthService } from "../services/userService";
import { CertificateModel } from "../db/schemas/certificate";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(tokenValidator);

/**
 * @description
 *      로그인 세션을 체크하고
 *      세션id로 user를 찾은 후
 *      해당 유저의 Certificate 를 추가합니다.
 *
 * @param
 *      {title,description}
 */
certificateRouter.post("/create", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }
    const { agency, credit, grade, acquireDate } = req.body;

    const userId = req.currentUserId;
    console.log(`user Service : ${userId}`);

    const newCertificate = new CertificateModel({
      userId,
      agency,
      credit,
      grade,
      acquireDate,
    });

    const created = await certificateService.createCertificate({
      newCertificate,
    });

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
certificateRouter.get("/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const certificateList = await certificateService.getCertificate({ userId });
    if (certificateList.errorMessage) {
      throw new Error(certificateList.errorMessage);
    }
    return res.status(200).send(certificateList);
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
certificateRouter.put("/:_id", async function (req, res, next) {
  try {
    const { _id } = req.params;
    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const { userId, agency, credit, grade, acquireDate } = req.body ?? null;

    if (!userId) {
      throw new Error("해당 유저 아이디가 없습니다. 다시 확인해 주세요.");
    }

    const toUpdate = { agency, credit, grade, acquireDate };

    // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updateCertificate = await certificateService.updateCertificate({
      _id,
      userId,
      toUpdate,
    });

    res.status(200).json(updateCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.delete(
  "/:_id",
  tokenValidator,
  async function (req, res, next) {
    const _id = req.params._id;
    try {
      const result = await certificateService.deleteCertificate({ _id });
      if (result.errorMessage) {
        throw new Error(result.errorMessage);
      }
      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
);

export { certificateRouter };
