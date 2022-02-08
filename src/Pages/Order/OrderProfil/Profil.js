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
    static GET_ORDER_URL = '/api/order';

    constructor(props) {
        super(props);
        this.orderId = props.match.params.orderId;
        this.state = {
            order: [],
            hasMenu: true
        };
    }

    getOrder() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Profil.GET_ORDER_URL + '/' + this.orderId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({order: res.data});
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
        this.getOrder();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.orderId = nextProps.match.params.orderId;
        this.getOrder();
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
                                        Commande N°{this.state.order.id}
                                        <div className="pull-right mb-2 mr-2 badge badge-pill badge-success">{this.state.order.item}</div>
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
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/recettes` ? 'active' : '' }  tag={(props) => <Link {...props} />} to={`${props.props.match.url}/recettes`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Recettes
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/commentaire` ? 'active' : '' }  tag={(props) => <Link {...props} />} to={`${props.props.match.url}/commentaire`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Commentaires
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/adresse-livraison` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/adresse-livraison`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Adresse de livraison
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/etiquette` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/etiquette`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Etiquettes
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/bordereau` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/bordereau`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Bordereau
                </NavLink>
            </NavItem>
        </Nav>
    );
};