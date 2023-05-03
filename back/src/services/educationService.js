import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async createEducation({ education }) {
    return await Education.createEducation({ education });
  }

  static async getEducation({ userId }) {
    const education = await Education.findAll({ userId });
    if (!education) {
      const errorMessage =
        "해당 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return education;
  }

  static async updateEducation({ _id, user, toUpdate }) {
    const education = await Education.findById({ _id });
    if (!education) {
      return { errorMessage: "Education not found." };
    }

    console.log(education.user);
    console.log(education.user._id.toString());
    console.log(user);
    if (education.user && education.user._id.toString() !== user) {
      return { errorMessage: "User is not authorized to edit this education." };
    }

    const updateObj = { user, ...toUpdate };

    const updatedEducation = await Education.findByIdAndUpdate(
      { _id },
      updateObj
    );

    return updatedEducation;
  }

  static async deleteEducation({ educationId }) {
    const deletedEducation = await Education.deleteById({ educationId });
    if (!deletedEducation) {
      const errorMessage =
        "해당 학력 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return deletedEducation;
  }
}

export { educationService };
