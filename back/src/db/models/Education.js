import { EducationModel } from "../schemas/education";

class Education {
  // education 생성
  static async addEducation({ education }) {
    const createdEducation = await EducationModel.create(education);
    return createdEducation;
  }

  static async findById({ user_id }) {
    const user = await EducationModel.findOne({ user: user_id });
    return user;
  }

  static async findAll({ user_id }) {
    const educations = await EducationModel.find({ user: user_id });
    return educations;
  }

  static async create({ newEducation }) {
    const createdEducation = await EducationModel.create(newEducation);
    return createdEducation;
  }

  // education
  static async findAllEduInfo({ email }) {
    const educations = await EducationModel.find({ user: { email: email } });
    return educations;
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
