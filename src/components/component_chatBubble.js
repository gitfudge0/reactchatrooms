import React from 'react';

export default function(props) {

    const user = sessionStorage.getItem('rca_user');
    let float = 'float-left';

    if(user == props.msg.user) {
        float = 'float-right message-user';
    }

    return (
        <div className="chat-message clearfix">
            <div className={"message " + float}>
                <div className="user">
                    {props.msg.user}
                </div>
                {props.msg.content}<span className="time"> {props.msg.created.substr(11, 5)} </span>
            </div>
        </div>
    )
}