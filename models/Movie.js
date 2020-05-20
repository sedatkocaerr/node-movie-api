const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const MovieSchema=new Schema({

    title:{
        type:String,
        required:[true,'`{PATH}` alanı zorunludur'],
        maxlength:[80,'`{PATH}` alanı maximum `{MAXLENGTH}` karakter kadar olmalıdır.'],
        minlength:[150,'`{PATH}` alanı minimum `{MINLENGTH}` karakter kadar olmalıdır.']
    },
    category:{
        type:String,
        maxlength:30,
        minlength:2
    },
    country:{
        type:String,
        maxlength:50,
        minlength:1
    },
    year:Number,
    imbd_score:{
        type:Number,
        maxlength:10,
        minlength:1
    },
    director_id:Schema.Types.ObjectId,
    date:{
        type:Date,
        default:Date.now
    }


});

module.exports=mongoose.model('movie',MovieSchema);