// REACT
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

import Button from 'react-bootstrap/lib/Button';
import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';


import LoadingButton from './LoadingButton';
import BreadcrumbExplorer from './BreadcrumbExplorer';
import MessagesBox from './MessagesBox';
import TableDir from './TableDir';
import ContentFile from './ContentFile';

class App extends React.Component {

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
		const messages = {...this.state.messages};

		// On ajoute le message avec une clé timestamp
		messages[`${timestamp}`] = message;

		// Suppression si + de 4 messages
		//Object.keys(messages).slice(0, -4).map(key => messages[key] = null);

		// Mettre à jour notre state
		this.setState({messages});
		
	};

	getListFiles = (path) => {

		var encodedURI = encodeURIComponent(path);

		this.setState({ isLoading: true });
		this.setState({files: []});	
		this.addMessage("Chargement des données : " + path, "info");

		//Test
		var url = this.state.domain + "scanDir.php?application=explorerreact&password=coucou&path="+encodedURI;

		// Récupération de la liste des fichiers
		axios.get(url)
			.then(res => {
				
				const files = [];
				res.data.files.forEach(file => {
					files.push(file);
				})

				this.setState({dir: res.data.dir});
				this.setState({files});
				this.setState({ isLoading: false });

				this.addMessage("Fin de la récupération", "success");
				
			})
			.catch((err) => {

				this.setState({dir: path});
				this.setState({ isLoading: false });
				this.addMessage("Erreur lors du chargement des données : "+err, "danger");
			  });
	};

	getFileContent = (path) => {

		var encodedURI = encodeURIComponent(path);
		
		var url = this.state.domain + "getFile.php?application=explorerreact&password=coucou&path="+encodedURI;

		this.addMessage("Ouverture du fichier : " + path, "info");

		// Récupération de la liste des fichiers
		axios.get(url)
			.then(res => {
				
				
				var file = {
					"filename" : path,
					"content" : res.data
				}

				this.setState({file});
				
				this.addMessage("Fichier chargé", "success");
				this.setState({showFile : true});
			})
			.catch((err) => {
				this.addMessage("Erreur lors de l'ouverture du fichier : "+err, "danger");
			  });

	};

	closeFile = () => {
		this.setState({showFile : false});

	}
	

	render() {

		

		return (
			<div>

				<Grid fluid={true}>
					<Row className="show-grid header">
						<Col xs={12} md={12}>
							<h1><center>Explorateur React</center></h1>
						</Col>
					</Row>
					<Row className="show-grid">
						<Col xs={12} md={6}>
							
							<BreadcrumbExplorer href={this.state.dir} actionNavigation={this.getListFiles} />
							<LoadingButton action={this.getListFiles} isLoading={this.state.isLoading} />
							<TableDir files={this.state.files} dir={this.state.dir} actionDir={this.getListFiles} actionFile={this.getFileContent} />
						
						</Col>
						<Col xs={12} md={6}>
								<MessagesBox messages={this.state.messages} />
								<ContentFile file={this.state.file} showFile={this.state.showFile} closeFile={this.closeFile}/>
						</Col>
					</Row>
					

				</Grid>

			</div>
		)
	}



}

export default App;