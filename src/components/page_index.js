import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { checkConnection } from '../actions/index';

class IndexPage extends Component {

    static contextTypes = {
        router: PropTypes.object
    }

    componentWillMount() {
        this.props.checkConnection()
    }
    
    constructor(props) {
        super(props);

        this.onUsernameInputChange = this.onUsernameInputChange.bind(this);
        this.onRoomInputChange = this.onRoomInputChange.bind(this);
        this.onRoomFormSubmit = this.onRoomFormSubmit.bind(this);
        
        this.state = {
            room: ''
        }
    }

    onUsernameInputChange(event) {
        this.setState({user: event.target.value});
    }

    onRoomInputChange(event) {
        this.setState({room: event.target.value});
    }

    onRoomFormSubmit(event) {
        event.preventDefault();
        console.log("Setting session storage")
        sessionStorage.setItem('rca_user', this.state.user)
        sessionStorage.setItem('rca_room', this.state.room)

        this.context.router.push('/chatroom')
    }

    render() {
        if(this.props.isConnectionLive)
            return (
                <div id="page-index">
                    
                    <form onSubmit={this.onRoomFormSubmit}>
                    <h2>React Chat Rooms</h2>
                        <div className="form-group">
                            <label>Username</label>
                            <input 
                                className="form-control" 
                                type="text"
                                value={this.state.user}
                                onChange={this.onUsernameInputChange} />
                        </div>
                        <div className="form-group">
                            <label>Room ID</label>
                            <input 
                                className="form-control" 
                                type="text"
                                value={this.state.room}
                                onChange={this.onRoomInputChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Join</button>
                        </div>
                    </form>
                </div>
            )
        else
            return (
                <div>No connection</div>
            )
    }
}

function mapStateToProps(state) {
    return {
        isConnectionLive: state.connection.isConnectionLive
    }
}

export default connect(mapStateToProps, {
    checkConnection
})(IndexPage);