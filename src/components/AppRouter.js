import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Appointments from './Appointments'
import Appointment from './Appointment'
import ReactDOM from "react-dom"
import AppHeader from './AppHeader'
import AppointmentForm from './AppointmentForm'
import update from 'immutability-helper'
import axios from 'axios'
import Login from './Login'

export default class AppRouter extends Component {
    constructor(props){
        super(props)
        console.log(props)
        this.state = {
            appointments: this.props.appointments
        }
    }

    updateStateAppointment = (appointments) => {
        this.setState({
            appointments: appointments
        })
    }

    updateAppointments = (data) => {
        const apptId = this.state.appointments.findIndex(x => x.id === data.id)
        const appts = update(this.state.appointments, {
            [apptId]: {$set: data}
        })
        this.setState({appointments: appts})
        alert('Updated!')
    }

    deleteAppointment = (id) => {
        axios.delete(`http://localhost:3001/api/v1/appointments/${id}`, {headers: JSON.parse(sessionStorage.getItem('user'))})
        .then(response => {
          const index = this.state.appointments.findIndex(x => x.id === id)
          const appts = update(this.state.appointments, {$splice: [[index, 1]]})
          this.setState({appointments: appts})
        })
        .catch(error => console.log(error))
        alert('Deleted!')
    }


    render () {
        return (
            <BrowserRouter>
                <div>
                    <Route path="/" component={AppHeader} />
                    <Route path="/login" component={Login} />
                    <Route exact path="/" render={ (props) => <Appointments {...props} appointments={this.state.appointments} handleUpdate={this.updateStateAppointment}/> } />
                    <Route exact path="/appointments/:id" render={ (props) => <Appointment {...props} handleDelete={this.deleteAppointment} /> } />
                    <Route path="/appointments/:id/edit" render={ (props) => <AppointmentForm {...props} handleAppointments={this.updateAppointments} handleDelete={this.deleteAppointment}/> } />
                </div>
            </BrowserRouter>
        )
    }
}

// document.addEventListener('DOMContentLoaded', () => {
//     const node = document.getElementById('appointments_data')
//     const data = JSON.parse(node.getAttribute('data'))
  
//     ReactDOM.render(
//       <AppRouter appointments={data} />,
//       document.body.appendChild(document.createElement('div')),
//     )
// })