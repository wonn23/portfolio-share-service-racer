import { EducationModel } from "../schemas/education";

class Education {
  // education 생성
  static async createEducation({ education }) {
    return await EducationModel.create(education);
  }

  static async create({ newEducation }) {
    return EducationModel.create(newEducation);
  }

  static async findById({ user_id }) {
    return EducationModel.findOne({ user: user_id });
  }

  static async findAll({ user_id }) {
    return EducationModel.find({ user: user_id });
  }

  // education
  static async findAllEduInfo({ email }) {
    return EducationModel.find({ user: { email: email } });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return EducationModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ educationId }) {
    return EducationModel.findByIdAndDelete(educationId);
  }
}

export { Education };
