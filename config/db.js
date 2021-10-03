const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useFindAndModify: false,
      //   useCreateIndex: true,
    })
    console.log('DB connected')
  } catch (error) {
    console.log(`Error connecting with database: 
                    ${error}`)
    process.exit(1)
  }
}

module.exports = dbConnect
