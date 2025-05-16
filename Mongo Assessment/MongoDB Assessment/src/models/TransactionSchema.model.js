import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  store: {
    type: String,
    required: true,
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
