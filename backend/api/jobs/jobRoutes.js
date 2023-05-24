const express = require("express");
const authToken = require("../../auth/authToken");
const jobRouter = express.Router();

const jobController = require("./jobController.js");

// /job

jobRouter.get("/bycompany/:companySlug", jobController.getJobsByCompany);
jobRouter.get("/", jobController.getJobs);
jobRouter.get("/cat", jobController.getCategories);
jobRouter.get("/:slug", jobController.getJob);

jobRouter.post("/", authToken(["company"]), jobController.postJob);

module.exports = jobRouter;
