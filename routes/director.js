const mongoose=require('mongoose');

const express =require('express');
const route =express.Router();
const Director = require('../models/Director.js');

// new director
route.post('/new',(req,res)=>{

    const director = new Director(req.body);
    const promise = director.save();

    promise.then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json(err);
    });

});

// get director and director films

route.get('/directorandfilms',(req,res)=>{

    const promise =Director.aggregate(
    [
        {
            $lookup :{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
           $unwind:{
               path:'$movies'
           } 
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },

        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
        
           
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

// get director with director_id

route.get('/:director_id',(req,res)=>{

    const promise =Director.aggregate(
    [
        {
            $match:{
               
                '_id':mongoose.Types.ObjectId(req.params.director_id)
                
            }
        }
        ,
        {
            $lookup :{
                from:'movies',
                localField:'_id',
                foreignField:'director_id',
                as:'movies'
            }
        },
        {
           $unwind:{
               path:'$movies'
           } 
        },
        {
            $group:{
                _id:{
                    _id:'$_id',
                    name:'$name',
                    surname:'$surname',
                    bio:'$bio'
                },
                movies:{
                    $push:'$movies'
                }
            }
        },

        {
            $project:{
                _id:'$_id._id',
                name:'$_id.name',
                surname:'$_id.surname',
                movies:'$movies'
            }
        }
        
           
    ]);

    promise.then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });

});

// update director with director_id

route.put('/:director_id',(req,res,next)=>{

    const promise =Director.findByIdAndUpdate(
        req.params.director_id,
        req.body,
        {
            new:true
        });

        promise.then((data) => {
            if(!data)
                return next({message:"director not found",code:99});
            res.json(data);
            }).catch((err) => {
            res.json(err);
        });
});


// remove director with director_id

route.delete('/:director_id',(req,res)=>{

    const promise=Director.findByIdAndDelete(req.params.director_id);

    promise.then((result) => {
        if(!data)
                return next({message:"director not found",code:99});
        res.json({status:1});
    }).catch((err) => {
        res.json(err);
    });

});

module.exports=route;