import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom';
import React, {Suspense, lazy, Fragment} from 'react';

import {getToken, Logout} from "../../Security/Security";
import {
    ToastContainer,
} from 'react-toastify';
import Price from "../../Pages/Price";
import Specie from "../../Pages/Specie";
import Breed from "../../Pages/Breed";
import Dish from "../../Pages/Dish";
import Aliment from "../../Pages/Aliment";
import Disease from "../../Pages/Disease";

const Dashboard = lazy(() => import('../../Pages/Dashboard'));

const User = lazy(() => import('../../Pages/User'));
const Pet = lazy(() => import('../../Pages/Pet'));
const Subscription = lazy(() => import('../../Pages/Subscription'));
const Formula = lazy(() => import('../../Pages/Formula'));
const Order = lazy(() => import('../../Pages/Order'));
const Invoice = lazy(() => import('../../Pages/Invoice'));
const Payment = lazy(() => import('../../Pages/Payment'));
const Comment = lazy(() => import('../../Pages/Comment'));
const Coupon = lazy(() => import('../../Pages/Coupon'));
const PromoCode = lazy(() => import('../../Pages/PromoCode'));
const Login = lazy(() => import('../../Pages/Login'));

const AppMain = () => {

    return (
        <Fragment>

            {/* User */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/utilisateurs" render={(props) =>
                    getToken() ? (
                        <User {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            {/* Pet */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/animaux" render={(props) =>
                    getToken() ? (
                        <Pet {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/commentaires" render={(props) =>
                    getToken() ? (
                        <Comment {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/prix" render={(props) =>
                    getToken() ? (
                        <Price {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/formules" render={(props) =>
                    getToken() ? (
                        <Formula {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/abonnements" render={(props) =>
                    getToken() ? (
                        <Subscription {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/commandes" render={(props) =>
                    getToken() ? (
                        <Order {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/paiements" render={(props) =>
                    getToken() ? (
                        <Payment {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/factures" render={(props) =>
                    getToken() ? (
                        <Invoice {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/especes" render={(props) =>
                    getToken() ? (
                        <Specie {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/races" render={(props) =>
                    getToken() ? (
                        <Breed {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/recettes" render={(props) =>
                    getToken() ? (
                        <Dish {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
            }>
                <Route path="/aliments" render={(props) =>
                    getToken() ? (
                        <Aliment {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/maladies" render={(props) =>
                    getToken() ? (
                        <Disease {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/coupons" render={(props) =>
                    getToken() ? (
                        <Coupon {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-5">
                            Please wait while we load all the Tables examples
                            <small>Because this is a demonstration we load at once all the Tables examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/code-promo" render={(props) =>
                    getToken() ? (
                        <PromoCode {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            {/* Dashboard */}

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait while we load all the Dashboard examples
                            <small>Because this is a demonstration, we load at once all the Dashboard examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/dashboard" render={(props) =>
                    getToken() ? (
                        <Dashboard {...props}/>
                    ) : (
                        <Redirect to="/login"/>
                    )
                }/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait while we load all the Dashboard examples
                            <small>Because this is a demonstration, we load at once all the Dashboard examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route path="/login" component={Login}/>
            </Suspense>

            <Suspense fallback={
                <div className="loader-container">
                    <div className="loader-container-inner">
                        <h6 className="mt-3">
                            Please wait while we load all the Dashboard examples
                            <small>Because this is a demonstration, we load at once all the Dashboard examples. This wouldn't happen in a real live app!</small>
                        </h6>
                    </div>
                </div>
                }>
                <Route exact path="/logout" render={() =>
                    Logout() ? (
                        <Redirect to="/login"/>
                    ) : (
                        <Redirect to="/dashboard"/>
                    )
                }/>
            </Suspense>

            <Route exact path="/" render={() =>
                getToken() ? (
                    <Redirect to="/dashboard"/>
                ) : (
                    <Redirect to="/login"/>
                )
            }/>
            <ToastContainer/>
        </Fragment>
    )
};

export default AppMain;