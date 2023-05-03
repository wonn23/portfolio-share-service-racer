import mongoose, { Schema, model } from "mongoose";

const AwardSchema = new Schema(
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
        description: {
            type: String,
            required: true,
        },
        awarddate:{
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const AwardModel = model("Award", AwardSchema);

export { AwardModel };
