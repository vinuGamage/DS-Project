import React, {Component} from 'react';
import dialog from "../images/dialogLogo.png";
import ReactDOM from "react-dom";
import Login from '../components/login.component';

class DialogPayment extends Component {

    constructor(props){
        super(props);

        this.state ={
            paymentAmount:this.props.paymentAmount,
            email:this.props.email,
            nic:this.props.nic
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();

        const mobile = this.refs.mobile.value;
        const pin = this.refs.pin.value;
        const paymentAmount= this.state.paymentAmount;
        const email= this.state.email;

        if (mobile === '' || pin === '' ){
            alert('One or More fields are empty');
        } else {
            let data = {"mobile" : mobile,"pin":pin,"paymentAmount":paymentAmount,"email":email};
            console.log(data);

            fetch('http://localhost:4000/dialogPay/',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            }).then(res=>{
                return res.json();
            }).then((data)=>{
                console.log(data);
                alert('Payment was successfully done!');
                ReactDOM.render(<Login/>,document.getElementById('root'));
                //ReactDOM.render(<TrainReservation nic={this.state.nic}/>)
            }).catch(err=>{
                alert('Error occurred when inserting dialog payment data :' + err)
            })
        }
    }


    render() {
        return (
            <div className="container">

                <br/><br/><br/>
                <div className="card text-center">
                    <div className="card-body">
                        <img src={dialog} className="img-fluid" alt="Responsive image" style={{paddingBottom : 20}}/>
                    </div>
                </div>

                <br/><br/>

                <h2 className="display-4 mb-3 ">Dialog Gateway Payment</h2>
                <br/><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control" ref="mobile" placeholder="Mobile" type="text" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="pin" placeholder="PIN" type="text" />
                    </div>
                    <div className="form-group">
                        <input className="form-control"  placeholder="amount" value={this.state.paymentAmount}  type="text" readOnly/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary"   type="submit" value="submit" />
                    </div>
                </form>


            </div>
        );
    }
}

export default DialogPayment;