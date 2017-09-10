// REACT
import React from 'react';

import LoadingButton from '../components/LoadingButton';
import BreadcrumbExplorer from '../components/BreadcrumbExplorer';
import NotificationsBox from '../components/NotificationsBox';
import TableExplorer from '../components/TableExplorer';
import PopinShowFile from '../components/PopinShowFile';
import PopinEditFile from '../components/PopinEditFile';
import PopinConfirm from '../components/PopinConfirm';

import { Card, CardText, CardTitle } from 'material-ui/Card';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

class Explorer extends React.Component {

	state = {
		files: [],
		dir: "C:/Developpement/wamp64/www/test",
		//dir: "/home/patrickrjl/www/sites",

		currentFile: undefined,
		messages: [],

		// Popin ShowDile
		isLoading: false,
		openPopinShowFile: false,

		// Popin EditFile
		openPopinEditFile: false,
		isSaving: false,

		// Popin Confirm
		openPopinConfirm: false

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

		this.props.actionGetListFiles(dir)
			.then(res => {
				this.setState({ dir: res.dir });
				this.setState({ files: res.files });
				this.setState({ isLoading: false });
				this.addMessage("Dossier chargé : " + this.state.dir, "success");
			})
			.catch(err => {
				this.setState({ files: [] });
				this.setState({ isLoading: false });
				this.addMessage("Erreur lors du chargement du dossier : " + err, "error");
			});

	};

	// Fonctions pour la popin ShowFile
	getFile = (path) => {
		this.props.actionGetFile(path)
			.then(res => {
				this.setState({ currentFile: res });
				this.addMessage("Fichier chargé: " + res.filename, "success");
				this.setState({ openPopinShowFile: true });
			})
			.catch(err => {
				this.addMessage("Erreur lors de l'ouverture du fichier : " + err, "error");
			});
	};

	closePopinShowFile = () => {
		this.setState({ openPopinShowFile: false, currentFile: undefined });
	}

	// Fonctions pour la popin EditFile
	showPopinEditFile = () => {
		this.setState({ openPopinEditFile: true });
	}

	closePopinEditFile = () => {
		this.setState({ openPopinEditFile: false, isSaving: false, currentFile: undefined });
	}

	saveFile = (name, content) => {
		this.setState({ isSaving: true });
		
		if (this.state.currentFile !== undefined) {
			this.props.actionEditFile(this.state.currentFile.filename, content)
				.then(res => this.addMessage("Fichier modifié", "success"))
				.then(res => this.getListFiles())
				.catch((err) => this.addMessage("Erreur lors de la modification du fichier : " + err, "error"));
		} else {
			var path = this.state.dir + "/" + name;
			this.props.actionCreateFile(path, content)
				.then(res => this.addMessage("Fichier créé", "success"))
				.then(res => this.getListFiles())
				.catch((err) => this.addMessage("Erreur lors de la création du fichier : " + err, "error"));
		}
		this.setState({ openPopinEditFile: false, isSaving: false, currentFile: undefined });
	}

	editFile = (file) => {
		this.props.actionGetFile(file.filename)
			.then(res => {
				file.content = res.content;
				this.setState({ currentFile: file, openPopinEditFile: true });
				this.addMessage("Fichier chargé: " + res.filename, "success");
			})
			.catch(err => {
				this.setState({ currentFile: undefined });
				this.addMessage("Erreur lors de l'ouverture du fichier : " + err, "error");
			});
		console.log(file);
	}

	// Fonctions pour la popin ConfirmDeleteFile
	deleteFile = (file) => {
		this.setState({ openPopinConfirm: true, currentFile: file });
	};

	closeDeleteFile = () => {
		this.setState({ openPopinConfirm: false, currentFile: undefined });
	}

	actionConfirmDelete = () => {
		var file = this.state.currentFile;
		this.props.actionDeleteFile(file.filename)
			.then(res => this.setState({ openPopinConfirm: false, currentFile: undefined }))
			.then(res => this.addMessage("Fichier supprimé: " + file.filename, "success"))
			.then(res => this.getListFiles())
			.catch(err => this.addMessage("Erreur lors de l'ouverture du fichier : " + err, "error"));
	};

	render() {

		const titleNotifications = "Notifications (" + Object.keys(this.state.messages).length + ")";
		const textPopinConfirm = "Êtes-vous sûr de vouloir supprimer le fichier : " + this.state.file;

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

									<TableExplorer
										files={this.state.files}
										dir={this.state.dir}
										actionListFiles={this.getListFiles}
										actionGetFile={this.getFile}
										actionDeleteFile={this.deleteFile}
										actionEditFile={this.editFile} />

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
					file={this.state.currentFile}
					open={this.state.openPopinShowFile}
					close={this.closePopinShowFile} />

				<PopinEditFile
					open={this.state.openPopinEditFile}
					close={this.closePopinEditFile}
					saveFile={this.saveFile}
					isSaving={this.state.isSaving}
					file={this.state.currentFile} />

				<PopinConfirm
					confirm={this.actionConfirmDelete}
					text={textPopinConfirm}
					open={this.state.openPopinConfirm}
					close={this.closeDeleteFile} />
			</div>
		)
	}



}

export default Explorer;