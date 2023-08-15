const { response } = require("express")
const User = require('../models/users')
const bcryptjs =  require('bcryptjs')
const {generateJWT} = require('../helpers/generate_JWT')


const authController = async (req, res = response) => {
    const {email, password} = req.body
    try {
        // verify if the email exist
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                msg: 'Invalid password or email'
            })
        }
        // validate if the user still exist in the db
        if (!user.state){
            return res.status(400).json({
                msg: 'User does not exist in the DB'
            })
        }

        //validate the password
        const validPassword = bcryptjs.compareSync(password, user.password)
        if (!validPassword){
            return res.status(400).json({
                msg: 'Invalid password'
            })
        }

        //generate JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:'Something wrong!!'
        })
    }
}

module.exports = {
    authController
}