(this["webpackJsonpfirebase-react-auth"]=this["webpackJsonpfirebase-react-auth"]||[]).push([[0],{107:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a.n(r),c=a(38),l=a.n(c),s=a(0),o=a.n(s),i=a(3),u=a(17),m=a(121),d=a(113),p=a(116),f=a(114),b=a(25),h=a(76),E=(a(97),a(109),a(108),h.a.initializeApp({apiKey:"AIzaSyA-hddie7J-3bSfZygFw3sP0PgXZWQOhNQ",authDomain:"dropbox-ee88c.firebaseapp.com",projectId:"dropbox-ee88c",storageBucket:"dropbox-ee88c.appspot.com",messagingSenderId:"602202076833",appId:"1:602202076833:web:cd17540a05e2e9b5fce2e0",measurementId:"G-3DFFGKD41R"})),g=E.firestore(),v={folders:g.collection("folders"),files:g.collection("files"),formatDoc:function(e){return Object(b.a)({id:e.id},e.data())},getCurrentTimestamp:h.a.firestore.FieldValue.serverTimestamp},w=E.storage(),x=E.auth(),y=n.a.createContext();function j(){return Object(r.useContext)(y)}function O(e){var t=e.children,a=Object(r.useState)(),c=Object(u.a)(a,2),l=c[0],s=c[1],o=Object(r.useState)(!0),i=Object(u.a)(o,2),m=i[0],d=i[1];Object(r.useEffect)((function(){return x.onAuthStateChanged((function(e){s(e),d(!1)}))}),[]);var p={currentUser:l,login:function(e,t){return x.signInWithEmailAndPassword(e,t)},signup:function(e,t){return x.createUserWithEmailAndPassword(e,t)},logout:function(){return x.signOut()},resetPassword:function(e){return x.sendPasswordResetEmail(e)},updateEmail:function(e){return l.updateEmail(e)},updatePassword:function(e){return l.updatePassword(e)}};return n.a.createElement(y.Provider,{value:p},!m&&t)}var N=a(24),k=a(21),F=a(112);function S(e){var t=e.children;return n.a.createElement(F.a,{className:"d-flex align-items-center justify-content-center",style:{minHeight:"80vh"}},n.a.createElement("div",{className:"w-100",style:{maxWidth:"600px"}},t))}var C=a(44),I=a.n(C),P=a(34);function A(){var e=Object(r.useRef)(),t=Object(r.useRef)(),a=Object(r.useRef)(),c=j().signup,l=Object(r.useState)(""),s=Object(u.a)(l,2),b=s[0],h=s[1],E=Object(r.useState)(!1),g=Object(u.a)(E,2),v=g[0],w=g[1],x=Object(N.g)();function y(){return(y=Object(i.a)(o.a.mark((function r(n){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:if(n.preventDefault(),t.current.value===a.current.value){r.next=3;break}return r.abrupt("return",h("Passwords do not match"));case 3:return r.prev=3,h(""),w(!0),r.next=8,c(e.current.value,t.current.value);case 8:x.push("/"),r.next=14;break;case 11:r.prev=11,r.t0=r.catch(3),h("Failed to create an account");case 14:w(!1);case 15:case"end":return r.stop()}}),r,null,[[3,11]])})))).apply(this,arguments)}return n.a.createElement(S,null,n.a.createElement("img",{className:"w-100",style:{padding:100},width:P.isAbsolute,height:P.isAbsolute,src:I.a,alt:""}),n.a.createElement(m.a,null,n.a.createElement(m.a.Body,{className:"bg-dark"},n.a.createElement("h2",{className:"text-right text-white mb-4"},"Sign Up"),b&&n.a.createElement(d.a,{variant:"danger"},b),n.a.createElement(p.a,{onSubmit:function(e){return y.apply(this,arguments)}},n.a.createElement(p.a.Group,{id:"email"},n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"email",type:"email",ref:e,required:!0})),n.a.createElement(p.a.Group,{id:"password"},n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"password",type:"password",ref:t,required:!0})),n.a.createElement(p.a.Group,{id:"password-confirm"},n.a.createElement(p.a.Label,{className:"text-light"}),n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"password confirmation",type:"password",ref:a,required:!0})),n.a.createElement(f.a,{disabled:v,className:"w-100",type:"submit"},"Sign Up"),n.a.createElement("div",{className:"w-100 text-left mt-1 bg-dark text-white p-2 h-50"},"Already have an account? ",n.a.createElement(k.b,{to:"/login"},"Log In"))))))}function U(){var e=Object(r.useState)(""),t=Object(u.a)(e,2),a=t[0],c=t[1],l=j(),s=l.currentUser,p=l.logout,b=Object(N.g)();function h(){return(h=Object(i.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return c(""),e.prev=1,e.next=4,p();case 4:b.push("/login"),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(1),c("Failed to log out");case 10:case"end":return e.stop()}}),e,null,[[1,7]])})))).apply(this,arguments)}return n.a.createElement(S,null,n.a.createElement("img",{className:"w-100",style:{padding:100},width:P.isAbsolute,height:P.isAbsolute,src:I.a,alt:""}),n.a.createElement(m.a,{className:"bg-white"},n.a.createElement(m.a.Body,{className:"text-primary"},n.a.createElement("h2",{className:"text-right text-dark mb-4"},"Profile"),a&&n.a.createElement(d.a,{variant:"danger"},a),n.a.createElement("strong",{className:"text-dark"},"Email:")," ",s.email,n.a.createElement(k.b,{to:"/update-profile",className:"btn btn-primary w-100 mt-3 mb-2"},"Update Profile"),n.a.createElement(f.a,{as:k.b,to:"/",className:"w-100",type:"submit"},"Back"))),n.a.createElement("div",{className:"w-100 text-left mt-2 bg-light"},n.a.createElement(f.a,{variant:"link",onClick:function(){return h.apply(this,arguments)}},"Log Out")))}function D(){var e=Object(r.useRef)(),t=Object(r.useRef)(),a=j().login,c=Object(r.useState)(""),l=Object(u.a)(c,2),s=l[0],b=l[1],h=Object(r.useState)(!1),E=Object(u.a)(h,2),g=E[0],v=E[1],w=Object(N.g)();function x(){return(x=Object(i.a)(o.a.mark((function r(n){return o.a.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return n.preventDefault(),r.prev=1,b(""),v(!0),r.next=6,a(e.current.value,t.current.value);case 6:w.push("/"),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(1),b("Failed to log in");case 12:v(!1);case 13:case"end":return r.stop()}}),r,null,[[1,9]])})))).apply(this,arguments)}return n.a.createElement(S,null,n.a.createElement("img",{className:"w-100",style:{padding:100},width:P.isAbsolute,height:P.isAbsolute,src:I.a,alt:""}),n.a.createElement(m.a,null,n.a.createElement(m.a.Body,{className:"bg-dark"},n.a.createElement("h2",{className:"text-right text-white mb-4 "},"Sign In"),s&&n.a.createElement(d.a,{variant:"danger"},s),n.a.createElement(p.a,{onSubmit:function(e){return x.apply(this,arguments)}},n.a.createElement(p.a.Group,{id:"email"},n.a.createElement(p.a.Label,null),n.a.createElement(p.a.Control,{className:"bg-light text-dark",type:"email",placeholder:"email",ref:e,required:!0})),n.a.createElement(p.a.Group,{id:"password"},n.a.createElement(p.a.Control,{className:"bg-light text-dark",type:"password",placeholder:"password",ref:t,required:!0})),n.a.createElement(f.a,{disabled:g,className:"w-100",type:"submit"},"Login")),n.a.createElement("div",{className:"w-100 text-left mt-3"},n.a.createElement(k.b,{to:"/forgot-password"},"Forgot Password?")),n.a.createElement("div",{className:"w-100 text-left text-white mt-2"},"Don't have an account? ",n.a.createElement(k.b,{to:"/signup"},"Sign Up")))))}var R=a(89);function B(e){var t=e.component,a=Object(R.a)(e,["component"]),r=j().currentUser;return n.a.createElement(N.b,Object.assign({},a,{render:function(e){return r?n.a.createElement(t,e):n.a.createElement(N.a,{to:"/login"})}}))}function G(){var e=Object(r.useRef)(),t=j().resetPassword,a=Object(r.useState)(""),c=Object(u.a)(a,2),l=c[0],s=c[1],b=Object(r.useState)(""),h=Object(u.a)(b,2),E=h[0],g=h[1],v=Object(r.useState)(!1),w=Object(u.a)(v,2),x=w[0],y=w[1];function O(){return(O=Object(i.a)(o.a.mark((function a(r){return o.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return r.preventDefault(),a.prev=1,g(""),s(""),y(!0),a.next=7,t(e.current.value);case 7:g("Check your inbox for further instructions"),a.next=13;break;case 10:a.prev=10,a.t0=a.catch(1),s("Failed to reset password");case 13:y(!1);case 14:case"end":return a.stop()}}),a,null,[[1,10]])})))).apply(this,arguments)}return n.a.createElement(S,null,n.a.createElement("img",{className:"w-100",style:{padding:100},width:P.isAbsolute,height:P.isAbsolute,src:I.a,alt:""}),n.a.createElement(m.a,null,n.a.createElement(m.a.Body,{className:"bg-dark"},n.a.createElement("h2",{className:"text-right mb-4 text-white"},"Password Reset"),l&&n.a.createElement(d.a,{variant:"danger"},l),E&&n.a.createElement(d.a,{variant:"success"},E),n.a.createElement(p.a,{onSubmit:function(e){return O.apply(this,arguments)}},n.a.createElement(p.a.Group,{id:"email"},n.a.createElement(p.a.Control,{className:"text-dark bg-light",type:"email",placeholder:"email",ref:e,required:!0})),n.a.createElement(f.a,{disabled:x,className:"w-100",type:"submit"},"Reset Password")),n.a.createElement("div",{className:"w-100 text-left mt-3 text-white"},"or ",n.a.createElement(k.b,{to:"/login"},"Login")),n.a.createElement("div",{className:"w-100 text-left mt-2 text-white"},"Doesn't have an account? ",n.a.createElement(k.b,{to:"/signup"},"Sign Up")))))}function L(){var e=Object(r.useRef)(),t=Object(r.useRef)(),a=Object(r.useRef)(),c=j(),l=c.currentUser,s=c.updatePassword,o=c.updateEmail,i=Object(r.useState)(""),b=Object(u.a)(i,2),h=b[0],E=b[1],g=Object(r.useState)(!1),v=Object(u.a)(g,2),w=v[0],x=v[1],y=Object(N.g)();return n.a.createElement(S,null,n.a.createElement(m.a,null,n.a.createElement(m.a.Body,{className:"bg-white"},n.a.createElement("h2",{className:"text-right mb-4 text-dark"},"Update Profile"),h&&n.a.createElement(d.a,{variant:"danger"},h),n.a.createElement(p.a,{onSubmit:function(r){if(r.preventDefault(),t.current.value!==a.current.value)return E("Passwords do not match");var n=[];x(!0),E(""),e.current.value!==l.email&&n.push(o(e.current.value)),t.current.value&&n.push(s(t.current.value)),Promise.all(n).then((function(){y.push("/user")})).catch((function(){E("Failed to update account")})).finally((function(){x(!1)}))}},n.a.createElement(p.a.Group,{id:"email"},n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"email",type:"email",ref:e,required:!0,defaultValue:l.email})),n.a.createElement(p.a.Group,{id:"password"},n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"password",type:"password",ref:t})),n.a.createElement(p.a.Group,{id:"password-confirm"},n.a.createElement(p.a.Label,{className:"text-dark"},"Password Confirmation"),n.a.createElement(p.a.Control,{className:"bg-light text-dark",placeholder:"password confirm",type:"password",ref:a})),n.a.createElement(f.a,{disabled:w,className:"w-100 mb-2",type:"submit"},"Update"),n.a.createElement(f.a,{as:k.b,to:"/user",className:"w-100",type:"submit"},"Cancel")))))}var W="select-folder",q="update-folder",z="set-child-folders",T="set-child-files",H={name:"Folders",id:null,path:[]};function J(e,t){var a=t.type,r=t.payload;switch(a){case W:return{folderId:r.folderId,folder:r.folder,childFiles:[],childFolders:[]};case q:return Object(b.a)(Object(b.a)({},e),{},{folder:r.folder});case z:return Object(b.a)(Object(b.a)({},e),{},{childFolders:r.childFolders});case T:return Object(b.a)(Object(b.a)({},e),{},{childFiles:r.childFiles});default:return e}}var K=a(19),Q=a(115),V=a(47),Z=a(48);function M(e){var t=e.currentFolder,a=Object(r.useState)(!1),c=Object(u.a)(a,2),l=c[0],s=c[1],o=Object(r.useState)(""),i=Object(u.a)(o,2),m=i[0],d=i[1],b=j().currentUser;function h(){s(!1)}return n.a.createElement(n.a.Fragment,null,n.a.createElement(f.a,{onClick:function(){s(!0)},variant:"outline-primary m-0 mr-2",size:"sm"},n.a.createElement(V.a,{icon:Z.d,style:{fontSize:20}}),n.a.createElement("h5",{className:"text-center"}," Create Folder")),n.a.createElement(Q.a,{show:l,onHide:h},n.a.createElement(p.a,{className:"bg-white",onSubmit:function(e){if(e.preventDefault(),null!=t){var a=Object(K.a)(t.path);t!==H&&a.push({name:t.name,id:t.id}),v.folders.add({name:m,parentId:t.id,userId:b.uid,path:a,createdAt:v.getCurrentTimestamp()}),d(""),h()}}},n.a.createElement(Q.a.Body,null,n.a.createElement(p.a.Group,null,n.a.createElement(p.a.Label,{className:"text-primary"},"Folder Name:"),n.a.createElement(p.a.Control,{type:"text",className:"bg-light text-dark",required:!0,value:m,onChange:function(e){return d(e.target.value)}}))),n.a.createElement(Q.a.Footer,{className:"bg-light"},n.a.createElement(f.a,{onClick:h},"Cancel"),n.a.createElement(f.a,{type:"submit"},"Create Folder")))))}var X=a(120),_=a(118),Y=a(122);function $(e){var t=e.currentFolder,a=Object(r.useState)([]),c=Object(u.a)(a,2),s=c[0],o=c[1],i=j().currentUser;return n.a.createElement(n.a.Fragment,null,n.a.createElement("label",{className:"btn btn-outline-primary btn-sm m-3"},n.a.createElement(V.a,{icon:Z.b,style:{fontSize:20}}),n.a.createElement("h5",{className:"text-center"},"Upload Data"),n.a.createElement("input",{type:"file",onChange:function(e){var a=e.target.files[0];if(null!=t&&null!=a){var r=Object(X.a)();o((function(e){return[].concat(Object(K.a)(e),[{id:r,name:a.name,progress:0,error:!1}])}));var n=t===H?"".concat(t.path.join("/"),"/").concat(a.name):"".concat(t.path.join("/"),"/").concat(t.name,"/").concat(a.name),c=w.ref("/files/".concat(i.uid,"/").concat(n)).put(a);c.on("state_changed",(function(e){var t=e.bytesTransferred/e.totalBytes;o((function(e){return e.map((function(e){return e.id===r?Object(b.a)(Object(b.a)({},e),{},{progress:t}):e}))}))}),(function(){o((function(e){return e.map((function(e){return e.id===r?Object(b.a)(Object(b.a)({},e),{},{error:!0}):e}))}))}),(function(){o((function(e){return e.filter((function(e){return e.id!==r}))})),c.snapshot.ref.getDownloadURL().then((function(e){v.files.where("name","==",a.name).where("userId","==",i.uid).where("folderId","==",t.id).get().then((function(r){var n=r.docs[0];n?n.ref.update({url:e}):v.files.add({url:e,name:a.name,createdAt:v.getCurrentTimestamp(),folderId:t.id,userId:i.uid})}))}))}))}},style:{opacity:0,position:"absolute",left:"-9999px"}})),s.length>0&&l.a.createPortal(n.a.createElement("div",{style:{position:"absolute",bottom:"1rem",right:"1rem",maxWidth:"250px"}},s.map((function(e){return n.a.createElement(_.a,{key:e.id,onClose:function(){o((function(t){return t.filter((function(t){return t.id!==e.id}))}))}},n.a.createElement(_.a.Header,{closeButton:e.error,className:"text-truncate w-100 d-block"},e.name),n.a.createElement(_.a.Body,null,n.a.createElement(Y.a,{animated:!e.error,variant:e.error?"danger":"primary",now:e.error?100:100*e.progress,label:e.error?"Error":"".concat(Math.round(100*e.progress),"%")})))}))),document.body))}function ee(e){var t=e.folder;return n.a.createElement(f.a,{to:{pathname:"/folder/".concat(t.id),state:{folder:t}},variant:"primary",className:"text-truncate w-100",as:k.b},n.a.createElement(V.a,{icon:Z.c,className:"mr-2"}),t.name)}function te(e){var t=e.file;return n.a.createElement("a",{href:t.url,className:"btn btn-outline-primary text-truncate w-100"},n.a.createElement(V.a,{icon:Z.a,className:"mr-2"}),t.name)}var ae=a(119),re=a(117),ne=a(86),ce=a.n(ne);function le(){return n.a.createElement(ae.a,{style:{backgroundColor:"lightgray"},expand:"sm",className:"d-flex justify-content-between"},n.a.createElement(ae.a.Brand,{as:k.b,to:"/",className:"text-light"},n.a.createElement("img",{src:ce.a,alt:"",width:"200",height:"40"})),n.a.createElement(re.a,null,n.a.createElement(re.a.Link,{as:k.b,to:"/user",className:"text-dark"},"Edit Profile")))}var se=a(123);function oe(e){var t=e.currentFolder,a=t===H?[]:[H];return t&&(a=[].concat(Object(K.a)(a),Object(K.a)(t.path))),n.a.createElement(se.a,{className:"flex-grow-1",listProps:{className:"pl-2 m-2"}},a.map((function(e,t){return n.a.createElement(se.a.Item,{key:e.id,linkAs:k.b,linkProps:{to:{pathname:e.id?"/folder/".concat(e.id):"/",state:{folder:Object(b.a)(Object(b.a)({},e),{},{path:a.slice(1,t)})}}},className:"text-truncate d-inline-block  ",style:{maxWidth:"150px"}},e.name)})),t&&n.a.createElement(se.a.Item,{className:"text-truncate d-inline-block",style:{maxWidth:"200px"},active:!0},t.name))}function ie(){var e=Object(N.i)().folderId,t=Object(N.h)().state,a=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,a=Object(r.useReducer)(J,{folderId:e,folder:t,childFolders:[],childFiles:[]}),n=Object(u.a)(a,2),c=n[0],l=n[1],s=j(),o=s.currentUser;return Object(r.useEffect)((function(){l({type:W,payload:{folderId:e,folder:t}})}),[e,t]),Object(r.useEffect)((function(){if(null==e)return l({type:q,payload:{folder:H}});v.folders.doc(e).get().then((function(e){l({type:q,payload:{folder:v.formatDoc(e)}})})).catch((function(){l({type:q,payload:{folder:H}})}))}),[e]),Object(r.useEffect)((function(){return v.folders.where("parentId","==",e).where("userId","==",o.uid).onSnapshot((function(e){l({type:z,payload:{childFolders:e.docs.map(v.formatDoc)}})}))}),[e,o]),Object(r.useEffect)((function(){return v.files.where("folderId","==",e).where("userId","==",o.uid).onSnapshot((function(e){l({type:T,payload:{childFiles:e.docs.map(v.formatDoc)}})}))}),[e,o]),c}(e,(void 0===t?{}:t).folder),c=a.folder,l=a.childFolders,s=a.childFiles;return n.a.createElement(n.a.Fragment,null,n.a.createElement(le,null),n.a.createElement(F.a,{fluid:!0,className:"bg-white"},n.a.createElement("div",{className:"d-flex align-items-center"},n.a.createElement(oe,{currentFolder:c}),n.a.createElement(M,{currentFolder:c}),n.a.createElement($,{currentFolder:c})),l.length>0&&n.a.createElement("div",{className:"d-flex flex-column"},l.map((function(e){return n.a.createElement("div",{key:e.id,style:{maxWidth:"200px"},className:"p-2"},n.a.createElement(ee,{folder:e}))}))),l.length>0&&s.length>0&&n.a.createElement("hr",null),s.length>0&&n.a.createElement("div",{className:"d-flex flex-wrap "},s.map((function(e){return n.a.createElement("div",{key:e.id,style:{maxWidth:"250px"},className:"p-2"},n.a.createElement(te,{file:e}))})))))}var ue=function(){return n.a.createElement(k.a,null,n.a.createElement(O,null,n.a.createElement(N.d,null,n.a.createElement(B,{exact:!0,path:"/",component:ie}),n.a.createElement(B,{exact:!0,path:"/folder/:folderId",component:ie}),n.a.createElement(B,{path:"/user",component:U}),n.a.createElement(B,{path:"/update-profile",component:L}),n.a.createElement(N.b,{path:"/signup",component:A}),n.a.createElement(N.b,{path:"/login",component:D}),n.a.createElement(N.b,{path:"/forgot-password",component:G}))))};a(106);l.a.render(n.a.createElement(ue,null),document.getElementById("root"))},44:function(e,t,a){e.exports=a.p+"static/media/dropbox.664c609a.png"},86:function(e,t,a){e.exports=a.p+"static/media/dropbox.664c609a.png"},91:function(e,t,a){e.exports=a(107)}},[[91,1,2]]]);
//# sourceMappingURL=main.8d608142.chunk.js.map