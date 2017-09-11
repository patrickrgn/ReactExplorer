// REACT
import React from 'react';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import VisibilityIcon from 'material-ui/svg-icons/action/visibility';
import FolderIcon from 'material-ui/svg-icons/file/folder';
import DescriptionIcon from 'material-ui/svg-icons/action/description';
import ModeEditIcon from 'material-ui/svg-icons/editor/mode-edit';
import { pink500, ping800, grey500, cyan500 } from 'material-ui/styles/colors';

import {
	Table,
	TableBody,
	TableHeader,
	TableHeaderColumn,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';

class TableExplorer extends React.Component {

	state = {
		selected: [],
		file: undefined
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

	// Gère le lien sur le nom
	iconFormater = (file) => {

		const style = {
			fill: grey500
		}

		if (file.type === "Dossier")
			return (<FolderIcon style={style} />);
		else
			return (<DescriptionIcon style={style} />);
	};

	// Gère le lien sur le nom
	nameFormater = (file) => {
		if (file.type === "Dossier")
			return (<a href="#" onClick={(e) => this.clickDir(file.filename)}>{file.name}</a>);
		else
			return (file.name);
	};

	sizeFormater = (file) => {

		var size = file.size;
		if (file.type !== "Dossier") {
			if (size > 0) {
				var aSize = Math.abs(parseInt(size, 10));
				var def = [[1, 'octets'], [1024, 'ko'], [1024 * 1024, 'Mo'], [1024 * 1024 * 1024, 'Go'], [1024 * 1024 * 1024 * 1024, 'To']];
				for (var i = 0; i < def.length; i++) {
					if (aSize < def[i][0]) return (aSize / def[i - 1][0]).toFixed(2) + ' ' + def[i - 1][1];
				}
			} else {
				return "vide";
			}
		} else {
			return "";
		}
	}

	actionFormater = (file, key) => {

		const style = {
			delete: {
				fill: pink500,
				iconHoverColor: ping800
			},
			edit: {
				fill: cyan500
			}
		}

		if (file.type === "Dossier") {

			return (<div>

			</div>);
		} else {

			return (<div>
				<IconButton id={key} tooltip="Visualiser" iconStyle={style.edit} onClick={this.handleShowFile}><VisibilityIcon /></IconButton>
				<IconButton id={key} tooltip="Modifier" iconStyle={style.edit} onClick={this.handleEdit}><ModeEditIcon /></IconButton>
				<IconButton id={key} tooltip="Supprimer" iconStyle={style.delete} onClick={this.handleDelete}><DeleteIcon /></IconButton>
			</div>);
		}
	}

	/**
	 * DELETE
	 */
	handleDelete = (event) => {
		this.props.actionDeleteFile(this.props.files[event.currentTarget.id]);
	}

	/**
	 * EDIT
	 */
	handleEdit = (event) => {
		this.props.actionEditFile(this.props.files[event.currentTarget.id]);
	}

	/**
	 * SHOW
	 */
	handleShowFile = (event) => {
		this.props.actionGetFile(this.props.files[event.currentTarget.id].filename);
	};

	

	render() {

		const style = {
			icon: {
				width: '40px',
				'textAlign': 'center',
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
				<TableRowColumn style={style.type}>{this.sizeFormater(this.props.files[key])}</TableRowColumn>
				<TableRowColumn style={style.type}>{this.props.files[key].type}</TableRowColumn>
				<TableRowColumn style={style.filename}>{this.props.files[key].filename}</TableRowColumn>
				<TableRowColumn style={style.actions}>{this.actionFormater(this.props.files[key], key)}</TableRowColumn>
			</TableRow>);

		return (
			<div>
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

			</div>
		)
	}

}

export default TableExplorer;