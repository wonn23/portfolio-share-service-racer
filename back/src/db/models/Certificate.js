import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async addCertificate({ newCertificate }) {
    return await CertificateModel.create(newCertificate);
  }

  static async create({ newCertificate }) {
    return await CertificateModel.create(newCertificate);
  }

  static async findById({ certificateId }) {
    return await CertificateModel.findOne({ id: certificateId });
  }

  static async findByUserId({ userId }) {
    return await CertificateModel.find({ userId });
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { _id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async deleteById({ certificateId }) {
    return await CertificateModel.findByIdAndDelete(certificateId);
  }
}

export { Certificate };
