import { Schema, model } from "mongoose";

const EducationSchema = new Schema(
  {
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    startYear: {
      type: Number,
      required: true,
    },
    endYear: {
      type: Number,
      required: false,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const EducationModel = model("Education", EducationSchema);

export { EducationModel };
