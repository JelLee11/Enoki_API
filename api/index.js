const express = require("express");
const mangaNatoRoutes = require("../src/routes/mangaNatoRoutes");
const mangaBatRoutes = require("../src/routes/mangaBatRoutes");
const mangaKakalotRoutes = require("../src/routes/mangaKakalotRoutes");
const mangaFireRoutes = require("../src/routes/mangaFireRoutes");
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
app.use("/mangakakalot", mangaKakalotRoutes);
app.use("/mangafire", mangaFireRoutes);

module.exports = app;
