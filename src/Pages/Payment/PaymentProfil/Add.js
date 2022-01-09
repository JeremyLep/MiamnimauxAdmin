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

const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterUser(inputValue));
    }, 1000);
};

export default class Add extends React.Component
{
    static POST_PAYMENT_URL = '/api/payment';
    static SEARCH_USER_URL = '/api/user/search/';
    static GET_USER_INVOICE = '/api/invoice/user/';

    initialState = {
        amount: null,
        user: null,
        invoice: null
    }

    constructor(props) {
        super(props)
        this.state = {
            payment: this.initialState,
            invoiceList: []
        };
        this.handleChange     = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.handleChange(event);

        if (this.state.payment.user == null) {
            return [];
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_INVOICE + this.state.payment.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.invoices.map(function(invoice){
                return {'value': invoice.id, 'label': invoice.created_date + ' - (' + invoice.price_ti + '€)', 'name': 'invoice'};
            }));
            this.setState({invoiceList: result});
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

        const {name, value} = data;
        const payment = this.state.payment;
        payment[name] = value;

        this.setState({payment});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postPayment();
    }

    postPayment() {
        axios({
            method: 'POST',
            data: this.state.payment,
            url: process.env.REACT_APP_API_URI + Add.POST_PAYMENT_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('Le paiement a bien été ajouté !');
            this.props.history.push('/paiements')
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
                            <CardTitle>Nouveau paiement</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="amount">Montant</Label>
                                            <Input type="number" name="amount" id="amount" onChange={this.handleChange}
                                                   placeholder="Montant"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="user">Utilisateur</Label>
                                            <AsyncSelect name="user"
                                                         cacheOptions
                                                         defaultOptions
                                                         onChange={this.handleUserChange}
                                                         loadOptions={loadOptions}
                                                         className="basic-multi-select"
                                                         classNamePrefix="select">
                                            </AsyncSelect>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="user">Facture</Label>
                                            <AsyncSelect name="invoice"
                                                         cacheOptions
                                                         defaultOptions={this.state.invoiceList}
                                                         className="basic-multi-select"
                                                         classNamePrefix="select">
                                            </AsyncSelect>
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
