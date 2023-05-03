import { AwardModel } from "../schemas/award";

class Award {
  static async createAward({ newAward }) {
    return AwardModel.create(newAward);
  }

  static async findById({ userId }) {
    return AwardModel.findOne({ userId: userId });
  }

  static async findByUserId({ userId }) {
    return AwardModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return AwardModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ _id }) {
    return AwardModel.findByIdAndDelete(_id);
  }
}

export { Award };
