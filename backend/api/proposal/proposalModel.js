const mongoose = require("mongoose");

const proposalSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    jobPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job",
      require: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    response: { type: String },
    isAccepted: { type: Boolean, default: false },
    isPending: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);
const proposal = mongoose.model("proposal", proposalSchema);
module.exports = proposal;
