const Proposal = require("./proposalModel.js");
const expressAsyncHandler = require("express-async-handler");

const getProposals = expressAsyncHandler(async (req, res) => {
  const proposal = await Proposal.find()
    .populate("company", ["username", "slug", "email"])
    .populate("job");
  res.json({ proposal });
});

const getUserProposals = expressAsyncHandler(async (req, res) => {
  const proposal = await Proposal.find({ applicant: req.user._id })
    .populate("company", ["username", "slug", "email"])
    .populate("jobPost");
  res.json({ proposal });
});

const getReceivedProposals = expressAsyncHandler(async (req, res) => {
  const proposal = await Proposal.find({
    company: req.user._id,
    isPending: true,
  })
    .populate("applicant", ["username", "slug", "email", "bio", "professions"])
    .populate("jobPost");
  res.json({ proposal });
});

const respondToProposal = expressAsyncHandler(async (req, res) => {
  const { proposalId, isAccepted, response } = req.body;
  const proposal = await Proposal.updateOne(
    { _id: proposalId, company: req.user._id },
    { $set: { isPending: false, isAccepted, response } }
  ).catch((err) => {
    console.log(err);
  });

  res.json({ msg: "success" });
});

const createProposal = expressAsyncHandler(async (req, res) => {
  const { companyId, jobId } = req.body;

  if (req.user.isCompany) {
    return res.json({ msg: "Please login as a job seeker to apply!" });
  }
  const proposalExists = await Proposal.findOne({
    jobPost: jobId,
    applicant: req.user._id,
  });
  if (proposalExists) {
    return res.json({ msg: "You already applied for this job!" });
  }
  if (req.user.profileCompleted < 5) {
    return res.json({
      msg: "Please complete your profile to apply for this job!",
    });
  }
  const proposal = await Proposal.create({
    company: companyId,
    jobPost: jobId,
    applicant: req.user._id,
  });
  res.json({ msg: "Successfully applied for the job!" });
});

module.exports = {
  createProposal,
  getUserProposals,
  getReceivedProposals,
  respondToProposal,
};
