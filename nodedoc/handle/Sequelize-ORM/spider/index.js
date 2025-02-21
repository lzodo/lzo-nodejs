const axios = require("axios");
const cheerio = require("cheerio");
const Book = require("../models/book");

async function getBookLinks(url) {
  const res = await axios.get(url);
  let data = res.data;
  let $ = cheerio.load(data);

  // name
  let links = [];
  $("h2.clearfix a").each((index, item) => {
    links.push(item.attribs.href);
  });

  return links;
}

async function getBookDetail(url) {
  const res = await axios.get(url);
  let data = res.data;
  let $ = cheerio.load(data);
  let bookInfo = {};

  // name
  bookInfo.name = $("#wrapper h1 span").text().trim();

  // imgurl
  $(".subjectwrap img").each((index, item) => {
    bookInfo.imgurl = $(item).attr("src");
  });

  // publishDate
  // author
  const spans = $("#info span.pl");
  const authorSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("作者");
  });
  bookInfo.author = authorSpan.next("a").text().trim();
  const publishSpan = spans.filter((i, ele) => {
    return $(ele).text().includes("出版年");
  });
  bookInfo.publishDate = publishSpan[0].nextSibling.nodeValue.trim();
  return bookInfo;
}

getBookLinks("https://book.douban.com/latest").then(async (links) => {
  //   console.log(links, 111);
  const books = [];
  (links || []).forEach((item, index) => {
    const bookInfo = getBookDetail(item);
    books.push(bookInfo);
  });
  console.log(books); // promises
  const bookInfos = await Promise.all(books);
  console.log(bookInfos);

  Book.bulkCreate(bookInfos);
});
