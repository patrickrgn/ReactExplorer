// REACT
import React from 'react';

import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import {green500, orange500, red500} from 'material-ui/styles/colors';



class Message extends React.Component {

    

    // Convertie le timestamp au format hh:mm:ss
    formatTimestamp = (timestamp) => {

        //https://stackoverflow.com/questions/17371302/new-datemilliseconds-returns-invalid-date
        var date = new Date(+timestamp);

        //var year    = date.getFullYear();
        //var month   = "0" + date.getMonth();
        //var day     = "0" + date.getDay();
        var hour = "0" + date.getHours();
        var minute = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();

        return hour.substr(-2) + ":" + minute.substr(-2) + ":" + seconds.substr(-2);
    }

    render() {

        const message = this.props.details;
        var diviser = "";

        var color = null;
        if(message.type === "info")
            color = orange500;
        else if(message.type === "success")
            color = green500;
        else
            color = red500;

        const style = {
            color: color
        }

        if(this.props.diviser) {
            diviser = <Divider inset={true} />
        }

        var text = message.text;
        if (this.props.showDatetime) {
            text = this.formatTimestamp(message.timestamp) + " : " + message.text;
        }
        
        return (<div><ListItem primaryText={text} style={style}/>{diviser}</div>)
    }



}

export default Message;