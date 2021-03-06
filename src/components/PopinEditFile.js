// REACT
import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import LoadingButton from './LoadingButton';
import { TextField, Paper } from 'material-ui';

class PopinEditFile extends React.Component {

    state = {
        name: "",
        errorName: "",
        content: "",
        errorContent: ""
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSave = () => {
        this.props.saveFile(this.state.name, this.state.content);
    };

    handleClose = () => {
        this.props.close();
    };


    render() {

        const title = (this.props.file !== undefined ? "Edition du fichier" : "Création du fichier");
        const name = (this.props.file !== undefined ? this.props.file.name : "");
        const content = (this.props.file !== undefined ? this.props.file.content : "");
        const disabled = (this.props.file !== undefined ? true : false);

        const actions = [
            <FlatButton
                label="Fermer"
                primary={true}
                onClick={this.handleClose}
            />,
            <LoadingButton
                id="save"
                type="secondary"
                action={this.handleSave}
                msgLoaded="Enregistrer"
                msgLoading="Enregistrement en cours"
                isLoading={this.props.isSaving}
            />
        ];

        const customContentStyle = {
            width: '80%',
            maxWidth: 'none',
        };

        const styles = {
            paper: {
                margin: '10px auto',
                padding: 10
            },
            header: {
                textAlign: 'center',
                padding: 10,
                fontSize: 20,
            },
            actionButton: {
                margin: 8,

            },
        };


        return (
            <div>
                {this.props.showPopin}
                <Dialog
                    title={title}
                    actions={actions}
                    modal={true}
                    open={this.props.open}
                    onRequestClose={this.handleClose}
                    autoScrollBodyContent={true}
                    contentStyle={customContentStyle}>

                    <Paper style={styles.paper}>
                        <TextField
                            id="name"
                            name="name"
                            floatingLabelText="Nom du fichier"
                            errorText={this.state.errorName}
                            onChange={this.handleChange}
                            defaultValue={name}
                            disabled={disabled}
                        />
                    </Paper>

                    <Paper style={styles.paper}>
                        <TextField
                            id="content"
                            name="content"
                            floatingLabelText="Contenu"
                            errorText={this.state.errorContent}
                            onChange={this.handleChange}
                            multiLine={true}
                            rows={10}
                            fullWidth={true}
                            defaultValue={content}
                        />
                    </Paper>

                 
                </Dialog>
            </div>
        )
    }

}

export default PopinEditFile;