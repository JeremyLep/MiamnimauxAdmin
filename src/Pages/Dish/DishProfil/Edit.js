import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_DISH_URL  = '/api/plat';
    static EDIT_DISH_URL = '/api/plat';

    constructor(props) {
        super(props);
        this.dishId = props.match.params.dishId;
        this.state = {
            dish: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const dish = {...this.state.dish};
            dish[name] = value;
            return { dish };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateDish();
    }

    formatData() {
        const editDish = this.state.dish;

        editDish.user = this.state.dish.user.id;

        delete editDish.id;
        delete editDish.created_date;

        return editDish;
    }

    updateDish() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_DISH_URL + '/' + this.dishId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({dish: res.data})
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

    getDish() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_DISH_URL + '/' + this.dishId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({dish: res.data})
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
    };

    componentDidMount(){
        this.getDish()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.dishId = nextProps.match.params.dishId;
        this.getDish();
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
                        <CardTitle>Edition {this.state.dish.name}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.dish.name || ''} onChange={this.handleChange}
                                               placeholder="Nom de l'animal"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="recipe">Recette</Label>
                                        <Input type="textarea" name="recipe" id="recipe" value={this.state.dish.recipe || ''} onChange={this.handleChange}
                                               placeholder="Recette"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="nutritional">Valeurs nutritives</Label>
                                        <Input type="textarea" name="nutritional" id="nutritional" value={this.state.dish.nutritional || ''} onChange={this.handleChange}
                                               placeholder="Valeurs nutritives"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="animal_type">Espèce</Label>
                                        <Input type="text" name="animal_type" id="animal_type" value={this.state.dish.animal_type ? this.state.dish.animal_type.id : ''} onChange={this.handleChange}
                                               placeholder="Espece"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="aliments">Aliments</Label>
                                        <Input type="text" name="aliments" id="aliments" value={this.state.dish.aliments || ''} onChange={this.handleChange}
                                               placeholder="Aliments"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Button color="primary" type="submit" className="mt-2">Mettre à jour</Button>
                        </Form>
                    </CardBody>
                </Card>
            </ReactCSSTransitionGroup>
        </Fragment>
    );
  }
}
