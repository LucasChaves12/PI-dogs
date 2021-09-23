
const initialState = {
    temperaments: [],
    allDogs: [],
    dogs: [],
    detail: []
}

const temperamentReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FILTER_BY_TEMPERAMENTS':
            const allDogs = state.allDogs
            const temperamentFiltered =
            action.payload ==='All'
            ? allDogs
            :allDogs.filter((el) => el.temperament && el.temperament.split(', ').find((e) => e === action.payload))
            return {
                ...state,
                dogs: temperamentFiltered
            }

        case 'GET_TEMPERAMENTS':
            return{
                ...state,
                detail: action.payload
            }

        default:
            return state
    }
}

export default temperamentReducer