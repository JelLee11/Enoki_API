const cheerio = require("cheerio");
const axios = require("axios");

const baseUrl = "https://chapmanganato.to";

function scrapeCommonData(document) {
  const $ = cheerio.load(document);
  const mangaData = [];

  $(".content-genres-item").each((i, element) => {
    const id =
      $(element).find(".genres-item-name").attr("href").split("/").pop() || "";
    const title = $(element).find(".genres-item-name").attr("title") || "";
    const imageUrl = $(element).find(".genres-item-img img").attr("src") || "";
    const rating = $(element).find(".genres-item-rate").text() || "";
    const latestChapter = $(element).find(".genres-item-chap").text() || "";
    const latestChapterId =
      $(element)?.find(".genres-item-chap")?.attr("href")?.split("/")?.pop() ||
      "";
    const viewCount = $(element).find(".genres-item-view").text() || "";
    const releaseDate = $(element).find(".genres-item-time").text() || "";
    const author = $(element).find(".genres-item-author").text() || "";
    const description =
      $(element).find(".genres-item-description").text().trim() || "";

    mangaData.push({
      id,
      title,
      imageUrl,
      rating,
      latestChapter,
      latestChapterId,
      viewCount,
      releaseDate,
      author,
      description,
    });
  });

  return mangaData;
}

const scrapeMangaDetails = async (id) => {
  const url = `${baseUrl}/${id}`;
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let title = $(".story-info-right").find("h1").text().trim();
    $(".panel-story-info-description > h3").remove();
    let description = $(".panel-story-info-description").text().trim();

    let altTitles = $(".variations-tableInfo h2")
      .text()
      .split(";")
      .map((title) => title.trim());

    let authors = $(
      ".variations-tableInfo > tbody > tr:nth-child(2) > .table-value > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();

    let status = $(
      ".variations-tableInfo > tbody > tr:nth-child(3) > .table-value"
    )
      .text()
      .trim();

    let genres = $(
      ".variations-tableInfo > tbody > tr:nth-child(4) > .table-value > a"
    )
      .map((index, element) => $(element).text().trim())
      .get();

    let updated = $(".story-info-right-extent > p:nth-child(1) > .stre-value")
      .text()
      .trim();
    let views = $(".story-info-right-extent > p:nth-child(2) > .stre-value")
      .text()
      .trim();
    let rating = $("em[property='v:average']").text().trim();

    let chaptersDiv = $(
      ".panel-story-chapter-list > .row-content-chapter > .a-h"
    );
    let chapters = chaptersDiv
      .map((index, element) => {
        const chapterLink = $(element)
          .find(".chapter-name.text-nowrap")
          .attr("href");
        const chapterTitle = $(element)
          .find(".chapter-name.text-nowrap")
          .text()
          .trim();
        const views = $(element)
          .find(".chapter-view.text-nowrap")
          .text()
          .trim();
        const updated = $(element)
          .find(".chapter-time.text-nowrap")
          .text()
          .trim();

        return {
          id: chapterLink ? chapterLink.split("/").pop() : null,
          title: chapterTitle,
          views,
          updated,
        };
      })
      .get();

    let mangaDetails = {
      title,
      altTitles,
      description,
      authors,
      status,
      genres,
      updated,
      views,
      rating,
      chapters,
    };

    return mangaDetails;
  } catch (error) {
    console.error("Error fetching the page:", error);
    throw error;
  }
};

const scrapeChapterImages = async (mangaId, chapterId) => {
  const url = `${baseUrl}/${mangaId}/${chapterId}`;
  const { data } = await axios.get(url, {
    referrer: `${baseUrl}/`,
  });
  console.log(url);
  const $ = cheerio.load(data);

  let title = $(".panel-breadcrumb > a:nth-child(3)").text().trim();
  let currentChapter = $(".panel-breadcrumb > a:nth-child(5)").text().trim();
  let nextChapterId =
    $(".navi-change-chapter-btn-next")?.attr("href")?.split("/")?.pop() ?? "";
  let prevChapterId =
    $(".navi-change-chapter-btn-prev")?.attr("href")?.split("/")?.pop() ?? "";
  let chapterList = $(".container:nth-child(1) > .panel-navigation > select")
    .find("option")
    .map((index, element) => {
      const id = "chapter-" + $(element).attr("data-c");
      const title = $(element).text().trim();
      const isCurrent = $(element).attr("selected") !== undefined;

      return {
        id,
        title,
        isCurrent,
      };
    })
    .get();
  let images = $(".body-site")
    .find("img")
    .map((index, element) => {
      return {
        page: index,
        url: $(element).attr("src"),
      };
    })
    .get();

  return {
    message:
      "To get access of these images, you would need to add referrer of https://chapmanganato.to/ in your headers on image urls",
    result: {
      title,
      currentChapter,
      prevChapterId,
      nextChapterId,
      images,
      chapterList,
      totalImages: images.length,
    },
  };
};

const scrapeMangaSearch = async (query, page = 1) => {
  const formattedQuery = query.replace(/ /g, "_");
  const url = `https://manganato.com/search/story/${formattedQuery}`;

  try {
    const { data } = await axios.get(url);

    const $ = cheerio.load(data);
    const searchItems = $(".panel-search-story .search-story-item");

    const mangaList = searchItems
      .map((_, element) => {
        const titleElement = $(element).find(".item-title");
        const title = titleElement.text().trim() || "N/A";
        const link = titleElement.attr("href") || "";
        const imageUrl = $(element).find(".item-img img").attr("src") || "";
        const rating = $(element).find(".item-rate").text().trim() || "N/A";
        const author = $(element).find(".item-author").text().trim() || "N/A";
        const updatedElement = $(element).find(".item-time");

        const updatedAt =
          updatedElement.length > 0
            ? updatedElement.eq(0).text().replace("Updated :", "").trim()
            : "N/A";
        const views =
          updatedElement.length > 1
            ? updatedElement.eq(1).text().replace("View :", "").trim()
            : "N/A";

        const chapters = $(element)
          .find(".item-chapter")
          .map((_, chapterEl) => {
            const chapterTitle = $(chapterEl)?.text()?.trim() || "";
            const chapterLink = $(chapterEl).attr("href") || "";
            const chapterId = chapterLink?.split("/")?.pop() || "";

            return {
              chapterTitle,
              chapterId,
            };
          })
          .get();

        return {
          id: link.split("/").pop(),
          title,
          image: imageUrl,
          chapters,
          rating,
          author,
          updatedAt,
          views,
        };
      })
      .get();

    return mangaList;
  } catch (error) {
    console.error("Error occurred while scraping search data:", error.message);
    return [];
  }
};

const scrapeLatestMangas = async (page = 1) => {
  const url = "https://manganato.com/genre-all/" + page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapePopularMangas = async (page = 1) => {
  const url = "https://manganato.com/genre-all/" + page + "?type=topview";
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapeNewestMangas = async (page = 1) => {
  const url = "https://manganato.com/genre-all/" + page + "?type=newest";
  console.log(url);
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapeCompletedMangas = async (page = 1) => {
  const url =
    "https://manganato.com/advanced_search?s=all&sts=completed&orby=topview&page=" +
    page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

module.exports = {
  scrapeMangaDetails,
  scrapeChapterImages,
  scrapeLatestMangas,
  scrapeCompletedMangas,
  scrapeLatestMangas,
  scrapeNewestMangas,
  scrapePopularMangas,
  scrapeMangaSearch,
};
