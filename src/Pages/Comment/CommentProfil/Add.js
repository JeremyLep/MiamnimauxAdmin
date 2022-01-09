import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

import AsyncSelect from "react-select/async";

const filterUser = async (inputValue) => {
    let result = [];

    await axios({
        method: 'GET',
        url: process.env.REACT_APP_API_URI + Add.SEARCH_USER_URL + inputValue,
        headers: {
            "Authorization": "Bearer " + getToken().token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        result = (res.data.map(function(user){
            return {'value': user.id, 'label': user.email, 'name': 'user'};
        }));

    }).catch(error => {
        console.log(error)
    });

    return result;
};

const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 3) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterUser(inputValue));
    }, 1000);
};

export default class Add extends React.Component
{
    static POST_COMMENT_URL = '/api/comment';
    static SEARCH_USER_URL = '/api/user/search/';
    static GET_USER_ORDER = '/api/order/user/';

    initialState = {
        comment: null,
        note: null,
        user: null,
        order: null
    }

    constructor(props) {
        super(props)
        this.state = {
            comment: this.initialState,
            orderList: []
        };
        this.handleChange     = this.handleChange.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handleSubmit     = this.handleSubmit.bind(this);
    }

    handleUserChange(event) {
        this.handleChange(event);

        if (this.state.comment.user == null) {
            return [];
        }

        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Add.GET_USER_ORDER + this.state.comment.user,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            let result = (res.data.orders.map(function(order){
                return {'value': order.id, 'label': order.created_date + ' - ' + order.price_ti, 'name': 'order'};
            }));
            this.setState({orderList: result});
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

    handleChange(event) {
        let data = event;

        if (typeof event.target !== 'undefined') {
            data = event.target;
        }

        const {name, value} = data;
        const comment = this.state.comment;
        comment[name] = value;

        this.setState({comment});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.postComment();
    }

    postComment() {
        axios({
            method: 'POST',
            data: this.state.comment,
            url: process.env.REACT_APP_API_URI + Add.POST_COMMENT_URL,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('Le commentaire a bien été ajouté !');
            this.props.history.push('/commentaires')
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
                        <CardTitle>Nouveau commentaire</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="comment">Commentaire</Label>
                                        <Input type="textarea" name="comment" id="comment" onChange={this.handleChange}
                                               placeholder="Commentaire"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label for="note">Note</Label>
                                        <Input type="number" name="note" min={'1'} max={'5'} id="note" onChange={this.handleChange}
                                               placeholder="note"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="user">Utilisateur</Label>
                                        <AsyncSelect name="user"
                                                cacheOptions
                                                defaultOptions
                                                onChange={this.handleUserChange}
                                                loadOptions={loadOptions}
                                                className="basic-multi-select"
                                                classNamePrefix="select">
                                        </AsyncSelect>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label for="order">Commandes</Label>
                                        <AsyncSelect name="order"
                                                     cacheOptions
                                                     defaultOptions={this.state.orderList}
                                                     className="basic-multi-select"
                                                     classNamePrefix="select">
                                        </AsyncSelect>
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
