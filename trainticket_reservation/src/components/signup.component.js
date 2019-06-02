import React, {Component} from 'react';
import axios from 'axios';
import Login from './login.component';
import ReactDOM from 'react-dom';


class Signup extends Component {

    // emailRegax = RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
    // nicRegax = RegExp(/^[0-9]+V/);


    constructor(props){
        super(props);

    }

    onChangeFullname=(e)=>{
        this.setState({
            user_fullname : e.target.value
        });
    }

    onChangeEmail=(e)=>{
        this.setState({
            user_email : e.target.value
        });
    }

    onChangeEmpStatus=(e)=>{
        this.setState({
            user_empStatus : e.target.value
        });
    }

    onChangeNic=(e)=>{
        this.setState({
            user_nic : e.target.value
        });
    }

    onChangePassword=(e)=>{
        this.setState({
            user_password : e.target.value
        });
    }


    onSubmit=(e)=>{
        e.preventDefault();


           const fullname = this.refs.fullname.value;
           const email = this.refs.email.value;
           const nic = this.refs.nic.value;
           const empStatus = this.refs.empStatusOptions.value;
           const password= this.refs.password.value;


           //If any field is empty
            if (fullname === '' || email ==='' || nic ==='' || empStatus ==='' || password === ''){
                alert('One or more fields are empty');
            } else{
                //verification of the email existence

                fetch('http://localhost:4000/user/' + email,{
                    method :'GET',
                    headers:{'Content-Type' : 'application/json'}
                }).then(res=>{
                    return res.json();
                }).then(data =>{
                    let user = JSON.stringify(data);
                    console.log(user);
                    if (user != '[]'){
                        alert('Email is already inuse.');
                    }else{
                        let data = {"fullname":fullname,"email" : email,"nic":nic,"empStatus" : empStatus,"password" : password};
                        console.log(data);
                        fetch('http://localhost:4000/user/',{
                            method:'POST',
                            body:JSON.stringify(data),
                            headers:{'Content-Type':'application/json'}
                        }).then(res=>{
                            return res.json();
                        }).then(data=>{
                            alert('You are successfully signed up');
                            ReactDOM.render(<Login/>,document.getElementById('root'));
                        }).catch(err=>{
                            alert('Error occurred when sighing up :' + err);
                        })
                    }
                }).catch(err=>{
                    alert('Error occurred when sighing up :' + err);
                })

            }

    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control" placeholder="Full Name" ref="fullname" type="text" onChange={this.onChangeFullname}  required/>

                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="E-mail" ref="email" type="email" onChange={this.onChangeEmail}  required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="NIC" ref="nic" type="text" onChange={this.onChangeNic}  required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Your Employee Status ( Private/Government )" ref="empStatusOptions" type="text" onChange={this.onChangeNic}  required/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Password" ref="password" type="password" onChange={this.onChangePassword}  required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Sign Up"/>
                    </div>
                </form>
            </div>
        )
    }
}

export default Signup;