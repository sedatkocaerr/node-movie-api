const express = require('express');
const router = express.Router();
const Users=require('../models/Users');

const bcryptjs=require('bcryptjs');

const jsonwebtoken =require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next)=> {
  res.render('index', { title: 'Express' });
});

router.post('/register',(req,res)=>{

  const {username,password} = req.body;

  const bcrypthash=bcryptjs.hash(password,15).then((hash)=>{

    const users=new Users({
      username:username,
      password:hash
    });
  
    const promise =users.save();
  
    promise.then((result) => {
      res.json(result);
    }).catch((err) => {
      res.json(err);
    });

  });

});


router.post('/authenticate',(req,res)=>{

    const {username,password}=req.body;
    Users.findOne({
      username:username
    },(err,user)=>{
      if(err)
      {
        throw err;
      }

      if(!user)
      {
          res.json({
            status:false,
            message:'authenntication failed user not found'
          });
      }
      else
      {
        bcryptjs.compare(password,user.password).then((result)=>{
          if(!result)
          {
            res.json({
              status:false,
              message:'authenntication failed user not found'
            });
          }
          else
          {
            const payload = {
              username:username
            };

            const token =jsonwebtoken.sign(payload,req.app.get('api_secret_key'),
            {
              
              // 12 hour expire date
              expiresIn:720
            });

            res.json({
              status:true,
              token:token
            });
          }
        });
      }
    });
});

module.exports = router;
