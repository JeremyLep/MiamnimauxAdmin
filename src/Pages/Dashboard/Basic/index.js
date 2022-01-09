import React, {Component, Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import {
    Row, Col,
    Button,
    CardHeader,
    Card,
    CardBody,
    Progress
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import {
    AreaChart, Area, Line,
    ResponsiveContainer,
    Bar,
    BarChart,
    Tooltip,
    LineChart
} from 'recharts';
import axios from "axios";
import {getToken} from "../../../Security/Security";
import XAxis from "recharts/lib/cartesian/XAxis";


export default class AnalyticsDashboard extends Component
{
    static GET_STATS_URL = '/api/stats';

    constructor() {
        super();

        this.state = {
            stats: {}
        };
    }

    getStats() {
        axios({
            method: 'GET',
            url: `${process.env.REACT_APP_API_URI}${AnalyticsDashboard.GET_STATS_URL}`,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            this.setState({stats: res.data})

            return this.state.diseases;
        }).catch(error => {
            if (error.response.status === 401) {
                this.props.history.push('/logout');
            } else if (error.response.status === 403) {
                this.props.history.goBack();
            }
        });
    };

    componentDidMount() {
        this.getStats();
    }

    render() {
        return (
            <Fragment>
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div>
                        <PageTitle
                            heading="Tableau de bord"
                            subheading="Visualisation des statistiques en temps réel"
                            icon="pe-7s-car icon-gradient bg-mean-fruit"
                        />
                        <Row>
                            <Col lg="6">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-primary"/>
                                            <i className="lnr-cog text-primary"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.caMonth !== 'undefined' ? this.state.stats.caMonth.total : 0}€
                                        </div>
                                        <div className="widget-subheading">
                                            Total CA
                                        </div>
                                    </div>
                                    <div className="widget-chart-wrapper chart-wrapper-relative">
                                        <ResponsiveContainer height={100}>
                                            <LineChart data={typeof this.state.stats.caMonth !== 'undefined' ? this.state.stats.caMonth.month : [{}]}
                                                       margin={{top: 5, right: 5, left: 5, bottom: 0}}>
                                                <XAxis dataKey="month" />
                                                <Tooltip />
                                                <Line type='monotone' name={"Montant"} dataKey='amount' stroke='#3ac47d' strokeWidth={3}/>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Col>
                            <Col lg="6">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-danger"/>
                                            <i className="lnr-laptop-phone text-danger"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.ordersMonth !== 'undefined' ? this.state.stats.ordersMonth.total : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Total commandes
                                        </div>
                                    </div>
                                    <div className="widget-chart-wrapper chart-wrapper-relative">
                                        <ResponsiveContainer height={100}>
                                            <BarChart data={typeof this.state.stats.ordersMonth !== 'undefined' ? this.state.stats.ordersMonth.month : [{}]}>
                                                <XAxis dataKey="month" />
                                                <Tooltip />
                                                <Bar dataKey='amount' name={'Nombre'} fill='#81a4ff' stroke='#3f6ad8' strokeWidth={3}/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12" lg="9">
                                <Card className="mb-3">
                                    <CardHeader className="card-header-tab">
                                        <div className="card-header-title">
                                            <i className="header-icon lnr-rocket icon-gradient bg-tempting-azure"> </i>
                                            Abonnements
                                        </div>
                                    </CardHeader>
                                    <CardBody className="pt-2">
                                        <Row className="mt-3">
                                            <Col md="4">
                                                <div className="widget-content">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-numbers fsize-3 text-muted">
                                                                    {typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.running, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)).toFixed(2) : 0}%
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="text-muted opacity-6">
                                                                    Abonnements en cours
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper mt-1">
                                                            <Progress
                                                                className="progress-bar-sm progress-bar-animated-alt"
                                                                color="danger"
                                                                value={typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.running, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)).toFixed(2) : 0}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="widget-content">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-numbers fsize-3 text-muted">
                                                                    {typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.paused, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)).toFixed(2) : 0}%
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="text-muted opacity-6">
                                                                    Abonnements en pause
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper mt-1">
                                                            <Progress
                                                                className="progress-bar-sm progress-bar-animated-alt"
                                                                color="success"
                                                                value={typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.paused, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)).toFixed(2) : 0}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                            <Col md="4">
                                                <div className="widget-content">
                                                    <div className="widget-content-outer">
                                                        <div className="widget-content-wrapper">
                                                            <div className="widget-content-left mr-3">
                                                                <div className="widget-numbers fsize-3 text-muted">
                                                                    {typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.cancelled, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)).toFixed(2) : 0}%
                                                                </div>
                                                            </div>
                                                            <div className="widget-content-right">
                                                                <div className="text-muted opacity-6">
                                                                    Abonnements annulés
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="widget-progress-wrapper mt-1">
                                                            <Progress
                                                                className="progress-bar-sm progress-bar-animated-alt"
                                                                color="primary"
                                                                value={typeof this.state.stats.subStats !== 'undefined' ? ((parseInt(this.state.stats.subStats.all_sub.cancelled, 10) * 100) / parseInt(this.state.stats.subStats.all_sub.total, 10)) : 0}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="divider mt-4"/>
                                    </CardBody>
                                    <div className="widget-chart p-0">
                                        <div className="widget-chart-content">
                                            <div className="widget-description mt-0 text-warning">
                                                <span className="text-muted opacity-8 pl-1">Abonnements par formules</span>
                                            </div>
                                        </div>
                                        <ResponsiveContainer height={180}>
                                            <BarChart data={typeof this.state.stats.subStats !== 'undefined' ? this.state.stats.subStats.formula : [{'name': '', 'sub_number_running': 0, 'sub_number_paused': 0, 'sub_number_cancelled': 0}]} margin={{top: 10, right: 10, left: 10, bottom: 10}}>
                                                <XAxis dataKey="name" />
                                                <Tooltip/>
                                                <Bar name="En cours" dataKey='sub_number_running' fill="#c71c22"/>
                                                <Bar name="En pause" dataKey='sub_number_paused' fill="#73a839"/>
                                                <Bar name="Annulé" dataKey='sub_number_cancelled' fill="#033c73"/>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </Col>
                            <Col md="3">
                                <Row>
                                    <Col md="12">
                                        <div className="card mb-3 widget-chart card-hover-shadow-2x">
                                            <div className="icon-wrapper border-light rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-10"/>
                                                <i className="lnr-laptop-phone icon-gradient bg-arielle-smile"/>
                                            </div>
                                            <div className="widget-numbers">
                                                {typeof this.state.stats.subStats !== 'undefined' ? this.state.stats.subStats.all_sub.total : 0}
                                            </div>
                                            <div className="widget-subheading">
                                                Nombre d'abonnements totals
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md="12">
                                        <div className="card mb-3 widget-chart card-hover-shadow-2x">
                                            <div className="icon-wrapper border-light rounded">
                                                <div className="icon-wrapper-bg bg-white opacity-9"/>
                                                <i className="lnr-graduation-hat icon-gradient bg-happy-itmeo"/>
                                            </div>
                                            <div className="widget-numbers">
                                                {typeof this.state.stats.subStats !== 'undefined' ? this.state.stats.subStats.all_sub.running : 0}
                                            </div>
                                            <div className="widget-subheading">
                                                Nombre d'abonnements en cours
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="3">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-primary"/>
                                            <i className="lnr-cog text-primary"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.userStats !== 'undefined' ? this.state.stats.userStats.total_new : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Nouveaux utilisateurs (dernier mois)
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-primary"/>
                                            <i className="lnr-cog text-primary"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.userStats !== 'undefined' ? this.state.stats.userStats.total_new_client : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Nouveaux client (1 commandes)
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="6">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-success"/>
                                            <i className="lnr-screen text-success"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.userStats !== 'undefined' ? this.state.stats.userStats.total : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Total utilisateurs
                                        </div>
                                    </div>
                                    <div className="widget-chart-wrapper">
                                        <ResponsiveContainer width='100%' aspect={8.0 / 1.0}>
                                            <AreaChart data={typeof this.state.stats.userStats !== 'undefined' ? this.state.stats.userStats.month : [{'month': 0, 'num': 0, 'amount': 0}]}
                                                       margin={{top: 0, right: 0, left: 0, bottom: 0}}>
                                                <Area type='monotoneX' dataKey='amount' stroke='#fd7e14' fill='#ffb87d'/>
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={9}>
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-warning"/>
                                            <i className="lnr-heart icon-gradient bg-premium-dark"> </i>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.petsStats !== 'undefined' ? this.state.stats.petsStats.all_pets : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Total animaux
                                        </div>
                                    </div>
                                </div>
                            </Col>
                            <Col md="3">
                                <div className="card mb-3 widget-chart">
                                    <div className="widget-chart-content">
                                        <div className="icon-wrapper rounded-circle">
                                            <div className="icon-wrapper-bg bg-primary"/>
                                            <i className="lnr-cog text-primary"/>
                                        </div>
                                        <div className="widget-numbers">
                                            {typeof this.state.stats.petsStats !== 'undefined' ? this.state.stats.petsStats.new_pets : 0}
                                        </div>
                                        <div className="widget-subheading">
                                            Nouveaux animaux
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </ReactCSSTransitionGroup>
            </Fragment>
        )
    }
}
