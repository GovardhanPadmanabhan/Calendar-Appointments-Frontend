import React, { Component } from 'react';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import RenderRedirect from './RenderRedirect';

export default class AppointmentForm extends Component {

    constructor(props) {
        super(props)
        this.state={
          title: '',
          appt_time: '',
          editing: false,
          redirect: false
        }
    }

    componentDidMount() {
        if(this.props.match) {
            axios.get(`http://localhost:3001/api/v1/appointments/${this.props.match.params.id}`, { headers: JSON.parse(sessionStorage.getItem('user')), responseType: 'json' })
            .then(response => {
                console.log(response.data.appt_time)
                this.setState({
                    title: response.data.title,
                    appt_time: response.data.appt_time,
                    editing: this.props.match.path === '/appointments/:id/edit'
                })
                console.log(this.state.appt_time)
            })
        }
    }

    handleChange = e => {
        this.onUserInput(e.target.name, e.target.value)
    }

    onUserInput = (name, value) => {
        this.setState({
          [name]: value
        })
    } 
    
    addAppointment = () => {
        axios.post('http://localhost:3001/api/v1/appointments', {
            appointment : {
                title: this.state.title,
                appt_time: this.state.appt_time
            }
        },
        {headers: JSON.parse(sessionStorage.getItem('user'))}
        )
        .then(response => {
            console.log(response.data)
            this.props.handleNewAppointment(response.data)
            this.setState({
                title: '',
                appt_time: ''
            })
        })
        .catch(error => console.log(error))
    }

    updateAppointment = () => {
        axios.put(`http://localhost:3001/api/v1/appointments/${this.props.match.params.id}`, {
            appointment : {
                title: this.state.title,
                appt_time: this.state.appt_time
            }
        }, {headers: JSON.parse(sessionStorage.getItem('user'))})
        .then(response => {
            console.log(response.data)
            this.props.handleAppointments(response.data)
            this.setState({redirect: true})
        })
        .catch(error => console.log(error))
    }

    delAppointment = () => {
        console.log("here")
        console.log(this.props.match.params.id)
        this.props.handleDelete(this.props.match.params.id)
        this.setState({redirect: true})
    }

    handleSubmit = e => {
        e.preventDefault()
        this.setState({redirect: false})
        console.log(this.props.match)
        this.state.editing ? this.updateAppointment() : this.addAppointment()
    }

    setAppTime = (e) => {
        let name = 'appt_time' 
        this.onUserInput(name, e.toDate())
    }

    render() {
        return (
            <div>
                <RenderRedirect redirect={this.state.redirect} />
                <h3>{this.state.editing ? "Update appointment" : "Make a new appointment"}</h3>
                <br /><br />
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="appointment_title">Title</label>
                        <input type="text" className="form-control" id="appointment_title" name="title" value={this.state.title} placeholder="Enter the details" onChange={this.handleChange} required/>
                    </div>
                    <br />
                    {/* <div class="form-group">
                        <div class="row">
                            <div class="col">
                                <label for="appt_date">Date</label>
                                <input type="text" class="form-control" placeholder="First name" />
                            </div>
                            <div class="col">
                                <label for="datetimepicker3">Time</label>
                                <div class="input-group date" id="datetimepicker3" data-target-input="nearest">
                                    <input type="text" class="form-control datetimepicker-input" data-target="#datetimepicker3" />
                                    <div class="input-group-append" data-target="#datetimepicker3" data-toggle="datetimepicker">
                                        <div class="input-group-text"><i class="fa fa-clock-o"></i></div>
                                    </div>
                                </div>
                            </div>
                            <script type="text/javascript">
                                $(function() {
                                    $('#datetimepicker3').datetimepicker()
                                });
                            </script>
                        </div>
                    </div> */}
                    <Datetime input={false} open={true} inputProps={{required: 'required'}} value={moment(this.state.appt_time)} onChange={this.setAppTime} />
                    <br /><br />
                    <button type="submit" className="btn btn-primary" >
                        {this.state.editing ? "Update appointment" : "Make appointment"}
                    </button>
                    {this.state.editing ? 
                        <div>
                            <br /><br />
                            <button type="button" className="btn btn-danger btn-sm" onClick={ () => { if(window.confirm("Are you sure you want to delete the appointment?")) {this.delAppointment()} } }>Delete Appointment</button>
                        </div> :
                        <br />
                    }
                </form>
            </div>
        )
    }
}
