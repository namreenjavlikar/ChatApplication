import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import 'firebase/firestore'
import db from './db';
import $ from 'jquery'
import Login from './Login'
import Message from './Messages'
class App extends Component {

  state = {
    content: '',
    messages: [],
    changecss: false,
    login: true,
    loggedin: false
  }

  componentDidMount() {
    if (sessionStorage.getItem('user'))
      this.setState({ loggedin: true })
    else
      this.setState({ loggedin: false })
  }

  componentWillUnmount() {
    this.removeListener()
  }

  handleLogin = () => {
    this.setState({ loggedin: true })
  }

  render() {
    return (
      this.state.loggedin
        ?
        <Message />
        :
        <Login handleLogin={() => this.handleLogin()} />
    );
  }
}

export default App;
