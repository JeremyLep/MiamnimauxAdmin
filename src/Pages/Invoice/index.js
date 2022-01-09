import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// invoice

import Profil from './InvoiceProfil/Profil';
import Edit from './InvoiceProfil/Edit';
import Add from './InvoiceProfil/Add';
import List from './InvoiceList/';
import Address from '../User/UserProfil/Address';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Invoice = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:invoiceId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:invoiceId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:invoiceId/profile/adresse-facturation`} component={Address}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Invoice;