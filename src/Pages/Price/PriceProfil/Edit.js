import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_PRICE_URL  = '/api/price';
    static EDIT_PRICE_URL = '/api/price';

    constructor(props) {
        super(props);
        this.priceId = props.match.params.priceId;
        this.state = {
            price: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        const {name, value, label} = data;
        const price = this.state.price;

        price[name] = data.type === 'checkbox' ? data.checked : value;

        this.setState({price});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updatePrice();
    }

    formatData() {
        const editPrice = this.state.price;

        delete editPrice.id;
        delete editPrice.stripe_price_id;
        delete editPrice.stripe_product_id;
        delete editPrice.price;
        delete editPrice.disease;
        delete editPrice.formula;
        delete editPrice.animal_type;
        delete editPrice.created_date;
        delete editPrice.dish;

        return editPrice;
    }

    updatePrice() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_PRICE_URL + '/' + this.priceId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({price: res.data})
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

    getPrice() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_PRICE_URL + '/' + this.priceId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let data = res.data;

            this.setState({price: data});
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

    componentDidMount(){
        this.getPrice();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.priceId = nextProps.match.params.priceId;
        this.getPrice();
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
                        <CardTitle>Edition {this.state.price.name}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.price.name || ''} onChange={this.handleChange}
                                               placeholder="Nom du prix"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kg_min">Kg Min</Label>
                                        <Input type="number" name="kg_min" step={'0.1'} id="kg_min" value={this.state.price.kg_min || ''} onChange={this.handleChange}
                                               placeholder="Age Min"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kg_max">Kg Max</Label>
                                        <Input type="number" name="kg_max" step={'0.1'} id="age_max" value={this.state.price.kg_max || ''} onChange={this.handleChange}
                                               placeholder="Age Max"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="grams">Grammes</Label>
                                        <Input type="number" name="grams" step={'.1'} id="grams" value={this.state.price.grams || ''} onChange={this.handleChange}
                                               placeholder="Grammes"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="kcal">Kcal</Label>
                                        <Input type="number" name="kcal" step={'.1'} id="kcal" value={this.state.price.kcal || ''} onChange={this.handleChange}
                                               placeholder="Kcal"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="activity">Activité</Label>
                                        <Input type="select" name="activity" id="activity" value={this.state.price.activity || ''} onChange={this.handleChange}
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
                                        <Input type="text" name="dish" id="dish" value={this.state.price.dish || ''} onChange={this.handleChange}
                                               placeholder="Repas ID"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <CustomInput type="checkbox" id="active" name="active" label="Actif" defaultChecked={this.state.price.active} inline onChange={this.handleChange}/>
                                <CustomInput type="checkbox" id="neutered" name="neutered" label="Stérilisé" defaultChecked={this.state.price.neutered} inline  onChange={this.handleChange}/>
                            </FormGroup>
                            <Button color="primary" type="submit" className="mt-2">Mettre à jour</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
