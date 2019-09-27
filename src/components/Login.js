import React, { Component } from 'react';
import $ from 'jquery';

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = e => {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3001/auth/sign_in',
            data: {
                email: this.state.email,
                password: this.state.password
            }
        })
        .done((response, stauts, jqXHR) => {
            sessionStorage.setItem('user',
                JSON.stringify({
                    'access-token': jqXHR.getResponseHeader('access-token'),
                    client: jqXHR.getResponseHeader('client'),
                    uid: response.data.uid
                })
            )
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                <h2>Sign In</h2>
                <form onSubmit={this.handleLogin}>
                    <input name="email" placeholder="Enter email ID" onChange={this.handleChange}/>
                    <br /><br />
                    <input name="password" type="password" placeholder="Enter password" onChange={this.handleChange}/>
                    <br /><br />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}