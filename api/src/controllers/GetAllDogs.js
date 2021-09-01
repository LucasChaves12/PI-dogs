const getAllApi = require('./getFromApi')
const getAllDb = require('./getFromDb')

// Juntar a todos los perros
const getAllDogs =  () => {
    try {
    const dogApi = getAllApi()
    const dogDB = getAllDb()
    Promise.all([dogApi, dogDB])
    .then((response) => {
        const [apiResponse, dbResponse] = response
        dbResponse.concat(apiResponse) 
        console.log(apiResponse, dbResponse)
        return dbResponse
    })
    } catch (error){
        console.log(error)
    }
}

module.exports = getAllDogs