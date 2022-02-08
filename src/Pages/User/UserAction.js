import React, {Fragment} from 'react';

import {
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink, UncontrolledButtonDropdown
} from 'reactstrap';

import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getToken} from "../../Security/Security";

class UserAction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        let personificationUrl = process.env.REACT_APP_FRONT_URI + '/impersonate/' + getToken().token + '/' + this.props.user;

        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <FontAwesomeIcon className={'text-center'} icon={faEllipsisV}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem>
                                                <a className={'dropdown-item'} href={personificationUrl}>
                                                    Personnifier
                                                </a>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserAction;