import { Router } from "express";
const router = Router();
import {Contenedor} from '../classes/Contenedor.js';

const contenedor = new Contenedor('listadoCarritos.txt');

router.post('/', async (req,res)=>{
    let productos = [];
    let date = Date.now();
    let id = await contenedor.save({date,productos});
    res.status(200).json({id,date,productos});
});

router.delete('/:id',async (req,res) => {
    let {id} = req.params;
    let result = await contenedor.deleteById(Number(id));
    if (result)
        res.status(200).json(`Se elimino el carrito con id ${id} exitosamente.`);
    else
        res.status(500).json(`Ocurrio un error al eliminar el carrito con id ${id}.`);
});

router.get('/:id/productos',async (req,res)=>{
    let {id} = req.params;
    let carrito = await contenedor.getById(Number(id));
    if (carrito)
        res.status(200).json(carrito["productos"]);
    else
        res.status(404).json({error:"Carrito no encontrado."});
});

router.post('/:id/productos', async (req,res)=>{
    let {id} = req.params;
    let {producto} = req.body;
    let carrito = await contenedor.getById(Number(id));
    if (carrito){
        carrito.productos.push(producto);
        let result = await contenedor.modifyProduct(carrito);
        if (result)
            res.status(200).json(`Se modifico el producto con id ${id} exitosamente.`);
        else
            res.status(500).json(`Ocurrio un error al modificar el carrito con id ${id}.`);
    }else
        res.status(404).json({error:`No existe el carrito con id ${id}.`});
});

router.delete('/:id/productos/:id_prod',async (req,res)=>{
    let {id,id_prod} = req.params;
    let carrito = await contenedor.getById(Number(id));
    if (carrito){
        for (let i=0;i<carrito.productos.length;i++){
            let current = carrito.productos[i];
            if(current.id === id_prod){
                carrito.productos.splice(i,1);
                break;
            }
        }
        let result = await contenedor.modifyProduct(carrito);
        if (result)
            res.status(200).json(`Se modifico el carrito con id ${id} exitosamente, eliminando el producto con id ${id_prod}.`);
        else
            res.status(500).json(`Ocurrio un error al eliminar el producto con id ${id_prod} del carrito ${id}.`);
    }else
        res.status(404).json({error:`No existe el carrito con id ${id}.`});
    
});

export const carritoRouter = router;