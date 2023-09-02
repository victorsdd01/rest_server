const Role = require('../models/role')
const { User, Category, Product } = require('../models')

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

const existCategory = async (id) => {
    const existCategoryById = await Category.findById(id)
    if(!existCategoryById){
        throw new Error(`The category doesn't exist in the DB`)
    }
}
const existProduct = async (id) => {
    const existProductById = await Product.findById(id)
    if(!existProductById){
        throw new Error(`The product doesn't exist in the DB`)
    }
}

module.exports = {
    isRoleValid,
    isEmailExist,
    existUserById,
    existCategory,
    existProduct
}