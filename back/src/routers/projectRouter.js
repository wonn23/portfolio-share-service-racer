import {Router} from "express";
import {tokenValidator} from "../middlewares/tokenValidator";
import {userAuthService} from "../services/userService";
import {validationParams} from "../utils/parameterValidator";

import {ProjectModel} from "../db/schemas/project";
import { v4 as uuidv4 } from "uuid";
import {projectService} from "../services/projectService";
import {User} from "../db";


const projectRouter = Router();
projectRouter.use(tokenValidator);

projectRouter.post("/add",
    async (req, res, next) => {
    try{
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const { title, description, url } = req.body;
        const user_id = req.currentUserId;


        const user = await userAuthService.getUserInfo({user_id});
        const projectId = uuidv4()
        console.log(`user Service : ${user._id}`);
        const project =
            new ProjectModel({
                user:user._id,
                projectid: projectId,
                title:title,
                description:description,
                url:url
            });

        const added = await projectService.addProject({project});
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

projectRouter.post("/list",
    async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const user = User.findById({ user_id });

        user.then((u) => {
            if (!u) {
                res.status(404).json({ message: "유저를 찾을수 없습니다." });
            }
            const finded = ProjectModel.find({ user: u._id });
            finded.then((data) => {
                res.send(data);
            });
        });
    } catch (e) {
    next(e);
}

});

projectRouter.post("/update",
    async (req, res, next) => {
    try {
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const {projectid,title, description, url } = req.body;
        const user_id = req.body.id

        const toUpdate = { title, description, url };

        await projectService.setProject({ projectid, toUpdate })
            .then((pro) => {
                if (pro.errorMessage) {
                    res.status(404).json({message:"유저를 찾을 수 없습니다."})
                }
                res.status(200).json(pro);
            });
    }catch (e){
        console.log(e)
    }
});

projectRouter.post("/delete",
    async (req, res, next) => {
        try {
            const params = Object.values(req.body);
            if(!validationParams(params))
            {
                console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
                res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
                return;
            }
            const { projectid } = req.body;

            await projectService.deleteProject({ projectid })
                .then((pro) => {
                    if (pro.errorMessage) {
                        res.status(404).json({message:"유저를 찾을 수 없습니다."})
                    }
                    res.status(200).json(pro);
                });
        }catch (e){
            console.log(e)
        }
    });

export {projectRouter};