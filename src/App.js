import React, { Component } from 'react'
// import { BrowserRouter, Route , Link} from 'react-router-dom'

import axios from 'axios'
import TicketsTable from './TicketsTable'
import TicketForm from './TicketForm'
import TicketPieChart from './TicketPieChart'
import { Button, ButtonGroup, Progress, Spinner, Row, Col } from 'reactstrap'
import TicketSearch from './TicketSearch';
class App extends Component {
  constructor(){
    super()
    this.state ={
      tickets:[],
      filtered:[],
      priority:"all",
      completed:0,
      total:0,
      loading:false,
      priorityarr:[],
      departmentarr:[],
      high:0,
      medium:0,
      low:0,
      technical:0,
      service:0,
      sales:0
    }
    this.onBtnClick = this.onBtnClick.bind(this);
  }
  componentDidMount(){ //this is a life cycle method -post render- preferred to make api calls
    var count=0
    const priorityarr=[],departmentarr=[]
    axios.get('https://dct-api-data.herokuapp.com/tickets?api_key=7f9738fc7ac65084')
      .then(response=>{
        response.data.forEach(value =>{
          if(value.status==="completed"){
            count++
          }
          priorityarr.push(value.priority)
          departmentarr.push(value.department)
        })
        for(let i=0;i<priorityarr.length;i++){
          if(priorityarr[i]==="high"){
              this.setState((prevState)=>({ high:prevState.high+1 }))
          }
          else if(priorityarr[i]==="medium"){
              this.setState((prevState)=>({ medium:prevState.medium+1 }))
          }
          else if(priorityarr[i]==="low"){
              this.setState((prevState)=>({ low:prevState.low+1 }))
          }
        }
        for(let i=0;i<departmentarr.length;i++){
          if(departmentarr[i]==="sales"){
              this.setState((prevState)=>({ sales:prevState.sales+1 }))
          }
          else if(departmentarr[i]==="service"){
              this.setState((prevState)=>({ service:prevState.service+1 }))
          }
          else if(departmentarr[i]==="technical"){
              this.setState((prevState)=>({ technical:prevState.technical+1 }))
          }
        }
        this.setState(()=> ({
          tickets: response.data,
          filtered:response.data,
          total:response.data.length,
          completed:count,
          loading:true,
          priorityarr,
          departmentarr
        }))

      })
      .catch(err=>{
        console.log(err)
      })
  }
  onBtnClick(priority) {
    this.setState(()=>({ priority }))
  }
  addTickets =(data)=>{
    this.setState((prevState)=>({
      tickets: [...prevState.tickets, data],
      priorityarr:[...prevState.priorityarr,data.priority],
      departmentarr:[...prevState.departmentarr,data.department]
    }))
    if(data.priority==="high"){
      this.setState((prevState)=>({ high:prevState.high+1 }))
    }
    else if(data.priority==="medium"){
        this.setState((prevState)=>({ medium:prevState.medium+1 }))
    }
    else if(data.priority==="low"){
        this.setState((prevState)=>({ low:prevState.low+1 }))
    }
    if(data.department==="sales"){
      this.setState((prevState)=>({ sales:prevState.sales+1 }))
    }
    else if(data.department==="service"){
        this.setState((prevState)=>({ service:prevState.service+1 }))
    }
    else if(data.department==="technical"){
        this.setState((prevState)=>({ technical:prevState.technical+1 }))
    }
  }

  handleUpdate = (data,ischecked) =>{
    if(ischecked){
      this.setState((prevState)=>({ completed:prevState.completed+1}))
    }else{
      this.setState((prevState)=>({ completed:prevState.completed-1}))
    }
    this.setState((prevState)=>({
        tickets: prevState.tickets.map(ticket => {
          if(ticket.ticket_code === data.ticket_code) {
            return {...ticket, ...data}
          } else {
            return ticket
          }
        })
    }))
  }
  handleSearch = (e) => {
    const search=e.target.value
        this.setState((prevState)=>({
            filtered: prevState.tickets.filter(ticket => (
              ticket.ticket_code.slice(0,search.length) ===search ) )
        }))
  }
  render() {
    
    let button
    if(this.state.priority==="all"){
      button=<TicketsTable tickets={this.state.tickets} handleUpdate={this.handleUpdate}/>
    }
    else{
      button=<TicketsTable tickets={this.state.tickets.filter(ticket => ticket.priority===this.state.priority)} handleUpdate={this.handleUpdate}/>
    }
    return (
      <div className="container text-white"  >
        {this.state.loading?
          <div >
            <Row>
              <Col className="container-fluid" sm={{ size: 'auto' }} >
              <h1 align="left">Ticket-Master</h1>
              <TicketSearch handleSearch={this.handleSearch} />
                <div>
                  <ButtonGroup className="float-right" size="sm" >
                    <Button className="btn btn-dark" onClick={() => this.onBtnClick("all")} active={this.state.priority === "All"}>All</Button>
                    <Button className="btn btn-dark" onClick={() => this.onBtnClick("high")} active={this.state.priority === "High"}>High</Button>
                    <Button className="btn btn-dark" onClick={() => this.onBtnClick("medium")} active={this.state.priority === "Medium"}>Medium</Button>
                    <Button className="btn btn-dark" onClick={() => this.onBtnClick("low")} active={this.state.priority === "Low"}>Low</Button>
                  </ButtonGroup>
                </div>
                {button}
                <Progress color="success" value={(this.state.completed/this.state.total)*100} >Completed</Progress>
                <hr/>
                <TicketPieChart tickets={this.state.tickets} high={this.state.high} low={this.state.low} medium={this.state.medium} service={this.state.service} sales={this.state.sales} technical={this.state.technical} />
              </Col>
              
              <Col className="container-fluid" sm={{ size: 'auto', offset: 0.1 }}>
                <TicketForm tickets={this.state.tickets} addTickets={this.addTickets} />
              </Col>
            </Row>
          </div>:<div className="container" align="center"><Spinner style={{ width: '3rem', height: '3rem' }} type="grow" /></div>}
      </div>
          
    )
  }
}
export default App;