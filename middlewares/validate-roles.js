const { response } = require("express")

const isAdminRole = (req, res = response, next) => {
    if(!req.user){
        return res.status(500).json({
            msg: 'It need verify the role first'
        })
    }

    const {role, name} = req.user

    if(role !== 'Admin' ){
        return res.status(401).json({
            msg: 'Is not an administrator - can not to do the request'
        })
    }

    next()
}


const haveRol = (...roles) =>{
    return (req, res = response, next) => {
        if(!req.user){
            return res.status(500).json({
                msg: 'It need verify the role first'
            })
        }
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                msg: `it is required one on these roles: ${roles}`
            })
        }
        next()
    }
}


module.exports = {
    isAdminRole, 
    haveRol
}