import { ProjectModel } from "../schemas/project";

class Project {
  static async createProject({ newProject }) {
    return await ProjectModel.create(newProject);
  }

  static async findById({ userId }) {
    return await ProjectModel.findOne({ userId: userId });
  }

  static async findByUserId({ userId }) {
    return ProjectModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return ProjectModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ _id }) {
    return ProjectModel.findByIdAndDelete(_id);
  }
}
export { Project };
