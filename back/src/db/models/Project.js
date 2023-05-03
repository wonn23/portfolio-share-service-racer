import { ProjectModel } from "../schemas/project";

class Project {
    static async addProject({ newProject }) {
        return await ProjectModel.create({ newProject });
    }

    static async findById({ projectid }) {
        return ProjectModel.findOne({ _id: projectid });
    }

    static async findAll({ userid }) {
        return await ProjectModel.find({ user: userid });
    }

    static async update({ projectid, fieldToUpdate, newValue }) {

        const id = projectid;
        const filter = { _id: projectid };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedProject = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedProject;
    }

    static async deleteById({ projectid }) {
        return await ProjectModel.deleteOne({ _id: projectid });
    }
}
export { Project };


