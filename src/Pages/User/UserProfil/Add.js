import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';


export default class Add extends React.Component
{
    static POST_USER_URL = '/api/user';

    initialState = {
        firstname: "",
        lastname: "",
        password: "",
        email: "",
        preferred_delivery_day: "",
        preferred_delivery_time: "",
        //picture: "",
        active: false,
        newsletter: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            user: this.initialState
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const user = this.state.user;
        user[name] = value;

        this.setState(user);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postUser();
    }

    postUser() {
        axios({
            method: 'POST',
            data: this.state.user,
            url: process.env.REACT_APP_API_URI + Add.POST_USER_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('L\'utilisateur a bien été ajouté !');
            this.props.history.push('/utilisateurs')
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
                        <CardTitle>Nouvel utilisateur</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" onChange={this.handleChange}
                                               placeholder="User Email"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" onChange={this.handleChange}
                                               placeholder="User Password"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="firstname">Prénom</Label>
                                <Input type="text" name="firstname" id="firstname" onChange={this.handleChange}
                                       placeholder="Prénom"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastname">Nom</Label>
                                <Input type="text" name="lastname" id="lastname" onChange={this.handleChange}
                                       placeholder="Nom de famille"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="checkbox" id="active" name="active" label="Activé" inline/>
                                <CustomInput type="checkbox" id="newsletter" name="newsletter" label="Newsletter" inline/>
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
