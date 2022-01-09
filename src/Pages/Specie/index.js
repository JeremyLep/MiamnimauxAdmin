import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// specie

import Profil from './SpicieProfil/Profil';
import Edit from './SpicieProfil/Edit';
import Add from './SpicieProfil/Add';
import List from './SpecieList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Specie = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:specieId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:specieId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Specie;