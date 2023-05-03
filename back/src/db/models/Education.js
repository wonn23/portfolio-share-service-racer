import { EducationModel } from "../schemas/education";

class Education {
  static async createEducation({ newEducation }) {
    return await EducationModel.create(newEducation);
  }

  static async findById({ userId }) {
    return EducationModel.findOne({ userId: userId });
  }

  static async findByUserId({ userId }) {
    return EducationModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return EducationModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ _id }) {
    return EducationModel.findByIdAndDelete(_id);
  }
}

export { Education };
