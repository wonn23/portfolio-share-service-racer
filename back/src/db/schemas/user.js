import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
            default: "none",
        },
        award:[
            {type: mongoose.Types.ObjectId, required: true, ref: "Award"}
        ],
        certificate:[
            {type: mongoose.Types.ObjectId, required: true, ref: "Certificate"}
        ],
        education: [
            { type: mongoose.Types.ObjectId, required: true, ref: "Education" }
        ],
        project:[
            {type: mongoose.Types.ObjectId, required: true, ref: "Project"}
        ]
    },
    {
        timestamps: true,
    }
);

const UserModel = model("User", UserSchema);

export { UserModel };
