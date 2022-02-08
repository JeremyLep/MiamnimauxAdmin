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
        accessor: p => <b><Link to={`/prix/${p.id}/profile/edition`}>{p.id}</Link></b>,
    },
    {
        Header: "Espece",
        Footer: "Espece",
        accessor: p => <Link to={`/especes/${p.animal_type.id}/profile/edition`}>{p.animal_type.name}</Link>,
    },
    {
        Header: "Formule",
        Footer: "Formule",
        accessor: p => <Link to={`/formules/${p.formula.id}/profile/edition`}>{p.formula.name}</Link>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: "name",
    },
    {
        Header: "Prix",
        Footer: "Prix",
        accessor: p => `${p.price}€`,
    },
    {
        Header: "Poids",
        Footer: "Poids",
        accessor: p => `${p.kg_min}kg à ${p.kg_max}kg`
    },
    {
        Header: "Activité",
        Footer: "Activité",
        accessor: p => p.activity === 1 ? 'peu actif' : p.activity === 2 ? 'actif' : 'très actif'
    },
    {
        Header: "Stérilisé",
        Footer: "Stérilisé",
        accessor: p => BadgeColored(p.neutered ? 'Oui' : 'Non', 'success'),
    },
    {
        Header: "Grammes / Kcal",
        Footer: "Grammes / Kcal",
        accessor: p => p.grams + 'gr / ' + p.kcal + 'kcal',
    },
    {
        Header: "Actif",
        Footer: "Actif",
        accessor: p => BadgeColored(p.active ? 'Oui' : 'Non', p.active ? 'success' : 'danger'),
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: "stripe_price_id",
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: p => DateFormatter(p.created_date),
    }
];

export default class List extends React.Component
{
    static GET_ALL_PRICES_URL   = '/api/prices';
    static GET_ORDER_PRICES_URL = '/api/price/order/';
    static GET_SUB_PRICES_URL   = '/api/price/subscription/selected/';

    constructor(props) {
        super(props);
        this.orderId        = props.match ? props.match.params.orderId : null;
        this.subscriptionId = props.match ? props.match.params.subscriptionId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            prices: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getPrices(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.prices;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getPrices(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getPrices(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_PRICES_URL;

        if (typeof this.orderId !== 'undefined' && this.orderId !== null) {
            url = List.GET_ORDER_PRICES_URL + this.orderId;
        } else if (typeof this.subscriptionId !== 'undefined' && this.subscriptionId !== null) {
            url = List.GET_SUB_PRICES_URL + this.subscriptionId;
        }

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.pricesTotal / limit);
            this.setState({prices: res.data.prices})

            return this.state.prices;
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
                            <CardTitle>Prix</CardTitle>
                            <Paginated data={this.state.prices != null ? this.state.prices : null} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
