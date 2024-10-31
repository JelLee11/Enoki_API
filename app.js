const express = require("express");
const mangaNatoRoutes = require("./src/routes/mangaNatoRoutes");
const mangaFireRoutes = require("./src/routes/mangaBatRoutes");
const app = express();
const port = 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({
    message:
      "Welcome to the ultimate Manga API – delivering popular manga sources directly to your fingertips! Seamlessly access titles, chapters, and more from all your favorite manga sites, all through one powerful API",
  });
});

app.use("/manganato", mangaNatoRoutes);
app.use("/mangabat", mangaFireRoutes);

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
