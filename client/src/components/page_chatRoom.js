import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import ChatBubble from './component_chatBubble';

import { BASE_URL } from '../actions/index';
import { addUserAndGetMessagesOfRoom, sendMessage, addMessageToConversation } from '../actions/index';

const socket = io(BASE_URL);



class ChatWindow extends Component {
    
    static contextTypes = {
        router: PropTypes.object
    }
    
    constructor(props) {
        super(props);
        
        this.onMessageInputChange = this.onMessageInputChange.bind(this);
        this.onMessageKeyDown = this.onMessageKeyDown.bind(this);
        this.leaveRoom = this.leaveRoom.bind(this);
        
        this.state = {
            user : sessionStorage.getItem('rca_user'),
            room : sessionStorage.getItem('rca_room'),
            message: ''
        }

        socket.on('new message', data => {
            this.props.sendMessage(data);
        })
    }
    
    componentWillMount() {
        if(!sessionStorage.getItem('rca_user')) {
            this.context.router.history.push('/')
        }

        socket.emit('new user', {
            room: this.state.room,
            user: this.state.user
        });
        this.props.addUserAndGetMessagesOfRoom(this.state.room, this.state.user);
    }

    componentDidUpdate() {
        const chatArea = document.querySelector('.chat-messages-area');
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    onMessageInputChange(event) {
        this.setState({message: event.target.value});
    }

    onMessageKeyDown(event) {
        if(event.keyCode === 13) {
            console.log("Enter pressed")
            const date = new Date();
            const data = {
                user: this.state.user,
                content: event.target.value,
                room: this.state.room,
                created: date.toISOString()
            }
            this.props.sendMessage(data);
            socket.emit('new message', data);
            this.setState({message: ''});
        }
    }

    leaveRoom() {
        socket.emit('leave room', {
            user: sessionStorage.getItem('rca_user'),
            room: sessionStorage.getItem('rca_room')
        })
        sessionStorage.removeItem('rca_user')
        sessionStorage.removeItem('rca_room')
        this.context.router.history.push('/');
    }

    renderHeader() {
        if(this.state.room)
            return (
                <div className="col-lg-6 offset-lg-3">
                    <h6 className="d-inline">Hello, {this.state.user}! Welcome to {this.state.room} </h6>
                    <button onClick={this.leaveRoom} className="btn btn-danger">Leave</button>
                </div>
            )
        else 
            return (
                <div className="d-inline">Loading</div>
            )
    }

    renderChats() {
        if(this.props.allMessages) {
            return this.props.allMessages.map((msg, index) => {
                return (
                    <ChatBubble msg={msg} key={index} />
                )
            })
        } else {
            return (
                <div>Fetching messages</div>
            )
        }
    }

    render() {
        return (
            <div id="page_chatroom">
                <header>
                    {this.renderHeader()}
                </header>
                <div className="col-lg-6 offset-lg-3 chat-messages-area">
                    {this.renderChats()}
                </div>
                <div className="message-box col-lg-6 offset-lg-3">
                    <input
                        className="form-control" 
                        type="text"
                        value={this.state.message}
                        onChange={this.onMessageInputChange}
                        onKeyDown={this.onMessageKeyDown} />
                    <button type="submit" className="btn btn-primary">Send</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        allMessages: state.chatroom.allMessages
    }
}

export default connect(mapStateToProps, {
    addUserAndGetMessagesOfRoom,
    sendMessage,
    addMessageToConversation
})(ChatWindow);