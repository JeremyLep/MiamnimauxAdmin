import React, {Fragment} from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Nav, NavItem, NavLink,
} from 'reactstrap';

import { Link } from "react-router-dom";
import {getToken} from "../../../Security/Security";
import {toast} from "react-toastify";

export default class Profil extends React.Component
{
    static GET_SUB_URL = '/api/subscription';

    constructor(props) {
        super(props);
        this.subscriptionId = props.match.params.subscriptionId;
        this.state = {
            subscription: [],
            hasMenu: true
        };
    }

    getSubscription() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Profil.GET_SUB_URL + '/' + this.subscriptionId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({subscription: res.data});
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    };

    componentDidMount() {
        this.getSubscription();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.subscriptionId = nextProps.match.params.subscriptionId;
        this.getSubscription();
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col md="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>
                                        Abonnement {this.state.subscription.id}
                                        <div className="pull-right mb-2 mr-2 badge badge-pill badge-success">{this.state.subscription.status}</div>
                                    </CardTitle>
                                    {this.state.hasMenu ? <MenuProfil props={this.props}/> : ''}
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}

const MenuProfil = (props) => {
    return (
        <Nav pills justified>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/edition` ? 'active' : '' }  tag={(props) => <Link {...props} />} to={`${props.props.match.url}/edition`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Edition
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/animaux` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/animaux`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Animaux
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/selection` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/selection`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Recettes sélectionnées
                </NavLink>
            </NavItem>
        </Nav>
    );
};