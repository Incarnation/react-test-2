const express = require("express");
const router = express.Router();
const UserCtrl = require("../controllers/user");

//manage boooking router
router.get("/manage", UserCtrl.authMiddleware, function(req, res) {
  const user = res.locals.user;

  Rental.where({ user: user })
    .populate("bookings")
    .exec(function(err, rental) {
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }

      return res.json(rental);
    });
});
