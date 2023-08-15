const { response, request } = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/users')
const validateJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:'Invaid acces token in the request'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.SECRETTOPRIVATEKEY)
        // read the user with the current uid
        const user = await User.findById(uid)
        if(!user){
            return res.status(401).json({
                msg: 'Invalid token - user does not exist in the DB'
            })
        }
        //validate if the user isn't deleted
        if(!user.state){
            res.status(401).json({
                msg: 'Invalid token - user with state in false (deleted) '
            })
        }
        req.user = user
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({
            msg: 'Invalid token'
        })
    } 
}

module.exports = {
    validateJWT
}