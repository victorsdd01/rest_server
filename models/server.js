const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/users'
        //auth path
        this.authPath = '/api/auth'
        // db connection
        this.connectDB()
        // middelwares
        this.middlewares()
        // routes
        this.routes()
    }

    async connectDB(){
        await dbConnection()
    }

    middlewares(){
        // cors
        this.app.use(cors())
        //read and parse the body in post request
        this.app.use(express.json())
        this.app.use(express.static('public'))
    }

    routes (){
       this.app.use(this.authPath, require('../routes/auth'))
       this.app.use(this.usuariosPath, require('../routes/user'))
    }

    listen(){
        this.app.listen(this.port)
    }

}


module.exports = Server