import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  images: [
    {
      type: String,
      required: true,
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  inventory: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

// Define the Product model
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
