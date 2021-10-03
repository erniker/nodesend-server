const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.newUser = async (req, res) => {
  console.log(req.body)
  // Show express validator error
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    console.log(errors.array())
    return res.status(400).json({ errors: errors.array() })
  }
  console.log('No hay errores')
  try {
    // Verificar si el usuario esta registrado
    const { email, password } = req.body
    let user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: 'User already exists' })
    }
    // Creamos usuario
    user = new User(req.body)

    // Hasheamos el pasword
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    // Creamos usuario
    await user.save()
    res.status(200).json({ msg: 'User created successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).res.json({
      msg: 'Error creating user',
    })
  }
}
