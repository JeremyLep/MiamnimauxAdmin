import React, {Fragment} from 'react';

import {
    DropdownToggle, DropdownMenu,
    Nav, NavItem, NavLink, UncontrolledButtonDropdown
} from 'reactstrap';

import {faEllipsisV} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {getToken} from "../../Security/Security";
import axios from "axios";
import {toast} from "react-toastify";

class UserAction extends React.Component {
    static ANONYMIZE_URL  = '/api/user';

    constructor(props) {
        super(props);
        this.state = {};
    }

    anonymizeUser(userId) {
        axios({
            method: 'POST',
            url: process.env.REACT_APP_API_URI + UserAction.ANONYMIZE_URL + '/' + userId,
            headers: {
                "Authorization": "Bearer " + getToken().token,
                "Content-Type": "application/json",
            }
        }).then(res => {
            toast['success']('L\'anonymisation s\'est bien effectuée !')
        }).catch(error => {
            console.log(error.response.data);
            if (error.response) {
                toast['error']('Une erreur s\'est produite: <br/>' + error.response.data.errors.errors.join(' | '));
            } else if (error.request) {
                toast['error']('Une erreur s\'est produite lors de l`envoie de la requête');
            } else {
                toast['error']('Une erreur s\'est produite');
            }
        });
    }

    render() {
        let personificationUrl = process.env.REACT_APP_FRONT_URI + '/impersonate/' + getToken().token + '/' + this.props.user;
        let userId = this.props.userId;
        console.log(userId);

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
                                            <NavItem>
                                                <button className={'dropdown-item'} onClick={() => this.anonymizeUser(userId)}>
                                                    Anonymiser
                                                </button>
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