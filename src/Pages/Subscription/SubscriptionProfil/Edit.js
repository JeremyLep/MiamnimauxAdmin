import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, InputGroupAddon, InputGroup, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_SUB_URL  = '/api/subscription';
    static EDIT_SUB_URL = '/api/subscription';

    constructor(props) {
        super(props);
        this.subscriptionId = props.match.params.subscriptionId;
        this.state = {
            subscription: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const subscription = {...this.state.subscription};
            subscription[name] = value;
            return { subscription };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateSubscription();
    }

    formatData() {
        const editSubscription = this.state.subscription;

        editSubscription.user = this.state.subscription.user.id;

        delete editSubscription.id;
        delete editSubscription.user;
        delete editSubscription.pet;
        delete editSubscription.cart;
        delete editSubscription.plats;
        delete editSubscription.price;
        delete editSubscription.stripe_subscription_id;
        delete editSubscription.created_date;

        return editSubscription;
    }

    updateSubscription() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_SUB_URL + '/' + this.subscriptionId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({subscription: res.data})
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

    getSubscription() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_SUB_URL + '/' + this.subscriptionId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({subscription: res.data})
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

    componentDidMount(){
        this.getSubscription()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.subscriptionId = nextProps.match.params.subscriptionId;
        this.getSubscription();
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
                        <CardTitle>Edition abonnement {this.state.subscription.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <Label for="amount">Montant</Label>
                                    <InputGroup>
                                        <Input type="number" name="amount" step={'.1'} id="amount" value={this.state.subscription.amount || ''} onChange={this.handleChange}
                                               placeholder="Montant en €"/>
                                        <InputGroupAddon addonType="append">€</InputGroupAddon>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="status">Status</Label>
                                        <Input type="select" name="status" id="status" value={this.state.subscription.status || ''} onChange={this.handleChange}
                                               placeholder="Status">
                                            <option value={'created'}>Crée</option>
                                            <option value={'pending'}>En attente</option>
                                            <option value={'running'}>En cours</option>
                                            <option value={'paused'}>En pause</option>
                                            <option value={'cancelled'}>Annulé</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="resume_pause_at">Date de reprise abonnement (si en pause)</Label>
                                        <Input type="datetime" name="resume_pause_at" id="resume_pause_at" value={this.state.subscription.resume_pause_at || ''} onChange={this.handleChange}
                                               placeholder="Date de reprise d'abonnement"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" className="mt-2">Mettre à jour</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
