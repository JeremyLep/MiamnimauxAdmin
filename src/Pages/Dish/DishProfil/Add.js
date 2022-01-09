import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Add extends React.Component
{
    static POST_DISH_URL = '/api/plat';

    initialState = {
        name: "",
        recipe: "",
        nutritional: "",
        animal_type: "",
        aliments: []
    }

    constructor(props) {
        super(props)
        this.state = {
            dish: this.initialState
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
        const dish = this.state.dish;
        dish[name] = value;

        this.setState({dish});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postDish();
    }

    postDish() {
        console.log(this.state.dish);
        axios({
            method: 'POST',
            data: this.state.dish,
            url: process.env.REACT_APP_API_URI + Add.POST_DISH_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La recette a bien été ajouté !');
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
                        <CardTitle>Nouvelle recette</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" onChange={this.handleChange}
                                               placeholder="Nom de l'animal"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="recipe">Recette</Label>
                                        <Input type="textarea" name="recipe" id="recipe" onChange={this.handleChange}
                                               placeholder="Recette"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="nutritional">Valeurs nutritives</Label>
                                        <Input type="textarea" name="nutritional" id="nutritional" onChange={this.handleChange}
                                               placeholder="Valeurs nutritives"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="animal_type">Espèce</Label>
                                        <Input type="text" name="animal_type" id="animal_type" onChange={this.handleChange}
                                               placeholder="Espece"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="aliments">Aliments</Label>
                                        <Input type="text" name="aliments" id="aliments" onChange={this.handleChange}
                                               placeholder="Aliments"/>
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
