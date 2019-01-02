const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config/dev");

//callback function for user authorization
exports.auth = function(req, res) {
  //get user info from request body using body-parser
  const { email, password } = req.body;

  //validation username email password
  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data Missing", detail: "Provide email and password" }]
    });
  }

  //find the user in database
  User.findOne({ email }, function(err, user) {
    //mongoose error
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    //user not exist
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Invalid User", detail: "User doesn't exist" }]
      });
    }

    ////compare the entered password with the user's password
    //function defined in user model schema
    if (user.hasSamePassword(password)) {
      //return jwt token
      //refer to https://www.npmjs.com/package/jsonwebtoken
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: "0.5h" }
      );

      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Invalid data", detail: "Wrong email or password" }]
      });
    }

    //res.json(user);
  });
};

//callback function for post request for user registration
exports.register = function(req, res) {
  //get info from the request body using body-parser
  //ES6 destructor
  const { username, email, password, passwordconfirmation } = req.body;

  //validation username email password
  if (!username || !email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data Missing", detail: "Provide email and password" }]
    });
  }

  //validation  password and passwordconfirmation
  if (password !== passwordconfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Invalid password",
          detail: "Password is not the same as comfirmation"
        }
      ]
    });
  }

  //check for existing user
  User.findOne({ email: email }, (err, user) => {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    if (user) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email",
            detail: "Email already exist"
          }
        ]
      });
    }
  });

  //create an new user
  const user = new User({
    username: username,
    email: email,
    password: password
  });

  //save the user to mongodb database
  user.save(function(err) {
    if (err) {
      return res.status(422).send({ errors: normalizeErrors(err.errors) });
    }

    //response after success
    return res.json({ registered: true });
  });
};
