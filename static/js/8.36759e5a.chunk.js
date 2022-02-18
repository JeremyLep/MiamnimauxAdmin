webpackJsonp([8],{325:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n.n(a),o=n(6),i=(n.n(o),n(772)),s=n(773),u=n(774),c=n(775),l=n(18),p=n(19),m=function(e){var t=e.match;return r.a.createElement(a.Fragment,null,r.a.createElement(l.a,null),r.a.createElement("div",{className:"app-main"},r.a.createElement(p.a,null),r.a.createElement("div",{className:"app-main__outer"},r.a.createElement("div",{className:"app-main__inner"},r.a.createElement(o.Route,{path:""+t.url,component:c.a}),r.a.createElement(o.Route,{path:t.url+"/nouveau",component:u.a}),r.a.createElement(o.Route,{path:t.url+"/:paymentId/profile",component:i.a}),r.a.createElement(o.Route,{path:t.url+"/:paymentId/profile/edition",component:s.a})))))};t.default=m},443:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(2),c=(n.n(u),n(5)),l=n.n(c),p=n(6),m=(n.n(p),n(16)),h=n(1),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),d=[{Header:"#",Footer:"#",accessor:function(e){return s.a.createElement("b",null,s.a.createElement(p.Link,{to:"/paiements/"+e.id+"/profile/edition"},e.id))}},{Header:"Utilisateur",Footer:"Utilisateur",accessor:function(e){return s.a.createElement(p.Link,{to:"/utilisateurs/"+e.user.id+"/profile/edition"},e.user.firstname," ",e.user.lastname,s.a.createElement("br",null),e.user.email)}},{Header:"Facture",Footer:"Facture",accessor:function(e){return e.invoice?s.a.createElement(p.Link,{to:"/factures/"+e.invoice.id+"/profile/edition"},e.invoice.id," (",e.invoice.amount,"\u20ac)"):""}},{Header:"Montant",Footer:"Montant",accessor:function(e){return e.amount+"\u20ac"}},{Header:"Stripe Id",Footer:"Stripe Id",accessor:function(e){return s.a.createElement(p.Link,{to:{pathname:""+e.stripe_receipt_url},target:"_blank"},e.stripe_payment_id)}},{Header:"Date de cr\xe9ation",Footer:"Date de cr\xe9ation",accessor:function(e){return Object(m.b)(e.created_date)}}],y=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.userId=e.match?e.match.params.userId:null,n.invoiceId=e.match?e.match.params.invoiceId:null,n.loading=!1,n.pageCount=0,n.state={payments:[]},n.fetchData=n.fetchData.bind(n),n.handleSearch=n.handleSearch.bind(n),n}return o(t,e),f(t,[{key:"fetchData",value:function(e){return this.loading=!0,this.getPayments(e.pageSize,e.pageIndex*e.pageSize),this.loading=!1,this.state.payments}},{key:"handleSearch",value:function(e,t,n){if(n.length<3&&0!==n.length)return null;this.loading=!0,this.getPayments(t,e*t,n),this.loading=!1}},{key:"getPayments",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.GET_ALL_PAYMENTS_URL;"undefined"!==typeof this.userId&&null!==this.userId?o=t.GET_USER_PAYMENTS_URL+this.userId:"undefined"!==typeof this.invoiceId&&null!==this.invoiceId&&(o=t.GET_INVOICE_PAYMENTS_URL+this.invoiceId),o+="?limit="+e+"&offset="+a+"&query="+r,l()({method:"get",url:"https://testapi.miamnimaux.com"+o,headers:{Authorization:"Bearer "+Object(h.b)().token,"Content-Type":"application/json"}}).then(function(t){return n.pageCount=Math.ceil(t.data.paymentsTotal/e),n.setState({payments:t.data.payments}),n.state.payments}).catch(function(e){console.log(e),401===e.response.status?n.props.history.push("/logout"):403===e.response.status&&n.props.history.goBack()})}},{key:"render",value:function(){return s.a.createElement(u.Row,null,s.a.createElement(u.Col,{lg:"12"},s.a.createElement(u.Card,{className:"main-card mb-3"},s.a.createElement(u.CardBody,null,s.a.createElement(u.CardTitle,null,"Paiements"),s.a.createElement(m.c,{data:null!=this.state.payments?this.state.payments:[],columns:d,fetchData:this.fetchData,loading:this.loading,pageCount:this.pageCount,handleSearch:this.handleSearch})))))}}]),t}(s.a.Component);y.GET_ALL_PAYMENTS_URL="/api/payments",y.GET_USER_PAYMENTS_URL="/api/payment/user/",y.GET_INVOICE_PAYMENTS_URL="/api/payment/invoice/",t.a=y},772:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(5),c=n.n(u),l=n(4),p=n.n(l),m=n(2),h=(n.n(m),n(6)),f=(n.n(h),n(1)),d=n(7),y=(n.n(d),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}()),b=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.paymentId=e.match.params.paymentId,n.state={payment:[],hasMenu:!0},n}return o(t,e),y(t,[{key:"getPayment",value:function(){var e=this;c()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_ORDER_URL+"/"+this.paymentId,headers:{Authorization:"Bearer "+Object(f.b)().token,"Content-Type":"application/json"}}).then(function(t){e.setState({payment:t.data})}).catch(function(e){console.log(e.response.data),e.response?d.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?d.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):d.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getPayment()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.paymentId=e.match.params.paymentId,this.getPayment()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(m.Row,null,s.a.createElement(m.Col,{md:"12"},s.a.createElement(m.Card,{className:"main-card mb-3"},s.a.createElement(m.CardBody,null,s.a.createElement(m.CardTitle,null,"Paiement N\xb0",this.state.payment.id,s.a.createElement("div",{className:"pull-right mb-2 mr-2 badge badge-pill badge-success"},this.state.payment.item)),this.state.hasMenu?s.a.createElement(E,{props:this.props}):""))))))}}]),t}(s.a.Component);b.GET_ORDER_URL="/api/payment",t.a=b;var E=function(e){return s.a.createElement(m.Nav,{pills:!0,justified:!0},s.a.createElement(m.NavItem,null,s.a.createElement(m.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/edition"?"active":"",tag:function(e){return s.a.createElement(h.Link,e)},to:e.props.match.url+"/edition"},s.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Edition")),s.a.createElement(m.NavItem,null,s.a.createElement(m.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/visualiser"?"active":"",tag:function(e){return s.a.createElement(h.Link,e)},to:e.props.match.url+"/visualiser"},s.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Visualiser re\xe7u")))}},773:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(2),c=(n.n(u),n(5)),l=n.n(c),p=n(4),m=n.n(p),h=n(1),f=n(7),d=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}()),y=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.paymentId=e.match.params.paymentId,n.state={payment:{}},n.handleChange=n.handleChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),d(t,[{key:"handleChange",value:function(e){var t=this,n=e.target,a=n.name,r=n.value;this.setState(function(e){var n=Object.assign({},t.state.payment);return n[a]=r,{payment:n}})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.updatePayment()}},{key:"formatData",value:function(){var e=this.state.payment;return delete e.id,delete e.invoice,delete e.user,delete e.stripe_payment_id,delete e.stripe_receipt_url,delete e.created_date,e}},{key:"updatePayment",value:function(){var e=this;l()({method:"PATCH",data:this.formatData(),url:"https://testapi.miamnimaux.com"+t.EDIT_PAYMENT_URL+"/"+this.paymentId,headers:{Authorization:"Bearer "+Object(h.b)().token,"Content-Type":"application/json"}}).then(function(t){f.toast.success("La mise \xe0 jour s'est bien effectu\xe9e !"),e.setState({payment:t.data})}).catch(function(e){console.log(e.response.data),e.response?f.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?f.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):f.toast.error("Une erreur s'est produite")})}},{key:"getPayment",value:function(){var e=this;l()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_PAYMENT_URL+"/"+this.paymentId,headers:{Authorization:"Bearer "+Object(h.b)().token,"Content-Type":"application/json"}}).then(function(t){e.setState({payment:t.data})}).catch(function(e){f.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.join(" | "))})}},{key:"componentDidMount",value:function(){this.getPayment()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.paymentId=e.match.params.paymentId,this.getPayment()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(m.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(u.Card,{className:"main-card mb-3"},s.a.createElement(u.CardBody,null,s.a.createElement(u.CardTitle,null,"Edition paiement N\xb0",this.state.payment.id),s.a.createElement(u.Form,{onSubmit:this.handleSubmit},s.a.createElement(u.Row,{form:!0},s.a.createElement(u.Col,{md:5},s.a.createElement(u.FormGroup,null,s.a.createElement(u.Label,{for:"amount"},"Montant"),s.a.createElement(u.Input,{type:"number",name:"amount",id:"amount",value:this.state.payment.amount||"",onChange:this.handleChange,placeholder:"Montant"})))),s.a.createElement(u.Button,{color:"primary",type:"submit",className:"mt-2"},"Mettre \xe0 jour"))))))}}]),t}(s.a.Component);y.GET_PAYMENT_URL="/api/payment",y.EDIT_PAYMENT_URL="/api/payment",t.a=y},774:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(r,o){try{var i=t[r](o),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}var s=n(109),u=n.n(s),c=n(0),l=n.n(c),p=n(2),m=(n.n(p),n(5)),h=n.n(m),f=n(4),d=n.n(f),y=n(1),b=n(7),E=(n.n(b),n(53)),v=n.n(E),_=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),g=this,T=function(){var e=i(u.a.mark(function e(t){var n;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,h()({method:"GET",url:"https://testapi.miamnimaux.com"+C.SEARCH_USER_URL+t,headers:{Authorization:"Bearer "+Object(y.b)().token,"Content-Type":"application/json"}}).then(function(e){n=e.data.map(function(e){return{value:e.id,label:e.email,name:"user"}})}).catch(function(e){console.log(e)});case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}},e,g)}));return function(t){return e.apply(this,arguments)}}(),O=function(e,t){if(e.length<3)return[];setTimeout(i(u.a.mark(function n(){return u.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=t,n.next=3,T(e);case 3:n.t1=n.sent,(0,n.t0)(n.t1);case 5:case"end":return n.stop()}},n,g)})),1e3)},C=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.initialState={amount:null,user:null,invoice:null},n.state={payment:n.initialState,invoiceList:[]},n.handleChange=n.handleChange.bind(n),n.handleUserChange=n.handleUserChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),_(t,[{key:"handleUserChange",value:function(e){var n=this;if(this.handleChange(e),null==this.state.payment.user)return[];h()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_USER_INVOICE+this.state.payment.user,headers:{Authorization:"Bearer "+Object(y.b)().token,"Content-Type":"application/json"}}).then(function(e){var t=e.data.invoices.map(function(e){return{value:e.id,label:e.created_date+" - ("+e.price_ti+"\u20ac)",name:"invoice"}});n.setState({invoiceList:t})}).catch(function(e){console.log(e.response.data),e.response?b.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?b.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):b.toast.error("Une erreur s'est produite")})}},{key:"handleChange",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target);var n=t,a=n.name,r=n.value,o=this.state.payment;o[a]=r,this.setState({payment:o})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.postPayment()}},{key:"postPayment",value:function(){var e=this;h()({method:"POST",data:this.state.payment,url:"https://testapi.miamnimaux.com"+t.POST_PAYMENT_URL,headers:{Authorization:"Bearer "+Object(y.b)().token,"Content-Type":"application/json"}}).then(function(t){b.toast.success("Le paiement a bien \xe9t\xe9 ajout\xe9 !"),e.props.history.push("/paiements")}).catch(function(e){console.log(e.response.data),e.response?b.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?b.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):b.toast.error("Une erreur s'est produite")})}},{key:"render",value:function(){return l.a.createElement(c.Fragment,null,l.a.createElement(d.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(p.Card,{className:"main-card mb-3"},l.a.createElement(p.CardBody,null,l.a.createElement(p.CardTitle,null,"Nouveau paiement"),l.a.createElement(p.Form,{onSubmit:this.handleSubmit},l.a.createElement(p.Row,{form:!0},l.a.createElement(p.Col,{md:6},l.a.createElement(p.FormGroup,null,l.a.createElement(p.Label,{for:"amount"},"Montant"),l.a.createElement(p.Input,{type:"number",name:"amount",id:"amount",onChange:this.handleChange,placeholder:"Montant"})))),l.a.createElement(p.Row,{form:!0},l.a.createElement(p.Col,{md:6},l.a.createElement(p.FormGroup,null,l.a.createElement(p.Label,{for:"user"},"Utilisateur"),l.a.createElement(v.a,{name:"user",cacheOptions:!0,defaultOptions:!0,onChange:this.handleUserChange,loadOptions:O,className:"basic-multi-select",classNamePrefix:"select"}))),l.a.createElement(p.Col,{md:6},l.a.createElement(p.FormGroup,null,l.a.createElement(p.Label,{for:"user"},"Facture"),l.a.createElement(v.a,{name:"invoice",cacheOptions:!0,defaultOptions:this.state.invoiceList,className:"basic-multi-select",classNamePrefix:"select"})))),l.a.createElement(p.Button,{color:"primary",type:"submit",className:"mt-2"},"Ajouter"))))))}}]),t}(l.a.Component);C.POST_PAYMENT_URL="/api/payment",C.SEARCH_USER_URL="/api/user/search/",C.GET_USER_INVOICE="/api/invoice/user/",t.a=C},775:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),u=n(4),c=n.n(u),l=n(17),p=n(443),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),h=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return o(t,e),m(t,[{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(l.a,{heading:"Liste des paiements",subheading:"",addLink:"/paiements/nouveau",icon:"pe-7s-drawer icon-gradient bg-happy-itmeo"}),s.a.createElement(c.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(p.a,this.props)))}}]),t}(s.a.Component);t.a=h}});