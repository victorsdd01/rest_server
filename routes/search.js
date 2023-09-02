const { Router} = require('express')
const { search } = require('../controllers/search')



const router = Router()

// serch in all endpoints...
router.get('/:collection/:termn',search)


module.exports = router