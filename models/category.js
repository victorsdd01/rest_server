const { Schema, model } = require("mongoose");


const categorySchema = Schema({

    name: {
        type: String,
        required: [true, 'Category name is required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    // how to know what user create the category
    user : {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
})

categorySchema.methods.toJSON = function(){
    const { __v, state, ...category} = this.toObject()
    return category
}


module.exports = model('Category', categorySchema)





