import { AwardModel } from "../schemas/award";

class Award {
    static async addAward({ newAward }) {
        return AwardModel.create(newAward);
    }

    static async findById({ awardid }) {
        return await AwardModel.findOne({ _id: awardid });
    }

    static async findByUserId({ userid }) {
        return  await AwardModel.find({ user:userid });
    }

    static async update({ awardid, fieldToUpdate, newValue }) {
        const filter = { _id: awardid };
        const update = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };
        const updatedUser = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        );
        return updatedUser;
    }
    static async deleteById({ awardid }) {
        return  await AwardModel.findByIdAndDelete(awardid);
    }
}

export { Award };
