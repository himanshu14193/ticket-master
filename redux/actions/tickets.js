export const removeTicket = (id) =>{
    return {
        type:'REMOVE_TICKET',
        payload:id
    }
}

export const addTicket = (ticket) => {
    return {
        type:'ADD_TICKET',
        payload:ticket
    }
}
export const startAddTicket = (data) =>{
        return (dispatch) => {
            axios.post('https://dct-api-data.herokuapp.com/tickets?api_key=7f9738fc7ac65084',data)
                .then (res=>{
                    dispatch(addTicket(res.data))
                })
                .catch(err=>console.log(err))
        }
}
export const setTickets =(tickets) =>{
    return {
        type:'SET_TICKETS',
        payload:tickets
    }
}
export const startGetTickets = () =>{
    return (dispatch) => {
        axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=7f9738fc7ac65084')
            .then (res=>{
                dispatch(setTickets(res.data))
            })
    }
}