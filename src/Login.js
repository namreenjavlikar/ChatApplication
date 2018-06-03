import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import 'firebase/firestore'
import db from './db';
import $ from 'jquery'

class Login extends Component {

    state = {
        users: null,
        error: false,
        username: null
    }


    async handleSubmit() {
        let users = []
        let dbusers = await db.collection('users').get().then(
            (allusers) =>
                allusers.forEach(
                    (user) => users.push(user.data()))
        )
        let checkuser = users.findIndex((u) => u.username == this.state.username)
        if (checkuser == -1) {
            await db.collection('users').add({ username: this.state.username })
            sessionStorage.setItem('user', this.state.username)
            await this.setState({ error: false })
            this.props.handleLogin()
        }
        else {
            this.setState({ error: true })
        }
    }


    render() {
        return (
            <div>
                <p>Login</p>
                <input type="text" placeholder="Type your display name" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value })} />
                <button className="submit" onClick={() => this.handleSubmit()}> Start Chatting</button>
                <br/>
                <p style={{color: 'red'}}>{this.state.error && "User already exists"}</p>
            </div>
        );
    }
}

export default Login;
