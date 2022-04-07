const express = require('express');
const logger = require('./logger')

const router = express.Router();


//problem 1

let arr = ['interstaller', 'pulfiction','taree zameen par','puspha','RRR']

router.get('/movies', function (req, res) {
    //let cohort = 'uranium Backend cohort Feb 2022 - May 2022'
    console.log(arr)
     res.send(arr)
});

//problem 2 & 3



router.get('/movies/:indexnumber', function (req, res) {
    let arr2 =  ['interstaller', 'pulfiction','taree zameen par','puspha','RRR']
    const i = req.params.indexnumber
    
        if ( i < arr2.length){
            res.send(arr2[i])
        }else {
            res.send("please enter valid  number")

        }
        
    
    
});


//problem 4

router.get('/films', function (req, res) {
   const movie = [ {
    'id': 1,
    'name': 'The Shining'
   }, {
    'id': 2,
    'name': 'Incendies'
   }, {
    'id': 3,
    'name': 'Rang de Basanti'
   }, {
    'id': 4,
    'name': 'Finding Nemo'
   }]


   res.send(movie)
       
});

//problem 5
router.get('/films/:filmId', function (req, res) {
    const movie = [ {
     'id': 1,
     'name': 'The Shining'
    }, {
     'id': 2,
     'name': 'Incendies'
    }, {
     'id': 3,
     'name': 'Rang de Basanti'
    }, {
     'id': 4,
     'name': 'Finding Nemo'
    }]
    const id = req.params.filmId
    if (  id < movie.length){
        res.send(movie[id])
    }else{
        res.send('No movie exists with this id')
    }
 
  });



module.exports = router;
// adding this comment for no reason