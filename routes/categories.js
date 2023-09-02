const { Router } = require("express")
const { check } = require("express-validator")
const { getAllCatogories, getCategoryById, addNewCategory, updateCategoryById, deleteCategoryById } = require("../controllers/categories")
const { existCategory } = require("../helpers/db-validators")
const { isAdminRole } = require("../middlewares")
const { validateJWT } = require("../middlewares/validar_web_token")
const { validateFields } = require("../middlewares/validate-fields")


 const router = Router()


 //get all categories - public
 router.get('/', getAllCatogories)
 // get category by id
 router.get('/:id',[
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(existCategory),
    validateFields
 ],getCategoryById)
// add new caregory -private it needs a valid token
router.post('/', [
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    validateFields
],addNewCategory)
// update category by id - private it's necessary a valid token 
router.put('/:id',[
    validateJWT,
    check('name', 'name is required').not().isEmpty(),
    check('id').custom(existCategory),
    check('id', `Isn't a valid id`).isMongoId(),
    validateFields
],updateCategoryById)
// delete category by id -- only admin can do this
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid mongoID').isMongoId(),
    check('id').custom(existCategory),
    validateFields
],deleteCategoryById)

 module.exports = router