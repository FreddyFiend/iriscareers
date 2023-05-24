const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userEmail: { type: String },
  country: { type: String, required: false },
  province: { type: String, required: false },
  city: { type: String, required: false },
  address1: { type: String },
  address2: { type: String },
  address3: { type: String },
});

const Address = mongoose.model("address", addressSchema);
module.exports = Address;
