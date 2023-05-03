import { Education } from "../db";

class educationService {
  static async createEducation({ newEducation }) {
    return await Education.createEducation({ newEducation });
  }

  static async getEducation({ userId }) {
    const education = await Education.findByUserId({ userId });
    if (!education) {
      const errorMessage =
        "해당 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return education;
  }

  static async updateEducation({ _id, userId, toUpdate }) {
    const education = await Education.findById({ userId });

    if (!education) {
      return { errorMessage: "Education not found." };
    }

    if (education.user && education.user._id.toString() !== userId) {
      return { errorMessage: "User is not authorized to edit this education." };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedEducation = await Education.findByIdAndUpdate(
      { _id },
      updateObj
    );

    return updatedEducation;
  }

  static async deleteEducation({ _id }) {
    const deletedEducation = await Education.deleteById({ _id });
    if (!deletedEducation) {
      const errorMessage =
        "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok", _id };
  }
}

export { educationService };
