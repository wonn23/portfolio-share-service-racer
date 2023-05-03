import is from "@sindresorhus/is";
import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import {certificateService as CertificateService, certificateService} from "../services/certificateService";
import {validationParams} from "../utils/parameterValidator";
import {CertificateModel} from "../db/schemas/certificate";

const certificateRouter = Router();
certificateRouter.use(tokenValidator);

certificateRouter.post("/create", async function (req, res, next) {
    try {
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const { institution, title, level, issuedate } = req.body;
        let userid = req.currentUserId;

        const newCertificate=new CertificateModel({
            user:userid,
            institution:institution,
            title:title,
            level:level,
            issuedate:issuedate
        })

        const Certificate = await certificateService.addCertificate({
            newCertificate
        });
        if(!Certificate){
            res.status(404).send({message:'데이터베이스 입력에 실패했습니다.'});
        }
        res.status(201).json(newCertificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.post("/list",async function (req, res, next) {
    try {
        const userid = req.currentUserId;
        const certificate = await certificateService.getCertificateList({userid});
        if(!certificate){
            res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
        }
        res.status(200).json(certificate);
    }catch (e){
        next(e)
    }
});

certificateRouter.post("/update",async function (req, res, next) {
    try {
        const { certificateid, institution, title, level, issuedate } = req.body;
        const toUpdate = { institution, title, level, issuedate };

        const certificate = await certificateService.setCertificate({ certificateid, toUpdate });
        if(!certificate){
            res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
        }
        res.status(200).json(certificate);
    }catch (e){
        next(e)
    }
});

certificateRouter.post("/delete",async function (req, res, next) {
    try {
        const userid = req.currentUserId;

        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const { certificateid } = req.body;
        const certificate = await certificateService.deleteCertificate({certificateid});
        if(!certificate){
            res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
        }
        res.status(200).json(certificate);
    }catch (e){
        next(e)
    }
});


certificateRouter.get("/certificates/:id", async function (req, res, next) {
    try {
        // req (request) 에서 id 가져오기
        const certificateId = req.params.id;

        // 위 id를 이용하여 db에서 데이터 찾기
        const certificate = await CertificateService.getCertificate({
            certificateId,
        });

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
    try {
        // URI로부터 수상 데이터 id를 추출함.
        const certificateId = req.params.id;

        // body data 로부터 업데이트할 수상 정보를 추출함.
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;

        const toUpdate = { title, description };

        // 위 추출된 정보를 이용하여 db의 데이터 수정하기
        const certificate = await CertificateService.setCertificate({
            certificateId,
            toUpdate,
        });

        if (certificate.errorMessage) {
            throw new Error(certificate.errorMessage);
        }

        res.status(200).send(certificate);
    } catch (error) {
        next(error);
    }
});

certificateRouter.delete("/certificates/:id", async function (req, res, next) {
    try {
        // req (request) 에서 id 가져오기
        const certificateId = req.params.id;

        // 위 id를 이용하여 db에서 데이터 삭제하기
        const result = await CertificateService.deleteCertificate({
            certificateId,
        });

        if (result.errorMessage) {
            throw new Error(result.errorMessage);
        }

        res.status(200).send(result);
    } catch (error) {
        next(error);
    }
});

certificateRouter.get(
    "/certificatelist/:user_id",
    async function (req, res, next) {
        try {
            // 특정 사용자의 전체 수상 목록을 얻음
            // @ts-ignore
            const user_id = req.params.user_id;
            const certificateList = await CertificateService.getCertificateList({
                user_id,
            });
            res.status(200).send(certificateList);
        } catch (error) {
            next(error);
        }
    }
);

export { certificateRouter };
