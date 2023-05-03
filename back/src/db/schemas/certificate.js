import mongoose, { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref:"User",
            required: true,
        },
        institution:{
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        level:{
            type: String,
            required: true,
        },
        issuedate:{
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("certificate", CertificateSchema);

export { CertificateModel };
