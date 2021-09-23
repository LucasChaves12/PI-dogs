import axios from 'axios'

export const getDogs = () => async (dispatch) => {
    try{
        const response = await axios.get('dogs')
        .then(dispatch({ type: 'GET_DOGS', payload: response.data}))
    } catch (err) {
        console.log(err)
    }
}

export const getNameDogs = (dogName) => async (dispatch) => {
    try{
        const response = await axios.get(`dogs?name=${dogName}`)
        .then(dispatch({ type: 'GET_NAME_DOGS', payload: response.data}))
    } catch (err) {
        alert('EL nombre ingresado no existe')
    }
}

export const filterCreated = (payload) => {
    return{
        type:'FILTER_CREATED',
        payload
    }
}

export function postDogs(payload) {
    // console.log(payload)
     return async function (dispatch){
         const response = await axios.post("http://localhost:3001/dogs", payload);
         console.log(response);
         return response;
     }
     
 }

/* export const postDogs = (payload) = async (dispatch) => {
    const response = await axios.post('/dogs', payload)
    return response
} */

export const orderByName = (payload) => {
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export const orderByWeight = (payload) => {
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export const getDetail = (id) => async (dispatch) => {
    try{
        const response = await axios.get(`dogs/${id}`)
        .then(dispatch ({
            type: 'GET_DETAILS',
            payload: response.data
        }))
    } catch(err){
        alert('No existe perro con esa ID')
    }
}