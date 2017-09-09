import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class PopinConfirm extends React.Component {

    handleClose = () => {
        this.props.actionClose();
    };

    handleValidate = () => {
        this.props.actionConfirm();
    };

    render() {
        const actions = [
            <FlatButton
                label="Annuler"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="Confirmer"
                primary={true}
                onClick={this.handleValidate}
            />,
        ];

        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                >
                {this.props.text}
                </Dialog>
            </div>
        );
    }
}