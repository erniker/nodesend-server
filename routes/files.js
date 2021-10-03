const express = require('express')
const router = express.Router()
const fileController = require('../controllers/fileController')
const auth = require('../middleware/auth')

router.post('/', auth, function (req, res, next) {
  fileController.uploadFile(req, res, next)
})
router.get(
  '/:file',
  function (req, res, next) {
    fileController.download(req, res, next)
  },
  function (req, res) {
    fileController.deleteFile(req, res)
  }
)
module.exports = router
