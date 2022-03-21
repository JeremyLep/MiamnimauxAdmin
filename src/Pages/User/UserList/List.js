import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import {getToken} from "../../../Security/Security";

import {Paginated, DateFormatter, BadgeColored} from "../../Components/Paginated";
import UserAction from "../UserAction";
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import ExportUsersButton from "../../Components/ExportUsersButton";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: u => <b><Link to={`/utilisateurs/${u.id}/profile/edition`}>{u.id}</Link></b>,
    },
    {
        Header: "Prénom",
        Footer: "Prénom",
        accessor: 'firstname'
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: 'lastname'
    },
    {
        Header: "Email",
        Footer: "Email",
        accessor: 'email'
    },
    {
        Header: "Role",
        Footer: "Role",
        accessor: u => BadgeColored(u.roles ? u.roles.slice(-1).toString().replace('ROLE_', '') : '', 'secondary'),
    },
    {
        Header: "Code apporteur",
        Footer: "Code apporteur",
        accessor: u => BadgeColored(u.apporteur_code ? u.apporteur_code : '', u.apporteur_code ? 'info' : ''),
    },
    {
        Header: "Actif",
        Footer: "Actif",
        accessor: u => BadgeColored(u.active ? 'actif' : 'non actif', u.active ? 'success' : 'danger'),
    },
    {
        Header: "Newsletter",
        Footer: "Newsletter",
        accessor: u => BadgeColored(u.newsletter ? 'Oui' : 'Non', u.newsletter ? 'success' : 'secondary'),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: u => DateFormatter(u.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: u => <UserAction user={u.email} userId={u.id}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_USER_URL = '/api/users';

    constructor(props) {
        super(props);
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            users: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getUsers(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.users;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getUsers(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getUsers(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_USER_URL;

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.usersTotal / limit);
            this.setState({users: res.data.users})

            return this.state.users;
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
                            <CardTitle>Utilisateurs</CardTitle>
                            <ExportUsersButton/>
                            <br/><br/><br/>
                            <Paginated data={this.state.users != null ? this.state.users : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
