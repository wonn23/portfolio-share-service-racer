import {Education} from "../db";

class educationService {
    static async addEducation({ newEducation }) {
        const createdEducation = await Education.addEducation({ newEducation });
        createdEducation.errorMessage = null;
        return createdEducation;
    }

    static async getEducation({ userid }) {
        const education = await Education.findAll({ userid });
        if (!education) {
            const errorMessage =
                "해당 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return education;
    }

    static async setEducation({ educationid,toUpdate }) {
        try {
            let education = await Education.findById({educationid});

            if (!education) {
                const errorMessage =
                    "해당 id를 가진 데이터는 없습니다. 다시 한 번 확인해 주세요.";
                return { errorMessage };
            }
            if (toUpdate.school) {
                const fieldToUpdate = "school";
                const newValue = toUpdate.school;
                education = await Education.update({ educationid, fieldToUpdate, newValue });
            }

            if (toUpdate.major) {
                const fieldToUpdate = "major";
                const newValue = toUpdate.major;
                education = await Education.update({ educationid, fieldToUpdate, newValue });
            }

            if (toUpdate.status) {
                const fieldToUpdate = "status";
                const newValue = toUpdate.status;
                education = await Education.update({ educationid, fieldToUpdate, newValue });
            }

            return education;
        }catch (e){
            console.log(e)
        }
    }

    static async deleteEducation({ educationid }) {
        const deletedEducation = await Education.deleteById({ educationid });
        if (!deletedEducation) {
            const errorMessage =
                "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return deletedEducation;
    }
}

export { educationService };

//
// static async addProject({project.js}) {
//     return  await Project.addProject({ project.js });
// }
// static async getProject({ userId }) {
//     const project.js = await Project.findAll({ userId });
//     if (!project.js) {
//         const errorMessage =
//             "해당 데이터는 없습니다. 다시 한 번 확인해 주세요.";
//         return { errorMessage };
//     }
//     return project.js;
// }
//
// static async setProject({ user_id,toUpdate }) {
//     let project.js = await Project.findById({user_id});
//
//     if (toUpdate.title) {
//         const fieldToUpdate = "title";
//         const newValue = toUpdate.title;
//         project.js = await Project.update({ user_id, fieldToUpdate, newValue });
//     }
//
//     if (toUpdate.description) {
//         const fieldToUpdate = "description";
//         const newValue = toUpdate.description;
//         project.js = await Project.update({ user_id, fieldToUpdate, newValue });
//     }
//
//     if (toUpdate.url) {
//         const fieldToUpdate = "url";
//         const newValue = toUpdate.url;
//         project.js = await Project.update({ user_id, fieldToUpdate, newValue });
//     }
//
//     return project.js;
// }
//
// static async deleteProject({ projectId }) {
//     const deletedProject = await Project.deleteById({ projectId });
//     if (!deletedProject) {
//         const errorMessage =
//             "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
//         return { errorMessage };
//     }
//     return deletedProject;
// }