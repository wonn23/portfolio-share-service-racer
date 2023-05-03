import { tokenValidator } from "../middlewares/tokenValidator";
import { Router } from "express";
import {validationParams} from "../utils/parameterValidator";

import {EducationModel} from "../db/schemas/education";
import {educationService} from "../services/educationService";

const educationRouter = Router();
educationRouter.use(tokenValidator);

educationRouter.post("/create", async function (req, res, next) {
  try {
    const params = Object.values(req.body);
    if(!validationParams(params))
    {
      console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
      res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
      return;
    }
    const {school, major, status} = req.body;
    const userid = req.currentUserId;

    const newEducation =
        new EducationModel({
          user: userid,
          school:school,
          major:major,
          status:status
        });

    const added = await educationService.addEducation({newEducation});

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

// const userid = req.currentUserId;
// const certificate = await certificateService.getCertificateList({userid});
// if(!certificate){
//     res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
// }
// res.status(200).json(certificate);

educationRouter.post("/list", async function (req, res, next) {
  try {
    const userid = req.currentUserId;
    const education = await educationService.getEducation({userid});
    if(education.errorMessage){
      res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
    }
    res.status(200).json(education);
  } catch (e) {
    next(e);
  }
});

educationRouter.post("/update", async (req, res, next) => {
  try{
    const {educationid,school, major, status } = req.body;
    const toUpdate = { school, major, status };

    const education = await educationService.setEducation({ educationid, toUpdate });
    if(education.errorMessage)
    {
      res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
    }
    res.status(200).json(education);
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
    const { educationid } = req.body;

    if(!educationid){
      res.status(404).json({message:"유저를 찾을 수 없습니다."})
    }

    const deleted = await educationService.deleteEducation({ educationid })
    if (deleted.errorMessage) {
      res.status(404).json({message:"유저를 찾을 수 없습니다."})
    }
    res.status(200).json(deleted);
  }catch (e){
    console.log(e);
    res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
  }
});


export { educationRouter };


