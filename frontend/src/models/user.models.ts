import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema(
    {
      fullName: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      avatar: { 
        type: String, 
      },
      verifyToken: String,
      verifyTokenExpiry: String
    },
    {
      timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
