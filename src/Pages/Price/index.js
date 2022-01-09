import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Prices

import Profil from './PriceProfil/Profil';
import Edit from './PriceProfil/Edit';
import Add from './PriceProfil/Add';
import List from './PriceList/';
import Disease from '../Disease/DiseaseList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Price = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:priceId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:priceId/profile/edition`} component={Edit}/>
                </div>
=            </div>
        </div>
    </Fragment>
);

export default Price;