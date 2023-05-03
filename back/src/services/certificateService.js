import { Certificate } from "../db";

class certificateService {
  static async addCertificate({ newCertificate }) {
    return await Certificate.create({ newCertificate });
  }
  static async getCertificate({ certificateid }) {
    const certificate = await Certificate.findById({ certificateid });
    if (!certificate) {
      const errorMessage =
        "해당 id를 가진 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return certificate;
  }
  static async getCertificateList({ userid }) {
    return await Certificate.findByUserId({ userid });
  }
  static async setCertificate({ certificateid, toUpdate }) {
    try {
      let certificate = await Certificate.findById({ certificateid });

      if (!certificate) {
        const errorMessage =
            "해당 id를 가진 데이터는 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
      if (toUpdate.title) {
        const fieldToUpdate = "title";
        const newValue = toUpdate.title;
        certificate = await Certificate.update({ certificateid, fieldToUpdate, newValue });
      }
      if (toUpdate.institution) {
        const fieldToUpdate = "institution";
        const newValue = toUpdate.institution;
        certificate = await Certificate.update({ certificateid, fieldToUpdate, newValue });
      }
      if (toUpdate.level) {
        const fieldToUpdate = "level";
        const newValue = toUpdate.level;
        certificate = await Certificate.update({ certificateid, fieldToUpdate, newValue });
      }
      if (toUpdate.issuedate) {
        const fieldToUpdate = "issuedate";
        const newValue = toUpdate.issuedate;
        certificate = await Certificate.update({ certificateid, fieldToUpdate, newValue });
      }
      return certificate;
    }catch (e){
      console.log(e)
    }

  }

  static async deleteCertificate({ certificateid }) {
    const isDataDeleted = await Certificate.deleteById({ certificateid });

    if (!isDataDeleted) {
      const errorMessage =
        "해당 id를 가진 데이터는 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    return { message: "삭제되었습니다." };
  }
}

export { certificateService };
