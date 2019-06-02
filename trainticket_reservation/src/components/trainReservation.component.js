import React, {Component} from 'react';
import SampathPayment from './sampathPayment.component';
import DialogPayment from './dialogPayment.component';
import trainPic from '../images/train33.jpg';
import ReactDOM from 'react-dom';


const Train = (props) =>{
    return (
            <tr>
                <td>{props.trainName}</td>
                <td>{props.source}</td>
                <td>{props.destination}</td>
                <td>{props.departure}</td>
                <td>{props.ticketAmount}</td>
                <td>{props.availableTickets}</td>
            </tr>

    );
} ;

class TrainReservation extends Component {

    constructor(props){
        super(props);

        this.state = {
            trains:[],
            nic:this.props.nic,
            empStatus:this.props.empStatus,
            email:this.props.email,
            availableTickets:''
        }
    }

    displayTrains(trains){

           return trains.map((currentTrain,index)=>{
                return <Train trainName={currentTrain.trainName}
                              source={currentTrain.source}
                              destination={currentTrain.destination}
                              departure={currentTrain.departure}
                              ticketAmount={currentTrain.ticketAmount}
                              availableTickets={currentTrain.availableTickets}
                              key={index}/>
            });
    }

    componentDidMount() {
        fetch('http://localhost:4000/train/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        }).then(res => {
            return res.json();
        }).then(trains => {
            this.setState({trains: trains.data});
        });
    }
    onChangeTrainName = (e)=>{
        this.setState({
            train_name : e.target.value
        });
    }

    onChangeTrainNoOfTickets = (e)=>{
        this.setState({
            train_noOfTickets : e.target.value
        });
    }

    onChangeTrainPayment = (e)=>{
        this.setState({
            train_payment : e.target.value
        });
    }



    onSubmit=(e)=> {
        e.preventDefault();

        const trainName = this.refs.trainName.value;
        const tickets = this.refs.tickets.value;
        const paymentMethod = this.refs.paymentOptions.value;
        let paymentFee = 0;

        console.log("Employee status : " + this.state.empStatus);
        switch (trainName.toLowerCase()) {
            case "rajarata":
                if (this.state.empStatus === 'private') {
                    paymentFee = (tickets *  350) ;
                }else if (this.state.empStatus === 'Government'){
                    paymentFee = (tickets *  350) * 90/100;
                    let discount = (tickets *  350) * 10/100;
                    alert(`You got a ${discount} LKR/= amount of a discount`);
                }
                break;

            case "udarata manike":
                if (this.state.empStatus === 'private'){
                    paymentFee = tickets * 450;
                } else if (this.state.empStatus === 'Government') {
                    paymentFee = (tickets * 450) *90/100;
                    let discount = (tickets *  450) * 10/100;
                    alert(`You got a ${discount} LKR/= amount of a discount`);
                }
                break;

            case "yal devi":
                if (this.state.empStatus === 'private'){
                    paymentFee = tickets * 520;
                } else if (this.state.empStatus === 'Government') {
                    paymentFee = tickets * 520;
                    let discount = (tickets *  520) * 10/100;
                    alert(`You got a ${discount} LKR/= amount of a discount`);
                }
                break;

            default:
                alert("Requested train is not available.");
                break;
        }

        if (trainName === '' || tickets === '' || paymentMethod === ''){
            alert('One or more fields are empty.');
        }else {
            let data={"trainName":trainName,"tickets":tickets,"nic":this.state.nic,"empStatus":this.state.empStatus,"paymentAmount":paymentFee,"paymentMethod":paymentMethod}
            console.log(data);
            fetch('http://localhost:4000/trainTicket/',{
                method:"POST",
                body:JSON.stringify(data),
                headers:{"Content-Type":"application/json"}
            }).then(res=>{
                return res.json();
            }).then(data=>{
                fetch('http://localhost:4000/train/' + trainName ,{
                    method:"PUT",
                    body:JSON.stringify({noOfTickets: tickets}),
                    headers:{"Content-Type":"application/json"}
                }).then(() =>{
                alert("Train ticket/s was successfully reserved.")
                if (paymentMethod.toLowerCase() === "dialog"){
                    ReactDOM.render(<DialogPayment paymentAmount={paymentFee} email={this.state.email} nic={this.state.nic}/>,document.getElementById('root'));
                } else if (paymentMethod.toLowerCase() === "sampath") {
                    ReactDOM.render(<SampathPayment paymentAmount={paymentFee} email={this.state.email} nic={this.state.nic}/>,document.getElementById('root'));
                }});
            }).catch(err=>{
                alert("Error occurred in trainReservation.component" + err);
            })

       }
    }

    render() {
        return (
            <div className="container">
                <br/><br/>
                <div className="card text-center">
                    <div className="card-body">
                        <img src={trainPic} className="img-fluid" alt="Responsive image" style={{paddingBottom : 20}}/>
                        <h2 className="display-4 mb-3">Reserve Your Train Ticket Now!!</h2>
                    </div>
                </div>
                <br/><br/>
                <table className="table">
                    <thead>
                    <tr>
                        <th scope="col1">Train Name</th>
                        <th scope="col1">Source</th>
                        <th scope="col1">Destination</th>
                        <th scope="col1">Departure</th>
                        <th scope="col1">Ticket amount</th>
                        <th scope="col1">Available Tickets</th>
                    </tr>
                    </thead>
                            <tbody>
                            { this.displayTrains(this.state.trains) }
                            </tbody>



                </table>
                <br/><br/> <br/>

                <div className="display-4 mb-3">Train Ticket Reservation</div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <input className="form-control" ref="trainName" placeholder="Train Name" type="text" onChange={this.onChangeTrainName} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" ref="tickets" placeholder="Number Of Tickets" type="text" onChange={this.onChangeTrainNoOfTickets} />
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="NIC" type="text" value={this.state.nic} readOnly/>
                    </div>
                    <div className="form-group">
                        <input className="form-control" placeholder="Your Required Payment Method ( Dialog/Sampath )"  ref="paymentOptions" type="text" onChange={this.onChangeNic}  required/>
                    </div>
                    <div className="form-group">
                        <input type="submit" className="btn btn-primary" value="Submit"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default TrainReservation;