// REACT
import React from 'react';
import Notification from './Notification';

class NotificationsBox extends React.Component {


    render() {

        const messages = Object
            .keys(this.props.messages)
            .map(key => <Notification key={key} details={this.props.messages[key]} showDatetime={true} diviser={true} />);

        
        return (

            <div className="messageBox">
                {messages}
            </div>
        )
    }



}

export default NotificationsBox;