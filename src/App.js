import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import 'firebase/firestore'
import db from './db';
import $ from 'jquery'

class App extends Component {

  state = {
    user: null,
    login: true,
    content: '',
    messages: []
  }

  async componentDidMount() {
    this.removeListener = await db.collection('messages').orderBy('time').onSnapshot(
      snap => {
        let messages = []
        snap.forEach(
          doc => {
            messages.push({ id: doc.id, from: doc.data().from, content: doc.data().content })
          }
        )
        this.setState({ messages })
      })
      // $(".content").animate({ scrollTop: $(document).height() }, "fast");
  }

  componentWillUnmount() {
    this.removeListener()
  }

  async handleSend() {
    let currentTime = new Date();
    let contentMessage = this.state.content;

    this.setState({ content: '' })

    if (contentMessage != '') {
      await db.collection('messages').add({ content: contentMessage, from: sessionStorage.getItem('user'), time: currentTime })
      $(".messages").animate({ scrollTop: document.querySelector('.messages').clientHeight }, "fast");
    }
  }

  handleSubmit() {
    sessionStorage.setItem('user', this.state.user)
    this.setState({ login: false })
  }

  handleScrollToBottom() {
    this.component._root.scrollToEnd()
  }

  render() {
    return (
      <div>
        {
          this.state.login
            ?
            <div>
              <p>Login</p>
              <input type="text" placeholder="Type your display name" value={this.state.user} onChange={(e) => this.setState({ user: e.target.value })} />
              <button className="submit" onClick={() => this.handleSubmit()}>
                Start Chatting
              </button>
            </div>
            :
            <div id="frame">
              <div className="content">
                <div className="contact-profile">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROkrPnaetmzESRVAg8354Cf8USXY9B4rOAZFut1aWMakL8aj9W" alt="" />
                  <p>{sessionStorage.getItem('user')}</p>
                </div>
                <div className="messages">
                  {
                    this.state.messages.length == 0
                      ?
                      <center>
                        <i class="fas fa-spinner fa-spin" aria-hidden="true"></i>
                      </center>
                      :
                      <ul>
                        {
                          this.state.messages.map(message =>
                            <li className={message.from != sessionStorage.getItem('user') ? "sent" : "replies"} key={message.id}>
                              {message.from != sessionStorage.getItem('user') && <span>{message.from}</span>}
                              <p>{message.content}</p>
                            </li>
                          )
                        }
                      </ul>
                  }
                </div>
                <div className="message-input">
                  <div className="wrap">
                    <input type="text" placeholder="Type your message" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                    <button className="submit" onClick={() => this.handleSend()}>
                      <i className="fas fa-comment" aria-hidden="true"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
}

export default App;
