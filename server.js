import express from 'express';
const app = express();

const PORT = 8080;
const server = app.listen(PORT, () => {
    app.use(express.json());
    app.use(express.urlencoded({extended:true}));
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
 }); 

 server.on("error", error => console.log(`Error en servidor ${error}`))

 app.get('/', (req, res) => {
    res.send({ mensaje: 'hola mundo' })
 })

 app.get('/productos', async (req,res) => {
     res.send(await productos.getAll());
 })

 app.get('/api/sumar/:num1/:num2', async (req,res) => {
    let {num1,num2} = req.params;

    res.send(Number(num1)+Number(num2));
 })

 app.get('/api/sumar',(req,res)=>{
     try{
    let {num1,num2} = req.query;
    num1 =  Number(num1);
    num2 =  Number(num2);
    let suma = num1+num2;
    res.send({suma});
    }catch(err){
        console.log(err);
        res.send('hola')
    }
 });