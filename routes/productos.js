import { Router } from "express";
const router = Router();
import {Contenedor} from '../classes/Contenedor.js';
import {isAdmin} from '../security/admin.js';

const contenedor = new Contenedor('listadoProductos.txt')

router.get('/:id', async (req,res) =>{
    let {id} = req.params;
    let producto = null;
    //Si me especificaron un producto
    if (id)
        producto = await contenedor.getById(Number(id));
    //si no me especificaron ninguno, me traigo todos
    else
        producto = await contenedor.getAll();
    if (producto)
        res.status(200).json(JSON.stringify(producto));
    else
        res.status(404).json({error:"producto no encontrado."});
});

router.post('/', async (req,res) =>{
    if (!isAdmin)
        res.status(301).json({error:-1,descripcion: 'ruta productos metodo POST no autorizada.'});
    else{
        let {nombre,descripcion,codigo,precio,stock,foto} = req.body;
        let date = Date.now();
        let id = await contenedor.save({nombre,descripcion,codigo,precio,stock,foto,date});
        res.status(200).json({nombre,descripcion,codigo,precio,stock,foto,date,id});
    }
});

router.put('/:id', async (req,res) =>{
    if (!isAdmin)
        res.status(301).json({error:-1,descripcion: 'ruta productos metodo PUT no autorizada.'});
    else{
        let {nombre,precio,foto} = req.body;
        let {id} = req.params;

        let newProd = await contenedor.getById(Number(id));
        newProd["nombre"]=nombre;
        newProd["precio"]=precio;
        newProd["foto"]=foto;

        let result = await contenedor.modifyProduct(newProd);
        if (result)
            res.status(200).json(`Se modifico el producto con id ${id} exitosamente.`);
        else
            res.status(500).json(`Ocurrio un error al modificar el producto con id ${id}.`);
    }
});

router.delete('/:id', async (req,res) =>{
    let {id} = req.params;
    if(!isAdmin)
        res.status(301).json({error:-1,descripcion: 'ruta productos metodo DELETE no autorizada.'});
    else{
        let result = await contenedor.deleteById(Number(id));
        if (result)
            res.status(200).json(`Se elimino el producto con id ${id} exitosamente.`);
        else
            res.status(500).json(`Ocurrio un error al eliminar el producto con id ${id}.`);
    }
});

export const productosRouter = router;