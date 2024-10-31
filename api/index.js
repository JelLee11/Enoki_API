const express = require("express");
const mangaNatoRoutes = require("../src/routes/mangaNatoRoutes");
const mangaBatRoutes = require("../src/routes/mangaBatRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message:
      "Welcome to the ultimate Manga API – delivering popular manga sources directly to your fingertips!",
  });
});

app.use("/manganato", mangaNatoRoutes);
app.use("/mangabat", mangaBatRoutes);
module.exports = app;
