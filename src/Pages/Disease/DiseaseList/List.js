import React from 'react';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';
import axios from 'axios';
import { Link } from "react-router-dom";
import {Paginated, DateFormatter} from "../../Components/Paginated";
import {getToken} from "../../../Security/Security";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: i => <b><Link to={`/maladies/${i.id}/profile/edition`}>{i.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: 'name',
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: i => DateFormatter(i.created_date),
    }
];

export default class List extends React.Component
{
    static GET_ALL_DISEASES_URL   = '/api/diseases';

    constructor(props) {
        super(props);
        this.loading   = false;
        this.pageCount = 0;
        this.state     = {
            diseases: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getDiseases(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.diseases;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getDiseases(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getDiseases(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_DISEASES_URL;

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.diseasesTotal / limit);
            this.setState({diseases: res.data.diseases})

            return this.state.diseases;
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
                            <CardTitle>Maladies</CardTitle>
                            <Paginated data={this.state.diseases != null ? this.state.diseases : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}