import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Add extends React.Component
{
    static POST_BREED_URL = '/api/breed';

    initialState = {
        name: "",
        animal: ""
    }

    constructor(props) {
        super(props)
        this.state = {
            breed: this.initialState
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;
        const breed = this.state.breed;
        breed[name] = value;

        this.setState(breed);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postBreed();
    }

    postBreed() {
        axios({
            method: 'POST',
            data: this.state.breed,
            url: process.env.REACT_APP_API_URI + Add.POST_BREED_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La race a bien été ajouté !');
            this.props.history.push('/breeds')
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
                        <CardTitle>Nouvelle race</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" onChange={this.handleChange}
                                               placeholder="Nom"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="animal">Espece</Label>
                                        <Input type="text" name="animal" id="animal" onChange={this.handleChange}
                                               placeholder="Espece"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" className="mt-2">Ajouter</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
