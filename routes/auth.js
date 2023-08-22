const { Router } = require('express')
const { check } = require('express-validator')
const { authController, googleSignIn} = require('../controllers/auth')
const {validateFields} = require('../middlewares/validate-fields')

const router = Router()

router.post('/login',[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields
],authController)
router.post('/google',[
    check('id_token', 'The google token is necesary ').not().isEmpty(),
    validateFields
],googleSignIn)

module.exports = router