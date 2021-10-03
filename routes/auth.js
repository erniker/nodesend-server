const express = require("express")
const router = express.Router()
const authController = require("../controllers/authController")
const { check } = require("express-validator")
const auth = require("../middleware/auth")

router.post(
  "/",
  [
    check("email", "Email must be a valid email").isEmail(),
    check("password", "Password can not be empty").not().isEmpty(),
  ],
  function (req, res, next) {
    authController.userAuthentication(req, res, next)
  }
)

router.get("/", auth, function (req, res, next) {
  authController.authenticatedUser(req, res, next)
  res.status(200).json({ user: req.user })
  return next()
})

module.exports = router
