var slug = require("slug");
const createSlug = (title) => {
  let len = 12;
  let newTitle =
    slug(title) +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, len + 2);
  return newTitle;
};
module.exports = createSlug;
