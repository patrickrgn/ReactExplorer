// REACT
import React from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


import LoadingButton from '../components/LoadingButton';
import BreadcrumbExplorer from '../components/BreadcrumbExplorer';
import MessagesBox from '../components/MessagesBox';
import TableDir from '../components/TableDir';
import ContentFile from '../components/ContentFile';

class Explorer extends React.Component {

	state = {
		files: [],
		dir: "",
		isLoading: false,

		showFile: false,
		file: {},

		messages: [],
		domain: "http://localhost/explorerreact/"
	};

	componentDidMount() {
		this.getListFiles();
	}

	addMessage = (text, type) => {

		// Timestamp en milliseconds
		const timestamp = Date.now();

		// Création du message
		const message = {
			text: text,
			type: type,
			timestamp: `${timestamp}`
		};


		// On copie le state
		const messages = { ...this.state.messages };

		// On ajoute le message avec une clé timestamp
		messages[`${timestamp}`] = message;

		// Suppression si + de 4 messages
		//Object.keys(messages).slice(0, -4).map(key => messages[key] = null);

		// Mettre à jour notre state
		this.setState({ messages });


	};

	getListFiles = (path) => {

		this.setState({ isLoading: true });
		this.addMessage("Chargement du dossier : " + path, "info");

		this.props.actionListFiles(path, (files, dir) => {

			this.setState({ dir: dir });
			this.setState({ files });
			this.setState({ isLoading: false });

			this.addMessage("Dossier chargé", "success");
		}, (err) => {
			this.setState({ dir: path });
			this.setState({ files: [] });
			this.setState({ isLoading: false });
			this.addMessage("Erreur lors du chargement du dossier : " + err, "danger");
		});

	};

	getFileContent = (path) => {

		this.props.actionGetFile(path, (file) => {
			this.setState({ file });
			this.addMessage("Fichier chargé", "success");
			this.setState({ showFile: true });

		}, (err) => {
			this.addMessage("Erreur lors de l'ouverture du fichier : " + err, "danger");
		});

	};

	closeFile = () => {
		this.setState({ showFile: false });

	}


	render() {



		return (
			<div>

				<Grid fluid={true}>
					<Row className="show-grid header">
						<Col xs={12} md={12}>
							<h1><center>React Explorateur</center></h1>
						</Col>
					</Row>
					<Row className="show-grid">
						<Col xs={12} md={6}>

							<BreadcrumbExplorer href={this.state.dir} actionNavigation={this.getListFiles} />
							<LoadingButton action={this.getListFiles} msgLoading="Actualisation en cours" msgLoaded="Actualiser le dossier" isLoading={this.state.isLoading} />
							<TableDir files={this.state.files} dir={this.state.dir} actionDir={this.getListFiles} actionFile={this.getFileContent} />

						</Col>
						<Col xs={12} md={6}>
							<MessagesBox messages={this.state.messages} />
							<ContentFile file={this.state.file} showFile={this.state.showFile} closeFile={this.closeFile} />
						</Col>
					</Row>


				</Grid>

			</div>
		)
	}



}

export default Explorer;