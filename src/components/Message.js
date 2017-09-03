// REACT
import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import Label from 'react-bootstrap/lib/Label';
import Alert from 'react-bootstrap/lib/Alert';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class Message extends React.Component {

    // Convertie le timestamp au format hh:mm:ss
    formatTimestamp = (timestamp) => {

        //https://stackoverflow.com/questions/17371302/new-datemilliseconds-returns-invalid-date
        var date = new Date(+timestamp);

        var year    = date.getFullYear();
        var month   = "0" + date.getMonth();
        var day     = "0" + date.getDay();
        var hour    = "0" + date.getHours();
        var minute  = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds(); 

        return hour.substr(-2)+":"+minute.substr(-2)+":"+seconds.substr(-2);
    }


    preRender = () => {
        var message = this.props.details;
        //return <Alert bsStyle={message.type} id={message.timestamp}>{this.formatTimestamp(message.timestamp)} : {message.text}</Alert> 
        return <ListGroupItem bsStyle={message.type} id={message.timestamp}>{this.formatTimestamp(message.timestamp)} : {message.text}</ListGroupItem>
    }

    render() {
        
        return (this.preRender())
    }



}

export default Message;