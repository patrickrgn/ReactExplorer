// REACT
import React from 'react';



import Explorer from '../containers/Explorer';
import Login from '../containers/Login';
import { getApiToken, getApiListFiles, getApiGetFile } from '../actions/ExplorerApi';

import { AppBar } from 'material-ui';

import LoadingButton from '../components/LoadingButton';

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
		localStorage.token = this.state.token;
	};

	deleteToken = () => {
		this.setState({ token: "", isDeconnected: true });
	}

	actionLogin = (login, password) => {
		getApiToken(login, password, (token) => {
			this.setState({ token, isDeconnected:false });
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


	preRender = (token) => {

		if (token !== null && token !== "")
			return (<div><LoadingButton action={this.deleteToken} msgLoading="Déconnexion en cours" msgLoaded="Deconnexion" isLoading={this.state.isDeconnected} /><Explorer token={this.state.token} actionListFiles={this.actionListFiles} actionGetFile={this.actionGetFile} /></div>)
		else
			return (<div><Login actionLogin={this.actionLogin} msgError={this.state.message} /></div>)
	}

	render() {

		return (
			<div>
				<AppBar title="React Explorer" showMenuIconButton={false} />
				{this.preRender(this.state.token)}
			</div>


		)
	}



}

export default App;