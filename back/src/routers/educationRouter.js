import { tokenValidator } from "../middlewares/tokenValidator";
import { Router } from "express";
import {validationParams} from "../utils/parameterValidator";
import {v4 as uuidv4} from "uuid";

import {User} from "../db";
import {EducationModel} from "../db/schemas/education";
import {userAuthService} from "../services/userService";
import {educationService} from "../services/educationService";

const educationRouter = Router();
educationRouter.use(tokenValidator);



educationRouter.post("/add", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if(!validationParams(params))
    {
      console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
      res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
      return;
    }
    const {school, major, status} = req.body;

    const user_id = req.currentUserId;
    const user = await userAuthService.getUserInfo({user_id});

    const eduId = uuidv4();

    console.log(`user Service : ${user._id}`);
    const education =
        new EducationModel({
          user: user._id,
          educationId:eduId,
          school:school,
          major:major,
          status:status
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


educationRouter.post("/update", async (req, res, next) => {
  try{
    const {educationId,school, major, status } = req.body;
    const toUpdate = { school, major, status };

    await educationService.setEducation({ educationId, toUpdate })
        .then((edu) => {
          if (edu.errorMessage) {
            res.status(404).json({message:"해당 정보를 찾을 수 없습니다."})
          }
          res.status(200).json(edu);
        });
  }catch (e){
    console.log(e);
    res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
  }
});

educationRouter.post("/delete", async (req, res, next) => {
  try{
    const params = Object.values(req.body);
    if(!validationParams(params))
    {
      console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
      res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
      return;
    }
    const { educationId } = req.body;

    await educationService.deleteEducation({ educationId })
        .then((edu) => {
          if (edu.errorMessage) {
            res.status(404).json({message:"유저를 찾을 수 없습니다."})
          }
          res.status(200).json(edu);
        });
  }catch (e){
    console.log(e);
  }
});


export { educationRouter };
