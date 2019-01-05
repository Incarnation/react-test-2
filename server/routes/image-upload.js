const express = require("express");
const router = express.Router();
const { normalizeErrors } = require("../helpers/mongoose");
const UserCtrl = require("../controllers/user");
const upload = require("../services/image-upload");

//provide 'image' as a key to the multer function
const singleUpload = upload.single("image");

//upload image route
//use middleware to control only auth user can upload image
router.post("/image-upload", UserCtrl.authMiddleware, function(req, res) {
  //execute the multer function
  singleUpload(req, res, function(err) {
    if (err) {
      return res.status(422).send({
        errors: [{ title: "Image upload error", detail: err.message }]
      });
    }

    //return the url after success
    return res.json({ imageUrl: req.file.location });
  });
});

module.exports = router;
