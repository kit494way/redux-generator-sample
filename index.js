const Mustache = require('mustache');
const fs = require('fs');

function view(resource) {
  return {
    resource,
    Resource: resource.charAt(0).toUpperCase() + resource.slice(1),
    RESOURCE: resource.toUpperCase(),
  }
}

function generateAction(resource) {
  fs.readFile('templates/action.js.mustache', 'utf-8', (err, template) => {
    fs.writeFile(`actions/${resource}.js`, Mustache.render(template, view(resource)), (error) => {
      if (error) {
        console.error(error);
      }
    });
  });
}

function generateReducer(resource) {
  fs.readFile('templates/reducer.js.mustache', 'utf-8', (err, template) => {
    fs.writeFile(`reducers/${resource}.js`, Mustache.render(template, view(resource)), (error) => {
      if (error) {
        console.error(error);
      }
    });
  });
}

function main() {
  const resource = process.argv[2].toLowerCase();
  generateAction(resource);
  generateReducer(resource);
}

main();
