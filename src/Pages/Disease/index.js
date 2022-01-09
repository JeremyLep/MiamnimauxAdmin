import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// disease

import Profil from './DiseaseProfil/Profil';
import Edit from './DiseaseProfil/Edit';
import Add from './DiseaseProfil/Add';
import List from './DiseaseList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Disease = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:diseaseId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:diseaseId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Disease;