let express = require('express');
let Jimp = require("jimp");
let router = express.Router();
let multer = require('multer');
let path = require('path')

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../static/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage});
  router.post('/upload', upload.any(), function(req, res, next) {
    Jimp.read(req.files[0].path, function (err, lenna) {
      if (err) throw err;
      lenna.cover(1170, 600)
        .quality(80)                 // set JPEG quality
        .write(req.files[0].path); // save
      res.send(req.files)
    });
  });
module.exports = router;
