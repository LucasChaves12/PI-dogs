const axios = require("axios")
const { Router } = require('express')
const { getDogDetail, getAllDogs, getAllApi, getAllDb} = require('../controllers')
const { Breed, Temperament } = require ('../db')


const router = Router()

router.get('/dogs', async (req, res) =>{
    const { name } = req.query  
    let dogapi = await getAllApi()
    let dogdb = await getAllDb()
    let dogTotal = dogapi.concat(dogdb)
    if(name) {
        let dogName = await getDogDetail('GET_NAME', name)
        dogName.length > 0 ? res.status(200).send(dogName) : res.status(404).send('Perro no encontrado')
    }
    else{
    return res.status(200).json(dogTotal)
    }
})

router.get('/dogs/:id', async (req, res) => {
    const { id } = req.params
    if(id) {
        let dogId = await getDogDetail('GET_ID', id)
        dogId.length ? res.status(200).send(dogId) : res.status(404).send('No hay ningun perro con esa ID')
    }
})

router.post('/dogs', async (req,res) => {
    const {
        name,
        height,
        weight,
        life_span,
        temperament,
        createdInDb,
        img
    } = req.body
    try {
     let dogCreated = await Breed.create({
        name,
        height,
        weight,
        life_span,
        createdInDb,
        img
    })
    let temperamentDb = await Temperament.findAll({
        where: { name: temperament}
    })
    await dogCreated.setTemperaments(temperamentDb)
    return res.status(200).send('Creado con exito')
} catch (err) {
    console.error(err)
}
})

module.exports = router