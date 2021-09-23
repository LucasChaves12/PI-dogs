const initialState = {
    dogs: [],
    allDogs: [],
    detail: [],
}

const DogReducer =(state = initialState, action) => {
    switch(action.type) {
        case 'GET_DOGS':
            return{
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }

        case 'GET_NAME_DOGS':
            return {
                ...state,
                dogs: action.payload
            }

        case 'FILTER_CREATED':
            const allDogsCreated = state.allDogs
            const createdFilter = action.payload === 'created' ? allDogsCreated.filter((e) => e.createdInDb):
            allDogsCreated.filter((e) => !e.createdInDb)
            return{
                ...state,
                dogs: action.payload === 'All' ? allDogsCreated : createdFilter
            }

        case 'POST_DOG':
            return{
                ...state
            }

        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }

        case 'ORDER_BY_NAME':
            let sortedArr = action.payload ==='asc' ?
            state.dogs.sort((a, b) => {
                if (a.name > b.name){
                    return 1
                }
                if (b.name > a.name){
                    return -1
                }
                return 0
            }) :
            state.dogs.sort((a, b)=> {
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                dogs: sortedArr
            }

        case 'ORDER_BY_WEIGHT':
            let sortedArrWeight = action.payload === 'weightasc' ?
            state.dogs.sort((a, b) => {
                return b.weight - a.weight
            }) :
            state.dogs.sort((a, b) => {
                return a.weight - b.weight
            })
            return{
                ...state,
                dogs: sortedArrWeight
            }
        
        default:
            return state
   }
}

export default DogReducer