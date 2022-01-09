import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_FORMULA_URL  = '/api/formula';
    static EDIT_FORMULA_URL = '/api/formula';

    constructor(props) {
        super(props);
        this.formulaId = props.match.params.formulaId;
        this.state = {
            formula: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const formula = this.state.formula;


        formula[name] = value;

        this.setState({formula});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateFormula();
    }

    formatData() {
        const editFormula = this.state.formula;

        delete editFormula.id;
        delete editFormula.created_date;

        return editFormula;
    }

    updateFormula() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_FORMULA_URL + '/' + this.formulaId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({formula: res.data})
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

    getFormula() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_FORMULA_URL + '/' + this.formulaId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let data = res.data;

            this.setState({formula: data});
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

    componentDidMount(){
        this.getFormula();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.formulaId = nextProps.match.params.formulaId;
        this.getFormula();
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
                        <CardTitle>Edition {this.state.formula.name}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.formula.name || ''} onChange={this.handleChange}
                                               placeholder="Nom de la formule"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="nb_dishes">Nb plats</Label>
                                        <Input type="number" name="nb_dishes" id="nb_dishes" value={this.state.formula.nb_dishes || ''} onChange={this.handleChange}
                                               placeholder="Nombre de plats"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="recurring_interval">Interval de recurrence</Label>
                                        <Input type="select" name="recurring_interval" id="recurring_interval" value={this.state.formula.recurring_interval || ''} onChange={this.handleChange}
                                               placeholder="Interval de recurrence">
                                            <option value={'1'}>1 mois</option>
                                            <option value={'3'}>3 mois</option>
                                            <option value={'6'}>6 mois</option>
                                            <option value={'12'}>1 an</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="symbol">Symbol</Label>
                                        <Input type="symbol" name="symbol" id="symbol" value={this.state.formula.symbol || ''} onChange={this.handleChange}
                                               placeholder="Nombre d'animal'"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="textarea" name="description" id="description" value={this.state.formula.description || ''} onChange={this.handleChange}
                                       placeholder="Description"/>
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
