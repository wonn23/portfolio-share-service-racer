import mongoose, { Schema, model } from "mongoose";

const Award = new Schema(
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
    description: {
      type: String,
      required: true,
    },
    awardDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const AwardModel = model("Award", Award);

export { AwardModel };
