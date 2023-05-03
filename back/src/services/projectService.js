import { Project } from "../db";

class projectService {
  static async createProject({ newProject }) {
    return await Project.createProject({ newProject });
  }
  static async getProject({ userId }) {
    const project = await Project.findAll({ userId });
    if (!project) {
      const errorMessage = "해당 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return project;
  }

  static async updateProject({ _id, userId, toUpdate }) {
    const project = await Project.findById({ _id });

    if (!project) {
      return { errorMessage: "Project not found." };
    }

    if (project.user && project.user._id.toString() !== userId) {
      return { errorMessage: "User is not authorized to edit this project." };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedProject = await Project.findByIdAndUpdate({ _id }, updateObj);

    return updatedProject;
  }

  static async deleteProject({ _id }) {
    const deletedProject = await Project.deleteById({ _id });
    if (!deletedProject) {
      const errorMessage =
        "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok", _id };
  }
}

export { projectService };
