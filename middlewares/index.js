


const validateJWT = require('../middlewares/validar_web_token')
const validateFields = require('../middlewares/validate-fields')
const validateRoles = require('../middlewares/validate-roles')



module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRoles
}