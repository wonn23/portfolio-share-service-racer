import { AwardModel } from "../schemas/award";

class Award {
  static async addAward({ newAward }) {
    return AwardModel.create(newAward);
  }

  static async create({ newAward }) {
    return await AwardModel.create(newAward);
  }

  static async findById({ awardId }) {
    return await AwardModel.findOne({ id: awardId });
  }

  static async findByUserId({ userId }) {
    return await AwardModel.find({ userId });
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async deleteById({ awardId }) {
    return await AwardModel.findByIdAndDelete(awardId);
  }
}

export { Award };
