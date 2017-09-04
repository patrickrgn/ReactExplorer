// REACT
import React from 'react';
//import { render } from 'react-dom';

// Import React Table
//import ReactTable from "react-table";
//import "react-table/react-table.css";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class TableDir extends React.Component {



	// Action si l'utilisateur clique sur un Dossier
	clickDir = (dir) => {
		this.props.actionDir(dir);
	};

	// Action si l'utilisateur clique sur un fichier
	clickFile = (file) => {
		this.props.actionFile(file);
	};


	// Gère le lien sur le nom
	nameFormater = (cell, row) => {
		if(row.type === "Dossier")
			return (<a href="#" onClick={(e) => this.clickDir(row.filename)}>{cell}</a>);
		else
			return (<a href="#" onClick={(e) => this.clickFile(row.filename)}>{cell}</a>);
	};

	render() {



		return (

			<div>

				<BootstrapTable data={this.props.files} search={true} multiColumnSearch={true} striped hover>
			      <TableHeaderColumn isKey dataField='name' dataSort={ true } dataFormat={ this.nameFormater }>Nom</TableHeaderColumn>
			      <TableHeaderColumn dataField='size' dataSort={ true }>Taille</TableHeaderColumn>
			      <TableHeaderColumn dataField='type' dataSort={ true }>Type</TableHeaderColumn>
			      <TableHeaderColumn dataField='filename' dataSort={ true }>Chemin complet</TableHeaderColumn>
			  </BootstrapTable>

			</div>

		)
	}

}

export default TableDir;