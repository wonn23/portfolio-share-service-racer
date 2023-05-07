// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Project } from "../db";

class projectService {
  static async createProject({ newProject }) {
    return await Project.createProject({ newProject });
  }

  static async getProject({ userId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const project = await Project.findByUserId({ userId });
    if (!project) {
      const errorMessage = 
        "해당 id를 가진 프로젝트 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return project;
  }

  static async updateProject({ _id, userId, toUpdate }) {
    const project = await Project.findById({ userId });

    if (!project) {
      return { errorMessage: "해당 id를 가진 프로젝트 데이터를 찾을 수 없습니다." };
    }

    if (project.user && project.user._id.toString() !== userId) {
      return { errorMessage: "해당 id를 가진 프로젝트 데이터를 수정할 수 없습니다." };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedProject = await Project.findByIdAndUpdate({ _id }, updateObj);

    return updatedProject;
  }

  static async deleteProject({ _id }) {
    const deletedProject = await Project.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!deletedProject) {
      const errorMessage =
        "해당 id를 가진 프로젝트 정보는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok", _id };
  }
}

export { projectService };
