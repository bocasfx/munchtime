const path = require("path");
const { exec } = require("child_process");
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
  const child = exec(
    `npx showdown makehtml -i ./src/markdown/${section}.md -o ./build/${section}.html`
  );
  child.on('exit', function() {
    const source = path.join(__dirname, `../build/${section}.html`);
    const dest = path.join(__dirname, `../public/${section}.html`);
    applyTemplate(source, dest, template);
  })  
};

module.exports = {
  applyTemplate,
  md2html,
};
