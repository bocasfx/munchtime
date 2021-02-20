const util = require("util");
const path = require("path");
const { exec } = require("child_process");
var fs = require("fs");

const sections = [
  "antojitos",
  "beef",
  "bread",
  "breakfast",
  "desserts",
  "grains",
  "pork",
  "poultry",
  "salsas",
  "seafood",
  "soups",
  "veggies",
];

const applyTemplate = (section, template) => {
  console.log(`Applying template to: ${section}`);
  const sectionFilePath = path.join(__dirname, `../build/${section}.html`);

  const data = fs.readFileSync(sectionFilePath, {
    encoding: "utf8",
    flag: "r",
  });

  var result = template.replace(/<!--CONTENT-->/g, data);

  const destinationPath = path.join(__dirname, `../public/${section}.html`);

  fs.writeFileSync(destinationPath, result, { encoding: "utf8" });
};

const md2html = (section, template) => {
  console.log(`Converting section: ${section}`);
  const child = exec(
    `npx showdown makehtml -i ./src/markdown/${section}.md -o ./build/${section}.html`
  );
  child.on('exit', function() {
    applyTemplate(section, template);
  })  
};



// --------------------------------------------------


const templatePath = path.join(__dirname, `../src/html/template.html`);
const template = fs.readFileSync(templatePath, { encoding: "utf8", flag: "r" });

sections.forEach((section) => md2html(section, template));
