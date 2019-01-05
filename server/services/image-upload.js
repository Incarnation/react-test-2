const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const config = require("../config");

//aws configuration
aws.config.update({
  secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  accessKeyId: config.AWS_ACCESS_KEY_ID,
  region: "us-east-2"
});

//multerS3 services refer to
//https://www.npmjs.com/package/multer-s3
const s3 = new aws.S3();

//flter out only the jpeg and png files
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type, only JPEG and PNG is allowed"), false);
  }
};

var upload = multer({
  fileFilter: fileFilter,
  storage: multerS3({
    acl: "public-read",
    s3: s3,
    bucket: "react-test-2",
    metadata: function(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function(req, file, cb) {
      cb(null, Date.now().toString());
    }
  })
});

module.exports = upload;
