
const { response } = require('express') 
const User = require('../models/users')
const bcryptjs =  require('bcryptjs')

const getUsers = async (req, res = response) => {
    const {limit = 5, desde = 5 } = req.query
    const filter = { state: true}
    // we going to filter by state === true
    const [total,users] = await Promise.all([
        User.countDocuments(filter),
        User.find(filter)
          .skip(Number(desde))
          .limit(Number(limit))
    ])
    res.json({
        total,
        users
    })
} 
const updateUser = async (req, res) => {

    const id = req.params.id
    const {_id, password, google, email, ...resto} = req.body
    if (password){
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync(password, salt)
    }

    const user = await User.findByIdAndUpdate(id, resto)

    res.json({
        msg: 'updated',
        user
    })
}
const addUser = async (req, res) => {
    
    const {name,email, password, role} = req.body
    // const {google, ...resto} = req.body
    // const user = new User(resto)
    const user = new User({name, email, password, role})
    
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
    
    await user.save()
    res.json({
        user
    })
}
const deleteUser = async (req, res = response) => {

    const { id } = req.params
    // const user = await User.findByIdAndDelete(id)
    const user = await User.findByIdAndUpdate(id, { state:false })
    res.json({
       user
    })
}



module.exports = {
    getUsers,
    updateUser,
    addUser,
    deleteUser,
}