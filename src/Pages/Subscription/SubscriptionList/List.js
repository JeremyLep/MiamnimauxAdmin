import React from 'react';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import {Paginated, DateFormatter, BadgeColored} from "../../Components/Paginated";
import {getToken} from "../../../Security/Security";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: s => <b><Link to={`/abonnements/${s.id}/profile/edition`}>{s.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: s => <Link to={`/utilisateurs/${s.user.id}/profile/edition`}>{s.user.firstname} {s.user.lastname}<br/>{s.user.email}</Link>,
    },
    {
        Header: "Animal",
        Footer: "Animal",
        accessor: s => <Link to={`/animaux/${s.pet.id}/profile/edition`}>{s.pet.name}</Link>,
    },
    {
        Header: "Formule",
        Footer: "Formule",
        accessor: s => <Link to={`/formules/${s.price.formula.id}/profile/edition`}>{s.price.formula.name}</Link>,
    },
    {
        Header: "Montant",
        Footer: "Montant",
        accessor: s => `${s.amount} €`,
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: 'stripe_subscription_id'
    },
    {
        Header: "Statut",
        Footer: "Statut",
        accessor: s => BadgeColored(s.status, s.status === 'running' ? 'success' : (s.status === 'paused' ? 'warning' : (s.status === 'cancelled' ? 'danger' : 'info'))),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: s => DateFormatter(s.created_date),
    }
];

export default class List extends React.Component
{
    static GET_ALL_SUB_URL   = '/api/subscriptions';
    static GET_USER_SUB_URL  = '/api/subscription/user/';
    static GET_PET_SUB_URL = '/api/subscription/pet/';

    constructor(props) {
        super(props);
        this.userId = props.match ? props.match.params.userId : null;
        this.petId = props.match ? props.match.params.petId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            subscriptions: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getSubscriptions(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.subscriptions;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getSubscriptions(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getSubscriptions(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_SUB_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_SUB_URL + this.userId;
        } else if (typeof this.petId !== 'undefined' && this.petId !== null) {
            url = List.GET_PET_SUB_URL + this.petId;
        }

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.subscriptionsTotal / limit);
            this.setState({subscriptions: res.data.subscriptions})

            return this.state.subscriptions;
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
                            <CardTitle>Abonnements</CardTitle>
                            <Paginated data={this.state.subscriptions != null ? this.state.subscriptions : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
