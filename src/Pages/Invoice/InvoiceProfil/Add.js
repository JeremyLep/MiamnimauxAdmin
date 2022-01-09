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
    static POST_INVOICE_URL = '/api/invoice';
    static GET_USER_INVOICE = '/api/invoice/user/';
    static GET_USER_ADDRESS = '/api/addresses/user/';
    static GET_USER_ORDER   = '/api/order/user/';
    static GET_USER_PAYMENT = '/api/payment/user/';

    static SEARCH_USER_URL = '/api/user/search/';

    initialState = {
        user: null,
        credit_note: null,
        address: null,
        order: null,
        payment: null,
        price_te: null,
        price_ti: null,
        vat_rate: null,
        status: null
    }

    constructor(props) {
        super(props)
        this.state = {
            invoice: this.initialState,
            invoiceList: [],
            addressList: [],
            paymentList: [],
            orderList: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(event) {
        this.handleChange(event);

        if (this.state.invoice.user == null) {
            return [];
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_INVOICE + this.state.invoice.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.invoices.map(function(invoice){
                if (invoice.price_ti < 0) {
                    return '';
                }
                return {'value': invoice.id, 'label': invoice.created_date + ' - ' + invoice.price_ti + '€', 'name': 'invoice'};
            }));
            this.setState({creditNoteList: result});
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
            url: process.env.REACT_APP_API_URI + Add.GET_USER_ADDRESS + this.state.invoice.user,
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

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_ORDER + this.state.invoice.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.orders.map(function(order){
                return {'value': order.id, 'label': order.created_date + ' - ' + order.price_ti + '€', 'name': 'order'};
            }));
            this.setState({orderList: result});
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
            url: process.env.REACT_APP_API_URI + Add.GET_USER_PAYMENT + this.state.invoice.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.payments.map(function(payment){
                return {'value': payment.id, 'label': payment.stripe_payment_id + ' - ' + payment.amount + '€', 'name': 'payment'};
            }));
            this.setState({paymentList: result});
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
        const invoice = this.state.invoice;

        invoice[name] = value;

        this.setState({invoice});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postInvoice();
    }

    postInvoice() {
        axios({
            method: 'POST',
            data: this.state.invoice,
            url: process.env.REACT_APP_API_URI + Add.POST_INVOICE_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La facture a bien été ajouté !');
            this.props.history.push('/factures')
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
                        <CardTitle>Nouvelle facture</CardTitle>
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
                                        <Label for="credit_note">Facture</Label>
                                        <AsyncSelect name="credit_note"
                                                     cacheOptions
                                                     onChange={this.handleChange}
                                                     defaultOptions={this.state.creditNoteList}
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
                                        <Label for="order">Commande</Label>
                                        <AsyncSelect name="order"
                                                     cacheOptions
                                                     onChange={this.handleChange}
                                                     defaultOptions={this.state.orderList}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="payment">Paiement</Label>
                                        <AsyncSelect name="payment"
                                                     cacheOptions
                                                     onChange={this.handleChange}
                                                     defaultOptions={this.state.paymentList}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="price_te">Prix HT</Label>
                                        <Input type="number" step={'.1'} name="price_te" id="price_te" onChange={this.handleChange}
                                               placeholder="Prix HT"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="price_ti">Prix TTC</Label>
                                        <Input type="number" step={'.1'} name="price_ti" id="price_ti" onChange={this.handleChange}
                                               placeholder="Prix TTC"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="vat_rate">TVA %</Label>
                                        <Input type="number" step={'.1'} name="vat_rate" id="vat_rate" onChange={this.handleChange}
                                               placeholder="TVA %"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="status">Statut</Label>
                                        <Input type="select" name="status" id="status" onChange={this.handleChange}
                                               placeholder="Statut">
                                            <option value={'draft'}>Brouillon</option>
                                            <option value={'pending'}>En attente</option>
                                            <option value={'paid'}>Payé</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" className="mt-2">Ajouter</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
