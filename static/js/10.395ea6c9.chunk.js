webpackJsonp([10],{326:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),a=n.n(r),o=n(6),i=(n.n(o),n(776)),s=n(777),c=n(778),u=n(779),l=n(18),m=n(19),p=function(e){var t=e.match;return a.a.createElement(r.Fragment,null,a.a.createElement(l.a,null),a.a.createElement("div",{className:"app-main"},a.a.createElement(m.a,null),a.a.createElement("div",{className:"app-main__outer"},a.a.createElement("div",{className:"app-main__inner"},a.a.createElement(o.Route,{path:""+t.url,component:u.a}),a.a.createElement(o.Route,{path:t.url+"/nouveau",component:c.a}),a.a.createElement(o.Route,{path:t.url+"/:commentId/profile",component:i.a}),a.a.createElement(o.Route,{path:t.url+"/:commentId/profile/edition",component:s.a})))))};t.default=p},373:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),c=n(2),u=(n.n(c),n(5)),l=n.n(u),m=n(6),p=(n.n(m),n(16)),d=n(1),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=[{Header:"#",Footer:"#",accessor:function(e){return s.a.createElement("b",null,s.a.createElement(m.Link,{to:"/commentaires/"+e.id+"/profile/edition"},e.id))}},{Header:"Utilisateur",Footer:"Utilisateur",accessor:function(e){return s.a.createElement(m.Link,{to:"/utilisateurs/"+e.user.id+"/profile/edition"},e.user.firstname," ",e.user.lastname,s.a.createElement("br",null),e.user.email)}},{Header:"Note",Footer:"Note",accessor:function(e){return s.a.createElement("span",{className:"score s"+e.note})}},{Header:"Commentaires",Footer:"Commentaires",accessor:"comment"},{Header:"Date de cr\xe9ation",Footer:"Date de cr\xe9ation",accessor:function(e){return Object(p.b)(e.created_date)}}],b=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.userId=e.match?e.match.params.userId:null,n.orderId=e.match?e.match.params.orderId:null,n.loading=!1,n.pageCount=0,n.state={comments:[]},n.fetchData=n.fetchData.bind(n),n.handleSearch=n.handleSearch.bind(n),n}return o(t,e),h(t,[{key:"fetchData",value:function(e){return this.loading=!0,this.getComments(e.pageSize,e.pageIndex*e.pageSize),this.loading=!1,this.state.comments}},{key:"handleSearch",value:function(e,t,n){if(n.length<3&&0!==n.length)return null;this.loading=!0,this.getComments(t,e*t,n),this.loading=!1}},{key:"getComments",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10,n=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",o=t.GET_ALL_COMMENTS_URL;"undefined"!==typeof this.userId&&null!==this.userId?o=t.GET_USER_COMMENTS_URL+this.userId:"undefined"!==typeof this.orderId&&null!==this.orderId&&(o=t.GET_ORDER_COMMENTS_URL+this.orderId),o+="?limit="+e+"&offset="+r+"&query="+a,l()({method:"GET",url:"https://testapi.miamnimaux.com"+o,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){return n.pageCount=Math.ceil(t.data.commentsTotal/e),n.setState({comments:t.data.comments}),n.state.comments}).catch(function(e){console.log(e),401===e.response.status?n.props.history.push("/logout"):403===e.response.status&&n.props.history.goBack()})}},{key:"render",value:function(){return s.a.createElement(c.Row,null,s.a.createElement(c.Col,{lg:"12"},s.a.createElement(c.Card,{className:"main-card mb-3"},s.a.createElement(c.CardBody,null,s.a.createElement(c.CardTitle,null,"Commentaires"),s.a.createElement(p.c,{data:null!=this.state.comments?this.state.comments:[],columns:f,fetchData:this.fetchData,loading:this.loading,pageCount:this.pageCount,handleSearch:this.handleSearch})))))}}]),t}(s.a.Component);b.GET_ALL_COMMENTS_URL="/api/comments",b.GET_USER_COMMENTS_URL="/api/comment/user/",b.GET_ORDER_COMMENTS_URL="/api/comment/order/",t.a=b},776:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),c=n(5),u=n.n(c),l=n(4),m=n.n(l),p=n(2),d=(n.n(p),n(1)),h=n(6),f=(n.n(h),n(7)),b=(n.n(f),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),E=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.commentId=e.match.params.commentId,n.state={comment:[],hasMenu:!0},n}return o(t,e),b(t,[{key:"getComment",value:function(){var e=this;u()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_ORDER_URL+"/"+this.commentId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){e.setState({comment:t.data})}).catch(function(e){console.log(e.response.data),e.response?f.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?f.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):f.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getComment()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.commentId=e.match.params.commentId,this.getComment()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(m.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(p.Row,null,s.a.createElement(p.Col,{md:"12"},s.a.createElement(p.Card,{className:"main-card mb-3"},s.a.createElement(p.CardBody,null,s.a.createElement(p.CardTitle,null,"Commentaire N\xb0",this.state.comment.id,s.a.createElement("div",{className:"pull-right mb-2 mr-2 badge badge-pill badge-success"},this.state.comment.item)),this.state.hasMenu?s.a.createElement(y,{props:this.props}):""))))))}}]),t}(s.a.Component);E.GET_ORDER_URL="/api/comment",t.a=E;var y=function(e){return s.a.createElement(p.Nav,{pills:!0,justified:!0},s.a.createElement(p.NavItem,null,s.a.createElement(p.NavLink,{className:""+e.props.location.pathname===e.props.match.url+"/edition"?"active":"",tag:function(e){return s.a.createElement(h.Link,e)},to:e.props.match.url+"/edition"},s.a.createElement("i",{className:"nav-link-icon pe-7s-settings"}," "),"Edition")))}},777:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),c=n(2),u=(n.n(c),n(5)),l=n.n(u),m=n(4),p=n.n(m),d=n(1),h=n(7),f=(n.n(h),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),b=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.commentId=e.match.params.commentId,n.state={comment:{}},n.handleChange=n.handleChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),f(t,[{key:"handleChange",value:function(e){var t=this,n=e.target,r=n.name,a=n.value;this.setState(function(e){var n=Object.assign({},t.state.comment);return n[r]=a,{comment:n}})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.updateComment()}},{key:"formatData",value:function(){var e=this.state.comment;return delete e.id,delete e.user,delete e.order,delete e.created_date,e}},{key:"updateComment",value:function(){var e=this;l()({method:"PATCH",data:this.formatData(),url:"https://testapi.miamnimaux.com"+t.EDIT_COMMENT_URL+"/"+this.commentId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){h.toast.success("La mise \xe0 jour s'est bien effectu\xe9e !"),e.setState({comment:t.data})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"getComment",value:function(){var e=this;l()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_COMMENT_URL+"/"+this.commentId,headers:{Authorization:"Bearer "+Object(d.b)().token,"Content-Type":"application/json"}}).then(function(t){e.setState({comment:t.data})}).catch(function(e){console.log(e.response.data),e.response?h.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?h.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):h.toast.error("Une erreur s'est produite")})}},{key:"componentDidMount",value:function(){this.getComment()}},{key:"UNSAFE_componentWillReceiveProps",value:function(e){this.commentId=e.match.params.commentId,this.getComment()}},{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(p.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(c.Card,{className:"main-card mb-3"},s.a.createElement(c.CardBody,null,s.a.createElement(c.CardTitle,null,"Edition commentaire N\xb0",this.state.comment.id),s.a.createElement(c.Form,{onSubmit:this.handleSubmit},s.a.createElement(c.Row,{form:!0},s.a.createElement(c.Col,{md:12},s.a.createElement(c.FormGroup,null,s.a.createElement(c.Label,{for:"comment"},"Commentaire"),s.a.createElement(c.Input,{type:"textarea",name:"comment",id:"comment",value:this.state.comment.comment||"",onChange:this.handleChange,placeholder:"Commentaire"})))),s.a.createElement(c.Row,{form:!0},s.a.createElement(c.Col,{md:5},s.a.createElement(c.FormGroup,null,s.a.createElement(c.Label,{for:"note"},"Note"),s.a.createElement(c.Input,{type:"number",name:"note",min:"1",max:"5",id:"note",value:this.state.comment.note||"",onChange:this.handleChange,placeholder:"note"})))),s.a.createElement(c.Button,{color:"primary",type:"submit",className:"mt-2"},"Mettre \xe0 jour"))))))}}]),t}(s.a.Component);b.GET_COMMENT_URL="/api/comment",b.EDIT_COMMENT_URL="/api/comment",t.a=b},778:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function r(a,o){try{var i=t[a](o),s=i.value}catch(e){return void n(e)}if(!i.done)return Promise.resolve(s).then(function(e){r("next",e)},function(e){r("throw",e)});e(s)}return r("next")})}}var s=n(109),c=n.n(s),u=n(0),l=n.n(u),m=n(2),p=(n.n(m),n(5)),d=n.n(p),h=n(4),f=n.n(h),b=n(1),E=n(7),y=(n.n(E),n(53)),v=n.n(y),g=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),C=this,_=function(){var e=i(c.a.mark(function e(t){var n;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=[],e.next=3,d()({method:"GET",url:"https://testapi.miamnimaux.com"+T.SEARCH_USER_URL+t,headers:{Authorization:"Bearer "+Object(b.b)().token,"Content-Type":"application/json"}}).then(function(e){n=e.data.map(function(e){return{value:e.id,label:e.email,name:"user"}})}).catch(function(e){console.log(e)});case 3:return e.abrupt("return",n);case 4:case"end":return e.stop()}},e,C)}));return function(t){return e.apply(this,arguments)}}(),O=function(e,t){if(e.length<3)return[];setTimeout(i(c.a.mark(function n(){return c.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=t,n.next=3,_(e);case 3:n.t1=n.sent,(0,n.t0)(n.t1);case 5:case"end":return n.stop()}},n,C)})),1e3)},T=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.initialState={comment:null,note:null,user:null,order:null},n.state={comment:n.initialState,orderList:[]},n.handleChange=n.handleChange.bind(n),n.handleUserChange=n.handleUserChange.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n}return o(t,e),g(t,[{key:"handleUserChange",value:function(e){var n=this;if(this.handleChange(e),null==this.state.comment.user)return[];d()({method:"GET",url:"https://testapi.miamnimaux.com"+t.GET_USER_ORDER+this.state.comment.user,headers:{Authorization:"Bearer "+Object(b.b)().token,"Content-Type":"application/json"}}).then(function(e){var t=e.data.orders.map(function(e){return{value:e.id,label:e.created_date+" - "+e.price_ti,name:"order"}});n.setState({orderList:t})}).catch(function(e){console.log(e.response.data),e.response?E.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?E.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):E.toast.error("Une erreur s'est produite")})}},{key:"handleChange",value:function(e){var t=e;"undefined"!==typeof e.target&&(t=e.target);var n=t,r=n.name,a=n.value,o=this.state.comment;o[r]=a,this.setState({comment:o})}},{key:"handleSubmit",value:function(e){e.preventDefault(),this.postComment()}},{key:"postComment",value:function(){var e=this;d()({method:"POST",data:this.state.comment,url:"https://testapi.miamnimaux.com"+t.POST_COMMENT_URL,headers:{Authorization:"Bearer "+Object(b.b)().token,"Content-Type":"application/json"}}).then(function(t){E.toast.success("Le commentaire a bien \xe9t\xe9 ajout\xe9 !"),e.props.history.push("/commentaires")}).catch(function(e){console.log(e.response.data),e.response?E.toast.error("Une erreur s'est produite: <br/>"+e.response.data.errors.errors.join(" | ")):e.request?E.toast.error("Une erreur s'est produite lors de l`envoie de la requ\xeate"):E.toast.error("Une erreur s'est produite")})}},{key:"render",value:function(){return l.a.createElement(u.Fragment,null,l.a.createElement(f.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},l.a.createElement(m.Card,{className:"main-card mb-3"},l.a.createElement(m.CardBody,null,l.a.createElement(m.CardTitle,null,"Nouveau commentaire"),l.a.createElement(m.Form,{onSubmit:this.handleSubmit},l.a.createElement(m.Row,{form:!0},l.a.createElement(m.Col,{md:12},l.a.createElement(m.FormGroup,null,l.a.createElement(m.Label,{for:"comment"},"Commentaire"),l.a.createElement(m.Input,{type:"textarea",name:"comment",id:"comment",onChange:this.handleChange,placeholder:"Commentaire"})))),l.a.createElement(m.Row,{form:!0},l.a.createElement(m.Col,{md:5},l.a.createElement(m.FormGroup,null,l.a.createElement(m.Label,{for:"note"},"Note"),l.a.createElement(m.Input,{type:"number",name:"note",min:"1",max:"5",id:"note",onChange:this.handleChange,placeholder:"note"})))),l.a.createElement(m.Row,{form:!0},l.a.createElement(m.Col,{md:6},l.a.createElement(m.FormGroup,null,l.a.createElement(m.Label,{for:"user"},"Utilisateur"),l.a.createElement(v.a,{name:"user",cacheOptions:!0,defaultOptions:!0,onChange:this.handleUserChange,loadOptions:O,className:"basic-multi-select",classNamePrefix:"select"}))),l.a.createElement(m.Col,{md:6},l.a.createElement(m.FormGroup,null,l.a.createElement(m.Label,{for:"order"},"Commandes"),l.a.createElement(v.a,{name:"order",cacheOptions:!0,defaultOptions:this.state.orderList,className:"basic-multi-select",classNamePrefix:"select"})))),l.a.createElement(m.Button,{color:"primary",type:"submit",className:"mt-2"},"Ajouter"))))))}}]),t}(l.a.Component);T.POST_COMMENT_URL="/api/comment",T.SEARCH_USER_URL="/api/user/search/",T.GET_USER_ORDER="/api/order/user/",t.a=T},779:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),s=n.n(i),c=n(4),u=n.n(c),l=n(17),m=n(373),p=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=function(e){function t(e){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={},n}return o(t,e),p(t,[{key:"render",value:function(){return s.a.createElement(i.Fragment,null,s.a.createElement(l.a,{heading:"Liste des commentaires",subheading:"",addLink:"/commentaires/nouveau",icon:"pe-7s-drawer icon-gradient bg-happy-itmeo"}),s.a.createElement(u.a,{component:"div",transitionName:"TabsAnimation",transitionAppear:!0,transitionAppearTimeout:0,transitionEnter:!1,transitionLeave:!1},s.a.createElement(m.a,this.props)))}}]),t}(s.a.Component);t.a=d}});