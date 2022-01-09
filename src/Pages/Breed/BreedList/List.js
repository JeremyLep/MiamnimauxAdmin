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
        accessor: b => <b><Link to={`/races/${b.id}/profile/edition`}>{b.id}</Link></b>,
    },
    {
        Header: "Espece",
        Footer: "Espece",
        accessor: b => b.animal ? <Link to={`/especes/${b.animal.id}/profile/edition`}>{b.animal.name}</Link> : '',
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: 'name',
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: b => DateFormatter(b.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_BREEDS_URL   = '/api/breeds';

    constructor(props) {
        super(props);
        this.loading   = false;
        this.pageCount = 0;
        this.state     = {
            breeds: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getBreeds(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.breeds;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getBreeds(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getBreeds(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_BREEDS_URL;

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.breedsTotal / limit);
            this.setState({breeds: res.data.breeds})

            return this.state.breeds;
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
                            <CardTitle>Races</CardTitle>
                            <Paginated data={this.state.breeds != null ? this.state.breeds : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}