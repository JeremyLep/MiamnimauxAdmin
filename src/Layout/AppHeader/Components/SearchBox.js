import React, {Fragment} from 'react';
import cx from 'classnames';
import { withRouter } from "react-router-dom";
import AsyncSelect from "react-select/async";
import axios from "axios";
import {getToken} from "../../../Security/Security";

const filterSearch = async (inputValue) => {
    let result = [];

    await axios({
        method: 'GET',
        url: `${process.env.REACT_APP_API_URI}${SearchBox.SEARCH_ALL_URL}${inputValue}`,
        headers: {
            "Authorization": "Bearer " + getToken().token,
            "Content-Type": "application/json",
        }
    }).then(res => {
        result = (res.data.map(function(search){
            search.label = formatOptionLabel(search.label, search.name)

            return search;
        }));
    }).catch(error => {
        console.log(error)
    });

    return result;
};

const formatOptionLabel = (label, name) => {
    let res = '';

    if (name === 'product') {
        res = '<span class="mr-2 badge badge-pill badge-success">Produit</span>';
    } else if (name === 'user') {
        res = '<span class="mr-2 badge badge-pill badge-primary">Utilisateur</span>';
    } else if (name === 'subscription') {
        res = '<span class="mr-2 badge badge-pill badge-secondary">Abonnement</span>';
    } else if (name === 'formula') {
        res = '<span class="mr-2 badge badge-pill badge-info">Formule</span>';
    } else if (name === 'pet') {
        res = '<span class="mr-2 badge badge-pill badge-warning">Animal</span>';
    } else if (name === 'order') {
        res = '<span class="mr-2 badge badge-pill badge-dark">Commande</span>';
    } else if (name === 'payment') {
        res = '<span class="mr-2 badge badge-pill badge-danger">Paiement</span>';
    } else if (name === 'promo_code') {
        res = '<span class="mr-2 badge badge-pill badge-focus">Code Promo</span>';
    } else if (name === 'coupon') {
        res = '<span class="mr-2 badge badge-pill badge-alternate">Coupon</span>';
    } else if (name === 'invoice') {
        res = '<span class="mr-2 badge badge-pill badge-danger">Facture</span>';
    }

    return <span dangerouslySetInnerHTML={{ __html: res + label }} />;
}

const loadOptions = (inputValue, callback) => {
    if (inputValue.length < 4) {
        return [];
    }

    setTimeout(async () => {
        callback(await filterSearch(inputValue));
    }, 1000);
};

class SearchBox extends React.Component {
    static SEARCH_ALL_URL = '/api/search/';

    customStyle = {
        container: base => ({...base, paddingRight: '0!important', margin: -10}),
        input: base => ({...base, color: 'white'}),
        menuPortal: base => ({ ...base, zIndex: 9999 }),
        indicatorsContainer: base => ({ ...base, display: 'none'}),
        control: base => ({ ...base, background: 'inherit', border: 0, boxShadow: 'none'}),
    };

    constructor(props) {
        super(props);

        this.state = {
            activeSearch: false
        };

        this.redirectLink = this.redirectLink.bind(this);
    }

    redirectLink(event) {
        if (event.name === 'price') {
            this.props.history.push('/prix/' + event.value + '/profile/edition');
        } else if (event.name === 'user') {
            this.props.history.push('/utilisateurs/' + event.value + '/profile/edition');
        } else if (event.name === 'subscription') {
            this.props.history.push('/abonnements/' + event.value + '/profile/edition');
        } else if (event.name === 'formula') {
            this.props.history.push('/formules/' + event.value + '/profile/edition');
        } else if (event.name === 'pet') {
            this.props.history.push('/animaux/' + event.value + '/profile/edition');
        } else if (event.name === 'order') {
            this.props.history.push('/commandes/' + event.value + '/profile/edition');
        } else if (event.name === 'payment') {
            this.props.history.push('/paiements/' + event.value + '/profile/edition');
        } else if (event.name === 'promo_code') {
            this.props.history.push('/code-promo/' + event.value + '/profile/edition');
        } else if (event.name === 'coupon') {
            this.props.history.push('/coupons/' + event.value + '/profile/edition');
        } else if (event.name === 'invoice') {
            this.props.history.push('/factures/' + event.value + '/profile/edition');
        }
    }

    render() {
        return (
            <Fragment>
                <div className={cx("search-wrapper", {
                    'active': this.state.activeSearch
                })}>
                    <div className="input-holder">
                        <AsyncSelect name="search"
                                     cacheOptions
                                     defaultOptions
                                     onChange={this.redirectLink}
                                     loadOptions={loadOptions}
                                     className="basic-multi-select search-input"
                                     menuPortalTarget={document.body}
                                     styles={this.customStyle}
                                     classNamePrefix="select">
                        </AsyncSelect>
                        <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})}
                                className="search-icon"><span/></button>
                    </div>
                    <button onClick={() => this.setState({activeSearch: !this.state.activeSearch})} className="close"/>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(SearchBox);