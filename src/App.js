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
  async handleSend() {
    let currentTime = new Date();
    let contentMessage = this.state.content;

    this.setState({ content: '', changecss: false })

    if (contentMessage != '') {
      await db.collection('messages').add({ content: contentMessage, from: sessionStorage.getItem('user'), time: currentTime })
      //  $(".messages").animate({ scrollTop: document.querySelector('.messages').clientHeight }, "fast");
    }
  }

  handleSubmit() {
    sessionStorage.setItem('user', this.state.user)
    this.setState({ login: false })
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
