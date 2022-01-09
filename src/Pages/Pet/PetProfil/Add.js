import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

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

const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterUser(inputValue));
    }, 1000);
};

export default class Add extends React.Component
{
    static POST_PET_URL = '/api/pet';
    static SEARCH_USER_URL = '/api/user/search/';

    initialState = {
        name: "",
        user: "",
        age: "",
        sexe: "",
        birthday: "",
        developmentalAge: "",
        notes: ""
    }

    constructor(props) {
        super(props)
        this.state = {
            pet: this.initialState
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
        const pet = this.state.pet;
        pet[name] = value;

        this.setState({pet});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postPet();
    }

    postPet() {
        console.log(this.state.pet);
        axios({
            method: 'POST',
            data: this.state.pet,
            url: process.env.REACT_APP_API_URI + Add.POST_PET_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('L\'animal a bien été ajouté !');
            this.props.history.push('/animaux')
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
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
                        <CardTitle>Nouvel animal</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" onChange={this.handleChange}
                                               placeholder="Nom"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="Utilisateur">Utilisateur</Label>
                                        <AsyncSelect name="user"
                                            cacheOptions
                                            defaultOptions
                                            onChange={this.handleChange}
                                            loadOptions={loadOptions}
                                            className="basic-multi-select"
                                            classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <Label for="age">Age</Label>
                                        <Input type="number" name="age" id="age" onChange={this.handleChange}
                                               placeholder="Age"/>
                                    </Col>
                                    <Col md={6}>
                                        <Label for="sexe">Genre</Label>
                                        <CustomInput type="select" name="sexe" id="sexe" onChange={this.handleChange}
                                               placeholder="Genre">
                                            <option value="M">Garçon</option>
                                            <option value="F">Fille</option>
                                        </CustomInput>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Row form>
                                    <Col md={6}>
                                        <Label for="birthday">Anniversaire</Label>
                                        <Input type="date" name="birthday" id="birthday" onChange={this.handleChange}
                                               placeholder="Anniversaire"/>
                                    </Col>
                                    <Col md={6}>
                                        <Label for="developmental_age">Age de développment</Label>
                                        <Input name="developmental_age" id="developmental_age" onChange={this.handleChange}
                                                placeholder="Age de développment"/>
                                    </Col>
                                </Row>
                            </FormGroup>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" name="notes" id="notes" onChange={this.handleChange}
                                       placeholder="Notes"/>
                            </FormGroup>
                            <Button color="primary" type="submit" className="mt-2">Ajouter</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
