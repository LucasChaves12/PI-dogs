const { Temperament } = require ('../db')

const getTemperament = (_req, res) =>{
let totalTemperaments = Temperament.findAll()
return res.json(totalTemperaments)
}

module.exports = getTemperament