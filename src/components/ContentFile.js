// REACT
import React from 'react';
import mime from 'mime-types';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class ContentFile extends React.Component {

    
    state = {
        typeImage: ['image/jpeg', 'image/png', 'image/bmp']


    }

    handleClose = () => {
        this.props.closeFile();
    };

    showContent = () => {
        var type = mime.lookup(this.props.file.filename);
        //var filename = this.props.file.filename;

        if (this.state.typeImage.indexOf(type) > -1) {
            return (<div>Image</div>)
        } else {
            return (<div className="modal-pre"><pre>{this.props.file.content}</pre></div>)
        }

    };


    render() {

        const title = "Fichier : " + this.props.file.filename;

        const actions = [
            <FlatButton
                label="Fermer"
                primary={true}
                onClick={this.handleClose}
            />
        ];


        return (
            <div>
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.showFile}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                >
                    {this.showContent()}

                </Dialog>
            </div>
        )
    }



}

export default ContentFile;