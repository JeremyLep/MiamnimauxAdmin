import React, {Component, Fragment} from 'react';

import {faPlus} from '@fortawesome/free-solid-svg-icons';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {Link} from "react-router-dom";

export default class AddButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (typeof this.props.url === 'undefined') {
            return null;
        }

        return (
            <Fragment>
                <Link to={this.props.url} className="btn btn-outline-info mr-3" color={"white"}>
                    <FontAwesomeIcon className="mr-1" icon={faPlus}/> Ajouter un nouveau
                </Link>
            </Fragment>
        );
    }
}