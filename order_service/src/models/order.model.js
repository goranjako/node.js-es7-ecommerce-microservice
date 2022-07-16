import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    user: {
      type: String,
      required: [true, "User  is required"],
    },

      products: {
        type: String,
      required: [true, "Products is required"],
      },
      quantity: {
        type: Number,
        default: 0
      },
    
      totalPrice: {
        type: Number,
        default: 0
      },
    createdAt: {
      type: Date,
      default: Date.now
  },
}
);

export default mongoose.model("Order", OrderSchema);