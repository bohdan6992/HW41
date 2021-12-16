const express = require('express');
const multer  = require('multer');
const router = express.Router();
// const upload = multer({ dest: 'uploads/' })

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})

const multipleUpload = multer({ storage: storage }).array('my-file', 4)

/* GET home page. */
router.get('/multiple', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/multiple', (req, res) => {
  multipleUpload(req, res, function (err) {
    if (err instanceof multer.MulterError){
      console.log('MULTER ERROR>>>>>', err)
      res.send(err.code)
    } else if (err){
      console.log('UNKNOWN ERROR>>>>>', err)
      res.send(err.code)
    }
    console.log(req.body.person);
    console.log(req.file);
    res.send(`${req.body.person}`)
  })
});

module.exports = router;
