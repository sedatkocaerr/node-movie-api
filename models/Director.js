const mongoose =require('mongoose');
const Schema =mongoose.Schema;

const directorschema =new Schema({

        name:String,
        surname:String,
        bio:String,
        createdDate:{
            type:Date,
            default:Date.now
        }

});

module.exports=mongoose.model('director',directorschema);