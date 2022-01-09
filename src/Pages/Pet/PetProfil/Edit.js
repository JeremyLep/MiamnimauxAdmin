import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';
import AsyncSelect from "react-select/async";

export default class Edit extends React.Component
{
    static GET_PET_URL  = '/api/pet';
    static EDIT_PET_URL = '/api/pet';

    static GET_SPECIES_URL = '/api/species';
    static GET_BREEDS_URL  = '/api/breeds';

    constructor(props) {
        super(props);
        this.petId = props.match.params.petId;
        this.state = {
            pet: {},
            species: {},
            breeds: {},
            specieName: null,
            breedName: null
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
        const pet = this.state.pet;

        pet[name] = data.type === 'checkbox' ? data.checked : value;

        if (name === 'specie') {
            this.setState({specieName: label});
        }

        if (name === 'breed') {
            this.setState({breedName: label});
        }

        this.setState({pet});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updatePet();
    }

    formatData() {
        const editPet = this.state.pet;

        editPet.user = this.state.pet.user.id;

        delete editPet.id;
        delete editPet.diseases;
        delete editPet.subscription;
        delete editPet.aliments_forbidden;
        delete editPet.allergies;
        delete editPet.avatar;
        delete editPet.birthday;
        delete editPet.needed_grams;
        delete editPet.plat_per_day;
        delete editPet.preferred_aliments;
        delete editPet.shape;
        delete editPet.usual_food;
        delete editPet.wrong_match;
        delete editPet.created_date;

        return editPet;
    }

    updatePet() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_PET_URL + '/' + this.petId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({pet: res.data})
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

    getPet() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_PET_URL + '/' + this.petId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let data = res.data;

            let specieName = data.type ? data.type.name : null;
            this.setState({specieName: specieName});

            data.type = data.type ? data.type.id : '';


            let breedName = data.breeds ? data.breeds.name : null;
            this.setState({breedName: breedName});

            data.breeds = data.breeds ? data.breeds.id : '';

            this.setState({pet: data})
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

    loadSpecies() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_SPECIES_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let species = res.data.species.map(function(specie){
                return {'value': specie.id, 'label': specie.name, 'name': 'specie'};
            });

            this.setState({
                species: species
            });
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

    loadBreeds() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_BREEDS_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let breeds = res.data.breeds.map(function(breed){
                return {'value': breed.id, 'label': breed.name, 'name': 'breed'};
            });

            this.setState({
                breeds: breeds
            });
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

    componentDidMount(){
        this.getPet()
        this.loadSpecies();
        this.loadBreeds();
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.petId = nextProps.match.params.petId;
        this.getPet();
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
                        <CardTitle>Edition {this.state.pet.name}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="name">Nom</Label>
                                        <Input type="text" name="name" id="name" value={this.state.pet.name || ''} onChange={this.handleChange}
                                               placeholder="Nom de l'animal"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="sexe">Sexe</Label>
                                        <Input type="select" name="sexe" id="sexe" value={this.state.pet.sexe || ''} onChange={this.handleChange}
                                               placeholder="Sexe">
                                            <option value={'F'}>Fille</option>
                                            <option value={'M'}>Garçon</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="weight">Poids (Kg)</Label>
                                        <Input type="number" name="weight" id="weight" step={0.1} value={this.state.pet.weight || ''} onChange={this.handleChange}
                                               placeholder="Poids"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="activity">Activité</Label>
                                        <Input type="select" name="activity" id="activity" value={this.state.pet.activity || ''} onChange={this.handleChange}
                                               placeholder="Activité">
                                            <option value={'0'}>Peu actif</option>
                                            <option value={'1'}>Actif</option>
                                            <option value={'2'}>Très actif</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="age">Age</Label>
                                        <Input type="number" name="age" id="age" value={this.state.pet.age || ''} onChange={this.handleChange}
                                               placeholder="Age"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="age">Mois</Label>
                                        <Input type="number" name="month" id="month" value={this.state.pet.month || ''} onChange={this.handleChange}
                                               placeholder="Mois"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Label for="type">Espece</Label>
                                    <AsyncSelect name="type"
                                                 cacheOptions
                                                 onChange={this.handleChange}
                                                 defaultOptions={this.state.species}
                                                 value={{label: this.state.specieName} || ''}
                                                 className="basic-multi-select"
                                                 classNamePrefix="select">
                                    </AsyncSelect>
                                </Col>
                                <Col md={6}>
                                    <Label for="breed">Race</Label>
                                    <AsyncSelect name="breed"
                                                 cacheOptions
                                                 onChange={this.handleChange}
                                                 defaultOptions={this.state.breeds}
                                                 value={{label: this.state.breedName} || ''}
                                                 className="basic-multi-select"
                                                 classNamePrefix="select">
                                    </AsyncSelect>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="notes">Notes</Label>
                                <Input type="textarea" name="notes" id="notes" value={this.state.pet.notes || ''} onChange={this.handleChange}
                                       placeholder="Notes"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="checkbox" id="neutered" name="neutered" label="Stérilisé" defaultChecked={this.state.pet.neutered} inline onChange={this.handleChange}/>
                                <CustomInput type="checkbox" id="pregnant" name="pregnant" label="Gestation" defaultChecked={this.state.pet.pregnant} inline onChange={this.handleChange}/>
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
