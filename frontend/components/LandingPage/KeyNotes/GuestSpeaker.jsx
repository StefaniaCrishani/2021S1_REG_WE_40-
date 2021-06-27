import React, { Component } from 'react';
import axios from 'axios';

class GuestSpeaker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            guest: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:6060/guestSpeaker/view')
            .then(response => {
                const guest = response.data;
                this.setState({ guest });
                console.log("response", response);
            }).catch(error => {
                alert(error.message);
                console.log("Error", error);
            });
    }

    render() {
        return (
            <div className="card card border border-light shadow-0 mb-3" style={{ maxWidth: '100rem', margin: 'auto', padding: '10px' }}>
                <div className="card-body" >
                    <div className="row">
                        {this.state?.guest?.length > 0 && this.state.guest.map((item, index) =>
                            <div className="col-sm-6 mb-5" key={index} style={{ boxShadow: '5px 5px 10px #b2aeb1, -5px -5px 10px #ffffff' }}>
                                <h5 className="card-title" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '45px' }}>{item.name}</h5>
                                <br></br>
                                <div className="card card border border-light shadow-0 mb-3" style={{ maxWidth: '20rem', margin: '0 auto', padding: '10px', position: 'relative' }}>
                                    <div className="card-body  hover-zoom" style={{ maxWidth: '20rem', margin: '0 auto', padding: '10px', position: 'relative' }}>
                                        <img src={item.image} class="img-fluid rounded-circle hover-shadow" />
                                    </div>
                                </div>
                                <br></br>
                                <h3 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '25px' }}>{item.profession}</h3>
                                <div className="card-text" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '23px' }}>
                                    <p>{item.description}</p>

                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default GuestSpeaker;