// REACT
import React from 'react';



import Explorer from '../containers/Explorer';
import Login from '../containers/Login';
import { getApiToken, getApiListFiles, getApiGetFile } from '../actions/ExplorerApi';

import { AppBar, FlatButton } from 'material-ui';

class App extends React.Component {

	constructor(props) {
		super(props);
		const token = localStorage.getItem("token");

		if (token !== null && token !== undefined) {
			this.state = { token, isDeconnected: false };

		}
	}


	state = {
		token: "",
		message: "",
		isDeconnected: true
	};


	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.token !== prevState.token)
			localStorage.token = this.state.token;
	};

	deleteToken = () => {
		this.setState({ token: "", isDeconnected: true });
	}

	actionDeconnexion = () => {
		this.deleteToken();
	}

	actionLogin = (login, password) => {
		getApiToken(login, password, (token) => {
			this.setState({ token, isDeconnected: false });
		}, (err) => {
			this.setState({ message: err })
		});
	}

	actionListFiles = (path, callbackSuccess, callbackError) => {
		if (this.state.token !== "") {
			getApiListFiles(path, this.state.token, (files, dir) => {
				callbackSuccess(files, dir);
			}, (err) => {
				if (err === "Erreur token") {
					this.deleteToken();
				}
				callbackError(err);
			});
		}

	};

	actionGetFile = (path, callbackSuccess, callbackError) => {
		getApiGetFile(path, this.state.token, (file) => {
			callbackSuccess(file);

		}, (err) => {
			if (err === "Erreur token") {
				this.deleteToken();
			}
			callbackError(err);
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

	preRender = (token) => {

		if (token !== null && token !== "")
			return (<div><AppBar title="React Explorer"
							showMenuIconButton={false}
							iconElementRight={<FlatButton label="Deconnexion" primary={true} onClick={this.actionDeconnexion}/>} 
						/>
						<Explorer token={this.state.token} 
								actionListFiles={this.actionListFiles} 
								actionGetFile={this.actionGetFile} />
					</div>)
		else
			return (<div>
						<AppBar title="React Explorer" showMenuIconButton={false} />
						<Login actionLogin={this.actionLogin} msgError={this.state.message} />
					</div>)
	}


	render() {

		return (
			<div>
				{this.preRender(this.state.token)}
			</div>


		)
	}



}

export default App;