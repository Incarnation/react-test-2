//https://github.com/sindresorhus/titleize
//clone from above github repo

module.exports = input => {
  if (typeof input !== "string") {
    throw new TypeError("Expected a string");
  }

  return input.toLowerCase().replace(/(?:^|\s|-)\S/g, x => x.toUpperCase());
};
