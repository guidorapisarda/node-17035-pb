class Usuario {
    constructor(nombre, apellido){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = [];
        this.mascotas = [];
    }
    
    getFullName(){
        return `Mi nombre es ${this.nombre} ${this.apellido}`;
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota);
    }

    countMascotas (){
        return this.mascotas.length;
    }

    addBook(libro,autor){
        this.libros.push({
            libro,
            autor
        });
    }

    getBookNames(){
        return this.libros.map(libro => libro.name);
    }
}