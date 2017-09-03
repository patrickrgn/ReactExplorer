// REACT
import React from 'react';
import { render } from 'react-dom';


// COMPONENTS
import App from './components/App';
//import NotFound from './components/NotFound';



// CSS
import './index.css';


const Root = () => {
	return (
		<App />

	)
}

render(
	<Root />,
	document.getElementById('root')
);