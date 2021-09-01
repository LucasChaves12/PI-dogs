const {Breed, Temperament} = require('../db')
// Traigo los perros de la base de datos
const getAllDb = async () =>{
    return await Breed.findAll({
        include:{
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

module.exports = getAllDb