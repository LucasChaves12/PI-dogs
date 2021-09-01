const getAllDogs = require('./GetAllDogs')
const getAllApi = require ('./getFromApi')
const getAllDb = require ('./getFromDb')

const getDogDetail = async (type, el) => {
    let dogapi = await getAllApi()
    let dogdb = await getAllDb()
    let resultDogs = dogapi.concat(dogdb)

    switch(type) {
        case 'GET_NAME':
            return resultDogs.filter((val) => val.name === el)

        case 'GET_ID':
            return resultDogs.filter((val) => val.id.toString() === el)

        default:
            return resultDogs
    }
}

module.exports = getDogDetail