import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async addCertificate({ newCertificate }) {
    const createdCertificate = await CertificateModel.create(newCertificate);
    return createdCertificate;
  }

  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findById({ certificateId }) {
    const certificate = await CertificateModel.findOne({ id: certificateId });
    return certificate;
  }

  static async findByUserId({ userId }) {
    const certificates = await CertificateModel.find({ userId });
    return certificates;
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
    const deletedCertificate = await CertificateModel.findByIdAndDelete(certificateId);
    return deletedCertificate;
  }
}

export { Certificate };
