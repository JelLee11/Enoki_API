const axios = require("axios");
const cheerio = require("cheerio");

const baseUrl = "https://chapmanganato.to/";

function scrapeCommonData(document) {
  const $ = cheerio.load(document);
  const mangaData = [];

  $(".list-truyen-item-wrap").each((i, element) => {
    const id =
      $(element).find("a.list-story-item").attr("href").split("/").pop() || "";
    const title = $(element).find("h3 a").text().trim() || "";
    const image = $(element).find("a.list-story-item img").attr("src") || "";
    const latestChapter =
      $(element).find("a.list-story-item-wrap-chapter").text().trim() || "";
    const latestChapterId =
      $(element)
        .find("a.list-story-item-wrap-chapter")
        .attr("href")
        ?.split("/")
        .pop() || "";
    const viewCount = $(element).find(".aye_icon").text().trim() || "";
    const description =
      $(element).find("p").text().split("More")[0].trim() || "";

    mangaData.push({
      id,
      title,
      image,
      latestChapter,
      latestChapterId,
      viewCount,
      description,
    });
  });

  return mangaData;
}

const scrapeMangaDetails = async (id) => {
  const url = `${baseUrl}${id}`;
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

async function scrapeMangaSearch(query) {
  const formattedQuery = query.replace(/ /g, "_");
  const url = `https://mangakakalot.com/search/story/${formattedQuery}`;
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const mangaList = [];

      $(".story_item").each((_, element) => {
        const titleElement = $(element).find(".story_name > a");
        const title = titleElement.text().trim();
        const link = titleElement.attr("href");
        const image = $(element).find("img").attr("src");
        const author = $(element)
          .find("span")
          .eq(0)
          .text()
          .replace("Author(s) : ", "")
          .trim();
        const updated = $(element)
          .find("span")
          .eq(1)
          .text()
          .replace("Updated : ", "")
          .trim();
        const views = $(element)
          .find("span")
          .eq(2)
          .text()
          .replace("View : ", "")
          .trim();

        mangaList.push({
          id: link.split("/")[3],
          title: title,
          image: image,
          author: author,
          updated: updated,
          views: views,
        });
      });
      return mangaList;
    } else {
      throw new Error("Failed to load manga search results");
    }
  } catch (error) {
    console.log("Error occurred while fetching search results:", error.message);
    return [];
  }
}

async function scrapeChapterImages(mangaId, chapterId) {
  const url = `${baseUrl}${mangaId}/${chapterId}`;
  let index = 0;

  try {
    const response = await axios.get(url, {
      headers: { Referer: baseUrl },
    });
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const title = $(".panel-chapter-info-top h1")
        .text()
        .split("chapter")[0]
        .trim()
        .toUpperCase();
      const currentChapter =
        "Chapter" +
        $(".panel-chapter-info-top h1")
          .text()
          .split("chapter")[1]
          .toUpperCase();

      const chapterListIds = $(".navi-change-chapter option")
        .map((_, option) => ({
          id: `chapter-${$(option).attr("data-c")}`,
          name: $(option).text().trim(),
        }))
        .get();

      const images = $(".container-chapter-reader img")
        .map((_, img) => {
          const imgUrl = $(img).attr("src");
          index++;
          return {
            title: $(img).attr("title") || "",
            image: imgUrl,
          };
        })
        .get();

      const nextChapterLink =
        $(".navi-change-chapter-btn .navi-change-chapter-btn-next").attr(
          "href"
        ) || "";
      const prevChapterLink =
        $(".navi-change-chapter-btn .navi-change-chapter-btn-prev").attr(
          "href"
        ) || "";

      const assets = {
        title: title,
        currentChapter: currentChapter,
        nextChapterId: nextChapterLink.split("/").pop(),
        prevChapterId: prevChapterLink.split("/").pop(),
        chapterListIds: chapterListIds,
        images: images,
        totalImages: index,
      };

      return assets;
    } else {
      console.log(
        `Failed to load chapter details, status code: ${response.status}`
      );
      return {};
    }
  } catch (error) {
    console.log("Error:", error.message);
    return {};
  }
}

const scrapeLatestMangas = async (page = 1) => {
  const url =
    "https://mangakakalot.com/manga_list?type=latest&category=all&state=all&page=" +
    page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapePopularMangas = async (page = 1) => {
  const url =
    "https://mangakakalot.com/manga_list?type=topview&category=all&state=all&page=" +
    page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapeNewestMangas = async (page = 1) => {
  const url =
    "https://mangakakalot.com/manga_list?type=newest&category=all&state=all&page=" +
    page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

const scrapeCompletedMangas = async (page = 1) => {
  const url =
    "https://mangakakalot.com/manga_list?type=newest&category=all&state=Completed&page=" +
    page;
  const { data } = await axios.get(url);
  return scrapeCommonData(data);
};

module.exports = {
  scrapeChapterImages,
  scrapeMangaSearch,
  scrapeMangaDetails,
  scrapeLatestMangas,
  scrapeCompletedMangas,
  scrapeNewestMangas,
  scrapePopularMangas,
};
