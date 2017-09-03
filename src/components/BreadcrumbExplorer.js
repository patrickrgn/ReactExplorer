// REACT
import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

class BreadcrumbExplorer extends React.Component {

    componentDidMount() {

        //const nav = React.findDOMNode(this).querySelector('nav.navbar');

        
    }

    extractNameDir = (path) => {

        var tab = path.split('/');
        return tab[tab.length - 1];
    }

    clickDossier = (path) => {
		this.props.actionNavigation(path);
	}


    render() {
        
        
        var paths = [];
        var pathCourant = "";
        this.props.href.split('/').forEach(path => {
            if(paths.length > 0)
                var newPath = pathCourant + "/" + path;
            else
                var newPath = path;
            paths.push(newPath);
            pathCourant = newPath;
        })

        const url = paths.map((item, key) => <Breadcrumb.Item id={this.extractNameDir(item)} key={item} onClick={(e) => this.clickDossier(item)}>{this.extractNameDir(item)}</Breadcrumb.Item>);
        return (
            <Breadcrumb>
               {url}
            </Breadcrumb>
        )
    }



}

export default BreadcrumbExplorer;