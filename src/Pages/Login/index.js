import React, {Fragment} from 'react';

// Login

import LoginForm  from './Form/';
import {Route} from "react-router-dom";

const Login = ({match}) => (
    <Fragment>
        <div className="app-main m-auto">
            <Route path={`${match.url}`} component={LoginForm}/>
        </div>
    </Fragment>
);

export default Login;