import mongoose, { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    institution: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    issueDate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CertificateModel = model("certificate", CertificateSchema);

export { CertificateModel };
