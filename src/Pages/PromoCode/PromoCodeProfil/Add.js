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
import AsyncSelect from "react-select/async";
import { toast } from 'react-toastify';

const filterUser = async (inputValue) => {
    let result = [];

    await axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URI + Add.SEARCH_USER_URL + inputValue,
        headers: {
            "Authorization": "Bearer " + getToken().token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        result = (res.data.map(function(user){
            return {'value': user.id, 'label': user.email, 'name': 'user'};
        }));

    }).catch(error => {
        console.log(error)
    });

    return result;
};

const loadOptionsUser = (inputValue, callback) => {
    if (inputValue.length < 3) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterUser(inputValue));
    }, 1000);
};

const filterCoupon = async (inputValue) => {
    let result = [];

    await axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URI + Add.SEARCH_COUPON_URL + inputValue,
        headers: {
            "Authorization": "Bearer " + getToken().token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        result = (res.data.map(function(coupon){
            return {'value': coupon.id, 'label': coupon.name + ' - ' + coupon.code, 'name': 'coupon'};
        }));

    }).catch(error => {
        console.log(error)
    });

    return result;
};

const loadOptionsCoupon = (inputValue, callback) => {
    if (inputValue.length < 2) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterCoupon(inputValue));
    }, 1000);
};

export default class Add extends React.Component
{
    static POST_PROMOCODE_URL = '/api/promo-code';
    static SEARCH_USER_URL = '/api/user/search/';
    static SEARCH_COUPON_URL = '/api/coupon/search/';

    initialState = {
        name: null,
        code: null,
        expired_date: null,
        used_date: null,
        description: null,
        coupon: null,
        user: null,
        used: false,
        active: false
    }

    constructor(props) {
        super(props)
        this.state = {
            promoCode: this.initialState
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let data = event;

        if (typeof event.target !== 'undefined') {
            data = event.target;
        }

        const {name, value} = data;
        const promoCode = this.state.promoCode;
        promoCode[name] = value;

        this.setState({promoCode});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postPromoCode();
    }

    postPromoCode() {
        axios({
            method: 'POST',
            data: this.state.promoCode,
            url: process.env.REACT_APP_API_URI + Add.POST_PROMOCODE_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('Le code promotionnel a bien été ajouté !');
            this.props.history.push('/code-promo')
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
                        <CardTitle>Nouveau code promotionnel</CardTitle>
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
                                        <Label for="coupon">Coupon</Label>
                                        <AsyncSelect name="coupon"
                                                     cacheOptions
                                                     defaultOptions
                                                     onChange={this.handleChange}
                                                     loadOptions={loadOptionsCoupon}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="user">Utilisateur</Label>
                                        <AsyncSelect name="user"
                                                     cacheOptions
                                                     defaultOptions
                                                     onChange={this.handleChange}
                                                     loadOptions={loadOptionsUser}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="expired_date">Date d'expiration</Label>
                                        <Input type="date" name="expired_date" id="expired_date" onChange={this.handleChange}
                                               placeholder="Date d'expiration"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="used_date">Date d'utilisation</Label>
                                        <Input type="date" name="used_date" id="used_date" onChange={this.handleChange}
                                               placeholder="Date d'utilisation"/>
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
                                <CustomInput type="checkbox" id="used" name="used" label="Utilisé" inline/>
                                <CustomInput type="checkbox" id="active" name="active" label="Actif" inline/>
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
