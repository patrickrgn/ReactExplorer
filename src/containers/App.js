// REACT
import React from 'react';

import Explorer from './Explorer';
import Login from './Login';
import { apiGetToken, apiGetListFiles, apiGetFile, apiCreateFile, apiEditFile, apiDeleteFile } from '../actions/ExplorerApi';
import ToolbarExplorer from '../components/ToolbarExplorer';

class App extends React.Component {

	constructor(props) {
		super(props);
		const token = localStorage.getItem("token");

		if (token !== null && token !== undefined) {
			this.state = { isConnected: true };

		}
	}

	state = {
		login: undefined,
		message: undefined,
		isConnected: false
	};

	deleteToken = () => {
		this.setState({isConnected: false });
		localStorage.removeItem("token");
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
			.then(token => localStorage.setItem("token", token))
			.then(token => this.setState({ isConnected: true, login, message: undefined }))
			.catch(err => this.setState({ message: err }));
	}

	actionGetListFiles = (path) => {
		var token = localStorage.getItem("token");
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
		var token = localStorage.getItem("token");
		return new Promise((resolve, reject) => {
			apiGetFile(path, token)
				.then(res => resolve(res))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionDeleteFile = (path) => {
		var _this = this;
		var token = localStorage.getItem("token");
		return new Promise((resolve, reject) => {
			apiDeleteFile(path, token)
				.then(res => resolve(res))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionCreateFile = (path, content) => {
		var _this = this;
		var token = localStorage.getItem("token");
		return new Promise((resolve, reject) => {
			apiCreateFile(path, content, token)
				.then(res => resolve(true))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	actionEditFile = (path, content) => {
		var _this = this;
		var token = localStorage.getItem("token");
		return new Promise((resolve, reject) => {
			apiEditFile(path, content, token)
				.then(res => resolve(true))
				.catch(err => _this.verifyErrorToken(err))
				.catch(err => reject(err));
		});
	};

	render() {
		var token = localStorage.getItem("token");
		if (token !== undefined && this.state.isConnected) {
			// Si utilisateur connecté => Explorer
			return (
				<div>
					<ToolbarExplorer 
						connected={true} 
						actionDeconnexion={this.actionDeconnexion} 
						login={this.state.login} />
					<Explorer
						actionGetListFiles={this.actionGetListFiles}
						actionGetFile={this.actionGetFile}
						actionCreateFile={this.actionCreateFile}
						actionDeleteFile={this.actionDeleteFile}
						actionEditFile={this.actionEditFile} />
				</div>)
		} else {
			// Si utilisateur non connecté => Login
			return (
				<div>
					<ToolbarExplorer connected={false} />
					<Login 
						actionLogin={this.actionLogin} 
						msgError={this.state.message} />
				</div>)
		}
	}

}

export default App;