// REACT
import React from 'react';
import Breadcrumb from 'react-bootstrap/lib/Breadcrumb';

class BreadcrumbExplorer extends React.Component {



    extractNameDir = (path) => {

        if (path !== undefined) {
            var tab = path.split('/');
            return tab[tab.length - 1];
        } else {
            return "";
        }

    }

    clickDossier = (path) => {
        this.props.actionNavigation(path);
    }


    render() {


        var paths = [];
        var pathCourant = "";

        if (this.props.href !== undefined) {
            this.props.href.split('/').forEach(path => {
                if (paths.length > 0)
                    pathCourant = pathCourant + "/" + path;
                else
                    pathCourant = path;
                paths.push(pathCourant);
            });
            const url = paths.map((item, key) => <Breadcrumb.Item id={this.extractNameDir(item)} key={item} onClick={(e) => this.clickDossier(item)}>{this.extractNameDir(item)}</Breadcrumb.Item>);
            return (
                <Breadcrumb>
                    {url}
                </Breadcrumb>
            )
        } else {
            return (
                <Breadcrumb>
                    
                </Breadcrumb>
            )
        }


        
        
    }



}

export default BreadcrumbExplorer;