import { EducationModel } from "../schemas/education";

class Education {
    static async addEducation({education}) {
        const createdEducation = await EducationModel.create(education);
        return createdEducation;
    }

    static async findById({ user_id }) {
        const user = await EducationModel.findOne({ user: user_id });
        return user;
    }

    static async findAll({ user_id }) {
        const educations = await EducationModel.find({ user: user_id });
        return educations;
    }

    static async update({ user_id, fieldToUpdate, newValue }) {
        const filter = { _id: user_id };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

}

export { Education };
