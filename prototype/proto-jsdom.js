var jsdom = require("jsdom");

// récupération de la page HTML exemple
var fs = require("fs");

var pageHTML = fs.readFileSync("./prototype/page.html").toString();
var sourceHtml = fs.readFileSync("./prototype/source.html").toString();

var dom = new jsdom.JSDOM(pageHTML);
var langs = dom.window.document.querySelectorAll("li");
langs.forEach(function(lg) {
  console.log(lg.innerHTML);
});

var source = new jsdom.JSDOM(sourceHtml);
var speakerBox = source.window.document
  .getElementById("content")
  .querySelector("div.container")
  .querySelector("div.row")
  .querySelectorAll("div.speaker-box");

speakerBox.forEach(box => {
  var value = box.querySelector("div.speaker")
  .querySelector("div.media")
  .querySelector("div.media-body")
  .querySelector("h3").innerHTML;
  console.log(value);
});
