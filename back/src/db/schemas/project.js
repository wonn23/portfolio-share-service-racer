import mongoose, { Schema, model } from "mongoose";

const ProjectSchema = new Schema(
    {
        user: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            default: "",
        },
        role:{
            type:String,
            required:true,
        },
        detail:{
            type:String,
            required:true,
        },
        url:{
            type:String,
            required: true,
            default: "",
        },
        projectdate:{
            type:String,
            required:true,
            default: "",
        }
    },
    {
        timestamps: true,
    }
);

const ProjectModel = model("Project", ProjectSchema);

export { ProjectModel };
