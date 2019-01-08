const Booking = require("../models/booking");
const Rental = require("../models/rental");
const { normalizeErrors } = require("../helpers/mongoose");

//callback function for booking request
exports.createBooking = function(req, res) {
  //get the Date and all the information from the request body
  const {
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    rental,
    contactNumber,
    contactName,
    viewDate
  } = req.body;

  //in the authmiddleware we assigned the user to locals.user
  //therfore we are getting it from locals.user
  const user = res.locals.user;

  //create new booking object
  const booking = new Booking({
    startAt,
    endAt,
    totalPrice,
    guests,
    days,
    contactNumber,
    contactName,
    viewDate
  });

  //find the rental
  Rental.findById(rental._id)
    //.populate("bookings")
    //.populate("user")
    .exec(function(err, rental) {
      //handle mongoose error
      if (err) {
        return res.status(422).send({ errors: normalizeErrors(err.errors) });
      }
      console.log(user.id);
      console.log(rental);

      //check if the booking is created on his/her own rental
      if (rental.user === user.id) {
        return res.status(422).send({
          errors: [
            {
              title: "Invalid user",
              detail: "cannot create booking on your rental"
            }
          ]
        });
      }

      //check valid bookings
      return res.json({ booking: rental });
    });
};
