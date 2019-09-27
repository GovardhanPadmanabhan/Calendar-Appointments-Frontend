import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
// <Link to={{pathname: "/", state: "desiredState"}} >

class AppHeader extends React.Component {

    componentDidMount () {
        axios.get('http://localhost:3001/auth/validate_token', { headers: JSON.parse(sessionStorage.getItem('user')), responseType: "JSON"})
        .catch( () => {
            this.props.history.push('/login')
        })
    }

    handleSignOut = e => {
        e.preventDefault();
        axios.delete('http://localhost:3001/auth/sign_out', { data: JSON.parse(sessionStorage.getItem('user')), responseType: "JSON"})
        .then(response => {
            sessionStorage.removeItem('user')
            this.props.history.push('/login')
        })
    }

    render () {
        if(sessionStorage.getItem('user')) {
            return (
                <div>
                    <p>
                        {JSON.parse(sessionStorage.getItem('user')).uid}
                        <a href="#" onClick={this.handleSignOut}>Sign Out</a>
                    </p>
                    <Link to="/" >
                        <h1>React Calendar</h1>
                    </Link>
                    <br />
                </div>
            )
        }
        else {
            return <Redirect to="/login" />
        }
    }
}

export default AppHeader