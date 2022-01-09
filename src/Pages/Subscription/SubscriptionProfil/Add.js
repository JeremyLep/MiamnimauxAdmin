import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
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
    static POST_SUBSCRIPTION_URL = '/api/subscription';
    static GET_USER_PETS = '/api/pet/user/';

    static SEARCH_USER_URL = '/api/user/search/';
    static SEARCH_FORMULA_URL = '/api/formulas';

    initialState = {
        amount: 0,
        pet: [],
        formula: null,
        user: null
    }

    constructor(props) {
        super(props)
        this.state = {
            subscription: this.initialState,
            petsList: [],
            formulaList: []
        };
        this.handleChange     = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleFormulaChange = this.handleFormulaChange.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.handleChange(event);

        if (this.state.subscription.user == null) {
            return [];
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_PETS + this.state.subscription.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.pets.map(function(pet){
                return {'value': pet.id, 'label': pet.name + ' - ' + pet.age + 'ans', 'name': 'pet'};
            }));
            this.setState({petsList: result});
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
    }

    getFormulas() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.SEARCH_FORMULA_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.formulas.map(function(formula){
                return {'value': formula.id, 'label': formula.name + ' - (' + formula.price.price_ti + '€)', 'name': 'formula', 'price': formula.price.price_ti};
            }));
            this.setState({formulaList: result});
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
    };

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
        const subscription = this.state.subscription;


        subscription[name] = value;

        this.setState({subscription});
    }

    handleFormulaChange(event) {
        var subscription = this.state.subscription;

        subscription.amount = event.price;
        subscription.formula = event.value;

        this.setState({subscription});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postSubscription();
    }

    postSubscription() {
        axios({
            method: 'POST',
            data: this.state.subscription,
            url: process.env.REACT_APP_API_URI + Add.POST_SUBSCRIPTION_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('L\'abonnement a bien été ajouté !');
            this.props.history.push('/abonnements')
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
    }

    componentDidMount(){
        this.getFormulas();
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
                            <CardTitle>Nouvel abonnement</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="Utilisateur">Utilisateur</Label>
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
                                            <Label for="pet">animaux</Label>
                                            <AsyncSelect name="pet"
                                                         isMulti
                                                         cacheOptions
                                                         onChange={this.handleChange}
                                                         defaultOptions={this.state.petsList}
                                                         className="basic-multi-select"
                                                         classNamePrefix="select">
                                            </AsyncSelect>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="formula">Formule</Label>
                                            <AsyncSelect name="formula"
                                                         cacheOptions
                                                         onChange={this.handleFormulaChange}
                                                         defaultOptions={this.state.formulaList}
                                                         className="basic-multi-select"
                                                         classNamePrefix="select">
                                            </AsyncSelect>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="amount">Montant</Label>
                                            <Input type="number" name="amount" readOnly id="amount" value={this.state.subscription.amount}
                                                    placeholder="Montant"/>
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
