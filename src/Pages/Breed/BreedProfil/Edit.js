import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_BREED_URL  = '/api/breed';
    static EDIT_BREED_URL = '/api/breed';

    constructor(props) {
        super(props);
        this.breedId = props.match.params.breedId;
        this.state = {
            breed: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const breed = {...this.state.breed};
            breed[name] = value;
            return { breed };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateBreed();
    }

    formatData() {
        const editBreed = this.state.breed;

        delete editBreed.id;
        delete editBreed.animal;
        delete editBreed.avatar;
        delete editBreed.created_date;

        return editBreed;
    }

    updateBreed() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_BREED_URL + '/' + this.breedId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({breed: res.data})
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

    getBreed() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_BREED_URL + '/' + this.breedId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({breed: res.data})
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
        this.getBreed()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.breedId = nextProps.match.params.breedId;
        this.getBreed();
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
                        <CardTitle>Edition race N°{this.state.breed.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={7}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.breed.name || ''} onChange={this.handleChange}
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
