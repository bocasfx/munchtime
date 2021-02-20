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
  execSync(
    `npx showdown makehtml -i ./src/markdown/${section}.md -o ./build/${section}.html`
  );
  const source = path.join(__dirname, `../build/${section}.html`);
  const dest = path.join(__dirname, `../public/${section}.html`);
  applyTemplate(source, dest, template);
};

module.exports = {
  applyTemplate,
  md2html,
};
