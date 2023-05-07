// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Award } from "../db";

class awardService {
  static async createAward({ newAward }) {
    return await Award.createAward({ newAward });
  }

  static async getAward({ userId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const award = await Award.findByUserId({ userId });
    if (!award) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return award;
  }

  static async updateAward({ _id, userId, toUpdate }) {
    const award = await Award.findById({ userId });

    if (!award) {
      return { errorMessage: "해당 id를 가진 수상 데이터를 찾을 수 없습니다." };
    }

    if (award.user && award.user._id.toString() !== userId) {
      return { errorMessage: "해당 id를 가진 수상 데이터를 수정할 수 없습니다." };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedAward = await Award.findByIdAndUpdate({ _id }, updateObj);

    return updatedAward;
  }

  static async deleteAward({ _id }) {
    const deletedAward = await Award.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!deletedAward) {
      const errorMessage =
        "해당 id를 가진 수상 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok", _id };
  }
}

export { awardService };
