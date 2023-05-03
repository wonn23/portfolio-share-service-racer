import {Router} from "express";
import {tokenValidator} from "../middlewares/tokenValidator";
import {validationParams} from "../utils/parameterValidator";

import {ProjectModel} from "../db/schemas/project";
import {projectService} from "../services/projectService";


const projectRouter = Router();
projectRouter.use(tokenValidator);

projectRouter.post("/create",
    async (req, res, next) => {
    try{
        const params = Object.values(req.body);
        if(!validationParams(params))
        {
            console.log('비어있는 데이터가 존재합니다. 확인후 요청해주세요.');
            res.status(404).send({message:'비어있는 데이터가 존재합니다. 확인후 요청해주세요.'});
            return;
        }
        const { title, description, role, detail, url, projectdate } = req.body;
        const userid = req.currentUserId;

        const newProject =
            new ProjectModel({
                user:userid,
                title:title,
                description:description,
                role:role,
                detail:detail,
                projectdate:projectdate,
                url:url
            });

        const added=
            await projectService.addProject({newProject});
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
        const userid = req.currentUserId;
        const project = await projectService.getProjects({userid});
        if(project.errorMessage){
            res.status(404).send({message:'데이터를 찾을 수 없습니다.'});
        }
        res.status(200).json(project);
    } catch (e) {
    next(e);
}

});

projectRouter.post("/update",
    async (req, res, next) => {
    try {
        const { projectid,title, description, role, detail, url, projectdate } = req.body;
        const toUpdate = { title, description, role, detail, url, projectdate };

        const project = await projectService.setProject({ projectid, toUpdate });
        if(project.errorMessage)
        {
            res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
        }
        res.status(200).json(project);
    }catch (e){
        console.log(e)
        res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
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

            if(!projectid){
                res.status(404).json({message:"데이터를 찾을 수 없습니다."})
            }

            const deleted = await projectService.deleteProject({ projectid })
            if (deleted.errorMessage) {
                res.status(404).json({message:"유저를 찾을 수 없습니다."})
            }
            res.status(200).json(deleted);
        }catch (e){
            console.log(e)
            res.status(404).json({message:"해당 정보를 찾을 수 없습니다."});
        }
    });

export {projectRouter};