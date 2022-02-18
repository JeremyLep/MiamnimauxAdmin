webpackJsonp([9],{322:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a(0),n=a.n(r),o=a(6),i=(a.n(o),a(758)),l=a(759),u=a(760),s=a(761),c=a(18),m=a(19),p=function(e){var t=e.match;return n.a.createElement(r.Fragment,null,n.a.createElement(c.a,null),n.a.createElement("div",{className:"app-main"},n.a.createElement(m.a,null),n.a.createElement("div",{className:"app-main__outer"},n.a.createElement("div",{className:"app-main__inner"},n.a.createElement(o.Route,{path:""+t.url,component:s.a}),n.a.createElement(o.Route,{path:t.url+"/nouveau",component:u.a}),n.a.createElement(o.Route,{path:t.url+"/:formulaId/profile",component:i.a}),n.a.createElement(o.Route,{path:t.url+"/:formulaId/profile/edition",component:l.a})))))};t.default=p},758:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(0),l=a.n(i),u=a(5),s=a.n(u),c=a(4),m=a.n(c),p=a(2),d=(a.n(p),a(1)),h=a(6),f=(a.n(h),a(7)),b=(a.n(f),function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}()),E=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.formulaId=e.match.params.formulaId,a.state={formula:[],hasMenu:!0,itemName:null},a}return o(t,e),b(t,[{key:"getFormula",value:function(){var e=this;s()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_ORDER_URL+"/"+this.formulaId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){var a=t.data,r=a.item?a.item.name:null;e.setState({itemName:r}),a.item=a.item?a.item.id:"",e.setState({formula:a})}).catch(function(e){console.log(e.response.data),e.response?f.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?f.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):f.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getFormula()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.formulaId=e.match.params.formulaId,this.getFormula()}},{key:"render",value:function(){return l.a.createElement(i.Fragment,null,l.a.createElement(m.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(p.Row,null,l.a.createElement(p.Col,{md:"12"},l.a.createElement(p.Card,{className:"main-card mb-3"},l.a.createElement(p.CardBody,null,l.a.createElement(p.CardTitle,null,this.state.formula.id," - ",this.state.formula.name,this.state.itemName?l.a.createElement("div",{className:"pull-right mb-2 mr-2 badge badge-pill badge-success"},this.state.itemName):""),this.state.hasMenu?l.a.createElement(v,{props:this.props}):""))))))}}]),t}(l.a.Component);E.GET_ORDER_URL="/api/formula",t.a=E;var v=function(e){return l.a.createElement(p.Nav,{pills:!0,justified:!0},l.a.createElement(p.NavItem,null,l.a.createElement(p.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/edition"?"active":"",tag:function(e){return l.a.createElement(h.Link,e)},to:e.props.match.url+"/edition"},l.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Edition")))}},759:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(0),l=a.n(i),u=a(2),s=(a.n(u),a(5)),c=a.n(s),m=a(4),p=a.n(m),d=a(1),h=a(7),f=(a.n(h),function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}()),b=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.formulaId=e.match.params.formulaId,a.state={formula:{}},a.handleChange=a.handleChange.bind(a),a.handleSubmit=a.handleSubmit.bind(a),a}return o(t,e),f(t,[{key:"handleChange",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target),Array.isArray(e)&&(t.value=e.map(function(e){return e.value}),t.name=e[0].name);var a=t,r=a.name,n=a.value,o=(a.label,this.state.formula);o[r]=n,this.setState({formula:o})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.updateFormula()}},{key:"formatData",value:function(){var e=this.state.formula;return delete e.id,delete e.created_date,e}},{key:"updateFormula",value:function(){var e=this;c()({method:"PATCH",data:this.formatData(),url:"https://testapi.miamnimaux.com"+t.EDIT_FORMULA_URL+"/"+this.formulaId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){h.toast.success("La mise \xe0 jour s'est bien effectu\xe9e !"),e.setState({formula:t.data})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"getFormula",value:function(){var e=this;c()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_FORMULA_URL+"/"+this.formulaId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){var a=t.data;e.setState({formula:a})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getFormula()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.formulaId=e.match.params.formulaId,this.getFormula()}},{key:"render",value:function(){return l.a.createElement(i.Fragment,null,l.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(u.Card,{className:"main-card mb-3"},l.a.createElement(u.CardBody,null,l.a.createElement(u.CardTitle,null,"Edition ",this.state.formula.name),l.a.createElement(u.Form,{onSubmit:this.handleSubmit},l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"name"},"Nom"),l.a.createElement(u.Input,{type:"text",name:"name",id:"name",value:this.state.formula.name||"",onChange:this.handleChange,placeholder:"Nom de la formule"}))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"nb_dishes"},"Nb plats"),l.a.createElement(u.Input,{type:"number",name:"nb_dishes",id:"nb_dishes",value:this.state.formula.nb_dishes||"",onChange:this.handleChange,placeholder:"Nombre de plats"})))),l.a.createElement(u.Row,null,l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"recurring_interval"},"Interval de recurrence"),l.a.createElement(u.Input,{type:"select",name:"recurring_interval",id:"recurring_interval",value:this.state.formula.recurring_interval||"",onChange:this.handleChange,placeholder:"Interval de recurrence"},l.a.createElement("option",{value:"1"},"1 mois"),l.a.createElement("option",{value:"3"},"3 mois"),l.a.createElement("option",{value:"6"},"6 mois"),l.a.createElement("option",{value:"12"},"1 an")))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"symbol"},"Symbol"),l.a.createElement(u.Input,{type:"symbol",name:"symbol",id:"symbol",value:this.state.formula.symbol||"",onChange:this.handleChange,placeholder:"Nombre d'animal'"})))),l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"description"},"Description"),l.a.createElement(u.Input,{type:"textarea",name:"description",id:"description",value:this.state.formula.description||"",onChange:this.handleChange,placeholder:"Description"})),l.a.createElement(u.Button,{color:"primary",type:"submit",className:"mt-2"},"Mettre \xe0 jour"))))))}}]),t}(l.a.Component);b.GET_FORMULA_URL="/api/formula",b.EDIT_FORMULA_URL="/api/formula",t.a=b},760:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(0),l=a.n(i),u=a(2),s=(a.n(u),a(5)),c=a.n(s),m=a(4),p=a.n(m),d=a(1),h=a(7),f=(a.n(h),a(53)),b=a.n(f),E=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),v=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.initialFormula={name:"",item:"",nb_price:"",nb_pet:"",recurring_interval:"",description:"",has_disease:!1},a.initialPrice={name:"",price_te:"",price_ti:"",vat_rate:"",price_vat:"",formula:"",active:!0},a.state={formula:a.initialFormula,price:a.initialPrice,items:[]},a.handleChangeFormula=a.handleChangeFormula.bind(a),a.handleChangePrice=a.handleChangePrice.bind(a),a.handleSubmit=a.handleSubmit.bind(a),a}return o(t,e),E(t,[{key:"handleChangeFormula",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target),Array.isArray(e)&&(t.value=e.map(function(e){return e.value}),t.name=e[0].name);var a=t,r=a.name,n=a.value,o=this.state.formula;o[r]=n,this.setState({formula:o})}},{key:"handleChangePrice",value:function(e){var t=e.target,a=t.name,r=t.value,n=this.state.price;n[a]=r,this.setState({price:n})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.postFormulaAndPrice()}},{key:"postFormulaAndPrice",value:function(){var e=this;c()({method:"POST",data:this.state.formula,url:"https://testapi.miamnimaux.com"+t.POST_PRICE_URL,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(a){var r=e.state.price;r.formula=a.data.id,e.setState({price:r}),c()({method:"POST",data:e.state.price,url:"https://testapi.miamnimaux.com"+t.POST_PRICE_URL,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){h.toast.success("La formule a bien \xe9t\xe9 ajout\xe9 !"),e.props.history.push("/formules")}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"loadItems",value:function(){var e=this;c()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_ITEMS,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){var a=t.data.items.map(function(e){return{value:e.id,label:e.name,name:"item"}});a.push({value:"",label:"Aucun",name:"item"}),e.setState({items:a})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.loadItems()}},{key:"render",value:function(){return l.a.createElement(i.Fragment,null,l.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(u.Card,{className:"main-card mb-3"},l.a.createElement(u.CardBody,null,l.a.createElement(u.CardTitle,null,"Nouvelle formule"),l.a.createElement(u.Form,{onSubmit:this.handleSubmit},l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"name"},"Nom"),l.a.createElement(u.Input,{type:"text",name:"name",id:"name",onChange:this.handleChangeFormula,placeholder:"Nom de la formule"}))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"item"},"Item"),l.a.createElement(b.a,{name:"item",cacheOptions:!0,onChange:this.handleChangeFormula,defaultOptions:this.state.items,className:"basic-multi-select",classNamePrefix:"select"})))),l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"nb_price"},"Nombre de prix"),l.a.createElement(u.Input,{type:"number",name:"nb_price",step:"1",id:"nb_price",onChange:this.handleChangeFormula,placeholder:"Nombre de prix"}))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"item"},"Nombre d'animal"),l.a.createElement(u.Input,{type:"number",name:"nb_pet",id:"nb_pet",onChange:this.handleChangeFormula,placeholder:"Nombre d'animal"})))),l.a.createElement(u.Row,null,l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"item"},"Interval de recurrence"),l.a.createElement(u.Input,{type:"select",name:"recurring_interval",id:"recurring_interval",onChange:this.handleChangeFormula,placeholder:"Interval de recurrence"},l.a.createElement("option",{value:"1"},"1 mois"),l.a.createElement("option",{value:"3"},"3 mois"),l.a.createElement("option",{value:"6"},"6 mois"),l.a.createElement("option",{value:"12"},"1 an"))))),l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"description"},"Description"),l.a.createElement(u.Input,{type:"textarea",name:"description",id:"description",onChange:this.handleChangeFormula,placeholder:"Description"})),l.a.createElement(u.FormGroup,null,l.a.createElement(u.CustomInput,{type:"checkbox",id:"has_disease",name:"has_disease",label:"Formule pour maladie",onChange:this.handleChangeFormula,defaultChecked:this.state.formula.has_disease})))))),l.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(u.Card,{className:"main-card mb-3"},l.a.createElement(u.CardBody,null,l.a.createElement(u.CardTitle,null,"Prix"),l.a.createElement(u.Form,{onSubmit:this.handleSubmit},l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"name"},"Nom"),l.a.createElement(u.Input,{type:"text",name:"name",id:"name",onChange:this.handleChangePrice,placeholder:"Nom prix"})))),l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"price_te"},"Prix HT"),l.a.createElement(u.Input,{type:"number",name:"price_te",step:".1",id:"price_te",onChange:this.handleChangePrice,placeholder:"Prix HT"}))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"price_ti"},"Prix TTC"),l.a.createElement(u.Input,{type:"number",name:"price_ti",step:".1",id:"price_ti",onChange:this.handleChangePrice,placeholder:"Price TTC"})))),l.a.createElement(u.Row,{form:!0},l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"vat_rate"},"Taux TVA (%)"),l.a.createElement(u.Input,{type:"number",name:"vat_rate",step:".1",id:"vat_rate",onChange:this.handleChangePrice,placeholder:"Taux TVA (%)"}))),l.a.createElement(u.Col,{md:6},l.a.createElement(u.FormGroup,null,l.a.createElement(u.Label,{for:"price_vat"},"Prix TVA"),l.a.createElement(u.Input,{type:"text",name:"price_vat",id:"price_vat",onChange:this.handleChangePrice,placeholder:"Prix TVA"})))),l.a.createElement(u.FormGroup,null,l.a.createElement(u.CustomInput,{type:"checkbox",id:"active",name:"active",label:"Actif",defaultChecked:this.state.price.active})),l.a.createElement(u.Button,{color:"primary",type:"submit",className:"mt-2"},"Ajouter"))))))}}]),t}(l.a.Component);v.POST_PRICE_URL="/api/formula",v.POST_PRICE_URL="/api/price",v.GET_ITEMS="/api/items",t.a=v},761:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(0),l=a.n(i),u=a(4),s=a.n(u),c=a(17),m=a(762),p=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),d=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a}return o(t,e),p(t,[{key:"render",value:function(){return l.a.createElement(i.Fragment,null,l.a.createElement(c.a,{heading:"Liste des formules",subheading:"",addLink:"/formules/nouveau",icon:"pe-7s-drawer icon-gradient bg-happy-itmeo"}),l.a.createElement(s.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(m.a,this.props)))}}]),t}(l.a.Component);t.a=d},762:function(e,t,a){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=a(0),l=a.n(i),u=a(2),s=(a.n(u),a(5)),c=a.n(s),m=a(6),p=(a.n(m),a(16)),d=a(1),h=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),f=[{Header:"#",Footer:"#",accessor:function(e){return l.a.createElement("b",null,l.a.createElement(m.Link,{to:"/formules/"+e.id+"/profile/edition"},e.id))}},{Header:"Nom",Footer:"Nom",accessor:"name"},{Header:"Nb plats",Footer:"Nb plats",accessor:"nb_dishes"},{Header:"Symbol",Footer:"Symbol",accessor:function(e){return e.symbol}},{Header:"Interval recurrence",Footer:"Interval recurrence",accessor:function(e){return e.recurring_interval+" mois"}},{Header:"Date de cr\xe9ation",Footer:"Date de cr\xe9ation",accessor:function(e){return Object(p.b)(e.created_date)}}],b=function(e){function t(e){r(this,t);var a=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.orderId=e.match?e.match.params.orderId:null,a.subscriptionId=e.match?e.match.params.subscriptionId:null,a.loading=!1,a.pageCount=0,a.state={formulas:[]},a.fetchData=a.fetchData.bind(a),a.handleSearch=a.handleSearch.bind(a),a}return o(t,e),h(t,[{key:"fetchData",value:function(e){return this.loading=!0,this.getFormulas(e.pageSize,e.pageIndex*e.pageSize),this.loading=!1,this.state.formulas}},{key:"handleSearch",value:function(e,t,a){if(a.length<3&&0!==a.length)return null;this.loading=!0,this.getFormulas(t,e*t,a),this.loading=!1}},{key:"getFormulas",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,a=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.GET_ALL_FORMULAS_URL;"undefined"!==typeof this.orderId&&null!==this.orderId?o=t.GET_ORDER_FORMULAS_URL+this.orderId:"undefined"!==typeof this.subscriptionId&&null!==this.subscriptionId&&(o=t.GET_SUB_FORMULAS_URL+this.subscriptionId),o+="?limit="+e+"&offset="+r+"&query="+n,c()({method:"get",url:"https://testapi.miamnimaux.com"+o,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){return a.pageCount=Math.ceil(t.data.formulasTotal/e),a.setState({formulas:t.data.formulas}),a.state.formulas}).catch(function(e){console.log(e),401===e.response.status?a.props.history.push("/logout"):403===e.response.status&&a.props.history.goBack()})}},{key:"render",value:function(){return l.a.createElement(u.Row,null,l.a.createElement(u.Col,{lg:"12"},l.a.createElement(u.Card,{className:"main-card mb-3"},l.a.createElement(u.CardBody,null,l.a.createElement(u.CardTitle,null,"Formules"),l.a.createElement(p.c,{data:null!=this.state.formulas?this.state.formulas:[],columns:f,fetchData:this.fetchData,loading:this.loading,pageCount:this.pageCount,handleSearch:this.handleSearch})))))}}]),t}(l.a.Component);b.GET_ALL_FORMULAS_URL="/api/formulas",b.GET_ORDER_FORMULAS_URL="/api/formula/order/",b.GET_SUB_FORMULAS_URL="/api/formula/subscription/",t.a=b}});