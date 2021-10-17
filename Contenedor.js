import fs from 'fs';

export class Contenedor{
    constructor(fileName){
        this.file = fileName;
    }

    async save(object){

        let values = await this.getAll();
        let id = 1;
        if (!values){
            values = [];
        }else{
            if(values.length >0){
                let idList = values.map(element => element.id);
                id = Math.max(...idList)+1;
            }   
        }
        object["id"]=id;
        values.push(object);
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(values,null,2));
            return id;
        }catch(err){
            console.log('Ocurrió un error inesperado...'+err);
            return null;
        }
    }

    async getAll(){
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            return JSON.parse(content);
        } catch (err) {
            console.log('Ocurrió un error inesperado... ' + err);
            return null;
        }
    }

    async getById(id){
        try{
            let values = await this.getAll();
            let result = values.find(elem => elem.id ===id);
            return result;
        }catch(err){
            console.log('Ocurrió un error inesperado... ' + err);
            return null;
        }
    }

    async findIndex(id){
        try{
            let values = await this.getAll();
            let resultIndex = values.findIndex(elem => elem.id ===id);
            return resultIndex;
        }catch(err){
            console.log('Ocurrió un error inesperado... ' + err);
            return null;
        }
    }

    async deleteById(id){
        let values = await this.getAll();
        let indexToDelete = await this.findIndex(id);
        if (indexToDelete>-1){
            values.splice(indexToDelete,1);
            let saved = await this.saveValues(values)
            if(saved)
                console.log('se eliminó el elemento con id '+id);
        }else
            console.log('No se encontró el elemento con id '+id);
    }

    async saveValues(values){
        try{
            await fs.promises.writeFile(this.file,JSON.stringify(values,null,2));
            return true;
        }catch(err){
            console.log('Ocurrió un error inesperado... ' + err);
            return false;
        }
    }

    async deleteAll(){
        let values = [];
        if (await this.saveValues(values))
            console.log('Se eliminaron todos los elementos.');
    }
}