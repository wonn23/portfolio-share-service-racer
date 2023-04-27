import { ProjectModel } from "../schemas/project";

class Project {
  // 프로젝트 생성
  static async create({ newProject }) {
    const createdNewProject = await ProjectModel.create(newProject);
    return createdNewProject;
  }

  // projectId를 통해 프로젝트 조회
  static async findProjectById({ projectId }) {
    const project = await ProjectModel.findOne({ projectid: projectId });
    return project;
  }

  // userId에 맞는 프로젝트 조회
  static async findByUserId({ userId }) {
    const projects = await ProjectModel.find({ userId });
    return projects;
  }

  // projectId를 통해 프로젝트 수정
  static async update({ projectId, fieldToUpdate, newValue }) {
    const filter = { id: projectId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedProject = await ProjectModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedProject;
  }

  // project를 통해 프로젝트 삭제
  static async deleteById({ projectId }) {
    const deleteResult = await ProjectModel.deleteOne({ id: projectId });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Project };
