// REACT
import React from 'react';

import { List } from 'material-ui/List';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import Notification from './Notification';

class NotificationsBox extends React.Component {


    render() {

        const messages = Object
            .keys(this.props.messages)
            .map(key => <Notification key={key} details={this.props.messages[key]} showDatetime={true} diviser={true} />);
            
        const title = "Notifications ("+Object.keys(this.props.messages).length+")";
        return (
            
            <div className="messageBox">
                <Card>
                    <CardHeader
                        title={title}
                        actAsExpander={true}
                        showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                        <List>
                            {messages}
                        </List>
                    </CardText>
                </Card>
            </div>
        )
    }



}

export default NotificationsBox;