import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    Row, Col,
    Card, CardBody,
    CardTitle
} from 'reactstrap';

import PageTitle from '../../../Layout/AppMain/PageTitle';

import List from './List';

export default class UserList extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            user: []
        };
    }

    render() {
        return (
            <Fragment>
                <PageTitle
                    heading="Liste des utilisateurs"
                    subheading=""
                    icon="pe-7s-drawer icon-gradient bg-happy-itmeo"
                    addLink="/utilisateurs/nouveau"
                />
                <ReactCSSTransitionGroup
                    component="div"
                    transitionName="TabsAnimation"
                    transitionAppear={true}
                    transitionAppearTimeout={0}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <Row>
                        <Col lg="12">
                            <Card className="main-card mb-3">
                                <CardBody>
                                    <CardTitle>Utilisateurs</CardTitle>
                                    <List {...this.props}/>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
};
