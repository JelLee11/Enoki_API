const {
  scrapeLatestMangas,
  scrapePopularMangas,
  scrapeNewestMangas,
  scrapeCompletedMangas,
  scrapeMangaSearch,
  scrapeMangaDetails,
  scrapeChapterImages,
} = require("../scrappers/mangaFire");

const getPopularMangas = async (req, res) => {
  const page = req.params.page || 1;
  try {
    const data = await scrapePopularMangas(page);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

const getLatestMangas = async (req, res) => {
  const page = req.params.page || 1;
  try {
    const data = await scrapeLatestMangas(page);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};
const getNewestMangas = async (req, res) => {
  const page = req.params.page || 1;
  try {
    const data = await scrapeNewestMangas(page);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};
const getCompletedMangas = async (req, res) => {
  const page = req.params.page || 1;
  try {
    const data = await scrapeCompletedMangas(page);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

const getMangaSearch = async (req, res) => {
  const query = req.params.query || "attack on titan";
  try {
    const data = await scrapeMangaSearch(query);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

const getMangaDetails = async (req, res) => {
  const mangaId = req.params.mangaId;
  try {
    const data = await scrapeMangaDetails(mangaId);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

const getChapterImages = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await scrapeChapterImages(id);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

module.exports = {
  getLatestMangas,
  getCompletedMangas,
  getNewestMangas,
  getPopularMangas,
  getMangaSearch,
  getMangaDetails,
  getChapterImages,
};
