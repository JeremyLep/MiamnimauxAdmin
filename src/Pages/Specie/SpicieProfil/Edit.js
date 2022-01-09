import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_SPECIE_URL  = '/api/specie';
    static EDIT_SPECIE_URL = '/api/specie';

    constructor(props) {
        super(props);
        this.specieId = props.match.params.specieId;
        this.state = {
            specie: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const specie = {...this.state.specie};
            specie[name] = value;
            return { specie };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateSpecie();
    }

    formatData() {
        const editSpecie = this.state.specie;

        delete editSpecie.id;
        delete editSpecie.avatar;
        delete editSpecie.created_date;

        return editSpecie;
    }

    updateSpecie() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_SPECIE_URL + '/' + this.specieId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({specie: res.data})
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

    getSpecie() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_SPECIE_URL + '/' + this.specieId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            console.log(res);
            this.setState({specie: res.data})
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
        this.getSpecie()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.specieId = nextProps.match.params.specieId;
        this.getSpecie();
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
                        <CardTitle>Edition espèce N°{this.state.specie.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.specie.name || ''} onChange={this.handleChange}
                                               placeholder="Nom"/>
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
