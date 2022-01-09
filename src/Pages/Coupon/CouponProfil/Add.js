import React, {Fragment} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    CustomInput,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row
} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Add extends React.Component
{
    static POST_COUPON_URL = '/api/coupon';

    initialState = {
        name: null,
        code: null,
        duration: null,
        duration_month: null,
        discount: null,
        expired_date: null,
        max_redeem: null,
        redeem_nb: null,
        description: null,
        valid: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            coupon: this.initialState
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const coupon = this.state.coupon;
        coupon[name] = value;

        this.setState(coupon);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postCoupon();
    }

    postCoupon() {
        axios({
            method: 'POST',
            data: this.state.coupon,
            url: process.env.REACT_APP_API_URI + Add.POST_COUPON_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('Le coupon a bien été ajouté !');
            this.props.history.push('/coupons');
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
                        <CardTitle>Nouveau coupon</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <Label for="name">Nom</Label>
                                    <InputGroup>
                                        <Input type="text" name="name" id="name" onChange={this.handleChange}
                                               placeholder="Nom"/>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="code">Code</Label>
                                        <Input type="text" name="code" id="code" onChange={this.handleChange}
                                               placeholder="Code"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="duration">Répétition</Label>
                                        <Input type="select" name="duration" id="duration" onChange={this.handleChange}
                                               placeholder="Durée">
                                            <option value={'once'}>Répéter 1 seul fois</option>
                                            <option value={'repeating'}>Répéter x fois (compléter champ "répétition en mois")</option>
                                            <option value={'forever'}>Répéter pour toujours</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="duration_month">Répétition en mois</Label>
                                        <Input type="number" name="duration_month" id="duration_month" onChange={this.handleChange}
                                               placeholder="Répétition en mois"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="discount">Discount prix (€)</Label>
                                        <Input type="text" name="discount" id="discount" onChange={this.handleChange}
                                               placeholder="Discount prix (€)"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="percent">Discount pourcent (%)</Label>
                                        <Input type="number" name="percent" id="percent" onChange={this.handleChange}
                                               placeholder="Discount pourcent (%)"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="expired_date">Date d'expiration</Label>
                                        <Input type="date" name="expired_date" id="expired_date" onChange={this.handleChange}
                                               placeholder="Date d'expiration"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="max_redeem">Utilisation maximum</Label>
                                        <Input type="number" name="max_redeem" id="max_redeem" onChange={this.handleChange}
                                               placeholder="Utilisation maximum"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="redeem_nb">Nombre d'utilisation</Label>
                                        <Input type="number" name="redeem_nb" id="redeem_nb" onChange={this.handleChange}
                                               placeholder="Nom d'utilisation"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" onChange={this.handleChange}
                                               placeholder="Description"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <CustomInput type="checkbox" id="valid" name="valid" label="Valide"/>
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
