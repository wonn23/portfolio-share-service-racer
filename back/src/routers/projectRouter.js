import { Router } from "express";
import { tokenValidator } from "../middlewares/tokenValidator";
import { validationParams } from "../utils/parameterValidator";

import { ProjectModel } from "../db/schemas/project";
import { projectService } from "../services/projectService";

const projectRouter = Router();
// project 생성, 조회, 수정, 삭제 시 로그인되어있는지 확인
projectRouter.use(tokenValidator);

// 해당 user의 project 추가
projectRouter.post("/create", async function (req, res, next) {
  try {
    // body 데이터를 가져와 비어있는지 확인
    const params = Object.values(req.body);
    if (!validationParams(params)) {
      console.log("비어있는 데이터가 존재합니다. 확인후 요청해주세요.");
      res.status(404).send({
        message: "비어있는 데이터가 존재합니다. 확인후 요청해주세요.",
      });
      return;
    }
    const {
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    } = req.body;

    const userId = req.currentUserId;
    console.log(`user Service : ${userId}`);

    const newProject = new ProjectModel({
      userId,
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    });

    // DB에 newProject 객체 추가
    const created = await projectService.createProject({ newProject });

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

// userId로 해당 유저의 project 전체 조회
projectRouter.get("/:userId", async function (req, res, next) {
  try {
    const { userId } = req.params;
    const projectList = await projectService.getProject({ userId });
    if (projectList.errorMessage) {
      throw new Error(projectList.errorMessage);
    }
    return res.status(200).send(projectList);
  } catch (e) {
    next(e);
  }
});

// _id로 project 수정
projectRouter.put("/:_id", async function (req, res, next) {
  try {
    const { _id } = req.params;

    // body data 로부터 업데이트할 사용자 정보를 추출함.
    const {
      userId,
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    } = req.body ?? null;

    if (!userId) {
      throw new Error("해당 유저 아이디가 없습니다. 다시 확인해 주세요.");
    }

    const toUpdate = {
      projectName,
      projectLink,
      introduction,
      startDate,
      myRole,
      detail,
    };

    // 해당 사용자 아이디로 사용자 정보를 DB에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
    const updateProject = await projectService.updateProject({
      _id,
      userId,
      toUpdate,
    });

    res.status(200).json(updateProject);
  } catch (error) {
    next(error);
  }
});

// _id로 project 삭제
projectRouter.delete("/:_id", async function (req, res, next) {
  const _id = req.params._id;
  try {
    const result = await projectService.deleteProject({ _id });
    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
});

export { projectRouter };
