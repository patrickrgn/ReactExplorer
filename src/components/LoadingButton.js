// REACT
import React from 'react';
import Button from 'react-bootstrap/lib/Button';

class LoadingButton extends React.Component {

    handleClick = (event) => {

        this.props.action();
    }


    render() {
        let isLoading = this.props.isLoading;
        return (
            <Button
                bsStyle="primary"
                disabled={isLoading}
                onClick={!isLoading ? this.handleClick : null}>
                {isLoading ? "Actualisation en cours" : "Actualiser le dossier"}
            </Button>
        )
    }



}

export default LoadingButton;