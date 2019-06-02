import React, {Component} from 'react';
import TrainReservation from './trainReservation.component';
import Profile from './profile.component';
import ReactDOM from 'react-dom';

class Login extends Component {

    constructor(props){
        super(props);

    }

    onChangeEmail=(e)=>{
        this.setState({
            user_email : e.target.value
        });
    }

    onChangePassword=(e)=>{
        this.setState({
            user_password : e.target.value
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;

        if (email === '' || password === ''){
            alert('Email or Password  is empty');
        } else {
            let credentials = {"email" : email,"password":password};
            let count = false;

            fetch('http://localhost:4000/user/' + credentials.email + '/' + credentials.password,{
                method:'GET',
                headers: {'Content-Type' : 'application/json'}
            }).then(res =>{
                return res.json();
            }).then(data => {
                let user = JSON.stringify(data);
                if (user != '[]'){
                    console.log(user);
                    count=true;
                    console.log(data);
                    for (let user of data){
                        let fullname = user.fullname;
                        let nic = user.nic;
                        let empStatus  = user.empStatus;
                        ReactDOM.render(<Profile fullname={fullname} nic={nic} empStatus={empStatus} email={email}/>,document.getElementById('root'));
                    }
                } else {
                    alert('Invalid Email(Username) or Password ');
                }

            }).catch(err=>{
                alert('Error :' + err);
            })
            if (count === true){
                ReactDOM.render(<TrainReservation />,document.getElementById('root'));
            } else {
                ReactDOM.render(<Login/>,document.getElementById('root'));
            }
        }

    }

    render() {
        return (
               <div className='container'>
                   <br/><br/><br/><br/><br/>
                    <h2 className="display-4 mb-3">User Login </h2>
                   <form noValidate onSubmit={this.onSubmit}>
                       <div className="form-group">
                           <input className="form-control" ref="email" placeholder="Email" type="text"  onChange={this.onChangeEmail}/>
                       </div>
                       <div className="form-group">
                           <input className="form-control" ref="password" placeholder="Password" type="password"  onChange={this.onChangePassword} />
                       </div>
                       <div className="form-group">
                           <input type="submit" className="btn btn-primary" value="Login"/>
                       </div>
                   </form>
               </div>

        );
    }
}

export default Login;