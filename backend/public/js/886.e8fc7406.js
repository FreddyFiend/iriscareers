(globalThis["webpackChunkfrontend"]=globalThis["webpackChunkfrontend"]||[]).push([[886],{861:(s,e,o)=>{"use strict";o.d(e,{E:()=>l});var t=o(2502);const l=(0,t.Q_)("iris",{state:()=>({phone:"",user:JSON.parse(localStorage.getItem("user")),isLoggedIn:!1}),getters:{getUser:s=>s.user,getIsLoggedIn:s=>s.isLoggedIn},actions:{changeUsername(s){this.username=s},changeLoginState(s){this.isLoggedIn=s},setUser(s){this.user=s}}})},8886:(s,e,o)=>{"use strict";o.r(e),o.d(e,{default:()=>os});var t=o(9835),l=o(6970),a=o(3001),r=o.n(a);const i=s=>((0,t.dD)("data-v-24789910"),s=s(),(0,t.Cn)(),s),c={class:"row q-col-gutter-md"},n={class:"q-py-md row justify-center items-start"},d={class:"col-md-3 col-sm-4 col-xs-12 text-center"},u={class:"q-pa-md profile q-ma-sm bg-white shadow-6 row",style:{"border-radius":"12px"}},m=i((()=>(0,t._)("img",{src:r()},null,-1))),p={class:"col-12"},g={class:"col-12 text-subtitle2"},h=i((()=>(0,t._)("div",{class:"q-px-md text-subtitle1"},"Basic info:",-1))),w=i((()=>(0,t._)("div",{class:"q-mx-md hr"},null,-1))),b={class:"q-pa-md text-black text-subtitle2"},v=i((()=>(0,t._)("div",{class:"q-pa-md q-ma-sm profile bg-white shadow-6 row",style:{"border-radius":"12px"}},[(0,t._)("h5",null,"Address")],-1))),x={class:"col-md-9 col-sm-8 col-xs-12"},f={class:"profession q-ma-sm q-pa-md col-12 bg-white shadow-6",style:{"border-radius":"12px"}},_=i((()=>(0,t._)("h5",null,"Professions",-1))),q={class:"text-h6"},y=i((()=>(0,t._)("div",{class:"text-subtitle2"},"Areas of work:",-1))),k={class:"text-subtitle2"},z=(0,t.Uk)(" Skill: "),S={class:"education q-ma-sm q-pa-md col-12 bg-white shadow-6",style:{"border-radius":"12px"}},W=i((()=>(0,t._)("h5",null,"Education",-1))),C=i((()=>(0,t._)("div",{class:"text-subtitle2"},"empty",-1))),Z={class:"experience q-ma-sm q-pa-md col-12 bg-white shadow-6",style:{"border-radius":"12px"}},I=i((()=>(0,t._)("h5",null,"Experience",-1))),L=i((()=>(0,t._)("div",{class:"text-subtitle2"},"empty",-1)));function E(s,e,o,a,r,i){const E=(0,t.up)("dashboardCard"),U=(0,t.up)("q-avatar"),Q=(0,t.up)("q-knob"),V=(0,t.up)("q-icon"),A=(0,t.up)("q-btn"),D=(0,t.up)("q-chip"),J=(0,t.up)("q-rating"),P=(0,t.up)("q-page");return(0,t.wg)(),(0,t.j4)(P,{class:"q-pa-md bg-grey-2"},{default:(0,t.w5)((()=>[(0,t._)("div",c,[(0,t.Wm)(E,{class:"col-md-3 col-sm-6 col-xs-12",icon:"cases",color:"blue-4",title:"JOB OFFERS",caption:"24"}),(0,t.Wm)(E,{class:"col-md-3 col-sm-6 col-xs-12",icon:"assignment",color:"cyan-4",title:"JOBS APPLIED",caption:"52"}),(0,t.Wm)(E,{class:"col-md-3 col-sm-6 col-xs-12",icon:"person",color:"green-4",title:"PROFILE VIEWS",caption:"45"}),(0,t.Wm)(E,{class:"col-md-3 col-sm-6 col-xs-12",icon:"mail",color:"yellow-4",title:"MESSAGES",caption:"3"})]),(0,t.Uk)(" "+(0,l.zw)(s.store),1),(0,t._)("div",n,[(0,t._)("div",d,[(0,t._)("div",u,[(0,t.Wm)(Q,{"show-value":"","font-size":"10px",class:"q-ma-md col shadow-box",modelValue:s.profileCompleted,"onUpdate:modelValue":e[0]||(e[0]=e=>s.profileCompleted=e),size:"130px",thickness:.1,color:"primary","track-color":"grey-1"},{default:(0,t.w5)((()=>[(0,t.Wm)(U,{size:"100px",class:"shadow-6"},{default:(0,t.w5)((()=>[m])),_:1})])),_:1},8,["modelValue","thickness"]),(0,t._)("h6",p,(0,l.zw)(s.store.user.username),1),(0,t._)("div",g,(0,l.zw)(s.store.user.email),1),h,w,(0,t.Wm)(V,{class:"q-pa-md",name:"phone",size:"24px"}),(0,t._)("div",b,(0,l.zw)(s.user.phone),1)]),v]),(0,t._)("div",x,[(0,t._)("div",f,[(0,t.Wm)(A,{icon:"edit",class:"float-right",onClick:e[1]||(e[1]=e=>s.$router.push("addprofession"))}),_,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(s.user.professions,((s,e)=>((0,t.wg)(),(0,t.iD)("div",{class:"q-pa-md",key:e},[(0,t._)("div",q,(0,l.zw)(s.profession),1),y,((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)(s.subProfession,((s,e)=>((0,t.wg)(),(0,t.iD)("div",{key:e},[(0,t.Wm)(D,null,{default:(0,t.w5)((()=>[(0,t.Uk)((0,l.zw)(s),1)])),_:2},1024)])))),128)),(0,t._)("div",k,[z,(0,t.Wm)(J,{modelValue:s.skillLevel,"onUpdate:modelValue":e=>s.skillLevel=e,size:"1.5em",color:"primary",readonly:""},null,8,["modelValue","onUpdate:modelValue"])])])))),128))]),(0,t._)("div",S,[(0,t.Wm)(A,{onClick:e[2]||(e[2]=e=>s.$router.push("addeducation")),icon:"add",class:"float-right"}),W,C]),(0,t._)("div",Z,[(0,t.Wm)(A,{icon:"add",class:"float-right"}),I,L])])]),(0,t.Uk)(" "+(0,l.zw)(s.user),1)])),_:1})}var U=o(499),Q=o(861);const V={class:"card bg-white row justify-between items-center shadow-6",style:{"border-radius":"12px"}},A={class:"q-pa-md text-right row"},D={class:"col-12"},J={class:"col-12 q-px-md text-subtitle2"};function P(s,e,o,a,r,i){const c=(0,t.up)("q-avatar");return(0,t.wg)(),(0,t.iD)("div",null,[(0,t._)("div",V,[(0,t.Wm)(c,{icon:s.icon,color:s.color,"text-color":"white",class:"q-ma-md",size:"90px"},null,8,["icon","color"]),(0,t._)("div",A,[(0,t._)("h6",D,(0,l.zw)(s.title),1),(0,t._)("div",J,(0,l.zw)(s.caption),1)])])])}const B=(0,t.aZ)({name:"dashboardCard",props:["icon","color","title","caption"]});var O=o(1639),j=o(1357),F=o(9984),H=o.n(F);const K=(0,O.Z)(B,[["render",P]]),R=K;H()(B,"components",{QAvatar:j.Z});var T=o(1569);const Y=(0,t.aZ)({name:"myprofile",setup(){const s=(0,Q.E)();console.log(s.user),console.log("store.user");const e=[{title:"Job Suggeston",number:4},{title:"Job Suggeston",number:4},{title:"Job Suggeston",number:4},{title:"Job Suggeston",number:4}];let o=(0,U.iH)(45);return{store:s,profileCompleted:o,cards:e}},name:"mycareerprofile",data(){return{user:{},professionsLength:0}},mounted(){try{T.api.defaults.headers.common.Authorization="Bearer "+this.store.user.token}catch(s){console.log(s)}T.api.get("user/info").then((s=>{console.log(s.data),this.user=s.data.user,this.professionsLength=this.user.professions.length}))},components:{dashboardCard:R}});var $=o(9885),G=o(7788),M=o(2857),N=o(8879),X=o(7691),ss=o(1570);const es=(0,O.Z)(Y,[["render",E],["__scopeId","data-v-24789910"]]),os=es;H()(Y,"components",{QPage:$.Z,QKnob:G.Z,QAvatar:j.Z,QIcon:M.Z,QBtn:N.Z,QChip:X.Z,QRating:ss.Z})},3001:(s,e,o)=>{s.exports=o.p+"img/person-4.b8096f13.jpg"}}]);