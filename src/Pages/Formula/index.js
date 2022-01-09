import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Formula

import Profil from './FormulaProfil/Profil';
import Edit from './FormulaProfil/Edit';
import Add from './FormulaProfil/Add';
import List from './FormulaList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Formula = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:formulaId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:formulaId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Formula;