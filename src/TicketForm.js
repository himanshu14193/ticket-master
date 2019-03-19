import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input,FormFeedback} from 'reactstrap'
class TicketForm extends React.Component{
    constructor(props){
        super(props)
        this.state ={           
                    name:'',
                    department:'',
                    message:'',
                    priority:'',
                    ninvalid:false, 
                    nerrmsg:'',
                    dinvalid:false, 
                    derrmsg:'',
                    pinvalid:false, 
                    perrmsg:'',
                    minvalid:false, 
                    merrmsg:''
        }
    }
    handleFormReset = (e) => {
        e.preventDefault()
        e.target.reset()
        this.setState(() => ({
            name:'',
            department:'',
            message:'',
            priority:'',
            ninvalid:false, 
            nerrmsg:'',
            dinvalid:false, 
            derrmsg:'',
            pinvalid:false, 
            perrmsg:'',
            minvalid:false, 
            merrmsg:''
        }))
      }
    handleNameChange = (e)=> {
        const name = e.target.value
        this.setState(()=>({ name }))
    }
    handleDepartmentChange = (e)=> {
        const department = e.target.value
        this.setState(()=>({ department }))
    }
    handleMessageChange = (e)=> {
        const message = e.target.value
        this.setState(()=>({ message }))
    }
    handlePriorityChange = (e)=> {
        const priority = e.target.value
        this.setState(()=>({ priority }))
    }
    handleSubmit = (e)=> {
        e.preventDefault()
        const data={
            name:this.state.name,
            department:this.state.department,
            priority:this.state.priority,
            message:this.state.message
        }
        axios.post('http://dct-api-data.herokuapp.com/tickets?api_key=7f9738fc7ac65084',data)
            .then(res => {
                if(res.data.status==="open"){
                    console.log(res.data)
                    this.props.addTickets(res.data)
                }
                else{
                    console.log(res.data.errors)
                        
                    if(res.data.errors.name.length===1){
                        this.setState(()=>({ 
                            nerrmsg :res.data.errors.name,
                            ninvalid:true
                         }))
                    }
                    if(res.data.errors.department.length===1){
                        this.setState(()=>({ 
                            derrmsg:res.data.errors.department,
                            dinvalid:true
                         }))
                    }
                    if(res.data.errors.priority.length===1){
                        this.setState(()=>({ 
                            perrmsg:res.data.errors.priority,
                            pinvalid:true
                    }))
                    }
                    if(res.data.errors.message.length===1){
                        this.setState(()=>({ 
                            merrmsg:res.data.errors.message,
                            minvalid:true
                    }))
                    }
                    else{
                        continue
                    }
                }
                
            })
            .catch(err=>{
                console.log(err)
            })
    }
    render(){
        return (
                <Form className="container" onSubmit={this.handleSubmit} >
                <h3>Add Ticket</h3>
                    <FormGroup>
                        <Label for="name" sm={2}>Name</Label>
                            <Input invalid={this.state.ninvalid} type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder="Enter your name" />
                            <FormFeedback >{this.state.nerrmsg}</FormFeedback>
                    </FormGroup>
                    <FormGroup >
                        <Label for="department" sm={2}>Deaprtment</Label>
                            <Input invalid={this.state.dinvalid} type="select" bsSize="sm" name="department" value={this.state.department} onChange={this.handleDepartmentChange}>
                                <option value="">Select Department</option>
                                <option value="technical">Technical</option>
                                <option value="sales">Sales</option>
                                <option value="service">Service</option>
                            </Input>
                            <FormFeedback >{this.state.derrmsg}</FormFeedback>
                    </FormGroup>
                    <FormGroup >
                        <legend value={this.state.priority} onChange={this.handlePriorityChange} className="col-form-label col-sm-2">Priority
                            <FormGroup >
                                <Label ><Input type="radio" name="priority" value="high" />High </Label>
                            </FormGroup>
                            <FormGroup >
                                <Label ><Input type="radio" name="priority" value="medium" />Medium</Label>
                            </FormGroup>
                            <FormGroup >
                                <Label ><Input  type="radio" name="priority" value="low" />Low</Label>
                            </FormGroup>
                        </legend>
                    {this.state.pinvalid?<h6 className="text-danger">{this.state.perrmsg}</h6>:""}
                    <FormFeedback >{this.state.perrmsg}</FormFeedback>    
                    </FormGroup>
                    <FormGroup >
                        <Label for="message" sm={2}>Message</Label>
                            <Input invalid={this.state.minvalid} type="textarea" name="message" value={this.state.message} onChange={this.handleMessageChange} placeholder="Type the message"/>
                            <FormFeedback >{this.state.merrmsg}</FormFeedback>
                    </FormGroup>
                    <FormGroup >
                            <Button value="submit" className="btn btn-dark m-2">Submit</Button>
                            <Button onReset={this.handleFormReset} value="reset" className="btn btn-dark m-2">Reset</Button>
                    </FormGroup>
                </Form>
        )
    }
}
export default TicketForm