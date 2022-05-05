const fs = require('fs')
const path = require('path')

class Container {

    constructor (fileName){
        this.fileName = fileName
    }

        async save(newMovie){
            try{
                const movieDatabase = await fs.promises.readFile(`./${this.fileName}`,'utf-8')
                let movies = []

                //2. Crea el ID

                //2.1. Si no hay datos, crea id : 1

                if (movieDatabase === ''){
                    newMovie.id = 1;
                    movies.push(newMovie);

                } else { //2.2 Si hay un ID, suma al anterior
                    const movieList = JSON.parse(movieDatabase);
                    newMovie.id = movieList[movieList.length -1].id + 1;
                    movieList.push(newMovie);
                    movies = movieList
                }

                const movieString = JSON.stringify(movies, null, 2)
                await fs.promises.writeFile(`./${this.fileName}`, movieString);
                console.log('The movie has been saved on the database')
                
             } catch(error) {
                    console.error('Error: ', error)
             }
         }}

module.exports= Container