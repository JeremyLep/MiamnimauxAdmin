import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// PromoCode

import PromoCodeList  from './PromoCodeList/';
import Profil from './PromoCodeProfil/Profil';
import Edit from './PromoCodeProfil/Edit';
import Add from './PromoCodeProfil/Add';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const PromoCode = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={PromoCodeList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:promoCodeId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:promoCodeId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default PromoCode;