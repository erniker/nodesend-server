const Links = require('../models/Link')
const shortid = require('shortid')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const { enableUnicode } = require('npmlog')

exports.newLink = async (req, res, next) => {
  // Revisar si hay erroes
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // Crear objeto
  const { nombre_original, nombre } = req.body

  const link = new Links()
  link.url = shortid.generate()
  link.nombre = nombre
  link.nombre_original = nombre_original

  // Si el usuario está autenticado
  if (req.user) {
    const { password, descargas } = req.body

    // Asignar a enlace el número de descargas
    if (descargas) {
      link.descargas = descargas
    }
    // Asignar un password
    if (password) {
      const salt = await bcrypt.genSalt(10)
      link.password = await bcrypt.hash(password, salt)
    }
    // Asignar el autor
    link.autor = req.user.id
  }
  // Almacenar en la BD
  try {
    await link.save()
    res.status(200).json({ msg: `${link.url}` })
    return next()
  } catch (error) {
    console.log(error)
    return res.status(500).res.json({
      msg: 'Error creating archive url',
    })
  }
}

// Comprobar si el archivo tiene contraseña
exports.hasPasword = async (req, res, next) => {
  const { url } = req.params
  // Verificar si existe el enlace
  const link = await Links.findOne({ url })

  if (!link) {
    res.status(404).json({ msg: 'Url not found' })
    return next()
  }
  if (link.password) {
    return res.json({ password: true, file: link.nombre, url: link.url })
  }
  return next()
}

// Verificar si el password de archivo es correcto
exports.verifyPassword = async (req, res, next) => {
  const { url } = req.params
  const { password } = req.body

  // Consultar por el enlace
  const link = await Links.findOne({ url })

  // Veridficar el password
  if (bcrypt.compareSync(password, link.password)) {
    // Permitir al usario descargar el archivo
    next()
  } else {
    return res.status(401).json({ msg: 'Password incorrecto' })
  }
}

// Obtener enlace
exports.getLink = async (req, res, next) => {
  const { url } = req.params
  // Verificar si existe el enlace
  const link = await Links.findOne({ url })

  if (!link) {
    res.status(404).json({ msg: 'Url not found' })
    return next()
  }
  // si el enlace existe
  res.status(200).json({ file: link.nombre, password: false })

  next()
}

// Obtener listado de todos los enlaces
exports.getAllLink = async (req, res, next) => {
  try {
    const links = await Links.find({}).select('url -_id')
    res.status(200).json({ links })
  } catch (error) {
    console.log(error)
  }
}
