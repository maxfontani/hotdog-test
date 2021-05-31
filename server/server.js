require("dotenv").config();
const express = require("express");
const knexConfig = require("./db/knex");
const knex = require("knex")(knexConfig);
const path = require("path");
const migrateSeedDB = require("./db/utils");
const {
  handleGetData,
  handleAddHotdog,
  handleDeleteHotdog,
  handleEditHotdog,
} = require("./controllers/db");

const app = express();
const PORT = process.env.PORT || 5001;

// Migrate the DB and seed data
migrateSeedDB(knex, knexConfig);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Priority serve any static files.
app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/", function (req, res) {
  res.sendFile(path.join(path.resolve(__dirname, "../client/build")));
});

// Answer API requests.
app.get("/api", function (req, res) {
  res.set("Content-Type", "application/json");
  res.send('{"message":"Hello from the custom server!"}');
});

app.get("/api/getdata", (req, res) => handleGetData(req, res, knex));

app.post("/api/hotdogs", (req, res) => handleAddHotdog(req, res, knex));
app.post("/api/hotdogs/delete", (req, res) =>
  handleDeleteHotdog(req, res, knex)
);
app.post("/api/hotdogs/:id", (req, res) => handleEditHotdog(req, res, knex));

app.listen(PORT, () => {
  console.log(`Node listening on port ${PORT}`);
});

// All remaining requests return the React app, so it can handle routing.
// app.get("/*", function (request, response) {
//   response.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
// });
