import React, {Fragment} from 'react';
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    InputGroup,
    Label,
    Row,
    CustomInput
} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_COUPON_URL  = '/api/coupon';
    static EDIT_COUPON_URL = '/api/coupon';

    constructor(props) {
        super(props);
        this.couponId = props.match.params.couponId;
        this.state = {
            coupon: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const coupon = {...this.state.coupon};
            coupon[name] = value;
            return { coupon };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateCoupon();
    }

    formatData() {
        const editCoupon = this.state.coupon;

        console.log(editCoupon);
        editCoupon.expired_date = (new Date(editCoupon.expired_date)).toLocaleDateString('fr-CA');
        delete editCoupon.id;
        delete editCoupon.stripe_coupon;
        delete editCoupon.created_date;

        console.log(editCoupon);
        return editCoupon;
    }

    updateCoupon() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_COUPON_URL + '/' + this.couponId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({coupon: res.data})
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

    getCoupon() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_COUPON_URL + '/' + this.couponId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({coupon: res.data})
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
        this.getCoupon()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.couponId = nextProps.match.params.couponId;
        this.getCoupon();
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
                        <CardTitle>Edition coupon {this.state.coupon.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <Label for="name">Nom</Label>
                                    <InputGroup>
                                        <Input type="text" name="name" id="name" value={this.state.coupon.name || ''} onChange={this.handleChange}
                                               placeholder="Nom"/>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="code">Code</Label>
                                        <Input type="text" name="code" id="code" value={this.state.coupon.code || ''} onChange={this.handleChange}
                                               placeholder="Code"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="duration">Répétition</Label>
                                        <Input type="select" name="duration" id="duration" value={this.state.coupon.duration || ''} onChange={this.handleChange}
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
                                        <Input type="number" name="duration_month" id="duration_month" value={this.state.coupon.duration_month || ''} onChange={this.handleChange}
                                               placeholder="Répétition en mois"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="discount">Discount prix (€)</Label>
                                        <Input type="text" name="discount" id="discount" value={this.state.coupon.discount || ''} onChange={this.handleChange}
                                               placeholder="Discount prix (€)"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="percent">Discount pourcent (%)</Label>
                                        <Input type="number" name="percent" id="percent" value={this.state.coupon.percent || ''} onChange={this.handleChange}
                                               placeholder="Discount pourcent (%)"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="expired_date">Date d'expiration</Label>
                                        <Input type="date" name="expired_date" id="expired_date" value={this.state.coupon.expired_date ? (new Date(this.state.coupon.expired_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date d'expiration"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="max_redeem">Utilisation maximum</Label>
                                        <Input type="number" name="max_redeem" id="max_redeem" value={this.state.coupon.max_redeem || ''} onChange={this.handleChange}
                                               placeholder="Utilisation maximum"/>
                                    </FormGroup>
                                </Col>
                                <Col md={4}>
                                    <FormGroup>
                                        <Label for="redeem_nb">Nombre d'utilisation</Label>
                                        <Input type="number" name="redeem_nb" id="redeem_nb" value={this.state.coupon.redeem_nb || ''} onChange={this.handleChange}
                                               placeholder="Nom d'utilisation"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" value={this.state.coupon.description || ''} onChange={this.handleChange}
                                               placeholder="Description"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <CustomInput type="checkbox" id="valid" name="valid" label="Valide" defaultChecked={this.state.coupon.valid}/>
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
