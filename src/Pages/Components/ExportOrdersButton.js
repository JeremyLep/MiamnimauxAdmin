import React from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Modal, ModalHeader, ModalBody, Row, Col, Form, Label, Input} from 'reactstrap';
import axios from "axios";
import {getToken} from "../../Security/Security";
import {toast} from "react-toastify";

export default class ExportOrdersButton extends React.Component
{
    static EXPORT_PROD_ORDERS = '/api/orders/production/export';
    static EXPORT_ORDERS      = '/api/orders/export';

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            exportData: {}
        };

        this.toggle       = this.toggle.bind(this);
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
        const exportData = this.state.exportData;

        exportData[name] = data.type === 'checkbox' ? data.checked : value;

        this.setState({exportData});
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    exportOrder(type) {
        let url = type === 'production' ? ExportOrdersButton.EXPORT_PROD_ORDERS : ExportOrdersButton.EXPORT_ORDERS;

        axios({
            method: 'POST',
            data: this.state.exportData,
            url: process.env.REACT_APP_API_URI + url,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            window.location.href = res.data;
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

    render() {
        return (
            <span className="d-inline-block mb-2 mr-2 pull-right">
                <Button className={'btn btn-info mr-3'} color="primary" onClick={this.toggle}>
                    <FontAwesomeIcon className="mr-1" icon={faPlus}/>Export Commandes
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}>Export des commandes</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={5}>
                                    <Label htmlFor="send-email">Envoi email au traiteur</Label>
                                </Col>
                                <Col md={7} className={'pl-5'}>
                                    <Input id="send-email" name="send-email" type="checkbox" onChange={this.handleChange}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Label htmlFor="update-orders">Mise à jour auto du statut de la commande</Label>
                                </Col>
                                <Col md={7} className={'pl-5'}>
                                    <Input id="update-orders" name="update-orders" type="checkbox" onChange={this.handleChange}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Label for="status">Statut</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="select" name="status" id="status" onChange={this.handleChange}
                                           placeholder="Statut">
                                        <option value={'created'}>Crée</option>
                                        <option value={'validated'}>Validé</option>
                                        <option value={'in_preparation'}>En préparation</option>
                                        <option value={'send'}>Envoyé</option>
                                        <option value={'delivered'}>Livré</option>
                                        <option value={'cancelled'}>Annulé</option>
                                    </Input>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Label for="date-from">Date début</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="date" name="date-from" id="date-from" onChange={this.handleChange}
                                       placeholder="Date début"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Label for="date-to">Date fin</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="date" name="date-to" id="date-to" onChange={this.handleChange}
                                           placeholder="Date fin"/>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" onClick={(e) => {e.preventDefault(); this.exportOrder('production')}} className="mt-2 pull-right">Exporter Production</Button>
                            <Button color="primary" type="submit" onClick={(e) => {e.preventDefault(); this.exportOrder('orders')}} className="mt-2 pull-right">Exporter Commandes</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}