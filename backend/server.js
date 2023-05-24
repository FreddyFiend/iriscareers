const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

const cors = require("cors");
app.use(cors());

const { Country, State, City } = require("country-state-city");

app.use(express.json());
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Database is connected !");
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

const userRoutes = require("./api/user/userRoutes.js");
app.use("/user", userRoutes);

const jobRoutes = require("./api/jobs/jobRoutes.js");
app.use("/job", jobRoutes);

const proposalRoutes = require("./api/proposal/proposalRoutes.js");
app.use("/proposal", proposalRoutes);

//Error handler??
/* 
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
}); */
app.use(express.static("public"));
app.use(express.json());

const hostname = "127.0.0.1";
const PORT = process.env.PORT;

//const port = process.env.PORT;
/* 
console.log("boi");
db.sequelize
  .authenticate()
  .then((result) => {
    app.listen(PORT, () => {
      console.log(`listening on: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
*/
app.listen(PORT, async () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  /*  const allCountries = await Country.getAllCountries();
  console.log(allCountries);
  const allStates = await State.getStatesOfCountry("PK");
  console.log(allStates);
  const allCities = await City.getCitiesOfState("PK", "SD");
  console.log(allCities); */
});
