import mongoose, { Schema } from "mongoose";

const requestSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  grandFatherName: {
    type: String,
    required: true,
  },
  fatherName: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  spouseName: {
    type: String,
    required: true,
  },
  children: [
    {
      type: String,
      required: true,
    },
  ],
  citizenshipNo: {
    type: String,
    required: true,
  },
  citizenshipFrontImage: {
    type: String,
  },
  citizenshipBackImage: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountHolderName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
});

export const Request =
  mongoose.models.Request || mongoose.model("Request", requestSchema);
