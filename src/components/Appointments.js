import React from "react";
import Appointment from './Appointment';
import AppointmentForm from './AppointmentForm';
import axios from 'axios';
import update from 'immutability-helper';

export default class Appointments extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      appointments: this.props.appointments
    }
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.state === 'desiredState') {
      window.location.reload()
    }
  }

  componentDidMount() {
    if(this.props.match && sessionStorage.user) {
      console.log("bye")
      axios.get('http://localhost:3001/api/v1/appointments.json',{
        headers: JSON.parse(sessionStorage.getItem('user')),
        responseType: 'json'
      })
      .then(response => {
          console.log(response.data)
          if(response.data) {
            console.log(response)
            this.setState({appointments: response.data})
            this.props.handleUpdate(this.state.appointments)
          }
      })
    }
  }

  componentWillUnmount() {
    console.log("hellooooo")
  }

  addNewAppointment = (appointment) => {
    let appt = update(this.state.appointments, {
      $splice: [[0, 0, appointment]]
      }).sort((a,b) => new Date(a.appt_time) - new Date(b.appt_time))
    this.setState({
        appointments: appt.sort((a,b) => {return(new Date(a.appt_time) - new Date(b.appt_time))})
    })
    this.props.handleUpdate(this.state.appointments)
  }

  deleteAppointment = (id) => {
    axios.delete(`http://localhost:3001/api/v1/appointments/${id}`, {headers: JSON.parse(sessionStorage.getItem('user'))})
    .then(response => {
      const index = this.state.appointments.findIndex(x => x.id === id)
      const appts = update(this.state.appointments, {$splice: [[index, 1]]})
      this.setState({appointments: appts})
      this.props.handleUpdate(this.state.appointments)
    })
    .catch(error => console.log(error))
    alert("Deleted!")
  }

  render () {
    return (
      <div>
        <AppointmentForm handleNewAppointment={this.addNewAppointment}/>
        <br />
        {this.state.appointments.map(appointment => { return (<Appointment key={appointment.id} appointment={appointment} handleDelete={this.deleteAppointment} />) })}
      </div>
    )
  }
}

