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
    static GET_PROMOCODE_URL  = '/api/promo-code';
    static EDIT_PROMOCODE_URL = '/api/promo-code';

    constructor(props) {
        super(props);
        this.promoCodeId = props.match.params.promoCodeId;
        this.state = {
            promoCode: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const promoCode = {...this.state.promoCode};
            promoCode[name] = value;
            return { promoCode };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updatePromoCode();
    }

    formatData() {
        const editPromoCode = this.state.promoCode;

        editPromoCode.expired_date = (new Date(editPromoCode.expired_date)).toLocaleDateString('fr-CA');
        editPromoCode.used_date = (new Date(editPromoCode.used_date)).toLocaleDateString('fr-CA');

        delete editPromoCode.id;
        delete editPromoCode.stripe_promo_code;
        delete editPromoCode.coupon;
        delete editPromoCode.user;
        delete editPromoCode.created_date;

        return editPromoCode;
    }

    updatePromoCode() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_PROMOCODE_URL + '/' + this.promoCodeId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({promoCode: res.data})
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

    getPromoCode() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_PROMOCODE_URL + '/' + this.promoCodeId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({promoCode: res.data})
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
        this.getPromoCode()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.promoCodeId = nextProps.match.params.promoCodeId;
        this.getPromoCode();
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
                        <CardTitle>Edition code promotionnel {this.state.promoCode.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <Label for="name">Nom</Label>
                                    <InputGroup>
                                        <Input type="text" name="name" id="name" value={this.state.promoCode.name || ''} onChange={this.handleChange}
                                               placeholder="Nom"/>
                                    </InputGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="code">Code</Label>
                                        <Input type="text" name="code" id="code" value={this.state.promoCode.code || ''} onChange={this.handleChange}
                                               placeholder="Code"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="expired_date">Date d'expiration</Label>
                                        <Input type="date" name="expired_date" id="expired_date" value={this.state.promoCode.expired_date ? (new Date(this.state.promoCode.expired_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date d'expiration"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="used_date">Date d'utilisation</Label>
                                        <Input type="date" name="used_date" id="used_date" value={this.state.promoCode.used_date ? (new Date(this.state.promoCode.used_date)).toLocaleDateString('fr-CA') : ''} onChange={this.handleChange}
                                               placeholder="Date d'utilisation"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="description">Description</Label>
                                        <Input type="textarea" name="description" id="description" value={this.state.promoCode.description || ''} onChange={this.handleChange}
                                               placeholder="Description"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <CustomInput type="checkbox" id="used" name="used" label="Utilisé" defaultChecked={this.state.promoCode.used} inline/>
                                <CustomInput type="checkbox" id="active" name="active" label="Actif" defaultChecked={this.state.promoCode.active} inline/>
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
