// REACT
import React from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "../css/login.css";

class Login extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            login: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.login.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        this.props.actionLogin(this.state.login, this.state.password);
        event.preventDefault();
    }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="login" bsSize="large">
                        <ControlLabel>Login</ControlLabel>
                        <FormControl
                            autoFocus
                            type="login"
                            value={this.state.login}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <ControlLabel>Password</ControlLabel>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
              </Button>
                </form>
            </div>
        );
    }


}

export default Login;