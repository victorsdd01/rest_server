const { Router } = require('express')
const { check } = require('express-validator')
const {getUsers, updateUser, addUser, deleteUser} = require('../controllers/users')
const { isRoleValid, isEmailExist, existUserById } = require('../helpers/db-validators')
const { validateFields } = require('../middlewares/validate-fields')


const router = Router()

router.get('/', getUsers)
router.put('/:id',[
    check('id', 'Is not valid ID').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(isRoleValid),
    validateFields
],updateUser)
router.post('/',[ 
    check('name','name field field is required').not().isEmpty(),
    check('password','password field is required').isLength({ min: 6}),
    check('email','email is not valid').custom(isEmailExist),
    check('role').custom(isRoleValid),
    // check('role','Is not a valid role').isIn(['admin','user']),
    validateFields
], addUser)
router.delete('/:id',[
    check('id', 'Is not valid ID').isMongoId(),
    // check('id').custom(existUserById),
    validateFields
], deleteUser)

module.exports = router