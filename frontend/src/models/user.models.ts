import mongoose from "mongoose";
import { Schema } from "mongoose";

const cartItemSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  size: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
});

const userSchema = new Schema(
    {
      fullName: {
        type: String,
        required: true,
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
      access_token: {
        type: String
      },
      cart: [cartItemSchema]
    },
    {
      timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
