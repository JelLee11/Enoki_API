const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://mangafire.to";

const extractMangaData = (html) => {
  const $ = cheerio.load(html);
  const mangaData = [];

  $(".original.card-lg")
    .children()
    .each((_, element) => {
      const item = $(element);

      const title = item.find(".info a").first().text().trim();
      const type = item.find(".type").text().trim();
      const image = item.find(".poster img").attr("src");
      const chapters = [];

      item.find('.content[data-name="chap"] li').each((_, chapElement) => {
        const chapter = $(chapElement);
        const chapterTitle = chapter.find("span").first().text().trim();
        const chapterDate = chapter.find("span").last().text().trim();

        chapters.push({
          title: chapterTitle,
          date: chapterDate,
        });
      });

      mangaData.push({
        title,
        type,
        image,
        chapters,
      });
    });

  return mangaData;
};

const scrapeLatestMangas = async () => {
  const url = `${baseUrl}/filter?keyword=&sort=trending`;
  try {
    const { data: html } = await axios.get(url);
    return extractMangaData(html);
  } catch (error) {
    console.error("Error fetching latest mangas:", error);
    return [];
  }
};

const scrapeCompletedMangas = async () => {
  const url = `${baseUrl}/filter?keyword=&status%5B%5D=completed&sort=most_viewed`;
  try {
    const { data: html } = await axios.get(url);
    return extractMangaData(html);
  } catch (error) {
    console.error("Error fetching completed mangas:", error);
    return [];
  }
};

const scrapeNewestMangas = async () => {
  const url = `${baseUrl}/filter?keyword=&sort=recently_updated`;
  try {
    const { data: html } = await axios.get(url);
    return extractMangaData(html);
  } catch (error) {
    console.error("Error fetching newest mangas:", error);
    return [];
  }
};

const scrapePopularMangas = async () => {
  const url = `${baseUrl}/filter?keyword=&sort=most_viewed`;
  try {
    const { data: html } = await axios.get(url);
    return extractMangaData(html);
  } catch (error) {
    console.error("Error fetching popular mangas:", error);
    return [];
  }
};

const scrapeMangaSearch = async (query) => {
  const formattedQuery = query.replace(" ", "+");
  const url = `${baseUrl}/filter?keyword=${formattedQuery}`;
  try {
    const { data: html } = await axios.get(url);
    return extractMangaData(html);
  } catch (error) {
    console.error("Error fetching popular mangas:", error);
    return [];
  }
};

const scrapeMangaDetails = async (mangaId) => {
  const url = `${baseUrl}/manga/${mangaId}`;

  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const dataId = mangaId.split(".").pop();

    const manga = {
      title: $('h1[itemprop="name"]').text().trim(),
      altTitles: $("h6").text().trim(),
      status: $(".info p").text().trim(),
      image: $(".poster img").attr("src"),
      description: $(".description").text().trim(),
      type: $(".min-info a").first().text().trim(),
      bookmarks: $(".min-info span").first().text().trim(),
      score: $(".min-info b").text().trim(),
      rating: $(".rating-box .live-score").text().trim(),
      totalReviews: $(".rating-box .live-label").text().trim(),
      authors: $('.meta span:contains("Author")')
        .next()
        .find("a")
        .map((i, el) => $(el).text().trim())
        .get(),
      published: $('.meta span:contains("Published")').next().text().trim(),
      genres: $('.meta span:contains("Genres")')
        .next()
        .find("a")
        .map((i, el) => $(el).text().trim())
        .get(),
      magazine: $('.meta span:contains("Mangazines")')
        .next()
        .find("a")
        .text()
        .trim(),
    };

    const chapterList = await fetchMangaChapters(dataId);

    return {
      dataId,
      ...manga,
      chapterList,
    };
  } catch (error) {
    console.error("Error scraping manga info:", error.message);
    return {};
  }
};

const fetchMangaChapters = async (id) => {
  const url = `https://mangafire.to/ajax/read/${id}/chapter/en`;
  const { data } = await axios.get(url);

  const html = data.result.html.toString();
  const $ = cheerio.load(html);

  const chapters = [];
  $("ul li a").each((i, element) => {
    const dataNumber = $(element).attr("data-number");
    const dataId = $(element).attr("data-id");
    const title = $(element).attr("title").trim();

    const chapter = {
      id: `${dataId}`,
      title: "Chapter " + dataNumber + ": " + title.trimStart(),
    };
    chapters.push(chapter);
  });

  return chapters;
};

const scrapeChapterImages = async (id) => {
  const url = "https://mangafire.to/ajax/read/chapter/" + id;
  const { data } = await axios.get(url);
  const images = data.result.images.map((arr) => arr[0]);
  return {
    images,
  };
};

module.exports = {
  scrapeCompletedMangas,
  scrapeLatestMangas,
  scrapeNewestMangas,
  scrapePopularMangas,
  scrapeMangaSearch,
  scrapeMangaDetails,
  scrapeChapterImages,
};
