import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: String, // Changed from Array to String if there's only one image URL
      required: true,
    },
    color: {
      type: String,
    },
    price: {
      type: String, // Kept as String to maintain currency symbol
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
    },
    sizes: [
      {
        type: Number,
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
