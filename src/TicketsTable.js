import React from 'react';
import TicketRow from './TicketRow';
//function componets -name in pascal casing-return jsx - accepts arg via prop
function TicketsTable(props){
    return (
        <div>
                <span></span><h4>Listing Tickets -{props.tickets.length}</h4>
                <table border ="1" className="table table-striped  table-dark">
                <thead>
                <tr>
                    <th>Code</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Priority</th>
                    <th>Message</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {
                props.tickets.map(ticket=>{
                    return (
                        <TicketRow key={ticket.ticket_code} tickets={props.tickets} handleUpdate={props.handleUpdate}
                            {...ticket}
                            
                            />
                    )
                })
                }
                </tbody>
            </table>
        </div>    
    )
}
export default TicketsTable;