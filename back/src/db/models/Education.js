import { EducationModel } from "../schemas/education";

class Education {
  // education 생성
  static async createEducation({ education }) {
    return await EducationModel.create(education);
  }

  static async findById({ user_id }) {
    return EducationModel.findOne({ user: user_id });
  }

  static async findAll({ user_id }) {
    return EducationModel.find({ user: user_id });
  }

  static async create({ newEducation }) {
    return EducationModel.create(newEducation);
  }

  // education
  static async findAllEduInfo({ email }) {
    return EducationModel.find({ user: { email: email } });
  }

  // education 수정
  static async editEducation({ userId, educationId, education }) {
    const filter = { user: userId, _id: educationId };
    const update = { ...education };
    const option = { new: true };
    const editedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return editedEducation;
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
  // education 삭제
  static async deleteById({ educationId }) {
    const deletedEducation = await EducationModel.findByIdAndDelete(
      educationId
    );
    return deletedEducation;
  }
}

export { Education };
