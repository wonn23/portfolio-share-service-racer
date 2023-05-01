import { Certificate } from "../db";
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async addCertificate({ certificate }) {
    return await Certificate.addCertificate({ certificate });
  }

  static async getCertificate({ userId }) {
    const certificate = await Certificate.findAll({ userId });
    if (!certificate) {
      const errorMessage =
        "해당 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }

  static async editCertificate({ certificate }) {
    const editedCertificate = await Certificate.edit({ certificate });
    if (!editedCertificate) {
      const errorMessage =
        "해당 자격증 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return editedCertificate;
  }

  static async deleteCertificate({ certificateId }) {
    const deletedCertificate = await Certificate.deleteById({ certificateId });
    if (!deletedCertificate) {
      const errorMessage =
        "해당 자격증 정보가 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return deletedCertificate;
  }
}

export { certificateService };
