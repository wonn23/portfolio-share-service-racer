import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    projectName: {
      type: String,
      required: true,
    },
    projectLink: {
      type: String,
      required: true,
    },
    introduction: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    myRole: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
