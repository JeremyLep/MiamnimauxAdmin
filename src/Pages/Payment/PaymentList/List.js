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
        accessor: p => <b><Link to={`/paiements/${p.id}/profile/edition`}>{p.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: p => <Link to={`/utilisateurs/${p.user.id}/profile/edition`}>{p.user.firstname} {p.user.lastname}<br/>{p.user.email}</Link>,
    },
    {
        Header: "Facture",
        Footer: "Facture",
        accessor: p => p.invoice ? <Link to={`/factures/${p.invoice.id}/profile/edition`}>{p.invoice.id} ({p.invoice.amount}€)</Link> : ''
    },
    {
        Header: "Montant",
        Footer: "Montant",
        accessor: p => `${p.amount}€`,
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: p => <Link to={{pathname: `${p.stripe_receipt_url}`}} target="_blank">{p.stripe_payment_id}</Link>,
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: p => DateFormatter(p.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_PAYMENTS_URL     = '/api/payments';
    static GET_USER_PAYMENTS_URL    = '/api/payment/user/';
    static GET_INVOICE_PAYMENTS_URL = '/api/payment/invoice/';

    constructor(props) {
        super(props);
        this.userId    = props.match ? props.match.params.userId : null;
        this.invoiceId = props.match ? props.match.params.invoiceId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state   = {
            payments: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getPayments(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.payments;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getPayments(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getPayments(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_PAYMENTS_URL;

        if (typeof this.userId !== 'undefined' && this.userId !== null) {
            url = List.GET_USER_PAYMENTS_URL + this.userId;
        } else if (typeof this.invoiceId !== 'undefined' && this.invoiceId !== null) {
            url = List.GET_INVOICE_PAYMENTS_URL + this.invoiceId;
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
            this.pageCount = Math.ceil(res.data.paymentsTotal / limit);
            this.setState({payments: res.data.payments})

            return this.state.payments;
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
                            <CardTitle>Paiements</CardTitle>
                            <Paginated data={this.state.payments != null ? this.state.payments : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}