const express = require('express');
const data = express();
const {Anime, Biodata} = require('../models');

data.post('/add',  (req, res)=>{
    Biodata.findAll()
     .then(()=>{
        if(Biodata.length == 0) {
            Biodata.create({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                isTrue: true
            }).then((Biodata)=>{
                Anime.create({
                    device: req.body.device,
                    favorite: req.body.favorite,
                    karakter: req.body.karakter,
                    comment: req.body.comment,
                    animeId: Biodata.get('id')
                }).then((result)=>{
                    console.log(result);
                })
            })
            res.redirect('/');
        } if (Biodata.length !== 0) {
            Biodata.create({
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                isTrue: false
            }).then((Biodata)=>{
                Anime.create({
                    device: req.body.device,
                    favorite: req.body.favorite,
                    karakter: req.body.karakter,
                    comment: req.body.comment,
                    animeId: Biodata.get('id')
                }).then((result)=>{
                    console.log(result)
                })
            })
            res.redirect('/');
        }
     }).catch(err =>{
         res.status(300).json(`can't add data`)
     })

})























// data.post('/add', (req, res)=>{
//   const{name, email, age, device, favorite, karakter, comment} = req.body;
//   Biodata.findAll()
//     .then(()=>{
//         if(!Biodata && Anime) {
//             Biodata.create({
//                 name: name,
//                 age: age,
//                 email: email,
//                 isTrue: true
//             }).then(()=>{
//                 Anime.create({
//                     animeId: Biodata.get('id'),
//                     device: device,
//                     favorite: favorite,
//                     karakter: karakter,
//                     comment: comment
//                 }).then(()=>{
//                     console.log('berhasil dibuat')
//                 }).catch(err=>{
//                     res.status(400).json('can,t add data')
//                 })
//             }).catch(err=>{
//                 res.status(400).json('can,t add data')
//             })
//         } else {
//             Biodata.create({
//                 name: name,
//                 age: age,
//                 email: email,
//                 isTrue: false
//             }).then(()=>{
//                 Anime.create({
//                     animeId: Biodata.get('id'),
//                     device: device,
//                     favorite: favorite,
//                     karakter: karakter,
//                     comment: comment
//                 }).then(()=>{
//                     console.log('berhasil dibuat')
//                 }).catch(err=>{
//                     res.status(400).json('can,t add data')
//                 })
//             }).catch(err=>{
//                 res.status(400).json('can,t add data')
//             })
//         }
//         res.redirect('/');
//     }).catch(err=>{
//         res.status(400).json('can,t add data')
//     })
// });

module.exports = data