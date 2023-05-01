import { ProjectModel } from "../schemas/project";

class Project {
    static async addProject({project}) {
        return await ProjectModel.create(project);;
    }

    static async findById({ project_id }) {
        return  await ProjectModel.findOne({ user: project_id });
    }

    static async findAll({ user_id }) {
        return await ProjectModel.find({ user: user_id });
    }

    static async update({ projectId, fieldToUpdate, newValue }) {
        const filter = { projectId: projectId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static async deleteById({ projectId }) {
        return await ProjectModel.deleteOne({ id: projectId });
    }
}
export { Project };


