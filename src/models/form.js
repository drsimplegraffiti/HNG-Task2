const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new mongoose.Schema({
    name:String,
    email:String,
    message:String,
    date:{
        type:String,
        default: Date.now()
    }
}
)

const Form = mongoose.model('Form', formSchema);
// Exports schemas

module.exports =  Form;

