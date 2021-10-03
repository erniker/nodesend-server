const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')

router.post(
  '/',
  [
    check('nombre', 'Name is required').not().isEmpty(),
    check('email', 'Email must be a valid email').isEmail(),
    check('password', 'Password must have 8 character or more').isLength({
      min: 8,
    }),
  ],
  function (req, res) {
    userController.newUser(req, res)
  }
)

module.exports = router
