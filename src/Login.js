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
        username: null,
        loading: false
    }

    async handleSubmit() {
        this.setState({ loading: true })
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
            await this.setState({ error: false, loading: false })
            this.props.handleLogin()
        }
        else {
            this.setState({ error: true, loading: false })
        }
    }


    render() {
        return (
            <div class="login-body">
                <div class="login-page">
                    <div class="form">
                        <input type="text" placeholder="Type your display name" value={this.state.username} onChange={(e) => this.setState({ username: e.target.value, error: false })} />
                        {
                            this.state.error
                            &&
                            <p className="error-message">{this.state.error && "Username not available"}</p>
                        }
                        <br />
                        {
                            this.state.loading
                                ?
                                <button className="submit">
                                    <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                                </button>
                                :
                                <button className="submit" onClick={() => this.handleSubmit()}>
                                    Start Chatting
                                </button>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
