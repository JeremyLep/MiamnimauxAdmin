import React from 'react';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Button, Modal, ModalHeader, ModalBody, Row, Col, Form, Label, Input} from 'reactstrap';
import axios from "axios";
import {getToken} from "../../Security/Security";
import {toast} from "react-toastify";

export default class ExportUsersButton extends React.Component
{
    static EXPORT_USERS = '/api/user/export/';

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

    exportUser() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + ExportUsersButton.EXPORT_USERS + this.state.exportData.date_from + '/' + this.state.exportData.date_to,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "text/csv",
            }
        }).then(response => {
            const blob = new Blob([response.data.split(',')], { type: "text/csv" });
            const blobURL = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = blobURL;
            a.download = 'export_user.csv';
            a.click();

            setTimeout(() => {
                // For Firefox it is necessary to delay revoking the ObjectURL
                URL.revokeObjectURL(blobURL);
            }, 1000);
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

    render() {
        return (
            <span className="d-inline-block mb-2 mr-2 pull-right">
                <Button className={'btn btn-info mr-3'} color="primary" onClick={this.toggle}>
                    <FontAwesomeIcon className="mr-1" icon={faPlus}/>Export utilisateurs
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Export des utilisateurs</ModalHeader>
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col md={5}>
                                    <Label for="date_from">Date début</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="date" name="date_from" id="date_from" onChange={this.handleChange}
                                       placeholder="Date début"/>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={5}>
                                    <Label for="date_to">Date fin</Label>
                                </Col>
                                <Col md={7}>
                                    <Input type="date" name="date_to" id="date_to" onChange={this.handleChange}
                                           placeholder="Date fin"/>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" onClick={(e) => {e.preventDefault(); this.exportUser()}} className="mt-2 pull-right">Exporter utilisateurs</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </span>
        );
    }
}