"use strict";(globalThis["webpackChunkfrontend"]=globalThis["webpackChunkfrontend"]||[]).push([[285],{5285:(e,s,t)=>{t.r(s),t.d(s,{default:()=>P});var o=t(9835),i=t(6970);const l={class:"q-pa-md row justify-center items-start",style:{"min-height":"100vh"}},n=(0,o._)("div",{class:"q-pa-md text-h6 text-center col-12"},"Jobs applied",-1),p={class:"",style:{"max-width":"900px"}},a=["onClick"],r=["onClick"],c={class:"q-pa-md"},d={key:0,class:"q-pa-md bg-blue text-white"},h={key:1,class:"q-pa-md bg-green text-white"},u={key:2,class:"q-pa-md bg-red text-white"},w=(0,o.Uk)("Show response"),g={key:1,class:"text-subtitle2"};function k(e,s,t,k,m,b){const y=(0,o.up)("q-btn"),v=(0,o.up)("q-page-sticky");return(0,o.wg)(),(0,o.iD)("div",l,[(0,o.Wm)(v,{position:"top-left",offset:[18,18],onClick:s[0]||(s[0]=s=>e.$router.push(`/profile/${this.store.user.slug}`))},{default:(0,o.w5)((()=>[(0,o.Wm)(y,{fab:"",icon:"arrow_back",color:"primary"})])),_:1}),n,(0,o._)("div",null,[((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(e.proposals,((s,t)=>((0,o.wg)(),(0,o.iD)("div",{key:s._id,class:"q-pa-md row justify-between items-center"},[(0,o._)("div",p,[(0,o._)("div",{class:"text-h6 cursor-pointer",onClick:e=>this.$router.push(`/jobpost/${s.jobPost.slug}`)}," Job title: "+(0,i.zw)(s.jobPost.title),9,a),(0,o._)("div",{class:"text-h6 text-primary cursor-pointer",onClick:e=>this.$router.push(`/profile/${s.company.slug}`)}," Company: "+(0,i.zw)(s.company.username),9,r)]),(0,o._)("div",c,[s.isPending?((0,o.wg)(),(0,o.iD)("div",d," Pending ")):(0,o.kq)("",!0),!s.isPending&&s.isAccepted?((0,o.wg)(),(0,o.iD)("div",h," Accepted ")):(0,o.kq)("",!0),s.isPending||s.isAccepted?(0,o.kq)("",!0):((0,o.wg)(),(0,o.iD)("div",u," Rejected "))]),s.isPending?(0,o.kq)("",!0):((0,o.wg)(),(0,o.j4)(y,{key:0,class:"col-12",onClick:t=>e.showResponse(s)},{default:(0,o.w5)((()=>[w])),_:2},1032,["onClick"])),e.showResponseModel&&s.title===e.responseTitle?((0,o.wg)(),(0,o.iD)("div",g,(0,i.zw)(s.response),1)):(0,o.kq)("",!0)])))),128))])])}var m=t(1569),b=t(861);const y=(0,o.aZ)({name:"JobsApplied",setup(){const e=(0,b.E)();return{store:e}},data(){return{proposals:[],proposalTitle:"",showResponseModel:!1}},methods:{showResponse(e){this.proposalTitle=e.title,this.showResponseModel=!this.showResponseModel},getAppliedJobs(){m.api.get("/proposal/myproposals").then((e=>{this.proposals=e.data.proposal,console.log(e.data)}))}},mounted(){setTimeout((()=>{this.getAppliedJobs()}),500)}});var v=t(1639),f=t(627),q=t(8879),x=t(9984),C=t.n(x);const _=(0,v.Z)(y,[["render",k]]),P=_;C()(y,"components",{QPageSticky:f.Z,QBtn:q.Z})}}]);