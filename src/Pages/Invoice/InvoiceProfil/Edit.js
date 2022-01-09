import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_INVOICE_URL  = '/api/invoice';
    static EDIT_INVOICE_URL = '/api/invoice';

    constructor(props) {
        super(props);
        this.invoiceId = props.match.params.invoiceId;
        this.state = {
            invoice: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const invoice = {...this.state.invoice};
            invoice[name] = value;
            return { invoice };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateInvoice();
    }

    formatData() {
        const editinvoice = this.state.invoice;

        delete editinvoice.id;
        delete editinvoice.credit_note;
        delete editinvoice.order;
        delete editinvoice.payment;
        delete editinvoice.stripe_invoice_id;
        delete editinvoice.stripe_invoice_url;
        delete editinvoice.promo_code;
        delete editinvoice.user;
        delete editinvoice.address;
        delete editinvoice.created_date;

        return editinvoice;
    }

    updateInvoice() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_INVOICE_URL + '/' + this.invoiceId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({invoice: res.data})
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

    getInvoice() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_INVOICE_URL + '/' + this.invoiceId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({invoice: res.data})
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
        this.getInvoice()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.invoiceId = nextProps.match.params.invoiceId;
        this.getInvoice();
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
                        <CardTitle>Edition facture N°{this.state.invoice.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="amount">Montant</Label>
                                        <Input type="number" step={'.1'} name="amount" id="amount" value={this.state.invoice.amount || ''} onChange={this.handleChange}
                                               placeholder="Montant"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="status">Statut</Label>
                                        <Input type="select" name="status" id="status" value={this.state.invoice.status || ''} onChange={this.handleChange}
                                               placeholder="Statut">
                                            <option value={'draft'}>Brouillon</option>
                                            <option value={'pending'}>En attente</option>
                                            <option value={'paid'}>Payé</option>
                                        </Input>
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
