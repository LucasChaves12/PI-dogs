import axios from 'axios';

export function getDogs() {
    return async function(dispatch) {
      try {
        let json = await axios.get(`dogs`);
        console.log(json)
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        }) 
      } catch (error) {
          console.log(error)
      }  
    }
    
}

export function getNameDogs(name){
    return async function(dispatch){
        try{
            let dogsByName = await axios.get("dogs?name=" + name)
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: dogsByName.data
            })
        }catch(error){
            alert("El Nombre ingresado no existe en la base de datos, prueba otro o agrega uno nuevo")
            console.log(error)
        }

    }
}

export function getTemperaments(){
    return async function (dispatch){
        let temp = await axios.get("temperament", {
        
        });
        console.log(temp.data)
        return dispatch ({type: "GET_TEMPERAMENTS", payload: temp.data})
    }
}

export function filterDogsByTemperaments(payload){
   // console.log("payload",payload)
    return{
        type: "FILTER_BY_TEMPERAMENTS",
        payload
    }
}

//filtra los dogs entre los creados y los que estan vienen de la api
export function filterCreated(payload) {
    return{
        type:"FILTER_CREATED",
        payload
    }
}
export function postDogs(payload) {
   // console.log(payload)
    return async function (dispatch){
        const response = await axios.post("dogs", payload)
        console.log(response);
        return response;
    }
    
}

export function advancedSearch(value){
    return async function(dispatch) {
        try {
          let asd = await axios.get(`dogs`);
          return dispatch({
              type: "ADVANCED_SEARCH",
              payload: asd.data.filter((el) => el.name.includes(value))
          }) 
        } catch (error) {
            console.log(error)
        }  
      }
}

export function orderByName(payload){
   
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByWeight(payload){
   
    return {
        type: 'ORDER_BY_WEIGHT',
        payload
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            let json = await axios.get("dogs/" + id)
        return dispatch ({
            type: 'GET_DETAILS',
            payload: json.data
        })
        
    }catch(error){
        console.log(error)
    }}
}

