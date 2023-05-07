import mongoose, { Schema, model } from "mongoose";

const AwardSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    association: {
      type: String,
      required: true,
    },
    contest: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    prize: {
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

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
