const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../../auth/generateToken.js");
const { validationResult } = require("express-validator");
const Proposal = require("../proposal/proposalModel");
const createSlug = require("../../utils/createSlug");
//const authToken = require("../utils/authToken.js");
const User = require("./userModel.js");
const bcrypt = require("bcrypt");

const handleError = (err) => {
  res.status(err.code).json({ msg: err.message, success: 0 });
};

const check = expressAsyncHandler(async (req, res) => {
  return res.send({
    user: {
      slug: req.user.slug,
      _id: req.user._id,
      email: req.user.email,
      username: req.user.username,
      token: generateToken(req.user),
      isCompany: req.user.isCompany,
      isAdmin: req.user.isAdmin,
    },

    msg: "Logged in Successfully",
    success: 1,
  });
});

const signin = expressAsyncHandler(async (req, res) => {
  let { email, password } = req.body;

  email = email.toLowerCase();
  const user = await User.findOne({ email });
  if (user === null) {
    return res.json({ msg: "user not exists", success: 0 });
  }

  if (bcrypt.compareSync(password, user.password)) {
    return res.send({
      user: {
        slug: user.slug,
        _id: user._id,
        email: user.email,
        username: user.username,
        token: generateToken(user),
        isCompany: user.isCompany,
        isAdmin: user.isAdmin,
      },

      msg: "Logged in Successfully",
      success: 1,
    });
  }
  return res.status(401).send({ msg: "Invalid email or password", success: 0 });
});
const info = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ slug: req.params["slug"] });
  let proposalCount = 0;
  res.json({
    user: {
      proposalCount,
      bio: user.bio,
      slug: user.slug,
      _id: user._id,
      phone: user.phone,
      username: user.username,
      email: user.email,
      cnic: user.cnic,
      ntn: user.ntn,
      gender: user.gender,
      employeeSize: user.employeeSize,
      professions: user.professions,
      educations: user.educations,
      experiences: user.experiences,
      address: user.address,
      profileCompleted: user.profileCompleted,
      isCompany: user.isCompany,
      isAdmin: user.isAdmin,
    },
  });
});
const signup = expressAsyncHandler(async (req, res, next) => {
  let { email, password, username, phone, cnic, address, isCompany } = req.body;
  if (email == "") return res.json({ msg: "empty email", success: 0 });
  if (password == "") return res.json({ msg: "empty password", success: 0 });
  if (req.body.username == "")
    return res.json({ msg: "empty name", success: 0 });
  const emailExists = await User.exists({
    email,
  });

  if (emailExists) {
    return res.json({ msg: "Email already registered", success: 0 });
  }
  let roles = [];
  if (isCompany) {
    roles.push("company");
  }
  const newEmail = email.toLowerCase();
  console.log(req.body);
  const slug = createSlug(username);
  const user = await User.create({
    username,
    roles,
    email: newEmail,
    phone,
    slug,
    cnic,
    address,
    isCompany,
    password: bcrypt.hashSync(password, 8),
  });

  return res.send({
    user: {
      slug: user.slug,
      _id: user._id,
      email: user.email,
      username: user.username,
      token: generateToken(user),
      isCompany: user.isCompany,
      isAdmin: user.isAdmin,
    },
    msg: `Registered Successfully as ${isCompany ? "Employer" : "Job Seeker"}`,
    success: 1,
  });
});

const addProfession = expressAsyncHandler(async (req, res) => {
  const { profession, subProfession, skillLevel } = req.body;

  const userEmail = req.user.email;

  const user = await User.findOne({ email: userEmail });
  if (user) {
    try {
      const newProfession = {
        profession,
        subProfession,
        skillLevel,
      };
      user.professions.push(newProfession);
      const updatedUser = await user.save();
      res.status(201).send({
        success: 1,
        msg: "Profession added",
        profession: updatedUser.professions[updatedUser.professions.length - 1],
      });
    } catch (e) {
      console.log(e.message);
      return res.json({ msg: e.message, success: 0 });
    }
  } else {
    res.status(404).json({ msg: "User Not Found", success: 0 });
  }
});
const deleteProfession = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.professions.id(req.params["id"]).remove();
  await user.save();
  res.json({ msg: "successfully removed" });
});
const updateProfession = expressAsyncHandler(async (req, res) => {
  const { id, profession, subProfession, skillLevel } = req.body;

  const userEmail = req.user.email;
  const newProfession = {
    profession,
    subProfession,
    skillLevel,
  };
  const user = await User.findOneAndUpdate(
    { email: userEmail, "professions._id": id },
    {
      $set: { "professions.$": newProfession },
    }
  );
  if (user) {
    try {
      const updatedUser = await user.save();
      res.status(202).send({
        success: 1,
        msg: "Profession updated",
      });
    } catch (e) {
      console.log(e.message);
      return res.json({ msg: e.message, success: 0 });
    }
  } else {
    res.status(404).json({ msg: "User Not Found", success: 0 });
  }
});

const editProfile = expressAsyncHandler(async (req, res) => {
  const { bio } = req.body;

  const user = await User.updateOne(
    { _id: req.user._id },
    {
      $set: { bio },
    }
  ).catch((err) => {
    res.json({ msg: "Couldn't update" });
    console.log(err);
  });
  res.json({ msg: "successfully updated profile" });
});

const addEducation = expressAsyncHandler(async (req, res) => {
  const { university, degree, cgpa, outOf, startYear, endYear } = req.body;
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    const education = { university, degree, cgpa, outOf, startYear, endYear };
    user.educations.push(education);
    const updatedUser = await user.save();
    res.status(201).send({
      message: "Education Added",
      education: updatedUser.educations[updatedUser.educations.length - 1],
    });
  } else {
    res.status(404).json({ msg: "Please log in again" });
  }
});
const addExperience = expressAsyncHandler(async (req, res, next) => {
  const { company, description, startYear, endYear } = req.body;
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    const experience = { company, description, startYear, endYear };
    user.experiences.push(experience);

    const updatedUser = await user.save();
    res.status(201).send({
      msg: "Experience added!",
      experience: updatedUser.experiences[updatedUser.experiences.length - 1],
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});

const deleteExperience = expressAsyncHandler(async (req, res, next) => {
  const { company, description, start, end } = req.body;
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    const experience = { company, description, start, end };
    user.experiences.push(experience);
    const updatedUser = await user.save();
    res.status(201).send({
      message: "Review Created",
      experience: updatedUser.experiences[updatedUser.experiences.length - 1],
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});

const addAddress = expressAsyncHandler(async (req, res) => {
  const { country, state, city, address1, address2, address3 } = req.body;
  const userEmail = req.user.email;
  const user = await User.findOne({ email: userEmail });
  if (user) {
    const newAddress = {
      country,
      state,
      city,
      address1,
      address2,
      address3,
    };
    user.address = newAddress;
    const updatedUser = await user.save();
    res.status(201).send({
      message: "Address added",
      address: updatedUser.address,
    });
  } else {
    res.status(404).json({ msg: "User Not Found" });
  }
});
module.exports = {
  check,
  signin,
  signup,
  addProfession,
  updateProfession,
  addEducation,
  deleteProfession,
  addExperience,
  addAddress,
  info,
  editProfile,
};
