const mongoose=require('mongoose');
// mopngoose konsol hatalınıı gizlemek için
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
module.exports=()=>{


    mongoose.connect('your mongodb key'
    ,{useNewUrlParser:true,useUnifiedTopology:true});

    mongoose.connection.on('open',()=>{

    });

    mongoose.connection.on('error',(err)=>{

        console.log("MongoDb is Error:",err);
    });

    mongoose.Promise=global.Promise;

};
