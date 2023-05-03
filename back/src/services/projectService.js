import { Project } from "../db";

class projectService {
  static async addProject({ project }) {
    return await Project.addProject({ project });
  }
  static async getProject({ userId }) {
    const project = await Project.findAll({ userId });
    if (!project) {
      const errorMessage = "해당 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return project;
  }

  static async setProject({ projectid, toUpdate }) {
    let project;

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    if (toUpdate.role) {
      const fieldToUpdate = "role";
      const newValue = toUpdate.role;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    if (toUpdate.detail) {
      const fieldToUpdate = "detail";
      const newValue = toUpdate.detail;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    if (toUpdate.url) {
      const fieldToUpdate = "url";
      const newValue = toUpdate.url;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    if (toUpdate.projectdate) {
      const fieldToUpdate = "projectdate";
      const newValue = toUpdate.projectdate;
      project = await Project.update({ projectid, fieldToUpdate, newValue });
    }
    return project;
  }

  static async deleteProject({ projectId }) {
    const deletedProject = await Project.deleteById({ projectId });
    if (!deletedProject) {
      const errorMessage =
        "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return deletedProject;
  }
}

export { projectService };
