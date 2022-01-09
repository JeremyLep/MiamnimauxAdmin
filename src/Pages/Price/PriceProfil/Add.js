import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

export default class Add extends React.Component
{
    static POST_PRICE_URL = '/api/price';
    static POST_PRICE_URL   = '/api/price';
    static GET_ITEMS        = '/api/items';

    initialPrice = {
        name: "",
        description: "",
        age_min: "",
        age_max: "",
        item: "",
        difficulty: "",
        sku: "",
        picture: "",
        is_extra: false,
    }

    initialPrice = {
        name: "",
        price_te: "",
        price_ti: "",
        vat_rate: "",
        price_vat: "",
        price: "",
        active: true
    }

    constructor(props) {
        super(props)
        this.state = {
            price: this.initialPrice,
            price: this.initialPrice,
            items: []
        };
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangePrice(event) {
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
        const price = this.state.price;


        price[name] = value;

        this.setState({price});
    }

    handleChangePrice(event) {
        const {name, value} = event.target;
        const price = this.state.price;
        price[name] = value;

        this.setState({price: price});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postPriceAndPrice();
    }

    postPriceAndPrice() {
        axios({
            method: 'POST',
            data: this.state.price,
            url: process.env.REACT_APP_API_URI + Add.POST_PRICE_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            var price = this.state.price;
            price.price = res.data.id;

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
                toast['success']('Le produit a bien été ajouté !');
                this.props.history.push('/prix')
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
            }
        });
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
                        <CardTitle>Nouveau produit</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" onChange={this.handleChangePrice}
                                               placeholder="Nom du produit"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="sku">SKU</Label>
                                        <Input type="text" name="sku" id="sku" onChange={this.handleChangePrice}
                                               placeholder="SKU"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="age_min">Age Min</Label>
                                        <Input type="number" name="age_min" step={'1'} id="age_min" onChange={this.handleChangePrice}
                                               placeholder="Age Min"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="age_max">Age Max</Label>
                                        <Input type="number" name="age_max" step={'1'} id="age_max" onChange={this.handleChangePrice}
                                               placeholder="Age Max"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="difficulty">Difficulté</Label>
                                        <Input type="number" name="difficulty" step={'1'} id="difficulty" onChange={this.handleChangePrice}
                                               placeholder="Difficulté"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="item">Item</Label>
                                        <AsyncSelect name="item"
                                                     cacheOptions
                                                     onChange={this.handleChangePrice}
                                                     defaultOptions={this.state.items}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" onChange={this.handleChangePrice}
                                       placeholder="Description"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="checkbox" id="is_extra" name="is_extra" label="Extra price" defaultChecked={this.state.price.is_extra}/>
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
