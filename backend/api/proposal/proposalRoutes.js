const express = require("express");
const authToken = require("../../auth/authToken");
const proposalRouter = express.Router();

const proposalController = require("./proposalController.js");

proposalRouter.post("/", authToken(), proposalController.createProposal);

proposalRouter.get(
  "/receivedproposals",
  authToken(),
  proposalController.getReceivedProposals
);
proposalRouter.patch(
  "/respond",
  authToken(),
  proposalController.respondToProposal
);
proposalRouter.get(
  "/myproposals",
  authToken(),
  proposalController.getUserProposals
);

module.exports = proposalRouter;
