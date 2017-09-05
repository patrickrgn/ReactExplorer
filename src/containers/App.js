// REACT
import React from 'react';



import Explorer from './Explorer';
import Login from './Login';
import { getApiToken, getApiListFiles, getApiGetFile } from '../actions/ExplorerApi';
import ToolbarExplorer from '../components/ToolbarExplorer';

class App extends React.Component {

	constructor(props) {
		super(props);
		const token = localStorage.getItem("token");

		if (token !== null && token !== undefined) {
			this.state = { token, isDeconnected: false };

		}
	}


	state = {
		token: undefined,
		login: undefined,
		message: undefined,
		isDeconnected: true
	};


	componentDidUpdate = (prevProps, prevState) => {
		if (this.state.token !== prevState.token)
			localStorage.token = this.state.token;
	};

	deleteToken = () => {
		this.setState({ token: undefined, isDeconnected: true });
	}

	actionDeconnexion = () => {
		this.deleteToken();
	}

	actionLogin = (login, password) => {
		getApiToken(login, password, (token) => {
			this.setState({ token, isDeconnected: false, login });
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

	render() {

		if (this.state.token !== undefined) {
			// Si utilisateur connecté => Explorer
			return (
				<div>
					<ToolbarExplorer  connected={true} actionDeconnexion={this.actionDeconnexion} login={this.state.login}/>
					<Explorer token={this.state.token}
						actionListFiles={this.actionListFiles}
						actionGetFile={this.actionGetFile} />
				</div>)
		} else {
			// Si utilisateur non connecté => Login
			return (
				<div>
					<ToolbarExplorer connected={false}/>
					<Login actionLogin={this.actionLogin} msgError={this.state.message} />
				</div>)
		}
	}



}

export default App;