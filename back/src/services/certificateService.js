// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Certificate } from "../db";

class certificateService {
  static async createCertificate({ newCertificate }) {
    return Certificate.createCertificate({ newCertificate });
  }

  static async getCertificate({ userId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const certificate = await Certificate.findByUserId({ userId });
    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }

  static async updateCertificate({ _id, userId, toUpdate }) {
    const certificate = await Certificate.findById({ userId });

    if (!certificate) {
      return { errorMessage: "해당 id를 가진 자격증 데이터를 찾을 수 없습니다." };
    }

    if (certificate.user && certificate.user._id.toString() !== userId) {
      return {
        errorMessage: "해당 id를 가진 자격증 데이터를 수정할 수 없습니다.",
      };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      { _id },
      updateObj
    );

    return updatedCertificate;
  }

  static async deleteCertificate({ _id }) {
    const deletedCertificate = await Certificate.deleteById({ _id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!deletedCertificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok", _id };
  }
}

export { certificateService };
