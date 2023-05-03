import mongoose, { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    school: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
