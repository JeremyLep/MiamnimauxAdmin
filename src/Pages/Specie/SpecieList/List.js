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
        accessor: e => <b><Link to={`/especes/${e.id}/profile/edition`}>{e.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: 'name',
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: e => DateFormatter(e.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_SPECIES_URL = '/api/species';

    constructor(props) {
        super(props);
        this.petId   = props.match ? props.match.params.petId : null;
        this.priceId = props.match ? props.match.params.priceId : null;
        this.loading   = false;
        this.pageCount = 0;
        this.state     = {
            species: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getSpecies(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.species;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getSpecies(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getSpecies(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_SPECIES_URL;

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.speciesTotal / limit);
            this.setState({species: res.data.species})

            return this.state.species;
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
                            <Paginated data={this.state.species != null ? this.state.species : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}