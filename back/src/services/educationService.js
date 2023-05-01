import {Education} from "../db";

class educationService {
    static async addEducation({education}) {
        const createdEducation = await Education.addEducation({ education });
        createdEducation.errorMessage = null;
        return createdEducation;
    }

    static async getEducation({ userId }) {
        const education = await Education.findAll({ userId });
        if (!education) {
            const errorMessage =
                "해당 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return education;
    }

    static async setEducation({ educationId,toUpdate }) {

        let education = await Education.findById({educationId});

        if (toUpdate.school) {
            const fieldToUpdate = "school";
            const newValue = toUpdate.school;
            education = await Education.update({ educationId, fieldToUpdate, newValue });
        }

        if (toUpdate.major) {
            const fieldToUpdate = "major";
            const newValue = toUpdate.major;
            education = await Education.update({ educationId, fieldToUpdate, newValue });
        }

        if (toUpdate.status) {
            const fieldToUpdate = "status";
            const newValue = toUpdate.status;
            education = await Education.update({ educationId, fieldToUpdate, newValue });
        }

        return education;
    }

    static async deleteEducation({ educationId }) {
        const deletedEducation = await Education.deleteById({ educationId });
        if (!deletedEducation) {
            const errorMessage =
                "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return deletedEducation;
    }
}

export { educationService };
