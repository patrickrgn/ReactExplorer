// REACT
import React from 'react';



import Explorer from './Explorer';
import Login from './Login';
import { apiGetToken, apiGetListFiles, apiGetFile, apiCreateFile, apiDeleteFile } from '../actions/ExplorerApi';
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

	// Vérifie le message d'erreur
	// S'il s'agit d'une erreur de token, on le supprime du state
	verifyErrorToken = (err) => {
		if (err === "Erreur token") {
			this.deleteToken();
		}
	}

	actionLogin = (login, password) => {
		apiGetToken(login, password)
			.then(token => this.setState({ token, isDeconnected: false, login }))
			.catch(err => this.setState({ message: err }));
	}

	actionGetListFiles = (path) => {
		var token = this.state.token;
		var _this = this;
		return new Promise((resolve, reject) => {
			apiGetListFiles(path, token)
				.then(res => resolve(res))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionGetFile = (path) => {
		var _this = this;
		var token = this.state.token;
		return new Promise((resolve, reject) => {
			apiGetFile(path, token)
				.then(res => resolve(res))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionDeleteFile = (path) => {
		var _this = this;
		var token = this.state.token;
		return new Promise((resolve, reject) => {
			apiDeleteFile(path, token)
				.then(res => resolve(res))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionCreateFile = (path, content) => {
		var _this = this;
		return new Promise((resolve, reject) => {
			apiCreateFile(path, content, _this.state.token)
				.then(res => resolve(true))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
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
					<ToolbarExplorer connected={true} actionDeconnexion={this.actionDeconnexion} login={this.state.login} />
					<Explorer token={this.state.token}
						actionGetListFiles={this.actionGetListFiles}
						actionGetFile={this.actionGetFile}
						actionCreateFile={this.actionCreateFile}
						actionDeleteFile={this.actionDeleteFile} />
				</div>)
		} else {
			// Si utilisateur non connecté => Login
			return (
				<div>
					<ToolbarExplorer connected={false} />
					<Login actionLogin={this.actionLogin} msgError={this.state.message} />
				</div>)
		}
	}



}

export default App;