import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import MetisMenu from 'react-metismenu';

import {MainNav, CustomerNav, ProductNav, OrderNav, AccountingNav, ConfigNav} from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        return (
            <Fragment>
                <h5 className="app-sidebar__heading">Menu</h5>
                <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Client</h5>
                <MetisMenu content={CustomerNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Produit</h5>
                <MetisMenu content={ProductNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Commandes / Abonnement</h5>
                <MetisMenu content={OrderNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Finances</h5>
                <MetisMenu content={AccountingNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                <h5 className="app-sidebar__heading">Configuration</h5>
                <MetisMenu content={ConfigNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);