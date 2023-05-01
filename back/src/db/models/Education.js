import { EducationModel } from "../schemas/education";

class Education {
    static async addEducation({education}) {
        return EducationModel.create(education);
    }

    static async findById({ educationId }) {
        return EducationModel.findOne({ educationId: educationId });
    }

    static async findAll({ user_id }) {
        return EducationModel.find({ user: user_id });
    }

    static async update({ educationId, fieldToUpdate, newValue }) {
        const filter = { educationId: educationId };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static async deleteById({ educationId }) {
        return  EducationModel.deleteOne({ educationId: educationId });
    }

}

export { Education };
