// REACT
import React from 'react';
import mime from 'mime-types';

import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

class ContentFile extends React.Component {

    state = {
        typeImage: ['image/jpeg', 'image/png', 'image/bmp']
        

    }

    close = () => {
        this.props.closeFile();
    };

    showContent = () => {
        var type = mime.lookup(this.props.file.filename);
        var filename = this.props.file.filename;

        if (this.state.typeImage.indexOf(type) > -1) {
           return  (<div>Image</div>)
        } else {
            return (<div className="modal-pre"><pre>{this.props.file.content}</pre></div>)
        }

    };


    render() {
        

        return (
            <div>
                <Modal show={this.props.showFile} onHide={this.close} bsSize="large">
                  <Modal.Header closeButton>
                    <Modal.Title>Fichier : {this.props.file.filename}</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                        {this.showContent()}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button onClick={this.close}>Close</Button>
                  </Modal.Footer>
                </Modal>
            </div>
        )
    }



}

export default ContentFile;