const {Schema, model} = require('mongoose')

const productSchema = Schema({

    name: {
        type: String,
        required: [true, 'The product name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    // how to know what user create the product
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    price:{
        type:Number,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true,
    },
    description:{
        type: String,
    },
    available:{
        type: Boolean,
        default: true,
    }

})

productSchema.methods.toJSON = function(){
    const { __v, state, ...product} = this.toObject()
    return product
}


module.exports = model('Product', productSchema)