const mongoose = require("mongoose");
const users = require("./users");
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
      enum: ["s", "m", "l", "xl", "XXl"],
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
      required: true,
    },
    trending: {
      type: Boolean,
      required: true,
    },
    rating: {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      value: {
        type: Number,
        min: 1,
        max: 5,
      },
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
