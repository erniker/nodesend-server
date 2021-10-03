const express = require('express')
const dbConnect = require('./config/db')
const cors = require('cors')
// crear servidor
const app = express()

// Conectar a la DB
dbConnect()

// Habilitar Cors
const corsOption = {
  origin: process.env.FRONTEND_URL,
}
app.use(cors(corsOption))

// Puerto de la app
const port = process.env.Port || 4000

// Habilitar leer valores de un body
app.use(express.json())

console.log('NodeSend starting...')

//Habilitar carpeta publica
app.use(express.static('uploads'))

// Rutas de la app
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/links', require('./routes/links'))
app.use('/api/files', require('./routes/files'))

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`)
})
