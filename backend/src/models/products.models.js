import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  sizes: [{
    type: String
  }],
  colors: [{
    type: String
  }],
  images: [{
    type: String
  }],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  inventory: {
    type: Number,
    required: true
  },
  attributes: {
    material: {
      type: String
    },
    gender: {
      type: String
    },
    style: {
      type: String
    }
  }
});

// Define the Product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
