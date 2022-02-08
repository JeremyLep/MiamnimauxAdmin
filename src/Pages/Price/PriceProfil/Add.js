import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

export default class Add extends React.Component
{
    static POST_PRICE_URL   = '/api/price';
    static GET_SPECIES      = '/api/species';
    static GET_FORMULAS     = '/api/formulas';
    static GET_DISHES       = '/api/plats';

    initialPrice = {
        name: "",
        price: "",
        animal_type: "",
        kg_min: "",
        kg_max: "",
        grams: "",
        kcal: "",
        activity: "",
        dish: "",
        formula: "",
        neutered: false,
        active: true
    }

    constructor(props) {
        super(props)
        this.state = {
            price: this.initialPrice,
            species: [],
            formulas: [],
            dishes: []
        };
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

    handleSubmit(event) {
        event.preventDefault();
        this.postPrice();
    }

    postPrice() {
        console.log(this.state.price);
        axios({
            method: 'POST',
            data: this.state.price,
            url: process.env.REACT_APP_API_URI + Add.POST_PRICE_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('Le prix a bien été ajouté !');
            this.props.history.push('/prix');
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

    loadSpecies() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_SPECIES,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let species = res.data.species.map(function(specie){
                return {'value': specie.id, 'label': specie.name, 'name': 'animal_type'};
            });

            this.setState({
                species: species
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

    loadFormulas() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_FORMULAS,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let formulas = res.data.formulas.map(function(formula){
                return {'value': formula.id, 'label': formula.name, 'name': 'formula'};
            });

            this.setState({
                formulas: formulas
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

    loadDishes() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_DISHES,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let dishes = res.data.plats.map(function(dish){
                return {'value': dish.id, 'label': dish.name, 'name': 'dish'};
            });

            this.setState({
                dishes: dishes
            });
        }).catch(error => {
            console.log(error);
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
        this.loadSpecies();
        this.loadFormulas();
        this.loadDishes();
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
                        <CardTitle>Nouveau {this.state.price.name}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" onChange={this.handleChangePrice}
                                               placeholder="Nom du prix"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Prix</Label>
                                        <Input type="number" step={0.01} name="price" id="price" onChange={this.handleChangePrice}
                                               placeholder="Prix"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kg_min">Kg Min</Label>
                                        <Input type="number" name="kg_min" step={'0.1'} id="kg_min" onChange={this.handleChangePrice}
                                               placeholder="Age Min"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kg_max">Kg Max</Label>
                                        <Input type="number" name="kg_max" step={'0.1'} id="age_max" onChange={this.handleChangePrice}
                                               placeholder="Age Max"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="grams">Grammes</Label>
                                        <Input type="number" name="grams" step={'.1'} id="grams" onChange={this.handleChangePrice}
                                               placeholder="Grammes"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kcal">Kcal</Label>
                                        <Input type="number" name="kcal" step={'.1'} id="kcal" onChange={this.handleChangePrice}
                                               placeholder="Kcal"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="activity">Activité</Label>
                                        <Input type="select" name="activity" id="activity" onChange={this.handleChangePrice}
                                               placeholder="Activité">
                                            <option value={1}>Peu actif</option>
                                            <option value={2}>Actif</option>
                                            <option value={3}>Très actif</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="dish">Repas ID</Label>
                                        <AsyncSelect name="dish"
                                                     cacheOptions
                                                     onChange={this.handleChangePrice}
                                                     defaultOptions={this.state.dishes}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="animal_type">Espèce</Label>
                                        <AsyncSelect name="animal_type"
                                                     cacheOptions
                                                     onChange={this.handleChangePrice}
                                                     defaultOptions={this.state.species}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="formula">Formule</Label>
                                        <AsyncSelect name="formula"
                                                     cacheOptions
                                                     onChange={this.handleChangePrice}
                                                     defaultOptions={this.state.formulas}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <CustomInput type="checkbox" id="active" name="active" label="Actif" defaultChecked={this.state.price.active} inline onChange={this.handleChangePrice}/>
                                <CustomInput type="checkbox" id="neutered" name="neutered" label="Stérilisé" defaultChecked={this.state.price.neutered} inline  onChange={this.handleChangePrice}/>
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
