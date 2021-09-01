const { Router } = require("express");
const { Temperament } = require("../db");
const router = Router()

router.get('/temperament', async (req, res) => {
    let allTemperaments = await Temperament.findAll()
    return res.status(200).send(allTemperaments)
})

module.exports = router