import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Order

import Profil from './OrderProfil/Profil';
import Edit from './OrderProfil/Edit';
import Add from './OrderProfil/Add';
import List from './OrderList/';
import Address from '../User/UserProfil/Address';
import Dish from '../Dish/DishList/List';
import Comment from '../Comment/CommentList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Order = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:orderId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:orderId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:orderId/profile/recettes`} component={Dish}/>
                    <Route path={`${match.url}/:orderId/profile/commentaire`} component={Comment}/>
                    <Route path={`${match.url}/:orderId/profile/adresse-livraison`} component={Address}/>
                    <Route path={`${match.url}/:orderId/profile/borderaux-transport`} component={Profil}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Order;