// REACT
import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
// import { FileFolder} from 'material-ui/svg-icons/file/folder';

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
		this.props.actionListFiles(dir);
	};

	// Action si l'utilisateur clique sur un fichier
	clickFile = (file) => {
		this.props.actionGetFile(file);
	};


	// Gère le lien sur le nom
	nameFormater = (file) => {
		if (file.type === "Dossier")
			return (<a href="#" onClick={(e) => this.clickDir(file.filename)}>{file.name}</a>);
		else
			return (<a href="#" onClick={(e) => this.clickFile(file.filename)}>{file.name}</a>);
	};

	// Gère le lien sur le nom
	iconFormater = (file) => {
		if (file.type === "Dossier")
			return (<div></div>);
		else
			return (<div></div>);
	};

	sizeFormater = (size) => {
		var aSize = Math.abs(parseInt(size, 10));
		var def = [[1, 'octets'], [1024, 'ko'], [1024 * 1024, 'Mo'], [1024 * 1024 * 1024, 'Go'], [1024 * 1024 * 1024 * 1024, 'To']];
		for (var i = 0; i < def.length; i++) {
			if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
		}
	}

	handleDelete = (event) => {
		this.props.actionDeleteFile(this.props.files[event.currentTarget.id].filename);
	}

	actionFormater = (key) => {

		const style = {
			iconHoverColor: '#ff0000'
		}

		var id = "delete-"+key;

		return (<div>
					<IconButton id={key} tooltip="Supprimer" iconStyle={style} onClick={this.handleDelete}>
						<DeleteIcon/>
					</IconButton>
				</div>);
	}

	render() {

		const style = {
			icon: {
				width: '40px',
				padding: 0
			},
			name: {
				width: '200px'
			},
			size: {
				width: '120px'
			},
			type: {
				width: '120px'
			},
			filename: {
				width: 'auto'
			},
			action: {
				width: '50px'
			}
		};

		const files = Object
			.keys(this.props.files)
			.map(key => <TableRow key={key} selectable={false}>
				<TableRowColumn style={style.icon}>{this.iconFormater(this.props.files[key])}</TableRowColumn>
				<TableRowColumn style={style.name}>{this.nameFormater(this.props.files[key])}</TableRowColumn>
				<TableRowColumn style={style.type}>{this.sizeFormater(this.props.files[key].size)}</TableRowColumn>
				<TableRowColumn style={style.type}>{this.props.files[key].type}</TableRowColumn>
				<TableRowColumn style={style.filename}>{this.props.files[key].filename}</TableRowColumn>
				<TableRowColumn style={style.actions}>{this.actionFormater(key)}</TableRowColumn>
			</TableRow>);

		return (
			<Table selectable={false}
				multiSelectable={false}>
				<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
					<TableRow>
						<TableHeaderColumn style={style.icon}></TableHeaderColumn>
						<TableHeaderColumn style={style.name}>Nom</TableHeaderColumn>
						<TableHeaderColumn style={style.size}>Taille</TableHeaderColumn>
						<TableHeaderColumn style={style.type}>Type</TableHeaderColumn>
						<TableHeaderColumn style={style.filename}>Chemin complet</TableHeaderColumn>
						<TableHeaderColumn style={style.actions}>Actions</TableHeaderColumn>
					</TableRow>
				</TableHeader>
				<TableBody displayRowCheckbox={false} showRowHover={true} stripedRows={true}>
					{files}
				</TableBody>
			</Table>
		)
	}

}

export default TableDir;