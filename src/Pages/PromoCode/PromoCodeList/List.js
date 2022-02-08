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
        accessor: p => <b><Link to={`/code-promo/${p.id}/profile/edition`}>{p.id}</Link></b>,
    },
    {
        Header: "Utilisateur",
        Footer: "Utilisateur",
        accessor: p => p.user ? <Link to={`/utilisateurs/${p.user.id}/profile/edition`}>{p.user.firstname} {p.user.lastname}<br/>{p.user.email}</Link> : '',
    },
    {
        Header: "Coupon",
        Footer: "Coupon",
        accessor: p => <Link to={`/coupons/${p.coupon.id}/profile/edition`}>{p.coupon.name}</Link>,
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
        Header: "Date d'expiration",
        Footer: "Date d'expiration",
        accessor: p => DateFormatter(p.expired_date)
    },
    {
        Header: "Utilisé",
        Footer: "Utilisé",
        accessor: p => BadgeColored(p.used ? 'utilisé' : 'non utilisé', 'success'),
    },
    {
        Header: "Date d'utilistion",
        Footer: "Date d'utilistion",
        accessor: p => DateFormatter(p.used_date),
    },
    {
        Header: "Code apporteur",
        Footer: "Code apporteur",
        accessor: p => BadgeColored(p.apporteur_code ? p.apporteur_code : '', 'info'),
    },
    {
        Header: "Actif",
        Footer: "Actif",
        accessor: p => BadgeColored(p.active ? 'actif' : 'non actif', 'success'),
    },
    {
        Header: "Date de création",
        Footer: "Date de création",
        accessor: p => DateFormatter(p.created_date),
    },
    {
        Header: "Stripe Id",
        Footer: "Stripe Id",
        accessor: 'stripe_promo_code',
    }
];

export default class List extends React.Component
{
    static GET_ALL_PROMOCODE_URL    = '/api/promo-codes';
    static GET_COUPON_PROMOCODE_URL = '/api/promo-codes/coupon/';

    constructor(props) {
        super(props);
        this.couponId = props.match ? props.match.params.couponId : null;
        this.loading = false;
        this.pageCount = 0;
        this.state       = {
            promoCodes: []
        }

        this.fetchData    = this.fetchData.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    fetchData(req) {
        this.loading = true;
        this.getPromoCodes(req.pageSize, req.pageIndex * req.pageSize);
        this.loading = false;

        return this.state.promoCodes;
    }

    handleSearch(pageIndex, pageSize, value) {
        if (value.length < 3 && value.length !== 0) {
            return null;
        }

        this.loading = true;
        this.getPromoCodes(pageSize, pageIndex * pageSize, value);
        this.loading = false;
    }

    getPromoCodes(limit = 10, offset = 0, value = '') {
        let url = List.GET_ALL_PROMOCODE_URL;

        if (typeof this.couponId !== 'undefined' && this.couponId !== null) {
            url = List.GET_COUPON_PROMOCODE_URL + this.couponId;
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
            this.pageCount = Math.ceil(res.data.promoCodesTotal / limit);
            this.setState({promoCodes: res.data.promoCodes})

            return this.state.promoCodes;
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
                            <CardTitle>Codes promotionnels</CardTitle>
                            <Paginated data={this.state.promoCodes != null ? this.state.promoCodes : []} columns={column} fetchData={this.fetchData} loading={this.loading} pageCount={this.pageCount} handleSearch={this.handleSearch}/>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        );
    }
}
