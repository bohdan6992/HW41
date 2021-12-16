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

const singleUpload = multer({ storage: storage }).single('my-file')

/* GET home page. */
router.get('/single', (req, res, next) => {
  res.send('respond with a resource');
});

router.post('/single', (req, res) => {
  singleUpload(req, res, function (err) {
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
