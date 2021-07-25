const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000;

app.set('view engine', 'ejs'); //Set EJS
app.use(expressLayouts); //use express-ejs-layouts middleware
app.use(express.static('public')); //Middleware for file static
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser('secret'));
app.use(
    session({
        cookie: {maxAge: 6000},
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);
app.use(flash());

// Router
const router = require('./router/router');
app.use(router);


// app.get('/', (req, res)=>{
//     res.render('index', {
//         title: 'Halaman Form Survei',
//         css: 'css/style.css',
//         layout: 'layouts/main-layouts',
//         msg: req.flash('msg'),
//     });
// });

// app.get('/cards', async (req, res)=>{
//     const biodatas = await Biodata.findAll({include: Anime});
  
//     res.render('card',{
//         title: 'Halaman Daftar Peserta Survei',
//         css: 'css/cards.css',
//         layout: "layouts/main-layouts",
//         biodatas,
//         Anime,
//     })
// });

app.listen(port, ()=>{
    console.log(`Server menyala di http://localhost:${port}`);
});