import React, { Component } from 'react';
import { connect } from 'react-redux';

import ChatBubble from './component_chatBubble';

import { getMessagesOfRoom } from '../actions/index';

class ChatWindow extends Component {

    constructor(props) {
        super(props);

        this.onMessageInputChange = this.onMessageInputChange.bind(this);

        this.state = {
            user : sessionStorage.getItem('rca_user'),
            room : sessionStorage.getItem('rca_room'),
            message: ''
        }
    }
    
    componentWillMount() {

        this.props.getMessagesOfRoom(this.state.room);
    }

    onMessageInputChange(event) {
        this.setState({message: event.target.value});
    }

    renderHeader() {
        if(this.state.room)
            return (
                <div className="col-lg-6 offset-lg-3">
                    <h6 className="d-inline">Hello, {this.state.user}! Welcome to {this.state.room} </h6>
                    <button className="btn btn-danger">Leave</button>
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
                        onChange={this.onMessageInputChange} />
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
    getMessagesOfRoom
})(ChatWindow);