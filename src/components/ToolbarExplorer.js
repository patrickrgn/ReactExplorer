// REACT
import React from 'react';

import { AppBar, FlatButton } from 'material-ui';
import {cyan500, white} from 'material-ui/styles/colors';

class ToolbarExplorer extends React.Component {


    render() {

        if(this.props.connected)        
            return (
                <AppBar title="React Explorer"
                    showMenuIconButton={false}
                    iconElementRight={<div>
                                        <span className="toolbarLogin">{this.props.login}</span>
                                        <FlatButton label="Deconnexion" 
                                                    primary={true} 
                                                    onClick={this.props.actionDeconnexion} 
                                                    style={{backgroundColor: white}}
                                                    labelStyle={{color: cyan500}}
                                        />
                                    </div>}
                />  
            )
        else
            return (
                <AppBar title="React Explorer"
                    showMenuIconButton={false}
                />  
            )
    }



}

export default ToolbarExplorer;