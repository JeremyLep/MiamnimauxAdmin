import React, {Fragment} from 'react';

import {
    DropdownToggle,
    DropdownMenu,
    Nav,
    NavItem,
    NavLink,
    UncontrolledButtonDropdown,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    Row,
    Col,
    Label,
    Input, Table
} from 'reactstrap';

import {faBan, faEllipsisV, faPaperPlane, faTruck} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getToken} from "../../Security/Security";
import axios from "axios";
import {toast} from "react-toastify";

class OrderAction extends React.Component {

    static RATE_ORDER    = '/api/carrier/rate';
    static SHIP_ORDER    = '/api/carrier/ship';
    static CANCEL_ORDER  = '/api/carrier/cancel';
    static TRACK_ORDER   = '/api/carrier/track';

    constructor(props) {
        super(props);
        this.state = {
            modalShip: false,
            modalTrack: false,
            ship: {
                order_id: props.order_id
            },
            trackEvents: {},
            shipped: props.shipped
        };

        this.toggleShip   = this.toggleShip.bind(this);
        this.toggleTrack  = this.toggleTrack.bind(this);
        this.cancel       = this.cancel.bind(this);
        this.handleChange = this.handleChange.bind(this);
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
        const ship = this.state.ship;

        ship[name] = data.type === 'checkbox' ? data.checked : value;

        this.setState({ship});
    }

    ship() {
        axios({
            method: 'POST',
            data: this.state.ship,
            url: process.env.REACT_APP_API_URI + OrderAction.SHIP_ORDER,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(response => {
            toast['success']('Le bordereau à bien été généré');
        }).catch(error => {
            console.log(error);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    track() {
        axios({
            method: 'POST',
            data: this.state.ship,
            url: process.env.REACT_APP_API_URI + OrderAction.TRACK_ORDER,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(response => {
            this.setState({trackEvents: response.data.events});
        }).catch(error => {
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.error);
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    cancel() {
        axios({
            method: 'POST',
            data: this.state.ship,
            url: process.env.REACT_APP_API_URI + OrderAction.CANCEL_ORDER,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "text/csv",
            }
        }).then(response => {
            toast['success']('L\'annulation à bien été prise en compte');
        }).catch(error => {
            if (error.response) {
                toast['error']('Une erreur s\'est produite: ' + error.response.data.error);
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    toggleShip() {
        this.setState({
            modalShip: !this.state.modalShip
        });
    }

    toggleTrack() {
        this.track();
        this.setState({
            modalTrack: !this.state.modalTrack
        });
    }

    render() {
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem className={`${this.state.shipped ? 'd-none' : ''}`}>
                                                <a className={'mr-3 dropdown-item'} color="primary" onClick={this.toggleShip}>
                                                    <FontAwesomeIcon className="mr-1" icon={faPaperPlane}/>Envoyer colis
                                                </a>
                                            </NavItem>
                                            <NavItem className={`${this.state.shipped ? '' : 'd-none'}`}>
                                                <a className={'mr-3 dropdown-item'} color="primary" onClick={this.toggleTrack}>
                                                    <FontAwesomeIcon className="mr-1" icon={faTruck}/>Suivre le colis
                                                </a>
                                            </NavItem>
                                            <NavItem className={`${this.state.shipped ? '' : 'd-none'}`}>
                                                <a className={'mr-3 dropdown-item'} color="primary" onClick={this.cancel}>
                                                    <FontAwesomeIcon className="mr-1" icon={faBan}/>Annuler l'envoi
                                                </a>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.modalShip} toggle={this.toggleShip}>
                    <ModalHeader toggle={this.toggleShip}>Envoyer le colis</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col md={5}>
                                    <Label for="shipment_date">Date d'enlèvement</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="date" name="shipment_date" id="shipment_date" onChange={this.handleChange}
                                           placeholder="Date d'enlèvement"/>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" onClick={(e) => {e.preventDefault(); this.ship()}} className="mt-2 pull-right">Générer le bordereaux</Button>
                        </Form>
                    </ModalBody>
                </Modal>
                <Modal isOpen={this.state.modalTrack} toggle={this.toggleTrack}>
                    <ModalHeader toggle={this.toggleTrack}>Suivi du colis</ModalHeader>
                    <ModalBody>
                        <Table className="table table-condensed table-hover" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Evenement</th>
                                    <th>Location</th>
                                    <th>Code</th>
                                </tr>
                            </thead>
                            <tbody>
                            {this.state.events ?
                                this.state.events.map(function(event) {
                                    return <tr>
                                        <td style="text-align: left;">${event.date}</td>
                                        <td style="text-align: left;">${event.description}</td>
                                        <td style="text-align: left;">${event.location}</td>
                                        <td style="text-align: left;">${event.code}</td>
                                    </tr>
                                })
                            :
                                <tr>
                                    <td colspan="4">Aucun evenement</td>
                                </tr>
                            }
                            </tbody>
                        </Table>
                    </ModalBody>
                </Modal>
            </Fragment>
        )
    }
}

export default OrderAction;