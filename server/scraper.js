const puppeteer = require("puppeteer");
const fs = require("fs");
const {
  getStyleAtt,
  getPropertyValues,
  removeUnwanted,
  getAttachedElements,
  log,
} = require("./helper");

async function scrapeProduct(config) {
  let scrapedData = [];
  console.log("scraper launched...");
  log(config.website_name, "scraper launched...");
  const browser = await puppeteer.launch({
    headless: false /*, args: ['--start-fullscreen']*/,
  });
  const page = await browser.newPage();
  await page.goto(config.website_url, {
    timeout: 240000,
    waitUntil: "networkidle0",
  });

  //get links of all startups in page
  const companies = await page.$x(config.params.profileLinksXpath);
  let urls = await getPropertyValues(companies, "href");
  //support pagination
  // get all pages links, navigate into these pages, collect each page startup links, push them to urls array
  if (config.params.pagination.isPaginated) {
    let nextPageIsVisible = true;
    let i = 0;
    while (nextPageIsVisible) {
      page.click(config.params.pagination.nextPageSelector);
      await page
        .waitForNavigation({
          waitUntil: "networkidle0",
          timeout: 30000,
        })
        .catch(() => {});
      await page.waitFor(config.params.slowScraping);
      const currentPageCompanies = await page.$x(
        config.params.profileLinksXpath
      );
      const currentPageUrls = await getPropertyValues(
        currentPageCompanies,
        "href"
      );
      urls.push(...currentPageUrls);
      currentTime = new Date();
      log += `${currentTime.getHours()} : ${currentTime.getMinutes()} : ${currentTime.getSeconds()} // get profile urls of page : ${page.url()}\n`;
      await page
        .waitForSelector(config.params.pagination.nextPageSelector, {
          visible: true,
          timeout: 10000,
        })
        .catch(() => {});

      let nextPageEl = await page.$$(config.params.pagination.nextPageSelector);
      let [display] = await getStyleAtt(page, nextPageEl, "display");
      let [visibility] = await getStyleAtt(page, nextPageEl, "visibility");
      nextPageIsVisible =
        display != "none" && visibility != "hidden" && nextPageEl.length > 0;
      i++;
      console.log(i, urls.length);
      if (i == 3) break;
    }
  }
  //get attached data
  let attachedData = getAttachedElements(config.data);
  //go to each link in urls and scrape data from it
  for (let i = 0; i < 4 /*urls.length*/; i++) {
    console.log("go to url : " + urls[i]);
    log(config.website_name, `go to url : ${urls[i]}`);
    await page.goto(urls[i], { timeout: 240000, waitUntil: "networkidle0" });
    await page.waitFor(config.params.slowScraping);
    let startupData = [];
    for (let item of config.data) {
      let startupAttName = item.key;
      let startupAttValue = item.params.defaultValue;
      if (item.xpath && item.xpath != "") {
        const elements = await page.$x(item.xpath);
        if (elements.length > 0) {
          if (item.params.multipleValues) {
            if (item.params.dataFrom.key == "style") {
              startupAttValue = await getStyleAtt(
                page,
                elements,
                item.params.dataFrom.value
              );
            } else
              startupAttValue = await getPropertyValues(
                elements,
                item.params.dataFrom.value
              );
          } else {
            if (item.params.dataFrom.key == "style") {
              [startupAttValue] = await getStyleAtt(
                page,
                elements,
                item.params.dataFrom.value
              );
            } else
              [startupAttValue] = await getPropertyValues(
                elements,
                item.params.dataFrom.value
              );
          }
        }
      }
      startupData.push({ startupAttName, startupAttValue });
    }

    let startup = {};
    for (let item of startupData) {
      for (let element of config.data) {
        if (
          element.params.splittable.possible &&
          item.startupAttName == element.key
        ) {
          item.startupAttValue = item.startupAttValue.split(
            element.params.splittable.delimiter
          );
        }
        if (
          element.params.removable.possible &&
          item.startupAttName == element.key
        ) {
          item.startupAttValue = removeUnwanted(
            item.startupAttValue,
            element.params.removable.values,
            element.params.defaultValue
          );
        }
      }
      attachedData.forEach((value) => {
        if (item.startupAttName == value.key) {
          if (item.startupAttValue.length > 1)
            item.startupAttValue = item.startupAttValue[0];
          else item.startupAttValue = "--";
        }

        if (item.startupAttName == value.attachedTo) {
          if (item.startupAttValue.length > 1)
            item.startupAttValue = item.startupAttValue[1];
          else if (item.startupAttValue.length == 1)
            item.startupAttValue = item.startupAttValue[0];
          else item.startupAttValue = "--";
        }
      });
      startup[item.startupAttName] = item.startupAttValue;
    }
    scrapedData.push(startup);
    console.log(`url : ${urls[i]} scraped successfully`);
    log(config.website_name, `url : ${urls[i]} scraped successfully`);
  }
  await browser.close();
  log(config.website_name, "scraper finished");
  return scrapedData;
}

exports.scrapeProduct = scrapeProduct;
