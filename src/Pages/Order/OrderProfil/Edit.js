import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_ORDER_URL  = '/api/order';
    static EDIT_ORDER_URL = '/api/order';

    constructor(props) {
        super(props);
        this.orderId = props.match.params.orderId;
        this.state = {
            order: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const order = {...this.state.order};
            order[name] = value;
            return { order };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateOrder();
    }

    formatData() {
        const editOrder = this.state.order;

        delete editOrder.id;
        delete editOrder.disease;
        delete editOrder.user;
        delete editOrder.subscription;
        delete editOrder.invoice;
        delete editOrder.pet;
        delete editOrder.plats;
        delete editOrder.pet;
        delete editOrder.waybill;
        delete editOrder.comment;
        delete editOrder.address;
        delete editOrder.price_vat;
        delete editOrder.created_date;

        if (editOrder.shipment_date === null) {
            delete editOrder.shipment_date;
        } else {
            editOrder.shipment_date = editOrder.shipment_date.slice(0, 10);
        }

        if (editOrder.delivery_date === null) {
            delete editOrder.delivery_date;
        } else {
            editOrder.delivery_date = editOrder.delivery_date.slice(0, 10);
        }

        if (editOrder.expected_delivery_date === null) {
            delete editOrder.expected_delivery_date;
        } else {
            editOrder.expected_delivery_date = editOrder.expected_delivery_date.slice(0, 10);
        }

        return editOrder;
    }

    updateOrder() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_ORDER_URL + '/' + this.orderId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({order: res.data})
        }).catch(error => {
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    getOrder() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_ORDER_URL + '/' + this.orderId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({order: res.data})
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
        this.getOrder()
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
                <Card className="main-card mb-3">
                    <CardBody>
                        <CardTitle>Edition commande N°{this.state.order.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="status">Statut</Label>
                                        <Input type="select" name="status" id="status" value={this.state.order.status} onChange={this.handleChange}
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
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="price">Prix</Label>
                                        <Input type="number" step={'.1'} name="price" id="price" value={this.state.order.price || ''} onChange={this.handleChange}
                                               placeholder="Prix"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="nb_dishes">Nb plats</Label>
                                        <Input type="number" step={'1'} name="nb_dishes" id="nb_dishes" value={this.state.order.nb_dishes || ''} onChange={this.handleChange}
                                               placeholder="Nb plats"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="grams">Grammes</Label>
                                        <Input type="number" step={'.1'} name="grams" id="grams" value={this.state.order.grams || ''} onChange={this.handleChange}
                                               placeholder="Grammes"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="tracking_number">N° de suivi</Label>
                                        <Input type="text" name="tracking_number" id="tracking_number" value={this.state.order.tracking_number || ''} onChange={this.handleChange}
                                               placeholder="N° de suivi"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="pickup_code">N° d'enlevement</Label>
                                        <Input type="text" name="pickup_code" id="pickup_code" value={this.state.order.pickup_code || ''} onChange={this.handleChange}
                                               placeholder="N° d'enlevement'"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="price_shipment">Prix transport</Label>
                                        <Input type="number" step={'.1'} name="price_shipment" id="price_shipment" value={this.state.order.price_shipment || ''} onChange={this.handleChange}
                                               placeholder="Prix transport"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="shipment_date">Date d'enlevement</Label>
                                        <Input type="date" name="shipment_date" id="shipment_date" value={this.state.order.shipment_date ? (new Date(this.state.order.shipment_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date d'enlevement"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="expected_delivery_date">Date de livraison souhaité</Label>
                                        <Input type="date" name="expected_delivery_date" id="expected_delivery_date" value={this.state.order.expected_delivery_date ? (new Date(this.state.order.expected_delivery_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date de livraison souhaité"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="delivery_date">Date de livraison</Label>
                                        <Input type="date" name="delivery_date" id="delivery_date" value={this.state.order.delivery_date ? (new Date(this.state.order.delivery_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date de livraison"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" name="notes" id="notes" value={this.state.order.notes || ''} onChange={this.handleChange}
                                       placeholder="Notes"/>
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
