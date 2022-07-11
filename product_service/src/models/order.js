import mongoose from "mongoose";
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },

      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product"
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