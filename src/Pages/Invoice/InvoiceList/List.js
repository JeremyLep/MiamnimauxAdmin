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

import {Paginated, DateFormatter, BadgeColored} from "../../Components/Paginated";
import {getToken} from "../../../Security/Security";

const column = [
    {
        Header: "#",
        Footer: "#",
        accessor: i => <b><Link to={`/factures/${i.id}/profile/edition`}>{i.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: i => <Link to={`/utilisateurs/${i.user.id}/profile/edition`}>{i.user.firstname} {i.user.lastname}<br/>{i.user.email}</Link>,
    },
    {
        Header: "Montant",
        Footer: "Montant",
        accessor: i => `${i.amount}€`,
    },
    {
        Header: "Statut",
        Footer: "Statut",
        accessor: i => BadgeColored(i.status === 'paid' ? 'Payé' : (i.status === 'pending' ? 'En attente' : 'Brouillon'), 'success'),
    },
    {
        Header: "Commandes",
        Footer: "Commandes",
        accessor: i => <Link to={`/commandes/${i.order.id}/profile/edition`}>{i.order ? i.order.id : ''}</Link>
    },
    {
        Header: "Avoir",
        Footer: "Avoir",
        accessor: i => <Link to={`/factures/${i.credit_note ? i.credit_note.id : ''}/profile/edition`}>{i.credit_note ? i.credit_note.id : ''}</Link>
    },
    {
        Header: "Paiement",
        Footer: "Paiement",
        accessor: i => <Link to={`/paiements/${i.payment ? i.payment.id : ''}/profile/edition`}>{i.payment ? i.payment.id : ''}</Link>
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: 'delivery_date',
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
    static GET_ALL_INVOICES_URL   = '/api/invoices';
    static GET_USER_INVOICES_URL  = '/api/invoice/user/';
    static GET_ORDER_INVOICES_URL = '/api/invoice/order/';

    constructor(props) {
        super(props);
        this.userId  = props.match ? props.match.params.userId : null;
        this.orderId = props.match ? props.match.params.orderId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state   = {
            invoices: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getInvoices(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.invoices;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getInvoices(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getInvoices(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_INVOICES_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_INVOICES_URL + this.userId;
        } else if (typeof this.orderId !== 'undefined' && this.orderId !== null) {
            url = List.GET_ORDER_INVOICES_URL + this.orderId;
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
            this.pageCount = Math.ceil(res.data.invoicesTotal / limit);
            this.setState({invoices: res.data.invoices})

            return this.state.invoices;
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
                            <CardTitle>Factures</CardTitle>
                            <Paginated data={this.state.invoices != null ? this.state.invoices : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}