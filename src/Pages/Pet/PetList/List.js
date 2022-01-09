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
        accessor: p => <b><Link to={`/animaux/${p.id}/profile/edition`}>{p.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: "name",
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: p => <Link to={`/utilisateurs/${p.user.id}/profile/edition`}>{p.user.firstname} {p.user.lastname}<br/>{p.user.email}</Link>,
    },
    {
        Header: "Espèce",
        Footer: "Espèce",
        accessor: p => <Link to={`/especes/${p.type.id}/profile/edition`}>{p.type.name}</Link>,
    },
    {
        Header: "Race",
        Footer: "Race",
        accessor: p => <Link to={`/races/${p.breeds.id}/profile/edition`}>{p.breeds.name}</Link>,
    },
    {
        Header: "Sexe",
        Footer: "Sexe",
        accessor: 'sexe',
    },
    {
        Header: "Age",
        Footer: "Age",
        accessor: p => `${p.age} ans ${p.month} mois`,
    },
    {
        Header: "Poids",
        Footer: "Poids",
        accessor: p => p.weight
    },
    {
        Header: "Stérilisé",
        Footer: "Stérilisé",
        accessor: p => p.neutered ? 'Oui' : 'Non'
    },
    {
        Header: "Gestation",
        Footer: "Gestation",
        accessor: p => p.pregnant ? 'Oui' : 'Non'
    },
    {
        Header: "Activité",
        Footer: "Activité",
        accessor: p => p.activity === 0 ? 'peu actif' : p.activity === 1 ? 'actif' : 'très actif'
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
    static GET_ALL_PETS_URL = '/api/pets';
    static GET_USER_PETS_URL = '/api/pet/user/';
    static GET_SUB_PETS_URL = '/api/pet/subscription/';

    constructor(props) {
        super(props);
        this.userId = props.match ? props.match.params.userId : null;
        this.subscriptionId = props.match ? props.match.params.subscriptionId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            pets: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getPets(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.pets;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getPets(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getPets(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_PETS_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_PETS_URL + this.userId;
        } else if (typeof this.subscriptionId !== 'undefined' && this.subscriptionId !== null) {
            url = List.GET_SUB_PETS_URL + this.subscriptionId;
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
            this.pageCount = Math.ceil(res.data.petsTotal / limit);
            this.setState({pets: res.data.pets})

            return this.state.pets;
        }).catch(error => {
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
                            <CardTitle>animaux</CardTitle>
                            <Paginated data={this.state.pets != null ? this.state.pets : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
