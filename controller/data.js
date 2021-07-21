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

data.post('/add', async (req, res)=>{
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
});


module.exports = data