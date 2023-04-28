import { EducationModel } from "../schemas/education";

class Education {
  // education 생성
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
  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
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
    const deletedEducation = await EducationModel.findByIdAndDelete(educationId);
    return deletedEducation;
  }
}

export { Education };
