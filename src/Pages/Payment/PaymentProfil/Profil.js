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
    static GET_ORDER_URL = '/api/payment';

    constructor(props) {
        super(props);
        this.paymentId = props.match.params.paymentId;
        this.state = {
            payment: [],
            hasMenu: true
        };
    }

    getPayment() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Profil.GET_ORDER_URL + '/' + this.paymentId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({payment: res.data});
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
        this.getPayment();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.paymentId = nextProps.match.params.paymentId;
        this.getPayment();
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
                                        Paiement N°{this.state.payment.id}
                                        <div className="pull-right mb-2 mr-2 badge badge-pill badge-success">{this.state.payment.item}</div>
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
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/visualiser` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/visualiser`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Visualiser reçu
                </NavLink>
            </NavItem>
        </Nav>
    );
};