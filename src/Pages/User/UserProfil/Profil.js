import React, {Fragment} from 'react';
import axios from 'axios';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle, Nav, NavItem, NavLink,
} from 'reactstrap';

import {getToken} from "../../../Security/Security";
import { Link } from "react-router-dom";
import {toast} from "react-toastify";

export default class Profil extends React.Component
{
    static GET_USER_URL = '/api/user';

    constructor(props) {
        super(props);
        this.userId = props.match.params.userId;
        this.state = {
            user: [],
            hasMenu: true
        };
    }

    getUser() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Profil.GET_USER_URL + '/' + this.userId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({user: res.data});
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
        this.getUser();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.userId = nextProps.match.params.userId;
        this.getUser();
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
                                    <CardTitle>{this.state.user.firstname} {this.state.user.lastname} - {this.state.user.email}</CardTitle>
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
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/adresses` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/adresses`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Adresses
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/animaux` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/animaux`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Animaux
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/abonnements` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/abonnements`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Abonnements
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/commandes` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/commandes`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Commandes
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/factures` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/factures`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Factures
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/paiements` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/paiements`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Paiements
                </NavLink>
            </NavItem>
            <NavItem>
                <NavLink className={ `${props.props.location.pathname}` === `${props.props.match.url}/commentaires` ? 'active' : '' } tag={(props) => <Link {...props} />} to={`${props.props.match.url}/commentaires`}>
                    <i className="nav-link-icon pe-7s-settings"> </i>
                    Commentaires
                </NavLink>
            </NavItem>
        </Nav>
    );
};