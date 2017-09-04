// REACT
import React from 'react';

import { TextField, RaisedButton, Paper } from 'material-ui';
import Message from '../components/Message';

class Login extends React.Component {



    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: "",
            errorLogin: "",
            errorPassword: ""
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    };

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSubmit = event => {
        var error = false;
        if (this.state.login === undefined || this.state.login === "") {
            this.setState({ errorLogin: "Champs requis" });
            error = true;
        } else {
            this.setState({ errorLogin: "" });
        }
        if (this.state.password === undefined || this.state.password === "") {
            this.setState({ errorPassword: "Champs requis" });
            error = true;
        } else {
            this.setState({ errorPassword: "" });
        }


        if (!error) {
            this.props.actionLogin(this.state.login, this.state.password);
        }

        event.preventDefault();
    };

    showMessage = () => {
        if (this.props.msgError !== undefined) {
            // Création du message
            const message = {
                text: this.props.msgError,
                type: "danger"
            };
            return (<div><Message key="error" details={message} showDatetime={false} /></div>)
        }
    };

    render() {

        const styles = {
            paper: {
                width: '500px',
                margin: '10% auto',
                top: '50%',
                bottom: '50%',
                padding: 30
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

            <div className="Login">

                <Paper style={styles.paper}>

                    <div style={styles.header}>Authentification</div>
                    {this.showMessage()}
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="login"
                            name="login"
                            floatingLabelText="Login"
                            errorText={this.state.errorLogin}
                            onChange={this.handleChange}
                        /><br />
                        <TextField
                            id="password"
                            hintText="Password"
                            floatingLabelText="Password"
                            type="password"
                            errorText={this.state.errorPassword}
                            onChange={this.handleChange}
                        /><br />
                        <RaisedButton
                            label="Se connecter"
                            primary={true}
                            style={styles.actionButton}
                            onMouseUp={this.handleSubmit} />
                    </form>
                </Paper>


            </div >
        );
    }


}

export default Login;