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
    Label,
    Row,
    Collapse,
    CardHeader
} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Address extends React.Component
{
    static GET_USER_URL            = '/api/user';
    static GET_ADDRESSES_URL       = '/api/addresses/user';
    static GET_ADDRESS_ORDER_URL   = '/api/address/order';
    static GET_ADDRESS_INVOICE_URL = '/api/address/invoice';
    static EDIT_ADDRESS_URL        = '/api/address';
    static CHOOSE_ADDRESS_URL      = '/api/address/choose';

    constructor(props) {
        super(props)
        this.userId = props.match.params.userId;
        this.orderId = props.match.params.orderId;
        this.invoiceId = props.match.params.invoiceId;
        this.state = {
            user: {},
            addresses: [],
            collapse: null,
            addressSelected: null
        };

        this.toggle       = this.toggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.chooseAddress = this.chooseAddress.bind(this);
    }

    handleChange(event) {
        const index = event.target.getAttribute('index');
        const {name, value} = event.target;

        let addresses = [...this.state.addresses];
        let address = {...addresses[index]};

        address[name] = value;
        addresses[index] = address;
        this.setState({addresses});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateAddress(event.target.id, event.target.getAttribute('index'));
    }

    formatData(index) {
        const editAddress = this.state.addresses[index];

        delete editAddress.id;
        delete editAddress.created_date;
        delete editAddress.user;
        delete editAddress.active;

        return editAddress;
    }

    updateAddress(addressId, index) {
        axios({
            method: 'PATCH',
            data: this.formatData(index),
            url: process.env.REACT_APP_API_URI + Address.EDIT_ADDRESS_URL + '/' + addressId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !');
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

    chooseAddress(e, uuid) {
        e.preventDefault();

        axios({
            method: 'PATCH',
            url: process.env.REACT_APP_API_URI + Address.CHOOSE_ADDRESS_URL + '/' + uuid,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({addresses: res.data});
            toast['success']('La mise à jour s\'est bien effectuée !');
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

    getAddresses() {
        let url = Address.GET_ADDRESSES_URL + '/' + this.userId;

        if (this.orderId !== null && typeof this.orderId !== 'undefined') {
            url = Address.GET_ADDRESS_ORDER_URL + '/' + this.orderId;
        }

        if (this.invoiceId !== null && typeof this.invoiceId !== 'undefined') {
            url = Address.GET_ADDRESS_INVOICE_URL + '/' + this.invoiceId;
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + url,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({addresses: res.data});
            this.setState({addressSelected: res.data.find(element => element.active === true)});
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

    getUser() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Address.GET_USER_URL + '/' + this.userId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({user: res.data})
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

    toggle(e) {
        let event = e.target.dataset.event;
        this.setState({ collapse: this.state.collapse === Number(event) ? 0 : Number(event) });
    }

    componentDidMount(){
        this.getAddresses();

        if ((this.orderId === null || typeof this.orderId === 'undefined') && (this.invoiceId === null || typeof this.invoiceId === 'undefined')) {
            this.getUser();
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.userId = nextProps.match.params.userId;
        this.orderId = nextProps.match.params.orderId;
        this.invoiceId = nextProps.match.params.invoiceId;

        this.getAddresses();

        if ((this.orderId === null || typeof this.orderId === 'undefined') && (this.invoiceId === null || typeof this.invoiceId === 'undefined')) {
            this.getUser();
        }
    }

    render() {
        const collapse = this.state.collapse;

        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <CardTitle>Les adresses de {this.state.user.firstname} {this.state.user.lastname}</CardTitle>
                    {this.state.addresses.map((value, index) => {
                        return <Form onSubmit={this.handleSubmit} key={value.id} id={value.id} index={index}>
                        <Card className="main-card mb-3">
                            <CardHeader>
                                <div className={'w-100'} onClick={this.toggle} data-event={index}>
                                    {value.city}, {value.postcode} - {value.address} - {value.phone}
                                    <span className={"pull-right"} id="main">
                                        { (value.active === true) ?
                                            `Addresse par défaut` :
                                            <button onClick={e => this.chooseAddress(e, value.id)} className={"btn btn-primary"}>Choisir</button>
                                        }
                                    </span>
                                </div>
                            </CardHeader>
                            <Collapse isOpen={collapse === index}>
                                <CardBody>
                                    <Row form>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="country">Pays</Label>
                                                <Input type="text" name="country" id="country" value={value.country} index={index} onChange={this.handleChange}
                                                       placeholder="Pays"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={5}>
                                            <FormGroup>
                                                <Label for="city">Ville</Label>
                                                <Input type="text" name="city" id="city" value={value.city} index={index} onChange={this.handleChange}
                                                       placeholder="Ville"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={3}>
                                            <FormGroup>
                                                <Label for="postcode">Code postal</Label>
                                                <Input type="text" name="postcode" id="postcode" value={value.postcode} index={index} onChange={this.handleChange}
                                                       placeholder="Code postal"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={8}>
                                            <FormGroup>
                                                <Label for="address">Address</Label>
                                                <Input type="text" name="address" id="address" value={value.address} index={index} onChange={this.handleChange}
                                                       placeholder="Adresse"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={4}>
                                            <FormGroup>
                                                <Label for="phone">Téléphone</Label>
                                                <Input type="text" name="phone" id="phone" value={value.phone} index={index} onChange={this.handleChange}
                                                       placeholder="Téléphone"/>
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="notes">Notes</Label>
                                                <Input type="textarea" name="notes" id="notes" value={value.notes} index={index} onChange={this.handleChange}
                                                       placeholder="Notes"/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                <Button color="primary" type="submit" className="mt-2">Mettre à jour</Button>
                                </CardBody>
                            </Collapse>
                        </Card>
                        </Form>
                        })}
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
}
