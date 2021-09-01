const axios = require ('axios')
// Traigo los perros de la API
const getApi = async () => {
    try{
    let dogUrl = await axios.get('https://api.thedogapi.com/v1/breeds')
        const apidog = await dogUrl.data.map((el) => {
            return {
            id: el.id,
            name: el.name,
            height: el.height.metric,
            weight: el.weight.metric,
            life_span: el.life_span,
            temperament: el.temperament,
            img: el.image.url
        }
    })
       return apidog
     } catch(error){
         console.log(error)
     }
    }
    


const getAllApi = getApi
module.exports = getAllApi