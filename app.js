const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const data = require('./controller/data')
const port = 3000;

app.set('view engine', 'ejs'); //Set EJS
app.use(expressLayouts); //use express-ejs-layouts middleware
app.use(express.static('public')); //Middleware for file static
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(data);


app.get('/', (req, res)=>{
    res.render('index', {
        title: 'Halaman Form Survei',
        css: 'css/style.css',
        layout: 'layouts/main-layouts'
    });
});

app.listen(port, ()=>{
    console.log(`Server menyala di http://localhost:${port}`);
});