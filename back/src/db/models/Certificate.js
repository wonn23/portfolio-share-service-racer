import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    return await CertificateModel.create(newCertificate);
  }

  static async findById({ certificateid }) {
    return await CertificateModel.findOne({ _id: certificateid });
  }

  static async findByUserId({ userid }) {
    return await CertificateModel.find({ user:userid });
  }

  static async update({ certificateid, fieldToUpdate, newValue }) {
    const filter = { _id: certificateid };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
        filter,
        update,
        option
    );
    return updatedCertificate;
  }

  static async deleteById({ certificateid }) {
    const deleteResult = await CertificateModel.deleteOne({ _id: certificateid });
    const isDataDeleted = deleteResult.deletedCount === 1;
    return isDataDeleted;
  }
}

export { Certificate };
