const mongoose = require('mongoose')

const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_ATLAS)
        console.log('db connection successfully')
        
    } catch (err) {
        console.log(err)
        throw new Error('Something wrong trying to start the database connection')
    }
}


module.exports = {
    dbConnection
}