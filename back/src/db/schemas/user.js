import mongoose, { Schema, model } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';
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
      default: "설명이 아직 없습니다. 추가해 주세요.",
    },
    education:[{type:mongoose.Types.ObjectId,required:true,ref:'Education'}]
  },
  {
    timestamps: true,
  }
);
UserSchema.plugin(uniqueValidator);

const UserModel = model("User", UserSchema);

export { UserModel };
