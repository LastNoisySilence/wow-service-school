let express = require('express');
let verifyAuth = require('../shared/verifyAuth');
let Jimp = require("jimp");
let router = express.Router();
let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../static/images/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

let upload = multer({ storage: storage });
router.post('/upload', upload.any(), verifyAuth, function (req, res, next) {
  Jimp.read(req.files[0].path, function (err, lenna) {
    if (err) throw err;
    if (req.body.type === 'photo') {
      lenna.cover(400, 400)
        .quality(80)
        .write(req.files[0].path);
    } else {
      lenna.cover(1170, 600)
        .quality(80)
        .write(req.files[0].path);
    }
    res.send(req.files)
  });
});
module.exports = router;
