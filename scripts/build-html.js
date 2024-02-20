const path = require("path");
var fs = require("fs");
const { md2html, applyTemplate } = require("./utils");

const sections = [
  "antojitos",
  "beef",
  "bread",
  "breakfast",
  "capc",
  "desserts",
  "grains",
  "pork",
  "poultry",
  "salsas",
  "seafood",
  "soups",
  "veggies",
];

const templatePath = path.join(__dirname, `../src/html/template.html`);
const template = fs.readFileSync(templatePath, { encoding: "utf8", flag: "r" });

const stylesPathSource = path.join(__dirname, '../src/html/styles.css');
const stylesPathDest = path.join(__dirname, '../public/styles.css');

fs.copyFileSync(stylesPathSource, stylesPathDest);

sections.forEach((section) => md2html(section, template));

const tocSource = path.join(__dirname, '../src/html/toc.html');
const tocDest = path.join(__dirname, '../public/index.html');

applyTemplate(tocSource, tocDest, template)