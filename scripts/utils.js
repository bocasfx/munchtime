const path = require("path");
const { execSync } = require("child_process");
var fs = require("fs");

const applyTemplate = (source, dest, template) => {
  console.log(`Applying template to: ${source}`);

  const data = fs.readFileSync(source, {
    encoding: "utf8",
    flag: "r",
  });

  var result = template.replace(/<!--CONTENT-->/g, data);

  fs.writeFileSync(dest, result, { encoding: "utf8" });
};

const md2html = (section, template) => {
  console.log(`Converting section: ${section}`);
  const inputPath = path.join(__dirname, `../src/Markdown/${section}.md`);
  const outputPath = path.join(__dirname, `../build/${section}.html`);
  execSync(
    `npx showdown makehtml -i ${inputPath} -o ${outputPath}`
  );
  const source = path.join(__dirname, `../build/${section}.html`);
  const dest = path.join(__dirname, `../public/${section}.html`);
  applyTemplate(source, dest, template);
};

module.exports = {
  applyTemplate,
  md2html,
};
