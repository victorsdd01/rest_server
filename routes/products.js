const { Router, response } = require("express");
const { check } = require('express-validator');
const { getAllProducts, getProductById, updateProductById, deleteProductById, addNewProduct } = require("../controllers/products");
const { existProduct, existUserById, existCategory } = require("../helpers/db-validators");
const { validateJWT, isAdminRole } = require("../middlewares");
const {validateFields} = require('../middlewares/validate-fields')


const router = Router()


// get all products
router.get('/', getAllProducts)

router.get('/:id', [
   check('id', 'Is not a valid mongo ID').isMongoId(),
   check('id').custom(existProduct),
   validateFields
  ],getProductById
)
// add a new product
router.post('/',[
  validateJWT,
  check('name', 'The name field is required').not().isEmpty(),
  check('category', 'The id is not a mongo id').isMongoId(),
  check('category').custom(existCategory).isMongoId(),
  validateFields,
],addNewProduct)
// update an existing product
router.put('/:id',[
   validateJWT,
  //  check('category', 'Is not a valid mongo id').isMongoId(),
   check('id').custom(existProduct),
   validateFields
], updateProductById)
// delete a product
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'Is not a valid mongo ID').isMongoId(),
    check('id').custom(existProduct),
    validateFields
], deleteProductById)

module.exports = router