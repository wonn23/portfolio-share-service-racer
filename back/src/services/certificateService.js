// from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class CertificateService {
  static async createCertificate({ newCertificate }) {
    return Certificate.createCertificate({ newCertificate });
  }

  static async getCertificate({ certificateId }) {
    // 해당 id를 가진 데이터가 db에 존재 여부 확인
    const certificate = await Certificate.findById({ certificateId });
    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificateList({ user_id }) {
    const certificates = await Certificate.findByUserId({ user_id });
    return certificates;
  }

  static async updateCertificate({ _id, userId, toUpdate }) {
    const certificate = await Certificate.findById({ _id });
    if (!certificate) {
      return { errorMessage: "Certificate not found." };
    }

    if (certificate.user && certificate.user._id.toString() !== userId) {
      return {
        errorMessage: "User is not authorized to edit this certificate.",
      };
    }

    const updateObj = { userId, ...toUpdate };

    const updatedCertificate = await Certificate.findByIdAndUpdate(
      { _id },
      updateObj
    );

    return updatedCertificate;
  }

  static async deleteCertificate({ certificateId }) {
    const isDataDeleted = await Certificate.deleteById({ certificateId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return { status: "ok" };
  }
}

export { CertificateService };
