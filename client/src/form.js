import React , {Component} from 'react';
import './form.css'
import axios from 'axios';

export default class Form extends Component{

    state={
        name:'',
        email:'',
        message:'',
        sent:false
    }

    handleName = (e)=>{
        this.setState({
            name:e.target.value
        })
    }

    handleEmail = (e)=>{
        this.setState({
            email:e.target.value
        })
    }
    handleMessage = (e)=>{
        this.setState({
            message:e.target.value
        })
    }


    formSubmit=(e)=>{
        e.preventDefault();

        let data = {
            name:this.state.name,
            email:this.state.email,
            message:this.state.message
        }

        axios.post ('/api/contact', data)
        .then(res=>{
            this.setState({
                sent:true
            },this.resetForm())
        }).catch(()=>{
            console.log('message not sent');
        })
    }


        resetForm =() =>{
            this.setState({
                name:'',
                email:'',
                message:''
            })

            setTimeout(()=>{
                this.setState({
                    sent:false,
                })
            },3000)
        }
    

    render(){
        return(
            <div className='container'>
        <form onSubmit={this.formSubmit} action="#">
        <label for="customerName">NAME <em>&#x2a;</em> </label>  
        <input type="text" id="customerName" name="customerName" required=""
        value={this.state.name}
        onChange={this.handleName}/>
        
        <label for="customerEmail">EMAIL <em>&#x2a;</em></label>
        <input type="email" id="customerEmail" name="customerEmail" required=""
        value={this.state.email}
        onChange={this.handleEmail}/>
        
        <label for="customerNote"> YOUR MESSAGE <em>&#x2a;</em> </label>
          
         
        <textarea rows="4" id="customerNote" name="customerNote" required=""
        value={this.state.message}
        onChange={this.handleMessage}/>
        <h3>Please provide all the information about your issue you can.</h3> 
        
        <button id="customerOrder"> SUBMIT</button>
       
        </form>
        </div>
        
        )
    }
}
