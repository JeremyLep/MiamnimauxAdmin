import React, {Fragment} from 'react';
import {Button, Card, CardBody, CardTitle, Col, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import axios from 'axios';
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import {getToken} from "../../../Security/Security";
import { toast } from 'react-toastify';

export default class Edit extends React.Component
{
    static GET_COMMENT_URL  = '/api/comment';
    static EDIT_COMMENT_URL = '/api/comment';

    constructor(props) {
        super(props);
        this.commentId = props.match.params.commentId;
        this.state = {
            comment: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const {name, value} = event.target;

        this.setState(prevState => {
            const comment = {...this.state.comment};
            comment[name] = value;
            return { comment };
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.updateComment();
    }

    formatData() {
        const editcomment = this.state.comment;

        delete editcomment.id;
        delete editcomment.user;
        delete editcomment.order;
        delete editcomment.created_date;

        return editcomment;
    }

    updateComment() {
        axios({
            method: 'PATCH',
            data: this.formatData(),
            url: process.env.REACT_APP_API_URI + Edit.EDIT_COMMENT_URL + '/' + this.commentId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('La mise à jour s\'est bien effectuée !')
            this.setState({comment: res.data})
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']("Une erreur s\'est produite: <br/>" + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }        });
    }

    getComment() {
        axios({
            method: 'GET',
            url: process.env.REACT_APP_API_URI + Edit.GET_COMMENT_URL + '/' + this.commentId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({comment: res.data})
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
        this.getComment()
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this.commentId = nextProps.match.params.commentId;
        this.getComment();
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
                        <CardTitle>Edition commentaire N°{this.state.comment.id}</CardTitle>
                        <Form onSubmit={this.handleSubmit}>
                            <Row form>
                                <Col md={12}>
                                    <FormGroup>
                                        <Label for="comment">Commentaire</Label>
                                        <Input type="textarea" name="comment" id="comment" value={this.state.comment.comment || ''} onChange={this.handleChange}
                                               placeholder="Commentaire"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row form>
                                <Col md={5}>
                                    <FormGroup>
                                        <Label for="note">Note</Label>
                                        <Input type="number" name="note" min={'1'} max={'5'} id="note" value={this.state.comment.note || ''} onChange={this.handleChange}
                                               placeholder="note"/>
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
