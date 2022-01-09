import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// breed

import Profil from './BreedProfil/Profil';
import Edit from './BreedProfil/Edit';
import Add from './BreedProfil/Add';
import List from './BreedList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Breed = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:breedId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:breedId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Breed;