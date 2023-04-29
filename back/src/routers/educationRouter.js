import { tokenValidator } from "../middlewares/tokenValidator";
import { Router } from "express";
import {User} from "../db";
import { Education } from "../db/models/Education";
import {EducationModel} from "../db/schemas/education";
import {validationParams} from "../utils/parameterValidator";
import {userAuthService} from "../services/userService";
import {educationService} from "../services/educationService";

const educationRouter = Router();
educationRouter.use(tokenValidator);

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
 *      @param {institution, major, degree, period}
 */


educationRouter.post("/create", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if(!validationParams(params))
    {
      console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
      res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
      return;
    }
    const { userId,school, major, status} = req.body;
    const user_id = req.currentUserId;

    const user = await userAuthService.getUserInfo({user_id});

    console.log(`user Service : ${user._id}`);
    const education =
        new EducationModel({
          user: user._id,
          institution:school,
          major:major,
          degree:status
        });

    const added = await educationService.addEducation({education});

    if(!added){
      console.log('데이터베이스 입력에 실패했습니다.');
      res.status(404).json({message: '데이터베이스 입력에 실패했습니다.'});
      return;
    }
    console.log('데이터베이스 입력에 성공했습니다.');
    res.status(200).json({message:'데이터베이스 입력 되었습니다.'});

  } catch (error) {
    next(error);
  }
});

// education 수정
educationRouter.patch("/:id/edit", async (req, res, next) => {
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


educationRouter.post("/update", async (req, res, next) => {
  const params = Object.values(req.body);

  const { userId,school, major, status} = req.body;
  const user_id = req.currentUserId;

  const user = userAuthService.getUserInfo({ user_id });
  const toUpdate = { school, major, status };
  console.log(user._id);


});

export { educationRouter };


