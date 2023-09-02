// const { response } = require("express")
const { response } = require("express")
const { ObjectId } = require("mongoose").Types
const { User, Category, Product } = require("../models")

const availableCollections  = [
    'users',
    'categories',
    'products',
    'roles'
]

const searchUser = async (termn = '', res = response ) => {
    // searching by id
    const isMongoId = ObjectId.isValid(termn)
    if(isMongoId){
        const user = await User.findById(termn)
        return res.json({
            results: (user) ? [user] : []
        })
    }
    // search by termn
    // create a regex because it doesn´t matter the case sensitive, 
    const regexp = new RegExp(termn, 'i')
    const users = await User.find({
        $or: [{name: regexp}, {email: regexp}],
        $and: [{state: true}] // if you want to filter by state true (in this case)
    })
    res.json({
        results: users
    })
}
const searchCategory = async (termn = '', res = response ) => {
    // searching by id
    const isMongoId = ObjectId.isValid(termn)
    if(isMongoId){
        const category = await Category.findById(termn)
        return res.json({
            results: (category) ? [category] : []
        })
    } 
        // search by termn
        // create a regex because it doesn´t matter the case sensitive, 
        const regexp = new RegExp(termn, 'i')
        const categories = await Category.find({name:regexp, state: true})
        res.json({
            results: categories
        })
}
const searchProduct = async (termn = '', res = response ) => {
    // searching by id
    const isMongoId = ObjectId.isValid(termn)
    if(isMongoId){
        const product = await Product.findById(termn).populate('category', 'name')
        return res.json({
            results: (product) ? [product] : []
        })
    } 
        const regexp = new RegExp(termn, 'i')
        const products = await Product.find({name: regexp, state: true})
                            .populate('category', 'name')
        res.json({
            results: products
        })
}

const search =  (req, res = response ) => {

    // extract the params
    const {collection, termn} = req.params
    if(!availableCollections.includes(collection)){
        return res.status(400).json({
            msg: `The available collections are: ${availableCollections}`
        })  
    } 
    switch (collection) {
        case 'users':
            searchUser(termn, res)
            break;
        case 'categories':
            searchCategory(termn, res)
            break;
        case 'products':
            searchProduct(termn, res)
            break;
        default:
            res.status(500).json({
                msg: 'I forgot to do this search... :/ sorry!'
            })
    }
}


module.exports  = {
    search,
}