import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';    
import axios from 'axios';

class Appointment extends Component {
    constructor(props){
        super(props)
        this.state = {
            appointment: this.props.appointment
        }
    }

    static defaultProps = {
        appointment: {}
    }

    componentDidMount() {
        if(this.props.match) {
            axios.get(`http://localhost:3001/api/v1/appointments/${this.props.match.params.id}`, { headers: JSON.parse(sessionStorage.getItem('user')), responseType: 'json' })
            .then(response => {
                this.setState({appointment: response.data})
            })
        }
    }

    render() {
        return (
            <div className='appointment'>
                <br />
                <Link to={`/appointments/${this.state.appointment.id}`}>
                    <h4>{this.state.appointment.title}</h4>
                </Link>
                <p>{moment(this.state.appointment.appt_time).format('DD MMM YYYY, h:mm a')}</p>
                <br />
                <Link to={`/appointments/${this.state.appointment.id}/edit`}>
                    Edit
                </Link>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <Link to="/" onClick={() => { if (window.confirm('Are you sure you want to delete this appointment?')){ this.props.handleDelete(this.state.appointment.id) } } }>Delete</Link>
            </div>
        )
    }
}
export default Appointment;