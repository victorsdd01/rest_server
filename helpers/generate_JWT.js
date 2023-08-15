const jwt = require('jsonwebtoken')

const generateJWT = (uid = '') =>{

    return new Promise((resolve, reject) => {
        const payload = { uid }
        jwt.sign(payload, process.env.SECRETTOPRIVATEKEY, {
            expiresIn:'4h'
        }, (err, token) => {
            if(err){
                console.log('error')
                reject(`can't generate the token`)
            }else{
                resolve(token)
            }
        })

    })

}




module.exports = {
    generateJWT,
}