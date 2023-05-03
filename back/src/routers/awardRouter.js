import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import {validationParams} from "../utils/parameterValidator";

import { AwardModel } from "../db/schemas/award";
import { awardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(tokenValidator);

awardRouter.post("/create", async function (req, res, next) {
    try {
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const {title, description, institution, awarddate} = req.body;
        const userid = req.currentUserId;

        const newAward = new AwardModel({
            user: userid,
            title:title,
            institution:institution,
            description:description,
            awarddate: awarddate
        });

        const added = await awardService.addAward({newAward});
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

awardRouter.post("/list",
    async function (req, res, next) {
       try{
            const userid = req.currentUserId;
            const certificate = await awardService.getAwardList({userid});
            if(!certificate){
                res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
            }
            res.status(200).json(certificate);
    } catch (e) {
        next(e);
    }
});


awardRouter.post("/update",
    async function (req, res, next) {
    try{
        const { awardid, title, description, institution, awarddate } = req.body;
        let date = new Date(awarddate)
        if(!date){
             date = new Date('2000-01-01')
        }
        const toUpdate = { awardid,title, description, institution, date };

        const award = await awardService.setAward({ awardid, toUpdate });
        if(award.errorMessage){
            res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
            return;
        }
        res.status(200).json(award);
    }catch (e){
        console.log(e);
        res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
    }
});

awardRouter.post("/delete",
    async function (req, res, next) {
        try {
            const params = Object.values(req.body);
            if(!validationParams(params))
            {
                console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
                res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
                return;
            }
            const { awardid } = req.body;
            const deleted=await awardService.deleteAward({ awardid })
            if (deleted.errorMessage){
                res.status(404).json({message:"게시글을 찾을 수 없습니다."})
            }
            res.status(200).json(deleted);
        }catch (e){
            next(e);
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
