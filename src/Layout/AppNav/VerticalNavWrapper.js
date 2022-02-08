import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';
import {getToken} from "../../Security/Security";

import MetisMenu from 'react-metismenu';

import {MainNav, CustomerNav, ProductNav, OrderNav, AccountingNav, ConfigNav, PromoNav} from './NavItems';

class Nav extends Component {

    state = {};

    render() {
        const isAdmin = getToken().roles == 'ROLE_ADMIN';
        return (
            <Fragment>
                <div>
                    <h5 className="app-sidebar__heading">Menu</h5>
                    <MetisMenu content={MainNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                <div>
                    <h5 className="app-sidebar__heading">Client</h5>
                    <MetisMenu content={CustomerNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                { isAdmin ?
                    <div>
                        <h5 className="app-sidebar__heading">Produit</h5>
                        <MetisMenu content={ProductNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    </div>
                    : ''
                }
                <div>
                    <h5 className="app-sidebar__heading">Commandes / Abonnement</h5>
                    <MetisMenu content={OrderNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                { isAdmin ?
                    <div>
                        <h5 className="app-sidebar__heading">Finances</h5>
                        <MetisMenu content={AccountingNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    </div>
                    : ''
                }
                <div>
                    <h5 className="app-sidebar__heading">Promo</h5>
                    <MetisMenu content={PromoNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                </div>
                { isAdmin ?
                    <div>
                        <h5 className="app-sidebar__heading">Configuration</h5>
                        <MetisMenu content={ConfigNav} activeLinkFromLocation className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    </div>
                    : ''
                }
            </Fragment>
        );
    }

    isPathActive(path) {
        return this.props.location.pathname.startsWith(path);
    }
}

export default withRouter(Nav);