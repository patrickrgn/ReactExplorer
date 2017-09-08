// REACT
import React from 'react';



import Explorer from './Explorer';
import Login from './Login';
import { apiGetToken, apiGetListFiles, apiGetFile, apiCreateFile } from '../actions/ExplorerApi';
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
		apiGetToken(login, password, (token) => {
			this.setState({ token, isDeconnected: false, login });
		}, (err) => {
			this.setState({ message: err })
		});
	}

	actionGetListFiles = (path, callbackSuccess, callbackError) => {
		if (this.state.token !== "") {
			apiGetListFiles(path, this.state.token, (files, dir) => {
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
		apiGetFile(path, this.state.token, (file) => {
			callbackSuccess(file);

		}, (err) => {
			if (err === "Erreur token") {
				this.deleteToken();
			}
			callbackError(err);
		});

	};

	actionCreateFile = (path, content) => {
		var _this = this;
		return new Promise(function (resolve, reject) {

			apiCreateFile(path, content, _this.state.token)
				.then(res => {
					resolve(true);
				})
				.catch((err) => {
					if (err === "Erreur token") {
						this.deleteToken();
					}
					reject(err);
				});
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
						actionCreateFile={this.actionCreateFile} />
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