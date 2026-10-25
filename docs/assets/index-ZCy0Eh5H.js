(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(o){if(o.ep)return;o.ep=!0;const s=r(o);fetch(o.href,s)}})();const Lo="modulepreload",Oo=function(t,e){return new URL(t,e).href},Ir={},An=function(e,r,n){let o=Promise.resolve();if(r&&r.length>0){let i=function(l){return Promise.all(l.map(g=>Promise.resolve(g).then(E=>({status:"fulfilled",value:E}),E=>({status:"rejected",reason:E}))))};const a=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),d=(c==null?void 0:c.nonce)||(c==null?void 0:c.getAttribute("nonce"));o=i(r.map(l=>{if(l=Oo(l,n),l in Ir)return;Ir[l]=!0;const g=l.endsWith(".css"),E=g?'[rel="stylesheet"]':"";if(!!n)for(let w=a.length-1;w>=0;w--){const k=a[w];if(k.href===l&&(!g||k.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${E}`))return;const I=document.createElement("link");if(I.rel=g?"stylesheet":Lo,g||(I.as="script"),I.crossOrigin="",I.href=l,d&&I.setAttribute("nonce",d),document.head.appendChild(I),g)return new Promise((w,k)=>{I.addEventListener("load",w),I.addEventListener("error",()=>k(new Error(`Unable to preload CSS for ${l}`)))})}))}function s(i){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=i,window.dispatchEvent(a),!a.defaultPrevented)throw i}return o.then(i=>{for(const a of i||[])a.status==="rejected"&&s(a.reason);return e().catch(s)})},Bo=new Set(["15551234567","9647501234567","1234567890"]);function _e(t){const e=String(t||"").replace(/\D/g,"");return e.length<8||e.length>15||Bo.has(e)?null:e}function kr(t,e){const r=_e(t);return r?`https://wa.me/${r}?text=${encodeURIComponent(e)}`:null}const Ar={en:{greeting:t=>`Hello ${t}! I'd like to place an order:`,no:"No",subtotal:"Subtotal",discount:"Discount",delivery:"Delivery",free:"Free",pickup:"Pickup",tax:"Tax",total:"Total",name:"Name",phone:"Phone",address:"Delivery address",when:"Requested date & time",note:"Note for the baker",orderRef:"Order reference"},ku:{greeting:t=>`سڵاو ${t}! دەمەوێت ئەم داواکارییە تۆمار بکەم:`,no:"بەبێ",subtotal:"کۆی لاوەکی",discount:"داشکاندن",delivery:"گەیاندن",free:"خۆڕایی",pickup:"وەرگرتن لە چێشتخانە",tax:"باج",total:"کۆی گشتی",name:"ناو",phone:"ژمارەی مۆبایل",address:"ناونیشانی گەیاندن",when:"بەروار و کاتی داواکراو",note:"تێبینی بۆ شیرینیپەز",orderRef:"ژمارەی داواکاری"}};function Mo({lang:t="en",shopName:e,lines:r,breakdown:n,fmt:o,customer:s={},fulfillmentText:i="",note:a="",orderRef:c=""}){const d=Ar[t]||Ar.en,l=[d.greeting(e),""];for(const g of r)l.push(`• ${g.qty} × ${g.name} — ${o(g.lineTotalUSD)}`),g.excludeLabels&&g.excludeLabels.length&&l.push(`   ${g.excludeLabels.map(E=>`${d.no} ${E}`).join(" · ")}`);return l.push("",`${d.subtotal}: ${o(n.subtotal)}`),n.discount>0&&l.push(`${d.discount}${n.promoCodeName?` (${n.promoCodeName})`:""}: −${o(n.discount)}`),n.isPickupOnly?l.push(`${d.delivery}: ${d.pickup}`):n.isFreeDelivery?l.push(`${d.delivery}: ${d.free}`):l.push(`${d.delivery}: ${o(n.delivery)}`),n.tax>0&&l.push(`${d.tax} (${n.taxLabel} ${n.taxRate}%): ${o(n.tax)}`),l.push("────────────────",`${d.total}: ${o(n.total)}`,""),s.name&&l.push(`${d.name}: ${s.name}`),s.phone&&l.push(`${d.phone}: ${s.phone}`),i&&l.push(`${d.when}: ${i}`),l.push(`${d.address}: ${s.address||""}`),a&&l.push("",`${d.note}: ${a}`),c&&l.push("",`${d.orderRef}: ${c}`),l.join(`
`)}const Fo=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;function Uo(t){if(typeof t!="string")return!1;try{const e=new URL(t);return e.protocol==="https:"&&e.pathname.replace(/\/+$/,"").length>1}catch{return!1}}function Vo(t={},{name:e="Yummy Sweets",description:r="",url:n="",image:o=""}={}){var g;const s={"@context":"https://schema.org","@type":"Bakery",name:e};r&&(s.description=r),n&&(s.url=n),o&&(s.image=o);const i=t.contact||{},a=_e(i.phone)||_e(i.whatsapp);a&&(s.telephone=`+${a}`);const c=String(i.email||"").trim();Fo.test(c)&&(s.email=c);const d=String(((g=i.address)==null?void 0:g.en)||"").trim();s.address={"@type":"PostalAddress",addressLocality:"Erbil",addressCountry:"IQ"},d&&(s.address.streetAddress=d);const l=Object.values(t.socials||{}).map(E=>typeof E=="string"?E:E==null?void 0:E.url).filter(Uo);return l.length&&(s.sameAs=l),s}const qo=()=>{};var Tr={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=function(t){const e=[];let r=0;for(let n=0;n<t.length;n++){let o=t.charCodeAt(n);o<128?e[r++]=o:o<2048?(e[r++]=o>>6|192,e[r++]=o&63|128):(o&64512)===55296&&n+1<t.length&&(t.charCodeAt(n+1)&64512)===56320?(o=65536+((o&1023)<<10)+(t.charCodeAt(++n)&1023),e[r++]=o>>18|240,e[r++]=o>>12&63|128,e[r++]=o>>6&63|128,e[r++]=o&63|128):(e[r++]=o>>12|224,e[r++]=o>>6&63|128,e[r++]=o&63|128)}return e},Ho=function(t){const e=[];let r=0,n=0;for(;r<t.length;){const o=t[r++];if(o<128)e[n++]=String.fromCharCode(o);else if(o>191&&o<224){const s=t[r++];e[n++]=String.fromCharCode((o&31)<<6|s&63)}else if(o>239&&o<365){const s=t[r++],i=t[r++],a=t[r++],c=((o&7)<<18|(s&63)<<12|(i&63)<<6|a&63)-65536;e[n++]=String.fromCharCode(55296+(c>>10)),e[n++]=String.fromCharCode(56320+(c&1023))}else{const s=t[r++],i=t[r++];e[n++]=String.fromCharCode((o&15)<<12|(s&63)<<6|i&63)}}return e.join("")},Pn={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const r=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[];for(let o=0;o<t.length;o+=3){const s=t[o],i=o+1<t.length,a=i?t[o+1]:0,c=o+2<t.length,d=c?t[o+2]:0,l=s>>2,g=(s&3)<<4|a>>4;let E=(a&15)<<2|d>>6,S=d&63;c||(S=64,i||(E=64)),n.push(r[l],r[g],r[E],r[S])}return n.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(Tn(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Ho(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const r=e?this.charToByteMapWebSafe_:this.charToByteMap_,n=[];for(let o=0;o<t.length;){const s=r[t.charAt(o++)],a=o<t.length?r[t.charAt(o)]:0;++o;const d=o<t.length?r[t.charAt(o)]:64;++o;const g=o<t.length?r[t.charAt(o)]:64;if(++o,s==null||a==null||d==null||g==null)throw new jo;const E=s<<2|a>>4;if(n.push(E),d!==64){const S=a<<4&240|d>>2;if(n.push(S),g!==64){const I=d<<6&192|g;n.push(I)}}}return n},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class jo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const zo=function(t){const e=Tn(t);return Pn.encodeByteArray(e,!0)},nt=function(t){return zo(t).replace(/\./g,"")},Wo=function(t){try{return Pn.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Go(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ko=()=>Go().__FIREBASE_DEFAULTS__,Qo=()=>{if(typeof process>"u"||typeof Tr>"u")return;const t=Tr.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Yo=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&Wo(t[1]);return e&&JSON.parse(e)},yt=()=>{try{return qo()||Ko()||Qo()||Yo()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Jo=t=>{var e,r;return(r=(e=yt())==null?void 0:e.emulatorHosts)==null?void 0:r[t]},Xo=t=>{const e=Jo(t);if(!e)return;const r=e.lastIndexOf(":");if(r<=0||r+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const n=parseInt(e.substring(r+1),10);return e[0]==="["?[e.substring(1,r-1),n]:[e.substring(0,r),n]},Dn=()=>{var t;return(t=yt())==null?void 0:t.config},Fl=t=>{var e;return(e=yt())==null?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zo{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,r)=>{this.resolve=e,this.reject=r})}wrapCallback(e){return(r,n)=>{r?this.reject(r):this.resolve(n),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(r):e(r,n))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const r={alg:"none",type:"JWT"},n=e||"demo-project",o=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const i={iss:`https://securetoken.google.com/${n}`,aud:n,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}},...t};return[nt(JSON.stringify(r)),nt(JSON.stringify(i)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cn(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ul(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cn())}function ts(){var e;const t=(e=yt())==null?void 0:e.forceEnvironment;if(t==="node")return!0;if(t==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Vl(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function ql(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Hl(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function jl(){const t=Cn();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function zl(){return!ts()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function rs(){try{return typeof indexedDB=="object"}catch{return!1}}function ns(){return new Promise((t,e)=>{try{let r=!0;const n="validate-browser-context-for-indexeddb-analytics-module",o=self.indexedDB.open(n);o.onsuccess=()=>{o.result.close(),r||self.indexedDB.deleteDatabase(n),t(!0)},o.onupgradeneeded=()=>{r=!1},o.onerror=()=>{var s;e(((s=o.error)==null?void 0:s.message)||"")}}catch(r){e(r)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os="FirebaseError";class Pe extends Error{constructor(e,r,n){super(r),this.code=e,this.customData=n,this.name=os,Object.setPrototypeOf(this,Pe.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,xn.prototype.create)}}class xn{constructor(e,r,n){this.service=e,this.serviceName=r,this.errors=n}create(e,...r){const n=r[0]||{},o=`${this.service}/${e}`,s=this.errors[e],i=s?ss(s,n):"Error",a=`${this.serviceName}: ${i} (${o}).`;return new Pe(o,a,n)}}function ss(t,e){try{let r=0,n="";for(;r<t.length;){const o=t.indexOf("{$",r);if(o===-1){n+=t.substring(r);break}const s=t.indexOf("}",o+2);if(s===-1){n+=t.substring(r);break}const i=t.substring(o+2,s),a=e[i];n+=t.substring(r,o)+(a!=null?String(a):`<${i}?>`),r=s+1}return n}catch{return t}}function Wl(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function ot(t,e){if(t===e)return!0;const r=Object.keys(t),n=Object.keys(e);for(const o of r){if(!n.includes(o))return!1;const s=t[o],i=e[o];if(Pr(s)&&Pr(i)){if(!ot(s,i))return!1}else if(s!==i)return!1}for(const o of n)if(!r.includes(o))return!1;return!0}function Pr(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gl(t){const e=[];for(const[r,n]of Object.entries(t))Array.isArray(n)?n.forEach(o=>{e.push(encodeURIComponent(r)+"="+encodeURIComponent(o))}):e.push(encodeURIComponent(r)+"="+encodeURIComponent(n));return e.length?"&"+e.join("&"):""}function Kl(t){const e={};return t.replace(/^\?/,"").split("&").forEach(n=>{if(n){const[o,s]=n.split("=");e[decodeURIComponent(o)]=decodeURIComponent(s)}}),e}function Ql(t){const e=t.indexOf("?");if(!e)return"";const r=t.indexOf("#",e);return t.substring(e,r>0?r:void 0)}function Yl(t,e){const r=new is(t,e);return r.subscribe.bind(r)}class is{constructor(e,r){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=r,this.task.then(()=>{e(this)}).catch(n=>{this.error(n)})}next(e){this.forEachObserver(r=>{r.next(e)})}error(e){this.forEachObserver(r=>{r.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,r,n){let o;if(e===void 0&&r===void 0&&n===void 0)throw new Error("Missing Observer.");as(e,["next","error","complete"])?o=e:o={next:e,error:r,complete:n},o.next===void 0&&(o.next=It),o.error===void 0&&(o.error=It),o.complete===void 0&&(o.complete=It);const s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?o.error(this.finalError):o.complete()}catch{}}),this.observers.push(o),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let r=0;r<this.observers.length;r++)this.sendOne(r,e)}sendOne(e,r){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{r(this.observers[e])}catch(n){typeof console<"u"&&console.error&&console.error(n)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function as(t,e){if(typeof t!="object"||t===null)return!1;for(const r of e)if(r in t&&typeof t[r]=="function")return!0;return!1}function It(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ae(t){return t&&t._delegate?t._delegate:t}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rn(t){try{return(t.startsWith("http://")||t.startsWith("https://")?new URL(t).hostname:t).endsWith(".cloudworkstations.dev")}catch{return!1}}async function ls(t){return(await fetch(t,{credentials:"include"})).ok}class Fe{constructor(e,r,n){this.name=e,this.instanceFactory=r,this.type=n,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const me="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e,r){this.name=e,this.container=r,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const r=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(r)){const n=new Zo;if(this.instancesDeferred.set(r,n),this.isInitialized(r)||this.shouldAutoInitialize())try{const o=this.getOrInitializeService({instanceIdentifier:r});o&&n.resolve(o)}catch{}}return this.instancesDeferred.get(r).promise}getImmediate(e){const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),n=(e==null?void 0:e.optional)??!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(n)return null;throw o}else{if(n)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(ds(e))try{this.getOrInitializeService({instanceIdentifier:me})}catch{}for(const[r,n]of this.instancesDeferred.entries()){const o=this.normalizeInstanceIdentifier(r);try{const s=this.getOrInitializeService({instanceIdentifier:o});n.resolve(s)}catch{}}}}clearInstance(e=me){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(r=>"INTERNAL"in r).map(r=>r.INTERNAL.delete()),...e.filter(r=>"_delete"in r).map(r=>r._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=me){return this.instances.has(e)}getOptions(e=me){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:r={}}=e,n=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(n))throw Error(`${this.name}(${n}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const o=this.getOrInitializeService({instanceIdentifier:n,options:r});for(const[s,i]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(s);n===a&&i.resolve(o)}return o}onInit(e,r){const n=this.normalizeInstanceIdentifier(r),o=this.onInitCallbacks.get(n)??new Set;o.add(e),this.onInitCallbacks.set(n,o);const s=this.instances.get(n);return s&&e(s,n),()=>{o.delete(e)}}invokeOnInitCallbacks(e,r){const n=this.onInitCallbacks.get(r);if(n)for(const o of n)try{o(e,r)}catch{}}getOrInitializeService({instanceIdentifier:e,options:r={}}){let n=this.instances.get(e);if(!n&&this.component&&(n=this.component.instanceFactory(this.container,{instanceIdentifier:us(e),options:r}),this.instances.set(e,n),this.instancesOptions.set(e,r),this.invokeOnInitCallbacks(n,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,n)}catch{}return n||null}normalizeInstanceIdentifier(e=me){return this.component?this.component.multipleInstances?e:me:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function us(t){return t===me?void 0:t}function ds(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hs{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const r=this.getProvider(e.name);if(r.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);r.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const r=new cs(e,this);return this.providers.set(e,r),r}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var $;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})($||($={}));const ms={debug:$.DEBUG,verbose:$.VERBOSE,info:$.INFO,warn:$.WARN,error:$.ERROR,silent:$.SILENT},ps=$.INFO,fs={[$.DEBUG]:"log",[$.VERBOSE]:"log",[$.INFO]:"info",[$.WARN]:"warn",[$.ERROR]:"error"},gs=(t,e,...r)=>{if(e<t.logLevel)return;const n=new Date().toISOString(),o=fs[e];if(o)console[o](`[${n}]  ${t.name}:`,...r);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class $n{constructor(e){this.name=e,this._logLevel=ps,this._logHandler=gs,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in $))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ms[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,$.DEBUG,...e),this._logHandler(this,$.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,$.VERBOSE,...e),this._logHandler(this,$.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,$.INFO,...e),this._logHandler(this,$.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,$.WARN,...e),this._logHandler(this,$.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,$.ERROR,...e),this._logHandler(this,$.ERROR,...e)}}const ys=(t,e)=>e.some(r=>t instanceof r);let Dr,Cr;function vs(){return Dr||(Dr=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function bs(){return Cr||(Cr=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Nn=new WeakMap,Ut=new WeakMap,Ln=new WeakMap,kt=new WeakMap,tr=new WeakMap;function ws(t){const e=new Promise((r,n)=>{const o=()=>{t.removeEventListener("success",s),t.removeEventListener("error",i)},s=()=>{r(ue(t.result)),o()},i=()=>{n(t.error),o()};t.addEventListener("success",s),t.addEventListener("error",i)});return e.then(r=>{r instanceof IDBCursor&&Nn.set(r,t)}).catch(()=>{}),tr.set(e,t),e}function Es(t){if(Ut.has(t))return;const e=new Promise((r,n)=>{const o=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",i),t.removeEventListener("abort",i)},s=()=>{r(),o()},i=()=>{n(t.error||new DOMException("AbortError","AbortError")),o()};t.addEventListener("complete",s),t.addEventListener("error",i),t.addEventListener("abort",i)});Ut.set(t,e)}let Vt={get(t,e,r){if(t instanceof IDBTransaction){if(e==="done")return Ut.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Ln.get(t);if(e==="store")return r.objectStoreNames[1]?void 0:r.objectStore(r.objectStoreNames[0])}return ue(t[e])},set(t,e,r){return t[e]=r,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Ss(t){Vt=t(Vt)}function _s(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...r){const n=t.call(At(this),e,...r);return Ln.set(n,e.sort?e.sort():[e]),ue(n)}:bs().includes(t)?function(...e){return t.apply(At(this),e),ue(Nn.get(this))}:function(...e){return ue(t.apply(At(this),e))}}function Is(t){return typeof t=="function"?_s(t):(t instanceof IDBTransaction&&Es(t),ys(t,vs())?new Proxy(t,Vt):t)}function ue(t){if(t instanceof IDBRequest)return ws(t);if(kt.has(t))return kt.get(t);const e=Is(t);return e!==t&&(kt.set(t,e),tr.set(e,t)),e}const At=t=>tr.get(t);function ks(t,e,{blocked:r,upgrade:n,blocking:o,terminated:s}={}){const i=indexedDB.open(t,e),a=ue(i);return n&&i.addEventListener("upgradeneeded",c=>{n(ue(i.result),c.oldVersion,c.newVersion,ue(i.transaction),c)}),r&&i.addEventListener("blocked",c=>r(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),o&&c.addEventListener("versionchange",d=>o(d.oldVersion,d.newVersion,d))}).catch(()=>{}),a}const As=["get","getKey","getAll","getAllKeys","count"],Ts=["put","add","delete","clear"],Tt=new Map;function xr(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(Tt.get(e))return Tt.get(e);const r=e.replace(/FromIndex$/,""),n=e!==r,o=Ts.includes(r);if(!(r in(n?IDBIndex:IDBObjectStore).prototype)||!(o||As.includes(r)))return;const s=async function(i,...a){const c=this.transaction(i,o?"readwrite":"readonly");let d=c.store;return n&&(d=d.index(a.shift())),(await Promise.all([d[r](...a),o&&c.done]))[0]};return Tt.set(e,s),s}Ss(t=>({...t,get:(e,r,n)=>xr(e,r)||t.get(e,r,n),has:(e,r)=>!!xr(e,r)||t.has(e,r)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ps{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(r=>{if(Ds(r)){const n=r.getImmediate();return`${n.library}/${n.version}`}else return null}).filter(r=>r).join(" ")}}function Ds(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qt="@firebase/app",Rr="0.16.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le=new $n("@firebase/app"),Cs="@firebase/app-compat",xs="@firebase/analytics-compat",Rs="@firebase/analytics",$s="@firebase/app-check-compat",Ns="@firebase/app-check",Ls="@firebase/auth",Os="@firebase/auth-compat",Bs="@firebase/database",Ms="@firebase/data-connect",Fs="@firebase/database-compat",Us="@firebase/functions",Vs="@firebase/functions-compat",qs="@firebase/installations",Hs="@firebase/installations-compat",js="@firebase/messaging",zs="@firebase/messaging-compat",Ws="@firebase/performance",Gs="@firebase/performance-compat",Ks="@firebase/remote-config",Qs="@firebase/remote-config-compat",Ys="@firebase/storage",Js="@firebase/storage-compat",Xs="@firebase/firestore",Zs="@firebase/ai",ei="@firebase/firestore-compat",ti="firebase",ri="12.19.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ht="[DEFAULT]",ni={[qt]:"fire-core",[Cs]:"fire-core-compat",[Rs]:"fire-analytics",[xs]:"fire-analytics-compat",[Ns]:"fire-app-check",[$s]:"fire-app-check-compat",[Ls]:"fire-auth",[Os]:"fire-auth-compat",[Bs]:"fire-rtdb",[Ms]:"fire-data-connect",[Fs]:"fire-rtdb-compat",[Us]:"fire-fn",[Vs]:"fire-fn-compat",[qs]:"fire-iid",[Hs]:"fire-iid-compat",[js]:"fire-fcm",[zs]:"fire-fcm-compat",[Ws]:"fire-perf",[Gs]:"fire-perf-compat",[Ks]:"fire-rc",[Qs]:"fire-rc-compat",[Ys]:"fire-gcs",[Js]:"fire-gcs-compat",[Xs]:"fire-fst",[ei]:"fire-fst-compat",[Zs]:"fire-vertex","fire-js":"fire-js",[ti]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const st=new Map,oi=new Map,jt=new Map;function $r(t,e){try{t.container.addComponent(e)}catch(r){le.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,r)}}function it(t){const e=t.name;if(jt.has(e))return le.debug(`There were multiple attempts to register component ${e}.`),!1;jt.set(e,t);for(const r of st.values())$r(r,t);for(const r of oi.values())$r(r,t);return!0}function si(t,e){const r=t.container.getProvider("heartbeat").getImmediate({optional:!0});return r&&r.triggerHeartbeat(),t.container.getProvider(e)}function ii(t){return t==null?!1:t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ai={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},ae=new xn("app","Firebase",ai);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class li{constructor(e,r,n){this._isDeleted=!1,this._options={...e},this._config={...r},this._name=r.name,this._automaticDataCollectionEnabled=r.automaticDataCollectionEnabled,this._container=n,this.container.addComponent(new Fe("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw ae.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ci=ri;function On(t,e={}){let r=t;typeof e!="object"&&(e={name:e});const n={name:Ht,automaticDataCollectionEnabled:!0,...e},o=n.name;if(typeof o!="string"||!o)throw ae.create("bad-app-name",{appName:String(o)});if(r||(r=Dn()),!r)throw ae.create("no-options");const s=st.get(o);if(s)if(ot(r,s.options)){if(ot(n,s.config))return s;throw ae.create("duplicate-app",{appName:o,mismatchedParam:"config",oldValue:JSON.stringify(s.config),newValue:JSON.stringify(n)})}else throw ae.create("duplicate-app",{appName:o,mismatchedParam:"options",oldValue:JSON.stringify(s.options),newValue:JSON.stringify(r)});const i=new hs(o);for(const c of jt.values())i.addComponent(c);const a=new li(r,n,i);return st.set(o,a),a}function ui(t=Ht){const e=st.get(t);if(!e&&t===Ht&&Dn())return On();if(!e)throw ae.create("no-app",{appName:t});return e}function Ie(t,e,r){let n=ni[t]??t;r&&(n+=`-${r}`);const o=n.match(/\s|\//),s=e.match(/\s|\//);if(o||s){const i=[`Unable to register library "${n}" with version "${e}":`];o&&i.push(`library name "${n}" contains illegal characters (whitespace or "/")`),o&&s&&i.push("and"),s&&i.push(`version name "${e}" contains illegal characters (whitespace or "/")`),le.warn(i.join(" "));return}it(new Fe(`${n}-version`,()=>({library:n,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const di="firebase-heartbeat-database",hi=1,Ue="firebase-heartbeat-store";let Pt=null;function Bn(){return Pt||(Pt=ks(di,hi,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Ue)}catch(r){console.warn(r)}}}}).catch(t=>{throw ae.create("idb-open",{originalErrorMessage:t.message})})),Pt}async function mi(t){try{const r=(await Bn()).transaction(Ue),n=await r.objectStore(Ue).get(Mn(t));return await r.done,n}catch(e){if(e instanceof Pe)le.warn(e.message);else{const r=ae.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});le.warn(r.message)}}}async function Nr(t,e){try{const n=(await Bn()).transaction(Ue,"readwrite");await n.objectStore(Ue).put(e,Mn(t)),await n.done}catch(r){if(r instanceof Pe)le.warn(r.message);else{const n=ae.create("idb-set",{originalErrorMessage:r==null?void 0:r.message});le.warn(n.message)}}}function Mn(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pi=1024,fi=30;class gi{constructor(e){this.container=e,this._heartbeatsCache=null;const r=this.container.getProvider("app").getImmediate();this._storage=new vi(r),this._heartbeatsCachePromise=this._storage.read().then(n=>(this._heartbeatsCache=n,n))}async triggerHeartbeat(){var e,r;try{const o=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=Lr();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((r=this._heartbeatsCache)==null?void 0:r.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(i=>i.date===s))return;if(this._heartbeatsCache.heartbeats.push({date:s,agent:o}),this._heartbeatsCache.heartbeats.length>fi){const i=bi(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(i,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(n){le.warn(n)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const r=Lr(),{heartbeatsToSend:n,unsentEntries:o}=yi(this._heartbeatsCache.heartbeats),s=nt(JSON.stringify({version:2,heartbeats:n}));return this._heartbeatsCache.lastSentHeartbeatDate=r,o.length>0?(this._heartbeatsCache.heartbeats=o,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(r){return le.warn(r),""}}}function Lr(){return new Date().toISOString().substring(0,10)}function yi(t,e=pi){const r=[];let n=t.slice();for(const o of t){const s=r.find(i=>i.agent===o.agent);if(s){if(s.dates.push(o.date),Or(r)>e){s.dates.pop();break}}else if(r.push({agent:o.agent,dates:[o.date]}),Or(r)>e){r.pop();break}n=n.slice(1)}return{heartbeatsToSend:r,unsentEntries:n}}class vi{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return rs()?ns().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const r=await mi(this.app);return r!=null&&r.heartbeats?r:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Nr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const n=await this.read();return Nr(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??n.lastSentHeartbeatDate,heartbeats:[...n.heartbeats,...e.heartbeats]})}else return}}function Or(t){return nt(JSON.stringify({version:2,heartbeats:t})).length}function bi(t){if(t.length===0)return-1;let e=0,r=t[0].date;for(let n=1;n<t.length;n++)t[n].date<r&&(r=t[n].date,e=n);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wi(t){it(new Fe("platform-logger",e=>new Ps(e),"PRIVATE")),it(new Fe("heartbeat",e=>new gi(e),"PRIVATE")),Ie(qt,Rr,t),Ie(qt,Rr,"esm2020"),Ie("fire-js","")}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */wi("");var Ei="firebase",Si="12.19.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Ie(Ei,Si,"app");const _i="gen-lang-client-0728333167",Ii="1:1090854519373:web:6c8d4f1bdcea3da034d204",ki="AIzaSyDpgrVyfqOxC5IhkdQ5YCqIXtGMPHHNsvc",Ai="gen-lang-client-0728333167.firebaseapp.com",Ti="ai-studio-yummysweets-1927dd13-1bc4-468e-92aa-cd849586f50a",Pi="gen-lang-client-0728333167.firebasestorage.app",Di="1090854519373",Ci="",xi="1090854519373-87pv7p4hqfl4895ft0je2a0218eeku7s.apps.googleusercontent.com",Ri="",zt={projectId:_i,appId:Ii,apiKey:ki,authDomain:Ai,firestoreDatabaseId:Ti,storageBucket:Pi,messagingSenderId:Di,measurementId:Ci,oAuthClientId:xi,recaptchaSiteKey:Ri},$i={},Ni=typeof import.meta<"u"&&$i||{},vt=Ni.VITE_FIREBASE_EMULATORS==="true",Br="demo-yummy-sweets",Fn={firestore:["127.0.0.1",8080],auth:"http://127.0.0.1:9099"};let rr=null,Un=null;try{const t=vt?{...zt,projectId:Br,authDomain:`${Br}.firebaseapp.com`}:zt;rr=On(t)}catch(t){Un=t,console.error("Firebase could not be initialised:",t&&t.message)}function Vn(){return rr}function Li(){return vt?void 0:zt.firestoreDatabaseId}function Qe(){return!!rr&&!Un}var Mr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qn,Oi;(function(){var t;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(f,h){function m(){}m.prototype=h.prototype,f.F=h.prototype,f.prototype=new m,f.prototype.constructor=f,f.D=function(y,v,b){for(var p=Array(arguments.length-2),te=2;te<arguments.length;te++)p[te-2]=arguments[te];return h.prototype[v].apply(y,p)}}function r(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(n,r),n.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function o(f,h,m){m||(m=0);const y=Array(16);if(typeof h=="string")for(var v=0;v<16;++v)y[v]=h.charCodeAt(m++)|h.charCodeAt(m++)<<8|h.charCodeAt(m++)<<16|h.charCodeAt(m++)<<24;else for(v=0;v<16;++v)y[v]=h[m++]|h[m++]<<8|h[m++]<<16|h[m++]<<24;h=f.g[0],m=f.g[1],v=f.g[2];let b=f.g[3],p;p=h+(b^m&(v^b))+y[0]+3614090360&4294967295,h=m+(p<<7&4294967295|p>>>25),p=b+(v^h&(m^v))+y[1]+3905402710&4294967295,b=h+(p<<12&4294967295|p>>>20),p=v+(m^b&(h^m))+y[2]+606105819&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(h^v&(b^h))+y[3]+3250441966&4294967295,m=v+(p<<22&4294967295|p>>>10),p=h+(b^m&(v^b))+y[4]+4118548399&4294967295,h=m+(p<<7&4294967295|p>>>25),p=b+(v^h&(m^v))+y[5]+1200080426&4294967295,b=h+(p<<12&4294967295|p>>>20),p=v+(m^b&(h^m))+y[6]+2821735955&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(h^v&(b^h))+y[7]+4249261313&4294967295,m=v+(p<<22&4294967295|p>>>10),p=h+(b^m&(v^b))+y[8]+1770035416&4294967295,h=m+(p<<7&4294967295|p>>>25),p=b+(v^h&(m^v))+y[9]+2336552879&4294967295,b=h+(p<<12&4294967295|p>>>20),p=v+(m^b&(h^m))+y[10]+4294925233&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(h^v&(b^h))+y[11]+2304563134&4294967295,m=v+(p<<22&4294967295|p>>>10),p=h+(b^m&(v^b))+y[12]+1804603682&4294967295,h=m+(p<<7&4294967295|p>>>25),p=b+(v^h&(m^v))+y[13]+4254626195&4294967295,b=h+(p<<12&4294967295|p>>>20),p=v+(m^b&(h^m))+y[14]+2792965006&4294967295,v=b+(p<<17&4294967295|p>>>15),p=m+(h^v&(b^h))+y[15]+1236535329&4294967295,m=v+(p<<22&4294967295|p>>>10),p=h+(v^b&(m^v))+y[1]+4129170786&4294967295,h=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(h^m))+y[6]+3225465664&4294967295,b=h+(p<<9&4294967295|p>>>23),p=v+(h^m&(b^h))+y[11]+643717713&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^h&(v^b))+y[0]+3921069994&4294967295,m=v+(p<<20&4294967295|p>>>12),p=h+(v^b&(m^v))+y[5]+3593408605&4294967295,h=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(h^m))+y[10]+38016083&4294967295,b=h+(p<<9&4294967295|p>>>23),p=v+(h^m&(b^h))+y[15]+3634488961&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^h&(v^b))+y[4]+3889429448&4294967295,m=v+(p<<20&4294967295|p>>>12),p=h+(v^b&(m^v))+y[9]+568446438&4294967295,h=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(h^m))+y[14]+3275163606&4294967295,b=h+(p<<9&4294967295|p>>>23),p=v+(h^m&(b^h))+y[3]+4107603335&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^h&(v^b))+y[8]+1163531501&4294967295,m=v+(p<<20&4294967295|p>>>12),p=h+(v^b&(m^v))+y[13]+2850285829&4294967295,h=m+(p<<5&4294967295|p>>>27),p=b+(m^v&(h^m))+y[2]+4243563512&4294967295,b=h+(p<<9&4294967295|p>>>23),p=v+(h^m&(b^h))+y[7]+1735328473&4294967295,v=b+(p<<14&4294967295|p>>>18),p=m+(b^h&(v^b))+y[12]+2368359562&4294967295,m=v+(p<<20&4294967295|p>>>12),p=h+(m^v^b)+y[5]+4294588738&4294967295,h=m+(p<<4&4294967295|p>>>28),p=b+(h^m^v)+y[8]+2272392833&4294967295,b=h+(p<<11&4294967295|p>>>21),p=v+(b^h^m)+y[11]+1839030562&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^h)+y[14]+4259657740&4294967295,m=v+(p<<23&4294967295|p>>>9),p=h+(m^v^b)+y[1]+2763975236&4294967295,h=m+(p<<4&4294967295|p>>>28),p=b+(h^m^v)+y[4]+1272893353&4294967295,b=h+(p<<11&4294967295|p>>>21),p=v+(b^h^m)+y[7]+4139469664&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^h)+y[10]+3200236656&4294967295,m=v+(p<<23&4294967295|p>>>9),p=h+(m^v^b)+y[13]+681279174&4294967295,h=m+(p<<4&4294967295|p>>>28),p=b+(h^m^v)+y[0]+3936430074&4294967295,b=h+(p<<11&4294967295|p>>>21),p=v+(b^h^m)+y[3]+3572445317&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^h)+y[6]+76029189&4294967295,m=v+(p<<23&4294967295|p>>>9),p=h+(m^v^b)+y[9]+3654602809&4294967295,h=m+(p<<4&4294967295|p>>>28),p=b+(h^m^v)+y[12]+3873151461&4294967295,b=h+(p<<11&4294967295|p>>>21),p=v+(b^h^m)+y[15]+530742520&4294967295,v=b+(p<<16&4294967295|p>>>16),p=m+(v^b^h)+y[2]+3299628645&4294967295,m=v+(p<<23&4294967295|p>>>9),p=h+(v^(m|~b))+y[0]+4096336452&4294967295,h=m+(p<<6&4294967295|p>>>26),p=b+(m^(h|~v))+y[7]+1126891415&4294967295,b=h+(p<<10&4294967295|p>>>22),p=v+(h^(b|~m))+y[14]+2878612391&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~h))+y[5]+4237533241&4294967295,m=v+(p<<21&4294967295|p>>>11),p=h+(v^(m|~b))+y[12]+1700485571&4294967295,h=m+(p<<6&4294967295|p>>>26),p=b+(m^(h|~v))+y[3]+2399980690&4294967295,b=h+(p<<10&4294967295|p>>>22),p=v+(h^(b|~m))+y[10]+4293915773&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~h))+y[1]+2240044497&4294967295,m=v+(p<<21&4294967295|p>>>11),p=h+(v^(m|~b))+y[8]+1873313359&4294967295,h=m+(p<<6&4294967295|p>>>26),p=b+(m^(h|~v))+y[15]+4264355552&4294967295,b=h+(p<<10&4294967295|p>>>22),p=v+(h^(b|~m))+y[6]+2734768916&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~h))+y[13]+1309151649&4294967295,m=v+(p<<21&4294967295|p>>>11),p=h+(v^(m|~b))+y[4]+4149444226&4294967295,h=m+(p<<6&4294967295|p>>>26),p=b+(m^(h|~v))+y[11]+3174756917&4294967295,b=h+(p<<10&4294967295|p>>>22),p=v+(h^(b|~m))+y[2]+718787259&4294967295,v=b+(p<<15&4294967295|p>>>17),p=m+(b^(v|~h))+y[9]+3951481745&4294967295,f.g[0]=f.g[0]+h&4294967295,f.g[1]=f.g[1]+(v+(p<<21&4294967295|p>>>11))&4294967295,f.g[2]=f.g[2]+v&4294967295,f.g[3]=f.g[3]+b&4294967295}n.prototype.v=function(f,h){h===void 0&&(h=f.length);const m=h-this.blockSize,y=this.C;let v=this.h,b=0;for(;b<h;){if(v==0)for(;b<=m;)o(this,f,b),b+=this.blockSize;if(typeof f=="string"){for(;b<h;)if(y[v++]=f.charCodeAt(b++),v==this.blockSize){o(this,y),v=0;break}}else for(;b<h;)if(y[v++]=f[b++],v==this.blockSize){o(this,y),v=0;break}}this.h=v,this.o+=h},n.prototype.A=function(){var f=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);f[0]=128;for(var h=1;h<f.length-8;++h)f[h]=0;h=this.o*8;for(var m=f.length-8;m<f.length;++m)f[m]=h&255,h/=256;for(this.v(f),f=Array(16),h=0,m=0;m<4;++m)for(let y=0;y<32;y+=8)f[h++]=this.g[m]>>>y&255;return f};function s(f,h){var m=a;return Object.prototype.hasOwnProperty.call(m,f)?m[f]:m[f]=h(f)}function i(f,h){this.h=h;const m=[];let y=!0;for(let v=f.length-1;v>=0;v--){const b=f[v]|0;y&&b==h||(m[v]=b,y=!1)}this.g=m}var a={};function c(f){return-128<=f&&f<128?s(f,function(h){return new i([h|0],h<0?-1:0)}):new i([f|0],f<0?-1:0)}function d(f){if(isNaN(f)||!isFinite(f))return g;if(f<0)return k(d(-f));const h=[];let m=1;for(let y=0;f>=m;y++)h[y]=f/m|0,m*=4294967296;return new i(h,0)}function l(f,h){if(f.length==0)throw Error("number format error: empty string");if(h=h||10,h<2||36<h)throw Error("radix out of range: "+h);if(f.charAt(0)=="-")return k(l(f.substring(1),h));if(f.indexOf("-")>=0)throw Error('number format error: interior "-" character');const m=d(Math.pow(h,8));let y=g;for(let b=0;b<f.length;b+=8){var v=Math.min(8,f.length-b);const p=parseInt(f.substring(b,b+v),h);v<8?(v=d(Math.pow(h,v)),y=y.j(v).add(d(p))):(y=y.j(m),y=y.add(d(p)))}return y}var g=c(0),E=c(1),S=c(16777216);t=i.prototype,t.m=function(){if(w(this))return-k(this).m();let f=0,h=1;for(let m=0;m<this.g.length;m++){const y=this.i(m);f+=(y>=0?y:4294967296+y)*h,h*=4294967296}return f},t.toString=function(f){if(f=f||10,f<2||36<f)throw Error("radix out of range: "+f);if(I(this))return"0";if(w(this))return"-"+k(this).toString(f);const h=d(Math.pow(f,6));var m=this;let y="";for(;;){const v=R(m,h).g;m=P(m,v.j(h));let b=((m.g.length>0?m.g[0]:m.h)>>>0).toString(f);if(m=v,I(m))return b+y;for(;b.length<6;)b="0"+b;y=b+y}},t.i=function(f){return f<0?0:f<this.g.length?this.g[f]:this.h};function I(f){if(f.h!=0)return!1;for(let h=0;h<f.g.length;h++)if(f.g[h]!=0)return!1;return!0}function w(f){return f.h==-1}t.l=function(f){return f=P(this,f),w(f)?-1:I(f)?0:1};function k(f){const h=f.g.length,m=[];for(let y=0;y<h;y++)m[y]=~f.g[y];return new i(m,~f.h).add(E)}t.abs=function(){return w(this)?k(this):this},t.add=function(f){const h=Math.max(this.g.length,f.g.length),m=[];let y=0;for(let v=0;v<=h;v++){let b=y+(this.i(v)&65535)+(f.i(v)&65535),p=(b>>>16)+(this.i(v)>>>16)+(f.i(v)>>>16);y=p>>>16,b&=65535,p&=65535,m[v]=p<<16|b}return new i(m,m[m.length-1]&-2147483648?-1:0)};function P(f,h){return f.add(k(h))}t.j=function(f){if(I(this)||I(f))return g;if(w(this))return w(f)?k(this).j(k(f)):k(k(this).j(f));if(w(f))return k(this.j(k(f)));if(this.l(S)<0&&f.l(S)<0)return d(this.m()*f.m());const h=this.g.length+f.g.length,m=[];for(var y=0;y<2*h;y++)m[y]=0;for(y=0;y<this.g.length;y++)for(let v=0;v<f.g.length;v++){const b=this.i(y)>>>16,p=this.i(y)&65535,te=f.i(v)>>>16,Ce=f.i(v)&65535;m[2*y+2*v]+=p*Ce,C(m,2*y+2*v),m[2*y+2*v+1]+=b*Ce,C(m,2*y+2*v+1),m[2*y+2*v+1]+=p*te,C(m,2*y+2*v+1),m[2*y+2*v+2]+=b*te,C(m,2*y+2*v+2)}for(f=0;f<h;f++)m[f]=m[2*f+1]<<16|m[2*f];for(f=h;f<2*h;f++)m[f]=0;return new i(m,0)};function C(f,h){for(;(f[h]&65535)!=f[h];)f[h+1]+=f[h]>>>16,f[h]&=65535,h++}function D(f,h){this.g=f,this.h=h}function R(f,h){if(I(h))throw Error("division by zero");if(I(f))return new D(g,g);if(w(f))return h=R(k(f),h),new D(k(h.g),k(h.h));if(w(h))return h=R(f,k(h)),new D(k(h.g),h.h);if(f.g.length>30){if(w(f)||w(h))throw Error("slowDivide_ only works with positive integers.");for(var m=E,y=h;y.l(f)<=0;)m=N(m),y=N(y);var v=T(m,1),b=T(y,1);for(y=T(y,2),m=T(m,2);!I(y);){var p=b.add(y);p.l(f)<=0&&(v=v.add(m),b=p),y=T(y,1),m=T(m,1)}return h=P(f,v.j(h)),new D(v,h)}for(v=g;f.l(h)>=0;){for(m=Math.max(1,Math.floor(f.m()/h.m())),y=Math.ceil(Math.log(m)/Math.LN2),y=y<=48?1:Math.pow(2,y-48),b=d(m),p=b.j(h);w(p)||p.l(f)>0;)m-=y,b=d(m),p=b.j(h);I(b)&&(b=E),v=v.add(b),f=P(f,p)}return new D(v,f)}t.B=function(f){return R(this,f).h},t.and=function(f){const h=Math.max(this.g.length,f.g.length),m=[];for(let y=0;y<h;y++)m[y]=this.i(y)&f.i(y);return new i(m,this.h&f.h)},t.or=function(f){const h=Math.max(this.g.length,f.g.length),m=[];for(let y=0;y<h;y++)m[y]=this.i(y)|f.i(y);return new i(m,this.h|f.h)},t.xor=function(f){const h=Math.max(this.g.length,f.g.length),m=[];for(let y=0;y<h;y++)m[y]=this.i(y)^f.i(y);return new i(m,this.h^f.h)};function N(f){const h=f.g.length+1,m=[];for(let y=0;y<h;y++)m[y]=f.i(y)<<1|f.i(y-1)>>>31;return new i(m,f.h)}function T(f,h){const m=h>>5;h%=32;const y=f.g.length-m,v=[];for(let b=0;b<y;b++)v[b]=h>0?f.i(b+m)>>>h|f.i(b+m+1)<<32-h:f.i(b+m);return new i(v,f.h)}n.prototype.digest=n.prototype.A,n.prototype.reset=n.prototype.u,n.prototype.update=n.prototype.v,Oi=n,i.prototype.add=i.prototype.add,i.prototype.multiply=i.prototype.j,i.prototype.modulo=i.prototype.B,i.prototype.compare=i.prototype.l,i.prototype.toNumber=i.prototype.m,i.prototype.toString=i.prototype.toString,i.prototype.getBits=i.prototype.i,i.fromNumber=d,i.fromString=l,qn=i}).apply(typeof Mr<"u"?Mr:typeof self<"u"?self:typeof window<"u"?window:{});/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}K.UNAUTHENTICATED=new K(null),K.GOOGLE_CREDENTIALS=new K("google-credentials-uid"),K.FIRST_PARTY=new K("first-party-uid"),K.MOCK_USER=new K("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let De="12.19.0";function Bi(t){De=t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Te=new $n("@firebase/firestore");function at(t,...e){if(Te.logLevel<=$.DEBUG){const r=e.map(or);Te.debug(`Firestore (${De}): ${t}`,...r)}}function nr(t,...e){if(Te.logLevel<=$.ERROR){const r=e.map(or);Te.error(`Firestore (${De}): ${t}`,...r)}}function Hn(t,...e){if(Te.logLevel<=$.WARN){const r=e.map(or);Te.warn(`Firestore (${De}): ${t}`,...r)}}function or(t){if(typeof t=="string")return t;try{return(function(r){return JSON.stringify(r)})(t)}catch{return t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function V(t,e,r){let n="Unexpected state";typeof e=="string"?n=e:r=e,jn(t,n,r)}function jn(t,e,r){let n=`FIRESTORE (${De}) INTERNAL ASSERTION FAILED: ${e} (ID: ${t.toString(16)})`;if(r!==void 0)try{n+=" CONTEXT: "+JSON.stringify(r)}catch{n+=" CONTEXT: "+r}throw nr(n),new Error(n)}function Q(t,e,r,n){let o="Unexpected state";typeof r=="string"?o=r:n=r,t||jn(e,o,n)}function bt(t,e){return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable"};class A extends Pe{constructor(e,r){super(e,r),this.code=e,this.message=r,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,r){this.user=r,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Mi{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,r){e.enqueueRetryable((()=>r(K.UNAUTHENTICATED)))}shutdown(){}}class Fi{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,r){this.changeListener=r,e.enqueueRetryable((()=>r(this.token.user)))}shutdown(){this.changeListener=null}}class Ui{constructor(e){this.auth=null,e.onInit((r=>{this.auth=r}))}getToken(){return this.auth?this.auth.getToken().then((e=>e?(Q(typeof e.accessToken=="string",42297,{Z:e}),new zn(e.accessToken,new K(this.auth.getUid()))):null)):Promise.resolve(null)}invalidateToken(){}start(e,r){}shutdown(){}}class Vi{constructor(e,r,n){this.ee=e,this.te=r,this.re=n,this.type="FirstParty",this.user=K.FIRST_PARTY,this.ne=new Map}ie(){return this.re?this.re():null}get headers(){this.ne.set("X-Goog-AuthUser",this.ee);const e=this.ie();return e&&this.ne.set("Authorization",e),this.te&&this.ne.set("X-Goog-Iam-Authorization-Token",this.te),this.ne}}class qi{constructor(e,r,n){this.ee=e,this.te=r,this.re=n}getToken(){return Promise.resolve(new Vi(this.ee,this.te,this.re))}start(e,r){e.enqueueRetryable((()=>r(K.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class Fr{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Hi{constructor(e,r){this.se=r,this.appCheck=null,this.oe=null,ii(e)&&e.settings.appCheckToken&&(this.oe=e.settings.appCheckToken),r.onInit((n=>{this.appCheck=n}))}getToken(){return this.oe?Promise.resolve(new Fr(this.oe)):this.appCheck?this.appCheck.getToken().then((e=>e?(Q(typeof e.token=="string",3470,{tokenResult:e}),new Fr(e.token)):null)):Promise.resolve(null)}invalidateToken(){}start(e,r){}shutdown(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,r,n,o,s,i,a,c,d,l,g,E,S){this.databaseId=e,this.appId=r,this.persistenceKey=n,this.host=o,this.ssl=s,this.forceLongPolling=i,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=d,this.isUsingEmulator=l,this.apiKey=g,this._customHeaders=E,this.grpcFlowControlWindow=S}}const Wt="(default)";class Ve{constructor(e,r){this.projectId=e,this.database=r||Wt}static empty(){return new Ve("","")}get isDefaultDatabase(){return this.database===Wt}isEqual(e){return e instanceof Ve&&e.projectId===this.projectId&&e.database===this.database}}function zi(t,e){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new A(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ve(t.options.projectId,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(t){const e=typeof self<"u"&&(self.crypto||self.msCrypto),r=new Uint8Array(t);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(r);else for(let n=0;n<t;n++)r[n]=Math.floor(256*Math.random());return r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",r=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const o=Wi(40);for(let s=0;s<o.length;++s)n.length<20&&o[s]<r&&(n+=e.charAt(o[s]%62))}return n}}function M(t,e){return t<e?-1:t>e?1:0}function Gt(t,e){const r=Math.min(t.length,e.length);for(let n=0;n<r;n++){const o=t.charAt(n),s=e.charAt(n);if(o!==s)return Dt(o)===Dt(s)?M(o,s):Dt(o)?1:-1}return M(t.length,e.length)}const Ki=55296,Qi=57343;function Dt(t){const e=t.charCodeAt(0);return e>=Ki&&e<=Qi}function Yi(t,e,r){return t.length===e.length&&t.every(((n,o)=>r(n,e[o])))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ur="__name__";class ne{constructor(e,r,n){r===void 0?r=0:r>e.length&&V(637,{offset:r,range:e.length}),n===void 0?n=e.length-r:n>e.length-r&&V(1746,{length:n,range:e.length-r}),this.segments=e,this.offset=r,this.len=n}get length(){return this.len}isEqual(e){return ne.comparator(this,e)===0}child(e){const r=this.segments.slice(this.offset,this.limit());return e instanceof ne?e.forEach((n=>{r.push(n)})):r.push(e),this.construct(r)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let r=0;r<this.length;r++)if(this.get(r)!==e.get(r))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let r=0;r<this.length;r++)if(this.get(r)!==e.get(r))return!1;return!0}forEach(e){for(let r=this.offset,n=this.limit();r<n;r++)e(this.segments[r])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,r){const n=Math.min(e.length,r.length);for(let o=0;o<n;o++){const s=ne.compareSegments(e.get(o),r.get(o));if(s!==0)return s}return M(e.length,r.length)}static compareSegments(e,r){const n=ne.isNumericId(e),o=ne.isNumericId(r);return n&&!o?-1:!n&&o?1:n&&o?ne.extractNumericId(e).compare(ne.extractNumericId(r)):Gt(e,r)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return qn.fromString(e.substring(4,e.length-2))}}class U extends ne{construct(e,r,n){return new U(e,r,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const r=[];for(const n of e){if(n.indexOf("//")>=0)throw new A(_.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);r.push(...n.split("/").filter((o=>o.length>0)))}return new U(r)}static emptyPath(){return new U([])}}const Ji=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let ke=class be extends ne{construct(e,r,n){return new be(e,r,n)}static isValidIdentifier(e){return Ji.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),be.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ur}static keyField(){return new be([Ur])}static fromServerFormat(e){const r=[];let n="",o=0;const s=()=>{if(n.length===0)throw new A(_.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);r.push(n),n=""};let i=!1;for(;o<e.length;){const a=e[o];if(a==="\\"){if(o+1===e.length)throw new A(_.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[o+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new A(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=c,o+=2}else a==="`"?(i=!i,o++):a!=="."||i?(n+=a,o++):(s(),o++)}if(s(),i)throw new A(_.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new be(r)}static emptyPath(){return new be([])}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{constructor(e){this.path=e}static fromPath(e){return new H(U.fromString(e))}static fromName(e){return new H(U.fromString(e).popFirst(5))}static empty(){return new H(U.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&U.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,r){return U.comparator(e.path,r.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new H(new U(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wn(t,e,r){if(!r)throw new A(_.INVALID_ARGUMENT,`Function ${t}() cannot be called with an empty ${e}.`)}function Vr(t){if(!H.isDocumentKey(t))throw new A(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${t} has ${t.length}.`)}function qr(t){if(H.isDocumentKey(t))throw new A(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${t} has ${t.length}.`)}function Gn(t){return typeof t=="object"&&t!==null&&(Object.getPrototypeOf(t)===Object.prototype||Object.getPrototypeOf(t)===null)}function wt(t){if(t===void 0)return"undefined";if(t===null)return"null";if(typeof t=="string")return t.length>20&&(t=`${t.substring(0,20)}...`),JSON.stringify(t);if(typeof t=="number"||typeof t=="boolean")return""+t;if(typeof t=="object"){if(t instanceof Array)return"an array";{const e=(function(n){return n.constructor?n.constructor.name:null})(t);return e?`a custom ${e} object`:"an object"}}return typeof t=="function"?"a function":V(12329,{type:typeof t})}function sr(t,e){if("_delegate"in t&&(t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new A(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const r=wt(t);throw new A(_.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${r}`)}}return t}function Xi(t,e){if(e<=0)throw new A(_.INVALID_ARGUMENT,`Function ${t}() requires a positive number, but it was: ${e}.`)}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kn(t){const e={};return t.timeoutSeconds!==void 0&&(e.timeoutSeconds=t.timeoutSeconds),e}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ye=null;function Zi(){return Ye===null?Ye=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ye++,"0x"+Ye.toString(16)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(t){return t==null}function lt(t){return t===0&&1/t==-1/0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ct="RestConnection",ta={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class ra{get ae(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.ue=r+"://"+e.host,this._e=`projects/${n}/databases/${o}`,this.ce=this.databaseId.database===Wt?`project_id=${n}`:`project_id=${n}&database_id=${o}`}le(e,r,n,o,s){const i=Zi(),a=this.he(e,r.toUriEncodedString());at(Ct,`Sending RPC '${e}' ${i}:`,a,n);const c={"google-cloud-resource-prefix":this._e,"x-goog-request-params":this.ce};this.fe(c,o,s);const{host:d}=new URL(a),l=Rn(d);return this.me(e,a,c,n,l).then((g=>(at(Ct,`Received RPC '${e}' ${i}: `,g),g)),(g=>{throw Hn(Ct,`RPC '${e}' ${i} failed with error: `,g,"url: ",a,"request:",n),g}))}de(e,r,n,o,s,i){return this.le(e,r,n,o,s)}fe(e,r,n){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+De})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach(((o,s)=>e[s]=o)),n&&n.headers.forEach(((o,s)=>e[s]=o)),this.databaseInfo._customHeaders)for(const o of Object.keys(this.databaseInfo._customHeaders))e[o]=this.databaseInfo._customHeaders[o]}he(e,r){const n=ta[e];let o=`${this.ue}/v1/${r}:${n}`;return this.databaseInfo.apiKey&&(o=`${o}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),o}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Hr,x;function jr(t){if(t===void 0)return nr("RPC_ERROR","HTTP error has no status"),_.UNKNOWN;switch(t){case 200:return _.OK;case 400:return _.FAILED_PRECONDITION;case 401:return _.UNAUTHENTICATED;case 403:return _.PERMISSION_DENIED;case 404:return _.NOT_FOUND;case 409:return _.ABORTED;case 416:return _.OUT_OF_RANGE;case 429:return _.RESOURCE_EXHAUSTED;case 499:return _.CANCELLED;case 500:return _.UNKNOWN;case 501:return _.UNIMPLEMENTED;case 503:return _.UNAVAILABLE;case 504:return _.DEADLINE_EXCEEDED;default:return t>=200&&t<300?_.OK:t>=400&&t<500?_.FAILED_PRECONDITION:t>=500&&t<600?_.INTERNAL:_.UNKNOWN}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(x=Hr||(Hr={}))[x.OK=0]="OK",x[x.CANCELLED=1]="CANCELLED",x[x.UNKNOWN=2]="UNKNOWN",x[x.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",x[x.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",x[x.NOT_FOUND=5]="NOT_FOUND",x[x.ALREADY_EXISTS=6]="ALREADY_EXISTS",x[x.PERMISSION_DENIED=7]="PERMISSION_DENIED",x[x.UNAUTHENTICATED=16]="UNAUTHENTICATED",x[x.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",x[x.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",x[x.ABORTED=10]="ABORTED",x[x.OUT_OF_RANGE=11]="OUT_OF_RANGE",x[x.UNIMPLEMENTED=12]="UNIMPLEMENTED",x[x.INTERNAL=13]="INTERNAL",x[x.UNAVAILABLE=14]="UNAVAILABLE",x[x.DATA_LOSS=15]="DATA_LOSS";class na extends ra{Ee(e,r){throw new Error("Not supported by FetchConnection")}async me(e,r,n,o,s){var c;const i=JSON.stringify(o);let a;try{const d={method:"POST",headers:n,body:i};s&&(d.credentials="include"),a=await fetch(r,d)}catch(d){const l=d,g=l==null?void 0:l.message,E=l!=null&&l.cause?String(l.cause):void 0,S=(g&&E?`${g} (${E})`:g??E)??(l==null?void 0:l.statusText)??String(d);throw new A(jr(l==null?void 0:l.status),`Request failed with error: ${S}`)}if(!a.ok){let d=await a.json();Array.isArray(d)&&(d=d[0]);const l=(c=d==null?void 0:d.error)==null?void 0:c.message;throw new A(jr(a.status),`Request failed with error: ${l??a.statusText}`)}return a.json()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zr(t){let e=0;for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&e++;return e}function Et(t,e){for(const r in t)Object.prototype.hasOwnProperty.call(t,r)&&e(r,t[r])}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oa extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.binaryString=e}static fromBase64String(e){const r=(function(o){try{return atob(o)}catch(s){throw typeof DOMException<"u"&&s instanceof DOMException?new oa("Invalid base64 string: "+s):s}})(e);return new ce(r)}static fromUint8Array(e){const r=(function(o){let s="";for(let i=0;i<o.length;++i)s+=String.fromCharCode(o[i]);return s})(e);return new ce(r)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(r){return btoa(r)})(this.binaryString)}toUint8Array(){return(function(r){const n=new Uint8Array(r.length);for(let o=0;o<r.length;o++)n[o]=r.charCodeAt(o);return n})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return M(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ce.EMPTY_BYTE_STRING=new ce("");const sa=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function fe(t){if(Q(!!t,39018),typeof t=="string"){let e=0;const r=sa.exec(t);if(Q(!!r,46558,{timestamp:t}),r[1]){let o=r[1];o=(o+"000000000").substr(0,9),e=Number(o)}const n=new Date(t);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:F(t.seconds),nanos:F(t.nanos)}}function F(t){return typeof t=="number"?t:typeof t=="string"?Number(t):0}function qe(t){return typeof t=="string"?ce.fromBase64String(t):ce.fromUint8Array(t)}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function J(t,e){const r={typeString:t};return e&&(r.value=e),r}function Ge(t,e){if(!Gn(t))throw new A(_.INVALID_ARGUMENT,"JSON must be an object");let r;for(const n in e)if(e[n]){const o=e[n].typeString,s="value"in e[n]?{value:e[n].value}:void 0;if(!(n in t)){r=`JSON missing required field: '${n}'`;break}const i=t[n];if(o&&typeof i!==o){r=`JSON field '${n}' must be a ${o}.`;break}if(s!==void 0&&i!==s.value){r=`Expected '${n}' field to equal '${s.value}'`;break}}if(r)throw new A(_.INVALID_ARGUMENT,r);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=-62135596800,Gr=1e6;class O{static now(){return O.fromMillis(Date.now())}static fromDate(e){return O.fromMillis(e.getTime())}static fromMillis(e){const r=Math.floor(e/1e3),n=Math.floor((e-1e3*r)*Gr);return new O(r,n)}static fromInstant(e){if(!e||typeof e.Te!="bigint")throw new A(_.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return O._fromEpochNanoseconds(e.Te)}static _fromEpochNanoseconds(e){let r,n;if(e>=0n)r=Number(e/1000000000n),n=Number(e%1000000000n);else{const o=e%1000000000n;o===0n?(r=Number(e/1000000000n),n=0):(r=Number(e/1000000000n-1n),n=Number(o+1000000000n))}return new O(r,n)}constructor(e,r){if(this.seconds=e,this.nanoseconds=r,r<0)throw new A(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+r);if(r>=1e9)throw new A(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+r);if(e<Wr)throw new A(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new A(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Gr}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new A(_.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?M(this.nanoseconds,e.nanoseconds):M(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:O._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Ge(e,O._jsonSchema))return new O(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Wr;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}O._jsonSchemaVersion="firestore/timestamp/1.0",O._jsonSchema={type:J("string",O._jsonSchemaVersion),seconds:J("number"),nanoseconds:J("number")};function Qn(t){var r,n;return((n=(((r=t==null?void 0:t.mapValue)==null?void 0:r.fields)||{}).__type__)==null?void 0:n.stringValue)==="server_timestamp"}function Yn(t){const e=t.mapValue.fields.__previous_value__;return Qn(e)?Yn(e):e}function He(t){const e=fe(t.mapValue.fields.__local_write_time__.timestampValue);return new O(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jn="__type__",ia="__max__",Je={},Xn="__vector__",ct="value";function ge(t){return"nullValue"in t?0:"booleanValue"in t?1:"integerValue"in t||"doubleValue"in t?2:"timestampValue"in t?3:"stringValue"in t?5:"bytesValue"in t?6:"referenceValue"in t?7:"geoPointValue"in t?8:"arrayValue"in t?9:"mapValue"in t?Qn(t)?4:(function(r){return(((r.mapValue||{}).fields||{}).__type__||{}).stringValue===ia})(t)?9007199254740991:(function(r){var o,s;return((s=(((o=r==null?void 0:r.mapValue)==null?void 0:o.fields)||{})[Jn])==null?void 0:s.stringValue)===Xn})(t)?10:11:V(28295,{value:t})}function ut(t,e,r){if(t===e)return!0;const n=ge(t);if(n!==ge(e))return!1;switch(n){case 0:case 9007199254740991:return!0;case 1:return t.booleanValue===e.booleanValue;case 4:return He(t).isEqual(He(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const a=fe(s.timestampValue),c=fe(i.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(t,e);case 5:return t.stringValue===e.stringValue;case 6:return(function(s,i){return qe(s.bytesValue).isEqual(qe(i.bytesValue))})(t,e);case 7:return t.referenceValue===e.referenceValue;case 8:return(function(s,i){return F(s.geoPointValue.latitude)===F(i.geoPointValue.latitude)&&F(s.geoPointValue.longitude)===F(i.geoPointValue.longitude)})(t,e);case 2:return(function(s,i,a){if("integerValue"in s&&"integerValue"in i)return F(s.integerValue)===F(i.integerValue);let c,d;return!("doubleValue"in s)||!("doubleValue"in i)?!1:(c=F(s.doubleValue),d=F(i.doubleValue),c===d?lt(c)===lt(d):!!(a===void 0||a.Pe)&&isNaN(c)&&isNaN(d))})(t,e,r);case 9:return Yi(t.arrayValue.values||[],e.arrayValue.values||[],((o,s)=>ut(o,s,r)));case 10:case 11:return(function(s,i,a){const c=s.mapValue.fields||{},d=i.mapValue.fields||{};if(zr(c)!==zr(d))return!1;for(const l in c)if(c.hasOwnProperty(l)&&(d[l]===void 0||!ut(c[l],d[l],a)))return!1;return!0})(t,e,r);default:return V(52216,{left:t})}}function je(t,e){return(t.values||[]).find((r=>ut(r,e)))!==void 0}function dt(t,e){if(t===e)return 0;const r=ge(t),n=ge(e);if(r!==n)return M(r,n);switch(r){case 0:case 9007199254740991:return 0;case 1:return M(t.booleanValue,e.booleanValue);case 2:return(function(s,i){const a=F(s.integerValue||s.doubleValue),c=F(i.integerValue||i.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(t,e);case 3:return Kr(t.timestampValue,e.timestampValue);case 4:return Kr(He(t),He(e));case 5:return Gt(t.stringValue,e.stringValue);case 6:return(function(s,i){const a=qe(s),c=qe(i);return a.compareTo(c)})(t.bytesValue,e.bytesValue);case 7:return(function(s,i){const a=s.split("/"),c=i.split("/");for(let d=0;d<a.length&&d<c.length;d++){const l=M(a[d],c[d]);if(l!==0)return l}return M(a.length,c.length)})(t.referenceValue,e.referenceValue);case 8:return(function(s,i){const a=M(F(s.latitude),F(i.latitude));return a!==0?a:M(F(s.longitude),F(i.longitude))})(t.geoPointValue,e.geoPointValue);case 9:return Qr(t.arrayValue,e.arrayValue);case 10:return(function(s,i){var E,S,I,w;const a=s.fields||{},c=i.fields||{},d=(E=a[ct])==null?void 0:E.arrayValue,l=(S=c[ct])==null?void 0:S.arrayValue,g=M(((I=d==null?void 0:d.values)==null?void 0:I.length)||0,((w=l==null?void 0:l.values)==null?void 0:w.length)||0);return g!==0?g:Qr(d,l)})(t.mapValue,e.mapValue);case 11:return(function(s,i){if(s===Je&&i===Je)return 0;if(s===Je)return 1;if(i===Je)return-1;const a=s.fields||{},c=Object.keys(a),d=i.fields||{},l=Object.keys(d);c.sort(),l.sort();for(let g=0;g<c.length&&g<l.length;++g){const E=Gt(c[g],l[g]);if(E!==0)return E;const S=dt(a[c[g]],d[l[g]]);if(S!==0)return S}return M(c.length,l.length)})(t.mapValue,e.mapValue);default:throw V(23264,{Re:r})}}function Kr(t,e){if(typeof t=="string"&&typeof e=="string"&&t.length===e.length)return M(t,e);const r=fe(t),n=fe(e),o=M(r.seconds,n.seconds);return o!==0?o:M(r.nanos,n.nanos)}function Qr(t,e){const r=t.values||[],n=e.values||[];for(let o=0;o<r.length&&o<n.length;++o){const s=dt(r[o],n[o]);if(s!==void 0&&s!==0)return s}return M(r.length,n.length)}function Yr(t,e){return{referenceValue:`projects/${t.projectId}/databases/${t.database}/documents/${e.path.canonicalString()}`}}function Zn(t){return!!t&&"arrayValue"in t}function Jr(t){return!!t&&"nullValue"in t}function Xr(t){return!!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue))}function xt(t){return!!t&&"mapValue"in t}function Oe(t){if(t.geoPointValue)return{geoPointValue:{...t.geoPointValue}};if(t.timestampValue&&typeof t.timestampValue=="object")return{timestampValue:{...t.timestampValue}};if(t.mapValue){const e={mapValue:{fields:{}}};return Et(t.mapValue.fields,((r,n)=>e.mapValue.fields[r]=Oe(n))),e}if(t.arrayValue){const e={arrayValue:{values:[]}};for(let r=0;r<(t.arrayValue.values||[]).length;++r)e.arrayValue.values[r]=Oe(t.arrayValue.values[r]);return e}return{...t}}class Zr{constructor(e,r){this.position=e,this.inclusive=r}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{}class ee extends eo{constructor(e,r,n){super(),this.field=e,this.op=r,this.value=n}static create(e,r,n){return e.isKeyField()?r==="in"||r==="not-in"?this.createKeyFieldInFilter(e,r,n):new aa(e,r,n):r==="array-contains"?new ua(e,n):r==="in"?new da(e,n):r==="not-in"?new ha(e,n):r==="array-contains-any"?new ma(e,n):new ee(e,r,n)}static createKeyFieldInFilter(e,r,n){return r==="in"?new la(e,n):new ca(e,n)}matches(e){const r=e.data.field(this.field);return this.op==="!="?r!==null&&r.nullValue===void 0&&this.matchesComparison(dt(r,this.value)):r!==null&&ge(this.value)===ge(r)&&this.matchesComparison(dt(r,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return V(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ke extends eo{constructor(e,r){super(),this.filters=e,this.op=r,this.Ae=null}static create(e,r){return new Ke(e,r)}matches(e){return(function(n){return n.op==="and"})(this)?this.filters.find((r=>!r.matches(e)))===void 0:this.filters.find((r=>r.matches(e)))!==void 0}getFlattenedFilters(){return this.Ae!==null||(this.Ae=this.filters.reduce(((e,r)=>e.concat(r.getFlattenedFilters())),[])),this.Ae}getFilters(){return Object.assign([],this.filters)}}class aa extends ee{constructor(e,r,n){super(e,r,n),this.key=H.fromName(n.referenceValue)}matches(e){const r=H.comparator(e.key,this.key);return this.matchesComparison(r)}}class la extends ee{constructor(e,r){super(e,"in",r),this.keys=to("in",r)}matches(e){return this.keys.some((r=>r.isEqual(e.key)))}}class ca extends ee{constructor(e,r){super(e,"not-in",r),this.keys=to("not-in",r)}matches(e){return!this.keys.some((r=>r.isEqual(e.key)))}}function to(t,e){var r;return(((r=e.arrayValue)==null?void 0:r.values)||[]).map((n=>H.fromName(n.referenceValue)))}class ua extends ee{constructor(e,r){super(e,"array-contains",r)}matches(e){const r=e.data.field(this.field);return Zn(r)&&je(r.arrayValue,this.value)}}class da extends ee{constructor(e,r){super(e,"in",r)}matches(e){const r=e.data.field(this.field);return r!==null&&je(this.value.arrayValue,r)}}class ha extends ee{constructor(e,r){super(e,"not-in",r)}matches(e){if(je(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const r=e.data.field(this.field);return r!==null&&r.nullValue===void 0&&!je(this.value.arrayValue,r)}}class ma extends ee{constructor(e,r){super(e,"array-contains-any",r)}matches(e){const r=e.data.field(this.field);return!(!Zn(r)||!r.arrayValue.values)&&r.arrayValue.values.some((n=>je(this.value.arrayValue,n)))}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt{constructor(e,r="asc"){this.field=e,this.dir=r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class W{static fromTimestamp(e){return new W(e)}static min(){return new W(new O(0,0))}static max(){return new W(new O(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht{constructor(e,r){this.comparator=e,this.root=r||G.EMPTY}insert(e,r){return new ht(this.comparator,this.root.insert(e,r,this.comparator).copy(null,null,G.BLACK,null,null))}remove(e){return new ht(this.comparator,this.root.remove(e,this.comparator).copy(null,null,G.BLACK,null,null))}get(e){let r=this.root;for(;!r.isEmpty();){const n=this.comparator(e,r.key);if(n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}indexOf(e){let r=0,n=this.root;for(;!n.isEmpty();){const o=this.comparator(e,n.key);if(o===0)return r+n.left.size;o<0?n=n.left:(r+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((r,n)=>(e(r,n),!1)))}toString(){const e=[];return this.inorderTraversal(((r,n)=>(e.push(`${r}:${n}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Xe(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Xe(this.root,e,this.comparator,!1)}getReverseIterator(){return new Xe(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Xe(this.root,e,this.comparator,!0)}}class Xe{constructor(e,r,n,o){this.isReverse=o,this.nodeStack=[];let s=1;for(;!e.isEmpty();)if(s=r?n(e.key,r):1,r&&o&&(s*=-1),s<0)e=this.isReverse?e.left:e.right;else{if(s===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const r={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return r}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class G{constructor(e,r,n,o,s){this.key=e,this.value=r,this.color=n??G.RED,this.left=o??G.EMPTY,this.right=s??G.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,r,n,o,s){return new G(e??this.key,r??this.value,n??this.color,o??this.left,s??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,r,n){let o=this;const s=n(e,o.key);return o=s<0?o.copy(null,null,null,o.left.insert(e,r,n),null):s===0?o.copy(null,r,null,null,null):o.copy(null,null,null,null,o.right.insert(e,r,n)),o.fixUp()}removeMin(){if(this.left.isEmpty())return G.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,r){let n,o=this;if(r(e,o.key)<0)o.left.isEmpty()||o.left.isRed()||o.left.left.isRed()||(o=o.moveRedLeft()),o=o.copy(null,null,null,o.left.remove(e,r),null);else{if(o.left.isRed()&&(o=o.rotateRight()),o.right.isEmpty()||o.right.isRed()||o.right.left.isRed()||(o=o.moveRedRight()),r(e,o.key)===0){if(o.right.isEmpty())return G.EMPTY;n=o.right.min(),o=o.copy(n.key,n.value,null,null,o.right.removeMin())}o=o.copy(null,null,null,null,o.right.remove(e,r))}return o.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,G.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,G.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),r=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,r)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw V(43730,{key:this.key,value:this.value});if(this.right.isRed())throw V(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw V(27949);return e+(this.isRed()?0:1)}}G.EMPTY=null,G.RED=!0,G.BLACK=!1;G.EMPTY=new class{constructor(){this.size=0}get key(){throw V(57766)}get value(){throw V(16141)}get color(){throw V(16727)}get left(){throw V(29726)}get right(){throw V(36894)}copy(e,r,n,o,s){return this}insert(e,r,n){return new G(e,r)}remove(e,r){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e){this.comparator=e,this.data=new ht(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((r,n)=>(e(r),!1)))}forEachInRange(e,r){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const o=n.getNext();if(this.comparator(o.key,e[1])>=0)return;r(o.key)}}forEachWhile(e,r){let n;for(n=r!==void 0?this.data.getIteratorFrom(r):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const r=this.data.getIteratorFrom(e);return r.hasNext()?r.getNext().key:null}getIterator(){return new en(this.data.getIterator())}getIteratorFrom(e){return new en(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let r=this;return r.size<e.size&&(r=e,e=this),e.forEach((n=>{r=r.add(n)})),r}isEqual(e){if(!(e instanceof mt)||this.size!==e.size)return!1;const r=this.data.getIterator(),n=e.data.getIterator();for(;r.hasNext();){const o=r.getNext().key,s=n.getNext().key;if(this.comparator(o,s)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((r=>{e.push(r)})),e}toString(){const e=[];return this.forEach((r=>e.push(r))),"SortedSet("+e.toString()+")"}copy(e){const r=new mt(this.comparator);return r.data=e,r}}class en{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class se{constructor(e){this.value=e}static empty(){return new se({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let r=this.value;for(let n=0;n<e.length-1;++n)if(r=(r.mapValue.fields||{})[e.get(n)],!xt(r))return null;return r=(r.mapValue.fields||{})[e.lastSegment()],r||null}}set(e,r){this.getFieldsMap(e.popLast())[e.lastSegment()]=Oe(r)}setAll(e){let r=ke.emptyPath(),n={},o=[];e.forEach(((i,a)=>{if(!r.isImmediateParentOf(a)){const c=this.getFieldsMap(r);this.applyChanges(c,n,o),n={},o=[],r=a.popLast()}i?n[a.lastSegment()]=Oe(i):o.push(a.lastSegment())}));const s=this.getFieldsMap(r);this.applyChanges(s,n,o)}delete(e){const r=this.field(e.popLast());xt(r)&&r.mapValue.fields&&delete r.mapValue.fields[e.lastSegment()]}isEqual(e){return ut(this.value,e.value)}getFieldsMap(e){let r=this.value;r.mapValue.fields||(r.mapValue={fields:{}});for(let n=0;n<e.length;++n){let o=r.mapValue.fields[e.get(n)];xt(o)&&o.mapValue.fields||(o={mapValue:{fields:{}}},r.mapValue.fields[e.get(n)]=o),r=o}return r.mapValue.fields}applyChanges(e,r,n){Et(r,((o,s)=>e[o]=s));for(const o of n)delete e[o]}clone(){return new se(Oe(this.value))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oe{constructor(e,r,n,o,s,i,a){this.key=e,this.documentType=r,this.version=n,this.readTime=o,this.createTime=s,this.data=i,this.documentState=a}static newInvalidDocument(e){return new oe(e,0,W.min(),W.min(),W.min(),se.empty(),0)}static newFoundDocument(e,r,n,o){return new oe(e,1,r,W.min(),n,o,0)}static newNoDocument(e,r){return new oe(e,2,r,W.min(),W.min(),se.empty(),0)}static newUnknownDocument(e,r){return new oe(e,3,r,W.min(),W.min(),se.empty(),2)}convertToFoundDocument(e,r){return!this.createTime.isEqual(W.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=r,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=se.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=se.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=W.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof oe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new oe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pa{constructor(e,r=null,n=[],o=[],s=null,i=null,a=null){this.path=e,this.collectionGroup=r,this.orderBy=n,this.filters=o,this.limit=s,this.startAt=i,this.endAt=a,this.Ie=null}}function tn(t,e=null,r=[],n=[],o=null,s=null,i=null){return new pa(t,e,r,n,o,s,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ir{constructor(e,r=null,n=[],o=[],s=null,i="F",a=null,c=null){this.path=e,this.collectionGroup=r,this.explicitOrderBy=n,this.filters=o,this.limit=s,this.limitType=i,this.startAt=a,this.endAt=c,this.pe=null,this.ye=null,this.we=null,this.startAt,this.endAt}}function fa(t){return t.collectionGroup!==null}function ga(t){const e=bt(t);if(e.pe===null){e.pe=[];const r=new Set;for(const s of e.explicitOrderBy)e.pe.push(s),r.add(s.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(i){let a=new mt(ke.comparator);return i.filters.forEach((c=>{c.getFlattenedFilters().forEach((d=>{d.isInequality()&&(a=a.add(d.field))}))})),a})(e).forEach((s=>{r.has(s.canonicalString())||s.isKeyField()||e.pe.push(new Kt(s,n))})),r.has(ke.keyField().canonicalString())||e.pe.push(new Kt(ke.keyField(),n))}return e.pe}function ya(t){const e=bt(t);return e.ye||(e.ye=va(e,ga(t))),e.ye}function va(t,e){if(t.limitType==="F")return tn(t.path,t.collectionGroup,e,t.filters,t.limit,t.startAt,t.endAt);{e=e.map((o=>{const s=o.dir==="desc"?"asc":"desc";return new Kt(o.field,s)}));const r=t.endAt?new Zr(t.endAt.position,t.endAt.inclusive):null,n=t.startAt?new Zr(t.startAt.position,t.startAt.inclusive):null;return tn(t.path,t.collectionGroup,e,t.filters,t.limit,r,n)}}function Qt(t,e){const r=t.filters.concat([e]);return new ir(t.path,t.collectionGroup,t.explicitOrderBy.slice(),r,t.limit,t.limitType,t.startAt,t.endAt)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ro(t,e){if(t.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:lt(e)?"-0":e}}function ba(t,e,r){return(function(o){return typeof o=="number"&&Number.isInteger(o)&&!lt(o)&&o<=Number.MAX_SAFE_INTEGER&&o>=Number.MIN_SAFE_INTEGER})(e)?(function(o){return{integerValue:""+o}})(e):ro(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wa={asc:"ASCENDING",desc:"DESCENDING"},Ea={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Sa={and:"AND",or:"OR"};class _a{constructor(e,r){this.databaseId=e,this.useProto3Json=r}}function Rt(t,e){return t.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Ia(t,e){return t.useProto3Json?e.toBase64():e.toUint8Array()}function Be(t){return Q(!!t,49232),W.fromTimestamp((function(r){const n=fe(r);return new O(n.seconds,n.nanos)})(t))}function ar(t,e){return Yt(t,e).canonicalString()}function Yt(t,e){const r=(function(o){return new U(["projects",o.projectId,"databases",o.database])})(t).child("documents");return e===void 0?r:r.child(e)}function ka(t,e){return ar(t.databaseId,e.path)}function Jt(t,e){const r=(function(o){const s=U.fromString(o);return Q(oo(s),10190,{key:s.toString()}),s})(e);if(r.get(1)!==t.databaseId.projectId)throw new A(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+r.get(1)+" vs "+t.databaseId.projectId);if(r.get(3)!==t.databaseId.database)throw new A(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+r.get(3)+" vs "+t.databaseId.database);return new H((function(o){return Q(o.length>4&&o.get(4)==="documents",29091,{key:o.toString()}),o.popFirst(5)})(r))}function Aa(t,e){return"found"in e?(function(n,o){Q(!!o.found,43571),o.found.name,o.found.updateTime;const s=Jt(n,o.found.name),i=Be(o.found.updateTime),a=o.found.createTime?Be(o.found.createTime):W.min(),c=new se({mapValue:{fields:o.found.fields}});return oe.newFoundDocument(s,i,a,c)})(t,e):"missing"in e?(function(n,o){Q(!!o.missing,3894),Q(!!o.readTime,22933);const s=Jt(n,o.missing),i=Be(o.readTime);return oe.newNoDocument(s,i)})(t,e):V(7234,{result:e})}function Ta(t,e){const r={structuredQuery:{}},n=e.path;let o;e.collectionGroup!==null?(o=n,r.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(o=n.popLast(),r.structuredQuery.from=[{collectionId:n.lastSegment()}]),r.parent=(function(d,l){return ar(d.databaseId,l)})(t,o);const s=(function(d){if(d.length!==0)return no(Ke.create(d,"and"))})(e.filters);s&&(r.structuredQuery.where=s);const i=(function(d){if(d.length!==0)return d.map((l=>(function(E){return{field:we(E.field),direction:Pa(E.dir)}})(l)))})(e.orderBy);i&&(r.structuredQuery.orderBy=i);const a=(function(d,l){return d.useProto3Json||ea(l)?l:{value:l}})(t,e.limit);return a!==null&&(r.structuredQuery.limit=a),e.startAt&&(r.structuredQuery.startAt=(function(d){return{before:d.inclusive,values:d.position}})(e.startAt)),e.endAt&&(r.structuredQuery.endAt=(function(d){return{before:!d.inclusive,values:d.position}})(e.endAt)),{ve:r,parent:o}}function Pa(t){return wa[t]}function Da(t){return Ea[t]}function Ca(t){return Sa[t]}function we(t){return{fieldPath:t.canonicalString()}}function no(t){return t instanceof ee?(function(r){if(r.op==="=="){if(Xr(r.value))return{unaryFilter:{field:we(r.field),op:"IS_NAN"}};if(Jr(r.value))return{unaryFilter:{field:we(r.field),op:"IS_NULL"}}}else if(r.op==="!="){if(Xr(r.value))return{unaryFilter:{field:we(r.field),op:"IS_NOT_NAN"}};if(Jr(r.value))return{unaryFilter:{field:we(r.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:we(r.field),op:Da(r.op),value:r.value}}})(t):t instanceof Ke?(function(r){const n=r.getFilters().map((o=>no(o)));return n.length===1?n[0]:{compositeFilter:{op:Ca(r.op),filters:n}}})(t):V(54877,{filter:t})}function oo(t){return t.length>=4&&t.get(0)==="projects"&&t.get(2)==="databases"}function so(t){return!!t&&typeof t._toProto=="function"&&t._protoValueType==="ProtoValue"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(t){return new _a(t,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xa{}class Ra extends xa{constructor(e,r,n,o){super(),this.authCredentials=e,this.appCheckCredentials=r,this.connection=n,this.serializer=o,this.be=!1}De(){if(this.be)throw new A(_.FAILED_PRECONDITION,"The client has already been terminated.")}le(e,r,n,o){return this.De(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([s,i])=>this.connection.le(e,Yt(r,n),o,s,i))).catch((s=>{throw s.name==="FirebaseError"?(s.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new A(_.UNKNOWN,s.toString())}))}de(e,r,n,o,s){return this.De(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,a])=>this.connection.de(e,Yt(r,n),o,i,a,s))).catch((i=>{throw i.name==="FirebaseError"?(i.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new A(_.UNKNOWN,i.toString())}))}terminate(){this.be=!0,this.connection.terminate()}}async function $a(t,e){const r=bt(t),n={documents:e.map((a=>ka(r.serializer,a)))},o=await r.de("BatchGetDocuments",r.serializer.databaseId,U.emptyPath(),n,e.length),s=new Map;o.forEach((a=>{const c=Aa(r.serializer,a);s.set(c.key.toString(),c)}));const i=[];return e.forEach((a=>{const c=s.get(a.toString());Q(!!c,55234,{key:a}),i.push(c)})),i}async function Na(t,e){const r=bt(t),{ve:n,parent:o}=Ta(r.serializer,ya(e));return(await r.de("RunQuery",r.serializer.databaseId,o,{structuredQuery:n.structuredQuery})).filter((s=>!!s.document)).map((s=>(function(a,c,d){const l=Jt(a,c.name),g=Be(c.updateTime),E=c.createTime?Be(c.createTime):W.min(),S=new se({mapValue:{fields:c.fields}}),I=oe.newFoundDocument(l,g,E,S);return d?I.setHasCommittedMutations():I})(r.serializer,s.document,void 0)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io="ComponentProvider",Me=new Map;function ao(t){if(t._terminated)throw new A(_.FAILED_PRECONDITION,"The client has already been terminated.");if(!Me.has(t)){at(io,"Initializing Datastore");const e=(function(s){return new na(s)})((function(s,i,a,c,d){return new ji(s,i,a,d.host,d.ssl,d.experimentalForceLongPolling,d.experimentalAutoDetectLongPolling,Kn(d.experimentalLongPollingOptions),d.useFetchStreams,d.isUsingEmulator,c,d._customHeaders,d.grpcFlowControlWindow)})(t._databaseId,t.app.options.appId||"",t._persistenceKey,t.app.options.apiKey,t._freezeSettings())),r=lr(t._databaseId),n=(function(s,i,a,c){return new Ra(s,i,a,c)})(t._authCredentials,t._appCheckCredentials,e,r);Me.set(t,n)}return Me.get(t)}const La=1048576,lo="firestore.googleapis.com",rn=!0;class nn{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new A(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=lo,this.ssl=rn}else this.host=e.host,this.ssl=e.ssl??rn;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<La)throw new A(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if((function(n,o,s,i){if(o===!0&&i===!0)throw new A(_.INVALID_ARGUMENT,`${n} and ${s} cannot be used together.`)})("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Kn(e.experimentalLongPollingOptions??{}),(function(n){if(n.timeoutSeconds!==void 0){if(isNaN(n.timeoutSeconds))throw new A(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (must not be NaN)`);if(n.timeoutSeconds<5)throw new A(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (minimum allowed value is 5)`);if(n.timeoutSeconds>30)throw new A(_.INVALID_ARGUMENT,`invalid long polling timeout: ${n.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new A(_.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(n,o){return n.timeoutSeconds===o.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(n,o){if(n===o)return!0;if(!n||!o)return!1;const s=Object.keys(n),i=Object.keys(o);if(s.length!==i.length)return!1;for(const a of s)if(n[a]!==o[a])return!1;return!0})(this._customHeaders,e._customHeaders)}}class St{constructor(e,r,n,o){this._authCredentials=e,this._appCheckCredentials=r,this._databaseId=n,this._app=o,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new nn({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new A(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new A(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new nn(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(n){if(!n)return new Mi;switch(n.type){case"firstParty":return new qi(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new A(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(r){const n=Me.get(r);n&&(at(io,"Removing Datastore"),Me.delete(r),n.terminate())})(this),Promise.resolve()}}function on(t,e){const r=typeof t=="object"?t:ui(),n=typeof t=="string"?t:e||"(default)",o=si(r,"firestore/lite").getImmediate({identifier:n});if(!o._initialized){const s=Xo("firestore");s&&co(o,...s)}return o}function co(t,e,r,n={}){var d;t=sr(t,St);const o=Rn(e),s=t._getSettings(),i={...s,emulatorOptions:t._getEmulatorOptions()},a=`${e}:${r}`;o&&ls(`https://${a}`),s.host!==lo&&s.host!==a&&Hn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...s,host:a,ssl:o,emulatorOptions:n};if(!ot(c,i)&&(t._setSettings(c),n.mockUserToken)){let l,g;if(typeof n.mockUserToken=="string")l=n.mockUserToken,g=K.MOCK_USER;else{l=es(n.mockUserToken,(d=t._app)==null?void 0:d.options.projectId);const E=n.mockUserToken.sub||n.mockUserToken.user_id;if(!E)throw new A(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");g=new K(E)}t._authCredentials=new Fi(new zn(l,g))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e,r,n){this.converter=r,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new ye(this.firestore,e,this._query)}}class q{constructor(e,r,n){this.converter=r,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new de(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new q(this.firestore,e,this._key)}toJSON(){return{type:q._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,r,n){if(Ge(r,q._jsonSchema))return new q(e,n||null,new H(U.fromString(r.referencePath)))}}q._jsonSchemaVersion="firestore/documentReference/1.0",q._jsonSchema={type:J("string",q._jsonSchemaVersion),referencePath:J("string")};class de extends ye{constructor(e,r,n){super(e,r,(function(s){return new ir(s)})(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new q(this.firestore,null,new H(e))}withConverter(e){return new de(this.firestore,e,this._path)}}function uo(t,e,...r){if(t=Ae(t),Wn("collection","path",e),t instanceof St){const n=U.fromString(e,...r);return qr(n),new de(t,null,n)}{if(!(t instanceof q||t instanceof de))throw new A(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=t._path.child(U.fromString(e,...r));return qr(n),new de(t.firestore,null,n)}}function sn(t,e,...r){if(t=Ae(t),arguments.length===1&&(e=Gi.newId()),Wn("doc","path",e),t instanceof St){const n=U.fromString(e,...r);return Vr(n),new q(t,null,new H(n))}{if(!(t instanceof q||t instanceof de))throw new A(_.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=t._path.child(U.fromString(e,...r));return Vr(n),new q(t.firestore,t instanceof de?t.converter:null,new H(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Y(ce.fromBase64String(e))}catch(r){throw new A(_.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+r)}}static fromUint8Array(e){return new Y(ce.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:Y._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Ge(e,Y._jsonSchema))return Y.fromBase64String(e.bytes)}}Y._jsonSchemaVersion="firestore/bytes/1.0",Y._jsonSchema={type:J("string",Y._jsonSchemaVersion),bytes:J("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho{constructor(...e){for(let r=0;r<e.length;++r)if(e[r].length===0)throw new A(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ke(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ie{constructor(e,r){if(!isFinite(e)||e<-90||e>90)throw new A(_.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(r)||r<-180||r>180)throw new A(_.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+r);this._lat=e,this._long=r}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return M(this._lat,e._lat)||M(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:ie._jsonSchemaVersion}}static fromJSON(e){if(Ge(e,ie._jsonSchema))return new ie(e.latitude,e.longitude)}}ie._jsonSchemaVersion="firestore/geoPoint/1.0",ie._jsonSchema={type:J("string",ie._jsonSchemaVersion),latitude:J("number"),longitude:J("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z{constructor(e){this._values=(e||[]).map((r=>r))}toArray(){return this._values.map((e=>e))}isEqual(e){/**
* @license
* Copyright 2017 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(n,o){if(n.length!==o.length)return!1;for(let s=0;s<n.length;++s)if(n[s]!==o[s])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Z._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Ge(e,Z._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((r=>typeof r=="number")))return new Z(e.vectorValues);throw new A(_.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Z._jsonSchemaVersion="firestore/vectorValue/1.0",Z._jsonSchema={type:J("string",Z._jsonSchemaVersion),vectorValues:J("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa=/^__.*__$/;function po(t){switch(t){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw V(40011,{dataSource:t})}}class cr{constructor(e,r,n,o,s,i){this.settings=e,this.databaseId=r,this.serializer=n,this.ignoreUndefinedProperties=o,s===void 0&&this.validatePath(),this.fieldTransforms=s||[],this.fieldMask=i||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new cr({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var o;const r=(o=this.path)==null?void 0:o.child(e),n=this.contextWith({path:r,arrayElement:!1});return n.validatePathSegment(e),n}childContextForFieldPath(e){var o;const r=(o=this.path)==null?void 0:o.child(e),n=this.contextWith({path:r,arrayElement:!1});return n.validatePath(),n}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return pt(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((r=>e.isPrefixOf(r)))!==void 0||this.fieldTransforms.find((r=>e.isPrefixOf(r.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(po(this.dataSource)&&Oa.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Ba{constructor(e,r,n){this.databaseId=e,this.ignoreUndefinedProperties=r,this.serializer=n||lr(e)}createContext(e,r,n,o=!1){return new cr({dataSource:e,methodName:r,targetDoc:n,path:ke.emptyPath(),arrayElement:!1,hasConverter:o},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Ma(t){const e=t._freezeSettings(),r=lr(t._databaseId);return new Ba(t._databaseId,!!e.ignoreUndefinedProperties,r)}function Fa(t,e,r,n=!1){return ur(r,t.createContext(n?4:3,e))}function ur(t,e,r){if(go(t=Ae(t)))return Va("Unsupported field value:",e,t),Ua(t,e);if(t instanceof mo)return(function(o,s){if(!po(s.dataSource))throw s.createError(`${o._methodName}() can only be used with update() and set()`);if(!s.path)throw s.createError(`${o._methodName}() is not currently supported inside arrays`);const i=o._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(t,e),null;if(t===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),t instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(o,s){const i=[];let a=0;for(const c of o){let d=ur(c,s.childContextForArray(a));d==null&&(d={nullValue:"NULL_VALUE"}),i.push(d),a++}return{arrayValue:{values:i}}})(t,e)}return(function(o,s,i){if((o=Ae(o))===null)return{nullValue:"NULL_VALUE"};if(typeof o=="number")return ba(s.serializer,o);if(typeof o=="boolean")return{booleanValue:o};if(typeof o=="string")return{stringValue:o};if(o instanceof Date){const a=O.fromDate(o);return{timestampValue:Rt(s.serializer,a)}}if(o instanceof O){const a=new O(o.seconds,1e3*Math.floor(o.nanoseconds/1e3));return{timestampValue:Rt(s.serializer,a)}}if(fo(o)){const a=O.fromInstant(o),c=new O(a.seconds,1e3*Math.floor(a.nanoseconds/1e3));return{timestampValue:Rt(s.serializer,c)}}if(o instanceof ie)return{geoPointValue:{latitude:o.latitude,longitude:o.longitude}};if(o instanceof Y)return{bytesValue:Ia(s.serializer,o._byteString)};if(o instanceof q){const a=s.databaseId,c=o.firestore._databaseId;if(!c.isEqual(a))throw s.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:ar(o.firestore._databaseId||s.databaseId,o._key.path)}}if(o instanceof Z)return(function(c,d){const l=c instanceof Z?c.toArray():c;return{mapValue:{fields:{[Jn]:{stringValue:Xn},[ct]:{arrayValue:{values:l.map((E=>{if(typeof E!="number")throw d.createError("VectorValues must only contain numeric values.");return ro(d.serializer,E)}))}}}}}})(o,s);if(so(o))return o._toProto(s.serializer);throw s.createError(`Unsupported field value: ${wt(o)}`)})(t,e)}function Ua(t,e){const r={};return(function(o){for(const s in o)if(Object.prototype.hasOwnProperty.call(o,s))return!1;return!0})(t)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Et(t,((n,o)=>{const s=ur(o,e.childContextForField(n));s!=null&&(r[n]=s)})),{mapValue:{fields:r}}}function fo(t){if(typeof t!="object"||t===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&t instanceof Temporal.Instant)return!0;const e=t;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.Te=="bigint"}function go(t){return!(typeof t!="object"||t===null||t instanceof Array||t instanceof Date||t instanceof O||t instanceof ie||t instanceof Y||t instanceof q||t instanceof mo||t instanceof Z||fo(t)||so(t))}function Va(t,e,r){if(!go(r)||!Gn(r)){const n=wt(r);throw n==="an object"?e.createError(t+" a custom object"):e.createError(t+" "+n)}}function yo(t,e,r){if((e=Ae(e))instanceof ho)return e._internalPath;if(typeof e=="string")return Ha(t,e);throw pt("Field path arguments must be of type string or ",t,!1,void 0,r)}const qa=new RegExp("[~\\*/\\[\\]]");function Ha(t,e,r){if(e.search(qa)>=0)throw pt(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,t,!1,void 0,r);try{return new ho(...e.split("."))._internalPath}catch{throw pt(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,t,!1,void 0,r)}}function pt(t,e,r,n,o){const s=n&&!n.isEmpty(),i=o!==void 0;let a=`Function ${e}() called with invalid data`;r&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(s||i)&&(c+=" (found",s&&(c+=` in field ${n}`),i&&(c+=` in document ${o}`),c+=")"),new A(_.INVALID_ARGUMENT,a+t+c)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo{constructor(e,r,n,o,s){this._firestore=e,this._userDataWriter=r,this._key=n,this._document=o,this._converter=s}get id(){return this._key.path.lastSegment()}get ref(){return new q(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new bo(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const r=this._document.data.field(yo("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r)}}}class bo extends vo{data(){return super.data()}}class ja{constructor(e,r){this._docs=r,this.query=e}get docs(){return[...this._docs]}get size(){return this.docs.length}get empty(){return this.docs.length===0}forEach(e,r){this._docs.forEach(e,r)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{}class wo extends dr{}function za(t,e,...r){let n=[];e instanceof dr&&n.push(e),n=n.concat(r),(function(s){const i=s.filter((c=>c instanceof hr)).length,a=s.filter((c=>c instanceof _t)).length;if(i>1||i>0&&a>0)throw new A(_.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(n);for(const o of n)t=o._apply(t);return t}class _t extends wo{constructor(e,r,n){super(),this._field=e,this._op=r,this._value=n,this.type="where"}static _create(e,r,n){return new _t(e,r,n)}_apply(e){const r=this._parse(e);return Eo(e._query,r),new ye(e.firestore,e.converter,Qt(e._query,r))}_parse(e){const r=Ma(e.firestore);return(function(s,i,a,c,d,l,g){let E;if(d.isKeyField()){if(l==="array-contains"||l==="array-contains-any")throw new A(_.INVALID_ARGUMENT,`Invalid Query. You can't perform '${l}' queries on documentId().`);if(l==="in"||l==="not-in"){ln(g,l);const I=[];for(const w of g)I.push(an(c,s,w));E={arrayValue:{values:I}}}else E=an(c,s,g)}else l!=="in"&&l!=="not-in"&&l!=="array-contains-any"||ln(g,l),E=Fa(a,i,g,l==="in"||l==="not-in");return ee.create(d,l,E)})(e._query,"where",r,e.firestore._databaseId,this._field,this._op,this._value)}}function Wa(t,e,r){const n=e,o=yo("where",t);return _t._create(o,n,r)}class hr extends dr{constructor(e,r){super(),this.type=e,this._queryConstraints=r}static _create(e,r){return new hr(e,r)}_parse(e){const r=this._queryConstraints.map((n=>n._parse(e))).filter((n=>n.getFilters().length>0));return r.length===1?r[0]:Ke.create(r,this._getOperator())}_apply(e){const r=this._parse(e);return r.getFilters().length===0?e:((function(o,s){let i=o;const a=s.getFlattenedFilters();for(const c of a)Eo(i,c),i=Qt(i,c)})(e._query,r),new ye(e.firestore,e.converter,Qt(e._query,r)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class mr extends wo{constructor(e,r,n){super(),this.type=e,this._limit=r,this._limitType=n}static _create(e,r,n){return new mr(e,r,n)}_apply(e){return new ye(e.firestore,e.converter,(function(n,o,s){return new ir(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),o,s,n.startAt,n.endAt)})(e._query,this._limit,this._limitType))}}function Ga(t){return Xi("limit",t),mr._create("limit",t,"F")}function an(t,e,r){if(typeof(r=Ae(r))=="string"){if(r==="")throw new A(_.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!fa(e)&&r.indexOf("/")!==-1)throw new A(_.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${r}' contains a '/' character.`);const n=e.path.child(U.fromString(r));if(!H.isDocumentKey(n))throw new A(_.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Yr(t,new H(n))}if(r instanceof q)return Yr(t,r._key);throw new A(_.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${wt(r)}.`)}function ln(t,e){if(!Array.isArray(t)||t.length===0)throw new A(_.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Eo(t,e){const r=(function(o,s){for(const i of o)for(const a of i.getFlattenedFilters())if(s.indexOf(a.op)>=0)return a.op;return null})(t.filters,(function(o){switch(o){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(r!==null)throw r===e.op?new A(_.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new A(_.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${r.toString()}' filters.`)}class Ka{convertValue(e,r="none"){switch(ge(e)){case 0:return null;case 1:return e.booleanValue;case 2:return F(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,r);case 5:return e.stringValue;case 6:return this.convertBytes(qe(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,r);case 11:return this.convertObject(e.mapValue,r);case 10:return this.convertVectorValue(e.mapValue);default:throw V(62114,{value:e})}}convertObject(e,r){return this.convertObjectMap(e.fields,r)}convertObjectMap(e,r="none"){const n={};return Et(e,((o,s)=>{n[o]=this.convertValue(s,r)})),n}convertVectorValue(e){var n,o,s;const r=(s=(o=(n=e.fields)==null?void 0:n[ct].arrayValue)==null?void 0:o.values)==null?void 0:s.map((i=>F(i.doubleValue)));return new Z(r)}convertGeoPoint(e){return new ie(F(e.latitude),F(e.longitude))}convertArray(e,r){return(e.values||[]).map((n=>this.convertValue(n,r)))}convertServerTimestamp(e,r){switch(r){case"previous":const n=Yn(e);return n==null?null:this.convertValue(n,r);case"estimate":return this.convertTimestamp(He(e));default:return null}}convertTimestamp(e){const r=fe(e);return new O(r.seconds,r.nanos)}convertDocumentKey(e,r){const n=U.fromString(e);Q(oo(n),9688,{name:e});const o=new Ve(n.get(1),n.get(3)),s=new H(n.popFirst(5));return o.isEqual(r)||nr(`A document reference to ${s} refers to a different database (${o.projectId}/${o.database}), which is not supported. It will be treated as a reference in the current database (${r.projectId}/${r.database}) instead.`),s}}class So extends Ka{constructor(e){super(),this.firestore=e}convertBytes(e){return new Y(e)}convertReference(e){const r=this.convertDocumentKey(e,this.firestore._databaseId);return new q(this.firestore,null,r)}}function cn(t){const e=ao((t=sr(t,q)).firestore),r=new So(t.firestore);return $a(e,[t._key]).then((n=>{Q(n.length===1,15618);const o=n[0];return new vo(t.firestore,r,t._key,o.isFoundDocument()?o:null,t.converter)}))}function _o(t){(function(o){if(o.limitType==="L"&&o.explicitOrderBy.length===0)throw new A(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")})((t=sr(t,ye))._query);const e=ao(t.firestore),r=new So(t.firestore);return Na(e,t._query).then((n=>{const o=n.map((s=>new bo(t.firestore,r,s.key,s,t.converter)));return t._query.limitType==="L"&&o.reverse(),new ja(t,o)}))}const un="4.17.2";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){Bi(`${ci}_lite`),it(new Fe("firestore/lite",((e,{instanceIdentifier:r,options:n})=>{const o=e.getProvider("app").getImmediate(),s=new St(new Ui(e.getProvider("auth-internal")),new Hi(o,e.getProvider("app-check-internal")),zi(o,r),o);return n&&s._setSettings(n),s}),"PUBLIC").setMultipleInstances(!0)),Ie("firestore-lite",un,""),Ie("firestore-lite",un,"esm2020")})();let xe=null;function ft(){if(xe)return xe;const t=Vn();if(!t)throw Object.assign(new Error("Firestore unavailable"),{code:"unavailable"});const e=Li();return xe=e?on(t,e):on(t),vt&&co(xe,...Fn.firestore),xe}async function Qa(){const t=await cn(sn(ft(),"config","public"));if(t.exists())return{data:t.data(),source:"public"};const e=await cn(sn(ft(),"config","main"));return e.exists()?{data:e.data(),source:"legacy"}:{data:null,source:"none"}}async function Ya(){const t=await _o(uo(ft(),"products"));return{list:t.docs.map(e=>e.data()),empty:t.empty}}async function Ja(t=30){const e=await _o(za(uo(ft(),"reviews"),Wa("status","==","approved"),Ga(t))),r=n=>n&&typeof n.toMillis=="function"?n.toMillis():null;return e.docs.map(n=>({...n.data(),id:n.id,createdAt:r(n.data().createdAt)})).sort((n,o)=>(o.createdAt||0)-(n.createdAt||0))}function Re(t){const e=String(t&&t.code||"").replace(/^firestore\//,"");return e==="permission-denied"||e==="unauthenticated"?"denied":e==="unavailable"||e==="deadline-exceeded"||typeof navigator<"u"&&navigator.onLine===!1?"offline":e==="invalid-argument"||e==="failed-precondition"?"invalid":e==="not-found"?"missing":"failed"}const Io=["dev","admin","staff"],Xa=["qaessafty@gmail.com","yumy.swets@gmail.com"],ko=["brand","theme","about","faq","reviews","contact","socials","products","customers","economy","fonts"],Za=168,Xt="ys_auth_hint_v1";let Ee=null,X=null;async function pr(){return X?{api:Ee,auth:X}:(Ee=await An(()=>import("./index.esm-k9wA2BGs.js"),[],import.meta.url),X=Ee.getAuth(Vn()),vt&&Ee.connectAuthEmulator(X,Fn.auth,{disableWarnings:!0}),{api:Ee,auth:X})}function el(t){try{return t.getItem(Xt)==="1"}catch{return!1}}function ze(t,e){try{e?t.setItem(Xt,"1"):t.removeItem(Xt)}catch{}}function Ao(t,e={},r=Date.now()){var l,g;if(!t)return null;const n=typeof t.email=="string"?t.email.toLowerCase():"",o=!!(t.emailVerified||e.email_verified),s=!!(n&&o&&Xa.includes(n));let i="customer";Io.includes(e.role)&&(i=e.role),s&&i!=="dev"&&(i="dev");const a=i==="staff"&&Array.isArray(e.perms)?e.perms.filter(E=>ko.includes(E)):[],c=Number(e.auth_time)*1e3||r,d=i!=="customer"&&r-c>Za*3600*1e3;return{uid:t.uid,name:t.displayName||(n?n.split("@")[0]:"")||"",email:n,phone:t.phoneNumber||"",provider:t.isAnonymous?"anonymous":((g=(l=t.providerData)==null?void 0:l[0])==null?void 0:g.providerId)||"password",role:i,perms:a,isOwner:s,expired:d}}function pe(t){return!!(t&&Io.includes(t.role)&&!t.expired)}function re(t,e){return pe(t)?t.role==="dev"?!0:t.role==="admin"?e!=="data":t.perms.includes(e):!1}async function tl(t,{storage:e=localStorage,force:r=!1}={}){if(!r&&!el(e))return t(null),()=>{};const{api:n,auth:o}=await pr();return n.onIdTokenChanged(o,async s=>{if(!s){ze(e,!1),t(null);return}try{const i=await s.getIdTokenResult();ze(e,!0),t(Ao(s,i.claims))}catch(i){console.error("Could not read sign-in token:",i&&i.code),t(null)}})}async function dn(t=localStorage){const{api:e,auth:r}=await pr(),n=await e.signInWithPopup(r,new e.GoogleAuthProvider);return ze(t,!0),n.user}async function rl(t,e,r=localStorage){const{api:n,auth:o}=await pr(),s=await n.signInWithEmailAndPassword(o,t,e);return ze(r,!0),s.user}async function hn(t=localStorage){ze(t,!1),X&&await Ee.signOut(X)}async function mn(){if(!X||!X.currentUser)return null;const t=await X.currentUser.getIdTokenResult(!0);return Ao(X.currentUser,t.claims)}function $t(t){const e=t&&t.code||"";return{"auth/popup-closed-by-user":"popupClosed","auth/cancelled-popup-request":"popupClosed","auth/popup-blocked":"popupBlocked","auth/invalid-credential":"badCredentials","auth/wrong-password":"badCredentials","auth/user-not-found":"badCredentials","auth/invalid-email":"badEmail","auth/too-many-requests":"tooMany","auth/network-request-failed":"offline","auth/operation-not-allowed":"providerDisabled","auth/unauthorized-domain":"unauthorizedDomain"}[e]||"generic"}const nl={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"};function u(t){return String(t??"").replace(/[&<>"'`]/g,e=>nl[e])}function j(t){return u(JSON.stringify(String(t??"")))}const ol=["strong","b","em","i"];function pn(t){let e=u(t);for(const r of ol)e=e.replace(new RegExp(`&lt;${r}&gt;`,"gi"),`<${r}>`).replace(new RegExp(`&lt;/${r}&gt;`,"gi"),`</${r}>`);return e=e.replace(/&lt;br\s*\/?&gt;/gi,"<br>"),sl(e)}function sl(t){const e=[];return t.replace(/<(\/?)(strong|b|em|i)>/gi,(r,n,o)=>(o=o.toLowerCase(),n?e[e.length-1]===o&&e.pop():e.push(o),"")),t+e.reverse().map(r=>`</${r}>`).join("")}function il(t){return String(t??"").replace(/<[^>]*>/g,"")}function he(t,{allowDataImage:e=!1}={}){const r=String(t??"").trim();return r&&(/^https?:\/\//i.test(r)||/^(\.{0,2}\/|#)/.test(r)&&!r.startsWith("//")||e&&/^data:image\/(png|jpe?g|webp|gif);base64,[a-z0-9+/=\s]+$/i.test(r))?r:""}function fn(t){return u(t).replace(/\r?\n/g,"<br>")}const To=Object.freeze({primaryCurrency:"USD",secondaryCurrency:"IQD",showSecondary:!0,currencySymbol:"د.ع",exchangeRate:1310,roundingRule:250,autoRefreshRate:!1,deliveryFee:8,freeDeliveryOver:60,minimumOrder:0,pickupOnly:!1,taxEnabled:!1,taxRate:0,taxLabel:"VAT",taxIncluded:!0,promoCode:"",promoType:"percent",promoValue:0,promoExpiry:"",leadTimeHours:24,lastUpdatedRate:null});function al(t){return!!(t&&t.showSecondary!==!1&&t.secondaryCurrency&&t.secondaryCurrency!=="None")}function ll(t){return t?t.currencySymbol||(t.secondaryCurrency==="IQD"?"د.ع":t.secondaryCurrency||""):""}function cl(t,e,r="USD",n=1310){const o=Number(t)||0;if(r!=="USD"&&al(e)){const s=Number(e.exchangeRate)>0?Number(e.exchangeRate):n,i=o*s,a=parseInt(e.roundingRule,10)||250,c=ll(e);if(a>1){const d=Math.round(i/a)*a;return new Intl.NumberFormat("en-US").format(d)+" "+c}return c+" "+(Math.round(i*100)/100).toFixed(2)}return"$"+o.toFixed(2)}function Po(t,e,r=new Date){const n=String(e||"").trim().toUpperCase(),o=String((t==null?void 0:t.promoCode)||"").trim().toUpperCase();if(!n)return{status:"empty",code:""};if(!o||n!==o)return{status:"invalid",code:n};if(t.promoExpiry){const s=new Date(t.promoExpiry+"T23:59:59");if(!isNaN(s.getTime())&&r>s)return{status:"expired",code:o}}return{status:"valid",code:o}}const $e=t=>Math.round(t*100)/100;function Do(t,e=To,r="",n=new Date){const o=$e(Math.max(0,Number(t)||0));let s=0;const i=Po(e,r,n),a=i.status==="valid";if(a){const D=Math.max(0,Number(e.promoValue)||0);s=e.promoType==="percent"?Math.min(o,o*D/100):Math.min(o,D)}s=$e(s);const c=!!e.pickupOnly,d=Math.max(0,Number(e.deliveryFee)||0),l=Math.max(0,Number(e.freeDeliveryOver)||0);let g=0,E=!1;c||(l===0||o>=l?E=!0:g=d);const S=Math.min(30,Math.max(0,Number(e.taxRate)||0)),I=Math.max(0,o-s),w=e.taxEnabled&&!e.taxIncluded&&S>0?$e(I*S/100):0,k=$e(Math.max(0,o-s+g+w)),P=Math.max(0,Number(e.minimumOrder)||0),C=P===0||o>=P;return{subtotal:o,discount:s,promoCodeName:a?i.code:"",promoValid:a,promoExpired:i.status==="expired",delivery:g,isPickupOnly:c,isFreeDelivery:E,deliveryFeeConfig:d,freeDeliveryOverConfig:l,tax:w,taxRate:S,taxLabel:String(e.taxLabel||"VAT").trim(),taxEnabled:!!e.taxEnabled,taxIncluded:!!e.taxIncluded,total:k,minOrder:P,minOrderMet:C,minOrderRemaining:C?0:$e(P-o)}}function fr(t){return t?String(t).toLowerCase().replace(/[ً-ٰٟ]/g,"").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/ه/g,"ە").trim():""}function ul(t){return String(t||"").trim().split(/\s+/).map(fr).filter(Boolean)}function dl(t,e){var n,o,s,i;if(!e.length)return!0;const r=fr([(n=t.name)==null?void 0:n.en,(o=t.desc)==null?void 0:o.en,(s=t.name)==null?void 0:s.ku,(i=t.desc)==null?void 0:i.ku,t.category,t.tag].filter(Boolean).join(" "));return e.every(a=>r.includes(a))}function Nt(t,e){const r=String(t??""),n=String(e||"").trim().split(/\s+/).filter(Boolean);if(!r||!n.length)return u(r);const o=n.map(c=>c.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).sort((c,d)=>d.length-c.length).join("|");let s;try{s=new RegExp(`(${o})`,"giu")}catch{return u(r)}let i="",a=0;for(const c of r.matchAll(s))c[0]&&(i+=u(r.slice(a,c.index)),i+=`<mark class="search-highlight">${u(c[0])}</mark>`,a=c.index+c[0].length);return i+u(r.slice(a))}const hl=["all","cakes","cupcakes","desserts"],ml=["popular","newest","price-asc","price-desc","name-asc"],pl=["any","under-20","20-40","40-60","over-60"],fl=Object.freeze({q:"",cat:"all",sort:"popular",range:"any"});function gl(t){const e={...fl},r=String(t||"");if(!r.startsWith("#menu"))return e;const n=r.indexOf("?");if(n===-1)return e;const o=new URLSearchParams(r.slice(n+1));return e.q=(o.get("q")||"").slice(0,100),hl.includes(o.get("cat"))&&(e.cat=o.get("cat")),ml.includes(o.get("sort"))&&(e.sort=o.get("sort")),pl.includes(o.get("range"))&&(e.range=o.get("range")),e}function yl({q:t="",cat:e="all",sort:r="popular",range:n="any"}={}){const o=new URLSearchParams;t&&t.trim()&&o.set("q",t.trim()),e&&e!=="all"&&o.set("cat",e),r&&r!=="popular"&&o.set("sort",r),n&&n!=="any"&&o.set("range",n);const s=o.toString();return s?`#menu?${s}`:"#menu"}function vl(t,e){switch(e){case"under-20":return t<20;case"20-40":return t>=20&&t<=40;case"40-60":return t>=40&&t<=60;case"over-60":return t>60;default:return!0}}const Zt="ys_cart_v1",bl=99,gt=t=>Math.min(bl,Math.max(1,Math.floor(Number(t)||0)));function Co(t,e){return t+"|"+[...e].sort().join(",")}function rt(t,e){if(!Array.isArray(t))return[];const r=new Map((e||[]).map(o=>[o.id,o])),n=new Map;for(const o of t){if(!o||typeof o!="object")continue;const s=r.get(o.productId);if(!s)continue;const i=Math.floor(Number(o.qty));if(!Number.isFinite(i)||i<1)continue;const a=new Set((s.exclusions||[]).map(g=>g.id)),c=Array.isArray(o.exclude)?[...new Set(o.exclude.filter(g=>typeof g=="string"&&a.has(g)))]:[],d=Co(s.id,c),l=n.get(d);l?l.qty=gt(l.qty+i):n.set(d,{id:d,productId:s.id,qty:gt(i),exclude:c})}return[...n.values()]}function wl(t,e){try{const r=JSON.parse(t.getItem(Zt)||"[]");return rt(r,e)}catch{return[]}}function El(t,e){try{const r=e.map(({productId:n,qty:o,exclude:s})=>({productId:n,qty:o,exclude:s}));return r.length?t.setItem(Zt,JSON.stringify(r)):t.removeItem(Zt),!0}catch{return!1}}function gn(t,e,r=[]){const n=Co(e,r);return t.find(s=>s.id===n)?t.map(s=>s.id===n?{...s,qty:gt(s.qty+1)}:s):[...t,{id:n,productId:e,qty:1,exclude:[...r]}]}function Sl(t,e,r){const n=Math.floor(Number(r));return!Number.isFinite(n)||n<1?xo(t,e):t.map(o=>o.id===e?{...o,qty:gt(n)}:o)}function _l(t,e,r){const n=t.find(o=>o.id===e);return n?Sl(t,e,n.qty+r):t}function xo(t,e){return t.filter(r=>r.id!==e)}function Lt(t,e,r="en"){const n=new Map((e||[]).map(i=>[i.id,i])),o=i=>r==="ku"&&(i==null?void 0:i.ku)||(i==null?void 0:i.en)||"",s=[];for(const i of t){const a=n.get(i.productId);if(!a)continue;const c=Math.max(0,Number(a.priceUSD)||0),d=(i.exclude||[]).map(l=>{const g=(a.exclusions||[]).find(E=>E.id===l);return g?o(g):l});s.push({id:i.id,productId:a.id,name:o(a.name),qty:i.qty,exclude:[...i.exclude||[]],excludeLabels:d,unitPriceUSD:c,lineTotalUSD:Math.round(c*i.qty*100)/100})}return s}function er(t){return Math.round(t.reduce((e,r)=>e+r.lineTotalUSD,0)*100)/100}function Il(t){return t.reduce((e,r)=>e+r.qty,0)}const gr=24,Ze=t=>String(t).padStart(2,"0");function et(t){const e=Number(t==null?void 0:t.leadTimeHours);return Number.isFinite(e)&&e>=0&&e<=720?e:gr}function Ro(t=new Date,e=gr){const r=new Date(t.getTime()+e*3600*1e3);r.setSeconds(0,0);const n=r.getMinutes()%15;return n&&r.setMinutes(r.getMinutes()+(15-n)),r}function kl(t){return`${t.getFullYear()}-${Ze(t.getMonth()+1)}-${Ze(t.getDate())}T${Ze(t.getHours())}:${Ze(t.getMinutes())}`}function Al(t){const e=/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})$/.exec(String(t||"").trim());if(!e)return null;const[,r,n,o,s,i]=e.map(Number),a=new Date(r,n-1,o,s,i,0,0);return a.getFullYear()!==r||a.getMonth()!==n-1||a.getDate()!==o||a.getHours()!==s?null:a}function Tl(t,e=new Date,r=gr){if(!t)return{ok:!1,error:"missing"};const n=Al(t);if(!n)return{ok:!1,error:"invalid"};const o=Ro(e,r);if(n.getTime()<o.getTime()-900*1e3)return{ok:!1,error:"too-soon",earliest:o};const s=new Date(e.getTime()+365*24*3600*1e3);return n>s?{ok:!1,error:"too-far"}:{ok:!0,date:n}}function Ne(t,e="en"){const r=e==="ku"?["ckb-IQ","ckb","ar-IQ"]:["en-GB"],n={weekday:"long",day:"numeric",month:"long",year:"numeric",hour:"2-digit",minute:"2-digit"};for(const o of r)try{return new Intl.DateTimeFormat(o,n).format(t)}catch{}return t.toISOString()}const ve=(t,e)=>String(t??"").trim().slice(0,e);function Pl({customerId:t,customer:e={},lines:r,eco:n,promoCode:o="",currency:s="USD",fulfillmentAt:i,note:a="",lang:c="en",ref:d="",now:l=new Date}){const g=er(r),E=Do(g,n,o,l);return{customerId:t,customer:{name:ve(e.name,80),phone:ve(e.phone,32),address:ve(e.address,300)},items:r.map(S=>({productId:S.productId,name:ve(S.name,120),qty:S.qty,unitPriceUSD:S.unitPriceUSD,exclude:S.exclude||[]})),totals:{subtotal:E.subtotal,discount:E.discount,delivery:E.delivery,tax:E.tax,total:E.total},currency:s==="USD"?"USD":String((n==null?void 0:n.secondaryCurrency)||"USD"),exchangeRate:Number(n==null?void 0:n.exchangeRate)||null,promoCode:E.promoValid?E.promoCodeName:"",fulfillmentAt:i,note:ve(a,500),lang:c==="ku"?"ku":"en",status:"pending",source:"whatsapp",ref:ve(d,20)}}function Dl(t){const e=[];t.customerId||e.push("customer"),(!Array.isArray(t.items)||t.items.length===0||t.items.length>50)&&e.push("items");for(const o of t.items||[])(!Number.isInteger(o.qty)||o.qty<1||o.qty>99)&&e.push("qty"),o.unitPriceUSD>=0||e.push("price");const r=t.totals||{},n=(r.subtotal||0)-(r.discount||0)+(r.delivery||0)+(r.tax||0);return(!(r.total>=0)||Math.abs(r.total-n)>=.01||r.discount>r.subtotal)&&e.push("totals"),(!(t.fulfillmentAt instanceof Date)||isNaN(t.fulfillmentAt))&&e.push("date"),[...new Set(e)]}function Cl(t){const e=/^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(String(t||"").trim());if(!e)return null;let r=e[1];return r.length===3&&(r=r.split("").map(n=>n+n).join("")),[0,2,4].map(n=>parseInt(r.slice(n,n+2),16))}function yn(t){const e=Cl(t);if(!e)return null;const[r,n,o]=e.map(s=>{const i=s/255;return i<=.03928?i/12.92:Math.pow((i+.055)/1.055,2.4)});return .2126*r+.7152*n+.0722*o}function vn(t,e){const r=yn(t),n=yn(e);if(r===null||n===null)return null;const[o,s]=r>n?[r,n]:[n,r];return(o+.05)/(s+.05)}const Ot="#FFFFFF",bn="#1C120D";function wn(t){const e=vn(Ot,t),r=vn(bn,t);return e===null||r===null||e>=r?Ot:bn}const xl=["Cormorant Garamond","DM Sans","Vazirmatn"],Rl={"Cormorant Garamond":"ital,wght@0,400;0,500;0,600;0,700;1,400;1,500","Playfair Display":"ital,wght@0,500;0,600;0,700;1,500",Lora:"ital,wght@0,400;0,500;0,600;0,700;1,400","DM Serif Display":"wght@400",Amiri:"wght@400;700",Almarai:"wght@400;700",Tajawal:"wght@400;500;700"};function $o(t){const e=String(t||"").trim();return/^[A-Za-z0-9 ]{2,40}$/.test(e)?`family=${e.replace(/ /g,"+")}:${Rl[e]||"wght@400;500;600;700"}`:null}function $l(t){const e=[...new Set(t)].map($o).filter(Boolean);return e.length?`https://fonts.googleapis.com/css2?${e.join("&")}&display=swap`:null}const En=new Set(xl);function Sn(t,e=typeof document<"u"?document:null){const r=[...new Set(t)].filter(o=>o&&!En.has(o)&&$o(o));if(!r.length||!e)return[];const n=e.createElement("link");return n.rel="stylesheet",n.href=$l(r),n.dataset.fonts=r.join(","),e.head.appendChild(n),r.forEach(o=>En.add(o)),r}function Nl(t){return/^https:\/\/images\.unsplash\.com\//.test(String(t||""))}function Ll(t,e){const r=new URL(t);return r.searchParams.set("w",String(e)),r.searchParams.set("auto","format"),r.searchParams.set("fit","crop"),r.searchParams.has("q")||r.searchParams.set("q","75"),r.toString()}function Bt(t,e=[400,600,800,1200]){return Nl(t)?e.map(r=>`${Ll(t,r)} ${r}w`).join(", "):""}let L=null,Mt=null;function Le(){return Mt||(Mt=An(()=>import("./datastore-B1pjEWYN.js"),[],import.meta.url).then(t=>L=t)),Mt}const No=1310,B={CONFIG:"sc_config_v2",PRODUCTS:"sc_products_v2",PREF:"sc_pref_v2",MY_ORDERS:"ys_my_orders_v1",GUEST:"ys_guest_v1",PRODUCTS_REMOTE:"ys_products_remote_v1"},Ol=["sc_users_v2","sc_session_v2","yummy_session","yummy_users","sc_orders_v2","sc_customer_notes_v2"],_n=[{value:"Vazirmatn",label:"Vazirmatn (modern, clean)"},{value:"Cairo",label:"Cairo (friendly, round)"},{value:"IBM Plex Sans Arabic",label:"IBM Plex Sans Arabic (corporate)"},{value:"Noto Naskh Arabic",label:"Noto Naskh Arabic (calligraphic)"},{value:"Noto Kufi Arabic",label:"Noto Kufi Arabic (geometric)"},{value:"Noto Sans Arabic",label:"Noto Sans Arabic (neutral)"},{value:"Amiri",label:"Amiri (calligraphic, premium)"},{value:"Tajawal",label:"Tajawal (modern, legible)"},{value:"Almarai",label:"Almarai (clean, contemporary)"},{value:"Rubik",label:"Rubik (multilingual, rounded)"}],In=[{value:"DM Sans",label:"DM Sans (geometric, clean modern)"},{value:"Cormorant Garamond",label:"Cormorant Garamond (artisanal luxury serif)"},{value:"Playfair Display",label:"Playfair Display (editorial serif)"},{value:"DM Serif Display",label:"DM Serif Display (warm display serif)"},{value:"Lora",label:"Lora (classic contemporary)"},{value:"Inter",label:"Inter (clean neutral)"},{value:"Outfit",label:"Outfit (boutique sans)"}],Se={...To},z={berry:{label:{en:"Berry",ku:"بێری"},tokens:{cream:"#FFFBF7",shell:"#FDF3EC",blush:"#F6DFD8",linen:"#FAF1EA",berry:"#8E3B4A",berryDark:"#6E2C39",berryDeep:"#4E1E28",cocoa:"#3B2A26",cocoaSoft:"#5A423C",gold:"#C9A227",goldSoft:"#E8C766",ink:"#2E2422",muted:"#7C6A66",line:"#EFE1D9",lineStrong:"#E4D0C5"}},chocolate:{label:{en:"Chocolate",ku:"چاکۆلێت"},tokens:{cream:"#FFF9F2",shell:"#FBF0E2",blush:"#F2DFC7",linen:"#FDF5EA",berry:"#C89B6A",berryDark:"#A87A48",berryDeep:"#7A5230",cocoa:"#2A1710",cocoaSoft:"#4A2F22",gold:"#D4A24A",goldSoft:"#F0D196",ink:"#241410",muted:"#7A5C4A",line:"#EEDCC4",lineStrong:"#DEC5A4"}},sage:{label:{en:"Sage",ku:"سەیج"},tokens:{cream:"#FAF7F0",shell:"#F2EBDF",blush:"#E3E9DC",linen:"#F6F2E9",berry:"#8FA88A",berryDark:"#6E8A69",berryDeep:"#4E6649",cocoa:"#3E4F3A",cocoaSoft:"#5C6E58",gold:"#B5614D",goldSoft:"#D68A70",ink:"#2A3327",muted:"#6E7868",line:"#E2DCCC",lineStrong:"#CFC7B2"}},rose:{label:{en:"Rose",ku:"گۆڵ"},tokens:{cream:"#FFFBF8",shell:"#FBEFF0",blush:"#F5DCE0",linen:"#FDF3F4",berry:"#C97B84",berryDark:"#A85C67",berryDeep:"#7E3F4A",cocoa:"#5E2A3A",cocoaSoft:"#7C4756",gold:"#D4AF6A",goldSoft:"#EBCB91",ink:"#3A1F27",muted:"#8A6470",line:"#EFDCDE",lineStrong:"#DFC3C6"}},midnight:{label:{en:"Midnight Noir",ku:"نیوەشەو"},isDark:!0,tokens:{cream:"#15110E",shell:"#1E1814",blush:"#342820",linen:"#221B16",surface:"#241D18",surfaceHover:"#2D241E",surfaceInput:"#1B1512",berry:"#E07A5F",berryDark:"#C66247",berryDeep:"#F4A58E",cocoa:"#F7EFE8",cocoaSoft:"#D6C6B8",gold:"#E5B85C",goldSoft:"#F3D48E",ink:"#EDE3DA",muted:"#A89687",line:"#3A2E26",lineStrong:"#4F3F34"}}},tt={shopName:{en:"Yummy Sweets",ku:"یامی سویتس"},theme:{presetId:"berry",tokens:z.berry.tokens,mode:"light",autoDark:!1},tagline:{en:"Artisanal Boutique Bakery",ku:"شیرینەمەنی دەستکردی نایاب"},englishBodyFont:"DM Sans",englishDisplayFont:"Cormorant Garamond",kurdishBodyFont:"Vazirmatn",kurdishDisplayFont:"Vazirmatn",logoMode:"emoji",logoEmoji:"🎂",logoImage:"",logoUrl:"",logoImageUrl:"",announcement:{en:"Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over {freeDelivery}.",ku:"پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو {freeDelivery}."},aboutUs:{en:"Yummy Sweets began as a dream in our home kitchen: to restore pure artisan craftsmanship to celebration cakes. We believe true indulgence comes from authentic, unadulterated ingredients. Every sponge is whipped by hand, every fruit compote simmered from scratch, and every ganache blended from fine single-origin cocoa.",ku:"یامی سویتس وەک خەونێک لە چێشتخانەی ماڵەکەمانەوە دەستی پێکرد: گەڕاندنەوەی هونەری ڕەسەنی دەستکرد بۆ کێکەکانی ئاهەنگگێڕان. ئێمە باوەڕمان وایە کە چێژی ڕاستەقینە لە پێکهاتەی سروشتی و بێ ساختە دەست دەکەوێت. هەموو کێکێک بە دەست ئامادە دەکرێت و بە باشترین کەرەستە دەڕازێنرێتەوە."},reviews:[{initials:"SK",name:{en:"Sara & Kareem",ku:"سارا و کەریم"},role:{en:"Verified Customer",ku:"کڕیاری دڵنیاکراو"},quote:{en:'"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."',ku:'"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."'}},{initials:"DA",name:{en:"Danyar Azad",ku:"دانیار ئازاد"},role:{en:"Office Celebrations",ku:"ئاهەنگی فەرمانگە"},quote:{en:'"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."',ku:'"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."'}},{initials:"LR",name:{en:"Lina Rostam",ku:"لینا ڕۆستەم"},role:{en:"Weekend Regular",ku:"کڕیاری هەمیشەیی"},quote:{en:'"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."',ku:'"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."'}}],faq:[{q:{en:"How far in advance should I place my cake order?",ku:"چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟"},a:{en:"For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice.",ku:"بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە."}},{q:{en:"How does the WhatsApp checkout process work?",ku:"شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟"},a:{en:"When you tap 'Send Order via WhatsApp', your selected items are automatically drafted into a clean message. You can add your delivery address before sending.",ku:'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!'}},{q:{en:"Do you offer gluten-free or eggless options?",ku:"ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟"},a:{en:"Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify in your notes.",ku:"بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە."}}],contact:{whatsapp:"",phone:"",email:"hello@yummysweets.com",address:{en:"Dream City Avenue, Near English Village, Erbil, Kurdistan",ku:"شەقامی دریم سیتی، نزیک گوندی ئینگلیزی، هەولێر، کوردستان"},hours:{en:`Mon – Sun: 9:00 AM – 10:00 PM
Fresh bakes ready by 10 AM daily`,ku:`دووشەممە – یەکشەممە: ٩:٠٠ بەیانی – ١٠:٠٠ شەو
شیرینی تازە کاتژمێر ١٠ی بەیانی ئامادەیە`}},socials:{instagram:"https://instagram.com",facebook:"https://facebook.com",tiktok:"https://tiktok.com",snapchat:"https://snapchat.com"},iqdRate:No,economy:{...Se},showWatermark:!0};function Bl(t){return new Promise((e,r)=>{if(!t)return r(new Error("NO_FILE"));if(!t.type||!t.type.startsWith("image/"))return r(new Error("INVALID_TYPE"));const n=5*1024*1024;if(t.size>n)return r(new Error("FILE_TOO_LARGE"));const o=new FileReader;o.onerror=()=>r(new Error("READ_ERROR")),o.onload=s=>{const i=new Image;i.onerror=()=>r(new Error("DECODE_ERROR")),i.onload=()=>{try{let c=i.naturalWidth||i.width,d=i.naturalHeight||i.height;if(c>800){const w=800/c;c=800,d=Math.round(d*w)}const l=document.createElement("canvas");l.width=c,l.height=d;const g=l.getContext("2d");if(!g)return r(new Error("CANVAS_ERROR"));g.drawImage(i,0,0,c,d);let E="";try{E=l.toDataURL("image/jpeg",.8)}catch{E=l.toDataURL("image/png")}const S=E.length-(E.indexOf(",")+1);let I=Math.round(S*.75);if(I>250*1024)try{const w=l.toDataURL("image/jpeg",.65),k=w.length-(w.indexOf(",")+1),P=Math.round(k*.75);E=w,I=P}catch{}if(I>640*1024)return r(new Error("OUTPUT_TOO_LARGE"));e(E)}catch(a){r(a)}},i.src=s.target.result},o.readAsDataURL(t)})}function Ml(t){return new Promise((e,r)=>{if(!t)return r(new Error("NO_FILE"));const n=5*1024*1024;if(t.size>n)return r(new Error("FILE_TOO_LARGE"));if(t.type==="image/svg+xml"||t.name&&t.name.toLowerCase().endsWith(".svg")){if(t.size>100*1024)return r(new Error("OUTPUT_TOO_LARGE"));const s=new FileReader;s.onerror=()=>r(new Error("READ_ERROR")),s.onload=i=>{try{let a=String(i.target.result||"");const c=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,d=/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi,l=/javascript\s*:[^"'>]+/gi;if(a=a.replace(c,""),a=a.replace(d,""),a=a.replace(l,""),!a.includes("<svg")||!a.includes("</svg>"))return r(new Error("INVALID_TYPE"));const g="data:image/svg+xml;utf8,"+encodeURIComponent(a),E=g.length-(g.indexOf(",")+1),S=Math.round(E*.75);e({dataUrl:g,approxBytes:S,isSvg:!0})}catch{r(new Error("SANITIZATION_FAILED"))}},s.readAsText(t);return}if(!t.type||!t.type.startsWith("image/"))return r(new Error("INVALID_TYPE"));const o=new FileReader;o.onerror=()=>r(new Error("READ_ERROR")),o.onload=s=>{const i=new Image;i.onerror=()=>r(new Error("DECODE_ERROR")),i.onload=()=>{try{const a=i.naturalWidth||i.width,c=i.naturalHeight||i.height;if(!a||!c)return r(new Error("INVALID_DIMENSIONS"));const d=256,l=a<c?d/a:d/c,g=Math.round(a*l),E=Math.round(c*l),S=Math.round((g-d)/2),I=Math.round((E-d)/2),w=document.createElement("canvas");w.width=d,w.height=d;const k=w.getContext("2d");if(!k)return r(new Error("CANVAS_ERROR"));k.drawImage(i,-S,-I,g,E);const P=t.type==="image/png"||t.type==="image/webp";let C="";P?C=w.toDataURL("image/png"):C=w.toDataURL("image/jpeg",.85);let D=C.length-(C.indexOf(",")+1),R=Math.round(D*.75);if(R>150*1024&&(C=w.toDataURL("image/jpeg",.8),D=C.length-(C.indexOf(",")+1),R=Math.round(D*.75),R>150*1024))return r(new Error("OUTPUT_TOO_LARGE"));e({dataUrl:C,approxBytes:R,isSvg:!1})}catch(a){r(a)}},i.src=s.target.result},o.readAsDataURL(t)})}const kn=[{id:"p1",category:"cakes",emoji:"🎂",img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=80",priceUSD:38,tag:"bestseller",name:{en:"Pistachio Rose Layer Cake",ku:"کێکی چین چینی فستق و گوڵاو"},desc:{en:"Delicate roasted pistachio sponge layered with fragrant Persian rosewater mascarpone and white chocolate.",ku:"کێکی ناسکی فستقی برژاو بە کرێمی گوڵاوی ئێرانی و شوکۆڵاتەی سپی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p2",category:"cakes",emoji:"🍫",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",priceUSD:42,tag:"bestseller",name:{en:"Belgian Dark Truffle Cake",ku:"کێکی تڕەفڵی شوکۆڵاتەی بەلجیکی"},desc:{en:"Decadent 70% Callebaut dark chocolate layers drenched in whipped espresso ganache.",ku:"چەندین چینی شوکۆڵاتەی تۆخی بەلجیکی لەگەڵ گاناشی قاوەی ئێسپرێسۆ."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p3",category:"cakes",emoji:"🍓",img:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",priceUSD:40,tag:"new",name:{en:"Berry Chantilly Chiffon",ku:"کێکی شیفۆنی تووتڕکی شانتیلی"},desc:{en:"Feather-light vanilla chiffon crowned with fresh wild strawberries, blackberries, and sweet cream.",ku:"کێکی زۆر سووکی ڤانێلا بە کرێمی تازە و تووی کێوی و فرەولەی سروشتی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p4",category:"cakes",emoji:"🥜",img:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80",priceUSD:36,tag:"none",name:{en:"Salted Caramel Pecan Cake",ku:"کێکی کارامێلی سوێر و گوێزی پێکەن"},desc:{en:"Brown butter sponge paired with toasted Georgia pecans and fleur de sel caramel drizzle.",ku:"کێکی کەرەی قاوەیی لەگەڵ گوێزی برژاو و سۆسی کارامێلی سوێری فەڕەنسی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p5",category:"cakes",emoji:"🍰",img:"https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80",priceUSD:35,tag:"none",name:{en:"Signature Red Velvet",ku:"ڕێد ڤێلڤێتی تایبەت"},desc:{en:"Classic crimson buttermilk sponge layered with rich Madagascar vanilla cream cheese.",ku:"کێکی سووری نەریتی لەگەڵ کرێم چیسی دەوڵەمەندی ڤانێلای ماداگاسکەر."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p6",category:"cakes",emoji:"🍋",img:"https://images.unsplash.com/photo-1534432182912-63863115e106?w=800&auto=format&fit=crop&q=80",priceUSD:34,tag:"none",name:{en:"Lemon Lavender Dream",ku:"کێکی لیمۆ و لاڤەندەر"},desc:{en:"Zesty Meyer lemon curd layered with organic Provence lavender-infused buttercream.",ku:"تامی ترش و شیری لیمۆی سروشتی بە کرێمی لاڤاندەری فەڕەنسی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p7",category:"cakes",emoji:"🌰",img:"https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&auto=format&fit=crop&q=80",priceUSD:45,tag:"new",name:{en:"Hazelnut Praline Royal",ku:"کێکی ڕۆیاڵی بوندوق و پڕالین"},desc:{en:"Roasted Piedmont hazelnut dacquoise with crispy wafer crunch and silky Gianduja mousse.",ku:"کێکی داگوایزی بوندوق لەگەڵ ویفەری کڕەنچی و مووسی شوکۆڵاتە."},unit:{en:'8" Cake (12 slices)',ku:"کێکی ٨ ئینچ (١٢ پارچە)"}},{id:"p8",category:"cupcakes",emoji:"🧁",img:"https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80",priceUSD:18,tag:"bestseller",name:{en:"Tahitian Vanilla Cupcakes",ku:"کەپکێکی ڤانێلای تاهیتی"},desc:{en:"Moist golden sponge crowned with swirls of aromatic Tahitian vanilla bean buttercream.",ku:"کەپکێکی نەرم و بەتام بە کرێمی تایبەتی دەنکۆڵەی ڤانێلا."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p9",category:"cupcakes",emoji:"🍮",img:"https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&auto=format&fit=crop&q=80",priceUSD:20,tag:"new",name:{en:"Salted Dulce de Leche Cupcakes",ku:"کەپکێکی کارامێلی دۆلسێ دێ لێچێ"},desc:{en:"Cinnamon spiced cake with a molten caramelized milk center and toffee crunch.",ku:"کێکی دارچینی بە ناوەرۆکی کارامێلی گەرم و تۆفی کڕەنچی."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p10",category:"cupcakes",emoji:"🫐",img:"https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80",priceUSD:19,tag:"none",name:{en:"Wild Blueberry Zest Cupcakes",ku:"کەپکێکی بلوبێری و توێکڵی لیمۆ"},desc:{en:"Bursting with fresh blueberries and topped with a bright lemon meringue swirl.",ku:"پڕ لە بلوبێری تازە لەگەڵ سۆسی سەرنجڕاکێشی لیمۆ و مێرێنگ."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p11",category:"cupcakes",emoji:"🍫",img:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&auto=format&fit=crop&q=80",priceUSD:20,tag:"none",name:{en:"Triple Chocolate Fudge Cupcakes",ku:"کەپکێکی سێ قاتی شوکۆڵاتە"},desc:{en:"Dark chocolate cake filled with molten ganache and sprinkled with cocoa nibs.",ku:"کێکی شوکۆڵاتەی تۆخ بە ناوەرۆکی گاناش و کەرەستەی کاکاو."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p12",category:"desserts",emoji:"🥮",img:"https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=80",priceUSD:24,tag:"bestseller",name:{en:"Parisian Macaron Collection",ku:"کۆمەڵەی ماکارۆنی پاریسی"},desc:{en:"Delicate almond shells: Pistachio, Dark Chocolate, Rose Raspberry, and Salted Caramel.",ku:"ماکارۆنی ڕەسەنی فەڕەنسی: فستق، شوکۆڵاتە، گوڵ، و کارامێل."},unit:{en:"Box of 12",ku:"پاکەتی ١٢ دانەیی"}},{id:"p13",category:"desserts",emoji:"🧀",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80",priceUSD:28,tag:"new",name:{en:"Basque Burnt Cheesecake",ku:"چیزکێکی باسکە سووتاوی ئیسپانی"},desc:{en:"Caramelized crust with an ultra-creamy, molten center baked at high heat.",ku:"تەختی کارامێلی سووتاو لەگەڵ ناوەرۆکی زۆر نەرم و پەنیری لەسەر شێوازی ئیسپانی."},unit:{en:'7" Whole Cake',ku:"کێکی تەواوی ٧ ئینچ"}},{id:"p14",category:"desserts",emoji:"🥧",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",priceUSD:22,tag:"none",name:{en:"Salted Caramel Chocolate Tart",ku:"تارتی شوکۆڵاتە و کارامێلی سوێر"},desc:{en:"Crisp cocoa sablé pastry shell filled with gooey caramel and glossy chocolate glaze.",ku:"تارتی برژاوی کاکاو پڕ لە کارامێلی سوێر و گاناشی گەشاوی شوکۆڵاتە."},unit:{en:'8" Tart (8 slices)',ku:"تارتی ٨ ئینچ (٨ پارچە)"}}],Ft={en:{btnCancel:"Cancel",btnSubmit:"Submit",btnSaveConfig:"Save Settings",economyTitle:"Pricing & Economy",economyDesc:"Manage currency conversion, delivery fees, and minimum order rules.",shopTagline:"Artisanal Boutique Bakery",announcementText:"Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over {freeDelivery}.",navMenu:"Menu",navHowItWorks:"How It Works",navOurStory:"Our Story",navReviews:"Reviews",navContact:"Contact",navFaq:"FAQ",heroEyebrow:"Artisanal Bakery & Pâtisserie",heroTitle:"Handcrafted cakes made with <em>passion</em> & love",heroLead:"We craft bespoke celebratory cakes, delicate pastries, and decadent cupcakes daily using premium organic ingredients. Delivered straight to your celebration with seamless WhatsApp ordering.",heroCtaPrimary:"Explore Our Menu",heroCtaSecondary:"Chat with Baker",trust1:"100% Organic Flours",trust2:"Same-Day Fresh Bake",trust3:"Custom Messages",badgeFresh:"Fresh today from 6 AM",heroReviewSnippet:'"Best Red Velvet in town! Unmatched flavor."',feat1Title:"Real Ingredients",feat1Desc:"Pure butter, Belgian chocolate, fresh seasonal berries, and zero artificial preservatives.",feat2Title:"Careful Delivery",feat2Desc:"Handled with gentle temperature-controlled care so your cake arrives picture-perfect.",feat3Title:"Custom Creations",feat3Desc:"Bespoke tiers, customized chocolate writing, and tailored sweetness for every milestone.",menuEyebrow:"Our Daily Selection",menuTitle:"Baked Fresh For You",menuLead:"Browse our signature cakes, cupcakes, and desserts. Click 'Add to Order' to assemble your WhatsApp cart.",catAll:"All Sweets",catCakes:"Layer Cakes",catCupcakes:"Cupcakes",catDesserts:"Desserts",tagBestseller:"Bestseller",tagNew:"New",btnAdd:"Add to Order",stepsEyebrow:"Simple & Delightful",stepsTitle:"How Ordering Works",stepsLead:"Three effortless steps from our kitchen to your celebration table.",step1Title:"Choose Your Favorites",step1Desc:"Browse our menu and pick the cakes, cupcakes, or desserts you'd love to share with loved ones.",step2Title:"Send Via WhatsApp",step2Desc:"Click Send Order to open an instant pre-formatted WhatsApp message directly to our head baker.",step3Title:"Confirm & Celebrate",step3Desc:"We confirm your delivery slot or pickup time, bake fresh that morning, and deliver to your door.",storyEyebrow:"Our Heritage",storyTitle:"Crafted with patience, baked with devotion",bullet1:"Slow-fermented buttermilk and organic flours",bullet2:"Zero synthetic flavorings or artificial frostings",bullet3:"Dedicated pastry artisans with European techniques",reviewsEyebrow:"Testimonials",reviewsTitle:"Sweet Words from Customers",reviewsLead:"Real feedback from memorable birthdays, weddings, and weekend family teas.",btnLeaveReview:"Leave a Review",leaveReviewTitle:"Leave a Review",leaveReviewDesc:"We'd love to hear about your experience!",reviewFormName:"Your Name",reviewFormQuote:"Your Review",review1Quote:'"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."',review1Role:"Verified Customer",review2Quote:'"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."',review2Role:"Office Celebrations",review3Quote:'"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."',review3Role:"Weekend Regular",faqEyebrow:"Common Inquiries",faqTitle:"Frequently Asked Questions",faqLead:"Everything you need to know about our ordering process, dietary needs, and delivery times.",faq1Q:"How far in advance should I place my cake order?",faq1A:"For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice so our chefs can prepare custom decorations and specialty fillings.",faq2Q:"How does the WhatsApp checkout process work?",faq2A:"When you tap 'Send Order via WhatsApp', your selected items, quantities, and totals are automatically drafted into a clean WhatsApp message. You can add your delivery address and date before sending it directly to our team!",faq3Q:"Do you offer gluten-free or eggless options?",faq3A:"Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify dietary preferences in your WhatsApp message notes.",faq4Q:"Can I customize the cake writing or message?",faq4A:"Every full-sized cake includes complimentary chocolate piped lettering on an artisan sugar plaque. Simply include your desired message in the order notes or chat.",faq5Q:"What payment methods do you accept?",faq5A:"We accept cash upon delivery, FastPay, FIB (First Iraqi Bank), and ZainCash transfers. Payment details are finalized during WhatsApp confirmation.",ctaTitle:"Ready to make your occasion sweeter?",ctaLead:"Have a custom design or special theme in mind? Our master bakers are ready to bring your vision to life.",ctaBtnWhatsApp:"Chat on WhatsApp",ctaBtnMenu:"View All Cakes",cardAddressTitle:"Bakery Kitchen",cardHoursTitle:"Opening Hours",cardContactTitle:"Direct Contact",footerBlurb:"A boutique bakery dedicated to handcrafted artisanal celebration cakes, gourmet cupcakes, and fine French pastries.",footerShopLinks:"Shop",footerHelpLinks:"Help & Info",footerHoursTitle:"Baking Hours",footerBestsellers:"Bestsellers",copyrightAllRights:"All rights reserved.",footerTagline:"Baked fresh daily with wholesome ingredients & pure love.",btnSignIn:"Sign In",btnPanel:"Control Panel",btnLogout:"Log Out",trayItemLabel:"items",trayItemLabelSingular:"item",trayClear:"Clear Order",traySendWhatsApp:"Send Order via WhatsApp",tabCustomer:"Customer",customerTitle:"Quick Customer Sign In",customerDesc:"Sign in with your phone and name. No password needed! Your name will pre-fill your WhatsApp orders.",labelPhone:"Mobile Number (min 6 digits)",labelDisplayName:"Your Name / Display Name",btnContinue:"Continue as Customer",labelUsername:"Username or Email",labelPassword:"Password",tabAdmin:"Admin",tabDev:"Developer",staffFormDesc:"Please enter your management credentials to access the bakery control panel.",historyZero:"You've placed 0 orders.",trayEmptyPreview:"No items selected",storyImgTitle:"Sweet Artisan Heritage",storyImgDesc:"Fresh from our oven to your family celebration",review1Name:"Sara & Kareem",review2Name:"Danyar Azad",review3Name:"Lina Rostam",footerOrdersInfo:"Orders & inquiries:",invalidPromo:"Invalid promo code",promoRemoved:"Promo code removed",itemsNotAvailable:"These items are currently not available on the menu.",signedInAs:"Signed in as {name}",loggedInAs:"Logged in as {role}",loggedOut:"Logged out successfully.",orderStatusUpdated:"Order status updated to {status}",noteSaved:"Note saved",invalidUrl:"Invalid URL scheme. Only http:// and https:// links are supported.",staffAdded:"Staff user added successfully",usersTitle:"User & Staff Management",usersAddStaff:"Add Staff Account",usersSearch:"Search users…",usersHint:"Admins manage staff accounts and passwords. Developer and admin accounts are protected.",usersColRole:"Role",usersColName:"Name",usersColLogin:"Username / Phone",usersColPassword:"Password",usersColPerms:"Permissions",usersColActions:"Actions",usersNoPassword:"Customer — no login",usersYou:"(You)",usersEmpty:"No users match your search.",usersNoAccess:"You do not have access to user management.",usersEdit:"Edit",usersResetPw:"Reset password",usersDelete:"Delete",role_admin:"ADMIN",role_dev:"DEV",role_staff:"STAFF",role_customer:"CUSTOMER",perm_products:"Products",perm_customers:"Customers",perm_economy:"Economy",perm_brand:"Brand & Logo",perm_theme:"Theme",perm_fonts:"Fonts",perm_about:"About Us",perm_contact:"Contact",perm_socials:"Social Media",editUserTitle:"Edit User",usersNewPwPrompt:"New password for {name}:",staffPwTooShort:"Password must be at least 4 characters.",usersCannotDeleteSelf:"You cannot delete your own account.",usersCannotDeleteElevated:"Only the developer can delete admin or developer accounts.",usersConfirmDelete:'Delete user "{name}"? This cannot be undone.',phonePreviewLabel:"Preview width",phonePreviewDesktop:"Desktop",phonePreviewPhone:"Phone",backupImported:"Backup imported successfully!",copiedJson:"Copied JSON to clipboard!",factoryResetDone:"Reset to factory defaults complete.",btnLogin:"Login to Dashboard",panelTitle:"Bakery Control Panel",uploadPhoto:"Upload photo",replacePhoto:"Replace photo",removePhoto:"Remove photo",photoHint:"JPG, PNG or WebP — auto-resized to 800px wide. Max 5 MB.",noPhotoHint:"No photo yet — emoji will be shown",prodPhotoError:"Failed to process image. Please try another file.",prodPhotoTooLarge:"Processed image is too large. Please select a smaller file.",prodPhotoRemoved:"Photo removed.",storageQuotaError:"Storage full — try smaller images or remove some photos.",prodDeleteConfirm:"Are you sure you want to delete this product?",btnAddNewProduct:"+ Add New Product",btnSaveProduct:"Save Product",btnDeleteProduct:"Delete Product",tabFonts:"Fonts",fieldKurdishBody:"Kurdish body font",fieldKurdishDisplay:"Kurdish heading font",fieldEnglishBody:"English body font",fieldEnglishDisplay:"English heading font",saveFonts:"Save fonts",fontPreview:"Preview",customizeTitle:"Customize",customizeLeaveOut:"Leave out",customizeSkip:"Skip — add as is",customizeAdd:"Add to order",customizeNone:"Nothing to customize",orderNoteLabel:"Note for the baker (optional)",orderNotePlaceholder:'e.g. "Happy birthday Sara" or "leave at the door"',orderNoteTooLong:"Note is too long — max 300 characters.",waNote:"Note for the baker",waExclude:"No",toastPhotoReady:"Photo processed and ready to save.",toastAdded:"Added to your order tray!",toastOrderCleared:"Order tray cleared.",toastSaved:"Saved successfully",toastDeleted:"Deleted successfully",toastInvalidPhone:"Please enter a valid mobile number with at least 6 digits.",toastInvalidLogin:"Invalid username or password.",toastInvalidJson:"Invalid JSON format. Please check your input.",tabEconomy:"Economy",economyCurrencies:"Currencies",economyExchange:"Exchange rate",economyDelivery:"Delivery",economyTax:"Tax",economyDiscounts:"Discounts",fieldPrimaryCurrency:"Primary currency (locked)",fieldSecondaryCurrency:"Secondary currency",fieldShowSecondary:"Show secondary currency in storefront",fieldCurrencySymbol:"Currency symbol",fieldExchangeRate:"1 USD = ? IQD",fieldRoundingRule:"Round converted prices to",fieldAutoRefresh:"Auto-refresh rate (not yet active)",fieldDeliveryFee:"Flat delivery fee (USD)",fieldFreeDeliveryOver:"Free delivery over (USD)",fieldMinimumOrder:"Minimum order (USD)",fieldPickupOnly:"Pickup only — hide delivery",fieldTaxEnabled:"Charge tax",fieldTaxRate:"Tax rate (%)",fieldTaxLabel:"Tax label",fieldTaxIncluded:"Prices already include tax",fieldPromoCode:"Active promo code",fieldPromoType:"Discount type",fieldPromoValue:"Discount value",fieldPromoExpiry:"Expires on",saveEconomy:"Save economy settings",roundNearest1:"Nearest 1",roundNearest250:"Nearest 250",roundNearest500:"Nearest 500",roundNearest1000:"Nearest 1000",promoPercent:"Percentage (%)",promoFixed:"Fixed amount (USD)",subtotal:"Subtotal",deliveryFee:"Delivery",tax:"Tax",discount:"Discount",total:"Total",freeDelivery:"Free",minimumOrderWarning:"Minimum order is {amount}. Add {remaining} more to checkout.",promoApplied:"Promo code {code} applied",promoExpired:"Promo code expired",economyPreview:"Live preview",economyPreviewSample:"Sample order: $50 subtotal",trayDetails:"Details ▾",trayDetailsClose:"Close ▴",trayDateLabel:"Delivery or pickup date and time *",trayPaymentNote:"Cash on delivery. We confirm the delivery fee on WhatsApp.",inOrderCount:"{n} in your order",skipToMenu:"Skip to the menu",trayApplyPromo:"Apply",trayRemovePromo:"Remove",trayPromoPlaceholder:"Promo code",deliveryFreeForEveryone:"Free delivery for everyone",freeDeliveryWarning:"Free delivery threshold is lower than minimum order — customers below minimum cannot checkout anyway.",promoActive:"Active",promoTooShort:"Needs 3+ chars",taxAddedCheckout:"Added at checkout",taxIncludedLabel:"incl.",pickupAvailable:"Pickup available",justNow:"Just now",roundedFrom:"Rounded from {raw} to {rounded} (nearest {rule})",searchPlaceholder:"Search cakes, cupcakes, desserts…",searchShortcut:"Press ⌘K to search",searchResultsCount:"Showing {shown} of {total} cakes",searchNoResults:'No cakes match "{query}".',searchEmptyDesc:"Try clearing your search query or selecting a different price range or category.",searchClearAll:"Clear all filters",searchClearSearch:"Clear search",sortLabel:"Sort",sortPopular:"Popular",sortNewest:"Newest",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortNameAsc:"Name A–Z",priceRangeLabel:"Price",priceAny:"Any price",priceUnder20:"Under $20",price20to40:"$20 – $40",price40to60:"$40 – $60",priceOver60:"Over $60",myOrders:"My Orders",myOrdersTitle:"My Orders",myOrdersSubtitle:"You've placed {count} orders since {date}.",myOrdersEmpty:"No orders yet.",myOrdersEmptyHint:"Browse the menu and place your first order — it'll appear here.",myOrdersBrowse:"Browse the menu",myOrdersReorder:"Reorder",myOrdersDetails:"View details",myOrdersTotalSpent:"Total spent",myOrdersTotalOrders:"Orders",myOrdersFavourite:"Most ordered",orderStatusPending:"Pending",orderStatusBaking:"Baking",orderStatusDelivered:"Delivered",orderStatusCancelled:"Cancelled",orderSignInToSave:"Sign in to save this order to your history.",orderAddedToTray:"{count} items added to your order",tabCustomers:"Customers",customersSearch:"Search by name or mobile…",customersSortName:"Name",customersSortLastOrder:"Last order",customersSortTotalSpent:"Total spent",customersSortOrderCount:"Order count",customersEmpty:"No customers yet.",customerOrders:"Orders",customerTotalSpent:"Total spent",customerLastOrder:"Last order",customerNoOrders:"This customer has no orders.",customerPrivateNote:"Private note (staff only)",customerChangeStatus:"Change status",logoSection:"Logo",logoModeEmoji:"Emoji",logoModeUpload:"Upload",logoModeUrl:"URL",logoPreview:"Preview",logoUploadBtn:"Upload logo",logoReplaceBtn:"Replace logo",logoRemoveBtn:"Remove logo",logoRemoveConfirm:"Remove the current logo and use an emoji instead?",logoRemoved:"Logo removed — using emoji.",logoUrlLabel:"Remote image URL",logoUrlHint:"Paste a direct link to a PNG, JPG, WebP or SVG file.",logoUrlValid:"URL valid",logoUrlInvalid:"Couldn't load this URL",logoEmojiLabel:"Emoji",logoEmojiHint:"Pick one or paste your own.",logoEmojiEmpty:"Empty — using default 🎂",logoUploadHint:"Square images work best. Auto-resized to 256×256. Max 5 MB.",logoUploadReady:"Ready to save",logoUploadError:"Couldn't read that image. Try a different file.",logoUploadTooLarge:"Image too large after resizing. Try a simpler logo.",logoFaviconNote:"Also updates the browser tab icon.",logoFallbackWarning:"Image couldn't load. Falling back to emoji.",tabTheme:"Theme",themePresetTitle:"Preset palettes",themePreviewTitle:"Live preview",themeSave:"Save theme",themeApplied:"Theme saved",themeReverted:"Reverted to last saved theme",themePreviewHeading:"A sample heading",themePreviewBody:"Body text on the base background, exactly as it will appear on the site.",themePreviewPrimary:"Primary button",themePreviewGhost:"Ghost button",themePreviewGold:"Gold accent ★★★★★",themePreviewPrice:"$38 · 49,750 د.ع",themePresetBerry:"Berry",themePresetChocolate:"Chocolate",themePresetSage:"Sage",themePresetRose:"Rose",themePresetMidnight:"Midnight",themeAutoDark:"Enable auto-dark mode (system)",btnClose:"Close",btnConfirm:"Confirm",confirmTitle:"Are you sure?",errFillFields:"Please fill in the required fields.",errInvalidUrl:"Use a full web address that starts with https://",errInvalidWhatsApp:"Enter the WhatsApp number in international format, for example 9647501234567.",loginSuccess:"You are signed in.",sessionExpired:"Your staff sign-in has expired. Please sign in again.",staffAccessGranted:"Signed in. Opening the control panel.",staffNoAccess:"This account doesn't have staff access. Ask the shop owner to add you.",syncOffline:"You're offline. Showing the menu saved on this device.",saveNeedsSignIn:"Sign in with a staff account to save changes.",saveOffline:"Not saved: you're offline. Your changes are still in the form — try again when you're connected.",saveDenied:"Not saved: your account isn't allowed to change this section.",saveInvalid:"Not saved: some values are not valid. Check the form and try again.",saveFailed:"Not saved: something went wrong. Your changes are still in the form — try again.",statusSaving:"Saving…",statusSaved:"All changes saved",statusFailed:"Last change not saved",menuNoProducts:"The menu is being updated. Please check back soon.",cartEach:"{price} each",cartQtyLabel:"Quantity of {name}",cartDecrease:"One fewer {name}",cartIncrease:"One more {name}",cartRemove:"Remove {name}",cartItemRemoved:"{name} removed from your order.",cartClearTitle:"Clear your order?",cartClearConfirm:"This removes every item from your order tray.",trayItemsLabel:"{n} items",pickupOnlyLabel:"Pickup from our kitchen",trayDateHint:"We need at least {hours} hours. Earliest: {date}.",checkoutNeedName:"Add your name so the bakery knows who the order is for.",checkoutNeedDate:"Choose a delivery or pickup date and time.",checkoutBadDate:"That date isn't valid. Choose it again from the calendar.",checkoutDateTooSoon:"We need at least {hours} hours to bake your order. The earliest time is {date}.",checkoutDateTooFar:"Please choose a date within the next 12 months.",checkoutNoWhatsApp:"WhatsApp ordering isn't set up yet. Please contact the bakery directly.",checkoutOpened:"WhatsApp opened. Complete sending your order in WhatsApp.",checkoutBlocked:"WhatsApp didn't open automatically. Use the link below to send your order.",checkoutAgainTitle:"Send this order again?",checkoutAgainConfirm:"You already opened WhatsApp with this exact order. Open it again?",checkoutAgainOk:"Open WhatsApp again",checkoutAddressLabel:"Delivery address",orderSavedToHistory:"Order saved to your order history.",orderHistorySaveFailed:"Your order message is ready in WhatsApp, but it couldn't be saved to your online order history.",trayClearedAfterSend:"Order tray cleared.",myOrdersBtn:"My orders",myOrdersHideDetails:"Hide details",historyScopeAccount:"Orders linked to your account, plus any sent from this device.",historyScopeDevice:"Orders sent from this device. Sign in to keep your history across devices.",historyRequestedFor:"Requested for",orderStatusSent:"Sent on WhatsApp",orderStatusConfirmed:"Confirmed",orderStatusCompleted:"Completed",customerFallbackName:"Customer",contactNotSet:"Contact details coming soon.",customersScopeHint:"Shows customers with an account and the latest 200 orders.",darkModeOn:"Dark mode on",darkModeOff:"Light mode on",reviewVerifiedRole:"Customer",reviewStarsLabel:"Rated {n} out of 5",reviewsEmpty:"No reviews yet. Be the first to share yours.",reviewPending:"Thank you! Your review will appear once the bakery has approved it.",reviewDenied:"Your review could not be sent. Please sign in again and retry.",reviewFailed:"Your review could not be sent. Please try again.",reviewsPendingTitle:"Waiting for approval",reviewsPendingEmpty:"No reviews are waiting.",reviewsDecidedTitle:"Recently moderated",reviewApprove:"Approve",reviewReject:"Reject",reviewUnpublish:"Unpublish",reviewApproved:"Review published.",reviewRejected:"Review hidden.",reviewDeleteConfirm:"Delete this review permanently?",reviewsCuratedTitle:"Featured reviews",reviewsCuratedHint:"Reviews you add here appear on the storefront as written.",reviewsResetBtn:"Restore defaults",reviewsResetTitle:"Restore the default reviews?",reviewsResetConfirm:"This replaces your featured reviews with the original three.",reviewsAddBtn:"Add review",tabBrand:"Brand & Logo",tabAbout:"About Us",tabFaq:"FAQ",tabReviews:"Reviews",tabContact:"Contact",tabSocials:"Social Media",tabProducts:"Products",tabUsers:"Staff",tabData:"Data",usersClaimsHint:"Staff access is granted by the shop owner with a one-time command. Add or change people here, then run:",staffUidInvalid:"Paste the person's User UID from Firebase Authentication.",staffSavedHint:"Saved. Run the staff command so the change takes effect, then ask them to sign in again.",staffRemovedHint:"Removed from the list. Run the staff command to revoke their access.",prodDeleteTitle:"Delete this product?",prodNewDraft:"New product created. Fill it in and press Save to publish it.",prodPhotoRemovedPending:"Photo removed. Press Save to apply.",prodPriceInvalid:"Enter a price between 0 and 100,000.",importTitle:"Import this backup?",importConfirm:"This replaces the live shop settings and updates every product in the backup.",importBtn:"Import backup",resetDeviceTitle:"Reset this device",resetDeviceBtn:"Clear data on this device",resetDeviceHint:"Clears the menu, settings and order history cached in this browser. The live shop isn't changed.",resetDeviceConfirm:"Clear everything cached in this browser? The live shop isn't changed.",resetDeviceDone:"This device was reset. Live shop data is loading again.",leadTimeLabel:"Preparation time (hours)",leadTimeHint:"Customers cannot pick a delivery time sooner than this.",authErr_popupClosed:"Sign-in was cancelled.",authErr_popupBlocked:"Your browser blocked the sign-in window. Allow pop-ups and try again.",authErr_badCredentials:"That email and password don't match.",authErr_badEmail:"That email address doesn't look right.",authErr_tooMany:"Too many attempts. Wait a few minutes and try again.",authErr_offline:"You're offline. Connect and try again.",authErr_providerDisabled:"This sign-in method isn't enabled for the shop yet.",authErr_unauthorizedDomain:"Sign-in isn't allowed on this web address yet.",authErr_generic:"Sign-in didn't work. Please try again.",fontPreview:"Preview",authCustomerLead:"Sign in with Google to keep your order history on every device and to leave reviews.",authGoogleBtn:"Continue with Google",authGuestNote:"No account needed to order — just add your name when you send your order.",authOr:"or",btnSave:"Save",btnSendReview:"Send review",btnStaffLogin:"Sign in",checkoutAddressOptional:"Delivery address (optional for pickup)",checkoutDetailsLegend:"Your details",checkoutDoneClear:"I sent it — clear the tray",checkoutNameLabel:"Name *",checkoutOpenAgain:"Open WhatsApp",checkoutPhoneLabel:"Phone (optional)",checkoutRemember:"Remember my details on this device",labelEmail:"Email",leaveReviewDescModerated:"Tell us about your cake. Reviews appear after the bakery approves them.",perm_faq:"FAQ",perm_reviews:"Reviews",reviewRatingLabel:"Your rating",reviewSignInNeeded:"Please sign in with Google so we can make sure reviews come from real customers.",staffEntryLead:"The person signs in with their own Google or email account. Copy their User UID from Firebase Authentication.",staffEntryTitle:"Staff member",staffLoginLead:"For the bakery team. Access is granted by the shop owner.",staffLoginLink:"Staff sign-in",staffLoginTitle:"Staff sign-in",staffPermsLegend:"Sections staff can edit",staffUidLabel:"User UID",trayHeading:"Your order",trayYourOrder:"Your order",trayCloseDetails:"Close order details",trayItemsListLabel:"Items in your order",btnClosePanel:"Close control panel",colPhone:"Phone"},ku:{btnCancel:"پاشگەزبوونەوە",btnSubmit:"ناردن",btnSaveConfig:"پاشەکەوتکردنی ڕێکخستنەکان",economyTitle:"نرخدانان و ئابووری",economyDesc:"بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",btnCancel:"پاشگەزبوونەوە",btnSubmit:"ناردن",btnSaveConfig:"پاشەکەوتکردنی ڕێکخستنەکان",economyTitle:"نرخدانان و ئابووری",economyDesc:"بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",shopTagline:"شیرینەمەنی دەستکردی نایاب",announcementText:"پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو {freeDelivery}.",navMenu:"لیستی شیرینی",navHowItWorks:"شێوازی داواکردن",navOurStory:"چیرۆکی ئێمە",navReviews:"ڕای کڕیاران",navContact:"پەیوەندی",navFaq:"پرسیارە باوەکان",heroEyebrow:"شیرینەمەنی و پاتیسێری دەستکرد",heroTitle:"کێکی تایبەت بە <em>شەیدایی</em> و خۆشەویستی",heroLead:"ئێمە هەموو ڕۆژێک کێکی ئاهەنگگێڕان، شیرینی ناسک، و کەپکێکی بێوێنە بە کەرەستەی ئۆرگانیک دروست دەکەین. گەیاندنی خێرا لەڕێگەی واتسئاپەوە بۆ ئاهەنگەکانتان.",heroCtaPrimary:"بینینی هەموو شیرینییەکان",heroCtaSecondary:"گفتوگۆ لەگەڵ وەستای کێک",trust1:"١٠٠٪ ئاردی ئۆرگانیک",trust2:"برژاوی ڕۆژ و تازە",trust3:"نووسینی ناوی دڵخواز",badgeFresh:"تازە لە کاتژمێر ٦ی بەیانییەوە",heroReviewSnippet:'"باشترین کێکی ڕێد ڤێلڤێت لە شاردا! تامی بێوێنەیە."',feat1Title:"پێکهاتەی سروشتی",feat1Desc:"کەرەی پاک، شوکۆڵاتەی بەلجیکی، میوەی تازە، و بەبێ هیچ ماددەیەکی پارێزەر.",feat2Title:"گەیاندنی پارێزراو",feat2Desc:"بە ئۆتۆمبێلی فێنککەرەوە دەگەیەنرێت بۆ ئەوەی کێکەکەت بە جوانی تەواو بگات.",feat3Title:"دیزاینی دڵخواز",feat3Desc:"کێکی چەندین نهۆم، نووسینی شوکۆڵاتەیی، و شیرینی تایبەت بۆ هەموو یادێک.",menuEyebrow:"هەڵبژاردەی ڕۆژانەمان",menuTitle:"بە تازەیی بۆ تۆ برژاوە",menuLead:'سەیری کێک و کەپکێک و شیرینییەکانمان بکە. کرتە لەسەر "زیادکردن" بکە بۆ داواکردن لە واتسئاپ.',catAll:"هەموو شیرینییەکان",catCakes:"کێکەکان",catCupcakes:"کەپکێک",catDesserts:"دیسێرت",tagBestseller:"پڕفرۆشترین",tagNew:"نوێ",btnAdd:"زیادکردن بۆ سەبەتە",stepsEyebrow:"ئاسان و خێرا",stepsTitle:"چۆنیەتی داواکردن",stepsLead:"سێ هەنگاوی زۆر سادە لە چێشتخانەکەمانەوە بۆ سەر مێزی ئاهەنگەکەت.",step1Title:"دڵخوازی خۆت هەڵبژێرە",step1Desc:"سەیری لیستەکەمان بکە و ئەو شیرینییە هەڵبژێرە کە دەتەوێت لەگەڵ خۆشەویستانت بەشی بکەیت.",step2Title:"لە واتسئاپەوە بینێرە",step2Desc:"کرتە لەسەر ناردن بکە تا ڕاستەوخۆ داواکارییە ڕێکخراوەکەت بگاتە دەست وەستای شیرینی.",step3Title:"وەریبگرە و ئاهەنگ بگێڕە",step3Desc:"کاتی گەیاندن یان وەرگرتن دادەنێین، بە تازەیی دەبرژێنین و دەگەیەنینە بەردەم دەرگاتان.",storyEyebrow:"مێژوو و ڕەسەنایەتی",storyTitle:"بە ئارامی دروستکراو، بە دڵسۆزی برژاو",bullet1:"کەرە و شیری سروشتی و ئاردی ئۆرگانیک",bullet2:"بەبێ هیچ ڕەنگ و تامی دەستکرد",bullet3:"وەستای ئەزمووندار بە شێوازی ئەوروپی",reviewsEyebrow:"ڕای کڕیاران",reviewsTitle:"وتەی شیرینی کڕیارە ئازیزەکانمان",reviewsLead:"بۆچوونی ڕاستەقینە لە یادی لەدایکبوون و ئاهەنگە دڵخۆشکەرەکان.",btnLeaveReview:"نووسینی بۆچوون",leaveReviewTitle:"نووسینی بۆچوون",leaveReviewDesc:"بە خۆشحاڵییەوە گوێبیستی ڕای ئێوە دەبین!",reviewFormName:"ناوت",reviewFormQuote:"بۆچوونەکەت",review1Quote:'"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."',review1Role:"کڕیاری دڵنیاکراو",review2Quote:'"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."',review2Role:"ئاهەنگی فەرمانگە",review3Quote:'"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."',review3Role:"کڕیاری هەمیشەیی",faqEyebrow:"پرسیارە دووبارەکان",faqTitle:"پرسیارە باوەکان",faqLead:"هەموو زانیارییەک دەربارەی شێوازی داواکردن، جۆری کەرەستەکان و کاتی گەیاندن.",faq1Q:"چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟",faq1A:"بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە.",faq2Q:"شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟",faq2A:'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!',faq3Q:"ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟",faq3A:"بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە.",faq4Q:"ئایا دەتوانم نووسینی سەر کێک دیاری بکەم؟",faq4A:"بەڵێ، لەسەر هەموو کێکە گەورەکان نووسینی ناوی دڵخواز بە شوکۆڵاتە لەسەر پلێتی شەکری بە دیاری پێشکەش دەکرێت.",faq5Q:"شێوازی پارەدان چۆنە؟",faq5A:"پارەدان بە کاش لە کاتی وەرگرتن، هەروەها لەڕێگەی فاستپەی، بانکی یەکەمی عێراقی (FIB) و زەین کاش قبوڵ دەکرێت.",ctaTitle:"ئامادەیت بۆنەکەت شیرینتر بکەیت؟",ctaLead:"دیزاین یان بیرۆکەیەکی تایبەتت لە مێشکدایە؟ وەستاکانمان ئامادەن خەونەکەت بکەنە ڕاستی.",ctaBtnWhatsApp:"پەیوەندی لە واتسئاپ",ctaBtnMenu:"بینینی هەموو کێکەکان",cardAddressTitle:"چێشتخانەی شیرینی",cardHoursTitle:"کاتژمێرەکانی کارکردن",cardContactTitle:"پەیوەندی ڕاستەوخۆ",footerBlurb:"شیرینەمەنییەکی دەستکردی نایاب تایبەت بە کێکی بۆنەکان، کەپکێکی ناسک و شیرینی فەڕەنسی.",footerShopLinks:"بەشەکانی فرۆشگا",footerHelpLinks:"یارمەتی و زانیاری",footerHoursTitle:"کاتەکانی برژاندن",footerBestsellers:"پڕفرۆشترینەکان",copyrightAllRights:"هەموو مافەکانی پارێزراوە.",footerTagline:"ڕۆژانە بە کەرەستەی سروشتی و خۆشەویستی پاک دەبرژێنرێت.",btnSignIn:"چوونەژوورەوە",btnPanel:"پانێڵی کۆنتڕۆڵ",btnLogout:"دەرچوون",trayItemLabel:"بەند",trayItemLabelSingular:"بەند",trayClear:"سڕینەوەی سەبەتە",traySendWhatsApp:"ناردنی داواکاری لە واتسئاپ",tabCustomer:"کڕیار",customerTitle:"چوونەژوورەوەی خێرای کڕیار",customerDesc:"تەنها ژمارەی مۆبایل و ناوت بنووسە. بەبێ وشەی نهێنی! ناوت بۆ داواکاری واتسئاپ بەکاردێت.",labelPhone:"ژمارەی مۆبایل (کەمترین ٦ ژمارە)",labelDisplayName:"ناوی بەڕێزت",btnContinue:"بەردەوامبوون وەک کڕیار",labelUsername:"ناوی بەکارهێنەر یان ئیمەیڵ",labelPassword:"وشەی نهێنی",tabAdmin:"بەڕێوەبەر",tabDev:"گەشەپێدەر",staffFormDesc:"تکایە زانیارییەکانی چوونەژوورەوەت بنووسە بۆ بینینی پەنێڵی کۆنترۆڵ.",historyZero:"هیچ داواکارییەکت نەکردووە.",trayEmptyPreview:"هیچ کاڵایەک هەڵنەبژێردراوە",storyImgTitle:"کەلەپووری شیرینی دەستکرد",storyImgDesc:"بە فرێشی لە فڕنەوە بۆ ئاهەنگی خێزانەکەت",review1Name:"سارا و کەریم",review2Name:"دانیار ئازاد",review3Name:"لینا ڕۆستەم",footerOrdersInfo:"داواکاری و پرسیار:",invalidPromo:"کۆدی داشکاندن هەڵەیە",promoRemoved:"کۆدی داشکاندن سڕایەوە",itemsNotAvailable:"ئەم کاڵایانە لە ئێستادا لە مێنیودا بەردەست نین.",signedInAs:"چوویتە ژوورەوە وەک {name}",loggedInAs:"چوویتە ژوورەوە وەک {role}",loggedOut:"بە سەرکەوتوویی چوویەدەرەوە.",orderStatusUpdated:"باری داواکاری گۆڕدرا بۆ {status}",noteSaved:"تێبینی پاشەکەوت کرا",invalidUrl:"شێوازی بەستەر هەڵەیە. تەنها بەستەرەکانی http:// و https:// پشتگیری دەکرێن.",staffAdded:"بەکارهێنەری ستاف بە سەرکەوتوویی زیادکرا",usersTitle:"بەڕێوەبردنی بەکارهێنەران و ستاف",usersAddStaff:"زیادکردنی ئەژمێری ستاف",usersSearch:"گەڕان بۆ بەکارهێنەران…",usersHint:"ئەدمینەکان ئەژمێرەکانی ستاف و تێپەڕەوشەکان بەڕێوە دەبەن. ئەژمێری گەشەپێدەر و ئەدمین پارێزراون.",usersColRole:"ڕۆڵ",usersColName:"ناو",usersColLogin:"ناوی بەکارهێنەر / مۆبایل",usersColPassword:"تێپەڕەوشە",usersColPerms:"مۆڵەتەکان",usersColActions:"کردارەکان",usersNoPassword:"کڕیار — چوونەژوورەوەی نییە",usersYou:"(تۆ)",usersEmpty:"هیچ بەکارهێنەرێک نەدۆزرایەوە.",usersNoAccess:"ڕێگەت نییە بە بەڕێوەبردنی بەکارهێنەران.",usersEdit:"دەستکاری",usersResetPw:"گۆڕینی تێپەڕەوشە",usersDelete:"سڕینەوە",role_admin:"ئەدمین",role_dev:"گەشەپێدەر",role_staff:"ستاف",role_customer:"کڕیار",perm_products:"بەرهەمەکان",perm_customers:"کڕیاران",perm_economy:"ئابووری",perm_brand:"براند و لۆگۆ",perm_theme:"ڕووکار",perm_fonts:"فۆنتەکان",perm_about:"دەربارەی ئێمە",perm_contact:"پەیوەندی",perm_socials:"سۆشیال میدیا",editUserTitle:"دەستکاریکردنی بەکارهێنەر",usersNewPwPrompt:"تێپەڕەوشەی نوێ بۆ {name}:",staffPwTooShort:"تێپەڕەوشە دەبێت لانیکەم ٤ پیت بێت.",usersCannotDeleteSelf:"ناتوانیت ئەژمێری خۆت بسڕیتەوە.",usersCannotDeleteElevated:"تەنها گەشەپێدەر دەتوانێت ئەژمێری ئەدمین و گەشەپێدەر بسڕێتەوە.",usersConfirmDelete:'دڵنیایی لە سڕینەوەی "{name}"؟ ئەمە ناگەڕێتەوە.',phonePreviewLabel:"پانی پیشاندان",phonePreviewDesktop:"کۆمپیوتەر",phonePreviewPhone:"مۆبایل",backupImported:"باکئەپ بە سەرکەوتوویی هێنرایە ناوەوە!",copiedJson:"JSON کۆپی کرا بۆ کلیپبۆرد!",factoryResetDone:"گەڕانەوە بۆ باری بنەڕەتی بە سەرکەوتوویی تەواو بوو.",btnLogin:"چوونەژوورەوە بۆ پانێڵ",panelTitle:"پانێڵی کۆنتڕۆڵی شیرینەمەنی",uploadPhoto:"وێنە باربکە",replacePhoto:"وێنە بگۆڕە",removePhoto:"سڕینەوەی وێنە",photoHint:"JPG، PNG یان WebP — خۆکارانە قەبارەکەی دەکرێتە ٨٠٠ پێکسڵ. زۆرترین ٥ مێگابایت.",noPhotoHint:"هێشتا وێنە نییە — ئیمۆجی پیشان دەدرێت",prodPhotoError:"کرداری وێنەکە سەرکەوتوو نەبوو. تکایە فایلێکی تر تاقی بکەرەوە.",prodPhotoTooLarge:"قەبارەی وێنەکە زۆر گەورەیە. تکایە وێنەیەکی بچووکتر هەڵبژێرە.",prodPhotoRemoved:"وێنەکە سڕایەوە.",storageQuotaError:"شوێنی پاشەکەوتکردن پڕبووە — وێنەی بچووکتر بەکاربێنە یان وێنەکان کەم بکەرەوە.",prodDeleteConfirm:"دڵنیایت لە سڕینەوەی ئەم بەرهەمە؟",btnAddNewProduct:"+ زیادکردنی بەرهەمی نوێ",btnSaveProduct:"پاشەکەوتکردنی بەرهەم",btnDeleteProduct:"سڕینەوەی بەرهەم",tabFonts:"فۆنتەکان",fieldKurdishBody:"فۆنتی ناوەوە (کوردی)",fieldKurdishDisplay:"فۆنتی سەرنوسراو (کوردی)",fieldEnglishBody:"فۆنتی ناوەوە (ئینگلیزی)",fieldEnglishDisplay:"فۆنتی سەرنوسراو (ئینگلیزی)",saveFonts:"پاشەکەوتکردنی فۆنت",fontPreview:"پێشبینین",customizeTitle:"دەستکاری کردن",customizeLeaveOut:"لایببە",customizeSkip:"تێپەڕاندن — وەک خۆی زیادی بکە",customizeAdd:"زیادکردن بۆ داواکاری",customizeNone:"هیچ شتێک نییە بۆ دەستکاریکردن",orderNoteLabel:"تێبینی بۆ نانەوا (ئارەزوومەندانە)",orderNotePlaceholder:'بۆ نموونە "جەژنی لەدایکبوون پیرۆز سارا"',orderNoteTooLong:"تێبینییەکە زۆر درێژە — زۆرترین ٣٠٠ پیت.",waNote:"تێبینی بۆ نانەوا",waExclude:"بێ",toastPhotoReady:"وێنەکە ئامادەکرا و دەتوانیت پاشەکەوتی بکەیت.",toastAdded:"زیادکرا بۆ سەبەتەکەت!",toastOrderCleared:"سەبەتەی داواکاری پاککرایەوە.",toastSaved:"بە سەرکەوتوویی پاشەکەوت کرا",toastDeleted:"بە سەرکەوتوویی سڕایەوە",toastInvalidPhone:"تکایە ژمارەی مۆبایلی دروست بە کەمترین ٦ ژمارە بنووسە.",toastInvalidLogin:"ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە.",toastInvalidJson:"فۆرماتی JSON هەڵەیە، تکایە دڵنیابەرەوە.",tabEconomy:"ئابووری",economyCurrencies:"دراوەکان",economyExchange:"نرخی ئاڵوگۆڕ",economyDelivery:"گەیاندن",economyTax:"باج",economyDiscounts:"داشکاندن",fieldPrimaryCurrency:"دراوی سەرەکی (داخراو)",fieldSecondaryCurrency:"دراوی دووەم",fieldShowSecondary:"پیشاندانی دراوی دووەم لە ماڵپەڕ",fieldCurrencySymbol:"هێمای دراو",fieldExchangeRate:"1 دۆلار = ؟ دینار",fieldRoundingRule:"خستنەوەی نرخی گۆڕدراو بۆ",fieldAutoRefresh:"نوێکردنەوەی خۆکار (هێشتا چالاک نییە)",fieldDeliveryFee:"کرێی گەیاندن (دۆلار)",fieldFreeDeliveryOver:"گەیاندنی خۆڕایی بۆ سەرووی (دۆلار)",fieldMinimumOrder:"کەمترین داواکاری (دۆلار)",fieldPickupOnly:"تەنها وەرگرتن — گەیاندن بشارەوە",fieldTaxEnabled:"وەرگرتنی باج",fieldTaxRate:"ڕێژەی باج (%)",fieldTaxLabel:"ناوی باج",fieldTaxIncluded:"نرخەکان باج لەخۆدەگرن",fieldPromoCode:"کۆدی داشکاندنی چالاک",fieldPromoType:"جۆری داشکاندن",fieldPromoValue:"بڕی داشکاندن",fieldPromoExpiry:"بەسەرچوون لە",saveEconomy:"پاشەکەوتکردنی ڕێکخستنی ئابووری",roundNearest1:"نزیکترین 1",roundNearest250:"نزیکترین 250",roundNearest500:"نزیکترین 500",roundNearest1000:"نزیکترین 1000",promoPercent:"ڕێژە (%)",promoFixed:"بڕی جێگیر (دۆلار)",subtotal:"کۆی لاوەکی",deliveryFee:"گەیاندن",tax:"باج",discount:"داشکاندن",total:"کۆی گشتی",freeDelivery:"خۆڕایی",minimumOrderWarning:"کەمترین داواکاری {amount}ە. {remaining} زیاتر زیاد بکە بۆ تەواوکردن.",promoApplied:"کۆدی داشکاندن {code} جێبەجێکرا",promoExpired:"کۆدی داشکاندن بەسەرچووە",economyPreview:"پێشبینینی ڕاستەوخۆ",economyPreviewSample:"داواکاری نموونە: 50 دۆلار کۆی لاوەکی",trayDetails:"وردەکاری ▾",trayDetailsClose:"داخستن ▴",trayDateLabel:"بەروار و کاتی گەیاندن یان وەرگرتن *",trayPaymentNote:"پارەدان لە کاتی گەیاندن. کرێی گەیاندن لە واتسئاپ پشتڕاست دەکەینەوە.",inOrderCount:"{n} لە داواکارییەکەتدا",skipToMenu:"بڕۆ بۆ لیستی شیرینی",trayApplyPromo:"جێبەجێکردن",trayRemovePromo:"سڕینەوە",trayPromoPlaceholder:"کۆدی داشکاندن",deliveryFreeForEveryone:"گەیاندنی خۆڕایی بۆ هەمووان",freeDeliveryWarning:"ئاستی گەیاندنی خۆڕایی کەمترە لە کەمترین داواکاری — کڕیارانی خوار کەمترین ناتوانن داوا بکەن.",promoActive:"چالاکە",promoTooShort:"کەمترین ٣ پیت",taxAddedCheckout:"لە کاتی کڕین زیاد دەکرێت",taxIncludedLabel:"بەشدارە",pickupAvailable:"وەرگرتن لە چێشتخانە بەردەستە",justNow:"ئێستا",roundedFrom:"خستنەوە لە {raw} بۆ {rounded} (نزیکترین {rule})",searchPlaceholder:"گەڕان بۆ کێک، کاپکێک، شیرینی…",searchShortcut:"⌘K دابگرە بۆ گەڕان",searchResultsCount:"{shown} لە {total} کێک پیشان دەدرێت",searchNoResults:'هیچ کێکێک نەدۆزرایەوە بۆ "{query}".',searchEmptyDesc:"هەوڵبدە گەڕانەکەت بسڕیتەوە یان مەودای نرخ یان هاوپۆلێکی تر هەڵبژێریت.",searchClearAll:"پاککردنەوەی هەموو فلتەرەکان",searchClearSearch:"پاککردنەوەی گەڕان",sortLabel:"ڕیزکردن",sortPopular:"بەناوبانگ",sortNewest:"نوێترین",sortPriceAsc:"نرخ: لە کەمەوە بۆ زۆر",sortPriceDesc:"نرخ: لە زۆرەوە بۆ کەم",sortNameAsc:"ناو A–Z",priceRangeLabel:"نرخ",priceAny:"هەر نرخێک",priceUnder20:"کەمتر لە 20 دۆلار",price20to40:"20 – 40 دۆلار",price40to60:"40 – 60 دۆلار",priceOver60:"زیاتر لە 60 دۆلار",myOrders:"داواکارییەکانم",myOrdersTitle:"داواکارییەکانم",myOrdersSubtitle:"{count} داواکاریت کردووە لە {date}ەوە.",myOrdersEmpty:"هێشتا هیچ داواکارییەک نییە.",myOrdersEmptyHint:"مێنیو ببینە و یەکەم داواکاریت بکە — لێرە دەردەکەوێت.",myOrdersBrowse:"مێنیو ببینە",myOrdersReorder:"دووبارە داواکردن",myOrdersDetails:"بینینی وردەکاری",myOrdersTotalSpent:"کۆی خەرجکراو",myOrdersTotalOrders:"داواکارییەکان",myOrdersFavourite:"زۆرترین داواکراو",orderStatusPending:"چاوەڕوان",orderStatusBaking:"دەژەنرێت",orderStatusDelivered:"گەیەندرا",orderStatusCancelled:"هەڵوەشێنراوە",orderSignInToSave:"بچۆ ژوورەوە بۆ پاشەکەوتکردنی ئەم داواکارییە.",orderAddedToTray:"{count} بەند زیادکرا بۆ داواکاریەکەت",tabCustomers:"کڕیارەکان",customersSearch:"گەڕان بە ناو یان مۆبایل…",customersSortName:"ناو",customersSortLastOrder:"دوایین داواکاری",customersSortTotalSpent:"کۆی خەرجکراو",customersSortOrderCount:"ژمارەی داواکاری",customersEmpty:"هێشتا هیچ کڕیارێک نییە.",customerOrders:"داواکارییەکان",customerTotalSpent:"کۆی خەرجکراو",customerLastOrder:"دوایین داواکاری",customerNoOrders:"ئەم کڕیارە هیچ داواکارییەکی نییە.",customerPrivateNote:"تێبینی تایبەت (تەنها کارمەندان)",customerChangeStatus:"گۆڕینی دۆخ",logoSection:"لۆگۆ",logoModeEmoji:"ئیمۆجی",logoModeUpload:"بارکردن",logoModeUrl:"بەستەر",logoPreview:"پێشبینین",logoUploadBtn:"بارکردنی لۆگۆ",logoReplaceBtn:"گۆڕینی لۆگۆ",logoRemoveBtn:"سڕینەوەی لۆگۆ",logoRemoveConfirm:"لۆگۆی ئێستا بسڕدرێتەوە و ئیمۆجی بەکاربهێنرێت؟",logoRemoved:"لۆگۆ سڕایەوە — ئیمۆجی بەکاردێت.",logoUrlLabel:"بەستەری وێنەی دوور",logoUrlHint:"بەستەرێکی ڕاستەوخۆ بۆ فایلی PNG، JPG، WebP یان SVG دابنێ.",logoUrlValid:"بەستەر دروستە",logoUrlInvalid:"نەتوانرا ئەم بەستەرە بار بکرێت",logoEmojiLabel:"ئیمۆجی",logoEmojiHint:"یەکێک هەڵبژێرە یان هی خۆت دابنێ.",logoEmojiEmpty:"بەتاڵ — 🎂 ی بنەڕەت بەکاردێت",logoUploadHint:"وێنەی چوارگۆشە باشترینە. خۆکارانە بۆ 256×256 دەگۆڕدرێت. زۆرترین 5 مێگابایت.",logoUploadReady:"ئامادەیە بۆ پاشەکەوتکردن",logoUploadError:"نەتوانرا ئەم وێنەیە بخوێنرێتەوە. فایلێکی تر تاقی بکەوە.",logoUploadTooLarge:"وێنە زۆر گەورەیە دوای گۆڕین. لۆگۆیەکی سادەتر تاقی بکەوە.",logoFaviconNote:"هەروەها ئایکۆنی تابەکەش نوێ دەکاتەوە.",logoFallbackWarning:"وێنە نەتوانرا بار بکرێت. ئیمۆجی بەکاردێت.",tabTheme:"ڕووکار",themePresetTitle:"پالێتە ئامادەکان",themePreviewTitle:"پێشبینینی ڕاستەوخۆ",themeSave:"پاشەکەوتکردنی ڕووکار",themeApplied:"ڕووکار پاشەکەوتکرا",themeReverted:"گەڕایەوە بۆ ڕووکاری پاشەکەوتکراو",themePreviewHeading:"سەرنوسراوێکی نموونە",themePreviewBody:"دەقی ناوەوە لەسەر ڕەنگی بنەڕەت، وەک چۆن لە ماڵپەڕ دەردەکەوێت.",themePreviewPrimary:"دوگمەی سەرەکی",themePreviewGhost:"دوگمەی شەفاف",themePreviewGold:"زێڕین ★★★★★",themePreviewPrice:"38$ · 49,750 د.ع",themePresetBerry:"بێری",themePresetChocolate:"چاکۆلێت",themePresetSage:"سەیج",themePresetRose:"گۆڵ",themePresetMidnight:"نیوەشەو",themeAutoDark:"چالاککردنی باری تاریکی خۆکار",btnClose:"داخستن",btnConfirm:"دڵنیاکردنەوە",confirmTitle:"دڵنیایت؟",errFillFields:"تکایە خانە پێویستەکان پڕبکەرەوە.",errInvalidUrl:"ناونیشانێکی تەواو بنووسە کە بە https:// دەست پێدەکات",errInvalidWhatsApp:"ژمارەی واتسئاپ بە شێوەی نێودەوڵەتی بنووسە، بۆ نموونە 9647501234567.",loginSuccess:"چوویتە ژوورەوە.",sessionExpired:"ماوەی چوونەژوورەوەی کارمەند تەواو بووە. تکایە دووبارە بچۆ ژوورەوە.",staffAccessGranted:"چوویتە ژوورەوە. پانێڵی کۆنترۆڵ دەکرێتەوە.",staffNoAccess:"ئەم هەژمارە دەسەڵاتی کارمەندی نییە. داوا لە خاوەنی دوکان بکە زیادت بکات.",syncOffline:"پەیوەندیت بە ئینتەرنێتەوە نییە. ئەو لیستەی لەسەر ئەم ئامێرە پاشەکەوت کراوە پیشان دەدرێت.",saveNeedsSignIn:"بۆ پاشەکەوتکردن بە هەژماری کارمەند بچۆ ژوورەوە.",saveOffline:"پاشەکەوت نەکرا: پەیوەندیت نییە. گۆڕانکارییەکانت لە فۆڕمەکەدا ماونەتەوە — کاتێک پەیوەندیت هەبوو دووبارە هەوڵ بدەرەوە.",saveDenied:"پاشەکەوت نەکرا: هەژمارەکەت ڕێگەی گۆڕینی ئەم بەشەی نییە.",saveInvalid:"پاشەکەوت نەکرا: هەندێک بەها دروست نین. فۆڕمەکە بپشکنە و دووبارە هەوڵ بدەرەوە.",saveFailed:"پاشەکەوت نەکرا: هەڵەیەک ڕوویدا. گۆڕانکارییەکانت لە فۆڕمەکەدا ماونەتەوە — دووبارە هەوڵ بدەرەوە.",statusSaving:"پاشەکەوت دەکرێت…",statusSaved:"هەموو گۆڕانکارییەکان پاشەکەوت کران",statusFailed:"دوایین گۆڕانکاری پاشەکەوت نەکرا",menuNoProducts:"لیستی شیرینی نوێ دەکرێتەوە. تکایە دواتر سەردان بکەرەوە.",cartEach:"دانەی {price}",cartQtyLabel:"ژمارەی {name}",cartDecrease:"یەک دانە کەمتر لە {name}",cartIncrease:"یەک دانە زیاتر لە {name}",cartRemove:"لابردنی {name}",cartItemRemoved:"{name} لە داواکارییەکەت لابرا.",cartClearTitle:"داواکارییەکەت بسڕیتەوە؟",cartClearConfirm:"هەموو کاڵاکان لە سەبەتەکەت لادەبرێن.",trayItemsLabel:"{n} کاڵا",pickupOnlyLabel:"وەرگرتن لە چێشتخانەکەمان",trayDateHint:"لانیکەم {hours} کاتژمێرمان پێویستە. زووترین کات: {date}.",checkoutNeedName:"ناوەکەت بنووسە تا شیرینیخانەکە بزانێت داواکارییەکە بۆ کێیە.",checkoutNeedDate:"بەروار و کاتی گەیاندن یان وەرگرتن هەڵبژێرە.",checkoutBadDate:"ئەو بەروارە دروست نییە. دووبارە لە ڕۆژژمێرەکە هەڵیبژێرە.",checkoutDateTooSoon:"لانیکەم {hours} کاتژمێرمان پێویستە بۆ ئامادەکردن. زووترین کات {date}ە.",checkoutDateTooFar:"تکایە بەروارێک لە ماوەی ١٢ مانگی داهاتوودا هەڵبژێرە.",checkoutNoWhatsApp:"داواکردن لە ڕێگەی واتسئاپ هێشتا ئامادە نییە. تکایە ڕاستەوخۆ پەیوەندی بە شیرینیخانەکەوە بکە.",checkoutOpened:"واتسئاپ کرایەوە. ناردنی داواکارییەکەت لە واتسئاپدا تەواو بکە.",checkoutBlocked:"واتسئاپ خۆکارانە نەکرایەوە. بۆ ناردنی داواکارییەکەت بەستەری خوارەوە بەکاربهێنە.",checkoutAgainTitle:"ئەم داواکارییە دووبارە بنێریت؟",checkoutAgainConfirm:"پێشتر هەمان داواکاریت لە واتسئاپ کردەوە. دووبارە بیکەیتەوە؟",checkoutAgainOk:"دووبارە کردنەوەی واتسئاپ",checkoutAddressLabel:"ناونیشانی گەیاندن",orderSavedToHistory:"داواکارییەکە لە مێژووی داواکارییەکانت پاشەکەوت کرا.",orderHistorySaveFailed:"نامەی داواکارییەکەت لە واتسئاپ ئامادەیە، بەڵام نەتوانرا لە مێژووی داواکارییە ئۆنلاینەکانت پاشەکەوت بکرێت.",trayClearedAfterSend:"سەبەتەی داواکاری پاککرایەوە.",myOrdersBtn:"داواکارییەکانم",myOrdersHideDetails:"شاردنەوەی وردەکاری",historyScopeAccount:"ئەو داواکارییانەی بە هەژمارەکەتەوە بەستراون، لەگەڵ ئەوانەی لەم ئامێرەوە نێردراون.",historyScopeDevice:"ئەو داواکارییانەی لەم ئامێرەوە نێردراون. بچۆ ژوورەوە بۆ پاراستنی مێژووەکەت لە هەموو ئامێرەکاندا.",historyRequestedFor:"داواکراو بۆ",orderStatusSent:"لە واتسئاپ نێردرا",orderStatusConfirmed:"پشتڕاستکرایەوە",orderStatusCompleted:"تەواو بوو",customerFallbackName:"کڕیار",contactNotSet:"زانیاری پەیوەندی بەم زووانە زیاد دەکرێت.",customersScopeHint:"ئەو کڕیارانەی هەژماریان هەیە و دوایین ٢٠٠ داواکاری پیشان دەدات.",darkModeOn:"دۆخی تاریک چالاکە",darkModeOff:"دۆخی ڕووناک چالاکە",reviewVerifiedRole:"کڕیار",reviewStarsLabel:"{n} لە ٥ ئەستێرە",reviewsEmpty:"هێشتا هیچ ڕایەک نییە. یەکەم کەس بە ڕاکەت بڵێ.",reviewPending:"سوپاس! ڕاکەت دوای پەسەندکردنی شیرینیخانەکە دەردەکەوێت.",reviewDenied:"ڕاکەت نەنێردرا. تکایە دووبارە بچۆ ژوورەوە و هەوڵ بدەرەوە.",reviewFailed:"ڕاکەت نەنێردرا. تکایە دووبارە هەوڵ بدەرەوە.",reviewsPendingTitle:"چاوەڕێی پەسەندکردن",reviewsPendingEmpty:"هیچ ڕایەک چاوەڕێ ناکات.",reviewsDecidedTitle:"بەم دواییانە بڕیاری لەسەر دراوە",reviewApprove:"پەسەندکردن",reviewReject:"ڕەتکردنەوە",reviewUnpublish:"لابردن لە پیشاندان",reviewApproved:"ڕاکە بڵاوکرایەوە.",reviewRejected:"ڕاکە شاردرایەوە.",reviewDeleteConfirm:"ئەم ڕایە بە یەکجاری بسڕیتەوە؟",reviewsCuratedTitle:"ڕا هەڵبژێردراوەکان",reviewsCuratedHint:"ئەو ڕایانەی لێرە زیادی دەکەیت وەک خۆیان لە ماڵپەڕەکەدا دەردەکەون.",reviewsResetBtn:"گەڕاندنەوەی بنەڕەت",reviewsResetTitle:"ڕا بنەڕەتییەکان بگەڕێنیتەوە؟",reviewsResetConfirm:"ڕا هەڵبژێردراوەکانت بە سێ ڕا سەرەتاییەکە دەگۆڕدرێن.",reviewsAddBtn:"زیادکردنی ڕا",tabBrand:"براند و لۆگۆ",tabAbout:"دەربارەی ئێمە",tabFaq:"پرسیارە باوەکان",tabReviews:"ڕاکان",tabContact:"پەیوەندی",tabSocials:"تۆڕە کۆمەڵایەتییەکان",tabProducts:"بەرهەمەکان",tabUsers:"کارمەندان",tabData:"داتا",usersClaimsHint:"دەسەڵاتی کارمەندان لەلایەن خاوەنی دوکانەوە بە فەرمانێکی یەکجاری دەدرێت. لێرە کەسەکان زیاد یان بگۆڕە، پاشان ئەمە جێبەجێ بکە:",staffUidInvalid:"User UIDی کەسەکە لە Firebase Authenticationەوە دابنێ.",staffSavedHint:"پاشەکەوت کرا. فەرمانی کارمەندان جێبەجێ بکە تا گۆڕانکارییەکە کاریگەر بێت، پاشان داوایان لێبکە دووبارە بچنە ژوورەوە.",staffRemovedHint:"لە لیستەکە لابرا. فەرمانی کارمەندان جێبەجێ بکە بۆ هەڵوەشاندنەوەی دەسەڵاتەکەیان.",prodDeleteTitle:"ئەم بەرهەمە بسڕیتەوە؟",prodNewDraft:"بەرهەمێکی نوێ دروستکرا. پڕی بکەرەوە و پاشەکەوت دابگرە بۆ بڵاوکردنەوە.",prodPhotoRemovedPending:"وێنەکە لابرا. بۆ جێبەجێکردن پاشەکەوت دابگرە.",prodPriceInvalid:"نرخێک لە نێوان ٠ و ١٠٠،٠٠٠ بنووسە.",importTitle:"ئەم باکئەپە هاوردە بکەیت؟",importConfirm:"ڕێکخستنەکانی دوکان دەگۆڕدرێن و هەموو بەرهەمەکانی ناو باکئەپەکە نوێ دەکرێنەوە.",importBtn:"هاوردەکردنی باکئەپ",resetDeviceTitle:"ڕێکخستنەوەی ئەم ئامێرە",resetDeviceBtn:"سڕینەوەی داتای ئەم ئامێرە",resetDeviceHint:"لیستی شیرینی، ڕێکخستنەکان و مێژووی داواکاری پاشەکەوتکراو لەم وێبگەڕەدا دەسڕێتەوە. دوکانە زیندووەکە ناگۆڕدرێت.",resetDeviceConfirm:"هەموو داتای پاشەکەوتکراوی ئەم وێبگەڕە بسڕیتەوە؟ دوکانە زیندووەکە ناگۆڕدرێت.",resetDeviceDone:"ئەم ئامێرە ڕێکخرایەوە. داتای دوکان دووبارە بار دەکرێتەوە.",leadTimeLabel:"کاتی ئامادەکردن (کاتژمێر)",leadTimeHint:"کڕیاران ناتوانن کاتی گەیاندنێکی زووتر لەمە هەڵبژێرن.",authErr_popupClosed:"چوونەژوورەوە هەڵوەشێنرایەوە.",authErr_popupBlocked:"وێبگەڕەکەت پەنجەرەی چوونەژوورەوەی ڕاگرت. ڕێگە بە pop-up بدە و دووبارە هەوڵ بدەرەوە.",authErr_badCredentials:"ئیمەیڵ و وشەی نهێنی یەک ناگرنەوە.",authErr_badEmail:"ئەو ئیمەیڵە دروست نییە.",authErr_tooMany:"هەوڵی زۆر درا. چەند خولەکێک چاوەڕێ بکە و دووبارە هەوڵ بدەرەوە.",authErr_offline:"پەیوەندیت نییە. پەیوەندی بکە و دووبارە هەوڵ بدەرەوە.",authErr_providerDisabled:"ئەم شێوازی چوونەژوورەوەیە هێشتا بۆ دوکانەکە چالاک نەکراوە.",authErr_unauthorizedDomain:"چوونەژوورەوە لەسەر ئەم ناونیشانە هێشتا ڕێگەپێدراو نییە.",authErr_generic:"چوونەژوورەوە سەرکەوتوو نەبوو. تکایە دووبارە هەوڵ بدەرەوە.",fontPreview:"پێشبینین",authCustomerLead:"بە Google بچۆ ژوورەوە بۆ پاراستنی مێژووی داواکارییەکانت لە هەموو ئامێرێکدا و نووسینی ڕا.",authGoogleBtn:"بەردەوامبوون بە Google",authGuestNote:"بۆ داواکردن پێویستت بە هەژمار نییە — تەنها ناوەکەت بنووسە کاتێک داواکارییەکەت دەنێریت.",authOr:"یان",btnSave:"پاشەکەوتکردن",btnSendReview:"ناردنی ڕا",btnStaffLogin:"چوونەژوورەوە",checkoutAddressOptional:"ناونیشانی گەیاندن (بۆ وەرگرتن پێویست نییە)",checkoutDetailsLegend:"زانیارییەکانت",checkoutDoneClear:"ناردم — سەبەتەکە پاک بکەرەوە",checkoutNameLabel:"ناو *",checkoutOpenAgain:"کردنەوەی واتسئاپ",checkoutPhoneLabel:"ژمارەی مۆبایل (ئارەزوومەندانە)",checkoutRemember:"زانیارییەکانم لەسەر ئەم ئامێرە بهێڵەرەوە",labelEmail:"ئیمەیڵ",leaveReviewDescModerated:"باسی کێکەکەت بۆمان بکە. ڕاکان دوای پەسەندکردنی شیرینیخانەکە دەردەکەون.",perm_faq:"پرسیارە باوەکان",perm_reviews:"ڕاکان",reviewRatingLabel:"هەڵسەنگاندنەکەت",reviewSignInNeeded:"تکایە بە Google بچۆ ژوورەوە تا دڵنیا بین ڕاکان لە کڕیارانی ڕاستەقینەوەن.",staffEntryLead:"کەسەکە بە هەژماری Google یان ئیمەیڵی خۆی دەچێتە ژوورەوە. User UIDەکەی لە Firebase Authenticationەوە کۆپی بکە.",staffEntryTitle:"کارمەند",staffLoginLead:"بۆ تیمی شیرینیخانە. دەسەڵات لەلایەن خاوەنی دوکانەوە دەدرێت.",staffLoginLink:"چوونەژوورەوەی کارمەندان",staffLoginTitle:"چوونەژوورەوەی کارمەندان",staffPermsLegend:"ئەو بەشانەی کارمەند دەتوانێت دەستکاری بکات",staffUidLabel:"User UID",trayHeading:"داواکارییەکەت",trayYourOrder:"داواکارییەکەت",trayCloseDetails:"داخستنی وردەکاری داواکاری",trayItemsListLabel:"کاڵاکانی ناو داواکارییەکەت",btnClosePanel:"داخستنی پانێڵی کۆنترۆڵ",colPhone:"مۆبایل"}},We={lang:"en",currency:"USD",category:"all",config:null,products:null,selectedProductId:null,pendingImageData:"",session:null,profile:null,cart:[],orderNote:"",myOrders:[],localOrders:[],approvedReviews:[],staffOrders:[],customers:[],allReviews:[],staffDirectory:[],configSource:"default",syncState:"connecting",checkoutInFlight:!1,appliedPromoCode:"",trayBreakdownOpen:!1,activePanelTab:"brand",authTargetRole:"admin",searchQuery:"",searchDebounceTimer:null,sortOption:"popular",priceRange:"any",historyDetailsOpen:{},selectedStaffCustomerId:null,customerSearchQuery:"",customerSortOption:"lastOrder",draftLogo:null,_logoUrlDebounce:null,generateId(){return"item_"+Date.now()+"_"+Math.floor(Math.random()*1e3)},init(){this.purgeLegacyStorage(),this.loadState(),this.parseUrlHash(),this.applyTheme(this.config.theme.tokens),this.applyFonts(),this.applyPreferences(),this.renderAll(),this.updateFavicon(),this.bindEvents(),this.setupIntersectionObserver(),this.initFirebaseSync(),this.initSession(),window.location.hash==="#staff"&&this.openStaffLogin()},purgeLegacyStorage(){Ol.forEach(t=>{try{localStorage.removeItem(t)}catch{}})},cacheGet(t,e){try{const r=localStorage.getItem(t);return r?JSON.parse(r):e}catch{return e}},cacheSet(t,e){try{return localStorage.setItem(t,JSON.stringify(e)),!0}catch(r){return console.warn("Could not cache",t,r&&r.name),!1}},initFirebaseSync(){if(!Qe()){this.setSyncState("offline");return}this.refreshPublicData(),document.addEventListener("visibilitychange",()=>{document.visibilityState==="visible"&&Date.now()-(this._lastPublicFetch||0)>6e4&&this.refreshPublicData()})},async refreshPublicData(){this._lastPublicFetch=Date.now();const t=await Promise.allSettled([Qa(),Ya(),Ja()]),[e,r,n]=t;if(t.every(o=>o.status==="rejected")){this.reportListenerError("storefront",t[0].reason);return}this.setSyncState("online"),e.status==="fulfilled"?this.applyRemoteConfig(e.value.data,e.value.source):this.reportListenerError("config",e.reason),r.status==="fulfilled"?this.applyRemoteProducts(r.value.list,r.value.empty):this.reportListenerError("products",r.reason),n.status==="fulfilled"?(this.approvedReviews=n.value,this.renderReviews()):this.reportListenerError("reviews",n.reason)},applyRemoteConfig(t,e){if(this.configSource=e,!t)return;const r=this.normalizeConfig(t);JSON.stringify(r)!==JSON.stringify(this.config)&&(this.config=r,this.cacheSet(B.CONFIG,this.config),this.applyTheme(this.config.theme.tokens),this.applyFonts(),this.applyPreferences(),this.renderAll(),this.refreshOpenPanel())},applyRemoteProducts(t,e){e&&!this.cacheGet(B.PRODUCTS_REMOTE,!1)||(e||this.cacheSet(B.PRODUCTS_REMOTE,!0),this.products=t.map(r=>this.normalizeProduct(r)).filter(Boolean),this.cacheSet(B.PRODUCTS,this.products),this.cart=rt(this.cart,this.products),this.persistCart(),this.renderMenu(),this.renderTray(),this.refreshOpenPanel(["products"]))},setSyncState(t){if(this.syncState===t)return;this.syncState=t;const e=document.getElementById("syncNotice");if(!e)return;const r=t==="offline";e.hidden=!r,e.textContent=r?this.t("syncOffline"):""},reportListenerError(t,e){const r=Re(e);r==="offline"?this.setSyncState("offline"):console.warn(`Live updates for ${t} stopped (${r}).`)},refreshOpenPanel(t=null){const e=document.getElementById("panelModal");if(!e||!e.classList.contains("is-open")||t&&!t.includes(this.activePanelTab))return;const r=document.getElementById("panelContent");r&&r.contains(document.activeElement)&&/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)||this.renderPanelTab(this.activePanelTab)},async initSession(t=!1){if(!(this._sessionUnsub&&!t)){this._sessionUnsub&&(this._sessionUnsub(),this._sessionUnsub=null);try{this._sessionUnsub=await tl(e=>this.applySession(e),{force:t})}catch(e){console.warn("Sign-in is unavailable:",e&&e.message),this.applySession(null)}}},applySession(t){t&&t.expired&&(this.showToast(this.t("sessionExpired"),"warning"),hn().catch(()=>{}),t=null);const e=n=>n?`${n.uid}|${n.role}|${n.perms.join(",")}`:"",r=e(t)!==e(this.session);this.session=t,r&&(this.stopPrivateListeners(),t&&this.startPrivateListeners(),this.profile=null,t&&this.loadProfile()),pe(t)||this.closePanelModal(!0),this.updateAuthUI(),this.renderTray(),this.refreshOpenPanel()},async startPrivateListeners(){const t=this.session;if(!t||!Qe()||(await Le(),!(this.session&&this.session.uid===t.uid&&this.session.role===t.role)))return;const r=this._privUnsubs={},n=o=>s=>this.reportListenerError(o,s);r.myOrders=L.watchMyOrders(t.uid,o=>{var s;this.myOrders=o,(s=document.getElementById("historyModal"))!=null&&s.classList.contains("is-open")&&this.renderCustomerHistory()},n("my orders")),pe(t)&&(r.config=L.watchPublicConfig((o,s)=>this.applyRemoteConfig(o,s),n("config")),r.products=L.watchProducts((o,s)=>this.applyRemoteProducts(o,s),n("products")),(re(t,"customers")||re(t,"economy"))&&(r.orders=L.watchRecentOrders(o=>{this.staffOrders=o,this.refreshOpenPanel(["customers"]),this.selectedStaffCustomerId&&this.renderCustomerDrawerContent()},n("orders"))),re(t,"customers")&&(r.customers=L.watchCustomers(o=>{this.customers=o,this.refreshOpenPanel(["customers"])},n("customers"))),re(t,"reviews")&&(r.reviews=L.watchAllReviews(o=>{this.allReviews=o,this.approvedReviews=o.filter(s=>s.status==="approved"),this.renderReviews(),this.refreshOpenPanel(["reviews"])},n("reviews"))),(t.role==="admin"||t.role==="dev")&&(r.staff=L.watchStaffDirectory(o=>{this.staffDirectory=o,this.refreshOpenPanel(["users"])},n("staff directory"))))},stopPrivateListeners(){Object.values(this._privUnsubs||{}).forEach(t=>{try{t()}catch{}}),this._privUnsubs={},this.myOrders=[],this.staffOrders=[],this.customers=[],this.allReviews=[],this.staffDirectory=[],this.selectedStaffCustomerId=null,this.closeCustomerDrawer()},async loadProfile(){const t=this.session;if(t)try{await Le();const e=await L.getProfile(t.uid);this.session&&this.session.uid===t.uid&&(this.profile=e||null,this.prefillCheckoutDetails())}catch(e){console.warn("Profile not loaded:",Re(e))}},loadState(){this.config=this.normalizeConfig(this.cacheGet(B.CONFIG,null)||tt);const t=this.cacheGet(B.PRODUCTS,null),e=Array.isArray(t)?t:kn;this.products=e.map(o=>this.normalizeProduct(o)).filter(Boolean),!this.selectedProductId&&this.products.length>0&&(this.selectedProductId=this.products[0].id,this.pendingImageData=this.products[0].img||""),this.cart=wl(localStorage,this.products);const r=this.cacheGet(B.MY_ORDERS,[]);this.localOrders=Array.isArray(r)?r.slice(0,50):[];const n=this.cacheGet(B.PREF,null);n&&typeof n=="object"&&((n.lang==="en"||n.lang==="ku")&&(this.lang=n.lang),typeof n.currency=="string"&&(this.currency=n.currency),(n.themeMode==="light"||n.themeMode==="dark")&&(this.themeModePref=n.themeMode))},normalizeConfig(t){const e=JSON.parse(JSON.stringify(tt)),r=t&&typeof t=="object"?JSON.parse(JSON.stringify(t)):{},n={...e,...r},o=s=>{n[s]={...e[s],...r[s]&&typeof r[s]=="object"?r[s]:{}}};return["shopName","tagline","announcement","aboutUs","socials"].forEach(o),n.contact={...e.contact,...r.contact||{}},n.contact.address={...e.contact.address,...r.contact&&r.contact.address||{}},n.contact.hours={...e.contact.hours,...r.contact&&r.contact.hours||{}},n.economy={...Se,...r.economy||{}},typeof r.iqdRate=="number"&&r.iqdRate>0&&(!r.economy||!r.economy.exchangeRate)&&(n.economy.exchangeRate=r.iqdRate),n.theme={...e.theme,...r.theme||{}},n.theme.tokens||(n.theme.tokens=(z[n.theme.presetId]||z.berry).tokens),Array.isArray(n.faq)||(n.faq=e.faq),Array.isArray(n.reviews)||(n.reviews=e.reviews),(!n.shopName.en||n.shopName.en==="Sweet Crumb")&&(n.shopName={...e.shopName}),n.kurdishBodyFont=n.kurdishBodyFont||"Vazirmatn",n.kurdishDisplayFont=n.kurdishDisplayFont||"Vazirmatn",n.logoMode||(n.logoMode=n.logoImage?"image":n.logoImageUrl?"url":"emoji"),n.logoEmoji=n.logoEmoji||"🎂",n.logoImage=typeof n.logoImage=="string"?n.logoImage:"",n.logoUrl=typeof n.logoUrl=="string"?n.logoUrl:n.logoImageUrl||"",delete n.users,delete n.updatedAt,delete n.updatedBy,n},normalizeProduct(t){if(!t||typeof t!="object"||!t.id||!t.name)return null;const e=kn.find(r=>r.id===t.id);return{...t,name:{en:t.name.en||"",ku:t.name.ku||""},desc:{en:t.desc&&t.desc.en||"",ku:t.desc&&t.desc.ku||""},unit:{en:t.unit&&t.unit.en||"",ku:t.unit&&t.unit.ku||""},priceUSD:Math.max(0,Number(t.priceUSD)||0),img:typeof t.img=="string"&&t.img.trim()?t.img:e&&e.img||"",exclusions:Array.isArray(t.exclusions)?t.exclusions:null}},configKeysFor(t){return{brand:["shopName","tagline","logoMode","logoEmoji","logoImage","logoUrl","logoImageUrl","announcement"],theme:["theme"],about:["aboutUs"],faq:["faq"],reviews:["reviews"],contact:["contact"],socials:["socials"],economy:["economy","iqdRate"],fonts:["englishBodyFont","englishDisplayFont","kurdishBodyFont","kurdishDisplayFont"],watermark:["showWatermark"]}[t]||[]},async saveConfig(t,{quiet:e=!1,config:r=this.config}={}){var i,a;let n=this.configKeysFor(t);this.configSource!=="public"&&(((i=this.session)==null?void 0:i.role)==="admin"||((a=this.session)==null?void 0:a.role)==="dev")&&(n=Object.keys({brand:1,theme:1,about:1,faq:1,reviews:1,contact:1,socials:1,economy:1,fonts:1}).flatMap(c=>this.configKeysFor(c)),this.session.role==="dev"&&n.push("showWatermark"));const o={};n.forEach(c=>{r[c]!==void 0&&(o[c]=r[c])});const s=await this.runWrite(()=>{var c;return L.savePublicConfig(o,(c=this.session)==null?void 0:c.uid)},{quiet:e});return s&&(this.configSource="public"),s},async commitConfig(t,e,{quiet:r=!1}={}){const n=JSON.parse(JSON.stringify(this.config)),o=e(n);if(o)return this.showToast(o,"error"),!1;const s=await this.saveConfig(t,{quiet:r,config:n});return s&&(this.config=this.normalizeConfig(n),this.cacheSet(B.CONFIG,this.config),this.renderAll()),s},async runWrite(t,{quiet:e=!1,successMsg:r=null}={}){if(!this.session)return this.showToast(this.t("saveNeedsSignIn"),"error"),!1;if(!Qe())return this.showToast(this.t("saveOffline"),"error"),!1;this.setPanelStatus("saving");try{return await Le(),await t(),this.setPanelStatus("saved"),e||this.showToast(r||this.t("toastSaved"),"success"),!0}catch(n){const o=Re(n);this.setPanelStatus("failed");const s={denied:"saveDenied",offline:"saveOffline",invalid:"saveInvalid"}[o]||"saveFailed";return this.showToast(this.t(s),"error"),console.warn("Write failed:",o,n&&n.code),!1}},setPanelStatus(t){const e=document.getElementById("panelSaveStatus");if(!e)return;const r={saving:this.t("statusSaving"),saved:this.t("statusSaved"),failed:this.t("statusFailed")};e.textContent=r[t]||"",e.dataset.state=t},async saveProduct(t,e={}){return this.runWrite(()=>{var r;return L.saveProduct(t,(r=this.session)==null?void 0:r.uid)},e)},persistCart(){El(localStorage,this.cart)},savePref(){this.cacheSet(B.PREF,{lang:this.lang,currency:this.currency,themeMode:this.themeModePref||null})},t(t){return(Ft[this.lang]||Ft.en)[t]||Ft.en[t]||t},esc(t){return String(t??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},getEconomy(){return this._draftEconomy||this.config&&this.config.economy||Se},formatPrice(t,e=null){var n;const r=cl(t,this.getEconomy(),e||this.currency,((n=this.config)==null?void 0:n.iqdRate)||No);return this.lang==="ku"?"⁦"+r+"⁩":r},setLanguage(t){this.lang!==t&&(this.lang=t,this.savePref(),this.applyPreferences(),this.renderAll())},setCurrency(t){this.currency!==t&&(this.currency=t,this.savePref(),this.applyPreferences(),this.renderMenu(),this.renderTray())},applyPreferences(){const t=document.documentElement,e=this.lang==="ku";t.dir=e?"rtl":"ltr",t.lang=e?"ckb":"en",this.applyFonts();const r=this.getEconomy(),n=r.showSecondary!==!1&&r.secondaryCurrency&&r.secondaryCurrency!=="None";!n&&this.currency!=="USD"&&(this.currency="USD");const o=document.getElementById("headerCurrencySwitcher");o&&(o.style.display=n?"inline-flex":"none");const s=document.getElementById("mobileCurrencySwitcher");s&&(s.style.display=n?"inline-flex":"none"),this.currency!=="USD"&&n?document.body.classList.add("cur-secondary","cur-iqd"):document.body.classList.remove("cur-secondary","cur-iqd"),["btnLangEn","btnLangEnMobile"].forEach(c=>{const d=document.getElementById(c);d&&d.classList.toggle("is-active",!e)}),["btnLangKu","btnLangKuMobile"].forEach(c=>{const d=document.getElementById(c);d&&d.classList.toggle("is-active",e)});const i=r.currencySymbol||(r.secondaryCurrency==="IQD"?"د.ع":r.secondaryCurrency),a=`${r.secondaryCurrency} ${i}`;["btnCurIqd","btnCurIqdMobile"].forEach(c=>{const d=document.getElementById(c);d&&(d.textContent=a,d.classList.toggle("is-active",this.currency!=="USD"))}),["btnCurUsd","btnCurUsdMobile"].forEach(c=>{const d=document.getElementById(c);d&&d.classList.toggle("is-active",this.currency==="USD")}),this.updatePriceFilterLabels()},renderAll(){this.renderI18nStatic(),this.renderBranding(),this.renderMenu(),this.renderTray(),this.updateAuthUI(),this.renderWatermark(),this.renderFAQ(),this.renderReviews()},renderFAQ(){const t=document.getElementById("faqWrap"),e=document.getElementById("faq");if(!t||!e)return;const r=this.lang==="ku",n=this.config&&Array.isArray(this.config.faq)?this.config.faq:[];e.style.display=n.length===0?"none":"block";const o=s=>r&&(s==null?void 0:s.ku)||(s==null?void 0:s.en)||"";t.innerHTML=n.map(s=>`
      <details class="faq-item">
        <summary class="faq-summary">${u(o(s.q))}</summary>
        <div class="faq-content">${fn(o(s.a))}</div>
      </details>
    `).join("")},renderReviews(){const t=document.getElementById("reviewsGrid"),e=document.getElementById("reviews");if(!t||!e)return;const r=this.lang==="ku",n=a=>r&&(a==null?void 0:a.ku)||(a==null?void 0:a.en)||"",o=(this.config&&this.config.reviews||[]).map(a=>({initials:a.initials,name:n(a.name),role:n(a.role),quote:n(a.quote),rating:5})),i=[...(this.approvedReviews||[]).map(a=>({initials:this.initialsFor(a.name),name:a.name,role:this.t("reviewVerifiedRole"),quote:a.text,rating:Number.isInteger(a.rating)?a.rating:5})),...o];t.innerHTML=i.length===0?`<p class="reviews-empty">${u(this.t("reviewsEmpty"))}</p>`:i.map(a=>`
      <figure class="review-card">
        <div class="stars" role="img" aria-label="${u(this.t("reviewStarsLabel").replace("{n}",a.rating))}">${"★".repeat(a.rating)}${"☆".repeat(5-a.rating)}</div>
        <blockquote class="review__quote">${u(a.quote)}</blockquote>
        <figcaption class="review__author">
          <div class="review__avatar" aria-hidden="true">${u(String(a.initials||"").slice(0,2))}</div>
          <div>
            <strong class="review__name">${u(a.name)}</strong>
            <span class="text-small review__role">${u(a.role)}</span>
          </div>
        </figcaption>
      </figure>
    `).join(""),e.style.display="block"},initialsFor(t){const e=String(t||"").trim().split(/\s+/).filter(Boolean);return e.length>1?(e[0][0]+e[e.length-1][0]).toUpperCase():(e[0]||"?").slice(0,2).toUpperCase()},renderI18nStatic(){document.querySelectorAll("[data-i18n]").forEach(t=>{const e=this.t(t.getAttribute("data-i18n"));e&&(e.includes("<")&&e.includes(">")?t.innerHTML=pn(e):t.textContent=e)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(t=>{const e=this.t(t.getAttribute("data-i18n-placeholder"));e&&t.setAttribute("placeholder",e)}),document.querySelectorAll("[data-i18n-aria]").forEach(t=>{const e=this.t(t.getAttribute("data-i18n-aria"));e&&t.setAttribute("aria-label",e)})},updatePriceFilterLabels(){const t=document.getElementById("menuPriceSelect");if(t){const e=t.querySelector('option[value="under-20"]'),r=t.querySelector('option[value="20-40"]'),n=t.querySelector('option[value="40-60"]'),o=t.querySelector('option[value="over-60"]'),s=this.lang==="ku",i=a=>this.formatPrice(a).replace(/\.00(?=\u2069?$)/,"");e&&(e.textContent=s?`کەمتر لە ${i(20)}`:`Under ${i(20)}`),r&&(r.textContent=`${i(20)} – ${i(40)}`),n&&(n.textContent=`${i(40)} – ${i(60)}`),o&&(o.textContent=s?`زیاتر لە ${i(60)}`:`Over ${i(60)}`)}},normalizeKurdish(t){return fr(t)},highlightMatch(t,e){return Nt(t,e)},handleSearchInput(t){clearTimeout(this.searchDebounceTimer);const e=document.getElementById("menuSearchClear");e&&(e.style.display=t.trim()?"block":"none"),this.searchDebounceTimer=setTimeout(()=>{this.searchQuery=t,this.updateUrlHash(),this.renderMenu(!1)},150)},clearSearch(){this.searchQuery="";const t=document.getElementById("menuSearchInput");t&&(t.value="");const e=document.getElementById("menuSearchClear");e&&(e.style.display="none"),this.updateUrlHash(),this.renderMenu(!1)},clearAllFilters(){this.searchQuery="",this.category="all",this.sortOption="popular",this.priceRange="any";const t=document.getElementById("menuSearchInput");t&&(t.value="");const e=document.getElementById("menuSearchClear");e&&(e.style.display="none");const r=document.getElementById("menuSortSelect");r&&(r.value="popular");const n=document.getElementById("menuPriceSelect");n&&(n.value="any");const o=document.getElementById("mobileCategorySelect");o&&(o.value="all"),["all","cakes","cupcakes","desserts"].forEach(s=>{const i=document.getElementById(`filter-${s}`);i&&i.classList.toggle("is-active",s==="all")}),this.updateUrlHash(),this.renderMenu(!1)},setSort(t){this.sortOption=t;const e=document.getElementById("menuSortSelect");e&&(e.value=t),this.updateUrlHash(),this.renderMenu(!0)},setPriceRange(t){this.priceRange=t;const e=document.getElementById("menuPriceSelect");e&&(e.value=t),this.updateUrlHash(),this.renderMenu(!1)},setCategory(t){this.category=t,["all","cakes","cupcakes","desserts"].forEach(r=>{const n=document.getElementById(`filter-${r}`);n&&(n.classList.toggle("is-active",r===t),n.setAttribute("aria-pressed",r===t?"true":"false"))});const e=document.getElementById("mobileCategorySelect");e&&(e.value=t),this.updateUrlHash(),this.renderMenu(!1)},parseUrlHash(){const t=gl(window.location.hash);this.searchQuery=t.q,this.category=t.cat,this.sortOption=t.sort,this.priceRange=t.range;const e=document.getElementById("menuSearchInput");e&&(e.value=this.searchQuery);const r=document.getElementById("menuSearchClear");r&&(r.style.display=this.searchQuery?"block":"none");const n=document.getElementById("menuSortSelect");n&&(n.value=this.sortOption);const o=document.getElementById("menuPriceSelect");o&&(o.value=this.priceRange);const s=document.getElementById("mobileCategorySelect");s&&(s.value=this.category),["all","cakes","cupcakes","desserts"].forEach(i=>{const a=document.getElementById(`filter-${i}`);a&&(a.classList.toggle("is-active",i===this.category),a.setAttribute("aria-pressed",i===this.category?"true":"false"))})},updateUrlHash(){const t=yl({q:this.searchQuery,cat:this.category,sort:this.sortOption,range:this.priceRange});window.location.hash!==t&&history.replaceState(null,"",t)},renderMenu(t=!1){const e=document.getElementById("menuGrid");if(!e)return;const r=this.lang==="ku",n=d=>r&&(d==null?void 0:d.ku)||(d==null?void 0:d.en)||"",o=(this.searchQuery||"").trim(),s=ul(o);let i=this.products.filter(d=>(this.category==="all"||d.category===this.category)&&vl(d.priceUSD,this.priceRange)&&dl(d,s));const a=d=>(l,g)=>(g.tag===d?1:0)-(l.tag===d?1:0);this.sortOption==="popular"?i.sort(a("bestseller")):this.sortOption==="newest"?i.sort(a("new")):this.sortOption==="price-asc"?i.sort((d,l)=>d.priceUSD-l.priceUSD):this.sortOption==="price-desc"?i.sort((d,l)=>l.priceUSD-d.priceUSD):this.sortOption==="name-asc"&&i.sort((d,l)=>n(d.name).localeCompare(n(l.name)));const c=document.getElementById("menuResultsCount");if(c&&(c.textContent=this.t("searchResultsCount").replace("{shown}",i.length).replace("{total}",this.products.length)),i.length===0){const d=this.products.length===0?this.t("menuNoProducts"):o?this.t("searchNoResults").replace("{query}",o):this.t("searchNoResults").replace('"{query}"',"").replace("{query}","");e.innerHTML=`
        <div class="menu-empty-state">
          <div class="menu-empty-icon" aria-hidden="true">🍰</div>
          <h3 class="menu-empty-title">${u(d)}</h3>
          ${this.products.length?`<p class="menu-empty-desc">${u(this.t("searchEmptyDesc"))}</p>
          <div class="menu-empty-actions">
            ${o?`<button type="button" class="btn btn--secondary btn--sm" onclick="app.clearSearch()">${u(this.t("searchClearSearch"))}</button>`:""}
            <button type="button" class="btn btn--primary btn--sm" onclick="app.clearAllFilters()">${u(this.t("searchClearAll"))}</button>
          </div>`:""}
        </div>
      `;return}e.innerHTML=i.map((d,l)=>{const g=n(d.name),E=o?Nt(g,o):u(g),S=o?Nt(n(d.desc),o):u(n(d.desc)),I=u(n(d.unit)),w=u(this.formatPrice(d.priceUSD)),k=u(d.emoji||"🎂");let P="";d.tag==="bestseller"?P=`<span class="cake__tag cake__tag--bestseller">${u(this.t("tagBestseller"))}</span>`:d.tag==="new"&&(P=`<span class="cake__tag cake__tag--new">${u(this.t("tagNew"))}</span>`);const C=he(d.img,{allowDataImage:!0}),D=C?`<img src="${u(C)}" ${Bt(C)?`srcset="${u(Bt(C))}" sizes="(max-width: 560px) 50vw, (max-width: 1100px) 33vw, 300px"`:""} alt="${u(g)}" loading="lazy" decoding="async" width="800" height="600" referrerpolicy="no-referrer" class="cake-card__img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex';" /><div class="cake-card__emoji" style="display:none;" aria-hidden="true">${k}</div>`:`<div class="cake-card__emoji" aria-hidden="true">${k}</div>`,R=t?"cake-card-animate":"",N=t?`style="--stagger:${l%12};"`:"",T="product-"+String(d.id).replace(/[^A-Za-z0-9_-]/g,"_");return`
        <article class="cake-card ${R}" id="${u(T)}" ${N}>
          <div class="cake-card__media">
            ${D}
            ${P}
            <span class="cake-card__count" data-count-for="${u(d.id)}" hidden></span>
          </div>
          <div class="cake-card__body">
            <h3 class="cake-card__title">${E}</h3>
            <p class="cake-card__desc">${S}</p>
            <div class="cake-card__footer">
              <div class="price-wrap">
                <span class="price">${w}</span>
                <span class="price-unit">${I}</span>
              </div>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.openCustomizeModal(${j(d.id)})" aria-label="${u(this.t("btnAdd")+": "+g)}">
                ${u(this.t("btnAdd"))}
              </button>
            </div>
          </div>
        </article>
      `}).join(""),this.syncMenuOrderState()},syncMenuOrderState(){const t=new Map;for(const e of this.cart||[])e.qty>0&&t.set(e.productId,(t.get(e.productId)||0)+e.qty);document.querySelectorAll(".cake-card__count[data-count-for]").forEach(e=>{const r=t.get(e.dataset.countFor)||0,n=e.closest(".cake-card");n&&n.classList.toggle("is-in-order",r>0),e.hidden=r===0,e.textContent=r>0?this.t("inOrderCount").replace("{n}",r):""})},getShopName(){return!this.config||!this.config.shopName?"Yummy Sweets":this.lang==="ku"?this.config.shopName.ku||this.config.shopName.en:this.config.shopName.en},resolveLogoSrc(){const t=this.config;if(!t)return null;const e=t.logoMode||(t.logoImage?"image":t.logoImageUrl?"url":"emoji");return e==="image"&&t.logoImage?he(t.logoImage,{allowDataImage:!0})||null:e==="url"&&he(t.logoUrl||t.logoImageUrl)||null},updateFavicon(){const t=this.resolveLogoSrc();let e=document.querySelector('link[rel="icon"]');if(e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),t)e.href=t;else{const n=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#8E3B4A"/><text x="32" y="46" font-size="38" text-anchor="middle">${u(Array.from(this.config&&this.config.logoEmoji||"🎂").slice(0,4).join(""))}</text></svg>`;e.href="data:image/svg+xml;utf8,"+encodeURIComponent(n)}},renderLogoElements(){const t=this.resolveLogoSrc(),e=this.config&&this.config.logoEmoji||"🎂",r=this.getShopName();document.querySelectorAll("[data-logo]").forEach(n=>{n.style.opacity="0",setTimeout(()=>{if(n.textContent="",t){const o=document.createElement("img");o.src=t,o.alt=r,o.className="logo__img",o.onerror=()=>{n.textContent=e},n.appendChild(o)}else n.textContent=e;n.style.opacity="1"},50)})},announcementHtml(){const t=this.config,e=this.lang==="ku"&&t.announcement.ku||t.announcement.en||"",r=this.getEconomy(),n=Math.max(0,Number(r.freeDeliveryOver)||0),o=this.formatPrice(n).replace(/\.00(?=\u2069?$)/,"");let s=pn(e.replace(/\{freeDelivery\}/g,o));return s=s.replace(/\$50(?![0-9])/g,u(o)),s},updateStructuredData(t){var o,s;const e=document.getElementById("ldJson");if(!e)return;const r=((o=document.querySelector('meta[name="description"]'))==null?void 0:o.content)||"",n=((s=document.querySelector('link[rel="canonical"]'))==null?void 0:s.href)||"";e.textContent=JSON.stringify(Vo(this.config,{name:t,description:r,url:n}))},renderBranding(){const t=this.config,e=this.lang==="ku",r=T=>e&&(T==null?void 0:T.ku)||(T==null?void 0:T.en)||"",n=(T,f)=>{const h=document.getElementById(T);h&&(h.textContent=f)},o=this.getShopName(),s=r(t.tagline);document.title=`${o} — ${s}`,this.updateStructuredData(o),["headerShopName","footerShopName","mobileShopName","copyrightName"].forEach(T=>n(T,o)),n("copyrightYear",new Date().getFullYear()),n("headerShopTagline",s),this.renderLogoElements(),this.updateFavicon();const i=document.getElementById("announcementText");i&&(i.innerHTML=this.announcementHtml());const a=document.getElementById("announcementBar");a&&(a.hidden=!il(r(t.announcement)).trim()),n("storyText",r(t.aboutUs));const c=e?t.aboutUs.eyebrowKu||t.aboutUs.eyebrowEn||"کەلەپووری ئێمە":t.aboutUs.eyebrowEn||"Our Heritage",d=e?t.aboutUs.titleKu||t.aboutUs.titleEn||"بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە":t.aboutUs.titleEn||"Crafted with patience, baked with devotion",l=document.querySelector('[data-i18n="storyEyebrow"]');l&&(l.textContent=c);const g=document.querySelector('[data-i18n="storyTitle"]');g&&(g.textContent=d);const E=document.querySelector(".story__img"),S=he(t.aboutUs.imageUrl);if(E&&S&&E.getAttribute("src")!==S){E.src=S;const T=Bt(S,[480,720,900]);T?E.srcset=T:E.removeAttribute("srcset")}n("infoAddress",r(t.contact.address));const I=r(t.contact.hours);["infoHours","footerHours"].forEach(T=>{const f=document.getElementById(T);f&&(f.innerHTML=fn(I))});const w=_e(t.contact.whatsapp),k=String(t.contact.phone||"").trim(),P=String(t.contact.email||"").trim(),C=document.getElementById("infoContact");if(C){const T=[];w&&T.push(`<a href="https://wa.me/${w}" target="_blank" rel="noopener noreferrer" dir="ltr">WhatsApp: +${w}</a>`),P&&T.push(`<a href="mailto:${u(P)}" dir="ltr">${u(P)}</a>`),k&&T.push(`<a href="tel:${u(k.replace(/[^\d+]/g,""))}" dir="ltr">${u(k)}</a>`),C.innerHTML=T.length?T.join("<br>"):u(this.t("contactNotSet"))}const D=document.getElementById("footerPhone"),R=document.getElementById("footerPhoneRow");D&&(D.textContent=k||(w?"+"+w:""),D.href=k?"tel:"+k.replace(/[^\d+]/g,""):w?"https://wa.me/"+w:"#"),R&&(R.hidden=!(k||w));const N=t.socials||{};[["socialInsta",N.instagram],["socialFb",N.facebook],["socialTiktok",N.tiktok],["socialSnap",N.snapchat]].forEach(([T,f])=>{const h=document.getElementById(T);if(!h)return;const m=he(f),y=/^https?:\/\//i.test(m);h.href=y?m:"#",h.style.display=y?"":"none"})},addToOrder(t,e=[]){this.products.some(r=>r.id===t)&&(this.cart=gn(this.cart,t,e),this.persistCart(),this.clearSentNotice(),this.renderTray(),this.syncMenuOrderState(),this.showToast(this.t("toastAdded"),"success"))},changeCartQty(t,e){this.cart=_l(this.cart,t,e),this.persistCart(),this.clearSentNotice(),this.renderTray(),this.syncMenuOrderState(),this.focusCartLine(t)},removeCartLine(t){const e=Lt(this.cart.filter(o=>o.id===t),this.products,this.lang)[0];this.cart=xo(this.cart,t),this.persistCart(),this.clearSentNotice(),this.renderTray(),this.syncMenuOrderState(),e&&this.announce(this.t("cartItemRemoved").replace("{name}",e.name));const r=document.getElementById("trayLines"),n=r&&r.querySelector("button");n&&n.focus()},focusCartLine(t){const e=document.querySelector(`#trayLines [data-line="${CSS.escape(t)}"]`);if(e){const r=e.querySelector("[data-qty-action]");r&&r.focus()}else{const r=document.querySelector("#trayLines button");r&&r.focus()}},openCustomizeModal(t){var a;const e=this.products.find(c=>c.id===t);if(!e)return;if(!e.exclusions||e.exclusions.length===0){this.addToOrder(t);return}const r=this.lang==="ku",n=c=>r&&(c==null?void 0:c.ku)||(c==null?void 0:c.en)||"",o=document.activeElement;(a=document.getElementById("customizeModal"))==null||a.remove();const s=document.createElement("div");s.className="modal-overlay",s.id="customizeModal",s.setAttribute("role","dialog"),s.setAttribute("aria-modal","true"),s.setAttribute("aria-labelledby","customizeTitle"),s.innerHTML=`
      <div class="modal-window modal-window--narrow">
        <div class="modal-header">
          <h3 class="modal-title" id="customizeTitle">${u(this.t("customizeTitle")||"Customize")}</h3>
          <button type="button" class="modal-close" data-close aria-label="${u(this.t("btnClose"))}">✕</button>
        </div>
        <div class="modal-body">
          <p class="customize-product">${u(n(e.name))}</p>
          <fieldset class="customize-options">
            <legend>${u(this.t("customizeLeaveOut")||"Leave out")}</legend>
            ${e.exclusions.map(c=>`
              <label class="customize-option">
                <input type="checkbox" value="${u(c.id)}" />
                <span>${u(n(c))}</span>
              </label>`).join("")}
          </fieldset>
          <div class="modal-actions">
            <button type="button" class="btn btn--ghost" data-skip>${u(this.t("customizeSkip")||"Add as is")}</button>
            <button type="button" class="btn btn--primary" data-add>${u(this.t("customizeAdd")||"Add to order")}</button>
          </div>
        </div>
      </div>`,document.body.appendChild(s);const i=()=>{this.closeDialog("customizeModal"),s.remove()};s.querySelector("[data-close]").onclick=i,s.querySelector("[data-skip]").onclick=()=>{i(),this.addToOrder(t)},s.querySelector("[data-add]").onclick=()=>{const c=[...s.querySelectorAll("input:checked")].map(d=>d.value);i(),this.addToOrder(t,c)},s.addEventListener("click",c=>{c.target===s&&i()}),this.openDialog("customizeModal",o,{onEscape:i})},async clearOrder(){this.cart.length===0||!await this.confirmDialog({title:this.t("cartClearTitle"),message:this.t("cartClearConfirm"),okLabel:this.t("trayClear"),danger:!0})||(this.resetCart(),this.showToast(this.t("toastOrderCleared")))},resetCart(){this.cart=[],this.orderNote="";const t=document.getElementById("trayOrderNote");t&&(t.value=""),this.appliedPromoCode="",this.trayBreakdownOpen=!1,this.persistCart(),this.clearSentNotice(),this.renderTray(),this.syncMenuOrderState()},computeCartBreakdown(t=0,e=null,r=null){const n=r||this.getEconomy(),o=e!==null?e:this.appliedPromoCode||"";return Do(t,n,o)},toggleTrayBreakdown(t=null){this.trayBreakdownOpen=t===null?!this.trayBreakdownOpen:!!t;const e=document.getElementById("trayBreakdown"),r=document.getElementById("orderTray"),n=document.getElementById("trayToggleLabel");e&&(e.hidden=!this.trayBreakdownOpen),r&&r.classList.toggle("is-expanded",this.trayBreakdownOpen),document.querySelectorAll('[aria-controls="trayBreakdown"]').forEach(o=>o.setAttribute("aria-expanded",this.trayBreakdownOpen?"true":"false")),n&&(n.textContent=this.trayBreakdownOpen?this.t("trayDetailsClose"):this.t("trayDetails")),this.trayBreakdownOpen&&this.prepareFulfillmentInput()},applyCartPromo(){const t=document.getElementById("trayPromoInput");if(!t)return;const e=document.getElementById("trayPromoFeedback"),r=Po(this.getEconomy(),t.value);if(r.status!=="empty"){if(r.status!=="valid"){const n=r.status==="expired"?this.t("promoExpired"):this.t("invalidPromo");e&&(e.textContent=n,e.dataset.state="error"),t.setAttribute("aria-invalid","true");return}this.appliedPromoCode=r.code,this.showToast(this.t("promoApplied").replace("{code}",r.code),"success"),this.renderTray()}},removeCartPromo(){this.appliedPromoCode="",this.renderTray(),this.showToast(this.t("promoRemoved"),"info")},renderTray(){const t=document.getElementById("orderTray");if(!t)return;const e=Lt(this.cart,this.products,this.lang),r=Il(e),n=er(e);if(document.body.classList.toggle("has-order-tray",r>0),this.syncMenuOrderState(),r===0){t.classList.remove("is-visible","is-expanded"),this.trayBreakdownOpen=!1;const w=document.getElementById("trayBreakdown");w&&(w.hidden=!0);return}t.classList.add("is-visible");const o=this.computeCartBreakdown(n),s=(w,k)=>{const P=document.getElementById(w);P&&(P.textContent=k)};s("trayItemCount",r),s("trayTotalPrice",this.formatPrice(o.total)),s("trayPreviewText",e.map(w=>`${w.qty}× ${w.name}`).join(", "));const i=document.getElementById("trayItemCount");i&&i.setAttribute("aria-label",this.t("trayItemsLabel").replace("{n}",r));const a=document.getElementById("trayFreeDeliveryBadge");a&&(a.hidden=!(o.isFreeDelivery&&!o.isPickupOnly));const c=document.getElementById("trayOrderNote");c&&c.value!==this.orderNote&&(c.value=this.orderNote||"");const d=document.getElementById("trayLines");d&&(d.innerHTML=e.map(w=>`
        <li class="tray-line" data-line="${u(w.id)}">
          <div class="tray-line__info">
            <span class="tray-line__name">${u(w.name)}</span>
            ${w.excludeLabels.length?`<span class="tray-line__custom">${u(this.t("waExclude")||"No")} ${u(w.excludeLabels.join(", "))}</span>`:""}
            <span class="tray-line__unit">${u(this.t("cartEach").replace("{price}",this.formatPrice(w.unitPriceUSD)))}</span>
          </div>
          <div class="tray-line__qty" role="group" aria-label="${u(this.t("cartQtyLabel").replace("{name}",w.name))}">
            <button type="button" class="qty-btn" data-qty-action="dec" onclick="app.changeCartQty(${j(w.id)}, -1)" aria-label="${u(this.t("cartDecrease").replace("{name}",w.name))}">−</button>
            <output class="qty-value" aria-live="polite">${w.qty}</output>
            <button type="button" class="qty-btn" data-qty-action="inc" onclick="app.changeCartQty(${j(w.id)}, 1)" aria-label="${u(this.t("cartIncrease").replace("{name}",w.name))}" ${w.qty>=99?"disabled":""}>+</button>
          </div>
          <span class="tray-line__total">${u(this.formatPrice(w.lineTotalUSD))}</span>
          <button type="button" class="tray-line__remove" onclick="app.removeCartLine(${j(w.id)})" aria-label="${u(this.t("cartRemove").replace("{name}",w.name))}">✕</button>
        </li>`).join(""));const l=document.getElementById("btnTrayWhatsApp"),g=document.getElementById("trayMinOrderNotice");if(o.minOrderMet)l&&(l.disabled=!1,l.classList.remove("is-disabled"),l.removeAttribute("title")),g&&(g.hidden=!0,g.textContent="");else{const w=this.t("minimumOrderWarning").replace("{amount}",this.formatPrice(o.minOrder)).replace("{remaining}",this.formatPrice(o.minOrderRemaining));l&&(l.disabled=!0,l.classList.add("is-disabled"),l.title=w),g&&(g.hidden=!1,g.textContent=w)}const E=document.getElementById("trayBreakdownLines");if(E){const w=(P,C,D="")=>`<div class="tray-breakdown-row ${D}"><span>${u(P)}</span><span>${u(C)}</span></div>`;let k=w(this.t("subtotal"),this.formatPrice(o.subtotal));o.discount>0&&(k+=w(`${this.t("discount")} (${o.promoCodeName})`,"−"+this.formatPrice(o.discount),"tray-breakdown-row--discount")),o.isPickupOnly?k+=w(this.t("economyDelivery"),this.t("pickupOnlyLabel")):o.isFreeDelivery?k+=w(this.t("deliveryFee"),this.t("freeDelivery"),"tray-breakdown-row--free"):k+=w(this.t("deliveryFee"),this.formatPrice(o.delivery)),o.tax>0?k+=w(`${this.t("tax")} (${o.taxLabel} ${o.taxRate}%)`,"+"+this.formatPrice(o.tax)):o.taxEnabled&&o.taxIncluded&&o.taxRate>0&&(k+=w(`${o.taxLabel} ${o.taxRate}%`,this.t("taxIncludedLabel"))),k+=w(this.t("total"),this.formatPrice(o.total),"tray-breakdown-row--total"),E.innerHTML=k}const S=document.getElementById("trayPromoArea");if(S){const w=!!String(this.getEconomy().promoCode||"").trim();S.hidden=!w&&!o.promoValid,o.promoValid?S.innerHTML=`
          <div class="tray-promo-applied">
            <span>✓ ${u(this.t("promoApplied").replace("{code}",o.promoCodeName))}</span>
            <button type="button" class="tray-btn tray-btn--quiet tray-btn--small" onclick="app.removeCartPromo()">${u(this.t("trayRemovePromo"))}</button>
          </div>`:document.getElementById("trayPromoInput")||(S.innerHTML=`
          <label class="tray-field__label" for="trayPromoInput">${u(this.t("trayPromoPlaceholder"))}</label>
          <div class="tray-promo-row">
            <input type="text" id="trayPromoInput" class="tray-promo-input" maxlength="20" autocomplete="off" aria-describedby="trayPromoFeedback" onkeydown="if(event.key==='Enter'){event.preventDefault();app.applyCartPromo();}" />
            <button type="button" class="tray-btn tray-btn--quiet tray-btn--small" id="btnApplyPromo" onclick="app.applyCartPromo()">${u(this.t("trayApplyPromo"))}</button>
          </div>
          <div id="trayPromoFeedback" class="tray-promo-feedback" role="status"></div>`)}const I=document.getElementById("trayGuestNotice");I&&(I.hidden=!!this.session)},prepareFulfillmentInput(){const t=document.getElementById("trayFulfillmentDate");if(!t)return;const e=et(this.getEconomy()),r=Ro(new Date,e);t.min=kl(r);const n=document.getElementById("trayDateHint");n&&(n.textContent=this.t("trayDateHint").replace("{hours}",e).replace("{date}",Ne(r,this.lang))),this.prefillCheckoutDetails()},prefillCheckoutDetails(){const t=this.cacheGet(B.GUEST,null)||{},e={name:this.profile&&this.profile.name||t.name||this.session&&this.session.name||"",phone:this.profile&&this.profile.phone||t.phone||this.session&&this.session.phone||"",address:this.profile&&this.profile.address||t.address||""};[["trayCustName","name"],["trayCustPhone","phone"],["trayCustAddress","address"]].forEach(([n,o])=>{const s=document.getElementById(n);s&&!s.value&&e[o]&&(s.value=e[o])});const r=document.getElementById("trayRememberDetails");r&&t.name&&(r.checked=!0)},setCheckoutError(t,e=null){const r=document.getElementById("trayCheckoutError");if(r&&(r.textContent=t||"",r.hidden=!t),document.querySelectorAll('#trayBreakdown [aria-invalid="true"]').forEach(n=>n.removeAttribute("aria-invalid")),e){const n=document.getElementById(e);n&&(n.setAttribute("aria-invalid","true"),n.focus())}},clearSentNotice(){const t=document.getElementById("traySentNotice");t&&(t.hidden=!0),this.lastSentSignature=null},async checkoutWhatsApp(){var k,P,C,D;if(this.checkoutInFlight)return;const t=Lt(this.cart,this.products,this.lang);if(t.length===0)return;const e=this.getEconomy(),r=this.computeCartBreakdown(er(t));if(this.trayBreakdownOpen||this.toggleTrayBreakdown(!0),this.setCheckoutError(""),!r.minOrderMet){this.setCheckoutError(this.t("minimumOrderWarning").replace("{amount}",this.formatPrice(r.minOrder)).replace("{remaining}",this.formatPrice(r.minOrderRemaining)));return}const n=(((k=document.getElementById("trayCustName"))==null?void 0:k.value)||"").trim(),o=(((P=document.getElementById("trayCustPhone"))==null?void 0:P.value)||"").trim(),s=(((C=document.getElementById("trayCustAddress"))==null?void 0:C.value)||"").trim();if(!n){this.setCheckoutError(this.t("checkoutNeedName"),"trayCustName");return}const i=((D=document.getElementById("trayFulfillmentDate"))==null?void 0:D.value)||"",a=Tl(i,new Date,et(e));if(!a.ok){const R={missing:"checkoutNeedDate",invalid:"checkoutBadDate","too-soon":"checkoutDateTooSoon","too-far":"checkoutDateTooFar"}[a.error],N=this.t(R).replace("{hours}",et(e)).replace("{date}",a.earliest?Ne(a.earliest,this.lang):"");this.setCheckoutError(N,"trayFulfillmentDate");return}const c=_e(this.config.contact.whatsapp);if(!c){this.setCheckoutError(this.t("checkoutNoWhatsApp"));return}const d=JSON.stringify([this.cart,i,n]);if(this.lastSentSignature===d&&!await this.confirmDialog({title:this.t("checkoutAgainTitle"),message:this.t("checkoutAgainConfirm"),okLabel:this.t("checkoutAgainOk")}))return;const l=document.getElementById("trayRememberDetails");if(l&&l.checked)this.cacheSet(B.GUEST,{name:n,phone:o,address:s});else if(l)try{localStorage.removeItem(B.GUEST)}catch{}const g="YS-"+Date.now().toString(36).toUpperCase().slice(-6),E=R=>this.formatPrice(R),S=Mo({lang:this.lang,shopName:this.getShopName(),lines:t,breakdown:r,fmt:E,customer:{name:n,phone:o,address:s},fulfillmentText:Ne(a.date,this.lang),note:(this.orderNote||"").trim(),orderRef:g}),I=kr(c,S),w=window.open(I,"_blank");if(w)try{w.opener=null}catch{}this.lastSentSignature=d,this.showSentNotice(I,!!w),this.checkoutInFlight=!0;try{const R=Pl({customerId:this.session?this.session.uid:"guest",customer:{name:n,phone:o,address:s},lines:t,eco:e,promoCode:this.appliedPromoCode,currency:this.currency,fulfillmentAt:a.date,note:this.orderNote,lang:this.lang,ref:g});if(this.localOrders=[{id:g,ref:g,items:R.items,totals:R.totals,fulfillmentAt:a.date.getTime(),note:R.note,status:"sent",createdAt:Date.now()},...this.localOrders].slice(0,50),this.cacheSet(B.MY_ORDERS,this.localOrders),this.session&&Qe()){const N=Dl(R);if(N.length)throw Object.assign(new Error("invalid order: "+N.join(",")),{code:"invalid-argument"});await Le(),await L.createOrder(R),this.announce(this.t("orderSavedToHistory"))}}catch(R){console.warn("Order not saved to history:",Re(R)),this.showToast(this.t("orderHistorySaveFailed"),"warning")}finally{this.checkoutInFlight=!1,this.updateAuthUI()}},showSentNotice(t,e){const r=document.getElementById("traySentNotice");if(!r)return;const n=document.getElementById("traySentText");n&&(n.textContent=e?this.t("checkoutOpened"):this.t("checkoutBlocked"));const o=document.getElementById("traySentLink");o&&(o.href=t),r.hidden=!1,this.showToast(e?this.t("checkoutOpened"):this.t("checkoutBlocked"),e?"success":"warning")},finishSentOrder(){this.resetCart(),this.showToast(this.t("trayClearedAfterSend"),"success")},openWhatsAppDirect(){const t=this.lang==="ku",e=this.getShopName(),r=t?`سڵاو ${e}! دەمەوێت پرسیار لەسەر کێکەکان بکەم.`:`Hello ${e}! I have an inquiry regarding your cakes.`,n=kr(this.config.contact.whatsapp,r);if(!n){this.showToast(this.t("checkoutNoWhatsApp"),"error");return}const o=window.open(n,"_blank");if(o)try{o.opener=null}catch{}},updateAuthUI(){const t=document.getElementById("desktopAuthContainer"),e=document.getElementById("mobileAuthContainer"),r=this.session,n=this.localOrders&&this.localOrders.length>0||!!r,o=c=>n?`<button type="button" class="${c}" onclick="app.closeAccountMenu();app.openHistoryModal()">${u(this.t("myOrdersBtn"))}</button>`:"";let s,i;if(!r)s=`
        <div class="auth-actions">
          ${o("btn btn--ghost btn--sm")}
          <button type="button" class="btn btn--primary btn--sm" id="btnSignInDesktop" onclick="app.openAuthModal()">${u(this.t("btnSignIn"))}</button>
        </div>`,i=s.replace('id="btnSignInDesktop"','id="btnSignInMobile"');else{const c=pe(r),d=r.name||r.email||this.t("customerFallbackName"),l=c?`<span class="badge ${r.role==="dev"?"badge--dev":"badge--admin"}">${u(this.t("role_"+r.role)||r.role)}</span>`:"",g=E=>`
          ${o(E)}
          ${c?`<button type="button" class="${E}" onclick="app.closeAccountMenu();app.openPanelModal()">${u(this.t("btnPanel"))}</button>`:""}
          <button type="button" class="${E}" onclick="app.closeAccountMenu();app.logout()">${u(this.t("btnLogout"))}</button>`;s=`
        <div class="account-menu">
          <button type="button" class="btn btn--ghost btn--sm account-menu__toggle" id="accountMenuToggle" aria-expanded="false" aria-controls="accountMenuList" onclick="app.toggleAccountMenu()">
            ${l}<span class="user-chip__name">${u(d)}</span><span aria-hidden="true">▾</span>
          </button>
          <div class="account-menu__list" id="accountMenuList" hidden>${g("account-menu__item")}</div>
        </div>`,i=`
        <div class="user-chip user-chip--stacked">
          <div class="user-chip__who">${l}<span class="user-chip__name">${u(d)}</span></div>
          <div class="user-chip__actions">${g("btn btn--ghost btn--sm")}</div>
        </div>`}const a=s+i;this._authHtml!==a&&(t&&(t.innerHTML=s),e&&(e.innerHTML=i),this._authHtml=a)},toggleAccountMenu(t=null){const e=document.getElementById("accountMenuToggle"),r=document.getElementById("accountMenuList");if(!e||!r)return;const n=t===null?r.hidden:!!t;if(r.hidden=!n,e.setAttribute("aria-expanded",n?"true":"false"),n){const o=r.querySelector("button");o&&o.focus()}},closeAccountMenu(){this.toggleAccountMenu(!1)},getCustomerOrders(){const t=(this.session?this.myOrders:[])||[],e=new Set(t.flatMap(n=>[n.id,n.ref].filter(Boolean))),r=(this.localOrders||[]).filter(n=>!e.has(n.id)&&!e.has(n.ref));return[...t,...r].sort((n,o)=>(o.createdAt||0)-(n.createdAt||0))},openHistoryModal(){this.renderCustomerHistory(),this.openDialog("historyModal")},closeHistoryModal(){this.closeDialog("historyModal")},toggleHistoryDetails(t){this.historyDetailsOpen[t]=!this.historyDetailsOpen[t],this.renderCustomerHistory()},reorderItems(t){const e=this.getCustomerOrders().find(o=>o.id===t);if(!e||!Array.isArray(e.items)||e.items.length===0)return;let r=0,n=this.cart;e.items.forEach(o=>{if(!this.products.some(i=>i.id===o.productId))return;const s=Math.max(1,Math.min(99,Number(o.qty)||1));for(let i=0;i<s;i++)n=gn(n,o.productId,o.exclude||[]);r+=s}),this.cart=rt(n,this.products),this.persistCart(),r>0?(this.closeHistoryModal(),this.renderTray(),this.showToast(this.t("orderAddedToTray").replace("{count}",r),"success")):this.showToast(this.t("itemsNotAvailable"),"warning")},renderCustomerHistory(){if(!document.getElementById("historyModal"))return;const r=this.lang==="ku"?"ckb":"en-GB",n=this.getCustomerOrders(),o=(l,g=!0)=>{if(!l)return"—";try{return new Date(l).toLocaleDateString(r,g?{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}:{month:"short",year:"numeric"})}catch{return new Date(l).toISOString().slice(0,16).replace("T"," ")}},s=document.getElementById("historyModalSubtitle");s&&(s.textContent=n.length?this.t("myOrdersSubtitle").replace("{count}",n.length).replace("{date}",o(Math.min(...n.map(l=>l.createdAt||Date.now())),!1)):this.t("myOrdersEmpty"));const i=document.getElementById("historyScopeNote");i&&(i.textContent=this.session?this.t("historyScopeAccount"):this.t("historyScopeDevice"));const a=document.getElementById("historyCustomerStats");if(a)if(n.length){const l=n.reduce((S,I)=>{var w,k;return S+(Number(((w=I.totals)==null?void 0:w.total)??((k=I.economy)==null?void 0:k.total))||0)},0),g={};n.forEach(S=>(S.items||[]).forEach(I=>{const w=I.name||I.nameSnapshot||I.productId;g[w]=(g[w]||0)+(I.qty||1)}));const E=Object.entries(g).sort((S,I)=>I[1]-S[1])[0];a.hidden=!1,a.innerHTML=`
          <div class="history-stat-card"><span class="history-stat-label">${u(this.t("myOrdersTotalOrders"))}</span><span class="history-stat-val">${n.length}</span></div>
          <div class="history-stat-card"><span class="history-stat-label">${u(this.t("myOrdersTotalSpent"))}</span><span class="history-stat-val">${u(this.formatPrice(l))}</span></div>
          <div class="history-stat-card"><span class="history-stat-label">${u(this.t("myOrdersFavourite"))}</span><span class="history-stat-val history-stat-val--text">${u(E?E[0]:"—")}</span></div>`}else a.hidden=!0,a.innerHTML="";const c=document.getElementById("historyOrdersList");if(!c)return;if(!n.length){c.innerHTML=`
        <div class="history-empty-state">
          <div class="history-empty-icon" aria-hidden="true">📦</div>
          <h4 class="history-empty-title">${u(this.t("myOrdersEmpty"))}</h4>
          <p class="history-empty-hint">${u(this.t("myOrdersEmptyHint"))}</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.closeHistoryModal();document.getElementById('menu').scrollIntoView();">${u(this.t("myOrdersBrowse"))}</button>
        </div>`;return}const d=l=>{const g={baking:"confirmed",delivered:"completed"}[l]||l,E={sent:["orderStatusSent","history-badge--pending"],pending:["orderStatusPending","history-badge--pending"],confirmed:["orderStatusConfirmed","history-badge--baking"],completed:["orderStatusCompleted","history-badge--delivered"],cancelled:["orderStatusCancelled","history-badge--cancelled"]},[S,I]=E[g]||E.pending;return{label:this.t(S),cls:I}};c.innerHTML=n.map(l=>{var C;const g=d(l.status),E=l.totals||{total:((C=l.economy)==null?void 0:C.total)||0},S=l.items||[],I=!!this.historyDetailsOpen[l.id],w=D=>D.name||D.nameSnapshot||D.productId,k=l.ref||"#"+String(l.id).slice(-6).toUpperCase(),P=I?`
        <div class="history-order-details">
          <div class="history-items-breakdown">
            ${S.map(D=>`<div class="history-detail-row"><span>${u(D.qty)} × ${u(w(D))}</span><span>${u(this.formatPrice((D.unitPriceUSD??D.usdSnapshot??0)*(D.qty||1)))}</span></div>`).join("")}
            ${l.fulfillmentAt?`<div class="history-detail-row"><span>${u(this.t("historyRequestedFor"))}</span><span>${u(Ne(new Date(l.fulfillmentAt),this.lang))}</span></div>`:""}
            ${l.note?`<div class="history-detail-row"><span>${u(this.t("orderNoteLabel"))}</span><span>${u(l.note)}</span></div>`:""}
            <div class="history-detail-row history-detail-row--total"><span>${u(this.t("total"))}</span><span>${u(this.formatPrice(E.total||0))}</span></div>
          </div>
        </div>`:"";return`
        <article class="history-order-card">
          <div class="history-order-header">
            <div class="history-order-meta">
              <span class="history-order-id">${u(k)}</span>
              <span class="history-order-date">${u(o(l.createdAt))}</span>
            </div>
            <span class="history-badge ${g.cls}">${u(g.label)}</span>
          </div>
          <div class="history-order-summary">
            <p class="history-order-items-preview">${u(S.map(D=>`${D.qty}× ${w(D)}`).join(", "))}</p>
            <div class="history-order-price">${u(this.formatPrice(E.total||0))}</div>
          </div>
          <div class="history-order-actions">
            <button type="button" class="btn btn--xs btn--ghost" aria-expanded="${I}" onclick="app.toggleHistoryDetails(${j(l.id)})">${u(I?this.t("myOrdersHideDetails"):this.t("myOrdersDetails"))}</button>
            <button type="button" class="btn btn--xs btn--primary" onclick="app.reorderItems(${j(l.id)})">${u(this.t("myOrdersReorder"))}</button>
          </div>
          ${P}
        </article>`}).join("")},openAuthModal(){this.initSession(!0),this.setAuthMessage("authMessage",""),this.openDialog("authModal")},openStaffLogin(){this.initSession(!0),this.setAuthMessage("staffAuthMessage",""),this.closeDialog("authModal"),this.openDialog("staffAuthModal")},closeStaffLogin(){this.closeDialog("staffAuthModal"),window.location.hash==="#staff"&&history.replaceState(null,"",window.location.pathname+window.location.search)},setAuthMessage(t,e,r="error"){const n=document.getElementById(t);n&&(n.textContent=e||"",n.hidden=!e,n.dataset.type=r)},closeAuthModal(){this.closeDialog("authModal")},async handleGoogleLogin(t="customer"){const e=t==="staff"?"staffAuthMessage":"authMessage";this.setAuthMessage(e,"");try{await dn(),await this.initSession(!0),await this.afterSignIn(t,e)}catch(r){this.setAuthMessage(e,this.t("authErr_"+$t(r)))}},async afterSignIn(t,e){const r=await mn().catch(()=>null)||this.session;if(r&&this.applySession(r),t==="staff"){pe(r)?(this.closeStaffLogin(),this.showToast(this.t("staffAccessGranted"),"success"),this.openPanelModal()):this.setAuthMessage(e,this.t("staffNoAccess"));return}this.closeAuthModal(),this.showToast(this.t("loginSuccess"),"success")},async handleStaffSubmit(t){t.preventDefault();const e=document.getElementById("staffEmail").value.trim(),r=document.getElementById("staffPassword").value;if(!e||!r){this.setAuthMessage("staffAuthMessage",this.t("errFillFields"));return}const n=document.getElementById("btnStaffLogin");n&&(n.disabled=!0);try{await rl(e,r),document.getElementById("staffPassword").value="",await this.initSession(!0),await this.afterSignIn("staff","staffAuthMessage")}catch(o){this.setAuthMessage("staffAuthMessage",this.t("authErr_"+$t(o)))}finally{n&&(n.disabled=!1)}},async logout(){try{await hn()}catch(t){console.warn("Sign-out problem:",t&&t.code)}this.closePanelModal(!0),this.applySession(null),this.showToast(this.t("loggedOut"))},openPanelModal(){if(!pe(this.session)){this.session?this.showToast(this.t("staffNoAccess"),"error"):this.openStaffLogin();return}const t=document.getElementById("panelUserBadge");t&&(t.textContent=this.t("role_"+this.session.role)||this.session.role,t.className=`badge ${this.session.role==="dev"?"badge--dev":"badge--admin"}`),re(this.session,this.activePanelTab)||(this.activePanelTab=["brand","products","customers","reviews","economy","theme","about","faq","contact","socials","fonts"].find(e=>re(this.session,e))||"brand"),this.renderPanelSidebar(),this.renderPanelTab(this.activePanelTab),this.openDialog("panelModal")},openSubmitReviewModal(){const t=document.getElementById("reviewSubmitForm"),e=document.getElementById("reviewSignInGate"),r=!!this.session;if(t&&(t.hidden=!r),e&&(e.hidden=r),this.setAuthMessage("reviewMessage",""),r){const n=document.getElementById("custReviewName");n&&!n.value&&(n.value=this.profile&&this.profile.name||this.session.name||"")}else this.initSession(!0);this.openDialog("submitReviewModal")},closeSubmitReviewModal(){this.closeDialog("submitReviewModal")},async submitCustomerReview(t){if(t.preventDefault(),!this.session){this.openSubmitReviewModal();return}const e=document.getElementById("custReviewName"),r=document.getElementById("custReviewQuote"),n=document.querySelector('input[name="reviewRating"]:checked'),o=e.value.trim(),s=r.value.trim();if(!o||!s){this.setAuthMessage("reviewMessage",this.t("errFillFields"));return}const i=document.getElementById("btnSubmitReview");i&&(i.disabled=!0),this.setAuthMessage("reviewMessage",this.t("statusSaving"),"info");try{await Le(),await L.submitReview({uid:this.session.uid,name:o,text:s,rating:n?Number(n.value):void 0,lang:this.lang}),r.value="",this.setAuthMessage("reviewMessage",""),this.closeSubmitReviewModal(),this.showToast(this.t("reviewPending"),"success")}catch(a){const c=Re(a);this.setAuthMessage("reviewMessage",this.t(c==="offline"?"saveOffline":c==="denied"?"reviewDenied":"reviewFailed"))}finally{i&&(i.disabled=!1)}},async signInForReview(){try{await dn(),await this.initSession(!0);const t=await mn().catch(()=>null);t&&this.applySession(t),this.openSubmitReviewModal()}catch(t){this.setAuthMessage("reviewMessage",this.t("authErr_"+$t(t)))}},closePanelModal(t=!1){if(this._draftEconomy&&(this._draftEconomy=null,this.applyEconomy()),this.activePanelTab==="theme"&&this.revertTheme(),this.closeCustomerDrawer(),this.closeDialog("panelModal"),t){const e=document.getElementById("panelContent");e&&!pe(this.session)&&(e.innerHTML="")}},openDialog(t,e=document.activeElement,{onEscape:r=null}={}){const n=document.getElementById(t);n&&(this._dialogs=(this._dialogs||[]).filter(o=>o.id!==t),this._dialogs.push({id:t,trigger:e,triggerId:e&&e.id?e.id:null,onEscape:r}),n.classList.add("is-open"),n.removeAttribute("aria-hidden"),document.body.classList.add("has-dialog"),requestAnimationFrame(()=>{const o=n.querySelector("[data-autofocus]:not([hidden])")||[...n.querySelectorAll(this.focusableSelector())].find(s=>s.offsetParent!==null);if(o)o.focus();else{const s=n.querySelector(".modal-window")||n;s.setAttribute("tabindex","-1"),s.focus()}}))},closeDialog(t){const e=document.getElementById(t);e&&(e.classList.remove("is-open"),e.setAttribute("aria-hidden","true"));const r=this._dialogs||[],n=r.find(o=>o.id===t);if(this._dialogs=r.filter(o=>o.id!==t),this._dialogs.length||document.body.classList.remove("has-dialog"),n){const o=n.trigger&&document.contains(n.trigger)?n.trigger:n.triggerId?document.getElementById(n.triggerId):null;o&&typeof o.focus=="function"&&o.focus()}},focusableSelector(){return'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'},handleDialogKeys(t){const e=this._dialogs||[];if(!e.length)return!1;const r=e[e.length-1],n=document.getElementById(r.id);if(!n||!n.classList.contains("is-open"))return this._dialogs=e.slice(0,-1),!1;if(t.key==="Escape")return t.preventDefault(),r.onEscape?r.onEscape():this.closeDialogById(r.id),!0;if(t.key==="Tab"){const o=[...n.querySelectorAll(this.focusableSelector())].filter(a=>a.offsetParent!==null);if(!o.length)return t.preventDefault(),!0;const s=o[0],i=o[o.length-1];if(!n.contains(document.activeElement))return t.preventDefault(),s.focus(),!0;if(t.shiftKey&&document.activeElement===s)return t.preventDefault(),i.focus(),!0;if(!t.shiftKey&&document.activeElement===i)return t.preventDefault(),s.focus(),!0}return!1},closeDialogById(t){({authModal:()=>this.closeAuthModal(),staffAuthModal:()=>this.closeStaffLogin(),historyModal:()=>this.closeHistoryModal(),panelModal:()=>this.closePanelModal(),submitReviewModal:()=>this.closeSubmitReviewModal(),customConfirmModal:()=>this._confirmResolve&&this._confirmResolve(!1)}[t]||(()=>this.closeDialog(t)))()},confirmDialog({title:t,message:e,okLabel:r,cancelLabel:n,danger:o=!1}){if(!document.getElementById("customConfirmModal"))return Promise.resolve(window.confirm(e));document.getElementById("confirmTitle").textContent=t||this.t("confirmTitle"),document.getElementById("confirmMessage").textContent=e||"";const i=document.getElementById("confirmOkBtn"),a=document.getElementById("confirmCancelBtn");return i.textContent=r||this.t("btnConfirm"),a.textContent=n||this.t("btnCancel"),i.classList.toggle("btn--danger",o),new Promise(c=>{const d=l=>{i.onclick=null,a.onclick=null,this._confirmResolve=null,this.closeDialog("customConfirmModal"),c(l)};this._confirmResolve=d,i.onclick=()=>d(!0),a.onclick=()=>d(!1),this.openDialog("customConfirmModal")})},announce(t){const e=document.getElementById("srAnnouncer");e&&(e.textContent="",setTimeout(()=>{e.textContent=t},30))},panelTabs(){const t=e=>`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${e}</svg>`;return[{id:"brand",label:this.t("tabBrand"),icon:t('<path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.6-.7 1.6-1.7 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1a1.6 1.6 0 0 1 1.7-1.7h2c3 0 5.5-2.5 5.5-5.5C22 6 17.5 2 12 2z"/>')},{id:"theme",label:this.t("tabTheme"),icon:t('<rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/>')},{id:"about",label:this.t("tabAbout"),icon:t('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>')},{id:"faq",label:this.t("tabFaq"),icon:t('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>')},{id:"reviews",label:this.t("tabReviews"),icon:t('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>')},{id:"contact",label:this.t("tabContact"),icon:t('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>')},{id:"socials",label:this.t("tabSocials"),icon:t('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>')},{id:"products",label:this.t("tabProducts"),icon:t('<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>')},{id:"customers",label:this.t("tabCustomers"),icon:t('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>')},{id:"economy",label:this.t("tabEconomy"),icon:t('<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>')},{id:"fonts",label:this.t("tabFonts"),icon:t('<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>')},{id:"users",label:this.t("tabUsers"),icon:t('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>')},{id:"data",label:this.t("tabData"),icon:t('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>')}]},renderPanelSidebar(){const t=document.getElementById("panelSidebar");if(!t)return;const e=this.session;t.setAttribute("role","tablist"),t.setAttribute("aria-orientation","vertical"),t.setAttribute("aria-label",this.t("panelTitle")),t.innerHTML=this.panelTabs().filter(n=>n.id==="users"?e&&(e.role==="admin"||e.role==="dev"):re(e,n.id)).map(n=>{const o=this.activePanelTab===n.id;return`
        <button type="button" role="tab" id="panelTab-${n.id}" aria-controls="panelContent" aria-selected="${o}" tabindex="${o?0:-1}"
          class="panel-tab-btn ${o?"is-active":""}" onclick="app.switchPanelTab('${n.id}')">
          <span>${n.icon}</span>
          <span>${u(n.label)}</span>
        </button>`}).join("");const r=document.getElementById("panelContent");r&&(r.setAttribute("role","tabpanel"),r.setAttribute("aria-labelledby",`panelTab-${this.activePanelTab}`))},handlePanelTabKeys(t){const e=t.target.closest&&t.target.closest('[role="tab"]');if(!e||!["ArrowDown","ArrowUp","ArrowLeft","ArrowRight","Home","End"].includes(t.key))return;const r=[...document.querySelectorAll('#panelSidebar [role="tab"]')];let n=r.indexOf(e);t.key==="Home"?n=0:t.key==="End"?n=r.length-1:n=(n+(["ArrowDown","ArrowRight"].includes(t.key)?1:-1)+r.length)%r.length,t.preventDefault();const o=r[n].id.replace("panelTab-","");this.switchPanelTab(o);const s=document.getElementById("panelTab-"+o);s&&s.focus()},switchPanelTab(t){const e=this.session;(t==="users"?e&&(e.role==="admin"||e.role==="dev"):re(e,t))&&(this.activePanelTab==="economy"&&t!=="economy"&&this._draftEconomy&&(this._draftEconomy=null,this.applyEconomy()),this.activePanelTab==="theme"&&t!=="theme"&&this.revertTheme(),this.activePanelTab=t,this.setPanelStatus(""),this.renderPanelSidebar(),this.renderPanelTab(t))},renderPanelTab(t){var o;const e=document.getElementById("panelContent");if(!e)return;const r=this.config,n=!!(this.session&&this.session.role==="dev");switch(t){case"theme":this.renderThemeTab(e);break;case"customers":this.renderCustomersTab(e);break;case"brand":this.draftLogo||this.initLogoDraft(),e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Brand & Announcement</h4>
          <form onsubmit="app.saveBrandSettings(event)">
            <div id="logoEditorContainer">
              ${this.getLogoEditorHtml()}
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Shop Name (English)</label>
                <input type="text" id="cfgShopNameEn" class="form-input" value="${u(r.shopName.en)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Shop Name (Kurdish)</label>
                <input type="text" id="cfgShopNameKu" class="form-input" value="${u(r.shopName.ku||"")}" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tagline (English)</label>
                <input type="text" id="cfgTaglineEn" class="form-input" value="${u(r.tagline.en)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tagline (Kurdish)</label>
                <input type="text" id="cfgTaglineKu" class="form-input" value="${u(r.tagline.ku||"")}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (English)</label>
              <input type="text" id="cfgAnnounceEn" class="form-input" value="${u(r.announcement.en)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (Kurdish)</label>
              <input type="text" id="cfgAnnounceKu" class="form-input" value="${u(r.announcement.ku||"")}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"about":e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Our Story & Heritage</h4>
          <form onsubmit="app.saveAboutSettings(event)">
            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="text" id="cfgAboutImage" class="form-input" value="${u(r.aboutUs.imageUrl||"https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80")}" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (EN)</label>
                <input type="text" id="cfgAboutEyebrowEn" class="form-input" value="${u(r.aboutUs.eyebrowEn||"Our Heritage")}" />
              </div>
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (KU)</label>
                <input type="text" id="cfgAboutEyebrowKu" class="form-input" value="${u(r.aboutUs.eyebrowKu||"کەلەپووری ئێمە")}" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Main Title (EN)</label>
                <input type="text" id="cfgAboutTitleEn" class="form-input" value="${u(r.aboutUs.titleEn||"Crafted with patience, baked with devotion")}" />
              </div>
              <div class="form-group">
                <label class="form-label">Main Title (KU)</label>
                <input type="text" id="cfgAboutTitleKu" class="form-input" value="${u(r.aboutUs.titleKu||"بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە")}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (English)</label>
              <textarea id="cfgAboutEn" class="form-textarea" rows="5">${u(r.aboutUs.en)}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (Kurdish)</label>
              <textarea id="cfgAboutKu" class="form-textarea" rows="5">${u(r.aboutUs.ku||"")}</textarea>
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"faq":const s=r.faq||[];e.innerHTML=`
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <h4 style="font-family:var(--font-serif); margin:0;">FAQ Editor</h4>
            <button type="button" class="btn btn--primary btn--sm" onclick="app.addFaqItem()">+ Add Question</button>
          </div>
          <form onsubmit="app.saveFaqSettings(event)" id="faqForm">
            <div id="faqItemsContainer" style="display:flex; flex-direction:column; gap:16px;">
              ${s.map((l,g)=>We.getFaqItemHtml(l,g)).join("")}
            </div>
            <button type="submit" class="btn btn--primary" style="margin-top: 24px; width: 100%;">${this.t("btnSaveConfig")||"Save FAQ"}</button>
          </form>
        `;break;case"reviews":{const l=r.reviews||[];e.innerHTML=`
          ${this.reviewModerationHtml()}
          <div class="panel-tab-head">
            <h4 class="panel-tab-title">${u(this.t("reviewsCuratedTitle"))}</h4>
            <div class="panel-tab-tools">
              <button type="button" class="btn btn--ghost btn--sm" onclick="app.resetReviews()">↺ ${u(this.t("reviewsResetBtn"))}</button>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.addReviewItem()">+ ${u(this.t("reviewsAddBtn"))}</button>
            </div>
          </div>
          <p class="panel-hint">${u(this.t("reviewsCuratedHint"))}</p>
          <form onsubmit="app.saveReviewSettings(event)" id="reviewForm">
            <div id="reviewItemsContainer" class="editor-list">
              ${l.map((g,E)=>We.getReviewItemHtml(g,E)).join("")}
            </div>
            <button type="submit" class="btn btn--primary btn--block">${u(this.t("btnSaveConfig"))}</button>
          </form>
        `;break}case"contact":e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Contact & Kitchen Information</h4>
          <form onsubmit="app.saveContactSettings(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Number (digits only, no +)</label>
                <input type="text" id="cfgWhatsapp" class="form-input" value="${u(r.contact.whatsapp)}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Display Phone</label>
                <input type="text" id="cfgPhone" class="form-input" value="${u(r.contact.phone)}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" id="cfgEmail" class="form-input" value="${u(r.contact.email)}" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Kitchen Address (English)</label>
                <textarea id="cfgAddressEn" class="form-textarea">${u(r.contact.address.en)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Kitchen Address (Kurdish)</label>
                <textarea id="cfgAddressKu" class="form-textarea">${u(r.contact.address.ku||"")}</textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Opening Hours (English)</label>
                <textarea id="cfgHoursEn" class="form-textarea">${u(r.contact.hours.en)}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Opening Hours (Kurdish)</label>
                <textarea id="cfgHoursKu" class="form-textarea">${u(r.contact.hours.ku||"")}</textarea>
              </div>
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"socials":e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:6px;">Social Media URLs</h4>
          <p style="font-size:0.8rem;color:var(--muted);margin:0 0 16px 0;">Leave a field empty to hide its icon in the footer.</p>
          <form onsubmit="app.saveSocialSettings(event)">
            <div class="form-group">
              <label class="form-label">Instagram URL</label>
              <input type="url" id="cfgInsta" class="form-input" value="${u(r.socials.instagram)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Facebook URL</label>
              <input type="url" id="cfgFb" class="form-input" value="${u(r.socials.facebook)}" />
            </div>
            <div class="form-group">
              <label class="form-label">TikTok URL</label>
              <input type="url" id="cfgTiktok" class="form-input" value="${u(r.socials.tiktok)}" />
            </div>
            <div class="form-group">
              <label class="form-label">Snapchat URL</label>
              <input type="url" id="cfgSnap" class="form-input" dir="ltr" value="${this.esc(r.socials.snapchat||"")}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"products":(!this.selectedProductId||!this.products.some(l=>l.id===this.selectedProductId))&&(this.selectedProductId=this.products.length>0?this.products[0].id:null);const i=this.products.find(l=>l.id===this.selectedProductId);this.pendingImageData=i&&i.img||"",e.innerHTML=`
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;gap:12px;flex-wrap:wrap;">
            <div>
              <h4 style="font-family:var(--font-serif);margin:0 0 4px 0;">Product Catalogue (${this.products.length})</h4>
              <p style="font-size:0.82rem;color:var(--muted);margin:0;">Manage pricing, bilingual names, descriptions, and photo gallery.</p>
            </div>
            <button type="button" class="btn btn--primary btn--sm" onclick="app.addNewProduct()">
              ${this.t("btnAddNewProduct")}
            </button>
          </div>
          <div class="form-group" style="margin-bottom:18px;">
            <label class="form-label" for="prodSelect">Select product to edit:</label>
            <select class="form-select" id="prodSelect" onchange="app.selectProductForEditing(this.value)">
              ${this.products.map(l=>`
                <option value="${u(l.id)}" ${l.id===this.selectedProductId?"selected":""}>
                  ${u(l.emoji||"🎂")} ${u(l.name.en)} ($${u(l.priceUSD)}) ${l.img?"📷":""}
                </option>
              `).join("")}
            </select>
          </div>
          <div id="productEditorArea">
            <!-- Injected by renderProductEditor -->
          </div>
        `,this.renderProductEditor();break;case"fonts":{if(!re(this.session,"fonts")){e.innerHTML=`<p class="panel-hint">${u(this.t("usersNoAccess"))}</p>`;break}const l=(w,k)=>w.map(P=>`<option value="${u(P.value)}" ${k===P.value?"selected":""}>${u(P.label)}</option>`).join(""),g=r.kurdishBodyFont||"Vazirmatn",E=r.kurdishDisplayFont||"Vazirmatn",S=r.englishBodyFont||"DM Sans",I=r.englishDisplayFont||"Cormorant Garamond";e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t("tabFonts")}</h4>
          <form onsubmit="app.saveFontSettings(event)">
            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-bottom:8px;">Kurdish / Arabic Typography (RTL)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgKuBody">${this.t("fieldKurdishBody")}</label>
                <select id="cfgKuBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${l(_n,g)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgKuDisplay">${this.t("fieldKurdishDisplay")}</label>
                <select id="cfgKuDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${l(_n,E)}
                </select>
              </div>
            </div>

            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-top:16px;margin-bottom:8px;">English / Latin Typography (LTR)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgEnBody">${this.t("fieldEnglishBody")}</label>
                <select id="cfgEnBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${l(In,S)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgEnDisplay">${this.t("fieldEnglishDisplay")}</label>
                <select id="cfgEnDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${l(In,I)}
                </select>
              </div>
            </div>

            <div id="fontPreviewMount">
              <div id="fontPreviewFrame" class="font-preview-frame" style="margin-top:24px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:rtl;text-align:right;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t("fontPreview")} (کوردی)</div>
                <h4 id="fontPreviewHeading" style="font-size:1.6rem;margin-bottom:10px;font-family:'${u(E)}',serif;">کێکی تایبەت بۆ ئاهەنگەکەت</h4>
                <p id="fontPreviewBody" style="font-size:.95rem;color:var(--muted);line-height:1.9;font-family:'${u(g)}',sans-serif;">
                  کێک و کاپکێک و شیرینی بە بچووکی لە چێشتخانەکەی خۆمان بە دەست دروست دەکرێن — بە کەرەی ڕاستەقینە و ڤانیلای ڕاستەقینە.
                </p>
              </div>

              <div id="fontPreviewFrameEn" class="font-preview-frame" style="margin-top:16px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:ltr;text-align:left;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t("fontPreview")} (English)</div>
                <h4 id="fontPreviewHeadingEn" style="font-size:1.6rem;margin-bottom:10px;font-family:'${u(I)}',serif;">Bespoke Celebration Cakes</h4>
                <p id="fontPreviewBodyEn" style="font-size:.95rem;color:var(--muted);line-height:1.6;font-family:'${u(S)}',sans-serif;">
                  Handcrafted layered cakes, cupcakes, and French desserts baked fresh daily with organic butter, bourbon vanilla, and seasonal fruit.
                </p>
              </div>
            </div>

            <div style="margin-top:20px;display:flex;align-items:center;gap:12px;">
              <button class="btn btn--primary btn--sm" type="submit">${this.t("saveFonts")}</button>
            </div>
            <div style="font-size:0.8rem;color:var(--muted);margin-top:10px;">
              Font selections preview live immediately; click save to persist your preferences.
            </div>
          </form>
        `,this.addPhonePreviewToggle(document.getElementById("fontPreviewMount"),{frameId:"fontPreviewFrame",mountId:"fontPreviewMount"});break}case"economy":const a=this.config.economy||Se,c=a.lastUpdatedRate?new Date(a.lastUpdatedRate).toLocaleDateString():"";e.innerHTML=`
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div>
                <h4 style="font-family:var(--font-serif);margin:0 0 4px 0;">${this.t("economyTitle")}</h4>
                <p style="font-size:0.86rem;color:var(--muted);margin:0;">${this.t("economyDesc")}</p>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="rateTimestampBadge" style="font-size:0.75rem;color:var(--muted);">
                  ${c?`Rate updated: <span id="lastUpdatedRateText">${u(c)}</span>`:""}
                </span>
              </div>
            </div>
          </div>

          <div class="economy-panel-layout">
            <!-- Form Column -->
            <form id="economySettingsForm" onsubmit="app.saveEconomySettings(event)" oninput="app.handleEconomyInput(event)" onchange="app.handleEconomyInput(event)" style="display:flex;flex-direction:column;gap:14px;">
              
              <!-- 1. Currencies -->
              <details class="economy-accordion" id="ecoAccordionCurrencies" open>
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🌐</span> <span>${this.t("economyCurrencies")}</span>
                      <span class="badge badge--admin economy-mobile-role-badge" style="display:none;font-size:0.68rem;padding:2px 6px;">${u(this.t("role_"+(((o=this.session)==null?void 0:o.role)||"admin")))}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoCurrenciesSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgPrimaryCurrency">${this.t("fieldPrimaryCurrency")}</label>
                      <input type="text" id="cfgPrimaryCurrency" class="form-input" value="USD ($)" disabled style="background:var(--shell);cursor:not-allowed;" />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:2px;">Base currency for all products</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgSecondaryCurrency">${this.t("fieldSecondaryCurrency")}</label>
                      <select id="cfgSecondaryCurrency" class="form-select">
                        <option value="IQD" ${a.secondaryCurrency==="IQD"?"selected":""}>IQD — Iraqi Dinar</option>
                        <option value="EUR" ${a.secondaryCurrency==="EUR"?"selected":""}>EUR — Euro</option>
                        <option value="TRY" ${a.secondaryCurrency==="TRY"?"selected":""}>TRY — Turkish Lira</option>
                        <option value="AED" ${a.secondaryCurrency==="AED"?"selected":""}>AED — UAE Dirham</option>
                        <option value="None" ${a.secondaryCurrency==="None"?"selected":""}>None (USD Only)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row" style="align-items:center;">
                    <div class="form-group">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                        <input type="checkbox" id="cfgShowSecondary" ${a.showSecondary!==!1?"checked":""} />
                        <span>${this.t("fieldShowSecondary")}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgCurrencySymbol">${this.t("fieldCurrencySymbol")}</label>
                      <input type="text" id="cfgCurrencySymbol" class="form-input" value="${u(a.currencySymbol||"د.ع")}" maxlength="8" />
                    </div>
                  </div>
                </div>
              </details>

              <!-- 2. Exchange Rate -->
              <details class="economy-accordion" id="ecoAccordionExchange" open>
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>💱</span> <span>${this.t("economyExchange")}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoExchangeSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgExchangeRate">${this.t("fieldExchangeRate")}</label>
                      <input type="number" id="cfgExchangeRate" class="form-input" value="${u(a.exchangeRate||1310)}" min="1" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:2px;">1 USD = X in secondary currency</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgRoundingRule">${this.t("fieldRoundingRule")}</label>
                      <select id="cfgRoundingRule" class="form-select">
                        <option value="250" ${parseInt(a.roundingRule,10)===250?"selected":""}>${this.t("roundNearest250")}</option>
                        <option value="500" ${parseInt(a.roundingRule,10)===500?"selected":""}>${this.t("roundNearest500")}</option>
                        <option value="1000" ${parseInt(a.roundingRule,10)===1e3?"selected":""}>${this.t("roundNearest1000")}</option>
                        <option value="1" ${parseInt(a.roundingRule,10)===1?"selected":""}>${this.t("roundNearest1")}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row" style="align-items:center;">
                    <div class="form-group">
                      <label style="display:flex;align-items:center;gap:10px;cursor:not-allowed;font-size:0.88rem;color:var(--muted);">
                        <input type="checkbox" id="cfgAutoRefresh" disabled />
                        <span>${this.t("fieldAutoRefresh")}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </details>

              <!-- 3. Delivery -->
              <details class="economy-accordion" id="ecoAccordionDelivery">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🚚</span> <span>${this.t("economyDelivery")}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoDeliverySummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row--3">
                    <div class="form-group">
                      <label class="form-label" for="cfgDeliveryFee">${this.t("fieldDeliveryFee")}</label>
                      <input type="number" id="cfgDeliveryFee" class="form-input" value="${u(a.deliveryFee??8)}" min="0" step="0.5" inputmode="decimal" required />
                      <span id="deliveryZeroNote" style="display:none;font-size:0.76rem;color:#16a34a;font-weight:600;margin-top:3px;">${this.t("deliveryFreeForEveryone")}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgFreeDeliveryOver">${this.t("fieldFreeDeliveryOver")}</label>
                      <input type="number" id="cfgFreeDeliveryOver" class="form-input" value="${u(a.freeDeliveryOver??60)}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = all-order free delivery</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgMinimumOrder">${this.t("fieldMinimumOrder")}</label>
                      <input type="number" id="cfgMinimumOrder" class="form-input" value="${u(a.minimumOrder??0)}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = no minimum order</span>
                    </div>
                  </div>

                  <!-- Inline Amber Warning if Free Delivery is lower than Min Order -->
                  <div id="freeDeliveryWarn" class="eco-warning-box" style="display:none;" role="alert" aria-live="polite">
                    <span>⚠️</span> <span>${this.t("freeDeliveryWarning")}</span>
                  </div>

                  <div style="padding-top:4px;">
                    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                      <input type="checkbox" id="cfgPickupOnly" ${a.pickupOnly?"checked":""} />
                      <span>${this.t("fieldPickupOnly")}</span>
                    </label>
                  </div>
                </div>
              </details>

              <!-- 4. Tax -->
              <details class="economy-accordion" id="ecoAccordionTax">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🧾</span> <span>${this.t("economyTax")}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoTaxSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group" style="display:flex;align-items:center;padding-top:20px;">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                        <input type="checkbox" id="cfgTaxEnabled" ${a.taxEnabled?"checked":""} />
                        <span>${this.t("fieldTaxEnabled")}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxRate">${this.t("fieldTaxRate")}</label>
                      <input type="number" id="cfgTaxRate" class="form-input" value="${u(a.taxRate??0)}" min="0" max="30" step="0.1" inputmode="decimal" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxLabel">${this.t("fieldTaxLabel")}</label>
                      <input type="text" id="cfgTaxLabel" class="form-input" value="${u(a.taxLabel||"VAT")}" maxlength="15" />
                    </div>
                    <div class="form-group" style="display:flex;align-items:center;padding-top:24px;">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.88rem;">
                        <input type="checkbox" id="cfgTaxIncluded" ${a.taxIncluded!==!1?"checked":""} />
                        <span>${this.t("fieldTaxIncluded")}</span>
                      </label>
                    </div>
                  </div>
                </div>
              </details>

              <!-- 5. Discounts -->
              <details class="economy-accordion" id="ecoAccordionDiscounts">
                <summary class="economy-accordion__summary">
                  <div class="economy-accordion__header-row">
                    <h5 class="economy-accordion__title">
                      <span>🎟️</span> <span>${this.t("economyDiscounts")}</span>
                    </h5>
                    <span class="economy-accordion__chevron">▼</span>
                  </div>
                  <span class="economy-accordion__subtext" id="ecoDiscountsSummary">Loading...</span>
                </summary>
                <div class="economy-accordion__body">
                  <div class="form-row">
                    <div class="form-group">
                      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;">
                        <label class="form-label" for="cfgPromoCode" style="margin-bottom:0;">${this.t("fieldPromoCode")}</label>
                        <span id="promoValidityBadge" class="promo-pill" style="display:none;"></span>
                      </div>
                      <input type="text" id="cfgPromoCode" class="form-input" value="${u(a.promoCode||"")}" placeholder="e.g. YUMMY10" maxlength="20" style="text-transform:uppercase;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoType">${this.t("fieldPromoType")}</label>
                      <select id="cfgPromoType" class="form-select">
                        <option value="percent" ${a.promoType==="percent"?"selected":""}>${this.t("promoPercent")}</option>
                        <option value="fixed" ${a.promoType==="fixed"?"selected":""}>${this.t("promoFixed")}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoValue">${this.t("fieldPromoValue")}</label>
                      <input type="number" id="cfgPromoValue" class="form-input" value="${u(a.promoValue??0)}" min="0" step="1" inputmode="decimal" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoExpiry">${this.t("fieldPromoExpiry")}</label>
                      <input type="date" id="cfgPromoExpiry" class="form-input" value="${u(a.promoExpiry||"")}" />
                    </div>
                  </div>
                </div>
              </details>

              <!-- Sticky Save Footer Bar -->
              <div class="economy-sticky-footer">
                <button type="submit" id="btnSaveEconomy" class="btn btn--primary btn-save-economy" disabled aria-label="Save economy settings">${this.t("saveEconomy")}</button>
              </div>
            </form>

            <!-- Live Preview Card Column -->
            <div class="economy-preview-container" id="economyLivePreviewContainer" role="region" aria-label="Live preview">
              <div class="economy-preview-sticky is-collapsed" id="economyPreviewStickyCard">
                <div class="economy-preview-heading" onclick="app.toggleMobilePreviewExpand()" role="button" tabindex="0" aria-label="Toggle preview breakdown">
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span>⚡</span> <span>${this.t("economyPreview")}</span>
                  </div>
                  <div style="display:flex;align-items:center;gap:8px;">
                    <span id="mobilePreviewSummaryText" style="font-size:0.95rem;font-weight:700;color:var(--berry);"></span>
                    <span class="economy-preview-chevron" id="previewChevron">▲</span>
                  </div>
                </div>
                <p class="economy-preview-sample-note" style="font-size:0.8rem;color:var(--muted);margin:0 0 14px 0;">${this.t("economyPreviewSample")}</p>
                <div id="economyLivePreviewCard" class="economy-preview-box"></div>
              </div>
            </div>
          </div>
        `,this.updateEconomyPreview();break;case"users":this.renderUsersTab(e);break;case"data":if(!n)return;const d={config:this.config,products:this.products};e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Backup, Import & Factory Reset</h4>
          <div class="form-group">
            <label class="form-label">Export / Import Shop State (JSON)</label>
            <textarea id="dataJsonBox" class="form-textarea" style="font-family:monospace;font-size:0.8rem;min-height:160px;">${u(JSON.stringify(d,null,2))}</textarea>
          </div>
          <div style="display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px;">
            <button type="button" class="btn btn--primary" onclick="app.importJsonData()">Import JSON Backup</button>
            <button type="button" class="btn btn--ghost" onclick="app.copyJsonData()">Copy JSON to Clipboard</button>
          </div>
          <div style="border-top:1px solid var(--line);padding-top:20px;margin-bottom:20px;">
            <h5 style="font-family:var(--font-serif);font-size:1rem;margin-bottom:8px;">Developer Flags</h5>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
              <input type="checkbox" id="cfgWatermark" ${this.config.showWatermark!==!1?"checked":""} onchange="app.toggleWatermarkSetting(this.checked)" />
              <span>Show watermark pill ("developed with respect and love by null-tech")</span>
            </label>
          </div>
          <div style="border-top:1px solid var(--line);padding-top:20px;">
            <h5 class="danger-title">${u(this.t("resetDeviceTitle"))}</h5>
            <p class="panel-hint">${u(this.t("resetDeviceHint"))}</p>
            <button type="button" class="btn btn--ghost btn--danger-outline" onclick="app.factoryReset()">${u(this.t("resetDeviceBtn"))}</button>
          </div>
        `;break}},reviewModerationHtml(){const t=this.allReviews||[],e=t.filter(s=>s.status==="pending"),r=t.filter(s=>s.status!=="pending").slice(0,20),n=this.lang==="ku"?"ckb":"en-GB",o=s=>`
      <article class="moderation-card" data-status="${u(s.status)}">
        <header class="moderation-card__head">
          <strong>${u(s.name)}</strong>
          <span class="text-small panel-muted">${u(s.createdAt?new Date(s.createdAt).toLocaleString(n):"")}</span>
          ${Number.isInteger(s.rating)?`<span class="stars" aria-label="${u(this.t("reviewStarsLabel").replace("{n}",s.rating))}">${"★".repeat(s.rating)}</span>`:""}
        </header>
        <p class="moderation-card__text">${u(s.text)}</p>
        <div class="moderation-card__actions">
          ${s.status!=="approved"?`<button type="button" class="btn btn--primary btn--xs" onclick="app.moderate(${j(s.id)}, 'approved')">${u(this.t("reviewApprove"))}</button>`:""}
          ${s.status!=="rejected"?`<button type="button" class="btn btn--ghost btn--xs" onclick="app.moderate(${j(s.id)}, 'rejected')">${u(this.t(s.status==="approved"?"reviewUnpublish":"reviewReject"))}</button>`:""}
          <button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.removeModeratedReview(${j(s.id)})">${u(this.t("usersDelete"))}</button>
        </div>
      </article>`;return`
      <section class="moderation" aria-labelledby="moderationTitle">
        <h4 class="panel-tab-title" id="moderationTitle">${u(this.t("reviewsPendingTitle"))} (${e.length})</h4>
        ${e.length?e.map(o).join(""):`<p class="panel-hint">${u(this.t("reviewsPendingEmpty"))}</p>`}
        ${r.length?`<details class="moderation-history"><summary>${u(this.t("reviewsDecidedTitle"))} (${r.length})</summary>${r.map(o).join("")}</details>`:""}
      </section>`},async moderate(t,e){await this.runWrite(()=>{var r;return L.moderateReview(t,e,(r=this.session)==null?void 0:r.uid)},{successMsg:e==="approved"?this.t("reviewApproved"):this.t("reviewRejected")})},async removeModeratedReview(t){await this.confirmDialog({title:this.t("usersDelete"),message:this.t("reviewDeleteConfirm"),okLabel:this.t("usersDelete"),danger:!0})&&await this.runWrite(()=>L.deleteReview(t),{successMsg:this.t("toastDeleted")})},renderThemeTab(t){if(!t)return;const e=this.config.theme?this.config.theme.presetId:"berry",r=this.config.theme&&this.config.theme.mode||"light";let n="";Object.keys(z).forEach(o=>{const s=z[o],i=s.tokens;n+=`
        <div class="theme-preset-card ${o===e?"active":""}" onclick="app.previewTheme(${j(o)})">
          <div style="font-weight:600;font-size:0.95rem;color:var(--ink);">${u(s.label[this.lang])}</div>
          <div class="theme-swatches">
            <div class="theme-swatch" style="background:${u(i.cream)}"></div>
            <div class="theme-swatch" style="background:${u(i.berry)}"></div>
            <div class="theme-swatch" style="background:${u(i.ink)}"></div>
            <div class="theme-swatch" style="background:${u(i.gold)}"></div>
            <div class="theme-swatch" style="background:${u(i.blush)}"></div>
          </div>
        </div>
      `}),t.innerHTML=`
      <div class="theme-panel-layout">
        <div>
          <div style="margin-bottom: 20px;">
            <div style="font-size:0.85rem;font-weight:600;color:var(--muted);margin-bottom:8px;">Appearance Mode</div>
            <div class="switch-group" style="display:inline-flex;">
              <button type="button" class="switch-btn ${r!=="dark"?"is-active":""}" onclick="app.setThemeMode('light')">☀️ Light</button>
              <button type="button" class="switch-btn ${r==="dark"?"is-active":""}" onclick="app.setThemeMode('dark')">🌙 Dark</button>
            </div>
          </div>

          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t("themePresetTitle")}</h4>
          <div class="theme-presets" style="margin-bottom:24px;">
            ${n}
          </div>
          <div style="margin-bottom: 24px;">
            <label style="display:flex;align-items:center;gap:10px;font-size:0.9rem;font-weight:600;color:var(--cocoa);cursor:pointer;">
              <input type="checkbox" id="cfgAutoDark" onchange="app.toggleAutoDark(this.checked)" ${this.config.theme&&this.config.theme.autoDark?"checked":""} style="width:18px;height:18px;">
              ${this.t("themeAutoDark")}
            </label>
          </div>
          <button type="button" class="btn btn--primary" onclick="app.saveTheme()">
            ${this.t("themeSave")}
          </button>
        </div>
        <div>
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t("themePreviewTitle")}</h4>
          <div id="themePreviewMount">
          <div id="themePreviewCard" class="theme-preview-card" style="margin-bottom:16px;">
            <h3>${this.t("themePreviewHeading")}</h3>
            <p>${this.t("themePreviewBody")}</p>
            <div class="theme-preview-buttons">
              <div class="btn btn--primary" onclick="app.showToast(this.innerText, 'info')" style="font-size:0.85rem;padding:6px 12px;cursor:pointer;">${this.t("themePreviewPrimary")}</div>
              <div class="btn btn--ghost" onclick="app.showToast(this.innerText, 'info')" style="font-size:0.85rem;padding:6px 12px;cursor:pointer;">${this.t("themePreviewGhost")}</div>
            </div>
            <div class="theme-preview-gold">${this.t("themePreviewGold")}</div>
            <div class="theme-preview-price">${this.t("themePreviewPrice")}</div>
          </div>
          </div>
        </div>
      </div>
    `,this.addPhonePreviewToggle(document.getElementById("themePreviewMount"),{frameId:"themePreviewCard",mountId:"themePreviewMount"})},previewTheme(t){if(!z[t])return;this.applyTheme(z[t].tokens);const e=document.querySelectorAll(".theme-preset-card");e.forEach(n=>n.classList.remove("active"));const r=z[t].label[this.lang];e.forEach(n=>{n.querySelector("div").textContent===r&&n.classList.add("active")}),this._previewThemeId=t},async saveTheme(){const t=this._previewThemeId||(this.config.theme?this.config.theme.presetId:"berry");if(!z[t])return;const e=document.getElementById("cfgAutoDark")?document.getElementById("cfgAutoDark").checked:!!(this.config.theme&&this.config.theme.autoDark),r=this.config.theme&&this.config.theme.mode||"light";await this.commitConfig("theme",o=>(o.theme={presetId:t,tokens:z[t].tokens,mode:r,autoDark:e},null),{quiet:!0})&&(this._previewThemeId=null,this.applyTheme(this.config.theme.tokens),this.showToast(this.t("themeApplied"),"success"),this.renderThemeTab(document.getElementById("panelContent")))},async toggleAutoDark(t){await this.commitConfig("theme",r=>(r.theme={...r.theme,autoDark:!!t},null))?this.applyTheme(this.config.theme.tokens):this.renderThemeTab(document.getElementById("panelContent"))},revertTheme(){if(this._previewThemeId){document.body.style.transition="background-color 0.3s ease, color 0.3s ease";const t=this.config.theme?this.config.theme.presetId:"berry";z[t]&&this.applyTheme(z[t].tokens),this._previewThemeId=null,setTimeout(()=>{document.body.style.transition=""},300),this.showToast(this.t("themeReverted"))}},renderUsersTab(t){if(!t)return;const e=this.session;if(!e||e.role!=="admin"&&e.role!=="dev"){t.innerHTML=`<p class="panel-hint">${u(this.t("usersNoAccess"))}</p>`;return}const r=(this.userSearchQuery||"").toLowerCase().trim();let n=(this.staffDirectory||[]).slice();r&&(n=n.filter(s=>[s.name,s.email,s.uid].some(i=>String(i||"").toLowerCase().includes(r)))),n.sort((s,i)=>(s.role==="admin"?0:1)-(i.role==="admin"?0:1)||String(s.name||"").localeCompare(String(i.name||"")));const o=n.length===0?`<tr><td colspan="5" class="panel-table__empty">${u(this.t("usersEmpty"))}</td></tr>`:n.map(s=>{const i=s.role==="staff"&&Array.isArray(s.perms)&&s.perms.length?s.perms.map(c=>this.t("perm_"+c)||c).join(", "):"—",a=s.uid===e.uid;return`
            <tr>
              <td><span class="badge ${s.role==="admin"?"badge--admin":"badge--staff"}">${u(this.t("role_"+s.role)||s.role)}</span></td>
              <td><strong>${u(s.name||"—")}</strong></td>
              <td dir="ltr">${u(s.email||"—")}<br><span class="text-small panel-muted">${u(s.uid)}</span></td>
              <td class="user-perms">${u(i)}</td>
              <td class="panel-table__actions">
                <button type="button" class="btn btn--secondary btn--xs" onclick="app.editUser(${j(s.uid)})">${u(this.t("usersEdit"))}</button>
                ${a?`<span class="user-self-hint">${u(this.t("usersYou"))}</span>`:`<button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.deleteUser(${j(s.uid)})">${u(this.t("usersDelete"))}</button>`}
              </td>
            </tr>`}).join("");t.innerHTML=`
      <div class="panel-tab-head">
        <h4 class="panel-tab-title">${u(this.t("usersTitle"))} (${n.length})</h4>
        <div class="panel-tab-tools">
          <label class="sr-only" for="userSearchInput">${u(this.t("usersSearch"))}</label>
          <input type="search" id="userSearchInput" class="form-input form-input--compact" placeholder="${u(this.t("usersSearch"))}" value="${u(this.userSearchQuery||"")}" oninput="app.handleUserSearch(this.value)" />
          <button type="button" class="btn btn--primary btn--sm" onclick="app.showAddStaffModal()">+ ${u(this.t("usersAddStaff"))}</button>
        </div>
      </div>
      <div class="panel-callout" role="note">
        <p>${u(this.t("usersClaimsHint"))}</p>
        <code dir="ltr">npm run staff:claims</code>
      </div>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th scope="col">${u(this.t("usersColRole"))}</th>
              <th scope="col">${u(this.t("usersColName"))}</th>
              <th scope="col">${u(this.t("usersColLogin"))}</th>
              <th scope="col">${u(this.t("usersColPerms"))}</th>
              <th scope="col" class="panel-table__actions">${u(this.t("usersColActions"))}</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </div>`},handleUserSearch(t){this.userSearchQuery=t;const e=document.getElementById("panelContent");if(e&&this.activePanelTab==="users"){this.renderUsersTab(e);const r=document.getElementById("userSearchInput");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))}},editUser(t){const e=(this.staffDirectory||[]).find(r=>r.uid===t);e&&this.showAddStaffModal(e)},async deleteUser(t){var n;const e=(this.staffDirectory||[]).find(o=>o.uid===t);!e||t===((n=this.session)==null?void 0:n.uid)||!await this.confirmDialog({title:this.t("usersDelete"),message:this.t("usersConfirmDelete").replace("{name}",e.name||e.email||e.uid),okLabel:this.t("usersDelete"),danger:!0})||await this.runWrite(()=>L.deleteStaffEntry(t),{successMsg:this.t("staffRemovedHint")})},addPhonePreviewToggle(t,e){if(!t)return;const r=document.createElement("div");r.className="phone-preview-bar",r.setAttribute("role","group"),r.setAttribute("aria-label",this.t("phonePreviewLabel")),r.innerHTML=`
      <button type="button" class="phone-preview-btn is-active" data-phone-mode="desktop"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> ${this.t("phonePreviewDesktop")}</button>
      <button type="button" class="phone-preview-btn" data-phone-mode="phone"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg> ${this.t("phonePreviewPhone")}</button>
    `,t.parentNode.insertBefore(r,t),r.addEventListener("click",n=>{const o=n.target.closest(".phone-preview-btn");o&&this.setPhonePreviewMode(r,o.dataset.phoneMode,e)})},setPhonePreviewMode(t,e,r){if(!t)return;t.querySelectorAll(".phone-preview-btn").forEach(s=>s.classList.toggle("is-active",s.dataset.phoneMode===e));const n=document.getElementById(r.frameId),o=document.getElementById(r.mountId);if(!(!n||!o))if(e==="phone"){if(!n.classList.contains("phone-frame")){const s=document.createElement("div");s.className="phone-frame__notch",o.insertBefore(s,n),n.classList.add("phone-frame")}}else{const s=o.querySelector(":scope > .phone-frame__notch");s&&s.remove(),n.classList.remove("phone-frame")}},orderTotal(t){var e,r;return Number(((e=t.totals)==null?void 0:e.total)??((r=t.economy)==null?void 0:r.total))||0},renderCustomersTab(t){if(!t)return;const e=new Map;(this.customers||[]).forEach(l=>{e.set(l.id,{id:l.id,name:l.name||this.t("customerFallbackName"),phone:l.phone||"",orders:[]})}),(this.staffOrders||[]).forEach(l=>{const g=l.customerId;e.has(g)||e.set(g,{id:g,name:l.customer&&l.customer.name||this.t("customerFallbackName"),phone:l.customer&&l.customer.phone||"",orders:[]}),e.get(g).orders.push(l)});let r=[...e.values()];const n=(this.customerSearchQuery||"").toLowerCase().trim();n&&(r=r.filter(l=>String(l.name).toLowerCase().includes(n)||String(l.phone).includes(n)));const o=l=>l.orders.length?Math.max(...l.orders.map(g=>g.createdAt||0)):0,s=l=>l.orders.reduce((g,E)=>g+this.orderTotal(E),0),i=this.customerSortOption||"lastOrder";i==="name"?r.sort((l,g)=>String(l.name).localeCompare(String(g.name))):i==="totalSpent"?r.sort((l,g)=>s(g)-s(l)):i==="orderCount"?r.sort((l,g)=>g.orders.length-l.orders.length):r.sort((l,g)=>o(g)-o(l));const a=this.lang==="ku"?"ckb":"en-GB",c=r.length===0?`<tr><td colspan="6" class="panel-table__empty">${u(this.t("customersEmpty"))}</td></tr>`:r.map(l=>`
          <tr>
            <td><strong>${u(l.name)}</strong></td>
            <td dir="ltr">${u(l.phone||"—")}</td>
            <td><span class="badge badge--customer">${l.orders.length}</span></td>
            <td class="panel-money">${u(this.formatPrice(s(l)))}</td>
            <td>${u(o(l)?new Date(o(l)).toLocaleDateString(a,{day:"numeric",month:"short",year:"numeric"}):"—")}</td>
            <td><button type="button" class="btn btn--xs btn--secondary" onclick="app.openCustomerDrawer(${j(l.id)})">${u(this.t("myOrdersDetails"))}</button></td>
          </tr>`).join(""),d=(l,g)=>`<option value="${l}" ${i===l?"selected":""}>${u(this.t(g))}</option>`;t.innerHTML=`
      <div class="panel-tab-head">
        <h4 class="panel-tab-title">${u(this.t("tabCustomers"))} (${r.length})</h4>
        <div class="panel-tab-tools">
          <label class="sr-only" for="customerSearchInput">${u(this.t("customersSearch"))}</label>
          <input type="search" id="customerSearchInput" class="form-input form-input--compact" placeholder="${u(this.t("customersSearch"))}" value="${u(this.customerSearchQuery||"")}" oninput="app.handleCustomerSearch(this.value)" />
          <label class="sr-only" for="customerSortSelect">${u(this.t("sortLabel"))}</label>
          <select id="customerSortSelect" class="form-select form-input--compact" onchange="app.handleCustomerSort(this.value)">
            ${d("lastOrder","customersSortLastOrder")}${d("totalSpent","customersSortTotalSpent")}${d("orderCount","customersSortOrderCount")}${d("name","customersSortName")}
          </select>
        </div>
      </div>
      <p class="panel-hint">${u(this.t("customersScopeHint"))}</p>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead><tr>
            <th scope="col">${u(this.t("customersSortName"))}</th>
            <th scope="col">${u(this.t("colPhone"))}</th>
            <th scope="col">${u(this.t("customerOrders"))}</th>
            <th scope="col">${u(this.t("customerTotalSpent"))}</th>
            <th scope="col">${u(this.t("customerLastOrder"))}</th>
            <th scope="col"><span class="sr-only">${u(this.t("usersColActions"))}</span></th>
          </tr></thead>
          <tbody>${c}</tbody>
        </table>
      </div>`},handleCustomerSearch(t){this.customerSearchQuery=t;const e=document.getElementById("panelContent");if(e&&this.activePanelTab==="customers"){this.renderCustomersTab(e);const r=document.getElementById("customerSearchInput");r&&(r.focus(),r.setSelectionRange(r.value.length,r.value.length))}},handleCustomerSort(t){this.customerSortOption=t;const e=document.getElementById("panelContent");e&&this.activePanelTab==="customers"&&this.renderCustomersTab(e)},openCustomerDrawer(t){this.selectedStaffCustomerId=t,this.customerNoteText="";let e=document.getElementById("staffCustomerDrawer"),r=document.getElementById("staffCustomerBackdrop");e||(e=document.createElement("div"),e.id="staffCustomerDrawer",e.className="customer-drawer",e.setAttribute("role","dialog"),e.setAttribute("aria-modal","true"),e.setAttribute("aria-labelledby","customerDrawerTitle"),document.body.appendChild(e)),r||(r=document.createElement("div"),r.id="staffCustomerBackdrop",r.className="customer-drawer-backdrop",r.onclick=()=>this.closeCustomerDrawer(),document.body.appendChild(r)),this._noteUnsub&&this._noteUnsub(),this._noteUnsub=re(this.session,"customers")&&L?L.watchCustomerNote(t,n=>{this.customerNoteText=n;const o=document.getElementById("customerNoteBox");o&&document.activeElement!==o&&(o.value=n)},n=>this.reportListenerError("customer note",n)):null,this.renderCustomerDrawerContent(),r.classList.add("is-open"),this.openDialog("staffCustomerDrawer",document.activeElement,{onEscape:()=>this.closeCustomerDrawer()})},closeCustomerDrawer(){this._noteUnsub&&(this._noteUnsub(),this._noteUnsub=null);const t=!!this.selectedStaffCustomerId;this.selectedStaffCustomerId=null;const e=document.getElementById("staffCustomerBackdrop");e&&e.classList.remove("is-open"),t&&this.closeDialog("staffCustomerDrawer")},async updateOrderStatus(t,e){await this.runWrite(()=>{var n;return L.updateOrderStatus(t,e,(n=this.session)==null?void 0:n.uid)},{quiet:!0})?this.showToast(this.t("orderStatusUpdated").replace("{status}",this.t("orderStatus"+e[0].toUpperCase()+e.slice(1))),"success"):this.renderCustomerDrawerContent()},async saveCustomerPrivateNote(t,e){await this.runWrite(()=>{var r;return L.saveCustomerNote(t,e,(r=this.session)==null?void 0:r.uid)},{successMsg:this.t("noteSaved")})},renderCustomerDrawerContent(){const t=document.getElementById("staffCustomerDrawer"),e=this.selectedStaffCustomerId;if(!t||!e)return;const r=(this.customers||[]).find(l=>l.id===e),n=(this.staffOrders||[]).filter(l=>l.customerId===e),o=r&&r.name||n[0]&&n[0].customer&&n[0].customer.name||this.t("customerFallbackName"),s=r&&r.phone||n[0]&&n[0].customer&&n[0].customer.phone||"—",i=n.reduce((l,g)=>l+this.orderTotal(g),0),a=this.lang==="ku"?"ckb":"en-GB",c=["pending","confirmed","completed","cancelled"],d=n.length===0?`<p class="panel-hint">${u(this.t("customerNoOrders"))}</p>`:n.map(l=>{const g=(l.items||[]).map(S=>`${S.qty}× ${S.name||S.nameSnapshot||S.productId} (${this.formatPrice((S.unitPriceUSD??S.usdSnapshot??0)*S.qty)})`),E={baking:"confirmed",delivered:"completed"}[l.status]||l.status;return`
            <div class="drawer-order">
              <div class="drawer-order__head">
                <span class="drawer-order__id">#${u(String(l.id).slice(-6).toUpperCase())}</span>
                <span class="drawer-order__date">${u(new Date(l.createdAt).toLocaleString(a))}</span>
              </div>
              <div class="drawer-order__items">${g.map(u).join("<br>")}</div>
              ${l.fulfillmentAt?`<div class="drawer-order__meta">${u(this.t("historyRequestedFor"))}: ${u(Ne(new Date(l.fulfillmentAt),this.lang))}</div>`:""}
              ${l.customer&&l.customer.address?`<div class="drawer-order__meta">${u(this.t("checkoutAddressLabel"))}: ${u(l.customer.address)}</div>`:""}
              ${l.note?`<div class="drawer-order__meta">${u(this.t("orderNoteLabel"))}: ${u(l.note)}</div>`:""}
              <div class="drawer-order__foot">
                <strong class="panel-money">${u(this.formatPrice(this.orderTotal(l)))}</strong>
                <label class="drawer-order__status">
                  <span>${u(this.t("customerChangeStatus"))}</span>
                  <select class="form-select form-input--compact" onchange="app.updateOrderStatus(${j(l.id)}, this.value)">
                    ${c.map(S=>`<option value="${S}" ${E===S?"selected":""}>${u(this.t("orderStatus"+S[0].toUpperCase()+S.slice(1)))}</option>`).join("")}
                  </select>
                </label>
              </div>
            </div>`}).join("");t.innerHTML=`
      <div class="customer-drawer-header">
        <div>
          <h3 id="customerDrawerTitle" class="customer-drawer-title">${u(o)}</h3>
          <p class="panel-hint" dir="auto">${u(s)} · ${n.length} · ${u(this.formatPrice(i))}</p>
        </div>
        <button type="button" class="modal-close" onclick="app.closeCustomerDrawer()" aria-label="${u(this.t("btnClose"))}">✕</button>
      </div>
      <div class="customer-drawer-body">
        <div class="form-group">
          <label class="form-label" for="customerNoteBox">${u(this.t("customerPrivateNote"))}</label>
          <textarea id="customerNoteBox" class="form-textarea" rows="3" onchange="app.saveCustomerPrivateNote(${j(e)}, this.value)">${u(this.customerNoteText||"")}</textarea>
        </div>
        <h4 class="panel-tab-title">${u(this.t("customerOrders"))} (${n.length})</h4>
        ${d}
      </div>`},initLogoDraft(){const t=this.config||tt;let e=0;if(t.logoImage){const r=t.logoImage.length-(t.logoImage.indexOf(",")+1);e=Math.round(r*.75)}this.draftLogo={mode:t.logoMode||(t.logoImage?"image":t.logoUrl?"url":"emoji"),emoji:t.logoEmoji||"🎂",image:t.logoImage||"",url:t.logoUrl||t.logoImageUrl||"",imageBytes:e,isSvg:t.logoImage?t.logoImage.includes("image/svg"):!1,urlStatus:null,isReadyToSave:!1,fallback:!1}},getLogoEditorHtml(){this.draftLogo||this.initLogoDraft();const t=this.draftLogo,e=t.mode;let r="";const n=e==="image"&&!!(t.image&&t.image.trim()),o=e==="url"&&!!(t.url&&t.url.trim());t.fallback||e==="emoji"||!n&&!o?r=`<span class="logo-preview-emoji">${u(t.emoji||"🎂")}</span>`:e==="image"&&n?r=`<img src="${u(t.image)}" class="logo-preview-img" alt="Logo preview" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`:e==="url"&&o&&(r=`<img src="${u(t.url)}" class="logo-preview-img" alt="Logo preview" crossorigin="anonymous" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`);let s="";if(e==="emoji")s=`${this.t("logoModeEmoji")} · ${u(t.emoji||"🎂")}`;else if(e==="image"){const c=t.imageBytes>0?t.imageBytes>1024?Math.round(t.imageBytes/1024)+" KB":t.imageBytes+" B":"Active";s=`${this.t("logoModeUpload")} · ${c}`}else e==="url"&&(s=this.t("logoUrlLabel"));let i="";t.isReadyToSave?i=`<span class="logo-chip logo-chip--ready">✓ ${this.t("logoUploadReady")}</span>`:e==="url"&&t.urlStatus==="valid"?i=`<span class="logo-chip logo-chip--valid">✓ ${this.t("logoUrlValid")}</span>`:e==="url"&&t.urlStatus==="invalid"&&(i=`<span class="logo-chip logo-chip--error">✗ ${this.t("logoUrlInvalid")}</span>`);const a=e==="image"&&!!t.image||e==="url"&&!!t.url;return`
      <div class="logo-card">
        <div class="logo-card__header">
          <h5 class="logo-card__title">
            <span><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/></svg></span> <span>${this.t("logoSection")}</span>
          </h5>
          <span style="font-size:0.75rem;color:var(--muted);">${this.t("logoFaviconNote")}</span>
        </div>
        <div class="logo-card__body">
          <!-- Preview Column -->
          <div class="logo-preview-col">
            <div class="logo-preview-box ${t.fallback?"is-fallback":""}" id="logoPreviewBox">
              ${r}
            </div>
            <div class="logo-preview-meta" id="logoPreviewMeta">${u(s)}</div>
            ${i?`<div id="logoStatusChipArea">${i}</div>`:'<div id="logoStatusChipArea"></div>'}
            ${t.fallback?`<div class="logo-warning-note">${this.t("logoFallbackWarning")}</div>`:""}
            ${a?`
              <button type="button" class="btn btn--ghost btn--sm" style="color:#b91c1c;border-color:#fca5a5;padding:4px 10px;font-size:0.78rem;margin-top:4px;" onclick="app.removeLogo()">
                ${this.t("logoRemoveBtn")}
              </button>
            `:""}
          </div>

          <!-- Controls Column -->
          <div class="logo-controls-col">
            <!-- Mode Switcher -->
            <div class="logo-mode-switcher" role="radiogroup" aria-label="Logo Mode">
              <button type="button" class="logo-mode-btn ${e==="emoji"?"is-active":""}" onclick="app.setLogoMode('emoji')">
                ${this.t("logoModeEmoji")}
              </button>
              <button type="button" class="logo-mode-btn ${e==="image"?"is-active":""}" onclick="app.setLogoMode('image')">
                ${this.t("logoModeUpload")}
              </button>
              <button type="button" class="logo-mode-btn ${e==="url"?"is-active":""}" onclick="app.setLogoMode('url')">
                ${this.t("logoModeUrl")}
              </button>
            </div>

            <!-- Mode 1: Emoji -->
            <div id="logoModeEmojiArea" style="display:${e==="emoji"?"block":"none"};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="logoEmojiInput">${this.t("logoEmojiLabel")}</label>
                <input type="text" id="logoEmojiInput" class="form-input" maxlength="4" value="${u(t.emoji||"🎂")}" oninput="app.handleLogoEmojiInput(this.value)" style="max-width:140px;font-size:1.3rem;text-align:center;" />
                <p style="font-size:0.78rem;color:var(--muted);margin:4px 0 8px 0;">${this.t("logoEmojiHint")}</p>
                <div class="quick-pick-emojis">
                  ${["🎂","🍰","🧁","🍩","🍪","🥐","🍫","☕"].map(c=>`
                    <button type="button" class="quick-pick-btn" onclick="app.selectQuickEmoji(${j(c)})" title="${u(c)}" aria-label="Select ${u(c)}">${u(c)}</button>
                  `).join("")}
                </div>
              </div>
            </div>

            <!-- Mode 2: Upload -->
            <div id="logoModeUploadArea" style="display:${e==="image"?"block":"none"};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label">${this.t("logoModeUpload")}</label>
                <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap;">
                  <label class="upload-btn" for="logoFileInput" style="cursor:pointer;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                    <span>${t.image?this.t("logoReplaceBtn"):this.t("logoUploadBtn")}</span>
                    <input type="file" id="logoFileInput" accept="image/png,image/jpeg,image/webp,image/svg+xml" onchange="app.handleLogoFileUpload(event)" style="display:none;" />
                  </label>
                </div>
                <p style="font-size:0.78rem;color:var(--muted);margin-top:8px;">${this.t("logoUploadHint")}</p>
              </div>
            </div>

            <!-- Mode 3: URL -->
            <div id="logoModeUrlArea" style="display:${e==="url"?"block":"none"};">
              <div class="form-group" style="margin-bottom:0;">
                <label class="form-label" for="logoUrlInput">${this.t("logoUrlLabel")}</label>
                <input type="url" id="logoUrlInput" class="form-input" dir="ltr" placeholder="https://..." value="${u(t.url||"")}" oninput="app.handleLogoUrlInput(this.value)" />
                <p style="font-size:0.78rem;color:var(--muted);margin-top:4px;">${this.t("logoUrlHint")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `},updateLogoCardUI(){const t=document.getElementById("logoEditorContainer");t&&(t.innerHTML=this.getLogoEditorHtml())},setLogoMode(t){this.draftLogo||this.initLogoDraft(),this.draftLogo.mode=t,this.draftLogo.fallback=!1,this.updateLogoCardUI()},handleLogoEmojiInput(t){this.draftLogo||this.initLogoDraft(),this.draftLogo.emoji=t.trim()||"🎂",this.draftLogo.fallback=!1,this.updateLogoPreviewBox()},selectQuickEmoji(t){this.draftLogo||this.initLogoDraft(),this.draftLogo.emoji=t,this.draftLogo.fallback=!1;const e=document.getElementById("logoEmojiInput");e&&(e.value=t),this.updateLogoPreviewBox()},updateLogoPreviewBox(){const t=document.getElementById("logoPreviewBox"),e=document.getElementById("logoPreviewMeta"),r=this.draftLogo;!t||!r||r.mode==="emoji"&&(t.className="logo-preview-box",t.innerHTML=`<span class="logo-preview-emoji">${u(r.emoji||"🎂")}</span>`,e&&(e.textContent=`${this.t("logoModeEmoji")} · ${r.emoji||"🎂"}`))},async handleLogoFileUpload(t){const e=t.target.files&&t.target.files[0];if(e)try{const r=await Ml(e);this.draftLogo||this.initLogoDraft(),this.draftLogo.image=r.dataUrl,this.draftLogo.imageBytes=r.approxBytes,this.draftLogo.isSvg=r.isSvg,this.draftLogo.mode="image",this.draftLogo.isReadyToSave=!0,this.draftLogo.fallback=!1,this.updateLogoCardUI(),this.showToast(this.t("toastPhotoReady")||"Logo ready to save","info")}catch(r){console.error("Logo upload error:",r),r.message==="FILE_TOO_LARGE"||r.message==="OUTPUT_TOO_LARGE"?this.showToast(this.t("logoUploadTooLarge"),"error"):this.showToast(this.t("logoUploadError"),"error")}finally{t.target.value=""}},handleLogoUrlInput(t){this.draftLogo||this.initLogoDraft();const e=t.trim();if(e.toLowerCase().startsWith("javascript:")||e.toLowerCase().startsWith("data:")){this.showToast(this.t("invalidUrl"),"error"),this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI();return}this.draftLogo.url=e,this.draftLogo.urlStatus=null,this.draftLogo.fallback=!1,this._logoUrlDebounce&&clearTimeout(this._logoUrlDebounce),this._logoUrlDebounce=setTimeout(()=>{if(!this.draftLogo.url){this.draftLogo.urlStatus=null,this.draftLogo.fallback=!1,this.updateLogoCardUI();return}const r=new Image;let n=!1;const o=setTimeout(()=>{n||(n=!0,this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI())},1500);r.onload=()=>{n||(n=!0,clearTimeout(o),this.draftLogo.urlStatus="valid",this.draftLogo.fallback=!1,this.updateLogoCardUI())},r.onerror=()=>{n||(n=!0,clearTimeout(o),this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI())},r.crossOrigin="anonymous",r.src=this.draftLogo.url},300)},handleLogoPreviewError(){this.draftLogo&&(this.draftLogo.fallback=!0,this.updateLogoCardUI())},handleLogoPreviewSuccess(){this.draftLogo&&this.draftLogo.fallback&&(this.draftLogo.fallback=!1,this.updateLogoCardUI())},removeLogo(){this.draftLogo||this.initLogoDraft(),this.draftLogo.image="",this.draftLogo.url="",this.draftLogo.imageBytes=0,this.draftLogo.mode="emoji",this.draftLogo.fallback=!1,this.draftLogo.urlStatus=null,this.draftLogo.isReadyToSave=!1,this.updateLogoCardUI(),this.showToast(this.t("logoRemoved"),"info")},async saveBrandSettings(t){t&&t.preventDefault();const e=n=>document.getElementById(n).value.trim();await this.commitConfig("brand",n=>(n.shopName={en:e("cfgShopNameEn"),ku:e("cfgShopNameKu")},n.tagline={en:e("cfgTaglineEn"),ku:e("cfgTaglineKu")},n.announcement={en:e("cfgAnnounceEn"),ku:e("cfgAnnounceKu")},this.draftLogo&&(n.logoMode=this.draftLogo.mode||"emoji",n.logoEmoji=this.draftLogo.emoji&&this.draftLogo.emoji.trim()||"🎂",n.logoImage=this.draftLogo.image||"",n.logoUrl=he(this.draftLogo.url||""),n.logoImageUrl=n.logoMode==="url"?n.logoUrl:""),null))&&this.draftLogo&&(this.draftLogo.isReadyToSave=!1,this.updateLogoCardUI())},async saveAboutSettings(t){t.preventDefault();const e=r=>document.getElementById(r).value.trim();await this.commitConfig("about",r=>{const n=e("cfgAboutImage");return n&&!he(n)?this.t("errInvalidUrl"):(r.aboutUs={...r.aboutUs,en:e("cfgAboutEn"),ku:e("cfgAboutKu"),imageUrl:n,eyebrowEn:e("cfgAboutEyebrowEn"),eyebrowKu:e("cfgAboutEyebrowKu"),titleEn:e("cfgAboutTitleEn"),titleKu:e("cfgAboutTitleKu")},null)})},getFaqItemHtml(t,e){return`
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeFaqItem(${e})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Question (EN)</label>
            <input type="text" class="form-input faq-q-en" value="${u(t.q.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Question (KU)</label>
            <input type="text" class="form-input faq-q-ku" value="${u(t.q.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Answer (EN)</label>
            <textarea class="form-input faq-a-en" required style="resize:vertical;min-height:60px;">${u(t.a.en)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Answer (KU)</label>
            <textarea class="form-input faq-a-ku" style="resize:vertical;min-height:60px;">${u(t.a.ku)}</textarea>
          </div>
        </div>
      </div>
    `},addFaqItem(){this.config.faq||(this.config.faq=[]),this.config.faq.push({q:{en:"",ku:""},a:{en:"",ku:""}}),this.renderPanelTab("faq")},removeFaqItem(t){this.config.faq&&(this.config.faq.splice(t,1),this.renderPanelTab("faq"))},getReviewItemHtml(t,e){return`
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeReviewItem(${e})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group" style="flex:0.3">
            <label class="form-label">Initials</label>
            <input type="text" class="form-input review-initials" value="${u(t.initials)}" required maxlength="2" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Name (EN)</label>
            <input type="text" class="form-input review-name-en" value="${u(t.name.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Name (KU)</label>
            <input type="text" class="form-input review-name-ku" value="${u(t.name.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role/Subtitle (EN)</label>
            <input type="text" class="form-input review-role-en" value="${u(t.role.en)}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Role/Subtitle (KU)</label>
            <input type="text" class="form-input review-role-ku" value="${u(t.role.ku)}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Quote (EN)</label>
            <textarea class="form-input review-quote-en" required style="resize:vertical;min-height:60px;">${u(t.quote.en)}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Quote (KU)</label>
            <textarea class="form-input review-quote-ku" style="resize:vertical;min-height:60px;">${u(t.quote.ku)}</textarea>
          </div>
        </div>
      </div>
    `},addReviewItem(){this.config.reviews||(this.config.reviews=[]),this.config.reviews.push({initials:"AN",name:{en:"Anonymous",ku:""},role:{en:"Customer",ku:""},quote:{en:"",ku:""}}),this.renderPanelTab("reviews")},removeReviewItem(t){this.config.reviews&&(this.config.reviews.splice(t,1),this.renderPanelTab("reviews"))},async resetReviews(){if(!await this.confirmDialog({title:this.t("reviewsResetTitle"),message:this.t("reviewsResetConfirm"),okLabel:this.t("reviewsResetBtn")}))return;await this.commitConfig("reviews",r=>(r.reviews=JSON.parse(JSON.stringify(tt.reviews)),null))&&this.renderPanelTab("reviews")},async saveReviewSettings(t){t.preventDefault();const e=d=>[...document.querySelectorAll(d)].map(l=>l.value.trim()),r=e(".review-initials"),n=e(".review-name-en"),o=e(".review-name-ku"),s=e(".review-role-en"),i=e(".review-role-ku"),a=e(".review-quote-en"),c=e(".review-quote-ku");await this.commitConfig("reviews",d=>(d.reviews=r.map((l,g)=>({initials:l.slice(0,2),name:{en:n[g],ku:o[g]},role:{en:s[g],ku:i[g]},quote:{en:a[g],ku:c[g]}})),null))},async saveFaqSettings(t){t.preventDefault();const e=i=>[...document.querySelectorAll(i)].map(a=>a.value.trim()),r=e(".faq-q-en"),n=e(".faq-q-ku"),o=e(".faq-a-en"),s=e(".faq-a-ku");await this.commitConfig("faq",i=>(i.faq=r.map((a,c)=>({q:{en:a,ku:n[c]},a:{en:o[c],ku:s[c]}})),null))},async saveContactSettings(t){t.preventDefault();const e=r=>document.getElementById(r).value.trim();await this.commitConfig("contact",r=>{const n=e("cfgWhatsapp").replace(/\D/g,"");return n&&!_e(n)?this.t("errInvalidWhatsApp"):(r.contact={...r.contact,whatsapp:n,phone:e("cfgPhone"),email:e("cfgEmail"),address:{en:e("cfgAddressEn"),ku:e("cfgAddressKu")},hours:{en:e("cfgHoursEn"),ku:e("cfgHoursKu")}},null)})},async saveSocialSettings(t){t.preventDefault();const e=r=>document.getElementById(r).value.trim();await this.commitConfig("socials",r=>{const n={instagram:e("cfgInsta"),facebook:e("cfgFb"),tiktok:e("cfgTiktok"),snapchat:e("cfgSnap")};return Object.values(n).some(o=>o&&!/^https:\/\//i.test(o))?this.t("errInvalidUrl"):(r.socials=n,null)})},handleFontPreviewChange(){const t=document.getElementById("cfgKuBody"),e=document.getElementById("cfgKuDisplay"),r=document.getElementById("cfgEnBody"),n=document.getElementById("cfgEnDisplay"),o=t?t.value:this.config&&this.config.kurdishBodyFont||"Vazirmatn",s=e?e.value:this.config&&this.config.kurdishDisplayFont||"Vazirmatn",i=r?r.value:this.config&&this.config.englishBodyFont||"DM Sans",a=n?n.value:this.config&&this.config.englishDisplayFont||"Cormorant Garamond";Sn([o,s,i,a]);const c=document.getElementById("fontPreviewHeading"),d=document.getElementById("fontPreviewBody");c&&(c.style.fontFamily=`'${s}', serif`),d&&(d.style.fontFamily=`'${o}', sans-serif`);const l=document.getElementById("fontPreviewHeadingEn"),g=document.getElementById("fontPreviewBodyEn");l&&(l.style.fontFamily=`'${a}', serif`),g&&(g.style.fontFamily=`'${i}', sans-serif`),document.documentElement.style.setProperty("--font-ku-body",`'${o}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-ku-display",`'${s}', serif`),this.lang==="ku"?(document.documentElement.style.setProperty("--font-body",`'${o}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${s}', serif`),document.documentElement.style.setProperty("--font-serif",`'${s}', serif`),document.documentElement.style.setProperty("--font-ui",`'${o}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${s}', serif`)):(document.documentElement.style.setProperty("--font-body",`'${i}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${a}', serif`),document.documentElement.style.setProperty("--font-serif",`'${a}', serif`),document.documentElement.style.setProperty("--font-ui",`'${i}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${a}', serif`))},async saveFontSettings(t){t&&t.preventDefault();const e=r=>document.getElementById(r);await this.commitConfig("fonts",r=>(e("cfgKuBody")&&(r.kurdishBodyFont=e("cfgKuBody").value),e("cfgKuDisplay")&&(r.kurdishDisplayFont=e("cfgKuDisplay").value),e("cfgEnBody")&&(r.englishBodyFont=e("cfgEnBody").value),e("cfgEnDisplay")&&(r.englishDisplayFont=e("cfgEnDisplay").value),null)),this.applyFonts()},applyFonts(){const t=this.lang==="ku",e=this.config&&this.config.kurdishBodyFont||"Vazirmatn",r=this.config&&this.config.kurdishDisplayFont||"Vazirmatn",n=this.config&&this.config.englishBodyFont||"DM Sans",o=this.config&&this.config.englishDisplayFont||"Cormorant Garamond";Sn(t?[e,r]:[n,o]),document.documentElement.style.setProperty("--font-ku-body",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-ku-display",`'${r}', serif`),t?(document.documentElement.style.setProperty("--font-body",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${r}', serif`),document.documentElement.style.setProperty("--font-serif",`'${r}', serif`),document.documentElement.style.setProperty("--font-ui",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${r}', serif`)):(document.documentElement.style.setProperty("--font-body",`'${n}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${o}', serif`),document.documentElement.style.setProperty("--font-serif",`'${o}', serif`),document.documentElement.style.setProperty("--font-ui",`'${n}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${o}', serif`))},applyTheme(t){const e=document.documentElement.style;let n={...t||this.config.theme&&this.config.theme.tokens||z.berry.tokens};const o=this.themeModePref||this.config&&this.config.theme&&this.config.theme.mode,s=this.config&&this.config.theme&&this.config.theme.autoDark,i=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,a=this.config&&this.config.theme&&this.config.theme.presetId,c=o==="dark"||o!=="light"&&s&&i||a==="midnight"&&o!=="light";c?(document.documentElement.setAttribute("data-theme","dark"),document.documentElement.classList.add("is-dark"),document.body.classList.add("is-dark"),n={...n,cream:"#15110E",shell:"#1E1814",surface:"#241D18",surfaceHover:"#2E241E",surfaceInput:"#1A1411",blush:"#342820",linen:"#221B16",berry:n.berry&&n.berry!=="#8E3B4A"&&n.berry!=="#1F2E4A"?n.berry:"#E07A5F",berryDark:"#C66247",berryDeep:"#F4A58E",cocoa:"#F7EFE8",cocoaSoft:"#D6C6B8",gold:"#E5B85C",goldSoft:"#F3D48E",ink:"#EDE3DA",muted:"#A89687",line:"#3A2E26",lineStrong:"#4F3F34",headerBg:"rgba(21, 17, 14, 0.94)",headerBgStuck:"rgba(21, 17, 14, 0.98)",footerBg:"#100C0A",footerText:"#EDE3DA",footerMuted:"rgba(237, 227, 218, 0.7)"}):(document.documentElement.setAttribute("data-theme","light"),document.documentElement.classList.remove("is-dark"),document.body.classList.remove("is-dark"),n={surface:"#FFFFFF",surfaceHover:"#FFF7F0",surfaceInput:"#FFFFFF",headerBg:"rgba(247, 241, 232, 0.94)",headerBgStuck:"rgba(247, 241, 232, 0.98)",footerBg:"#2C211B",footerText:"#FFFBF7",footerMuted:"rgba(255, 251, 247, 0.75)",...n}),s?document.documentElement.setAttribute("data-auto-dark","true"):document.documentElement.removeAttribute("data-auto-dark"),n.onAccent=wn(n.berry||"#8B4A32"),n.onGold=wn(n.gold||"#C99A3D"),Object.entries(n).forEach(([l,g])=>{e.setProperty("--"+l.replace(/([A-Z])/g,"-$1").toLowerCase(),g)}),document.body.style.background=n.cream,document.body.style.color=n.ink;let d=document.querySelector('meta[name="theme-color"]');d||(d=document.createElement("meta"),d.name="theme-color",document.head.appendChild(d)),d.content=c?"#15110E":n.berry,this.updateThemeToggleUI(c)},updateThemeToggleUI(t){const e=document.getElementById("themeModeToggle"),r=document.getElementById("themeModeIcon"),n=document.getElementById("mobileThemeModeToggle"),o=document.getElementById("mobileThemeModeIcon"),s=t?"☀️":"🌙";r&&(r.textContent=s),o&&(o.textContent=s),e&&(e.setAttribute("aria-label",t?"Switch to light mode":"Switch to dark mode"),e.title=t?this.lang==="ku"?"دۆخی ڕووناک":"Switch to Light Mode":this.lang==="ku"?"دۆخی تاریک":"Switch to Dark Mode",e.classList.toggle("is-active",t)),n&&(n.setAttribute("aria-label",t?"Switch to light mode":"Switch to dark mode"),n.title=t?this.lang==="ku"?"دۆخی ڕووناک":"Switch to Light Mode":this.lang==="ku"?"دۆخی تاریک":"Switch to Dark Mode",n.classList.toggle("is-active",t))},toggleDarkMode(){const t=document.documentElement.getAttribute("data-theme")==="dark";this.themeModePref=t?"light":"dark",this.savePref();const e=this.config.theme&&this.config.theme.presetId||"berry",r=z[e]&&z[e].tokens||this.config.theme.tokens;this.applyTheme(r),this.announce(this.themeModePref==="dark"?this.t("darkModeOn"):this.t("darkModeOff"))},async setThemeMode(t){if(!await this.commitConfig("theme",n=>(n.theme={...n.theme,mode:t==="dark"?"dark":"light"},null)))return;this.themeModePref=null,this.savePref();const r=this.config.theme.presetId||"berry";this.applyTheme(z[r]&&z[r].tokens||this.config.theme.tokens),this.activePanelTab==="theme"&&this.renderThemeTab(document.getElementById("panelContent"))},async toggleWatermarkSetting(t){if(!await this.commitConfig("watermark",r=>(r.showWatermark=!!t,null))){const r=document.getElementById("cfgWatermark");r&&(r.checked=!t)}},getDraftEconomy(){var D,R,N,T,f,h,m,y,v,b,p,te,Ce,yr,vr,br,wr,Er,Sr,_r;const t=this.config&&this.config.economy||Se;if(!document.getElementById("economySettingsForm"))return t;const r=((D=document.getElementById("cfgSecondaryCurrency"))==null?void 0:D.value)||t.secondaryCurrency,n=((R=document.getElementById("cfgShowSecondary"))==null?void 0:R.checked)??t.showSecondary,o=((T=(N=document.getElementById("cfgCurrencySymbol"))==null?void 0:N.value)==null?void 0:T.trim())||(r==="IQD"?"د.ع":r),s=Math.max(1,parseFloat((f=document.getElementById("cfgExchangeRate"))==null?void 0:f.value)||1310),i=parseInt((h=document.getElementById("cfgRoundingRule"))==null?void 0:h.value,10)||250,a=Math.max(0,parseFloat((m=document.getElementById("cfgDeliveryFee"))==null?void 0:m.value)||0),c=Math.max(0,parseFloat((y=document.getElementById("cfgFreeDeliveryOver"))==null?void 0:y.value)||0),d=Math.max(0,parseFloat((v=document.getElementById("cfgMinimumOrder"))==null?void 0:v.value)||0),l=!!((b=document.getElementById("cfgPickupOnly"))!=null&&b.checked),g=!!((p=document.getElementById("cfgTaxEnabled"))!=null&&p.checked),E=Math.min(30,Math.max(0,parseFloat((te=document.getElementById("cfgTaxRate"))==null?void 0:te.value)||0)),S=((yr=(Ce=document.getElementById("cfgTaxLabel"))==null?void 0:Ce.value)==null?void 0:yr.trim())||"VAT",I=!!((vr=document.getElementById("cfgTaxIncluded"))!=null&&vr.checked),w=((wr=(br=document.getElementById("cfgPromoCode"))==null?void 0:br.value)==null?void 0:wr.trim().toUpperCase())||"",k=((Er=document.getElementById("cfgPromoType"))==null?void 0:Er.value)||"percent",P=Math.max(0,parseFloat((Sr=document.getElementById("cfgPromoValue"))==null?void 0:Sr.value)||0),C=((_r=document.getElementById("cfgPromoExpiry"))==null?void 0:_r.value)||"";return{primaryCurrency:"USD",secondaryCurrency:r,showSecondary:n,currencySymbol:o,exchangeRate:s,roundingRule:i,autoRefreshRate:!1,deliveryFee:a,freeDeliveryOver:c,minimumOrder:d,pickupOnly:l,taxEnabled:g,taxRate:E,taxLabel:S,taxIncluded:I,promoCode:w,promoType:k,promoValue:P,promoExpiry:C,lastUpdatedRate:t.lastUpdatedRate}},isEconomyDirty(t,e){return!t||!e?!1:t.secondaryCurrency!==e.secondaryCurrency||t.showSecondary!==e.showSecondary||t.currencySymbol!==e.currencySymbol||t.exchangeRate!==e.exchangeRate||t.roundingRule!==e.roundingRule||t.deliveryFee!==e.deliveryFee||t.freeDeliveryOver!==e.freeDeliveryOver||t.minimumOrder!==e.minimumOrder||t.pickupOnly!==e.pickupOnly||t.taxEnabled!==e.taxEnabled||t.taxRate!==e.taxRate||t.taxLabel!==e.taxLabel||t.taxIncluded!==e.taxIncluded||t.promoCode!==e.promoCode||t.promoType!==e.promoType||t.promoValue!==e.promoValue||t.promoExpiry!==e.promoExpiry},handleEconomyInput(t){if(t&&t.target)if(t.target.id==="cfgPromoCode"&&(t.target.value=t.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g,"")),t.target.id==="cfgExchangeRate")this.onExchangeRateInput(t.target.value);else{const e=this.getDraftEconomy();this.applyEconomy(e)}this.updateEconomyPreview()},onExchangeRateInput(t){this._exchangeRateDebounceTimer&&clearTimeout(this._exchangeRateDebounceTimer),this._exchangeRateDebounceTimer=setTimeout(()=>{const e=this.getDraftEconomy();this.applyEconomy(e),this.updateEconomyPreview()},200)},applyEconomy(t=null){this._draftEconomy=t,this.applyPreferences(),this.renderMenu(),this.renderTray()},toggleMobilePreviewExpand(){const t=document.getElementById("economyPreviewStickyCard");if(!t)return;const e=t.classList.contains("is-collapsed");t.classList.toggle("is-collapsed",!e),t.classList.toggle("is-expanded",e);const r=document.getElementById("previewChevron");r&&(r.textContent=e?"▼":"▲")},showModalToast(t,e="success"){const r=document.getElementById("modalToastContainer");if(!r){this.showToast(t,e);return}const n=document.createElement("div");n.className=`modal-toast modal-toast--${e}`,n.innerHTML=`<span>✓</span> <span>${t}</span>`,r.appendChild(n),setTimeout(()=>{n.style.animation="modalToastOut 220ms cubic-bezier(.2,.8,.3,1) forwards",setTimeout(()=>n.remove(),220)},2800)},updateEconomyPreview(){const t=document.getElementById("economyLivePreviewCard");if(!t)return;const e=this.config&&this.config.economy||Se,r=this.getDraftEconomy(),n=this.isEconomyDirty(r,e),o=document.getElementById("btnSaveEconomy");o&&(o.disabled=!n);const s=document.getElementById("ecoCurrenciesSummary");s&&(s.textContent=r.showSecondary&&r.secondaryCurrency&&r.secondaryCurrency!=="None"?`USD + ${u(r.secondaryCurrency)} (${u(r.currencySymbol||"د.ع")})`:"USD only");const i=document.getElementById("ecoExchangeSummary");if(i){const T=new Intl.NumberFormat("en-US").format(r.exchangeRate||1310),f=r.roundingRule>1?`Nearest ${u(r.roundingRule)}`:"Exact (cents)";i.textContent=`1 USD = ${T} ${r.secondaryCurrency} · ${f}`}const a=document.getElementById("ecoDeliverySummary");if(a)if(r.pickupOnly)a.textContent="Pickup only";else{const T=r.freeDeliveryOver>0?`Free over $${u(r.freeDeliveryOver)}`:"All-order free";a.textContent=`$${r.deliveryFee} flat · ${T} · Min $${r.minimumOrder}`}const c=document.getElementById("ecoTaxSummary");c&&(r.taxEnabled?c.textContent=`${r.taxRate}% (${r.taxLabel||"VAT"}) ${r.taxIncluded?"included":"+checkout"}`:c.textContent="Off");const d=document.getElementById("ecoDiscountsSummary");if(d)if(!r.promoCode)d.textContent="No active code";else{const T=r.promoType==="percent"?`${u(r.promoValue)}%`:`$${u(r.promoValue)}`;d.textContent=`${r.promoCode} (${T} off)`}const l=document.getElementById("promoValidityBadge");if(l){const T=r.promoCode;T?T.length<3?(l.style.display="inline-block",l.className="promo-pill promo-pill--short",l.textContent=this.t("promoTooShort")):r.promoExpiry&&new Date(r.promoExpiry+"T23:59:59")<new Date?(l.style.display="inline-block",l.className="promo-pill promo-pill--expired",l.textContent=this.t("promoExpired")):(l.style.display="inline-block",l.className="promo-pill promo-pill--active",l.textContent=this.t("promoActive")):l.style.display="none"}const g=document.getElementById("freeDeliveryWarn");if(g){const T=!r.pickupOnly&&r.freeDeliveryOver>0&&r.minimumOrder>0&&r.freeDeliveryOver<r.minimumOrder;g.style.display=T?"flex":"none"}const E=document.getElementById("deliveryZeroNote");E&&(E.style.display=!r.pickupOnly&&r.deliveryFee===0?"block":"none");const S=50,I=r.promoCode,w=this.computeCartBreakdown(S,I,r),k=r.showSecondary!==!1&&r.secondaryCurrency&&r.secondaryCurrency!=="None",P=w.total;let C="",D="";if(k){const T=P*r.exchangeRate,f=parseInt(r.roundingRule,10)||250;let h=T;f>1?h=Math.round(T/f)*f:h=Math.round(T*100)/100;const m=r.currencySymbol||"د.ع";C=f>1?`${u(new Intl.NumberFormat("en-US").format(h))} ${u(m)}`:`${u(m)} ${u(h.toFixed(2))}`;const y=P*r.exchangeRate;f>1&&Math.abs(h-y)>.01&&(D=`
          <div class="economy-preview-rounding">
            Rounded from ${u(new Intl.NumberFormat("en-US").format(Math.round(y)))} ${u(m)} (nearest ${u(f)})
          </div>
        `)}const R=document.getElementById("mobilePreviewSummaryText");R&&(R.textContent=`$${P.toFixed(2)}${k?` · ${C}`:""}`);let N=`
      <div class="economy-preview-line">
        <span>${this.t("subtotal")}</span>
        <strong>$${u(S.toFixed(2))}</strong>
      </div>
    `;w.discount>0&&(N+=`
        <div class="economy-preview-line" style="color:#4ade80;">
          <span>${this.t("discount")} (${u(w.promoCodeName)})</span>
          <strong>−$${u(w.discount.toFixed(2))}</strong>
        </div>
      `),w.isPickupOnly?N+=`
        <div class="economy-preview-line">
          <span>${this.t("economyDelivery")}</span>
          <span style="color:#93c5fd;font-weight:600;">Pickup Only</span>
        </div>
      `:w.isFreeDelivery?N+=`
        <div class="economy-preview-line">
          <span>${this.t("deliveryFee")}</span>
          <span style="color:#4ade80;font-weight:700;">${this.t("freeDelivery")}</span>
        </div>
      `:N+=`
        <div class="economy-preview-line">
          <span>${this.t("deliveryFee")}</span>
          <strong>$${u(w.delivery.toFixed(2))}</strong>
        </div>
      `,w.tax>0?N+=`
        <div class="economy-preview-line">
          <span>${this.t("tax")} (${u(w.taxLabel)} ${u(w.taxRate)}%)</span>
          <strong>+$${u(w.tax.toFixed(2))}</strong>
        </div>
      `:r.taxEnabled&&r.taxIncluded&&r.taxRate>0&&(N+=`
        <div class="economy-preview-line" style="color:rgba(255,255,255,0.65);font-size:0.78rem;">
          <span>${u(r.taxLabel)} (${u(r.taxRate)}% included)</span>
          <span>Included</span>
        </div>
      `),N+=`
      <div class="economy-preview-total">
        <span>${this.t("total")}</span>
        <div style="text-align:right;">
          <div class="economy-preview-total-value">$${u(P.toFixed(2))}</div>
          ${k?`<div class="economy-preview-secondary">${C}</div>${D}`:""}
        </div>
      </div>
    `,w.minOrderMet||(N+=`
        <div class="economy-preview-alert">
          ⚠️ Min order ($${u(r.minimumOrder.toFixed(2))}) not met. Sample is $${u(S.toFixed(2))}.
        </div>
      `),t.innerHTML=N},async saveEconomySettings(t){var s;t&&t.preventDefault();const e=document.getElementById("btnSaveEconomy");e&&(e.disabled=!0,e.textContent=this.t("statusSaving"));const r=this.getDraftEconomy();r.lastUpdatedRate=Date.now();const n=parseInt((s=document.getElementById("cfgLeadTime"))==null?void 0:s.value,10);r.leadTimeHours=Number.isFinite(n)&&n>=0&&n<=720?n:et(this.config.economy);const o=await this.commitConfig("economy",i=>(i.economy=r,null),{quiet:!0});if(e&&(e.textContent=this.t("saveEconomy")),o){this._draftEconomy=null,this.applyEconomy();const i=document.getElementById("lastUpdatedRateText");i&&(i.textContent=new Date(r.lastUpdatedRate).toLocaleDateString()),e&&(e.disabled=!0),this.showModalToast(this.t("toastSaved"),"success"),this.updateEconomyPreview()}else e&&(e.disabled=!1)},selectProductForEditing(t){if(t==="new"){this.addNewProduct();return}this.selectedProductId=t;const e=this.products.find(r=>r.id===t);this.pendingImageData=e&&e.img||"",this.renderProductEditor()},renderProductEditor(){var o,s,i,a;const t=document.getElementById("productEditorArea");if(!t)return;const e=this.products.find(c=>c.id===this.selectedProductId);if(!e){t.innerHTML=`
        <div style="text-align:center;padding:36px 20px;background:var(--shell);border-radius:var(--radius-card);border:1px dashed var(--line);">
          <p style="color:var(--muted);margin-bottom:12px;">No product selected.</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.addNewProduct()">${this.t("btnAddNewProduct")}</button>
        </div>
      `;return}const r=this.pendingImageData||e.img||"",n=!!(r&&r.trim()!=="");t.innerHTML=`
      <div style="background:var(--cream);padding:22px;border-radius:var(--radius-card);border:1px solid var(--line);margin-top:14px;">
        <h5 style="font-family:var(--font-serif);font-size:1.15rem;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;">
          <span>${u(e.emoji||"🎂")}</span>
          <span>${u(e.name.en||"Untitled Product")}</span>
          <span style="font-size:0.85rem;color:var(--muted);font-family:var(--font-sans);font-weight:normal;">($${u(e.priceUSD)})</span>
        </h5>

        <!-- Photo Uploader -->
        <div class="photo-uploader">
          <div class="photo-uploader__preview" id="prodPreview">
            ${n?`
              <img src="${u(r)}" alt="${u(e.name.en||"Product Preview")}" referrerpolicy="no-referrer" />
            `:`
              <div class="preview-emoji">${u(e.emoji||"🎂")}</div>
              <div class="preview-hint">${this.t("noPhotoHint")}</div>
            `}
          </div>
          <div class="photo-uploader__controls">
            <label class="upload-btn" for="prodImageInput">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <span id="uploadBtnText">${n?this.t("replacePhoto"):this.t("uploadPhoto")}</span>
              <input type="file" id="prodImageInput" accept="image/jpeg,image/png,image/webp" onchange="app.handlePhotoUpload(event)" />
            </label>
            <button type="button" class="btn btn--ghost btn--sm" id="btnRemovePhoto" style="${n?"display:inline-flex;":"display:none;"} color:#b91c1c; border-color:#fca5a5;" onclick="app.removeProductPhoto()">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px;" aria-hidden="true">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              ${this.t("removePhoto")}
            </button>
            <p class="photo-hint">${this.t("photoHint")}</p>
          </div>
        </div>

        <form onsubmit="app.saveProductData(event)">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditEmoji">Emoji Fallback Icon</label>
              <input type="text" id="pEditEmoji" class="form-input" value="${u(e.emoji||"🎂")}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditCat">Category</label>
              <select id="pEditCat" class="form-select">
                <option value="cakes" ${e.category==="cakes"?"selected":""}>Layer Cakes</option>
                <option value="cupcakes" ${e.category==="cupcakes"?"selected":""}>Cupcakes</option>
                <option value="desserts" ${e.category==="desserts"?"selected":""}>Desserts</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditNameEn">Name (English)</label>
              <input type="text" id="pEditNameEn" class="form-input" value="${u(e.name.en||"")}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditNameKu">Name (Kurdish)</label>
              <input type="text" id="pEditNameKu" class="form-input" value="${u(e.name.ku||"")}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditPrice">Price (USD)</label>
              <input type="number" id="pEditPrice" class="form-input" value="${u(e.priceUSD)}" step="0.5" min="1" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditTag">Product Tag</label>
              <select id="pEditTag" class="form-select">
                <option value="none" ${e.tag==="none"?"selected":""}>None</option>
                <option value="bestseller" ${e.tag==="bestseller"?"selected":""}>Bestseller</option>
          <option value="popular" ${e.tag==="popular"?"selected":""}>Popular</option>
          <option value="limited" ${e.tag==="limited"?"selected":""}>Limited</option>
          <option value="sale" ${e.tag==="sale"?"selected":""}>Sale</option>
                <option value="new" ${e.tag==="new"?"selected":""}>New</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditUnitEn">Serving Unit (English)</label>
              <input type="text" id="pEditUnitEn" class="form-input" value="${u(((o=e.unit)==null?void 0:o.en)||'8" Cake (10-12 slices)')}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditUnitKu">Serving Unit (Kurdish)</label>
              <input type="text" id="pEditUnitKu" class="form-input" value="${u(((s=e.unit)==null?void 0:s.ku)||"کێکی ٨ ئینچ (١٠-١٢ پارچە)")}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescEn">Description (English)</label>
            <textarea id="pEditDescEn" class="form-textarea" rows="2">${u(((i=e.desc)==null?void 0:i.en)||"")}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescKu">Description (Kurdish)</label>
            <textarea id="pEditDescKu" class="form-textarea" rows="2">${u(((a=e.desc)==null?void 0:a.ku)||"")}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditExEn">Exclusions (English, comma separated)</label>
              <input type="text" id="pEditExEn" class="form-input" value="${u((e.exclusions||[]).map(c=>c.en).join(", "))}" placeholder="e.g. Nuts, Frosting" />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditExKu">Exclusions (Kurdish, comma separated)</label>
              <input type="text" id="pEditExKu" class="form-input" value="${u((e.exclusions||[]).map(c=>c.ku).join(", "))}" placeholder="e.g. گوێز, کرێم" />
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap;">
            <button type="submit" class="btn btn--primary">${this.t("btnSaveProduct")}</button>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.deleteProduct(${j(e.id)})">${this.t("btnDeleteProduct")}</button>
          </div>
        </form>
      </div>
    `},editProduct(t){this.selectProductForEditing(t)},async handlePhotoUpload(t){const e=t.target.files&&t.target.files[0];if(e)try{const r=await Bl(e);this.pendingImageData=r;const n=document.getElementById("prodPreview");n&&(n.innerHTML=`<img src="${u(r)}" alt="Product Preview" />`);const o=document.getElementById("uploadBtnText");o&&(o.textContent=this.t("replacePhoto"));const s=document.getElementById("btnRemovePhoto");s&&(s.style.display="inline-flex"),this.showToast(this.t("toastPhotoReady"),"info")}catch(r){console.error("Image processing error:",r),r.message==="OUTPUT_TOO_LARGE"||r.message==="FILE_TOO_LARGE"?this.showToast(this.t("prodPhotoTooLarge"),"error"):this.showToast(this.t("prodPhotoError"),"error")}finally{t.target.value=""}},removeProductPhoto(){this.pendingImageData="";const t=this.products.find(o=>o.id===this.selectedProductId),e=document.getElementById("prodPreview");e&&(e.innerHTML=`
        <div class="preview-emoji">${u(t&&t.emoji||"🎂")}</div>
        <div class="preview-hint">${u(this.t("noPhotoHint"))}</div>`);const r=document.getElementById("uploadBtnText");r&&(r.textContent=this.t("uploadPhoto"));const n=document.getElementById("btnRemovePhoto");n&&(n.style.display="none"),this.showToast(this.t("prodPhotoRemovedPending"),"info")},addNewProduct(){const t="p_"+Date.now().toString(36),e={id:t,category:"cakes",emoji:"🎂",img:"",priceUSD:35,tag:"none",name:{en:"New Artisanal Cake",ku:"کێکی دەستکردی نوێ"},desc:{en:"Handcrafted sponge layered with fresh cream and seasonal fruits.",ku:"کێکی دەستکرد بە کرێمی تازە و میوەی وەرزی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"},_unsaved:!0};this.products.unshift(e),this.selectedProductId=t,this.pendingImageData="",this.renderPanelTab("products"),this.showToast(this.t("prodNewDraft"),"info")},async saveProductData(t){t.preventDefault();const e=this.products.find(l=>l.id===this.selectedProductId);if(!e)return;const r=l=>document.getElementById(l).value.trim(),n=parseFloat(document.getElementById("pEditPrice").value);if(!Number.isFinite(n)||n<0||n>1e5){this.showToast(this.t("prodPriceInvalid"),"error");return}const o=r("pEditExEn").split(",").map(l=>l.trim()).filter(Boolean),s=r("pEditExKu").split(",").map(l=>l.trim()).filter(Boolean),i=[];for(let l=0;l<Math.max(o.length,s.length);l++)(o[l]||s[l])&&i.push({id:(o[l]||s[l]||`ex${l}`).replace(/\s+/g,"_").toLowerCase().slice(0,40),en:o[l]||"",ku:s[l]||""});const a={id:e.id,emoji:r("pEditEmoji")||"🎂",category:document.getElementById("pEditCat").value,name:{en:r("pEditNameEn"),ku:r("pEditNameKu")},priceUSD:n,tag:document.getElementById("pEditTag").value,unit:{en:r("pEditUnitEn"),ku:r("pEditUnitKu")},desc:{en:r("pEditDescEn"),ku:r("pEditDescKu")},exclusions:i.length?i.slice(0,20):null,img:this.pendingImageData||""};if(!a.name.en){this.showToast(this.t("errFillFields"),"error");return}if(!await this.saveProduct(a))return;const d=this.products.findIndex(l=>l.id===a.id);d>-1&&(this.products[d]=this.normalizeProduct(a)),this.cacheSet(B.PRODUCTS,this.products),this.cacheSet(B.PRODUCTS_REMOTE,!0),this.renderMenu(),this.renderPanelTab("products")},async deleteProduct(t){const e=this.products.find(n=>n.id===t);!e||!await this.confirmDialog({title:this.t("prodDeleteTitle"),message:this.t("prodDeleteConfirm"),okLabel:this.t("usersDelete"),danger:!0})||!e._unsaved&&!await this.runWrite(()=>L.deleteProduct(t),{successMsg:this.t("toastDeleted")})||(this.products=this.products.filter(n=>n.id!==t),this.cacheSet(B.PRODUCTS,this.products),this.cart=rt(this.cart,this.products),this.persistCart(),this.selectedProductId=this.products.length?this.products[0].id:null,this.pendingImageData=this.products.length&&this.products[0].img||"",this.renderMenu(),this.renderTray(),this.renderPanelTab("products"))},showAddStaffModal(t=null){const e=(n,o)=>{const s=document.getElementById(n);s&&(s.value=o)};e("promptUid",t?t.uid:""),e("promptEmail",t&&t.email||""),e("promptName",t&&t.name||""),e("promptRole",t?t.role:"staff");const r=document.getElementById("promptUid");r&&(r.readOnly=!!t),document.querySelectorAll('input[name="staffPerms"]').forEach(n=>{n.checked=!!(t&&Array.isArray(t.perms)&&t.perms.includes(n.value))}),this.setAuthMessage("staffFormMessage",""),this.openDialog("customPromptModal")},async submitAddStaff(t){t.preventDefault();const e=document.getElementById("promptUid").value.trim(),r=document.getElementById("promptEmail").value.trim(),n=document.getElementById("promptName").value.trim(),o=document.getElementById("promptRole").value==="admin"?"admin":"staff",s=[...document.querySelectorAll('input[name="staffPerms"]:checked')].map(a=>a.value).filter(a=>ko.includes(a));if(!/^[A-Za-z0-9_-]{6,128}$/.test(e)){this.setAuthMessage("staffFormMessage",this.t("staffUidInvalid"));return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r)){this.setAuthMessage("staffFormMessage",this.t("authErr_badEmail"));return}await this.runWrite(()=>{var a;return L.saveStaffEntry(e,{email:r,name:n,role:o,perms:o==="staff"?s:[]},(a=this.session)==null?void 0:a.uid)},{successMsg:this.t("staffSavedHint")})&&this.closeDialog("customPromptModal")},async importJsonData(){let t;try{if(t=JSON.parse(document.getElementById("dataJsonBox").value),!t||typeof t.config!="object"||!Array.isArray(t.products))throw new Error("shape")}catch{this.showToast(this.t("toastInvalidJson"),"error");return}if(!await this.confirmDialog({title:this.t("importTitle"),message:this.t("importConfirm"),okLabel:this.t("importBtn")}))return;const r=this.normalizeConfig(t.config),n=t.products.map(i=>this.normalizeProduct(i)).filter(Boolean),o=["brand","theme","about","faq","reviews","contact","socials","economy","fonts"];await this.runWrite(async()=>{var a,c;const i={};o.flatMap(d=>this.configKeysFor(d)).forEach(d=>{r[d]!==void 0&&(i[d]=r[d])}),await L.savePublicConfig(i,(a=this.session)==null?void 0:a.uid);for(const d of n)await L.saveProduct(d,(c=this.session)==null?void 0:c.uid)},{successMsg:this.t("backupImported")})&&(this.config=r,this.products=n,this.renderAll())},copyJsonData(){const t=document.getElementById("dataJsonBox");t&&navigator.clipboard.writeText(t.value).then(()=>{this.showToast(this.t("copiedJson"),"success")}).catch(()=>{t.select(),document.execCommand("copy"),this.showToast(this.t("copiedJson"),"success")})},async factoryReset(){await this.confirmDialog({title:this.t("resetDeviceTitle"),message:this.t("resetDeviceConfirm"),okLabel:this.t("resetDeviceBtn"),danger:!0})&&([B.CONFIG,B.PRODUCTS,B.PRODUCTS_REMOTE,B.MY_ORDERS,B.GUEST,"ys_cart_v1"].forEach(e=>{try{localStorage.removeItem(e)}catch{}}),this.loadState(),this.renderAll(),this.showToast(this.t("resetDeviceDone"),"success"))},renderWatermark(){const t=document.getElementById("watermarkPill");if(!t)return;const e=this.config&&this.config.showWatermark!==!1;t.style.display=e?"inline-flex":"none"},showToast(t,e="info"){const r=document.getElementById("toastContainer");if(!r)return;const n=document.createElement("div");n.className=`toast ${e==="success"?"toast--success":e==="error"?"toast--error":""}`,n.textContent=t,r.appendChild(n),setTimeout(()=>{n.classList.add("is-show")},10),setTimeout(()=>{n.classList.remove("is-show"),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n)},300)},2200)},toggleMobileMenu(){const t=document.getElementById("mobileNav"),e=document.getElementById("burgerBtn");if(!t||!e)return;const r=document.getElementById("mainHeader");r&&(t.style.top=`${Math.max(0,r.getBoundingClientRect().bottom)}px`);const n=t.classList.toggle("is-open");e.setAttribute("aria-expanded",n?"true":"false")},closeMobileMenu(){const t=document.getElementById("mobileNav"),e=document.getElementById("burgerBtn");t&&t.classList.remove("is-open"),e&&e.setAttribute("aria-expanded","false")},bindEvents(){window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{this.config&&this.config.theme&&this.config.theme.autoDark&&this.applyTheme(this.config.theme.tokens)});const t=document.getElementById("mainHeader");window.addEventListener("scroll",()=>{t&&(window.scrollY>15?t.classList.add("is-stuck"):t.classList.remove("is-stuck"))},{passive:!0}),this.setupScrollSpy(),["authModal","staffAuthModal","panelModal","historyModal","submitReviewModal","customPromptModal"].forEach(n=>{const o=document.getElementById(n);o&&(o.setAttribute("aria-hidden","true"),o.addEventListener("click",s=>{s.target===o&&this.closeDialogById(n)}))});const e=document.getElementById("panelSidebar");e&&e.addEventListener("keydown",n=>this.handlePanelTabKeys(n)),window.addEventListener("hashchange",()=>{window.location.hash==="#staff"&&this.openStaffLogin()});const r=document.getElementById("trayOrderNote");r&&r.addEventListener("input",()=>{this.orderNote=r.value}),["trayCustName","trayFulfillmentDate"].forEach(n=>{const o=document.getElementById(n);o&&o.addEventListener("input",()=>{o.getAttribute("aria-invalid")&&this.setCheckoutError("")})}),document.addEventListener("click",n=>{const o=document.querySelector(".account-menu");o&&!o.contains(n.target)&&this.closeAccountMenu();const s=document.getElementById("mobileNav"),i=document.getElementById("burgerBtn");s&&s.classList.contains("is-open")&&!s.contains(n.target)&&!i.contains(n.target)&&this.closeMobileMenu()}),window.addEventListener("keydown",n=>{var o,s,i,a;if((n.metaKey||n.ctrlKey)&&n.key.toLowerCase()==="k"){n.preventDefault();const c=document.getElementById("menuSearchInput");c&&(c.focus(),c.select())}if(!this.handleDialogKeys(n)&&n.key==="Escape"){document.activeElement&&document.activeElement.id==="menuSearchInput"&&document.activeElement.blur();const c=document.getElementById("accountMenuList");c&&!c.hidden?(this.closeAccountMenu(),(o=document.getElementById("accountMenuToggle"))==null||o.focus()):(s=document.getElementById("mobileNav"))!=null&&s.classList.contains("is-open")?(this.closeMobileMenu(),(i=document.getElementById("burgerBtn"))==null||i.focus()):this.trayBreakdownOpen&&(this.toggleTrayBreakdown(!1),(a=document.getElementById("btnTrayToggle"))==null||a.focus())}})},setupScrollSpy(){if(!("IntersectionObserver"in window))return;const t=document.querySelectorAll("#desktopNav .nav__link, #mobileNav .nav__link"),e=[...new Set([...t].map(i=>i.getAttribute("href")).filter(i=>i&&i.startsWith("#")))],r={features:"story"},n=[...e,"#features"].map(i=>document.querySelector(i)).filter(Boolean),o=new Set,s=new IntersectionObserver(i=>{i.forEach(d=>{d.isIntersecting?o.add(d.target):o.delete(d.target)});const a=n.find(d=>o.has(d)),c=a?`#${r[a.id]||a.id}`:null;t.forEach(d=>{const l=d.getAttribute("href")===c;d.classList.toggle("is-active",l),l?d.setAttribute("aria-current","location"):d.removeAttribute("aria-current")})},{rootMargin:"-45% 0px -50% 0px"});n.forEach(i=>s.observe(i))},setupIntersectionObserver(){if(!("IntersectionObserver"in window)||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const t=new IntersectionObserver(r=>{r.forEach((n,o)=>{n.isIntersecting&&(setTimeout(()=>{n.target.style.opacity="1",n.target.style.transform="translateY(0)"},o%4*70),t.unobserve(n.target))})},{threshold:.12});document.querySelectorAll(".feature-card, .cake-card, .step-card, .review-card, .faq-item, .info-card").forEach(r=>{r.getBoundingClientRect().top<window.innerHeight||(r.style.opacity="0",r.style.transform="translateY(24px)",r.style.transition="opacity 0.4s ease, transform 0.4s ease",t.observe(r))})}};window.app=We;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>We.init()):We.init();export{Hl as A,ql as B,Fe as C,Zo as D,Fn as E,Pe as F,Vl as G,Yl as H,qn as I,$n as L,Oi as M,ci as S,vt as U,si as _,ui as a,Xo as b,es as c,ot as d,$ as e,zl as f,Ae as g,Cn as h,Rn as i,ii as j,it as k,Li as l,Vn as m,Re as n,Ql as o,ls as p,Kl as q,Ie as r,Gl as s,Fl as t,Jo as u,jl as v,Wl as w,Wo as x,xn as y,Ul as z};
