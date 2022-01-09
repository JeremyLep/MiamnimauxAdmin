import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_PAYMENT_URL  = '/api/payment';
    static EDIT_PAYMENT_URL = '/api/payment';

    constructor(props) {
        super(props);
        this.paymentId = props.match.params.paymentId;
        this.state = {
            payment: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const payment = {...this.state.payment};
            payment[name] = value;
            return { payment };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updatePayment();
    }

    formatData() {
        const editpayment = this.state.payment;

        delete editpayment.id;
        delete editpayment.invoice;
        delete editpayment.user;
        delete editpayment.stripe_payment_id;
        delete editpayment.stripe_receipt_url;
        delete editpayment.created_date;

        return editpayment;
    }

    updatePayment() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_PAYMENT_URL + '/' + this.paymentId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({payment: res.data})
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

    getPayment() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_PAYMENT_URL + '/' + this.paymentId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({payment: res.data})
        }).catch(error => {
            toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.join(' | '));
        });
    };

    componentDidMount(){
        this.getPayment()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.paymentId = nextProps.match.params.paymentId;
        this.getPayment();
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
                        <CardTitle>Edition paiement N°{this.state.payment.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label for="amount">Montant</Label>
                                        <Input type="number" name="amount" id="amount" value={this.state.payment.amount || ''} onChange={this.handleChange}
                                               placeholder="Montant"/>
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
