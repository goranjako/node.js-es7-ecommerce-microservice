import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    code: {
      type: Number,
      required: [true, 'Code is required']
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
    },
    price: {
      type: Number,
      default: 0,
    },
    currency: {
      type: String,
      required: true,
      //enum: ["$", "€"],
      // default: "$",
    },
    quantity: {
      type: Number,
      default: 0,
    },
    isfreeshipping: {
      type: Boolean,
      default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
  }
);

export default mongoose.model("Product", ProductSchema);
