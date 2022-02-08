import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, CustomInput, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_USER_URL  = '/api/user';
    static EDIT_USER_URL = '/api/user';

    constructor(props) {
        super(props);
        this.userId = props.match.params.userId;
        this.state = {
            user: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let target = event.target;
        const {name, value} = target;

        this.setState(prevState => {
            const user = {...this.state.user};
            user[name] = target.type === 'checkbox' ? target.checked : value;
            return { user };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateUser();
    }

    formatData() {
        const editUser = this.state.user;

        delete editUser.id;
        delete editUser.avatar;
        delete editUser.deleted;
        delete editUser.stripe_customer_id;
        delete editUser.created_date;
        delete editUser.roles;

        delete editUser.phone;

        console.log(editUser);
        return editUser;
    }

    updateUser() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_USER_URL + '/' + this.userId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({user: res.data})
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

    getUser() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_USER_URL + '/' + this.userId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({user: res.data})
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
        this.getUser()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.userId = nextProps.match.params.userId;
        this.getUser();
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
                        <CardTitle>Edition {this.state.user.firstname} {this.state.user.lastname}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="email">Email</Label>
                                        <Input type="email" name="email" id="email" value={this.state.user.email || ''} onChange={this.handleChange}
                                               placeholder="User Email"/>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="password">Password</Label>
                                        <Input type="password" name="password" id="password" value={this.state.user.password || ''} onChange={this.handleChange}
                                               placeholder="User Password"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label for="firstname">Prénom</Label>
                                <Input type="text" name="firstname" id="firstname" value={this.state.user.firstname || ''} onChange={this.handleChange}
                                       placeholder="Prénom"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="lastname">Nom</Label>
                                <Input type="text" name="lastname" id="lastname" value={this.state.user.lastname || ''} onChange={this.handleChange}
                                       placeholder="Nom de famille"/>
                            </FormGroup>
                            <FormGroup>
                                <Label for="apporteur_code">Code apporteur</Label>
                                <Input type="text" name="apporteur_code" id="apporteur_code" value={this.state.user.apporteur_code || ''} onChange={this.handleChange}
                                       placeholder="Code apporteur"/>
                            </FormGroup>
                            <FormGroup>
                                <CustomInput type="checkbox" id="active" name="active" label="Activé" defaultChecked={this.state.user.active} inline onChange={this.handleChange}/>
                                <CustomInput type="checkbox" id="newsletter" name="newsletter" label="Newsletter" defaultChecked={this.state.user.newsletter} inline onChange={this.handleChange}/>
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
