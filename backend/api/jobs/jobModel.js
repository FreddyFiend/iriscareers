const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
    companySlug: { type: String, lowercase: true },
    slug: { type: String, lowercase: true, unique: true },
    title: {
      type: String,
      required: true,
    },

    country: { label: String, value: String },
    state: { label: String, value: String },
    city: { label: String, value: String },
    paymentType: { type: String },
    currency: { type: String },
    salaryFrom: {
      type: Number,
      required: true,
    },
    salaryTo: {
      type: Number,
      required: true,
    },

    shortDesc: { type: String, required: true },
    longDesc: { type: String, required: true },
    profession: { type: String, required: true },
    subProfession: { type: [String], required: true },
    published: { type: Boolean, default: false },
    isPending: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);
jobSchema.plugin(uniqueValidator, { message: "is already taken" });

jobSchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }

  next();
});

jobSchema.methods.slugify = function () {
  this.slug =
    slug(this.title) +
    "-" +
    ((Math.random() * Math.pow(36, 6)) | 0).toString(36);
};

const Job = mongoose.model("job", jobSchema);
module.exports = Job;
