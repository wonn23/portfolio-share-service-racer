import mongoose, { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    agency: {
      type: String,
      required: true,
    },
    credit: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    acquireDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
