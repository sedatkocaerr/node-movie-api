const mongoose=require('mongoose');

module.exports=()=>{


    mongoose.connect('mongodb+srv://ekremhayatsever:ekrem123@cluster0-pepnc.mongodb.net/test?retryWrites=true&w=majority'
    ,{useNewUrlParser:true,useUnifiedTopology:true});

    mongoose.connection.on('open',()=>{

        console.log("Mongodb is Connected ");
    });

    mongoose.connection.on('error',(err)=>{

        console.log("MongoDb is Error:",err);
    });

    mongoose.Promise=global.Promise;

};