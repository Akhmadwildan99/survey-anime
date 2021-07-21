const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const data = require('./controller/data');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const port = 3000;

app.set('view engine', 'ejs'); //Set EJS
app.use(expressLayouts); //use express-ejs-layouts middleware
app.use(express.static('public')); //Middleware for file static
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(data);
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


app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Halaman Form Survei',
        css: 'css/style.css',
        layout: 'layouts/main-layouts',
        msg: req.flash('msg'),
    });
});

app.listen(port, ()=>{
    console.log(`Server menyala di http://localhost:${port}`);
});