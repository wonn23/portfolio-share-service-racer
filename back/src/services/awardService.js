// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Award } from "../db";

class AwardService {
  static async createAward({ newAward }) {
    return await Award.createAward({ newAward });
  }

  static async getAward({ awardId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const award = await Award.findById({ awardId });
    if (!award) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwardList({ user_id }) {
    return await Award.findByUserId({ user_id });
  }

  static async setAward({ award_id, toUpdate }) {
    let award = await Award.findById(award_id);

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const fieldsToUpdate = {
      title: "title",
      description: "description",
    };

    for (const [field, fieldToUpdate] of Object.entries(fieldsToUpdate)) {
      if (toUpdate[field]) {
        const newValue = toUpdate[field];
        award = await Award.update({
          award_id,
          fieldToUpdate,
          newValue,
        });
      }
    }

    return award;
  }

  static async updateAward({ _id, userId, toUpdate }) {
    const award = await Award.findById({ _id });
    if (!award) {
      return { errorMessage: "Award not found." };
    }

    if (award.user && award.user._id.toString() !== userId) {
      return { errorMessage: "User is not authorized to edit this award." };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedAward = await Award.findByIdAndUpdate({ _id }, updateObj);
    console.log(updatedAward);
    return updatedAward;
  }

  static async deleteAward({ awardId }) {
    const isDataDeleted = await Award.deleteById({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { AwardService };
