import React, {Fragment} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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
                        <List {...this.props}/>
                </ReactCSSTransitionGroup>
            </Fragment>
        );
    }
};
