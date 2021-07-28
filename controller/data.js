const express = require('express');
const data = express();
const {Anime, Biodata} = require('../models');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');

data.use(cookieParser('secret'));
data.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
data.use(flash());

module.exports = {
    new: (req, res) => {
        res.render('index',{
            title: 'Halaman Form Survei',
            css: 'css/style.css',
            layout: 'layouts/main-layouts',
            msg: req.flash('msg'),
        })
    },
    create: async (req, res)=> {
        const biodata = await Biodata.findAll();
        if(biodata.length === 0){
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
            req.flash('msg', 'Data berhasil di tambahkan ');
            res.redirect('/');
        } else{
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
            req.flash('msg', 'Data berhasil ditambahkan');
            res.redirect('/');
        }
    
    },
    cards: async (req, res) =>{
        const biodatas = await Biodata.findAll({include: Anime});
        res.render('cards',{
            title: 'Halaman Daftar Seluruh Peserta Survei',
            css: 'css/cards.css',
            layout: "layouts/main-layouts",
            biodatas,
            Anime,
        });
    },
    card:  async(req, res) =>{
        try{
            const biodata = await Biodata.findOne({
                include: Anime,
                where: {
                    id: req.params.id
                }
            })
            res.render('card',{
                title: 'Halaman Daftar Peserta Survei',
                css: '',
                layout: "layouts/main-layouts",
                biodata,
                Anime,
            });
        } catch (err) {
            console.log(err);
        }
        
        
    },
    loginAdmin:  (req, res) => {
        Biodata.findOne({
            where: {
                name: req.body.name,
                isTrue: true
                }
        })
        .then((data)=>{
            if(Biodata.length !== null) {
                res.redirect(`/cards/${data.id}`);
            } else {
                console.log('username is wrong')
            }
        })
     
    },
    login: (req, res)=> {
        Biodata.findOne({
            where: {
                name: req.body.name,
                isTrue: false
                }
        })
        .then((data)=>{
            if(Biodata.length !== null) {
                res.redirect(`/card/${data.id}`);
            } else {
                console.log('username is wrong')
            }
        })
    }
}















// data.post('/add', async (req, res)=>{
//     const biodata = await Biodata.findAll();
//     if(biodata.length === 0){
//         Biodata.create({
//             name: req.body.name,
//             email: req.body.email,
//             age: req.body.age,
//             isTrue: true
//         }).then((Biodata)=>{
//             Anime.create({
//                 device: req.body.device,
//                 favorite: req.body.favorite,
//                 karakter: req.body.karakter,
//                 comment: req.body.comment,
//                 animeId: Biodata.get('id')
//             }).then((result)=>{
//                 console.log(result);
//             })
//         })
//         req.flash('msg', 'Data berhasil di tambahkan ');
//         res.redirect('/');
//     } else{
//         Biodata.create({
//             name: req.body.name,
//             email: req.body.email,
//             age: req.body.age,
//             isTrue: false
//         }).then((Biodata)=>{
//             Anime.create({
//                 device: req.body.device,
//                 favorite: req.body.favorite,
//                 karakter: req.body.karakter,
//                 comment: req.body.comment,
//                 animeId: Biodata.get('id')
//             }).then((result)=>{
//                 console.log(result)
//             })
//         })
//         req.flash('msg', 'Data berhasil ditambahkan');
//         res.redirect('/');
//     }
// });


// module.exports = data