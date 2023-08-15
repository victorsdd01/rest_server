const Role = require('../models/role')
const User = require('../models/users')
const isRoleValid = async (rol = '') => {
    const rolExist = await Role.findOne({rol})
    if(!rolExist){
        throw new Error(`${rol} rol is not valid`)
    }
}

const isEmailExist = async (email = '') => {
    const emailExist = await User.findOne({email})
    if (emailExist) {
        throw new Error('The email exist')
    }
}
const existUserById = async (id) => {
    const existUserById = await User.findById(id)
    if (!existUserById) {
        throw new Error(`The id: ${id} doesn't exist`)
    }
}

module.exports = {
    isRoleValid,
    isEmailExist,
    existUserById
}