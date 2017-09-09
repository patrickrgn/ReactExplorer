// REACT
import React from 'react';
import { RaisedButton } from 'material-ui';

/**
 * 
 */
class LoadingButton extends React.Component {


    handleClick = (event) => {
        this.props.action();
    }

    render() {

        const style = {
            margin: 12,
        };

        const label = (this.props.isLoading) ? this.props.msgLoading : this.props.msgLoaded;
        const disabled = (this.props.isLoading) ? true : false;

        if (this.props.type === "primary") {
            return (<RaisedButton id={this.props.id}
                label={label}
                primary={true}
                disabled={disabled}
                onMouseUp={this.handleClick}
                style={style} />)
        } else if (this.props.type === "secondary") {
            return (<RaisedButton id={this.props.id}
                label={label}
                secondary={true}
                disabled={disabled}
                onMouseUp={this.handleClick}
                style={style} />)
        } else {
            return (<RaisedButton id={this.props.id}
                label={label}
                default={true}
                disabled={disabled}
                onMouseUp={this.handleClick}
                style={style} />)
        }
    }

    static propTypes = {
        id: React.PropTypes.string.isRequired,
        type: React.PropTypes.string.isRequired,
        action: React.PropTypes.func.isRequired,
        msgLoaded: React.PropTypes.string.isRequired,
        isLoading: React.PropTypes.bool.isRequired,
        msgLoading: React.PropTypes.string
    };

}

export default LoadingButton;