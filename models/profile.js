  
const mongoose= require('mongoose');

const profileSchema =new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required:true
    },
    company: {
        type: String,
        required:true
    },


})


module.exports= mongoose.model('Profiles',profileSchema);