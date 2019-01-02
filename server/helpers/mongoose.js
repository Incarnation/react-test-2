//helper function to extract all the error messsage from the response object
module.exports = {
  normalizeErrors: function(errors) {
    let err = [];
    for (let property in errors) {
      if (errors.hasOwnProperty(property)) {
        err.push({ title: property, detail: errors[property].message });
      }
    }

    return err;
  }
};
