import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async createCertificate({ newCertificate }) {
    return CertificateModel.create(newCertificate);
  }

  static async create({ newCertificate }) {
    return CertificateModel.create(newCertificate);
  }

  static async findById({ user }) {
    return CertificateModel.findOne({ id: user });
  }

  static async findByUserId({ userId }) {
    return CertificateModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return CertificateModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ certificateId }) {
    return CertificateModel.findByIdAndDelete(certificateId);
  }
}

export { Certificate };
