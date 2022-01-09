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
        accessor: c => <b><Link to={`/coupons/${c.id}/profile/edition`}>{c.id}</Link></b>,
    },
    {
        Header: "Nom",
        Footer: "Nom",
        accessor: "name"
    },
    {
        Header: "Code",
        Footer: "Code",
        accessor: c => BadgeColored(c.code, 'info')
    },
    {
        Header: "Description",
        Footer: "Description",
        accessor: "description"
    },
    {
        Header: "Durée",
        Footer: "Durée",
        accessor: "duration"
    },
    {
        Header: "Durée en mois",
        Footer: "Durée en mois",
        accessor: "duration_month"
    },
    {
        Header: "Discount prix",
        Footer: "Discount prix",
        accessor: c => `${c.discount}€`
    },
    {
        Header: "Discount pourcent",
        Footer: "Discount pourcent",
        accessor: c => `${c.percent}%`
    },
    {
        Header: "Date d'expiration",
        Footer: "Date d'expiration",
        accessor: c => DateFormatter(c.expired_date)
    },
    {
        Header: "Utilisation max",
        Footer: "Utilisation max",
        accessor: "max_redeem"
    },
    {
        Header: "Nombre d'utilisation",
        Footer: "Nombre d'utilisation",
        accessor: "redeem_nb"
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: 'stripe_coupon',
    },
    {
        Header: "Valide",
        Footer: "Valide",
        accessor: c => BadgeColored(c.valid ? 'valide' : 'non valide', 'success'),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: c => DateFormatter(c.created_date),
    },
    {
        Header: "Action",
        Footer: "Action",
        accessor: () => <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
    }
];

export default class List extends React.Component
{
    static GET_ALL_COUPON_URL   = '/api/coupons';

    constructor(props) {
        super(props);
        this.loading = false;
        this.pageCount = 0;
        this.state = {
            coupons: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getCoupons(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.coupons;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getCoupons(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getCoupons(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_COUPON_URL;

        url += '?limit=' + limit + '&offset=' + offset + '&query=' + value;

        axios({
            method: 'get',
            url: `${process.env.REACT_APP_API_URI}${url}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.pageCount = Math.ceil(res.data.couponsTotal / limit);
            this.setState({coupons: res.data.coupons})

            return this.state.coupons;
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
                            <CardTitle>Coupons</CardTitle>
                            <Paginated data={this.state.coupons != null ? this.state.coupons : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
