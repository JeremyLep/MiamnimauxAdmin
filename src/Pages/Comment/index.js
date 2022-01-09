import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// comment

import Profil from './CommentProfil/Profil';
import Edit from './CommentProfil/Edit';
import Add from './CommentProfil/Add';
import List from './CommentList/';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Comment = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={List}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:commentId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:commentId/profile/edition`} component={Edit}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Comment;