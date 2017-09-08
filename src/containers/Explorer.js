// REACT
import React from 'react';

import LoadingButton from '../components/LoadingButton';
import BreadcrumbExplorer from '../components/BreadcrumbExplorer';
import NotificationsBox from '../components/NotificationsBox';
import TableDir from '../components/TableDir';
import PopinShowFile from '../components/PopinShowFile';
import PopinEditFile from '../components/PopinEditFile';

import { Card, CardText, CardTitle } from 'material-ui/Card';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Explorer extends React.Component {

	state = {
		files: [],
		dir: "C:/Developpement/wamp64/www/test",

		// Popin ShowDile
		isLoading: false,
		showPopinShowFile: false,
		file: {},

		// Popin EditFile
		showPopinEditFile: false,
		isSaving: false,

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

		var dir = path;

		if (path === undefined)
			dir = this.state.dir;

		this.setState({ isLoading: true });
		//this.addMessage("Chargement du dossier : " + dir, "info");

		this.props.actionGetListFiles(dir, (files, dir) => {
			this.setState({ dir: dir });
			this.setState({ files });
			this.setState({ isLoading: false });

			this.addMessage("Dossier chargé", "success");
		}, (err) => {
			this.setState({ dir: dir });
			this.setState({ files: [] });
			this.setState({ isLoading: false });
			this.addMessage("Erreur lors du chargement du dossier : " + err, "error");
		});

	};


	// Fonctions pour la popin ShowFile
	getFileContent = (path) => {

		this.props.actionGetFile(path, (file) => {
			this.setState({ file });
			this.addMessage("Fichier chargé: " + file.filename, "success");
			this.setState({ showPopinShowFile: true });

		}, (err) => {
			this.addMessage("Erreur lors de l'ouverture du fichier : " + err, "error");
		});

	};

	closePopinShowFile = () => {
		this.setState({ showPopinShowFile: false });
	}


	// Fonctions pour la popin EditFile
	showPopinEditFile = () => {
		this.setState({ showPopinEditFile: true });
	}

	closePopinEditFile = () => {
		this.setState({ showPopinEditFile: false, isSaving: false });
	}

	saveFile = (name, content) => {
		this.setState({ isSaving: true });
		var path = this.state.dir + "/" + name;
		this.props.actionCreateFile(path, content)
		.then(res => {
			this.addMessage("Fichier créé", "success");
			this.getListFiles();
		})
		.catch((err) => {
			this.addMessage("Erreur lors de la création du fichier : " + err, "error");	
		});


		this.setState({ showPopinEditFile: false, isSaving: false });
		
	}

	render() {

		const titleNotifications = "Notifications (" + Object.keys(this.state.messages).length + ")";

		return (
			<div>
				<Grid fluid={true}>
					<Row className="show-grid header">
						<Col xs={12} md={8}>
							<Card expanded={true}>
								<CardTitle title="Navigateur" />
								<CardText>
									<BreadcrumbExplorer
										href={this.state.dir}
										actionNavigation={this.getListFiles} />

									<LoadingButton
										id="button_actualisation"
										type="primary"
										action={this.getListFiles}
										msgLoading="Actualisation en cours"
										msgLoaded="Actualiser le dossier"
										isLoading={this.state.isLoading} />

									<LoadingButton
										id="button_creer_fichier"
										type="secondary"
										action={this.showPopinEditFile}
										msgLoaded="Créer un fichier"
										isLoading={false} />

									<TableDir
										files={this.state.files}
										dir={this.state.dir}
										actionDir={this.getListFiles}
										actionFile={this.getFileContent} />

								</CardText>
							</Card>
						</Col>
						<Col xs={12} md={4}>
							<Card expanded={true}>
								<CardTitle title={titleNotifications} />
								<CardText>
									<NotificationsBox messages={this.state.messages} />
								</CardText>
							</Card>

						</Col>
					</Row>
				</Grid>

				<PopinShowFile
					file={this.state.file}
					showFile={this.state.showPopinShowFile}
					close={this.closePopinShowFile} />

				<PopinEditFile
					showPopin={this.state.showPopinEditFile}
					actionClose={this.closePopinEditFile}
					actionSaveFile={this.saveFile}
					isSaving={this.state.isSaving} />
			</div>
		)
	}



}

export default Explorer;