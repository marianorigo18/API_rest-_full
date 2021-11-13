//requerimiento de dependencies
const express = require ('express');
const mysql = require ('mysql');
const cors = require('cors');

const app = express();
app.use(express.json());//asi le decimos a nuestra app que vamos a utilizar json
app.use(cors());
//establecemos los parametros de conexion
let conexcion = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electricidad centro s.a"
});
//conectarnos a la base de datos
conexcion.connect(function(error){
    if(error){
        throw error;
    }else{
        console.log('connection to sever ok')
    }
})
//routes
//initial route
app.get('/', function(req, res){
    res.send('ruta inicial');
});
//show all article
app.get('/api/articulos', (req, res) =>{
    conexcion.query('SELECT * from contraree', (error, filas)=>{
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});
//show specific items 
app.get('/api/articulos/:id', (req, res) =>{
    conexcion.query('SELECT * from contraree WHERE id = ?',[req.params.id], (error, fila)=>{
        if(error){
            throw error;
        }else{
            res.send(fila);
        }
    });
});
//create articles   
app.post('/api/articulos', (req, res) => {
    let data = {cliente:req.body.cliente, remito:req.body.remito, bultos:req.body.bultos};
    let sql = "INSERT INTO contraree SET ?";
    conexcion.query(sql, data, function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});
//update article
app.put('/api/articulos/:id', (req, res)=>{
    let id = req.params.id;
    let cliente = req.body.cliente;
    let remito = req.body.remito;
    let bultos = req.body.bultos;
    let sql = "UPDATE contraree SET cliente = ?, remito = ?, bultos = ? WHERE id = ?";
    conexcion.query(sql, [cliente, remito, bultos, id], function(error, results){
        if(error){
            throw error;
        }else{
            res.send(results);
        }
    });
});
//delete article
app.delete('/api/articulos/:id', (req, res)=>{
    conexcion.query('DELETE FROM contraree WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error;
        }else{
            res.send(filas);
        }
    });
});
//puerto
const puerto = process.env.PUERTO || 3000;
//server listen
app.listen(puerto, function(){
    console.log('servidor escuchando en puerto '+ puerto);
});