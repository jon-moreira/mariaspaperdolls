require("babel-register")({
  presets: ["es2015", "react"],
});

require.extensions[".css"] = function () {
  return null;
};
require.extensions[".scss"] = function () {
  return null;
};
require.extensions[".svg"] = function () {
  return null;
};
require.extensions[".jpg"] = function () {
  return null;
};
require.extensions[".jpeg"] = function () {
  return null;
};
require.extensions[".png"] = function () {
  return null;
};

const router = require("./routing").default;
const Sitemap = require("react-router-sitemap").default;
const data = require("./assets/data.json");

const filterConfig = {
  isValid: false,
  rules: [/\*/],
};

// Setup the pages
const catalogData = data.catalog.map((item) => {
  return item.name;
});

const exhibitionData = data.exhibitions.map((item) => {
  return item.name;
});

const creationData = data.creations.map((item) => {
  return item.name;
});

const catalog = {
  catalog: catalogData,
};
const exhibition = {
  exhibitions: exhibitionData,
};
const creation = {
  creations: creationData,
};

const paramsConfig = {
  "/works/catalog/:catalog": [catalog],
  "/works/creations/:creations": [creation],
  "/works/exhibitions/:exhibitions": [exhibition],
};

new Sitemap(router())
  .filterPaths(filterConfig)
  .applyParams(paramsConfig)
  .build("https://mariaspaperdolls.com", { limitCountPaths: 5000 })
  .save("./build/sitemap.xml");
