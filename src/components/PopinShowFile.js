// REACT
import React from 'react';
import mime from 'mime-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class PopinShowFile extends React.Component {

    state = {
        typeImage: ['image/jpeg', 'image/png', 'image/bmp']
    }

    handleClose = () => {
        this.props.close();
    };

    showContent = () => {
        if (this.props.file !== undefined) {
            var type = mime.lookup(this.props.file.filename);
            //var filename = this.props.file.filename;

            if (this.state.typeImage.indexOf(type) > -1) {
                return (<div>Image</div>)
            } else {
                return (<div className="modal-pre"><pre>{this.props.file.content}</pre></div>)
            }
        }
    };


    render() {

        var title = "";
        if (this.props.file !== undefined) {
            title = "Fichier : " + this.props.file.filename;
        }

        const actions = [
            <FlatButton
                label="Fermer"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        const customContentStyle = {
            width: '80%',
            maxWidth: 'none',
        };


        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={false}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    contentStyle={customContentStyle}>
                    {this.showContent()}
                </Dialog>
            </div>
        )
    }



}

export default PopinShowFile;