import axios from 'axios'

export const getTemperaments = () => async(dispatch) => {
    try {
        const response = await axios.get('temperament')
        .then(dispatch({
            type: 'GET_TEMPERAMENTS',
            payload: response.data
        }))

    } catch (err){
        console.log(err)
    }
    
}


export const filterDogsByTemperaments = (payload) =>{
    return{
        type: 'FILTER_BY_TEMPERAMENTS',
        payload
    }
}