const express = require('express')
const app = express()
var bodyparser = require('body-parser')
var cookieparser = require('cookie-parser')
var path = require('path')
var Produto = require('./modelo/produto')

app.use(cookieparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

app.set('view engine','ejs')

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000,function(){
    console.log('Conectado!')
})

app.get('/',function(req,res){
    res.render('index.ejs',{})
})

app.get('/cadastro',function(req,res){
    res.render('cadastro.ejs',{})
})

app.post('/cadastro', function(req,res){
   var produto = new Produto({
       marca:req.body.marca, 
       tipo:req.body.tipo, 
       cor:req.body.cor, 
       preco:req.body.preco
   })
   produto.save(function(err){
        if (err) {
            res.render('',{ "msg": err})
        }
        else {
            res.render('index.js', { "msg": 'Adicionado com sucesso' })
        }
   })
   

