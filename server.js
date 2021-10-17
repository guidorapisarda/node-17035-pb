import express from 'express';
import {Contenedor} from './Contenedor.js';
const app = express();
const PORT = 8080;

let productos=null;

const server = app.listen(PORT, () => {
    productos = new Contenedor('./productos.txt');
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 }); 

 server.on("error", error => console.log(`Error en servidor ${error}`))

 app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
 })

 app.get('/productos', async (req,res) => {
     res.send(await productos.getAll());
 })

 app.get('/agregarProductos', async (req,res) => {
    let ids = [];
    ids.push(await productos.save({
        title: 'Escuadra',
        price: '16.36',
        thumbnail: 'https://google.com.ar'
    }))
    ids.push(await productos.save({
        title: 'Regla',
        price: '65.36',
        thumbnail: 'https://google.com.ar'
    }))
    ids.push(await productos.save({
        title: 'Lápiz',
        price: '6464.1',
        thumbnail: 'https://google.com.ar'
    }))
    ids.push(await productos.save({
        title: 'Lapicera',
        price: '6868',
        thumbnail: 'https://google.com.ar'
    }))
    ids.push(await productos.save({
        title: '6432.1',
        price: 'precio',
        thumbnail: 'https://google.com.ar'
    }))

    res.send('Se agregaron productos.'+JSON.stringify(ids));
 })

 app.get('/productoRandom',async (req,res)=>{
     let prods = await productos.getAll();
     res.send(prods[Math.floor(Math.random()*prods.length)]);
 });