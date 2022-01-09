import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Dish

import DishList  from './DishList/';
import Profil from './DishProfil/Profil';
import Edit from './DishProfil/Edit';
import Add from './DishProfil/Add';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AlimentList from "../Aliment/AlimentList";

const Dish = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={DishList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:dishId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:dishId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:dishId/profile/aliments`} component={AlimentList}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Dish;