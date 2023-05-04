// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Education } from "../db";

class educationService {
  static async createEducation({ newEducation }) {
    return await Education.createEducation({ newEducation });
  }

  static async getEducation({ userId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const education = await Education.findByUserId({ userId });
    if (!education) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return education;
  }

  static async updateEducation({ _id, userId, toUpdate }) {
    const education = await Education.findById({ userId });

    if (!education) {
      return { errorMessage: "해당 id를 가진 학력 데이터를 찾을 수 없습니다." };
    }

    if (education.user && education.user._id.toString() !== userId) {
      return { errorMessage: "해당 id를 가진 학력 데이터를 수정할 수 없습니다." };
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

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!deletedEducation) {
      const errorMessage =
        "해당 id를 가진 학력 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { status: "ok", _id };
  }
}

export { educationService };
