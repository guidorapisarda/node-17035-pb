import Usuario from './Usuario'

let usuarios = [];

let usuario1 = new Usuario('Juan','Roman');
let usuario2 = new Usuario('Ricardo','Ruben');
let usuario3 = new Usuario('Ernesto','Diaz');
let usuario4 = new Usuario('Elon','Musk');

usuarios.push(usuario1,usuario2,usuario3,usuario4);

usuario1.addMascota('pupi');

usuario2.addMascota('pupi2');

usuario3.addMascota('pupi3');

usuario4.addMascota('pupi4');

usuario1.addMascota('pupi5');


usuario1.addBook('El senor de los anillos','J.R.R. Tolkin');
usuario2.addBook('pupi2','pupi3');
usuario3.addBook('pupi3','pupi4');
usuario4.addBook('pupi4','pupi5');
usuario1.addBook('pupi5','pupi6');

usuarios.forEach(user => {
    console.log(`${user.getFullName()} y tengo ${user.countMascotas()}. Los libros que me gusta son:\n${getBookNames()}`);
});