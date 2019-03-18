import React from 'react'
import axios from 'axios'
import { Spinner } from 'reactstrap'
class TicketRow extends React.Component{
    constructor(props){
        super(props)
        this.state={
            loading:true
        }
    }
    
    handleUnChecked = (props,e) => {
        const ischecked=e.target.checked
        if(ischecked){
            this.setState(()=>({loading:false}))
            axios.put(`https://cors-anywhere.herokuapp.com/http://dct-api-data.herokuapp.com/tickets/${props.ticket_code}?api_key=7f9738fc7ac65084`,
                {"status" : "completed"})
                .then(res => {
                    this.props.handleUpdate(res.data,ischecked)
                    this.setState(()=>({
                        loading:true
                    }))
                })
                .catch(err=>{
                    console.log(err)
                    this.setState(()=>({
                        loading:true
                    }))
                })
        }else{
            axios.put(`https://cors-anywhere.herokuapp.com/http://dct-api-data.herokuapp.com/tickets/${props.ticket_code}?api_key=7f9738fc7ac65084`,
                {"status" : "open"})
                .then(res => {
                    this.props.handleUpdate(res.data,ischecked)
                    this.setState(()=>({
                        loading:true
                    }))
                })
                .catch(err=>{
                    console.log(err)
                    this.setState(()=>({
                        loading:true
                    }))
                })
        }
    }
    
    render(){
        
        return (
            <tr>
                <td>{this.props.ticket_code}</td>
                <td>{this.props.name}</td>
                <td>{this.props.department}</td>
                <td>{this.props.priority}</td>
                <td>{this.props.message}</td>
                <td>{
                        this.state.loading?(
                            this.props.status==='open' ?
                                <input type="checkbox" value="open" onChange={(e)=>{this.handleUnChecked(this.props,e)}}  />:
                                <input type="checkbox" value="completed" onChange={(e)=>{this.handleUnChecked(this.props,e)}} defaultChecked="checked" />
                            ):<Spinner size="sm" color="primary" />
                        }
                </td>
            </tr>
    )
    }
    
}

export default TicketRow