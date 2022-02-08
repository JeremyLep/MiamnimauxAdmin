import React from 'react';

export default class IframePdf extends React.Component
{
    static ORDER_LABEL = '/public/order/label/';
    static ORDER_WAYBILL = '/public/waybill/';

    constructor(props) {
        super(props);
        let object = '';
        let url    = '';

        if (typeof props.match.params.orderId !== 'undefined') {
            object = props.match.params.orderId
        }

        if (props.location.pathname.includes('bordereau')) {
            url = IframePdf.ORDER_WAYBILL;
        } else if (props.location.pathname.includes('etiquette')) {
            url = IframePdf.ORDER_LABEL;
        }

        this.state = {
            object: object,
            url: url
        };
    }

    render() {
        return (
            <embed src={process.env.REACT_APP_API_URI + this.state.url + this.state.object} className={'w-100 h-100'} type="application/pdf"/>
        );
    }
}