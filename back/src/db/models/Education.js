import { EducationModel } from "../schemas/education";

class Education {
    static async addEducation({newEducation}) {
        return EducationModel.create(newEducation);
    }

    static async findById({ educationid }) {
        return EducationModel.findOne({ _id: educationid });
    }

    static async findAll({ userid }) {
        return EducationModel.find({ user: userid });
    }

    static async update({ educationid, fieldToUpdate, newValue }) {
        const filter = { _id: educationid };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }

    static async deleteById({ educationid }) {
        return  EducationModel.deleteOne({ _id: educationid });
    }

}

export { Education };
