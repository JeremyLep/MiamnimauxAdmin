import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// Coupon

import CouponList  from './CouponList/';
import Profil from './CouponProfil/Profil';
import Edit from './CouponProfil/Edit';
import Add from './CouponProfil/Add';
import PromoCode from '../PromoCode/PromoCodeList/List';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';

const Coupon = ({match}) => (
    <Fragment>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route path={`${match.url}`} component={CouponList}/>
                    <Route path={`${match.url}/nouveau`} component={Add}/>
                    <Route path={`${match.url}/:couponId/profile`} component={Profil}/>
                    <Route path={`${match.url}/:couponId/profile/edition`} component={Edit}/>
                    <Route path={`${match.url}/:couponId/profile/code-promo`} component={PromoCode}/>
                </div>
            </div>
        </div>
    </Fragment>
);

export default Coupon;