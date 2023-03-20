import{m as u,p as W,v as H,f as l,a as _,u as c,w as p,F as g,o as n,X as I,b as t,d as b,i as w,B as y,g as C,C as M,O as m,t as U}from"./app-088260e6.js";import{_ as R}from"./AuthenticatedLayout-e8a8a1b0.js";import X from"./Modal-2af52d53.js";import{P as q}from"./Pagination-2cd15f57.js";import"./_plugin-vue_export-helper-c27b6911.js";const z=t("h2",{class:"page-title"},"Notes",-1),G={class:"row mb-3"},J={class:"col"},K=["onClick"],Q={class:"row mb-3"},Y={class:"col-md-6"},Z={class:"row"},ee=t("div",{class:"col-md-2"},[t("label",{class:"form-label"},"Search")],-1),te={class:"col-md-10"},oe={class:"row items mb-3"},se={key:0,class:"col-12"},ae=t("div",{class:"fst-italic mt-3"},"No items",-1),re=[ae],le=["id"],ne={class:"card"},ie={class:"card-body"},ce={class:"card-title"},de=["innerHTML"],ue={class:"actions"},_e=["onClick"],me=["onClick"],ve={key:0,class:"alert alert-danger"},he={class:"mb-3"},fe=t("label",{class:"form-label"},"Title",-1),pe={class:"mb-3"},ge=t("label",{class:"form-label"},"Description",-1),Ne={__name:"Index",props:{user_notes:{type:Object},search_text:{type:String}},setup(d){const T=d,v=u(!1),r=u(null),h=u(T.search_text),x=u(null);W(h,s=>{V(s)});async function V(s){clearTimeout(x.value),x.value=setTimeout(function(){console.log("Searching: "+s),m.get(route("account.notes.index"),{search:s},{preserveState:!0,preserveScroll:!0})},500)}const a=H({id:null,title:null,description:null}),O=()=>{m.get(route("account.notes.index"),{},{preserveState:!1,preserveScroll:!1})},$=()=>{m.reload({preserveState:!1,preserveScroll:!1})};function B(s,o){return s.length>o?s.slice(0,o-1)+" &hellip;":s}const k=()=>{v.value=!0};function f(){v.value=!1,r.value=null,a.reset()}const D=()=>{k()},E=()=>{const s=route("account.notes.store");window.axios.post(s,{title:a.title,description:a.description}).then(o=>{if(o.data.error){if(o.data.error.code==406){r.value=[];let e=o.data.error.errors;Object.entries(e).forEach(i=>{let[N,S]=i;r.value=r.value.concat(S)})}else r.value=[o.data.error.message];return}f(),O()})},P=s=>{const o=route("account.notes.item",{id:s});window.axios.get(o).then(e=>{if(e.data.error){alert(e.data.error.message);return}a.id=e.data.payload.user_note.id,a.title=e.data.payload.user_note.title,a.description=e.data.payload.user_note.description,k()})},j=s=>{const o=route("account.notes.update",{id:s});window.axios.put(o,{title:a.title,description:a.description}).then(e=>{if(e.data.error){if(e.data.error.code==406){r.value=[];let i=e.data.error.errors;Object.entries(i).forEach(N=>{let[S,L]=N;r.value=r.value.concat(L)})}else r.value=[e.data.error.message];return}f(),$()})},A=()=>{a.id?j(a.id):E()};function F(s){var o=confirm("Are you sure to delete the note?");o&&m.delete(route("account.notes.destroy",{id:s}))}return(s,o)=>(n(),l(g,null,[_(c(I),{title:"Notes - Account"}),_(R,null,{header:p(()=>[z]),default:p(()=>[t("div",G,[t("div",J,[t("a",{href:"#",onClick:b(D,["prevent"]),class:"btn btn-primary"},"Add a note",8,K)])]),t("div",Q,[t("div",Y,[t("div",Z,[ee,t("div",te,[w(t("input",{type:"text",class:"form-control","onUpdate:modelValue":o[0]||(o[0]=e=>h.value=e)},null,512),[[y,h.value]])])])])]),t("div",oe,[d.user_notes.data.length==0?(n(),l("div",se,re)):C("",!0),(n(!0),l(g,null,M(d.user_notes.data,e=>(n(),l("div",{id:`user_note-${e.id}`,class:"col-12 col-sm-6 col-md-4 col-lg-3 mb-3"},[t("div",ne,[t("div",ie,[t("h5",ce,U(e.title),1),t("div",{class:"card-text mb-3",innerHTML:B(e.description,50)},null,8,de),t("div",ue,[t("a",{href:"#",onClick:b(i=>P(e.id),["prevent"]),class:"btn btn-primary me-2"},"View",8,_e),t("a",{href:"#",onClick:b(i=>F(e.id),["prevent"]),class:"btn btn-danger"},"Delete",8,me)])])])],8,le))),256))]),_(q,{links:d.user_notes.links},null,8,["links"]),_(X,{show:v.value,onCloseModal:f,onSaveModal:A},{default:p(()=>[r.value?(n(),l("div",ve,[(n(!0),l(g,null,M(r.value,e=>(n(),l("div",null,U(e),1))),256))])):C("",!0),t("div",he,[fe,w(t("input",{type:"text",class:"form-control","onUpdate:modelValue":o[1]||(o[1]=e=>c(a).title=e)},null,512),[[y,c(a).title]])]),t("div",pe,[ge,w(t("textarea",{class:"form-control",rows:"3","onUpdate:modelValue":o[2]||(o[2]=e=>c(a).description=e)},null,512),[[y,c(a).description]])])]),_:1},8,["show"])]),_:1})],64))}};export{Ne as default};