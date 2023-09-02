const { response } = require('express')
const Product = require('../models/product')

const getAllProducts = async (req, res = response) =>{

    const {limit = 100, from = 0} = req.query
    const filter = {state: true}
    const [total, products] = await Promise.all([
        Product.countDocuments(filter),
        Product.find(filter)
            .populate('category', 'name')
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ])

    res.json({
        total,
        products
    })
    

}

const getProductById = async (req, res = response)=> {
    const {id} = req.params
    const product = await Product.findById(id)
                             .populate('user', 'name')
                             .populate('category', 'name')
    res.json({
        product
    })
}
const addNewProduct = async (req, res = response)=> {
    // we gonna desestruct the params that we wont want to edit
    const {state, user, ...body} = req.body
    const product = await Product.findOne({name:body.name})
    if(product){
        return res.status(400).json({
            msg: `The product ${body.name} exist in the DB`
        })
    }
        const data = {
            ...body,
            name: body.name.toUpperCase(),
            user: req.user._id,
        }

        const newProduct = new Product(data)
        await newProduct.save()
        
        res.status(201).json({
            newProduct
        })
}
const updateProductById = async (req, res = response)=> {
    const {id} = req.params
    const {state,user, ... data} = req.body
    if (data.name) {
        data.name = data.name.toUpperCase()
    }
    const product = await Product.findByIdAndUpdate(id, data, {new: true})
    res.json({
        product
    })
}
const deleteProductById = async (req, res = response)=> {
    const {id} = req.params
    const product = await Product.findByIdAndUpdate(id,{state: false},{new: true})
    res.json({
        product
    })
}


module.exports = {
    getAllProducts,
    getProductById,
    addNewProduct,
    updateProductById,
    deleteProductById,
}