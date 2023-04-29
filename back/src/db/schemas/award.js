import mongoose, { Schema, model } from "mongoose";

const Award = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref:"User",
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
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", Award);

export { AwardModel };
