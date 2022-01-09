import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

export default class Add extends React.Component
{
    static POST_PRICE_URL = '/api/formula';
    static POST_PRICE_URL   = '/api/price';
    static GET_ITEMS        = '/api/items';

    initialFormula = {
        name: "",
        item: "",
        nb_price: "",
        nb_pet: "",
        recurring_interval: "",
        description: "",
        has_disease: false,
    }

    initialPrice = {
        name: "",
        price_te: "",
        price_ti: "",
        vat_rate: "",
        price_vat: "",
        formula: "",
        active: true
    }

    constructor(props) {
        super(props)
        this.state = {
            formula: this.initialFormula,
            price: this.initialPrice,
            items: []
        };
        this.handleChangeFormula = this.handleChangeFormula.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeFormula(event) {
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
        const formula = this.state.formula;


        formula[name] = value;

        this.setState({formula});
    }

    handleChangePrice(event) {
        const {name, value} = event.target;
        const price = this.state.price;
        price[name] = value;

        this.setState({price: price});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postFormulaAndPrice();
    }

    postFormulaAndPrice() {
        axios({
            method: 'POST',
            data: this.state.formula,
            url: process.env.REACT_APP_API_URI + Add.POST_PRICE_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            var price = this.state.price;
            price.formula = res.data.id;

            this.setState({price: price});
            axios({
                method: 'POST',
                data: this.state.price,
                url: process.env.REACT_APP_API_URI + Add.POST_PRICE_URL,
                headers: {
                    "Authorization": "Bearer " + getToken().token,
                    "Content-Type": "application/json",
                }
            }).then(res => {
                toast['success']('La formule a bien été ajouté !');
                this.props.history.push('/formules')
            }).catch(error => {
                console.log(error.response.data);
                if (error.response) {
                    toast['error']("Une erreur s\'est produite: <br/>" + error.response.data.errors.errors.join(' | '));
                } else if (error.request) {
                    toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
                } else {
                    toast['error']('Une erreur s\'est produite');
                }
            });
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']("Une erreur s\'est produite: <br/>" + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    loadItems() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_ITEMS,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let items = res.data.items.map(function(item){
                return {'value': item.id, 'label': item.name, 'name': 'item'};
            });

            items.push({'value': '', 'label': 'Aucun', 'name': 'item'});

            this.setState({
                items: items
            });
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

    componentDidMount() {
        this.loadItems();
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
                            <CardTitle>Nouvelle formule</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">Nom</Label>
                                            <Input type="text" name="name" id="name" onChange={this.handleChangeFormula}
                                                   placeholder="Nom de la formule"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="item">Item</Label>
                                            <AsyncSelect name="item"
                                                         cacheOptions
                                                         onChange={this.handleChangeFormula}
                                                         defaultOptions={this.state.items}
                                                         className="basic-multi-select"
                                                         classNamePrefix="select">
                                            </AsyncSelect>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="nb_price">Nombre de prix</Label>
                                            <Input type="number" name="nb_price" step={'1'} id="nb_price" onChange={this.handleChangeFormula}
                                                   placeholder="Nombre de prix"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="item">Nombre d'animal</Label>
                                            <Input type="number" name="nb_pet" id="nb_pet" onChange={this.handleChangeFormula}
                                                   placeholder="Nombre d'animal"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="item">Interval de recurrence</Label>
                                            <Input type="select" name="recurring_interval" id="recurring_interval" onChange={this.handleChangeFormula}
                                                   placeholder="Interval de recurrence">
                                                <option value={'1'}>1 mois</option>
                                                <option value={'3'}>3 mois</option>
                                                <option value={'6'}>6 mois</option>
                                                <option value={'12'}>1 an</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="description" onChange={this.handleChangeFormula}
                                           placeholder="Description"/>
                                </FormGroup>
                                <FormGroup>
                                    <CustomInput type="checkbox" id="has_disease" name="has_disease" label="Formule pour maladie" onChange={this.handleChangeFormula} defaultChecked={this.state.formula.has_disease}/>
                                </FormGroup>
                            </Form>
                        </CardBody>
                    </Card>
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Prix</CardTitle>
                            <Form onSubmit={this.handleSubmit}>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="name">Nom</Label>
                                            <Input type="text" name="name" id="name" onChange={this.handleChangePrice}
                                                   placeholder="Nom prix"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="price_te">Prix HT</Label>
                                            <Input type="number" name="price_te" step={'.1'} id="price_te" onChange={this.handleChangePrice}
                                                   placeholder="Prix HT"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="price_ti">Prix TTC</Label>
                                            <Input type="number" name="price_ti" step={'.1'} id="price_ti" onChange={this.handleChangePrice}
                                                   placeholder="Price TTC"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row form>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="vat_rate">Taux TVA (%)</Label>
                                            <Input type="number" name="vat_rate" step={'.1'} id="vat_rate" onChange={this.handleChangePrice}
                                                   placeholder="Taux TVA (%)"/>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <Label for="price_vat">Prix TVA</Label>
                                            <Input type="text" name="price_vat" id="price_vat" onChange={this.handleChangePrice}
                                                   placeholder="Prix TVA"/>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <CustomInput type="checkbox" id="active" name="active" label="Actif" defaultChecked={this.state.price.active}/>
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
