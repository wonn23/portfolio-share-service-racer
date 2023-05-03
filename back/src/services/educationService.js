import { Education } from "../db";
import { v4 as uuidv4 } from "uuid";

class educationService {
  static async addEducation({ education }) {
    return await Education.addEducation({ education });
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

  static async editEducation({ education }) {
    const editedEducation = await Education.edit({ education });
    if (!editedEducation) {
      const errorMessage =
        "해당 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return editedEducation;
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
