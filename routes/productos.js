import { Router } from "express";
const router = Router();
import {Contenedor} from '../classes/Contenedor.js';

const contenedor = new Contenedor('listadoProductos.txt')

router.get('/productos', async (req,res) =>{
    let prods = await contenedor.getAll();
    res.status(200).json(JSON.stringify(prods));
});

router.get('/productos/:id', async (req,res) =>{
    let {id} = req.params;
    let producto = await contenedor.getById(Number(id));
    if (producto)
        res.status(200).json(JSON.stringify(producto));
    else
        res.status(404).json({error:"producto no encontrado."});
});

router.post('/productos', async (req,res) =>{
    let {nombre,precio,foto} = req.body;
    console.log(req.body);
    let id = await contenedor.save({nombre,precio,foto});
    res.status(200).json({nombre,precio,foto,id});
});

router.put('/productos/:id', async (req,res) =>{
    let {nombre,precio,foto} = req.body;
    let {id} = req.params;

    let newProd = await contenedor.getById(Number(id));
    newProd["nombre"]=nombre;
    newProd["precio"]=precio;
    newProd["foto"]=foto;

    let result = await contenedor.modifyProduct(newProd);
    if (result){
       res.status(200).json(`Se modifico el producto con id ${id} exitosamente.`);
    }else{
        res.status(500).json(`Ocurrio un error al modificar el producto con id ${id}.`)
    }
});

router.delete('/productos/:id', async (req,res) =>{
    let {id} = req.params;
    let result = await contenedor.deleteById(Number(id));
    if (result){
        res.status(200).json(`Se elimino el producto con id ${id} exitosamente.`);
     }else{
         res.status(500).json(`Ocurrio un error al eliminar el producto con id ${id}.`)
     }
});

export const productosRouter = router;