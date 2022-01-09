import React from 'react';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Paginated, DateFormatter} from "../../Components/Paginated";
import {getToken} from "../../../Security/Security";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: c => <b><Link to={`/commentaires/${c.id}/profile/edition`}>{c.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: c => <Link to={`/utilisateurs/${c.user.id}/profile/edition`}>{c.user.firstname} {c.user.lastname}<br/>{c.user.email}</Link>,
    },
    {
        Header: "Note",
        Footer: "Note",
        accessor: c => <span className={`score s${c.note}`}></span>,
    },
    {
        Header: "Commentaires",
        Footer: "Commentaires",
        accessor: "comment"
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: c => DateFormatter(c.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_COMMENTS_URL     = '/api/comments';
    static GET_USER_COMMENTS_URL   = '/api/comment/user/';
    static GET_ORDER_COMMENTS_URL = '/api/comment/order/';

    constructor(props) {
        super(props);
        this.userId    = props.match ? props.match.params.userId : null;
        this.orderId = props.match ? props.match.params.orderId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state   = {
            comments: []
        }
        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getComments(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.comments;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getComments(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getComments(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_COMMENTS_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_COMMENTS_URL + this.userId;
        } else if (typeof this.orderId !== 'undefined' && this.orderId !== null) {
            url = List.GET_ORDER_COMMENTS_URL + this.orderId;
        }

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.commentsTotal / limit);
            this.setState({comments: res.data.comments})

            return this.state.comments;
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                this.props.history.push('/logout');
            } else if (error.response.status === 403) {
                this.props.history.goBack();
            }
        });
    };

    render() {
        return (
            <Row>
                <Col lg="12">
                    <Card className="main-card mb-3">
                        <CardBody>
                            <CardTitle>Commentaires</CardTitle>
                            <Paginated data={this.state.comments != null ? this.state.comments : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}