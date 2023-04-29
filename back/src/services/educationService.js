import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

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

    static async setEducation({ user_id,toUpdate }) {

        let education = await Education.findById({user_id});

        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            education = await Education.update({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.email) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.email;
            education = await Education.update({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.password) {
            const fieldToUpdate = "password";
            const newValue = bcrypt.hash(toUpdate.password, 10);
            education = await Education.update({ user_id, fieldToUpdate, newValue });
        }

        if (toUpdate.description) {
            const fieldToUpdate = "description";
            const newValue = toUpdate.description;
            education = await Education.update({ user_id, fieldToUpdate, newValue });
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
