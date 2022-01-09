import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Pet

import PetList  from './PetList/';
import Profil from './PetProfil/Profil';
import Edit from './PetProfil/Edit';
import Add from './PetProfil/Add';
import Subscription from '../Subscription/SubscriptionList/List';
import Disease from '../Disease/DiseaseList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Pet = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={PetList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:petId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:petId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:petId/profile/abonnements`} component={Subscription}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Pet;