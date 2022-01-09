import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {getToken} from "../../../Security/Security";

import {Paginated, DateFormatter, BadgeColored} from "../../Components/Paginated";

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
        Header: "Actif",
        Footer: "Actif",
        accessor: u => BadgeColored(u.active ? 'actif' : 'non actif', u.active ? 'success' : 'danger'),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: i => DateFormatter(i.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
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
            <Paginated data={this.state.users != null ? this.state.users : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
        );
    }
}
