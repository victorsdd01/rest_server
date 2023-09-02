const { response } = require("express");
const Category = require("../models/category");


const getAllCatogories = async (req, res = response) => {
    const {limit = 5, from = 5} = req.query
    const filter = { state: true}
    const [total,categories] = await Promise.all([
        Category.countDocuments(filter),
        Category.find(filter)
            .populate('user','name')
            .skip(Number(from))
            .limit(Number(limit))
    ])
    res.json({
        total,
        categories
    })
}
const getCategoryById = async (req, res = response) => {
    const { id } = req.params
    const category = await Category.findById(id).populate('user','name')
    res.json({
        category
    })
}
const addNewCategory = async (req, res = response) => {

    const name = req.body.name.toUpperCase()
    const categoryDB = await Category.findOne({name})
    console.log('categoryDB', categoryDB)
    if (categoryDB) {
        res.json({
            msg: `The category ${categoryDB.name} exist!`
        })
    }
    try {        
        const data = {
            name, 
            user: req.user._id
        }
        const category = new Category(data)
        await category.save()
    
        res.status(201).json({
            category
        })
    } catch (error) {
        console.log(error)
    }
    // generate the data to save
}
const updateCategoryById = async (req, res = response) => {
    const {id} = req.params
    const {state, user, ...data} = req.body
    data.name =  data.name.toUpperCase()
    data.user = req.user._id
    const category = await Category.findByIdAndUpdate(id,data, {new: true})
    res.json({
       category
    })
}
const deleteCategoryById = async (req, res = response) => {
    const {id} = req.params
    const category = await Category.findByIdAndUpdate(id,{state: false}, {new: true})
    res.json({
       category
    })
}


module.exports = {
    getAllCatogories,
    getCategoryById,
    addNewCategory,
    updateCategoryById,
    deleteCategoryById,
    
}