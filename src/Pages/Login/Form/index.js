import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Card, CardBody, CardTitle,
    Input, Label, Form
} from 'reactstrap';
import axios from "axios";
import {toast} from "react-toastify";
import {setLoginCookies} from "../../../Security/Security";

export default class LoginForm extends React.Component
{
    static POST_LOGIN_URL = '/api/login_check';

    constructor(props) {
        super(props);
        this.state = {
            connection: {
                username: null,
                password: null
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const login = this.state.connection;
            login[name] = value;
            return { login };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postLogin();
    }

    postLogin() {
        axios({
            method: 'POST',
            data: this.state.connection,
            url: process.env.REACT_APP_API_URI + LoginForm.POST_LOGIN_URL,
            headers: {
                "Content-Type": "application/json",
            }
        }).then(res => {
            setLoginCookies(res.data);
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            toast['error']('Identifiant ou mot de passe incorrecte');
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
                    <Row>
                        <Col lg="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle className={'text-center'}>Connexion</CardTitle>
                                    <Form onSubmit={this.handleSubmit}>
                                        <Row form>
                                            <Col lg="12 mt-3">
                                                <Label for="login">Identifiant / Email</Label>
                                                <Input className='form-control' type='email' id='username' name='username' onChange={this.handleChange}/>
                                            </Col>
                                        </Row>
                                        <Row form>
                                            <Col lg="12 mt-3">
                                                <Label for="password">Mot de passe</Label>
                                                <Input className='form-control' type='password' id='password' name='password' onChange={this.handleChange}/>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col lg="12">
                                                <Input className='btn btn-primary mt-3' type='submit' id='submit' name='submit' value={'Se connecter'}/>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
};
