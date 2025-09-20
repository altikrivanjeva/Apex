import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
  {
    name: String,
    address: String,
    phone: String,
    payment: String,
    cardNumber: String,
    cardExpiry: String,
    cardCVV: String,
    cart: Array,
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);