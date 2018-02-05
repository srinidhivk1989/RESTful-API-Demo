const express=require('express');
const router=express.Router();
const Ninja=require('../models/ninja');

//get a list of ninjas from the db
// router.get('/ninjas', function(req, res, next) {
//   Ninja.aggregate([
//     {
//       $geoNear: {
//         near: {
//           type: 'Point',
//           coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
//         },
//         distanceField: "dist.calculated",
//         maxDistance: 100000,
//         spherical: true
//       }
//     }
//   ]).then(function (ninjas) {
//     console.log(ninjas);
//     res.send(ninjas);
//   }).catch(next);
// });

router.get('/ninjas', function(req, res, next) {
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },
        distanceField: "dist.calculated",
        maxDistance: 100000, // 100 km
        spherical: true
      }
    }
  ]).then(function (ninjas) {
    res.send(ninjas);
  }).catch(next);
});

//Add a ninja to db
router.post('/ninjas',function(req,res,next){
  Ninja.create(req.body).then(function(ninja){
    res.send(ninja);
  }).catch(next);
});

//update a ninja in db
router.put('/ninjas/:id',function(req,res,next){
Ninja.findByIdAndUpdate({_id:req.params.id},req.body).then(function(){
  Ninja.findOne({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });

});

});
//delete a ninja from db
router.delete('/ninjas/:id',function(req,res,next){
  Ninja.findByIdAndRemove({_id:req.params.id}).then(function(ninja){
    res.send(ninja);
  });
});
module.exports=router;
