const Job = require("./jobModel.js");

const expressAsyncHandler = require("express-async-handler");
const getJobs = expressAsyncHandler(async (req, res) => {
  const jobs = await Job.find().populate("company", [
    "username",
    "slug",
    "email",
  ]);
  res.json({ jobs });
});

const getJob = expressAsyncHandler(async (req, res) => {
  const job = await Job.findOne({ slug: req.params["slug"] }).populate(
    "company",
    ["username", "slug", "email"]
  );
  res.json({ job });
});

const getJobsByCompany = expressAsyncHandler(async (req, res) => {
  const slug = req.params["companySlug"];
  const jobs = await Job.find({ companySlug: slug }).populate("company", [
    "username",
    "slug",
    "email",
  ]);
  res.json({ jobs });
});

const getCategories = expressAsyncHandler(async (req, res) => {
  const categories = await Job.find().distinct("profession");
  res.json({ categories });
});

const postJob = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  if (!req.user.isCompany) {
    return res.status(403).json({ msg: "not authorized", success: 0 });
  }
  const {
    title,
    salaryFrom,
    salaryTo,
    jobType,
    profession,
    subProfession,
    shortDesc,
    country,
    state,
    city,
    longDesc,
    paymentType,
    currency,
  } = req.body;
  console.log(req.user);
  const jobPost = {
    company: req.user._id,
    companySlug: req.user.slug,
    title,
    shortDesc,
    longDesc,
    salaryFrom,
    salaryTo,
    jobType,
    country,
    state,
    city,
    profession,
    subProfession,
    paymentType,
    currency,
  };
  console.log(jobPost);

  var job = new Job(jobPost);
  job.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(403).json({ msg: "something went wrong", success: 0 });
    }
    console.log(job);
    res.status(201).send({
      msg: "Job posted",
      job,
      success: true,
    });
  });
});

module.exports = {
  postJob,
  getJobs,
  getJob,
  getJobsByCompany,
  getCategories,
};
