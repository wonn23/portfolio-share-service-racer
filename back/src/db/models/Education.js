import { EducationModel } from "../schemas/education";

class Education {
  // education 생성
  static async insert({ newEducation }) {
    const createdEducation = await EducationModel.create(newEducation);
    return createdEducation;
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
}

export { Education };
