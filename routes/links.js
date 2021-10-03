const express = require('express')
const router = express.Router()
const linkController = require('../controllers/linkController')
const fileController = require('../controllers/fileController')
const { check } = require('express-validator')
const auth = require('../middleware/auth')

router.post(
  '/',
  [
    check('nombre', 'Upload a file').not().isEmpty(),
    check('nombre_original', 'Upload a file').not().isEmpty(),
  ],
  auth,
  function (req, res, next) {
    linkController.newLink(req, res, next)
  }
)

router.get('/', function (req, res, next) {
  linkController.getAllLink(req, res, next)
})

router.get(
  '/:url',
  function (req, res, next) {
    linkController.hasPasword(req, res, next)
  },
  function (req, res, next) {
    linkController.getLink(req, res, next)
  }
)

router.post(
  '/:url',
  function (req, res, next) {
    linkController.verifyPassword(req, res, next)
  },
  function (req, res, next) {
    linkController.getLink(req, res, next)
  }
)

module.exports = router
