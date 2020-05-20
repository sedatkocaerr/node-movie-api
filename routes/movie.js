const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// GEt all movies
router.get('/',(req,res)=>{

    const promise = Movie.aggregate(
      [
       { 
         $lookup: {
          from:'directors',
          localField:'director_id',
          foreignField:'_id',
          as:'director'

        }
      },
      {
        $unwind:'director'
      }
      ]
    );
    promise.then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json(err);
    });

  

});


// post new movie
router.post('/new', (req, res, next) =>{
  // const {title,imbd_score,category,country,year} = req.body;

  const movie = new Movie(req.body);
  const promise=movie.save();

  promise.then((data)=>{
    res.json({status:1})
  }).catch((err)=>{
    res.json(err);
    });
});


// top 10 movie list

router.get('/top10',(req,res,next)=>{

  const promise=Movie.find({}).limit(10).sort({imbd_score:-1});

  promise.then((data)=>{
    if(!data)
       return next({message:'Movie not found',code:1});
    res.json({data});  
  }).catch((err)=>{
    res.json(err);
  });
});


// get with movie_id

router.get('/:movie_id',(req,res)=>{

  const promise=Movie.findById(req.params.movie_id)

  promise.then((data)=>{
    res.json(data);
  }).catch((err)=>{
    res.json(err);
  });
});

// Update with movie_id

router.put('/:movie_id',(req,res,next)=>{

  const promise=Movie.findByIdAndUpdate(
    req.params.movie_id,
    req.body,
    {
      new:true
    }
    );

  promise.then((data)=>{
    if(!data)
       return next({message:'Movie not found',code:1});
    res.json(data);  
  }).catch((err)=>{
    res.json(err);
  });

});


// remove with movie_id

router.delete('/:movie_id',(req,res,next)=>{

  const promise=Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((data)=>{
    if(!data)
       return next({message:'Movie not found',code:1});
    res.json({status:1});  
  }).catch((err)=>{
    res.json(err);
  });
});



// between start_date and end_date movie list

router.get('/between/:start_year/:end_year',(req,res,next)=>{

  const {start_year,end_year}=req.params;
  const promise=Movie.find({
    year: {
      $gte: parseInt(start_year),
      $lte: parseInt(end_year)
   }
  });

  promise.then((data)=>{
    if(!data)
       return next({message:'Movie not found',code:1});
    res.json({data});  
  }).catch((err)=>{
    res.json(err);
  });
});



module.exports = router;
