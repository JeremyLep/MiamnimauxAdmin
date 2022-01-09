import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// aliment

import Profil from './AlimentProfil/Profil';
import Edit from './AlimentProfil/Edit';
import Add from './AlimentProfil/Add';
import List from './AlimentList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Aliment = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:alimentId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:alimentId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Aliment;