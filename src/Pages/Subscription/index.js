import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Subscription

import SubscriptionList  from './SubscriptionList/';
import Add  from './SubscriptionProfil/Add';
import Profil from './SubscriptionProfil/Profil';
import Edit from './SubscriptionProfil/Edit';
import Pet from '../Pet/PetList/List';
import Dish from '../Dish/DishList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Subscription = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={SubscriptionList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:subscriptionId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:subscriptionId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:subscriptionId/profile/animaux`} component={Pet}/>
                    <Route path={`${match.url}/:subscriptionId/profile/selection`} component={Dish}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Subscription;