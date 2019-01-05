const express = require("express");
const router = express.Router();
const Rental = require("../models/rental");
const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const UserCtrl = require("../controllers/user");

router.get("/secret", UserCtrl.authMiddleware, function(req, res) {
  res.json({ secret: true });
});

//get rental by id router
router.get("/:id", function(req, res) {
  const id = req.params.id;
  Rental.findById(id, function(err, rental) {
    //if not found return error message
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Rental Error", detail: "Could not find Rental" }]
      });
    }
    //return response for success
    res.json(rental);
  });
});

//get rentals router
router.get("", function(req, res) {
  //create query depends on city
  const city = req.query.city;
  const query = city ? { city: city.toLowerCase() } : {};

  Rental.find(query)
    .select("-bookings")
    .exec(function(err, rentals) {
      //console.log("rentals are : " + foundRentals);
      //if there are error
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      //if there no rentals return 422 error
      if (rentals.length === 0 && city) {
        return res.status(422).send({
          errors: [
            {
              title: "No Rentals Found",
              detail: `Could not find Rentals for ${city}`
            }
          ]
        });
      }
      //console.log("rentals are : " + rentals);
      //if success return json
      return res.json(rentals);
    });
});

//create rental route
router.post("", UserCtrl.authMiddleware, function(req, res) {
  //get all value from request body
  const {
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  } = req.body;

  //get current logined user
  const user = res.locals.user;

  //create new rental object
  const rental = new Rental({
    title,
    city,
    street,
    category,
    image,
    shared,
    bedrooms,
    description,
    dailyRate
  });

  rental.user = user;

  //create new rental for the user
  Rental.create(rental, function(err, rental) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    //update the user with new rental in mongodb
    User.update(
      { _id: user.id },
      { $push: { rentals: rental } },
      function() {}
    );

    //return json after success
    return res.json(rental);
  });
});

//delete rental route
router.delete("/:id", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  //console.log("id is: " + req.params.id);

  //find the rental using id from req
  //get the booking detail from rental
  //get user and id
  Rental.findById(req.params.id)
    .populate("user", "_id")
    .exec(function(err, rental) {
      //mongodb error
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
        //return res.json({ status: "error 1" });
      }
      console.log(user.id);
      console.log(rental.user.id);
      //check if id are the same
      if (user.id !== rental.user.id) {
        return res.status(422).send({
          errors: [
            { title: "Ivalid User", detail: "You are not the rental owner" }
          ]
        });
      }

      //if there is booking
      if (rental.bookings.length > 0) {
        return res.status(422).send({
          errors: [
            {
              title: "Active Booking",
              detail: "Cannot delete rental with active booking"
            }
          ]
        });
      }

      //remove the rental from mongodb
      rental.remove(function(err) {
        if (err) {
          return res.status(422).send({ errors: normalizeErrors(err.errors) });
          return res.json({ status: "error 2" });
        }

        return res.json({ status: "deleted" });
      });
    });
});

module.exports = router;
