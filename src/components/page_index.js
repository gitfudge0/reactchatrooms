import React, { Component } from 'react';
import { connect } from 'react-redux';

import { checkConnection } from '../actions/index';

class IndexPage extends Component {

    componentWillMount() {
        this.props.checkConnection()
    }
    
    constructor(props) {
        super(props);

        this.onRoomIdInputChange = this.onRoomIdInputChange.bind(this);
        this.onRoomIdFormSubmit = this.onRoomIdFormSubmit.bind(this);
        
        this.state = {
            roomID: ''
        }
    }

    onRoomIdInputChange(event) {
        this.setState({roomID: event.target.value});
    }

    onRoomIdFormSubmit(event) {
        event.preventDefault();
        console.log("Form was submitted")
    }

    render() {
        if(this.props.isConnectionLive)
            return (
                <div id="page-index">
                    <h2>React Chat Rooms</h2>
                    
                    <form className="input-group" onSubmit={this.onRoomIdFormSubmit}>
                        <div className="form-group">
                            <label>Enter room ID</label>
                            <input 
                                className="form-control" 
                                type="text"
                                value={this.state.roomID}
                                onChange={this.onRoomIdInputChange} />
                        </div>
                        <button type="submit" className="btn btn-primary">Join</button>
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