import React, {Component} from 'react';
import sampath from "../images/sampathLogo.jpg";
import Login from '../components/login.component';
import ReactDOM from "react-dom";

class SampathPayment extends Component {

    constructor(props){
        super(props);

        this.state = {
            paymentAmount : this.props.paymentAmount,
            email:this.props.email,
            nic:this.props.nic
        }
    }

    onSubmit = (e)=>{
        e.preventDefault();
        const name = this.refs.name.value;
        const cardNo = this.refs.cardNo.value;
        const cvc = this.refs.cvc.value;
        const paymentAmount = this.state.paymentAmount;
        const email = this.state.email;

        if (name === '' || cardNo === '' || cvc === ''){
            alert('One or more fields are empty.');
        } else {
            let data = {"name" : name, "cardNo" : cardNo, "cvc":cvc,"paymentAmount":paymentAmount,"email":email};
            console.log(data);

            fetch('http://localhost:4000/creditCard/',{
                method:'POST',
                body:JSON.stringify(data),
                headers:{'Content-Type':'application/json'}
            }).then(res=>{
                return res.json();
            }).then(data=>{
                alert('Payment was successfully done!');
                console.log(data);
                ReactDOM.render(<Login/>,document.getElementById('root'));
                // ReactDOM.render(<TrainReservation nic={this.state.nic}/>,document.getElementById('root'));
            }).catch(err=>{
                alert('Error occurred when inserting sampath payment data :' + err);
            })
        }
    }

    render() {
        return (
            <div className="container">

                <br/><br/><br/>
                <div className="card text-center">
                    <div className="card-body">
                        <img src={sampath} className="img-fluid" alt="Responsive image" style={{paddingBottom : 20}}/>
                    </div>
                </div>
                <br/><br/>
                <h2 className="display-4 mb-3">Sampath Gateway Payment</h2>
                <br/><br/>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control" ref="name" placeholder="Card Holders Name" type="text" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="cardNo" placeholder="Card No" type="text" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="cvc" placeholder="CVC" type="text" />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="amount" placeholder="amount" value={this.state.paymentAmount} type="text" readOnly/>
                    </div>
                    <div className="form-group">
                        <input className="btn btn-primary"  type="submit" value="submit" />
                    </div>
                </form>
            </div>
        );
    }
}

export default SampathPayment;