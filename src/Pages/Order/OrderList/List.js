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
import ExportOrdersButton from "../../Components/ExportOrdersButton";
import OrderAction from "../OrderAction";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: o => <b><Link to={`/commandes/${o.id}/profile/edition`}>{o.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: o => <Link to={`/utilisateurs/${o.user.id}/profile/edition`}>{o.user.firstname} {o.user.lastname}<br/>{o.user.email}</Link>,
    },
    {
        Header: "Animal",
        Footer: "Animal",
        accessor: o => <Link to={`/animaux/${o.pet.id}/profile/edition`}>{o.pet.name}</Link>,
    },
    {
        Header: "Abonnement",
        Footer: "Abonnement",
        accessor: o => <Link to={`/abonnements/${o.subscription ? o.subscription.id : ''}/profile/edition`}>Abonnement {o.subscription ? o.subscription.price.formula.name : ''}</Link>,
    },
    {
        Header: "Prix",
        Footer: "Prix",
        accessor: o => `${o.price}€`,
    },
    {
        Header: "Nb plats",
        Footer: "Nb plats",
        accessor: o => `${o.nb_dishes}`,
    },
    {
        Header: "Livraison prévue",
        Footer: "Livraison prévue",
        accessor: o => DateFormatter(o.expected_delivery_date)
    },
    {
        Header: "Grammes",
        Footer: "Grammes",
        accessor: o => `${o.grams}gr`
    },
    {
        Header: "N° de suivi",
        Footer: "N° de suivi",
        accessor: 'tracking_number'
    },
    {
        Header: "Facture",
        Footer: "Facture",
        accessor: o => <Link to={`/factures/${o.invoice ? o.invoice.id : ''}/profile/edition`}>{o.invoice ? o.invoice.id : ''}</Link>
    },
    {
        Header: "Livraison",
        Footer: "Livraison",
        accessor: o => DateFormatter(o.delivery_date),
    },
    {
        Header: "Statut",
        Footer: "Statut",
        accessor: o => BadgeColored(o.status, o.status === 'validated' ? 'success' :
            (o.status === 'in_preparation' ? 'secondary' :
                (o.status === 'sent' ? 'alt' :
                    (o.status === 'delivered' ? 'info' :
                        (o.status === 'cancelled' ? 'danger' : 'primary')
                    )
                )
            )
        ),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: o => DateFormatter(o.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: (o) => <OrderAction order_id={o.id} shipped={!!o.tracking_number}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_ORDERS_URL  = '/api/orders';
    static GET_USER_ORDERS_URL = '/api/order/user/';
    static GET_SUB_ORDERS_URL  = '/api/order/subscription/';

    constructor(props) {
        super(props);
        this.userId         = props.match ? props.match.params.userId : null;
        this.subscriptionId = props.match ? props.match.params.subscriptionId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            orders: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getOrders(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.orders;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getOrders(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getOrders(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_ORDERS_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_ORDERS_URL + this.userId;
        } else if (typeof this.subscriptionId !== 'undefined' && this.subscriptionId !== null) {
            url = List.GET_SUB_ORDERS_URL + this.subscriptionId;
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
            this.pageCount = Math.ceil(res.data.ordersTotal / limit);
            this.setState({orders: res.data.orders})

            return this.state.orders;
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
                            <CardTitle>Commandes</CardTitle>
                            <ExportOrdersButton/>
                            <br/><br/><br/>
                            <Paginated className={'pull-right'} data={this.state.orders != null ? this.state.orders : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}