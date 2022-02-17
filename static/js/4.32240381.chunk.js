webpackJsonp([4],{320:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),r=n.n(a),o=n(6),i=(n.n(o),n(750)),s=n(751),l=n(752),c=n(753),u=n(372),p=(n(59),n(18)),d=n(19),m=function(e){var t=e.match;return r.a.createElement(a.Fragment,null,r.a.createElement(p.a,null),r.a.createElement("div",{className:"app-main"},r.a.createElement(d.a,null),r.a.createElement("div",{className:"app-main__outer"},r.a.createElement("div",{className:"app-main__inner"},r.a.createElement(o.Route,{path:""+t.url,component:i.a}),r.a.createElement(o.Route,{path:t.url+"/nouveau",component:c.a}),r.a.createElement(o.Route,{path:t.url+"/:petId/profile",component:s.a}),r.a.createElement(o.Route,{path:t.url+"/:petId/profile/edition",component:l.a}),r.a.createElement(o.Route,{path:t.url+"/:petId/profile/abonnements",component:u.a})))))};t.default=m},371:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),l=n(2),c=(n.n(l),n(5)),u=n.n(c),p=n(6),d=(n.n(p),n(16)),m=n(1),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f=[{Header:"#",Footer:"#",accessor:function(e){return s.a.createElement("b",null,s.a.createElement(p.Link,{to:"/animaux/"+e.id+"/profile/edition"},e.id))}},{Header:"Nom",Footer:"Nom",accessor:"name"},{Header:"Utilisateur",Footer:"Utilisateur",accessor:function(e){return s.a.createElement(p.Link,{to:"/utilisateurs/"+e.user.id+"/profile/edition"},e.user.firstname," ",e.user.lastname,s.a.createElement("br",null),e.user.email)}},{Header:"Esp\xe8ce",Footer:"Esp\xe8ce",accessor:function(e){return s.a.createElement(p.Link,{to:"/especes/"+e.type.id+"/profile/edition"},e.type.name)}},{Header:"Race",Footer:"Race",accessor:function(e){return s.a.createElement(p.Link,{to:"/races/"+e.breeds.id+"/profile/edition"},e.breeds.name)}},{Header:"Sexe",Footer:"Sexe",accessor:"sexe"},{Header:"Age",Footer:"Age",accessor:function(e){return e.age+" ans "+e.month+" mois"}},{Header:"Poids",Footer:"Poids",accessor:function(e){return e.weight}},{Header:"St\xe9rilis\xe9",Footer:"St\xe9rilis\xe9",accessor:function(e){return e.neutered?"Oui":"Non"}},{Header:"Gestation",Footer:"Gestation",accessor:function(e){return e.pregnant?"Oui":"Non"}},{Header:"Activit\xe9",Footer:"Activit\xe9",accessor:function(e){return 0===e.activity?"peu actif":1===e.activity?"actif":"tr\xe8s actif"}},{Header:"Date de cr\xe9ation",Footer:"Date de cr\xe9ation",accessor:function(e){return Object(d.b)(e.created_date)}}],b=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.userId=e.match?e.match.params.userId:null,n.subscriptionId=e.match?e.match.params.subscriptionId:null,n.loading=!1,n.pageCount=0,n.state={pets:[]},n.fetchData=n.fetchData.bind(n),n.handleSearch=n.handleSearch.bind(n),n}return o(t,e),h(t,[{key:"fetchData",value:function(e){return this.loading=!0,this.getPets(e.pageSize,e.pageIndex*e.pageSize),this.loading=!1,this.state.pets}},{key:"handleSearch",value:function(e,t,n){if(n.length<3&&0!==n.length)return null;this.loading=!0,this.getPets(t,e*t,n),this.loading=!1}},{key:"getPets",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.GET_ALL_PETS_URL;"undefined"!==typeof this.userId&&null!==this.userId?o=t.GET_USER_PETS_URL+this.userId:"undefined"!==typeof this.subscriptionId&&null!==this.subscriptionId&&(o=t.GET_SUB_PETS_URL+this.subscriptionId),o+="?limit="+e+"&offset="+a+"&query="+r,u()({method:"get",url:"http://172.17.0.1:10000"+o,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){return n.pageCount=Math.ceil(t.data.petsTotal/e),n.setState({pets:t.data.pets}),n.state.pets}).catch(function(e){401===e.response.status?n.props.history.push("/logout"):403===e.response.status&&n.props.history.goBack()})}},{key:"render",value:function(){return s.a.createElement(l.Row,null,s.a.createElement(l.Col,{lg:"12"},s.a.createElement(l.Card,{className:"main-card mb-3"},s.a.createElement(l.CardBody,null,s.a.createElement(l.CardTitle,null,"animaux"),s.a.createElement(d.c,{data:null!=this.state.pets?this.state.pets:[],columns:f,fetchData:this.fetchData,loading:this.loading,pageCount:this.pageCount,handleSearch:this.handleSearch})))))}}]),t}(s.a.Component);b.GET_ALL_PETS_URL="/api/pets",b.GET_USER_PETS_URL="/api/pet/user/",b.GET_SUB_PETS_URL="/api/pet/subscription/",t.a=b},372:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),l=n(2),c=(n.n(l),n(5)),u=n.n(c),p=n(6),d=(n.n(p),n(16)),m=n(1),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),f=[{Header:"#",Footer:"#",accessor:function(e){return s.a.createElement("b",null,s.a.createElement(p.Link,{to:"/abonnements/"+e.id+"/profile/edition"},e.id))}},{Header:"Utilisateur",Footer:"Utilisateur",accessor:function(e){return s.a.createElement(p.Link,{to:"/utilisateurs/"+e.user.id+"/profile/edition"},e.user.firstname," ",e.user.lastname,s.a.createElement("br",null),e.user.email)}},{Header:"Animal",Footer:"Animal",accessor:function(e){return s.a.createElement(p.Link,{to:"/animaux/"+e.pet.id+"/profile/edition"},e.pet.name)}},{Header:"Formule",Footer:"Formule",accessor:function(e){return s.a.createElement(p.Link,{to:"/formules/"+e.price.formula.id+"/profile/edition"},e.price.formula.name)}},{Header:"Montant",Footer:"Montant",accessor:function(e){return e.amount+" \u20ac"}},{Header:"Stripe Id",Footer:"Stripe Id",accessor:"stripe_subscription_id"},{Header:"Statut",Footer:"Statut",accessor:function(e){return Object(d.a)(e.status,"running"===e.status?"success":"paused"===e.status?"warning":"cancelled"===e.status?"danger":"info")}},{Header:"Date de cr\xe9ation",Footer:"Date de cr\xe9ation",accessor:function(e){return Object(d.b)(e.created_date)}}],b=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.userId=e.match?e.match.params.userId:null,n.petId=e.match?e.match.params.petId:null,n.loading=!1,n.pageCount=0,n.state={subscriptions:[]},n.fetchData=n.fetchData.bind(n),n.handleSearch=n.handleSearch.bind(n),n}return o(t,e),h(t,[{key:"fetchData",value:function(e){return this.loading=!0,this.getSubscriptions(e.pageSize,e.pageIndex*e.pageSize),this.loading=!1,this.state.subscriptions}},{key:"handleSearch",value:function(e,t,n){if(n.length<3&&0!==n.length)return null;this.loading=!0,this.getSubscriptions(t,e*t,n),this.loading=!1}},{key:"getSubscriptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.GET_ALL_SUB_URL;"undefined"!==typeof this.userId&&null!==this.userId?o=t.GET_USER_SUB_URL+this.userId:"undefined"!==typeof this.petId&&null!==this.petId&&(o=t.GET_PET_SUB_URL+this.petId),o+="?limit="+e+"&offset="+a+"&query="+r,u()({method:"get",url:"http://172.17.0.1:10000"+o,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){return n.pageCount=Math.ceil(t.data.subscriptionsTotal/e),n.setState({subscriptions:t.data.subscriptions}),n.state.subscriptions}).catch(function(e){console.log(e),401===e.response.status?n.props.history.push("/logout"):403===e.response.status&&n.props.history.goBack()})}},{key:"render",value:function(){return s.a.createElement(l.Row,null,s.a.createElement(l.Col,{lg:"12"},s.a.createElement(l.Card,{className:"main-card mb-3"},s.a.createElement(l.CardBody,null,s.a.createElement(l.CardTitle,null,"Abonnements"),s.a.createElement(d.c,{data:null!=this.state.subscriptions?this.state.subscriptions:[],columns:f,fetchData:this.fetchData,loading:this.loading,pageCount:this.pageCount,handleSearch:this.handleSearch})))))}}]),t}(s.a.Component);b.GET_ALL_SUB_URL="/api/subscriptions",b.GET_USER_SUB_URL="/api/subscription/user/",b.GET_PET_SUB_URL="/api/subscription/pet/",t.a=b},750:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),l=n(4),c=n.n(l),u=n(17),p=n(371),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),m=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return o(t,e),d(t,[{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(u.a,{heading:"Liste des animaux",subheading:"",addLink:"/animaux/nouveau",icon:"pe-7s-drawer icon-gradient bg-happy-itmeo"}),s.a.createElement(c.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(p.a,this.props)))}}]),t}(s.a.Component);t.a=m},751:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),l=n(5),c=n.n(l),u=n(4),p=n.n(u),d=n(2),m=(n.n(d),n(1)),h=n(6),f=(n.n(h),n(7)),b=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}()),E=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.petId=e.match.params.petId,n.state={pet:[],hasMenu:!0},n}return o(t,e),b(t,[{key:"getPet",value:function(){var e=this;c()({method:"GET",url:"http://172.17.0.1:10000"+t.GET_PET_URL+"/"+this.petId,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){e.setState({pet:t.data})}).catch(function(e){console.log(e.response.data),e.response?f.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?f.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):f.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getPet()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.petId=e.match.params.petId,this.getPet()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(d.Row,null,s.a.createElement(d.Col,{md:"12"},s.a.createElement(d.Card,{className:"main-card mb-3"},s.a.createElement(d.CardBody,null,s.a.createElement(d.CardTitle,null,this.state.pet.name," - ",this.state.pet.age," ans"),this.state.hasMenu?s.a.createElement(g,{props:this.props}):""))))))}}]),t}(s.a.Component);E.GET_PET_URL="/api/pet",t.a=E;var g=function(e){return s.a.createElement(d.Nav,{pills:!0,justified:!0},s.a.createElement(d.NavItem,null,s.a.createElement(d.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/edition"?"active":"",tag:function(e){return s.a.createElement(h.Link,e)},to:e.props.match.url+"/edition"},s.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Edition")),s.a.createElement(d.NavItem,null,s.a.createElement(d.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/abonnements"?"active":"",tag:function(e){return s.a.createElement(h.Link,e)},to:e.props.match.url+"/abonnements"},s.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Abonnements")))}},752:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),l=n(2),c=(n.n(l),n(5)),u=n.n(c),p=n(4),d=n.n(p),m=n(1),h=n(7),f=(n.n(h),n(53)),b=n.n(f),E=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),g=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.petId=e.match.params.petId,n.state={pet:{},species:{},breeds:{},specieName:null,breedName:null},n.handleChange=n.handleChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),E(t,[{key:"handleChange",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target),Array.isArray(e)&&(t.value=e.map(function(e){return e.value}),t.name=e[0].name);var n=t,a=n.name,r=n.value,o=n.label,i=this.state.pet;i[a]="checkbox"===t.type?t.checked:r,"specie"===a&&this.setState({specieName:o}),"breed"===a&&this.setState({breedName:o}),this.setState({pet:i})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.updatePet()}},{key:"formatData",value:function(){var e=this.state.pet;return e.user=this.state.pet.user.id,delete e.id,delete e.diseases,delete e.subscription,delete e.aliments_forbidden,delete e.allergies,delete e.avatar,delete e.birthday,delete e.needed_grams,delete e.plat_per_day,delete e.preferred_aliments,delete e.shape,delete e.usual_food,delete e.wrong_match,delete e.created_date,e}},{key:"updatePet",value:function(){var e=this;u()({method:"PATCH",data:this.formatData(),url:"http://172.17.0.1:10000"+t.EDIT_PET_URL+"/"+this.petId,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){h.toast.success("La mise \xe0 jour s'est bien effectu\xe9e !"),e.setState({pet:t.data})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"getPet",value:function(){var e=this;u()({method:"GET",url:"http://172.17.0.1:10000"+t.GET_PET_URL+"/"+this.petId,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){var n=t.data,a=n.type?n.type.name:null;e.setState({specieName:a}),n.type=n.type?n.type.id:"";var r=n.breeds?n.breeds.name:null;e.setState({breedName:r}),n.breeds=n.breeds?n.breeds.id:"",e.setState({pet:n})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"loadSpecies",value:function(){var e=this;u()({method:"GET",url:"http://172.17.0.1:10000"+t.GET_SPECIES_URL,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){var n=t.data.species.map(function(e){return{value:e.id,label:e.name,name:"specie"}});e.setState({species:n})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"loadBreeds",value:function(){var e=this;u()({method:"GET",url:"http://172.17.0.1:10000"+t.GET_BREEDS_URL,headers:{Authorization:"Bearer "+Object(m.b)().token,"Content-Type":"application/json"}}).then(function(t){var n=t.data.breeds.map(function(e){return{value:e.id,label:e.name,name:"breed"}});e.setState({breeds:n})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getPet(),this.loadSpecies(),this.loadBreeds()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.petId=e.match.params.petId,this.getPet()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(d.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(l.Card,{className:"main-card mb-3"},s.a.createElement(l.CardBody,null,s.a.createElement(l.CardTitle,null,"Edition ",this.state.pet.name),s.a.createElement(l.Form,{onSubmit:this.handleSubmit},s.a.createElement(l.Row,{form:!0},s.a.createElement(l.Col,{md:6},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"name"},"Nom"),s.a.createElement(l.Input,{type:"text",name:"name",id:"name",value:this.state.pet.name||"",onChange:this.handleChange,placeholder:"Nom de l'animal"}))),s.a.createElement(l.Col,{md:6},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"sexe"},"Sexe"),s.a.createElement(l.Input,{type:"select",name:"sexe",id:"sexe",value:this.state.pet.sexe||"",onChange:this.handleChange,placeholder:"Sexe"},s.a.createElement("option",{value:"F"},"Fille"),s.a.createElement("option",{value:"M"},"Gar\xe7on"))))),s.a.createElement(l.Row,{form:!0},s.a.createElement(l.Col,{md:3},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"weight"},"Poids (Kg)"),s.a.createElement(l.Input,{type:"number",name:"weight",id:"weight",step:.1,value:this.state.pet.weight||"",onChange:this.handleChange,placeholder:"Poids"}))),s.a.createElement(l.Col,{md:3},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"activity"},"Activit\xe9"),s.a.createElement(l.Input,{type:"select",name:"activity",id:"activity",value:this.state.pet.activity||"",onChange:this.handleChange,placeholder:"Activit\xe9"},s.a.createElement("option",{value:"0"},"Peu actif"),s.a.createElement("option",{value:"1"},"Actif"),s.a.createElement("option",{value:"2"},"Tr\xe8s actif")))),s.a.createElement(l.Col,{md:3},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"age"},"Age"),s.a.createElement(l.Input,{type:"number",name:"age",id:"age",value:this.state.pet.age||"",onChange:this.handleChange,placeholder:"Age"}))),s.a.createElement(l.Col,{md:3},s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"age"},"Mois"),s.a.createElement(l.Input,{type:"number",name:"month",id:"month",value:this.state.pet.month||"",onChange:this.handleChange,placeholder:"Mois"})))),s.a.createElement(l.Row,null,s.a.createElement(l.Col,{md:6},s.a.createElement(l.Label,{for:"type"},"Espece"),s.a.createElement(b.a,{name:"type",cacheOptions:!0,onChange:this.handleChange,defaultOptions:this.state.species,value:{label:this.state.specieName}||"",className:"basic-multi-select",classNamePrefix:"select"})),s.a.createElement(l.Col,{md:6},s.a.createElement(l.Label,{for:"breed"},"Race"),s.a.createElement(b.a,{name:"breed",cacheOptions:!0,onChange:this.handleChange,defaultOptions:this.state.breeds,value:{label:this.state.breedName}||"",className:"basic-multi-select",classNamePrefix:"select"}))),s.a.createElement(l.FormGroup,null,s.a.createElement(l.Label,{for:"notes"},"Notes"),s.a.createElement(l.Input,{type:"textarea",name:"notes",id:"notes",value:this.state.pet.notes||"",onChange:this.handleChange,placeholder:"Notes"})),s.a.createElement(l.FormGroup,null,s.a.createElement(l.CustomInput,{type:"checkbox",id:"neutered",name:"neutered",label:"St\xe9rilis\xe9",defaultChecked:this.state.pet.neutered,inline:!0,onChange:this.handleChange}),s.a.createElement(l.CustomInput,{type:"checkbox",id:"pregnant",name:"pregnant",label:"Gestation",defaultChecked:this.state.pet.pregnant,inline:!0,onChange:this.handleChange})),s.a.createElement(l.Button,{color:"primary",type:"submit",className:"mt-2"},"Mettre \xe0 jour"))))))}}]),t}(s.a.Component);g.GET_PET_URL="/api/pet",g.EDIT_PET_URL="/api/pet",g.GET_SPECIES_URL="/api/species",g.GET_BREEDS_URL="/api/breeds",t.a=g},753:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(r,o){try{var i=t[r](o),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}var s=n(109),l=n.n(s),c=n(0),u=n.n(c),p=n(2),d=(n.n(p),n(5)),m=n.n(d),h=n(4),f=n.n(h),b=n(1),E=n(7),g=(n.n(E),n(53)),y=n.n(g),v=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),_=this,C=function(){var e=i(l.a.mark(function e(t){var n;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,m()({method:"GET",url:"http://172.17.0.1:10000"+T.SEARCH_USER_URL+t,headers:{Authorization:"Bearer "+Object(b.b)().token,"Content-Type":"application/json"}}).then(function(e){n=e.data.map(function(e){return{value:e.id,label:e.email,name:"user"}})}).catch(function(e){console.log(e)});case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}},e,_)}));return function(t){return e.apply(this,arguments)}}(),S=function(e,t){if(e.length<3)return[];setTimeout(i(l.a.mark(function n(){return l.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=t,n.next=3,C(e);case 3:n.t1=n.sent,(0,n.t0)(n.t1);case 5:case"end":return n.stop()}},n,_)})),1e3)},T=function(e){function t(e){a(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.initialState={name:"",user:"",age:"",sexe:"",birthday:"",developmentalAge:"",notes:""},n.state={pet:n.initialState},n.handleChange=n.handleChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),v(t,[{key:"handleChange",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target);var n=t,a=n.name,r=n.value,o=this.state.pet;o[a]=r,this.setState({pet:o})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.postPet()}},{key:"postPet",value:function(){var e=this;console.log(this.state.pet),m()({method:"POST",data:this.state.pet,url:"http://172.17.0.1:10000"+t.POST_PET_URL,headers:{Authorization:"Bearer "+Object(b.b)().token,"Content-Type":"application/json"}}).then(function(t){E.toast.success("L'animal a bien \xe9t\xe9 ajout\xe9 !"),e.props.history.push("/animaux")}).catch(function(e){console.log(e.response.data),e.response?E.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?E.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):E.toast.error("Une erreur s'est produite")})}},{key:"render",value:function(){return u.a.createElement(c.Fragment,null,u.a.createElement(f.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},u.a.createElement(p.Card,{className:"main-card mb-3"},u.a.createElement(p.CardBody,null,u.a.createElement(p.CardTitle,null,"Nouvel animal"),u.a.createElement(p.Form,{onSubmit:this.handleSubmit},u.a.createElement(p.Row,{form:!0},u.a.createElement(p.Col,{md:6},u.a.createElement(p.FormGroup,null,u.a.createElement(p.Label,{for:"name"},"Nom"),u.a.createElement(p.Input,{type:"text",name:"name",id:"name",onChange:this.handleChange,placeholder:"Nom"}))),u.a.createElement(p.Col,{md:6},u.a.createElement(p.FormGroup,null,u.a.createElement(p.Label,{for:"Utilisateur"},"Utilisateur"),u.a.createElement(y.a,{name:"user",cacheOptions:!0,defaultOptions:!0,onChange:this.handleChange,loadOptions:S,className:"basic-multi-select",classNamePrefix:"select"})))),u.a.createElement(p.FormGroup,null,u.a.createElement(p.Row,{form:!0},u.a.createElement(p.Col,{md:6},u.a.createElement(p.Label,{for:"age"},"Age"),u.a.createElement(p.Input,{type:"number",name:"age",id:"age",onChange:this.handleChange,placeholder:"Age"})),u.a.createElement(p.Col,{md:6},u.a.createElement(p.Label,{for:"sexe"},"Genre"),u.a.createElement(p.CustomInput,{type:"select",name:"sexe",id:"sexe",onChange:this.handleChange,placeholder:"Genre"},u.a.createElement("option",{value:"M"},"Gar\xe7on"),u.a.createElement("option",{value:"F"},"Fille"))))),u.a.createElement(p.FormGroup,null,u.a.createElement(p.Row,{form:!0},u.a.createElement(p.Col,{md:6},u.a.createElement(p.Label,{for:"birthday"},"Anniversaire"),u.a.createElement(p.Input,{type:"date",name:"birthday",id:"birthday",onChange:this.handleChange,placeholder:"Anniversaire"})),u.a.createElement(p.Col,{md:6},u.a.createElement(p.Label,{for:"developmental_age"},"Age de d\xe9veloppment"),u.a.createElement(p.Input,{name:"developmental_age",id:"developmental_age",onChange:this.handleChange,placeholder:"Age de d\xe9veloppment"})))),u.a.createElement(p.FormGroup,null,u.a.createElement(p.Label,{for:"notes"},"Notes"),u.a.createElement(p.Input,{type:"textarea",name:"notes",id:"notes",onChange:this.handleChange,placeholder:"Notes"})),u.a.createElement(p.Button,{color:"primary",type:"submit",className:"mt-2"},"Ajouter"))))))}}]),t}(u.a.Component);T.POST_PET_URL="/api/pet",T.SEARCH_USER_URL="/api/user/search/",t.a=T}});