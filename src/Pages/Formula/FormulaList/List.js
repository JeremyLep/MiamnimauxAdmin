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
        accessor: f => <b><Link to={`/formules/${f.id}/profile/edition`}>{f.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: "name",
    },
    {
        Header: "Nb plats",
        Footer: "Nb plats",
        accessor: 'nb_dishes'
    },
    {
        Header: "Symbol",
        Footer: "Symbol",
        accessor: f => f.symbol
    },
    {
        Header: "Interval recurrence",
        Footer: "Interval recurrence",
        accessor: f => `${f.recurring_interval} mois`,
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: s => DateFormatter(s.created_date),
    }
];

export default class List extends React.Component
{
    static GET_ALL_FORMULAS_URL   = '/api/formulas';
    static GET_ORDER_FORMULAS_URL = '/api/formula/order/';
    static GET_SUB_FORMULAS_URL   = '/api/formula/subscription/';

    constructor(props) {
        super(props);
        this.orderId        = props.match ? props.match.params.orderId : null;
        this.subscriptionId = props.match ? props.match.params.subscriptionId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            formulas: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getFormulas(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.formulas;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getFormulas(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getFormulas(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_FORMULAS_URL;

        if (typeof this.orderId !== 'undefined' && this.orderId !== null) {
            url = List.GET_ORDER_FORMULAS_URL + this.orderId;
        } else if (typeof this.subscriptionId !== 'undefined' && this.subscriptionId !== null) {
            url = List.GET_SUB_FORMULAS_URL + this.subscriptionId;
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
            this.pageCount = Math.ceil(res.data.formulasTotal / limit);
            this.setState({formulas: res.data.formulas})

            return this.state.formulas;
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
                            <CardTitle>Formules</CardTitle>
                            <Paginated data={this.state.formulas != null ? this.state.formulas : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
