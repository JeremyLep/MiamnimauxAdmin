import React, {Fragment} from 'react';

import {
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink, UncontrolledButtonDropdown
} from 'reactstrap';

import {getToken} from "../../../Security/Security";

import {faAngleDown} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class UserBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
        };
    }

    render() {
        let user = getToken();
        return (
            <Fragment>
                <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                        <div className="widget-content-wrapper">
                            <div className="widget-content-left">
                                <UncontrolledButtonDropdown>
                                    <DropdownToggle color="link" className="p-0">
                                        <img width={42} className="rounded-circle" src={''} alt=""/>
                                        <FontAwesomeIcon className="ml-2 opacity-8" icon={faAngleDown}/>
                                    </DropdownToggle>
                                    <DropdownMenu right className="rm-pointers dropdown-menu-lg">
                                        <Nav vertical>
                                            <NavItem>
                                                <NavLink href='/#/logout'>
                                                    Deconnexion
                                                </NavLink>
                                            </NavItem>
                                        </Nav>
                                    </DropdownMenu>
                                </UncontrolledButtonDropdown>
                            </div>
                            <div className="widget-content-left  ml-3 header-user-info">
                                <div className="widget-heading">
                                    {user.name}
                                </div>
                                <div className="widget-subheading">
                                    Role: {user.roles.includes('ROLE_ADMIN') ? 'Admin' : 'Manager' }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserBox;