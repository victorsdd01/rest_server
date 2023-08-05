
const { response } = require('express') 

const getUsers = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    })
} 
const updateUser = (req, res) => {

    const id = req.params.id

    res.json({
        msg: 'updated',
        id
    })
}
const addUser = (req, res) => {
    
    const body = req.body;

    res.json({
        msg: 'post api',
        body: body,
    })
}
const deleteUser = (req, res) => {
    res.json({
        msg: 'delete api'
    })
}



module.exports = {
    getUsers,
    updateUser,
    addUser,
    deleteUser,
}