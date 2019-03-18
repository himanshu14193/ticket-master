import React from 'react'
import { Input } from 'reactstrap'
function TicketSearch(props){
    return (
        <div align="right">
            <label>
                <Input type="text" onChange={(e)=>{props.handleSearch(e)}} placeholder='Search by code' />
            </label>
        </div>
    )
}

export default TicketSearch