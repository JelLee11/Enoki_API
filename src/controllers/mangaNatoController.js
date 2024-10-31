const {
  scrapeMangaDetails,
  scrapeChapterImages,
  scrapeLatestMangas,
  scrapeNewestMangas,
  scrapeCompletedMangas,
  scrapePopularMangas,
  scrapeMangaSearch,
} = require("../scrappers/mangaNato");

const getMangaDetailsMangaNato = async (req, res) => {
  const mangaId = req.params.id;
  try {
    const data = await scrapeMangaDetails(mangaId);
    res.send(data);
  } catch (error) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

const getMangaChapterImages = async (req, res) => {
  const mangaId = req.params.mangaId;
  const chapterId = req.params.id;

  try {
    const data = await scrapeChapterImages(mangaId, chapterId);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: "Error fetching the manga details from MangaNato.",
    });
  }
};

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
  const page = req.params.page || 1;
  try {
    const data = await scrapeMangaSearch(query, page);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      error: `Error fetching the manga details from MangaNato : ${err}`,
    });
  }
};

module.exports = {
  getMangaDetailsMangaNato,
  getMangaChapterImages,
  getLatestMangas,
  getCompletedMangas,
  getNewestMangas,
  getPopularMangas,
  getMangaSearch,
};
