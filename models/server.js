const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config')

class Server {

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.paths = {
            auth:'/api/auth',
            search: '/api/search',
            users: '/api/users',
            categories:'/api/categories',
            products: '/api/products',
        }
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
       this.app.use(this.paths.auth, require('../routes/auth'))
       this.app.use(this.paths.search, require('../routes/search'))
       this.app.use(this.paths.users, require('../routes/user'))
       this.app.use(this.paths.categories, require('../routes/categories'))
       this.app.use(this.paths.products, require('../routes/products'))
    }

    listen(){
        this.app.listen(this.port)
    }

}


module.exports = Server