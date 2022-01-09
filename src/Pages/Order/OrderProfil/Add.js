import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

const filterUser = async (inputValue) => {
    let result = [];

    await axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URI + Add.SEARCH_USER_URL + inputValue,
        headers: {
            "Authorization": "Bearer " + getToken().token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        result = (res.data.map(function(user){
            return {'value': user.id, 'label': user.email, 'name': 'user'};
        }));

    }).catch(error => {
        console.log(error)
    });

    return result;
};

const loadOptionsUser = (inputValue, callback) => {
    if (inputValue.length < 3) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterUser(inputValue));
    }, 1000);
};

export default class Add extends React.Component
{
    static POST_ORDER_URL        = '/api/order';
    static GET_USER_SUBSCRIPTION = '/api/subscription/user/';
    static GET_USER_ADDRESS      = '/api/addresses/user/';

    static SEARCH_USER_URL = '/api/user/search/';


    initialState = {
        user: null,
        subscription: null,
        address: null,
        status: null,
        price_te: null,
        price_ti: null,
        vat_rate: null,
        nb_price: null,
        price_shipment: null,
        tracking_number: null,
        pickup_code: null,
        shipment_date: null,
        delivery_date: null,
        expected_delivery_date: null,
        notes: null
    }

    constructor(props) {
        super(props);

        this.state = {
            order: this.initialState,
            subscriptionList: [],
            addressList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.handleChange(event);

        if (this.state.order.user == null) {
            return [];
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_SUBSCRIPTION + this.state.order.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.subscriptions.map(function(subscription){
                return {'value': subscription.id, 'label': subscription.formula.name + ' - ' + subscription.amount + '€ - ' + subscription.status, 'name': 'subscription'};
            }));
            this.setState({subscriptionList: result});
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

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_ADDRESS + this.state.order.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.map(function(address){
                return {'value': address.id, 'label': address.address + ', ' + address.city + ' ' + address.postcode, 'name': 'address'};
            }));
            this.setState({addressList: result});
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
    }

    handleChange(event) {
        let data = event;

        if (typeof event.target !== 'undefined') {
            data = event.target;
        }

        if (Array.isArray(event)) {
            data.value = event.map(function (obj) {
                return obj.value;
            })
            data.name = event[0].name;
        }

        const {name, value} = data;
        const order = this.state.order;


        order[name] = value;

        this.setState({order});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postOrder();
    }

    postOrder() {
        axios({
            method: 'POST',
            data: this.state.order,
            url: process.env.REACT_APP_API_URI + Add.POST_ORDER_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La commande a bien été ajouté !');
            this.props.history.push('/commandes')
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
                <Card className="main-card mb-3">
                    <CardBody>
                        <CardTitle>Nouvelle commande</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="user">Utilisateur</Label>
                                        <AsyncSelect name="user"
                                                     cacheOptions
                                                     defaultOptions
                                                     onChange={this.handleUserChange}
                                                     loadOptions={loadOptionsUser}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="subscription">Abonnement</Label>
                                        <AsyncSelect name="subscription"
                                                     cacheOptions
                                                     onChange={this.handleChange}
                                                     defaultOptions={this.state.subscriptionList}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="address">Adresse</Label>
                                        <AsyncSelect name="address"
                                                     cacheOptions
                                                     onChange={this.handleChange}
                                                     defaultOptions={this.state.addressList}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="status">Statut</Label>
                                        <Input type="select" name="status" id="status" onChange={this.handleChange}
                                               placeholder="Statut">
                                            <option value={'created'}>Crée</option>
                                            <option value={'validated'}>Validé</option>
                                            <option value={'in_preparation'}>En préparation</option>
                                            <option value={'send'}>Envoyé</option>
                                            <option value={'delivered'}>Livré</option>
                                            <option value={'cancelled'}>Annulé</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="price_te">Prix HT</Label>
                                        <Input type="number" step={'.1'} name="price_te" id="price_te" onChange={this.handleChange}
                                               placeholder="Prix HT"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="price_ti">Prix TTC</Label>
                                        <Input type="number" step={'.1'} name="price_ti" id="price_ti" onChange={this.handleChange}
                                               placeholder="Prix TTC"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="vat_rate">TVA %</Label>
                                        <Input type="number" step={'.1'} name="vat_rate" id="vat_rate" onChange={this.handleChange}
                                               placeholder="TVA %"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="nb_price">Nombre prix</Label>
                                        <Input type="number" name="nb_price" id="nb_price" onChange={this.handleChange}
                                               placeholder="Nombre prix"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="price_shipment">Prix du transport</Label>
                                        <Input type="number" step={'.1'} name="price_shipment" id="price_shipment" onChange={this.handleChange}
                                               placeholder="Prix du transport €"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="tracking_number">N° de suivi</Label>
                                        <Input type="text" name="tracking_number" id="tracking_number" onChange={this.handleChange}
                                               placeholder="N° de suivi"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="pickup_code">N° d'enlevement</Label>
                                        <Input type="text" name="pickup_code" id="pickup_code" onChange={this.handleChange}
                                               placeholder="N° d'enlevement'"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="shipment_date">Date d'enlevement</Label>
                                        <Input type="datetime-local" name="shipment_date" id="shipment_date" onChange={this.handleChange}
                                               placeholder="Date d'enlevement"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="expected_delivery_date">Date de livraison souhaité</Label>
                                        <Input type="datetime-local" name="expected_delivery_date" id="expected_delivery_date" onChange={this.handleChange}
                                               placeholder="Date de livraison souhaité"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="delivery_date">Date de livraison</Label>
                                        <Input type="datetime-local" name="delivery_date" id="delivery_date" onChange={this.handleChange}
                                               placeholder="Date de livraison"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" name="notes" id="notes" onChange={this.handleChange}
                                       placeholder="Notes"/>
                            </FormGroup>
                            <Button color="primary" type="submit" className="mt-2">Ajouter</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
