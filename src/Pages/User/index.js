 import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// User

import UserList  from './UserList/';
import Profil from './UserProfil/Profil';
import Edit from './UserProfil/Edit';
import Add from './UserProfil/Add';
import Address from './UserProfil/Address';
import Pets from '../Pet/PetList/List';
import Subscription from '../Subscription/SubscriptionList/List';
import Order from '../Order/OrderList/List';
import Invoice from '../Invoice/InvoiceList/List';
import Payment from '../Payment/PaymentList/List';
import Comment from '../Comment/CommentList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const User = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={UserList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:userId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:userId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:userId/profile/adresses`} component={Address}/>
                    <Route path={`${match.url}/:userId/profile/animaux`} component={Pets}/>
                    <Route path={`${match.url}/:userId/profile/abonnements`} component={Subscription}/>
                    <Route path={`${match.url}/:userId/profile/commandes`} component={Order}/>
                    <Route path={`${match.url}/:userId/profile/factures`} component={Invoice}/>
                    <Route path={`${match.url}/:userId/profile/paiements`} component={Payment}/>
                    <Route path={`${match.url}/:userId/profile/commentaires`} component={Comment}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default User;