const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");

//get router
router.get("", function(req, res) {
  Rental.find({}, function(err, rentals) {
    res.json(rentals);
  });
});

//get rental by id router
router.get("/:id", function(req, res) {
  const id = req.params.id;
  Rental.findById(id, function(err, rental) {
    //if not found return error message
    if (err) {
      res.status(422).send({
        errors: [{ title: "Rental Error", detail: "Could not find Rental" }]
      });
    }
    //return response for success
    res.json(rental);
  });
});

module.exports = router;
