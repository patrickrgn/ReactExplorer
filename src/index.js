// REACT
import React from 'react';
import { render } from 'react-dom';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

// COMPONENTS
import App from './containers/App';
//import NotFound from './components/NotFound';



// CSS
import './index.css';

const AppbarStyles = () => getMuiTheme({
	palette: {
		primary1Color: '#00bcd4'
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