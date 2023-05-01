import { AwardModel } from "../schemas/award";

class Award {
  static async addAward({ newAward }) {
    const createdAward = await AwardModel.create(newAward);
    return createdAward;
  }

  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findById({ awardId }) {
    const award = await AwardModel.findOne({ id: awardId });
    return award;
  }

  static async findByUserId({ userId }) {
    const awards = await AwardModel.find({ userId });
    return awards;
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
    const deletedAward = await AwardModel.findByIdAndDelete(awardId);
    return deletedAward;
  }
}

export { Award };
