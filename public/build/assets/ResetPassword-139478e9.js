import{v as c,c as _,w as n,o as w,a as e,u as o,X as f,b as r,d as V,e as b,n as g}from"./app-d4e4450e.js";import{_ as v}from"./GuestLayout-0886c7b8.js";import{_ as i,a as d,b as l}from"./TextInput-85ae453e.js";import{_ as x}from"./PrimaryButton-96b58620.js";import"./_plugin-vue_export-helper-c27b6911.js";const y={class:"card mx-auto",style:{"max-width":"400px"}},h={class:"card-body"},k=["onSubmit"],P={class:"mb-3"},$={class:"mb-3"},S={class:"mb-3"},z={__name:"ResetPassword",props:{email:String,token:String},setup(p){const m=p,s=c({token:m.token,email:m.email,password:"",password_confirmation:""}),u=()=>{s.post(route("password.store"),{onFinish:()=>s.reset("password","password_confirmation")})};return(q,a)=>(w(),_(v,null,{default:n(()=>[e(o(f),{title:"Reset Password"}),r("div",y,[r("div",h,[r("form",{onSubmit:V(u,["prevent"])},[r("div",P,[e(i,{for:"email",value:"Email"}),e(d,{id:"email",type:"email",class:"",modelValue:o(s).email,"onUpdate:modelValue":a[0]||(a[0]=t=>o(s).email=t),required:"",autofocus:"",autocomplete:"username"},null,8,["modelValue"]),e(l,{message:o(s).errors.email},null,8,["message"])]),r("div",$,[e(i,{for:"password",value:"Password"}),e(d,{id:"password",type:"password",class:"",modelValue:o(s).password,"onUpdate:modelValue":a[1]||(a[1]=t=>o(s).password=t),required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(l,{message:o(s).errors.password},null,8,["message"])]),r("div",S,[e(i,{for:"password_confirmation",value:"Confirm Password"}),e(d,{id:"password_confirmation",type:"password",class:"",modelValue:o(s).password_confirmation,"onUpdate:modelValue":a[2]||(a[2]=t=>o(s).password_confirmation=t),required:"",autocomplete:"new-password"},null,8,["modelValue"]),e(l,{message:o(s).errors.password_confirmation},null,8,["message"])]),e(x,{class:g(["w-100",{"opacity-25":o(s).processing}]),disabled:o(s).processing},{default:n(()=>[b(" Reset Password ")]),_:1},8,["class","disabled"])],40,k)])])]),_:1}))}};export{z as default};