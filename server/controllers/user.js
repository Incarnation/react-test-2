const User = require("../models/user");

exports.auth = function(req, res) {
  User.find({}, function(err, user) {
    res.json(user);
  });
};

//callback function for post request user registration
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
      return res.status(422).send({
        mongoose: "handle mongoose errors"
      });
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
      return res.status(422).send({
        errors: [{ title: "Mongoose", detail: "mongoose error 222222222" }]
      });
    }

    //response after success
    return res.json({ registered: true });
  });
};
