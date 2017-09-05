// REACT
import React from 'react';
import { RaisedButton } from 'material-ui';

class LoadingButton extends React.Component {


    handleClick = (event) => {
        this.props.action();
    }

    preRender =  () => {
        if(this.props.isLoading) {
            return (<RaisedButton
                label={this.props.msgLoading}
                primary={true}
                disabled={true}
                onMouseUp={this.handleClick} />)
        } else {
            return (<RaisedButton
                label={this.props.msgLoaded}
                primary={true}
                
                onMouseUp={this.handleClick} />)
        }

    }


    render() {
        return (
            this.preRender()
        )
    }



}

export default LoadingButton;