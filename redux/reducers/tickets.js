const ticketsInitialState = []
const projectsReducer = (state = ticketsInitialState , action ) => {
    switch(action.type){
        case 'ADD_TICKET':
            return [...state,action.project]
        case 'REMOVE_TICKET':
            return state.filter(project => project.id != action.payload)
        case 'SET_TICKETS':
            return [...action.payload]
        default:
            return[...state]
    }
}
module.exports = projectsReducer