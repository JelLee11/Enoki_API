const express = require("express");
const {
  getMangaDetailsMangaNato,
  getMangaChapterImages,
  getLatestMangas,
  getPopularMangas,
  getNewestMangas,
  getCompletedMangas,
} = require("../controllers/mangaNatoController");

const router = express.Router();

router.get("/details/:id", getMangaDetailsMangaNato);
router.get("/read/:mangaId/:id", getMangaChapterImages);
router.get("/latest/:page?", getLatestMangas);
router.get("/popular/:page?", getPopularMangas);
router.get("/newest/:page?", getNewestMangas);
router.get("/completed/:page?", getCompletedMangas);

module.exports = router;
