// REACT
import React from 'react';

// Import React Table
//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
//import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

class TableDir extends React.Component {

	state = {
		selected: [],
	};

	isSelected = (index) => {
		return this.state.selected.indexOf(index) !== -1;
	};

	handleRowSelection = (selectedRows) => {
		this.setState({
			selected: selectedRows,
		});
	};


	// Action si l'utilisateur clique sur un Dossier
	clickDir = (dir) => {
		this.props.actionDir(dir);
	};

	// Action si l'utilisateur clique sur un fichier
	clickFile = (file) => {
		this.props.actionFile(file);
	};


	// Gère le lien sur le nom
	nameFormater = (file) => {
		if (file.type === "Dossier")
			return (<a href="#" onClick={(e) => this.clickDir(file.filename)}>{file.name}</a>);
		else
			return (<a href="#" onClick={(e) => this.clickFile(file.filename)}>{file.name}</a>);
	};

	showRows = () => {


	}

	render() {

		const files = Object
			.keys(this.props.files)
			.map(key => <TableRow key={key} selectable={false}><TableRowColumn>{this.nameFormater(this.props.files[key])}</TableRowColumn>
				<TableRowColumn>{this.props.files[key].size}</TableRowColumn>
				<TableRowColumn>{this.props.files[key].type}</TableRowColumn>
				<TableRowColumn>{this.props.files[key].filename}</TableRowColumn></TableRow>);

		return (

			<div>
				<Table selectable={false}
					multiSelectable={false}>
					<TableHeader displaySelectAll={false}>
						<TableRow>
							<TableHeaderColumn>Nom</TableHeaderColumn>
							<TableHeaderColumn>Taille</TableHeaderColumn>
							<TableHeaderColumn>Type</TableHeaderColumn>
							<TableHeaderColumn>Chemin complet</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
						{files}
					</TableBody>
				</Table>
			</div>

		)
	}

}

export default TableDir;