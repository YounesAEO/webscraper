const fs = require("fs");
//function for creating log files
function log(filename, message, flag = "a") {
  const output = fs.createWriteStream(`./src/files/${filename}.log`, {
    flags: flag,
  });

  const currentTime = new Date();
  const log = new console.Console(output);
  log.log(
    currentTime.getHours() +
      ":" +
      currentTime.getMinutes() +
      ":" +
      currentTime.getSeconds() +
      " // " +
      message +
      "\n"
  );
}
//get property value of an html element.
//arguments are the page context and the xpath of the element and html attribute
async function getPropertyValue(page, x, prop) {
  const [element] = await page.$x(x);
  if (element) {
    const txt = await element.getProperty(prop);
    const title = await txt.jsonValue();
    if (title && title != "") return title;
    else return "--";
  } else {
    throw Error("Element doesn't exist ");
  }
}

//a function that takes an array of dom elements
//and returns an array of a property values of these elements
async function getPropertyValues(elements, prop) {
  let values = [];
  if (Array.isArray(elements)) {
    if (elements.length > 0) {
      for (let element of elements) {
        const txt = await element.getProperty(prop);
        const title = await txt.jsonValue();
        if (title && title != "") values.push(title);
        else values.push("--");
      }
    }
  } else {
    throw Error("Argument is not an array");
  }
  return values;
}

//getting url from a background image
async function getStyleAtt(page, elements, styleAtt) {
  let styleValues = [];
  if (elements.length > 0) {
    for (element of elements) {
      let styleValue = await page.evaluate(
        (element, styleAtt) => {
          if (styleAtt == "background-image") {
            const elementVal = window
              .getComputedStyle(element)
              .getPropertyValue(styleAtt)
              .match(/"([^']+)"/)[1];
            return elementVal;
          } else {
            const elementVal = window
              .getComputedStyle(element)
              .getPropertyValue(styleAtt);
            return elementVal;
          }
        },
        element,
        styleAtt
      );
      styleValues.push(styleValue);
    }
  }

  return styleValues;
}
//scroll into element and click it
async function clickButton(page, selector) {
  await page.$eval(selector, (el) => {
    el.scrollIntoViewIfNeeded(true);
  });
  await page.waitFor(1000);
  await page.click(selector);
}
async function getCorrectXpath(page, xpaths) {
  for (let i = 0; i < xpaths.length; i++) {
    const element = await page.$x(xpaths[i]);
    if (element.length != 0) {
      return i;
    }
  }
}

//replace default values with --
function removeDefaults(startupAtt, defaultValues) {
  if (defaultValues.indexOf(startupAtt.startupAttValue) > -1) {
    startupAtt.startupAttValue = "--";
  }
}
//remove elements of a given value from array
function removeUnwanted(startupAttValue, val, defaultVal) {
  if (Array.isArray(startupAttValue)) {
    let startupAttValueToLower = startupAttValue.map((value) => {
      return value.toLowerCase();
    });
    if (Array.isArray(val)) {
      for (let value of val) {
        let index = startupAttValueToLower.indexOf(value.toLowerCase());
        while (index > -1) {
          startupAttValue.splice(index, 1);
          startupAttValueToLower.splice(index, 1);
          index = startupAttValueToLower.indexOf(value.toLowerCase());
        }
      }
    } else {
      let index = startupAttValueToLower.indexOf(val.toLowerCase());
      while (index > -1) {
        startupAttValue.splice(index, 1);
        startupAttValueToLower.splice(index, 1);
        index = startupAttValueToLower.indexOf(val.toLowerCase());
      }
    }
    if (startupAttValue.length == 0) startupAttValue = defaultVal;
  } else {
    if (Array.isArray(val)) {
      for (let value of val) {
        if (startupAttValue.toLowerCase() == value.toLowerCase()) {
          startupAttValue = defaultVal;
        }
      }
    } else {
      if (startupAttValue.toLowerCase() == val.toLowerCase()) {
        startupAttValue = defaultVal;
      }
    }
  }
  return startupAttValue;
}
//look for elements in config file
//that have the same xpath and return them in an array
function getAttachedElements(data) {
  let attached = [];
  let visited = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length; j++) {
      if (
        data[i].xpath == data[j].xpath &&
        data[i].xpath != null &&
        data[i].key != data[j].key &&
        visited != data[i].key
      ) {
        let key = data[i].key;
        let attachedTo = data[j].key;
        let xpath = data[i].xpath;
        attached.push({ key, attachedTo, xpath });
        visited = attachedTo;
      }
    }
  }

  return attached;
}

exports.getStyleAtt = getStyleAtt;
exports.getPropertyValue = getPropertyValue;
exports.clickButton = clickButton;
exports.getCorrectXpath = getCorrectXpath;
exports.getPropertyValues = getPropertyValues;
exports.removeDefaults = removeDefaults;
exports.removeUnwanted = removeUnwanted;
exports.getAttachedElements = getAttachedElements;
exports.log = log;
