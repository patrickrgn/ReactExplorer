// REACT
import React from 'react';
import ListGroup from 'react-bootstrap/lib/ListGroup';

import Message from './Message';

class MessagesBox extends React.Component {


    render() {
        
        const messages = Object
            .keys(this.props.messages)
            .map(key => <Message key={key} details={this.props.messages[key]} showDatetime={true} />);

        return (
            <div className="messageBox">
                <ListGroup>
                    {messages}
                </ListGroup>
            </div>
        )
    }



}

export default MessagesBox;