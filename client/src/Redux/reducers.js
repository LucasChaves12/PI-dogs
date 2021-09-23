/* import DogReducer from "./DogsReducer/reducer";
import temperamentReducer from "./TemperamentReducer/reducer";
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    DogReducer,
    temperamentReducer
})

export default rootReducer */
const initialState = {
    dogs: [], 
    allDogs: [], 
    temperaments: [],
    detail: [],
  };
   
  
  
   function rootReducer(state = initialState, action) {
    switch (action.type) {
      case "GET_DOGS":
        return {
          ...state,
          dogs: action.payload,
          allDogs: action.payload,
        };
  
      case "GET_NAME_DOGS":
          return{
          ...state,
          dogs: action.payload,
         
        };
  
      case "FILTER_BY_TEMPERAMENTS":
        const allDogs = state.allDogs;
        const temperamentFiltered =
          action.payload === "All"
            ? allDogs
            : allDogs.filter(
                (el) =>
                  el.temperament &&
                  el.temperament.split(", ").find((e) => e === action.payload)
              );
        return {
          ...state,
          dogs: temperamentFiltered,
        };
  
      case "FILTER_CREATED":
          const allDogsCreated = state.allDogs;
          const createdFilter = action.payload === "created" ? allDogsCreated.filter(e => e.createdInDb) : 
          allDogsCreated.filter(e => !e.createdInDb) ;
          return {
          ...state,
          dogs: action.payload === 'All' ? allDogsCreated : createdFilter 
        };
  
      case "POST_DOG":
        return{
          ...state
        };
      case "GET_TEMPERAMENTS":
        return{
          ...state,
          temperaments: action.payload
        }


      case "ADVANCED_SEARCH":
          return{
            ...state,
            dogs: action.payload,
            allDogs: action.payload,
          }
          
      case "GET_DETAILS":
        return{
          ...state,
          detail: action.payload
        }
  
      case "ORDER_BY_NAME":
          let sortedArr = action.payload === 'asc' ? 
          state.dogs.sort(function (a, b){
              if (a.name > b.name){
                  return 1;
              }
              if (b.name > a.name){
                  return -1;
              }
              return 0;
          }) :
          state.dogs.sort(function(a, b){
              if (a.name > b.name){
                  return -1;
              }
              if (b.name > a.name){
                  return 1;
              }
              return 0;
          })
          return{
          ...state,
          dogs: sortedArr
          };
          
          case "ORDER_BY_WEIGHT":
                  
          let sortedArrWeight = action.payload === 'weightasc' ? 
              state.dogs
              .filter((b) => b.weight !== null)
              .sort((a, b) => (a.weight > b.weight ? 1 : -1))  :       
               state.dogs
              .filter((b) => b.weight !== null)
              .sort((a, b) => (a.weight < b.weight ? 1 : -1))
              return{
              ...state,
              dogs: sortedArrWeight
              }
      default:
        return state;
    }
  }
  
  export default rootReducer;