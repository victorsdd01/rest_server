const { response } = require("express")
const User = require('../models/users')
const bcryptjs =  require('bcryptjs')
const {generateJWT} = require('../helpers/generate_JWT')
const { googleVerify } = require("../helpers/google-verify")



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

const googleSignIn = async (req, res = response) => {
    // recive the google token id form the front-end
    const {id_token} = req.body
    try {
        const {name, email, img} = await googleVerify(id_token)
        let user = await User.findOne({email})
        // if the user doesn't exist in the DB...
        if(!user){
            const data = {
                name,
                email,
                password: ':p',
                img,
                role: "USER",
                google: true
            }
            user = new User(data)
            await user.save()
        }
        // if the user state is false...
        if(!user.state){
            return res.status(401).json({
                msg:'Contact manager user has been blocked!'
            })
        }

         //generate JWT
         const token = await generateJWT(user.id)
         res.json({
            user,
            token
         })
    } catch (error) {
        res.status(400).json({
            msg: `Token can't be verify`
        })
        
    }
}

module.exports = {
    authController,
    googleSignIn,
}