const mongoose = require("mongoose");

const professionSchema = new mongoose.Schema({
  profession: { type: String, required: true },
  subProfession: { type: [String], required: true },
  skillLevel: { type: Number, required: true, min: 1, max: 5 },
});

const addressSchema = new mongoose.Schema({
  country: { label: String, value: String },
  state: { label: String, value: String },
  city: { label: String, value: String },
  address1: { type: String },
  address2: { type: String },
  address3: { type: String },
});

function arrayLimit(val) {
  return val.length <= 3;
}
const educationSchema = new mongoose.Schema({
  university: { type: String, required: true },
  degree: { type: String, required: true },
  cgpa: { type: Number, required: true },
  outOf: { type: Number, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number, required: true },
});

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  description: { type: String, required: true },
  startYear: { type: String, required: true },
  endYear: { type: String, required: true },
});

const userSchema = new mongoose.Schema(
  {
    slug: { type: String, lowercase: true, unique: true },
    cnic: { type: String },
    username: { type: String, required: false },
    bio: { type: String, required: false, default: "" },
    ntn: {
      type: Number,
    },
    employeeSize: {
      type: Number,
    },

    roles: { type: [String] },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    isCompany: { type: Boolean, default: false },
    gender: { type: String, required: true, default: "male" },
    isAdmin: { type: Boolean, default: false },
    professions: {
      type: [professionSchema],
      validate: [arrayLimit, "exceeds the limit of 3"],
    },
    educations: {
      type: [educationSchema],
      validate: [arrayLimit, "exceeds the limit of 3"],
    },
    experiences: [experienceSchema],
    address: addressSchema,
    profileCompleted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", function (next) {
  let counter = 0;
  const isProfessions = this.professions && this.professions.length;
  const isAddress = this.address;
  const isExperiences = this.experiences && this.experiences.length;
  const isEducations = this.educations && this.educations.length;
  const isBio = this.bio && this.bio.length;
  if (isProfessions) {
    counter += 1;
  }
  if (isAddress) {
    counter += 1;
  }
  if (isExperiences) {
    counter += 1;
  }
  if (isEducations) {
    counter += 1;
  }
  if (isBio) {
    counter += 1;
  }
  this.profileCompleted = counter;
  next();
});

const User = mongoose.model("user", userSchema);
module.exports = User;
