"use strict";(globalThis["webpackChunkmac_frontend_spa"]=globalThis["webpackChunkmac_frontend_spa"]||[]).push([[554],{4329:(e,t,a)=>{a.d(t,{o:()=>c});var n=a(1555),i=a(660),l=a(1271);const o="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";function r(e){return l.A.getItem(e)}function s(e,t){l.A.setItem(e,t)}i.api.defaults.headers["client_id"]=r("client_id")??"",i.api.defaults.headers["client_secret"]=r("client_secret")??"",i.api.defaults.baseURL=r("baseUrl")??"http://localhost:8081/api/";const c=(0,n.nY)("agentStore",{state:()=>({template:o,instructions:o,decorator:{before:o,after:o},availableTools:[{name:"Check Inventory",description:"Check inventory details for material in SAP by providing the materialNo as input for paramValue. Please use the materialNo and not materialNumber. This action applies whenever users' intent is 'Stock overview', 'product availability', 'Inventory', 'available stock'. Use the headers to perform the request."},{name:"Show Accounts",description:"Get all accounts from a CRM. This action applies whenever users' intent is 'CRM accounts', 'customers', 'customer accounts', 'accounts'."},{name:"Show Employees",description:"Get all information about employees. This action applies whenever users' intent is 'employees', 'workforce'."}],selectedTools:[!0,!1,!0],error:null,pageTitle:r("pageTitle")??"MuleSoft AI Chain Demo Frontend",agentName:r("agentName")??"Bot agent",userName:r("userName")??"Max"}),getters:{getTemplate:e=>e.template,getInstructions:e=>e.instructions,getDecorator:e=>e.decorator,getAvailableTools:e=>e.availableTools,getSelectedTools:e=>e.selectedTools,getError:e=>e.error,getPageTitle:e=>e.pageTitle,getAgentName:e=>e.agentName,getUserName:e=>e.userName},actions:{saveAgentSettings(){},setBaseUrl(e){s("baseUrl",e),i.api.defaults.baseURL=e},setClientCredentias(e,t){s("client_id",e),s("client_secret",t),i.api.defaults.headers["client_id"]=e,i.api.defaults.headers["client_secret"]=t},setError(e){this.error=e},resetError(){this.error=null},setAgentName(e){s("agentName",e),this.agentName=e},setUserName(e){s("userName",e),this.userName=e},setPageTitle(e){s("pageTitle",e),this.pageTitle=e}}})},4554:(e,t,a)=>{a.r(t),a.d(t,{default:()=>N});var n=a(1758),i=a(8790),l=a(8734),o=a(4907);const r=Object.assign({name:"ExternalLink"},{__name:"ExternalLink",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}},setup(e){const t=e;return(e,a)=>{const l=(0,n.g2)("q-icon"),o=(0,n.g2)("q-item-section"),r=(0,n.g2)("q-item-label"),s=(0,n.g2)("q-item");return(0,n.uX)(),(0,n.Wv)(s,{clickable:"",tag:"a",target:"_blank",href:t.link},{default:(0,n.k6)((()=>[t.icon?((0,n.uX)(),(0,n.Wv)(o,{key:0,avatar:""},{default:(0,n.k6)((()=>[(0,n.bF)(l,{name:t.icon},null,8,["name"])])),_:1})):(0,n.Q3)("",!0),(0,n.bF)(o,null,{default:(0,n.k6)((()=>[(0,n.bF)(r,null,{default:(0,n.k6)((()=>[(0,n.eW)((0,i.v_)(t.title),1)])),_:1}),(0,n.bF)(r,{caption:""},{default:(0,n.k6)((()=>[(0,n.eW)((0,i.v_)(t.caption),1)])),_:1})])),_:1})])),_:1},8,["href"])}}});var s=a(124),c=a(5173),u=a(492),d=a(3796),m=a(8582),p=a.n(m);const g=r,b=g;p()(r,"components",{QItem:s.A,QItemSection:c.A,QIcon:u.A,QItemLabel:d.A});const f=Object.assign({name:"MenuItem"},{__name:"MenuItem",props:{title:{type:String,required:!0},caption:{type:String,default:""},link:{type:String,default:"#"},icon:{type:String,default:""}},setup(e){const t=e;return(e,a)=>{const l=(0,n.g2)("q-icon"),o=(0,n.g2)("q-item-section"),r=(0,n.g2)("q-item-label"),s=(0,n.g2)("q-item");return(0,n.uX)(),(0,n.Wv)(s,{clickable:"",to:t.link},{default:(0,n.k6)((()=>[t.icon?((0,n.uX)(),(0,n.Wv)(o,{key:0,avatar:""},{default:(0,n.k6)((()=>[(0,n.bF)(l,{name:t.icon},null,8,["name"])])),_:1})):(0,n.Q3)("",!0),(0,n.bF)(o,null,{default:(0,n.k6)((()=>[(0,n.bF)(r,null,{default:(0,n.k6)((()=>[(0,n.eW)((0,i.v_)(t.title),1)])),_:1}),(0,n.bF)(r,{caption:""},{default:(0,n.k6)((()=>[(0,n.eW)((0,i.v_)(t.caption),1)])),_:1})])),_:1})])),_:1},8,["to"])}}}),k=f,v=k;p()(f,"components",{QItem:s.A,QItemSection:c.A,QIcon:u.A,QItemLabel:d.A});var _=a(4329);const h=Object.assign({name:"MainLayout"},{__name:"MainLayout",setup(e){const t=(0,_.o)(),a=(0,o.A)();a.dark.set("auto");(0,l.KR)(a.dark.isActive);const r=[{title:"Chat",caption:"Agent conversation",icon:"question_answer",link:"/chat"}],s=[{title:"Agent",caption:"Configure skills and behaviour",icon:"support_agent",link:"/agents"},{title:"Knowledge",caption:"Manage (un-structured) data",icon:"library_books",link:"/knowledge"},{title:"Settings",caption:"App & API properties",icon:"settings",link:"/settings"}],c=[{title:"MAC OSS Home",caption:"mac-project.ai",icon:"favorite",link:"https://mac-project.ai/"},{title:"MAC OSS Docs",caption:"mac-project.ai/docs",icon:"description",link:"https://mac-project.ai/docs"}],u=(0,l.KR)(!1);function d(){u.value=!u.value}return(e,a)=>{const o=(0,n.g2)("q-btn"),m=(0,n.g2)("q-toolbar-title"),p=(0,n.g2)("q-toolbar"),g=(0,n.g2)("q-header"),f=(0,n.g2)("q-list"),k=(0,n.g2)("q-item-label"),_=(0,n.g2)("q-img"),h=(0,n.g2)("q-drawer"),A=(0,n.g2)("router-view"),F=(0,n.g2)("q-page-container"),q=(0,n.g2)("q-layout");return(0,n.uX)(),(0,n.Wv)(q,{view:"hHh lpR fFf"},{default:(0,n.k6)((()=>[(0,n.bF)(g,null,{default:(0,n.k6)((()=>[(0,n.bF)(p,null,{default:(0,n.k6)((()=>[(0,n.bF)(o,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:d}),(0,n.bF)(m,null,{default:(0,n.k6)((()=>[(0,n.eW)((0,i.v_)((0,l.R1)(t).getPageTitle),1)])),_:1}),a[1]||(a[1]=(0,n.Lk)("div",{class:"text-overline"},"v0.1alpha",-1))])),_:1})])),_:1}),(0,n.bF)(h,{modelValue:u.value,"onUpdate:modelValue":a[0]||(a[0]=e=>u.value=e),"show-if-above":"",bordered:""},{default:(0,n.k6)((()=>[(0,n.bF)(f,{class:"q-pt-md"},{default:(0,n.k6)((()=>[((0,n.uX)(),(0,n.CE)(n.FK,null,(0,n.pI)(r,(e=>(0,n.bF)(v,(0,n.v6)({key:e.title,ref_for:!0},e),null,16))),64))])),_:1}),(0,n.bF)(f,null,{default:(0,n.k6)((()=>[(0,n.bF)(k,{header:""},{default:(0,n.k6)((()=>a[2]||(a[2]=[(0,n.eW)(" Agent Capabilities ")]))),_:1}),((0,n.uX)(),(0,n.CE)(n.FK,null,(0,n.pI)(s,(e=>(0,n.bF)(v,(0,n.v6)({key:e.title,ref_for:!0},e),null,16))),64))])),_:1}),(0,n.bF)(f,null,{default:(0,n.k6)((()=>[(0,n.bF)(k,{header:""},{default:(0,n.k6)((()=>a[3]||(a[3]=[(0,n.eW)(" External Links ")]))),_:1}),((0,n.uX)(),(0,n.CE)(n.FK,null,(0,n.pI)(c,(e=>(0,n.bF)(b,(0,n.v6)({key:e.title,ref_for:!0},e),null,16))),64))])),_:1}),(0,n.bF)(_,{style:{width:"50px",position:"absolute",bottom:"0"},src:"/icons/mac-icon.svg",class:"q-ma-md self-end"})])),_:1},8,["modelValue"]),(0,n.bF)(F,null,{default:(0,n.k6)((()=>[(0,n.bF)(A)])),_:1})])),_:1})}}});var A=a(2008),F=a(8416),q=a(6914),y=a(1693),S=a(9150),T=a(6056),I=a(3999),Q=a(2665),C=a(5205);const w=h,N=w;p()(h,"components",{QLayout:A.A,QHeader:F.A,QToolbar:q.A,QBtn:y.A,QToolbarTitle:S.A,QDrawer:T.A,QList:I.A,QItemLabel:d.A,QImg:Q.A,QPageContainer:C.A})}}]);