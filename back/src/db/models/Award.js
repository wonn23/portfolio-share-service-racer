import { AwardModel } from "../schemas/award";

class Award {
  static async createAward({ newAward }) {
    return AwardModel.create(newAward);
  }

  static async create({ newAward }) {
    return AwardModel.create(newAward);
  }

  static async findById({ user }) {
    return AwardModel.findOne({ id: user });
  }

  static async findByUserId({ userId }) {
    return AwardModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return AwardModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ awardId }) {
    return AwardModel.findByIdAndDelete(awardId);
  }
}

export { Award };
