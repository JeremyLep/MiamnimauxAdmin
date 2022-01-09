import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// payment

import Profil from './PaymentProfil/Profil';
import Edit from './PaymentProfil/Edit';
import Add from './PaymentProfil/Add';
import List from './PaymentList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Payment = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:paymentId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:paymentId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Payment;