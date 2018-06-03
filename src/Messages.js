import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase'
import 'firebase/firestore'
import db from './db';
import $ from 'jquery'
import Login from './Login'
import logo from './logo.png'
class Messages extends Component {

    state = {
        content: '',
        messages: [],
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
                this.scrollToBottom();

            })
    }

    componentWillUnmount() {
        this.removeListener()
    }
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    // componentDidUpdate() {
    //     this.scrollToBottom();
    // }

    async handleSend() {
        let currentTime = new Date();
        let contentMessage = this.state.content;
    
        this.setState({ content: '', changecss:false })
    
        if (contentMessage != '') {
          await db.collection('messages').add({ content: contentMessage, from: sessionStorage.getItem('user'), time: currentTime })
        }
        this.scrollToBottom()
      }
    
    render() {
        return (
                <div id="frame">
                    <div className="content">
                        <div className="contact-profile">
                            <img src={logo} alt="" />
                            <p>{sessionStorage.getItem('user')}</p>
                        </div>
                        <div className="messages">
                        <br/>
                            {
                                this.state.messages.length == 0
                                    ?
                                    <center>
                                        <i class="fas fa-spinner fa-spin spinner1" aria-hidden="true"></i>
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
                            <div style={{ float: "left", clear: "both" }}
                                ref={(el) => { this.messagesEnd = el; }}><br />
                            </div>
                        </div>
                        <div className={this.state.changecss ? "message-input-textedit" : "message-input"}>
                            <div className="wrap">
                                <input type="text" placeholder="Type your message" value={this.state.content} onChange={(e) => this.setState({ content: e.target.value })} />
                                <button className="submit" onClick={() => this.handleSend()}>
                                    <i className="fas fa-comment" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Messages;
