// REACT
import React from 'react';
import { render } from 'react-dom';

import {cyan500, grey50, white} from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// COMPONENTS
import App from './containers/App';

// CSS
import './index.css';

const AppbarStyles = () => getMuiTheme({
	palette: {
		primary1Color: cyan500
	},
	raisedButton: {
		primaryColor: cyan500,
		disabledColor: 'rgb(0, 0, 0, 0.08)',
		primaryTextColor: white
	},
	flatButton: {
		buttonColor: white
	},
	tableRow: {
		stripeColor: grey50
	}
});


const Root = () => {
	return (
		<MuiThemeProvider muiTheme={AppbarStyles()}>
			<App />
		</MuiThemeProvider>


	)
}

render(
	<Root />,
	document.getElementById('root')
);