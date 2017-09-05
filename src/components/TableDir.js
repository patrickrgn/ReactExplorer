// REACT
import React from 'react';

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

	sizeFormater = (size) => {

		var aSize = Math.abs(parseInt(size, 10));
		var def = [[1, 'octets'], [1024, 'ko'], [1024 * 1024, 'Mo'], [1024 * 1024 * 1024, 'Go'], [1024 * 1024 * 1024 * 1024, 'To']];
		for (var i = 0; i < def.length; i++) {
			if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
		}

	}

	showRows = () => {


	}

	render() {

		const files = Object
			.keys(this.props.files)
			.map(key => <TableRow key={key} selectable={false}>
							<TableRowColumn style={{width: '150px'}}>{this.nameFormater(this.props.files[key])}</TableRowColumn>
							<TableRowColumn style={{width: '100px'}}>{this.sizeFormater(this.props.files[key].size)}</TableRowColumn>
							<TableRowColumn style={{width: '200px'}}>{this.props.files[key].type}</TableRowColumn>
							<TableRowColumn style={{width: '500px'}}>{this.props.files[key].filename}</TableRowColumn>
						</TableRow>);

		return (

			<div>
				<Table selectable={false}
					multiSelectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn style={{width: '150px'}}>Nom</TableHeaderColumn>
							<TableHeaderColumn style={{width: '100px'}}>Taille</TableHeaderColumn>
							<TableHeaderColumn style={{width: '200px'}}>Type</TableHeaderColumn>
							<TableHeaderColumn style={{width: '500px'}}>Chemin complet</TableHeaderColumn>
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