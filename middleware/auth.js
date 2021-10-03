const jwt = require("jsonwebtoken")
require("dotenv").config({ path: ".env" })

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization")

  if (authHeader) {
    // Obtener el token
    const token = authHeader.split(" ")[1]
    // Comprobar el JWT
    try {
      const user = jwt.verify(token, process.env.SECRET)
      req.user = user
    } catch (error) {
      res.status(401).json({ error: "JWT not valid" })
    }
  }
  return next()
}
