import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async createCertificate({ newCertificate }) {
    return CertificateModel.create(newCertificate);
  }

  static async findById({ userId }) {
    return CertificateModel.findOne({ userId: userId });
  }

  static async findByUserId({ userId }) {
    return CertificateModel.find({ userId });
  }

  static async findByIdAndUpdate({ _id }, update) {
    return CertificateModel.findOneAndUpdate({ _id }, update, {
      new: true,
    });
  }

  static async deleteById({ _id }) {
    return CertificateModel.findByIdAndDelete(_id);
  }
}

export { Certificate };
