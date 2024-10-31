const express = require("express");
const {
  getLatestMangas,
  getPopularMangas,
  getNewestMangas,
  getCompletedMangas,
  getMangaSearch,
  getMangaDetails,
  getChapterImages,
} = require("../controllers/mangaFireController");

const router = express.Router();

router.get("/latest/:page?", getLatestMangas);
router.get("/popular/:page?", getPopularMangas);
router.get("/newest/:page?", getNewestMangas);
router.get("/completed/:page?", getCompletedMangas);
router.get("/search/:query?", getMangaSearch);
router.get("/details/:mangaId?", getMangaDetails);
router.get("/read/:id", getChapterImages);

module.exports = router;
