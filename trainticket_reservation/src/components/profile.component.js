import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TrainReservation from './trainReservation.component';

class Profile extends Component {

    constructor(props){
        super(props);

        this.state = {
            fullname : this.props.fullname,
            email : this.props.email,
            nic : this.props.nic,
            empStatus : this.props.empStatus
        }
    }

    onSubmit=(e)=>{
        e.preventDefault();
        ReactDOM.render(<TrainReservation nic={this.state.nic} empStatus={this.state.empStatus} email={this.state.email}/>,document.getElementById('root'));
    }

    render() {
        return (
            <div className="container">
                <br/><br/><br/><br/>
                <h2 className="display-4 mb-3"> Welcome To Your Profile {this.state.fullname}!! </h2>
                <br/><br/>
                <table className="table">
                    <tbody>
                        <tr>
                            <td>Full Name</td>
                            <td>{this.state.fullname}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>NIC</td>
                            <td>{this.state.nic}</td>
                        </tr>
                        <tr>
                            <td>Employee Status</td>
                            <td>{this.state.empStatus}</td>
                        </tr>
                    </tbody>

                </table>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Reserve tickets"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Profile;