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
        accessor: a => <b><Link to={`/aliments/${a.id}/profile/edition`}>{a.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: 'name',
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: a => DateFormatter(a.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_ALIMENTS_URL     = '/api/aliments';
    static GET_PLAT_ALIMENTS_URL   = '/api/aliment/plats/';

    constructor(props) {
        super(props);
        this.platId   = props.match ? props.match.params.platId : null;
        this.loading   = false;
        this.pageCount = 0;
        this.state     = {
            aliments: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getAliments(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.aliments;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getAliments(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getAliments(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_ALIMENTS_URL;

        if (typeof this.platId !== 'undefined' && this.platId !== null) {
            url = List.GET_PLAT_ALIMENTS_URL + this.platId;
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
            this.pageCount = Math.ceil(res.data.alimentsTotal / limit);
            this.setState({aliments: res.data.aliments})

            return this.state.aliments;
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
                            <CardTitle>Aliments</CardTitle>
                            <Paginated data={this.state.aliments != null ? this.state.aliments : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}