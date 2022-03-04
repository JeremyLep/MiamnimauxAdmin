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
        accessor: d => <b><Link to={`/recettes/${d.id}/profile/edition`}>{d.id}</Link></b>,
    },
    {
        Header: "Espece",
        Footer: "Espece",
        accessor: d => <Link to={`/especes/${d.animal_type.id}/profile/edition`}>{d.animal_type.name}</Link>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: "name",
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: c => DateFormatter(c.created_date),
    }
];

export default class List extends React.Component
{
    static GET_ALL_DISHES_URL = '/api/plats';
    static GET_ORDER_DISHES_URL = '/api/plats/order/';
    static GET_SUB_DISHES_URL = '/api/plats/subscription/';

    constructor(props) {
        super(props);
        this.orderId = props.match ? props.match.params.orderId : null;
        this.subscriptionId = props.match ? props.match.params.subscriptionId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            dishes: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getDishes(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.dishes;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getDishes(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getDishes(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_DISHES_URL;

        if (typeof this.orderId !== 'undefined' && this.orderId !== null) {
            url = List.GET_ORDER_DISHES_URL + this.orderId;
        } else if (typeof this.subscriptionId !== 'undefined' && this.subscriptionId !== null) {
            url = List.GET_SUB_DISHES_URL + this.subscriptionId;
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
            this.pageCount = Math.ceil(res.data.platsTotal / limit);
            this.setState({dishes: res.data.plats})

            return this.state.dishes;
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
                            <CardTitle>Recettes</CardTitle>
                            <Paginated data={this.state.dishes != null ? this.state.dishes : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
