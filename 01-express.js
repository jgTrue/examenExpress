'use strict'

const {default: mongoose} = require("mongoose");
let bodyParser = require('body-parser');



require('dotenv').config();
let port = process.env.PORT || 3000;

const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.oazj2gw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri,
    {useNewUrlParser: true, useUnifiedTopology: true}
)
    .then(()=> console.log('Base de datos conectada'))
    .catch(e=>console.log(e))

let express = require('express'),
    app = express();
    // ruta = app.use(express.static(__dirname+'/assets/'));
    //*  -------PARSE-------
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }));
    // parse application/json
    app.use(bodyParser.json());
    //*  -------VIEWS-------
    app.set('view engine','ejs')
    app.set('views',__dirname+'/views/')

    //*  -------STATIC FILE-------
    app.use(express.static(__dirname+'/public/'));

    //*  -------ROUTES-------
    app.use('/',require('./router/routes'));
    

    app.use((req,res)=>{
        res.status(404).render('404',{
            titulo: 'Error 404',
            descripcion: 'Page Not Found'
        })
    })

        .listen(port)

    console.log('Iniciando Express en el puerto '+port)
