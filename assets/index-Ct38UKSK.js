var dm=Object.defineProperty;var fm=(n,e,t)=>e in n?dm(n,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):n[e]=t;var G=(n,e,t)=>fm(n,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function t(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(r){if(r.ep)return;r.ep=!0;const i=t(r);fetch(r.href,i)}})();const pm=()=>{};var ku={};/**
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
 */const Vh=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let r=n.charCodeAt(s);r<128?e[t++]=r:r<2048?(e[t++]=r>>6|192,e[t++]=r&63|128):(r&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(r=65536+((r&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=r>>18|240,e[t++]=r>>12&63|128,e[t++]=r>>6&63|128,e[t++]=r&63|128):(e[t++]=r>>12|224,e[t++]=r>>6&63|128,e[t++]=r&63|128)}return e},mm=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const r=n[t++];if(r<128)e[s++]=String.fromCharCode(r);else if(r>191&&r<224){const i=n[t++];e[s++]=String.fromCharCode((r&31)<<6|i&63)}else if(r>239&&r<365){const i=n[t++],o=n[t++],a=n[t++],c=((r&7)<<18|(i&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(c>>10)),e[s++]=String.fromCharCode(56320+(c&1023))}else{const i=n[t++],o=n[t++];e[s++]=String.fromCharCode((r&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Uh={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let r=0;r<n.length;r+=3){const i=n[r],o=r+1<n.length,a=o?n[r+1]:0,c=r+2<n.length,u=c?n[r+2]:0,h=i>>2,f=(i&3)<<4|a>>4;let p=(a&15)<<2|u>>6,g=u&63;c||(g=64,o||(p=64)),s.push(t[h],t[f],t[p],t[g])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Vh(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):mm(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let r=0;r<n.length;){const i=t[n.charAt(r++)],a=r<n.length?t[n.charAt(r)]:0;++r;const u=r<n.length?t[n.charAt(r)]:64;++r;const f=r<n.length?t[n.charAt(r)]:64;if(++r,i==null||a==null||u==null||f==null)throw new gm;const p=i<<2|a>>4;if(s.push(p),u!==64){const g=a<<4&240|u>>2;if(s.push(g),f!==64){const D=u<<6&192|f;s.push(D)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class gm extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Cm=function(n){const e=Vh(n);return Uh.encodeByteArray(e,!0)},co=function(n){return Cm(n).replace(/\./g,"")},Hh=function(n){try{return Uh.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function ym(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const Em=()=>ym().__FIREBASE_DEFAULTS__,_m=()=>{if(typeof process>"u"||typeof ku>"u")return;const n=ku.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},vm=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Hh(n[1]);return e&&JSON.parse(e)},No=()=>{try{return pm()||Em()||_m()||vm()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},Gh=n=>{var e,t;return(t=(e=No())==null?void 0:e.emulatorHosts)==null?void 0:t[n]},Dm=n=>{const e=Gh(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},$h=()=>{var n;return(n=No())==null?void 0:n.config},qh=n=>{var e;return(e=No())==null?void 0:e[`_${n}`]};/**
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
 */class Jh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function wm(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",r=n.iat||0,i=n.sub||n.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o={iss:`https://securetoken.google.com/${s}`,aud:s,iat:r,exp:r+3600,auth_time:r,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}},...n};return[co(JSON.stringify(t)),co(JSON.stringify(o)),""].join(".")}/**
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
 */function Ze(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Im(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ze())}function Tm(){var e;const n=(e=No())==null?void 0:e.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function bm(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Am(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Sm(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Pm(){const n=Ze();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Rm(){return!Tm()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Om(){try{return typeof indexedDB=="object"}catch{return!1}}function Nm(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(s);r.onsuccess=()=>{r.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},r.onupgradeneeded=()=>{t=!1},r.onerror=()=>{var i;e(((i=r.error)==null?void 0:i.message)||"")}}catch(t){e(t)}})}/**
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
 */const km="FirebaseError";class on extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=km,Object.setPrototypeOf(this,on.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ii.prototype.create)}}class ii{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},r=`${this.service}/${e}`,i=this.errors[e],o=i?Lm(i,s):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new on(r,a,s)}}function Lm(n,e){try{let t=0,s="";for(;t<n.length;){const r=n.indexOf("{$",t);if(r===-1){s+=n.substring(t);break}const i=n.indexOf("}",r+2);if(i===-1){s+=n.substring(t);break}const o=n.substring(r+2,i),a=e[o];s+=n.substring(t,r)+(a!=null?String(a):`<${o}?>`),t=i+1}return s}catch{return n}}function xm(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function Bs(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const r of t){if(!s.includes(r))return!1;const i=n[r],o=e[r];if(Lu(i)&&Lu(o)){if(!Bs(i,o))return!1}else if(i!==o)return!1}for(const r of s)if(!t.includes(r))return!1;return!0}function Lu(n){return n!==null&&typeof n=="object"}/**
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
 */function oi(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(r=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}function wr(n){const e={};return n.replace(/^\?/,"").split("&").forEach(s=>{if(s){const[r,i]=s.split("=");e[decodeURIComponent(r)]=decodeURIComponent(i)}}),e}function Ir(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function Fm(n,e){const t=new Mm(n,e);return t.subscribe.bind(t)}class Mm{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let r;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");Vm(e,["next","error","complete"])?r=e:r={next:e,error:t,complete:s},r.next===void 0&&(r.next=Na),r.error===void 0&&(r.error=Na),r.complete===void 0&&(r.complete=Na);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Vm(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Na(){}/**
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
 */function Me(n){return n&&n._delegate?n._delegate:n}/**
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
 */function ai(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function jh(n){return(await fetch(n,{credentials:"include"})).ok}class hs{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Zn="[DEFAULT]";/**
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
 */class Um{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Jh;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const r=this.getOrInitializeService({instanceIdentifier:t});r&&s.resolve(r)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(e==null?void 0:e.optional)??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Gm(e))try{this.getOrInitializeService({instanceIdentifier:Zn})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const r=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:r});s.resolve(i)}catch{}}}}clearInstance(e=Zn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Zn){return this.instances.has(e)}getOptions(e=Zn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const r=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[i,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(i);s===a&&o.resolve(r)}return r}onInit(e,t){const s=this.normalizeInstanceIdentifier(t),r=this.onInitCallbacks.get(s)??new Set;r.add(e),this.onInitCallbacks.set(s,r);const i=this.instances.get(s);return i&&e(i,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const r of s)try{r(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:Hm(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Zn){return this.component?this.component.multipleInstances?e:Zn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Hm(n){return n===Zn?void 0:n}function Gm(n){return n.instantiationMode==="EAGER"}/**
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
 */class $m{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new Um(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var Be;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Be||(Be={}));const qm={debug:Be.DEBUG,verbose:Be.VERBOSE,info:Be.INFO,warn:Be.WARN,error:Be.ERROR,silent:Be.SILENT},Jm=Be.INFO,jm={[Be.DEBUG]:"log",[Be.VERBOSE]:"log",[Be.INFO]:"info",[Be.WARN]:"warn",[Be.ERROR]:"error"},Km=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),r=jm[e];if(r)console[r](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Rl{constructor(e){this.name=e,this._logLevel=Jm,this._logHandler=Km,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Be))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qm[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Be.DEBUG,...e),this._logHandler(this,Be.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Be.VERBOSE,...e),this._logHandler(this,Be.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Be.INFO,...e),this._logHandler(this,Be.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Be.WARN,...e),this._logHandler(this,Be.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Be.ERROR,...e),this._logHandler(this,Be.ERROR,...e)}}const zm=(n,e)=>e.some(t=>n instanceof t);let xu,Fu;function Wm(){return xu||(xu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Qm(){return Fu||(Fu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Kh=new WeakMap,nl=new WeakMap,zh=new WeakMap,ka=new WeakMap,Ol=new WeakMap;function Ym(n){const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(wn(n.result)),r()},o=()=>{s(n.error),r()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Kh.set(t,n)}).catch(()=>{}),Ol.set(e,n),e}function Xm(n){if(nl.has(n))return;const e=new Promise((t,s)=>{const r=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),r()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),r()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});nl.set(n,e)}let sl={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return nl.get(n);if(e==="objectStoreNames")return n.objectStoreNames||zh.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return wn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Zm(n){sl=n(sl)}function eg(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(La(this),e,...t);return zh.set(s,e.sort?e.sort():[e]),wn(s)}:Qm().includes(n)?function(...e){return n.apply(La(this),e),wn(Kh.get(this))}:function(...e){return wn(n.apply(La(this),e))}}function tg(n){return typeof n=="function"?eg(n):(n instanceof IDBTransaction&&Xm(n),zm(n,Wm())?new Proxy(n,sl):n)}function wn(n){if(n instanceof IDBRequest)return Ym(n);if(ka.has(n))return ka.get(n);const e=tg(n);return e!==n&&(ka.set(n,e),Ol.set(e,n)),e}const La=n=>Ol.get(n);function ng(n,e,{blocked:t,upgrade:s,blocking:r,terminated:i}={}){const o=indexedDB.open(n,e),a=wn(o);return s&&o.addEventListener("upgradeneeded",c=>{s(wn(o.result),c.oldVersion,c.newVersion,wn(o.transaction),c)}),t&&o.addEventListener("blocked",c=>t(c.oldVersion,c.newVersion,c)),a.then(c=>{i&&c.addEventListener("close",()=>i()),r&&c.addEventListener("versionchange",u=>r(u.oldVersion,u.newVersion,u))}).catch(()=>{}),a}const sg=["get","getKey","getAll","getAllKeys","count"],rg=["put","add","delete","clear"],xa=new Map;function Mu(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(xa.get(e))return xa.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,r=rg.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(r||sg.includes(t)))return;const i=async function(o,...a){const c=this.transaction(o,r?"readwrite":"readonly");let u=c.store;return s&&(u=u.index(a.shift())),(await Promise.all([u[t](...a),r&&c.done]))[0]};return xa.set(e,i),i}Zm(n=>({...n,get:(e,t,s)=>Mu(e,t)||n.get(e,t,s),has:(e,t)=>!!Mu(e,t)||n.has(e,t)}));/**
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
 */class ig{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(og(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function og(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const rl="@firebase/app",Vu="0.16.2";/**
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
 */const tn=new Rl("@firebase/app"),ag="@firebase/app-compat",lg="@firebase/analytics-compat",cg="@firebase/analytics",ug="@firebase/app-check-compat",Bg="@firebase/app-check",hg="@firebase/auth",dg="@firebase/auth-compat",fg="@firebase/database",pg="@firebase/data-connect",mg="@firebase/database-compat",gg="@firebase/functions",Cg="@firebase/functions-compat",yg="@firebase/installations",Eg="@firebase/installations-compat",_g="@firebase/messaging",vg="@firebase/messaging-compat",Dg="@firebase/performance",wg="@firebase/performance-compat",Ig="@firebase/remote-config",Tg="@firebase/remote-config-compat",bg="@firebase/storage",Ag="@firebase/storage-compat",Sg="@firebase/firestore",Pg="@firebase/ai",Rg="@firebase/firestore-compat",Og="firebase",Ng="12.19.0";/**
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
 */const il="[DEFAULT]",kg={[rl]:"fire-core",[ag]:"fire-core-compat",[cg]:"fire-analytics",[lg]:"fire-analytics-compat",[Bg]:"fire-app-check",[ug]:"fire-app-check-compat",[hg]:"fire-auth",[dg]:"fire-auth-compat",[fg]:"fire-rtdb",[pg]:"fire-data-connect",[mg]:"fire-rtdb-compat",[gg]:"fire-fn",[Cg]:"fire-fn-compat",[yg]:"fire-iid",[Eg]:"fire-iid-compat",[_g]:"fire-fcm",[vg]:"fire-fcm-compat",[Dg]:"fire-perf",[wg]:"fire-perf-compat",[Ig]:"fire-rc",[Tg]:"fire-rc-compat",[bg]:"fire-gcs",[Ag]:"fire-gcs-compat",[Sg]:"fire-fst",[Rg]:"fire-fst-compat",[Pg]:"fire-vertex","fire-js":"fire-js",[Og]:"fire-js-all"};/**
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
 */const uo=new Map,Lg=new Map,ol=new Map;function Uu(n,e){try{n.container.addComponent(e)}catch(t){tn.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Vs(n){const e=n.name;if(ol.has(e))return tn.debug(`There were multiple attempts to register component ${e}.`),!1;ol.set(e,n);for(const t of uo.values())Uu(t,n);for(const t of Lg.values())Uu(t,n);return!0}function Nl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function Tt(n){return n==null?!1:n.settings!==void 0}/**
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
 */const xg={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different {$mismatchedParam}. Existing: '{$oldValue}'. New: '{$newValue}'.","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Qt=new ii("app","Firebase",xg);/**
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
 */class Fg{constructor(e,t,s){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new hs("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Qt.create("app-deleted",{appName:this._name})}}/**
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
 */const zs=Ng;function Wh(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s={name:il,automaticDataCollectionEnabled:!0,...e},r=s.name;if(typeof r!="string"||!r)throw Qt.create("bad-app-name",{appName:String(r)});if(t||(t=$h()),!t)throw Qt.create("no-options");const i=uo.get(r);if(i)if(Bs(t,i.options)){if(Bs(s,i.config))return i;throw Qt.create("duplicate-app",{appName:r,mismatchedParam:"config",oldValue:JSON.stringify(i.config),newValue:JSON.stringify(s)})}else throw Qt.create("duplicate-app",{appName:r,mismatchedParam:"options",oldValue:JSON.stringify(i.options),newValue:JSON.stringify(t)});const o=new $m(r);for(const c of ol.values())o.addComponent(c);const a=new Fg(t,s,o);return uo.set(r,a),a}function Qh(n=il){const e=uo.get(n);if(!e&&n===il&&$h())return Wh();if(!e)throw Qt.create("no-app",{appName:n});return e}function In(n,e,t){let s=kg[n]??n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),i=e.match(/\s|\//);if(r||i){const o=[`Unable to register library "${s}" with version "${e}":`];r&&o.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),tn.warn(o.join(" "));return}Vs(new hs(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const Mg="firebase-heartbeat-database",Vg=1,Vr="firebase-heartbeat-store";let Fa=null;function Yh(){return Fa||(Fa=ng(Mg,Vg,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Vr)}catch(t){console.warn(t)}}}}).catch(n=>{throw Qt.create("idb-open",{originalErrorMessage:n.message})})),Fa}async function Ug(n){try{const t=(await Yh()).transaction(Vr),s=await t.objectStore(Vr).get(Xh(n));return await t.done,s}catch(e){if(e instanceof on)tn.warn(e.message);else{const t=Qt.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});tn.warn(t.message)}}}async function Hu(n,e){try{const s=(await Yh()).transaction(Vr,"readwrite");await s.objectStore(Vr).put(e,Xh(n)),await s.done}catch(t){if(t instanceof on)tn.warn(t.message);else{const s=Qt.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});tn.warn(s.message)}}}function Xh(n){return`${n.name}!${n.options.appId}`}/**
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
 */const Hg=1024,Gg=30;class $g{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Jg(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;try{const r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Gu();if(((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)==null?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i))return;if(this._heartbeatsCache.heartbeats.push({date:i,agent:r}),this._heartbeatsCache.heartbeats.length>Gg){const o=jg(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(o,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(s){tn.warn(s)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)==null?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Gu(),{heartbeatsToSend:s,unsentEntries:r}=qg(this._heartbeatsCache.heartbeats),i=co(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(t){return tn.warn(t),""}}}function Gu(){return new Date().toISOString().substring(0,10)}function qg(n,e=Hg){const t=[];let s=n.slice();for(const r of n){const i=t.find(o=>o.agent===r.agent);if(i){if(i.dates.push(r.date),$u(t)>e){i.dates.pop();break}}else if(t.push({agent:r.agent,dates:[r.date]}),$u(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Jg{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Om()?Nm().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Ug(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Hu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const s=await this.read();return Hu(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function $u(n){return co(JSON.stringify({version:2,heartbeats:n})).length}function jg(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let s=1;s<n.length;s++)n[s].date<t&&(t=n[s].date,e=s);return e}/**
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
 */function Kg(n){Vs(new hs("platform-logger",e=>new ig(e),"PRIVATE")),Vs(new hs("heartbeat",e=>new $g(e),"PRIVATE")),In(rl,Vu,n),In(rl,Vu,"esm2020"),In("fire-js","")}/**
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
 */Kg("");var zg="firebase",Wg="12.19.0";/**
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
 */In(zg,Wg,"app");function Zh(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Qg=Zh,ed=new ii("auth","Firebase",Zh());/**
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
 */const Bo=new Rl("@firebase/auth");function Xi(n,...e){Bo.logLevel<=Be.WARN&&Bo.warn(`Auth (${zs}): ${n}`,...e)}function Zi(n,...e){Bo.logLevel<=Be.ERROR&&Bo.error(`Auth (${zs}): ${n}`,...e)}/**
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
 */function At(n,...e){throw kl(n,...e)}function Rt(n,...e){return kl(n,...e)}function ko(n,e,t){const s={...Qg(),[e]:t};return new ii("auth","Firebase",s).create(e,{appName:n.name})}function Tn(n){return ko(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Yg(n,e,t){const s=t;if(!(e instanceof s))throw s.name!==e.constructor.name&&At(n,"argument-error"),ko(n,"argument-error",`Type of ${e.constructor.name} does not match expected instance.Did you pass a reference from a different Auth SDK?`)}function kl(n,...e){if(typeof n!="string"){const t=e[0],s=[...e.slice(1)];return s[0]&&(s[0].appName=n.name),n._errorFactory.create(t,...s)}return ed.create(n,...e)}function ne(n,e,...t){if(!n)throw kl(e,...t)}function Yt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Zi(e),new Error(e)}function nn(n,e){n||Yt(e)}/**
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
 */function al(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.href)||""}function Xg(){return qu()==="http:"||qu()==="https:"}function qu(){var n;return typeof self<"u"&&((n=self.location)==null?void 0:n.protocol)||null}/**
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
 */function Zg(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(Xg()||Am()||"connection"in navigator)?navigator.onLine:!0}function eC(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
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
 */class li{constructor(e,t){this.shortDelay=e,this.longDelay=t,nn(t>e,"Short delay should be less than long delay!"),this.isMobile=Im()||Sm()}get(){return Zg()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Ll(n,e){nn(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
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
 */class td{static initialize(e,t,s){this.fetchImpl=e,t&&(this.headersImpl=t),s&&(this.responseImpl=s)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Yt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Yt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Yt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const tC={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const nC=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],sC=new li(3e4,6e4);function Cs(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function Gn(n,e,t,s,r={}){return nd(n,r,async()=>{let i={},o={};s&&(e==="GET"?o=s:i={body:JSON.stringify(s)});const a=oi({...o,key:n.config.apiKey}).slice(1),c=await n._getAdditionalHeaders();c["Content-Type"]="application/json",n.languageCode&&(c["X-Firebase-Locale"]=n.languageCode);const u={method:e,headers:c,...i};return bm()||(u.referrerPolicy="strict-origin-when-cross-origin"),n.emulatorConfig&&ai(n.emulatorConfig.host)&&(u.credentials="include"),td.fetch()(await sd(n,n.config.apiHost,t,a),u)})}async function nd(n,e,t){n._canInitEmulator=!1;const s={...tC,...e};try{const r=new iC(n),i=await Promise.race([t(),r.promise]);r.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Mi(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const a=i.ok?o.errorMessage:o.error.message,[c,u]=a.split(" : ");if(c==="FEDERATED_USER_ID_ALREADY_LINKED")throw Mi(n,"credential-already-in-use",o);if(c==="EMAIL_EXISTS")throw Mi(n,"email-already-in-use",o);if(c==="USER_DISABLED")throw Mi(n,"user-disabled",o);const h=s[c]||c.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw ko(n,h,u);At(n,h)}}catch(r){if(r instanceof on)throw r;At(n,"network-request-failed",{message:String(r)})}}async function Lo(n,e,t,s,r={}){const i=await Gn(n,e,t,s,r);return"mfaPendingCredential"in i&&At(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function sd(n,e,t,s){const r=`${e}${t}?${s}`,i=n,o=i.config.emulator?Ll(n.config,r):`${n.config.apiScheme}://${r}`;return nC.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function rC(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class iC{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,s)=>{this.timer=setTimeout(()=>s(Rt(this.auth,"network-request-failed")),sC.get())})}}function Mi(n,e,t){const s={appName:n.name};t.email&&(s.email=t.email),t.phoneNumber&&(s.phoneNumber=t.phoneNumber);const r=Rt(n,e,s);return r.customData._tokenResponse=t,r}function Ju(n){return n!==void 0&&n.enterprise!==void 0}class oC{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return rC(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function aC(n,e){return Gn(n,"GET","/v2/recaptchaConfig",Cs(n,e))}/**
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
 */async function lC(n,e){return Gn(n,"POST","/v1/accounts:delete",e)}async function ho(n,e){return Gn(n,"POST","/v1/accounts:lookup",e)}/**
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
 */function Pr(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function cC(n,e=!1){const t=Me(n),s=await t.getIdToken(e),r=xl(s);ne(r&&r.exp&&r.auth_time&&r.iat,t.auth,"internal-error");const i=typeof r.firebase=="object"?r.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:r,token:s,authTime:Pr(Ma(r.auth_time)),issuedAtTime:Pr(Ma(r.iat)),expirationTime:Pr(Ma(r.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function Ma(n){return Number(n)*1e3}function xl(n){const[e,t,s]=n.split(".");if(e===void 0||t===void 0||s===void 0)return Zi("JWT malformed, contained fewer than 3 sections"),null;try{const r=Hh(t);return r?JSON.parse(r):(Zi("Failed to decode base64 JWT payload"),null)}catch(r){return Zi("Caught error parsing JWT payload as JSON",r==null?void 0:r.toString()),null}}function ju(n){const e=xl(n);return ne(e,"internal-error"),ne(typeof e.exp<"u","internal-error"),ne(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Ur(n,e,t=!1){if(t)return e;try{return await e}catch(s){throw s instanceof on&&uC(s)&&n.auth.currentUser===n&&await n.auth.signOut(),s}}function uC({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
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
 */class BC{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const s=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class ll{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Pr(this.lastLoginAt),this.creationTime=Pr(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function fo(n){var f;const e=n.auth,t=await n.getIdToken(),s=await Ur(n,ho(e,{idToken:t}));ne(s==null?void 0:s.users.length,e,"internal-error");const r=s.users[0];n._notifyReloadListener(r);const i=(f=r.providerUserInfo)!=null&&f.length?rd(r.providerUserInfo):[],o=dC(n.providerData,i),a=n.isAnonymous,c=!(n.email&&r.passwordHash)&&!(o!=null&&o.length),u=a?c:!1,h={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:o,metadata:new ll(r.createdAt,r.lastLoginAt),isAnonymous:u};Object.assign(n,h)}async function hC(n){const e=Me(n);await fo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function dC(n,e){return[...n.filter(s=>!e.some(r=>r.providerId===s.providerId)),...e]}function rd(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
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
 */async function fC(n,e){const t=await nd(n,{},async()=>{const s=oi({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:r,apiKey:i}=n.config,o=await sd(n,r,"/v1/token",`key=${i}`),a=await n._getAdditionalHeaders();a["Content-Type"]="application/x-www-form-urlencoded";const c={method:"POST",headers:a,body:s};return n.emulatorConfig&&ai(n.emulatorConfig.host)&&(c.credentials="include"),td.fetch()(o,c)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function pC(n,e){return Gn(n,"POST","/v2/accounts:revokeToken",Cs(n,e))}/**
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
 */class Ls{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){ne(e.idToken,"internal-error"),ne(typeof e.idToken<"u","internal-error"),ne(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):ju(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){ne(e.length!==0,"internal-error");const t=ju(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(ne(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:s,refreshToken:r,expiresIn:i}=await fC(e,t);this.updateTokensAndExpiration(s,r,Number(i))}updateTokensAndExpiration(e,t,s){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+s*1e3}static fromJSON(e,t){const{refreshToken:s,accessToken:r,expirationTime:i}=t,o=new Ls;return s&&(ne(typeof s=="string","internal-error",{appName:e}),o.refreshToken=s),r&&(ne(typeof r=="string","internal-error",{appName:e}),o.accessToken=r),i&&(ne(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Ls,this.toJSON())}_performRefresh(){return Yt("not implemented")}}/**
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
 */function dn(n,e){ne(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Pt{constructor({uid:e,auth:t,stsTokenManager:s,...r}){this.providerId="firebase",this.proactiveRefresh=new BC(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new ll(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){const t=await Ur(this,this.stsTokenManager.getToken(this.auth,e));return ne(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return cC(this,e)}reload(){return hC(this)}_assign(e){this!==e&&(ne(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Pt({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){ne(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let s=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),s=!0),t&&await fo(this),await this.auth._persistUserIfCurrent(this),s&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Tt(this.auth.app))return Promise.reject(Tn(this.auth));const e=await this.getIdToken();return await Ur(this,lC(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const s=t.displayName??void 0,r=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,a=t.tenantId??void 0,c=t._redirectEventId??void 0,u=t.createdAt??void 0,h=t.lastLoginAt??void 0,{uid:f,emailVerified:p,isAnonymous:g,providerData:D,stsTokenManager:R}=t;ne(f&&R,e,"internal-error");const M=Ls.fromJSON(this.name,R);ne(typeof f=="string",e,"internal-error"),dn(s,e.name),dn(r,e.name),ne(typeof p=="boolean",e,"internal-error"),ne(typeof g=="boolean",e,"internal-error"),dn(i,e.name),dn(o,e.name),dn(a,e.name),dn(c,e.name),dn(u,e.name),dn(h,e.name);const O=new Pt({uid:f,auth:e,email:r,emailVerified:p,displayName:s,isAnonymous:g,photoURL:o,phoneNumber:i,tenantId:a,stsTokenManager:M,createdAt:u,lastLoginAt:h});return D&&Array.isArray(D)&&(O.providerData=D.map(H=>({...H}))),c&&(O._redirectEventId=c),O}static async _fromIdTokenResponse(e,t,s=!1){const r=new Ls;r.updateFromServerResponse(t);const i=new Pt({uid:t.localId,auth:e,stsTokenManager:r,isAnonymous:s});return await fo(i),i}static async _fromGetAccountInfoResponse(e,t,s){const r=t.users[0];ne(r.localId!==void 0,"internal-error");const i=r.providerUserInfo!==void 0?rd(r.providerUserInfo):[],o=!(r.email&&r.passwordHash)&&!(i!=null&&i.length),a=new Ls;a.updateFromIdToken(s);const c=new Pt({uid:r.localId,auth:e,stsTokenManager:a,isAnonymous:o}),u={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:i,metadata:new ll(r.createdAt,r.lastLoginAt),isAnonymous:!(r.email&&r.passwordHash)&&!(i!=null&&i.length)};return Object.assign(c,u),c}}/**
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
 */const Ku=new Map;function Xt(n){nn(n instanceof Function,"Expected a class definition");let e=Ku.get(n);return e?(nn(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Ku.set(n,e),e)}/**
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
 */class id{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}id.type="NONE";const zu=id;/**
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
 */function eo(n,e,t){return`firebase:${n}:${e}:${t}`}class as{constructor(e,t,s){this.persistence=e,this.auth=t,this.userKey=s;const{config:r,name:i}=this.auth;this.fullUserKey=eo(this.userKey,r.apiKey,i),this.fullPersistenceKey=eo("persistence",r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t);try{this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}catch{}}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ho(this.auth,{idToken:e}).catch(()=>{});return t?Pt._fromGetAccountInfoResponse(this.auth,t,e):null}return Pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){try{this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}catch{}}static async create(e,t,s="authUser"){if(!t.length)return new as(Xt(zu),e,s);const r=(await Promise.all(t.map(async u=>{try{if(await u._isAvailable())return u}catch{return}}))).filter(u=>u);let i=r[0]||Xt(zu);const o=eo(s,e.config.apiKey,e.name);let a=null;for(const u of t)try{const h=await u._get(o);if(h){let f;if(typeof h=="string"){const p=await ho(e,{idToken:h}).catch(()=>{});if(!p)break;f=await Pt._fromGetAccountInfoResponse(e,p,h)}else f=Pt._fromJSON(e,h);u!==i&&(a=f),i=u;break}}catch{}const c=r.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!c.length?new as(i,e,s):(i=c[0],a&&await i._set(o,a.toJSON()),await Promise.all(t.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new as(i,e,s))}}/**
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
 */function Wu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(cd(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(od(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Bd(e))return"Blackberry";if(hd(e))return"Webos";if(ad(e))return"Safari";if((e.includes("chrome/")||ld(e))&&!e.includes("edge/"))return"Chrome";if(ud(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,s=n.match(t);if((s==null?void 0:s.length)===2)return s[1]}return"Other"}function od(n=Ze()){return/firefox\//i.test(n)}function ad(n=Ze()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function ld(n=Ze()){return/crios\//i.test(n)}function cd(n=Ze()){return/iemobile/i.test(n)}function ud(n=Ze()){return/android/i.test(n)}function Bd(n=Ze()){return/blackberry/i.test(n)}function hd(n=Ze()){return/webos/i.test(n)}function Fl(n=Ze()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function mC(n=Ze()){var e;return Fl(n)&&!!((e=window.navigator)!=null&&e.standalone)}function gC(){return Pm()&&document.documentMode===10}function dd(n=Ze()){return Fl(n)||ud(n)||hd(n)||Bd(n)||/windows phone/i.test(n)||cd(n)}/**
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
 */function fd(n,e=[]){let t;switch(n){case"Browser":t=Wu(Ze());break;case"Worker":t=`${Wu(Ze())}-${n}`;break;default:t=n}const s=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${zs}/${s}`}/**
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
 */class CC{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const s=i=>new Promise((o,a)=>{try{const c=e(i);o(c)}catch(c){a(c)}});s.onAbort=t,this.queue.push(s);const r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const s of this.queue)await s(e),s.onAbort&&t.push(s.onAbort)}catch(s){t.reverse();for(const r of t)try{r()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:s==null?void 0:s.message})}}}/**
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
 */async function yC(n,e={}){return Gn(n,"GET","/v2/passwordPolicy",Cs(n,e))}/**
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
 */const EC=6;class _C{constructor(e){var s;const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??EC,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=((s=e.allowedNonAlphanumericCharacters)==null?void 0:s.join(""))??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const s=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;s&&(t.meetsMinPasswordLength=e.length>=s),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let s;for(let r=0;r<e.length;r++)s=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,s>="a"&&s<="z",s>="A"&&s<="Z",s>="0"&&s<="9",this.allowedNonAlphanumericCharacters.includes(s))}updatePasswordCharacterOptionsStatuses(e,t,s,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=s)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=r)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class vC{constructor(e,t,s,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=s,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qu(this),this.idTokenSubscription=new Qu(this),this.beforeStateQueue=new CC(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=ed,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xt(t)),this._initializationPromise=this.queue(async()=>{var s,r,i;if(!this._deleted){try{this.persistenceManager=await as.create(this,e)}catch(o){Xi(`Failed to initialize persistence: ${o}`),this.persistenceManager=await as.create(this,[])}finally{(s=this._resolvePersistenceManagerAvailable)==null||s.call(this)}if(!this._deleted){if((r=this._popupRedirectResolver)!=null&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}try{await this.initializeCurrentUser(t)}catch(o){Xi(`Failed to initialize current user: ${o}`),await this.directlySetCurrentUser(null).catch(()=>{})}this.lastNotifiedUid=((i=this.currentUser)==null?void 0:i.uid)||null,!this._deleted&&(this._isInitialized=!0)}}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ho(this,{idToken:e}),s=await Pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(s)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var i;if(Tt(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(a=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(a,a))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let s=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(i=this.redirectUser)==null?void 0:i._redirectEventId,a=s==null?void 0:s._redirectEventId,c=await this.tryRedirectSignIn(e);(!o||o===a)&&(c!=null&&c.user)&&(s=c.user,r=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return ne(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await fo(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=eC()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Tt(this.app))return Promise.reject(Tn(this));const t=e?Me(e):null;return t&&ne(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&ne(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Tt(this.app)?Promise.reject(Tn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Tt(this.app)?Promise.reject(Tn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await yC(this),t=new _C(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ii("auth","Firebase",e())}onAuthStateChanged(e,t,s){return this.registerStateListener(this.authStateSubscription,e,t,s)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,s){return this.registerStateListener(this.idTokenSubscription,e,t,s)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const s=this.onAuthStateChanged(()=>{s(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),s={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(s.tenantId=this.tenantId),await pC(this,s)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)==null?void 0:e.toJSON()}}async _setRedirectUser(e,t){const s=await this.getOrInitRedirectPersistenceManager(t);return e===null?s.removeCurrentUser():s.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Xt(e)||this._popupRedirectResolver;ne(t,this,"argument-error"),this.redirectPersistenceManager=await as.create(this,[Xt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,s;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)==null?void 0:t._redirectEventId)===e?this._currentUser:((s=this.redirectUser)==null?void 0:s._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=((t=this.currentUser)==null?void 0:t.uid)??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,s,r){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const a=this._isInitialized?Promise.resolve():this._initializationPromise;if(ne(a,this,"internal-error"),a.then(()=>{o||i(this.currentUser)}).catch(c=>{if(!o)if(typeof t!="function"&&t.error)t.error(c);else if(s)s(c);else throw c}),typeof t=="function"){const c=e.addObserver(t,s,r);return()=>{o=!0,c()}}else{const c=e.addObserver(t);return()=>{o=!0,c()}}}async directlySetCurrentUser(e){if(this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,this.persistenceManager)try{e?await this.persistenceManager.setCurrentUser(e):await this.persistenceManager.removeCurrentUser()}catch(t){const s=(t==null?void 0:t.message)||String(t),r=ko(this,"internal-error",`An internal AuthError has occurred: ${s}`);throw r.customData={originalError:t},r}}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return ne(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=fd(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var r;const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await((r=this.heartbeatServiceProvider.getImmediate({optional:!0}))==null?void 0:r.getHeartbeatsHeader());t&&(e["X-Firebase-Client"]=t);const s=await this._getAppCheckToken();return s&&(e["X-Firebase-AppCheck"]=s),e}async _getAppCheckToken(){var t;if(Tt(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await((t=this.appCheckServiceProvider.getImmediate({optional:!0}))==null?void 0:t.getToken());return e!=null&&e.error&&Xi(`Error while retrieving App Check token: ${e.error}`),e==null?void 0:e.token}}function ys(n){return Me(n)}class Qu{constructor(e){this.auth=e,this.observer=null,this.addObserver=Fm(t=>this.observer=t)}get next(){return ne(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let xo={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function DC(n){xo=n}function pd(n){return xo.loadJS(n)}function wC(){return xo.recaptchaEnterpriseScript}function IC(){return xo.gapiScript}function TC(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class bC{constructor(){this.enterprise=new AC}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class AC{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}/**
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
 */const SC="recaptcha-enterprise",md="NO_RECAPTCHA",Yu="onFirebaseAuthREInstanceReady";class Cn{constructor(e){this.type=SC,this.auth=ys(e)}async verify(e="verify",t=!1){async function s(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,a)=>{aC(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(c=>{if(c.recaptchaKey===void 0)a(new Error("recaptcha Enterprise site key undefined"));else{const u=new oC(c);return i.tenantId==null?i._agentRecaptchaConfig=u:i._tenantRecaptchaConfigs[i.tenantId]=u,o(u.siteKey)}}).catch(c=>{a(c)})})}function r(i,o,a){const c=window.grecaptcha;Ju(c)?c.enterprise.ready(()=>{c.enterprise.execute(i,{action:e}).then(u=>{o(u)}).catch(()=>{o(md)})}):a(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new bC().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{s(this.auth).then(async a=>{if(!t&&Ju(window.grecaptcha)&&Cn.scriptInjectionDeferred)await Cn.scriptInjectionDeferred.promise,r(a,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let c=wC();c.length!==0&&(c+=a+`&onload=${Yu}`),Cn.scriptInjectionDeferred=new Jh,window[Yu]=()=>{var u;(u=Cn.scriptInjectionDeferred)==null||u.resolve()},pd(c).then(()=>{var u;return(u=Cn.scriptInjectionDeferred)==null?void 0:u.promise}).then(()=>{r(a,i,o)}).catch(u=>{o(u)})}}).catch(a=>{o(a)})})}}Cn.scriptInjectionDeferred=null;async function Xu(n,e,t,s=!1,r=!1){const i=new Cn(n);let o;if(r)o=md;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const a={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in a){const c=a.phoneEnrollmentInfo.phoneNumber,u=a.phoneEnrollmentInfo.recaptchaToken;Object.assign(a,{phoneEnrollmentInfo:{phoneNumber:c,recaptchaToken:u,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in a){const c=a.phoneSignInInfo.recaptchaToken;Object.assign(a,{phoneSignInInfo:{recaptchaToken:c,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return a}return s?Object.assign(a,{captchaResp:o}):Object.assign(a,{captchaResponse:o}),Object.assign(a,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(a,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),a}async function Zu(n,e,t,s,r){var i;if((i=n._getRecaptchaConfig())!=null&&i.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const o=await Xu(n,e,t,t==="getOobCode");return s(n,o)}else return s(n,e).catch(async o=>{if(o.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const a=await Xu(n,e,t,t==="getOobCode");return s(n,a)}else return Promise.reject(o)})}/**
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
 */function PC(n,e){const t=Nl(n,"auth");if(t.isInitialized()){const r=t.getImmediate(),i=t.getOptions();if(Bs(i,e??{}))return r;At(r,"already-initialized")}return t.initialize({options:e})}function RC(n,e){const t=(e==null?void 0:e.persistence)||[],s=(Array.isArray(t)?t:[t]).map(Xt);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(s,e==null?void 0:e.popupRedirectResolver)}function OC(n,e,t){const s=ys(n);ne(/^https?:\/\//.test(e),s,"invalid-emulator-scheme");const r=!1,i=gd(e),{host:o,port:a}=NC(e),c=a===null?"":`:${a}`,u={url:`${i}//${o}${c}/`},h=Object.freeze({host:o,port:a,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:r})});if(!s._canInitEmulator){ne(s.config.emulator&&s.emulatorConfig,s,"emulator-config-failed"),ne(Bs(u,s.config.emulator)&&Bs(h,s.emulatorConfig),s,"emulator-config-failed");return}s.config.emulator=u,s.emulatorConfig=h,s.settings.appVerificationDisabledForTesting=!0,ai(o)?jh(`${i}//${o}${c}`):kC()}function gd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function NC(n){const e=gd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const s=t[2].split("@").pop()||"",r=/^(\[[^\]]+\])(:|$)/.exec(s);if(r){const i=r[1];return{host:i,port:eB(s.substr(i.length+1))}}else{const[i,o]=s.split(":");return{host:i,port:eB(o)}}}function eB(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function kC(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
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
 */class Ml{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Yt("not implemented")}_getIdTokenResponse(e){return Yt("not implemented")}_linkToIdToken(e,t){return Yt("not implemented")}_getReauthenticationResolver(e){return Yt("not implemented")}}async function LC(n,e){return Gn(n,"POST","/v1/accounts:signUp",e)}/**
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
 */async function xC(n,e){return Lo(n,"POST","/v1/accounts:signInWithPassword",Cs(n,e))}/**
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
 */async function FC(n,e){return Lo(n,"POST","/v1/accounts:signInWithEmailLink",Cs(n,e))}async function MC(n,e){return Lo(n,"POST","/v1/accounts:signInWithEmailLink",Cs(n,e))}/**
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
 */class Hr extends Ml{constructor(e,t,s,r=null){super("password",s),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(e,t){return new Hr(e,t,"password")}static _fromEmailAndCode(e,t,s=null){return new Hr(e,t,"emailLink",s)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t!=null&&t.email&&(t!=null&&t.password)){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zu(e,t,"signInWithPassword",xC);case"emailLink":return FC(e,{email:this._email,oobCode:this._password});default:At(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const s={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return Zu(e,s,"signUpPassword",LC);case"emailLink":return MC(e,{idToken:t,email:this._email,oobCode:this._password});default:At(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
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
 */async function xs(n,e){return Lo(n,"POST","/v1/accounts:signInWithIdp",Cs(n,e))}/**
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
 */const VC="http://localhost";class ds extends Ml{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new ds(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):At("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:s,signInMethod:r,...i}=t;if(!s||!r)return null;const o=new ds(s,r);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return xs(e,t)}_linkToIdToken(e,t){const s=this.buildRequest();return s.idToken=t,xs(e,s)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,xs(e,t)}buildRequest(){const e={requestUri:VC,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=oi(t)}return e}}/**
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
 */function UC(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function HC(n){const e=wr(Ir(n)).link,t=e?wr(Ir(e)).deep_link_id:null,s=wr(Ir(n)).deep_link_id;return(s?wr(Ir(s)).link:null)||s||t||e||n}class Vl{constructor(e){const t=wr(Ir(e)),s=t.apiKey??null,r=t.oobCode??null,i=UC(t.mode??null);ne(s&&r&&i,"argument-error"),this.apiKey=s,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=HC(e);try{return new Vl(t)}catch{return null}}}/**
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
 */class Ws{constructor(){this.providerId=Ws.PROVIDER_ID}static credential(e,t){return Hr._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const s=Vl.parseLink(t);return ne(s,"argument-error"),Hr._fromEmailAndCode(e,s.code,s.tenantId)}}Ws.PROVIDER_ID="password";Ws.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Ws.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
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
 */class Ul{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class ci extends Ul{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class yn extends ci{constructor(){super("facebook.com")}static credential(e){return ds._fromParams({providerId:yn.PROVIDER_ID,signInMethod:yn.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return yn.credentialFromTaggedObject(e)}static credentialFromError(e){return yn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return yn.credential(e.oauthAccessToken)}catch{return null}}}yn.FACEBOOK_SIGN_IN_METHOD="facebook.com";yn.PROVIDER_ID="facebook.com";/**
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
 */class zt extends ci{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return ds._fromParams({providerId:zt.PROVIDER_ID,signInMethod:zt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return zt.credentialFromTaggedObject(e)}static credentialFromError(e){return zt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:s}=e;if(!t&&!s)return null;try{return zt.credential(t,s)}catch{return null}}}zt.GOOGLE_SIGN_IN_METHOD="google.com";zt.PROVIDER_ID="google.com";/**
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
 */class En extends ci{constructor(){super("github.com")}static credential(e){return ds._fromParams({providerId:En.PROVIDER_ID,signInMethod:En.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return En.credentialFromTaggedObject(e)}static credentialFromError(e){return En.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return En.credential(e.oauthAccessToken)}catch{return null}}}En.GITHUB_SIGN_IN_METHOD="github.com";En.PROVIDER_ID="github.com";/**
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
 */class _n extends ci{constructor(){super("twitter.com")}static credential(e,t){return ds._fromParams({providerId:_n.PROVIDER_ID,signInMethod:_n.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return _n.credentialFromTaggedObject(e)}static credentialFromError(e){return _n.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:s}=e;if(!t||!s)return null;try{return _n.credential(t,s)}catch{return null}}}_n.TWITTER_SIGN_IN_METHOD="twitter.com";_n.PROVIDER_ID="twitter.com";/**
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
 */class Us{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,s,r=!1){const i=await Pt._fromIdTokenResponse(e,s,r),o=tB(s);return new Us({user:i,providerId:o,_tokenResponse:s,operationType:t})}static async _forOperation(e,t,s){await e._updateTokensIfNecessary(s,!0);const r=tB(s);return new Us({user:e,providerId:r,_tokenResponse:s,operationType:t})}}function tB(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
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
 */class po extends on{constructor(e,t,s,r){super(t.code,t.message),this.operationType=s,this.user=r,Object.setPrototypeOf(this,po.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:s}}static _fromErrorAndOperation(e,t,s,r){return new po(e,t,s,r)}}function Cd(n,e,t,s){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?po._fromErrorAndOperation(n,i,e,s):i})}async function GC(n,e,t=!1){const s=await Ur(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Us._forOperation(n,"link",s)}/**
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
 */async function $C(n,e,t=!1){const{auth:s}=n;if(Tt(s.app))return Promise.reject(Tn(s));const r="reauthenticate";try{const i=await Ur(n,Cd(s,r,e,n),t);ne(i.idToken,s,"internal-error");const o=xl(i.idToken);ne(o,s,"internal-error");const{sub:a}=o;return ne(n.uid===a,s,"user-mismatch"),Us._forOperation(n,r,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&At(s,"user-mismatch"),i}}/**
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
 */async function yd(n,e,t=!1){if(Tt(n.app))return Promise.reject(Tn(n));const s="signIn",r=await Cd(n,s,e),i=await Us._fromIdTokenResponse(n,s,r);return t||await n._updateCurrentUser(i.user),i}async function qC(n,e){return yd(ys(n),e)}/**
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
 */async function JC(n){const e=ys(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function jC(n,e,t){return Tt(n.app)?Promise.reject(Tn(n)):qC(Me(n),Ws.credential(e,t)).catch(async s=>{throw s.code==="auth/password-does-not-meet-requirements"&&JC(n),s})}function KC(n,e,t,s){return Me(n).onIdTokenChanged(e,t,s)}function zC(n,e,t){return Me(n).beforeAuthStateChanged(e,t)}function WC(n,e,t,s){return Me(n).onAuthStateChanged(e,t,s)}function Va(n){return Me(n).signOut()}const mo="__sak";/**
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
 */class Ed{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(mo,"1"),this.storage.removeItem(mo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const QC=1e3,YC=10;class _d extends Ed{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=dd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const s=this.storage.getItem(t),r=this.localCache[t];s!==r&&e(t,r,s)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,a,c)=>{this.notifyListeners(o,c)});return}const s=e.key;t?this.detachListener():this.stopPolling();const r=()=>{const o=this.storage.getItem(s);!t&&this.localCache[s]===o||this.notifyListeners(s,o)},i=this.storage.getItem(s);gC()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,YC):r()}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,s)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:s}),!0)})},QC)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}_d.type="LOCAL";const XC=_d;/**
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
 */class vd extends Ed{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vd.type="SESSION";const Dd=vd;/**
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
 */function ZC(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
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
 */class Fo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(r=>r.isListeningto(e));if(t)return t;const s=new Fo(e);return this.receivers.push(s),s}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:s,eventType:r,data:i}=t.data,o=this.handlersMap[r];if(!(o!=null&&o.size))return;t.ports[0].postMessage({status:"ack",eventId:s,eventType:r});const a=Array.from(o).map(async u=>u(t.origin,i)),c=await ZC(a);t.ports[0].postMessage({status:"done",eventId:s,eventType:r,response:c})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Fo.receivers=[];/**
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
 */function Hl(n="",e=10){let t="";for(let s=0;s<e;s++)t+=Math.floor(Math.random()*10);return n+t}/**
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
 */class ey{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,s=50){const r=typeof MessageChannel<"u"?new MessageChannel:null;if(!r)throw new Error("connection_unavailable");let i,o;return new Promise((a,c)=>{const u=Hl("",20);r.port1.start();const h=setTimeout(()=>{c(new Error("unsupported_event"))},s);o={messageChannel:r,onMessage(f){const p=f;if(p.data.eventId===u)switch(p.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{c(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),a(p.data.response);break;default:clearTimeout(h),clearTimeout(i),c(new Error("invalid_response"));break}}},this.handlers.add(o),r.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:t},[r.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function Vt(){return window}function ty(n){Vt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */function wd(){return typeof Vt().WorkerGlobalScope<"u"&&typeof Vt().importScripts=="function"}async function ny(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function sy(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)==null?void 0:n.controller)||null}function ry(){return wd()?self:null}/**
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
 */const Id="firebaseLocalStorageDb",iy=1,go="firebaseLocalStorage",Td="fbase_key";class ui{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Mo(n,e){return n.transaction([go],e?"readwrite":"readonly").objectStore(go)}function oy(){const n=indexedDB.deleteDatabase(Id);return new ui(n).toPromise()}function bd(){const n=indexedDB.open(Id,iy);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const s=n.result;try{s.createObjectStore(go,{keyPath:Td})}catch(r){t(r)}}),n.addEventListener("success",async()=>{const s=n.result;s.objectStoreNames.contains(go)?e(s):(s.close(),await oy(),e(await bd()))})})}async function nB(n,e,t){const s=Mo(n,!0).put({[Td]:e,value:t});return new ui(s).toPromise()}async function ay(n,e){const t=Mo(n,!1).get(e),s=await new ui(t).toPromise();return s===void 0?null:s.value}function sB(n,e){const t=Mo(n,!0).delete(e);return new ui(t).toPromise()}const ly=800,cy=3;class Ad{registerLifecycleListeners(){typeof window<"u"&&typeof window.addEventListener=="function"&&(window.addEventListener("pagehide",this.onPageHide),window.addEventListener("pageshow",this.onPageShow))}unregisterLifecycleListeners(){typeof window<"u"&&typeof window.removeEventListener=="function"&&(window.removeEventListener("pagehide",this.onPageHide),window.removeEventListener("pageshow",this.onPageShow))}constructor(){this.type="LOCAL",this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.isClosing=!1,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this.onPageHide=()=>{this.isClosing=!0,this.stopPolling(),this.dbPromise&&(this.dbPromise.then(e=>e.close()).catch(()=>{}),this.dbPromise=null)},this.onPageShow=()=>{this.isClosing&&(this.isClosing=!1,Object.keys(this.listeners).length>0&&this.startPolling())},this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=bd(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{const s=await this._openDb();return await e(s)}catch(s){if(t++>cy)throw s;if(this.dbPromise){const r=this.dbPromise;this.dbPromise=null;try{(await r).close()}catch{}}}}async initializeServiceWorkerMessaging(){return wd()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Fo._getInstance(ry()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var t,s;if(this.activeServiceWorker=await ny(),!this.activeServiceWorker)return;this.sender=new ey(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&(t=e[0])!=null&&t.fulfilled&&(s=e[0])!=null&&s.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||sy()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await nB(e,mo,"1"),await sB(e,mo)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(s=>nB(s,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(s=>ay(s,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>sB(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){if(this.isClosing)return[];try{const e=await this._withRetries(r=>{const i=Mo(r,!1).getAll();return new ui(i).toPromise()});if(this.isClosing)return[];if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],s=new Set;if(e.length!==0)for(const{fbase_key:r,value:i}of e)s.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(const r of Object.keys(this.localCache))this.localCache[r]&&!s.has(r)&&(this.notifyListeners(r,null),t.push(r));return t}catch(e){return this.isClosing||Xi(`Firebase Auth cross-tab polling failed with error: ${e}`),[]}}notifyListeners(e,t){this.localCache[e]=t;const s=this.listeners[e];if(s)for(const r of Array.from(s))r(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),ly)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.startPolling(),this.registerLifecycleListeners()),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.stopPolling(),this.unregisterLifecycleListeners())}}Ad.type="LOCAL";const uy=Ad;new li(3e4,6e4);/**
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
 */function Sd(n,e){return e?Xt(e):(ne(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
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
 */class Gl extends Ml{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return xs(e,this._buildIdpRequest())}_linkToIdToken(e,t){return xs(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return xs(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function By(n){return yd(n.auth,new Gl(n),n.bypassAuthState)}function hy(n){const{auth:e,user:t}=n;return ne(t,e,"internal-error"),$C(t,new Gl(n),n.bypassAuthState)}async function dy(n){const{auth:e,user:t}=n;return ne(t,e,"internal-error"),GC(t,new Gl(n),n.bypassAuthState)}/**
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
 */class Pd{constructor(e,t,s,r,i=!1){this.auth=e,this.resolver=s,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(s){this.reject(s)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:s,postBody:r,tenantId:i,error:o,type:a}=e;if(o){this.reject(o);return}const c={auth:this.auth,requestUri:t,sessionId:s,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(a)(c))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return By;case"linkViaPopup":case"linkViaRedirect":return dy;case"reauthViaPopup":case"reauthViaRedirect":return hy;default:At(this.auth,"internal-error")}}resolve(e){nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){nn(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const fy=new li(2e3,1e4);async function py(n,e,t){if(Tt(n.app))return Promise.reject(Rt(n,"operation-not-supported-in-this-environment"));const s=ys(n);Yg(n,e,Ul);const r=Sd(s,t);return new ss(s,"signInViaPopup",e,r).executeNotNull()}class ss extends Pd{constructor(e,t,s,r,i){super(e,t,r,i),this.provider=s,this.authWindow=null,this.pollId=null,ss.currentPopupAction&&ss.currentPopupAction.cancel(),ss.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return ne(e,this.auth,"internal-error"),e}async onExecution(){nn(this.filter.length===1,"Popup operations only handle one event");const e=Hl();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(Rt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)==null?void 0:e.associatedEvent)||null}cancel(){this.reject(Rt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,ss.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,s;if((s=(t=this.authWindow)==null?void 0:t.window)!=null&&s.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(Rt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,fy.get())};e()}}ss.currentPopupAction=null;/**
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
 */const my="pendingRedirect",to=new Map;class gy extends Pd{constructor(e,t,s=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,s),this.eventId=null}async execute(){let e=to.get(this.auth._key());if(!e){try{const s=await Cy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(s)}catch(t){e=()=>Promise.reject(t)}to.set(this.auth._key(),e)}return this.bypassAuthState||to.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Cy(n,e){const t=_y(e),s=Ey(n);if(!await s._isAvailable())return!1;const r=await s._get(t)==="true";return await s._remove(t),r}function yy(n,e){to.set(n._key(),e)}function Ey(n){return Xt(n._redirectPersistence)}function _y(n){return eo(my,n.config.apiKey,n.name)}async function vy(n,e,t=!1){if(Tt(n.app))return Promise.reject(Tn(n));const s=ys(n),r=Sd(s,e),o=await new gy(s,r,t).execute();return o&&!t&&(delete o.user._redirectEventId,await s._persistUserIfCurrent(o.user),await s._setRedirectUser(null,e)),o}/**
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
 */const Dy=600*1e3;class wy{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(s=>{this.isEventForConsumer(e,s)&&(t=!0,this.sendToConsumer(e,s),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!Iy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var s;if(e.error&&!Rd(e)){const r=((s=e.error.code)==null?void 0:s.split("auth/")[1])||"internal-error";t.onError(Rt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const s=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&s}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Dy&&this.cachedEventUids.clear(),this.cachedEventUids.has(rB(e))}saveEventToCache(e){this.cachedEventUids.add(rB(e)),this.lastProcessedEventTime=Date.now()}}function rB(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Rd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function Iy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Rd(n);default:return!1}}/**
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
 */async function Ty(n,e={}){return Gn(n,"GET","/v1/projects",e)}/**
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
 */const by=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Ay=/^https?/;async function Sy(n){if(n.config.emulator)return;const{authorizedDomains:e}=await Ty(n);for(const t of e)try{if(Py(t))return}catch{}At(n,"unauthorized-domain")}function Py(n){const e=al(),{protocol:t,hostname:s}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&s===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===s}if(!Ay.test(t))return!1;if(by.test(n))return s===n;const r=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+r+"|"+r+")$","i").test(s)}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Ry=new li(3e4,6e4);function iB(){const n=Vt().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Oy(n){return new Promise((e,t)=>{var r,i,o;function s(){iB(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{iB(),t(Rt(n,"network-request-failed"))},timeout:Ry.get()})}if((i=(r=Vt().gapi)==null?void 0:r.iframes)!=null&&i.Iframe)e(gapi.iframes.getContext());else if((o=Vt().gapi)!=null&&o.load)s();else{const a=TC("iframefcb");return Vt()[a]=()=>{gapi.load?s():t(Rt(n,"network-request-failed"))},pd(`${IC()}?onload=${a}`).catch(c=>t(c))}}).catch(e=>{throw no=null,e})}let no=null;function Ny(n){return no=no||Oy(n),no}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const ky=new li(5e3,15e3),Ly="__/auth/iframe",xy="emulator/auth/iframe",Fy={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},My=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function Vy(n){const e=n.config;ne(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Ll(e,xy):`https://${n.config.authDomain}/${Ly}`,s={apiKey:e.apiKey,appName:n.name,v:zs},r=My.get(n.config.apiHost);r&&(s.eid=r);const i=n._getFrameworks();return i.length&&(s.fw=i.join(",")),`${t}?${oi(s).slice(1)}`}async function Uy(n){const e=await Ny(n),t=Vt().gapi;return ne(t,n,"internal-error"),e.open({where:document.body,url:Vy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Fy,dontclear:!0},s=>new Promise(async(r,i)=>{await s.restyle({setHideOnLeave:!1});const o=Rt(n,"network-request-failed"),a=Vt().setTimeout(()=>{i(o)},ky.get());function c(){Vt().clearTimeout(a),r(s)}s.ping(c).then(c,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
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
 */const Hy={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Gy=500,$y=600,qy="_blank",Jy="http://localhost";class oB{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function jy(n,e,t,s=Gy,r=$y){const i=Math.max((window.screen.availHeight-r)/2,0).toString(),o=Math.max((window.screen.availWidth-s)/2,0).toString();let a="";const c={...Hy,width:s.toString(),height:r.toString(),top:i,left:o},u=Ze().toLowerCase();t&&(a=ld(u)?qy:t),od(u)&&(e=e||Jy,c.scrollbars="yes");const h=Object.entries(c).reduce((p,[g,D])=>`${p}${g}=${D},`,"");if(mC(u)&&a!=="_self")return Ky(e||"",a),new oB(null);const f=window.open(e||"",a,h);ne(f,n,"popup-blocked");try{f.focus()}catch{}return new oB(f)}function Ky(n,e){const t=document.createElement("a");t.href=n,t.target=e;const s=document.createEvent("MouseEvent");s.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(s)}/**
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
 */const zy="__/auth/handler",Wy="emulator/auth/handler",Qy=encodeURIComponent("fac");async function aB(n,e,t,s,r,i){ne(n.config.authDomain,n,"auth-domain-config-required"),ne(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:s,v:zs,eventId:r};if(e instanceof Ul){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",xm(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,f]of Object.entries({}))o[h]=f}if(e instanceof ci){const h=e.getScopes().filter(f=>f!=="");h.length>0&&(o.scopes=h.join(","))}n.tenantId&&(o.tid=n.tenantId);const a=o;for(const h of Object.keys(a))a[h]===void 0&&delete a[h];const c=await n._getAppCheckToken(),u=c?`#${Qy}=${encodeURIComponent(c)}`:"";return`${Yy(n)}?${oi(a).slice(1)}${u}`}function Yy({config:n}){return n.emulator?Ll(n,Wy):`https://${n.authDomain}/${zy}`}/**
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
 */const Ua="webStorageSupport";class Xy{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Dd,this._completeRedirectFn=vy,this._overrideRedirectResult=yy}async _openPopup(e,t,s,r){var o;nn((o=this.eventManagers[e._key()])==null?void 0:o.manager,"_initialize() not called before _openPopup()");const i=await aB(e,t,s,al(),r);return jy(e,i,Hl())}async _openRedirect(e,t,s,r){await this._originValidation(e);const i=await aB(e,t,s,al(),r);return ty(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:r,promise:i}=this.eventManagers[t];return r?Promise.resolve(r):(nn(i,"If manager is not set, promise should be"),i)}const s=this.initAndGetManager(e);return this.eventManagers[t]={promise:s},s.catch(()=>{delete this.eventManagers[t]}),s}async initAndGetManager(e){const t=await Uy(e),s=new wy(e);return t.register("authEvent",r=>(ne(r==null?void 0:r.authEvent,e,"invalid-auth-event"),{status:s.onEvent(r.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:s},this.iframes[e._key()]=t,s}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ua,{type:Ua},r=>{var o;const i=(o=r==null?void 0:r[0])==null?void 0:o[Ua];i!==void 0&&t(!!i),At(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=Sy(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return dd()||ad()||Fl()}}const Zy=Xy;var lB="@firebase/auth",cB="1.13.6";/**
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
 */class eE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)==null?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(s=>{e((s==null?void 0:s.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){ne(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function tE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function nE(n){Vs(new hs("auth",(e,{options:t})=>{const s=e.getProvider("app").getImmediate(),r=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:a}=s.options;ne(o&&!o.includes(":"),"invalid-api-key",{appName:s.name});const c={apiKey:o,authDomain:a,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:fd(n)},u=new vC(s,r,i,c);return RC(u,t),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,s)=>{e.getProvider("auth-internal").initialize()})),Vs(new hs("auth-internal",e=>{const t=ys(e.getProvider("auth").getImmediate());return(s=>new eE(s))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),In(lB,cB,tE(n)),In(lB,cB,"esm2020")}/**
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
 */const sE=300,rE=qh("authIdTokenMaxAge")||sE;let uB=null;const iE=n=>async e=>{const t=e&&await e.getIdTokenResult(),s=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(s&&s>rE)return;const r=t==null?void 0:t.token;uB!==r&&(uB=r,await fetch(n,{method:r?"POST":"DELETE",headers:r?{Authorization:`Bearer ${r}`}:{}}))};function oE(n=Qh()){const e=Nl(n,"auth");if(e.isInitialized())return e.getImmediate();const t=PC(n,{popupRedirectResolver:Zy,persistence:[uy,XC,Dd]}),s=qh("authTokenSyncURL");if(s&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(s,location.origin);if(location.origin===i.origin){const o=iE(i.toString());zC(t,o,()=>o(t.currentUser)),KC(t,a=>o(a))}}const r=Gh("auth");return r&&OC(t,`http://${r}`),t}function aE(){var n;return((n=document.getElementsByTagName("head"))==null?void 0:n[0])??document}DC({loadJS(n){return new Promise((e,t)=>{const s=document.createElement("script");s.setAttribute("src",n),s.onload=e,s.onerror=r=>{const i=Rt("internal-error");i.customData=r,t(i)},s.type="text/javascript",s.charset="UTF-8",aE().appendChild(s)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});nE("Browser");var BB=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bn,Od;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(w,C){function _(){}_.prototype=C.prototype,w.F=C.prototype,w.prototype=new _,w.prototype.constructor=w,w.D=function(A,I,S){for(var v=Array(arguments.length-2),Oe=2;Oe<arguments.length;Oe++)v[Oe-2]=arguments[Oe];return C.prototype[I].apply(A,v)}}function t(){this.blockSize=-1}function s(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(s,t),s.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function r(w,C,_){_||(_=0);const A=Array(16);if(typeof C=="string")for(var I=0;I<16;++I)A[I]=C.charCodeAt(_++)|C.charCodeAt(_++)<<8|C.charCodeAt(_++)<<16|C.charCodeAt(_++)<<24;else for(I=0;I<16;++I)A[I]=C[_++]|C[_++]<<8|C[_++]<<16|C[_++]<<24;C=w.g[0],_=w.g[1],I=w.g[2];let S=w.g[3],v;v=C+(S^_&(I^S))+A[0]+3614090360&4294967295,C=_+(v<<7&4294967295|v>>>25),v=S+(I^C&(_^I))+A[1]+3905402710&4294967295,S=C+(v<<12&4294967295|v>>>20),v=I+(_^S&(C^_))+A[2]+606105819&4294967295,I=S+(v<<17&4294967295|v>>>15),v=_+(C^I&(S^C))+A[3]+3250441966&4294967295,_=I+(v<<22&4294967295|v>>>10),v=C+(S^_&(I^S))+A[4]+4118548399&4294967295,C=_+(v<<7&4294967295|v>>>25),v=S+(I^C&(_^I))+A[5]+1200080426&4294967295,S=C+(v<<12&4294967295|v>>>20),v=I+(_^S&(C^_))+A[6]+2821735955&4294967295,I=S+(v<<17&4294967295|v>>>15),v=_+(C^I&(S^C))+A[7]+4249261313&4294967295,_=I+(v<<22&4294967295|v>>>10),v=C+(S^_&(I^S))+A[8]+1770035416&4294967295,C=_+(v<<7&4294967295|v>>>25),v=S+(I^C&(_^I))+A[9]+2336552879&4294967295,S=C+(v<<12&4294967295|v>>>20),v=I+(_^S&(C^_))+A[10]+4294925233&4294967295,I=S+(v<<17&4294967295|v>>>15),v=_+(C^I&(S^C))+A[11]+2304563134&4294967295,_=I+(v<<22&4294967295|v>>>10),v=C+(S^_&(I^S))+A[12]+1804603682&4294967295,C=_+(v<<7&4294967295|v>>>25),v=S+(I^C&(_^I))+A[13]+4254626195&4294967295,S=C+(v<<12&4294967295|v>>>20),v=I+(_^S&(C^_))+A[14]+2792965006&4294967295,I=S+(v<<17&4294967295|v>>>15),v=_+(C^I&(S^C))+A[15]+1236535329&4294967295,_=I+(v<<22&4294967295|v>>>10),v=C+(I^S&(_^I))+A[1]+4129170786&4294967295,C=_+(v<<5&4294967295|v>>>27),v=S+(_^I&(C^_))+A[6]+3225465664&4294967295,S=C+(v<<9&4294967295|v>>>23),v=I+(C^_&(S^C))+A[11]+643717713&4294967295,I=S+(v<<14&4294967295|v>>>18),v=_+(S^C&(I^S))+A[0]+3921069994&4294967295,_=I+(v<<20&4294967295|v>>>12),v=C+(I^S&(_^I))+A[5]+3593408605&4294967295,C=_+(v<<5&4294967295|v>>>27),v=S+(_^I&(C^_))+A[10]+38016083&4294967295,S=C+(v<<9&4294967295|v>>>23),v=I+(C^_&(S^C))+A[15]+3634488961&4294967295,I=S+(v<<14&4294967295|v>>>18),v=_+(S^C&(I^S))+A[4]+3889429448&4294967295,_=I+(v<<20&4294967295|v>>>12),v=C+(I^S&(_^I))+A[9]+568446438&4294967295,C=_+(v<<5&4294967295|v>>>27),v=S+(_^I&(C^_))+A[14]+3275163606&4294967295,S=C+(v<<9&4294967295|v>>>23),v=I+(C^_&(S^C))+A[3]+4107603335&4294967295,I=S+(v<<14&4294967295|v>>>18),v=_+(S^C&(I^S))+A[8]+1163531501&4294967295,_=I+(v<<20&4294967295|v>>>12),v=C+(I^S&(_^I))+A[13]+2850285829&4294967295,C=_+(v<<5&4294967295|v>>>27),v=S+(_^I&(C^_))+A[2]+4243563512&4294967295,S=C+(v<<9&4294967295|v>>>23),v=I+(C^_&(S^C))+A[7]+1735328473&4294967295,I=S+(v<<14&4294967295|v>>>18),v=_+(S^C&(I^S))+A[12]+2368359562&4294967295,_=I+(v<<20&4294967295|v>>>12),v=C+(_^I^S)+A[5]+4294588738&4294967295,C=_+(v<<4&4294967295|v>>>28),v=S+(C^_^I)+A[8]+2272392833&4294967295,S=C+(v<<11&4294967295|v>>>21),v=I+(S^C^_)+A[11]+1839030562&4294967295,I=S+(v<<16&4294967295|v>>>16),v=_+(I^S^C)+A[14]+4259657740&4294967295,_=I+(v<<23&4294967295|v>>>9),v=C+(_^I^S)+A[1]+2763975236&4294967295,C=_+(v<<4&4294967295|v>>>28),v=S+(C^_^I)+A[4]+1272893353&4294967295,S=C+(v<<11&4294967295|v>>>21),v=I+(S^C^_)+A[7]+4139469664&4294967295,I=S+(v<<16&4294967295|v>>>16),v=_+(I^S^C)+A[10]+3200236656&4294967295,_=I+(v<<23&4294967295|v>>>9),v=C+(_^I^S)+A[13]+681279174&4294967295,C=_+(v<<4&4294967295|v>>>28),v=S+(C^_^I)+A[0]+3936430074&4294967295,S=C+(v<<11&4294967295|v>>>21),v=I+(S^C^_)+A[3]+3572445317&4294967295,I=S+(v<<16&4294967295|v>>>16),v=_+(I^S^C)+A[6]+76029189&4294967295,_=I+(v<<23&4294967295|v>>>9),v=C+(_^I^S)+A[9]+3654602809&4294967295,C=_+(v<<4&4294967295|v>>>28),v=S+(C^_^I)+A[12]+3873151461&4294967295,S=C+(v<<11&4294967295|v>>>21),v=I+(S^C^_)+A[15]+530742520&4294967295,I=S+(v<<16&4294967295|v>>>16),v=_+(I^S^C)+A[2]+3299628645&4294967295,_=I+(v<<23&4294967295|v>>>9),v=C+(I^(_|~S))+A[0]+4096336452&4294967295,C=_+(v<<6&4294967295|v>>>26),v=S+(_^(C|~I))+A[7]+1126891415&4294967295,S=C+(v<<10&4294967295|v>>>22),v=I+(C^(S|~_))+A[14]+2878612391&4294967295,I=S+(v<<15&4294967295|v>>>17),v=_+(S^(I|~C))+A[5]+4237533241&4294967295,_=I+(v<<21&4294967295|v>>>11),v=C+(I^(_|~S))+A[12]+1700485571&4294967295,C=_+(v<<6&4294967295|v>>>26),v=S+(_^(C|~I))+A[3]+2399980690&4294967295,S=C+(v<<10&4294967295|v>>>22),v=I+(C^(S|~_))+A[10]+4293915773&4294967295,I=S+(v<<15&4294967295|v>>>17),v=_+(S^(I|~C))+A[1]+2240044497&4294967295,_=I+(v<<21&4294967295|v>>>11),v=C+(I^(_|~S))+A[8]+1873313359&4294967295,C=_+(v<<6&4294967295|v>>>26),v=S+(_^(C|~I))+A[15]+4264355552&4294967295,S=C+(v<<10&4294967295|v>>>22),v=I+(C^(S|~_))+A[6]+2734768916&4294967295,I=S+(v<<15&4294967295|v>>>17),v=_+(S^(I|~C))+A[13]+1309151649&4294967295,_=I+(v<<21&4294967295|v>>>11),v=C+(I^(_|~S))+A[4]+4149444226&4294967295,C=_+(v<<6&4294967295|v>>>26),v=S+(_^(C|~I))+A[11]+3174756917&4294967295,S=C+(v<<10&4294967295|v>>>22),v=I+(C^(S|~_))+A[2]+718787259&4294967295,I=S+(v<<15&4294967295|v>>>17),v=_+(S^(I|~C))+A[9]+3951481745&4294967295,w.g[0]=w.g[0]+C&4294967295,w.g[1]=w.g[1]+(I+(v<<21&4294967295|v>>>11))&4294967295,w.g[2]=w.g[2]+I&4294967295,w.g[3]=w.g[3]+S&4294967295}s.prototype.v=function(w,C){C===void 0&&(C=w.length);const _=C-this.blockSize,A=this.C;let I=this.h,S=0;for(;S<C;){if(I==0)for(;S<=_;)r(this,w,S),S+=this.blockSize;if(typeof w=="string"){for(;S<C;)if(A[I++]=w.charCodeAt(S++),I==this.blockSize){r(this,A),I=0;break}}else for(;S<C;)if(A[I++]=w[S++],I==this.blockSize){r(this,A),I=0;break}}this.h=I,this.o+=C},s.prototype.A=function(){var w=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);w[0]=128;for(var C=1;C<w.length-8;++C)w[C]=0;C=this.o*8;for(var _=w.length-8;_<w.length;++_)w[_]=C&255,C/=256;for(this.v(w),w=Array(16),C=0,_=0;_<4;++_)for(let A=0;A<32;A+=8)w[C++]=this.g[_]>>>A&255;return w};function i(w,C){var _=a;return Object.prototype.hasOwnProperty.call(_,w)?_[w]:_[w]=C(w)}function o(w,C){this.h=C;const _=[];let A=!0;for(let I=w.length-1;I>=0;I--){const S=w[I]|0;A&&S==C||(_[I]=S,A=!1)}this.g=_}var a={};function c(w){return-128<=w&&w<128?i(w,function(C){return new o([C|0],C<0?-1:0)}):new o([w|0],w<0?-1:0)}function u(w){if(isNaN(w)||!isFinite(w))return f;if(w<0)return M(u(-w));const C=[];let _=1;for(let A=0;w>=_;A++)C[A]=w/_|0,_*=4294967296;return new o(C,0)}function h(w,C){if(w.length==0)throw Error("number format error: empty string");if(C=C||10,C<2||36<C)throw Error("radix out of range: "+C);if(w.charAt(0)=="-")return M(h(w.substring(1),C));if(w.indexOf("-")>=0)throw Error('number format error: interior "-" character');const _=u(Math.pow(C,8));let A=f;for(let S=0;S<w.length;S+=8){var I=Math.min(8,w.length-S);const v=parseInt(w.substring(S,S+I),C);I<8?(I=u(Math.pow(C,I)),A=A.j(I).add(u(v))):(A=A.j(_),A=A.add(u(v)))}return A}var f=c(0),p=c(1),g=c(16777216);n=o.prototype,n.m=function(){if(R(this))return-M(this).m();let w=0,C=1;for(let _=0;_<this.g.length;_++){const A=this.i(_);w+=(A>=0?A:4294967296+A)*C,C*=4294967296}return w},n.toString=function(w){if(w=w||10,w<2||36<w)throw Error("radix out of range: "+w);if(D(this))return"0";if(R(this))return"-"+M(this).toString(w);const C=u(Math.pow(w,6));var _=this;let A="";for(;;){const I=ae(_,C).g;_=O(_,I.j(C));let S=((_.g.length>0?_.g[0]:_.h)>>>0).toString(w);if(_=I,D(_))return S+A;for(;S.length<6;)S="0"+S;A=S+A}},n.i=function(w){return w<0?0:w<this.g.length?this.g[w]:this.h};function D(w){if(w.h!=0)return!1;for(let C=0;C<w.g.length;C++)if(w.g[C]!=0)return!1;return!0}function R(w){return w.h==-1}n.l=function(w){return w=O(this,w),R(w)?-1:D(w)?0:1};function M(w){const C=w.g.length,_=[];for(let A=0;A<C;A++)_[A]=~w.g[A];return new o(_,~w.h).add(p)}n.abs=function(){return R(this)?M(this):this},n.add=function(w){const C=Math.max(this.g.length,w.g.length),_=[];let A=0;for(let I=0;I<=C;I++){let S=A+(this.i(I)&65535)+(w.i(I)&65535),v=(S>>>16)+(this.i(I)>>>16)+(w.i(I)>>>16);A=v>>>16,S&=65535,v&=65535,_[I]=v<<16|S}return new o(_,_[_.length-1]&-2147483648?-1:0)};function O(w,C){return w.add(M(C))}n.j=function(w){if(D(this)||D(w))return f;if(R(this))return R(w)?M(this).j(M(w)):M(M(this).j(w));if(R(w))return M(this.j(M(w)));if(this.l(g)<0&&w.l(g)<0)return u(this.m()*w.m());const C=this.g.length+w.g.length,_=[];for(var A=0;A<2*C;A++)_[A]=0;for(A=0;A<this.g.length;A++)for(let I=0;I<w.g.length;I++){const S=this.i(A)>>>16,v=this.i(A)&65535,Oe=w.i(I)>>>16,it=w.i(I)&65535;_[2*A+2*I]+=v*it,H(_,2*A+2*I),_[2*A+2*I+1]+=S*it,H(_,2*A+2*I+1),_[2*A+2*I+1]+=v*Oe,H(_,2*A+2*I+1),_[2*A+2*I+2]+=S*Oe,H(_,2*A+2*I+2)}for(w=0;w<C;w++)_[w]=_[2*w+1]<<16|_[2*w];for(w=C;w<2*C;w++)_[w]=0;return new o(_,0)};function H(w,C){for(;(w[C]&65535)!=w[C];)w[C+1]+=w[C]>>>16,w[C]&=65535,C++}function Z(w,C){this.g=w,this.h=C}function ae(w,C){if(D(C))throw Error("division by zero");if(D(w))return new Z(f,f);if(R(w))return C=ae(M(w),C),new Z(M(C.g),M(C.h));if(R(C))return C=ae(w,M(C)),new Z(M(C.g),C.h);if(w.g.length>30){if(R(w)||R(C))throw Error("slowDivide_ only works with positive integers.");for(var _=p,A=C;A.l(w)<=0;)_=oe(_),A=oe(A);var I=se(_,1),S=se(A,1);for(A=se(A,2),_=se(_,2);!D(A);){var v=S.add(A);v.l(w)<=0&&(I=I.add(_),S=v),A=se(A,1),_=se(_,1)}return C=O(w,I.j(C)),new Z(I,C)}for(I=f;w.l(C)>=0;){for(_=Math.max(1,Math.floor(w.m()/C.m())),A=Math.ceil(Math.log(_)/Math.LN2),A=A<=48?1:Math.pow(2,A-48),S=u(_),v=S.j(C);R(v)||v.l(w)>0;)_-=A,S=u(_),v=S.j(C);D(S)&&(S=p),I=I.add(S),w=O(w,v)}return new Z(I,w)}n.B=function(w){return ae(this,w).h},n.and=function(w){const C=Math.max(this.g.length,w.g.length),_=[];for(let A=0;A<C;A++)_[A]=this.i(A)&w.i(A);return new o(_,this.h&w.h)},n.or=function(w){const C=Math.max(this.g.length,w.g.length),_=[];for(let A=0;A<C;A++)_[A]=this.i(A)|w.i(A);return new o(_,this.h|w.h)},n.xor=function(w){const C=Math.max(this.g.length,w.g.length),_=[];for(let A=0;A<C;A++)_[A]=this.i(A)^w.i(A);return new o(_,this.h^w.h)};function oe(w){const C=w.g.length+1,_=[];for(let A=0;A<C;A++)_[A]=w.i(A)<<1|w.i(A-1)>>>31;return new o(_,w.h)}function se(w,C){const _=C>>5;C%=32;const A=w.g.length-_,I=[];for(let S=0;S<A;S++)I[S]=C>0?w.i(S+_)>>>C|w.i(S+_+1)<<32-C:w.i(S+_);return new o(I,w.h)}s.prototype.digest=s.prototype.A,s.prototype.reset=s.prototype.u,s.prototype.update=s.prototype.v,Od=s,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=u,o.fromString=h,bn=o}).apply(typeof BB<"u"?BB:typeof self<"u"?self:typeof window<"u"?window:{});var Vi=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Nd,Tr,kd,so,cl,Ld,xd,Fd;(function(){var n,e=Object.defineProperty;function t(l){l=[typeof globalThis=="object"&&globalThis,l,typeof window=="object"&&window,typeof self=="object"&&self,typeof Vi=="object"&&Vi];for(var B=0;B<l.length;++B){var d=l[B];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var s=t(this);function r(l,B){if(B)e:{var d=s;l=l.split(".");for(var m=0;m<l.length-1;m++){var P=l[m];if(!(P in d))break e;d=d[P]}l=l[l.length-1],m=d[l],B=B(m),B!=m&&B!=null&&e(d,l,{configurable:!0,writable:!0,value:B})}}r("Symbol.dispose",function(l){return l||Symbol("Symbol.dispose")}),r("Array.prototype.values",function(l){return l||function(){return this[Symbol.iterator]()}}),r("Object.entries",function(l){return l||function(B){var d=[],m;for(m in B)Object.prototype.hasOwnProperty.call(B,m)&&d.push([m,B[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function a(l){var B=typeof l;return B=="object"&&l!=null||B=="function"}function c(l,B,d){return l.call.apply(l.bind,arguments)}function u(l,B,d){return u=c,u.apply(null,arguments)}function h(l,B){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),l.apply(this,m)}}function f(l,B){function d(){}d.prototype=B.prototype,l.Z=B.prototype,l.prototype=new d,l.prototype.constructor=l,l.Ob=function(m,P,N){for(var J=Array(arguments.length-2),le=2;le<arguments.length;le++)J[le-2]=arguments[le];return B.prototype[P].apply(m,J)}}var p=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?l=>l&&AsyncContext.Snapshot.wrap(l):l=>l;function g(l){const B=l.length;if(B>0){const d=Array(B);for(let m=0;m<B;m++)d[m]=l[m];return d}return[]}function D(l,B){for(let m=1;m<arguments.length;m++){const P=arguments[m];var d=typeof P;if(d=d!="object"?d:P?Array.isArray(P)?"array":d:"null",d=="array"||d=="object"&&typeof P.length=="number"){d=l.length||0;const N=P.length||0;l.length=d+N;for(let J=0;J<N;J++)l[d+J]=P[J]}else l.push(P)}}class R{constructor(B,d){this.i=B,this.j=d,this.h=0,this.g=null}get(){let B;return this.h>0?(this.h--,B=this.g,this.g=B.next,B.next=null):B=this.i(),B}}function M(l){o.setTimeout(()=>{throw l},0)}function O(){var l=w;let B=null;return l.g&&(B=l.g,l.g=l.g.next,l.g||(l.h=null),B.next=null),B}class H{constructor(){this.h=this.g=null}add(B,d){const m=Z.get();m.set(B,d),this.h?this.h.next=m:this.g=m,this.h=m}}var Z=new R(()=>new ae,l=>l.reset());class ae{constructor(){this.next=this.g=this.h=null}set(B,d){this.h=B,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let oe,se=!1,w=new H,C=()=>{const l=Promise.resolve(void 0);oe=()=>{l.then(_)}};function _(){for(var l;l=O();){try{l.h.call(l.g)}catch(d){M(d)}var B=Z;B.j(l),B.h<100&&(B.h++,l.next=B.g,B.g=l)}se=!1}function A(){this.u=this.u,this.C=this.C}A.prototype.u=!1,A.prototype.dispose=function(){this.u||(this.u=!0,this.N())},A.prototype[Symbol.dispose]=function(){this.dispose()},A.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(l,B){this.type=l,this.g=this.target=B,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var l=!1,B=Object.defineProperty({},"passive",{get:function(){l=!0}});try{const d=()=>{};o.addEventListener("test",d,B),o.removeEventListener("test",d,B)}catch{}return l})();function v(l){return/^[\s\xa0]*$/.test(l)}function Oe(l,B){I.call(this,l?l.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,l&&this.init(l,B)}f(Oe,I),Oe.prototype.init=function(l,B){const d=this.type=l.type,m=l.changedTouches&&l.changedTouches.length?l.changedTouches[0]:null;this.target=l.target||l.srcElement,this.g=B,B=l.relatedTarget,B||(d=="mouseover"?B=l.fromElement:d=="mouseout"&&(B=l.toElement)),this.relatedTarget=B,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=l.clientX!==void 0?l.clientX:l.pageX,this.clientY=l.clientY!==void 0?l.clientY:l.pageY,this.screenX=l.screenX||0,this.screenY=l.screenY||0),this.button=l.button,this.key=l.key||"",this.ctrlKey=l.ctrlKey,this.altKey=l.altKey,this.shiftKey=l.shiftKey,this.metaKey=l.metaKey,this.pointerId=l.pointerId||0,this.pointerType=l.pointerType,this.state=l.state,this.i=l,l.defaultPrevented&&Oe.Z.h.call(this)},Oe.prototype.h=function(){Oe.Z.h.call(this);const l=this.i;l.preventDefault?l.preventDefault():l.returnValue=!1};var it="closure_listenable_"+(Math.random()*1e6|0),Jn=0;function Di(l,B,d,m,P){this.listener=l,this.proxy=null,this.src=B,this.type=d,this.capture=!!m,this.ha=P,this.key=++Jn,this.da=this.fa=!1}function jn(l){l.da=!0,l.listener=null,l.proxy=null,l.src=null,l.ha=null}function Kn(l,B,d){for(const m in l)B.call(d,l[m],m,l)}function wi(l,B){for(const d in l)B.call(void 0,l[d],d,l)}function rr(l){const B={};for(const d in l)B[d]=l[d];return B}const ir="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Lc(l,B){let d,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(d in m)l[d]=m[d];for(let N=0;N<ir.length;N++)d=ir[N],Object.prototype.hasOwnProperty.call(m,d)&&(l[d]=m[d])}}function Ii(l){this.src=l,this.g={},this.h=0}Ii.prototype.add=function(l,B,d,m,P){const N=l.toString();l=this.g[N],l||(l=this.g[N]=[],this.h++);const J=ua(l,B,m,P);return J>-1?(B=l[J],d||(B.fa=!1)):(B=new Di(B,this.src,N,!!m,P),B.fa=d,l.push(B)),B};function ca(l,B){const d=B.type;if(d in l.g){var m=l.g[d],P=Array.prototype.indexOf.call(m,B,void 0),N;(N=P>=0)&&Array.prototype.splice.call(m,P,1),N&&(jn(B),l.g[d].length==0&&(delete l.g[d],l.h--))}}function ua(l,B,d,m){for(let P=0;P<l.length;++P){const N=l[P];if(!N.da&&N.listener==B&&N.capture==!!d&&N.ha==m)return P}return-1}var Ba="closure_lm_"+(Math.random()*1e6|0),ha={};function xc(l,B,d,m,P){if(Array.isArray(B)){for(let N=0;N<B.length;N++)xc(l,B[N],d,m,P);return null}return d=Vc(d),l&&l[it]?l.J(B,d,a(m)?!!m.capture:!1,P):Mp(l,B,d,!1,m,P)}function Mp(l,B,d,m,P,N){if(!B)throw Error("Invalid event type");const J=a(P)?!!P.capture:!!P;let le=fa(l);if(le||(l[Ba]=le=new Ii(l)),d=le.add(B,d,m,J,N),d.proxy)return d;if(m=Vp(),d.proxy=m,m.src=l,m.listener=d,l.addEventListener)S||(P=J),P===void 0&&(P=!1),l.addEventListener(B.toString(),m,P);else if(l.attachEvent)l.attachEvent(Mc(B.toString()),m);else if(l.addListener&&l.removeListener)l.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Vp(){function l(d){return B.call(l.src,l.listener,d)}const B=Up;return l}function Fc(l,B,d,m,P){if(Array.isArray(B))for(var N=0;N<B.length;N++)Fc(l,B[N],d,m,P);else m=a(m)?!!m.capture:!!m,d=Vc(d),l&&l[it]?(l=l.i,N=String(B).toString(),N in l.g&&(B=l.g[N],d=ua(B,d,m,P),d>-1&&(jn(B[d]),Array.prototype.splice.call(B,d,1),B.length==0&&(delete l.g[N],l.h--)))):l&&(l=fa(l))&&(B=l.g[B.toString()],l=-1,B&&(l=ua(B,d,m,P)),(d=l>-1?B[l]:null)&&da(d))}function da(l){if(typeof l!="number"&&l&&!l.da){var B=l.src;if(B&&B[it])ca(B.i,l);else{var d=l.type,m=l.proxy;B.removeEventListener?B.removeEventListener(d,m,l.capture):B.detachEvent?B.detachEvent(Mc(d),m):B.addListener&&B.removeListener&&B.removeListener(m),(d=fa(B))?(ca(d,l),d.h==0&&(d.src=null,B[Ba]=null)):jn(l)}}}function Mc(l){return l in ha?ha[l]:ha[l]="on"+l}function Up(l,B){if(l.da)l=!0;else{B=new Oe(B,this);const d=l.listener,m=l.ha||l.src;l.fa&&da(l),l=d.call(m,B)}return l}function fa(l){return l=l[Ba],l instanceof Ii?l:null}var pa="__closure_events_fn_"+(Math.random()*1e9>>>0);function Vc(l){return typeof l=="function"?l:(l[pa]||(l[pa]=function(B){return l.handleEvent(B)}),l[pa])}function We(){A.call(this),this.i=new Ii(this),this.M=this,this.G=null}f(We,A),We.prototype[it]=!0,We.prototype.removeEventListener=function(l,B,d,m){Fc(this,l,B,d,m)};function tt(l,B){var d,m=l.G;if(m)for(d=[];m;m=m.G)d.push(m);if(l=l.M,m=B.type||B,typeof B=="string")B=new I(B,l);else if(B instanceof I)B.target=B.target||l;else{var P=B;B=new I(m,l),Lc(B,P)}P=!0;let N,J;if(d)for(J=d.length-1;J>=0;J--)N=B.g=d[J],P=Ti(N,m,!0,B)&&P;if(N=B.g=l,P=Ti(N,m,!0,B)&&P,P=Ti(N,m,!1,B)&&P,d)for(J=0;J<d.length;J++)N=B.g=d[J],P=Ti(N,m,!1,B)&&P}We.prototype.N=function(){if(We.Z.N.call(this),this.i){var l=this.i;for(const B in l.g){const d=l.g[B];for(let m=0;m<d.length;m++)jn(d[m]);delete l.g[B],l.h--}}this.G=null},We.prototype.J=function(l,B,d,m){return this.i.add(String(l),B,!1,d,m)},We.prototype.K=function(l,B,d,m){return this.i.add(String(l),B,!0,d,m)};function Ti(l,B,d,m){if(B=l.i.g[String(B)],!B)return!0;B=B.concat();let P=!0;for(let N=0;N<B.length;++N){const J=B[N];if(J&&!J.da&&J.capture==d){const le=J.listener,He=J.ha||J.src;J.fa&&ca(l.i,J),P=le.call(He,m)!==!1&&P}}return P&&!m.defaultPrevented}function Hp(l,B){if(typeof l!="function")if(l&&typeof l.handleEvent=="function")l=u(l.handleEvent,l);else throw Error("Invalid listener argument");return Number(B)>2147483647?-1:o.setTimeout(l,B||0)}function Uc(l){l.g=Hp(()=>{l.g=null,l.i&&(l.i=!1,Uc(l))},l.l);const B=l.h;l.h=null,l.m.apply(null,B)}class Gp extends A{constructor(B,d){super(),this.m=B,this.l=d,this.h=null,this.i=!1,this.g=null}j(B){this.h=arguments,this.g?this.i=!0:Uc(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function or(l){A.call(this),this.h=l,this.g={}}f(or,A);var Hc=[];function Gc(l){Kn(l.g,function(B,d){this.g.hasOwnProperty(d)&&da(B)},l),l.g={}}or.prototype.N=function(){or.Z.N.call(this),Gc(this)},or.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ma=o.JSON.stringify,$p=o.JSON.parse,qp=class{stringify(l){return o.JSON.stringify(l,void 0)}parse(l){return o.JSON.parse(l,void 0)}};function $c(){}function qc(){}var ar={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function ga(){I.call(this,"d")}f(ga,I);function Ca(){I.call(this,"c")}f(Ca,I);var zn={},Jc=null;function bi(){return Jc=Jc||new We}zn.Ia="serverreachability";function jc(l){I.call(this,zn.Ia,l)}f(jc,I);function lr(l){const B=bi();tt(B,new jc(B))}zn.STAT_EVENT="statevent";function Kc(l,B){I.call(this,zn.STAT_EVENT,l),this.stat=B}f(Kc,I);function nt(l){const B=bi();tt(B,new Kc(B,l))}zn.Ja="timingevent";function zc(l,B){I.call(this,zn.Ja,l),this.size=B}f(zc,I);function cr(l,B){if(typeof l!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){l()},B)}function ur(){this.g=!0}ur.prototype.ua=function(){this.g=!1};function Jp(l,B,d,m,P,N){l.info(function(){if(l.g)if(N){var J="",le=N.split("&");for(let Ce=0;Ce<le.length;Ce++){var He=le[Ce].split("=");if(He.length>1){const $e=He[0];He=He[1];const Lt=$e.split("_");J=Lt.length>=2&&Lt[1]=="type"?J+($e+"="+He+"&"):J+($e+"=redacted&")}}}else J=null;else J=N;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+B+`
`+d+`
`+J})}function jp(l,B,d,m,P,N,J){l.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+B+`
`+d+`
`+N+" "+J})}function Ds(l,B,d,m){l.info(function(){return"XMLHTTP TEXT ("+B+"): "+zp(l,d)+(m?" "+m:"")})}function Kp(l,B){l.info(function(){return"TIMEOUT: "+B})}ur.prototype.info=function(){};function zp(l,B){if(!l.g)return B;if(!B)return null;try{const N=JSON.parse(B);if(N){for(l=0;l<N.length;l++)if(Array.isArray(N[l])){var d=N[l];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var P=m[0];if(P!="noop"&&P!="stop"&&P!="close")for(let J=1;J<m.length;J++)m[J]=""}}}}return ma(N)}catch{return B}}var Ai={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Wc={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Qc;function ya(){}f(ya,$c),ya.prototype.g=function(){return new XMLHttpRequest},Qc=new ya;function Br(l){return encodeURIComponent(String(l))}function Wp(l){var B=1;l=l.split(":");const d=[];for(;B>0&&l.length;)d.push(l.shift()),B--;return l.length&&d.push(l.join(":")),d}function an(l,B,d,m){this.j=l,this.i=B,this.l=d,this.S=m||1,this.V=new or(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Yc}function Yc(){this.i=null,this.g="",this.h=!1}var Xc={},Ea={};function _a(l,B,d){l.M=1,l.A=Pi(kt(B)),l.u=d,l.R=!0,Zc(l,null)}function Zc(l,B){l.F=Date.now(),Si(l),l.B=kt(l.A);var d=l.B,m=l.S;Array.isArray(m)||(m=[String(m)]),hu(d.i,"t",m),l.C=0,d=l.j.L,l.h=new Yc,l.g=Pu(l.j,d?B:null,!l.u),l.P>0&&(l.O=new Gp(u(l.Y,l,l.g),l.P)),B=l.V,d=l.g,m=l.ba;var P="readystatechange";Array.isArray(P)||(P&&(Hc[0]=P.toString()),P=Hc);for(let N=0;N<P.length;N++){const J=xc(d,P[N],m||B.handleEvent,!1,B.h||B);if(!J)break;B.g[J.key]=J}B=l.J?rr(l.J):{},l.u?(l.v||(l.v="POST"),B["Content-Type"]="application/x-www-form-urlencoded",l.g.ea(l.B,l.v,l.u,B)):(l.v="GET",l.g.ea(l.B,l.v,null,B)),lr(),Jp(l.i,l.v,l.B,l.l,l.S,l.u)}an.prototype.ba=function(l){l=l.target;const B=this.O;B&&un(l)==3?B.j():this.Y(l)},an.prototype.Y=function(l){try{if(l==this.g)e:{const le=un(this.g),He=this.g.ya(),Ce=this.g.ca();if(!(le<3)&&(le!=3||this.g&&(this.h.h||this.g.la()||yu(this.g)))){this.K||le!=4||He==7||(He==8||Ce<=0?lr(3):lr(2)),va(this);var B=this.g.ca();this.X=B;var d=Qp(this);if(this.o=B==200,jp(this.i,this.v,this.B,this.l,this.S,le,B),this.o){if(this.U&&!this.L){t:{if(this.g){var m,P=this.g;if((m=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!v(m)){var N=m;break t}}N=null}if(l=N)Ds(this.i,this.l,l,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,Da(this,l);else{this.o=!1,this.m=3,nt(12),Wn(this),hr(this);break e}}if(this.R){l=!0;let $e;for(;!this.K&&this.C<d.length;)if($e=Yp(this,d),$e==Ea){le==4&&(this.m=4,nt(14),l=!1),Ds(this.i,this.l,null,"[Incomplete Response]");break}else if($e==Xc){this.m=4,nt(15),Ds(this.i,this.l,d,"[Invalid Chunk]"),l=!1;break}else Ds(this.i,this.l,$e,null),Da(this,$e);if(eu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),le!=4||d.length!=0||this.h.h||(this.m=1,nt(16),l=!1),this.o=this.o&&l,!l)Ds(this.i,this.l,d,"[Invalid Chunked Response]"),Wn(this),hr(this);else if(d.length>0&&!this.W){this.W=!0;var J=this.j;J.g==this&&J.aa&&!J.P&&(J.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Ra(J),J.P=!0,nt(11))}}else Ds(this.i,this.l,d,null),Da(this,d);le==4&&Wn(this),this.o&&!this.K&&(le==4?Tu(this.j,this):(this.o=!1,Si(this)))}else Bm(this.g),B==400&&d.indexOf("Unknown SID")>0?(this.m=3,nt(12)):(this.m=0,nt(13)),Wn(this),hr(this)}}}catch{}finally{}};function Qp(l){if(!eu(l))return l.g.la();const B=yu(l.g);if(B==="")return"";let d="";const m=B.length,P=un(l.g)==4;if(!l.h.i){if(typeof TextDecoder>"u")return Wn(l),hr(l),"";l.h.i=new o.TextDecoder}for(let N=0;N<m;N++)l.h.h=!0,d+=l.h.i.decode(B[N],{stream:!(P&&N==m-1)});return B.length=0,l.h.g+=d,l.C=0,l.h.g}function eu(l){return l.g?l.v=="GET"&&l.M!=2&&l.j.Aa:!1}function Yp(l,B){var d=l.C,m=B.indexOf(`
`,d);return m==-1?Ea:(d=Number(B.substring(d,m)),isNaN(d)?Xc:(m+=1,m+d>B.length?Ea:(B=B.slice(m,m+d),l.C=m+d,B)))}an.prototype.cancel=function(){this.K=!0,Wn(this)};function Si(l){l.T=Date.now()+l.H,tu(l,l.H)}function tu(l,B){if(l.D!=null)throw Error("WatchDog timer not null");l.D=cr(u(l.aa,l),B)}function va(l){l.D&&(o.clearTimeout(l.D),l.D=null)}an.prototype.aa=function(){this.D=null;const l=Date.now();l-this.T>=0?(Kp(this.i,this.B),this.M!=2&&(lr(),nt(17)),Wn(this),this.m=2,hr(this)):tu(this,this.T-l)};function hr(l){l.j.I==0||l.K||Tu(l.j,l)}function Wn(l){va(l);var B=l.O;B&&typeof B.dispose=="function"&&B.dispose(),l.O=null,Gc(l.V),l.g&&(B=l.g,l.g=null,B.abort(),B.dispose())}function Da(l,B){try{var d=l.j;if(d.I!=0&&(d.g==l||wa(d.h,l))){if(!l.L&&wa(d.h,l)&&d.I==3){try{var m=d.Ba.g.parse(B)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<l.F)Li(d),Ni(d);else break e;Pa(d),nt(18)}}else d.xa=P[1],0<d.xa-d.K&&P[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=cr(u(d.Va,d),6e3));ru(d.h)<=1&&d.ta&&(d.ta=void 0)}else Yn(d,11)}else if((l.L||d.g==l)&&Li(d),!v(B))for(P=d.Ba.g.parse(B),B=0;B<P.length;B++){let Ce=P[B];const $e=Ce[0];if(!($e<=d.K))if(d.K=$e,Ce=Ce[1],d.I==2)if(Ce[0]=="c"){d.M=Ce[1],d.ba=Ce[2];const Lt=Ce[3];Lt!=null&&(d.ka=Lt,d.j.info("VER="+d.ka));const Xn=Ce[4];Xn!=null&&(d.za=Xn,d.j.info("SVER="+d.za));const Bn=Ce[5];Bn!=null&&typeof Bn=="number"&&Bn>0&&(m=1.5*Bn,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const hn=l.g;if(hn){const Fi=hn.g?hn.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Fi){var N=m.h;N.g||Fi.indexOf("spdy")==-1&&Fi.indexOf("quic")==-1&&Fi.indexOf("h2")==-1||(N.j=N.l,N.g=new Set,N.h&&(Ia(N,N.h),N.h=null))}if(m.G){const Oa=hn.g?hn.g.getResponseHeader("X-HTTP-Session-Id"):null;Oa&&(m.wa=Oa,De(m.J,m.G,Oa))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-l.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var J=l;if(m.na=Su(m,m.L?m.ba:null,m.W),J.L){iu(m.h,J);var le=J,He=m.O;He&&(le.H=He),le.D&&(va(le),Si(le)),m.g=J}else wu(m);d.i.length>0&&ki(d)}else Ce[0]!="stop"&&Ce[0]!="close"||Yn(d,7);else d.I==3&&(Ce[0]=="stop"||Ce[0]=="close"?Ce[0]=="stop"?Yn(d,7):Sa(d):Ce[0]!="noop"&&d.l&&d.l.qa(Ce),d.A=0)}}lr(4)}catch{}}var Xp=class{constructor(l,B){this.g=l,this.map=B}};function nu(l){this.l=l||10,o.PerformanceNavigationTiming?(l=o.performance.getEntriesByType("navigation"),l=l.length>0&&(l[0].nextHopProtocol=="hq"||l[0].nextHopProtocol=="h2")):l=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=l?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function su(l){return l.h?!0:l.g?l.g.size>=l.j:!1}function ru(l){return l.h?1:l.g?l.g.size:0}function wa(l,B){return l.h?l.h==B:l.g?l.g.has(B):!1}function Ia(l,B){l.g?l.g.add(B):l.h=B}function iu(l,B){l.h&&l.h==B?l.h=null:l.g&&l.g.has(B)&&l.g.delete(B)}nu.prototype.cancel=function(){if(this.i=ou(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const l of this.g.values())l.cancel();this.g.clear()}};function ou(l){if(l.h!=null)return l.i.concat(l.h.G);if(l.g!=null&&l.g.size!==0){let B=l.i;for(const d of l.g.values())B=B.concat(d.G);return B}return g(l.i)}var au=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Zp(l,B){if(l){l=l.split("&");for(let d=0;d<l.length;d++){const m=l[d].indexOf("=");let P,N=null;m>=0?(P=l[d].substring(0,m),N=l[d].substring(m+1)):P=l[d],B(P,N?decodeURIComponent(N.replace(/\+/g," ")):"")}}}function ln(l){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let B;l instanceof ln?(this.l=l.l,dr(this,l.j),this.o=l.o,this.g=l.g,fr(this,l.u),this.h=l.h,Ta(this,du(l.i)),this.m=l.m):l&&(B=String(l).match(au))?(this.l=!1,dr(this,B[1]||"",!0),this.o=pr(B[2]||""),this.g=pr(B[3]||"",!0),fr(this,B[4]),this.h=pr(B[5]||"",!0),Ta(this,B[6]||"",!0),this.m=pr(B[7]||"")):(this.l=!1,this.i=new gr(null,this.l))}ln.prototype.toString=function(){const l=[];var B=this.j;B&&l.push(mr(B,lu,!0),":");var d=this.g;return(d||B=="file")&&(l.push("//"),(B=this.o)&&l.push(mr(B,lu,!0),"@"),l.push(Br(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&l.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&l.push("/"),l.push(mr(d,d.charAt(0)=="/"?nm:tm,!0))),(d=this.i.toString())&&l.push("?",d),(d=this.m)&&l.push("#",mr(d,rm)),l.join("")},ln.prototype.resolve=function(l){const B=kt(this);let d=!!l.j;d?dr(B,l.j):d=!!l.o,d?B.o=l.o:d=!!l.g,d?B.g=l.g:d=l.u!=null;var m=l.h;if(d)fr(B,l.u);else if(d=!!l.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var P=B.h.lastIndexOf("/");P!=-1&&(m=B.h.slice(0,P+1)+m)}if(P=m,P==".."||P==".")m="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){m=P.lastIndexOf("/",0)==0,P=P.split("/");const N=[];for(let J=0;J<P.length;){const le=P[J++];le=="."?m&&J==P.length&&N.push(""):le==".."?((N.length>1||N.length==1&&N[0]!="")&&N.pop(),m&&J==P.length&&N.push("")):(N.push(le),m=!0)}m=N.join("/")}else m=P}return d?B.h=m:d=l.i.toString()!=="",d?Ta(B,du(l.i)):d=!!l.m,d&&(B.m=l.m),B};function kt(l){return new ln(l)}function dr(l,B,d){l.j=d?pr(B,!0):B,l.j&&(l.j=l.j.replace(/:$/,""))}function fr(l,B){if(B){if(B=Number(B),isNaN(B)||B<0)throw Error("Bad port number "+B);l.u=B}else l.u=null}function Ta(l,B,d){B instanceof gr?(l.i=B,im(l.i,l.l)):(d||(B=mr(B,sm)),l.i=new gr(B,l.l))}function De(l,B,d){l.i.set(B,d)}function Pi(l){return De(l,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),l}function pr(l,B){return l?B?decodeURI(l.replace(/%25/g,"%2525")):decodeURIComponent(l):""}function mr(l,B,d){return typeof l=="string"?(l=encodeURI(l).replace(B,em),d&&(l=l.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),l):null}function em(l){return l=l.charCodeAt(0),"%"+(l>>4&15).toString(16)+(l&15).toString(16)}var lu=/[#\/\?@]/g,tm=/[#\?:]/g,nm=/[#\?]/g,sm=/[#\?@]/g,rm=/#/g;function gr(l,B){this.h=this.g=null,this.i=l||null,this.j=!!B}function Qn(l){l.g||(l.g=new Map,l.h=0,l.i&&Zp(l.i,function(B,d){l.add(decodeURIComponent(B.replace(/\+/g," ")),d)}))}n=gr.prototype,n.add=function(l,B){Qn(this),this.i=null,l=ws(this,l);let d=this.g.get(l);return d||this.g.set(l,d=[]),d.push(B),this.h+=1,this};function cu(l,B){Qn(l),B=ws(l,B),l.g.has(B)&&(l.i=null,l.h-=l.g.get(B).length,l.g.delete(B))}function uu(l,B){return Qn(l),B=ws(l,B),l.g.has(B)}n.forEach=function(l,B){Qn(this),this.g.forEach(function(d,m){d.forEach(function(P){l.call(B,P,m,this)},this)},this)};function Bu(l,B){Qn(l);let d=[];if(typeof B=="string")uu(l,B)&&(d=d.concat(l.g.get(ws(l,B))));else for(l=Array.from(l.g.values()),B=0;B<l.length;B++)d=d.concat(l[B]);return d}n.set=function(l,B){return Qn(this),this.i=null,l=ws(this,l),uu(this,l)&&(this.h-=this.g.get(l).length),this.g.set(l,[B]),this.h+=1,this},n.get=function(l,B){return l?(l=Bu(this,l),l.length>0?String(l[0]):B):B};function hu(l,B,d){cu(l,B),d.length>0&&(l.i=null,l.g.set(ws(l,B),g(d)),l.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const l=[],B=Array.from(this.g.keys());for(let m=0;m<B.length;m++){var d=B[m];const P=Br(d);d=Bu(this,d);for(let N=0;N<d.length;N++){let J=P;d[N]!==""&&(J+="="+Br(d[N])),l.push(J)}}return this.i=l.join("&")};function du(l){const B=new gr;return B.i=l.i,l.g&&(B.g=new Map(l.g),B.h=l.h),B}function ws(l,B){return B=String(B),l.j&&(B=B.toLowerCase()),B}function im(l,B){B&&!l.j&&(Qn(l),l.i=null,l.g.forEach(function(d,m){const P=m.toLowerCase();m!=P&&(cu(this,m),hu(this,P,d))},l)),l.j=B}function om(l,B){const d=new ur;if(o.Image){const m=new Image;m.onload=h(cn,d,"TestLoadImage: loaded",!0,B,m),m.onerror=h(cn,d,"TestLoadImage: error",!1,B,m),m.onabort=h(cn,d,"TestLoadImage: abort",!1,B,m),m.ontimeout=h(cn,d,"TestLoadImage: timeout",!1,B,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=l}else B(!1)}function am(l,B){const d=new ur,m=new AbortController,P=setTimeout(()=>{m.abort(),cn(d,"TestPingServer: timeout",!1,B)},1e4);fetch(l,{signal:m.signal}).then(N=>{clearTimeout(P),N.ok?cn(d,"TestPingServer: ok",!0,B):cn(d,"TestPingServer: server error",!1,B)}).catch(()=>{clearTimeout(P),cn(d,"TestPingServer: error",!1,B)})}function cn(l,B,d,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(d)}catch{}}function lm(){this.g=new qp}function ba(l){this.i=l.Sb||null,this.h=l.ab||!1}f(ba,$c),ba.prototype.g=function(){return new Ri(this.i,this.h)};function Ri(l,B){We.call(this),this.H=l,this.o=B,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}f(Ri,We),n=Ri.prototype,n.open=function(l,B){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=l,this.D=B,this.readyState=1,yr(this)},n.send=function(l){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const B={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};l&&(B.body=l),(this.H||o).fetch(new Request(this.D,B)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,Cr(this)),this.readyState=0},n.Pa=function(l){if(this.g&&(this.l=l,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=l.headers,this.readyState=2,yr(this)),this.g&&(this.readyState=3,yr(this),this.g)))if(this.responseType==="arraybuffer")l.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in l){if(this.j=l.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;fu(this)}else l.text().then(this.Oa.bind(this),this.ga.bind(this))};function fu(l){l.j.read().then(l.Ma.bind(l)).catch(l.ga.bind(l))}n.Ma=function(l){if(this.g){if(this.o&&l.value)this.response.push(l.value);else if(!this.o){var B=l.value?l.value:new Uint8Array(0);(B=this.B.decode(B,{stream:!l.done}))&&(this.response=this.responseText+=B)}l.done?Cr(this):yr(this),this.readyState==3&&fu(this)}},n.Oa=function(l){this.g&&(this.response=this.responseText=l,Cr(this))},n.Na=function(l){this.g&&(this.response=l,Cr(this))},n.ga=function(){this.g&&Cr(this)};function Cr(l){l.readyState=4,l.l=null,l.j=null,l.B=null,yr(l)}n.setRequestHeader=function(l,B){this.A.append(l,B)},n.getResponseHeader=function(l){return this.h&&this.h.get(l.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const l=[],B=this.h.entries();for(var d=B.next();!d.done;)d=d.value,l.push(d[0]+": "+d[1]),d=B.next();return l.join(`\r
`)};function yr(l){l.onreadystatechange&&l.onreadystatechange.call(l)}Object.defineProperty(Ri.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(l){this.m=l?"include":"same-origin"}});function pu(l){let B="";return Kn(l,function(d,m){B+=m,B+=":",B+=d,B+=`\r
`}),B}function Aa(l,B,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=pu(d),typeof l=="string"?d!=null&&Br(d):De(l,B,d))}function Pe(l){We.call(this),this.headers=new Map,this.L=l||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}f(Pe,We);var cm=/^https?$/i,um=["POST","PUT"];n=Pe.prototype,n.Fa=function(l){this.H=l},n.ea=function(l,B,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+l);B=B?B.toUpperCase():"GET",this.D=l,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Qc.g(),this.g.onreadystatechange=p(u(this.Ca,this));try{this.B=!0,this.g.open(B,String(l),!0),this.B=!1}catch(N){mu(this,N);return}if(l=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)d.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const N of m.keys())d.set(N,m.get(N));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(N=>N.toLowerCase()=="content-type"),P=o.FormData&&l instanceof o.FormData,!(Array.prototype.indexOf.call(um,B,void 0)>=0)||m||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[N,J]of d)this.g.setRequestHeader(N,J);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(l),this.v=!1}catch(N){mu(this,N)}};function mu(l,B){l.h=!1,l.g&&(l.j=!0,l.g.abort(),l.j=!1),l.l=B,l.o=5,gu(l),Oi(l)}function gu(l){l.A||(l.A=!0,tt(l,"complete"),tt(l,"error"))}n.abort=function(l){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=l||7,tt(this,"complete"),tt(this,"abort"),Oi(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Oi(this,!0)),Pe.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Cu(this):this.Xa())},n.Xa=function(){Cu(this)};function Cu(l){if(l.h&&typeof i<"u"){if(l.v&&un(l)==4)setTimeout(l.Ca.bind(l),0);else if(tt(l,"readystatechange"),un(l)==4){l.h=!1;try{const N=l.ca();e:switch(N){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var B=!0;break e;default:B=!1}var d;if(!(d=B)){var m;if(m=N===0){let J=String(l.D).match(au)[1]||null;!J&&o.self&&o.self.location&&(J=o.self.location.protocol.slice(0,-1)),m=!cm.test(J?J.toLowerCase():"")}d=m}if(d)tt(l,"complete"),tt(l,"success");else{l.o=6;try{var P=un(l)>2?l.g.statusText:""}catch{P=""}l.l=P+" ["+l.ca()+"]",gu(l)}}finally{Oi(l)}}}}function Oi(l,B){if(l.g){l.m&&(clearTimeout(l.m),l.m=null);const d=l.g;l.g=null,B||tt(l,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function un(l){return l.g?l.g.readyState:0}n.ca=function(){try{return un(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(l){if(this.g){var B=this.g.responseText;return l&&B.indexOf(l)==0&&(B=B.substring(l.length)),$p(B)}};function yu(l){try{if(!l.g)return null;if("response"in l.g)return l.g.response;switch(l.F){case"":case"text":return l.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in l.g)return l.g.mozResponseArrayBuffer}return null}catch{return null}}function Bm(l){const B={};l=(l.g&&un(l)>=2&&l.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<l.length;m++){if(v(l[m]))continue;var d=Wp(l[m]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const N=B[P]||[];B[P]=N,N.push(d)}wi(B,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function Er(l,B,d){return d&&d.internalChannelParams&&d.internalChannelParams[l]||B}function Eu(l){this.za=0,this.i=[],this.j=new ur,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=Er("failFast",!1,l),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=Er("baseRetryDelayMs",5e3,l),this.Za=Er("retryDelaySeedMs",1e4,l),this.Ta=Er("forwardChannelMaxRetries",2,l),this.va=Er("forwardChannelRequestTimeoutMs",2e4,l),this.ma=l&&l.xmlHttpFactory||void 0,this.Ua=l&&l.Rb||void 0,this.Aa=l&&l.useFetchStreams||!1,this.O=void 0,this.L=l&&l.supportsCrossDomainXhr||!1,this.M="",this.h=new nu(l&&l.concurrentRequestLimit),this.Ba=new lm,this.S=l&&l.fastHandshake||!1,this.R=l&&l.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=l&&l.Pb||!1,l&&l.ua&&this.j.ua(),l&&l.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&l&&l.detectBufferingProxy||!1,this.ia=void 0,l&&l.longPollingTimeout&&l.longPollingTimeout>0&&(this.ia=l.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=Eu.prototype,n.ka=8,n.I=1,n.connect=function(l,B,d,m){nt(0),this.W=l,this.H=B||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Su(this,null,this.W),ki(this)};function Sa(l){if(_u(l),l.I==3){var B=l.V++,d=kt(l.J);if(De(d,"SID",l.M),De(d,"RID",B),De(d,"TYPE","terminate"),_r(l,d),B=new an(l,l.j,B),B.M=2,B.A=Pi(kt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(B.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=B.A,d=!0),d||(B.g=Pu(B.j,null),B.g.ea(B.A)),B.F=Date.now(),Si(B)}Au(l)}function Ni(l){l.g&&(Ra(l),l.g.cancel(),l.g=null)}function _u(l){Ni(l),l.v&&(o.clearTimeout(l.v),l.v=null),Li(l),l.h.cancel(),l.m&&(typeof l.m=="number"&&o.clearTimeout(l.m),l.m=null)}function ki(l){if(!su(l.h)&&!l.m){l.m=!0;var B=l.Ea;oe||C(),se||(oe(),se=!0),w.add(B,l),l.D=0}}function hm(l,B){return ru(l.h)>=l.h.j-(l.m?1:0)?!1:l.m?(l.i=B.G.concat(l.i),!0):l.I==1||l.I==2||l.D>=(l.Sa?0:l.Ta)?!1:(l.m=cr(u(l.Ea,l,B),bu(l,l.D)),l.D++,!0)}n.Ea=function(l){if(this.m)if(this.m=null,this.I==1){if(!l){this.V=Math.floor(Math.random()*1e5),l=this.V++;const P=new an(this,this.j,l);let N=this.o;if(this.U&&(N?(N=rr(N),Lc(N,this.U)):N=this.U),this.u!==null||this.R||(P.J=N,N=null),this.S)e:{for(var B=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(B+=m,B>4096){B=d;break e}if(B===4096||d===this.i.length-1){B=d+1;break e}}B=1e3}else B=1e3;B=Du(this,P,B),d=kt(this.J),De(d,"RID",l),De(d,"CVER",22),this.G&&De(d,"X-HTTP-Session-Id",this.G),_r(this,d),N&&(this.R?B="headers="+Br(pu(N))+"&"+B:this.u&&Aa(d,this.u,N)),Ia(this.h,P),this.Ra&&De(d,"TYPE","init"),this.S?(De(d,"$req",B),De(d,"SID","null"),P.U=!0,_a(P,d,null)):_a(P,d,B),this.I=2}}else this.I==3&&(l?vu(this,l):this.i.length==0||su(this.h)||vu(this))};function vu(l,B){var d;B?d=B.l:d=l.V++;const m=kt(l.J);De(m,"SID",l.M),De(m,"RID",d),De(m,"AID",l.K),_r(l,m),l.u&&l.o&&Aa(m,l.u,l.o),d=new an(l,l.j,d,l.D+1),l.u===null&&(d.J=l.o),B&&(l.i=B.G.concat(l.i)),B=Du(l,d,1e3),d.H=Math.round(l.va*.5)+Math.round(l.va*.5*Math.random()),Ia(l.h,d),_a(d,m,B)}function _r(l,B){l.H&&Kn(l.H,function(d,m){De(B,m,d)}),l.l&&Kn({},function(d,m){De(B,m,d)})}function Du(l,B,d){d=Math.min(l.i.length,d);const m=l.l?u(l.l.Ka,l.l,l):null;e:{var P=l.i;let le=-1;for(;;){const He=["count="+d];le==-1?d>0?(le=P[0].g,He.push("ofs="+le)):le=0:He.push("ofs="+le);let Ce=!0;for(let $e=0;$e<d;$e++){var N=P[$e].g;const Lt=P[$e].map;if(N-=le,N<0)le=Math.max(0,P[$e].g-100),Ce=!1;else try{N="req"+N+"_"||"";try{var J=Lt instanceof Map?Lt:Object.entries(Lt);for(const[Xn,Bn]of J){let hn=Bn;a(Bn)&&(hn=ma(Bn)),He.push(N+Xn+"="+encodeURIComponent(hn))}}catch(Xn){throw He.push(N+"type="+encodeURIComponent("_badmap")),Xn}}catch{m&&m(Lt)}}if(Ce){J=He.join("&");break e}}J=void 0}return l=l.i.splice(0,d),B.G=l,J}function wu(l){if(!l.g&&!l.v){l.Y=1;var B=l.Da;oe||C(),se||(oe(),se=!0),w.add(B,l),l.A=0}}function Pa(l){return l.g||l.v||l.A>=3?!1:(l.Y++,l.v=cr(u(l.Da,l),bu(l,l.A)),l.A++,!0)}n.Da=function(){if(this.v=null,Iu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var l=4*this.T;this.j.info("BP detection timer enabled: "+l),this.B=cr(u(this.Wa,this),l)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,nt(10),Ni(this),Iu(this))};function Ra(l){l.B!=null&&(o.clearTimeout(l.B),l.B=null)}function Iu(l){l.g=new an(l,l.j,"rpc",l.Y),l.u===null&&(l.g.J=l.o),l.g.P=0;var B=kt(l.na);De(B,"RID","rpc"),De(B,"SID",l.M),De(B,"AID",l.K),De(B,"CI",l.F?"0":"1"),!l.F&&l.ia&&De(B,"TO",l.ia),De(B,"TYPE","xmlhttp"),_r(l,B),l.u&&l.o&&Aa(B,l.u,l.o),l.O&&(l.g.H=l.O);var d=l.g;l=l.ba,d.M=1,d.A=Pi(kt(B)),d.u=null,d.R=!0,Zc(d,l)}n.Va=function(){this.C!=null&&(this.C=null,Ni(this),Pa(this),nt(19))};function Li(l){l.C!=null&&(o.clearTimeout(l.C),l.C=null)}function Tu(l,B){var d=null;if(l.g==B){Li(l),Ra(l),l.g=null;var m=2}else if(wa(l.h,B))d=B.G,iu(l.h,B),m=1;else return;if(l.I!=0){if(B.o)if(m==1){d=B.u?B.u.length:0,B=Date.now()-B.F;var P=l.D;m=bi(),tt(m,new zc(m,d)),ki(l)}else wu(l);else if(P=B.m,P==3||P==0&&B.X>0||!(m==1&&hm(l,B)||m==2&&Pa(l)))switch(d&&d.length>0&&(B=l.h,B.i=B.i.concat(d)),P){case 1:Yn(l,5);break;case 4:Yn(l,10);break;case 3:Yn(l,6);break;default:Yn(l,2)}}}function bu(l,B){let d=l.Qa+Math.floor(Math.random()*l.Za);return l.isActive()||(d*=2),d*B}function Yn(l,B){if(l.j.info("Error code "+B),B==2){var d=u(l.bb,l),m=l.Ua;const P=!m;m=new ln(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||dr(m,"https"),Pi(m),P?om(m.toString(),d):am(m.toString(),d)}else nt(2);l.I=0,l.l&&l.l.pa(B),Au(l),_u(l)}n.bb=function(l){l?(this.j.info("Successfully pinged google.com"),nt(2)):(this.j.info("Failed to ping google.com"),nt(1))};function Au(l){if(l.I=0,l.ja=[],l.l){const B=ou(l.h);(B.length!=0||l.i.length!=0)&&(D(l.ja,B),D(l.ja,l.i),l.h.i.length=0,g(l.i),l.i.length=0),l.l.oa()}}function Su(l,B,d){var m=d instanceof ln?kt(d):new ln(d);if(m.g!="")B&&(m.g=B+"."+m.g),fr(m,m.u);else{var P=o.location;m=P.protocol,B=B?B+"."+P.hostname:P.hostname,P=+P.port;const N=new ln(null);m&&dr(N,m),B&&(N.g=B),P&&fr(N,P),d&&(N.h=d),m=N}return d=l.G,B=l.wa,d&&B&&De(m,d,B),De(m,"VER",l.ka),_r(l,m),m}function Pu(l,B,d){if(B&&!l.L)throw Error("Can't create secondary domain capable XhrIo object.");return B=l.Aa&&!l.ma?new Pe(new ba({ab:d})):new Pe(l.ma),B.Fa(l.L),B}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function Ru(){}n=Ru.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function xi(){}xi.prototype.g=function(l,B){return new pt(l,B)};function pt(l,B){We.call(this),this.g=new Eu(B),this.l=l,this.h=B&&B.messageUrlParams||null,l=B&&B.messageHeaders||null,B&&B.clientProtocolHeaderRequired&&(l?l["X-Client-Protocol"]="webchannel":l={"X-Client-Protocol":"webchannel"}),this.g.o=l,l=B&&B.initMessageHeaders||null,B&&B.messageContentType&&(l?l["X-WebChannel-Content-Type"]=B.messageContentType:l={"X-WebChannel-Content-Type":B.messageContentType}),B&&B.sa&&(l?l["X-WebChannel-Client-Profile"]=B.sa:l={"X-WebChannel-Client-Profile":B.sa}),this.g.U=l,(l=B&&B.Qb)&&!v(l)&&(this.g.u=l),this.A=B&&B.supportsCrossDomainXhr||!1,this.v=B&&B.sendRawJson||!1,(B=B&&B.httpSessionIdParam)&&!v(B)&&(this.g.G=B,l=this.h,l!==null&&B in l&&(l=this.h,B in l&&delete l[B])),this.j=new Is(this)}f(pt,We),pt.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},pt.prototype.close=function(){Sa(this.g)},pt.prototype.o=function(l){var B=this.g;if(typeof l=="string"){var d={};d.__data__=l,l=d}else this.v&&(d={},d.__data__=ma(l),l=d);B.i.push(new Xp(B.Ya++,l)),B.I==3&&ki(B)},pt.prototype.N=function(){this.g.l=null,delete this.j,Sa(this.g),delete this.g,pt.Z.N.call(this)};function Ou(l){ga.call(this),l.__headers__&&(this.headers=l.__headers__,this.statusCode=l.__status__,delete l.__headers__,delete l.__status__);var B=l.__sm__;if(B){e:{for(const d in B){l=d;break e}l=void 0}(this.i=l)&&(l=this.i,B=B!==null&&l in B?B[l]:void 0),this.data=B}else this.data=l}f(Ou,ga);function Nu(){Ca.call(this),this.status=1}f(Nu,Ca);function Is(l){this.g=l}f(Is,Ru),Is.prototype.ra=function(){tt(this.g,"a")},Is.prototype.qa=function(l){tt(this.g,new Ou(l))},Is.prototype.pa=function(l){tt(this.g,new Nu)},Is.prototype.oa=function(){tt(this.g,"b")},xi.prototype.createWebChannel=xi.prototype.g,pt.prototype.send=pt.prototype.o,pt.prototype.open=pt.prototype.m,pt.prototype.close=pt.prototype.close,Fd=function(){return new xi},xd=function(){return bi()},Ld=zn,cl={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},Ai.NO_ERROR=0,Ai.TIMEOUT=8,Ai.HTTP_ERROR=6,so=Ai,Wc.COMPLETE="complete",kd=Wc,qc.EventType=ar,ar.OPEN="a",ar.CLOSE="b",ar.ERROR="c",ar.MESSAGE="d",We.prototype.listen=We.prototype.J,Tr=qc,Pe.prototype.listenOnce=Pe.prototype.K,Pe.prototype.getLastError=Pe.prototype.Ha,Pe.prototype.getLastErrorCode=Pe.prototype.ya,Pe.prototype.getStatus=Pe.prototype.ca,Pe.prototype.getResponseJson=Pe.prototype.La,Pe.prototype.getResponseText=Pe.prototype.la,Pe.prototype.send=Pe.prototype.ea,Pe.prototype.setWithCredentials=Pe.prototype.Fa,Nd=Pe}).apply(typeof Vi<"u"?Vi:typeof self<"u"?self:typeof window<"u"?window:{});/*!
* re2js
* RE2JS is the JavaScript port of RE2, a regular expression engine that provides linear time matching
*
* @version v2.8.6
* @author Oleksii Vasyliev
* @homepage https://github.com/le0pard/re2js#readme
* @repository github:le0pard/re2js
* @license MIT
*/var ye,U=(ye=class{},G(ye,"FOLD_CASE",1),G(ye,"LITERAL",2),G(ye,"CLASS_NL",4),G(ye,"DOT_NL",8),G(ye,"ONE_LINE",16),G(ye,"NON_GREEDY",32),G(ye,"PERL_X",64),G(ye,"UNICODE_GROUPS",128),G(ye,"WAS_DOLLAR",256),G(ye,"LOOKBEHIND",512),G(ye,"MATCH_NL",ye.CLASS_NL|ye.DOT_NL),G(ye,"PERL",ye.CLASS_NL|ye.ONE_LINE|ye.PERL_X|ye.UNICODE_GROUPS),G(ye,"POSIX",0),G(ye,"UNANCHORED",0),G(ye,"ANCHOR_START",1),G(ye,"ANCHOR_BOTH",2),ye);const Ts={CASE_INSENSITIVE:1,DOTALL:2,MULTILINE:4,DISABLE_UNICODE_GROUPS:8,LONGEST_MATCH:16,LOOKBEHINDS:512},Gr=128,ul=new Int32Array(Gr),Bl=new Int32Array(Gr),Ui=65535;for(let n=0;n<Gr;n++)n>=97&&n<=122?ul[n]=n-32:ul[n]=n,n>=65&&n<=90?Bl[n]=n+32:Bl[n]=n;var tl,k=(tl=class{static toUpperCase(n){if(n<Gr)return ul[n];const e=String.fromCodePoint(n).toUpperCase(),t=e.codePointAt(0)>Ui?2:1;if(e.length>t)return n;const s=String.fromCodePoint(e.codePointAt(0)).toLowerCase(),r=s.codePointAt(0)>Ui?2:1;return s.length>r||s.codePointAt(0)!==n?n:e.codePointAt(0)}static toLowerCase(n){if(n<Gr)return Bl[n];const e=String.fromCodePoint(n).toLowerCase(),t=e.codePointAt(0)>Ui?2:1;if(e.length>t)return n;const s=String.fromCodePoint(e.codePointAt(0)).toUpperCase(),r=s.codePointAt(0)>Ui?2:1;return s.length>r||s.codePointAt(0)!==n?n:e.codePointAt(0)}},G(tl,"CODES",new Map([["\x07",7],["\b",8],["	",9],[`
`,10],["\v",11],["\f",12],["\r",13],[" ",32],['"',34],["$",36],["&",38],["'",39],["(",40],[")",41],["*",42],["+",43],["-",45],[".",46],["0",48],["1",49],["2",50],["3",51],["4",52],["5",53],["6",54],["7",55],["8",56],["9",57],[":",58],["<",60],[">",62],["?",63],["A",65],["B",66],["C",67],["F",70],["P",80],["Q",81],["U",85],["Z",90],["[",91],["\\",92],["]",93],["^",94],["_",95],["`",96],["a",97],["b",98],["f",102],["i",105],["m",109],["n",110],["r",114],["s",115],["t",116],["v",118],["x",120],["z",122],["{",123],["|",124],["}",125]])),tl),y=class{constructor(n,e=!1){this.data=n,this.isStride1=e,this.SIZE=e?2:3}getLo(n){return this.data[n*this.SIZE]}getHi(n){return this.data[n*this.SIZE+1]}getStride(n){return this.isStride1?1:this.data[n*this.SIZE+2]}get length(){return this.data.length/this.SIZE}};const Md=new Uint8Array(256);for(let n=0,e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-";n<64;n++)Md[e.charCodeAt(n)]=n;const Vd=n=>{const e=[];let t=0,s=0;for(let r=0;r<n.length;r++){let i=Md[n.charCodeAt(r)];t|=(i&31)<<s,(i&32)===0?(e.push(t),t=0,s=0):s+=5}return e},E=(n,e)=>{const t=Vd(n),s=e?t.length/2:t.length/3,r=new Uint32Array(s*3);let i=0,o=0;for(let a=0;a<s;a++)i+=t[o++],r[a*3]=i,i+=t[o++],r[a*3+1]=i,r[a*3+2]=e?1:t[o++];return r},lE=n=>{const e=Vd(n),t=new Map;let s=0;for(let r=0;r<e.length;r+=2){s+=e[r];const i=e[r+1],o=i>>>1^-(i&1);t.set(s,s+o)}return t};var Hi=class{constructor(n){this.initializer=n,this.cache=new Map}has(n){return n in this.initializer}get(n){if(this.cache.has(n))return this.cache.get(n);const e=this.initializer[n],t=e?e():null;return this.cache.set(n,t),t}},mn,at=(mn=class{static get CASE_ORBIT(){return this._CASE_ORBIT||(this._CASE_ORBIT=lE("rCgCIgCY+rQI4QiCuuBLgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCCgCBgCBgCBgCBgCBgCBgCB+7OB-BB-BB-BB-BB-BBskQB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BC-BB-BB-BB-BB-BB-BB-BByHBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBxHBCBBBCBBBCBBB3SBmMBkNBCBBBCBBB8MBCBBB6MB6MBCBBC+EB0MB2MBCBBB6MB+MBiGBmNBiNBCBBBmKBikzCBmNBqNBkIBsNBCBBBCBBBCBBB0NBCBBB0NDCBBB0NBCBBByNByNBCBBBCBBB2NBCBBDCBBCwDFCBCBDBCBCBDBCBCBDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB9EBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCCBCBDBCBBBhGBvDBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBjICCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBH2iVBCBBBlKBwiVB+jVB+jVBCBBBlMBqEBuEBCBBBCBBBCBBBCBBBCBBB+hVB4hVB8hVBjNB7MC5MB5MCzMC1MB+0yCE5MB20yCC9MBu2yCBwyyCBo0yCChNBlNBo0yCBu-UBi0yCDlNC6-UBpNDrNIu+UDzNCm0yCBzNE0yyCBzNBpEBxNBxNBtEG1NLqxyCBkxyCnFoFrBCBBBCBBDCBBEkIBkIBkICoHHsCCqCBqCBqCCgEC+DB+DBmkOBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCC+BBgCBgCBgCBgCBgCBgCBgCBgCBrCBpCBpCBpCBmjOB-BB8BB-BB-BBgEB-BB-BByBBqgOBsDB-BBtwBB-BB-BB-BBsBBgDBCB-BB-BB-BBeB-BB-BB61OB-BB-BB-DB9DB9DBQB7DBmCE9CBrDBPBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBrFB-EBOBnHB3FB-FCCBBBNBCBBCjIBjIBjIBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgFBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB8kMB-BB6kMB-BB-BB-BB-BB-BB-BB-BB-BB-BBokMB-BB-BBkkMBkkMB-BB-BB-BB-BB-BB-BB-BB4jMB-BB-BB-BB-BB-BB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EB-EBCBBBCBoiMBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBJCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBeBCBBBCBBBCBBBCBBBCBBBCBBBCBBBdBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBCgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDL-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-C64CgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOBgmOCgmOGgmODg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FBg8FDg8FBg8FBg8FhVg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBg9rCBQBQBQBQBQBQDPBPBPBPBPBPjkC7mMB5mMBnmMBjmMBCBlmMB3lMBpiMBk8kCBCBBG-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FB-7FD-7FB-7FB-7F6FoglCEsuHRwjlCyDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCB0DBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBG1DD97OCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQDPBPBPBPBPBPEQCQCQCQCPCPCPCPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPB0EB0EBsFBsFBsFBsFBoGBoGBgIBgIBgHBgHB8HB8HDQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQBQBQBQBQBQBQBPBPBPBPBPBPBPBPBQBQCSFPBPBzEBzEBRCxnOFSFrFBrFBrFBrFBREQBQClkOFPBPBnGBnGFQBQCljOCODPBPB-GB-GBNHSF-HB-HB7HB7HBRqJ53OE9tQBrmQH4Bc3BSgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBgBBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfBfECBByZ0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BB0BBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzBBzB34BgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDBgDB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CB-CBCBBBt-UBruHBt+UB1iVBviVBCBBBCBBBCBBB3hVB5-UB9hVB7hVCCBBCCBBI9jVB9jVBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBICBBBCBBECBBN-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOB-lOC-lOG-lOzoeCBBBCBBBCBBBCBBBCBBBCBl8kCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBTCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBnECBBBCBBBCBBBCBBBCBBBCBBBCBBDCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBKCBBBCBBBnglCBCBBBCBBBCBBBCBBBCBBECBBBvyyCDCBBBCBBBgDCCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBn0yCB90yCB10yCBh0yCBn0yCCjxyCBzyyCBpxyCBg6BBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBB-CBl0yCBvjlCBCBBBCBBBt2yCBCBBBCBBBCBBBCBBBCBBBCBBBCBBBCBBBhkzCZCBB9a-5Bd-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCB-8rCm6TCBB7gBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCH-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BmlBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvChDwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCBwCFvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvCBvC1DuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCBuCCuCBuCBuCBuCBuCBuCBuCCuCBuCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCBtCCtCBtCBtCBtCBtCBtCBtCCtCBtCk2BgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEBgEO-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-DB-D+CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCL-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-B74CgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhrVgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCBgCB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BB-BhB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BB2BD1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BB1BtxekCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBkCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjCBjC")),this._CASE_ORBIT}static get Print(){return this._Print||(this._Print=new y(E("hB9CBjBLBCpWBDFBFGBCCCBSBCsMBClBBDxBBDCBC2BBJaBFFBSVBC-FBCvBBD6BBDkDBP6BBDwBBDOBCbBDCCBJBGfBIqCBCgFBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYBDCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPBLCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGBCCBCHBDBBDVBCGBCBBCEBDIBDBBDCBICBFBBCEBDRBLBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBGMBCCBCWBCPBDIBCCBCDBIBBCCBCBBDDBDJBIVBCCBCWBCJBCEBDIBCCBCDBIBBGCBCDBDJBCCBNMBCCBCyBBCCBCFBFPBDZBCCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBN5BBFcBmBBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDBhBnCBCjBBFmBBCjBBCOBCMBmBlGBCGGD4LBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBH1CBDFBD-TBCbBE4CBIVBKXBKTBNMBCCBCBBN9CBDJBHJBHNBCKBH4CBIqBBGlCBLeBCLBFLBFEEBoBBDEBMrBBFZBHKBE9BBDgCBCcBDKBHJBHNBDtBBDLBVsCBClFBJ7BBEOBE9BBGqBBDKBJqBBG1QBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBSXBJuBBSBBDaBCMBEhBBPgBBQrEBF5UBXKBWz4BBD9LBGsBBCGGD3BBIBBPXBKGBCGBCGBCGBCGBCGBCGBCGBC9DBjBZBC4CBN1GBbPBC+BBC1CBDmDBGqBBC9CBC1CBKvBBCszcBE2BBK7KBV3FBJ8GBV7BBEJBH3BBJlCBJLBHzDBMdBEtCBCKBFgBBC2BBKNBDJBDmDBZbBLFBDFBDFBKGBCGBC7BBF9DBDJBHj9KBNWBFwBBloItLBDpDBnBGBNEBGZBCEBCCCBCCBCCBoUBhBpBBHyBBCSBCDBFEBCmEBF9FBEFBDFBDFBDCBEGBCGBOBBDLBCZBCSBCBBCOBDNBjB6DBGCBFsBBE3CBCMBEwBwBBsBBjEcBEwBBQbBFjBBKdBGqBBGdBCkBBFNBrB9EBDJBHjBBFjBBFnBBJzBBMLBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBCnCBJIBxBSBCBBGgBBEaBGaBnB3BBFTBDxBBCBBGHBCCBCcBDCBFJBIIBI-BBhBmBBFLBK1BBEcBDaBGZBIDBNGBxCoCB4ByBBOyBBItBBJJBHlBBEcBJBBxGeBCpBBCCBDBBRFBJIBiBtBBJpBBXZBnBbBVWBKtCBFjBBK9BBCEBOYBIJBH0BBCRBJmBBK-CBCTBMRBCuBB-BGBCCCBCBCOBCKBH6BBGJBHDBCHBDBBDVBCGBCBBCEBCJBDBBDCBDHHGGBDGBEEBMJBCDDClBBCJBCDDCDBCJBCBBJBBe7CBCEBfnCBJJBnF1BBDlBBjBkCBMJBHMBU5BBHJBHTBdaBDOBFWB6F7BBlDyCBNHBDDDBGBCBBCdBCBBDLBKJBnCHBDtBBDKBcnCBJyCBOoCBIJB3CHB5ChBBPJBHIBCsBBCNBLcBEfBDVBCNBqCGBCBBCrBBECCBCCBHBJJBHFBCBBCkBBCBBCFBIJBHrBBFJB3HYBIQBCoBBEcB2CQQBwBBO6cBnDuDBCEBMjGBtyCiDBOvhBBRVBL68DBGmSB61G5BBn2B4RBIeBCJBFwCBCJBHdBDFBLlCBLJBCGBCUBGSBxN5BBnG6CBGYBDYBtBqCBF4BBIQBhCEBMGBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBDDBh7D8HBEzNBHWBQQBQtBBDWBKzDB9B1HBLmBBDpCBJvDBWlCB7DTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBD9VBQEBCOBxiBeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBENBDJBFBBhKeBS5BBGxOxOBoBB3GqBBFhGhGBdBCVBJBBhHGBCDBCBBCOBCkGBDPBqBrCBFJBFBByYjCBtC8BBjGDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBBvIrBBFjDBNOBDOBCOBCkBBLtFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBmgB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIBnkzVvHB",!1))),this._Print}static get Upper(){return this.CATEGORIES.get("Lu")}},G(mn,"_CASE_ORBIT",null),G(mn,"_Print",null),G(mn,"CATEGORIES",new Hi({C:()=>new y(E("AfBgDgBBOrWrWBHHBCBICCVuMuMnBBBzBBBE4B4BBGBcDBHQBXhGhGxBBB8BBBmDNB8BBByBBBQddBCCMEBhBGBsCiFiFJBBDBBXIICCBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBPMMBEB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKMMBDBbEByBPBDBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCB-FCBHBBHBBHBBECBIIIBLBDBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIB-BGGBLBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMBxhBPBXJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBF-6DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBrCHBxDUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIlkzVBxHvw-FB",!1)),Cc:()=>new y(E("AfgDgB",!0)),Cf:()=>new y(E("tFzqBzqBBEBXhGhGyBhMhMBxCxCs5D9-B9-BBDBbEByBEBCJBw03B6H6HBBBimEQQj7IPBhjiBDBwmFHBn0rYffB+CB",!1)),Cn:()=>new y(E("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBDBvzIBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-BB---BBB---BBB",!1)),Co:()=>new y(E("gg4B-nGh4hc9--BD9--B",!0)),Cs:()=>new y(E("gg2B--B",!0)),L:()=>new y(E("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICCiEEBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoCaBFDBuBqBBkBBBCiDBCQQBIIBLLBBBDRRCdBe4CBMZZBfBKBBFGGBUBFKKEYYBXBIKBGXBCGBRpBB7B1BBETTIJBQPBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNGB7BBBCCCBDBCXBCCCBIBCBBKDDBDBCWWBCBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNSSBkBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBkBFFkC4CBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBzC+C+CBtBBSHB3BdBOBBLrBBbjBBqBCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBhC1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBF1B1BB8zC8zCBjHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBxC2O2OBrBrBBDBGBBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBReBDlCByBIBDmDBDxCBVQBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBdRRBDBCJBLEBCoBBYCBCHBVWBEEEBwBBCEEBDDBDBDCCZCBDKBICBNFBDFBDFBKGBCGBCqBBCNBHyDBej9KBNWBFwBBloItLBDpDBnBGBNEBGCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBxB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOjBBnBbBKWB7HpBBHBBRFB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB1D-BBgBHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBqBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBGjCjCBLBhCBBCPPBNNB0mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBn7F0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFBmI9BBzEsBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCCBCBBCGBDEBKBBhHGBCDBCBBCOBCkGB8BjCBI1lB1lBBCBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),LC:()=>new y(E("hCZBHZB7BLLBVBCeBCiGBCDBFvGBDZBhGDBDBBECBCHHCCBCCCBSBCyCBCqEBJlFBClBBKoBB44ClBBCGGDqBBDCBhV1CBDFBjkCKBGqBBDCBhCrBBgCMBChBBmD1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGBmIFFDJBCEEBDBHGCBCBCFBFDDBCBGEBF1B1BB8zC8zCB6DBDmDBHDBEBBNlBBCGGzoetBBTbBnEtCBCWBEDBCsCBZBBE2Z2ZBpBBGIBIvCBh6TGBNEBqgBZBHZBmlBvCBhDjBBFjBB1DKBCOBCGBCBBCKBCOBCGBCBBk2ByBBOyBB+CVBLVB74C-BBhrV-BBhBYBDYBtpZ0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BJBCTBHFB2uCjCB",!1)),Ll:()=>new y(E("hDZB7BqBqBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDZBiGCCEEEBBBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBDCB5XFBjkCIBC2D2DBqBBgCMBChBBnD0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBBzIEEBEEcKFDBBJDBF2B2Bs1CvBBCEEBGCFCCBCCBEBGiDCBIICFFNlBBCGG0oesBCUaCoEMCBBBC+BCBGBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCbEE2ZqBBGIBIvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFB4vChBB",!1)),Lm:()=>new y(E("wVRBFLBPEBICCmEGG-OnHnHlFBBuIBBFgBgBKEEhFoFoF1mBgEgE2R72B72BsDkTkTxOFBvF+BBOjBjBBjBByVOORMBg-CBByHgGgG2OsBsBBDBGiDiDB+C+CBBB34bjnBjnBBEBvIzDzDdBB6DIBxCYYpDDBEBB2OXXqEtDtDWBBoDDBKngVngVuBBBh-BFBCpBBCIB0sBhBhB2K04D04DnrTDB9PCBpBBBnRMBhCBBCPPB9-P9-PBCBCGBCBByhM9BBqGGBud0Q0QsSAB",!1)),Lo:()=>new y(E("qFQQhIFFBCBxGBB7ZaBFDBuBfBCJBkBBBCiDBCZZBLLBBBDRRCdBe4CBMZZBfBWVBrBYBIKBGXBCGBRoBB8B1BBETTIJBROBFHBDBBDVBCGBCEEBCBERROBBCCBPBBLJJBEBFBBDVBCGBCBBCBBCBBgBDBCUUBBBRIBCCBCVBCGBCBBCEBETTQBBYMMBGBDBBDVBCGBCBBCEBEffBCCBBBQSSCFBECBCDBEBBCCCBEEBEEBBBELBX1B1BBGBCCBCWBCPBEbbBBBCBBDBBfFFBGBCCBCWBCJBCEBEffBBBCBBQBBSIBCCBCoBBDRRGCBJCBZFBGRBEXBCIBCDDBFB7BvBBCBBNFB8BBBCCCBDBCXBCCCBIBCBBKDDBDBYDBhBgCgCBGBCjBBcEB0DqBBVRRBEBFDBEEEBIIBBBFMBNyDyDBnKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPByDrTBDQBCZBGqCBHHBIRBOSBPRBPMBCCBQzBBpBkCkCBhBBC0BBIEBDhBBCGGBkCBLeByBdBDEBMrBBFZB3BWBK0BBxFuBBSHB3BdBOBBLrBBbjBBqBCBLdByDDBCFBCBBE7hB7hBBCB4-C3BBZWBKGBCGBCGBCGBCGBCGBCGBCGBoR2B2BF1CBJCCB4CBFGGBpBBC9CBSfBxBPBhQ-tGBhC0wUBC2jBBkCnBBJrIBFPBLBBjCyByBBkCBqFoDoDEGBCCBCDBCWBezBBPxBB-BFBECCBMMBaBLWBacBIuBBuBEBDIBLEBCoBBYCBCHBVPBCFBEEEBwBBCEEBDDBDBDCCZBBEKBIPPBEBDFBDFBKGBCGByEiBBej9KBNWBFwBBloItLBDpDBkCCCBIBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBqDJBCsBBDeBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmMcBEwBBwBfBOTBCHBHlBBLdBDjBBFHBhEtCBjDnBBJzBB9CzBBN2JBKVBLHB5EFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCQQBCBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4FjBBnBDBCxJxJBoBBHBBRCBCBB5BcBLJJBUBrBRBvBUBcWBN0BB6BBBDOOBrBBhBYBbjBBeDDJiBBENNBuBBPDBWCCkBRBCYBUBBgCGBCCCBCBCOBCJBIuBBnBHBDBBDVBCGBCBBCEBETTNEBfJBCDDClBBCaaCtBtBBzBBTDBVCBfvBBVBBC5F5FBtBBqBDBlBvBBV8B8BBpBBOoCoCBZBmBGB6FrBB0GHBDDDBGBCBBCXBQCC-CHBDmBBRCCdLLBmBBIWWMtBBUTTBnCBoGgBBgBIBCkBBSyByBBcBxDGBCBBClBBWaaBEBCBBCfBPYYBnBBCBBlISBQCCBLBChBB9DwCwCB4cBnHjGBtyCgDBQvhBBSFBa68DBGmSB61GdBj3B4RBIeBSuCBSdBTvBB0BUBGSB0NnBB2MqCBGwFwFB0mHBqBfBiDyDBuwIiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBxzI2P2PBrBBiBiKiKBcBTrBBlPaBmHdBDwGwGBdBCCBCBBCGBDEBKiHiHBFBCDBCBBCOBCkGB8pBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQBlqE-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Lt:()=>new y(E("lOGDnB2sH2sHBGBJHBJHBNQQwBAB",!1)),Lu:()=>new y(E("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBG+B+B9zCvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBB",!1)),M:()=>new y(E("gYvDB0IGBoIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCgBB3BCBCRBCGBLBBeCB5BCCBFBDBBDCBKLLBbbDCB5BCCBDBFBBDCBEffBEEMCB5BCCBGBCCBCCBVBBXFBCCB5BCCBFBDBBDCBICBLBBf8B8BBDBECBCDBKpBpBBDB4BCCBFBCCBCDBIBBMBBeCB5BCCBFBCCBCDBIBBMBBQNNBCB4BBBCGBCCBCDBKLLBeeBBBnCFFBEBCCCBGBTBB+BDDBFBNHBjDDDBHBMGBqCBBcECFBByBTBCBBGKBCjBBKlDlDBSBYDBFCBCCBDGBEDBOLBCLLBCBgWCBzdDBdCBeBBfBBhCfBKuBuBBBBC2D2DBjBjB3DLBFLB8GEB6BJBCcBDxBxBBsBBDLBVEBwBQBnBIBNCBfMB5BNBxBTB5ECBCUBFHHDCBnG-BBxWgBB--CCBuEhDhDBeBrRFBqDBB1udDBCJBhBBBxCBBxIEEFYYBDBF0C0CBzBzBBQBbRBOnBnBBGBaMBtBDBwBNBlBkCkCBMBNJJBuBuBBBBzBCCBBBDBBGBBCqBqBBDBGBBtHHBCBBx5TiXiXBOBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB7DCB2BOBqBDDBLLBCBuBKBI+B+BBBBlBNBRBBtBNNBBBxBNBJDBCBB9CLBHDD+ELBWDB4BBBCGBDBBDCBKLLBDDBFBEEBkCIBCDDCDBCEBCPPBzCzCBQBYyCyCBSBsHGBDIBcBBzCQBrDMBmDOBhIOB2HFBCBBDDBCCCBuEuEBFBDGBEddBIBpBGBCDBJKKBJBvBPBnGHBoGHBCHBzCVBCNB7DFBECCBCCBFBCjCjCBDBCBBCEB8KDBKBBCxBxBBFBEEBYmnFmnFHOBpmLRBhuCEB8BGB5gBCCB1BBIDByCMMBslTslTBizEizEBsBBDWB-QEBEFBJHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),Mc:()=>new y(E("joC4B4BDCBJDBCBBzBBB7BCBHBBDBBLsBsB7BCBjC7B7BBBBJCCB2B2BB7B7BCHHBDDBLLnDBBCBBECBCCBLqBqBBBB+BDB+BBB7BCCBDBDBBCBBKBBdPPB7B7BBBBGCBCCBLrBrBBsCsCBBBHHBTBBrKBBgCsFsFBFFHDDBaaBLLBBBDGBWBBDFBDLLBBB5zBffiEIIBGBCBB7KDBDCBFBBCFBhHBB7BCCKCCBJJBEByExBxBGCCBDBCBB+BffFBBD9B9BDCBCEEBxBxBBGBJBBsFWW35EBB0-dBBD5C5CBzBzBBOBvEBBwBxBxBBFFBDDBBBvDBBDBBZuBuBCuDuDDBBGuHuHBCCBCCBCC0gZCCgEuBuBBBBFBB0DZZB8B8BxBCBKBBO+C+CBBBEBBCrFrFBBBgBBB7BBBCDBDBBDCBKLLB1C1CBBBIDDCDBCBBCmDmDBBBJBBErDrDBBBHCCBCBDuHuHBBBHDBDyDyDBBBJBBCuDuDCBBHoDoDCBBFmImIBBBK4H4HBEBCBBFDDCvEvEBBBJDBF1C1CeBB-BqGqGECCoGPPrDIID2G2GBDBFBBC-K-KBNNxBBBJBBCpvQpvQBBBlxD2BBpDBB0rYBBHFB",!1)),Me:()=>new y(E("okBBB1xF-wB-wBBCBCCBsshBCB",!1)),Mn:()=>new y(E("gYvDB0IEBqIsBBCCCBCCBCCpCKBxBUBRmDmDBFBDFBDBBCDBkBffBZB8CKB7BIBKZZBCBCIBCCBCEBsBCB8BIBrBXBCfB4BCCFHBFEEBFBLBBe7B7BFDBJVVBbbDBB6BFFBFFBDDBBBEffBEEMBB6BFFBDBCBBFVVBXXBEBC7B7BDCCBCBJIIBMMBff+BNNzBEE4BCCBBBGCBCDBIBBMBBe7B7BDHHGBBVBBdBB6BBBFDBJVVBeepCIIBBBC7C7CDGBNHBjDDDBHBMGBqCBBcEC4BNBCEBCBBGKBCjBBKnDnDBCBCFBCBBDBBaBBFCBRDBODDBHHQgWgWBBBzdCBeBBfBBfBBhCBBCGBJDDBJBKuBuBBBBC2D2DBjBjB3DCBFBBKHHBBB8GBBD7B7BCGBCCCDHBHJBDxBxBBMBCeBDLBVDBxBCCBDBCGGpBIBNBBhBDBDBBCCB5BCCBEECCB7BHBDBB5ECBCMBCGBFHHEBBnG-BBxWMBFEEBKB--CCBuEhDhDBeBrRDBsDBB1udFFBIBhBBBxCBBxIEEFaaBGG4EBBbRBOnBnBBGBaKBvBCBxBDDBCBDBBoBkCkCBEBDBBDBBNJJwB0B0BCCBDBBGBBCrBrBBJJvHDDFx5Tx5TiXPBRPBuejHjH2EEBn0BCBCBBGDBpBCBFmFmFB+R+RBCBiCEB+JBBuCFBnCKByBDB8D3B3BBNBqBDDBLLBBByBDBDBBI+B+BBBBlBEBCHB-BNNB1B1BBHBLDBDgDgDBBBDCCBHHD+E+EEHBWBB6BBBEmBmBBFBEEBnCFBOECPBB2CHBDCBCYY1CFBCFFBCCBvHvHBCBHBBCBBcBB2CHBDCCBrDrDCDDBEBCmDmDCDDBCBCEBkIIBCBBhIBBCFFxEDBDBBFhBhBBIBpBFBDDBJKKBEBDCBvBMBCBBnGCCBBBCqGqGBFBCFBCzCzCBUBDGBCBBCBB7DFBECCBCCBFBCpCpCBEEC8K8KBMMB1B1BBDBGCCYmnFmnFHOBpmLLBECBhuCEB8BGB5gBgCgCBCByC5lT5lTBizEizEBsBBDWBhRCBSHBDGBfDB1ECB89B2BBFxBBJPPXEBCOBxqBGBCQBDGBCBBCEBlDhFhFBFB4L+B+BBCB9PDB-HBB0HDDIBBG7O7OBFBuDGB29lYvHB",!1)),N:()=>new y(E("wBJB5DBBGDDBBBitBJBnEJBnGJB9MJB3DJBFFBtDJB3DJB3DJBDFBvDMB0DJBJGBoDJBpDGBISBuDJBhDJB3DJBnCTBtIJBnCJBwWTBybCBwHJBHJBXJBtJJBhEKBmFJBHJB3FJB3CJBnEJBHJB3gBEEBEBHJBnGyBBDEB3W7BBvCVB3TdBqrBqYqYaIBPCB4KDBrEJBfHBCOBhBJBoBOBh7cJB9FJBhKFB7EJBnBJBnGJBXJB3CJB3MJB34UJBuPsBBN4BBSBB2KaBlBDBeJJnEEBrGJBvdHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBxBJBHJB3IeB-EJBrBDBxDGBnEdBhEJB9BJBxEJBITB8HJB3KJB3DJB3LJBnDJBHTBtCLBlNSB+CJB3UJB3CcBkHJBnCJB3BJBnLJBnDUBshBuDBimPJBnpCJB3CJBnEJBCGBvQJBnIWB+KCB6nXJBnuBTBNTBtDYB2iBxBBhqCJBnNJB3PJB4HJBtWIBhEJB4Y6BBCCBCDBtCsBBCOBjeMBk3CJB",!1)),Nd:()=>new y(E("wBJnxBJnEJnGJ9MJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJ3DJhDJ3DJnCJ3IJnCJn6BJnBJtJJhEJnFJHJ3FJ3CJnEJHJnuiBJnVJnBJnGJXJ3CJ3MJ34UJnsBJnkCJHJ9YJhEJ9BJxEJ3IJ3KJ3DJ3LJnDJHTtCJnNJnDJ3UJ3CJ3HJnCJ3BJnLJ3uQJnpCJ3CJnEJ3QJ37XJ12CxBhqCJnNJ3PJ4HJ2aJ30EJ",!0)),Nl:()=>new y(E("u3FCBwzCiBBDDB-zDaaBHBPCBs1dJBxyW0BBtOJJnEEBrhIuDBm8SCB",!1)),No:()=>new y(E("yFBBGDDBBB2pCFB5LFB5DCBmEGB6GGBSIByNJB2hBTB0jBJBhP20B20BEFBHJBnGPBqB3W3WB6BBvCVB3TdBqrB1kB1kBBCBrEJBfHBCOBhBJBoBOBxrdFBymWsBBiCDBSBB2KaBlBDB1pBHBaGBoBIBsCEBXFBhFBBDPBDtBBhCIB1BBBfCBsCEBpDHBZHBqBGBrKFBhLeB-EJBrBDBxDGBnETB8LTBmqBBBvNIBobSB0aUBn8SGB-YWBqhZTBNTBtDYBvqFIBid6BBCCBCDBtCsBBCOBjeMB",!1)),P:()=>new y(E("hBCBCFBCDBLBBEBBbCBCccCkBkBGEELBBEEE-VJJzOFBqBBB0BCCDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCmBmBBCBoCrCrCBDBFBBwDFBsFlTlTBHB4EuTuTtBBBvCCBoCBB+ECBCCBmBKB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBM9Z9ZBWBJTBCMBCLBfBBPBB6TDBeBB+hBNBwCBBgBJB0MVBgCDBhBBB8XDBCBBxDwEwEBtBBCfBDLBkNCBFJBDLBRNNjD7C7CjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HzqUzqUBxGxGBIBXiBBCNBCFFCBB2ECBCFBCDBLBBEBBbCBCccCCCBFB7MCB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDByO-J-JjBlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Pc:()=>new y(E("-Cg-Hg-HBUU-u3BBBZCBwHAB",!1)),Pd:()=>new y(E("tB9qB9qB0BiyDiyDmgBqgCqgCBEBiwDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Pe:()=>new y(E("pB0B0BgB+1D+1DC-6B-6BqtC4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECtBGCtNICEGCDBB-ozB6G6GeOCESSCCCrF0B0BgBGD",!1)),Pf:()=>new y(E("7F+6H+6HEddpuDCCFDDQEE",!1)),Pi:()=>new y(E("rFt7Ht7HDBBDaapuDCCFDDQEE",!1)),Po:()=>new y(E("hBCBCCBDECBLLBEEBcclCGGPBBI-V-VJzOzOBEBqB3B3BDDDtBBBVBBCBBOCCBBBrCDBnDsBsBBMBqHCB3BOBgBmImIBLLtE5D5D6DnMnMNwLwL7CLLBpFpFBNBCxDxDrCEBFBBwDFBsFlTlTBHBmY9D9DBBBoCBB+ECBCCBmBFBCDB6JBB5GBBhEGBCFBhFBBLGBdCB9DDB8BEB-BBBhCHBMjajaBJJBGBJIBDDBDCBEKBCCCBIB7kDDBCBBxDwEwEBFFBBBDDDBHBCBBCDDBLLBDBCJBDDBCCCBLBDCBtNCB6B+F+FjgdBBuICBkDLL0DFB9LDB3CBBpBCBCyByBBwBwBiDMBRBB9DDB-DBBRBB6HlxUlxUBFBDXXVBBDDBECBCDBICBHCCB2E2EBBBCCBDECBLLBEEBcclBDDB7M7MBBB9UxBxB-MoXoXoGgBgBxIIBnBxDxDBFBjCGB6CDB0ZlElEBDBtBDB+FGBuDBBCDB-DDBxBBBwCDBFOOCCB5CFBsDrJrJBCCBzDzDBDBLBBCpDpD7HWBqDCBdMBtCjEjEBBB9HpIpIBBB8E9C9CBGB0CCBCEB+CJB4GgDgDBDBrBBBmUBBrCMBwFxjBxjBBDB97CBB8zOBBmEiCiCBDBJpRpRBBBoJDBoK9lT9lTovHEB07C-a-aBAB",!1)),Ps:()=>new y(E("oBzBzBgB-1D-1DC-6B-6B-rCEEnB4B4BQ7T7TCff-hBMCxChBhBCGC1MUChCCCiBmhBmhBCECaTTCECtNICEGCDipzBipzB4GeeCMCESSCCCrFzBzBgBEEDAB",!1)),S:()=>new y(E("kBHHRCBgBCCcCCkBEBCBBDCCBCBDEEfgBgBrODBNNBGGBCCCBPB2DPPBxDxDsErIrIBBB3DCBDDDBvGvGLUUB4H4HIBBpEqLqLBHHB2H2H-DjEjEBGBlEwGwGqBmGmGiGCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WuLuLlL+E+EBgBBiLJBKIBhiBCCBBBMCBOCBOCBOBBmCOOoBCBOCBUhBB-BBBCDBCBBLCCBBBGFBCECFMMBFFBDBGDBC7B7BBFFB2LBFcBD+HBXKByCtCBXnTBtBwBBDeBLyMBX+BBFfBD1LBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBB8CBB0HBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BB6RWBKBBoDBB+EDBLDB+RCBiHPPB+9T+9TpEgBBuLPBhCBB3BHBtBDBjDCCBBBD7E7EHRRBBBgBCCcCCiEGBCGBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSmWmWBiKiKBGBnjC2kC2kCBbBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQQBgDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBrbaagBaagBaagBaagBaa9B-PB4BDBzBHBCNBCBBp2BwNwNttCEE+DiOiOBvIvIBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Sc:()=>new y(E("kB+D+DBCBqnB8D8DzPBBzPBBI2H2HoImSmS8sClmClmCBgBB37hBkuVkuVtD7E7E8GBBEBB3-HDB-4wBxtCxtC",!1)),Sk:()=>new y(E("+CCCoCHHFEEqQDBNNBGGBCCCBPB2DPPBjoBjoB15FCCBBBMCBOCBOCBOBB9kEBBkzdWBKBBoDBBxePPBniUniUBPB8bCCjF4g9B4g9BBDB",!1)),Sm:()=>new y(E("rBRRBBB+BCCuBFFmBgBgB-XwQwQBBB8xGOOoBCBOCBsEoBoBBDBHlClCBDBGBBFGDIgBgBBDDCgBgBBqIBhBBB7CffBXBpBFB2OKK3BHBwDxKxKBDBDeBLPBhIiEBX+BBFfBDhIBxBUBDFB9+zB5Z5ZCCBlFRRBBB+BCCkEHHBCBitDBBhrwBx+Bx+BagBgBagBgBagBgBagBgBat5Ft5FB-uC-uCBHB",!1)),So:()=>new y(E("mFDDFCCyerIrIBgEgEBvGvGLUUB4H4HkQ2L2LjEFBClElEwGqBqBoMCBQCCBBBDFBVECmEHBCFBCBBGDBmGBBxXJB0WzWzW+EhBBiLJBKIBksBBBCDBCBBLCCBHHBEBCECFMMBPPCBBC7B7BBKKBDBDDBCBBCBBCGBCeBDBBCCCBdBtIHBFTBDGBDwCBCdBanBBHnCBXKByCtCBX2FBCIBC1BBJuDBC3HBtBrBBhC-HBhQvBBWBBHmBBDpEBmHFBmLBBvBZBC4CBN1GBbPBFOOBNNWBBHBBxKBBFJBhBlBBKRRBdBMdBJQQBeBLmBBQ-JBhuG-BBx0V2BBibDBLBBC+R+RBBBqqUPBuLPBhCBB3BHBuBCBlPEEFBBOBB6JIB6BQBDCBCMBEwBwBBrBB7zBBBwSpgBpgBBGBnjC2kC2kCBGBFQBr6SDBG3qU3qUk7DvHBLCBEzNBHWBQPBhDzDB9B1HBLmBBD7BBGCBXBBIdBF8BBWhCBE7F7FB1CBqlB-PB4BDBzBHBCNBCBBp2B96C96CiEyWyWBqBBFjDBNOBDOBCOBCkBBYgFB5BcBOrBBFIBIBBPFB7E6HBG4WBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBB-B3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBC7CBLAB",!1)),Z:()=>new y(E("gBgEgEgvFgsCgsCBJBeBBGwBwBh9DAB",!1)),Zl:()=>new y(E("ohIA",!0)),Zp:()=>new y(E("phIA",!0)),Zs:()=>new y(E("gBgEgEgvFgsCgsCBJBlBwBwBh9DAB",!1)),ASCII_Hex_Digit:()=>new y(E("wBJIFbF",!0)),Alphabetic:()=>new y(E("hCZBHZBwBLLFGGBVBCeBCpOBFLBPEBICC3CeeBQBCBBDDBCHHCCBCCCBSBCyCBCqEBJlFBClBBDHHBnBBoBNBCCCBCCBCCJaBFDBeKBG3BBCGBPlDBCHBFHBFCBLCBDRRBuBBOkDBZgBBKBBFGGBWBDSBUYBIKBGXBCGBIJJBoBBLLBEGBHrCBCPBCCBFOBOSBCHBDBBDVBCGBCEEBCBEHBDBBDBBCJJFBBCEBNBBLFFBBBCFBFBBDVBCGBCBBCBBCBBFEBFBBDBBFIIBCBCSSBEBMCBCIBCCBCVBCGBCBBCEBEIBCCBCBBEQQBCBWDBFCBCHBDBBDVBCGBCBBCEBEHBDBBDBBKBBFBBCEBORRBCCBEBECBCDBEBBCCCBEEBEEBBBELBFEBECBCCBEHHpBMBCCBCWBCPBEHBCCBCCBJBBCCBCBBDDBdDBCHBCCBCWBCJBCEBEHBCCBCCBJBBGCBCDBOCBNMBCCBCoBBDHBCCBCCBCGGBCBIEBXFBCCBCRBEXBCIBCDDBFBJFBCCCBGBTBBO5BBGGBH0B0BBECBDBCXBCCCBRBCCBDEBCHHPDBhBgCgCBGBCjBBFSBFPBCjBBkC2BBCDDBDBR-BBLDBDlBBCGGDqBBCsKBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBmBPBR1CBDFBErTBDQBCZBGqCBEKBITBMUBNTBNMBCCBCBBNzBBDSBPFFkC4CBIqBBGlCBLeBCLBFIBYdBDEBMrBBFZB3BbBF+BBDTBzBYYBMMBBByBzBBCOBCHB0BpBBDDBLrBBCKBP2BBXCBLjBBDKBGqBBDCBqBDBCFBCBBEGGB+FBUhBBM1IBDFBDlBBDFBDHBCGCBdBD0BBCGBCEEBBBCGBEDBDFBFMBGCBCGB1DOORMBmDFFDJBCEEBDBHGCBCBCKBDDBGEBFSSBnBBuZzBB34BkHBHDBEBBNlBBCGGD3BBIRRBVBKGBCGBCGBCGBCGBCGBCGBCGBCfBwB2O2OBBBaIBIEBDEBF1CBHCBC5CBCDBGqBBC9CBSfBxBPBhQ-tGBhCs0VBkCtBBDsIBEPBLBBVuBBGHBEwDBoBIBDmDBDxCBVUBCgBBZzBBNjCBCtBtBBEBECCBBBLgBBGiBBOcBEyBBCLBQRRBOBLEBC2BBKNBTWBEkCBCCCZCBDPBDDBMFBDFBDFBKGBCGBCqBBCNBH6DBWj9KBNWBFwBBloItLBDpDBnBGBNEBGLBCMBCEBCCCBCCBCCBqDBiBqLBT-BBD1BBpBLB1DEBCmEBlBZBHZBM4CBEFBDFBDFBDCBkBLBCZBCSBCBBCOBDNBjB6DBmC0BBsIcBEwBBwBfBOdBGqBBGdBDjBBFHBCEBrB9EBTjBBFjBBFnBBJzBBNKBCOBCGBCBBCKBCOBCGBCBBEzBBN2JBKVBLHBZFBCpBBCIBmCFBDCCBqBBCBBEDDBVBLWBKeBiCSBCBBLVBLZBHZBnB3BBHBBhCDBCBBGHBCCBCcBrBcBEcBkBHBCbBc1BBLVBLSBORBvDoCB4ByBBOyBBOnBBjBbBEGGBVB7HpBBCBBEBBRFBzBCBEcBLJJBUBrBRBvBUBcWBKlCBsBEBL4BBKOOBXBYyBBSDBJiBBEKKB+BBCDBKBBLCCkBRBChBBDHHBCB-BGBCCCBCBCOBCJBI4BBYDBCHBDBBDVBCGBCBBCEBEHBDBBDBBEHHGGBdJBCDDClBBCJBCDDCDBCBBECCtBhCBCCBCDBVCBfhCBDBBC5F5FB0BBDGBaFBjB+BBCEE8B1BBDoCoCBZBDNBWGB6F4BBoD-BBgBHBDDDBGBCBBCdBCBBDBBDDB+CHBDtBBDFBCCCBccBxBBDJBSnCBGTTBnCBoDHB5CgBBgBIBCsBBCGBCyByBBcBDVBCNBqCGBCBBCrBBECCBCCBBBCDDBZZBEBCBBCkBBCBBCDBCYYBqBBlIWBKQBCoBBECBwDwCwCB4cBnDuDBSjGBtyCgDBQvhBBSFBa68DBGmSB61GuBBy2B4RBIeBSuCBSdBTvBBRDBgBUBGSBxNsBB0G-BBhBYBDYBtBqCBF4BBIQBhCBBCNNBFBK1mHBqBfBiDyDB+vIDBCGBCBBCiJBQeeBBBDPPBCBJrMBloCqDBGMBEIBIJBFi7Fi7FBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDYBCYBCeBCYBCeBCYBCeBCYBCeBCYBCHB15BeBHFB2GGBCQBDGBCBBCEBG9BBiBxDxDBrBBLGBRiKiKBcBTrBBlPbBlHdBDwGwGBdBCVBJBBhHGBCDBCBBCOBCkGB8BjCBEEE1lBDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1TZBHZBHZB3zD-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Dash:()=>new y(E("tB9qB9qB0BiyDiyDmgBqgCqgCBEB+BoBoBQnMnMlgDDDgBBBFdd-NUUwDxszBxszBBmBmBLqFqFhzD-J-J",!1)),Emoji:()=>new y(E("jBHHGJBwDFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDrGrGhFBBNBBPDDBIBsCZBCBBYVVDIBWBBvFhBBDvDBDBBCCBDyCBDCBCmIBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDDBEJBECCBEEDJBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Emoji_Component:()=>new y(E("jBHHGJB0+H2G2Gsp3B3+8B3+8BBYB8PEBxtBDBtzhY-CB",!1)),Emoji_Modifier:()=>new y(E("7-8DE",!0)),Emoji_Modifier_Base:()=>new y(E("9wJ8G8GRDB4jzD9B9BBBBDDDBBB2DBBDKBWSBEFFBBBCCBICCZqGqGBFFWFFBvFvFBBBEEB0CRRBBBKMMgSDDJHBHKKBIBDCB5B+B+BBCCBCCSCBCMBmHCBrBIB",!1)),Emoji_Presentation:()=>new y(E("64IBBuGDBEDDqQBBWBBzBLBsBUUOJJBSSBGGBJJGWWIBBCFFDIIFBBdkBkBCFFBBBC+B+BBBBZPP8aBB0BFFvlxDrGrG-FDDBIBsCZBCZZVDDBDBCCBWBBvFgBBNIBClCBCVBNqBBFEBNQBEEEBlCBCCCB5FBD+BBODBCXBTbbBOO3C0CBxBlCBHEEBBBDDBEDBMBBIIBkHLBF8I8IBtBBCJBC4FBxDMBEKBE4BBCFFBOBDLBFJB",!1)),Extended_Pictographic:()=>new y(E("pFFFu8HNN5GXX7CFBQBBwLBBNnFnFaKBFCBoGoHoHBLLK7B7BBCBCEBKGDBDDFDDCBBDIEBJJBBBGCCGLBMBBDCCBCCTDDBTTBEBCCCBEEBGGDBBFBBMBBGBBDGGBECBVVBGGBEBCDBDFFDDDBEBCDDCCCHEEHLLBQQDFFCFFBBBCMMBxBxBBBBKeP1LBBwOCBUBB0BFF7mBNN6SCCrrvDoBoBBCBlDLBQBBQPPBmBmBBIBxDBBNBBPDDBIBU3BBcOBLVVDIBCDBKWBH7FBDvDBDBBCCBDyCBDCBCDBG9HBC+BBMFBCXBIBBDHBNDDBCBDFFBOOBDDJBBKGGBBBNCBJCBDCCFHHEHHB0CBxBlCBGHBDQBECCBEBDMB7GlBBNDB5BHBLFBpBHBfBBNDBDNBKmBBNuBBCJBC4FB5CHBPxEBhI9fB",!1)),Hex_Digit:()=>new y(E("wBJIFbFq1-BJIFbF",!0)),Lowercase:()=>new y(E("hDZBwBLLFlBlBBWBCHBC2BCBQCBuBCDECBBBDCCDEEBFFDEEBBBDDDCCCDCCBCCDEECDDBDDBBBHGDCOCBSCBDDCEEC4BCBFBDDDBCCFICBjCBDiBBIBBfEBhDsBsBCEEDDBTccBhBBCBBECBCWCBDBCGDB0B0BBuBBCgBCK0BCDMCBgDCxBoBBo6CqBBCDB5XFBjkCIBC2D2DB+FBiC0ECBHBCgDCBHBJFBLHBJHBJFBLHBJHBJNBDHBJHBJHBJEBCBBHEEBBBCBBJDBDBBJHBLCBCBB6DOORMBuDEEBEEcKFDBBJDBFiBiBBOBFsasaBYBn6BvBBCEEBGCFCCBCCBGBEiDCBIICFFNlBBCGG0oesBCUaCBBBmEMCBBBC8BCBIBCCCDICFCCDCCBBBCSCGGGCMCFCCDOCWDBCCCBBB2ZqBBCNBHvCBh6TGBNEBqhBZBumBnBBpEjBB8EKBCOBCGBCBBkODDBBBCpBBCIBmoByBB+DVB75CfBhsVfB8BYBnqZZBbGBCRBbZBbDBCCCBFBCKBbZBbZBbZBbZBbZBbZBbZBbZBbbBdYBCFBbYBCFBbYBCFBbYBCFBbYBCFBC15B15BBIBCTBHFBmI9BB1lChBB",!1)),Math:()=>new y(E("rBRRBBBgBeeCuBuBFmBmBgB5W5WBBBDbbBDDBBBwQCBuwGccBBBMEEOPPBCBWEBMEBiCMBFEEBFFBDBTFFDJBCDDBEBHEEBDDBCCBBBCFBENBClClCBWBCFBCBBFBBFfBCHHBPPBqIBJDBVBB7CffBZBCZZMGB+NBBNJBFFBFBBDBBEEBPCCDFBMHBGBB6BCCeDBKCBxK-BBhI-PBxBUBDFB9+zB4Z4ZBEBCjFjFRCBeCCeCCkEHHBCBitDBBhrwBwoBwoBBzCBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBBhwFDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB-uCIB",!1)),Quotation_Mark:()=>new y(E("iBFFkEQQ96HHBaBBowDqOqOBCBOCBixzBDB+FFF7CBB",!1)),Terminal_Punctuation:()=>new y(E("hBLLCMMBEE-ZJJiQ6B6BpCPPCCB1FsBsBBJBCsHsHB3B3BBEBCHBgBmImIB1nB1nBBtFtFFFB4JBB2YHBmY9D9DBBBoCBB+ECBEoBoBBCBDBB7JBBjLDBjFBBLBBCCBeCB8FEB-BBBldYYBKKBBBwlDCBzJOOFLLCBBEBBtNBB8ndBBuICBkHEB-LBB3CBBgD4E4EBBB0ECBgERRB6H6HnxUDDB6B6BBBBCDBqFLLCMMBEEiCDD7hBxBxBnkBoGoG3JBB5EFBlCFB6CDB5dEBtBDB+FGBxDDBgECBiEBBHRRB5C5CBDBtDrJrJB2D2DBBBNBBnLDBEOBqDBB6HCBmQCC8HBB4CBBFBB-MCBuBmUmUBrCrCBspBspBBDB6vRBBmEiCiCBBBLqRqRBoJoJBnwTnwTovHDB",!1)),Uppercase:()=>new y(E("hCZBmDWBCGBiB2BCDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIJDCMCDQCDDDCCBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBDDBBBEWCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBpCDBNDBNDBNEBMDBnIFFECBDCBDEEBDBHGCBCBDDBLBBGbbBOBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoqZZBbZBbZBbCCBGDBDDBCBCHBbZBbBBCDBDHBCGBcBBCDBCEBCEEBFBcZBbZBbZBbZBbZBbZBfYBiBYBiBYBiBYBiBYBiB2pE2pEBgBBvgCZBHZBHZB",!1)),White_Space:()=>new y(E("JEBTlDlDbgvFgvFgsCKBeBBGwBwBh9DAB",!1))})),G(mn,"SCRIPTS",new Hi({Adlam:()=>new y(E("go6DrCFJFB",!0)),Ahom:()=>new y(E("g4lCaDOFW",!0)),Anatolian_Hieroglyphs:()=>new y(E("ggxCmS",!0)),Arabic:()=>new y(E("gwBEBCFBCNBCCBCfBCJBMZBCrDBChBBxCvBBxHhBBGqCBCcBxy8BtPBDvEBhBPBxDEBCmEBk7DeBkCFBJIBiBFBh43BDBCaBCBBCDDCJBCDBCCCHFFCECBBBCBBCDDCICBCCDDBCGBCDBCDBCCCBIBCQBGCBCEBCQB1BBB",!1)),Armenian:()=>new y(E("xpBlBDxBDCks9BE",!0)),Avestan:()=>new y(E("g4iC1BEG",!0)),Balinese:()=>new y(E("g4GsCCxB",!0)),Bamum:()=>new y(E("g1pB3CpowB4R",!0)),Bassa_Vah:()=>new y(E("w26CdDF",!0)),Batak:()=>new y(E("g+GzBJD",!0)),Bengali:()=>new y(E("gsCDBCHBDBBDVBCGBCEEBCBDIBDBBDDBJFFBCCBDBDYB",!1)),Beria_Erfe:()=>new y(E("g17CYDY",!0)),Bhaiksuki:()=>new y(E("ggnCICsBCNLc",!0)),Bopomofo:()=>new y(E("qXB6wLqBxDf",!0)),Brahmi:()=>new y(E("ggkCtCFjBKA",!0)),Braille:()=>new y(E("ggK-H",!0)),Buginese:()=>new y(E("gwGbDB",!0)),Buhid:()=>new y(E("g6FT",!0)),Canadian_Aboriginal:()=>new y(E("ggF-TxRlC7tgCP",!0)),Carian:()=>new y(E("g1gCwB",!0)),Caucasian_Albanian:()=>new y(E("wphCzBMA",!0)),Chakma:()=>new y(E("gokC0BCR",!0)),Cham:()=>new y(E("gwqB2BKNDJDD",!0)),Cherokee:()=>new y(E("g9E1CDFz7lBvC",!0)),Chorasmian:()=>new y(E("w9jCb",!0)),Common:()=>new y(E("AgCBbFBbuBBCOBCEBYgBgBiOmBBGEBDTB1DKKHCC+THHPEEhB9E9ElQiEiEB6mB6mB2MDBjJwvBwvBBBBoCBBsGBBCumBumBOIIBCBCFBCCBDmYmYBKBD2CBCKBEKBCOBShBB-BlBBCCBDFBCaBCQBqBCBF5UBXKBW-cBhIzTBDpEBhQ9CBzMUBCCCBXBQHBFDB8CBBE7C7CB0E0EBOBhBlBBKxBxBB+BBgBwCBwB5C5CBmFBhuG-BBhoWhBBnDCBmFJB1HhFhFsMPPBzuUzuUBxGxGBIBXiBBCSBCDB0ECCBeBbFBbKBLuBuBBhChCBFBCGBLEBjICBFsBBEIBxCMB0BsBBlHaBltuBDB96D8HBEzNBHWBQQBgDzDB9B1HBLmBBD9BBEQBJBBIdBF8BB2GTBNTBN2CBKYBoE0CBCmCBCBBDDDBDDBCBCLBCCCBFBCgCBCDBDHBCGBCbBCDBCEBCEEBFBCzKBDjJBDxBByjFjCBtC8BBjWrBBFjDBNOBDOBCOBCkBBLtFB5BZBCBBOrBBFIBIBBPFB7E4eBEQBEMBE5GBHLBFQQBKBF3BBJJBHnBBJdBDLBFBBPIBoB3KBJNBDMBEKBE4BBCFFBOBDLBFJBIyEBCmDBnghYffB+CB",!1)),Coptic:()=>new y(E("ifNxkKzDGG",!0)),Cuneiform:()=>new y(E("ggoC5cnDuDCEMjG",!0)),Cypriot:()=>new y(E("ggiCFBDCCBqBBCBBEDD",!1)),Cypro_Minoan:()=>new y(E("w8rCiD",!0)),Cyrillic:()=>new y(E("ggBkEBDoFBx6FKBhFtCtCojEfBhie-CBv8VBBhw4B9BBiBAB",!1)),Deseret:()=>new y(E("gghCvC",!0)),Devanagari:()=>new y(E("goCwCFODZh7nBfhwcJ",!0)),Dives_Akuru:()=>new y(E("gomCGBDDDBGBCBBCdBCBBDLBKJB",!1)),Dogra:()=>new y(E("ggmC7B",!0)),Duployan:()=>new y(E("ggvDqDGMEIIJDD",!0)),Egyptian_Hieroglyphs:()=>new y(E("ggsC1iBL68D",!0)),Elbasan:()=>new y(E("gohCnB",!0)),Elymaic:()=>new y(E("g-jCW",!0)),Ethiopic:()=>new y(E("gwEoCBCDBDGBCCCBCBDoBBCDBDgBBCDBDGBCCCBCBDOBC4BBCDBDiCBDfBEZBnvGWBKGBCGBCGBCGBCGBCGBCGBCGBjpfFBDFBDFBKGBCGBylvCGBCDBCBBCOB",!1)),Garay:()=>new y(E("gqjClBEcJB",!0)),Georgian:()=>new y(E("glElBBCGGDqBBCDBx8CqBBDCBhiElBBCGG",!1)),Glagolitic:()=>new y(E("ggL-Ch9sDGCQDGCBCE",!0)),Gothic:()=>new y(E("w5gCa",!0)),Grantha:()=>new y(E("g4kCDBCHBDBBDVBCGBCBBCEBDIBDBBDCBDHHGGBDGBEEB",!1)),Greek:()=>new y(E("wbDBCCBDDBCFFCCCBBBCCCBSBC+BBPPBnpGEBzBEBFEB1ChKhKBUBDFBDlBBDFBDHBCGCBdBD0BBCOBCNBDFBCSBDCBCIBoJ-xiB-xiB7uVuCBSgj0Bgj0BBkCB",!1)),Gujarati:()=>new y(E("h0CCBCIBCCBCVBCGBCBBCEBDJBCCBCCBDQQBCBDLBIGB",!1)),Gunjala_Gondi:()=>new y(E("grnCFCBCkBCBCFIJ",!0)),Gurmukhi:()=>new y(E("hwCCBCFBFBBDVBCGBCBBCBBCBBDCCBDBFBBDCBEIIBCBCIIBPB",!1)),Gurung_Khema:()=>new y(E("go4C5B",!0)),Han:()=>new y(E("g0LZBC4CBN1GBwBCCaIBPDBle-tGBhC-vUBhoWtLBDpDBpodBBNGBqgkB-2pBBhB9oEBDt0FBDwpHBQtTBjtC9QBjvBq6EBGppIB",!1)),Hangul:()=>new y(E("goE-HvxHBiI9CyDeiCei3dckUj9KNWFwBl9JeEFDFDFDC",!0)),Hanifi_Rohingya:()=>new y(E("gojCnBJJ",!0)),Hanunoo:()=>new y(E("g5FU",!0)),Hatran:()=>new y(E("gniCSCBGE",!0)),Hebrew:()=>new y(E("xsB2BBJaBFFBpp9BZBCEBCCCBCCBCCBIB",!1)),Hiragana:()=>new y(E("hiM1CBHCBi7-C+IBTeeBBBulQAB",!1)),Imperial_Aramaic:()=>new y(E("giiCVCI",!0)),Inherited:()=>new y(E("gYvDB2IBBlOKBbhXhXBCB8qEtBBDLBlPCBCMBCGBFHHEBBnG-BBtQBBjGgBB65DDBsDBBmrzBPBRNBwejHjH7iEl+uBl+uBBsBBDWBhRCBSHBDGBfDBz6rYvHB",!1)),Inscriptional_Pahlavi:()=>new y(E("g7iCSGH",!0)),Inscriptional_Parthian:()=>new y(E("g6iCVDH",!0)),Javanese:()=>new y(E("gsqBtCDJFB",!0)),Kaithi:()=>new y(E("gkkCiCLA",!0)),Kannada:()=>new y(E("gkDMCCCWCJCEDICCCDIBGCCDDJCC",!0)),Katakana:()=>new y(E("hlM5CBDCBxHPBxGuBBC3CBvgzBJBCsBBzisBDBCGBCBBCgJgJBBBzBPPBCB",!1)),Kawi:()=>new y(E("g4nCQCoBEc",!0)),Kayah_Li:()=>new y(E("goqBtBCA",!0)),Kharoshthi:()=>new y(E("gwiCDCBGHCCCcDCFJII",!0)),Khitan_Small_Script:()=>new y(E("k-7C84G84GB0OBqBAB",!1)),Khmer:()=>new y(E("g8F9CDJHJnPf",!0)),Khojki:()=>new y(E("gwkCRCuB",!0)),Khudawadi:()=>new y(E("w1kC6BGJ",!0)),Kirat_Rai:()=>new y(E("gq7C5B",!0)),Lao:()=>new y(E("h0DBBCCCBDBCXBCCCBVBDEBCCCBFBCJBDDB",!1)),Latin:()=>new y(E("hCZBHZBwBQQGWBCeBCgOBoBEB8wGlBBHwBBGDBGMBClCBiC-HByLOORMBuEBBHccSoBB42CfBj1elDBExCBVOBxZqBBCIBCDB38TGB7gBZBHZBmhCFBCpBBCIBm61BeBHFB",!1)),Lepcha:()=>new y(E("ggH3BEOEC",!0)),Limbu:()=>new y(E("goGeBCLBFLBFEEBKB",!1)),Linear_A:()=>new y(E("gwhC2JKVLH",!0)),Linear_B:()=>new y(E("gggCLCZCSCBCODNjB6D",!0)),Lisu:()=>new y(E("wmpBvBx1eA",!0)),Lycian:()=>new y(E("g0gCc",!0)),Lydian:()=>new y(E("gpiCZGA",!0)),Mahajani:()=>new y(E("wqkCmB",!0)),Makasar:()=>new y(E("g3nCY",!0)),Malayalam:()=>new y(E("goDMCCCyBCCCFFPDZ",!0)),Mandaic:()=>new y(E("giCbDA",!0)),Manichaean:()=>new y(E("g2iCmBFL",!0)),Marchen:()=>new y(E("wjnCfDVCN",!0)),Masaram_Gondi:()=>new y(E("gonCGBCBBCrBBECCBCCBHBJJB",!1)),Medefaidrin:()=>new y(E("gy7C6C",!0)),Meetei_Mayek:()=>new y(E("g3qBWqGtBDJ",!0)),Mende_Kikakui:()=>new y(E("gg6DkGDP",!0)),Meroitic_Cursive:()=>new y(E("gtiCXFTDtB",!0)),Meroitic_Hieroglyphs:()=>new y(E("gsiCf",!0)),Miao:()=>new y(E("g47CqCF4BIQ",!0)),Modi:()=>new y(E("gwlCkCMJ",!0)),Mongolian:()=>new y(E("ggGBBDCCBSBH4CBIqBB2t-BMB",!1)),Mro:()=>new y(E("gy6CeCJFB",!0)),Multani:()=>new y(E("g0kCGBCCCBCBCOBCKB",!1)),Myanmar:()=>new y(E("ggE-EhqmBeiDfxibT",!0)),Nabataean:()=>new y(E("gkiCeJI",!0)),Nag_Mundari:()=>new y(E("wm5DpB",!0)),Nandinagari:()=>new y(E("gtmCHDtBDK",!0)),New_Tai_Lue:()=>new y(E("gsGrBFZHKEB",!0)),Newa:()=>new y(E("gglC7CCE",!0)),Nko:()=>new y(E("g+B6BDC",!0)),Nushu:()=>new y(E("h-7CvsQvsQBqMB",!1)),Nyiakeng_Puachue_Hmong:()=>new y(E("go4DsBENDJFB",!0)),Ogham:()=>new y(E("g0Fc",!0)),Ol_Chiki:()=>new y(E("wiHvB",!0)),Ol_Onal:()=>new y(E("wu5DqBFA",!0)),Old_Hungarian:()=>new y(E("gkjCyBOyBIF",!0)),Old_Italic:()=>new y(E("g4gCjBKC",!0)),Old_North_Arabian:()=>new y(E("g0iCf",!0)),Old_Permic:()=>new y(E("w6gCqB",!0)),Old_Persian:()=>new y(E("g9gCjBFN",!0)),Old_Sogdian:()=>new y(E("g4jCnB",!0)),Old_South_Arabian:()=>new y(E("gziCf",!0)),Old_Turkic:()=>new y(E("ggjCoC",!0)),Old_Uyghur:()=>new y(E("w7jCZ",!0)),Oriya:()=>new y(E("h4CCCHDBDVCGCBCEDIDBDCICFBCEDR",!0)),Osage:()=>new y(E("wlhCjBFjB",!0)),Osmanya:()=>new y(E("gkhCdDJ",!0)),Pahawh_Hmong:()=>new y(E("g46ClCLJCGCUGS",!0)),Palmyrene:()=>new y(E("gjiCf",!0)),Pau_Cin_Hau:()=>new y(E("g2mC4B",!0)),Phags_Pa:()=>new y(E("giqB3B",!0)),Phoenician:()=>new y(E("goiCbEA",!0)),Psalter_Pahlavi:()=>new y(E("g8iCRIDNG",!0)),Rejang:()=>new y(E("wpqBjBMA",!0)),Runic:()=>new y(E("g1FqCEK",!0)),Samaritan:()=>new y(E("ggCtBDO",!0)),Saurashtra:()=>new y(E("gkqBlCJL",!0)),Sharada:()=>new y(E("gskC-ChsCH",!0)),Shavian:()=>new y(E("wihCvB",!0)),Siddham:()=>new y(E("gslC1BDlB",!0)),Sidetic:()=>new y(E("gqiCZ",!0)),SignWriting:()=>new y(E("gg2DrUQECO",!0)),Sinhala:()=>new y(E("hsDCBCRBEXBCIBCDDBFBEFFBEBCCCBGBHJBDCBt-gCTB",!1)),Sogdian:()=>new y(E("w5jCpB",!0)),Sora_Sompeng:()=>new y(E("wmkCYIJ",!0)),Soyombo:()=>new y(E("wymCyC",!0)),Sundanese:()=>new y(E("g8G-BhIH",!0)),Sunuwar:()=>new y(E("g+mChBPJ",!0)),Syloti_Nagri:()=>new y(E("ggqBsB",!0)),Syriac:()=>new y(E("g4BNC7BDCxIK",!0)),Tagalog:()=>new y(E("g4FVKA",!0)),Tagbanwa:()=>new y(E("g7FMCCCB",!0)),Tai_Le:()=>new y(E("wqGdDE",!0)),Tai_Tham:()=>new y(E("gxG+BCcDKHJHN",!0)),Tai_Viet:()=>new y(E("g0qBiCZE",!0)),Tai_Yo:()=>new y(E("g25DeCVJB",!0)),Takri:()=>new y(E("g0lC5BHJ",!0)),Tamil:()=>new y(E("i8CBBCFBECBCDBEBBCCCBEEBEEBBBELBFEBECBCDBDHHPUBm+kCxBBOAB",!1)),Tangsa:()=>new y(E("wz6CuCCJ",!0)),Tangut:()=>new y(E("g-7CgBgBB+3GBhQeBiDyDB",!1)),Telugu:()=>new y(E("ggDMCCCWCPDICCCDIBCCCBDDDJII",!0)),Thaana:()=>new y(E("g8BxB",!0)),Thai:()=>new y(E("hwD5BGb",!0)),Tibetan:()=>new y(E("g4DnCCjBFmBCjBCOCGFB",!0)),Tifinagh:()=>new y(E("wpL3BIBPA",!0)),Tirhuta:()=>new y(E("gklCnCJJ",!0)),Todhri:()=>new y(E("guhCzB",!0)),Tolong_Siki:()=>new y(E("wtnCrBFJ",!0)),Toto:()=>new y(E("w04De",!0)),Tulu_Tigalari:()=>new y(E("g8kCJBCDDClBBCJBCDDCDBCJBCBBJBB",!1)),Ugaritic:()=>new y(E("g8gCdCA",!0)),Unknown:()=>new y(E("4bBBHDBICCVuMuMnBBBzBBBE4B4BBGBcDBHKBvI9B9BBmDmDBMB8BBByBBBQddBCCMEBjBEBuHJJBDDBXXICCBBBFBBKBBDBBFHBCDBDGGBaaBEEHDBDBBXIIDGDBCCGDBDBBECBCGBFCCBFBSJBEKKEXXIDDGBBLIEBCCBNBFBBNGBIEEJBBDBBXIIDGGBKKBDDBEEBFBEDBDGGBTTBIBDHHBBBEFFBBBDCCDCBDCBECBNDBGCBEFFBCCBEBCNBWEBOEEYRRBKKEFFBFBDEEDBBFBBLGBXEEYLLGBBKEEFGBDEBEFFBLLELBOEE0BEEHDBRBBbEETCBZKKCBBICBCDBHCCJFBLBBELB7BDBekBBDCCGZZCYYBGGCIILBBFfBpClBlBBCBoBlBlBQOOBjBBnGCCBDBCBB6LFFBIICFFBqBqBFBBiBFFBIICFFBQQ6BFFBkCkCBhBhBBBBbFB3CBBHBB+UCB6CGBXIBZIBVLBOEEDLB-CBBLFBLFBbFB6CGBsBEBnCJBgBNNBCBNDBCCBrBBBGKBtBDBbFBMCB-BBBiCeeBMMBEBLFBPBBvBBBNTBuCnFnFBGB9BCBQCB-BEBsBBBMHBsBEB3QBBHBBnBBBHBBJGCgBBB2BQQPBBHUUBEEKmDmDNBBcOOBBBjBNBiBOBtEDB7UVBMUB14BBB-LEBuBCCBDBCBB5BGBDNBZIBI4BI-DhBBb6C6CBKB3GZBxC3C3CBoDoDBDBsB-C-C3CIBxBuzcuzcBBB4BIB9KTB5FHB+GTB9BCBLFB5BHBnCHBNFB1DKBfCBvCMMBCBiB4B4BBHBPBBLBBoDXBdJBHBBHBBHIBIII9BDB-DBBLFBl9KLBYDByBjoIBvLBBrDlBBILBGEBbGGCGDrUfBrBFB0BUUFDBGoEoEBCC-FCBHBBHBBHBBECBIIIBIBGBBNbbUDDQBBPhBB8DEBEDBuBCB5COOBBBCuBBvBhEBeCByBOBdDBlBIBfEBsBEBfmBmBBCBPpBB-EBBLFBlBDBlBDBpBHB1BKBNQQIDDMQQIDDBBB1BLB4JIBXJBJXBHrBrBKkCBHBBCtBtBDCBCBBYpCpCBGBKvBBUDDBDBiBCBcEBclBB5BDBVBBzBDDBDBJEEeBBEDBLGBKGBhCfBoBDBNIB3BCBeBBcEBbGBFLBIvCBqC2BB0BMB0BGBvBHBLFBnBCBeHBDvGBgBrBrBEBBDPBHHBKgBBvBHBrBVBblBBdTBYIBvCDBlBIBlCJBCBBaGBLFB2BTTBGBoBIBhDVVBJBTwBwBB8BBICCFQQMFB8BEBLFBFJJBDDBXXIDDGLLBDDBEEBCCBEBCEBIBBICBGKBLCCBCCnBLLCBBCFFLDDBGBDcB9CGGBcBpCHBLlFB3BBBnBhBBmCKBLFBOSB7BFBLFBVbBcBBQDBY4FB9BjDB0CLBJBBCBBJDDfDDBNNBHBLlCBJBBvBBBMaBpCHB0CMBqCGBL1CBJ3CBjBNBLFBKuBuBPJBeCBhBBBXPPBnCBIDDtBCBCDDKHBLFBHDDmBDDHGBLFBtBDBL1HBaGBSqBqBBBBe0CBCOBzBMB8clDBwDGGBJBlGryCBkDMB3iBJB88DEBoS41GB7Bl2BB6RGBgBLLBCByCLLBEBfBBHJBnCJBLIIWEBUvNB7BlGB8CEBaBBarBBsCDB6BGBS-BBGKBIIB3mHoBBhBgDB0D8vIBFIIDkJkJBNBCcBEBBCNBFHBtMjoCBsDEBOCBKGBLBBJ76DB+HCB1NFBYOBSOBvBBBYIB1D7BB3HJBoBBBjGUBnC5DBVLBVLB4CIBamEB2CoCoCDBBCBBDBBFNNCIIiCFFBJJIddFGGCCBI1K1KBlJlJB-V-VBNBGQQBuiBBgBFBH0GBISSBIIDGGBDB-BgBBCvDBuBCBPBBLDBD-JBgBQB7BEBCvOBrB1GBsBDBC-FBgBXXBGBD-GBIFFDQQmGBBRoBBtCDBLDBDwYBlCrCB+BhGBFccDCCBCCLFFCCCBEBCDBCECEDDCBBCICDCCBFFIKFCLLSEBEGGSzBBDtIBtBDBlDLBQBBQQQmBJBvF3BBeMBtBDBKGBDNBH5EB6eCBSCBOCB7GFBNDBCOBNDB5BHBLFBpBHBfBBNDBDNBKmBB5KHBPBBOCBMCB6BCCBCBRBBNDBLGB0EoDoDBjgBBh3pBfB-oEBBv0FBBypHOBvThtCB-QhvBBs6EEBrpIm8yVBCdBhD-DBxHvw-FB",!1)),Vai:()=>new y(E("gopBrJ",!0)),Vithkuqi:()=>new y(E("wrhCKCOCGCBCKCOCGCB",!0)),Wancho:()=>new y(E("g24D5BGA",!0)),Warang_Citi:()=>new y(E("glmCyCNA",!0)),Yezidi:()=>new y(E("g0jCpBCCDB",!0)),Yi:()=>new y(E("ggoBskBE2B",!0)),Zanabazar_Square:()=>new y(E("gwmCnC",!0))})),G(mn,"FOLD_CATEGORIES",new Hi({L:()=>new y(E("laA",!0)),LC:()=>new y(E("laA",!0)),Ll:()=>new y(E("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGC3HrBrBCEEJHHCCBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHxC9zC9zCBuBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Lt:()=>new y(E("kOCCBCCBCClBCCtsHHBJHBJHBMQQwBAB",!1)),Lu:()=>new y(E("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpL2B2Bs1CvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1)),M:()=>new y(E("5cgBgBlgHAB",!1)),Mn:()=>new y(E("5cgBgBlgHAB",!1)),Emoji:()=>new y(E("8mJA",!0)),Extended_Pictographic:()=>new y(E("8mJA",!0)),Lowercase:()=>new y(E("hCZBmDWBCGBiBuBCEECDOCDuBCBECEBBCCCBCCBBBDDBCBBCCBEBBCBBCECBCCDCCBCCBBBCCCBEEIBBCBBCBBCOCDQCDBBCCCBBBC4BCIBBCBBDCCBCBCGCiJCCEJJHCCBBBCCCBCCBPBCIBkBJJCUCGDDCBBDyBBxBgBCK2BCBMCD+CCDlBBq6ClBBCGGzW1CB0kCHHBpBBDCBhK0ECKgDCKHBJFBLHBJHBJFBMGCJHBZHBJHBJHBJEBMEBMDBNEBMEBqJEEBHHuBPBUzZzZBYBx5BvBBxBCCBBBDGCBCBCDDJCBCgDCJCCFuqeuqeCqBCUaCoEMCE8BCLECBICFCCDCCEUCBDBCEBCOCBCBCCCBQCZs5Vs5VBYBmmBnBBpEjBB9EKBCOBCGBCBBr3ByBB+EVB75CfBhsVfBhCYBoyehBB",!1)),Math:()=>new y(E("ycGDCHHFMMDDDCHHFAB",!1)),Uppercase:()=>new y(E("hDZB7BqBqBBWBCHBCuBCEECDOCDsBCDECBBBDCCDEEGDDECBDDDCCCDFFDEECDDECCGBBCBBCBBCOCBSCDBBCEECkBCEQCJDDBCCFICBEBCBBCCCBEEBCCBCBCEBDCCBDDIDDCBBEFBGLLBnFnFsBCCEEEBBBvBDBCdBCBBECBCWCBDBCGD1BvBBCgBCK0BCDMCBgDCyBlBBq6CqBBDCB5XFBjkCIBCvHvHERRzD0ECGGGC8CCBHBJFBLHBJHBJFBMGCJHBJNBzBBBNSSBPPBEEpLiBiBBOBFsasaBYBn6BvBBCEEBGCHDDLiDCJCCFNNBkBBCGG0oesBCUaCoEMCE8BCLCCDICFFFCBBDSCMOCFCCDOCb9a9advCBi8UZBumBnBBpEjBB8EKBCOBCGBCBBk4ByBB+DVB75CfBhsVfB8BYBvyehBB",!1))})),G(mn,"FOLD_SCRIPT",new Hi({Common:()=>new y(E("8cgBgB",!1)),Greek:()=>new y(E("1FwUwU",!1)),Inherited:()=>new y(E("5cgBgBlgHAB",!1))})),mn),Ee,z=(Ee=class{static is32(e,t){let s=0,r=e.length;for(;s<r;){const i=s+Math.floor((r-s)/2),o=e.getLo(i),a=e.getHi(i);if(o<=t&&t<=a){const c=e.getStride(i);return(t-o)%c===0}t<o?r=i:s=i+1}return!1}static is(e,t){if(t<=Ee.MAX_LATIN1){for(let s=0;s<e.length;s++){if(t>e.getHi(s))continue;const r=e.getLo(s);if(t<r)return!1;const i=e.getStride(s);return(t-r)%i===0}return!1}return e.length>0&&t>=e.getLo(0)&&Ee.is32(e,t)}static isUpper(e){if(e<=Ee.MAX_LATIN1){const t=String.fromCodePoint(e);return t.toUpperCase()===t&&t.toLowerCase()!==t}return Ee.is(at.Upper,e)}static isPrint(e){return e<=Ee.MAX_LATIN1?e>=32&&e<Ee.MAX_ASCII||e>=161&&e!==173:Ee.is(at.Print,e)}static simpleFold(e){if(at.CASE_ORBIT.has(e))return at.CASE_ORBIT.get(e);const t=k.toLowerCase(e);return t!==e?t:k.toUpperCase(e)}static equalsIgnoreCase(e,t){if(e===t)return!0;if(e<0||t<0)return!1;if(e<=Ee.MAX_ASCII&&t<=Ee.MAX_ASCII)return 65<=e&&e<=90&&(e|=32),65<=t&&t<=90&&(t|=32),e===t;for(let s=Ee.simpleFold(e);s!==e;s=Ee.simpleFold(s))if(s===t)return!0;return!1}},G(Ee,"MAX_RUNE",1114111),G(Ee,"MAX_ASCII",127),G(Ee,"MAX_LATIN1",255),G(Ee,"MAX_BMP",65535),G(Ee,"MIN_FOLD",65),G(Ee,"MAX_FOLD",125251),G(Ee,"MIN_HIGH_SURROGATE",55296),G(Ee,"MAX_HIGH_SURROGATE",56319),G(Ee,"MIN_LOW_SURROGATE",56320),G(Ee,"MAX_LOW_SURROGATE",57343),G(Ee,"MIN_SUPPLEMENTARY_CODE_POINT",65536),Ee);const $l=256,Ud=new Uint8Array($l);for(let n=0;n<$l;n++)Ud[n]=97<=n&&n<=122||65<=n&&n<=90||48<=n&&n<=57||n===95?1:0;let Ha=null,Ga=null;var Ie,Q=(Ie=class{static emptyInts(){return[]}static isByteArray(e){return Array.isArray(e)||e instanceof Uint8Array}static isalnum(e){return k.CODES.get("0")<=e&&e<=k.CODES.get("9")||k.CODES.get("a")<=e&&e<=k.CODES.get("z")||k.CODES.get("A")<=e&&e<=k.CODES.get("Z")}static unhex(e){return k.CODES.get("0")<=e&&e<=k.CODES.get("9")?e-k.CODES.get("0"):k.CODES.get("a")<=e&&e<=k.CODES.get("f")?e-k.CODES.get("a")+10:k.CODES.get("A")<=e&&e<=k.CODES.get("F")?e-k.CODES.get("A")+10:-1}static escapeRune(e){let t="";if(z.isPrint(e))Ie.METACHARACTERS.indexOf(String.fromCodePoint(e))>=0&&(t+="\\"),t+=String.fromCodePoint(e);else switch(e){case k.CODES.get('"'):t+='\\"';break;case k.CODES.get("\\"):t+="\\\\";break;case k.CODES.get("	"):t+="\\t";break;case k.CODES.get(`
`):t+="\\n";break;case k.CODES.get("\r"):t+="\\r";break;case k.CODES.get("\b"):t+="\\b";break;case k.CODES.get("\f"):t+="\\f";break;default:{let s=e.toString(16);e<256?(t+="\\x",s.length===1&&(t+="0"),t+=s):t+=`\\x{${s}}`;break}}return t}static stringToRunes(e){const t=String(e),s=[];let r=0;for(;r<t.length;){const i=t.codePointAt(r);s.push(i),r+=i>z.MAX_BMP?2:1}return s}static runeToString(e){return String.fromCodePoint(e)}static isWordRune(e){return e<$l?Ud[e]===1:!1}static emptyOpContext(e,t){let s=0;return e<0&&(s|=Ie.EMPTY_BEGIN_TEXT|Ie.EMPTY_BEGIN_LINE),e===10&&(s|=Ie.EMPTY_BEGIN_LINE),t<0&&(s|=Ie.EMPTY_END_TEXT|Ie.EMPTY_END_LINE),t===10&&(s|=Ie.EMPTY_END_LINE),Ie.isWordRune(e)!==Ie.isWordRune(t)?s|=Ie.EMPTY_WORD_BOUNDARY:s|=Ie.EMPTY_NO_WORD_BOUNDARY,s}static quoteMeta(e){return e.split("").map(t=>Ie.METACHARACTERS.indexOf(t)>=0?`\\${t}`:t).join("")}static charCount(e){return e>z.MAX_BMP?2:1}static toArray(e){const t=e.length,s=new Array(t);for(let r=0;r<t;r++)s[r]=e[r];return s}static stringToUtf8ByteArray(e){if(globalThis.TextEncoder)return Ha||(Ha=new TextEncoder),Ha.encode(e);{let t=[],s=0;for(let r=0;r<e.length;r++){let i=e.charCodeAt(r);i<128?t[s++]=i:i<2048?(t[s++]=i>>6|192,t[s++]=i&63|128):(i&64512)===z.MIN_HIGH_SURROGATE&&r+1<e.length&&(e.charCodeAt(r+1)&64512)===z.MIN_LOW_SURROGATE?(i=z.MIN_SUPPLEMENTARY_CODE_POINT+((i&1023)<<10)+(e.charCodeAt(++r)&1023),t[s++]=i>>18|240,t[s++]=i>>12&63|128,t[s++]=i>>6&63|128,t[s++]=i&63|128):(t[s++]=i>>12|224,t[s++]=i>>6&63|128,t[s++]=i&63|128)}return t}}static utf8ByteArrayToString(e){if(globalThis.TextDecoder){Ga||(Ga=new TextDecoder("utf-8"));const t=e instanceof Uint8Array?e:new Uint8Array(e);return Ga.decode(t)}else{let t=[],s=0,r=0;for(;s<e.length;){let i=e[s++];if(i<128)t[r++]=String.fromCharCode(i);else if(i>191&&i<224){let o=e[s++];t[r++]=String.fromCharCode((i&31)<<6|o&63)}else if(i>239&&i<365){let o=e[s++],a=e[s++],c=e[s++],u=((i&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-z.MIN_SUPPLEMENTARY_CODE_POINT;t[r++]=String.fromCharCode(z.MIN_HIGH_SURROGATE+(u>>10)),t[r++]=String.fromCharCode(z.MIN_LOW_SURROGATE+(u&1023))}else{let o=e[s++],a=e[s++];t[r++]=String.fromCharCode((i&15)<<12|(o&63)<<6|a&63)}}return t.join("")}}},G(Ie,"METACHARACTERS","\\.+*?()|[]{}^$"),G(Ie,"EMPTY_BEGIN_LINE",1),G(Ie,"EMPTY_END_LINE",2),G(Ie,"EMPTY_BEGIN_TEXT",4),G(Ie,"EMPTY_END_TEXT",8),G(Ie,"EMPTY_WORD_BOUNDARY",16),G(Ie,"EMPTY_NO_WORD_BOUNDARY",32),G(Ie,"EMPTY_ALL",-1),Ie);const Hd=(n=[],e=0)=>{const t=Object.create(null);for(let s=0;s<n.length;s++){const r=n[s],i=e+s;t[r]=i,t[i]=r}return Object.freeze(t)};var Dn,fs=(Dn=class{getEncoding(){throw Error("not implemented")}asCharSequence(){throw Error("not implemented")}asBytes(){throw Error("not implemented")}length(){throw Error("not implemented")}isUTF8Encoding(){return this.getEncoding()===Dn.Encoding.UTF_8}isUTF16Encoding(){return this.getEncoding()===Dn.Encoding.UTF_16}},G(Dn,"Encoding",Hd(["UTF_16","UTF_8"])),Dn),hB=class extends fs{constructor(n=null){super(),this.bytes=n}getEncoding(){return fs.Encoding.UTF_8}asCharSequence(){return Q.utf8ByteArrayToString(this.bytes)}asBytes(){return this.bytes}length(){return this.bytes.length}},cE=class extends fs{constructor(n=null){super(),this.charSequence=n}getEncoding(){return fs.Encoding.UTF_16}asCharSequence(){return this.charSequence}asBytes(){return Q.stringToUtf8ByteArray(this.charSequence.toString())}length(){return this.charSequence.length}},rs=class{static utf16(n){return new cE(n)}static utf8(n){return Q.isByteArray(n)?new hB(n):new hB(Q.stringToUtf8ByteArray(n))}},rt=class{static EOF(){return-8}constructor(){this.end=0}canCheckPrefix(){return!0}endPos(){return this.end}hasString(){return!1}hasAnyString(){return!1}prefixLength(){return 0}},uE=class extends rt{constructor(n,e=0,t=n.length){super(),this.bytes=n,this.start=e,this.end=t}hasString(n,e){const t=n.bytes;if(t.length===0)return!0;const s=this.indexOf(this.bytes,t,this.start+e);return s!==-1&&s<=this.end-t.length}hasAnyString(n,e){return n.ac8?n.ac8.searchUTF8(this.bytes,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return rt.EOF();const e=this.bytes[n]&255;if(e<128)return e<<3|1;if(e>=194&&e<=223&&n+1<this.end){const t=this.bytes[n+1]&255;return(t&192)!==128?e<<3|1:((e&31)<<6|t&63)<<3|2}else if(e>=224&&e<=239&&n+2<this.end){const t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;const s=this.bytes[n+2]&255;return(s&192)!==128?e<<3|1:((e&15)<<12|(t&63)<<6|s&63)<<3|3}else if(e>=240&&e<=244&&n+3<this.end){const t=this.bytes[n+1]&255;if((t&192)!==128)return e<<3|1;const s=this.bytes[n+2]&255;if((s&192)!==128)return e<<3|1;const r=this.bytes[n+3]&255;return(r&192)!==128?e<<3|1:((e&7)<<18|(t&63)<<12|(s&63)<<6|r&63)<<3|4}else return e<<3|1}index(n,e){e+=this.start;const t=this.indexOf(this.bytes,n.prefixUTF8,e);return t<0?t:t-e}context(n){n+=this.start;let e=-1;if(n>this.start&&n<=this.end){let s=n-1;if(e=this.bytes[s--],e>=128){let r=n-4;for(r<this.start&&(r=this.start);s>=r&&(this.bytes[s]&192)===128;)s--;s<this.start&&(s=this.start),e=this.step(s-this.start)>>3}}const t=n<this.end?this.step(n-this.start)>>3:-1;return Q.emptyOpContext(e,t)}indexOf(n,e,t=0){let s=e.length;if(s===0)return t<=this.end?t:-1;const r=e[0];let i=this.end-s;const o=typeof n.indexOf=="function";let a=t;for(;a<=i;){if(o){if(a=n.indexOf(r,a),a===-1||a>i)return-1}else{for(;a<=i&&n[a]!==r;)a++;if(a>i)return-1}let c=!0;for(let u=1;u<s;u++)if(n[a+u]!==e[u]){c=!1;break}if(c)return a;a++}return-1}prefixLength(n){return n.prefixUTF8.length}},BE=class extends rt{constructor(n,e=0,t=n.length){super(),this.charSequence=n,this.start=e,this.end=t}hasString(n,e){const t=this.charSequence.indexOf(n.str,this.start+e);return t!==-1&&t<=this.end-n.str.length}hasAnyString(n,e){return n.ac16?n.ac16.searchUTF16(this.charSequence,this.start+e,this.end):!1}step(n){if(n+=this.start,n>=this.end)return rt.EOF();const e=this.charSequence.charCodeAt(n);if(e<z.MIN_HIGH_SURROGATE||e>z.MAX_HIGH_SURROGATE||n+1>=this.end)return e<<3|1;const t=this.charSequence.charCodeAt(n+1);return t>=z.MIN_LOW_SURROGATE&&t<=z.MAX_LOW_SURROGATE?(e-z.MIN_HIGH_SURROGATE)*1024+(t-z.MIN_LOW_SURROGATE)+z.MIN_SUPPLEMENTARY_CODE_POINT<<3|2:e<<3|1}index(n,e){e+=this.start;const t=this.charSequence.indexOf(n.prefix,e);return t<0||t>this.end-n.prefix.length?-1:t-e}context(n){n+=this.start;const e=n>this.start&&n<=this.end?this.charSequence.charCodeAt(n-1):-1,t=n<this.end?this.charSequence.charCodeAt(n):-1;return Q.emptyOpContext(e,t)}prefixLength(n){return n.prefix.length}},we=class{static fromUTF8(n,e=0,t=n.length){return new uE(n,e,t)}static fromUTF16(n,e=0,t=n.length){return new BE(n,e,t)}},Bi=class extends Error{constructor(n){super(n),this.name="RE2JSException"}},_e=class extends Bi{constructor(n,e=null){let t=`error parsing regexp: ${n}`;e&&(t+=`: \`${e}\``),super(t),this.name="RE2JSSyntaxException",this.message=t,this.error=n,this.input=e}getDescription(){return this.error}getPattern(){return this.input}},hE=class extends Bi{constructor(n){super(n),this.name="RE2JSCompileException"}},ot=class extends Bi{constructor(n){super(n),this.name="RE2JSGroupException"}},dE=class extends Bi{constructor(n){super(n),this.name="RE2JSFlagsException"}},Rr=class extends Bi{constructor(n){super(n),this.name="RE2JSInternalException"}},os,dB=(os=class{static quoteReplacement(e,t=!1){return t?e.indexOf("\\")<0&&e.indexOf("$")<0?e:e.split("").map(s=>{const r=s.codePointAt(0);return r===k.CODES.get("\\")||r===k.CODES.get("$")?`\\${s}`:s}).join(""):e.indexOf("$")<0?e:e.split("").map(s=>s.codePointAt(0)===k.CODES.get("$")?"$$":s).join("")}constructor(e,t){if(e===null)throw new Error("pattern is null");this.patternInput=e;const s=this.patternInput.re2();this.patternGroupCount=s.numberOfCapturingGroups(),this.groups=[],this.namedGroups=s.namedGroups,this.numberOfInstructions=s.numberOfInstructions(),t instanceof fs?this.resetMatcherInput(t):Q.isByteArray(t)?this.resetMatcherInput(rs.utf8(t)):this.resetMatcherInput(rs.utf16(t))}pattern(){return this.patternInput}reset(){return this.matcherInputLength=this.matcherInput.length(),this.appendPos=0,this.hasMatch=!1,this.hasGroups=!1,this.anchorFlag=0,this}resetMatcherInput(e){if(e===null)throw new Error("input is null");return e instanceof fs||(Q.isByteArray(e)?e=rs.utf8(e):e=rs.utf16(e)),this.matcherInput=e,this.reset(),this}start(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new ot(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e]}end(e=0){if(typeof e=="string"){const t=this.namedGroups[e];if(!Number.isFinite(t))throw new ot(`group '${e}' not found`);e=t}return this.loadGroup(e),this.groups[2*e+1]}programSize(){return this.numberOfInstructions}group(e=0){if(typeof e=="string"){const r=this.namedGroups[e];if(!Number.isFinite(r))throw new ot(`group '${e}' not found`);e=r}const t=this.start(e),s=this.end(e);return t<0&&s<0?null:this.substring(t,s)}getNamedGroups(){if(!this.hasMatch)throw new ot("perhaps no match attempted");const e=Object.create(null);for(const t of Object.keys(this.namedGroups))e[t]=this.group(t);return e}groupCount(){return this.patternGroupCount}loadGroup(e){if(e<0||e>this.patternGroupCount)throw new ot(`Group index out of bounds: ${e}`);if(!this.hasMatch)throw new ot("perhaps no match attempted");if(e===0||this.hasGroups)return;const t=this.matcherInputLength,s=this.patternInput.re2().matchMachineInput(this.matcherInput,this.groups[0],t,this.anchorFlag,1+this.patternGroupCount);if(!s[0])throw new ot("inconsistency in matching group data");this.groups=s[1],this.hasGroups=!0}matches(){return this.genMatch(0,U.ANCHOR_BOTH)}lookingAt(){return this.genMatch(0,U.ANCHOR_START)}find(e=null){if(e!==null){if(e<0||e>this.matcherInputLength)throw new ot(`start index out of bounds: ${e}`);return this.reset(),this.genMatch(e,0)}if(e=0,this.hasMatch&&(e=this.groups[1],this.groups[0]===this.groups[1])){const t=(this.matcherInput.isUTF16Encoding()?we.fromUTF16(this.matcherInput.asCharSequence(),0,this.matcherInputLength):we.fromUTF8(this.matcherInput.asBytes(),0,this.matcherInputLength)).step(e);t<0?e++:e+=t&7}return this.genMatch(e,U.UNANCHORED)}genMatch(e,t){const s=this.patternInput.re2().matchMachineInput(this.matcherInput,e,this.matcherInputLength,t,1);return s[0]?(this.groups=s[1],this.hasMatch=!0,this.hasGroups=this.patternGroupCount===0,this.anchorFlag=t,!0):(this.hasMatch=!1,!1)}substring(e,t){return this.matcherInput.isUTF8Encoding()?Q.utf8ByteArrayToString(this.matcherInput.asBytes().slice(e,t)):this.matcherInput.asCharSequence().substring(e,t).toString()}inputLength(){return this.matcherInputLength}appendReplacement(e,t=!1){let s="";const r=this.start(),i=this.end();return this.appendPos<r&&(s+=this.substring(this.appendPos,r)),this.appendPos=i,s+=t?this.appendReplacementInternalJava(e):this.appendReplacementInternalJs(e),s}appendReplacementInternalJava(e){let t="",s=0;const r=e.length;let i=0;for(;i<r;){const o=e.codePointAt(i);if(o===k.CODES.get("\\")){if(s<i&&(t+=e.substring(s,i)),i++,i>=r)throw new ot("character to be escaped is missing");s=i,i++;continue}if(o===k.CODES.get("$")){if(s<i&&(t+=e.substring(s,i)),i+1>=r)throw new ot("Illegal group reference: group index is missing");const a=e.codePointAt(i+1);if(k.CODES.get("0")<=a&&a<=k.CODES.get("9")){let c=a-k.CODES.get("0"),u=i+2;for(;u<r;u++){const f=e.codePointAt(u);if(f<k.CODES.get("0")||f>k.CODES.get("9")||c*10+f-k.CODES.get("0")>this.patternGroupCount)break;c=c*10+f-k.CODES.get("0")}if(c>this.patternGroupCount)throw new ot(`n > number of groups: ${c}`);const h=this.group(c);h!==null&&(t+=h),i=u,s=i}else if(a===k.CODES.get("{")){let c=i+2;for(;c<r&&e.codePointAt(c)!==k.CODES.get("}");)c++;if(c>=r)throw new ot("named capture group is missing trailing '}'");const u=e.substring(i+2,c),h=this.group(u);h!==null&&(t+=h),i=c+1,s=i}else throw new ot("Illegal group reference");continue}i++}return s<r&&(t+=e.substring(s,r)),t}appendReplacementInternalJs(e){let t="",s=0;const r=e.length;for(let i=0;i<r-1;i++)if(e.codePointAt(i)===k.CODES.get("$")){let o=e.codePointAt(i+1);if(k.CODES.get("$")===o){s<i&&(t+=e.substring(s,i)),t+="$",i++,s=i+1;continue}else if(k.CODES.get("&")===o){s<i&&(t+=e.substring(s,i));const a=this.group(0);a!==null?t+=a:t+="$&",i++,s=i+1;continue}else if(k.CODES.get("`")===o){s<i&&(t+=e.substring(s,i)),t+=this.substring(0,this.start(0)),i++,s=i+1;continue}else if(k.CODES.get("'")===o){s<i&&(t+=e.substring(s,i)),t+=this.substring(this.end(0),this.matcherInputLength),i++,s=i+1;continue}else if(k.CODES.get("1")<=o&&o<=k.CODES.get("9")){let a=o-k.CODES.get("0");for(s<i&&(t+=e.substring(s,i)),i+=2;i<r&&(o=e.codePointAt(i),!(o<k.CODES.get("0")||o>k.CODES.get("9")||a*10+o-k.CODES.get("0")>this.patternGroupCount));i++)a=a*10+o-k.CODES.get("0");if(a>this.patternGroupCount){t+=`$${a}`,s=i,i--;continue}const c=this.group(a);c!==null&&(t+=c),s=i,i--;continue}else if(o===k.CODES.get("<")){s<i&&(t+=e.substring(s,i)),i++;let a=i+1;for(;a<e.length&&e.codePointAt(a)!==k.CODES.get(">")&&e.codePointAt(a)!==k.CODES.get(" ");)a++;if(a===e.length||e.codePointAt(a)!==k.CODES.get(">")){t+=e.substring(i-1,a+1),s=a+1,i=a;continue}const c=e.substring(i+1,a);if(Object.prototype.hasOwnProperty.call(this.namedGroups,c)){const u=this.group(c);u!==null&&(t+=u)}else t+=`$<${c}>`;s=a+1,i=a;continue}}return s<r&&(t+=e.substring(s,r)),t}appendTail(){return this.substring(this.appendPos,this.matcherInputLength)}replaceAll(e,t=!1){return this.replace(e,!0,t)}replaceFirst(e,t=!1){return this.replace(e,!1,t)}replace(e,t=!0,s=!1){let r="";this.reset();const i=typeof e=="function",o=Object.keys(this.namedGroups).length>0;let a=null;if(i){if(this.groupCount()>=os.MAX_REPLACER_ARGS)throw new ot("Too many capture groups to safely invoke replacer function");a=this.matcherInput.isUTF8Encoding()?this.matcherInput.asBytes():this.matcherInput.asCharSequence()}for(;this.find()&&(r+=i?this.appendReplacementFunc(e,o,a):this.appendReplacement(e,s),!!t););return r+=this.appendTail(),r}appendReplacementFunc(e,t,s){let r="";const i=this.start(),o=this.end();this.appendPos<i&&(r+=this.substring(this.appendPos,i)),this.appendPos=o;const a=this.buildReplacerArgs(i,t,s);return r+=String(e(...a)),r}buildReplacerArgs(e,t,s){const r=[this.group(0)],i=this.groupCount();for(let o=1;o<=i;o++){const a=this.start(o);a<0?r.push(void 0):r.push(this.substring(a,this.end(o)))}if(r.push(e),r.push(s),t){const o=this.getNamedGroups();for(const a in o)o[a]===null&&(o[a]=void 0);r.push(o)}return r}},G(os,"MAX_REPLACER_ARGS",65535),os),he,L=(he=class{static isRuneOp(e){return he.RUNE<=e&&e<=he.RUNE_ANY_NOT_NL}static escapeRunes(e){let t='"';for(let s of e)t+=Q.escapeRune(s);return t+='"',t}constructor(e){this.op=e,this.out=0,this.arg=0,this.runes=[],this.next=null}matchRune(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&U.FOLD_CASE)!==0?z.equalsIgnoreCase(o,e):e===o}const t=this.runes.length;if(t===0)return!1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return!1;if(e<=this.runes[o+1])return!0}return!1}let s=0,r=t>>1;for(;r>1;){const o=r>>1;s+=this.runes[s+o<<1]<=e?o:0,r-=o}s+=this.runes[s<<1]<=e?1:0;const i=s-1;return i>=0&&e<=this.runes[i<<1|1]}matchRunePos(e){if(this.runes.length===1){const o=this.runes[0];return(this.arg&U.FOLD_CASE)!==0?z.equalsIgnoreCase(o,e)?0:-1:e===o?0:-1}const t=this.runes.length;if(t===0)return-1;if(t===2||t===4||t===6||t===8){for(let o=0;o<t;o+=2){if(e<this.runes[o])return-1;if(e<=this.runes[o+1])return Math.floor(o/2)}return-1}let s=0,r=t>>1;for(;r>1;){const o=r>>1;s+=this.runes[s+o<<1]<=e?o:0,r-=o}s+=this.runes[s<<1]<=e?1:0;const i=s-1;return i>=0&&e<=this.runes[i<<1|1]?i:-1}toString(){switch(this.op){case he.ALT:return`alt -> ${this.out}, ${this.arg}`;case he.ALT_MATCH:return`altmatch -> ${this.out}, ${this.arg}`;case he.CAPTURE:return`cap ${this.arg} -> ${this.out}`;case he.EMPTY_WIDTH:return`empty ${this.arg} -> ${this.out}`;case he.MATCH:return`match${this.arg!==0?` ${this.arg}`:""}`;case he.FAIL:return"fail";case he.NOP:return`nop -> ${this.out}`;case he.LB_WRITE:return`lbwrite ${this.arg} -> ${this.out}`;case he.LB_CHECK:return`lbcheck ${this.arg} -> ${this.out}`;case he.RUNE:return this.runes===null?"rune <null>":["rune ",he.escapeRunes(this.runes),(this.arg&U.FOLD_CASE)!==0?"/i":""," -> ",this.out].join("");case he.RUNE1:return`rune1 ${he.escapeRunes(this.runes)} -> ${this.out}`;case he.RUNE_ANY:return`any -> ${this.out}`;case he.RUNE_ANY_NOT_NL:return`anynotnl -> ${this.out}`;default:throw new Error("unhandled case in Inst.toString")}}},G(he,"ALT",1),G(he,"ALT_MATCH",2),G(he,"CAPTURE",3),G(he,"EMPTY_WIDTH",4),G(he,"FAIL",5),G(he,"MATCH",6),G(he,"NOP",7),G(he,"RUNE",8),G(he,"RUNE1",9),G(he,"RUNE_ANY",10),G(he,"RUNE_ANY_NOT_NL",11),G(he,"LB_WRITE",12),G(he,"LB_CHECK",13),he),fB=class{constructor(n){this.sparse=new Int32Array(n),this.densePcs=new Int32Array(n),this.denseCaps=null,this.size=0,this.ncap=0}init(n){this.ncap=n;const e=this.densePcs.length*n;(!this.denseCaps||this.denseCaps.length<e)&&(this.denseCaps=new Int32Array(e))}contains(n){const e=this.sparse[n];return e<this.size&&this.densePcs[e]===n}isEmpty(){return this.size===0}add(n){const e=this.size++;return this.sparse[n]=e,this.densePcs[e]=n,e}clear(){this.size=0}toString(){let n="{";for(let e=0;e<this.size;e++)e!==0&&(n+=", "),n+=this.densePcs[e];return n+="}",n}},fE=class hl{static fromRE2(e){const t=new hl;return t.prog=e.prog,t.re2=e,t.q0=new fB(t.prog.numInst()),t.q1=new fB(t.prog.numInst()),t.matched=!1,t.matchcap=new Int32Array(t.prog.numCap<2?2:t.prog.numCap),t.ncap=0,t}static fromMachine(e){return hl.fromRE2(e.re2)}constructor(){this.prog=null,this.re2=null,this.q0=null,this.q1=null,this.matched=!1,this.matchcap=null,this.ncap=0,this.lbTable=null}init(e){this.ncap=e,e>this.matchcap.length?this.matchcap=new Int32Array(e).fill(-1):this.matchcap.fill(-1),this.q0.init(e),this.q1.init(e),this.prog.numLb>0&&((!this.lbTable||this.lbTable.length<this.prog.numLb+1)&&(this.lbTable=new Int32Array(this.prog.numLb+1)),this.lbTable.fill(-1))}submatches(){return this.ncap===0?Q.emptyInts():Q.toArray(this.matchcap.subarray(0,this.ncap))}match(e,t,s){const r=this.re2.cond;if(r===Q.EMPTY_ALL||(s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&t!==0)return!1;this.matched=!1,this.matchcap.fill(-1);let i=this.prog.numLb>0?0:t,o=t,a=this.q0,c=this.q1,u=e.step(i),h=u>>3,f=u&7,p=-1,g=0;u!==rt.EOF()&&(u=e.step(i+f),p=u>>3,g=u&7);let D;for(i===0?D=Q.emptyOpContext(-1,h):D=e.context(i);;){if(a.isEmpty()){if((r&Q.EMPTY_BEGIN_TEXT)!==0&&i!==0||(s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&i!==0||this.matched)break;if(this.prog.numLb===0&&this.re2.prefix.length!==0&&p!==this.re2.prefixRune&&e.canCheckPrefix()){const O=e.index(this.re2,i);if(O<0)break;i+=O,u=e.step(i),h=u>>3,f=u&7,u=e.step(i+f),p=u>>3,g=u&7,D=e.context(i)}}if(i===0&&this.prog.numLb>0)for(let O=0;O<this.prog.lbStarts.length;O++)this.add(a,this.prog.lbStarts[O],i,this.matchcap,0,D);!this.matched&&(i===0||s===U.UNANCHORED)&&i>=o&&(this.ncap>0&&(this.matchcap[0]=i),this.add(a,this.prog.start,i,this.matchcap,0,D));const R=i+f;if(D=e.context(R),this.step(a,c,i,R,h,D,s,i===e.endPos()),f===0||this.ncap===0&&this.matched)break;i+=f,h=p,f=g,h!==-1&&(u=e.step(i+f),p=u>>3,g=u&7);const M=a;a=c,c=M}return c.clear(),this.matched}matchSet(e,t,s){const r=this.re2.cond;if(r===Q.EMPTY_ALL)return[];if((s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&t!==0)return[];let i=this.prog.numLb>0?0:t,o=t,a=this.q0,c=this.q1,u=e.step(i),h=u>>3,f=u&7,p=-1,g=0;u!==rt.EOF()&&(u=e.step(i+f),p=u>>3,g=u&7);let D=i===0?Q.emptyOpContext(-1,h):e.context(i);const R=new Set;for(;!(a.isEmpty()&&((r&Q.EMPTY_BEGIN_TEXT)!==0&&i!==0||(s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&i!==0));){if(i===0&&this.prog.numLb>0)for(let H=0;H<this.prog.lbStarts.length;H++)this.add(a,this.prog.lbStarts[H],i,this.matchcap,0,D);(i===0||s===U.UNANCHORED)&&i>=o&&this.add(a,this.prog.start,i,this.matchcap,0,D);const M=i+f;D=e.context(M);for(let H=0;H<a.size;H++){const Z=a.densePcs[H],ae=this.prog.inst[Z],oe=H*this.ncap;let se=!1;switch(ae.op){case L.MATCH:if(s===U.ANCHOR_BOTH&&i!==e.endPos())break;R.add(ae.arg);break;case L.RUNE:se=ae.matchRune(h);break;case L.RUNE1:se=h===ae.runes[0];break;case L.RUNE_ANY:se=!0;break;case L.RUNE_ANY_NOT_NL:se=h!==10;break;default:continue}se&&this.add(c,ae.out,M,a.denseCaps,oe,D)}if(a.clear(),f===0)break;i+=f,h=p,f=g,h!==-1&&(u=e.step(i+f),p=u>>3,g=u&7);const O=a;a=c,c=O}return c.clear(),Array.from(R).sort((M,O)=>M-O)}step(e,t,s,r,i,o,a,c){const u=this.re2.longest;for(let h=0;h<e.size;h++){const f=e.densePcs[h],p=h*this.ncap;if(u&&this.matched&&this.ncap>0&&this.matchcap[0]<e.denseCaps[p])continue;const g=this.prog.inst[f];let D=!1;switch(g.op){case L.MATCH:if(a===U.ANCHOR_BOTH&&!c)break;if(this.ncap>0&&(!u||!this.matched||this.matchcap[1]<s)){e.denseCaps[p+1]=s;for(let R=0;R<this.ncap;R++)this.matchcap[R]=e.denseCaps[p+R]}u||(e.size=0),this.matched=!0;break;case L.RUNE:D=g.matchRune(i);break;case L.RUNE1:D=i===g.runes[0];break;case L.RUNE_ANY:D=!0;break;case L.RUNE_ANY_NOT_NL:D=i!==10;break;default:continue}D&&this.add(t,g.out,r,e.denseCaps,p,o)}e.clear()}add(e,t,s,r,i,o){for(;;){if(t===0||e.contains(t))return;const a=e.add(t),c=this.prog.inst[t];switch(c.op){case L.FAIL:return;case L.ALT:case L.ALT_MATCH:this.add(e,c.out,s,r,i,o),t=c.arg;continue;case L.EMPTY_WIDTH:if((c.arg&~o)===0){t=c.out;continue}return;case L.NOP:t=c.out;continue;case L.CAPTURE:if(c.arg<this.ncap){const u=r[i+c.arg];r[i+c.arg]=s,this.add(e,c.out,s,r,i,o),r[i+c.arg]=u;return}else{t=c.out;continue}case L.LB_WRITE:this.lbTable[Math.abs(c.arg)]=s,t=c.out;continue;case L.LB_CHECK:if(c.arg>0){if(this.lbTable[c.arg]===s){t=c.out;continue}}else if(this.lbTable[-c.arg]!==s){t=c.out;continue}return;case L.MATCH:case L.RUNE:case L.RUNE1:case L.RUNE_ANY:case L.RUNE_ANY_NOT_NL:if(this.ncap>0){const u=a*this.ncap;for(let h=0;h<this.ncap;h++)e.denseCaps[u+h]=r[i+h]}return;default:throw new Rr("unhandled")}}}};const pB=n=>{let e=-2128831035;for(let t=0;t<n.length;t++)e^=n[t],e=Math.imul(e,16777619);return e},pE=(n,e)=>{if(n.length!==e.length)return!1;for(let t=0;t<n.length;t++)if(n[t]!==e[t])return!1;return!0};var mE=class{constructor(n,e,t=[]){this.nfaStates=n,this.isMatch=e,this.matchIDs=t,this.nextLatin1=new Array(z.MAX_LATIN1+1).fill(null),this.nextLatin1Anchored=new Array(z.MAX_LATIN1+1).fill(null),this.transKeys=[],this.transVals=[],this.lastSeen=0}},Wt,gE=(Wt=class{constructor(e,t=8388608){this.prog=e,this.stateCache=new Map,this.stateCount=0,this.startState=null,this.stateLimit=Math.max(1,Math.floor(t/Wt.STATE_MEMORY_ESTIMATE)),this.cacheClears=0,this.failed=!1,this.clock=0}computeClosure(e){const t=new Set,s=[...e];let r=!1;const i=[];for(;s.length>0;){const a=s.pop();if(t.has(a))continue;t.add(a);const c=this.prog.getInst(a);switch(c.op){case L.MATCH:r=!0,i.includes(c.arg)||i.push(c.arg);break;case L.ALT:case L.ALT_MATCH:s.push(c.out),s.push(c.arg);break;case L.NOP:case L.CAPTURE:s.push(c.out);break;case L.EMPTY_WIDTH:case L.LB_WRITE:case L.LB_CHECK:return null}}const o=Int32Array.from(t).sort();return i.sort((a,c)=>a-c),{pcs:o,isMatch:r,matchIDs:i}}getState(e){const t=this.computeClosure(e);if(!t)return null;const s=t.pcs,r=pB(s);let i=this.stateCache.get(r);if(i)for(let a=0;a<i.length;a++){const c=i[a];if(pE(c.nfaStates,s))return c.lastSeen=++this.clock,c}else i=[],this.stateCache.set(r,i);if(this.failed)return null;if(this.stateCount>=this.stateLimit){if(this.cacheClears++,this.cacheClears>=Wt.MAX_CACHE_CLEARS)return this.failed=!0,this.stateCache.clear(),this.stateCount=0,this.startState=null,null;this.evictCache(),i=this.stateCache.get(r),i||(i=[],this.stateCache.set(r,i))}const o=new mE(s,t.isMatch,t.matchIDs);return o.lastSeen=++this.clock,i.push(o),this.stateCount++,o}evictCache(){const e=[];for(const o of this.stateCache.values())for(let a=0;a<o.length;a++)e.push(o[a]);e.sort((o,a)=>o.lastSeen-a.lastSeen);const t=Math.max(1,Math.floor(this.stateLimit/2)),s=e.length-t,r=e.slice(s),i=new Set(r);this.stateCache.clear(),this.stateCount=0;for(let o=0;o<r.length;o++){const a=r[o];a.nextLatin1.fill(null),a.nextLatin1Anchored.fill(null),a.transKeys.length=0,a.transVals.length=0;const c=pB(a.nfaStates);let u=this.stateCache.get(c);u||(u=[],this.stateCache.set(c,u)),u.push(a),this.stateCount++}this.startState&&!i.has(this.startState)&&(this.startState=null)}step(e,t,s){if(t<=z.MAX_LATIN1)if(s===U.UNANCHORED){const o=e.nextLatin1[t];if(o!==null)return o}else{const o=e.nextLatin1Anchored[t];if(o!==null)return o}else{const o=t+(s===U.UNANCHORED?0:z.MAX_RUNE+1),a=e.transKeys,c=a.length;for(let u=0;u<c;u++)if(a[u]===o)return e.transVals[u]}const r=[];for(let o=0;o<e.nfaStates.length;o++){const a=e.nfaStates[o],c=this.prog.getInst(a);L.isRuneOp(c.op)&&c.matchRune(t)&&r.push(c.out)}s===U.UNANCHORED&&r.push(this.prog.start);const i=this.getState(r);if(t<=z.MAX_LATIN1)s===U.UNANCHORED?e.nextLatin1[t]=i:e.nextLatin1Anchored[t]=i;else{const o=t+(s===U.UNANCHORED?0:z.MAX_RUNE+1);e.transKeys.push(o),e.transVals.push(i)}return i}match(e,t,s){if((s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&t!==0)return!1;if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let r=e.endPos(),i=this.startState;if(i.isMatch)if(s===U.ANCHOR_BOTH){if(t===r)return!0}else return!0;let o=t;for(;o<r;){const a=e.step(o),c=a>>3,u=a&7;if(u===0)break;if(i=s===U.UNANCHORED&&c<=z.MAX_LATIN1&&i.nextLatin1[c]||this.step(i,c,s),i===null)return null;if(i.lastSeen=++this.clock,i.isMatch)if(s===U.ANCHOR_BOTH){if(o+u===r)return!0}else return!0;if(i.nfaStates.length===0&&s!==U.UNANCHORED)return!1;o+=u}return!1}matchSet(e,t,s){if((s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&t!==0)return[];if(!this.startState&&(this.startState=this.getState([this.prog.start]),!this.startState))return null;let r=e.endPos(),i=this.startState;const o=new Set,a=(u,h)=>{u.isMatch&&(s===U.ANCHOR_BOTH?h===r&&u.matchIDs.forEach(f=>o.add(f)):u.matchIDs.forEach(f=>o.add(f)))};a(i,t);let c=t;for(;c<r;){const u=e.step(c),h=u>>3,f=u&7;if(f===0)break;if(i=s===U.UNANCHORED&&h<=z.MAX_LATIN1&&i.nextLatin1[h]||this.step(i,h,s),i===null)return null;if(i.lastSeen=++this.clock,c+=f,a(i,c),i.nfaStates.length===0&&s!==U.UNANCHORED)break}return Array.from(o).sort((u,h)=>u-h)}},G(Wt,"MAX_CACHE_CLEARS",5),G(Wt,"STATE_MEMORY_ESTIMATE",838),Wt);const CE=32,yE=500,$a=256,EE=256*1024;var _E=class{constructor(){this.end=0,this.cap=new Int32Array(0),this.matchcap=new Int32Array(0),this.ncap=0,this.jobPc=new Int32Array($a),this.jobArg=new Uint8Array($a),this.jobPos=new Int32Array($a),this.jobLen=0,this.visited=new Uint32Array(0)}reset(n,e,t){this.end=e,this.jobLen=0,this.ncap=t;const s=n.numInst()*(e+1)+CE-1>>>5;this.visited.length<s?this.visited=new Uint32Array(s):this.visited.fill(0,0,s),this.cap.length<t?this.cap=new Int32Array(t).fill(-1):this.cap.fill(-1,0,t),this.matchcap.length<t?this.matchcap=new Int32Array(t).fill(-1):this.matchcap.fill(-1,0,t)}shouldVisit(n,e){const t=n*(this.end+1)+e,s=t>>>5,r=1<<(t&31);return(this.visited[s]&r)!==0?!1:(this.visited[s]|=r,!0)}push(n,e,t,s){if(n.prog.getInst(e).op!==L.FAIL&&(s||this.shouldVisit(e,t))){if(this.jobLen>=this.jobPc.length){const r=this.jobPc.length*2,i=new Int32Array(r);i.set(this.jobPc),this.jobPc=i;const o=new Uint8Array(r);o.set(this.jobArg),this.jobArg=o;const a=new Int32Array(r);a.set(this.jobPos),this.jobPos=a}this.jobPc[this.jobLen]=e,this.jobArg[this.jobLen]=s?1:0,this.jobPos[this.jobLen]=t,this.jobLen++}}tryBacktrack(n,e,t,s,r){const i=n.longest;for(this.push(n,t,s,!1);this.jobLen>0;){this.jobLen--;let o=this.jobPc[this.jobLen],a=this.jobArg[this.jobLen]===1,c=this.jobPos[this.jobLen],u=!0;for(;!(!u&&!this.shouldVisit(o,c));){u=!1;const h=n.prog.getInst(o);switch(h.op){case L.FAIL:throw new Rr("unexpected InstFail");case L.ALT:if(a){a=!1,o=h.arg;continue}else{this.push(n,o,c,!0),o=h.out;continue}case L.ALT_MATCH:{const f=n.prog.getInst(h.out);if(L.isRuneOp(f.op)){this.push(n,h.arg,c,!1),o=h.arg,c=this.end;continue}this.push(n,h.out,this.end,!1),o=h.out;continue}case L.RUNE:{const f=e.step(c);if(f===rt.EOF()||!h.matchRune(f>>3))break;c+=f&7,o=h.out;continue}case L.RUNE1:{const f=e.step(c);if(f===rt.EOF()||f>>3!==h.runes[0])break;c+=f&7,o=h.out;continue}case L.RUNE_ANY_NOT_NL:{const f=e.step(c);if(f===rt.EOF()||f>>3===10)break;c+=f&7,o=h.out;continue}case L.RUNE_ANY:{const f=e.step(c);if(f===rt.EOF())break;c+=f&7,o=h.out;continue}case L.CAPTURE:if(a){this.cap[h.arg]=c;break}else{h.arg<this.ncap&&(this.push(n,o,this.cap[h.arg],!0),this.cap[h.arg]=c),o=h.out;continue}case L.EMPTY_WIDTH:{const f=e.context(c);if((h.arg&~f)!==0)break;o=h.out;continue}case L.NOP:o=h.out;continue;case L.MATCH:{if(r===U.ANCHOR_BOTH&&c!==this.end)break;if(this.ncap===0)return!0;this.ncap>1&&(this.cap[1]=c);const f=this.matchcap[1];if((f===-1||i&&c>0&&c>f)&&this.matchcap.set(this.cap),!i||c===this.end)return!0;break}case L.LB_WRITE:case L.LB_CHECK:throw new Rr("Backtracker cannot evaluate Lookbehind instructions");default:throw new Rr("bad inst")}break}}return i&&this.matchcap.length>1&&this.matchcap[1]>=0}};const Gi=[];var $i=class Gd{static shouldBacktrack(e){return e.numInst()<=yE}static maxBitStateLen(e){return Gd.shouldBacktrack(e)?Math.floor(EE/e.numInst()):0}static execute(e,t,s,r,i){const o=e.cond;if(o===Q.EMPTY_ALL||(r===U.ANCHOR_START||r===U.ANCHOR_BOTH)&&s!==0||(o&Q.EMPTY_BEGIN_TEXT)!==0&&s!==0)return null;const a=Gi.length>0?Gi.pop():new _E,c=t.endPos();a.reset(e.prog,c,i);let u=!1;if((o&Q.EMPTY_BEGIN_TEXT)!==0||r===U.ANCHOR_START||r===U.ANCHOR_BOTH)a.ncap>0&&(a.cap[0]=s),a.tryBacktrack(e,t,e.prog.start,s,r)&&(u=!0);else{let f=-1;for(;s<=c&&f!==0;s+=f){if(e.prefix.length>0){const g=t.index(e,s);if(g<0)break;s+=g}if(a.ncap>0&&(a.cap[0]=s),a.tryBacktrack(e,t,e.prog.start,s,r)){u=!0;break}const p=t.step(s);f=p===rt.EOF()?0:p&7}}if(!u)return Gi.push(a),null;const h=i===0?[]:Q.toArray(a.matchcap.subarray(0,i));return Gi.push(a),h}},mB=class{constructor(n){this.sparse=new Uint32Array(n),this.dense=new Uint32Array(n),this.size=0,this.nextIndex=0}empty(){return this.nextIndex>=this.size}next(){return this.dense[this.nextIndex++]}clear(){this.size=0,this.nextIndex=0}contains(n){return n<this.sparse.length&&this.sparse[n]<this.size&&this.dense[this.sparse[n]]===n}insert(n){this.contains(n)||this.insertNew(n)}insertNew(n){n>=this.sparse.length||(this.sparse[n]=this.size,this.dense[this.size]=n,this.size++)}};const vE=(n,e,t,s)=>{const r=n.length,i=e.length;let o=0,a=0;const c=[],u=[];let h=!0,f=-1;const p=g=>{const D=g?n:e,R=g?o:a,M=g?t:s;return f>0&&D[R]<=c[f]?!1:(c.push(D[R],D[R+1]),g?o+=2:a+=2,f+=2,u.push(M),!0)};for(;o<r||a<i;)if(a>=i?h=p(!0):o>=r||e[a]<n[o]?h=p(!1):h=p(!0),!h)return null;return{merged:c,next:u}};var DE=class{constructor(n){this.start=n.start,this.numCap=n.numCap,this.inst=new Array(n.inst.length);for(let e=0;e<n.inst.length;e++){const t=n.inst[e],s=new L(t.op);s.out=t.out,s.arg=t.arg,s.runes=t.runes?t.runes.slice():[],s.next=null,this.inst[e]=s}}};const wE=n=>{const e=new DE(n);for(let t=0;t<e.inst.length;t++){const s=e.inst[t];if(s.op!==L.ALT&&s.op!==L.ALT_MATCH)continue;let r="out",i="arg",o=e.inst[s[i]];if(o.op!==L.ALT&&o.op!==L.ALT_MATCH&&(r="arg",i="out",o=e.inst[s[i]],o.op!==L.ALT&&o.op!==L.ALT_MATCH))continue;const a=e.inst[s[r]];if(a.op===L.ALT||a.op===L.ALT_MATCH)continue;let c="out",u="arg",h=!1;o.out===t?h=!0:o.arg===t&&(h=!0,c="arg",u="out"),h&&(o[c]=s[r]),s[r]===o[c]&&(s[i]=o[u])}return e},IE=n=>{if(n.inst.length>=1e3)return null;const e=new mB(n.inst.length),t=new mB(n.inst.length),s=new Array(n.inst.length),r=new Array(n.inst.length).fill(!1),i=o=>{let a=!0;const c=n.inst[o];if(t.contains(o))return!0;switch(t.insert(o),c.op){case L.ALT:case L.ALT_MATCH:{a=i(c.out)&&i(c.arg);let u=r[c.out],h=r[c.arg];if(u&&h)return!1;if(h){const D=c.out;c.out=c.arg,c.arg=D;const R=u;u=h,h=R}u&&(r[o]=!0,c.op=L.ALT_MATCH);const f=s[c.out]||[],p=s[c.arg]||[],g=vE(f,p,c.out,c.arg);if(!g)return!1;s[o]=g.merged,c.next=new Uint32Array(g.next);break}case L.CAPTURE:case L.EMPTY_WIDTH:case L.NOP:a=i(c.out),r[o]=r[c.out],s[o]=s[c.out]?s[c.out].slice():[],c.next=new Uint32Array(Math.floor(s[o].length/2)+1).fill(c.out);break;case L.MATCH:case L.FAIL:r[o]=c.op===L.MATCH;break;case L.RUNE:{if(r[o]=!1,c.next&&c.next.length>0)break;if(e.insert(c.out),!c.runes||c.runes.length===0){s[o]=[],c.next=new Uint32Array([c.out]);break}let u=[];if(c.runes.length===1&&(c.arg&U.FOLD_CASE)!==0){const h=c.runes[0];u.push(h,h);for(let f=z.simpleFold(h);f!==h;f=z.simpleFold(f))u.push(f,f);u.sort((f,p)=>f-p)}else for(let h=0;h<c.runes.length;h++)u.push(c.runes[h]);s[o]=u,c.next=new Uint32Array(Math.floor(u.length/2)+1).fill(c.out),c.op=L.RUNE;break}case L.RUNE1:{if(r[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out);let u=[];if((c.arg&U.FOLD_CASE)!==0){const h=c.runes[0];u.push(h,h);for(let f=z.simpleFold(h);f!==h;f=z.simpleFold(f))u.push(f,f);u.sort((f,p)=>f-p)}else u.push(c.runes[0],c.runes[0]);s[o]=u,c.next=new Uint32Array(Math.floor(u.length/2)+1).fill(c.out),c.op=L.RUNE;break}case L.RUNE_ANY:if(r[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out),s[o]=[0,z.MAX_RUNE],c.next=new Uint32Array([c.out]);break;case L.RUNE_ANY_NOT_NL:if(r[o]=!1,c.next&&c.next.length>0)break;e.insert(c.out),s[o]=[0,9,11,z.MAX_RUNE],c.next=new Uint32Array(Math.floor(s[o].length/2)+1).fill(c.out);break}return a};for(e.clear(),e.insert(n.start);!e.empty();)if(t.clear(),!i(e.next()))return null;for(let o=0;o<n.inst.length;o++)s[o]&&(n.inst[o].runes=s[o]);return n},TE=(n,e)=>{for(let t=0;t<e.inst.length;t++){const s=e.inst[t];switch(s.op){case L.ALT:case L.ALT_MATCH:case L.RUNE:break;case L.CAPTURE:case L.EMPTY_WIDTH:case L.NOP:case L.MATCH:case L.FAIL:n.inst[t].next=null;break;case L.RUNE1:case L.RUNE_ANY:case L.RUNE_ANY_NOT_NL:n.inst[t].next=null,n.inst[t].op=s.op,n.inst[t].runes=s.runes?s.runes.slice():[];break}}};var gB=class $d{static compile(e){if(e.start===0||e.numLb>0)return null;const t=e.inst[e.start];if(t.op!==L.EMPTY_WIDTH||(t.arg&Q.EMPTY_BEGIN_TEXT)===0)return null;let s=!1;for(let i=0;i<e.inst.length;i++)if(e.inst[i].op===L.ALT||e.inst[i].op===L.ALT_MATCH){s=!0;break}for(let i=0;i<e.inst.length;i++){const o=e.inst[i],a=e.inst[o.out].op;switch(o.op){case L.ALT:case L.ALT_MATCH:if(a===L.MATCH||e.inst[o.arg].op===L.MATCH)return null;break;case L.EMPTY_WIDTH:if(a===L.MATCH){if((o.arg&Q.EMPTY_END_TEXT)===Q.EMPTY_END_TEXT)continue;return null}break;default:if(a===L.MATCH&&s)return null;break}}let r=wE(e);return r=IE(r),r!==null&&TE(r,e),r}static next(e,t){const s=e.matchRunePos(t);return s>=0?e.next[s]:e.op===L.ALT_MATCH?e.out:0}static execute(e,t,s,r,i){const o=e.onepass;if(!o)return null;const a=new Int32Array(i).fill(-1);let c=!1,u=t.step(s),h=u>>3,f=u&7,p=rt.EOF(),g=-1,D=0;u!==rt.EOF()&&(p=t.step(s+f),p!==rt.EOF()&&(g=p>>3,D=p&7));let R=s===0?Q.emptyOpContext(-1,h):t.context(s),M=o.start,O;for(;;){switch(O=o.inst[M],M=O.out,O.op){case L.MATCH:return r===U.ANCHOR_BOTH&&s!==t.endPos()?null:(c=!0,a.length>0&&(a[0]=0,a[1]=s),i===0?[]:Q.toArray(a));case L.RUNE:if(!O.matchRune(h))return null;break;case L.RUNE1:if(h!==O.runes[0])return null;break;case L.RUNE_ANY:break;case L.RUNE_ANY_NOT_NL:if(h===10)return null;break;case L.ALT:case L.ALT_MATCH:M=$d.next(O,h);continue;case L.FAIL:return null;case L.NOP:continue;case L.EMPTY_WIDTH:if((O.arg&~R)!==0)return null;continue;case L.CAPTURE:O.arg<a.length&&(a[O.arg]=s);continue;default:throw new Rr("bad inst")}if(f===0)break;R=Q.emptyOpContext(h,g),s+=f,h=g,f=D,h!==-1&&(p=t.step(s+f),p!==rt.EOF()?(g=p>>3,D=p&7):(g=-1,D=0))}return c?i===0?[]:Q.toArray(a):null}},X,b=(X=class{static isPseudoOp(e){return e>=X.Op.LEFT_PAREN}static emptySubs(){return[]}static quoteIfHyphen(e){return e===k.CODES.get("-")?"\\":""}static fromRegexp(e){const t=new X(e.op);return t.flags=e.flags,t.subs=e.subs,t.runes=e.runes,t.cap=e.cap,t.min=e.min,t.max=e.max,t.name=e.name,t.namedGroups=e.namedGroups,t.lb=e.lb,t}constructor(e){this.op=e,this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.min=0,this.max=0,this.cap=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}reinit(){this.flags=0,this.subs=X.emptySubs(),this.runes=[],this.cap=0,this.min=0,this.max=0,this.name=null,this.namedGroups=Object.create(null),this.lb=0}toString(){return this.appendTo()}appendTo(){let e="";switch(this.op){case X.Op.NO_MATCH:e+="[^\\x00-\\x{10FFFF}]";break;case X.Op.EMPTY_MATCH:e+="(?:)";break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:case X.Op.REPEAT:{const t=this.subs[0];switch(t.op>X.Op.CAPTURE||t.op===X.Op.LITERAL&&t.runes.length>1?e+=`(?:${t.appendTo()})`:e+=t.appendTo(),this.op){case X.Op.STAR:e+="*";break;case X.Op.PLUS:e+="+";break;case X.Op.QUEST:e+="?";break;case X.Op.REPEAT:e+=`{${this.min}`,this.min!==this.max&&(e+=",",this.max>=0&&(e+=this.max)),e+="}";break}(this.flags&U.NON_GREEDY)!==0&&(e+="?");break}case X.Op.CONCAT:for(let t of this.subs)t.op===X.Op.ALTERNATE?e+=`(?:${t.appendTo()})`:e+=t.appendTo();break;case X.Op.ALTERNATE:{let t="";for(let s of this.subs)e+=t,t="|",e+=s.appendTo();break}case X.Op.LITERAL:(this.flags&U.FOLD_CASE)!==0&&(e+="(?i:");for(let t of this.runes)e+=Q.escapeRune(t);(this.flags&U.FOLD_CASE)!==0&&(e+=")");break;case X.Op.ANY_CHAR_NOT_NL:e+="(?-s:.)";break;case X.Op.ANY_CHAR:e+="(?s:.)";break;case X.Op.PLB:e+=`(?<=${this.subs[0].appendTo()})`;break;case X.Op.NLB:e+=`(?<!${this.subs[0].appendTo()})`;break;case X.Op.CAPTURE:this.name===null||this.name.length===0?e+="(":e+=`(?P<${this.name}>`,this.subs[0].op!==X.Op.EMPTY_MATCH&&(e+=this.subs[0].appendTo()),e+=")";break;case X.Op.BEGIN_TEXT:e+="\\A";break;case X.Op.END_TEXT:(this.flags&U.WAS_DOLLAR)!==0?e+="(?-m:$)":e+="\\z";break;case X.Op.BEGIN_LINE:e+="^";break;case X.Op.END_LINE:e+="$";break;case X.Op.WORD_BOUNDARY:e+="\\b";break;case X.Op.NO_WORD_BOUNDARY:e+="\\B";break;case X.Op.CHAR_CLASS:if(this.runes.length%2!==0){e+="[invalid char class]";break}if(e+="[",this.runes.length===0)e+="^\\x00-\\x{10FFFF}";else if(this.runes[0]===0&&this.runes[this.runes.length-1]===z.MAX_RUNE){e+="^";for(let t=1;t<this.runes.length-1;t+=2){const s=this.runes[t]+1,r=this.runes[t+1]-1;e+=X.quoteIfHyphen(s),e+=Q.escapeRune(s),s!==r&&(e+="-",e+=X.quoteIfHyphen(r),e+=Q.escapeRune(r))}}else for(let t=0;t<this.runes.length;t+=2){const s=this.runes[t],r=this.runes[t+1];e+=X.quoteIfHyphen(s),e+=Q.escapeRune(s),s!==r&&(e+="-",e+=X.quoteIfHyphen(r),e+=Q.escapeRune(r))}e+="]";break;default:e+=this.op;break}return e}maxCap(){let e=0;if(this.op===X.Op.CAPTURE&&(e=this.cap),this.subs!==null)for(let t of this.subs){const s=t.maxCap();e<s&&(e=s)}return e}equals(e){if(!(e!==null&&e instanceof X)||this.op!==e.op)return!1;switch(this.op){case X.Op.END_TEXT:if((this.flags&U.WAS_DOLLAR)!==(e.flags&U.WAS_DOLLAR))return!1;break;case X.Op.LITERAL:case X.Op.CHAR_CLASS:if(this.runes===null&&e.runes===null)break;if(this.runes===null||e.runes===null||this.runes.length!==e.runes.length)return!1;for(let t=0;t<this.runes.length;t++)if(this.runes[t]!==e.runes[t])return!1;break;case X.Op.ALTERNATE:case X.Op.CONCAT:if(this.subs.length!==e.subs.length)return!1;for(let t=0;t<this.subs.length;++t)if(!this.subs[t].equals(e.subs[t]))return!1;break;case X.Op.STAR:case X.Op.PLUS:case X.Op.QUEST:if((this.flags&U.NON_GREEDY)!==(e.flags&U.NON_GREEDY)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.REPEAT:if((this.flags&U.NON_GREEDY)!==(e.flags&U.NON_GREEDY)||this.min!==e.min||this.max!==e.max||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.CAPTURE:if(this.cap!==e.cap||(this.name===null?e.name!==null:this.name!==e.name)||!this.subs[0].equals(e.subs[0]))return!1;break;case X.Op.PLB:case X.Op.NLB:if(this.lb!==e.lb||!this.subs[0].equals(e.subs[0]))return!1;break}return!0}},G(X,"Op",Hd(["NO_MATCH","EMPTY_MATCH","LITERAL","CHAR_CLASS","ANY_CHAR_NOT_NL","ANY_CHAR","BEGIN_LINE","END_LINE","BEGIN_TEXT","END_TEXT","WORD_BOUNDARY","NO_WORD_BOUNDARY","CAPTURE","STAR","PLUS","QUEST","REPEAT","CONCAT","ALTERNATE","PLB","NLB","LEFT_PAREN","VERTICAL_BAR"])),X),CB=class{constructor(n){this.next=[Object.create(null)],this.fail=[0],this.match=[!1];for(const t of n){let s=0;for(let r=0;r<t.length;r++){const i=t[r];i in this.next[s]||(this.next.push(Object.create(null)),this.fail.push(0),this.match.push(!1),this.next[s][i]=this.next.length-1),s=this.next[s][i]}this.match[s]=!0}const e=[];for(const t in this.next[0])if(Object.prototype.hasOwnProperty.call(this.next[0],t)){const s=this.next[0][t];this.fail[s]=0,e.push(s)}for(;e.length>0;){const t=e.shift();for(const s in this.next[t])if(Object.prototype.hasOwnProperty.call(this.next[t],s)){const r=this.next[t][s];let i=this.fail[t];for(;i!==0&&!(s in this.next[i]);)i=this.fail[i];s in this.next[i]?this.fail[r]=this.next[i][s]:this.fail[r]=0,this.match[r]=this.match[r]||this.match[this.fail[r]],e.push(r)}}}searchUTF16(n,e,t){let s=0;for(let r=e;r<t;r++){const i=n.charCodeAt(r);for(;s!==0&&!(i in this.next[s]);)s=this.fail[s];if(i in this.next[s]&&(s=this.next[s][i]),this.match[s])return!0}return!1}searchUTF8(n,e,t){let s=0;for(let r=e;r<t;r++){const i=n[r];for(;s!==0&&!(i in this.next[s]);)s=this.fail[s];if(i in this.next[s]&&(s=this.next[s][i]),this.match[s])return!0}return!1}},Mt,pe=(Mt=class{constructor(e){this.type=e,this.subs=[],this.str="",this.bytes=null,this.ac16=null,this.ac8=null}eval(e,t){switch(this.type){case Mt.Type.NONE:return!0;case Mt.Type.EXACT:return e.hasString(this,t);case Mt.Type.AND:for(let s=0;s<this.subs.length;s++)if(!this.subs[s].eval(e,t))return!1;return!0;case Mt.Type.OR:if(this.ac16&&this.ac8)return e.hasAnyString(this,t);for(let s=0;s<this.subs.length;s++)if(this.subs[s].eval(e,t))return!0;return!1;default:return!0}}},G(Mt,"Type",{NONE:0,EXACT:1,AND:2,OR:3}),Mt),bE=class jt{static build(e){const t=jt.fromRegexp(e);return jt.simplify(t)}static fromRegexp(e){if(!e)return new pe(pe.Type.NONE);switch(e.op){case b.Op.PLB:case b.Op.NLB:case b.Op.NO_MATCH:case b.Op.EMPTY_MATCH:case b.Op.BEGIN_LINE:case b.Op.END_LINE:case b.Op.BEGIN_TEXT:case b.Op.END_TEXT:case b.Op.WORD_BOUNDARY:case b.Op.NO_WORD_BOUNDARY:case b.Op.CHAR_CLASS:case b.Op.ANY_CHAR_NOT_NL:case b.Op.ANY_CHAR:return new pe(pe.Type.NONE);case b.Op.LITERAL:{if(e.runes.length===0||(e.flags&U.FOLD_CASE)!==0)return new pe(pe.Type.NONE);const t=new pe(pe.Type.EXACT);let s="";for(let r=0;r<e.runes.length;r++)s+=String.fromCodePoint(e.runes[r]);return t.str=s,t.bytes=Q.stringToUtf8ByteArray(t.str),t}case b.Op.CAPTURE:case b.Op.PLUS:return jt.fromRegexp(e.subs[0]);case b.Op.REPEAT:return e.min>=1?jt.fromRegexp(e.subs[0]):new pe(pe.Type.NONE);case b.Op.CONCAT:{const t=new pe(pe.Type.AND);for(const s of e.subs)t.subs.push(jt.fromRegexp(s));return t}case b.Op.ALTERNATE:{const t=new pe(pe.Type.OR);for(const s of e.subs)t.subs.push(jt.fromRegexp(s));return t}default:return new pe(pe.Type.NONE)}}static simplify(e){if(e.type===pe.Type.EXACT||e.type===pe.Type.NONE)return e;if(e.type===pe.Type.AND){const t=[];for(const s of e.subs){const r=jt.simplify(s);if(r.type!==pe.Type.NONE)if(r.type===pe.Type.AND)for(let i=0;i<r.subs.length;i++)t.push(r.subs[i]);else t.push(r)}return t.length===0?new pe(pe.Type.NONE):t.length===1?t[0]:(e.subs=t,e)}if(e.type===pe.Type.OR){const t=[];for(const o of e.subs){const a=jt.simplify(o);if(a.type===pe.Type.NONE)return new pe(pe.Type.NONE);if(a.type===pe.Type.OR)for(let c=0;c<a.subs.length;c++)t.push(a.subs[c]);else t.push(a)}if(t.length===0)return new pe(pe.Type.NONE);if(t.length===1)return t[0];const s=new Set,r=[];for(const o of t)o.type===pe.Type.EXACT?s.has(o.str)||(s.add(o.str),r.push(o)):r.push(o);e.subs=r;let i=!0;for(const o of r)if(o.type!==pe.Type.EXACT){i=!1;break}return i&&r.length>1&&(e.ac16=new CB(r.map(o=>{const a=[];for(let c=0;c<o.str.length;c++)a.push(o.str.charCodeAt(c));return a})),e.ac8=new CB(r.map(o=>o.bytes))),e}return e}},It=class{constructor(n=0,e=0){this.head=n,this.tail=e}},AE=class{constructor(){this.inst=[],this.start=0,this.numCap=2,this.lbStarts=[],this.numLb=0}getInst(n){return this.inst[n]}numInst(){return this.inst.length}addInst(n){this.inst.push(new L(n))}skipNop(n){let e=this.inst[n];for(;e.op===L.NOP||e.op===L.CAPTURE;)e=this.inst[n],n=e.out;return e}prefix(){let n="",e=this.skipNop(this.start);if(!L.isRuneOp(e.op)||e.runes.length!==1)return[e.op===L.MATCH,n];for(;L.isRuneOp(e.op)&&e.runes.length===1&&(e.arg&U.FOLD_CASE)===0;)n+=String.fromCodePoint(e.runes[0]),e=this.skipNop(e.out);return[e.op===L.MATCH,n]}startCond(){let n=0,e=this.start;e:for(;;){const t=this.inst[e];switch(t.op){case L.EMPTY_WIDTH:n|=t.arg;break;case L.FAIL:return-1;case L.CAPTURE:case L.NOP:break;default:break e}e=t.out}return n}patch(n,e){let t=n.head;for(;t!==0;){const s=this.inst[t>>1];(t&1)===0?(t=s.out,s.out=e):(t=s.arg,s.arg=e)}}append(n,e){if(n.head===0)return e;if(e.head===0)return n;const t=this.inst[n.tail>>1];return(n.tail&1)===0?t.out=e.head:t.arg=e.head,new It(n.head,e.tail)}toString(){let n="";for(let e=0;e<this.inst.length;e++){const t=n.length;n+=e,e===this.start&&(n+="*"),n+="        ".substring(n.length-t),n+=this.inst[e],n+=`
`}return n}},qi=class{constructor(n=0,e=new It,t=!1){this.i=n,this.out=e,this.nullable=t}},SE=class As{static ANY_RUNE_NOT_NL(){return[0,k.CODES.get(`
`)-1,k.CODES.get(`
`)+1,z.MAX_RUNE]}static ANY_RUNE(){return[0,z.MAX_RUNE]}static compileRegexp(e){const t=new As,s=t.compile(e);return t.prog.patch(s.out,t.newInst(L.MATCH).i),t.prog.start=s.i,t.prog}static compileSet(e){const t=new As;if(e.length===0)return t.prog.start=t.newInst(L.FAIL).i,t.prog;let s=[];for(let i=0;i<e.length;i++){const o=t.compile(e[i]),a=t.newInst(L.MATCH);t.prog.getInst(a.i).arg=i,t.prog.patch(o.out,a.i),s.push(o.i)}let r=s[0];for(let i=1;i<s.length;i++){const o=t.newInst(L.ALT),a=t.prog.getInst(o.i);a.out=r,a.arg=s[i],r=o.i}return t.prog.start=r,t.prog}constructor(){this.prog=new AE,this.newInst(L.FAIL)}newInst(e){return this.prog.addInst(e),new qi(this.prog.numInst()-1,new It,!0)}nop(){const e=this.newInst(L.NOP);return e.out=new It(e.i<<1,e.i<<1),e}fail(){return new qi}cap(e){const t=this.newInst(L.CAPTURE);return t.out=new It(t.i<<1,t.i<<1),this.prog.getInst(t.i).arg=e,this.prog.numCap<e+1&&(this.prog.numCap=e+1),t}cat(e,t){return e.i===0||t.i===0?this.fail():(this.prog.patch(e.out,t.i),new qi(e.i,t.out,e.nullable&&t.nullable))}alt(e,t){if(e.i===0)return t;if(t.i===0)return e;const s=this.newInst(L.ALT),r=this.prog.getInst(s.i);return r.out=e.i,r.arg=t.i,s.out=this.prog.append(e.out,t.out),s.nullable=e.nullable||t.nullable,s}loop(e,t){const s=this.newInst(L.ALT),r=this.prog.getInst(s.i);return t?(r.arg=e.i,s.out=new It(s.i<<1,s.i<<1)):(r.out=e.i,s.out=new It(s.i<<1|1,s.i<<1|1)),this.prog.patch(e.out,s.i),s}quest(e,t){const s=this.newInst(L.ALT),r=this.prog.getInst(s.i);return t?(r.arg=e.i,s.out=new It(s.i<<1,s.i<<1)):(r.out=e.i,s.out=new It(s.i<<1|1,s.i<<1|1)),s.out=this.prog.append(s.out,e.out),s}star(e,t){return e.nullable?this.quest(this.plus(e,t),t):this.loop(e,t)}plus(e,t){return new qi(e.i,this.loop(e,t).out,e.nullable)}empty(e){const t=this.newInst(L.EMPTY_WIDTH);return this.prog.getInst(t.i).arg=e,t.out=new It(t.i<<1,t.i<<1),t}rune(e,t){const s=this.newInst(L.RUNE);s.nullable=!1;const r=this.prog.getInst(s.i);return r.runes=e,t&=U.FOLD_CASE,(e.length!==1||z.simpleFold(e[0])===e[0])&&(t&=-2),r.arg=t,s.out=new It(s.i<<1,s.i<<1),(t&U.FOLD_CASE)===0&&e.length===1||e.length===2&&e[0]===e[1]?r.op=L.RUNE1:e.length===2&&e[0]===0&&e[1]===z.MAX_RUNE?r.op=L.RUNE_ANY:e.length===4&&e[0]===0&&e[1]===k.CODES.get(`
`)-1&&e[2]===k.CODES.get(`
`)+1&&e[3]===z.MAX_RUNE&&(r.op=L.RUNE_ANY_NOT_NL),s}lookBehind(e,t){const s=this.newInst(L.LB_WRITE);this.prog.getInst(s.i).arg=t;const r=this.rune(As.ANY_RUNE(),0),i=this.star(r,!0),o=this.cat(i,e);this.prog.patch(o.out,s.i);const a=this.newInst(L.LB_CHECK);return this.prog.getInst(a.i).arg=t,this.prog.lbStarts.push(o.i),Math.abs(t)>this.prog.numLb&&(this.prog.numLb=Math.abs(t)),a.out=new It(a.i<<1,a.i<<1),a}compile(e){switch(e.op){case b.Op.NO_MATCH:return this.fail();case b.Op.EMPTY_MATCH:return this.nop();case b.Op.LITERAL:if(e.runes.length===0)return this.nop();{let t=null;for(let s of e.runes){const r=this.rune([s],e.flags);t=t===null?r:this.cat(t,r)}return t}case b.Op.CHAR_CLASS:return this.rune(e.runes,e.flags);case b.Op.ANY_CHAR_NOT_NL:return this.rune(As.ANY_RUNE_NOT_NL(),0);case b.Op.ANY_CHAR:return this.rune(As.ANY_RUNE(),0);case b.Op.BEGIN_LINE:return this.empty(Q.EMPTY_BEGIN_LINE);case b.Op.END_LINE:return this.empty(Q.EMPTY_END_LINE);case b.Op.BEGIN_TEXT:return this.empty(Q.EMPTY_BEGIN_TEXT);case b.Op.END_TEXT:return this.empty(Q.EMPTY_END_TEXT);case b.Op.WORD_BOUNDARY:return this.empty(Q.EMPTY_WORD_BOUNDARY);case b.Op.NO_WORD_BOUNDARY:return this.empty(Q.EMPTY_NO_WORD_BOUNDARY);case b.Op.PLB:case b.Op.NLB:return this.lookBehind(this.compile(e.subs[0]),e.lb);case b.Op.CAPTURE:{const t=this.cap(e.cap<<1),s=this.compile(e.subs[0]),r=this.cap(e.cap<<1|1);return this.cat(this.cat(t,s),r)}case b.Op.STAR:return this.star(this.compile(e.subs[0]),(e.flags&U.NON_GREEDY)!==0);case b.Op.PLUS:return this.plus(this.compile(e.subs[0]),(e.flags&U.NON_GREEDY)!==0);case b.Op.QUEST:return this.quest(this.compile(e.subs[0]),(e.flags&U.NON_GREEDY)!==0);case b.Op.CONCAT:if(e.subs.length===0)return this.nop();{let t=null;for(let s of e.subs){const r=this.compile(s);t=t===null?r:this.cat(t,r)}return t}case b.Op.ALTERNATE:if(e.subs.length===0)return this.nop();{let t=null;for(let s of e.subs){const r=this.compile(s);t=t===null?r:this.alt(t,r)}return t}default:throw new hE("regexp: unhandled case in compile")}}},PE=class mt{static simplify(e){if(e===null)return null;switch(e.op){case b.Op.PLB:case b.Op.NLB:case b.Op.CAPTURE:{const t=mt.simplify(e.subs[0]);if(t!==e.subs[0]){const s=b.fromRegexp(e);return s.runes=[],s.subs=[t],s}return e}case b.Op.CONCAT:case b.Op.ALTERNATE:{const t=[];let s=!1;for(let r=0;r<e.subs.length;r++){const i=e.subs[r],o=mt.simplify(i);if(o!==i&&(s=!0),e.op===b.Op.CONCAT){if(o.op===b.Op.NO_MATCH)return new b(b.Op.NO_MATCH);if(o.op===b.Op.EMPTY_MATCH){s=!0;continue}if(o.op===b.Op.CONCAT){s=!0;for(let a=0;a<o.subs.length;a++)t.push(o.subs[a]);continue}}else if(e.op===b.Op.ALTERNATE){if(o.op===b.Op.NO_MATCH){s=!0;continue}if(o.op===b.Op.ALTERNATE){s=!0;for(let a=0;a<o.subs.length;a++)t.push(o.subs[a]);continue}}t.push(o)}if(s){if(t.length===0)return new b(e.op===b.Op.CONCAT?b.Op.EMPTY_MATCH:b.Op.NO_MATCH);if(t.length===1)return t[0];const r=b.fromRegexp(e);return r.runes=[],r.subs=t,r}return e}case b.Op.CHAR_CLASS:return e.runes===null?e:e.runes.length===0?new b(b.Op.NO_MATCH):e.runes.length===2&&e.runes[0]===0&&e.runes[1]===z.MAX_RUNE?new b(b.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES.get(`
`)-1&&e.runes[2]===k.CODES.get(`
`)+1&&e.runes[3]===z.MAX_RUNE?new b(b.Op.ANY_CHAR_NOT_NL):e;case b.Op.STAR:case b.Op.PLUS:case b.Op.QUEST:{const t=mt.simplify(e.subs[0]);return mt.simplify1(e.op,e.flags,t,e)}case b.Op.REPEAT:{if(e.min===0&&e.max===0)return new b(b.Op.EMPTY_MATCH);const t=mt.simplify(e.subs[0]);if(e.max===-1){if(e.min===0)return mt.simplify1(b.Op.STAR,e.flags,t,null);if(e.min===1)return mt.simplify1(b.Op.PLUS,e.flags,t,null);const r=new b(b.Op.CONCAT),i=[];for(let o=0;o<e.min-1;o++)i.push(t);return i.push(mt.simplify1(b.Op.PLUS,e.flags,t,null)),r.subs=i.slice(0),mt.simplify(r)}if(e.min===1&&e.max===1)return t;let s=null;if(e.min>0){s=[];for(let r=0;r<e.min;r++)s.push(t)}if(e.max>e.min){let r=mt.simplify1(b.Op.QUEST,e.flags,t,null);for(let i=e.min+1;i<e.max;i++){const o=new b(b.Op.CONCAT);o.subs=[t,r],r=mt.simplify1(b.Op.QUEST,e.flags,o,null)}if(s===null)return r;s.push(r)}if(s!==null){const r=new b(b.Op.CONCAT);return r.subs=s.slice(0),mt.simplify(r)}return new b(b.Op.NO_MATCH)}}return e}static simplify1(e,t,s,r){if(s.op===b.Op.EMPTY_MATCH)return s;if(s.op===b.Op.NO_MATCH)return e===b.Op.PLUS?s:new b(b.Op.EMPTY_MATCH);if(e===s.op&&(t&U.NON_GREEDY)===(s.flags&U.NON_GREEDY))return s;if(r!==null&&r.op===e&&(r.flags&U.NON_GREEDY)===(t&U.NON_GREEDY)&&s===r.subs[0])return r;const i=new b(e);return i.flags=t,i.subs=[s],i}},fe=class{constructor(n,e){this.sign=n,this.cls=e}};const yB=[48,57],EB=[9,10,12,13,32,32],_B=[48,57,65,90,95,95,97,122],vB=new Map([["\\d",new fe(1,yB)],["\\D",new fe(-1,yB)],["\\s",new fe(1,EB)],["\\S",new fe(-1,EB)],["\\w",new fe(1,_B)],["\\W",new fe(-1,_B)]]),DB=[48,57,65,90,97,122],wB=[65,90,97,122],IB=[0,127],TB=[9,9,32,32],bB=[0,31,127,127],AB=[48,57],SB=[33,126],PB=[97,122],RB=[32,126],OB=[33,47,58,64,91,96,123,126],NB=[9,13,32,32],kB=[65,90],LB=[48,57,65,90,95,95,97,122],xB=[48,57,65,70,97,102],FB=new Map([["[:alnum:]",new fe(1,DB)],["[:^alnum:]",new fe(-1,DB)],["[:alpha:]",new fe(1,wB)],["[:^alpha:]",new fe(-1,wB)],["[:ascii:]",new fe(1,IB)],["[:^ascii:]",new fe(-1,IB)],["[:blank:]",new fe(1,TB)],["[:^blank:]",new fe(-1,TB)],["[:cntrl:]",new fe(1,bB)],["[:^cntrl:]",new fe(-1,bB)],["[:digit:]",new fe(1,AB)],["[:^digit:]",new fe(-1,AB)],["[:graph:]",new fe(1,SB)],["[:^graph:]",new fe(-1,SB)],["[:lower:]",new fe(1,PB)],["[:^lower:]",new fe(-1,PB)],["[:print:]",new fe(1,RB)],["[:^print:]",new fe(-1,RB)],["[:punct:]",new fe(1,OB)],["[:^punct:]",new fe(-1,OB)],["[:space:]",new fe(1,NB)],["[:^space:]",new fe(-1,NB)],["[:upper:]",new fe(1,kB)],["[:^upper:]",new fe(-1,kB)],["[:word:]",new fe(1,LB)],["[:^word:]",new fe(-1,LB)],["[:xdigit:]",new fe(1,xB)],["[:^xdigit:]",new fe(-1,xB)]]);var fn=class gn{static charClassToString(e,t){let s="[";for(let r=0;r<t;r+=2){r>0&&(s+=" ");const i=e[r],o=e[r+1];i===o?s+=`0x${i.toString(16)}`:s+=`0x${i.toString(16)}-0x${o.toString(16)}`}return s+="]",s}static cmp(e,t,s,r){const i=e[t]-s;return i!==0?i:r-e[t+1]}static qsortIntPair(e,t,s){const r=((t+s)/2|0)&-2,i=e[r],o=e[r+1];let a=t,c=s;for(;a<=c;){for(;a<s&&gn.cmp(e,a,i,o)<0;)a+=2;for(;c>t&&gn.cmp(e,c,i,o)>0;)c-=2;if(a<=c){if(a!==c){let u=e[a];e[a]=e[c],e[c]=u,u=e[a+1],e[a+1]=e[c+1],e[c+1]=u}a+=2,c-=2}}t<c&&gn.qsortIntPair(e,t,c),a<s&&gn.qsortIntPair(e,a,s)}constructor(e=Q.emptyInts()){this.r=e,this.len=e.length}toArray(){return this.len===this.r.length?this.r:this.r.slice(0,this.len)}cleanClass(){if(this.len<4)return this;gn.qsortIntPair(this.r,0,this.len-2);let e=2;for(let t=2;t<this.len;t+=2){const s=this.r[t],r=this.r[t+1];if(s<=this.r[e-1]+1){r>this.r[e-1]&&(this.r[e-1]=r);continue}this.r[e]=s,this.r[e+1]=r,e+=2}return this.len=e,this}appendLiteral(e,t){return(t&U.FOLD_CASE)!==0?this.appendFoldedRange(e,e):this.appendRange(e,e)}appendRange(e,t){if(this.len>0){for(let s=2;s<=4;s+=2)if(this.len>=s){const r=this.r[this.len-s],i=this.r[this.len-s+1];if(e<=i+1&&r<=t+1)return e<r&&(this.r[this.len-s]=e),t>i&&(this.r[this.len-s+1]=t),this}}return this.r[this.len++]=e,this.r[this.len++]=t,this}appendFoldedRange(e,t){if(e<=z.MIN_FOLD&&t>=z.MAX_FOLD)return this.appendRange(e,t);if(t<z.MIN_FOLD||e>z.MAX_FOLD)return this.appendRange(e,t);e<z.MIN_FOLD&&(this.appendRange(e,z.MIN_FOLD-1),e=z.MIN_FOLD),t>z.MAX_FOLD&&(this.appendRange(z.MAX_FOLD+1,t),t=z.MAX_FOLD);for(let s=e;s<=t;s++){this.appendRange(s,s);for(let r=z.simpleFold(s);r!==s;r=z.simpleFold(r))this.appendRange(r,r)}return this}appendClass(e){for(let t=0;t<e.length;t+=2)this.appendRange(e[t],e[t+1]);return this}appendFoldedClass(e){for(let t=0;t<e.length;t+=2)this.appendFoldedRange(e[t],e[t+1]);return this}appendNegatedClass(e){let t=0;for(let s=0;s<e.length;s+=2){const r=e[s],i=e[s+1];t<=r-1&&this.appendRange(t,r-1),t=i+1}return t<=z.MAX_RUNE&&this.appendRange(t,z.MAX_RUNE),this}appendTable(e){for(let t=0;t<e.length;++t){const s=e.getLo(t),r=e.getHi(t),i=e.getStride(t);if(i===1){this.appendRange(s,r);continue}for(let o=s;o<=r;o+=i)this.appendRange(o,o)}return this}appendNegatedTable(e){let t=0;for(let s=0;s<e.length;++s){const r=e.getLo(s),i=e.getHi(s),o=e.getStride(s);if(o===1){t<=r-1&&this.appendRange(t,r-1),t=i+1;continue}for(let a=r;a<=i;a+=o)t<=a-1&&this.appendRange(t,a-1),t=a+1}return t<=z.MAX_RUNE&&this.appendRange(t,z.MAX_RUNE),this}appendTableWithSign(e,t){return t<0?this.appendNegatedTable(e):this.appendTable(e)}negateClass(){let e=0,t=0;for(let s=0;s<this.len;s+=2){const r=this.r[s],i=this.r[s+1];e<=r-1&&(this.r[t]=e,this.r[t+1]=r-1,t+=2),e=i+1}return this.len=t,e<=z.MAX_RUNE&&(this.r[this.len++]=e,this.r[this.len++]=z.MAX_RUNE),this}appendClassWithSign(e,t){return t<0?this.appendNegatedClass(e):this.appendClass(e)}appendGroup(e,t){let s=e.cls;return t&&(s=new gn().appendFoldedClass(s).cleanClass().toArray()),this.appendClassWithSign(s,e.sign)}toString(){return gn.charClassToString(this.r,this.len)}},RE=class{constructor(n){this.str=n,this.position=0}pos(){return this.position}rewindTo(n){this.position=n}more(){return this.position<this.str.length}peek(){return this.str.codePointAt(this.position)}skip(n){this.position+=n}skipString(n){this.position+=n.length}pop(){const n=this.str.codePointAt(this.position);return this.position+=Q.charCount(n),n}lookingAt(n){return this.str.startsWith(n,this.position)}rest(){return this.str.substring(this.position)}from(n){return this.str.substring(n,this.position)}toString(){return this.rest()}},$,OE=($=class{static unicodeTable(e){return e==="Any"?{tab:$.ANY_TABLE,fold:$.ANY_TABLE,sign:1}:e==="Ascii"?{tab:$.ASCII_TABLE,fold:$.ASCII_FOLD_TABLE,sign:1}:e==="Assigned"?{tab:at.CATEGORIES.get("Cn"),fold:at.CATEGORIES.get("Cn"),sign:-1}:e==="Lc"?{tab:at.CATEGORIES.get("LC"),fold:at.FOLD_CATEGORIES.get("LC"),sign:1}:at.CATEGORIES.has(e)?{tab:at.CATEGORIES.get(e),fold:at.FOLD_CATEGORIES.get(e),sign:1}:at.SCRIPTS.has(e)?{tab:at.SCRIPTS.get(e),fold:at.FOLD_SCRIPT.get(e),sign:1}:null}static minFoldRune(e){if(e<z.MIN_FOLD||e>z.MAX_FOLD)return e;let t=e;const s=e;for(e=z.simpleFold(e);e!==s;e=z.simpleFold(e))t>e&&(t=e);return t}static leadingRegexp(e){if(e.op===b.Op.EMPTY_MATCH)return null;if(e.op===b.Op.CONCAT&&e.subs.length>0){const t=e.subs[0];return t.op===b.Op.EMPTY_MATCH?null:t}return e}static literalRegexp(e,t){const s=new b(b.Op.LITERAL);return s.flags=t,s.runes=Q.stringToRunes(e),s}static parse(e,t){return new $(e,t).parseInternal()}static parseRepeat(e){const t=e.pos();if(!e.more()||!e.lookingAt("{"))return-1;e.skip(1);const s=$.parseInt(e);if(s===-1||!e.more())return-1;let r;if(!e.lookingAt(","))r=s;else{if(e.skip(1),!e.more())return-1;if(e.lookingAt("}"))r=-1;else if((r=$.parseInt(e))===-1)return-1}if(!e.more()||!e.lookingAt("}"))return-1;if(e.skip(1),s<0||s>1e3||r===-2||r>1e3||r>=0&&s>r)throw new _e($.ERR_INVALID_REPEAT_SIZE,e.from(t));return s<<16|r&z.MAX_BMP}static isValidCaptureName(e){if(e.length===0)return!1;for(let t=0;t<e.length;t++){const s=e.codePointAt(t);if(s!==k.CODES.get("_")&&!Q.isalnum(s))return!1}return!0}static parseInt(e){const t=e.pos();for(;e.more()&&e.peek()>=k.CODES.get("0")&&e.peek()<=k.CODES.get("9");)e.skip(1);const s=e.from(t);return s.length===0||s.length>1&&s.codePointAt(0)===k.CODES.get("0")?-1:s.length>8?-2:parseInt(s,10)}static isCharClass(e){return e.op===b.Op.LITERAL&&e.runes.length===1||e.op===b.Op.CHAR_CLASS||e.op===b.Op.ANY_CHAR_NOT_NL||e.op===b.Op.ANY_CHAR}static matchRune(e,t){switch(e.op){case b.Op.LITERAL:return e.runes.length===1&&e.runes[0]===t;case b.Op.CHAR_CLASS:for(let s=0;s<e.runes.length;s+=2)if(e.runes[s]<=t&&t<=e.runes[s+1])return!0;return!1;case b.Op.ANY_CHAR_NOT_NL:return t!==k.CODES.get(`
`);case b.Op.ANY_CHAR:return!0}return!1}static mergeCharClass(e,t){switch(e.op){case b.Op.ANY_CHAR:break;case b.Op.ANY_CHAR_NOT_NL:$.matchRune(t,k.CODES.get(`
`))&&(e.op=b.Op.ANY_CHAR);break;case b.Op.CHAR_CLASS:t.op===b.Op.LITERAL?e.runes=new fn(e.runes).appendLiteral(t.runes[0],t.flags).toArray():e.runes=new fn(e.runes).appendClass(t.runes).toArray();break;case b.Op.LITERAL:if(t.runes[0]===e.runes[0]&&t.flags===e.flags)break;e.op=b.Op.CHAR_CLASS,e.runes=new fn().appendLiteral(e.runes[0],e.flags).appendLiteral(t.runes[0],t.flags).toArray();break}}static parseEscape(e){const t=e.pos();if(e.skip(1),!e.more())throw new _e($.ERR_TRAILING_BACKSLASH);let s=e.pop();e:switch(s){case k.CODES.get("1"):case k.CODES.get("2"):case k.CODES.get("3"):case k.CODES.get("4"):case k.CODES.get("5"):case k.CODES.get("6"):case k.CODES.get("7"):if(!e.more()||e.peek()<k.CODES.get("0")||e.peek()>k.CODES.get("7"))break;case k.CODES.get("0"):{let r=s-k.CODES.get("0");for(let i=1;i<3&&!(!e.more()||e.peek()<k.CODES.get("0")||e.peek()>k.CODES.get("7"));i++)r=r*8+e.peek()-k.CODES.get("0"),e.skip(1);return r}case k.CODES.get("x"):{if(!e.more())break;if(s=e.pop(),s===k.CODES.get("{")){let o=0,a=0;for(;;){if(!e.more())break e;if(s=e.pop(),s===k.CODES.get("}"))break;const c=Q.unhex(s);if(c<0||(a=a*16+c,a>z.MAX_RUNE))break e;o++}if(o===0)break e;return a}const r=Q.unhex(s);if(!e.more())break;s=e.pop();const i=Q.unhex(s);if(r<0||i<0)break;return r*16+i}case k.CODES.get("a"):return k.CODES.get("\x07");case k.CODES.get("f"):return k.CODES.get("\f");case k.CODES.get("n"):return k.CODES.get(`
`);case k.CODES.get("r"):return k.CODES.get("\r");case k.CODES.get("t"):return k.CODES.get("	");case k.CODES.get("v"):return k.CODES.get("\v");default:if(s<=z.MAX_ASCII&&!Q.isalnum(s))return s;break}throw new _e($.ERR_INVALID_ESCAPE,e.from(t))}static parseClassChar(e,t){if(!e.more())throw new _e($.ERR_MISSING_BRACKET,e.from(t));return e.lookingAt("\\")?$.parseEscape(e):e.pop()}static concatRunes(e,t){for(let s=0;s<t.length;s++)e.push(t[s]);return e}static hasCapture(e){if(e===null)return!1;if(e.op===b.Op.CAPTURE)return!0;if(e.subs){for(let t of e.subs)if($.hasCapture(t))return!0}return!1}constructor(e,t=0){this.wholeRegexp=e,this.flags=t,this.numCap=0,this.namedGroups=Object.create(null),this.stack=[],this.free=null,this.numRegexp=0,this.numRunes=0,this.repeats=0,this.height=null,this.size=null,this.nlb=0}newRegexp(e){let t=this.free;return t!==null&&t.subs!==null&&t.subs.length>0?(this.free=t.subs[0],t.reinit(),t.op=e):(t=new b(e),this.numRegexp+=1),t}reuse(e){this.height!==null&&this.height.has(e)&&this.height.delete(e),e.subs!==null&&e.subs.length>0&&(e.subs[0]=this.free),this.free=e}checkLimits(e){if(this.numRunes>$.MAX_RUNES)throw new _e($.ERR_LARGE);this.checkSize(e),this.checkHeight(e)}checkSize(e){if(this.size===null){if(this.repeats===0&&(this.repeats=1),e.op===b.Op.REPEAT){let t=e.max;t===-1&&(t=e.min),t<=0&&(t=1),t>Math.floor($.MAX_SIZE/this.repeats)?this.repeats=$.MAX_SIZE:this.repeats*=t}if(this.numRegexp<Math.floor($.MAX_SIZE/this.repeats))return;this.size=new Map;for(let t of this.stack)this.checkSize(t)}if(this.calcSize(e,!0)>$.MAX_SIZE)throw new _e($.ERR_LARGE)}calcSize(e,t=!1){if(!t&&this.size!==null&&this.size.has(e))return this.size.get(e);let s=0;switch(e.op){case b.Op.LITERAL:s=e.runes.length;break;case b.Op.PLB:case b.Op.NLB:case b.Op.CAPTURE:case b.Op.STAR:s=2+this.calcSize(e.subs[0]);break;case b.Op.PLUS:case b.Op.QUEST:s=1+this.calcSize(e.subs[0]);break;case b.Op.CONCAT:for(let r of e.subs)s=s+this.calcSize(r);break;case b.Op.ALTERNATE:for(let r of e.subs)s=s+this.calcSize(r);e.subs.length>1&&(s=s+e.subs.length-1);break;case b.Op.REPEAT:{let r=this.calcSize(e.subs[0]);if(e.max===-1){e.min===0?s=2+r:s=1+e.min*r;break}s=e.max*r+(e.max-e.min);break}}return s=Math.max(1,s),this.size===null&&(this.size=new Map),this.size.set(e,s),s}checkHeight(e){if(!(this.numRegexp<$.MAX_HEIGHT)){if(this.height===null){this.height=new Map;for(let t of this.stack)this.checkHeight(t)}if(this.calcHeight(e,!0)>$.MAX_HEIGHT)throw new _e($.ERR_NESTING_DEPTH)}}calcHeight(e,t=!1){if(!t&&this.height!==null&&this.height.has(e))return this.height.get(e);let s=1;for(let r of e.subs){const i=this.calcHeight(r);s<1+i&&(s=1+i)}return this.height===null&&(this.height=new Map),this.height.set(e,s),s}pop(){return this.stack.pop()}popToPseudo(){const e=this.stack.length;let t=e;for(;t>0&&!b.isPseudoOp(this.stack[t-1].op);)t--;const s=this.stack.slice(t,e);return this.stack=this.stack.slice(0,t),s}push(e){if(this.numRunes+=e.runes.length,e.op===b.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]===e.runes[1]){if(this.maybeConcat(e.runes[0],this.flags&-2))return null;e.op=b.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags&-2}else if(e.op===b.Op.CHAR_CLASS&&e.runes.length===4&&e.runes[0]===e.runes[1]&&e.runes[2]===e.runes[3]&&z.simpleFold(e.runes[0])===e.runes[2]&&z.simpleFold(e.runes[2])===e.runes[0]||e.op===b.Op.CHAR_CLASS&&e.runes.length===2&&e.runes[0]+1===e.runes[1]&&z.simpleFold(e.runes[0])===e.runes[1]&&z.simpleFold(e.runes[1])===e.runes[0]){if(this.maybeConcat(e.runes[0],this.flags|U.FOLD_CASE))return null;e.op=b.Op.LITERAL,e.runes=[e.runes[0]],e.flags=this.flags|U.FOLD_CASE}else this.maybeConcat(-1,0);return this.stack.push(e),this.checkLimits(e),e}maybeConcat(e,t){const s=this.stack.length;if(s<2)return!1;const r=this.stack[s-1],i=this.stack[s-2];return r.op!==b.Op.LITERAL||i.op!==b.Op.LITERAL||(r.flags&U.FOLD_CASE)!==(i.flags&U.FOLD_CASE)?!1:(i.runes=$.concatRunes(i.runes,r.runes),e>=0?(r.runes=[e],r.flags=t,!0):(this.pop(),this.reuse(r),!1))}newLiteral(e,t){const s=this.newRegexp(b.Op.LITERAL);return s.flags=t,(t&U.FOLD_CASE)!==0&&(e=$.minFoldRune(e)),s.runes=[e],s}literal(e){this.push(this.newLiteral(e,this.flags))}op(e){const t=this.newRegexp(e);return t.flags=this.flags,this.push(t)}repeat(e,t,s,r,i,o){let a=this.flags;if((a&U.PERL_X)!==0&&(i.more()&&i.lookingAt("?")&&(i.skip(1),a^=U.NON_GREEDY),o!==-1))throw new _e($.ERR_INVALID_REPEAT_OP,i.from(o));const c=this.stack.length;if(c===0)throw new _e($.ERR_MISSING_REPEAT_ARGUMENT,i.from(r));const u=this.stack[c-1];if(b.isPseudoOp(u.op))throw new _e($.ERR_MISSING_REPEAT_ARGUMENT,i.from(r));const h=this.newRegexp(e);if(h.min=t,h.max=s,h.flags=a,h.subs=[u],this.stack[c-1]=h,this.checkLimits(h),e===b.Op.REPEAT&&(t>=2||s>=2)&&!this.repeatIsValid(h,1e3))throw new _e($.ERR_INVALID_REPEAT_SIZE,i.from(r))}repeatIsValid(e,t){if(e.op===b.Op.REPEAT){let s=e.max;if(s===0)return!0;if(s<0&&(s=e.min),s>t)return!1;s>0&&(t=Math.trunc(t/s))}for(let s of e.subs)if(!this.repeatIsValid(s,t))return!1;return!0}concat(){this.maybeConcat(-1,0);const e=this.popToPseudo();return e.length===0?this.push(this.newRegexp(b.Op.EMPTY_MATCH)):this.push(this.collapse(e,b.Op.CONCAT))}alternate(){const e=this.popToPseudo();return e.length>0&&this.cleanAlt(e[e.length-1]),e.length===0?this.push(this.newRegexp(b.Op.NO_MATCH)):this.push(this.collapse(e,b.Op.ALTERNATE))}cleanAlt(e){e.op===b.Op.CHAR_CLASS&&(e.runes=new fn(e.runes).cleanClass().toArray(),e.runes.length===2&&e.runes[0]===0&&e.runes[1]===z.MAX_RUNE?(e.runes=[],e.op=b.Op.ANY_CHAR):e.runes.length===4&&e.runes[0]===0&&e.runes[1]===k.CODES.get(`
`)-1&&e.runes[2]===k.CODES.get(`
`)+1&&e.runes[3]===z.MAX_RUNE&&(e.runes=[],e.op=b.Op.ANY_CHAR_NOT_NL))}collapse(e,t){if(e.length===1)return e[0];let s=0;for(let a of e)s+=a.op===t?a.subs.length:1;let r=new Array(s).fill(null),i=0;for(let a of e)if(a.op===t){for(let c=0;c<a.subs.length;c++)r[i++]=a.subs[c];this.reuse(a)}else r[i++]=a;let o=this.newRegexp(t);if(o.subs=r,t===b.Op.ALTERNATE&&(o.subs=this.factor(o.subs),o.subs.length===1)){const a=o;o=o.subs[0],this.reuse(a)}return o}factor(e){if(e.length<2)return e;let t=0,s=e.length,r=0,i=null,o=0,a=0,c=0;for(let h=0;h<=s;h++){let f=null,p=0,g=0;if(h<s){let D=e[t+h];if(D.op===b.Op.CONCAT&&D.subs.length>0&&(D=D.subs[0]),D.op===b.Op.LITERAL&&(f=D.runes,p=D.runes.length,g=D.flags&U.FOLD_CASE),g===a){let R=0;for(;R<o&&R<p&&i[R]===f[R];)R++;if(R>0){o=R;continue}}}if(h!==c)if(h===c+1)e[r++]=e[t+c];else{const D=this.newRegexp(b.Op.LITERAL);D.flags=a,D.runes=i.slice(0,o);for(let O=c;O<h;O++)e[t+O]=this.removeLeadingString(e[t+O],o),this.checkLimits(e[t+O]);const R=this.collapse(e.slice(t+c,t+h),b.Op.ALTERNATE),M=this.newRegexp(b.Op.CONCAT);M.subs=[D,R],e[r++]=M}c=h,i=f,o=p,a=g}s=r,t=0,c=0,r=0;let u=null;for(let h=0;h<=s;h++){let f=null;if(!(h<s&&(f=$.leadingRegexp(e[t+h]),u!==null&&u.equals(f)&&($.isCharClass(u)||u.op===b.Op.REPEAT&&u.min===u.max&&$.isCharClass(u.subs[0]))))){if(h!==c)if(h===c+1)e[r++]=e[t+c];else{const p=u;for(let R=c;R<h;R++){const M=R!==c;e[t+R]=this.removeLeadingRegexp(e[t+R],M),this.checkLimits(e[t+R])}const g=this.collapse(e.slice(t+c,t+h),b.Op.ALTERNATE),D=this.newRegexp(b.Op.CONCAT);D.subs=[p,g],e[r++]=D}c=h,u=f}}s=r,t=0,c=0,r=0;for(let h=0;h<=s;h++)if(!(h<s&&$.isCharClass(e[t+h]))){if(h!==c)if(h===c+1)e[r++]=e[t+c];else{let f=c;for(let g=c+1;g<h;g++){const D=e[t+f],R=e[t+g];(D.op<R.op||D.op===R.op&&(D.runes!==null?D.runes.length:0)<(R.runes!==null?R.runes.length:0))&&(f=g)}const p=e[t+c];e[t+c]=e[t+f],e[t+f]=p;for(let g=c+1;g<h;g++)$.mergeCharClass(e[t+c],e[t+g]),this.reuse(e[t+g]);this.cleanAlt(e[t+c]),e[r++]=e[t+c]}h<s&&(e[r++]=e[t+h]),c=h+1}s=r,t=0,c=0,r=0;for(let h=0;h<s;++h)h+1<s&&e[t+h].op===b.Op.EMPTY_MATCH&&e[t+h+1].op===b.Op.EMPTY_MATCH||(e[r++]=e[t+h]);return s=r,t=0,e.slice(t,s)}removeLeadingString(e,t){if(e.op===b.Op.CONCAT&&e.subs.length>0){const s=this.removeLeadingString(e.subs[0],t);if(e.subs[0]=s,s.op===b.Op.EMPTY_MATCH)switch(this.reuse(s),e.subs.length){case 0:case 1:e.op=b.Op.EMPTY_MATCH,e.subs=b.emptySubs();break;case 2:{const r=e;e=e.subs[1],this.reuse(r);break}default:e.subs=e.subs.slice(1,e.subs.length);break}return e}return e.op===b.Op.LITERAL&&(e.runes=e.runes.slice(t,e.runes.length),e.runes.length===0&&(e.op=b.Op.EMPTY_MATCH)),e}removeLeadingRegexp(e,t){if(e.op===b.Op.CONCAT&&e.subs.length>0){switch(t&&this.reuse(e.subs[0]),e.subs=e.subs.slice(1,e.subs.length),e.subs.length){case 0:e.op=b.Op.EMPTY_MATCH,e.subs=b.emptySubs();break;case 1:{const s=e;e=e.subs[0],this.reuse(s);break}}return e}return t&&this.reuse(e),this.newRegexp(b.Op.EMPTY_MATCH)}parseInternal(){if((this.flags&U.LITERAL)!==0)return $.literalRegexp(this.wholeRegexp,this.flags);let e=-1,t=-1,s=-1;const r=new RE(this.wholeRegexp);for(;r.more();){let i=-1;e:switch(r.peek()){case k.CODES.get("("):if((this.flags&U.LOOKBEHIND)!==0){if(r.lookingAt("(?<=")){this.parsePosLookBehind(),r.skip(4);break}if(r.lookingAt("(?<!")){this.parseNegLookBehind(),r.skip(4);break}}if((this.flags&U.PERL_X)!==0&&r.lookingAt("(?")){this.parsePerlFlags(r);break}this.op(b.Op.LEFT_PAREN).cap=++this.numCap,r.skip(1);break;case k.CODES.get("|"):this.parseVerticalBar(),r.skip(1);break;case k.CODES.get(")"):this.parseRightParen(),r.skip(1);break;case k.CODES.get("^"):(this.flags&U.ONE_LINE)!==0?this.op(b.Op.BEGIN_TEXT):this.op(b.Op.BEGIN_LINE),r.skip(1);break;case k.CODES.get("$"):(this.flags&U.ONE_LINE)!==0?this.op(b.Op.END_TEXT).flags|=U.WAS_DOLLAR:this.op(b.Op.END_LINE),r.skip(1);break;case k.CODES.get("."):(this.flags&U.DOT_NL)!==0?this.op(b.Op.ANY_CHAR):this.op(b.Op.ANY_CHAR_NOT_NL),r.skip(1);break;case k.CODES.get("["):this.parseClass(r);break;case k.CODES.get("*"):case k.CODES.get("+"):case k.CODES.get("?"):{i=r.pos();let o=null;switch(r.pop()){case k.CODES.get("*"):o=b.Op.STAR;break;case k.CODES.get("+"):o=b.Op.PLUS;break;case k.CODES.get("?"):o=b.Op.QUEST;break}this.repeat(o,t,s,i,r,e);break}case k.CODES.get("{"):{i=r.pos();const o=$.parseRepeat(r);if(o<0){r.rewindTo(i),this.literal(r.pop());break}t=o>>16,s=(o&z.MAX_BMP)<<16>>16,this.repeat(b.Op.REPEAT,t,s,i,r,e);break}case k.CODES.get("\\"):{const o=r.pos();if(r.skip(1),(this.flags&U.PERL_X)!==0&&r.more())switch(r.pop()){case k.CODES.get("A"):this.op(b.Op.BEGIN_TEXT);break e;case k.CODES.get("b"):this.op(b.Op.WORD_BOUNDARY);break e;case k.CODES.get("B"):this.op(b.Op.NO_WORD_BOUNDARY);break e;case k.CODES.get("C"):throw new _e($.ERR_INVALID_ESCAPE,"\\C");case k.CODES.get("Q"):{let u=r.rest();const h=u.indexOf("\\E");h>=0?(u=u.substring(0,h),r.skipString(u),r.skipString("\\E")):r.skipString(u);let f=0;for(;f<u.length;){const p=u.codePointAt(f);this.literal(p),f+=Q.charCount(p)}break e}case k.CODES.get("z"):this.op(b.Op.END_TEXT);break e;default:r.rewindTo(o);break}else r.rewindTo(o);const a=this.newRegexp(b.Op.CHAR_CLASS);if(a.flags=this.flags,r.lookingAt("\\p")||r.lookingAt("\\P")){const u=new fn;if(this.parseUnicodeClass(r,u)){a.runes=u.toArray(),this.push(a);break e}}const c=new fn;if(this.parsePerlClassEscape(r,c)){a.runes=c.toArray(),this.push(a);break e}r.rewindTo(o),this.reuse(a),this.literal($.parseEscape(r));break}default:this.literal(r.pop());break}e=i}if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length!==1)throw new _e($.ERR_MISSING_PAREN,this.wholeRegexp);return this.stack[0].namedGroups=this.namedGroups,this.stack[0]}parsePerlFlags(e){const t=e.pos(),s=e.rest();if(s.startsWith("(?P<")||s.startsWith("(?<")){const a=s.charAt(2)==="P"?4:3,c=s.indexOf(">");if(c<0)throw new _e($.ERR_INVALID_NAMED_CAPTURE,s);const u=s.substring(a,c);if(e.skipString(u),e.skip(a+1),!$.isValidCaptureName(u))throw new _e($.ERR_INVALID_NAMED_CAPTURE,s.substring(0,c+1));const h=this.op(b.Op.LEFT_PAREN);if(h.cap=++this.numCap,this.namedGroups[u])throw new _e($.ERR_DUPLICATE_NAMED_CAPTURE,u);this.namedGroups[u]=this.numCap,h.name=u;return}e.skip(2);let r=this.flags,i=1,o=!1;e:for(;e.more();){const a=e.pop();switch(a){case k.CODES.get("i"):r|=U.FOLD_CASE,o=!0;break;case k.CODES.get("m"):r&=-17,o=!0;break;case k.CODES.get("s"):r|=U.DOT_NL,o=!0;break;case k.CODES.get("U"):r|=U.NON_GREEDY,o=!0;break;case k.CODES.get("-"):if(i<0)break e;i=-1,r=~r,o=!1;break;case k.CODES.get(":"):case k.CODES.get(")"):if(i<0){if(!o)break e;r=~r}a===k.CODES.get(":")&&this.op(b.Op.LEFT_PAREN),this.flags=r;return;default:break e}}throw new _e($.ERR_INVALID_PERL_OP,e.from(t))}parsePosLookBehind(){const e=this.newRegexp(b.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=++this.nlb,this.push(e)}parseNegLookBehind(){const e=this.newRegexp(b.Op.LEFT_PAREN);return e.flags=this.flags,e.lb=-++this.nlb,this.push(e)}parseVerticalBar(){this.concat(),this.swapVerticalBar()||this.op(b.Op.VERTICAL_BAR)}swapVerticalBar(){const e=this.stack.length;if(e>=3&&this.stack[e-2].op===b.Op.VERTICAL_BAR&&$.isCharClass(this.stack[e-1])&&$.isCharClass(this.stack[e-3])){let t=this.stack[e-1],s=this.stack[e-3];if(t.op>s.op){const r=s;s=t,t=r,this.stack[e-3]=s}return $.mergeCharClass(s,t),this.reuse(t),this.pop(),!0}if(e>=2){const t=this.stack[e-1],s=this.stack[e-2];if(s.op===b.Op.VERTICAL_BAR)return e>=3&&this.cleanAlt(this.stack[e-3]),this.stack[e-2]=t,this.stack[e-1]=s,!0}return!1}parseRightParen(){if(this.concat(),this.swapVerticalBar()&&this.pop(),this.alternate(),this.stack.length<2)throw new _e($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);const e=this.pop(),t=this.pop();if(t.op!==b.Op.LEFT_PAREN)throw new _e($.ERR_UNEXPECTED_PAREN,this.wholeRegexp);if(this.flags=t.flags,t.lb!==0){if($.hasCapture(e))throw new _e($.ERR_INVALID_CAPTURE_IN_LOOKBEHIND,this.wholeRegexp);t.lb>0?t.op=b.Op.PLB:t.op=b.Op.NLB,t.subs=[e],this.push(t);return}t.cap===0?this.push(e):(t.op=b.Op.CAPTURE,t.subs=[e],this.push(t))}parsePerlClassEscape(e,t){const s=e.pos();if((this.flags&U.PERL_X)===0||!e.more()||e.pop()!==k.CODES.get("\\")||!e.more())return!1;e.pop();const r=e.from(s),i=vB.has(r)?vB.get(r):null;return i===null?!1:(t.appendGroup(i,(this.flags&U.FOLD_CASE)!==0),!0)}parseNamedClass(e,t){const s=e.rest(),r=s.indexOf(":]");if(r<0)return!1;const i=s.substring(0,r+2);e.skipString(i);const o=FB.has(i)?FB.get(i):null;if(o===null)throw new _e($.ERR_INVALID_CHAR_RANGE,i);return t.appendGroup(o,(this.flags&U.FOLD_CASE)!==0),!0}parseUnicodeClass(e,t){const s=e.pos();if((this.flags&U.UNICODE_GROUPS)===0||!e.lookingAt("\\p")&&!e.lookingAt("\\P"))return!1;e.skip(1);let r=1,i=e.pop();if(i===k.CODES.get("P")&&(r=-1),!e.more())throw e.rewindTo(s),new _e($.ERR_INVALID_CHAR_RANGE,e.rest());i=e.pop();let o;if(i!==k.CODES.get("{"))o=Q.runeToString(i);else{const h=e.rest(),f=h.indexOf("}");if(f<0)throw e.rewindTo(s),new _e($.ERR_INVALID_CHAR_RANGE,e.rest());o=h.substring(0,f),e.skipString(o),e.skip(1)}o.length!==0&&o.codePointAt(0)===k.CODES.get("^")&&(r=0-r,o=o.substring(1));const a=$.unicodeTable(o);if(a===null)throw new _e($.ERR_INVALID_CHAR_RANGE,e.from(s));a.sign<0&&(r=0-r);const c=a.tab,u=a.fold;if((this.flags&U.FOLD_CASE)===0||u===null)t.appendTableWithSign(c,r);else{const h=new fn().appendTable(c).appendTable(u).cleanClass().toArray();t.appendClassWithSign(h,r)}return!0}parseClass(e){const t=e.pos();e.skip(1);const s=this.newRegexp(b.Op.CHAR_CLASS);s.flags=this.flags;const r=new fn;let i=1;e.more()&&e.lookingAt("^")&&(i=-1,e.skip(1),(this.flags&U.CLASS_NL)===0&&r.appendRange(k.CODES.get(`
`),k.CODES.get(`
`)));let o=!0;for(;!e.more()||e.peek()!==k.CODES.get("]")||o;){if(e.more()&&e.lookingAt("-")&&(this.flags&U.PERL_X)===0&&!o){const h=e.rest();if(h==="-"||!h.startsWith("-]"))throw e.rewindTo(t),new _e($.ERR_INVALID_CHAR_RANGE,e.rest())}o=!1;const a=e.pos();if(e.lookingAt("[:")){if(this.parseNamedClass(e,r))continue;e.rewindTo(a)}if(this.parseUnicodeClass(e,r)||this.parsePerlClassEscape(e,r))continue;e.rewindTo(a);const c=$.parseClassChar(e,t);let u=c;if(e.more()&&e.lookingAt("-")){if(e.skip(1),e.more()&&e.lookingAt("]"))e.skip(-1);else if(u=$.parseClassChar(e,t),u<c)throw new _e($.ERR_INVALID_CHAR_RANGE,e.from(a))}(this.flags&U.FOLD_CASE)===0?r.appendRange(c,u):r.appendFoldedRange(c,u)}e.skip(1),r.cleanClass(),i<0&&r.negateClass(),s.runes=r.toArray(),this.push(s)}},G($,"ERR_INTERNAL_ERROR","regexp/syntax: internal error"),G($,"ERR_INVALID_CHAR_RANGE","invalid character class range"),G($,"ERR_INVALID_ESCAPE","invalid escape sequence"),G($,"ERR_INVALID_NAMED_CAPTURE","invalid named capture"),G($,"ERR_INVALID_PERL_OP","invalid or unsupported Perl syntax"),G($,"ERR_INVALID_REPEAT_OP","invalid nested repetition operator"),G($,"ERR_INVALID_REPEAT_SIZE","invalid repeat count"),G($,"ERR_MISSING_BRACKET","missing closing ]"),G($,"ERR_MISSING_PAREN","missing closing )"),G($,"ERR_MISSING_REPEAT_ARGUMENT","missing argument to repetition operator"),G($,"ERR_TRAILING_BACKSLASH","trailing backslash at end of expression"),G($,"ERR_DUPLICATE_NAMED_CAPTURE","duplicate capture group name"),G($,"ERR_UNEXPECTED_PAREN","unexpected )"),G($,"ERR_NESTING_DEPTH","expression nests too deeply"),G($,"ERR_LARGE","expression too large"),G($,"ERR_INVALID_CAPTURE_IN_LOOKBEHIND","invalid capture in lookbehind"),G($,"MAX_HEIGHT",1e3),G($,"MAX_SIZE",3355443),G($,"MAX_RUNES",33554432),G($,"ANY_TABLE",new y(new Uint32Array([0,z.MAX_RUNE,1]))),G($,"ASCII_TABLE",new y(new Uint32Array([0,127,1]))),G($,"ASCII_FOLD_TABLE",new y(new Uint32Array([0,127,1,383,383,1,8490,8490,1]))),$),NE=class es{static initTest(e){const t=es.compile(e),s=new es(t.expr,t.prog,t.numSubexp,t.longest);return s.cond=t.cond,s.prefix=t.prefix,s.prefixUTF8=t.prefixUTF8,s.prefixComplete=t.prefixComplete,s.prefixRune=t.prefixRune,s.prefilter=t.prefilter,s}static compile(e){return es.compileImpl(e,U.PERL,!1)}static compilePOSIX(e){return es.compileImpl(e,U.POSIX,!0)}static compileImpl(e,t,s){let r=OE.parse(e,t);const i=r.maxCap();r=PE.simplify(r);const o=bE.build(r),a=SE.compileRegexp(r),c=new es(e,a,i,s);c.prefilter=o.type===pe.Type.NONE?null:o;const[u,h]=a.prefix();return c.prefixComplete=u,c.prefix=h,c.prefixUTF8=Q.stringToUtf8ByteArray(c.prefix),c.prefix.length>0&&(c.prefixRune=c.prefix.codePointAt(0)),c.namedGroups=r.namedGroups,c}static match(e,t){return es.compile(e).match(t)}constructor(e,t,s=0,r=0){this.expr=e,this.prog=t,this.numSubexp=s,this.longest=r,this.cond=t.startCond(),this.prefix=null,this.prefixUTF8=null,this.prefixComplete=!1,this.prefixRune=0,this.machinePool=[],this.dfa=new gE(this.prog),this.onepass=gB.compile(this.prog),this.prefilter=null}matchPrefixComplete(e,t,s,r){if((s===U.ANCHOR_START||s===U.ANCHOR_BOTH)&&t!==0)return null;let i=-1,o=-1;const a=e.prefixLength(this);if(s===U.UNANCHORED){const c=e.index(this,t);if(c<0)return null;i=t+c,o=i+a}else if(s===U.ANCHOR_BOTH){if(e.endPos()!==a||e.index(this,0)!==0)return null;i=0,o=a}else if(s===U.ANCHOR_START){if(e.index(this,0)!==0)return null;i=0,o=a}if(i<0)return null;if(r>0){const c=new Int32Array(r).fill(-1);return c[0]=i,c[1]=o,Array.from(c)}return[]}executeEngine(e,t,s,r){if(this.prefixComplete&&(r===0||this.numSubexp===0))return this.matchPrefixComplete(e,t,s,r);if(this.prefilter!==null&&s===U.UNANCHORED&&!this.prefilter.eval(e,t))return null;if(this.onepass!==null)return gB.execute(this,e,t,s,r);if(r>0)return this.prog.numLb===0&&e.endPos()<=$i.maxBitStateLen(this.prog)?$i.execute(this,e,t,s,r):this.doExecuteNFA(e,t,s,r);if(this.prog.numLb===0){const i=this.dfa.match(e,t,s);if(i!==null)return i?[]:null;if(e.endPos()<=$i.maxBitStateLen(this.prog))return $i.execute(this,e,t,s,r)}return this.doExecuteNFA(e,t,s,r)}numberOfCapturingGroups(){return this.numSubexp}numberOfInstructions(){return this.prog.numInst()}get(){return this.machinePool.length>0?this.machinePool.pop():null}reset(){this.machinePool.length=0}put(e){this.machinePool.push(e)}toString(){return this.expr}doExecuteNFA(e,t,s,r){let i=this.get();i||(i=fE.fromRE2(this)),i.init(r);const o=i.match(e,t,s)?i.submatches():null;return this.put(i),o}match(e){return this.executeEngine(we.fromUTF16(e),0,U.UNANCHORED,0)!==null}matchWithGroup(e,t,s,r,i){return e instanceof fs||(Q.isByteArray(e)?e=rs.utf8(e):e=rs.utf16(e)),this.matchMachineInput(e,t,s,r,i)}matchMachineInput(e,t,s,r,i){if(t>s)return[!1,null];const o=e.isUTF16Encoding()?we.fromUTF16(e.asCharSequence(),0,s):we.fromUTF8(e.asBytes(),0,s),a=this.executeEngine(o,t,r,2*i);return a===null?[!1,null]:[!0,a]}matchUTF8(e){return this.executeEngine(we.fromUTF8(e),0,U.UNANCHORED,0)!==null}replaceAll(e,t){return this.replaceAllFunc(e,()=>t,2*e.length+1)}replaceFirst(e,t){return this.replaceAllFunc(e,()=>t,1)}replaceAllFunc(e,t,s){let r=0,i=0,o="";const a=we.fromUTF16(e);let c=0;for(;i<=e.length;){const u=this.executeEngine(a,i,U.UNANCHORED,2);if(u===null||u.length===0)break;o+=e.substring(r,u[0]),(u[1]>r||u[0]===0)&&(o+=t(e.substring(u[0],u[1])),c++),r=u[1];const h=a.step(i)&7;if(i+h>u[1]?i+=h:i+1>u[1]?i++:i=u[1],c>=s)break}return o+=e.substring(r),o}pad(e){if(e===null)return null;let t=(1+this.numSubexp)*2;if(e.length<t){let s=new Array(t).fill(-1);for(let r=0;r<e.length;r++)s[r]=e[r];e=s}return e}allMatches(e,t,s=r=>r){let r=[];const i=e.endPos();t<0&&(t=i+1);let o=0,a=0,c=-1;for(;a<t&&o<=i;){const u=this.executeEngine(e,o,U.UNANCHORED,this.prog.numCap);if(u===null||u.length===0)break;let h=!0;if(u[1]===o){u[0]===c&&(h=!1);const f=e.step(o);f<0?o=i+1:o+=f&7}else o=u[1];c=u[1],h&&(r.push(s(this.pad(u))),a++)}return r}findUTF8(e){const t=this.executeEngine(we.fromUTF8(e),0,U.UNANCHORED,2);return t===null?null:e.slice(t[0],t[1])}findUTF8Index(e){const t=this.executeEngine(we.fromUTF8(e),0,U.UNANCHORED,2);return t===null?null:t.slice(0,2)}find(e){const t=this.executeEngine(we.fromUTF16(e),0,U.UNANCHORED,2);return t===null?"":e.substring(t[0],t[1])}findIndex(e){return this.executeEngine(we.fromUTF16(e),0,U.UNANCHORED,2)}findUTF8Submatch(e){const t=this.executeEngine(we.fromUTF8(e),0,U.UNANCHORED,this.prog.numCap);if(t===null)return null;const s=new Array(1+this.numSubexp).fill(null);for(let r=0;r<s.length;r++)2*r<t.length&&t[2*r]>=0&&(s[r]=e.slice(t[2*r],t[2*r+1]));return s}findUTF8SubmatchIndex(e){return this.pad(this.executeEngine(we.fromUTF8(e),0,U.UNANCHORED,this.prog.numCap))}findSubmatch(e){const t=this.executeEngine(we.fromUTF16(e),0,U.UNANCHORED,this.prog.numCap);if(t===null)return null;const s=new Array(1+this.numSubexp).fill(null);for(let r=0;r<s.length;r++)2*r<t.length&&t[2*r]>=0&&(s[r]=e.substring(t[2*r],t[2*r+1]));return s}findSubmatchIndex(e){return this.pad(this.executeEngine(we.fromUTF16(e),0,U.UNANCHORED,this.prog.numCap))}findAllUTF8(e,t){const s=this.allMatches(we.fromUTF8(e),t,r=>e.slice(r[0],r[1]));return s.length===0?null:s}findAllUTF8Index(e,t){const s=this.allMatches(we.fromUTF8(e),t,r=>r.slice(0,2));return s.length===0?null:s}findAll(e,t){const s=this.allMatches(we.fromUTF16(e),t,r=>e.substring(r[0],r[1]));return s.length===0?null:s}findAllIndex(e,t){const s=this.allMatches(we.fromUTF16(e),t,r=>r.slice(0,2));return s.length===0?null:s}findAllUTF8Submatch(e,t){const s=this.allMatches(we.fromUTF8(e),t,r=>{let i=new Array(r.length/2|0).fill(null);for(let o=0;o<i.length;o++)r[2*o]>=0&&(i[o]=e.slice(r[2*o],r[2*o+1]));return i});return s.length===0?null:s}findAllUTF8SubmatchIndex(e,t){const s=this.allMatches(we.fromUTF8(e),t);return s.length===0?null:s}findAllSubmatch(e,t){const s=this.allMatches(we.fromUTF16(e),t,r=>{let i=new Array(r.length/2|0).fill(null);for(let o=0;o<i.length;o++)r[2*o]>=0&&(i[o]=e.substring(r[2*o],r[2*o+1]));return i});return s.length===0?null:s}findAllSubmatchIndex(e,t){const s=this.allMatches(we.fromUTF16(e),t);return s.length===0?null:s}},kE=class Ss{static isHexadecimal(e){return"0"<=e&&e<="9"||"A"<=e&&e<="F"||"a"<=e&&e<="f"}static translate(e){let t="";if(e instanceof RegExp&&(e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e=e.source),typeof e!="string")return e;let s="",r=!1,i=e.length;i===0&&(s="(?:)",r=!0);let o=!1,a=0;for(;a<i;){let u=e[a];if(u==="\\"){if(a+1<i)switch(u=e[a+1],u){case"\\":s+="\\\\",a+=2;continue;case"c":if(a+2<i){let p=e[a+2].charCodeAt(0);if(p>=65&&p<=90||p>=97&&p<=122){let g=p%32;s+="\\x",s+=(g>>4).toString(16).toUpperCase(),s+=(g&15).toString(16).toUpperCase(),a+=3,r=!0;continue}}s+="c",a+=2,r=!0;continue;case"u":if(a+2<i){if(e[a+2]==="{"){let p=a+3,g=!1,D=!1;for(;p<i;){const R=e[p];if(R==="}"){D=!0;break}if(!Ss.isHexadecimal(R))break;g=!0,p++}if(D&&g){s+="\\x",a+=2,r=!0;continue}}else if(a+5<i){let p=!0;for(let g=0;g<4;g++)if(!Ss.isHexadecimal(e[a+2+g])){p=!1;break}if(p){s+="\\x{"+e.substring(a+2,a+6)+"}",a+=6,r=!0;continue}}}s+="u",a+=2,r=!0;continue;case"x":{let p=!1;if(a+2<i&&e[a+2]==="{"){let g=a+3,D=!1,R=!1;for(;g<i;){const M=e[g];if(M==="}"){R=!0;break}if(!Ss.isHexadecimal(M))break;D=!0,g++}R&&D&&(p=!0)}else a+3<i&&Ss.isHexadecimal(e[a+2])&&Ss.isHexadecimal(e[a+3])&&(p=!0);p?(s+="\\x",a+=2):(s+="x",a+=2,r=!0);continue}case"n":case"r":case"t":case"a":case"f":case"v":case"d":case"D":case"s":case"S":case"w":case"W":case"b":case"B":case"p":case"P":case"A":case"z":case"Q":case"E":case"0":case"1":case"2":case"3":case"4":case"5":case"6":case"7":s+="\\"+u,a+=2;continue;default:{let p=e.codePointAt(a+1);if(p>=48&&p<=57||p>=65&&p<=90||p>=97&&p<=122){let g=Q.charCount(p);s+=e.substring(a+1,a+1+g),a+=g+1,r=!0}else{s+="\\";let g=Q.charCount(p);s+=e.substring(a+1,a+1+g),a+=g+1}continue}}}else if(u==="/"){s+="\\/",a+=1,r=!0;continue}else if(u==="[")o=!0;else if(u==="]")o=!1;else if(!o&&u==="("&&a+2<i&&e[a+1]==="?"&&e[a+2]==="<"&&a+3<i&&!"=!>)".includes(e[a+3])){s+="(?P<",a+=3,r=!0;continue}let h=e.codePointAt(a),f=Q.charCount(h);s+=e.substring(a,a+f),a+=f}const c=r?s:e;return t.length>0?`(?${t})${c}`:c}},ke,ql=(ke=class{static quote(e){return Q.quoteMeta(e)}static quoteReplacement(e,t=!1){return dB.quoteReplacement(e,t)}static translateRegExp(e){return kE.translate(e)}static compile(e,t=0){let s=e;if((t&ke.CASE_INSENSITIVE)!==0&&(s=`(?i)${s}`),(t&ke.DOTALL)!==0&&(s=`(?s)${s}`),(t&ke.MULTILINE)!==0&&(s=`(?m)${s}`),(t&-544)!==0)throw new dE("Flags should only be a combination of MULTILINE, DOTALL, CASE_INSENSITIVE, DISABLE_UNICODE_GROUPS, LONGEST_MATCH, LOOKBEHINDS");let r=U.PERL;(t&ke.DISABLE_UNICODE_GROUPS)!==0&&(r&=-129),(t&ke.LOOKBEHINDS)!==0&&(r|=U.LOOKBEHIND);const i=new ke(e,t);return i.re2Input=NE.compileImpl(s,r,(t&ke.LONGEST_MATCH)!==0),i}static matches(e,t){return ke.compile(e).testExact(t)}static initTest(e,t,s){if(e==null)throw new Error("pattern is null");if(s==null)throw new Error("re2 is null");const r=new ke(e,t);return r.re2Input=s,r}constructor(e,t){this.patternInput=e,this.flagsInput=t,this.re2Input=null}reset(){this.re2Input.reset()}flags(){return this.flagsInput}pattern(){return this.patternInput}re2(){return this.re2Input}matches(e){return this.testExact(e)}matcher(e){return Q.isByteArray(e)&&(e=rs.utf8(e)),new dB(this,e)}test(e){return Q.isByteArray(e)?this.re2Input.matchUTF8(e):this.re2Input.match(e)}testExact(e){const t=Q.isByteArray(e)?we.fromUTF8(e):we.fromUTF16(e);return this.re2Input.executeEngine(t,0,U.ANCHOR_BOTH,0)!==null}exec(e){const t=this.matcher(e);if(!t.find())return null;const s=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const o=t.group(i);s.push(o===null?void 0:o)}s.index=t.start(0),s.input=e;const r=this.namedGroups();if(Object.keys(r).length>0){const i=t.getNamedGroups();for(const o in i)i[o]===null&&(i[o]=void 0);s.groups=i}else s.groups=void 0;return s}split(e,t=0){const s=this.matcher(e),r=[];let i=0,o=0;for(;s.find();){if(o===0&&s.end()===0){o=s.end();continue}if(t>0&&r.length===t-1)break;if(o===s.start()){if(t===0){i+=1,o=s.end();continue}}else for(;i>0;)r.push(""),i-=1;r.push(s.substring(o,s.start())),o=s.end()}if(t===0&&o!==s.inputLength()){for(;i>0;)r.push(""),i-=1;r.push(s.substring(o,s.inputLength()))}return(t!==0||r.length===0&&!(o===s.inputLength()&&o>0))&&r.push(s.substring(o,s.inputLength())),r}*matchAll(e){const t=this.matcher(e);for(;t.find();){const s=[t.group(0)];for(let i=1;i<=t.groupCount();i++){const o=t.group(i);s.push(o===null?void 0:o)}s.index=t.start(0),s.input=e;const r=this.namedGroups();if(Object.keys(r).length>0){const i=t.getNamedGroups();for(const o in i)i[o]===null&&(i[o]=void 0);s.groups=i}else s.groups=void 0;yield s}}toString(){return this.patternInput}programSize(){return this.re2Input.numberOfInstructions()}groupCount(){return this.re2Input.numberOfCapturingGroups()}namedGroups(){return this.re2Input.namedGroups}equals(e){return this===e?!0:e===null||this.constructor!==e.constructor?!1:this.flagsInput===e.flagsInput&&this.patternInput===e.patternInput}},G(ke,"CASE_INSENSITIVE",Ts.CASE_INSENSITIVE),G(ke,"DOTALL",Ts.DOTALL),G(ke,"MULTILINE",Ts.MULTILINE),G(ke,"DISABLE_UNICODE_GROUPS",Ts.DISABLE_UNICODE_GROUPS),G(ke,"LONGEST_MATCH",Ts.LONGEST_MATCH),G(ke,"LOOKBEHINDS",Ts.LOOKBEHINDS),ke);/**
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
 */let Qs="12.19.0";function LE(n){Qs=n}/**
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
 */const ps=new Rl("@firebase/firestore");function Ps(){return ps.logLevel}function K(n,...e){if(ps.logLevel<=Be.DEBUG){const t=e.map(Jl);ps.debug(`Firestore (${Qs}): ${n}`,...t)}}function sn(n,...e){if(ps.logLevel<=Be.ERROR){const t=e.map(Jl);ps.error(`Firestore (${Qs}): ${n}`,...t)}}function Ot(n,...e){if(ps.logLevel<=Be.WARN){const t=e.map(Jl);ps.warn(`Firestore (${Qs}): ${n}`,...t)}}function Jl(n){if(typeof n=="string")return n;try{return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
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
 */function ee(n,e,t){let s="Unexpected state";typeof e=="string"?s=e:t=e,qd(n,s,t)}function qd(n,e,t){let s=`FIRESTORE (${Qs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{s+=" CONTEXT: "+JSON.stringify(t)}catch{s+=" CONTEXT: "+t}throw sn(s),new Error(s)}function W(n,e,t,s){let r="Unexpected state";typeof t=="string"?r=t:s=t,n||qd(e,r,s)}function ie(n,e){return n}/**
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
 */function xE(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
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
 */class jl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let s="";for(;s.length<20;){const r=xE(40);for(let i=0;i<r.length;++i)s.length<20&&r[i]<t&&(s+=e.charAt(r[i]%62))}return s}}function ue(n,e){return n<e?-1:n>e?1:0}function dl(n,e){const t=Math.min(n.length,e.length);for(let s=0;s<t;s++){const r=n.charAt(s),i=e.charAt(s);if(r!==i)return qa(r)===qa(i)?ue(r,i):qa(r)?1:-1}return ue(n.length,e.length)}const FE=55296,ME=57343;function qa(n){const e=n.charCodeAt(0);return e>=FE&&e<=ME}function Hs(n,e,t){return n.length===e.length&&n.every(((s,r)=>t(s,e[r])))}/**
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
 */class Ae{constructor(e,t){this.comparator=e,this.root=t||Ke.EMPTY}insert(e,t){return new Ae(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ke.BLACK,null,null))}remove(e){return new Ae(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ke.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const r=this.comparator(e,s.key);if(r===0)return t+s.left.size;r<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,s)=>(e(t,s),!1)))}toString(){const e=[];return this.inorderTraversal(((t,s)=>(e.push(`${t}:${s}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Ji(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Ji(this.root,e,this.comparator,!1)}getReverseIterator(){return new Ji(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Ji(this.root,e,this.comparator,!0)}}class Ji{constructor(e,t,s,r){this.isReverse=r,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?s(e.key,t):1,t&&r&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ke{constructor(e,t,s,r,i){this.key=e,this.value=t,this.color=s??Ke.RED,this.left=r??Ke.EMPTY,this.right=i??Ke.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,r,i){return new Ke(e??this.key,t??this.value,s??this.color,r??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let r=this;const i=s(e,r.key);return r=i<0?r.copy(null,null,null,r.left.insert(e,t,s),null):i===0?r.copy(null,t,null,null,null):r.copy(null,null,null,null,r.right.insert(e,t,s)),r.fixUp()}removeMin(){if(this.left.isEmpty())return Ke.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,r=this;if(t(e,r.key)<0)r.left.isEmpty()||r.left.isRed()||r.left.left.isRed()||(r=r.moveRedLeft()),r=r.copy(null,null,null,r.left.remove(e,t),null);else{if(r.left.isRed()&&(r=r.rotateRight()),r.right.isEmpty()||r.right.isRed()||r.right.left.isRed()||(r=r.moveRedRight()),t(e,r.key)===0){if(r.right.isEmpty())return Ke.EMPTY;s=r.right.min(),r=r.copy(s.key,s.value,null,null,r.right.removeMin())}r=r.copy(null,null,null,null,r.right.remove(e,t))}return r.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ke.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ke.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw ee(43730,{key:this.key,value:this.value});if(this.right.isRed())throw ee(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw ee(27949);return e+(this.isRed()?0:1)}}Ke.EMPTY=null,Ke.RED=!0,Ke.BLACK=!1;Ke.EMPTY=new class{constructor(){this.size=0}get key(){throw ee(57766)}get value(){throw ee(16141)}get color(){throw ee(16727)}get left(){throw ee(29726)}get right(){throw ee(36894)}copy(e,t,s,r,i){return this}insert(e,t,s){return new Ke(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class Fe{constructor(e){this.comparator=e,this.data=new Ae(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,s)=>(e(t),!1)))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const r=s.getNext();if(this.comparator(r.key,e[1])>=0)return;t(r.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new MB(this.data.getIterator())}getIteratorFrom(e){return new MB(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((s=>{t=t.add(s)})),t}isEqual(e){if(!(e instanceof Fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(this.comparator(r,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new Fe(this.comparator);return t.data=e,t}}class MB{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */const F={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class j extends on{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */const Gs="__name__";class xt{constructor(e,t,s){t===void 0?t=0:t>e.length&&ee(637,{offset:t,range:e.length}),s===void 0?s=e.length-t:s>e.length-t&&ee(1746,{length:s,range:e.length-t}),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return xt.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof xt?e.forEach((s=>{t.push(s)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let r=0;r<s;r++){const i=xt.compareSegments(e.get(r),t.get(r));if(i!==0)return i}return ue(e.length,t.length)}static compareSegments(e,t){const s=xt.isNumericId(e),r=xt.isNumericId(t);return s&&!r?-1:!s&&r?1:s&&r?xt.extractNumericId(e).compare(xt.extractNumericId(t)):dl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return bn.fromString(e.substring(4,e.length-2))}}class me extends xt{construct(e,t,s){return new me(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toStringWithLeadingSlash(){return`/${this.canonicalString()}`}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new j(F.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter((r=>r.length>0)))}return new me(t)}static emptyPath(){return new me([])}}const VE=/^[_a-zA-Z][_a-zA-Z0-9]*$/;let Et=class Rs extends xt{construct(e,t,s){return new Rs(e,t,s)}static isValidIdentifier(e){return VE.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),Rs.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Gs}static keyField(){return new Rs([Gs])}static fromServerFormat(e){const t=[];let s="",r=0;const i=()=>{if(s.length===0)throw new j(F.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let o=!1;for(;r<e.length;){const a=e[r];if(a==="\\"){if(r+1===e.length)throw new j(F.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const c=e[r+1];if(c!=="\\"&&c!=="."&&c!=="`")throw new j(F.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=c,r+=2}else a==="`"?(o=!o,r++):a!=="."||o?(s+=a,r++):(i(),r++)}if(i(),o)throw new j(F.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new Rs(t)}static emptyPath(){return new Rs([])}};/**
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
 */class Ct{constructor(e){this.fields=e,e.sort(Et.comparator)}static empty(){return new Ct([])}unionWith(e){let t=new Fe(Et.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Ct(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Hs(this.fields,e.fields,((t,s)=>t.isEqual(s)))}}/**
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
 */function Co(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function $n(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function UE(n,e){const t=[];for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&t.push(e(n[s],s,n));return t}function Jd(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */class Y{constructor(e){this.path=e}static fromPath(e){return new Y(me.fromString(e))}static fromName(e){return new Y(me.fromString(e).popFirst(5))}static empty(){return new Y(me.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&me.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return me.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new Y(new me(e.slice()))}}/**
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
 */function jd(n,e,t){if(!t)throw new j(F.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function HE(n,e,t,s){if(e===!0&&s===!0)throw new j(F.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function VB(n){if(!Y.isDocumentKey(n))throw new j(F.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function UB(n){if(Y.isDocumentKey(n))throw new j(F.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function hi(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Vo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(s){return s.constructor?s.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":ee(12329,{type:typeof n})}function Ut(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new j(F.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Vo(n);throw new j(F.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */function xe(n,e){const t={typeString:n};return e&&(t.value=e),t}function di(n,e){if(!hi(n))throw new j(F.INVALID_ARGUMENT,"JSON must be an object");let t;for(const s in e)if(e[s]){const r=e[s].typeString,i="value"in e[s]?{value:e[s].value}:void 0;if(!(s in n)){t=`JSON missing required field: '${s}'`;break}const o=n[s];if(r&&typeof o!==r){t=`JSON field '${s}' must be a ${r}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${s}' field to equal '${i.value}'`;break}}if(t)throw new j(F.INVALID_ARGUMENT,t);return!0}/**
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
 */const HB=-62135596800,GB=1e6;class ge{static now(){return ge.fromMillis(Date.now())}static fromDate(e){return ge.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor((e-1e3*t)*GB);return new ge(t,s)}static fromInstant(e){if(!e||typeof e.t!="bigint")throw new j(F.INVALID_ARGUMENT,"Invalid Temporal.Instant object provided.");return ge._fromEpochNanoseconds(e.t)}static _fromEpochNanoseconds(e){let t,s;if(e>=0n)t=Number(e/1000000000n),s=Number(e%1000000000n);else{const r=e%1000000000n;r===0n?(t=Number(e/1000000000n),s=0):(t=Number(e/1000000000n-1n),s=Number(r+1000000000n))}return new ge(t,s)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new j(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new j(F.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<HB)throw new j(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new j(F.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/GB}toInstant(){if(typeof Temporal>"u"||!Temporal.Instant)throw new j(F.FAILED_PRECONDITION,"The Temporal object is not available in the current environment.");const e=1000000000n*BigInt(this.seconds)+BigInt(this.nanoseconds);return Temporal.Instant.__PRIVATE_fromEpochNanoseconds(e)}_compareTo(e){return this.seconds===e.seconds?ue(this.nanoseconds,e.nanoseconds):ue(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:ge._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(di(e,ge._jsonSchema))return new ge(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-HB;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}ge._jsonSchemaVersion="firestore/timestamp/1.0",ge._jsonSchema={type:xe("string",ge._jsonSchemaVersion),seconds:xe("number"),nanoseconds:xe("number")};/**
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
 */class Kd extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ve{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(r){try{return atob(r)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Kd("Invalid base64 string: "+i):i}})(e);return new Ve(t)}static fromUint8Array(e){const t=(function(r){let i="";for(let o=0;o<r.length;++o)i+=String.fromCharCode(r[o]);return i})(e);return new Ve(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const s=new Uint8Array(t.length);for(let r=0;r<t.length;r++)s[r]=t.charCodeAt(r);return s})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return ue(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ve.EMPTY_BYTE_STRING=new Ve("");const GE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function On(n){if(W(!!n,39018),typeof n=="string"){let e=0;const t=GE.exec(n);if(W(!!t,46558,{timestamp:n}),t[1]){let r=t[1];r=(r+"000000000").substr(0,9),e=Number(r)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Se(n.seconds),nanos:Se(n.nanos)}}function Se(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Nn(n){return typeof n=="string"?Ve.fromBase64String(n):Ve.fromUint8Array(n)}/**
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
 */const zd="server_timestamp",Wd="__type__",Qd="__previous_value__",Yd="__local_write_time__";function Uo(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Wd])==null?void 0:s.stringValue)===zd}function fi(n){const e=n.mapValue.fields[Qd];return Uo(e)?fi(e):e}function $s(n){const e=On(n.mapValue.fields[Yd].timestampValue);return new ge(e.seconds,e.nanos)}/**
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
 */class $E{constructor(e,t,s,r,i,o,a,c,u,h,f,p,g){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=r,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=c,this.useFetchStreams=u,this.isUsingEmulator=h,this.apiKey=f,this._customHeaders=p,this.grpcFlowControlWindow=g}}const yo="(default)";class $r{constructor(e,t){this.projectId=e,this.database=t||yo}static empty(){return new $r("","")}get isDefaultDatabase(){return this.database===yo}isEqual(e){return e instanceof $r&&e.projectId===this.projectId&&e.database===this.database}}function qE(n,e){if(!Object.prototype.hasOwnProperty.apply(n.options,["projectId"]))throw new j(F.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new $r(n.options.projectId,e)}/**
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
 */const Kl=-1;function Ho(n){return n==null}function qr(n){return n===0&&1/n==-1/0}function JE(n){return typeof n=="number"&&Number.isInteger(n)&&!qr(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}function jE(n){return typeof n=="string"}/**
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
 */const Xd="__type__",KE="__max__",ji={mapValue:{}},Zd="__vector__",Jr="value",qs={nullValue:"NULL_VALUE"},ht={booleanValue:!0},je={booleanValue:!1};function Ue(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Uo(n)?4:zE(n)?9007199254740991:Eo(n)?10:11:ee(28295,{value:n})}function St(n,e,t){if(n===e)return!0;const s=Ue(n);if(s!==Ue(e))return!1;switch(s){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return $s(n).isEqual($s(e));case 3:return(function(i,o){if(typeof i.timestampValue=="string"&&typeof o.timestampValue=="string"&&i.timestampValue.length===o.timestampValue.length)return i.timestampValue===o.timestampValue;const a=On(i.timestampValue),c=On(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(i,o){return Nn(i.bytesValue).isEqual(Nn(o.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(i,o){return Se(i.geoPointValue.latitude)===Se(o.geoPointValue.latitude)&&Se(i.geoPointValue.longitude)===Se(o.geoPointValue.longitude)})(n,e);case 2:return(function(i,o,a){if("integerValue"in i&&"integerValue"in o)return Se(i.integerValue)===Se(o.integerValue);let c,u;if("doubleValue"in i&&"doubleValue"in o)c=Se(i.doubleValue),u=Se(o.doubleValue);else{if(!(a!=null&&a.i))return!1;c=Se(i.integerValue??i.doubleValue),u=Se(o.integerValue??o.doubleValue)}return c===u?!!(a!=null&&a.o)||qr(c)===qr(u):!!(a===void 0||a.u)&&isNaN(c)&&isNaN(u)})(n,e,t);case 9:return Hs(n.arrayValue.values||[],e.arrayValue.values||[],((r,i)=>St(r,i,t)));case 10:case 11:return(function(i,o,a){const c=i.mapValue.fields||{},u=o.mapValue.fields||{};if(Co(c)!==Co(u))return!1;for(const h in c)if(c.hasOwnProperty(h)&&(u[h]===void 0||!St(c[h],u[h],a)))return!1;return!0})(n,e,t);default:return ee(52216,{left:n})}}function jr(n,e){return(n.values||[]).find((t=>St(t,e)))!==void 0}function dt(n,e){if(n===e)return 0;const t=Ue(n),s=Ue(e);if(t!==s)return ue(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return ue(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const a=Se(i.integerValue||i.doubleValue),c=Se(o.integerValue||o.doubleValue);return a<c?-1:a>c?1:a===c?0:isNaN(a)?isNaN(c)?0:-1:1})(n,e);case 3:return $B(n.timestampValue,e.timestampValue);case 4:return $B($s(n),$s(e));case 5:return dl(n.stringValue,e.stringValue);case 6:return(function(i,o){const a=Nn(i),c=Nn(o);return a.compareTo(c)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const a=i.split("/"),c=o.split("/");for(let u=0;u<a.length&&u<c.length;u++){const h=ue(a[u],c[u]);if(h!==0)return h}return ue(a.length,c.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const a=ue(Se(i.latitude),Se(o.latitude));return a!==0?a:ue(Se(i.longitude),Se(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return qB(n.arrayValue,e.arrayValue);case 10:return(function(i,o){var p,g,D,R;const a=i.fields||{},c=o.fields||{},u=(p=a[Jr])==null?void 0:p.arrayValue,h=(g=c[Jr])==null?void 0:g.arrayValue,f=ue(((D=u==null?void 0:u.values)==null?void 0:D.length)||0,((R=h==null?void 0:h.values)==null?void 0:R.length)||0);return f!==0?f:qB(u,h)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===ji.mapValue&&o===ji.mapValue)return 0;if(i===ji.mapValue)return 1;if(o===ji.mapValue)return-1;const a=i.fields||{},c=Object.keys(a),u=o.fields||{},h=Object.keys(u);c.sort(),h.sort();for(let f=0;f<c.length&&f<h.length;++f){const p=dl(c[f],h[f]);if(p!==0)return p;const g=dt(a[c[f]],u[h[f]]);if(g!==0)return g}return ue(c.length,h.length)})(n.mapValue,e.mapValue);default:throw ee(23264,{l:t})}}function $B(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return ue(n,e);const t=On(n),s=On(e),r=ue(t.seconds,s.seconds);return r!==0?r:ue(t.nanos,s.nanos)}function qB(n,e){const t=n.values||[],s=e.values||[];for(let r=0;r<t.length&&r<s.length;++r){const i=dt(t[r],s[r]);if(i!==void 0&&i!==0)return i}return ue(t.length,s.length)}function Js(n){return fl(n)}function fl(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const s=On(t);return`time(${s.seconds},${s.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Nn(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return Y.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let s="[",r=!0;for(const i of t.values||[])r?r=!1:s+=",",s+=fl(i);return s+"]"})(n.arrayValue):"mapValue"in n?(function(t){const s=Object.keys(t.fields||{}).sort();let r="{",i=!0;for(const o of s)i?i=!1:r+=",",r+=`${o}:${fl(t.fields[o])}`;return r+"}"})(n.mapValue):ee(61005,{value:n})}function ro(n){switch(Ue(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=fi(n);return e?16+ro(e):16;case 5:return 2*n.stringValue.length;case 6:return Nn(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(s){return(s.values||[]).reduce(((r,i)=>r+ro(i)),0)})(n.arrayValue);case 10:case 11:return(function(s){let r=0;return $n(s.fields,((i,o)=>{r+=i.length+ro(o)})),r})(n.mapValue);default:throw ee(13486,{value:n})}}function JB(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function Ft(n){return!!n&&"integerValue"in n}function is(n){return!!n&&"doubleValue"in n}function kn(n){return Ft(n)||is(n)}function js(n){return!!n&&"arrayValue"in n}function yt(n){return!!n&&"nullValue"in n}function ft(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function ls(n){return!!n&&"mapValue"in n}function Eo(n){var t,s;return((s=(((t=n==null?void 0:n.mapValue)==null?void 0:t.fields)||{})[Xd])==null?void 0:s.stringValue)===Zd}function pl(n){var e,t;return(t=(((e=n==null?void 0:n.mapValue)==null?void 0:e.fields)||{})[Jr])==null?void 0:t.arrayValue}function Or(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return $n(n.mapValue.fields,((t,s)=>e.mapValue.fields[t]=Or(s))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Or(n.arrayValue.values[t]);return e}return{...n}}function zE(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===KE}/**
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
 */class st{constructor(e){this.value=e}static empty(){return new st({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!ls(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Or(t)}setAll(e){let t=Et.emptyPath(),s={},r=[];e.forEach(((o,a)=>{if(!t.isImmediateParentOf(a)){const c=this.getFieldsMap(t);this.applyChanges(c,s,r),s={},r=[],t=a.popLast()}o?s[a.lastSegment()]=Or(o):r.push(a.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,s,r)}delete(e){const t=this.field(e.popLast());ls(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return St(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let r=t.mapValue.fields[e.get(s)];ls(r)&&r.mapValue.fields||(r={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=r),t=r}return t.mapValue.fields}applyChanges(e,t,s){$n(t,((r,i)=>e[r]=i));for(const r of s)delete e[r]}clone(){return new st(Or(this.value))}}function ef(n){const e=[];return $n(n.fields,((t,s)=>{const r=new Et([t]);if(ls(s)){const i=ef(s.mapValue).fields;if(i.length===0)e.push(r);else for(const o of i)e.push(r.child(o))}else e.push(r)})),new Ct(e)}/**
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
 */function Go(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:qr(e)?"-0":e}}function zl(n){return{integerValue:""+n}}function Wl(n,e,t){return JE(e)?zl(e):Go(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class $o{constructor(){this._=void 0}}function WE(n,e,t){return n instanceof _o?(function(r,i){const o={fields:{[Wd]:{stringValue:zd},[Yd]:{timestampValue:{seconds:r.seconds,nanos:r.nanoseconds}}}};return i&&Uo(i)&&(i=fi(i)),i&&(o.fields[Qd]=i),{mapValue:o}})(t,e):n instanceof Kr?nf(n,e):n instanceof zr?sf(n,e):n instanceof Wr?(function(r,i){const o=tf(r,i),a=wo(o)+wo(r.h);return Ft(o)&&Ft(r.h)?zl(a):Go(r.serializer,a)})(n,e):n instanceof vo?(function(r,i){return jB(r,i,Math.min)})(n,e):n instanceof Do?(function(r,i){return jB(r,i,Math.max)})(n,e):void 0}function QE(n,e,t){return n instanceof Kr?nf(n,e):n instanceof zr?sf(n,e):t}function tf(n,e){return n instanceof Wr?kn(e)?e:{integerValue:0}:null}class _o extends $o{}class Kr extends $o{constructor(e){super(),this.elements=e}}function nf(n,e){const t=rf(e);for(const s of n.elements)t.some((r=>St(r,s)))||t.push(s);return{arrayValue:{values:t}}}class zr extends $o{constructor(e){super(),this.elements=e}}function sf(n,e){let t=rf(e);for(const s of n.elements)t=t.filter((r=>!St(r,s)));return{arrayValue:{values:t}}}class Ql extends $o{constructor(e,t){super(),this.serializer=e,this.h=t}}class Wr extends Ql{}class vo extends Ql{}class Do extends Ql{}function jB(n,e,t){if(!kn(e))return n.h;const s=t(wo(e),wo(n.h));return Ft(e)&&Ft(n.h)?zl(s):Go(n.serializer,s)}function wo(n){return Se(n.integerValue||n.doubleValue)}function rf(n){return js(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function YE(n,e){return n.field.isEqual(e.field)&&(function(s,r){return s instanceof Kr&&r instanceof Kr||s instanceof zr&&r instanceof zr?Hs(s.elements,r.elements,St):s instanceof Wr&&r instanceof Wr||s instanceof vo&&r instanceof vo||s instanceof Do&&r instanceof Do?St(s.h,r.h):s instanceof _o&&r instanceof _o})(n.transform,e.transform)}class XE{constructor(e,t){this.version=e,this.transformResults=t}}class _t{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new _t}static exists(e){return new _t(void 0,e)}static updateTime(e){return new _t(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function io(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class qo{}function of(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Jo(n.key,_t.none()):new pi(n.key,n.data,_t.none());{const t=n.data,s=st.empty();let r=new Fe(Et.comparator);for(let i of e.fields)if(!r.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?s.delete(i):s.set(i,o),r=r.add(i)}return new qn(n.key,s,new Ct(r.toArray()),_t.none())}}function ZE(n,e,t){n instanceof pi?(function(r,i,o){const a=r.value.clone(),c=zB(r.fieldTransforms,i,o.transformResults);a.setAll(c),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()})(n,e,t):n instanceof qn?(function(r,i,o){if(!io(r.precondition,i))return void i.convertToUnknownDocument(o.version);const a=zB(r.fieldTransforms,i,o.transformResults),c=i.data;c.setAll(af(r)),c.setAll(a),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):(function(r,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Nr(n,e,t,s){return n instanceof pi?(function(i,o,a,c){if(!io(i.precondition,o))return a;const u=i.value.clone(),h=WB(i.fieldTransforms,c,o);return u.setAll(h),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),null})(n,e,t,s):n instanceof qn?(function(i,o,a,c){if(!io(i.precondition,o))return a;const u=WB(i.fieldTransforms,c,o),h=o.data;return h.setAll(af(i)),h.setAll(u),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((f=>f.field)))})(n,e,t,s):(function(i,o,a){return io(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a})(n,e,t)}function e_(n,e){let t=null;for(const s of n.fieldTransforms){const r=e.data.field(s.field),i=tf(s.transform,r||null);i!=null&&(t===null&&(t=st.empty()),t.set(s.field,i))}return t||null}function KB(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(s,r){return s===void 0&&r===void 0||!(!s||!r)&&Hs(s,r,((i,o)=>YE(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class pi extends qo{constructor(e,t,s,r=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=r,this.type=0}getFieldMask(){return null}}class qn extends qo{constructor(e,t,s,r,i=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=r,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function af(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}})),e}function zB(n,e,t){const s=new Map;W(n.length===t.length,32656,{T:t.length,P:n.length});for(let r=0;r<t.length;r++){const i=n[r],o=i.transform,a=e.data.field(i.field);s.set(i.field,QE(o,a,t[r]))}return s}function WB(n,e,t){const s=new Map;for(const r of n){const i=r.transform,o=t.data.field(r.field);s.set(r.field,WE(i,o,e))}return s}class Jo extends qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class t_ extends qo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Io{constructor(e,t){this.position=e,this.inclusive=t}}function QB(n,e,t){let s=0;for(let r=0;r<n.position.length;r++){const i=e[r],o=n.position[r];if(i.field.isKeyField()?s=Y.comparator(Y.fromName(o.referenceValue),t.key):s=dt(o,t.data.field(i.field)),i.dir==="desc"&&(s*=-1),s!==0)break}return s}function YB(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!St(n.position[t],e.position[t]))return!1;return!0}/**
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
 */class lf{}class Le extends lf{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new s_(e,t,s):t==="array-contains"?new o_(e,s):t==="in"?new a_(e,s):t==="not-in"?new l_(e,s):t==="array-contains-any"?new c_(e,s):new Le(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new r_(e,s):new i_(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(dt(t,this.value)):t!==null&&Ue(this.value)===Ue(t)&&this.matchesComparison(dt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return ee(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Nt extends lf{constructor(e,t){super(),this.filters=e,this.op=t,this.I=null}static create(e,t){return new Nt(e,t)}matches(e){return cf(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.I!==null||(this.I=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.I}getFilters(){return Object.assign([],this.filters)}}function cf(n){return n.op==="and"}function uf(n){return n_(n)&&cf(n)}function n_(n){for(const e of n.filters)if(e instanceof Nt)return!1;return!0}function ml(n){if(n instanceof Le)return n.field.canonicalString()+n.op.toString()+Js(n.value);if(uf(n))return n.filters.map((e=>ml(e))).join(",");{const e=n.filters.map((t=>ml(t))).join(",");return`${n.op}(${e})`}}function Bf(n,e){return n instanceof Le?(function(s,r){return r instanceof Le&&s.op===r.op&&s.field.isEqual(r.field)&&St(s.value,r.value)})(n,e):n instanceof Nt?(function(s,r){return r instanceof Nt&&s.op===r.op&&s.filters.length===r.filters.length?s.filters.reduce(((i,o,a)=>i&&Bf(o,r.filters[a])),!0):!1})(n,e):void ee(19439)}function hf(n){return n instanceof Le?(function(t){return`${t.field.canonicalString()} ${t.op} ${Js(t.value)}`})(n):n instanceof Nt?(function(t){return t.op.toString()+" {"+t.getFilters().map(hf).join(" ,")+"}"})(n):"Filter"}class s_ extends Le{constructor(e,t,s){super(e,t,s),this.key=Y.fromName(s.referenceValue)}matches(e){const t=Y.comparator(e.key,this.key);return this.matchesComparison(t)}}class r_ extends Le{constructor(e,t){super(e,"in",t),this.keys=df("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class i_ extends Le{constructor(e,t){super(e,"not-in",t),this.keys=df("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function df(n,e){var t;return(((t=e.arrayValue)==null?void 0:t.values)||[]).map((s=>Y.fromName(s.referenceValue)))}class o_ extends Le{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return js(t)&&jr(t.arrayValue,this.value)}}class a_ extends Le{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&jr(this.value.arrayValue,t)}}class l_ extends Le{constructor(e,t){super(e,"not-in",t)}matches(e){if(jr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!jr(this.value.arrayValue,t)}}class c_ extends Le{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!js(t)||!t.arrayValue.values)&&t.arrayValue.values.some((s=>jr(this.value.arrayValue,s)))}}/**
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
 */class To{constructor(e,t="asc"){this.field=e,this.dir=t}}function u_(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
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
 */class re{static fromTimestamp(e){return new re(e)}static min(){return new re(new ge(0,0))}static max(){return new re(new ge(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Xe{constructor(e,t,s,r,i,o,a){this.key=e,this.documentType=t,this.version=s,this.readTime=r,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(e){return new Xe(e,0,re.min(),re.min(),re.min(),st.empty(),0)}static newFoundDocument(e,t,s,r){return new Xe(e,1,t,re.min(),s,r,0)}static newNoDocument(e,t){return new Xe(e,2,t,re.min(),re.min(),st.empty(),0)}static newUnknownDocument(e,t){return new Xe(e,3,t,re.min(),re.min(),st.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(re.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=st.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=st.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=re.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Xe&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Xe(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */const Qr=-1;function B_(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,r=re.fromTimestamp(s===1e9?new ge(t+1,0):new ge(t,s));return new Ln(r,Y.empty(),e)}function h_(n){return new Ln(n.readTime,n.key,Qr)}class Ln{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new Ln(re.min(),Y.empty(),Qr)}static max(){return new Ln(re.max(),Y.empty(),Qr)}}function d_(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=Y.comparator(n.documentKey,e.documentKey),t!==0?t:ue(n.largestBatchId,e.largestBatchId))}/**
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
 */class f_{constructor(e,t=null,s=[],r=[],i=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=r,this.limit=i,this.startAt=o,this.endAt=a,this.R=null}}function XB(n,e=null,t=[],s=[],r=null,i=null,o=null){return new f_(n,e,t,s,r,i,o)}function ff(n){const e=ie(n);if(e.R===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((s=>ml(s))).join(","),t+="|ob:",t+=e.orderBy.map((s=>(function(i){return i.field.canonicalString()+i.dir})(s))).join(","),Ho(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((s=>Js(s))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((s=>Js(s))).join(",")),e.R=t}return e.R}function pf(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!u_(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Bf(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!YB(n.startAt,e.startAt)&&YB(n.endAt,e.endAt)}function ns(n){return!!n.isCorePipeline}function mf(n){return!!n.path&&Y.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class mi{constructor(e,t=null,s=[],r=[],i=null,o="F",a=null,c=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=r,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=c,this.A=null,this.V=null,this.m=null,this.startAt,this.endAt}}function p_(n,e,t,s,r,i,o,a){return new mi(n,e,t,s,r,i,o,a)}function jo(n){return new mi(n)}function ZB(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function m_(n){return Y.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function gf(n){return n.collectionGroup!==null}function kr(n){const e=ie(n);if(e.A===null){e.A=[];const t=new Set;for(const i of e.explicitOrderBy)e.A.push(i),t.add(i.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new Fe(Et.comparator);return o.filters.forEach((c=>{c.getFlattenedFilters().forEach((u=>{u.isInequality()&&(a=a.add(u.field))}))})),a})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.A.push(new To(i,s))})),t.has(Et.keyField().canonicalString())||e.A.push(new To(Et.keyField(),s))}return e.A}function Ht(n){const e=ie(n);return e.V||(e.V=g_(e,kr(n))),e.V}function g_(n,e){if(n.limitType==="F")return XB(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((r=>{const i=r.dir==="desc"?"asc":"desc";return new To(r.field,i)}));const t=n.endAt?new Io(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Io(n.startAt.position,n.startAt.inclusive):null;return XB(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function gl(n,e){const t=n.filters.concat([e]);return new mi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Cl(n,e,t){return new mi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function C_(n,e){return pf(Ht(n),Ht(e))&&n.limitType===e.limitType}function Lr(n){return`Query(target=${(function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map((r=>hf(r))).join(", ")}]`),Ho(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map((r=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(r))).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map((r=>Js(r))).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map((r=>Js(r))).join(",")),`Target(${s})`})(Ht(n))}; limitType=${n.limitType})`}function Ko(n,e){return e.isFoundDocument()&&(function(s,r){const i=r.key.path;return s.collectionGroup!==null?r.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(i):Y.isDocumentKey(s.path)?s.path.isEqual(i):s.path.isImmediateParentOf(i)})(n,e)&&(function(s,r){for(const i of kr(s))if(!i.field.isKeyField()&&r.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(s,r){for(const i of s.filters)if(!i.matches(r))return!1;return!0})(n,e)&&(function(s,r){return!(s.startAt&&!(function(o,a,c){const u=QB(o,a,c);return o.inclusive?u<=0:u<0})(s.startAt,kr(s),r)||s.endAt&&!(function(o,a,c){const u=QB(o,a,c);return o.inclusive?u>=0:u>0})(s.endAt,kr(s),r))})(n,e)}function Yl(n){return(e,t)=>{let s=!1;for(const r of kr(n)){const i=y_(r,e,t);if(i!==0)return i;s=s||r.field.isKeyField()}return 0}}function y_(n,e,t){const s=n.field.isKeyField()?Y.comparator(e.key,t.key):(function(i,o,a){const c=o.data.field(i),u=a.data.field(i);return c!==null&&u!==null?dt(c,u):ee(42886)})(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return ee(19790,{direction:n.dir})}}/**
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
 */class E_{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Ne,de;function __(n){switch(n){case F.OK:return ee(64938);case F.CANCELLED:case F.UNKNOWN:case F.DEADLINE_EXCEEDED:case F.RESOURCE_EXHAUSTED:case F.INTERNAL:case F.UNAVAILABLE:case F.UNAUTHENTICATED:return!1;case F.INVALID_ARGUMENT:case F.NOT_FOUND:case F.ALREADY_EXISTS:case F.PERMISSION_DENIED:case F.FAILED_PRECONDITION:case F.ABORTED:case F.OUT_OF_RANGE:case F.UNIMPLEMENTED:case F.DATA_LOSS:return!0;default:return ee(15467,{code:n})}}function Cf(n){if(n===void 0)return sn("GRPC error has no .code"),F.UNKNOWN;switch(n){case Ne.OK:return F.OK;case Ne.CANCELLED:return F.CANCELLED;case Ne.UNKNOWN:return F.UNKNOWN;case Ne.DEADLINE_EXCEEDED:return F.DEADLINE_EXCEEDED;case Ne.RESOURCE_EXHAUSTED:return F.RESOURCE_EXHAUSTED;case Ne.INTERNAL:return F.INTERNAL;case Ne.UNAVAILABLE:return F.UNAVAILABLE;case Ne.UNAUTHENTICATED:return F.UNAUTHENTICATED;case Ne.INVALID_ARGUMENT:return F.INVALID_ARGUMENT;case Ne.NOT_FOUND:return F.NOT_FOUND;case Ne.ALREADY_EXISTS:return F.ALREADY_EXISTS;case Ne.PERMISSION_DENIED:return F.PERMISSION_DENIED;case Ne.FAILED_PRECONDITION:return F.FAILED_PRECONDITION;case Ne.ABORTED:return F.ABORTED;case Ne.OUT_OF_RANGE:return F.OUT_OF_RANGE;case Ne.UNIMPLEMENTED:return F.UNIMPLEMENTED;case Ne.DATA_LOSS:return F.DATA_LOSS;default:return ee(39323,{code:n})}}(de=Ne||(Ne={}))[de.OK=0]="OK",de[de.CANCELLED=1]="CANCELLED",de[de.UNKNOWN=2]="UNKNOWN",de[de.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",de[de.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",de[de.NOT_FOUND=5]="NOT_FOUND",de[de.ALREADY_EXISTS=6]="ALREADY_EXISTS",de[de.PERMISSION_DENIED=7]="PERMISSION_DENIED",de[de.UNAUTHENTICATED=16]="UNAUTHENTICATED",de[de.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",de[de.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",de[de.ABORTED=10]="ABORTED",de[de.OUT_OF_RANGE=11]="OUT_OF_RANGE",de[de.UNIMPLEMENTED=12]="UNIMPLEMENTED",de[de.INTERNAL=13]="INTERNAL",de[de.UNAVAILABLE=14]="UNAVAILABLE",de[de.DATA_LOSS=15]="DATA_LOSS";/**
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
 */class Es{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[r,i]of s)if(this.equalsFn(r,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),r=this.inner[s];if(r===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let i=0;i<r.length;i++)if(this.equalsFn(r[i][0],e))return void(r[i]=[e,t]);r.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let r=0;r<s.length;r++)if(this.equalsFn(s[r][0],e))return s.length===1?delete this.inner[t]:s.splice(r,1),this.innerSize--,!0;return!1}forEach(e){$n(this.inner,((t,s)=>{for(const[r,i]of s)e(r,i)}))}isEmpty(){return Jd(this.inner)}size(){return this.innerSize}}/**
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
 */const v_=new Ae(Y.comparator);function ut(){return v_}const yf=new Ae(Y.comparator);function Os(...n){let e=yf;for(const t of n)e=e.insert(t.key,t);return e}function Ef(n){let e=yf;return n.forEach(((t,s)=>e=e.insert(t,s.overlayedDocument))),e}function vn(){return xr()}function _f(){return xr()}function xr(){return new Es((n=>n.toString()),((n,e)=>n.isEqual(e)))}const D_=new Ae(Y.comparator),w_=new Fe(Y.comparator);function ce(...n){let e=w_;for(const t of n)e=e.add(t);return e}const I_=new Fe(ue);function T_(){return I_}/**
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
 */function b_(){return new TextEncoder}/**
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
 */const A_=new bn([4294967295,4294967295],0);function eh(n){const e=b_().encode(n),t=new Od;return t.update(e),new Uint8Array(t.digest())}function th(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),r=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new bn([t,s],0),new bn([r,i],0)]}class Xl{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new br(`Invalid padding: ${t}`);if(s<0)throw new br(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new br(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new br(`Invalid padding when bitmap length is 0: ${t}`);this.p=8*e.length-t,this.S=bn.fromNumber(this.p)}v(e,t,s){let r=e.add(t.multiply(bn.fromNumber(s)));return r.compare(A_)===1&&(r=new bn([r.getBits(0),r.getBits(1)],0)),r.modulo(this.S).toNumber()}D(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.p===0)return!1;const t=eh(e),[s,r]=th(t);for(let i=0;i<this.hashCount;i++){const o=this.v(s,r,i);if(!this.D(o))return!1}return!0}static create(e,t,s){const r=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new Xl(i,r,t);return s.forEach((a=>o.insert(a))),o}insert(e){if(this.p===0)return;const t=eh(e),[s,r]=th(t);for(let i=0;i<this.hashCount;i++){const o=this.v(s,r,i);this.C(o)}}C(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class br extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class gi{constructor(e,t,s,r,i,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=r,this.augmentedDocumentUpdates=i,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const r=new Map;return r.set(e,Ci.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new gi(re.min(),r,new Ae(ue),ut(),ut(),ce())}}class Ci{constructor(e,t,s,r,i){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=r,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new Ci(s,t,ce(),ce(),ce())}}/**
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
 */class oo{constructor(e,t,s,r){this.F=e,this.removedTargetIds=t,this.key=s,this.O=r}}class vf{constructor(e,t){this.targetId=e,this.M=t}}class Df{constructor(e,t,s=Ve.EMPTY_BYTE_STRING,r=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=r}}class nh{constructor(e){this.targetId=e,this.N=0,this.L=sh(),this.B=Ve.EMPTY_BYTE_STRING,this.U=!1,this.k=!0}get current(){return this.U}get resumeToken(){return this.B}get q(){return this.N!==0}get $(){return this.k}K(e){e.approximateByteSize()>0&&(this.k=!0,this.B=e)}W(){let e=ce(),t=ce(),s=ce();return this.L.forEach(((r,i)=>{switch(i){case 0:e=e.add(r);break;case 2:t=t.add(r);break;case 1:s=s.add(r);break;default:ee(38017,{changeType:i})}})),new Ci(this.B,this.U,e,t,s)}G(){this.k=!1,this.L=sh()}j(e,t){this.k=!0,this.L=this.L.insert(e,t)}H(e){this.k=!0,this.L=this.L.remove(e)}J(){this.N+=1}Y(){this.N-=1,W(this.N>=0,3241,{N:this.N,targetId:this.targetId})}Z(){this.k=!0,this.U=!0}}const vr="WatchChangeAggregator";class S_{constructor(e){this.X=e,this.ee=new Map,this.te=ut(),this.ne=Ki(),this.re=ut(),this.ie=Ki(),this.se=new Ae(ue)}_e(e){for(const t of e.F)e.O&&e.O.isFoundDocument()?this.oe(t,e.O):this.ae(t,e.key,e.O);for(const t of e.removedTargetIds)this.ae(t,e.key,e.O)}ue(e){this.forEachTarget(e,(t=>{const s=this.ee.get(t);if(s)switch(e.state){case 0:this.ce(t)&&s.K(e.resumeToken);break;case 1:s.Y(),s.q||s.G(),s.K(e.resumeToken);break;case 2:s.Y(),s.q||this.removeTarget(t);break;case 3:this.ce(t)&&(s.Z(),s.K(e.resumeToken));break;case 4:this.ce(t)&&(this.le(t),s.K(e.resumeToken));break;default:ee(56790,{state:e.state})}else K(vr,`handleTargetChange received targetChange for untracked target ID (${t}) with state (${e.state})`)}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ee.forEach(((s,r)=>{this.ce(r)&&t(r)}))}Ee(e){var t;return ns(e)?e.getPipelineSourceType()==="documents"&&((t=e.getPipelineDocuments())==null?void 0:t.length)===1:mf(e)}he(e){const t=e.targetId,s=e.M.count,r=this.Te(t);if(r){const i=r.target;if(this.Ee(i))if(s===0){const o=new Y(ns(i)?me.fromString(i.getPipelineDocuments()[0]):i.path);this.ae(t,o,Xe.newNoDocument(o,re.min()))}else W(s===1,20013,"Single document existence filter with count: "+s);else{const o=this.Pe(t);if(o!==s){const a=this.Ie(e),c=a?this.Re(a,e,o):1;if(c!==0){this.le(t);const u=c===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.se=this.se.insert(t,u)}}}}}Ie(e){const t=e.M.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:r=0},hashCount:i=0}=t;let o,a;try{o=Nn(s).toUint8Array()}catch(c){if(c instanceof Kd)return Ot("Decoding the base64 bloom filter in existence filter failed ("+c.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw c}try{a=new Xl(o,r,i)}catch(c){return Ot(c instanceof br?"BloomFilter error: ":"Applying bloom filter failed: ",c),null}return a.p===0?null:a}Re(e,t,s){return t.M.count===s-this.de(e,t.targetId)?0:2}de(e,t){const s=this.X.getRemoteKeysForTarget(t);let r=0;return s.forEach((i=>{const o=this.X.Ve(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(a)||(this.ae(t,i,null),r++)})),r}fe(e){const t=new Map;this.ee.forEach(((i,o)=>{const a=this.Te(o);if(a){if(i.current&&this.Ee(a.target)){const c=ns(a.target)?me.fromString(a.target.getPipelineDocuments()[0]):a.target.path,u=new Y(c);this.me(u).has(o)||this.pe(o,u)||this.ae(o,u,Xe.newNoDocument(u,e))}i.$&&(t.set(o,i.W()),i.G())}}));let s=ce();this.ie.forEach(((i,o)=>{let a=!0;o.forEachWhile((c=>{const u=this.Te(c);return!u||u.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)})),a&&(s=s.add(i))})),this.te.forEach(((i,o)=>o.setReadTime(e))),this.re.forEach(((i,o)=>o.setReadTime(e)));const r=new gi(e,t,this.se,this.te,this.re,s);return this.te=ut(),this.ne=Ki(),this.re=ut(),this.ie=Ki(),this.se=new Ae(ue),r}oe(e,t){const s=this.ee.get(e);if(!s||!this.ce(e))return void K(vr,`addDocumentToTarget received document for unknown inactive target (${e})`);const r=this.pe(e,t.key)?2:0;s.j(t.key,r),ns(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t.key,t):this.te=this.te.insert(t.key,t),this.ne=this.ne.insert(t.key,this.me(t.key).add(e)),this.ie=this.ie.insert(t.key,this.ge(t.key).add(e))}ae(e,t,s){const r=this.ee.get(e);r&&this.ce(e)?(this.pe(e,t)?r.j(t,1):r.H(t),this.ie=this.ie.insert(t,this.ge(t).delete(e)),this.ie=this.ie.insert(t,this.ge(t).add(e)),s&&(ns(this.Te(e).target)&&this.Te(e).target.getPipelineFlavor()!=="exact"?this.re=this.re.insert(t,s):this.te=this.te.insert(t,s))):K(vr,`removeDocumentFromTarget received document for unknown or inactive target (${e})`)}removeTarget(e){this.ee.delete(e)}Pe(e){const t=this.ee.get(e);if(!t)return 0;const s=t.W();return this.X.getRemoteKeysForTarget(e).size+s.addedDocuments.size-s.removedDocuments.size}J(e){let t=this.ee.get(e);t||(K(vr,`recordPendingTargetRequest set up tracking for target ID ${e}`),t=new nh(e),this.ee.set(e,t)),t.J()}ge(e){let t=this.ie.get(e);return t||(t=new Fe(ue),this.ie=this.ie.insert(e,t)),t}me(e){let t=this.ne.get(e);return t||(t=new Fe(ue),this.ne=this.ne.insert(e,t)),t}ce(e){const t=this.Te(e)!==null;return t||K(vr,"Detected inactive target",e),t}Te(e){const t=this.ee.get(e);return t===void 0||t.q?null:this.X.ye(e)}le(e){this.ee.set(e,new nh(e)),this.X.getRemoteKeysForTarget(e).forEach((t=>{this.ae(e,t,null)}))}pe(e,t){return this.X.getRemoteKeysForTarget(e).has(t)}}function Ki(){return new Ae(Y.comparator)}function sh(){return new Ae(Y.comparator)}const P_={asc:"ASCENDING",desc:"DESCENDING"},R_={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},O_={and:"AND",or:"OR"};class N_{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function yl(n,e){return n.useProto3Json||Ho(e)?e:{value:e}}function Fr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function Zl(n){const e=On(n);return new ge(e.seconds,e.nanos)}function wf(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ao(n,e){return Fr(n,e.toTimestamp())}function Gt(n){return W(!!n,49232),re.fromTimestamp(Zl(n))}function ec(n,e){return El(n,e).canonicalString()}function El(n,e){const t=(function(r){return new me(["projects",r.projectId,"databases",r.database])})(n).child("documents");return e===void 0?t:t.child(e)}function If(n){const e=me.fromString(n);return W(Pf(e),10190,{key:e.toString()}),e}function bo(n,e){return ec(n.databaseId,e.path)}function Ja(n,e){const t=If(e);if(t.get(1)!==n.databaseId.projectId)throw new j(F.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new j(F.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new Y(bf(t))}function Tf(n,e){return ec(n.databaseId,e)}function k_(n){const e=If(n);return e.length===4?me.emptyPath():bf(e)}function _l(n){return new me(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function bf(n){return W(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function rh(n,e,t){return{name:bo(n,e),fields:t.value.mapValue.fields}}function L_(n,e){let t;if("targetChange"in e){e.targetChange;const s=(function(u){return u==="NO_CHANGE"?0:u==="ADD"?1:u==="REMOVE"?2:u==="CURRENT"?3:u==="RESET"?4:ee(39313,{state:u})})(e.targetChange.targetChangeType||"NO_CHANGE"),r=e.targetChange.targetIds||[],i=(function(u,h){return u.useProto3Json?(W(h===void 0||typeof h=="string",58123),Ve.fromBase64String(h||"")):(W(h===void 0||h instanceof Buffer||h instanceof Uint8Array,16193),Ve.fromUint8Array(h||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&(function(u){const h=u.code===void 0?F.UNKNOWN:Cf(u.code);return new j(h,u.message||"")})(o);t=new Df(s,r,i,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const r=Ja(n,s.document.name),i=Gt(s.document.updateTime),o=s.document.createTime?Gt(s.document.createTime):re.min(),a=new st({mapValue:{fields:s.document.fields}}),c=Xe.newFoundDocument(r,i,o,a),u=s.targetIds||[],h=s.removedTargetIds||[];t=new oo(u,h,c.key,c)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const r=Ja(n,s.document),i=s.readTime?Gt(s.readTime):re.min(),o=Xe.newNoDocument(r,i),a=s.removedTargetIds||[];t=new oo([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const r=Ja(n,s.document),i=s.removedTargetIds||[];t=new oo([],i,r,null)}else{if(!("filter"in e))return ee(11601,{we:e});{e.filter;const s=e.filter;s.targetId;const{count:r=0,unchangedNames:i}=s,o=new E_(r,i),a=s.targetId;t=new vf(a,o)}}return t}function x_(n,e){let t;if(e instanceof pi)t={update:rh(n,e.key,e.value)};else if(e instanceof Jo)t={delete:bo(n,e.key)};else if(e instanceof qn)t={update:rh(n,e.key,e.data),updateMask:j_(e.fieldMask)};else{if(!(e instanceof t_))return ee(16599,{be:e.type});t={verify:bo(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((s=>(function(i,o){const a=o.transform;if(a instanceof _o)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Kr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof zr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof Wr)return{fieldPath:o.field.canonicalString(),increment:a.h};if(a instanceof vo)return{fieldPath:o.field.canonicalString(),minimum:a.h};if(a instanceof Do)return{fieldPath:o.field.canonicalString(),maximum:a.h};throw ee(20930,{transform:o.transform})})(0,s)))),e.precondition.isNone||(t.currentDocument=(function(r,i){return i.updateTime!==void 0?{updateTime:ao(r,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:ee(27497)})(n,e.precondition)),t}function F_(n,e){return n&&n.length>0?(W(e!==void 0,14353),n.map((t=>(function(r,i){let o=r.updateTime?Gt(r.updateTime):Gt(i);return o.isEqual(re.min())&&(o=Gt(i)),new XE(o,r.transformResults||[])})(t,e)))):[]}function M_(n,e){return{documents:[Tf(n,e.path)]}}function V_(n,e){const t={structuredQuery:{}},s=e.path;let r;e.collectionGroup!==null?(r=s,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(r=s.popLast(),t.structuredQuery.from=[{collectionId:s.lastSegment()}]),t.parent=Tf(n,r);const i=(function(u){if(u.length!==0)return Sf(Nt.create(u,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(u){if(u.length!==0)return u.map((h=>(function(p){return{field:Ns(p.field),direction:$_(p.dir)}})(h)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const a=yl(n,e.limit);return a!==null&&(t.structuredQuery.limit=a),e.startAt&&(t.structuredQuery.startAt=(function(u){return{before:u.inclusive,values:u.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(u){return{before:!u.inclusive,values:u.position}})(e.endAt)),{Se:t,parent:r}}function U_(n){let e=k_(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let r=null;if(s>0){W(s===1,65062);const h=t.from[0];h.allDescendants?r=h.collectionId:e=e.child(h.collectionId)}let i=[];t.where&&(i=(function(f){const p=Af(f);return p instanceof Nt&&uf(p)?p.getFilters():[p]})(t.where));let o=[];t.orderBy&&(o=(function(f){return f.map((p=>(function(D){return new To(ks(D.field),(function(M){switch(M){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(D.direction))})(p)))})(t.orderBy));let a=null;t.limit&&(a=(function(f){let p;return p=typeof f=="object"?f.value:f,Ho(p)?null:p})(t.limit));let c=null;t.startAt&&(c=(function(f){const p=!!f.before,g=f.values||[];return new Io(g,p)})(t.startAt));let u=null;return t.endAt&&(u=(function(f){const p=!f.before,g=f.values||[];return new Io(g,p)})(t.endAt)),p_(e,r,o,i,a,"F",c,u)}function H_(n,e){const t=(function(r){switch(r){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return ee(28987,{purpose:r})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function G_(n,e){return{structuredPipeline:{pipeline:{stages:e.stages.map((t=>t._toProto(n)))}}}}function Af(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=ks(t.unaryFilter.field);return Le.create(s,"==",{doubleValue:NaN});case"IS_NULL":const r=ks(t.unaryFilter.field);return Le.create(r,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=ks(t.unaryFilter.field);return Le.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ks(t.unaryFilter.field);return Le.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return ee(61313);default:return ee(60726)}})(n):n.fieldFilter!==void 0?(function(t){return Le.create(ks(t.fieldFilter.field),(function(r){switch(r){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return ee(58110);default:return ee(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return Nt.create(t.compositeFilter.filters.map((s=>Af(s))),(function(r){switch(r){case"AND":return"and";case"OR":return"or";default:return ee(1026)}})(t.compositeFilter.op))})(n):ee(30097,{filter:n})}function $_(n){return P_[n]}function q_(n){return R_[n]}function J_(n){return O_[n]}function Ns(n){return{fieldPath:n.canonicalString()}}function ks(n){return Et.fromServerFormat(n.fieldPath)}function Sf(n){return n instanceof Le?(function(t){if(t.op==="=="){if(ft(t.value))return{unaryFilter:{field:Ns(t.field),op:"IS_NAN"}};if(yt(t.value))return{unaryFilter:{field:Ns(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(ft(t.value))return{unaryFilter:{field:Ns(t.field),op:"IS_NOT_NAN"}};if(yt(t.value))return{unaryFilter:{field:Ns(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Ns(t.field),op:q_(t.op),value:t.value}}})(n):n instanceof Nt?(function(t){const s=t.getFilters().map((r=>Sf(r)));return s.length===1?s[0]:{compositeFilter:{op:J_(t.op),filters:s}}})(n):ee(54877,{filter:n})}function j_(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function Pf(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}function Rf(n){return!!n&&typeof n._toProto=="function"&&n._protoValueType==="ProtoValue"}function Yr(n,e){const t={fields:{}};return e.forEach(((s,r)=>{if(typeof r!="string")throw new Error(`Cannot encode map with non-string key: ${r}`);t.fields[r]=s._toProto(n)})),{mapValue:t}}function Of(n){return{stringValue:n}}/**
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
 */function zo(n){return new N_(n,!0)}/**
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
 */class bt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new bt(Ve.fromBase64String(e))}catch(t){throw new j(F.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new bt(Ve.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:bt._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(di(e,bt._jsonSchema))return bt.fromBase64String(e.bytes)}}bt._jsonSchemaVersion="firestore/bytes/1.0",bt._jsonSchema={type:xe("string",bt._jsonSchemaVersion),bytes:xe("string")};/**
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
 */class Wo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new j(F.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new Et(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}function K_(){return new Wo(Gs)}/**
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
 */class tc{constructor(e){this._methodName=e}}/**
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
 */class $t{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new j(F.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new j(F.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return ue(this._lat,e._lat)||ue(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:$t._jsonSchemaVersion}}static fromJSON(e){if(di(e,$t._jsonSchema))return new $t(e.latitude,e.longitude)}}$t._jsonSchemaVersion="firestore/geoPoint/1.0",$t._jsonSchema={type:xe("string",$t._jsonSchemaVersion),latitude:xe("number"),longitude:xe("number")};/**
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
 */class Ye{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ye.UNAUTHENTICATED=new Ye(null),Ye.GOOGLE_CREDENTIALS=new Ye("google-credentials-uid"),Ye.FIRST_PARTY=new Ye("first-party-uid"),Ye.MOCK_USER=new Ye("mock-user");/**
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
 */class An{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
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
 */class Nf{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class z_{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(Ye.UNAUTHENTICATED)))}shutdown(){}}class W_{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable((()=>t(this.token.user)))}shutdown(){this.changeListener=null}}class Q_{constructor(e){this.De=e,this.currentUser=Ye.UNAUTHENTICATED,this.xe=0,this.forceRefresh=!1,this.auth=null}start(e,t){W(this.Ce===void 0,42304);let s=this.xe;const r=c=>this.xe!==s?(s=this.xe,t(c)):Promise.resolve();let i=new An;this.Ce=()=>{this.xe++,this.currentUser=this.Fe(),i.resolve(),i=new An,e.enqueueRetryable((()=>r(this.currentUser)))};const o=()=>{const c=i;e.enqueueRetryable((async()=>{await c.promise,await r(this.currentUser)}))},a=c=>{K("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=c,this.Ce&&(this.auth.addAuthTokenListener(this.Ce),o())};this.De.onInit((c=>a(c))),setTimeout((()=>{if(!this.auth){const c=this.De.getImmediate({optional:!0});c?a(c):(K("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new An)}}),0),o()}getToken(){const e=this.xe,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((s=>this.xe!==e?(K("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(W(typeof s.accessToken=="string",31837,{Oe:s}),new Nf(s.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.Ce&&this.auth.removeAuthTokenListener(this.Ce),this.Ce=void 0}Fe(){const e=this.auth&&this.auth.getUid();return W(e===null||typeof e=="string",2055,{Me:e}),new Ye(e)}}class Y_{constructor(e,t,s){this.Ne=e,this.Le=t,this.Be=s,this.type="FirstParty",this.user=Ye.FIRST_PARTY,this.Ue=new Map}ke(){return this.Be?this.Be():null}get headers(){this.Ue.set("X-Goog-AuthUser",this.Ne);const e=this.ke();return e&&this.Ue.set("Authorization",e),this.Le&&this.Ue.set("X-Goog-Iam-Authorization-Token",this.Le),this.Ue}}class X_{constructor(e,t,s){this.Ne=e,this.Le=t,this.Be=s}getToken(){return Promise.resolve(new Y_(this.Ne,this.Le,this.Be))}start(e,t){e.enqueueRetryable((()=>t(Ye.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class ih{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Z_{constructor(e,t){this.qe=t,this.forceRefresh=!1,this.appCheck=null,this.$e=null,this.Ke=null,Tt(e)&&e.settings.appCheckToken&&(this.Ke=e.settings.appCheckToken)}start(e,t){W(this.Ce===void 0,3512);const s=i=>{i.error!=null&&K("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.$e;return this.$e=i.token,K("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.Ce=i=>{e.enqueueRetryable((()=>s(i)))};const r=i=>{K("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.Ce&&this.appCheck.addTokenListener(this.Ce)};this.qe.onInit((i=>r(i))),setTimeout((()=>{if(!this.appCheck){const i=this.qe.getImmediate({optional:!0});i?r(i):K("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.Ke)return Promise.resolve(new ih(this.Ke));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(W(typeof t.token=="string",44558,{tokenResult:t}),this.$e=t.token,new ih(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.Ce&&this.appCheck.removeTokenListener(this.Ce),this.Ce=void 0}}function kf(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */class ev{Qe(e){}shutdown(){}}/**
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
 */const oh="ConnectivityMonitor";class ah{constructor(){this.We=()=>this.Ge(),this.ze=()=>this.je(),this.He=[],this.Je()}Qe(e){this.He.push(e)}shutdown(){window.removeEventListener("online",this.We),window.removeEventListener("offline",this.ze)}Je(){window.addEventListener("online",this.We),window.addEventListener("offline",this.ze)}Ge(){K(oh,"Network connectivity changed: AVAILABLE");for(const e of this.He)e(0)}je(){K(oh,"Network connectivity changed: UNAVAILABLE");for(const e of this.He)e(1)}static Ye(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let zi=null;function vl(){return zi===null?zi=(function(){return 268435456+Math.round(2147483648*Math.random())})():zi++,"0x"+zi.toString(16)}/**
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
 */const ja="RestConnection",tv={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery",ExecutePipeline:"executePipeline"};class nv{get Ze(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.Xe=t+"://"+e.host,this.et=`projects/${s}/databases/${r}`,this.tt=this.databaseId.database===yo?`project_id=${s}`:`project_id=${s}&database_id=${r}`}nt(e,t,s,r,i){const o=vl(),a=this.rt(e,t.toUriEncodedString());K(ja,`Sending RPC '${e}' ${o}:`,a,s);const c={"google-cloud-resource-prefix":this.et,"x-goog-request-params":this.tt};this.it(c,r,i);const{host:u}=new URL(a),h=ai(u);return this.st(e,a,c,s,h).then((f=>(K(ja,`Received RPC '${e}' ${o}: `,f),f)),(f=>{throw Ot(ja,`RPC '${e}' ${o} failed with error: `,f,"url: ",a,"request:",s),f}))}_t(e,t,s,r,i,o){return this.nt(e,t,s,r,i)}it(e,t,s){if(e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Qs})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((r,i)=>e[i]=r)),s&&s.headers.forEach(((r,i)=>e[i]=r)),this.databaseInfo._customHeaders)for(const r of Object.keys(this.databaseInfo._customHeaders))e[r]=this.databaseInfo._customHeaders[r]}rt(e,t){const s=tv[e];let r=`${this.Xe}/v1/${t}:${s}`;return this.databaseInfo.apiKey&&(r=`${r}?key=${encodeURIComponent(this.databaseInfo.apiKey)}`),r}terminate(){}}/**
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
 */class sv{constructor(e){this.ot=e.ot,this.ut=e.ut}ct(e){this.lt=e}Et(e){this.ht=e}Tt(e){this.Pt=e}onMessage(e){this.It=e}close(){this.ut()}send(e){this.ot(e)}Rt(){this.lt()}At(){this.ht()}Vt(e){this.Pt(e)}dt(e){this.It(e)}}/**
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
 */const Qe="WebChannelConnection",Dr=(n,e,t)=>{n.listen(e,(s=>{try{t(s)}catch(r){setTimeout((()=>{throw r}),0)}}))};class Fs extends nv{constructor(e){super(e),this.ft=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}static gt(){if(!Fs.yt){const e=xd();Dr(e,Ld.STAT_EVENT,(t=>{t.stat===cl.PROXY?K(Qe,"STAT_EVENT: detected buffering proxy"):t.stat===cl.NOPROXY&&K(Qe,"STAT_EVENT: detected no buffering proxy")})),Fs.yt=!0}}st(e,t,s,r,i){const o=vl();return new Promise(((a,c)=>{const u=new Nd;u.setWithCredentials(!0),u.listenOnce(kd.COMPLETE,(()=>{try{switch(u.getLastErrorCode()){case so.NO_ERROR:const f=u.getResponseJson();K(Qe,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),a(f);break;case so.TIMEOUT:K(Qe,`RPC '${e}' ${o} timed out`),c(new j(F.DEADLINE_EXCEEDED,"Request time out"));break;case so.HTTP_ERROR:const p=u.getStatus();if(K(Qe,`RPC '${e}' ${o} failed with status:`,p,"response text:",u.getResponseText()),p>0){let g=u.getResponseJson();Array.isArray(g)&&(g=g[0]);const D=g==null?void 0:g.error;if(D&&D.status&&D.message){const R=(function(O){const H=O.toLowerCase().replace(/_/g,"-");return Object.values(F).indexOf(H)>=0?H:F.UNKNOWN})(D.status);c(new j(R,D.message))}else c(new j(F.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new j(F.UNAVAILABLE,"Connection failed."));break;default:ee(9055,{wt:e,streamId:o,bt:u.getLastErrorCode(),St:u.getLastError()})}}finally{K(Qe,`RPC '${e}' ${o} completed.`)}}));const h=JSON.stringify(r);K(Qe,`RPC '${e}' ${o} sending request:`,r),u.send(t,"POST",h,s,15)}))}vt(e,t,s){const r=vl(),i=[this.Xe,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=this.createWebChannelTransport(),a={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(a.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(a.useFetchStreams=!0),this.it(a.initMessageHeaders,t,s),a.encodeInitMessageHeaders=!0;const u=i.join("");K(Qe,`Creating RPC '${e}' stream ${r}: ${u}`,a);const h=o.createWebChannel(u,a);this.Dt(h);let f=!1,p=!1;const g=new sv({ot:D=>{p?K(Qe,`Not sending because RPC '${e}' stream ${r} is closed:`,D):(f||(K(Qe,`Opening RPC '${e}' stream ${r} transport.`),h.open(),f=!0),K(Qe,`RPC '${e}' stream ${r} sending:`,D),h.send(D))},ut:()=>h.close()});return Dr(h,Tr.EventType.OPEN,(()=>{p||(K(Qe,`RPC '${e}' stream ${r} transport opened.`),g.Rt())})),Dr(h,Tr.EventType.CLOSE,(()=>{p||(p=!0,K(Qe,`RPC '${e}' stream ${r} transport closed`),g.Vt(),this.xt(h))})),Dr(h,Tr.EventType.ERROR,(D=>{p||(p=!0,Ot(Qe,`RPC '${e}' stream ${r} transport errored. Name:`,D.name,"Message:",D.message),g.Vt(new j(F.UNAVAILABLE,"The operation could not be completed")))})),Dr(h,Tr.EventType.MESSAGE,(D=>{var R;if(!p){const M=D.data[0];W(!!M,16349);const O=M,H=(O==null?void 0:O.error)||((R=O[0])==null?void 0:R.error);if(H){K(Qe,`RPC '${e}' stream ${r} received error:`,H);const Z=H.status;let ae=(function(w){const C=Ne[w];if(C!==void 0)return Cf(C)})(Z),oe=H.message;Z==="NOT_FOUND"&&oe.includes("database")&&oe.includes("does not exist")&&oe.includes(this.databaseId.database)&&Ot(`Database '${this.databaseId.database}' not found. Please check your project configuration.`),ae===void 0&&(ae=F.INTERNAL,oe="Unknown error status: "+Z+" with message "+H.message),p=!0,g.Vt(new j(ae,oe)),h.close()}else K(Qe,`RPC '${e}' stream ${r} received:`,M),g.dt(M)}})),Fs.gt(),setTimeout((()=>{g.At()}),0),g}terminate(){this.ft.forEach((e=>e.close())),this.ft=[]}Dt(e){this.ft.push(e)}xt(e){this.ft=this.ft.filter((t=>t===e))}it(e,t,s){super.it(e,t,s),this.databaseInfo.apiKey&&(e["x-goog-api-key"]=this.databaseInfo.apiKey)}createWebChannelTransport(){return Fd()}}/**
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
 */function rv(n){return new Fs(n)}Fs.yt=!1;class Lf{constructor(e,t,s=1e3,r=1.5,i=6e4){this.Ct=e,this.timerId=t,this.Ft=s,this.Ot=r,this.Mt=i,this.Nt=0,this.Lt=null,this.Bt=Date.now(),this.reset()}reset(){this.Nt=0}Ut(){this.Nt=this.Mt}kt(e){this.cancel();const t=Math.floor(this.Nt+this.qt()),s=Math.max(0,Date.now()-this.Bt),r=Math.max(0,t-s);r>0&&K("ExponentialBackoff",`Backing off for ${r} ms (base delay: ${this.Nt} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.Lt=this.Ct.enqueueAfterDelay(this.timerId,r,(()=>(this.Bt=Date.now(),e()))),this.Nt*=this.Ot,this.Nt<this.Ft&&(this.Nt=this.Ft),this.Nt>this.Mt&&(this.Nt=this.Mt)}$t(){this.Lt!==null&&(this.Lt.skipDelay(),this.Lt=null)}cancel(){this.Lt!==null&&(this.Lt.cancel(),this.Lt=null)}qt(){return(Math.random()-.5)*this.Nt}}/**
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
 */const lh="PersistentStream";class xf{constructor(e,t,s,r,i,o,a,c){this.Ct=e,this.Kt=s,this.Qt=r,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=c,this.state=0,this.Wt=0,this.Gt=null,this.zt=null,this.stream=null,this.jt=0,this.Ht=new Lf(e,t)}Jt(){return this.state===1||this.state===5||this.Yt()}Yt(){return this.state===2||this.state===3}start(){this.jt=0,this.state!==4?this.auth():this.Zt()}async stop(){this.Jt()&&await this.close(0)}Xt(){this.state=0,this.Ht.reset()}en(){this.Yt()&&this.Gt===null&&(this.Gt=this.Ct.enqueueAfterDelay(this.Kt,6e4,(()=>this.tn())))}nn(e){this.rn(),this.stream.send(e)}async tn(){if(this.Yt())return this.close(0)}rn(){this.Gt&&(this.Gt.cancel(),this.Gt=null)}sn(){this.zt&&(this.zt.cancel(),this.zt=null)}async close(e,t){this.rn(),this.sn(),this.Ht.cancel(),this.Wt++,e!==4?this.Ht.reset():t&&t.code===F.RESOURCE_EXHAUSTED?(sn(t.toString()),sn("Using maximum backoff delay to prevent overloading the backend."),this.Ht.Ut()):t&&t.code===F.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this._n(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Tt(t)}_n(){}auth(){this.state=1;const e=this.an(this.Wt),t=this.Wt;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([s,r])=>{this.Wt===t&&this.un(s,r)}),(s=>{e((()=>{const r=new j(F.UNKNOWN,"Fetching auth token failed: "+s.message);return this.cn(r)}))}))}un(e,t){const s=this.an(this.Wt);this.stream=this.En(e,t),this.stream.ct((()=>{s((()=>this.listener.ct()))})),this.stream.Et((()=>{s((()=>(this.state=2,this.zt=this.Ct.enqueueAfterDelay(this.Qt,1e4,(()=>(this.Yt()&&(this.state=3),Promise.resolve()))),this.listener.Et())))})),this.stream.Tt((r=>{s((()=>this.cn(r)))})),this.stream.onMessage((r=>{s((()=>++this.jt==1?this.hn(r):this.onNext(r)))}))}Zt(){this.state=5,this.Ht.kt((async()=>{this.state=0,this.start()}))}cn(e){return K(lh,`close with error: ${e}`),this.stream=null,this.close(4,e)}an(e){return t=>{this.Ct.enqueueAndForget((()=>this.Wt===e?t():(K(lh,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class iv extends xf{constructor(e,t,s,r,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,r,o),this.serializer=i}En(e,t){return this.connection.vt("Listen",e,t)}hn(e){return this.onNext(e)}onNext(e){this.Ht.reset();const t=L_(this.serializer,e),s=(function(i){if(!("targetChange"in i))return re.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?re.min():o.readTime?Gt(o.readTime):re.min()})(e);return this.listener.Tn(t,s)}Pn(e){const t={};t.database=_l(this.serializer),t.addTarget=(function(i,o){let a;const c=o.target;if(a=ns(c)?{pipelineQuery:G_(i,c)}:mf(c)?{documents:M_(i,c)}:{query:V_(i,c).Se},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=wf(i,o.resumeToken);const u=yl(i,o.expectedCount);u!==null&&(a.expectedCount=u)}else if(o.snapshotVersion.compareTo(re.min())>0){a.readTime=Fr(i,o.snapshotVersion.toTimestamp());const u=yl(i,o.expectedCount);u!==null&&(a.expectedCount=u)}return a})(this.serializer,e);const s=H_(this.serializer,e);s&&(t.labels=s),this.nn(t)}In(e){const t={};t.database=_l(this.serializer),t.removeTarget=e,this.nn(t)}}class ov extends xf{constructor(e,t,s,r,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,r,o),this.serializer=i}get Rn(){return this.jt>0}start(){this.lastStreamToken=void 0,super.start()}_n(){this.Rn&&this.An([])}En(e,t){return this.connection.vt("Write",e,t)}hn(e){return W(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,W(!e.writeResults||e.writeResults.length===0,55816),this.listener.Vn()}onNext(e){W(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.Ht.reset();const t=F_(e.writeResults,e.commitTime),s=Gt(e.commitTime);return this.listener.dn(s,t)}fn(){const e={};e.database=_l(this.serializer),this.nn(e)}An(e){const t={streamToken:this.lastStreamToken,writes:e.map((s=>x_(this.serializer,s)))};this.nn(t)}}/**
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
 */class av{}class lv extends av{constructor(e,t,s,r){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=r,this.mn=!1}pn(){if(this.mn)throw new j(F.FAILED_PRECONDITION,"The client has already been terminated.")}nt(e,t,s,r){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.nt(e,El(t,s),r,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new j(F.UNKNOWN,i.toString())}))}_t(e,t,s,r,i){return this.pn(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,a])=>this.connection._t(e,El(t,s),r,o,a,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===F.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new j(F.UNKNOWN,o.toString())}))}terminate(){this.mn=!0,this.connection.terminate()}}function cv(n,e,t,s){return new lv(n,e,t,s)}/**
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
 */const uv="ComponentProvider",ch=new Map;function Bv(n,e,t,s,r){return new $E(n,e,t,r.host,r.ssl,r.experimentalForceLongPolling,r.experimentalAutoDetectLongPolling,kf(r.experimentalLongPollingOptions),r.useFetchStreams,r.isUsingEmulator,s,r._customHeaders,r.grpcFlowControlWindow)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */const uh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Ff=41943040;class lt{static withCacheSize(e){return new lt(e,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,s){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=s}}lt.DEFAULT_COLLECTION_PERCENTILE=10,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,lt.DEFAULT=new lt(Ff,lt.DEFAULT_COLLECTION_PERCENTILE,lt.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),lt.DISABLED=new lt(-1,0,0);/**
 * @license
 * Copyright 2018 Google LLC
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
 */class Qo{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.gn(s),this.yn=s=>t.writeSequenceNumber(s))}gn(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.yn&&this.yn(e),e}}Qo.wn=-1;/**
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
 */const hv="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class dv{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
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
 */async function Ys(n){if(n.code!==F.FAILED_PRECONDITION||n.message!==hv)throw n;K("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class V{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&ee(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new V(((s,r)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(s,r)},this.catchCallback=i=>{this.wrapFailure(t,i).next(s,r)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof V?t:V.resolve(t)}catch(t){return V.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):V.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):V.reject(t)}static resolve(e){return new V(((t,s)=>{t(e)}))}static reject(e){return new V(((t,s)=>{s(e)}))}static waitFor(e){return new V(((t,s)=>{let r=0,i=0,o=!1;e.forEach((a=>{++r,a.next((()=>{++i,o&&i===r&&t()}),(c=>s(c)))})),o=!0,i===r&&t()}))}static or(e){let t=V.resolve(!1);for(const s of e)t=t.next((r=>r?V.resolve(r):s()));return t}static forEach(e,t){const s=[];return e.forEach(((r,i)=>{s.push(t.call(this,r,i))})),this.waitFor(s)}static mapArray(e,t){return new V(((s,r)=>{const i=e.length,o=new Array(i);let a=0;for(let c=0;c<i;c++){const u=c;t(e[u]).next((h=>{o[u]=h,++a,a===i&&s(o)}),(h=>r(h)))}}))}static doWhile(e,t){return new V(((s,r)=>{const i=()=>{e()===!0?t().next((()=>{i()}),r):s()};i()}))}}function fv(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function Xs(n){return n.name==="IndexedDbTransactionError"}/**
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
 */const Bh="LruGarbageCollector",pv=1048576;function hh([n,e],[t,s]){const r=ue(n,t);return r===0?ue(e,s):r}class mv{constructor(e){this.Yn=e,this.buffer=new Fe(hh),this.Zn=0}Xn(){return++this.Zn}er(e){const t=[e,this.Xn()];if(this.buffer.size<this.Yn)this.buffer=this.buffer.add(t);else{const s=this.buffer.last();hh(t,s)<0&&(this.buffer=this.buffer.delete(s).add(t))}}get maxValue(){return this.buffer.last()[0]}}class gv{constructor(e,t,s){this.garbageCollector=e,this.asyncQueue=t,this.localStore=s,this.tr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.nr(6e4)}stop(){this.tr&&(this.tr.cancel(),this.tr=null)}get started(){return this.tr!==null}nr(e){K(Bh,`Garbage collection scheduled in ${e}ms`),this.tr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.tr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Xs(t)?K(Bh,"Ignoring IndexedDB error during garbage collection: ",t):await Ys(t)}await this.nr(3e5)}))}}class Cv{constructor(e,t){this.rr=e,this.params=t}calculateTargetCount(e,t){return this.rr.ir(e).next((s=>Math.floor(t/100*s)))}nthSequenceNumber(e,t){if(t===0)return V.resolve(Qo.wn);const s=new mv(t);return this.rr.forEachTarget(e,(r=>s.er(r.sequenceNumber))).next((()=>this.rr.sr(e,(r=>s.er(r))))).next((()=>s.maxValue))}removeTargets(e,t,s){return this.rr.removeTargets(e,t,s)}removeOrphanedDocuments(e,t){return this.rr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(K("LruGarbageCollector","Garbage collection skipped; disabled"),V.resolve(uh)):this.getCacheSize(e).next((s=>s<this.params.cacheSizeCollectionThreshold?(K("LruGarbageCollector",`Garbage collection skipped; Cache size ${s} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),uh):this._r(e,t)))}getCacheSize(e){return this.rr.getCacheSize(e)}_r(e,t){let s,r,i,o,a,c,u;const h=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((f=>(f>this.params.maximumSequenceNumbersToCollect?(K("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${f}`),r=this.params.maximumSequenceNumbersToCollect):r=f,o=Date.now(),this.nthSequenceNumber(e,r)))).next((f=>(s=f,a=Date.now(),this.removeTargets(e,s,t)))).next((f=>(i=f,c=Date.now(),this.removeOrphanedDocuments(e,s)))).next((f=>(u=Date.now(),Ps()<=Be.DEBUG&&K("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-h}ms
	Determined least recently used ${r} in `+(a-o)+`ms
	Removed ${i} targets in `+(c-a)+`ms
	Removed ${f} documents in `+(u-c)+`ms
Total Duration: ${u-h}ms`),V.resolve({didRun:!0,sequenceNumbersCollected:r,targetsRemoved:i,documentsRemoved:f}))))}}function yv(n,e){return new Cv(n,e)}/**
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
 */const Mf="firestore.googleapis.com",dh=!0;class fh{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new j(F.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Mf,this.ssl=dh}else this.host=e.host,this.ssl=e.ssl??dh;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e._customHeaders&&(this._customHeaders={...e._customHeaders}),e.cacheSizeBytes===void 0)this.cacheSizeBytes=Ff;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<pv)throw new j(F.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}if(HE("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=kf(e.experimentalLongPollingOptions??{}),(function(s){if(s.timeoutSeconds!==void 0){if(isNaN(s.timeoutSeconds))throw new j(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (must not be NaN)`);if(s.timeoutSeconds<5)throw new j(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (minimum allowed value is 5)`);if(s.timeoutSeconds>30)throw new j(F.INVALID_ARGUMENT,`invalid long polling timeout: ${s.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams,e.grpcFlowControlWindow!==void 0){if(typeof e.grpcFlowControlWindow!="number"||e.grpcFlowControlWindow<=0||e.grpcFlowControlWindow>2147483647||!Number.isInteger(e.grpcFlowControlWindow))throw new j(F.INVALID_ARGUMENT,"grpcFlowControlWindow must be a positive integer and cannot exceed 2147483647");this.grpcFlowControlWindow=e.grpcFlowControlWindow}}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(s,r){return s.timeoutSeconds===r.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams&&this.grpcFlowControlWindow===e.grpcFlowControlWindow&&(function(s,r){if(s===r)return!0;if(!s||!r)return!1;const i=Object.keys(s),o=Object.keys(r);if(i.length!==o.length)return!1;for(const a of i)if(s[a]!==r[a])return!1;return!0})(this._customHeaders,e._customHeaders)}}let Yo=class{constructor(e,t,s,r){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=r,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new fh({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new j(F.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new j(F.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new fh(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(s){if(!s)return new z_;switch(s.type){case"firstParty":return new X_(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new j(F.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const s=ch.get(t);s&&(K(uv,"Removing Datastore"),ch.delete(t),s.terminate())})(this),Promise.resolve()}};function Ev(n,e,t,s={}){var u;n=Ut(n,Yo);const r=ai(e),i=n._getSettings(),o={...i,emulatorOptions:n._getEmulatorOptions()},a=`${e}:${t}`;r&&jh(`https://${a}`),i.host!==Mf&&i.host!==a&&Ot("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used.");const c={...i,host:a,ssl:r,emulatorOptions:s};if(!Bs(c,o)&&(n._setSettings(c),s.mockUserToken)){let h,f;if(typeof s.mockUserToken=="string")h=s.mockUserToken,f=Ye.MOCK_USER;else{h=wm(s.mockUserToken,(u=n._app)==null?void 0:u.options.projectId);const p=s.mockUserToken.sub||s.mockUserToken.user_id;if(!p)throw new j(F.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");f=new Ye(p)}n._authCredentials=new W_(new Nf(h,f))}}/**
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
 */class Zs{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new Zs(this.firestore,e,this._query)}}class Re{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Sn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Re(this.firestore,e,this._key)}toJSON(){return{type:Re._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,s){if(di(t,Re._jsonSchema))return new Re(e,s||null,new Y(me.fromString(t.referencePath)))}}Re._jsonSchemaVersion="firestore/documentReference/1.0",Re._jsonSchema={type:xe("string",Re._jsonSchemaVersion),referencePath:xe("string")};class Sn extends Zs{constructor(e,t,s){super(e,t,jo(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Re(this.firestore,null,new Y(e))}withConverter(e){return new Sn(this.firestore,e,this._path)}}function Wi(n,e,...t){if(n=Me(n),jd("collection","path",e),n instanceof Yo){const s=me.fromString(e,...t);return UB(s),new Sn(n,null,s)}{if(!(n instanceof Re||n instanceof Sn))throw new j(F.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(me.fromString(e,...t));return UB(s),new Sn(n.firestore,null,s)}}function Kt(n,e,...t){if(n=Me(n),arguments.length===1&&(e=jl.newId()),jd("doc","path",e),n instanceof Yo){const s=me.fromString(e,...t);return VB(s),new Re(n,null,new Y(s))}{if(!(n instanceof Re||n instanceof Sn))throw new j(F.INVALID_ARGUMENT,"Expected first argument to doc() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(me.fromString(e,...t));return VB(s),new Re(n.firestore,n instanceof Sn?n.converter:null,new Y(s))}}/**
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
 *//**
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
 */class Bt{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(s,r){if(s.length!==r.length)return!1;for(let i=0;i<s.length;++i)if(s[i]!==r[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:Bt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(di(e,Bt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new Bt(e.vectorValues);throw new j(F.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}Bt._jsonSchemaVersion="firestore/vectorValue/1.0",Bt._jsonSchema={type:xe("string",Bt._jsonSchemaVersion),vectorValues:xe("object")};/**
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
 */const _v=/^__.*__$/;class vv{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new qn(e,this.data,this.fieldMask,t,this.fieldTransforms):new pi(e,this.data,t,this.fieldTransforms)}}class Vf{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new qn(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Uf(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw ee(40011,{dataSource:n})}}class nc{constructor(e,t,s,r,i,o){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=r,i===void 0&&this.validatePath(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get dataSource(){return this.settings.dataSource}contextWith(e){return new nc({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}childContextForField(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.contextWith({path:t,arrayElement:!1});return s.validatePathSegment(e),s}childContextForFieldPath(e){var r;const t=(r=this.path)==null?void 0:r.child(e),s=this.contextWith({path:t,arrayElement:!1});return s.validatePath(),s}childContextForArray(e){return this.contextWith({path:void 0,arrayElement:!0})}createError(e){return Ao(e,this.settings.methodName,this.settings.hasConverter||!1,this.path,this.settings.targetDoc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}validatePath(){if(this.path)for(let e=0;e<this.path.length;e++)this.validatePathSegment(this.path.get(e))}validatePathSegment(e){if(e.length===0)throw this.createError("Document fields must not be empty");if(Uf(this.dataSource)&&_v.test(e))throw this.createError('Document fields cannot begin and end with "__"')}}class Dv{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||zo(e)}createContext(e,t,s,r=!1){return new nc({dataSource:e,methodName:t,targetDoc:s,path:Et.emptyPath(),arrayElement:!1,hasConverter:r},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sc(n){const e=n._freezeSettings(),t=zo(n._databaseId);return new Dv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Hf(n,e,t,s,r,i={}){const o=n.createContext(i.merge||i.mergeFields?2:0,e,t,r);rc("Data must be an object, but it was:",o,s);const a=Gf(s,o);let c,u;if(i.merge)c=new Ct(o.fieldMask),u=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const f of i.mergeFields){const p=ms(e,f,t);if(!o.contains(p))throw new j(F.INVALID_ARGUMENT,`Field '${p}' is specified in your field mask but missing from your input data.`);jf(h,p)||h.push(p)}c=new Ct(h),u=o.fieldTransforms.filter((f=>c.covers(f.field)))}else c=null,u=o.fieldTransforms;return new vv(new st(a),c,u)}class Xo extends tc{_toFieldTransform(e){if(e.dataSource!==2)throw e.dataSource===1?e.createError(`${this._methodName}() can only appear at the top level of your update data`):e.createError(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Xo}}function wv(n,e,t,s){const r=n.createContext(1,e,t);rc("Data must be an object, but it was:",r,s);const i=[],o=st.empty();$n(s,((c,u)=>{const h=Jf(e,c,t);u=Me(u);const f=r.childContextForFieldPath(h);if(u instanceof Xo)i.push(h);else{const p=xn(u,f);p!=null&&(i.push(h),o.set(h,p))}}));const a=new Ct(i);return new Vf(o,a,r.fieldTransforms)}function Iv(n,e,t,s,r,i){const o=n.createContext(1,e,t),a=[ms(e,s,t)],c=[r];if(i.length%2!=0)throw new j(F.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let p=0;p<i.length;p+=2)a.push(ms(e,i[p])),c.push(i[p+1]);const u=[],h=st.empty();for(let p=a.length-1;p>=0;--p)if(!jf(u,a[p])){const g=a[p];let D=c[p];D=Me(D);const R=o.childContextForFieldPath(g);if(D instanceof Xo)u.push(g);else{const M=xn(D,R);M!=null&&(u.push(g),h.set(g,M))}}const f=new Ct(u);return new Vf(h,f,o.fieldTransforms)}function Tv(n,e,t,s=!1){return xn(t,n.createContext(s?4:3,e))}function xn(n,e,t){if(qf(n=Me(n)))return rc("Unsupported field value:",e,n),Gf(n,e);if(n instanceof tc)return(function(r,i){if(!Uf(i.dataSource))throw i.createError(`${r._methodName}() can only be used with update() and set()`);if(!i.path)throw i.createError(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(i);o&&i.fieldTransforms.push(o)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.arrayElement&&e.dataSource!==4)throw e.createError("Nested arrays are not supported");return(function(r,i){const o=[];let a=0;for(const c of r){let u=xn(c,i.childContextForArray(a));u==null&&(u={nullValue:"NULL_VALUE"}),o.push(u),a++}return{arrayValue:{values:o}}})(n,e)}return(function(r,i,o){if((r=Me(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Wl(i.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const a=ge.fromDate(r);return{timestampValue:Fr(i.serializer,a)}}if(r instanceof ge){const a=new ge(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Fr(i.serializer,a)}}if($f(r)){const a=ge.fromInstant(r),c=new ge(a.seconds,1e3*Math.floor(a.nanoseconds/1e3));return{timestampValue:Fr(i.serializer,c)}}if(r instanceof $t)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof bt)return{bytesValue:wf(i.serializer,r._byteString)};if(r instanceof Re){const a=i.databaseId,c=r.firestore._databaseId;if(!c.isEqual(a))throw i.createError(`Document reference is for database ${c.projectId}/${c.database} but should be for database ${a.projectId}/${a.database}`);return{referenceValue:ec(r.firestore._databaseId||i.databaseId,r._key.path)}}if(r instanceof Bt)return(function(c,u){const h=c instanceof Bt?c.toArray():c;return{mapValue:{fields:{[Xd]:{stringValue:Zd},[Jr]:{arrayValue:{values:h.map((p=>{if(typeof p!="number")throw u.createError("VectorValues must only contain numeric values.");return Go(u.serializer,p)}))}}}}}})(r,i);if(Rf(r))return r._toProto(i.serializer);throw i.createError(`Unsupported field value: ${Vo(r)}`)})(n,e)}function Gf(n,e){const t={};return Jd(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):$n(n,((s,r)=>{const i=xn(r,e.childContextForField(s));i!=null&&(t[s]=i)})),{mapValue:{fields:t}}}function $f(n){if(typeof n!="object"||n===null)return!1;if(typeof Temporal<"u"&&typeof Temporal.Instant=="function"&&n instanceof Temporal.Instant)return!0;const e=n;return e[Symbol.toStringTag]==="Temporal.Instant"&&typeof e.t=="bigint"}function qf(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ge||n instanceof $t||n instanceof bt||n instanceof Re||n instanceof tc||n instanceof Bt||$f(n)||Rf(n))}function rc(n,e,t){if(!qf(t)||!hi(t)){const s=Vo(t);throw s==="an object"?e.createError(n+" a custom object"):e.createError(n+" "+s)}}function ms(n,e,t){if((e=Me(e))instanceof Wo)return e._internalPath;if(typeof e=="string")return Jf(n,e);throw Ao("Field path arguments must be of type string or ",n,!1,void 0,t)}const bv=new RegExp("[~\\*/\\[\\]]");function Jf(n,e,t){if(e.search(bv)>=0)throw Ao(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new Wo(...e.split("."))._internalPath}catch{throw Ao(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Ao(n,e,t,s,r){const i=s&&!s.isEmpty(),o=r!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let c="";return(i||o)&&(c+=" (found",i&&(c+=` in field ${s}`),o&&(c+=` in document ${r}`),c+=")"),new j(F.INVALID_ARGUMENT,a+n+c)}function jf(n,e){return n.some((t=>t.isEqual(e)))}function Av(n){return typeof n._readUserData=="function"}/**
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
 */class et{constructor(e){this.optionDefinitions=e}_getKnownOptions(e,t){const s=st.empty();for(const r in this.optionDefinitions)if(this.optionDefinitions.hasOwnProperty(r)){const i=this.optionDefinitions[r];if(r in e){const o=e[r];let a;i.nestedOptions&&hi(o)?a={mapValue:{fields:new et(i.nestedOptions).getOptionsProto(t,o)}}:o&&(a=xn(o,t)??void 0),a&&s.set(Et.fromServerFormat(i.serverName),a)}}return s}getOptionsProto(e,t,s){const r=this._getKnownOptions(t,e);if(s){const i=new Map(UE(s,((o,a)=>[Et.fromServerFormat(a),o!==void 0?xn(o,e):null])));r.setAll(i)}return r.value.mapValue.fields??{}}}/**
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
 */function Sv(n){return typeof n=="object"&&n!==null&&!!("nullValue"in n&&(n.nullValue===null||n.nullValue==="NULL_VALUE")||"booleanValue"in n&&(n.booleanValue===null||typeof n.booleanValue=="boolean")||"integerValue"in n&&(n.integerValue===null||typeof n.integerValue=="number"||typeof n.integerValue=="string")||"doubleValue"in n&&(n.doubleValue===null||typeof n.doubleValue=="number")||"timestampValue"in n&&(n.timestampValue===null||(function(t){return typeof t=="object"&&t!==null&&"seconds"in t&&(t.seconds===null||typeof t.seconds=="number"||typeof t.seconds=="string")&&"nanos"in t&&(t.nanos===null||typeof t.nanos=="number")})(n.timestampValue))||"stringValue"in n&&(n.stringValue===null||typeof n.stringValue=="string")||"bytesValue"in n&&(n.bytesValue===null||n.bytesValue instanceof Uint8Array)||"referenceValue"in n&&(n.referenceValue===null||typeof n.referenceValue=="string")||"geoPointValue"in n&&(n.geoPointValue===null||(function(t){return typeof t=="object"&&t!==null&&"latitude"in t&&(t.latitude===null||typeof t.latitude=="number")&&"longitude"in t&&(t.longitude===null||typeof t.longitude=="number")})(n.geoPointValue))||"arrayValue"in n&&(n.arrayValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("values"in t)||t.values!==null&&!Array.isArray(t.values))})(n.arrayValue))||"mapValue"in n&&(n.mapValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("fields"in t)||t.fields!==null&&!hi(t.fields))})(n.mapValue))||"fieldReferenceValue"in n&&(n.fieldReferenceValue===null||typeof n.fieldReferenceValue=="string")||"functionValue"in n&&(n.functionValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("name"in t)||t.name!==null&&typeof t.name!="string"||!("args"in t)||t.args!==null&&!Array.isArray(t.args))})(n.functionValue))||"pipelineValue"in n&&(n.pipelineValue===null||(function(t){return typeof t=="object"&&t!==null&&!(!("stages"in t)||t.stages!==null&&!Array.isArray(t.stages))})(n.pipelineValue)))}function Pv(n){return new Bt(n)}/**
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
 */function q(n){let e;return n instanceof _s?n:(e=hi(n)?xv(n):n instanceof Array?Fv(n):Kf(n,void 0),e)}function Ka(n){if(n instanceof _s)return n;if(n instanceof Bt)return Xr(n);if(Array.isArray(n))return Xr(Pv(n));throw new Error("Unsupported value: "+typeof n)}function ic(n){return jE(n)?Nv(n):q(n)}class _s{constructor(){this._protoValueType="ProtoValue"}add(e){return new x("add",[this,q(e)],"add")}asBoolean(){if(this instanceof Fn)return this;if(this instanceof er)return new Wf(this);if(this instanceof yi)return new Lv(this);if(this instanceof x)return new zf(this);throw new j("invalid-argument",`Conversion of type ${typeof this} to BooleanExpression not supported.`)}subtract(e){return new x("subtract",[this,q(e)],"subtract")}multiply(e){return new x("multiply",[this,q(e)],"multiply")}divide(e){return new x("divide",[this,q(e)],"divide")}mod(e){return new x("mod",[this,q(e)],"mod")}equal(e){return new x("equal",[this,q(e)],"equal").asBoolean()}notEqual(e){return new x("not_equal",[this,q(e)],"notEqual").asBoolean()}lessThan(e){return new x("less_than",[this,q(e)],"lessThan").asBoolean()}lessThanOrEqual(e){return new x("less_than_or_equal",[this,q(e)],"lessThanOrEqual").asBoolean()}greaterThan(e){return new x("greater_than",[this,q(e)],"greaterThan").asBoolean()}greaterThanOrEqual(e){return new x("greater_than_or_equal",[this,q(e)],"greaterThanOrEqual").asBoolean()}arrayConcat(e,...t){const s=[e,...t].map((r=>q(r)));return new x("array_concat",[this,...s],"arrayConcat")}arrayContains(e){return new x("array_contains",[this,q(e)],"arrayContains").asBoolean()}arrayContainsAll(e){const t=Array.isArray(e)?new Ar(e.map(q),"arrayContainsAll"):e;return new x("array_contains_all",[this,t],"arrayContainsAll").asBoolean()}arrayContainsAny(e){const t=Array.isArray(e)?new Ar(e.map(q),"arrayContainsAny"):e;return new x("array_contains_any",[this,t],"arrayContainsAny").asBoolean()}arrayReverse(){return new x("array_reverse",[this])}arrayLength(){return new x("array_length",[this],"arrayLength")}equalAny(e){const t=Array.isArray(e)?new Ar(e.map(q),"equalAny"):e;return new x("equal_any",[this,t],"equalAny").asBoolean()}notEqualAny(e){const t=Array.isArray(e)?new Ar(e.map(q),"notEqualAny"):e;return new x("not_equal_any",[this,t],"notEqualAny").asBoolean()}exists(){return new x("exists",[this],"exists").asBoolean()}charLength(){return new x("char_length",[this],"charLength")}like(e){return new x("like",[this,q(e)],"like").asBoolean()}regexContains(e){return new x("regex_contains",[this,q(e)],"regexContains").asBoolean()}regexFind(e){return new x("regex_find",[this,q(e)],"regexFind")}regexFindAll(e){return new x("regex_find_all",[this,q(e)],"regexFindAll")}regexMatch(e){return new x("regex_match",[this,q(e)],"regexMatch").asBoolean()}stringContains(e){return new x("string_contains",[this,q(e)],"stringContains").asBoolean()}startsWith(e){return new x("starts_with",[this,q(e)],"startsWith").asBoolean()}endsWith(e){return new x("ends_with",[this,q(e)],"endsWith").asBoolean()}toLower(){return new x("to_lower",[this],"toLower")}toUpper(){return new x("to_upper",[this],"toUpper")}trim(e){const t=[this];return e&&t.push(q(e)),new x("trim",t,"trim")}ltrim(e){const t=[this];return e&&t.push(q(e)),new x("ltrim",t,"ltrim")}rtrim(e){const t=[this];return e&&t.push(q(e)),new x("rtrim",t,"rtrim")}type(){return new x("type",[this])}isType(e){return new x("is_type",[this,Xr(e)],"isType").asBoolean()}stringConcat(e,...t){const s=[e,...t].map(q);return new x("string_concat",[this,...s],"stringConcat")}stringIndexOf(e){return new x("string_index_of",[this,q(e)],"stringIndexOf")}stringRepeat(e){return new x("string_repeat",[this,q(e)],"stringRepeat")}stringReplaceAll(e,t){return new x("string_replace_all",[this,q(e),q(t)],"stringReplaceAll")}stringReplaceOne(e,t){return new x("string_replace_one",[this,q(e),q(t)],"stringReplaceOne")}concat(e,...t){const s=[e,...t].map(q);return new x("concat",[this,...s],"concat")}reverse(){return new x("reverse",[this],"reverse")}arrayFilter(e,t){return new x("array_filter",[this,q(e),t],"arrayFilter")}arrayTransform(e,t){return new x("array_transform",[this,q(e),t],"arrayTransform")}arrayTransformWithIndex(e,t,s){return new x("array_transform",[this,q(e),q(t),s],"arrayTransformWithIndex")}arraySlice(e,t){const s=[this,q(e)];return t!==void 0&&s.push(q(t)),new x("array_slice",s,"arraySlice")}arrayFirst(){return new x("array_first",[this],"arrayFirst")}arrayFirstN(e){return new x("array_first_n",[this,q(e)],"arrayFirstN")}arrayLast(){return new x("array_last",[this],"arrayLast")}arrayLastN(e){return new x("array_last_n",[this,q(e)],"arrayLastN")}arrayMaximum(){return new x("maximum",[this],"arrayMaximum")}arrayMaximumN(e){return new x("maximum_n",[this,q(e)],"arrayMaximumN")}arrayMinimum(){return new x("minimum",[this],"arrayMinimum")}arrayMinimumN(e){return new x("minimum_n",[this,q(e)],"arrayMinimumN")}arrayIndexOf(e){return new x("array_index_of",[this,q(e),q("first")],"arrayIndexOf")}arrayLastIndexOf(e){return new x("array_index_of",[this,q(e),q("last")],"arrayLastIndexOf")}arrayIndexOfAll(e){return new x("array_index_of_all",[this,q(e)],"arrayIndexOfAll")}byteLength(){return new x("byte_length",[this],"byteLength")}ceil(){return new x("ceil",[this])}floor(){return new x("floor",[this])}abs(){return new x("abs",[this])}exp(){return new x("exp",[this])}mapGet(e){return new x("map_get",[this,Xr(e)],"mapGet")}mapSet(e,t,...s){const r=[this,q(e),q(t),...s.map(q)];return new x("map_set",r,"mapSet")}mapKeys(){return new x("map_keys",[this],"mapKeys")}mapValues(){return new x("map_values",[this],"mapValues")}mapEntries(){return new x("map_entries",[this],"mapEntries")}getField(e){return new x("get_field",[this,q(e)],"get_field")}count(){return gt._create("count",[this],"count")}sum(){return gt._create("sum",[this],"sum")}average(){return gt._create("average",[this],"average")}minimum(){return gt._create("minimum",[this],"minimum")}maximum(){return gt._create("maximum",[this],"maximum")}first(){return gt._create("first",[this],"first")}last(){return gt._create("last",[this],"last")}arrayAgg(){return gt._create("array_agg",[this],"arrayAgg")}arrayAggDistinct(){return gt._create("array_agg_distinct",[this],"arrayAggDistinct")}countDistinct(){return gt._create("count_distinct",[this],"countDistinct")}logicalMaximum(e,...t){const s=[e,...t];return new x("maximum",[this,...s.map(q)],"logicalMaximum")}logicalMinimum(e,...t){const s=[e,...t];return new x("minimum",[this,...s.map(q)],"minimum")}vectorLength(){return new x("vector_length",[this],"vectorLength")}cosineDistance(e){return new x("cosine_distance",[this,Ka(e)],"cosineDistance")}dotProduct(e){return new x("dot_product",[this,Ka(e)],"dotProduct")}euclideanDistance(e){return new x("euclidean_distance",[this,Ka(e)],"euclideanDistance")}unixMicrosToTimestamp(){return new x("unix_micros_to_timestamp",[this],"unixMicrosToTimestamp")}timestampToUnixMicros(){return new x("timestamp_to_unix_micros",[this],"timestampToUnixMicros")}unixMillisToTimestamp(){return new x("unix_millis_to_timestamp",[this],"unixMillisToTimestamp")}timestampToUnixMillis(){return new x("timestamp_to_unix_millis",[this],"timestampToUnixMillis")}unixSecondsToTimestamp(){return new x("unix_seconds_to_timestamp",[this],"unixSecondsToTimestamp")}timestampToUnixSeconds(){return new x("timestamp_to_unix_seconds",[this],"timestampToUnixSeconds")}timestampAdd(e,t){return new x("timestamp_add",[this,q(e),q(t)],"timestampAdd")}timestampSubtract(e,t){return new x("timestamp_subtract",[this,q(e),q(t)],"timestampSubtract")}timestampDiff(e,t){return new x("timestamp_diff",[this,ic(e),q(t)],"timestampDiff")}timestampExtract(e,t){const s=[this,q(e)];return t&&s.push(q(t)),new x("timestamp_extract",s,"timestampExtract")}documentId(){return new x("document_id",[this],"documentId")}parent(){return new x("parent",[this],"parent")}substring(e,t){const s=q(e);return new x("substring",t===void 0?[this,s]:[this,s,q(t)],"substring")}arrayGet(e){return new x("array_get",[this,q(e)],"arrayGet")}isError(){return new x("is_error",[this],"isError").asBoolean()}ifError(e){const t=new x("if_error",[this,q(e)],"ifError");return e instanceof Fn?t.asBoolean():t}isAbsent(){return new x("is_absent",[this],"isAbsent").asBoolean()}mapRemove(e){return new x("map_remove",[this,q(e)],"mapRemove")}mapMerge(e,...t){const s=q(e),r=t.map(q);return new x("map_merge",[this,s,...r],"mapMerge")}pow(e){return new x("pow",[this,q(e)])}trunc(e){return e===void 0?new x("trunc",[this]):new x("trunc",[this,q(e)],"trunc")}round(e){return e===void 0?new x("round",[this]):new x("round",[this,q(e)],"round")}collectionId(){return new x("collection_id",[this])}length(){return new x("length",[this])}ln(){return new x("ln",[this])}sqrt(){return new x("sqrt",[this])}stringReverse(){return new x("string_reverse",[this])}ifAbsent(e){return new x("if_absent",[this,q(e)],"ifAbsent")}ifNull(e){return new x("if_null",[this,q(e)],"ifNull")}coalesce(e,...t){return new x("coalesce",[this,q(e),...t.map(q)],"coalesce")}join(e){return new x("join",[this,q(e)],"join")}log10(){return new x("log10",[this])}arraySum(){return new x("sum",[this])}split(e){return new x("split",[this,q(e)])}timestampTruncate(e,t){const s=[this,q(e)];return t&&s.push(q(t)),new x("timestamp_trunc",s)}ascending(){return Mv(this)}descending(){return Vv(this)}as(e){return new Ov(this,e,"as")}}class gt{constructor(e,t){this.name=e,this.params=t,this.exprType="AggregateFunction",this._protoValueType="ProtoValue"}static _create(e,t,s){const r=new gt(e,t);return r._methodName=s,r}as(e){return new Rv(this,e,"as")}_toProto(e){return{functionValue:{name:this.name,args:this.params.map((t=>t._toProto(e)))}}}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e)))}}class Rv{constructor(e,t,s){this.aggregate=e,this.alias=t,this._methodName=s}_readUserData(e){this.aggregate._readUserData(e)}}class Ov{constructor(e,t,s){this.expr=e,this.alias=t,this._methodName=s,this.exprType="AliasedExpression",this.selectable=!0}_readUserData(e){this.expr._readUserData(e)}}class Ar extends _s{constructor(e,t){super(),this.cr=e,this._methodName=t,this.expressionType="ListOfExpressions"}_toProto(e){return{arrayValue:{values:this.cr.map((t=>t._toProto(e)))}}}_readUserData(e){this.cr.forEach((t=>t._readUserData(e)))}}class yi extends _s{constructor(e,t){super(),this.fieldPath=e,this._methodName=t,this.expressionType="Field",this.selectable=!0}get _fieldPath(){return this.fieldPath}get fieldName(){return this.fieldPath.canonicalString()}get alias(){return this.fieldName}get expr(){return this}geoDistance(e){return new x("geo_distance",[this,q(e)],"geoDistance")}_toProto(e){return{fieldReferenceValue:this.fieldPath.canonicalString()}}_readUserData(e){}}function Nv(n){return kv(n,"field")}function kv(n,e){return new yi(typeof n=="string"?Gs===n?K_()._internalPath:ms("field",n):n._internalPath,e)}class er extends _s{constructor(e,t){super(),this.value=e,this._methodName=t,this.expressionType="Constant"}static _fromProto(e){const t=new er(e,void 0);return t._protoValue=e,t}_toProto(e){return W(this._protoValue!==void 0,237),this._protoValue}_getValue(){return this._protoValue}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,Sv(this._protoValue)||(this._protoValue=xn(this.value,e))}}function Xr(n,e){return Kf(n,"constant")}function Kf(n,e){const t=new er(n,e);return typeof n=="boolean"?new Wf(t):t}class x extends _s{constructor(e,t,s,r){super(),this.name=e,this.params=t,this.expressionType="Function",this._optionsProto=void 0,s!==void 0&&(this._methodName=s),r!==void 0&&(this._options=r)}get _optionsUtil(){return new et({})}_toProto(e){const t={functionValue:{name:this.name,args:this.params.map((s=>s._toProto(e)))}};return this._optionsProto&&(t.functionValue.options=this._optionsProto),t}_readUserData(e){e=this._methodName?e.contextWith({methodName:this._methodName}):e,this.params.forEach((t=>t._readUserData(e))),this._options&&(this._optionsProto=this._optionsUtil.getOptionsProto(e,this._options))}}class Fn extends _s{get _methodName(){return this._expr._methodName}countIf(){return gt._create("count_if",[this],"countIf")}not(){return new x("not",[this],"not").asBoolean()}conditional(e,t){return new x("conditional",[this,e,t],"conditional")}ifError(e){const t=q(e),s=new x("if_error",[this,t],"ifError");return t instanceof Fn?s.asBoolean():s}_toProto(e){return this._expr._toProto(e)}_readUserData(e){this._expr._readUserData(e)}}class zf extends Fn{constructor(e){super(),this._expr=e,this.expressionType="Function"}}class Wf extends Fn{constructor(e){super(),this._expr=e,this.expressionType="Constant"}_getValue(){return this._expr._getValue()}}class Lv extends Fn{constructor(e){super(),this._expr=e,this.expressionType="Field"}}function xv(n,e){const t=[];for(const s in n)if(Object.prototype.hasOwnProperty.call(n,s)){const r=n[s];t.push(Xr(s)),t.push(q(r))}return new x("map",t,"map")}function Fv(n){return(function(t,s){return new x("array",t.map((r=>q(r))),s)})(n,"array")}function Mv(n){return new Qf(ic(n),"ascending","ascending")}function Vv(n){return new Qf(ic(n),"descending","descending")}class Qf{constructor(e,t,s){this.expr=e,this.direction=t,this._methodName=s,this._protoValueType="ProtoValue"}_toProto(e){return{mapValue:{fields:{direction:Of(this.direction),expression:this.expr._toProto(e)}}}}_readUserData(e){this.expr._readUserData(e)}}/**
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
 */class vt{constructor(e){this.optionsProto=void 0,{rawOptions:this.rawOptions,...this.knownOptions}=e}_readUserData(e){this.optionsProto=this._optionsUtil.getOptionsProto(e,this.knownOptions,this.rawOptions)}_toProto(e){return{name:this._name,options:this.optionsProto}}}class Yf extends vt{get _name(){return"add_fields"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.fields=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.fields)]}}_readUserData(e){super._readUserData(e),Mn(this.fields,e)}}class Xf extends vt{get _name(){return"aggregate"}get _optionsUtil(){return new et({})}constructor(e,t,s){super(s),this.groups=e,this.accumulators=t}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.accumulators),Yr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Mn(this.groups,e),Mn(this.accumulators,e)}}class Zf extends vt{get _name(){return"distinct"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.groups=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.groups)]}}_readUserData(e){super._readUserData(e),Mn(this.groups,e)}}class Zo extends vt{get _name(){return"collection"}get _optionsUtil(){return new et({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.hr=e.startsWith("/")?e:"/"+e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:this.hr}]}}_readUserData(e){super._readUserData(e)}}class ea extends vt{get _name(){return"collection_group"}get _optionsUtil(){return new et({forceIndex:{serverName:"force_index"}})}constructor(e,t){super(t),this.collectionId=e}_toProto(e){return{...super._toProto(e),args:[{referenceValue:""},{stringValue:this.collectionId}]}}_readUserData(e){super._readUserData(e)}}class oc extends vt{get _name(){return"database"}get _optionsUtil(){return new et({})}_toProto(e){return{...super._toProto(e)}}_readUserData(e){super._readUserData(e)}}class ac extends vt{get _name(){return"documents"}get _optionsUtil(){return new et({})}constructor(e,t){if(super(t),!e||e.length===0)throw new j(F.INVALID_ARGUMENT,"Empty document paths are not allowed in DocumentsSource");const s=e.map((i=>i.startsWith("/")?i:"/"+i)),r=new Set(s);if(r.size!==s.length)throw new j(F.INVALID_ARGUMENT,"Duplicate document paths are not allowed in DocumentsSource");this.Tr=s,this.Pr=r}_toProto(e){return{...super._toProto(e),args:this.Tr.map((t=>({referenceValue:t})))}}_readUserData(e){super._readUserData(e)}}class lc extends vt{get _name(){return"where"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.condition=e}_toProto(e){return{...super._toProto(e),args:[this.condition._toProto(e)]}}_readUserData(e){super._readUserData(e),Mn(this.condition,e)}}class Zr extends vt{get _name(){return"limit"}get _optionsUtil(){return new et({})}constructor(e,t){W(!isNaN(e)&&e!==1/0&&e!==-1/0,34860),super(t),this.limit=e}_toProto(e){return{...super._toProto(e),args:[Wl(e,this.limit)]}}}class ph extends vt{get _name(){return"offset"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.offset=e}_toProto(e){return{...super._toProto(e),args:[Wl(e,this.offset)]}}}class Uv extends vt{get _name(){return"select"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.selections=e}_toProto(e){return{...super._toProto(e),args:[Yr(e,this.selections)]}}_readUserData(e){super._readUserData(e),Mn(this.selections,e)}}class cc extends vt{get _name(){return"sort"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.orderings=e}_toProto(e){return{...super._toProto(e),args:this.orderings.map((t=>t._toProto(e)))}}_readUserData(e){super._readUserData(e),Mn(this.orderings,e)}}class uc extends vt{get _name(){return"replace_with"}get _optionsUtil(){return new et({})}constructor(e,t){super(t),this.map=e}_toProto(e){return{...super._toProto(e),args:[this.map._toProto(e),Of(uc.Ir)]}}_readUserData(e){super._readUserData(e),Mn(this.map,e)}}uc.Ir="full_replace";function Mn(n,e){return Av(n)?n._readUserData(e):Array.isArray(n)?n.forEach((t=>t._readUserData(e))):n instanceof Map?n.forEach((t=>t._readUserData(e))):Object.values(n).forEach((t=>t._readUserData(e))),n}// Copyright 2024 Google LLC* @license
class ct{constructor(e,t,s){this.serializer=e,this.stages=t,this.listenOptions=s,this.isCorePipeline=!0}getPipelineCollection(){return ta(this)}getPipelineCollectionGroup(){return Bc(this)}getPipelineCollectionId(){return Hv(this)}getPipelineDocuments(){return Dl(this)}getPipelineFlavor(){return(function(t){let s="exact";return t.stages.forEach(((r,i)=>{r._name!==Zf.name&&r._name!==Xf.name||(s="keyless"),r._name===Uv.name&&s==="exact"&&(s="augmented"),r._name===Yf.name&&i<t.stages.length-1&&s==="exact"&&(s="augmented")})),s})(this)}getPipelineSourceType(){return Pn(this)}}function Pn(n){const e=n.stages[0];return e instanceof Zo||e instanceof ea||e instanceof oc||e instanceof ac?e._name:"unknown"}function ta(n){if(Pn(n)==="collection")return n.stages[0].hr}function Bc(n){if(Pn(n)==="collection_group")return n.stages[0].collectionId}function Hv(n){switch(Pn(n)){case"collection":return me.fromString(ta(n)).lastSegment();case"collection_group":return Bc(n);default:return}}function Dl(n){if(Pn(n)==="documents")return n.stages[0].Tr}class T{constructor(e,t){this.type=e,this.value=t}static mr(){return new T("ERROR",void 0)}static pr(){return new T("UNSET",void 0)}static gr(){return new T("NULL",qs)}static newValue(e){return yt(e)?new T("NULL",qs):(function(s){return!!s&&"booleanValue"in s})(e)?new T("BOOLEAN",e):Ft(e)?new T("INT",e):is(e)?new T("DOUBLE",e):(function(s){return!!s&&"timestampValue"in s&&!!s.timestampValue})(e)?new T("TIMESTAMP",e):(function(s){return!!s&&"stringValue"in s})(e)?new T("STRING",e):(function(s){return!!s&&"bytesValue"in s})(e)?new T("BYTES",e):e.referenceValue?new T("REFERENCE",e):e.geoPointValue?new T("GEO_POINT",e):js(e)?new T("ARRAY",e):Eo(e)?new T("VECTOR",e):ls(e)?new T("MAP",e):new T("ERROR",void 0)}yr(){return this.type==="ERROR"||this.type==="UNSET"}wr(){return this.type==="NULL"}}function Mr(n){if(!n.yr())return n.value}function ep(n){return n instanceof Fn?n._expr:n}function te(n){if((n=ep(n))instanceof yi)return new Gv(n);if(n instanceof er)return new $v(n);if(n instanceof Ar)return new qv(n);if(n instanceof x){if(n.name==="add")return new Kv(n);if(n.name==="subtract")return new zv(n);if(n.name==="multiply")return new Wv(n);if(n.name==="divide")return new Qv(n);if(n.name==="mod")return new Yv(n);if(n.name==="and")return new Xv(n);if(n.name==="equal")return new uD(n);if(n.name==="not_equal")return new BD(n);if(n.name==="less_than")return new hD(n);if(n.name==="less_than_or_equal")return new dD(n);if(n.name==="greater_than")return new fD(n);if(n.name==="greater_than_or_equal")return new pD(n);if(n.name==="array_concat")return new mD(n);if(n.name==="array_reverse")return new gD(n);if(n.name==="array_contains")return new CD(n);if(n.name==="array_contains_all")return new yD(n);if(n.name==="array_contains_any")return new ED(n);if(n.name==="array_length")return new _D(n);if(n.name==="array_element")return new vD(n);if(n.name==="equal_any")return new tp(n);if(n.name==="not_equal_any")return new eD(n);if(n.name==="is_nan")return new tD(n);if(n.name==="is_not_nan")return new nD(n);if(n.name==="is_null")return new sD(n);if(n.name==="is_not_null")return new rD(n);if(n.name==="is_error")return new iD(n);if(n.name==="exists")return new oD(n);if(n.name==="not")return new na(n);if(n.name==="or")return new Zv(n);if(n.name==="xor")return new hc(n);if(n.name==="conditional")return new aD(n);if(n.name==="maximum")return new lD(n);if(n.name==="minimum")return new cD(n);if(n.name==="reverse")return new DD(n);if(n.name==="replace_first")return new wD(n);if(n.name==="replace_all")return new ID(n);if(n.name==="char_length")return new TD(n);if(n.name==="byte_length")return new bD(n);if(n.name==="like")return new AD(n);if(n.name==="regex_contains")return new SD(n);if(n.name==="regex_match")return new PD(n);if(n.name==="string_contains")return new RD(n);if(n.name==="starts_with")return new OD(n);if(n.name==="ends_with")return new ND(n);if(n.name==="to_lower")return new kD(n);if(n.name==="to_upper")return new LD(n);if(n.name==="trim")return new xD(n);if(n.name==="string_concat")return new FD(n);if(n.name==="map_get")return new MD(n);if(n.name==="cosine_distance")return new VD(n);if(n.name==="dot_product")return new UD(n);if(n.name==="euclidean_distance")return new HD(n);if(n.name==="vector_length")return new GD(n);if(n.name==="unix_micros_to_timestamp")return new KD(n);if(n.name==="timestamp_to_unix_micros")return new QD(n);if(n.name==="unix_millis_to_timestamp")return new zD(n);if(n.name==="timestamp_to_unix_millis")return new YD(n);if(n.name==="unix_seconds_to_timestamp")return new WD(n);if(n.name==="timestamp_to_unix_seconds")return new XD(n);if(n.name==="timestamp_add")return new ZD(n);if(n.name==="timestamp_subtract")return new ew(n)}throw new Error(`Unknown Expr : ${n}`)}class Gv{constructor(e){this.expr=e}evaluate(e,t){if(this.expr.fieldName===Gs)return T.newValue({referenceValue:bo(e.serializer,t.key)});if(this.expr.fieldName==="__update_time__")return T.newValue({timestampValue:ao(e.serializer,t.version)});if(this.expr.fieldName==="__create_time__")return T.newValue({timestampValue:ao(e.serializer,t.createTime)});const s=t.data.field(this.expr._fieldPath);return s?Uo(s)?T.newValue((function(i,o){if(i.serverTimestampBehavior==="estimate")return{timestampValue:ao(i.serializer,re.fromTimestamp($s(o)))};if(i.serverTimestampBehavior==="previous"){const a=fi(o);if(a)return a}return{nullValue:"NULL_VALUE"}})(e,s)):T.newValue(s):T.pr()}}class $v{constructor(e){this.expr=e}evaluate(e,t){return T.newValue(this.expr._getValue())}}class qv{constructor(e){this.expr=e}evaluate(e,t){const s=this.expr.cr.map((r=>te(r).evaluate(e,t)));return s.some((r=>r.yr()))?T.mr():T.newValue({arrayValue:{values:s.map((r=>r.value))}})}}function ze(n){return is(n)?Number(n.doubleValue):Number(n.integerValue)}function qt(n){return BigInt(n.integerValue)}const Jv=BigInt("0x7fffffffffffffff"),jv=-BigInt("0x8000000000000000");class Ei{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length>=2,24778);const s=te(this.expr.params[0]).evaluate(e,t),r=te(this.expr.params[1]).evaluate(e,t);let i=this.br(s,r);for(const o of this.expr.params.slice(2)){const a=te(o).evaluate(e,t);i=this.br(i,a)}return i}br(e,t){if(e.yr()||t.yr())return T.mr();if(e.wr()||t.wr())return T.gr();const s=e.value,r=t.value;if(!is(s)&&!Ft(s)||!is(r)&&!Ft(r))return T.mr();if(is(s)||is(r)){const i=this.Sr(s,r);return i?T.newValue(i):T.mr()}if(Ft(s)&&Ft(r)){const i=this.vr(s,r);return i===void 0?T.mr():typeof i=="number"?T.newValue({doubleValue:i}):i<jv||i>Jv?T.mr():T.newValue({integerValue:`${i}`})}return T.mr()}}function rn(n,e){return Ue(n)!==Ue(e)?"TYPE_MISMATCH":ft(n)||ft(e)?"NOT_EQ":yt(n)&&yt(e)?"EQ":yt(n)||yt(e)?"NULL":js(n)&&js(e)?(function(s,r){var o,a,c;if(((o=s.values)==null?void 0:o.length)!==((a=r.values)==null?void 0:a.length))return"NOT_EQ";let i=!1;for(let u=0;u<(((c=s.values)==null?void 0:c.length)??0);u++){const h=s.values[u],f=r.values[u];switch(rn(h,f)){case"EQ":break;case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":i=!0;break;default:ee(44609,{Dr:h,Cr:f})}}return i?"NULL":"EQ"})(n.arrayValue,e.arrayValue):Eo(n)&&Eo(e)||ls(n)&&ls(e)?(function(s,r){const i=s.fields||{},o=r.fields||{};if(Co(i)!==Co(o))return"NOT_EQ";let a=!1;for(const c in i)if(i.hasOwnProperty(c)){if(o[c]===void 0)return"NOT_EQ";switch(rn(i[c],o[c])){case"NOT_EQ":case"TYPE_MISMATCH":return"NOT_EQ";case"NULL":a=!0}}return a?"NULL":"EQ"})(n.mapValue,e.mapValue):(function(s,r){return St(s,r,{u:!1,i:!0,o:!0})})(n,e)?"EQ":"NOT_EQ"}class Kv extends Ei{vr(e,t){return qt(e)+qt(t)}Sr(e,t){return{doubleValue:ze(e)+ze(t)}}}class zv extends Ei{constructor(e){super(e),this.expr=e}vr(e,t){return qt(e)-qt(t)}Sr(e,t){return{doubleValue:ze(e)-ze(t)}}}class Wv extends Ei{constructor(e){super(e),this.expr=e}vr(e,t){return qt(e)*qt(t)}Sr(e,t){return{doubleValue:ze(e)*ze(t)}}}class Qv extends Ei{constructor(e){super(e),this.expr=e}vr(e,t){const s=qt(t);if(s!==BigInt(0))return qt(e)/s}Sr(e,t){const s=ze(t);return s===0?{doubleValue:qr(s)?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY}:{doubleValue:ze(e)/s}}}class Yv extends Ei{constructor(e){super(e),this.expr=e}vr(e,t){const s=qt(t);if(s!==BigInt(0))return qt(e)%s}Sr(e,t){const s=ze(t);if(s!==0)return{doubleValue:ze(e)%s}}}class Xv{constructor(e){this.expr=e}evaluate(e,t){var i;let s=!1,r=!1;for(const o of this.expr.params){const a=te(o).evaluate(e,t);switch(a.type){case"BOOLEAN":if(!((i=a.value)!=null&&i.booleanValue))return T.newValue(je);break;case"NULL":r=!0;break;default:s=!0}}return s?T.mr():r?T.gr():T.newValue(ht)}}class na{constructor(e){this.expr=e}evaluate(e,t){var r;W(this.expr.params.length===1,9634);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"BOOLEAN":return T.newValue({booleanValue:!((r=s.value)!=null&&r.booleanValue)});case"NULL":return T.gr();default:return T.mr()}}}class Zv{constructor(e){this.expr=e}evaluate(e,t){var i;let s=!1,r=!1;for(const o of this.expr.params){const a=te(o).evaluate(e,t);switch(a.type){case"BOOLEAN":if((i=a.value)!=null&&i.booleanValue)return T.newValue(ht);break;case"NULL":r=!0;break;default:s=!0}}return s?T.mr():r?T.gr():T.newValue(je)}}class hc{constructor(e){this.expr=e}evaluate(e,t){var i;let s=!1,r=!1;for(const o of this.expr.params){const a=te(o).evaluate(e,t);switch(a.type){case"BOOLEAN":s=hc.xor(s,!!((i=a.value)!=null&&i.booleanValue));break;case"NULL":r=!0;break;default:return T.mr()}}return r?T.gr():T.newValue({booleanValue:s})}static xor(e,t){return(e||t)&&!(e&&t)}}class tp{constructor(e){this.expr=e}evaluate(e,t){var o,a;W(this.expr.params.length===2,55094);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"NULL":s=!0;break;case"ERROR":case"UNSET":return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":s=!0;break;default:return T.mr()}if(s)return T.gr();for(const c of((a=(o=i.value)==null?void 0:o.arrayValue)==null?void 0:a.values)??[])switch(yt(r.value)&&yt(c)?"EQ":rn(r.value,c)){case"EQ":return T.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":s=!0;break;default:ee(44608,{value:r.value,candidate:c})}return s?T.gr():T.newValue(je)}}class eD{constructor(e){this.expr=e}evaluate(e,t){return new na(new x("not",[new x("equal_any",this.expr.params)])).evaluate(e,t)}}class tD{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,23322);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"INT":return T.newValue(je);case"DOUBLE":return T.newValue({booleanValue:isNaN(ze(s.value))});case"NULL":return T.gr();default:return T.mr()}}}class nD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,50406),new na(new x("not",[new x("is_nan",this.expr.params)])).evaluate(e,t)}}class sD{constructor(e){this.expr=e}evaluate(e,t){switch(W(this.expr.params.length===1,23123),te(this.expr.params[0]).evaluate(e,t).type){case"NULL":return T.newValue(ht);case"UNSET":case"ERROR":return T.mr();default:return T.newValue(je)}}}class rD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,23167),new na(new x("not",[new x("is_null",this.expr.params)])).evaluate(e,t)}}class iD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===1,5228),te(this.expr.params[0]).evaluate(e,t).type==="ERROR"?T.newValue(ht):T.newValue(je)}}class oD{constructor(e){this.expr=e}evaluate(e,t){switch(W(this.expr.params.length===1,6877),te(this.expr.params[0]).evaluate(e,t).type){case"ERROR":return T.mr();case"UNSET":return T.newValue(je);default:return T.newValue(ht)}}}class aD{constructor(e){this.expr=e}evaluate(e,t){var r;W(this.expr.params.length===3,11706);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"BOOLEAN":return(r=s.value)!=null&&r.booleanValue?te(this.expr.params[1]).evaluate(e,t):te(this.expr.params[2]).evaluate(e,t);case"NULL":return te(this.expr.params[2]).evaluate(e,t);default:return T.mr()}}}class lD{constructor(e){this.expr=e}evaluate(e,t){const s=this.expr.params.map((i=>te(i).evaluate(e,t)));let r;for(const i of s)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=r===void 0||dt(i.value,r.value)>0?i:r}return r===void 0?T.gr():r}}class cD{constructor(e){this.expr=e}evaluate(e,t){const s=this.expr.params.map((i=>te(i).evaluate(e,t)));let r;for(const i of s)switch(i.type){case"ERROR":case"UNSET":case"NULL":continue;default:r=r===void 0||dt(i.value,r.value)<0?i:r}return r===void 0?T.gr():r}}class tr{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===2,31033,`${this.expr.name}() function should have exactly 2 params`);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"ERROR":case"UNSET":return T.mr()}const r=te(this.expr.params[1]).evaluate(e,t);switch(r.type){case"ERROR":case"UNSET":return T.mr()}return this.Fr(s,r)}}class uD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){if(e.wr()&&t.wr())return T.newValue(ht);if(e.wr()||t.wr()||ft(e.value)||ft(t.value)||Ue(e.value)!==Ue(t.value))return T.newValue(je);switch(rn(e.value,t.value)){case"EQ":return T.newValue(ht);case"NOT_EQ":return T.newValue(je);case"NULL":return T.gr();default:ee(44615,{left:e,right:t})}}}class BD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){switch(rn(e.value,t.value)){case"EQ":return T.newValue(je);case"NOT_EQ":case"TYPE_MISMATCH":return T.newValue(ht);case"NULL":return T.gr();default:ee(44614,{left:e,right:t})}}}class hD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){return Ue(e.value)!==Ue(t.value)||ft(e.value)||ft(t.value)?T.newValue(je):T.newValue({booleanValue:dt(e.value,t.value)<0})}}class dD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){return Ue(e.value)!==Ue(t.value)||ft(e.value)||ft(t.value)?T.newValue(je):rn(e.value,t.value)==="EQ"?T.newValue(ht):T.newValue({booleanValue:dt(e.value,t.value)<0})}}class fD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){return Ue(e.value)!==Ue(t.value)||ft(e.value)||ft(t.value)?T.newValue(je):T.newValue({booleanValue:dt(e.value,t.value)>0})}}class pD extends tr{constructor(e){super(e),this.expr=e}Fr(e,t){return Ue(e.value)!==Ue(t.value)||ft(e.value)||ft(t.value)?T.newValue(je):rn(e.value,t.value)==="EQ"?T.newValue(ht):T.newValue({booleanValue:dt(e.value,t.value)>0})}}class mD{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class gD{constructor(e){this.expr=e}evaluate(e,t){var r;W(this.expr.params.length===1,216);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":return T.gr();case"ARRAY":{const i=((r=s.value.arrayValue)==null?void 0:r.values)??[];return T.newValue({arrayValue:{values:[...i].reverse()}})}default:return T.mr()}}}class CD{constructor(e){this.expr=e}evaluate(e,t){return W(this.expr.params.length===2,52884),new tp(new x("eq_any",[this.expr.params[1],this.expr.params[0]])).evaluate(e,t)}}class yD{constructor(e){this.expr=e}evaluate(e,t){var c,u,h,f;W(this.expr.params.length===2,1392);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ARRAY":break;case"NULL":s=!0;break;default:return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":s=!0;break;default:return T.mr()}if(s)return T.gr();const o=((u=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:u.values)??[],a=((f=(h=r.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(const p of o){let g=!1;s=!1;for(const D of a){switch(yt(p)&&yt(D)?"EQ":rn(p,D)){case"EQ":g=!0;break;case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":s=!0;break;default:ee(44613,{value:D,search:p})}if(g)break}if(!g)return T.newValue(je)}return T.newValue(ht)}}class ED{constructor(e){this.expr=e}evaluate(e,t){var c,u,h,f;W(this.expr.params.length===2,2680);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"ARRAY":break;case"NULL":s=!0;break;default:return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"ARRAY":break;case"NULL":s=!0;break;default:return T.mr()}if(s)return T.gr();const o=((u=(c=i.value)==null?void 0:c.arrayValue)==null?void 0:u.values)??[],a=((f=(h=r.value)==null?void 0:h.arrayValue)==null?void 0:f.values)??[];for(const p of a)for(const g of o)switch(yt(p)&&yt(g)?"EQ":rn(p,g)){case"EQ":return T.newValue(ht);case"NOT_EQ":case"TYPE_MISMATCH":break;case"NULL":s=!0;break;default:ee(60403,{value:p,search:g})}return s?T.gr():T.newValue(je)}}class _D{constructor(e){this.expr=e}evaluate(e,t){var r,i,o;W(this.expr.params.length===1,38605);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":return T.gr();case"ARRAY":return T.newValue({integerValue:`${((o=(i=(r=s.value)==null?void 0:r.arrayValue)==null?void 0:i.values)==null?void 0:o.length)??0}`});default:return T.mr()}}}class vD{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class DD{constructor(e){this.expr=e}evaluate(e,t){var r,i;W(this.expr.params.length===1,1508);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":return T.gr();case"BYTES":{const o=(r=s.value)==null?void 0:r.bytesValue;if(typeof o=="string"){const a=Ve.fromBase64String(o).toUint8Array();return a.reverse(),T.newValue({bytesValue:Ve.fromUint8Array(a).toBase64()})}return T.newValue({bytesValue:new Uint8Array(o).reverse()})}case"STRING":{const o=(i=s.value)==null?void 0:i.stringValue,a=new Intl.__PRIVATE_Segmenter(void 0,{granularity:"grapheme"}).segment(o),c=Array.from(a,(u=>u.segment)).reverse();return T.newValue({stringValue:c.join("")})}default:return T.mr()}}}class wD{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class ID{constructor(e){this.expr=e}evaluate(e,t){throw new Error("Unimplemented")}}class TD{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,19400);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"NULL":return T.gr();case"STRING":{const r=(function(o){let a=0;for(let c=0;c<o.length;c++){const u=o.codePointAt(c);if(u===void 0)return;if(u<=65535)if(u>=55296&&u<=57343)if(u<=56319){const h=o.codePointAt(c+1);h!==void 0&&h>=56320&&h<=57343?(a+=1,c++):a+=1}else a+=1;else a+=1;else{if(!(u<=1114111))return;a+=1,c++}}return a})(s.value.stringValue);return r===void 0?T.mr():T.newValue({integerValue:r})}default:return T.mr()}}}class bD{constructor(e){this.expr=e}evaluate(e,t){var r,i;W(this.expr.params.length===1,8486);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"BYTES":{const o=(r=s.value)==null?void 0:r.bytesValue;return typeof o=="string"?T.newValue({integerValue:Ve.fromBase64String(o).toUint8Array().length}):T.newValue({integerValue:new Uint8Array(o).length})}case"STRING":{const o=(function(c){let u=0;for(let h=0;h<c.length;h++){const f=c.codePointAt(h);if(f===void 0)return;if(f>=55296&&f<=57343){if(!(f<=56319))return;{const p=c.codePointAt(h+1);if(p===void 0||!(p>=56320&&p<=57343))return;u+=4,h++}}else if(f<=127)u+=1;else if(f<=2047)u+=2;else if(f<=65535)u+=3;else{if(!(f<=1114111))return;u+=4,h++}}return u})((i=s.value)==null?void 0:i.stringValue);return o===void 0?T.mr():T.newValue({integerValue:o})}case"NULL":return T.gr();default:return T.mr()}}}class nr{constructor(e){this.expr=e}evaluate(e,t){var o,a;W(this.expr.params.length===2,39773,`${this.expr.name}() function should have exactly two parameters`);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"STRING":break;case"NULL":s=!0;break;default:return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"STRING":break;case"NULL":s=!0;break;default:return T.mr()}return s?T.gr():this.Or((o=r.value)==null?void 0:o.stringValue,(a=i.value)==null?void 0:a.stringValue)}}class AD extends nr{Or(e,t){try{const s=(function(o){let a="";for(let c=0;c<o.length;c++){const u=o.charAt(c);switch(u){case"_":a+=".";break;case"%":a+=".*";break;case"\\":case".":case"*":case"?":case"+":case"^":case"$":case"|":case"(":case")":case"[":case"]":case"{":case"}":a+="\\"+u;break;default:a+=u}}return"^"+a+"$"})(t),r=ql.compile(s);return T.newValue({booleanValue:r.matches(e)})}catch(s){return Ot(`Invalid LIKE pattern converted to regex: ${t}, returning error. Error: ${s}`),T.mr()}}}class SD extends nr{Or(e,t){try{const s=ql.compile(t);return T.newValue({booleanValue:s.test(e)})}catch{return Ot(`Invalid regex pattern found in regex_contains: ${t}, returning error`),T.mr()}}}class PD extends nr{Or(e,t){try{return T.newValue({booleanValue:ql.compile(t).matches(e)})}catch{return Ot(`Invalid regex pattern found in regex_match: ${t}, returning error`),T.mr()}}}class RD extends nr{Or(e,t){return T.newValue({booleanValue:e.includes(t)})}}class OD extends nr{Or(e,t){return T.newValue({booleanValue:e.startsWith(t)})}}class ND extends nr{Or(e,t){return T.newValue({booleanValue:e.endsWith(t)})}}class kD{constructor(e){this.expr=e}evaluate(e,t){var r,i;W(this.expr.params.length===1,29079);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return T.newValue({stringValue:(i=(r=s.value)==null?void 0:r.stringValue)==null?void 0:i.toLowerCase()});case"NULL":return T.gr();default:return T.mr()}}}class LD{constructor(e){this.expr=e}evaluate(e,t){var r,i;W(this.expr.params.length===1,60487);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return T.newValue({stringValue:(i=(r=s.value)==null?void 0:r.stringValue)==null?void 0:i.toUpperCase()});case"NULL":return T.gr();default:return T.mr()}}}class xD{constructor(e){this.expr=e}evaluate(e,t){var r,i;W(this.expr.params.length===1,28544);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"STRING":return T.newValue({stringValue:(i=(r=s.value)==null?void 0:r.stringValue)==null?void 0:i.trim()});case"NULL":return T.gr();default:return T.mr()}}}class FD{constructor(e){this.expr=e}evaluate(e,t){const s=this.expr.params.map((o=>te(o).evaluate(e,t)));let r="",i=!1;for(const o of s)switch(o.type){case"STRING":r+=o.value.stringValue;break;case"NULL":i=!0;break;default:return T.mr()}return i?T.gr():T.newValue({stringValue:r})}}class MD{constructor(e){this.expr=e}evaluate(e,t){var o,a,c,u;W(this.expr.params.length===2,4483);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"UNSET":return T.pr();case"MAP":break;default:return T.mr()}const r=te(this.expr.params[1]).evaluate(e,t);if(r.type!=="STRING")return T.mr();const i=(u=(a=(o=s.value)==null?void 0:o.mapValue)==null?void 0:a.fields)==null?void 0:u[(c=r.value)==null?void 0:c.stringValue];return i===void 0?T.pr():T.newValue(i)}}class dc{constructor(e){this.expr=e}evaluate(e,t){var u,h;W(this.expr.params.length===2,25231,`${this.expr.name}() function should have exactly 2 params`);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"VECTOR":break;case"NULL":s=!0;break;default:return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);switch(i.type){case"VECTOR":break;case"NULL":s=!0;break;default:return T.mr()}if(s)return T.gr();const o=pl(r.value),a=pl(i.value);if(o===void 0||a===void 0||((u=o.values)==null?void 0:u.length)!==((h=a.values)==null?void 0:h.length))return T.mr();const c=this.Mr(o,a);return c===void 0||isNaN(c)?T.mr():T.newValue({doubleValue:c})}}class VD extends dc{Mr(e,t){const s=(e==null?void 0:e.values)??[],r=(t==null?void 0:t.values)??[];if(s.length===0)return;let i=0,o=0,a=0;for(let u=0;u<s.length;u++){if(!kn(s[u])||!kn(r[u]))return;const h=ze(s[u]),f=ze(r[u]);i+=h*f,o+=h*h,a+=f*f}const c=Math.sqrt(o)*Math.sqrt(a);if(c!==0)return 1-Math.max(-1,Math.min(1,i/c))}}class UD extends dc{Mr(e,t){const s=(e==null?void 0:e.values)??[],r=(t==null?void 0:t.values)??[];if(s.length===0)return 0;let i=0;for(let o=0;o<s.length;o++){if(!kn(s[o])||!kn(r[o]))return;i+=ze(s[o])*ze(r[o])}return i}}class HD extends dc{Mr(e,t){const s=(e==null?void 0:e.values)??[],r=(t==null?void 0:t.values)??[];if(s.length===0)return 0;let i=0;for(let o=0;o<s.length;o++){if(!kn(s[o])||!kn(r[o]))return;const a=ze(s[o]),c=ze(r[o]);i+=Math.pow(a-c,2)}return Math.sqrt(i)}}class GD{constructor(e){this.expr=e}evaluate(e,t){var r;W(this.expr.params.length===1,39044);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"VECTOR":{const i=pl(s.value);return T.newValue({integerValue:((r=i==null?void 0:i.values)==null?void 0:r.length)??0})}case"NULL":return T.gr();default:return T.mr()}}}const ei=BigInt(-62135596800),ti=BigInt(253402300799),So=BigInt(1e3),Rn=BigInt(1e6),$D=ei*So,qD=ti*So+BigInt(999),JD=ei*Rn,jD=ti*Rn+BigInt(999999);function fc(n){return n>=JD&&n<=jD}function np(n){return n>=ei&&n<=ti}function ni(n,e){const t=BigInt(n);return!(t<ei||t>ti)&&!(e<0||e>=1e9)&&(t!==ei||e===0)&&!(t===ti&&e>999999999)}function sp(n,e){return e<0?{seconds:n-1,nanos:e+1e9}:{seconds:n,nanos:e}}function pc(n){return BigInt(n.seconds)*Rn+BigInt(Math.trunc(n.nanoseconds/1e3))}class mc{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,49262,`${this.expr.name}() function should have exactly one parameter`);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"INT":return this.toTimestamp(BigInt(s.value.integerValue));case"NULL":return T.gr();default:return T.mr()}}}class KD extends mc{toTimestamp(e){if(!fc(e))return T.mr();let t=Number(e/Rn),s=Number(e%Rn*BigInt(1e3));const r=sp(t,s);return t=r.seconds,s=r.nanos,ni(t,s)?T.newValue({timestampValue:{seconds:t,nanos:s}}):T.mr()}}class zD extends mc{toTimestamp(e){if(!(function(o){return o>=$D&&o<=qD})(e))return T.mr();let t=Number(e/So),s=Number(e%So*BigInt(1e6));const r=sp(t,s);return t=r.seconds,s=r.nanos,ni(t,s)?T.newValue({timestampValue:{seconds:t,nanos:s}}):T.mr()}}class WD extends mc{toTimestamp(e){if(!np(e))return T.mr();const t=Number(e);return T.newValue({timestampValue:{seconds:t,nanos:0}})}}class gc{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===1,1265,`${this.expr.name}() function should have exactly one parameter`);const s=te(this.expr.params[0]).evaluate(e,t);switch(s.type){case"TIMESTAMP":break;case"NULL":return T.gr();default:return T.mr()}const r=Zl(s.value.timestampValue);return ni(r.seconds,r.nanoseconds)?this.Nr(r):T.mr()}}class QD extends gc{Nr(e){const t=pc(e);return fc(t)?T.newValue({integerValue:`${t.toString()}`}):T.mr()}}class YD extends gc{Nr(e){const t=pc(e),s=t/BigInt(1e3),r=t%BigInt(1e3);return s>BigInt(0)||r===BigInt(0)?T.newValue({integerValue:s.toString()}):T.newValue({integerValue:(s-BigInt(1)).toString()})}}class XD extends gc{Nr(e){const t=BigInt(e.seconds);return np(t)?T.newValue({integerValue:t.toString()}):T.mr()}}class rp{constructor(e){this.expr=e}evaluate(e,t){W(this.expr.params.length===3,2775,`${this.expr.name}() function should have exactly 3 parameters`);let s=!1;const r=te(this.expr.params[0]).evaluate(e,t);switch(r.type){case"TIMESTAMP":break;case"NULL":s=!0;break;default:return T.mr()}const i=te(this.expr.params[1]).evaluate(e,t);let o;switch(i.type){case"STRING":if(o=(function(H){switch(H){case"microsecond":return"microsecond";case"millisecond":return"millisecond";case"second":return"second";case"minute":return"minute";case"hour":return"hour";case"day":return"day";default:return}})(i.value.stringValue),o===void 0)return T.mr();break;case"NULL":s=!0;break;default:return T.mr()}const a=te(this.expr.params[2]).evaluate(e,t);switch(a.type){case"INT":break;case"NULL":s=!0;break;default:return T.mr()}if(s)return T.gr();const c=BigInt(a.value.integerValue);let u;try{switch(o){case"microsecond":u=c;break;case"millisecond":u=c*BigInt(1e3);break;case"second":u=c*BigInt(1e6);break;case"minute":u=c*BigInt(6e7);break;case"hour":u=c*BigInt(36e8);break;case"day":u=c*BigInt(864e8);break;default:return T.mr()}if(o!=="microsecond"&&c!==BigInt(0)&&u/c!==BigInt(this.Lr(o)))return T.mr()}catch(O){return Ot(`Error during timestamp arithmetic: ${O}`),T.mr()}const h=Zl(r.value.timestampValue);if(!ni(h.seconds,h.nanoseconds))return T.mr();const f=pc(h),p=this.Br(f,u);if(!fc(p))return T.mr();const g=Number(p/Rn),D=p%Rn,R=Number((D<0?D+Rn:D)*BigInt(1e3)),M=D<0?g-1:g;return ni(M,R)?T.newValue({timestampValue:{seconds:M,nanos:R}}):T.mr()}Lr(e){switch(e){case"millisecond":return 1e3;case"second":return 1e6;case"minute":return 6e7;case"hour":return 36e8;case"day":return 864e8;default:return 1}}}class ZD extends rp{Br(e,t){return e+t}}class ew extends rp{Br(e,t){return e-t}}function si(n){if((n=ep(n))instanceof yi)return`fld(${n.fieldName})`;if(n instanceof er)return`cst(${(function(t){return t===null?"null":typeof t=="number"?t.toString():typeof t=="string"?`"${t}"`:t instanceof Re?`ref(${t.path})`:t instanceof Bt?`vec(${JSON.stringify(t)})`:JSON.stringify(t)})(n.value)})`;if(n instanceof x)return`fn(${n.name},[${n.params.map(si).join(",")}])`;if(n.expressionType==="ListOfExpressions")return`list([${n.cr.map(si).join(",")}])`;throw new Error(`Unrecognized expr ${JSON.stringify(n,null,2)}`)}function tw(n){if(n instanceof Yf)return`${n._name}(${Qi(n.fields)})`;if(n instanceof Xf){let e=`${n._name}(${Qi(n.accumulators)})`;return n.groups.size>0&&(e+=`grouping(${Qi(n.groups)})`),e}if(n instanceof Zf)return`${n._name}(${Qi(n.groups)})`;if(n instanceof Zo)return`${n._name}(${n.hr})`;if(n instanceof ea)return`${n._name}(${n.collectionId})`;if(n instanceof oc)return`${n._name}()`;if(n instanceof ac)return`${n._name}(${n.Tr.sort()})`;if(n instanceof lc)return`${n._name}(${si(n.condition)})`;if(n instanceof Zr)return`${n._name}(${n.limit})`;if(n instanceof cc)return`${n._name}(${(function(t){return t.map((s=>`${si(s.expr)}${s.direction}`)).join(",")})(n.orderings)})`;throw new Error(`Unrecognized stage ${n._name}`)}function Qi(n){return`${Array.from(n.entries()).sort().map((([e,t])=>`${e}=${si(t)}`)).join(",")}`}function en(n){return n.stages.map((e=>tw(e))).join("|")}function ip(n,e){return en(n)===en(e)}function Ge(n){return n instanceof ct}function mh(n){return Ge(n)?en(n):Lr(n)}function op(n){return Ge(n)?en(n):(function(t){return`${ff(Ht(t))}|lt:${t.limitType}`})(n)}function sa(n,e){return n instanceof ct&&e instanceof ct?ip(n,e):!(n instanceof ct&&!(e instanceof ct)||!(n instanceof ct)&&e instanceof ct)&&C_(n,e)}function ap(n){return ns(n)?en(n):ff(n)}function lp(n,e){return n instanceof ct&&e instanceof ct?ip(n,e):!(n instanceof ct&&!(e instanceof ct)||!(n instanceof ct)&&e instanceof ct)&&pf(n,e)}/**
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
 */class nw{constructor(e,t,s,r){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=r}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let r=0;r<this.mutations.length;r++){const i=this.mutations[r];i.key.isEqual(e.key)&&ZE(i,e,s[r])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Nr(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Nr(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=_f();return this.mutations.forEach((r=>{const i=e.get(r.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=t.has(r.key)?null:a;const c=of(o,a);c!==null&&s.set(r.key,c),o.isValidDocument()||o.convertToNoDocument(re.min())})),s}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),ce())}isEqual(e){return this.batchId===e.batchId&&Hs(this.mutations,e.mutations,((t,s)=>KB(t,s)))&&Hs(this.baseMutations,e.baseMutations,((t,s)=>KB(t,s)))}}class Cc{constructor(e,t,s,r){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=r}static from(e,t,s){W(e.mutations.length===s.length,58842,{Ur:e.mutations.length,kr:s.length});let r=(function(){return D_})();const i=e.mutations;for(let o=0;o<i.length;o++)r=r.insert(i[o].key,s[o].version);return new Cc(e,t,s,r)}}/**
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
 */const cp="";function sw(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=gh(e)),e=rw(n.get(t),e);return gh(e)}function rw(n,e){let t=e;const s=n.length;for(let r=0;r<s;r++){const i=n.charAt(r);switch(i){case"\0":t+="";break;case cp:t+="";break;default:t+=i}}return t}function gh(n){return n+cp+""}/**
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
 */class iw{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class Zt{constructor(e,t,s,r,i=re.min(),o=re.min(),a=Ve.EMPTY_BYTE_STRING,c=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=r,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=c}withSequenceNumber(e){return new Zt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Zt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class ow{constructor(e){this.$r=e}}function aw(n){const e=U_({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Cl(e,e.limit,"L"):e}/**
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
 */class lw{constructor(){this.Zi=new cw}addToCollectionParentIndex(e,t){return this.Zi.add(t),V.resolve()}getCollectionParents(e,t){return V.resolve(this.Zi.getEntries(t))}addFieldIndex(e,t){return V.resolve()}deleteFieldIndex(e,t){return V.resolve()}deleteAllFieldIndexes(e){return V.resolve()}createTargetIndexes(e,t){return V.resolve()}getDocumentsMatchingTarget(e,t){return V.resolve(null)}getIndexType(e,t){return V.resolve(0)}getFieldIndexes(e,t){return V.resolve([])}getNextCollectionGroupToUpdate(e){return V.resolve(null)}getMinOffset(e,t){return V.resolve(Ln.min())}getMinOffsetFromCollectionGroup(e,t){return V.resolve(Ln.min())}updateCollectionGroup(e,t,s){return V.resolve()}updateIndexEntries(e,t){return V.resolve()}}class cw{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t]||new Fe(me.comparator),i=!r.has(s);return this.index[t]=r.add(s),i}has(e){const t=e.lastSegment(),s=e.popLast(),r=this.index[t];return r&&r.has(s)}getEntries(e){return(this.index[e]||new Fe(me.comparator)).toArray()}}/**
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
 */class Vn{constructor(e){this.ys=e}next(){return this.ys+=2,this.ys}static ws(){return new Vn(0)}static bs(){return new Vn(-1)}}// Copyright 2024 Google LLC* @license
function up(n,e){var s;let t=e;for(const r of n.stages)t=Bw({serializer:n.serializer,serverTimestampBehavior:(s=n.listenOptions)==null?void 0:s.serverTimestampBehavior},r,t);return t}function ra(n,e){return up(n,[e]).length>0}function uw(n,e){return Ge(n)?ra(n,e):Ko(n,e)}function Bw(n,e,t){if(e instanceof Zo)return(function(r,i,o){return o.filter((a=>a.isFoundDocument()&&`/${a.key.getCollectionPath().canonicalString()}`===i.hr))})(0,e,t);if(e instanceof lc)return(function(r,i,o){return o.filter((a=>{const c=Mr(te(i.condition).evaluate(r,a));return c!==void 0&&St(c,ht)}))})(n,e,t);if(e instanceof ea)return(function(r,i,o){return o.filter((a=>a.isFoundDocument()&&a.key.getCollectionPath().lastSegment()===i.collectionId))})(0,e,t);if(e instanceof oc)return(function(r,i,o){return o.filter((a=>a.isFoundDocument()))})(0,0,t);if(e instanceof ac)return(function(r,i,o){return o.filter((a=>a.isFoundDocument()&&i.Pr.has(a.key.path.toStringWithLeadingSlash())))})(0,e,t);if(e instanceof Zr)return(function(r,i,o){return o.slice(0,i.limit)})(0,e,t);if(e instanceof cc)return(function(r,i,o){const a=i.orderings.map((c=>({Ms:te(c.expr),direction:c.direction})));return[...o].sort(((c,u)=>{for(const{Ms:h,direction:f}of a){const p=Mr(h.evaluate(r,c)),g=Mr(h.evaluate(r,u)),D=dt(p??qs,g??qs);if(D!==0)return f==="ascending"?D:-D}return 0}))})(n,e,t);throw new Error(`Unknown stage: ${e._name}`)}function wl(n){const e=(function(s){for(let r=s.stages.length-1;r>=0;r--){const i=s.stages[r];if(i instanceof cc)return i.orderings}throw new Error("Pipeline must contain at least one Sort stage")})(n);return(t,s)=>{for(const r of e){const i=Mr(te(r.expr).evaluate({serializer:n.serializer},t)),o=Mr(te(r.expr).evaluate({serializer:n.serializer},s)),a=dt(i||qs,o||qs);if(a!==0)return r.direction==="ascending"?a:-a}return 0}}function za(n){for(let e=n.stages.length-1;e>=0;e--){const t=n.stages[e];if(t instanceof Zr)return{limit:t.limit}}}/**
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
 */class hw{constructor(){this.changes=new Es((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Xe.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?V.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 *//**
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
 */class dw{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class fw{constructor(e,t,s,r){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=r}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next((r=>(s=r,this.remoteDocumentCache.getEntry(e,t)))).next((r=>(s!==null&&Nr(s.mutation,r,Ct.empty(),ge.now()),r)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.getLocalViewOfDocuments(e,s,ce()).next((()=>s))))}getLocalViewOfDocuments(e,t,s=ce()){const r=vn();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,s).next((i=>{let o=Os();return i.forEach(((a,c)=>{o=o.insert(a,c.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const s=vn();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,ce())))}populateOverlays(e,t,s){const r=[];return s.forEach((i=>{t.has(i)||r.push(i)})),this.documentOverlayCache.getOverlays(e,r).next((i=>{i.forEach(((o,a)=>{t.set(o,a)}))}))}computeViews(e,t,s,r){let i=ut();const o=xr(),a=(function(){return xr()})();return t.forEach(((c,u)=>{const h=s.get(u.key);r.has(u.key)&&(h===void 0||h.mutation instanceof qn)?i=i.insert(u.key,u):h!==void 0?(o.set(u.key,h.mutation.getFieldMask()),Nr(h.mutation,u,h.mutation.getFieldMask(),ge.now())):o.set(u.key,Ct.empty())})),this.recalculateAndSaveOverlays(e,i).next((c=>(c.forEach(((u,h)=>o.set(u,h))),t.forEach(((u,h)=>a.set(u,new dw(h,o.get(u)??null)))),a)))}recalculateAndSaveOverlays(e,t){const s=xr();let r=new Ae(((o,a)=>o-a)),i=ce();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const a of o)a.keys().forEach((c=>{const u=t.get(c);if(u===null)return;let h=s.get(c)||Ct.empty();h=a.applyToLocalView(u,h),s.set(c,h);const f=(r.get(a.batchId)||ce()).add(c);r=r.insert(a.batchId,f)}))})).next((()=>{const o=[],a=r.getReverseIterator();for(;a.hasNext();){const c=a.getNext(),u=c.key,h=c.value,f=_f();h.forEach((p=>{if(!i.has(p)){const g=of(t.get(p),s.get(p));g!==null&&f.set(p,g),i=i.add(p)}})),o.push(this.documentOverlayCache.saveOverlays(e,u,f))}return V.waitFor(o)})).next((()=>s))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((s=>this.recalculateAndSaveOverlays(e,s)))}getDocumentsMatchingQuery(e,t,s,r){return Ge(t)?this.getDocumentsMatchingPipeline(e,t,s,r):m_(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):gf(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,r):this.getDocumentsMatchingCollectionQuery(e,t,s,r)}getNextDocuments(e,t,s,r){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,r).next((i=>{const o=r-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,r-i.size):V.resolve(vn());let a=Qr,c=i;return o.next((u=>V.forEach(u,((h,f)=>(a<f.largestBatchId&&(a=f.largestBatchId),i.get(h)?V.resolve():this.remoteDocumentCache.getEntry(e,h).next((p=>{c=c.insert(h,p)}))))).next((()=>this.populateOverlays(e,u,i))).next((()=>this.computeViews(e,c,u,ce()))).next((h=>({batchId:a,changes:Ef(h)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new Y(t)).next((s=>{let r=Os();return s.isFoundDocument()&&(r=r.insert(s.key,s)),r}))}getDocumentsMatchingCollectionGroupQuery(e,t,s,r){const i=t.collectionGroup;let o=Os();return this.indexManager.getCollectionParents(e,i).next((a=>V.forEach(a,(c=>{const u=(function(f,p){return new mi(p,null,f.explicitOrderBy.slice(),f.filters.slice(),f.limit,f.limitType,f.startAt,f.endAt)})(t,c.child(i));return this.getDocumentsMatchingCollectionQuery(e,u,s,r).next((h=>{h.forEach(((f,p)=>{o=o.insert(f,p)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,s,r){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r)))).next((o=>this.retrieveMatchingLocalDocuments(i,o,(a=>Ko(t,a)))))}getDocumentsMatchingPipeline(e,t,s,r){if(Pn(t)==="collection_group"){const i=Bc(t);let o=Os();return this.indexManager.getCollectionParents(e,i).next((a=>V.forEach(a,(c=>{const u=(function(f,p){const g=f.stages.map((D=>D instanceof ea?new Zo(p.canonicalString(),{}):D));return new ct(f.serializer,g)})(t,c.child(i));return this.getDocumentsMatchingPipeline(e,u,s,r).next((h=>{h.forEach(((f,p)=>{o=o.insert(f,p)}))}))})).next((()=>o))))}{let i;return this.getOverlaysForPipeline(e,t,s.largestBatchId).next((o=>{switch(i=o,Pn(t)){case"collection":return this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,i,r);case"documents":let a=ce();for(const c of Dl(t))a=a.add(Y.fromPath(c));return this.remoteDocumentCache.getEntries(e,a);case"database":return this.remoteDocumentCache.getAllEntries(e);default:throw new j("invalid-argument",`Invalid pipeline source to execute offline: ${en(t)}`)}})).next((o=>this.retrieveMatchingLocalDocuments(i,o,(a=>ra(t,a)))))}}retrieveMatchingLocalDocuments(e,t,s){e.forEach(((i,o)=>{const a=o.getKey();t.get(a)===null&&(t=t.insert(a,Xe.newInvalidDocument(a)))}));let r=Os();return t.forEach(((i,o)=>{const a=e.get(i);a!==void 0&&Nr(a.mutation,o,Ct.empty(),ge.now()),s(o)&&(r=r.insert(i,o))})),r}getOverlaysForPipeline(e,t,s){switch(Pn(t)){case"collection":return this.documentOverlayCache.getOverlaysForCollection(e,me.fromString(ta(t)),s);case"collection_group":throw new j("invalid-argument",`Unexpected collection group pipeline: ${en(t)}`);case"documents":return this.documentOverlayCache.getOverlays(e,Dl(t).map((r=>Y.fromPath(r))));case"database":return this.documentOverlayCache.getAllOverlays(e,s);default:throw new j("invalid-argument",`Failed to get overlays for pipeline: ${en(t)}`)}}}/**
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
 */class pw{constructor(e){this.serializer=e,this.Qs=new Map,this.Ws=new Map}getBundleMetadata(e,t){return V.resolve(this.Qs.get(t))}saveBundleMetadata(e,t){return this.Qs.set(t.id,(function(r){return{id:r.id,version:r.version,createTime:Gt(r.createTime)}})(t)),V.resolve()}getNamedQuery(e,t){return V.resolve(this.Ws.get(t))}saveNamedQuery(e,t){return this.Ws.set(t.name,(function(r){return{name:r.name,query:aw(r.bundledQuery),readTime:Gt(r.readTime)}})(t)),V.resolve()}}/**
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
 */class mw{constructor(){this.overlays=new Ae(Y.comparator),this.Gs=new Map}getOverlay(e,t){return V.resolve(this.overlays.get(t))}getOverlays(e,t){const s=vn();return V.forEach(t,(r=>this.getOverlay(e,r).next((i=>{i!==null&&s.set(r,i)})))).next((()=>s))}getAllOverlays(e,t){const s=vn();return this.overlays.forEach(((r,i)=>{i.largestBatchId>t&&s.set(r,i)})),V.resolve(s)}saveOverlays(e,t,s){return s.forEach(((r,i)=>{this.Zr(e,t,i)})),V.resolve()}removeOverlaysForBatchId(e,t,s){const r=this.Gs.get(s);return r!==void 0&&(r.forEach((i=>this.overlays=this.overlays.remove(i))),this.Gs.delete(s)),V.resolve()}getOverlaysForCollection(e,t,s){const r=vn(),i=t.length+1,o=new Y(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const c=a.getNext().value,u=c.getKey();if(!t.isPrefixOf(u.path))break;u.path.length===i&&c.largestBatchId>s&&r.set(c.getKey(),c)}return V.resolve(r)}getOverlaysForCollectionGroup(e,t,s,r){let i=new Ae(((u,h)=>u-h));const o=this.overlays.getIterator();for(;o.hasNext();){const u=o.getNext().value;if(u.getKey().getCollectionGroup()===t&&u.largestBatchId>s){let h=i.get(u.largestBatchId);h===null&&(h=vn(),i=i.insert(u.largestBatchId,h)),h.set(u.getKey(),u)}}const a=vn(),c=i.getIterator();for(;c.hasNext()&&(c.getNext().value.forEach(((u,h)=>a.set(u,h))),!(a.size()>=r)););return V.resolve(a)}Zr(e,t,s){const r=this.overlays.get(s.key);if(r!==null){const o=this.Gs.get(r.largestBatchId).delete(s.key);this.Gs.set(r.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new iw(t,s));let i=this.Gs.get(t);i===void 0&&(i=ce(),this.Gs.set(t,i)),this.Gs.set(t,i.add(s.key))}}/**
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
 */class gw{constructor(){this.sessionToken=Ve.EMPTY_BYTE_STRING}getSessionToken(e){return V.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,V.resolve()}}/**
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
 */class yc{constructor(){this.zs=new Fe(Je.js),this.Hs=new Fe(Je.Js)}isEmpty(){return this.zs.isEmpty()}addReference(e,t){const s=new Je(e,t);this.zs=this.zs.add(s),this.Hs=this.Hs.add(s)}Ys(e,t){e.forEach((s=>this.addReference(s,t)))}removeReference(e,t){this.Zs(new Je(e,t))}Xs(e,t){e.forEach((s=>this.removeReference(s,t)))}e_(e){const t=new Y(new me([])),s=new Je(t,e),r=new Je(t,e+1),i=[];return this.Hs.forEachInRange([s,r],(o=>{this.Zs(o),i.push(o.key)})),i}t_(){this.zs.forEach((e=>this.Zs(e)))}Zs(e){this.zs=this.zs.delete(e),this.Hs=this.Hs.delete(e)}n_(e){const t=new Y(new me([])),s=new Je(t,e),r=new Je(t,e+1);let i=ce();return this.Hs.forEachInRange([s,r],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new Je(e,0),s=this.zs.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class Je{constructor(e,t){this.key=e,this.r_=t}static js(e,t){return Y.comparator(e.key,t.key)||ue(e.r_,t.r_)}static Js(e,t){return ue(e.r_,t.r_)||Y.comparator(e.key,t.key)}}/**
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
 */class Cw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Gr=1,this.i_=new Fe(Je.js)}checkEmpty(e){return V.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,r){const i=this.Gr;this.Gr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new nw(i,t,s,r);this.mutationQueue.push(o);for(const a of r)this.i_=this.i_.add(new Je(a.key,i)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return V.resolve(o)}lookupMutationBatch(e,t){return V.resolve(this.s_(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,r=this.__(s),i=r<0?0:r;return V.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return V.resolve(this.mutationQueue.length===0?Kl:this.Gr-1)}getAllMutationBatches(e){return V.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new Je(t,0),r=new Je(t,Number.POSITIVE_INFINITY),i=[];return this.i_.forEachInRange([s,r],(o=>{const a=this.s_(o.r_);i.push(a)})),V.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new Fe(ue);return t.forEach((r=>{const i=new Je(r,0),o=new Je(r,Number.POSITIVE_INFINITY);this.i_.forEachInRange([i,o],(a=>{s=s.add(a.r_)}))})),V.resolve(this.o_(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,r=s.length+1;let i=s;Y.isDocumentKey(i)||(i=i.child(""));const o=new Je(new Y(i),0);let a=new Fe(ue);return this.i_.forEachWhile((c=>{const u=c.key.path;return!!s.isPrefixOf(u)&&(u.length===r&&(a=a.add(c.r_)),!0)}),o),V.resolve(this.o_(a))}o_(e){const t=[];return e.forEach((s=>{const r=this.s_(s);r!==null&&t.push(r)})),t}removeMutationBatch(e,t){W(this.a_(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let s=this.i_;return V.forEach(t.mutations,(r=>{const i=new Je(r.key,t.batchId);return s=s.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,r.key)})).next((()=>{this.i_=s}))}Hr(e){}containsKey(e,t){const s=new Je(t,0),r=this.i_.firstAfterOrEqual(s);return V.resolve(t.isEqual(r&&r.key))}performConsistencyCheck(e){return this.mutationQueue.length,V.resolve()}a_(e,t){return this.__(e)}__(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}s_(e){const t=this.__(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class yw{constructor(e){this.u_=e,this.docs=(function(){return new Ae(Y.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,r=this.docs.get(s),i=r?r.size:0,o=this.u_(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return V.resolve(s?s.document.mutableCopy():Xe.newInvalidDocument(t))}getEntries(e,t){let s=ut();return t.forEach((r=>{const i=this.docs.get(r);s=s.insert(r,i?i.document.mutableCopy():Xe.newInvalidDocument(r))})),V.resolve(s)}getAllEntries(e){let t=ut();return this.docs.forEach(((s,r)=>{t=t.insert(s,r.document)})),V.resolve(t)}getDocumentsMatchingQuery(e,t,s,r){let i,o;Ge(t)?(i=me.fromString(ta(t)),o=h=>ra(t,h)):(i=t.path,o=h=>Ko(t,h));let a=ut();const c=new Y(i.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!i.isPrefixOf(h.path))break;h.path.length>i.length+1||d_(h_(f),s)<=0||(r.has(f.key)||o(f))&&(a=a.insert(f.key,f.mutableCopy()))}return V.resolve(a)}getAllFromCollectionGroup(e,t,s,r){ee(9500)}c_(e,t){return V.forEach(this.docs,(s=>t(s)))}newChangeBuffer(e){return new Ew(this)}getSize(e){return V.resolve(this.size)}}class Ew extends hw{constructor(e){super(),this.$s=e}applyChanges(e){const t=[];return this.changes.forEach(((s,r)=>{r.isValidDocument()?t.push(this.$s.addEntry(e,r)):this.$s.removeEntry(s)})),V.waitFor(t)}getFromCache(e,t){return this.$s.getEntry(e,t)}getAllFromCache(e,t){return this.$s.getEntries(e,t)}}/**
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
 */class _w{constructor(e){this.persistence=e,this.l_=new Es((t=>ap(t)),lp),this.lastRemoteSnapshotVersion=re.min(),this.highestTargetId=0,this.E_=0,this.h_=new yc,this.targetCount=0,this.T_=Vn.ws()}forEachTarget(e,t){return this.l_.forEach(((s,r)=>t(r))),V.resolve()}getLastRemoteSnapshotVersion(e){return V.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return V.resolve(this.E_)}allocateTargetId(e){return this.highestTargetId=this.T_.next(),V.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.E_&&(this.E_=t),V.resolve()}Ds(e){this.l_.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.T_=new Vn(t),this.highestTargetId=t),e.sequenceNumber>this.E_&&(this.E_=e.sequenceNumber)}addTargetData(e,t){return this.Ds(t),this.targetCount+=1,V.resolve()}updateTargetData(e,t){return this.Ds(t),V.resolve()}removeTargetData(e,t){return this.l_.delete(t.target),this.h_.e_(t.targetId),this.targetCount-=1,V.resolve()}removeTargets(e,t,s){let r=0;const i=[];return this.l_.forEach(((o,a)=>{a.sequenceNumber<=t&&s.get(a.targetId)===null&&(this.l_.delete(o),i.push(this.removeMatchingKeysForTargetId(e,a.targetId)),r++)})),V.waitFor(i).next((()=>r))}getTargetCount(e){return V.resolve(this.targetCount)}getTargetData(e,t){const s=this.l_.get(t)||null;return V.resolve(s)}addMatchingKeys(e,t,s){return this.h_.Ys(t,s),V.resolve()}removeMatchingKeys(e,t,s){this.h_.Xs(t,s);const r=this.persistence.referenceDelegate,i=[];return r&&t.forEach((o=>{i.push(r.markPotentiallyOrphaned(e,o))})),V.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this.h_.e_(t),V.resolve()}getMatchingKeysForTargetId(e,t){const s=this.h_.n_(t);return V.resolve(s)}containsKey(e,t){return V.resolve(this.h_.containsKey(t))}}/**
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
 */class Bp{constructor(e,t){this.P_={},this.overlays={},this.I_=new Qo(0),this.R_=!1,this.R_=!0,this.A_=new gw,this.referenceDelegate=e(this),this.V_=new _w(this),this.indexManager=new lw,this.remoteDocumentCache=(function(r){return new yw(r)})((s=>this.referenceDelegate.d_(s))),this.serializer=new ow(t),this.f_=new pw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.R_=!1,Promise.resolve()}get started(){return this.R_}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new mw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.P_[e.toKey()];return s||(s=new Cw(t,this.referenceDelegate),this.P_[e.toKey()]=s),s}getGlobalsCache(){return this.A_}getTargetCache(){return this.V_}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.f_}runTransaction(e,t,s){K("MemoryPersistence","Starting transaction:",e);const r=new vw(this.I_.next());return this.referenceDelegate.m_(),s(r).next((i=>this.referenceDelegate.p_(r).next((()=>i)))).toPromise().then((i=>(r.raiseOnCommittedEvent(),i)))}g_(e,t){return V.or(Object.values(this.P_).map((s=>()=>s.containsKey(e,t))))}}class vw extends dv{constructor(e){super(),this.currentSequenceNumber=e}}class Ec{constructor(e){this.persistence=e,this.y_=new yc,this.w_=null}static b_(e){return new Ec(e)}get S_(){if(this.w_)return this.w_;throw ee(60996)}addReference(e,t,s){return this.y_.addReference(s,t),this.S_.delete(s.toString()),V.resolve()}removeReference(e,t,s){return this.y_.removeReference(s,t),this.S_.add(s.toString()),V.resolve()}markPotentiallyOrphaned(e,t){return this.S_.add(t.toString()),V.resolve()}removeTarget(e,t){this.y_.e_(t.targetId).forEach((r=>this.S_.add(r.toString())));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next((r=>{r.forEach((i=>this.S_.add(i.toString())))})).next((()=>s.removeTargetData(e,t)))}m_(){this.w_=new Set}p_(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return V.forEach(this.S_,(s=>{const r=Y.fromPath(s);return this.v_(e,r).next((i=>{i||t.removeEntry(r,re.min())}))})).next((()=>(this.w_=null,t.apply(e))))}updateLimboDocument(e,t){return this.v_(e,t).next((s=>{s?this.S_.delete(t.toString()):this.S_.add(t.toString())}))}d_(e){return 0}v_(e,t){return V.or([()=>V.resolve(this.y_.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.g_(e,t)])}}class Po{constructor(e,t){this.persistence=e,this.D_=new Es((s=>sw(s.path)),((s,r)=>s.isEqual(r))),this.garbageCollector=yv(this,t)}static b_(e,t){return new Po(e,t)}m_(){}p_(e){return V.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}ir(e){const t=this.Cs(e);return this.persistence.getTargetCache().getTargetCount(e).next((s=>t.next((r=>s+r))))}Cs(e){let t=0;return this.sr(e,(s=>{t++})).next((()=>t))}sr(e,t){return V.forEach(this.D_,((s,r)=>this.Os(e,s,r).next((i=>i?V.resolve():t(r)))))}removeTargets(e,t,s){return this.persistence.getTargetCache().removeTargets(e,t,s)}removeOrphanedDocuments(e,t){let s=0;const r=this.persistence.getRemoteDocumentCache(),i=r.newChangeBuffer();return r.c_(e,(o=>this.Os(e,o,t).next((a=>{a||(s++,i.removeEntry(o,re.min()))})))).next((()=>i.apply(e))).next((()=>s))}markPotentiallyOrphaned(e,t){return this.D_.set(t,e.currentSequenceNumber),V.resolve()}removeTarget(e,t){const s=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,s)}addReference(e,t,s){return this.D_.set(s,e.currentSequenceNumber),V.resolve()}removeReference(e,t,s){return this.D_.set(s,e.currentSequenceNumber),V.resolve()}updateLimboDocument(e,t){return this.D_.set(t,e.currentSequenceNumber),V.resolve()}d_(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=ro(e.data.value)),t}Os(e,t,s){return V.or([()=>this.persistence.g_(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const r=this.D_.get(t);return V.resolve(r!==void 0&&r>s)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class _c{constructor(e,t,s,r){this.targetId=e,this.fromCache=t,this.Vo=s,this.fo=r}static mo(e,t){let s=ce(),r=ce();for(const i of t.docChanges)switch(i.type){case 0:s=s.add(i.doc.key);break;case 1:r=r.add(i.doc.key)}return new _c(e,t.fromCache,s,r)}}/**
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
 */function Dw(n,e){return Y.comparator(n.key,e.key)}/**
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
 */class ww{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Iw{constructor(){this.po=!1,this.yo=!1,this.wo=100,this.bo=(function(){return Rm()?8:fv(Ze())>0?6:4})()}initialize(e,t){this.So=e,this.indexManager=t,this.po=!0}getDocumentsMatchingQuery(e,t,s,r){const i={result:null};return this.vo(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.Do(e,t,r,s).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new ww;return this.xo(e,t,o).next((a=>{if(i.result=a,this.yo)return this.Co(e,t,o,a.size)}))})).next((()=>i.result))}Co(e,t,s,r){return Ge(t)?V.resolve():s.documentReadCount<this.wo?(Ps()<=Be.DEBUG&&K("QueryEngine","SDK will not create cache indexes for query:",Lr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.wo,"documents"),V.resolve()):(Ps()<=Be.DEBUG&&K("QueryEngine","Query:",Lr(t),"scans",s.documentReadCount,"local documents and returns",r,"documents as results."),s.documentReadCount>this.bo*r?(Ps()<=Be.DEBUG&&K("QueryEngine","The SDK decides to create cache indexes for query:",Lr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ht(t))):V.resolve())}vo(e,t){if(Ge(t))return V.resolve(null);let s=t;if(ZB(s))return V.resolve(null);let r=Ht(s);return this.indexManager.getIndexType(e,r).next((i=>i===0?null:(s.limit!==null&&i===1&&(s=Cl(s,null,"F"),r=Ht(s)),this.indexManager.getDocumentsMatchingTarget(e,r).next((o=>{const a=ce(...o);return this.So.getDocuments(e,a).next((c=>this.indexManager.getMinOffset(e,r).next((u=>{const h=this.Fo(s,c);return this.Oo(s,h,a,u.readTime)?this.vo(e,Cl(s,null,"F")):this.Mo(e,h,s,u)}))))})))))}Do(e,t,s,r){return(Ge(t)?(function(o){for(const a of o.stages){if(a instanceof Zr||a instanceof ph)return!1;if(a instanceof lc){if(a.condition instanceof zf&&a.condition._expr.name==="exists"&&a.condition._expr.params[0]instanceof yi&&a.condition._expr.params[0].fieldName===Gs)continue;return!1}}return!0})(t):ZB(t))||r.isEqual(re.min())?V.resolve(null):this.So.getDocuments(e,s).next((i=>{const o=this.Fo(t,i);return this.Oo(t,o,s,r)?V.resolve(null):(Ps()<=Be.DEBUG&&K("QueryEngine","Re-using previous result from %s to execute query: %s",r.toString(),mh(t)),this.Mo(e,o,t,B_(r,Qr)).next((a=>a)))}))}Fo(e,t){let s,r;return Ge(e)?(s=new Fe(Dw),r=i=>ra(e,i)):(s=new Fe(Yl(e)),r=i=>Ko(e,i)),t.forEach(((i,o)=>{r(o)&&(s=s.add(o))})),s}Oo(e,t,s,r){if(Ge(e))return(function(a){return a.stages.some((c=>c instanceof Zr||c instanceof ph))})(e);if(e.limit===null)return!1;if(s.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(r)>0)}xo(e,t,s){return Ps()<=Be.DEBUG&&K("QueryEngine","Using full collection scan to execute query:",mh(t)),this.So.getDocumentsMatchingQuery(e,t,Ln.min(),s)}Mo(e,t,s,r){return this.So.getDocumentsMatchingQuery(e,s,r).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
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
 */const vc="LocalStore",Tw=3e8;class bw{constructor(e,t,s,r){this.persistence=e,this.No=t,this.serializer=r,this.Lo=new Ae(ue),this.Bo=new Es((i=>ap(i)),lp),this.Uo=new Map,this.ko=e.getRemoteDocumentCache(),this.V_=e.getTargetCache(),this.f_=e.getBundleCache(),this.qo(s)}qo(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new fw(this.ko,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ko.setIndexManager(this.indexManager),this.No.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Lo)))}}function Aw(n,e,t,s){return new bw(n,e,t,s)}async function hp(n,e){const t=ie(n);return await t.persistence.runTransaction("Handle user change","readonly",(s=>{let r;return t.mutationQueue.getAllMutationBatches(s).next((i=>(r=i,t.qo(e),t.mutationQueue.getAllMutationBatches(s)))).next((i=>{const o=[],a=[];let c=ce();for(const u of r){o.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}for(const u of i){a.push(u.batchId);for(const h of u.mutations)c=c.add(h.key)}return t.localDocuments.getDocuments(s,c).next((u=>({$o:u,removedBatchIds:o,addedBatchIds:a})))}))}))}function Sw(n,e){const t=ie(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(s=>{const r=e.batch.keys(),i=t.ko.newChangeBuffer({trackRemovals:!0});return(function(a,c,u,h){const f=u.batch,p=f.keys();let g=V.resolve();return p.forEach((D=>{g=g.next((()=>h.getEntry(c,D))).next((R=>{const M=u.docVersions.get(D);W(M!==null,48541),R.version.compareTo(M)<0&&(f.applyToRemoteDocument(R,u),R.isValidDocument()&&(R.setReadTime(u.commitVersion),h.addEntry(R)))}))})),g.next((()=>a.mutationQueue.removeMutationBatch(c,f)))})(t,s,e,i).next((()=>i.apply(s))).next((()=>t.mutationQueue.performConsistencyCheck(s))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(s,r,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,(function(a){let c=ce();for(let u=0;u<a.mutationResults.length;++u)a.mutationResults[u].transformResults.length>0&&(c=c.add(a.batch.mutations[u].key));return c})(e)))).next((()=>t.localDocuments.getDocuments(s,r)))}))}function dp(n){const e=ie(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.V_.getLastRemoteSnapshotVersion(t)))}function Pw(n,e){const t=ie(n),s=e.snapshotVersion;let r=t.Lo;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.ko.newChangeBuffer({trackRemovals:!0});r=t.Lo;const a=[];e.targetChanges.forEach(((h,f)=>{const p=r.get(f);if(!p)return;a.push(t.V_.removeMatchingKeys(i,h.removedDocuments,f).next((()=>t.V_.addMatchingKeys(i,h.addedDocuments,f))));let g=p.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(f)!==null?g=g.withResumeToken(Ve.EMPTY_BYTE_STRING,re.min()).withLastLimboFreeSnapshotVersion(re.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,s)),r=r.insert(f,g),(function(R,M,O){return R.resumeToken.approximateByteSize()===0||M.snapshotVersion.toMicroseconds()-R.snapshotVersion.toMicroseconds()>=Tw?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0})(p,g,h)&&a.push(t.V_.updateTargetData(i,g))}));let c=ut(),u=ce();if(e.documentUpdates.forEach((h=>{e.resolvedLimboDocuments.has(h)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(i,h))})),a.push(Rw(i,o,e.documentUpdates).next((h=>{c=h.Ko,u=h.Qo}))),!s.isEqual(re.min())){const h=t.V_.getLastRemoteSnapshotVersion(i).next((f=>t.V_.setTargetsMetadata(i,i.currentSequenceNumber,s)));a.push(h)}return V.waitFor(a).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,c,u))).next((()=>c))})).then((i=>(t.Lo=r,i)))}function Rw(n,e,t){let s=ce(),r=ce();return t.forEach((i=>s=s.add(i))),e.getEntries(n,s).next((i=>{let o=ut();return t.forEach(((a,c)=>{const u=i.get(a);c.isFoundDocument()!==u.isFoundDocument()&&(r=r.add(a)),c.isNoDocument()&&c.version.isEqual(re.min())?(e.removeEntry(a,c.readTime),o=o.insert(a,c)):!u.isValidDocument()||c.version.compareTo(u.version)>0||c.version.compareTo(u.version)===0&&u.hasPendingWrites?(e.addEntry(c),o=o.insert(a,c)):K(vc,"Ignoring outdated watch update for ",a,". Current version:",u.version," Watch version:",c.version)})),{Ko:o,Qo:r}}))}function Ow(n,e){const t=ie(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(s=>(e===void 0&&(e=Kl),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e))))}function Nw(n,e){const t=ie(n);return t.persistence.runTransaction("Allocate target","readwrite",(s=>{let r;return t.V_.getTargetData(s,e).next((i=>i?(r=i,V.resolve(r)):t.V_.allocateTargetId(s).next((o=>(r=new Zt(e,o,"TargetPurposeListen",s.currentSequenceNumber),t.V_.addTargetData(s,r).next((()=>r)))))))})).then((s=>{const r=t.Lo.get(s.targetId);return(r===null||s.snapshotVersion.compareTo(r.snapshotVersion)>0)&&(t.Lo=t.Lo.insert(s.targetId,s),t.Bo.set(e,s.targetId)),s}))}async function Il(n,e,t){const s=ie(n),r=s.Lo.get(e),i=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",i,(o=>s.persistence.referenceDelegate.removeTarget(o,r)))}catch(o){if(!Xs(o))throw o;K(vc,`Failed to update sequence numbers for target ${e}: ${o}`)}s.Lo=s.Lo.remove(e),s.Bo.delete(r.target)}function Ch(n,e,t){const s=ie(n);let r=re.min(),i=ce();return s.persistence.runTransaction("Execute query","readwrite",(o=>(function(c,u,h){const f=ie(c),p=f.Bo.get(h);return p!==void 0?V.resolve(f.Lo.get(p)):f.V_.getTargetData(u,h)})(s,o,Ge(e)?e:Ht(e)).next((a=>{if(a)return r=a.lastLimboFreeSnapshotVersion,s.V_.getMatchingKeysForTargetId(o,a.targetId).next((c=>{i=c}))})).next((()=>s.No.getDocumentsMatchingQuery(o,e,t?r:re.min(),t?i:ce()))).next((a=>(kw(s,a),{documents:a,Wo:i})))))}function kw(n,e){e.forEach(((t,s)=>{const r=s.key.getCollectionGroup(),i=n.Uo.get(r)||re.min();s.readTime.compareTo(i)>0&&n.Uo.set(r,s.readTime)}))}/**
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
 */class Lw{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.Yo=0,this.Zo=null,this.Xo=!0}ea(){this.Yo===0&&(this.ta("Unknown"),this.Zo=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this.Zo=null,this.na("Backend didn't respond within 10 seconds."),this.ta("Offline"),Promise.resolve()))))}ra(e){this.state==="Online"?this.ta("Unknown"):(this.Yo++,this.Yo>=1&&(this.ia(),this.na(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ta("Offline")))}set(e){this.ia(),this.Yo=0,e==="Online"&&(this.Xo=!1),this.ta(e)}ta(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}na(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.Xo?(sn(t),this.Xo=!1):K("OnlineStateTracker",t)}ia(){this.Zo!==null&&(this.Zo.cancel(),this.Zo=null)}}/**
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
 */const Jt="RemoteStore";class xw{constructor(e,t,s,r,i){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.sa=[],this._a=new Map,this.oa=new Map,this.aa=new Map,this.ua=new Vn(1e3),this.ca=new Vn(1001),this.la=new Set,this.Ea=[],this.ha=i,this.ha.Qe((o=>{s.enqueueAndForget((async()=>{vs(this)&&(K(Jt,"Restarting streams for network reachability change."),await(async function(c){const u=ie(c);u.la.add(4),await _i(u),u.Ta.set("Unknown"),u.la.delete(4),await ia(u)})(this))}))})),this.Ta=new Lw(s,r)}}async function ia(n){if(vs(n))for(const e of n.Ea)await e(!0)}async function _i(n){for(const e of n.Ea)await e(!1)}function Tl(n,e){return n.oa.get(e)||void 0}function fp(n,e){const t=ie(n),s=Tl(t,e.targetId);if(s!==void 0&&t._a.has(s))return;const r=(function(a,c){const u=Tl(a,c);u!==void 0&&a.aa.delete(u);const h=(function(p,g){return g%2!=0?p.ca.next():p.ua.next()})(a,c);return a.oa.set(c,h),a.aa.set(h,c),h})(t,e.targetId);K(Jt,"remoteStoreListen mapping SDK target ID to remote",e.targetId,r);const i=new Zt(e.target,r,e.purpose,e.sequenceNumber,e.snapshotVersion,e.lastLimboFreeSnapshotVersion,e.resumeToken);t._a.set(r,i),Tc(t)?Ic(t):sr(t).Yt()&&wc(t,i)}function Dc(n,e){const t=ie(n),s=sr(t),r=Tl(t,e);K(Jt,"remoteStoreUnlisten removing mapping of SDK target ID to remote",e,r),t._a.delete(r),t.oa.delete(e),t.aa.delete(r),s.Yt()&&pp(t,r),t._a.size===0&&(s.Yt()?s.en():vs(t)&&t.Ta.set("Unknown"))}function wc(n,e){if(n.Pa.J(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(re.min())>0){const t=n.aa.get(e.targetId);if(t===void 0)return void K(Jt,"SDK target ID not found for remote ID: "+e.targetId);const s=n.remoteSyncer.getRemoteKeysForTarget(t).size;e=e.withExpectedCount(s)}sr(n).Pn(e)}function pp(n,e){n.Pa.J(e),sr(n).In(e)}function Ic(n){n.Pa=new S_({getRemoteKeysForTarget:e=>{const t=n.aa.get(e);return t!==void 0?n.remoteSyncer.getRemoteKeysForTarget(t):ce()},ye:e=>n._a.get(e)||null,Ve:()=>n.datastore.serializer.databaseId}),sr(n).start(),n.Ta.ea()}function Tc(n){return vs(n)&&!sr(n).Jt()&&n._a.size>0}function vs(n){return ie(n).la.size===0}function mp(n){n.Pa=void 0}async function Fw(n){n.Ta.set("Online")}async function Mw(n){n._a.forEach(((e,t)=>{wc(n,e)}))}async function Vw(n,e){mp(n),Tc(n)?(n.Ta.ra(e),Ic(n)):n.Ta.set("Unknown")}async function Uw(n,e,t){if(n.Ta.set("Online"),e instanceof Df&&e.state===2&&e.cause)try{await(async function(r,i){const o=i.cause;for(const a of i.targetIds){if(r._a.has(a)){const c=r.aa.get(a);c!==void 0&&(await r.remoteSyncer.rejectListen(c,o),r.oa.delete(c),r.aa.delete(a)),r._a.delete(a)}r.Pa.removeTarget(a)}})(n,e)}catch(s){K(Jt,"Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Ro(n,s)}else if(e instanceof oo?n.Pa._e(e):e instanceof vf?n.Pa.he(e):n.Pa.ue(e),!t.isEqual(re.min()))try{const s=await dp(n.localStore);t.compareTo(s)>=0&&await(function(i,o){const a=i.Pa.fe(o);a.targetChanges.forEach(((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=i._a.get(h);f&&i._a.set(h,f.withResumeToken(u.resumeToken,o))}})),a.targetMismatches.forEach(((u,h)=>{const f=i._a.get(u);if(!f)return;i._a.set(u,f.withResumeToken(Ve.EMPTY_BYTE_STRING,f.snapshotVersion)),pp(i,u);const p=new Zt(f.target,u,h,f.sequenceNumber);wc(i,p)}));const c=(function(h,f){const p=new Map;f.targetChanges.forEach(((D,R)=>{const M=h.aa.get(R);M!==void 0&&p.set(M,D)}));let g=new Ae(ue);return f.targetMismatches.forEach(((D,R)=>{const M=h.aa.get(D);M!==void 0&&(g=g.insert(M,R))})),new gi(f.snapshotVersion,p,g,f.documentUpdates,f.augmentedDocumentUpdates,f.resolvedLimboDocuments)})(i,a);return i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(s){K(Jt,"Failed to raise snapshot:",s),await Ro(n,s)}}async function Ro(n,e,t){if(!Xs(e))throw e;n.la.add(1),await _i(n),n.Ta.set("Offline"),t||(t=()=>dp(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{K(Jt,"Retrying IndexedDB access"),await t(),n.la.delete(1),await ia(n)}))}function gp(n,e){return e().catch((t=>Ro(n,t,e)))}async function oa(n){const e=ie(n),t=Un(e);let s=e.sa.length>0?e.sa[e.sa.length-1].batchId:Kl;for(;Hw(e);)try{const r=await Ow(e.localStore,s);if(r===null){e.sa.length===0&&t.en();break}s=r.batchId,Gw(e,r)}catch(r){await Ro(e,r)}Cp(e)&&yp(e)}function Hw(n){return vs(n)&&n.sa.length<10}function Gw(n,e){n.sa.push(e);const t=Un(n);t.Yt()&&t.Rn&&t.An(e.mutations)}function Cp(n){return vs(n)&&!Un(n).Jt()&&n.sa.length>0}function yp(n){Un(n).start()}async function $w(n){Un(n).fn()}async function qw(n){const e=Un(n);for(const t of n.sa)e.An(t.mutations)}async function Jw(n,e,t){const s=n.sa.shift(),r=Cc.from(s,e,t);await gp(n,(()=>n.remoteSyncer.applySuccessfulWrite(r))),await oa(n)}async function jw(n,e){e&&Un(n).Rn&&await(async function(s,r){if((function(o){return __(o)&&o!==F.ABORTED})(r.code)){const i=s.sa.shift();Un(s).Xt(),await gp(s,(()=>s.remoteSyncer.rejectFailedWrite(i.batchId,r))),await oa(s)}})(n,e),Cp(n)&&yp(n)}async function yh(n,e){const t=ie(n);t.asyncQueue.verifyOperationInProgress(),K(Jt,"RemoteStore received new credentials");const s=vs(t);t.la.add(3),await _i(t),s&&t.Ta.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.la.delete(3),await ia(t)}async function Kw(n,e){const t=ie(n);e?(t.la.delete(2),await ia(t)):e||(t.la.add(2),await _i(t),t.Ta.set("Unknown"))}function sr(n){return n.Ia||(n.Ia=(function(t,s,r){const i=ie(t);return i.pn(),new iv(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)})(n.datastore,n.asyncQueue,{ct:Fw.bind(null,n),Et:Mw.bind(null,n),Tt:Vw.bind(null,n),Tn:Uw.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ia.Xt(),Tc(n)?Ic(n):n.Ta.set("Unknown")):(await n.Ia.stop(),mp(n))}))),n.Ia}function Un(n){return n.Ra||(n.Ra=(function(t,s,r){const i=ie(t);return i.pn(),new ov(s,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,r)})(n.datastore,n.asyncQueue,{ct:()=>Promise.resolve(),Et:$w.bind(null,n),Tt:jw.bind(null,n),Vn:qw.bind(null,n),dn:Jw.bind(null,n)}),n.Ea.push((async e=>{e?(n.Ra.Xt(),await oa(n)):(await n.Ra.stop(),n.sa.length>0&&(K(Jt,`Stopping write stream with ${n.sa.length} pending writes`),n.sa=[]))}))),n.Ra}/**
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
 */class Ep{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Aa(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Aa(this.observer.error,e):sn("Uncaught Error in snapshot listener:",e.toString()))}Va(){this.muted=!0}Aa(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
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
 */class bc{constructor(e,t,s,r,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=r,this.removalCallback=i,this.deferred=new An,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,r,i){const o=Date.now()+s,a=new bc(e,t,o,r,i);return a.start(s),a}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new j(F.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Ac(n,e){if(sn("AsyncQueue",`${e}: ${n}`),Xs(n))return new j(F.UNAVAILABLE,`${e}: ${n}`);throw n}class Eh{constructor(){this.activeTargetIds=T_()}Ba(e){this.activeTargetIds=this.activeTargetIds.add(e)}Ua(e){this.activeTargetIds=this.activeTargetIds.delete(e)}La(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class zw{constructor(){this.fu=new Eh,this.mu={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e,t=!0){return t&&this.fu.Ba(e),this.mu[e]||"not-current"}updateQueryState(e,t,s){this.mu[e]=t}removeLocalQueryTarget(e){this.fu.Ua(e)}isLocalQueryTarget(e){return this.fu.activeTargetIds.has(e)}clearQueryState(e){delete this.mu[e]}getAllActiveQueryTargets(){return this.fu.activeTargetIds}isActiveQueryTarget(e){return this.fu.activeTargetIds.has(e)}start(){return this.fu=new Eh,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}function Wa(){return typeof document<"u"?document:null}/**
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
 */class cs{static emptySet(e){return new cs(e.comparator)}constructor(e){this.comparator=e?(t,s)=>e(t,s)||Y.comparator(t.key,s.key):(t,s)=>Y.comparator(t.key,s.key),this.keyedMap=Os(),this.sortedSet=new Ae(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,s)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof cs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const r=t.getNext().key,i=s.getNext().key;if(!r.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new cs;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
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
 */class _h{constructor(){this.pu=new Ae(Y.comparator)}track(e){const t=e.doc.key,s=this.pu.get(t);s?e.type!==0&&s.type===3?this.pu=this.pu.insert(t,e):e.type===3&&s.type!==1?this.pu=this.pu.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.pu=this.pu.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.pu=this.pu.remove(t):e.type===1&&s.type===2?this.pu=this.pu.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.pu=this.pu.insert(t,{type:2,doc:e.doc}):ee(63341,{we:e,gu:s}):this.pu=this.pu.insert(t,e)}yu(){const e=[];return this.pu.inorderTraversal(((t,s)=>{e.push(s)})),e}}class Ks{constructor(e,t,s,r,i,o,a,c,u){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=r,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=c,this.hasCachedResults=u}static fromInitialDocuments(e,t,s,r,i){const o=[];return t.forEach((a=>{o.push({type:0,doc:a})})),new Ks(e,t,cs.emptySet(t),o,s,r,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&sa(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let r=0;r<t.length;r++)if(t[r].type!==s[r].type||!t[r].doc.isEqual(s[r].doc))return!1;return!0}}/**
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
 */class Ww{constructor(){this.wu=void 0,this.bu=[]}Su(){return this.bu.some((e=>e.vu()))}}class Qw{constructor(){this.queries=vh(),this.onlineState="Unknown",this.Du=new Set}terminate(){(function(t,s){const r=ie(t),i=r.queries;r.queries=vh(),i.forEach(((o,a)=>{for(const c of a.bu)c.onError(s)}))})(this,new j(F.ABORTED,"Firestore shutting down"))}}function vh(){return new Es((n=>op(n)),sa)}async function _p(n,e){const t=ie(n);let s=3;const r=e.query;let i=t.queries.get(r);i?!i.Su()&&e.vu()&&(s=2):(i=new Ww,s=e.vu()?0:1);try{switch(s){case 0:i.wu=await t.onListen(r,!0);break;case 1:i.wu=await t.onListen(r,!1);break;case 2:await t.onFirstRemoteStoreListen(r)}}catch(o){const a=Ac(o,`Initialization of query '${Ge(e.query)?en(e.query):Lr(e.query)}' failed`);return void e.onError(a)}t.queries.set(r,i),i.bu.push(e),e.xu(t.onlineState),i.wu&&e.Cu(i.wu)&&Sc(t)}async function vp(n,e){const t=ie(n),s=e.query;let r=3;const i=t.queries.get(s);if(i){const o=i.bu.indexOf(e);o>=0&&(i.bu.splice(o,1),i.bu.length===0?r=e.vu()?0:1:!i.Su()&&e.vu()&&(r=2))}switch(r){case 0:return t.queries.delete(s),t.onUnlisten(s,!0);case 1:return t.queries.delete(s),t.onUnlisten(s,!1);case 2:return t.onLastRemoteStoreUnlisten(s);default:return}}function Yw(n,e){const t=ie(n);let s=!1;for(const r of e){const i=r.query,o=t.queries.get(i);if(o){for(const a of o.bu)a.Cu(r)&&(s=!0);o.wu=r}}s&&Sc(t)}function Xw(n,e,t){const s=ie(n),r=s.queries.get(e);if(r)for(const i of r.bu)i.onError(t);s.queries.delete(e)}function Sc(n){n.Du.forEach((e=>{e.next()}))}var bl;(function(n){n.Default="default",n.Cache="cache"})(bl||(bl={}));class Dp{constructor(e,t,s){this.query=e,this.Fu=t,this.Ou=!1,this.Mu=null,this.onlineState="Unknown",this.options=s||{}}Cu(e){if(!this.options.includeMetadataChanges){const s=[];for(const r of e.docChanges)r.type!==3&&s.push(r);e=new Ks(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Ou?this.Nu(e)&&(this.Fu.next(e),t=!0):this.Lu(e,this.onlineState)&&(this.Bu(e),t=!0),this.Mu=e,t}onError(e){this.Fu.error(e)}xu(e){this.onlineState=e;let t=!1;return this.Mu&&!this.Ou&&this.Lu(this.Mu,e)&&(this.Bu(this.Mu),t=!0),t}Lu(e,t){if(!e.fromCache||!this.vu())return!0;const s=t!=="Offline";return(!this.options.waitForSyncWhenOnline||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Nu(e){if(e.docChanges.length>0)return!0;const t=this.Mu&&this.Mu.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}Bu(e){e=Ks.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Ou=!0,this.Fu.next(e)}vu(){return this.options.source!==bl.Cache}}/**
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
 */class wp{constructor(e){this.key=e}}class Ip{constructor(e){this.key=e}}class Zw{constructor(e,t){this.query=e,this.zu=t,this.ju=null,this.hasCachedResults=!1,this.current=!1,this.Hu=ce(),this.mutatedKeys=ce(),this.Ju=Ge(e)?wl(e):Yl(e),this.Yu=new cs(this.Ju)}get Zu(){return this.zu}Xu(e,t){const s=t?t.ec:new _h,r=t?t.Yu:this.Yu;let i=t?t.mutatedKeys:this.mutatedKeys,o=r,a=!1;const[c,u]=this.tc(this.query,r);e.inorderTraversal(((f,p)=>{const g=r.get(f),D=uw(this.query,p)?p:null,R=!!g&&this.mutatedKeys.has(g.key),M=!!D&&(D.hasLocalMutations||this.mutatedKeys.has(D.key)&&D.hasCommittedMutations);let O=!1;g&&D?g.data.isEqual(D.data)?R!==M&&(s.track({type:3,doc:D}),O=!0):this.nc(g,D)||(s.track({type:2,doc:D}),O=!0,(c&&this.Ju(D,c)>0||u&&this.Ju(D,u)<0)&&(a=!0)):!g&&D?(s.track({type:0,doc:D}),O=!0):g&&!D&&(s.track({type:1,doc:g}),O=!0,(c||u)&&(a=!0)),O&&(D?(o=o.add(D),i=M?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))}));const h=this.rc(this.query);if(h)if(Ge(this.query)){const f=[];o.forEach((D=>f.push(D)));const p=up(this.query,f);let g=new cs(wl(this.query));for(const D of p)g=g.add(D);o.forEach((D=>{g.has(D.key)||(i=i.delete(D.key),s.track({type:1,doc:D}))})),o=g}else{const f=this.sc(this.query);for(;o.size>h;){const p=f==="F"?o.last():o.first();o=o.delete(p.key),i=i.delete(p.key),s.track({type:1,doc:p})}}return{Yu:o,ec:s,Oo:a,mutatedKeys:i}}rc(e){var t;return Ge(e)?(t=za(e))==null?void 0:t.limit:e.limit||void 0}sc(e){if(Ge(e)){const t=za(e);return t&&t.limit<0?"L":"F"}return e.limitType}tc(e,t){var s;if(Ge(e)){const r=(s=za(e))==null?void 0:s.limit;return[t.size===r?t.last():null,null]}return[e.limitType==="F"&&t.size===this.rc(this.query)?t.last():null,e.limitType==="L"&&t.size===this.rc(this.query)?t.first():null]}nc(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,r){const i=this.Yu;this.Yu=e.Yu,this.mutatedKeys=e.mutatedKeys;const o=e.ec.yu();o.sort(((h,f)=>(function(g,D){const R=M=>{switch(M){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return ee(20277,{we:M})}};return R(g)-R(D)})(h.type,f.type)||this.Ju(h.doc,f.doc))),this._c(s),r=r??!1;const a=t&&!r?this.oc():[],c=this.Hu.size===0&&this.current&&!r?1:0,u=c!==this.ju;return this.ju=c,o.length!==0||u?{snapshot:new Ks(this.query,e.Yu,i,o,e.mutatedKeys,c===0,u,!1,!!s&&s.resumeToken.approximateByteSize()>0),ac:a}:{ac:a}}xu(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Yu:this.Yu,ec:new _h,mutatedKeys:this.mutatedKeys,Oo:!1},!1)):{ac:[]}}uc(e){return!this.zu.has(e)&&!!this.Yu.has(e)&&!this.Yu.get(e).hasLocalMutations}_c(e){e&&(e.addedDocuments.forEach((t=>this.zu=this.zu.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.zu=this.zu.delete(t))),this.current=e.current)}oc(){if(!this.current)return[];const e=this.Hu;this.Hu=ce(),this.Yu.forEach((s=>{this.uc(s.key)&&(this.Hu=this.Hu.add(s.key))}));const t=[];return e.forEach((s=>{this.Hu.has(s)||t.push(new Ip(s))})),this.Hu.forEach((s=>{e.has(s)||t.push(new wp(s))})),t}cc(e){this.zu=e.Wo,this.Hu=ce();const t=this.Xu(e.documents);return this.applyChanges(t,!0)}lc(){return Ks.fromInitialDocuments(this.query,this.Yu,this.mutatedKeys,this.ju===0,this.hasCachedResults)}}const Pc="SyncEngine";class eI{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class tI{constructor(e){this.key=e,this.Ec=!1}}class nI{constructor(e,t,s,r,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=r,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.hc={},this.Tc=new Es((a=>op(a)),sa),this.Pc=new Map,this.Ic=new Set,this.Rc=new Ae(Y.comparator),this.Ac=new Map,this.Vc=new yc,this.dc={},this.fc=new Map,this.mc=Vn.bs(),this.onlineState="Unknown",this.gc=void 0}get isPrimaryClient(){return this.gc===!0}}async function sI(n,e,t=!0){const s=Rp(n);let r;const i=s.Tc.get(e);return i?(s.sharedClientState.addLocalQueryTarget(i.targetId),r=i.view.lc()):r=await Tp(s,e,t,!0),r}async function rI(n,e){const t=Rp(n);await Tp(t,e,!0,!1)}async function Tp(n,e,t,s){const r=await Nw(n.localStore,Ge(e)?e:Ht(e)),i=r.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let a;return s&&(a=await iI(n,e,i,o==="current",r.resumeToken)),n.isPrimaryClient&&t&&fp(n.remoteStore,r),a}async function iI(n,e,t,s,r){n.yc=(f,p,g)=>(async function(R,M,O,H){let Z=M.view.Xu(O);Z.Oo&&(Z=await Ch(R.localStore,M.query,!1).then((({documents:w})=>M.view.Xu(w,Z))));const ae=H&&H.targetChanges.get(M.targetId),oe=H&&H.targetMismatches.get(M.targetId)!=null,se=M.view.applyChanges(Z,R.isPrimaryClient,ae,oe);return wh(R,M.targetId,se.ac),se.snapshot})(n,f,p,g);const i=await Ch(n.localStore,e,!0),o=new Zw(e,i.Wo),a=o.Xu(i.documents),c=Ci.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",r),u=o.applyChanges(a,n.isPrimaryClient,c);wh(n,t,u.ac);const h=new eI(e,t,o);return n.Tc.set(e,h),n.Pc.has(t)?n.Pc.get(t).push(e):n.Pc.set(t,[e]),u.snapshot}async function oI(n,e,t){const s=ie(n),r=s.Tc.get(e),i=s.Pc.get(r.targetId);if(i.length>1)return s.Pc.set(r.targetId,i.filter((o=>!sa(o,e)))),void s.Tc.delete(e);s.isPrimaryClient?(s.sharedClientState.removeLocalQueryTarget(r.targetId),s.sharedClientState.isActiveQueryTarget(r.targetId)||await Il(s.localStore,r.targetId,!1).then((()=>{s.sharedClientState.clearQueryState(r.targetId),t&&Dc(s.remoteStore,r.targetId),Al(s,r.targetId)})).catch(Ys)):(Al(s,r.targetId),await Il(s.localStore,r.targetId,!0))}async function aI(n,e){const t=ie(n),s=t.Tc.get(e),r=t.Pc.get(s.targetId);t.isPrimaryClient&&r.length===1&&(t.sharedClientState.removeLocalQueryTarget(s.targetId),Dc(t.remoteStore,s.targetId))}async function lI(n,e,t){const s=pI(n);try{const r=await(function(o,a){const c=ie(o),u=ge.now(),h=a.reduce(((g,D)=>g.add(D.key)),ce());let f,p;return c.persistence.runTransaction("Locally write mutations","readwrite",(g=>{let D=ut(),R=ce();return c.ko.getEntries(g,h).next((M=>{D=M,D.forEach(((O,H)=>{H.isValidDocument()||(R=R.add(O))}))})).next((()=>c.localDocuments.getOverlayedDocuments(g,D))).next((M=>{f=M;const O=[];for(const H of a){const Z=e_(H,f.get(H.key).overlayedDocument);Z!=null&&O.push(new qn(H.key,Z,ef(Z.value.mapValue),_t.exists(!0)))}return c.mutationQueue.addMutationBatch(g,u,O,a)})).next((M=>{p=M;const O=M.applyToLocalDocumentSet(f,R);return c.documentOverlayCache.saveOverlays(g,M.batchId,O)}))})).then((()=>({batchId:p.batchId,changes:Ef(f)})))})(s.localStore,e);s.sharedClientState.addPendingMutation(r.batchId),(function(o,a,c){let u=o.dc[o.currentUser.toKey()];u||(u=new Ae(ue)),u=u.insert(a,c),o.dc[o.currentUser.toKey()]=u})(s,r.batchId,t),await vi(s,r.changes),await oa(s.remoteStore)}catch(r){const i=Ac(r,"Failed to persist write");t.reject(i)}}async function bp(n,e){const t=ie(n);try{const s=await Pw(t.localStore,e);e.targetChanges.forEach(((r,i)=>{const o=t.Ac.get(i);o&&(W(r.addedDocuments.size+r.modifiedDocuments.size+r.removedDocuments.size<=1,22616),r.addedDocuments.size>0?o.Ec=!0:r.modifiedDocuments.size>0?W(o.Ec,14607):r.removedDocuments.size>0&&(W(o.Ec,42227),o.Ec=!1))})),await vi(t,s,e)}catch(s){await Ys(s)}}function Dh(n,e,t){const s=ie(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const r=[];s.Tc.forEach(((i,o)=>{const a=o.view.xu(e);a.snapshot&&r.push(a.snapshot)})),(function(o,a){const c=ie(o);c.onlineState=a;let u=!1;c.queries.forEach(((h,f)=>{for(const p of f.bu)p.xu(a)&&(u=!0)})),u&&Sc(c)})(s.eventManager,e),r.length&&s.hc.Tn(r),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function cI(n,e,t){const s=ie(n);s.sharedClientState.updateQueryState(e,"rejected",t);const r=s.Ac.get(e),i=r&&r.key;if(i){let o=new Ae(Y.comparator);o=o.insert(i,Xe.newNoDocument(i,re.min()));const a=ce().add(i),c=new gi(re.min(),new Map,new Ae(ue),o,ut(),a);await bp(s,c),s.Rc=s.Rc.remove(i),s.Ac.delete(e),Rc(s)}else await Il(s.localStore,e,!1).then((()=>Al(s,e,t))).catch(Ys)}async function uI(n,e){const t=ie(n),s=e.batch.batchId;try{const r=await Sw(t.localStore,e);Sp(t,s,null),Ap(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await vi(t,r)}catch(r){await Ys(r)}}async function BI(n,e,t){const s=ie(n);try{const r=await(function(o,a){const c=ie(o);return c.persistence.runTransaction("Reject batch","readwrite-primary",(u=>{let h;return c.mutationQueue.lookupMutationBatch(u,a).next((f=>(W(f!==null,37113),h=f.keys(),c.mutationQueue.removeMutationBatch(u,f)))).next((()=>c.mutationQueue.performConsistencyCheck(u))).next((()=>c.documentOverlayCache.removeOverlaysForBatchId(u,h,a))).next((()=>c.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(u,h))).next((()=>c.localDocuments.getDocuments(u,h)))}))})(s.localStore,e);Sp(s,e,t),Ap(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await vi(s,r)}catch(r){await Ys(r)}}function Ap(n,e){(n.fc.get(e)||[]).forEach((t=>{t.resolve()})),n.fc.delete(e)}function Sp(n,e,t){const s=ie(n);let r=s.dc[s.currentUser.toKey()];if(r){const i=r.get(e);i&&(t?i.reject(t):i.resolve(),r=r.remove(e)),s.dc[s.currentUser.toKey()]=r}}function Al(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.Pc.get(e))n.Tc.delete(s),t&&n.hc.wc(s,t);n.Pc.delete(e),n.isPrimaryClient&&n.Vc.e_(e).forEach((s=>{n.Vc.containsKey(s)||Pp(n,s)}))}function Pp(n,e){n.Ic.delete(e.path.canonicalString());const t=n.Rc.get(e);t!==null&&(Dc(n.remoteStore,t),n.Rc=n.Rc.remove(e),n.Ac.delete(t),Rc(n))}function wh(n,e,t){for(const s of t)s instanceof wp?(n.Vc.addReference(s.key,e),hI(n,s)):s instanceof Ip?(K(Pc,"Document no longer in limbo: "+s.key),n.Vc.removeReference(s.key,e),n.Vc.containsKey(s.key)||Pp(n,s.key)):ee(19791,{bc:s})}function hI(n,e){const t=e.key,s=t.path.canonicalString();n.Rc.get(t)||n.Ic.has(s)||(K(Pc,"New document in limbo: "+t),n.Ic.add(s),Rc(n))}function Rc(n){for(;n.Ic.size>0&&n.Rc.size<n.maxConcurrentLimboResolutions;){const e=n.Ic.values().next().value;n.Ic.delete(e);const t=new Y(me.fromString(e)),s=n.mc.next();n.Ac.set(s,new tI(t)),n.Rc=n.Rc.insert(t,s),fp(n.remoteStore,new Zt(Ht(jo(t.path)),s,"TargetPurposeLimboResolution",Qo.wn))}}async function vi(n,e,t){const s=ie(n),r=[],i=[],o=[];s.Tc.isEmpty()||(s.Tc.forEach(((a,c)=>{o.push(s.yc(c,e,t).then((u=>{var h;if((u||t)&&s.isPrimaryClient){const f=u?!u.fromCache:(h=t==null?void 0:t.targetChanges.get(c.targetId))==null?void 0:h.current;s.sharedClientState.updateQueryState(c.targetId,f?"current":"not-current")}if(u){r.push(u);const f=_c.mo(c.targetId,u);i.push(f)}})))})),await Promise.all(o),s.hc.Tn(r),await(async function(c,u){const h=ie(c);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",(f=>V.forEach(u,(p=>V.forEach(p.Vo,(g=>h.persistence.referenceDelegate.addReference(f,p.targetId,g))).next((()=>V.forEach(p.fo,(g=>h.persistence.referenceDelegate.removeReference(f,p.targetId,g)))))))))}catch(f){if(!Xs(f))throw f;K(vc,"Failed to update sequence numbers: "+f)}for(const f of u){const p=f.targetId;if(!f.fromCache){const g=h.Lo.get(p),D=g.snapshotVersion,R=g.withLastLimboFreeSnapshotVersion(D);h.Lo=h.Lo.insert(p,R)}}})(s.localStore,i))}async function dI(n,e){const t=ie(n);if(!t.currentUser.isEqual(e)){K(Pc,"User change. New user:",e.toKey());const s=await hp(t.localStore,e);t.currentUser=e,(function(i,o){i.fc.forEach((a=>{a.forEach((c=>{c.reject(new j(F.CANCELLED,o))}))})),i.fc.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await vi(t,s.$o)}}function fI(n,e){const t=ie(n),s=t.Ac.get(e);if(s&&s.Ec)return ce().add(s.key);{let r=ce();const i=t.Pc.get(e);if(!i)return r;for(const o of i??[]){const a=t.Tc.get(o);r=r.unionWith(a.view.Zu)}return r}}function Rp(n){const e=ie(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=bp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=fI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=cI.bind(null,e),e.hc.Tn=Yw.bind(null,e.eventManager),e.hc.wc=Xw.bind(null,e.eventManager),e}function pI(n){const e=ie(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=BI.bind(null,e),e}class Oo{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=zo(e.databaseInfo.databaseId),this.sharedClientState=this.vc(e),this.persistence=this.Dc(e),await this.persistence.start(),this.localStore=this.xc(e),this.gcScheduler=this.Cc(e,this.localStore),this.indexBackfillerScheduler=this.Fc(e,this.localStore)}Cc(e,t){return null}Fc(e,t){return null}xc(e){return Aw(this.persistence,new Iw,e.initialUser,this.serializer)}Dc(e){return new Bp(Ec.b_,this.serializer)}vc(e){return new zw}async terminate(){var e,t;(e=this.gcScheduler)==null||e.stop(),(t=this.indexBackfillerScheduler)==null||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Oo.provider={build:()=>new Oo};class mI extends Oo{constructor(e){super(),this.cacheSizeBytes=e}Cc(e,t){W(this.persistence.referenceDelegate instanceof Po,46915);const s=this.persistence.referenceDelegate.garbageCollector;return new gv(s,e.asyncQueue,t)}Dc(e){const t=this.cacheSizeBytes!==void 0?lt.withCacheSize(this.cacheSizeBytes):lt.DEFAULT;return new Bp((s=>Po.b_(s,t)),this.serializer)}}class Sl{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>Dh(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=dI.bind(null,this.syncEngine),await Kw(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Qw})()}createDatastore(e){const t=zo(e.databaseInfo.databaseId),s=rv(e.databaseInfo);return cv(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return(function(s,r,i,o,a){return new xw(s,r,i,o,a)})(this.localStore,this.datastore,e.asyncQueue,(t=>Dh(this.syncEngine,t,0)),(function(){return ah.Ye()?new ah:new ev})())}createSyncEngine(e,t){return(function(r,i,o,a,c,u,h){const f=new nI(r,i,o,a,c,u);return h&&(f.gc=!0),f})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await(async function(r){const i=ie(r);K(Jt,"RemoteStore shutting down."),i.la.add(5),await _i(i),i.ha.shutdown(),i.Ta.set("Unknown")})(this.remoteStore),(e=this.datastore)==null||e.terminate(),(t=this.eventManager)==null||t.terminate()}}Sl.provider={build:()=>new Sl};/**
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
 */const Hn="FirestoreClient";class gI{constructor(e,t,s,r,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this._databaseInfo=r,this.user=Ye.UNAUTHENTICATED,this.clientId=jl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(s,(async o=>{K(Hn,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(s,(o=>(K(Hn,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this._databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new An;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=Ac(t,"Failed to shutdown persistence");e.reject(s)}})),e.promise}}async function Qa(n,e){n.asyncQueue.verifyOperationInProgress(),K(Hn,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener((async r=>{s.isEqual(r)||(await hp(e.localStore,r),s=r)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Ih(n,e){n.asyncQueue.verifyOperationInProgress();const t=await CI(n);K(Hn,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((s=>yh(e.remoteStore,s))),n.setAppCheckTokenChangeListener(((s,r)=>yh(e.remoteStore,r))),n._onlineComponents=e}async function CI(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){K(Hn,"Using user provided OfflineComponentProvider");try{await Qa(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(r){return r.name==="FirebaseError"?r.code===F.FAILED_PRECONDITION||r.code===F.UNIMPLEMENTED:!(typeof DOMException<"u"&&r instanceof DOMException)||r.code===22||r.code===20||r.code===11})(t))throw t;Ot("Error using user provided cache. Falling back to memory cache: "+t),await Qa(n,new Oo)}}else K(Hn,"Using default OfflineComponentProvider"),await Qa(n,new mI(void 0));return n._offlineComponents}async function Op(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(K(Hn,"Using user provided OnlineComponentProvider"),await Ih(n,n._uninitializedComponentsProvider._online)):(K(Hn,"Using default OnlineComponentProvider"),await Ih(n,new Sl))),n._onlineComponents}function yI(n){return Op(n).then((e=>e.syncEngine))}async function Pl(n){const e=await Op(n),t=e.eventManager;return t.onListen=sI.bind(null,e.syncEngine),t.onUnlisten=oI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=rI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=aI.bind(null,e.syncEngine),t}function EI(n,e,t,s){const r=new Ep(s),i=new Dp(e,r,t);return n.asyncQueue.enqueueAndForget((async()=>_p(await Pl(n),i))),()=>{r.Va(),n.asyncQueue.enqueueAndForget((async()=>vp(await Pl(n),i)))}}function _I(n,e,t={}){const s=new An;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,a,c,u){const h=new Ep({next:p=>{h.Va(),o.enqueueAndForget((()=>vp(i,f)));const g=p.docs.has(a);!g&&p.fromCache?u.reject(new j(F.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&p.fromCache&&c&&c.source==="server"?u.reject(new j(F.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):u.resolve(p)},error:p=>u.reject(p)}),f=new Dp(jo(a.path),h,{includeMetadataChanges:!0,waitForSyncWhenOnline:!0});return _p(i,f)})(await Pl(n),n.asyncQueue,e,t,s))),s.promise}function vI(n,e){const t=new An;return n.asyncQueue.enqueueAndForget((async()=>lI(await yI(n),e,t))),t.promise}/**
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
 */let Np=class{constructor(e,t,s,r,i){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=r,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Re(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new DI(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}_fieldsProto(){var e;return((e=this._document)==null?void 0:e.data.clone().value.mapValue.fields)??void 0}get(e){if(this._document){const t=this._document.data.field(ms("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}},DI=class extends Np{data(){return super.data()}};/**
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
 */class wI{convertValue(e,t="none"){switch(Ue(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Se(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Nn(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw ee(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return $n(e,((r,i)=>{s[r]=this.convertValue(i,t)})),s}convertVectorValue(e){var s,r,i;const t=(i=(r=(s=e.fields)==null?void 0:s[Jr].arrayValue)==null?void 0:r.values)==null?void 0:i.map((o=>Se(o.doubleValue)));return new Bt(t)}convertGeoPoint(e){return new $t(Se(e.latitude),Se(e.longitude))}convertArray(e,t){return(e.values||[]).map((s=>this.convertValue(s,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const s=fi(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp($s(e));default:return null}}convertTimestamp(e){const t=On(e);return new ge(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=me.fromString(e);W(Pf(s),9688,{name:e});const r=new $r(s.get(1),s.get(3)),i=new Y(s.popFirst(5));return r.isEqual(t)||sn(`A document reference to ${i} refers to a different database (${r.projectId}/${r.database}), which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
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
 */function kp(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}/**
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
 */const Th="AsyncQueue";class bh{constructor(e=Promise.resolve()){this.$c=[],this.Kc=!1,this.Qc=[],this.Wc=null,this.Gc=!1,this.zc=!1,this.jc=[],this.Ht=new Lf(this,"async_queue_retry"),this.Hc=()=>{const s=Wa();s&&K(Th,"Visibility state changed to "+s.visibilityState),this.Ht.$t()},this.Jc=e;const t=Wa();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Hc)}get isShuttingDown(){return this.Kc}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.Yc(),this.Zc(e)}enterRestrictedMode(e){if(!this.Kc){this.Kc=!0,this.zc=e||!1;const t=Wa();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Hc)}}enqueue(e){if(this.Yc(),this.Kc)return new Promise((()=>{}));const t=new An;return this.Zc((()=>this.Kc&&this.zc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.$c.push(e),this.Xc())))}async Xc(){if(this.$c.length!==0){try{await this.$c[0](),this.$c.shift(),this.Ht.reset()}catch(e){if(!Xs(e))throw e;K(Th,"Operation failed with retryable error: "+e)}this.$c.length>0&&this.Ht.kt((()=>this.Xc()))}}Zc(e){const t=this.Jc.then((()=>(this.Gc=!0,e().catch((s=>{throw this.Wc=s,this.Gc=!1,sn("INTERNAL UNHANDLED ERROR: ",Ah(s)),s})).then((s=>(this.Gc=!1,s))))));return this.Jc=t,t}enqueueAfterDelay(e,t,s){this.Yc(),this.jc.indexOf(e)>-1&&(t=0);const r=bc.createAndSchedule(this,e,t,s,(i=>this.el(i)));return this.Qc.push(r),r}Yc(){this.Wc&&ee(47125,{tl:Ah(this.Wc)})}verifyOperationInProgress(){}async nl(){let e;do e=this.Jc,await e;while(e!==this.Jc)}rl(e){for(const t of this.Qc)if(t.timerId===e)return!0;return!1}il(e){return this.nl().then((()=>{this.Qc.sort(((t,s)=>t.targetTimeMs-s.targetTimeMs));for(const t of this.Qc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.nl()}))}sl(e){this.jc.push(e)}el(e){const t=this.Qc.indexOf(e);this.Qc.splice(t,1)}}function Ah(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class gs extends Yo{constructor(e,t,s,r){super(e,t,s,r),this.type="firestore",this._queue=new bh,this._persistenceKey=(r==null?void 0:r.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new bh(e),this._firestoreClient=void 0,await e}}}function II(n,e){const t=typeof n=="object"?n:Qh(),s=typeof n=="string"?n:e||yo,r=Nl(t,"firestore").getImmediate({identifier:s});if(!r._initialized){const i=Dm("firestore");i&&Ev(r,...i)}return r}function aa(n){if(n._terminated)throw new j(F.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||TI(n),n._firestoreClient}function TI(n){var s,r,i,o;const e=n._freezeSettings(),t=Bv(n._databaseId,((s=n._app)==null?void 0:s.options.appId)||"",n._persistenceKey,(r=n._app)==null?void 0:r.options.apiKey,e);n._componentsProvider||(i=e.localCache)!=null&&i._offlineComponentProvider&&((o=e.localCache)!=null&&o._onlineComponentProvider)&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new gI(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}})(n._componentsProvider))}/**
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
 */class Lp extends wI{constructor(e){super(),this.firestore=e}convertBytes(e){return new bt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Re(this.firestore,null,t)}}class Sr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class us extends Np{constructor(e,t,s,r,i,o){super(e,t,s,r,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new lo(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(ms("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new j(F.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=us._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}us._jsonSchemaVersion="firestore/documentSnapshot/1.0",us._jsonSchema={type:xe("string",us._jsonSchemaVersion),bundleSource:xe("string","DocumentSnapshot"),bundleName:xe("string"),bundle:xe("string")};class lo extends us{data(e={}){return super.data(e)}}class Ms{constructor(e,t,s,r){this._firestore=e,this._userDataWriter=t,this._snapshot=r,this.metadata=new Sr(r.hasPendingWrites,r.fromCache),this.query=s}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((s=>{e.call(t,new lo(this._firestore,this._userDataWriter,s.key,s,new Sr(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new j(F.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(r,i){if(r._snapshot.oldDocs.isEmpty()){let o=0;return r._snapshot.docChanges.map((a=>{Ge(r._snapshot.query)?wl(r._snapshot.query):Yl(r.query._query);const c=new lo(r._firestore,r._userDataWriter,a.doc.key,a.doc,new Sr(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);return a.doc,{type:"added",doc:c,oldIndex:-1,newIndex:o++}}))}{let o=r._snapshot.oldDocs;return r._snapshot.docChanges.filter((a=>i||a.type!==3)).map((a=>{const c=new lo(r._firestore,r._userDataWriter,a.doc.key,a.doc,new Sr(r._snapshot.mutatedKeys.has(a.doc.key),r._snapshot.fromCache),r.query.converter);let u=-1,h=-1;return a.type!==0&&(u=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:bI(a.type),doc:c,oldIndex:u,newIndex:h}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new j(F.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Ms._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=jl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],s=[],r=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),s.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),r.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function bI(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return ee(61501,{type:n})}}/**
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
 */Ms._jsonSchemaVersion="firestore/querySnapshot/1.0",Ms._jsonSchema={type:xe("string",Ms._jsonSchemaVersion),bundleSource:xe("string","QuerySnapshot"),bundleName:xe("string"),bundle:xe("string")};/**
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
 */function AI(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new j(F.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Oc{}class SI extends Oc{}function PI(n,e,...t){let s=[];e instanceof Oc&&s.push(e),s=s.concat(t),(function(i){const o=i.filter((c=>c instanceof Nc)).length,a=i.filter((c=>c instanceof la)).length;if(o>1||o>0&&a>0)throw new j(F.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(s);for(const r of s)n=r._apply(n);return n}class la extends SI{constructor(e,t,s){super(),this._field=e,this._op=t,this._value=s,this.type="where"}static _create(e,t,s){return new la(e,t,s)}_apply(e){const t=this._parse(e);return xp(e._query,t),new Zs(e.firestore,e.converter,gl(e._query,t))}_parse(e){const t=sc(e.firestore);return(function(i,o,a,c,u,h,f){let p;if(u.isKeyField()){if(h==="array-contains"||h==="array-contains-any")throw new j(F.INVALID_ARGUMENT,`Invalid Query. You can't perform '${h}' queries on documentId().`);if(h==="in"||h==="not-in"){Ph(f,h);const D=[];for(const R of f)D.push(Sh(c,i,R));p={arrayValue:{values:D}}}else p=Sh(c,i,f)}else h!=="in"&&h!=="not-in"&&h!=="array-contains-any"||Ph(f,h),p=Tv(a,o,f,h==="in"||h==="not-in");return Le.create(u,h,p)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function RI(n,e,t){const s=e,r=ms("where",n);return la._create(r,s,t)}class Nc extends Oc{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Nc(e,t)}_parse(e){const t=this._queryConstraints.map((s=>s._parse(e))).filter((s=>s.getFilters().length>0));return t.length===1?t[0]:Nt.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(r,i){let o=r;const a=i.getFlattenedFilters();for(const c of a)xp(o,c),o=gl(o,c)})(e._query,t),new Zs(e.firestore,e.converter,gl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Sh(n,e,t){if(typeof(t=Me(t))=="string"){if(t==="")throw new j(F.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!gf(e)&&t.indexOf("/")!==-1)throw new j(F.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const s=e.path.child(me.fromString(t));if(!Y.isDocumentKey(s))throw new j(F.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${s}' is not because it has an odd number of segments (${s.length}).`);return JB(n,new Y(s))}if(t instanceof Re)return JB(n,t._key);throw new j(F.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Vo(t)}.`)}function Ph(n,e){if(!Array.isArray(n)||n.length===0)throw new j(F.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function xp(n,e){const t=(function(r,i){for(const o of r)for(const a of o.getFlattenedFilters())if(i.indexOf(a.op)>=0)return a.op;return null})(n.filters,(function(r){switch(r){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new j(F.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new j(F.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}/**
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
 */function Rh(n){return(function(t,s){if(typeof t!="object"||t===null)return!1;const r=t;for(const i of s)if(i in r&&typeof r[i]=="function")return!0;return!1})(n,["next","error","complete"])}/**
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
 */class OI{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=sc(e)}set(e,t,s){this._verifyNotCommitted();const r=Ya(e,this._firestore),i=kp(r.converter,t,s),o=Hf(this._dataReader,"WriteBatch.set",r._key,i,r.converter!==null,s);return this._mutations.push(o.toMutation(r._key,_t.none())),this}update(e,t,s,...r){this._verifyNotCommitted();const i=Ya(e,this._firestore);let o;return o=typeof(t=Me(t))=="string"||t instanceof Wo?Iv(this._dataReader,"WriteBatch.update",i._key,t,s,r):wv(this._dataReader,"WriteBatch.update",i._key,t),this._mutations.push(o.toMutation(i._key,_t.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=Ya(e,this._firestore);return this._mutations=this._mutations.concat(new Jo(t._key,_t.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new j(F.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Ya(n,e){if((n=Me(n)).firestore!==e)throw new j(F.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}function NI(n){n=Ut(n,Re);const e=Ut(n.firestore,gs),t=aa(e);return _I(t,n._key,{source:"server"}).then((s=>Fp(e,n,s)))}function kI(n,e,t){n=Ut(n,Re);const s=Ut(n.firestore,gs),r=kp(n.converter,e,t),i=sc(s);return kc(s,[Hf(i,"setDoc",n._key,r,n.converter!==null,t).toMutation(n._key,_t.none())])}function Oh(n){return kc(Ut(n.firestore,gs),[new Jo(n._key,_t.none())])}function bs(n,...e){var u,h,f;n=Me(n);let t={includeMetadataChanges:!1,source:"default"},s=0;typeof e[s]!="object"||Rh(e[s])||(t=e[s++]);const r={includeMetadataChanges:t.includeMetadataChanges,source:t.source};if(Rh(e[s])){const p=e[s];e[s]=(u=p.next)==null?void 0:u.bind(p),e[s+1]=(h=p.error)==null?void 0:h.bind(p),e[s+2]=(f=p.complete)==null?void 0:f.bind(p)}let i,o,a;if(n instanceof Re)o=Ut(n.firestore,gs),a=jo(n._key.path),i={next:p=>{e[s]&&e[s](Fp(o,n,p))},error:e[s+1],complete:e[s+2]};else{const p=Ut(n,Zs);o=Ut(p.firestore,gs),a=p._query;const g=new Lp(o);i={next:D=>{e[s]&&e[s](new Ms(o,g,p,D))},error:e[s+1],complete:e[s+2]},AI(n._query)}const c=aa(o);return EI(c,a,r,i)}function kc(n,e){const t=aa(n);return vI(t,e)}function Fp(n,e,t){const s=t.docs.get(e._key),r=new Lp(n);return new us(n,r,e._key,s,new Sr(t.hasPendingWrites,t.fromCache),e.converter)}function Xa(n){return n=Ut(n,gs),aa(n),new OI(n,(e=>kc(n,e)))}const Nh="@firebase/firestore",kh="4.17.2";(function(e,t=!0){LE(zs),Vs(new hs("firestore",((s,{instanceIdentifier:r,options:i})=>{const o=s.getProvider("app").getImmediate(),a=new gs(new Q_(s.getProvider("auth-internal")),new Z_(o,s.getProvider("app-check-internal")),qE(o,r),o);return i={useFetchStreams:t,...i},a._setSettings(i),a}),"PUBLIC").setMultipleInstances(!0)),In(Nh,kh,e),In(Nh,kh,"esm2020")})();const LI="gen-lang-client-0728333167",xI="1:1090854519373:web:6c8d4f1bdcea3da034d204",FI="AIzaSyDpgrVyfqOxC5IhkdQ5YCqIXtGMPHHNsvc",MI="gen-lang-client-0728333167.firebaseapp.com",VI="ai-studio-yummysweets-1927dd13-1bc4-468e-92aa-cd849586f50a",UI="gen-lang-client-0728333167.firebasestorage.app",HI="1090854519373",GI="",$I="1090854519373-87pv7p4hqfl4895ft0je2a0218eeku7s.apps.googleusercontent.com",qI="",Lh={projectId:LI,appId:xI,apiKey:FI,authDomain:MI,firestoreDatabaseId:VI,storageBucket:UI,messagingSenderId:HI,measurementId:GI,oAuthClientId:$I,recaptchaSiteKey:qI};let Te,be;const Dt={CREATE:"create",UPDATE:"update",DELETE:"delete",LIST:"list",GET:"get",WRITE:"write"};function wt(n,e,t){var r,i,o,a;const s={error:n instanceof Error?n.message:String(n),authInfo:{userId:(r=be==null?void 0:be.currentUser)==null?void 0:r.uid,email:(i=be==null?void 0:be.currentUser)==null?void 0:i.email,emailVerified:(o=be==null?void 0:be.currentUser)==null?void 0:o.emailVerified,isAnonymous:(a=be==null?void 0:be.currentUser)==null?void 0:a.isAnonymous},operationType:e,path:t};throw console.error("Firestore Error: ",JSON.stringify(s)),new Error(JSON.stringify(s))}try{const n=Wh(Lh);Te=II(n,Lh.firestoreDatabaseId),be=oE(n),(async()=>{try{await NI(Kt(Te,"test","connection"))}catch(e){e instanceof Error&&e.message.includes("the client is offline")&&console.error("Please check your Firebase configuration.")}})()}catch(n){console.error("Firebase init failed",n)}const xh="15551234567",JI=1310,ve={CONFIG:"sc_config_v2",USERS:"sc_users_v2",SESSION:"sc_session_v2",PRODUCTS:"sc_products_v2",PREF:"sc_pref_v2",ORDERS:"sc_orders_v2",CUSTOMER_NOTES:"sc_customer_notes_v2"},Fh=[{value:"Vazirmatn",label:"Vazirmatn (modern, clean)"},{value:"Cairo",label:"Cairo (friendly, round)"},{value:"IBM Plex Sans Arabic",label:"IBM Plex Sans Arabic (corporate)"},{value:"Noto Naskh Arabic",label:"Noto Naskh Arabic (calligraphic)"},{value:"Noto Kufi Arabic",label:"Noto Kufi Arabic (geometric)"},{value:"Noto Sans Arabic",label:"Noto Sans Arabic (neutral)"},{value:"Amiri",label:"Amiri (calligraphic, premium)"},{value:"Tajawal",label:"Tajawal (modern, legible)"},{value:"Almarai",label:"Almarai (clean, contemporary)"},{value:"Rubik",label:"Rubik (multilingual, rounded)"}],Mh=[{value:"DM Sans",label:"DM Sans (geometric, clean modern)"},{value:"Cormorant Garamond",label:"Cormorant Garamond (artisanal luxury serif)"},{value:"Playfair Display",label:"Playfair Display (editorial serif)"},{value:"DM Serif Display",label:"DM Serif Display (warm display serif)"},{value:"Lora",label:"Lora (classic contemporary)"},{value:"Inter",label:"Inter (clean neutral)"},{value:"Outfit",label:"Outfit (boutique sans)"}],ts={primaryCurrency:"USD",secondaryCurrency:"IQD",showSecondary:!0,currencySymbol:"د.ع",exchangeRate:1310,roundingRule:250,autoRefreshRate:!1,deliveryFee:8,freeDeliveryOver:60,minimumOrder:0,pickupOnly:!1,taxEnabled:!1,taxRate:0,taxLabel:"VAT",taxIncluded:!0,promoCode:"",promoType:"percent",promoValue:0,promoExpiry:"",lastUpdatedRate:null},qe={berry:{label:{en:"Berry",ku:"بێری"},tokens:{cream:"#FFFBF7",shell:"#FDF3EC",blush:"#F6DFD8",linen:"#FAF1EA",berry:"#8E3B4A",berryDark:"#6E2C39",berryDeep:"#4E1E28",cocoa:"#3B2A26",cocoaSoft:"#5A423C",gold:"#C9A227",goldSoft:"#E8C766",ink:"#2E2422",muted:"#7C6A66",line:"#EFE1D9",lineStrong:"#E4D0C5"}},chocolate:{label:{en:"Chocolate",ku:"چاکۆلێت"},tokens:{cream:"#FFF9F2",shell:"#FBF0E2",blush:"#F2DFC7",linen:"#FDF5EA",berry:"#C89B6A",berryDark:"#A87A48",berryDeep:"#7A5230",cocoa:"#2A1710",cocoaSoft:"#4A2F22",gold:"#D4A24A",goldSoft:"#F0D196",ink:"#241410",muted:"#7A5C4A",line:"#EEDCC4",lineStrong:"#DEC5A4"}},sage:{label:{en:"Sage",ku:"سەیج"},tokens:{cream:"#FAF7F0",shell:"#F2EBDF",blush:"#E3E9DC",linen:"#F6F2E9",berry:"#8FA88A",berryDark:"#6E8A69",berryDeep:"#4E6649",cocoa:"#3E4F3A",cocoaSoft:"#5C6E58",gold:"#B5614D",goldSoft:"#D68A70",ink:"#2A3327",muted:"#6E7868",line:"#E2DCCC",lineStrong:"#CFC7B2"}},rose:{label:{en:"Rose",ku:"گۆڵ"},tokens:{cream:"#FFFBF8",shell:"#FBEFF0",blush:"#F5DCE0",linen:"#FDF3F4",berry:"#C97B84",berryDark:"#A85C67",berryDeep:"#7E3F4A",cocoa:"#5E2A3A",cocoaSoft:"#7C4756",gold:"#D4AF6A",goldSoft:"#EBCB91",ink:"#3A1F27",muted:"#8A6470",line:"#EFDCDE",lineStrong:"#DFC3C6"}},midnight:{label:{en:"Midnight Noir",ku:"نیوەشەو"},isDark:!0,tokens:{cream:"#15110E",shell:"#1E1814",blush:"#342820",linen:"#221B16",surface:"#241D18",surfaceHover:"#2D241E",surfaceInput:"#1B1512",berry:"#E07A5F",berryDark:"#C66247",berryDeep:"#F4A58E",cocoa:"#F7EFE8",cocoaSoft:"#D6C6B8",gold:"#E5B85C",goldSoft:"#F3D48E",ink:"#EDE3DA",muted:"#A89687",line:"#3A2E26",lineStrong:"#4F3F34"}}},pn={shopName:{en:"Yummy Sweets",ku:"یامی سویتس"},theme:{presetId:"berry",tokens:qe.berry.tokens,mode:"light",autoDark:!1},tagline:{en:"Artisanal Boutique Bakery",ku:"شیرینەمەنی دەستکردی نایاب"},englishBodyFont:"DM Sans",englishDisplayFont:"Cormorant Garamond",kurdishBodyFont:"Vazirmatn",kurdishDisplayFont:"Vazirmatn",logoMode:"emoji",logoEmoji:"🎂",logoImage:"",logoUrl:"",logoImageUrl:"",announcement:{en:"Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over $50.",ku:"پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو $50."},aboutUs:{en:"Yummy Sweets began as a dream in our home kitchen: to restore pure artisan craftsmanship to celebration cakes. We believe true indulgence comes from authentic, unadulterated ingredients. Every sponge is whipped by hand, every fruit compote simmered from scratch, and every ganache blended from fine single-origin cocoa.",ku:"یامی سویتس وەک خەونێک لە چێشتخانەی ماڵەکەمانەوە دەستی پێکرد: گەڕاندنەوەی هونەری ڕەسەنی دەستکرد بۆ کێکەکانی ئاهەنگگێڕان. ئێمە باوەڕمان وایە کە چێژی ڕاستەقینە لە پێکهاتەی سروشتی و بێ ساختە دەست دەکەوێت. هەموو کێکێک بە دەست ئامادە دەکرێت و بە باشترین کەرەستە دەڕازێنرێتەوە."},reviews:[{initials:"SK",name:{en:"Sara & Kareem",ku:"سارا و کەریم"},role:{en:"Verified Customer",ku:"کڕیاری دڵنیاکراو"},quote:{en:'"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."',ku:'"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."'}},{initials:"DA",name:{en:"Danyar Azad",ku:"دانیار ئازاد"},role:{en:"Office Celebrations",ku:"ئاهەنگی فەرمانگە"},quote:{en:'"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."',ku:'"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."'}},{initials:"LR",name:{en:"Lina Rostam",ku:"لینا ڕۆستەم"},role:{en:"Weekend Regular",ku:"کڕیاری هەمیشەیی"},quote:{en:'"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."',ku:'"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."'}}],faq:[{q:{en:"How far in advance should I place my cake order?",ku:"چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟"},a:{en:"For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice.",ku:"بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە."}},{q:{en:"How does the WhatsApp checkout process work?",ku:"شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟"},a:{en:"When you tap 'Send Order via WhatsApp', your selected items are automatically drafted into a clean message. You can add your delivery address before sending.",ku:'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!'}},{q:{en:"Do you offer gluten-free or eggless options?",ku:"ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟"},a:{en:"Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify in your notes.",ku:"بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە."}}],contact:{whatsapp:"15551234567",phone:"+964 750 123 4567",email:"hello@yummysweets.com",address:{en:"Dream City Avenue, Near English Village, Erbil, Kurdistan",ku:"شەقامی دریم سیتی، نزیک گوندی ئینگلیزی، هەولێر، کوردستان"},hours:{en:`Mon – Sun: 9:00 AM – 10:00 PM
Fresh bakes ready by 10 AM daily`,ku:`دووشەممە – یەکشەممە: ٩:٠٠ بەیانی – ١٠:٠٠ شەو
شیرینی تازە کاتژمێر ١٠ی بەیانی ئامادەیە`}},socials:{instagram:"https://instagram.com",facebook:"https://facebook.com",tiktok:"https://tiktok.com",snapchat:"https://snapchat.com"},iqdRate:JI,economy:{...ts},showWatermark:!0};function jI(n){return new Promise((e,t)=>{if(!n)return t(new Error("NO_FILE"));if(!n.type||!n.type.startsWith("image/"))return t(new Error("INVALID_TYPE"));const s=5*1024*1024;if(n.size>s)return t(new Error("FILE_TOO_LARGE"));const r=new FileReader;r.onerror=()=>t(new Error("READ_ERROR")),r.onload=i=>{const o=new Image;o.onerror=()=>t(new Error("DECODE_ERROR")),o.onload=()=>{try{let c=o.naturalWidth||o.width,u=o.naturalHeight||o.height;if(c>800){const R=800/c;c=800,u=Math.round(u*R)}const h=document.createElement("canvas");h.width=c,h.height=u;const f=h.getContext("2d");if(!f)return t(new Error("CANVAS_ERROR"));f.drawImage(o,0,0,c,u);let p="";try{p=h.toDataURL("image/jpeg",.85)}catch{p=h.toDataURL("image/png")}const g=p.length-(p.indexOf(",")+1);let D=Math.round(g*.75);if(D>500*1024)try{const R=h.toDataURL("image/jpeg",.65),M=R.length-(R.indexOf(",")+1),O=Math.round(M*.75);p=R,D=O}catch{}if(D>800*1024)return t(new Error("OUTPUT_TOO_LARGE"));e(p)}catch(a){t(a)}},o.src=i.target.result},r.readAsDataURL(n)})}function KI(n){return new Promise((e,t)=>{if(!n)return t(new Error("NO_FILE"));const s=5*1024*1024;if(n.size>s)return t(new Error("FILE_TOO_LARGE"));if(n.type==="image/svg+xml"||n.name&&n.name.toLowerCase().endsWith(".svg")){if(n.size>100*1024)return t(new Error("OUTPUT_TOO_LARGE"));const i=new FileReader;i.onerror=()=>t(new Error("READ_ERROR")),i.onload=o=>{try{let a=String(o.target.result||"");const c=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,u=/\son\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi,h=/javascript\s*:[^"'>]+/gi;if(a=a.replace(c,""),a=a.replace(u,""),a=a.replace(h,""),!a.includes("<svg")||!a.includes("</svg>"))return t(new Error("INVALID_TYPE"));const f="data:image/svg+xml;utf8,"+encodeURIComponent(a),p=f.length-(f.indexOf(",")+1),g=Math.round(p*.75);e({dataUrl:f,approxBytes:g,isSvg:!0})}catch{t(new Error("SANITIZATION_FAILED"))}},i.readAsText(n);return}if(!n.type||!n.type.startsWith("image/"))return t(new Error("INVALID_TYPE"));const r=new FileReader;r.onerror=()=>t(new Error("READ_ERROR")),r.onload=i=>{const o=new Image;o.onerror=()=>t(new Error("DECODE_ERROR")),o.onload=()=>{try{const a=o.naturalWidth||o.width,c=o.naturalHeight||o.height;if(!a||!c)return t(new Error("INVALID_DIMENSIONS"));const u=256,h=a<c?u/a:u/c,f=Math.round(a*h),p=Math.round(c*h),g=Math.round((f-u)/2),D=Math.round((p-u)/2),R=document.createElement("canvas");R.width=u,R.height=u;const M=R.getContext("2d");if(!M)return t(new Error("CANVAS_ERROR"));M.drawImage(o,-g,-D,f,p);const O=n.type==="image/png"||n.type==="image/webp";let H="";O?H=R.toDataURL("image/png"):H=R.toDataURL("image/jpeg",.85);let Z=H.length-(H.indexOf(",")+1),ae=Math.round(Z*.75);if(ae>150*1024&&(H=R.toDataURL("image/jpeg",.8),Z=H.length-(H.indexOf(",")+1),ae=Math.round(Z*.75),ae>150*1024))return t(new Error("OUTPUT_TOO_LARGE"));e({dataUrl:H,approxBytes:ae,isSvg:!1})}catch(a){t(a)}},o.src=i.target.result},r.readAsDataURL(n)})}const Yi=[{id:"u_dev",username:"dev",password:"dev123",name:"Technical Operator",role:"dev"},{id:"u_admin",username:"admin",password:"admin123",name:"Head Baker Admin",role:"admin"},{id:"dmfw78AEPYW1htK7rgqptaFRqs03",username:"yumy.swets",email:"yumy.swets@gmail.com",password:"YummyAdmin2026!",name:"Yummy Sweets Admin",role:"admin"}],Za=[{id:"p1",category:"cakes",emoji:"🎂",img:"https://images.unsplash.com/photo-1562440499-64c9a111f713?w=800&auto=format&fit=crop&q=80",priceUSD:38,tag:"bestseller",name:{en:"Pistachio Rose Layer Cake",ku:"کێکی چین چینی فستق و گوڵاو"},desc:{en:"Delicate roasted pistachio sponge layered with fragrant Persian rosewater mascarpone and white chocolate.",ku:"کێکی ناسکی فستقی برژاو بە کرێمی گوڵاوی ئێرانی و شوکۆڵاتەی سپی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p2",category:"cakes",emoji:"🍫",img:"https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop&q=80",priceUSD:42,tag:"bestseller",name:{en:"Belgian Dark Truffle Cake",ku:"کێکی تڕەفڵی شوکۆڵاتەی بەلجیکی"},desc:{en:"Decadent 70% Callebaut dark chocolate layers drenched in whipped espresso ganache.",ku:"چەندین چینی شوکۆڵاتەی تۆخی بەلجیکی لەگەڵ گاناشی قاوەی ئێسپرێسۆ."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p3",category:"cakes",emoji:"🍓",img:"https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&auto=format&fit=crop&q=80",priceUSD:40,tag:"new",name:{en:"Berry Chantilly Chiffon",ku:"کێکی شیفۆنی تووتڕکی شانتیلی"},desc:{en:"Feather-light vanilla chiffon crowned with fresh wild strawberries, blackberries, and sweet cream.",ku:"کێکی زۆر سووکی ڤانێلا بە کرێمی تازە و تووی کێوی و فرەولەی سروشتی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p4",category:"cakes",emoji:"🥜",img:"https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?w=800&auto=format&fit=crop&q=80",priceUSD:36,tag:"none",name:{en:"Salted Caramel Pecan Cake",ku:"کێکی کارامێلی سوێر و گوێزی پێکەن"},desc:{en:"Brown butter sponge paired with toasted Georgia pecans and fleur de sel caramel drizzle.",ku:"کێکی کەرەی قاوەیی لەگەڵ گوێزی برژاو و سۆسی کارامێلی سوێری فەڕەنسی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p5",category:"cakes",emoji:"🍰",img:"https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=800&auto=format&fit=crop&q=80",priceUSD:35,tag:"none",name:{en:"Signature Red Velvet",ku:"ڕێد ڤێلڤێتی تایبەت"},desc:{en:"Classic crimson buttermilk sponge layered with rich Madagascar vanilla cream cheese.",ku:"کێکی سووری نەریتی لەگەڵ کرێم چیسی دەوڵەمەندی ڤانێلای ماداگاسکەر."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p6",category:"cakes",emoji:"🍋",img:"https://images.unsplash.com/photo-1534432182912-63863115e106?w=800&auto=format&fit=crop&q=80",priceUSD:34,tag:"none",name:{en:"Lemon Lavender Dream",ku:"کێکی لیمۆ و لاڤەندەر"},desc:{en:"Zesty Meyer lemon curd layered with organic Provence lavender-infused buttercream.",ku:"تامی ترش و شیری لیمۆی سروشتی بە کرێمی لاڤاندەری فەڕەنسی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}},{id:"p7",category:"cakes",emoji:"🌰",img:"https://images.unsplash.com/photo-1542826438-bd32f43d626f?w=800&auto=format&fit=crop&q=80",priceUSD:45,tag:"new",name:{en:"Hazelnut Praline Royal",ku:"کێکی ڕۆیاڵی بوندوق و پڕالین"},desc:{en:"Roasted Piedmont hazelnut dacquoise with crispy wafer crunch and silky Gianduja mousse.",ku:"کێکی داگوایزی بوندوق لەگەڵ ویفەری کڕەنچی و مووسی شوکۆڵاتە."},unit:{en:'8" Cake (12 slices)',ku:"کێکی ٨ ئینچ (١٢ پارچە)"}},{id:"p8",category:"cupcakes",emoji:"🧁",img:"https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&auto=format&fit=crop&q=80",priceUSD:18,tag:"bestseller",name:{en:"Tahitian Vanilla Cupcakes",ku:"کەپکێکی ڤانێلای تاهیتی"},desc:{en:"Moist golden sponge crowned with swirls of aromatic Tahitian vanilla bean buttercream.",ku:"کەپکێکی نەرم و بەتام بە کرێمی تایبەتی دەنکۆڵەی ڤانێلا."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p9",category:"cupcakes",emoji:"🍮",img:"https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=800&auto=format&fit=crop&q=80",priceUSD:20,tag:"new",name:{en:"Salted Dulce de Leche Cupcakes",ku:"کەپکێکی کارامێلی دۆلسێ دێ لێچێ"},desc:{en:"Cinnamon spiced cake with a molten caramelized milk center and toffee crunch.",ku:"کێکی دارچینی بە ناوەرۆکی کارامێلی گەرم و تۆفی کڕەنچی."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p10",category:"cupcakes",emoji:"🫐",img:"https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=800&auto=format&fit=crop&q=80",priceUSD:19,tag:"none",name:{en:"Wild Blueberry Zest Cupcakes",ku:"کەپکێکی بلوبێری و توێکڵی لیمۆ"},desc:{en:"Bursting with fresh blueberries and topped with a bright lemon meringue swirl.",ku:"پڕ لە بلوبێری تازە لەگەڵ سۆسی سەرنجڕاکێشی لیمۆ و مێرێنگ."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p11",category:"cupcakes",emoji:"🍫",img:"https://images.unsplash.com/photo-1603532648955-039310d9ed75?w=800&auto=format&fit=crop&q=80",priceUSD:20,tag:"none",name:{en:"Triple Chocolate Fudge Cupcakes",ku:"کەپکێکی سێ قاتی شوکۆڵاتە"},desc:{en:"Dark chocolate cake filled with molten ganache and sprinkled with cocoa nibs.",ku:"کێکی شوکۆڵاتەی تۆخ بە ناوەرۆکی گاناش و کەرەستەی کاکاو."},unit:{en:"Box of 6",ku:"پاکەتی ٦ دانەیی"}},{id:"p12",category:"desserts",emoji:"🥮",img:"https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=800&auto=format&fit=crop&q=80",priceUSD:24,tag:"bestseller",name:{en:"Parisian Macaron Collection",ku:"کۆمەڵەی ماکارۆنی پاریسی"},desc:{en:"Delicate almond shells: Pistachio, Dark Chocolate, Rose Raspberry, and Salted Caramel.",ku:"ماکارۆنی ڕەسەنی فەڕەنسی: فستق، شوکۆڵاتە، گوڵ، و کارامێل."},unit:{en:"Box of 12",ku:"پاکەتی ١٢ دانەیی"}},{id:"p13",category:"desserts",emoji:"🧀",img:"https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=800&auto=format&fit=crop&q=80",priceUSD:28,tag:"new",name:{en:"Basque Burnt Cheesecake",ku:"چیزکێکی باسکە سووتاوی ئیسپانی"},desc:{en:"Caramelized crust with an ultra-creamy, molten center baked at high heat.",ku:"تەختی کارامێلی سووتاو لەگەڵ ناوەرۆکی زۆر نەرم و پەنیری لەسەر شێوازی ئیسپانی."},unit:{en:'7" Whole Cake',ku:"کێکی تەواوی ٧ ئینچ"}},{id:"p14",category:"desserts",emoji:"🥧",img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&auto=format&fit=crop&q=80",priceUSD:22,tag:"none",name:{en:"Salted Caramel Chocolate Tart",ku:"تارتی شوکۆڵاتە و کارامێلی سوێر"},desc:{en:"Crisp cocoa sablé pastry shell filled with gooey caramel and glossy chocolate glaze.",ku:"تارتی برژاوی کاکاو پڕ لە کارامێلی سوێر و گاناشی گەشاوی شوکۆڵاتە."},unit:{en:'8" Tart (8 slices)',ku:"تارتی ٨ ئینچ (٨ پارچە)"}}],el={en:{btnCancel:"Cancel",btnSubmit:"Submit",btnSaveConfig:"Save Settings",economyTitle:"Pricing & Economy",economyDesc:"Manage currency conversion, delivery fees, and minimum order rules.",shopTagline:"Artisanal Boutique Bakery",announcementText:"Pre-order for weekend celebrations! <strong>Free local delivery</strong> on orders over $50.",navMenu:"Menu",navHowItWorks:"How It Works",navOurStory:"Our Story",navReviews:"Reviews",navContact:"Contact",navFaq:"FAQ",heroEyebrow:"Artisanal Bakery & Pâtisserie",heroTitle:"Handcrafted cakes made with <em>passion</em> & love",heroLead:"We craft bespoke celebratory cakes, delicate pastries, and decadent cupcakes daily using premium organic ingredients. Delivered straight to your celebration with seamless WhatsApp ordering.",heroCtaPrimary:"Explore Our Menu",heroCtaSecondary:"Chat with Baker",trust1:"100% Organic Flours",trust2:"Same-Day Fresh Bake",trust3:"Custom Messages",badgeFresh:"Fresh today from 6 AM",heroReviewSnippet:'"Best Red Velvet in town! Unmatched flavor."',feat1Title:"Real Ingredients",feat1Desc:"Pure butter, Belgian chocolate, fresh seasonal berries, and zero artificial preservatives.",feat2Title:"Careful Delivery",feat2Desc:"Handled with gentle temperature-controlled care so your cake arrives picture-perfect.",feat3Title:"Custom Creations",feat3Desc:"Bespoke tiers, customized chocolate writing, and tailored sweetness for every milestone.",menuEyebrow:"Our Daily Selection",menuTitle:"Baked Fresh For You",menuLead:"Browse our signature cakes, cupcakes, and desserts. Click 'Add to Order' to assemble your WhatsApp cart.",catAll:"All Sweets",catCakes:"Layer Cakes",catCupcakes:"Cupcakes",catDesserts:"Desserts",tagBestseller:"Bestseller",tagNew:"New",btnAdd:"Add to Order",stepsEyebrow:"Simple & Delightful",stepsTitle:"How Ordering Works",stepsLead:"Three effortless steps from our kitchen to your celebration table.",step1Title:"Choose Your Favorites",step1Desc:"Browse our menu and pick the cakes, cupcakes, or desserts you'd love to share with loved ones.",step2Title:"Send Via WhatsApp",step2Desc:"Click Send Order to open an instant pre-formatted WhatsApp message directly to our head baker.",step3Title:"Confirm & Celebrate",step3Desc:"We confirm your delivery slot or pickup time, bake fresh that morning, and deliver to your door.",storyEyebrow:"Our Heritage",storyTitle:"Crafted with patience, baked with devotion",bullet1:"Slow-fermented buttermilk and organic flours",bullet2:"Zero synthetic flavorings or artificial frostings",bullet3:"Dedicated pastry artisans with European techniques",reviewsEyebrow:"Testimonials",reviewsTitle:"Sweet Words from Customers",reviewsLead:"Real feedback from memorable birthdays, weddings, and weekend family teas.",btnLeaveReview:"Leave a Review",leaveReviewTitle:"Leave a Review",leaveReviewDesc:"We'd love to hear about your experience!",reviewFormName:"Your Name",reviewFormQuote:"Your Review",review1Quote:'"The Pistachio Rose cake was the centerpiece of our anniversary dinner. Truly moist, not overly sweet, and breathtakingly decorated."',review1Role:"Verified Customer",review2Quote:'"Ordering via WhatsApp was so fast! Sent the order at 10 AM, had freshly baked cupcakes at my office by 2 PM. Everyone raved about them."',review2Role:"Office Celebrations",review3Quote:'"Their French macarons and salted caramel tart are pure perfection. You can taste the real butter and quality vanilla in every single bite."',review3Role:"Weekend Regular",faqEyebrow:"Common Inquiries",faqTitle:"Frequently Asked Questions",faqLead:"Everything you need to know about our ordering process, dietary needs, and delivery times.",faq1Q:"How far in advance should I place my cake order?",faq1A:"For signature menu cakes, orders placed 24 hours in advance are guaranteed. Custom tiered celebration cakes require 48 to 72 hours notice so our chefs can prepare custom decorations and specialty fillings.",faq2Q:"How does the WhatsApp checkout process work?",faq2A:"When you tap 'Send Order via WhatsApp', your selected items, quantities, and totals are automatically drafted into a clean WhatsApp message. You can add your delivery address and date before sending it directly to our team!",faq3Q:"Do you offer gluten-free or eggless options?",faq3A:"Yes! We offer specialized eggless chocolate fudge cakes and almond-flour gluten-friendly tarts upon request. Please specify dietary preferences in your WhatsApp message notes.",faq4Q:"Can I customize the cake writing or message?",faq4A:"Every full-sized cake includes complimentary chocolate piped lettering on an artisan sugar plaque. Simply include your desired message in the order notes or chat.",faq5Q:"What payment methods do you accept?",faq5A:"We accept cash upon delivery, FastPay, FIB (First Iraqi Bank), and ZainCash transfers. Payment details are finalized during WhatsApp confirmation.",ctaTitle:"Ready to make your occasion sweeter?",ctaLead:"Have a custom design or special theme in mind? Our master bakers are ready to bring your vision to life.",ctaBtnWhatsApp:"Chat on WhatsApp",ctaBtnMenu:"View All Cakes",cardAddressTitle:"Bakery Kitchen",cardHoursTitle:"Opening Hours",cardContactTitle:"Direct Contact",footerBlurb:"A boutique bakery dedicated to handcrafted artisanal celebration cakes, gourmet cupcakes, and fine French pastries.",footerShopLinks:"Shop",footerHelpLinks:"Help & Info",footerHoursTitle:"Baking Hours",footerBestsellers:"Bestsellers",copyrightAllRights:"All rights reserved.",footerTagline:"Baked fresh daily with wholesome ingredients & pure love.",btnSignIn:"Sign In",btnPanel:"Control Panel",btnLogout:"Log Out",trayItemLabel:"items",trayItemLabelSingular:"item",trayClear:"Clear Order",traySendWhatsApp:"Send Order via WhatsApp",tabCustomer:"Customer",customerTitle:"Quick Customer Sign In",customerDesc:"Sign in with your phone and name. No password needed! Your name will pre-fill your WhatsApp orders.",labelPhone:"Mobile Number (min 6 digits)",labelDisplayName:"Your Name / Display Name",btnContinue:"Continue as Customer",labelUsername:"Username or Email",labelPassword:"Password",tabAdmin:"Admin",tabDev:"Developer",staffFormDesc:"Please enter your management credentials to access the bakery control panel.",historyZero:"You've placed 0 orders.",trayEmptyPreview:"No items selected",storyImgTitle:"Sweet Artisan Heritage",storyImgDesc:"Fresh from our oven to your family celebration",review1Name:"Sara & Kareem",review2Name:"Danyar Azad",review3Name:"Lina Rostam",footerOrdersInfo:"Orders & inquiries:",invalidPromo:"Invalid promo code",promoRemoved:"Promo code removed",itemsNotAvailable:"These items are currently not available on the menu.",signedInAs:"Signed in as {name}",loggedInAs:"Logged in as {role}",loggedOut:"Logged out successfully.",orderStatusUpdated:"Order status updated to {status}",noteSaved:"Note saved",invalidUrl:"Invalid URL scheme. Only http:// and https:// links are supported.",staffAdded:"Staff user added successfully",usersTitle:"User & Staff Management",usersAddStaff:"Add Staff Account",usersSearch:"Search users…",usersHint:"Admins manage staff accounts and passwords. Developer and admin accounts are protected.",usersColRole:"Role",usersColName:"Name",usersColLogin:"Username / Phone",usersColPassword:"Password",usersColPerms:"Permissions",usersColActions:"Actions",usersNoPassword:"Customer — no login",usersYou:"(You)",usersEmpty:"No users match your search.",usersNoAccess:"You do not have access to user management.",usersEdit:"Edit",usersResetPw:"Reset password",usersDelete:"Delete",role_admin:"ADMIN",role_dev:"DEV",role_staff:"STAFF",role_customer:"CUSTOMER",perm_products:"Products",perm_customers:"Customers",perm_economy:"Economy",perm_brand:"Brand & Logo",perm_theme:"Theme",perm_fonts:"Fonts",perm_about:"About Us",perm_contact:"Contact",perm_socials:"Social Media",editUserTitle:"Edit User",usersNewPwPrompt:"New password for {name}:",staffPwTooShort:"Password must be at least 4 characters.",usersCannotDeleteSelf:"You cannot delete your own account.",usersCannotDeleteElevated:"Only the developer can delete admin or developer accounts.",usersConfirmDelete:'Delete user "{name}"? This cannot be undone.',phonePreviewLabel:"Preview width",phonePreviewDesktop:"Desktop",phonePreviewPhone:"Phone",backupImported:"Backup imported successfully!",copiedJson:"Copied JSON to clipboard!",factoryResetDone:"Reset to factory defaults complete.",btnLogin:"Login to Dashboard",panelTitle:"Bakery Control Panel",uploadPhoto:"Upload photo",replacePhoto:"Replace photo",removePhoto:"Remove photo",photoHint:"JPG, PNG or WebP — auto-resized to 800px wide. Max 5 MB.",noPhotoHint:"No photo yet — emoji will be shown",prodPhotoError:"Failed to process image. Please try another file.",prodPhotoTooLarge:"Processed image is too large. Please select a smaller file.",prodPhotoRemoved:"Photo removed.",storageQuotaError:"Storage full — try smaller images or remove some photos.",prodDeleteConfirm:"Are you sure you want to delete this product?",btnAddNewProduct:"+ Add New Product",btnSaveProduct:"Save Product",btnDeleteProduct:"Delete Product",tabFonts:"Fonts",fieldKurdishBody:"Kurdish body font",fieldKurdishDisplay:"Kurdish heading font",fieldEnglishBody:"English body font",fieldEnglishDisplay:"English heading font",saveFonts:"Save fonts",fontPreview:"Preview",customizeTitle:"Customize",customizeLeaveOut:"Leave out",customizeSkip:"Skip — add as is",customizeAdd:"Add to order",customizeNone:"Nothing to customize",orderNoteLabel:"Note for the baker (optional)",orderNotePlaceholder:'e.g. "Happy birthday Sara" or "leave at the door"',orderNoteTooLong:"Note is too long — max 300 characters.",waNote:"Note for the baker",waExclude:"No",toastPhotoReady:"Photo processed and ready to save.",toastAdded:"Added to your order tray!",toastOrderCleared:"Order tray cleared.",toastSaved:"Saved successfully",toastDeleted:"Deleted successfully",toastInvalidPhone:"Please enter a valid mobile number with at least 6 digits.",toastInvalidLogin:"Invalid username or password.",toastInvalidJson:"Invalid JSON format. Please check your input.",tabEconomy:"Economy",economyCurrencies:"Currencies",economyExchange:"Exchange rate",economyDelivery:"Delivery",economyTax:"Tax",economyDiscounts:"Discounts",fieldPrimaryCurrency:"Primary currency (locked)",fieldSecondaryCurrency:"Secondary currency",fieldShowSecondary:"Show secondary currency in storefront",fieldCurrencySymbol:"Currency symbol",fieldExchangeRate:"1 USD = ? IQD",fieldRoundingRule:"Round converted prices to",fieldAutoRefresh:"Auto-refresh rate (not yet active)",fieldDeliveryFee:"Flat delivery fee (USD)",fieldFreeDeliveryOver:"Free delivery over (USD)",fieldMinimumOrder:"Minimum order (USD)",fieldPickupOnly:"Pickup only — hide delivery",fieldTaxEnabled:"Charge tax",fieldTaxRate:"Tax rate (%)",fieldTaxLabel:"Tax label",fieldTaxIncluded:"Prices already include tax",fieldPromoCode:"Active promo code",fieldPromoType:"Discount type",fieldPromoValue:"Discount value",fieldPromoExpiry:"Expires on",saveEconomy:"Save economy settings",roundNearest1:"Nearest 1",roundNearest250:"Nearest 250",roundNearest500:"Nearest 500",roundNearest1000:"Nearest 1000",promoPercent:"Percentage (%)",promoFixed:"Fixed amount (USD)",subtotal:"Subtotal",deliveryFee:"Delivery",tax:"Tax",discount:"Discount",total:"Total",freeDelivery:"Free",minimumOrderWarning:"Minimum order is {amount}. Add {remaining} more to checkout.",promoApplied:"Promo code {code} applied",promoExpired:"Promo code expired",economyPreview:"Live preview",economyPreviewSample:"Sample order: $50 subtotal",trayDetails:"Details ▾",trayDetailsClose:"Close ▴",trayDateLabel:"Delivery or pickup date and time *",trayPaymentNote:"Cash on delivery. We confirm the delivery fee on WhatsApp.",inOrderCount:"{n} in your order",skipToMenu:"Skip to the menu",trayApplyPromo:"Apply",trayRemovePromo:"Remove",trayPromoPlaceholder:"Promo code",deliveryFreeForEveryone:"Free delivery for everyone",freeDeliveryWarning:"Free delivery threshold is lower than minimum order — customers below minimum cannot checkout anyway.",promoActive:"Active",promoTooShort:"Needs 3+ chars",taxAddedCheckout:"Added at checkout",taxIncludedLabel:"incl.",pickupAvailable:"Pickup available",justNow:"Just now",roundedFrom:"Rounded from {raw} to {rounded} (nearest {rule})",searchPlaceholder:"Search cakes, cupcakes, desserts…",searchShortcut:"Press ⌘K to search",searchResultsCount:"Showing {shown} of {total} cakes",searchNoResults:'No cakes match "{query}".',searchEmptyDesc:"Try clearing your search query or selecting a different price range or category.",searchClearAll:"Clear all filters",searchClearSearch:"Clear search",sortLabel:"Sort",sortPopular:"Popular",sortNewest:"Newest",sortPriceAsc:"Price: Low to High",sortPriceDesc:"Price: High to Low",sortNameAsc:"Name A–Z",priceRangeLabel:"Price",priceAny:"Any price",priceUnder20:"Under $20",price20to40:"$20 – $40",price40to60:"$40 – $60",priceOver60:"Over $60",myOrders:"My Orders",myOrdersTitle:"My Orders",myOrdersSubtitle:"You've placed {count} orders since {date}.",myOrdersEmpty:"No orders yet.",myOrdersEmptyHint:"Browse the menu and place your first order — it'll appear here.",myOrdersBrowse:"Browse the menu",myOrdersReorder:"Reorder",myOrdersDetails:"View details",myOrdersTotalSpent:"Total spent",myOrdersTotalOrders:"Orders",myOrdersFavourite:"Most ordered",orderStatusPending:"Pending",orderStatusBaking:"Baking",orderStatusDelivered:"Delivered",orderStatusCancelled:"Cancelled",orderSignInToSave:"Sign in to save this order to your history.",orderAddedToTray:"{count} items added to your order",tabCustomers:"Customers",customersSearch:"Search by name or mobile…",customersSortName:"Name",customersSortLastOrder:"Last order",customersSortTotalSpent:"Total spent",customersSortOrderCount:"Order count",customersEmpty:"No customers yet.",customerOrders:"Orders",customerTotalSpent:"Total spent",customerLastOrder:"Last order",customerNoOrders:"This customer has no orders.",customerPrivateNote:"Private note (staff only)",customerChangeStatus:"Change status",logoSection:"Logo",logoModeEmoji:"Emoji",logoModeUpload:"Upload",logoModeUrl:"URL",logoPreview:"Preview",logoUploadBtn:"Upload logo",logoReplaceBtn:"Replace logo",logoRemoveBtn:"Remove logo",logoRemoveConfirm:"Remove the current logo and use an emoji instead?",logoRemoved:"Logo removed — using emoji.",logoUrlLabel:"Remote image URL",logoUrlHint:"Paste a direct link to a PNG, JPG, WebP or SVG file.",logoUrlValid:"URL valid",logoUrlInvalid:"Couldn't load this URL",logoEmojiLabel:"Emoji",logoEmojiHint:"Pick one or paste your own.",logoEmojiEmpty:"Empty — using default 🎂",logoUploadHint:"Square images work best. Auto-resized to 256×256. Max 5 MB.",logoUploadReady:"Ready to save",logoUploadError:"Couldn't read that image. Try a different file.",logoUploadTooLarge:"Image too large after resizing. Try a simpler logo.",logoFaviconNote:"Also updates the browser tab icon.",logoFallbackWarning:"Image couldn't load. Falling back to emoji.",tabTheme:"Theme",themePresetTitle:"Preset palettes",themePreviewTitle:"Live preview",themeSave:"Save theme",themeApplied:"Theme saved",themeReverted:"Reverted to last saved theme",themePreviewHeading:"A sample heading",themePreviewBody:"Body text on the base background, exactly as it will appear on the site.",themePreviewPrimary:"Primary button",themePreviewGhost:"Ghost button",themePreviewGold:"Gold accent ★★★★★",themePreviewPrice:"$38 · 49,750 د.ع",themePresetBerry:"Berry",themePresetChocolate:"Chocolate",themePresetSage:"Sage",themePresetRose:"Rose",themePresetMidnight:"Midnight",themeAutoDark:"Enable auto-dark mode (system)"},ku:{btnCancel:"پاشگەزبوونەوە",btnSubmit:"ناردن",btnSaveConfig:"پاشەکەوتکردنی ڕێکخستنەکان",economyTitle:"نرخدانان و ئابووری",economyDesc:"بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",btnCancel:"پاشگەزبوونەوە",btnSubmit:"ناردن",btnSaveConfig:"پاشەکەوتکردنی ڕێکخستنەکان",economyTitle:"نرخدانان و ئابووری",economyDesc:"بەڕێوەبردنی نرخی ئاڵوگۆڕ، کرێی گەیاندن و مەرجەکانی کەمترین داواکاری.",shopTagline:"شیرینەمەنی دەستکردی نایاب",announcementText:"پێشوەختە داوا بکە بۆ ئاهەنگەکانی کۆتایی هەفتە! <strong>گەیاندنی خۆڕایی</strong> بۆ داواکاری سەروو $50.",navMenu:"لیستی شیرینی",navHowItWorks:"شێوازی داواکردن",navOurStory:"چیرۆکی ئێمە",navReviews:"ڕای کڕیاران",navContact:"پەیوەندی",navFaq:"پرسیارە باوەکان",heroEyebrow:"شیرینەمەنی و پاتیسێری دەستکرد",heroTitle:"کێکی تایبەت بە <em>شەیدایی</em> و خۆشەویستی",heroLead:"ئێمە هەموو ڕۆژێک کێکی ئاهەنگگێڕان، شیرینی ناسک، و کەپکێکی بێوێنە بە کەرەستەی ئۆرگانیک دروست دەکەین. گەیاندنی خێرا لەڕێگەی واتسئاپەوە بۆ ئاهەنگەکانتان.",heroCtaPrimary:"بینینی هەموو شیرینییەکان",heroCtaSecondary:"گفتوگۆ لەگەڵ وەستای کێک",trust1:"١٠٠٪ ئاردی ئۆرگانیک",trust2:"برژاوی ڕۆژ و تازە",trust3:"نووسینی ناوی دڵخواز",badgeFresh:"تازە لە کاتژمێر ٦ی بەیانییەوە",heroReviewSnippet:'"باشترین کێکی ڕێد ڤێلڤێت لە شاردا! تامی بێوێنەیە."',feat1Title:"پێکهاتەی سروشتی",feat1Desc:"کەرەی پاک، شوکۆڵاتەی بەلجیکی، میوەی تازە، و بەبێ هیچ ماددەیەکی پارێزەر.",feat2Title:"گەیاندنی پارێزراو",feat2Desc:"بە ئۆتۆمبێلی فێنککەرەوە دەگەیەنرێت بۆ ئەوەی کێکەکەت بە جوانی تەواو بگات.",feat3Title:"دیزاینی دڵخواز",feat3Desc:"کێکی چەندین نهۆم، نووسینی شوکۆڵاتەیی، و شیرینی تایبەت بۆ هەموو یادێک.",menuEyebrow:"هەڵبژاردەی ڕۆژانەمان",menuTitle:"بە تازەیی بۆ تۆ برژاوە",menuLead:'سەیری کێک و کەپکێک و شیرینییەکانمان بکە. کرتە لەسەر "زیادکردن" بکە بۆ داواکردن لە واتسئاپ.',catAll:"هەموو شیرینییەکان",catCakes:"کێکەکان",catCupcakes:"کەپکێک",catDesserts:"دیسێرت",tagBestseller:"پڕفرۆشترین",tagNew:"نوێ",btnAdd:"زیادکردن بۆ سەبەتە",stepsEyebrow:"ئاسان و خێرا",stepsTitle:"چۆنیەتی داواکردن",stepsLead:"سێ هەنگاوی زۆر سادە لە چێشتخانەکەمانەوە بۆ سەر مێزی ئاهەنگەکەت.",step1Title:"دڵخوازی خۆت هەڵبژێرە",step1Desc:"سەیری لیستەکەمان بکە و ئەو شیرینییە هەڵبژێرە کە دەتەوێت لەگەڵ خۆشەویستانت بەشی بکەیت.",step2Title:"لە واتسئاپەوە بینێرە",step2Desc:"کرتە لەسەر ناردن بکە تا ڕاستەوخۆ داواکارییە ڕێکخراوەکەت بگاتە دەست وەستای شیرینی.",step3Title:"وەریبگرە و ئاهەنگ بگێڕە",step3Desc:"کاتی گەیاندن یان وەرگرتن دادەنێین، بە تازەیی دەبرژێنین و دەگەیەنینە بەردەم دەرگاتان.",storyEyebrow:"مێژوو و ڕەسەنایەتی",storyTitle:"بە ئارامی دروستکراو، بە دڵسۆزی برژاو",bullet1:"کەرە و شیری سروشتی و ئاردی ئۆرگانیک",bullet2:"بەبێ هیچ ڕەنگ و تامی دەستکرد",bullet3:"وەستای ئەزمووندار بە شێوازی ئەوروپی",reviewsEyebrow:"ڕای کڕیاران",reviewsTitle:"وتەی شیرینی کڕیارە ئازیزەکانمان",reviewsLead:"بۆچوونی ڕاستەقینە لە یادی لەدایکبوون و ئاهەنگە دڵخۆشکەرەکان.",btnLeaveReview:"نووسینی بۆچوون",leaveReviewTitle:"نووسینی بۆچوون",leaveReviewDesc:"بە خۆشحاڵییەوە گوێبیستی ڕای ئێوە دەبین!",reviewFormName:"ناوت",reviewFormQuote:"بۆچوونەکەت",review1Quote:'"کێکی فستق و گوڵاو جوانترین دیاری بوو بۆ ساڵیادی هاوسەرگیریمان. زۆر ناسک بوو و شیرینییەکەی تەواو لەجێی خۆیدا بوو."',review1Role:"کڕیاری دڵنیاکراو",review2Quote:'"داواکردن بە واتسئاپ زۆر خێرا بوو! کاتژمێر ١٠ داوام کرد، کاتژمێر ٢ لە ئۆفیس پێم گەیشت."',review2Role:"ئاهەنگی فەرمانگە",review3Quote:'"ماکارۆن و تارتی کارامێلەکەیان بێ وێنەیە. تامی کەرەی ڕاستەقینە و ڤانێلای چاک لە هەموو پارچەیەکدا دیارە."',review3Role:"کڕیاری هەمیشەیی",faqEyebrow:"پرسیارە دووبارەکان",faqTitle:"پرسیارە باوەکان",faqLead:"هەموو زانیارییەک دەربارەی شێوازی داواکردن، جۆری کەرەستەکان و کاتی گەیاندن.",faq1Q:"چەند کاتژمێر پێشوەخت پێویستە کێک داوا بکەم؟",faq1A:"بۆ کێکە ئاساییەکانی لیستەکە، داواکاری ٢٤ کاتژمێر پێشتر گەرەنتی کراوە. بۆ کێکی تایبەتی چەندین نهۆم پێویستمان بە ٤٨ بۆ ٧٢ کاتژمێرە.",faq2Q:"شێوازی کڕین لەڕێگەی واتسئاپ چۆنە؟",faq2A:'کاتێک دەست دەنێیت بە "ناردن لە واتسئاپ"، هەموو شیرینییە هەڵبژێردراوەکان لە پەیامێکی ڕێکخراودا ئامادە دەکرێن و ڕاستەوخۆ دەینێریت بۆمان!',faq3Q:"ئایا کێکی بێ هێلکە یان بێ گلوتینتان هەیە؟",faq3A:"بەڵێ! کێکی شوکۆڵاتەی تایبەت بەبێ هێلکە و تارتی ئاردی بادەم بۆ کەسانی هەستیار ئامادە دەکرێت بە داواکاری پێشوەختە.",faq4Q:"ئایا دەتوانم نووسینی سەر کێک دیاری بکەم؟",faq4A:"بەڵێ، لەسەر هەموو کێکە گەورەکان نووسینی ناوی دڵخواز بە شوکۆڵاتە لەسەر پلێتی شەکری بە دیاری پێشکەش دەکرێت.",faq5Q:"شێوازی پارەدان چۆنە؟",faq5A:"پارەدان بە کاش لە کاتی وەرگرتن، هەروەها لەڕێگەی فاستپەی، بانکی یەکەمی عێراقی (FIB) و زەین کاش قبوڵ دەکرێت.",ctaTitle:"ئامادەیت بۆنەکەت شیرینتر بکەیت؟",ctaLead:"دیزاین یان بیرۆکەیەکی تایبەتت لە مێشکدایە؟ وەستاکانمان ئامادەن خەونەکەت بکەنە ڕاستی.",ctaBtnWhatsApp:"پەیوەندی لە واتسئاپ",ctaBtnMenu:"بینینی هەموو کێکەکان",cardAddressTitle:"چێشتخانەی شیرینی",cardHoursTitle:"کاتژمێرەکانی کارکردن",cardContactTitle:"پەیوەندی ڕاستەوخۆ",footerBlurb:"شیرینەمەنییەکی دەستکردی نایاب تایبەت بە کێکی بۆنەکان، کەپکێکی ناسک و شیرینی فەڕەنسی.",footerShopLinks:"بەشەکانی فرۆشگا",footerHelpLinks:"یارمەتی و زانیاری",footerHoursTitle:"کاتەکانی برژاندن",footerBestsellers:"پڕفرۆشترینەکان",copyrightAllRights:"هەموو مافەکانی پارێزراوە.",footerTagline:"ڕۆژانە بە کەرەستەی سروشتی و خۆشەویستی پاک دەبرژێنرێت.",btnSignIn:"چوونەژوورەوە",btnPanel:"پانێڵی کۆنتڕۆڵ",btnLogout:"دەرچوون",trayItemLabel:"بەند",trayItemLabelSingular:"بەند",trayClear:"سڕینەوەی سەبەتە",traySendWhatsApp:"ناردنی داواکاری لە واتسئاپ",tabCustomer:"کڕیار",customerTitle:"چوونەژوورەوەی خێرای کڕیار",customerDesc:"تەنها ژمارەی مۆبایل و ناوت بنووسە. بەبێ وشەی نهێنی! ناوت بۆ داواکاری واتسئاپ بەکاردێت.",labelPhone:"ژمارەی مۆبایل (کەمترین ٦ ژمارە)",labelDisplayName:"ناوی بەڕێزت",btnContinue:"بەردەوامبوون وەک کڕیار",labelUsername:"ناوی بەکارهێنەر یان ئیمەیڵ",labelPassword:"وشەی نهێنی",tabAdmin:"بەڕێوەبەر",tabDev:"گەشەپێدەر",staffFormDesc:"تکایە زانیارییەکانی چوونەژوورەوەت بنووسە بۆ بینینی پەنێڵی کۆنترۆڵ.",historyZero:"هیچ داواکارییەکت نەکردووە.",trayEmptyPreview:"هیچ کاڵایەک هەڵنەبژێردراوە",storyImgTitle:"کەلەپووری شیرینی دەستکرد",storyImgDesc:"بە فرێشی لە فڕنەوە بۆ ئاهەنگی خێزانەکەت",review1Name:"سارا و کەریم",review2Name:"دانیار ئازاد",review3Name:"لینا ڕۆستەم",footerOrdersInfo:"داواکاری و پرسیار:",invalidPromo:"کۆدی داشکاندن هەڵەیە",promoRemoved:"کۆدی داشکاندن سڕایەوە",itemsNotAvailable:"ئەم کاڵایانە لە ئێستادا لە مێنیودا بەردەست نین.",signedInAs:"چوویتە ژوورەوە وەک {name}",loggedInAs:"چوویتە ژوورەوە وەک {role}",loggedOut:"بە سەرکەوتوویی چوویەدەرەوە.",orderStatusUpdated:"باری داواکاری گۆڕدرا بۆ {status}",noteSaved:"تێبینی پاشەکەوت کرا",invalidUrl:"شێوازی بەستەر هەڵەیە. تەنها بەستەرەکانی http:// و https:// پشتگیری دەکرێن.",staffAdded:"بەکارهێنەری ستاف بە سەرکەوتوویی زیادکرا",usersTitle:"بەڕێوەبردنی بەکارهێنەران و ستاف",usersAddStaff:"زیادکردنی ئەژمێری ستاف",usersSearch:"گەڕان بۆ بەکارهێنەران…",usersHint:"ئەدمینەکان ئەژمێرەکانی ستاف و تێپەڕەوشەکان بەڕێوە دەبەن. ئەژمێری گەشەپێدەر و ئەدمین پارێزراون.",usersColRole:"ڕۆڵ",usersColName:"ناو",usersColLogin:"ناوی بەکارهێنەر / مۆبایل",usersColPassword:"تێپەڕەوشە",usersColPerms:"مۆڵەتەکان",usersColActions:"کردارەکان",usersNoPassword:"کڕیار — چوونەژوورەوەی نییە",usersYou:"(تۆ)",usersEmpty:"هیچ بەکارهێنەرێک نەدۆزرایەوە.",usersNoAccess:"ڕێگەت نییە بە بەڕێوەبردنی بەکارهێنەران.",usersEdit:"دەستکاری",usersResetPw:"گۆڕینی تێپەڕەوشە",usersDelete:"سڕینەوە",role_admin:"ئەدمین",role_dev:"گەشەپێدەر",role_staff:"ستاف",role_customer:"کڕیار",perm_products:"بەرهەمەکان",perm_customers:"کڕیاران",perm_economy:"ئابووری",perm_brand:"براند و لۆگۆ",perm_theme:"ڕووکار",perm_fonts:"فۆنتەکان",perm_about:"دەربارەی ئێمە",perm_contact:"پەیوەندی",perm_socials:"سۆشیال میدیا",editUserTitle:"دەستکاریکردنی بەکارهێنەر",usersNewPwPrompt:"تێپەڕەوشەی نوێ بۆ {name}:",staffPwTooShort:"تێپەڕەوشە دەبێت لانیکەم ٤ پیت بێت.",usersCannotDeleteSelf:"ناتوانیت ئەژمێری خۆت بسڕیتەوە.",usersCannotDeleteElevated:"تەنها گەشەپێدەر دەتوانێت ئەژمێری ئەدمین و گەشەپێدەر بسڕێتەوە.",usersConfirmDelete:'دڵنیایی لە سڕینەوەی "{name}"؟ ئەمە ناگەڕێتەوە.',phonePreviewLabel:"پانی پیشاندان",phonePreviewDesktop:"کۆمپیوتەر",phonePreviewPhone:"مۆبایل",backupImported:"باکئەپ بە سەرکەوتوویی هێنرایە ناوەوە!",copiedJson:"JSON کۆپی کرا بۆ کلیپبۆرد!",factoryResetDone:"گەڕانەوە بۆ باری بنەڕەتی بە سەرکەوتوویی تەواو بوو.",btnLogin:"چوونەژوورەوە بۆ پانێڵ",panelTitle:"پانێڵی کۆنتڕۆڵی شیرینەمەنی",uploadPhoto:"وێنە باربکە",replacePhoto:"وێنە بگۆڕە",removePhoto:"سڕینەوەی وێنە",photoHint:"JPG، PNG یان WebP — خۆکارانە قەبارەکەی دەکرێتە ٨٠٠ پێکسڵ. زۆرترین ٥ مێگابایت.",noPhotoHint:"هێشتا وێنە نییە — ئیمۆجی پیشان دەدرێت",prodPhotoError:"کرداری وێنەکە سەرکەوتوو نەبوو. تکایە فایلێکی تر تاقی بکەرەوە.",prodPhotoTooLarge:"قەبارەی وێنەکە زۆر گەورەیە. تکایە وێنەیەکی بچووکتر هەڵبژێرە.",prodPhotoRemoved:"وێنەکە سڕایەوە.",storageQuotaError:"شوێنی پاشەکەوتکردن پڕبووە — وێنەی بچووکتر بەکاربێنە یان وێنەکان کەم بکەرەوە.",prodDeleteConfirm:"دڵنیایت لە سڕینەوەی ئەم بەرهەمە؟",btnAddNewProduct:"+ زیادکردنی بەرهەمی نوێ",btnSaveProduct:"پاشەکەوتکردنی بەرهەم",btnDeleteProduct:"سڕینەوەی بەرهەم",tabFonts:"فۆنتەکان",fieldKurdishBody:"فۆنتی ناوەوە (کوردی)",fieldKurdishDisplay:"فۆنتی سەرنوسراو (کوردی)",fieldEnglishBody:"فۆنتی ناوەوە (ئینگلیزی)",fieldEnglishDisplay:"فۆنتی سەرنوسراو (ئینگلیزی)",saveFonts:"پاشەکەوتکردنی فۆنت",fontPreview:"پێشبینین",customizeTitle:"دەستکاری کردن",customizeLeaveOut:"لایببە",customizeSkip:"تێپەڕاندن — وەک خۆی زیادی بکە",customizeAdd:"زیادکردن بۆ داواکاری",customizeNone:"هیچ شتێک نییە بۆ دەستکاریکردن",orderNoteLabel:"تێبینی بۆ نانەوا (ئارەزوومەندانە)",orderNotePlaceholder:'بۆ نموونە "جەژنی لەدایکبوون پیرۆز سارا"',orderNoteTooLong:"تێبینییەکە زۆر درێژە — زۆرترین ٣٠٠ پیت.",waNote:"تێبینی بۆ نانەوا",waExclude:"بێ",toastPhotoReady:"وێنەکە ئامادەکرا و دەتوانیت پاشەکەوتی بکەیت.",toastAdded:"زیادکرا بۆ سەبەتەکەت!",toastOrderCleared:"سەبەتەی داواکاری پاککرایەوە.",toastSaved:"بە سەرکەوتوویی پاشەکەوت کرا",toastDeleted:"بە سەرکەوتوویی سڕایەوە",toastInvalidPhone:"تکایە ژمارەی مۆبایلی دروست بە کەمترین ٦ ژمارە بنووسە.",toastInvalidLogin:"ناوی بەکارهێنەر یان وشەی نهێنی هەڵەیە.",toastInvalidJson:"فۆرماتی JSON هەڵەیە، تکایە دڵنیابەرەوە.",tabEconomy:"ئابووری",economyCurrencies:"دراوەکان",economyExchange:"نرخی ئاڵوگۆڕ",economyDelivery:"گەیاندن",economyTax:"باج",economyDiscounts:"داشکاندن",fieldPrimaryCurrency:"دراوی سەرەکی (داخراو)",fieldSecondaryCurrency:"دراوی دووەم",fieldShowSecondary:"پیشاندانی دراوی دووەم لە ماڵپەڕ",fieldCurrencySymbol:"هێمای دراو",fieldExchangeRate:"1 دۆلار = ؟ دینار",fieldRoundingRule:"خستنەوەی نرخی گۆڕدراو بۆ",fieldAutoRefresh:"نوێکردنەوەی خۆکار (هێشتا چالاک نییە)",fieldDeliveryFee:"کرێی گەیاندن (دۆلار)",fieldFreeDeliveryOver:"گەیاندنی خۆڕایی بۆ سەرووی (دۆلار)",fieldMinimumOrder:"کەمترین داواکاری (دۆلار)",fieldPickupOnly:"تەنها وەرگرتن — گەیاندن بشارەوە",fieldTaxEnabled:"وەرگرتنی باج",fieldTaxRate:"ڕێژەی باج (%)",fieldTaxLabel:"ناوی باج",fieldTaxIncluded:"نرخەکان باج لەخۆدەگرن",fieldPromoCode:"کۆدی داشکاندنی چالاک",fieldPromoType:"جۆری داشکاندن",fieldPromoValue:"بڕی داشکاندن",fieldPromoExpiry:"بەسەرچوون لە",saveEconomy:"پاشەکەوتکردنی ڕێکخستنی ئابووری",roundNearest1:"نزیکترین 1",roundNearest250:"نزیکترین 250",roundNearest500:"نزیکترین 500",roundNearest1000:"نزیکترین 1000",promoPercent:"ڕێژە (%)",promoFixed:"بڕی جێگیر (دۆلار)",subtotal:"کۆی لاوەکی",deliveryFee:"گەیاندن",tax:"باج",discount:"داشکاندن",total:"کۆی گشتی",freeDelivery:"خۆڕایی",minimumOrderWarning:"کەمترین داواکاری {amount}ە. {remaining} زیاتر زیاد بکە بۆ تەواوکردن.",promoApplied:"کۆدی داشکاندن {code} جێبەجێکرا",promoExpired:"کۆدی داشکاندن بەسەرچووە",economyPreview:"پێشبینینی ڕاستەوخۆ",economyPreviewSample:"داواکاری نموونە: 50 دۆلار کۆی لاوەکی",trayDetails:"وردەکاری ▾",trayDetailsClose:"داخستن ▴",trayDateLabel:"بەروار و کاتی گەیاندن یان وەرگرتن *",trayPaymentNote:"پارەدان لە کاتی گەیاندن. کرێی گەیاندن لە واتسئاپ پشتڕاست دەکەینەوە.",inOrderCount:"{n} لە داواکارییەکەتدا",skipToMenu:"بڕۆ بۆ لیستی شیرینی",trayApplyPromo:"جێبەجێکردن",trayRemovePromo:"سڕینەوە",trayPromoPlaceholder:"کۆدی داشکاندن",deliveryFreeForEveryone:"گەیاندنی خۆڕایی بۆ هەمووان",freeDeliveryWarning:"ئاستی گەیاندنی خۆڕایی کەمترە لە کەمترین داواکاری — کڕیارانی خوار کەمترین ناتوانن داوا بکەن.",promoActive:"چالاکە",promoTooShort:"کەمترین ٣ پیت",taxAddedCheckout:"لە کاتی کڕین زیاد دەکرێت",taxIncludedLabel:"بەشدارە",pickupAvailable:"وەرگرتن لە چێشتخانە بەردەستە",justNow:"ئێستا",roundedFrom:"خستنەوە لە {raw} بۆ {rounded} (نزیکترین {rule})",searchPlaceholder:"گەڕان بۆ کێک، کاپکێک، شیرینی…",searchShortcut:"⌘K دابگرە بۆ گەڕان",searchResultsCount:"{shown} لە {total} کێک پیشان دەدرێت",searchNoResults:'هیچ کێکێک نەدۆزرایەوە بۆ "{query}".',searchEmptyDesc:"هەوڵبدە گەڕانەکەت بسڕیتەوە یان مەودای نرخ یان هاوپۆلێکی تر هەڵبژێریت.",searchClearAll:"پاککردنەوەی هەموو فلتەرەکان",searchClearSearch:"پاککردنەوەی گەڕان",sortLabel:"ڕیزکردن",sortPopular:"بەناوبانگ",sortNewest:"نوێترین",sortPriceAsc:"نرخ: لە کەمەوە بۆ زۆر",sortPriceDesc:"نرخ: لە زۆرەوە بۆ کەم",sortNameAsc:"ناو A–Z",priceRangeLabel:"نرخ",priceAny:"هەر نرخێک",priceUnder20:"کەمتر لە 20 دۆلار",price20to40:"20 – 40 دۆلار",price40to60:"40 – 60 دۆلار",priceOver60:"زیاتر لە 60 دۆلار",myOrders:"داواکارییەکانم",myOrdersTitle:"داواکارییەکانم",myOrdersSubtitle:"{count} داواکاریت کردووە لە {date}ەوە.",myOrdersEmpty:"هێشتا هیچ داواکارییەک نییە.",myOrdersEmptyHint:"مێنیو ببینە و یەکەم داواکاریت بکە — لێرە دەردەکەوێت.",myOrdersBrowse:"مێنیو ببینە",myOrdersReorder:"دووبارە داواکردن",myOrdersDetails:"بینینی وردەکاری",myOrdersTotalSpent:"کۆی خەرجکراو",myOrdersTotalOrders:"داواکارییەکان",myOrdersFavourite:"زۆرترین داواکراو",orderStatusPending:"چاوەڕوان",orderStatusBaking:"دەژەنرێت",orderStatusDelivered:"گەیەندرا",orderStatusCancelled:"هەڵوەشێنراوە",orderSignInToSave:"بچۆ ژوورەوە بۆ پاشەکەوتکردنی ئەم داواکارییە.",orderAddedToTray:"{count} بەند زیادکرا بۆ داواکاریەکەت",tabCustomers:"کڕیارەکان",customersSearch:"گەڕان بە ناو یان مۆبایل…",customersSortName:"ناو",customersSortLastOrder:"دوایین داواکاری",customersSortTotalSpent:"کۆی خەرجکراو",customersSortOrderCount:"ژمارەی داواکاری",customersEmpty:"هێشتا هیچ کڕیارێک نییە.",customerOrders:"داواکارییەکان",customerTotalSpent:"کۆی خەرجکراو",customerLastOrder:"دوایین داواکاری",customerNoOrders:"ئەم کڕیارە هیچ داواکارییەکی نییە.",customerPrivateNote:"تێبینی تایبەت (تەنها کارمەندان)",customerChangeStatus:"گۆڕینی دۆخ",logoSection:"لۆگۆ",logoModeEmoji:"ئیمۆجی",logoModeUpload:"بارکردن",logoModeUrl:"بەستەر",logoPreview:"پێشبینین",logoUploadBtn:"بارکردنی لۆگۆ",logoReplaceBtn:"گۆڕینی لۆگۆ",logoRemoveBtn:"سڕینەوەی لۆگۆ",logoRemoveConfirm:"لۆگۆی ئێستا بسڕدرێتەوە و ئیمۆجی بەکاربهێنرێت؟",logoRemoved:"لۆگۆ سڕایەوە — ئیمۆجی بەکاردێت.",logoUrlLabel:"بەستەری وێنەی دوور",logoUrlHint:"بەستەرێکی ڕاستەوخۆ بۆ فایلی PNG، JPG، WebP یان SVG دابنێ.",logoUrlValid:"بەستەر دروستە",logoUrlInvalid:"نەتوانرا ئەم بەستەرە بار بکرێت",logoEmojiLabel:"ئیمۆجی",logoEmojiHint:"یەکێک هەڵبژێرە یان هی خۆت دابنێ.",logoEmojiEmpty:"بەتاڵ — 🎂 ی بنەڕەت بەکاردێت",logoUploadHint:"وێنەی چوارگۆشە باشترینە. خۆکارانە بۆ 256×256 دەگۆڕدرێت. زۆرترین 5 مێگابایت.",logoUploadReady:"ئامادەیە بۆ پاشەکەوتکردن",logoUploadError:"نەتوانرا ئەم وێنەیە بخوێنرێتەوە. فایلێکی تر تاقی بکەوە.",logoUploadTooLarge:"وێنە زۆر گەورەیە دوای گۆڕین. لۆگۆیەکی سادەتر تاقی بکەوە.",logoFaviconNote:"هەروەها ئایکۆنی تابەکەش نوێ دەکاتەوە.",logoFallbackWarning:"وێنە نەتوانرا بار بکرێت. ئیمۆجی بەکاردێت.",tabTheme:"ڕووکار",themePresetTitle:"پالێتە ئامادەکان",themePreviewTitle:"پێشبینینی ڕاستەوخۆ",themeSave:"پاشەکەوتکردنی ڕووکار",themeApplied:"ڕووکار پاشەکەوتکرا",themeReverted:"گەڕایەوە بۆ ڕووکاری پاشەکەوتکراو",themePreviewHeading:"سەرنوسراوێکی نموونە",themePreviewBody:"دەقی ناوەوە لەسەر ڕەنگی بنەڕەت، وەک چۆن لە ماڵپەڕ دەردەکەوێت.",themePreviewPrimary:"دوگمەی سەرەکی",themePreviewGhost:"دوگمەی شەفاف",themePreviewGold:"زێڕین ★★★★★",themePreviewPrice:"38$ · 49,750 د.ع",themePresetBerry:"بێری",themePresetChocolate:"چاکۆلێت",themePresetSage:"سەیج",themePresetRose:"گۆڵ",themePresetMidnight:"نیوەشەو",themeAutoDark:"چالاککردنی باری تاریکی خۆکار"}},ri={lang:"en",currency:"USD",category:"all",config:null,users:null,products:null,selectedProductId:null,pendingImageData:"",session:null,order:[],orderNote:"",orders:[],customerNotes:{},appliedPromoCode:"",trayBreakdownOpen:!1,activePanelTab:"brand",authTargetRole:"admin",searchQuery:"",searchDebounceTimer:null,sortOption:"popular",priceRange:"any",historyDetailsOpen:{},selectedStaffCustomerId:null,customerSearchQuery:"",customerSortOption:"lastOrder",draftLogo:null,_logoUrlDebounce:null,generateId(){return"item_"+Date.now()+"_"+Math.floor(Math.random()*1e3)},init(){this.loadState(),this.initFirebaseSync(),this.parseUrlHash(),this.applyTheme(this.config.theme.tokens),this.applyFonts(),this.applyPreferences(),this.renderAll(),this.updateFavicon(),this.bindEvents(),this.setupIntersectionObserver()},initFirebaseSync(){if(!Te)return;bs(Kt(Te,"config","main"),t=>{if(t.exists()){const s=t.data();JSON.stringify(this.config)!==JSON.stringify(s)&&(this.config=s,localStorage.setItem(ve.CONFIG,JSON.stringify(this.config)),this.applyTheme(this.config.theme.tokens),this.applyFonts(),this.renderAll())}},t=>wt(t,Dt.GET,"config/main")),bs(Wi(Te,"products"),t=>{t.empty||(this.products=t.docs.map(s=>s.data()),localStorage.setItem(ve.PRODUCTS,JSON.stringify(this.products)),this.renderAll())},t=>wt(t,Dt.GET,"products"));let n,e;be&&WC(be,t=>{var s,r;n&&(n(),n=null),e&&(e(),e=null),t&&(["qaessafty@gmail.com","yumy.swets@gmail.com"].includes(t.email.toLowerCase())||["admin","dev","staff"].includes((r=(s=this.session)==null?void 0:s.user)==null?void 0:r.role)?(n=bs(Wi(Te,"users"),o=>{o.empty||(this.users=o.docs.map(a=>a.data()),localStorage.setItem(ve.USERS,JSON.stringify(this.users)),this.renderAll())},o=>wt(o,Dt.GET,"users")),e=bs(Wi(Te,"orders"),o=>{o.empty||(this.orders=o.docs.map(a=>a.data()),localStorage.setItem(ve.ORDERS,JSON.stringify(this.orders)),this.renderAll())},o=>wt(o,Dt.GET,"orders"))):(n=bs(Kt(Te,"users",t.uid),o=>{if(o.exists()){const a=o.data(),c=this.users.findIndex(u=>u.id===t.uid);c>-1?this.users[c]=a:this.users.push(a),localStorage.setItem(ve.USERS,JSON.stringify(this.users)),this.renderAll()}},o=>wt(o,Dt.GET,"users")),e=bs(PI(Wi(Te,"orders"),RI("customerId","==",t.uid)),o=>{o.empty||(this.orders=o.docs.map(a=>a.data()),localStorage.setItem(ve.ORDERS,JSON.stringify(this.orders)),this.renderAll())},o=>wt(o,Dt.GET,"orders"))))})},loadState(){try{this.config=JSON.parse(localStorage.getItem(ve.CONFIG))||JSON.parse(JSON.stringify(pn))}catch{this.config=JSON.parse(JSON.stringify(pn))}this.config&&this.config.shopName&&(this.config.shopName.en==="Sweet Crumb"||!this.config.shopName.en)&&(this.config.shopName.en="Yummy Sweets",this.config.shopName.ku="یامی سویتس",this.config.aboutUs&&this.config.aboutUs.en&&this.config.aboutUs.en.includes("Sweet Crumb")&&(this.config.aboutUs.en=this.config.aboutUs.en.replace(/Sweet Crumb/g,"Yummy Sweets")),this.config.aboutUs&&this.config.aboutUs.ku&&this.config.aboutUs.ku.includes("سویت کرەمب")&&(this.config.aboutUs.ku=this.config.aboutUs.ku.replace(/سویت کرەمب/g,"یامی سویتس")),this.config.contact&&this.config.contact.email==="hello@sweetcrumb.com"&&(this.config.contact.email="hello@yummysweets.com"),this.saveConfig()),!this.config.socials||typeof this.config.socials!="object"?this.config.socials=JSON.parse(JSON.stringify(pn.socials)):this.config.socials={...JSON.parse(JSON.stringify(pn.socials)),...this.config.socials},this.config&&(this.config.kurdishBodyFont||(this.config.kurdishBodyFont="Vazirmatn"),this.config.kurdishDisplayFont||(this.config.kurdishDisplayFont="Vazirmatn"),this.config.theme||(this.config.theme={presetId:"berry",tokens:qe.berry.tokens}),this.config.faq||(this.config.faq=[...pn.faq]),this.config.reviews||(this.config.reviews=[...pn.reviews]),this.config.logoMode||(this.config.logoMode=this.config.logoImage?"image":this.config.logoImageUrl?"url":"emoji"),this.config.logoEmoji||(this.config.logoEmoji="🎂"),typeof this.config.logoImage!="string"&&(this.config.logoImage=""),typeof this.config.logoUrl!="string"&&(this.config.logoUrl=this.config.logoImageUrl||""),!this.config.logoImageUrl&&this.config.logoUrl&&(this.config.logoImageUrl=this.config.logoUrl),!this.config.economy||typeof this.config.economy!="object"?this.config.economy=JSON.parse(JSON.stringify(ts)):this.config.economy={...ts,...this.config.economy},typeof this.config.iqdRate=="number"&&this.config.iqdRate>0&&(!this.config.economy.exchangeRate||this.config.economy.exchangeRate===1310)&&(this.config.economy.exchangeRate=this.config.iqdRate));try{this.users=JSON.parse(localStorage.getItem(ve.USERS))||JSON.parse(JSON.stringify(Yi))}catch{this.users=JSON.parse(JSON.stringify(Yi))}let n=Array.isArray(this.users)&&this.users.find(e=>e.email&&e.email.toLowerCase()==="yumy.swets@gmail.com"||e.username&&(e.username.toLowerCase()==="yumy.swets"||e.username.toLowerCase()==="yumy.swets@gmail.com"));n?(n.email="yumy.swets@gmail.com",n.role="admin",n.password||(n.password="YummyAdmin2026!"),n.username||(n.username="yumy.swets")):(Array.isArray(this.users)||(this.users=JSON.parse(JSON.stringify(Yi))),this.users.push({id:"dmfw78AEPYW1htK7rgqptaFRqs03",username:"yumy.swets",email:"yumy.swets@gmail.com",password:"YummyAdmin2026!",name:"Yummy Sweets Admin",role:"admin"}),this.saveUsers());try{this.products=JSON.parse(localStorage.getItem(ve.PRODUCTS))||JSON.parse(JSON.stringify(Za))}catch{this.products=JSON.parse(JSON.stringify(Za))}if(Array.isArray(this.products)){const e=new Map(Za.map(s=>[s.id,s]));let t=!1;this.products.forEach(s=>{typeof s.img!="string"&&(s.img=""),!s.img.trim()&&e.has(s.id)&&(s.img=e.get(s.id).img||"",t=!0)}),t&&this.saveProducts(),!this.selectedProductId&&this.products.length>0&&(this.selectedProductId=this.products[0].id,this.pendingImageData=this.products[0].img||"")}try{this.session=JSON.parse(localStorage.getItem(ve.SESSION))||null}catch{this.session=null}try{this.orders=JSON.parse(localStorage.getItem(ve.ORDERS))||[]}catch{this.orders=[]}try{this.customerNotes=JSON.parse(localStorage.getItem(ve.CUSTOMER_NOTES))||{}}catch{this.customerNotes={}}try{const e=JSON.parse(localStorage.getItem(ve.PREF));e&&(e.lang&&(this.lang=e.lang),e.currency&&(this.currency=e.currency))}catch{this.lang="en",this.currency="USD"}},saveConfig(){localStorage.setItem(ve.CONFIG,JSON.stringify(this.config)),Te&&kI(Kt(Te,"config","main"),this.config).catch(n=>wt(n,Dt.WRITE,"config/main"))},saveUsers(){if(localStorage.setItem(ve.USERS,JSON.stringify(this.users)),Te){const n=Xa(Te);this.users.forEach(e=>n.set(Kt(Te,"users",e.id),e)),n.commit().catch(e=>wt(e,Dt.WRITE,"users"))}},saveOrders(){if(localStorage.setItem(ve.ORDERS,JSON.stringify(this.orders)),Te){const n=Xa(Te);this.orders.forEach(e=>n.set(Kt(Te,"orders",e.id),e)),n.commit().catch(e=>wt(e,Dt.WRITE,"orders"))}},saveCustomerNotes(){localStorage.setItem(ve.CUSTOMER_NOTES,JSON.stringify(this.customerNotes))},saveProducts(){try{if(localStorage.setItem(ve.PRODUCTS,JSON.stringify(this.products)),Te){const n=Xa(Te);this.products.forEach(e=>n.set(Kt(Te,"products",e.id),e)),n.commit().catch(e=>wt(e,Dt.WRITE,"products"))}return!0}catch(n){return console.error("Storage quota error:",n),this.showToast(this.t("storageQuotaError"),"error"),!1}},saveSession(){this.session?localStorage.setItem(ve.SESSION,JSON.stringify(this.session)):localStorage.removeItem(ve.SESSION)},savePref(){localStorage.setItem(ve.PREF,JSON.stringify({lang:this.lang,currency:this.currency}))},t(n){return(el[this.lang]||el.en)[n]||el.en[n]||n},esc(n){return String(n??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},getEconomy(){return this._draftEconomy||this.config&&this.config.economy||ts},formatPrice(n,e=null){const t=this.getEconomy(),s=e||this.currency,r=t.showSecondary!==!1&&t.secondaryCurrency&&t.secondaryCurrency!=="None";if(s!=="USD"&&r){const i=Number(t.exchangeRate)>0?Number(t.exchangeRate):this.config.iqdRate||1310,o=Number(n||0)*i,a=parseInt(t.roundingRule,10)||250;let c=o;a>1?c=Math.round(o/a)*a:c=Math.round(o*100)/100;const u=t.currencySymbol||(t.secondaryCurrency==="IQD"?"د.ع":t.secondaryCurrency);return a>1?new Intl.NumberFormat("en-US").format(c)+" "+u:u+" "+c.toFixed(2)}return"$"+Number(n||0).toFixed(2)},setLanguage(n){this.lang!==n&&(this.lang=n,this.savePref(),this.applyPreferences(),this.renderAll())},setCurrency(n){this.currency!==n&&(this.currency=n,this.savePref(),this.applyPreferences(),this.renderMenu(),this.renderTray())},applyPreferences(){const n=document.documentElement,e=this.lang==="ku";n.dir=e?"rtl":"ltr",n.lang=e?"ckb":"en",this.applyFonts();const t=this.getEconomy(),s=t.showSecondary!==!1&&t.secondaryCurrency&&t.secondaryCurrency!=="None";!s&&this.currency!=="USD"&&(this.currency="USD");const r=document.getElementById("headerCurrencySwitcher");r&&(r.style.display=s?"inline-flex":"none");const i=document.getElementById("mobileCurrencySwitcher");i&&(i.style.display=s?"inline-flex":"none"),this.currency!=="USD"&&s?document.body.classList.add("cur-secondary","cur-iqd"):document.body.classList.remove("cur-secondary","cur-iqd"),["btnLangEn","btnLangEnMobile"].forEach(c=>{const u=document.getElementById(c);u&&u.classList.toggle("is-active",!e)}),["btnLangKu","btnLangKuMobile"].forEach(c=>{const u=document.getElementById(c);u&&u.classList.toggle("is-active",e)});const o=t.currencySymbol||(t.secondaryCurrency==="IQD"?"د.ع":t.secondaryCurrency),a=`${t.secondaryCurrency} ${o}`;["btnCurIqd","btnCurIqdMobile"].forEach(c=>{const u=document.getElementById(c);u&&(u.textContent=a,u.classList.toggle("is-active",this.currency!=="USD"))}),["btnCurUsd","btnCurUsdMobile"].forEach(c=>{const u=document.getElementById(c);u&&u.classList.toggle("is-active",this.currency==="USD")}),this.updatePriceFilterLabels()},renderAll(){this.renderI18nStatic(),this.renderBranding(),this.renderMenu(),this.renderTray(),this.updateAuthUI(),this.renderWatermark(),this.renderFAQ(),this.renderReviews()},renderFAQ(){const n=document.getElementById("faqWrap");if(!n)return;const e=this.lang==="ku",t=this.config&&this.config.faq?this.config.faq:[];if(t.length===0){document.getElementById("faq").style.display="none";return}else document.getElementById("faq").style.display="block";n.innerHTML=t.map(s=>`
      <details class="faq-item">
        <summary class="faq-summary">${e&&s.q.ku||s.q.en}</summary>
        <div class="faq-content">
          ${e&&s.a.ku||s.a.en}
        </div>
      </details>
    `).join("")},renderReviews(){const n=document.getElementById("reviewsGrid");if(!n)return;const e=this.lang==="ku",t=this.config&&this.config.reviews?this.config.reviews:[];if(t.length===0){document.getElementById("reviews").style.display="none";return}else document.getElementById("reviews").style.display="block";n.innerHTML=t.map(s=>`
      <div class="review-card">
        <div class="stars">★★★★★</div>
        <p class="review__quote">${e&&s.quote.ku||s.quote.en}</p>
        <div class="review__author">
          <div class="review__avatar">${s.initials}</div>
          <div>
            <strong style="display:block;font-size:0.92rem;">${e&&s.name.ku||s.name.en}</strong>
            <span class="text-small" style="color:var(--muted);">${e&&s.role.ku||s.role.en}</span>
          </div>
        </div>
      </div>
    `).join("")},renderI18nStatic(){document.querySelectorAll("[data-i18n]").forEach(e=>{const t=e.getAttribute("data-i18n"),s=this.t(t);s&&(s.includes("<")&&s.includes(">")?e.innerHTML=s:e.textContent=s)}),document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>{const t=e.getAttribute("data-i18n-placeholder"),s=this.t(t);s&&e.setAttribute("placeholder",s)})},updatePriceFilterLabels(){const n=document.getElementById("menuPriceSelect");if(n){const e=n.querySelector('option[value="under-20"]'),t=n.querySelector('option[value="20-40"]'),s=n.querySelector('option[value="40-60"]'),r=n.querySelector('option[value="over-60"]'),i=this.lang==="ku",o=a=>this.formatPrice(a).replace(/\.00$/,"");e&&(e.textContent=i?`کەمتر لە ${o(20)}`:`Under ${o(20)}`),t&&(t.textContent=`${o(20)} – ${o(40)}`),s&&(s.textContent=`${o(40)} – ${o(60)}`),r&&(r.textContent=i?`زیاتر لە ${o(60)}`:`Over ${o(60)}`)}},normalizeKurdish(n){return n?String(n).toLowerCase().replace(/[\u064B-\u065F\u0670]/g,"").replace(/[يى]/g,"ی").replace(/ك/g,"ک").replace(/ه/g,"ە").trim():""},highlightMatch(n,e){if(!e||!n)return n;const t=e.trim().split(/\s+/).filter(Boolean);if(t.length===0)return n;let s=String(n);return t.forEach(r=>{try{const i=r.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),o=new RegExp(`(${i})`,"gi");s=s.replace(o,'<mark class="search-highlight">$1</mark>')}catch{}}),s},handleSearchInput(n){clearTimeout(this.searchDebounceTimer);const e=document.getElementById("menuSearchClear");e&&(e.style.display=n.trim()?"block":"none"),this.searchDebounceTimer=setTimeout(()=>{this.searchQuery=n,this.updateUrlHash(),this.renderMenu(!1)},150)},clearSearch(){this.searchQuery="";const n=document.getElementById("menuSearchInput");n&&(n.value="");const e=document.getElementById("menuSearchClear");e&&(e.style.display="none"),this.updateUrlHash(),this.renderMenu(!1)},clearAllFilters(){this.searchQuery="",this.category="all",this.sortOption="popular",this.priceRange="any";const n=document.getElementById("menuSearchInput");n&&(n.value="");const e=document.getElementById("menuSearchClear");e&&(e.style.display="none");const t=document.getElementById("menuSortSelect");t&&(t.value="popular");const s=document.getElementById("menuPriceSelect");s&&(s.value="any");const r=document.getElementById("mobileCategorySelect");r&&(r.value="all"),["all","cakes","cupcakes","desserts"].forEach(i=>{const o=document.getElementById(`filter-${i}`);o&&o.classList.toggle("is-active",i==="all")}),this.updateUrlHash(),this.renderMenu(!1)},setSort(n){this.sortOption=n;const e=document.getElementById("menuSortSelect");e&&(e.value=n),this.updateUrlHash(),this.renderMenu(!0)},setPriceRange(n){this.priceRange=n;const e=document.getElementById("menuPriceSelect");e&&(e.value=n),this.updateUrlHash(),this.renderMenu(!1)},setCategory(n){this.category=n,["all","cakes","cupcakes","desserts"].forEach(t=>{const s=document.getElementById(`filter-${t}`);s&&s.classList.toggle("is-active",t===n)});const e=document.getElementById("mobileCategorySelect");e&&(e.value=n),this.updateUrlHash(),this.renderMenu(!1)},parseUrlHash(){const n=window.location.hash||"";if(n.startsWith("#menu?")||n.startsWith("#menu")){const e=n.indexOf("?");if(e!==-1){const t=new URLSearchParams(n.substring(e+1));t.has("q")&&(this.searchQuery=t.get("q")||""),t.has("cat")&&(this.category=t.get("cat")||"all"),t.has("sort")&&(this.sortOption=t.get("sort")||"popular"),t.has("range")&&(this.priceRange=t.get("range")||"any");const s=document.getElementById("menuSearchInput");if(s){s.value=this.searchQuery;const a=document.getElementById("menuSearchClear");a&&(a.style.display=this.searchQuery?"block":"none")}const r=document.getElementById("menuSortSelect");r&&(r.value=this.sortOption);const i=document.getElementById("menuPriceSelect");i&&(i.value=this.priceRange);const o=document.getElementById("mobileCategorySelect");o&&(o.value=this.category),["all","cakes","cupcakes","desserts"].forEach(a=>{const c=document.getElementById(`filter-${a}`);c&&c.classList.toggle("is-active",a===this.category)})}}},updateUrlHash(){const n=new URLSearchParams;this.searchQuery&&this.searchQuery.trim()&&n.set("q",this.searchQuery.trim()),this.category&&this.category!=="all"&&n.set("cat",this.category),this.sortOption&&this.sortOption!=="popular"&&n.set("sort",this.sortOption),this.priceRange&&this.priceRange!=="any"&&n.set("range",this.priceRange);const e=n.toString(),t=e?`#menu?${e}`:"#menu";window.location.hash!==t&&history.replaceState(null,"",t)},renderMenu(n=!1){const e=document.getElementById("menuGrid");if(!e)return;const t=this.lang==="ku";let s=this.products.filter(o=>this.category==="all"||o.category===this.category);this.priceRange==="under-20"?s=s.filter(o=>o.priceUSD<20):this.priceRange==="20-40"?s=s.filter(o=>o.priceUSD>=20&&o.priceUSD<=40):this.priceRange==="40-60"?s=s.filter(o=>o.priceUSD>=40&&o.priceUSD<=60):this.priceRange==="over-60"&&(s=s.filter(o=>o.priceUSD>60));const r=(this.searchQuery||"").trim();if(r){const o=r.split(/\s+/).map(a=>this.normalizeKurdish(a)).filter(Boolean);s=s.filter(a=>{var u,h,f,p;const c=[(u=a.name)==null?void 0:u.en,(h=a.desc)==null?void 0:h.en,(f=a.name)==null?void 0:f.ku,(p=a.desc)==null?void 0:p.ku,a.category,a.tag].map(g=>this.normalizeKurdish(g)).join(" ");return o.every(g=>c.includes(g))})}this.sortOption==="popular"?s.sort((o,a)=>{const c=o.tag==="bestseller"?1:0;return(a.tag==="bestseller"?1:0)-c}):this.sortOption==="newest"?s.sort((o,a)=>{const c=o.tag==="new"?1:0;return(a.tag==="new"?1:0)-c}):this.sortOption==="price-asc"?s.sort((o,a)=>o.priceUSD-a.priceUSD):this.sortOption==="price-desc"?s.sort((o,a)=>a.priceUSD-o.priceUSD):this.sortOption==="name-asc"&&s.sort((o,a)=>{const c=t&&o.name.ku||o.name.en,u=t&&a.name.ku||a.name.en;return c.localeCompare(u)});const i=document.getElementById("menuResultsCount");if(i&&(i.textContent=this.t("searchResultsCount").replace("{shown}",s.length).replace("{total}",this.products.length)),s.length===0){const o=r?this.t("searchNoResults").replace("{query}",r):this.t("searchNoResults").replace('"{query}"',"");e.innerHTML=`
        <div class="menu-empty-state">
          <div class="menu-empty-icon">🍰</div>
          <h3 class="menu-empty-title">${o}</h3>
          <p class="menu-empty-desc">${this.t("searchEmptyDesc")}</p>
          <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
            ${r?`<button type="button" class="btn btn--secondary btn--sm" onclick="app.clearSearch()">${this.t("searchClearSearch")}</button>`:""}
            <button type="button" class="btn btn--primary btn--sm" onclick="app.clearAllFilters()">${this.t("searchClearAll")}</button>
          </div>
        </div>
      `;return}e.innerHTML=s.map((o,a)=>{const c=t&&o.name.ku||o.name.en,u=t&&o.desc.ku||o.desc.en,h=r?this.highlightMatch(c,r):c,f=r?this.highlightMatch(u,r):u,p=t&&o.unit.ku||o.unit.en,g=this.formatPrice(o.priceUSD);let D="";o.tag==="bestseller"?D=`<span class="cake__tag cake__tag--bestseller">${this.t("tagBestseller")}</span>`:o.tag==="new"&&(D=`<span class="cake__tag cake__tag--new">${this.t("tagNew")}</span>`);const M=!!(o.img&&o.img.trim())?`<img src="${o.img}" alt="${c}" loading="lazy" referrerpolicy="no-referrer" class="cake-card__img" onerror="this.style.display='none';if(this.nextElementSibling)this.nextElementSibling.style.display='flex';" /><div class="cake-card__emoji" style="display:none;" aria-label="${c}">${o.emoji||"🎂"}</div>`:`<div class="cake-card__emoji" aria-label="${c}">${o.emoji||"🎂"}</div>`,O=n?"cake-card-animate":"",H=n?`style="--stagger:${a%12};"`:"";return`
        <article class="cake-card ${O}" id="product-${o.id}" ${H}>
          <div class="cake-card__media">
            ${M}
            ${D}
            <span class="cake-card__count" data-count-for="${o.id}" hidden></span>
          </div>
          <div class="cake-card__body">
            <h3 class="cake-card__title">${h}</h3>
            <p class="cake-card__desc">${f}</p>
            <div class="cake-card__footer">
              <div class="price-wrap">
                <span class="price">${g}</span>
                <span class="price-unit">${p}</span>
              </div>
              <button class="btn btn--primary btn--sm" onclick="app.openCustomizeModal('${o.id}')" aria-label="${this.t("btnAdd")} ${c}">
                ${this.t("btnAdd")}
              </button>
            </div>
          </div>
        </article>
      `}).join(""),this.syncMenuOrderState()},syncMenuOrderState(){const n=new Map;for(const e of this.order||[])e.qty>0&&n.set(e.productId,(n.get(e.productId)||0)+e.qty);document.querySelectorAll(".cake-card__count[data-count-for]").forEach(e=>{const t=n.get(e.dataset.countFor)||0,s=e.closest(".cake-card");s&&s.classList.toggle("is-in-order",t>0),e.hidden=t===0,e.textContent=t>0?this.t("inOrderCount").replace("{n}",t):""})},getShopName(){return!this.config||!this.config.shopName?"Yummy Sweets":this.lang==="ku"?this.config.shopName.ku||this.config.shopName.en:this.config.shopName.en},resolveLogoSrc(){const n=this.config;if(!n)return null;const e=n.logoMode||(n.logoImage?"image":n.logoImageUrl?"url":"emoji");return e==="image"&&n.logoImage&&n.logoImage.trim()!==""?n.logoImage:e==="url"&&(n.logoUrl||n.logoImageUrl)&&(n.logoUrl||n.logoImageUrl).trim()!==""?n.logoUrl||n.logoImageUrl:null},updateFavicon(){const n=this.resolveLogoSrc();let e=document.querySelector('link[rel="icon"]');if(e||(e=document.createElement("link"),e.rel="icon",document.head.appendChild(e)),n)e.href=n;else{const s=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="16" fill="#8E3B4A"/><text x="32" y="46" font-size="38" text-anchor="middle">${this.config&&this.config.logoEmoji||"🎂"}</text></svg>`;e.href="data:image/svg+xml;utf8,"+encodeURIComponent(s)}},renderLogoElements(){const n=this.resolveLogoSrc(),e=this.config&&this.config.logoEmoji||"🎂",t=this.getShopName();document.querySelectorAll("[data-logo]").forEach(r=>{r.style.opacity="0",setTimeout(()=>{n?r.innerHTML=`<img src="${n}" alt="${t}" class="logo__img" onerror="this.onerror=null;this.parentElement.textContent='${e}';" />`:r.textContent=e,r.style.opacity="1"},50)})},renderBranding(){const n=this.config,e=this.lang==="ku",t=this.getShopName(),s=e&&n.tagline.ku||n.tagline.en,r=e&&n.announcement.ku||n.announcement.en,i=e&&n.aboutUs.ku||n.aboutUs.en,o=e&&n.contact.address.ku||n.contact.address.en,a=e&&n.contact.hours.ku||n.contact.hours.en;document.title=`${t} — ${s}`;const c=document.getElementById("headerShopName");c&&(c.textContent=t);const u=document.getElementById("footerShopName");u&&(u.textContent=t);const h=document.getElementById("mobileShopName");h&&(h.textContent=t);const f=document.getElementById("copyrightName");f&&(f.textContent=t);const p=document.getElementById("copyrightYear");p&&(p.textContent=new Date().getFullYear());const g=document.getElementById("headerShopTagline");g&&(g.textContent=s),this.renderLogoElements(),this.updateFavicon();const D=document.getElementById("announcementText");D&&(D.innerHTML=r);const R=document.getElementById("storyText");R&&(R.textContent=i);const M=e?n.aboutUs.eyebrowKu||n.aboutUs.eyebrowEn||"کەلەپووری ئێمە":n.aboutUs.eyebrowEn||"Our Heritage",O=e?n.aboutUs.titleKu||n.aboutUs.titleEn||"بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە":n.aboutUs.titleEn||"Crafted with patience, baked with devotion",H=n.aboutUs.imageUrl||"https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80",Z=document.querySelector('[data-i18n="storyEyebrow"]');Z&&(Z.textContent=M);const ae=document.querySelector('[data-i18n="storyTitle"]');ae&&(ae.textContent=O);const oe=document.querySelector(".story__img");oe&&(oe.src=H);const se=document.getElementById("infoAddress");se&&(se.textContent=o);const w=document.getElementById("infoHours");w&&(w.innerHTML=a.replace(/\n/g,"<br/>"));const C=document.getElementById("infoContact");C&&(C.innerHTML=`WhatsApp: +${n.contact.whatsapp}<br/>${n.contact.email}<br/>${n.contact.phone}`);const _=document.getElementById("footerHours");_&&(_.innerHTML=a.replace(/\n/g,"<br/>"));const A=document.getElementById("footerPhone");A&&(A.textContent=n.contact.phone);const I=n.socials||{};[["socialInsta",I.instagram],["socialFb",I.facebook],["socialTiktok",I.tiktok],["socialSnap",I.snapchat]].forEach(([S,v])=>{const Oe=document.getElementById(S);if(!Oe)return;const it=(v||"").trim(),Jn=it!==""&&it!=="#";Oe.href=Jn?it:"#",Oe.style.display=Jn?"":"none"})},addToOrder(n,e=[]){const t=this.order.find(s=>s.productId===n&&s.exclude.join("|")===e.join("|"));t?t.qty++:this.order.push({id:this.generateId(),productId:n,qty:1,exclude:[...e]}),this.renderTray(),this.showToast(this.t("toastAdded"),"success")},openCustomizeModal(n){const e=this.products.find(o=>o.id===n);if(!e)return;if(!e.exclusions||e.exclusions.length===0){this.addToOrder(n);return}const t=document.createElement("div");t.className="modal-overlay is-open",t.style.zIndex="1000";const s=this.lang==="ku",r=s&&e.name.ku||e.name.en;let i=`
      <div class="modal-window" style="max-width:400px; padding: 24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
          <h2 style="font-family:var(--font-serif); font-size: 1.2rem; color:var(--cocoa); margin:0;">${this.t("customizeTitle")||"Customize"}</h2>
          <button class="modal-close" style="background:none;border:none;font-size:1.5rem;cursor:pointer;color:var(--muted);" onclick="this.closest('.modal-overlay').remove()">×</button>
        </div>
        <h4 style="font-family:var(--font-serif);margin-top:0;margin-bottom:12px;color:var(--ink);">${r}</h4>
        <p style="font-weight:600;margin-bottom:12px;color:var(--cocoa-soft);">${this.t("customizeLeaveOut")||"Leave out"}:</p>
        <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:24px;">
    `;e.exclusions.forEach(o=>{const a=s&&o.ku||o.en;i+=`
        <label style="display:flex;align-items:center;gap:10px;cursor:pointer;color:var(--ink);">
          <input type="checkbox" class="customize-exclude-cb" value="${o.id}" style="width:18px;height:18px;" />
          <span>${a}</span>
        </label>
      `}),i+=`
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
          <button type="button" class="btn btn--ghost btn--sm" style="flex:1;" onclick="app.addToOrder('${n}'); this.closest('.modal-overlay').remove()">${this.t("customizeSkip")||"Skip — add as is"}</button>
          <button type="button" class="btn btn--primary btn--sm" style="flex:1;" onclick="
            const cbs = Array.from(this.closest('.modal-window').querySelectorAll('.customize-exclude-cb'));
            const excludes = cbs.filter(cb => cb.checked).map(cb => cb.value);
            app.addToOrder('${n}', excludes);
            this.closest('.modal-overlay').remove();
          ">${this.t("customizeAdd")||"Add to order"}</button>
        </div>
      </div>
    `,t.innerHTML=i,document.body.appendChild(t)},clearOrder(){this.order=[],this.orderNote="";const n=document.getElementById("trayOrderNote");n&&(n.value=""),this.appliedPromoCode="",this.trayBreakdownOpen=!1,this.renderTray(),this.showToast(this.t("toastOrderCleared"))},computeCartBreakdown(n=0,e=null,t=null){const s=t||this.getEconomy(),r=Math.max(0,Number(n)||0);let i=0,o="",a=!1,c=!1;const u=(e!==null?e:this.appliedPromoCode||"").trim().toUpperCase(),h=(s.promoCode||"").trim().toUpperCase();if(h&&u&&u===h){if(s.promoExpiry){const C=new Date(s.promoExpiry+"T23:59:59");!isNaN(C.getTime())&&new Date>C&&(c=!0)}if(!c){a=!0,o=h;const C=Math.max(0,Number(s.promoValue)||0);s.promoType==="percent"?i=Math.min(r,r*C/100):i=Math.min(r,C)}}let f=0;const p=!!s.pickupOnly;let g=!1;const D=Math.max(0,Number(s.deliveryFee)||0),R=Math.max(0,Number(s.freeDeliveryOver)||0);p?f=0:R===0||r>=R?(f=0,g=!0):f=D;let M=0;const O=Math.min(30,Math.max(0,Number(s.taxRate)||0)),H=Math.max(0,r-i),Z=(s.taxLabel||"VAT").trim();s.taxEnabled&&!s.taxIncluded&&O>0&&(M=H*O/100);const ae=Math.max(0,r-i+f+M),oe=Math.max(0,Number(s.minimumOrder)||0),se=oe===0||r>=oe,w=se?0:Math.max(0,oe-r);return{subtotal:r,discount:i,promoCodeName:o,promoValid:a,promoExpired:c,delivery:f,isPickupOnly:p,isFreeDelivery:g,deliveryFeeConfig:D,freeDeliveryOverConfig:R,tax:M,taxRate:O,taxLabel:Z,taxEnabled:!!s.taxEnabled,taxIncluded:!!s.taxIncluded,total:ae,minOrder:oe,minOrderMet:se,minOrderRemaining:w}},toggleTrayBreakdown(){this.trayBreakdownOpen=!this.trayBreakdownOpen;const n=document.getElementById("trayBreakdown"),e=document.getElementById("btnTrayToggle"),t=document.getElementById("trayToggleLabel");n&&(n.style.display=this.trayBreakdownOpen?"flex":"none"),e&&e.setAttribute("aria-expanded",this.trayBreakdownOpen?"true":"false"),t&&(t.textContent=this.trayBreakdownOpen?this.t("trayDetailsClose"):this.t("trayDetails"))},applyCartPromo(){const n=document.getElementById("trayPromoInput");if(!n)return;const e=n.value.trim().toUpperCase();if(!e)return;const t=this.getEconomy(),s=(t.promoCode||"").trim().toUpperCase();if(!s||e!==s){this.showToast(this.t("invalidPromo"),"error");const i=document.getElementById("trayPromoFeedback");i&&(i.textContent="✕ Invalid promo code",i.style.color="#fca5a5");return}if(t.promoExpiry){const i=new Date(t.promoExpiry+"T23:59:59");if(!isNaN(i.getTime())&&new Date>i){this.showToast(this.t("promoExpired"),"error");const o=document.getElementById("trayPromoFeedback");o&&(o.textContent=`⚠️ ${this.t("promoExpired")}`,o.style.color="#fca5a5");return}}this.appliedPromoCode=s;const r=this.t("promoApplied").replace("{code}",s);this.showToast(r,"success"),this.renderTray()},removeCartPromo(){this.appliedPromoCode="",this.renderTray(),this.showToast(this.t("promoRemoved"),"info")},renderTray(){const n=document.getElementById("orderTray");if(!n)return;const e=this.lang==="ku",t=new Map(this.products.map(O=>[O.id,O]));let s=0,r=0;const i=[];for(const O of this.order)if(O.qty>0&&t.has(O.productId)){const H=t.get(O.productId);s+=O.qty,r+=H.priceUSD*O.qty;const Z=e&&H.name.ku||H.name.en;i.push(`${O.qty}× ${Z}`)}if(document.body.classList.toggle("has-order-tray",s>0),this.syncMenuOrderState(),s===0){n.classList.remove("is-visible"),this.trayBreakdownOpen=!1;const O=document.getElementById("trayBreakdown");O&&(O.style.display="none");return}n.classList.add("is-visible");const o=this.computeCartBreakdown(r),a=document.getElementById("trayOrderNote");a&&a.value!==this.orderNote&&(a.value=this.orderNote||"");const c=document.getElementById("trayItemCount");c&&(c.textContent=s);const u=document.getElementById("trayTotalPrice");u&&(u.textContent=this.formatPrice(o.total));const h=document.getElementById("trayPreviewText");h&&(h.textContent=i.join(", "));const f=document.getElementById("trayFreeDeliveryBadge");f&&(f.style.display=o.isFreeDelivery&&!o.isPickupOnly?"inline-block":"none");const p=document.getElementById("btnTrayWhatsApp"),g=document.getElementById("trayMinOrderNotice");if(o.minOrderMet)p&&(p.disabled=!1,p.classList.remove("is-disabled"),p.removeAttribute("title")),g&&(g.style.display="none",g.innerHTML="");else{const O=this.formatPrice(o.minOrder),H=this.formatPrice(o.minOrderRemaining),Z=this.t("minimumOrderWarning").replace("{amount}",O).replace("{remaining}",H);p&&(p.disabled=!0,p.classList.add("is-disabled"),p.title=Z),g&&(g.style.display="flex",g.innerHTML=`<span>⚠️</span> <span>${Z}</span>`)}const D=document.getElementById("trayBreakdownLines");if(D){let O="";O+=`<div class="tray-breakdown-row"><span>${this.t("subtotal")}</span><span>${this.formatPrice(o.subtotal)}</span></div>`,o.discount>0&&(O+=`<div class="tray-breakdown-row" style="color:#4ade80;"><span>${this.t("discount")} (${o.promoCodeName})</span><span>−${this.formatPrice(o.discount)}</span></div>`),o.isPickupOnly?O+=`<div class="tray-breakdown-row"><span>${this.t("economyDelivery")}</span><span>${e?"وەرگرتن لە چێشتخانە":"Pickup Only"}</span></div>`:o.isFreeDelivery?O+=`<div class="tray-breakdown-row"><span>${this.t("deliveryFee")}</span><span style="color:#4ade80;font-weight:700;">${this.t("freeDelivery")}</span></div>`:O+=`<div class="tray-breakdown-row"><span>${this.t("deliveryFee")}</span><span>${this.formatPrice(o.delivery)}</span></div>`,o.tax>0&&(O+=`<div class="tray-breakdown-row"><span>${this.t("tax")} (${o.taxLabel} ${o.taxRate}%)</span><span>+${this.formatPrice(o.tax)}</span></div>`),O+=`<div class="tray-breakdown-row tray-breakdown-row--total"><span>${this.t("total")}</span><span style="color:var(--berry);">${this.formatPrice(o.total)}</span></div>`,D.innerHTML=O}const R=document.getElementById("trayPromoArea");R&&(o.promoValid?R.innerHTML=`
          <div style="display:flex;align-items:center;justify-content:space-between;background:rgba(34,197,94,0.15);border:1px solid rgba(34,197,94,0.3);padding:6px 12px;border-radius:8px;font-size:0.82rem;">
            <span style="color:#4ade80;font-weight:600;">✓ ${this.t("promoApplied").replace("{code}",o.promoCodeName)}</span>
            <button type="button" class="btn btn--xs btn--ghost" style="padding:2px 6px;color:#fca5a5;border:none;" onclick="app.removeCartPromo()">✕ ${this.t("trayRemovePromo")}</button>
          </div>
        `:R.innerHTML=`
          <div class="tray-promo-row">
            <input type="text" id="trayPromoInput" class="tray-promo-input" placeholder="${this.t("trayPromoPlaceholder")}..." maxlength="20" onkeydown="if(event.key==='Enter'){event.preventDefault();app.applyCartPromo();}" />
            <button type="button" class="btn btn--xs btn--primary" id="btnApplyPromo" onclick="app.applyCartPromo()">${this.t("trayApplyPromo")}</button>
          </div>
          <div id="trayPromoFeedback" class="tray-promo-feedback"></div>
        `);const M=document.getElementById("trayGuestNotice");M&&(M.style.display=this.session?"none":"block")},checkoutWhatsApp(){const n=new Map(this.products.map(O=>[O.id,O])),e=this.lang==="ku",t=this.config,s=this.getEconomy(),r=e&&t.shopName.ku||t.shopName.en,i=[],o=[];let a=0;for(const O of this.order)if(O.qty>0&&n.has(O.productId)){const H=n.get(O.productId),Z=H.priceUSD*O.qty;a+=Z;const ae=e&&H.name.ku||H.name.en;let oe=`• ${O.qty} × ${ae} — ${Z.toFixed(2)}`;if(O.exclude&&O.exclude.length>0){const se=O.exclude.map(C=>{if(H.exclusions){const _=H.exclusions.find(A=>A.id===C);if(_)return e&&_.ku||_.en}return C}),w=this.t("waExclude")||"No";oe+=`
   ${w} ${se.join(" · "+w+" ")}`}i.push(oe),o.push({productId:H.id,qty:O.qty,exclude:O.exclude||[],nameSnapshot:ae,usdSnapshot:H.priceUSD})}if(i.length===0)return;const c=this.computeCartBreakdown(a),u=document.getElementById("trayFulfillmentDate"),h=u?u.value:"";if(u&&!h){this.showToast("Please select a requested delivery/pickup date.","warning"),u.focus();return}if(!c.minOrderMet){const O=this.formatPrice(c.minOrder),H=this.formatPrice(c.minOrderRemaining),Z=this.t("minimumOrderWarning").replace("{amount}",O).replace("{remaining}",H);this.showToast(Z,"warning");return}const f=[];if(f.push(`${this.t("subtotal")}: $${c.subtotal.toFixed(2)}`),c.discount>0){const O=c.promoCodeName?` (${c.promoCodeName})`:"";f.push(`${this.t("discount")}${O}: −$${c.discount.toFixed(2)}`)}c.isPickupOnly?f.push(`${this.t("fieldPickupOnly")}: ${e?"وەرگرتن لە چێشتخانە":"Pickup available"}`):c.isFreeDelivery?f.push(`${this.t("deliveryFee")}: ${this.t("freeDelivery")}`):c.delivery>0&&f.push(`${this.t("deliveryFee")}: $${c.delivery.toFixed(2)}`),c.tax>0&&f.push(`${this.t("tax")} (${c.taxLabel} ${c.taxRate}%): +$${c.tax.toFixed(2)}`),f.push("────────────────");let p=`${this.t("total")}: $${c.total.toFixed(2)}`;if(this.currency!=="USD"&&s.showSecondary!==!1&&s.secondaryCurrency&&s.secondaryCurrency!=="None"){const O=this.formatPrice(c.total);p=`${this.t("total")}: ${O} ($${c.total.toFixed(2)} USD)`}f.push(p);let g="";this.session&&this.session.user&&this.session.user.name&&(g=this.session.user.name);let D="";if(e?D=`سڵاو لە ${r}! دەمەوێت ئەم داواکارییە تۆمار بکەم:

${i.join(`
`)}

${f.join(`
`)}

ناوی کڕیار: ${g}
بەروار و کاتی گەیاندن: ${h}
ناونیشانی تەواو: `:D=`Hello ${r}! I'd like to place an order:

${i.join(`
`)}

${f.join(`
`)}

Customer Name: ${g}
Preferred Delivery Date/Time: ${h}
Delivery Address: `,this.orderNote&&(D+=`

${this.t("waNote")||"Note for the baker"}: ${this.orderNote}`),this.session&&this.session.user){const O=this.session.user,H={id:"ord_"+Date.now(),customerId:O.id||"u_"+Date.now(),customerName:O.name||O.username||"Customer",customerMobile:O.phone||O.mobile||"",createdAt:Date.now(),status:"pending",items:o,economy:{currency:this.currency,exchangeRate:Number(s.exchangeRate)||1310,subtotal:c.subtotal,discount:c.discount,deliveryFee:c.delivery,tax:c.tax,total:c.total,secondaryCurrency:s.secondaryCurrency||"IQD",roundingRule:s.roundingRule||250,currencySymbol:s.currencySymbol||"د.ع"},notes:"",deliveryDate:"",deliveryAddress:""};this.orders.unshift(H),this.saveOrders(),this.updateAuthUI()}const M=`https://wa.me/${(this.config.contact.whatsapp||xh).replace(/\D/g,"")}?text=${encodeURIComponent(D)}`;window.open(M,"_blank")},openWhatsAppDirect(){const n=(this.config.contact.whatsapp||xh).replace(/\D/g,""),e=this.lang==="ku",t=e?this.config.shopName.ku||this.config.shopName.en:this.config.shopName.en,s=e?`سڵاو ${t}! دەمەوێت پرسیار لەسەر کێکەکان بکەم.`:`Hello ${t}! I have an inquiry regarding your cakes.`;window.open(`https://wa.me/${n}?text=${encodeURIComponent(s)}`,"_blank")},updateAuthUI(){const n=document.getElementById("desktopAuthContainer"),e=document.getElementById("mobileAuthContainer");let t="";if(!this.session)t=`<button class="btn btn--primary btn--sm" onclick="app.openAuthModal()">${this.t("btnSignIn")}</button>`;else{const s=this.session.user,r=s.role==="admin"||s.role==="dev"||s.role==="staff",i=s.role==="customer",o=s.role==="dev"?"badge--dev":s.role==="admin"?"badge--admin":"badge--customer",a=this.getCustomerOrders(s.id,s.phone),c=i&&a.some(h=>Date.now()-h.createdAt<1440*60*1e3),u=i?`
        <button type="button" class="btn btn--ghost btn--sm my-orders-btn" onclick="app.openHistoryModal()">
          ${c?'<span class="order-badge-dot" title="Recent order active"></span>':""}
          <span>${this.t("myOrders")}</span>
        </button>
      `:"";t=`
        <div class="user-chip">
          <span class="badge ${o}">${s.role.toUpperCase()}</span>
          <span style="font-weight:600;">${s.name||s.username}</span>
          ${u}
          ${r?`<button class="btn btn--ghost btn--sm" style="padding:4px 8px;font-size:0.78rem;" onclick="app.openPanelModal()">${this.t("btnPanel")}</button>`:""}
          <button class="btn btn--ghost btn--sm" style="padding:4px 8px;font-size:0.78rem;" onclick="app.logout()" title="${this.t("btnLogout")}">✕</button>
        </div>
      `}n&&(n.innerHTML=t),e&&(e.innerHTML=t)},getCustomerOrders(n,e){return this.orders?this.orders.filter(t=>!!(n&&t.customerId===n||e&&t.customerMobile&&t.customerMobile.replace(/\D/g,"")===String(e).replace(/\D/g,""))):[]},openHistoryModal(){if(!this.session||!this.session.user){this.openAuthModal();return}const n=document.getElementById("historyModal");n&&n.classList.add("is-open"),this.renderCustomerHistory()},closeHistoryModal(){const n=document.getElementById("historyModal");n&&n.classList.remove("is-open")},toggleHistoryDetails(n){this.historyDetailsOpen[n]=!this.historyDetailsOpen[n],this.renderCustomerHistory()},reorderItems(n){const e=this.orders.find(r=>r.id===n);if(!e||!e.items||e.items.length===0)return;const t=new Map(this.products.map(r=>[r.id,r]));let s=0;if(e.items.forEach(r=>{if(t.has(r.productId)){const i=r.exclude||[],o=this.order.find(a=>a.productId===r.productId&&a.exclude.join("|")===i.join("|"));o?o.qty+=r.qty||1:this.order.push({id:this.generateId(),productId:r.productId,qty:r.qty||1,exclude:[...i]}),s+=r.qty||1}}),e.orderNote&&(this.orderNote=e.orderNote),s>0){this.closeHistoryModal(),this.renderTray();const r=this.t("orderAddedToTray").replace("{count}",s);this.showToast(r,"success")}else this.showToast(this.t("itemsNotAvailable"),"warning")},renderCustomerHistory(){if(!document.getElementById("historyModal"))return;const e=this.session?this.session.user:null;if(!e){this.closeHistoryModal();return}const t=this.lang==="ku",s=this.getCustomerOrders(e.id,e.phone),r=document.getElementById("historyModalTitle");r&&(r.textContent=this.t("myOrdersTitle"));const i=document.getElementById("historyModalSubtitle");if(i)if(s.length>0){const c=Math.min(...s.map(h=>h.createdAt||Date.now())),u=new Date(c).toLocaleDateString(t?"ku":"en-US",{month:"short",year:"numeric"});i.textContent=this.t("myOrdersSubtitle").replace("{count}",s.length).replace("{date}",u)}else i.textContent=this.t("myOrdersEmpty");const o=document.getElementById("historyCustomerStats");if(o)if(s.length>0){const c=s.length;let u=0;const h={};s.forEach(g=>{u+=g.economy&&typeof g.economy.total=="number"?g.economy.total:0,Array.isArray(g.items)&&g.items.forEach(D=>{const R=D.nameSnapshot||D.productId;h[R]=(h[R]||0)+(D.qty||1)})});let f="—",p=0;for(const[g,D]of Object.entries(h))D>p&&(p=D,f=g);o.style.display="grid",o.innerHTML=`
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t("myOrdersTotalOrders")}</span>
            <span class="history-stat-val">${c}</span>
          </div>
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t("myOrdersTotalSpent")}</span>
            <span class="history-stat-val">${this.formatPrice(u)}</span>
          </div>
          <div class="history-stat-card">
            <span class="history-stat-label">${this.t("myOrdersFavourite")}</span>
            <span class="history-stat-val" style="font-size:0.95rem;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" title="${f}">${f}</span>
          </div>
        `}else o.style.display="none",o.innerHTML="";const a=document.getElementById("historyOrdersList");if(a){if(s.length===0){a.innerHTML=`
        <div class="history-empty-state">
          <div class="history-empty-icon">📦</div>
          <h4 class="history-empty-title">${this.t("myOrdersEmpty")}</h4>
          <p class="history-empty-hint">${this.t("myOrdersEmptyHint")}</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.closeHistoryModal();document.getElementById('menu').scrollIntoView({behavior:'smooth'});">${this.t("myOrdersBrowse")}</button>
        </div>
      `;return}a.innerHTML=s.map(c=>{const u=new Date(c.createdAt).toLocaleDateString(t?"ku":"en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),h={pending:{label:this.t("orderStatusPending"),class:"history-badge--pending"},baking:{label:this.t("orderStatusBaking"),class:"history-badge--baking"},delivered:{label:this.t("orderStatusDelivered"),class:"history-badge--delivered"},cancelled:{label:this.t("orderStatusCancelled"),class:"history-badge--cancelled"}},f=h[c.status]||h.pending,p=c.economy||{},g=this.formatPrice(p.total||0),D=!!this.historyDetailsOpen[c.id],R=(c.items||[]).map(O=>`${O.qty}× ${O.nameSnapshot}`).join(", ");let M="";if(D){const O=(c.items||[]).map(Z=>`
          <div class="history-detail-row">
            <span>${Z.qty} × ${Z.nameSnapshot}</span>
            <span>$${((Z.usdSnapshot||0)*Z.qty).toFixed(2)}</span>
          </div>
        `).join("");let H="";p.subtotal!==void 0&&(H+=`<div class="history-detail-row" style="margin-top:6px;border-top:1px dashed var(--gold-border);padding-top:6px;"><span>${this.t("subtotal")}</span><span>${this.formatPrice(p.subtotal)}</span></div>`),p.discount>0&&(H+=`<div class="history-detail-row" style="color:#4ade80;"><span>${this.t("discount")}</span><span>−${this.formatPrice(p.discount)}</span></div>`),p.deliveryFee!==void 0&&(H+=`<div class="history-detail-row"><span>${this.t("deliveryFee")}</span><span>${p.deliveryFee===0?this.t("freeDelivery"):this.formatPrice(p.deliveryFee)}</span></div>`),p.tax>0&&(H+=`<div class="history-detail-row"><span>${this.t("tax")}</span><span>+${this.formatPrice(p.tax)}</span></div>`),H+=`<div class="history-detail-row history-detail-row--total"><span>${this.t("total")}</span><span>${g}</span></div>`,M=`
          <div class="history-order-details">
            <div class="history-items-breakdown">
              ${O}
              ${H}
            </div>
          </div>
        `}return`
        <article class="history-order-card">
          <div class="history-order-header">
            <div class="history-order-meta">
              <span class="history-order-id">#${c.id.slice(-6).toUpperCase()}</span>
              <span class="history-order-date">${u}</span>
            </div>
            <span class="history-badge ${f.class}">${f.label}</span>
          </div>
          <div class="history-order-summary">
            <p class="history-order-items-preview">${R}</p>
            <div class="history-order-price">${g}</div>
          </div>
          <div class="history-order-actions">
            <button type="button" class="btn btn--xs btn--ghost" onclick="app.toggleHistoryDetails('${c.id}')">
              ${D?"▲ Hide details":`▼ ${this.t("myOrdersDetails")}`}
            </button>
            <button type="button" class="btn btn--xs btn--primary" onclick="app.reorderItems('${c.id}')">
              🔄 ${this.t("myOrdersReorder")}
            </button>
          </div>
          ${M}
        </article>
      `}).join("")}},openAuthModal(){const n=document.getElementById("authModal");n&&n.classList.add("is-open")},closeAuthModal(){const n=document.getElementById("authModal");n&&n.classList.remove("is-open")},switchAuthTab(n){const e=document.getElementById("tabBtnCustomer"),t=document.getElementById("tabBtnAdmin"),s=document.getElementById("tabBtnDev"),r=document.getElementById("customerAuthForm"),i=document.getElementById("staffAuthForm");[e,t,s].forEach(o=>{o&&o.classList.remove("is-active")}),n==="customer"?(e&&e.classList.add("is-active"),r&&(r.style.display="block"),i&&(i.style.display="none"),this.authTargetRole="customer"):(n==="admin"&&t&&t.classList.add("is-active"),n==="dev"&&s&&s.classList.add("is-active"),r&&(r.style.display="none"),i&&(i.style.display="block"),this.authTargetRole=n)},async handleGoogleLogin(n){if(!be)return this.showToast("Google Auth not initialized","error");try{const t=(await py(be,new zt)).user;if(n==="customer"){let s=this.users.find(r=>r.id===t.uid);s||(s={id:t.uid,name:document.getElementById("custName").value.trim()||t.displayName||"Customer",phone:document.getElementById("custMobile").value.trim()||t.phoneNumber||"N/A",role:"customer",createdAt:Date.now()},this.users.push(s),this.saveUsers()),this.session={user:s,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast(this.t("loginSuccess")||"Logged in successfully!","success"),this.renderMenu()}else{const s=["qaessafty@gmail.com","yumy.swets@gmail.com"].includes(t.email.toLowerCase());let r=this.users.find(i=>i.id===t.uid);if(r){if(!["admin","dev","staff"].includes(r.role))return await Va(be),this.showToast("Access denied: You are registered as a customer.","error")}else if(s)r={id:t.uid,name:"Developer",role:"dev",createdAt:Date.now()},this.users.push(r),this.saveUsers();else return await Va(be),this.showToast("Access denied: You must be registered as staff.","error");this.session={user:r,expires:Date.now()+864e5*7},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast("Control panel access granted.","success"),this.renderAll()}}catch(e){console.error(e),this.showToast(e.message,"error")}},async handleCustomerSubmit(n){n.preventDefault();const e=document.getElementById("custMobile").value.trim(),t=document.getElementById("custName").value.trim();if(!e||!t)return this.showToast(this.t("errFillFields")||"Please enter phone and name.","error");const s="local_"+e.replace(/\D/g,"");let r=this.users.find(i=>i.phone===e);r||(r={id:s,name:t,phone:e,role:"customer",createdAt:Date.now()},this.users.push(r),be?this.saveUsers():localStorage.setItem("yummy_users",JSON.stringify(this.users))),this.session={user:r,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast(this.t("loginSuccess")||"Logged in successfully!","success"),this.renderMenu()},async handleStaffSubmit(n){n.preventDefault();const e=document.getElementById("staffUsername").value.trim(),t=document.getElementById("staffPassword").value.trim();if(!e||!t)return this.showToast(this.t("errFillFields")||"Please enter username and password.","error");const s=e.toLowerCase();if(be&&e.includes("@"))try{const o=(await jC(be,e,t)).user;let a=this.users.find(c=>c.id===o.uid||c.email&&c.email.toLowerCase()===s);a||(a={id:o.uid,username:s.split("@")[0],email:s,role:"admin",createdAt:Date.now()},this.users.push(a),this.saveUsers()),this.session={user:a,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast(this.t("loginSuccess")||"Logged in to Firebase successfully!","success"),this.renderMenu();return}catch(i){return console.error("Firebase email login failed:",i),this.showToast("Firebase Login Failed: "+i.message+" (Did you add this email to Firebase Authentication Users?)","error")}let r=Array.isArray(this.users)&&this.users.find(i=>(i.username&&i.username.toLowerCase()===s||i.email&&i.email.toLowerCase()===s||i.name&&i.name.toLowerCase()===s)&&i.password===t&&(i.role==="admin"||i.role==="dev"||i.role==="staff"));if(!r){if((s==="yumy.swets"||s==="yumy.swets@gmail.com")&&t==="YummyAdmin2026!"){let i={id:"dmfw78AEPYW1htK7rgqptaFRqs03",username:"yumy.swets",email:"yumy.swets@gmail.com",password:"YummyAdmin2026!",name:"Yummy Sweets Admin",role:"admin",createdAt:Date.now()};Array.isArray(this.users)||(this.users=JSON.parse(JSON.stringify(Yi)));const o=this.users.findIndex(a=>a.id===i.id||a.email&&a.email.toLowerCase()==="yumy.swets@gmail.com");o>-1?(this.users[o]={...this.users[o],...i},r=this.users[o]):(this.users.push(i),r=i),this.saveUsers(),this.session={user:r,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast(this.t("loginSuccess")||"Logged in successfully!","success"),this.renderAll();return}if(e==="admin"&&t==="admin"){const i={id:"local_admin",name:"Admin",role:"admin",createdAt:Date.now()};this.session={user:i,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast("Logged in as Admin locally","success"),this.renderAll();return}return this.showToast(this.t("toastInvalidLogin")||"Invalid login.","error")}this.session={user:r,expires:Date.now()+864e5},localStorage.setItem("yummy_session",JSON.stringify(this.session)),this.closeAuthModal(),this.showToast(this.t("loginSuccess")||"Logged in successfully!","success"),this.renderAll()},async logout(){be&&await Va(be).catch(console.error),this.session=null,this.saveSession(),this.updateAuthUI(),this.renderWatermark(),this.closePanelModal(),this.showToast(this.t("loggedOut"))},openPanelModal(){if(!this.session||!["admin","dev","staff"].includes(this.session.user.role)){this.openAuthModal();return}const n=document.getElementById("panelModal");n&&n.classList.add("is-open");const e=document.getElementById("panelUserBadge");e&&(e.textContent=this.session.user.role.toUpperCase(),e.className=`badge ${this.session.user.role==="dev"?"badge--dev":"badge--admin"}`),this.renderPanelSidebar(),this.renderPanelTab(this.activePanelTab)},openSubmitReviewModal(){document.getElementById("custReviewName").value="",document.getElementById("custReviewQuote").value="",document.getElementById("submitReviewModal").classList.add("is-open")},closeSubmitReviewModal(){document.getElementById("submitReviewModal").classList.remove("is-open")},submitCustomerReview(n){n.preventDefault();const e=document.getElementById("custReviewName").value.trim(),t=document.getElementById("custReviewQuote").value.trim();if(!e||!t)return;let s="AN";const r=e.split(" ").filter(Boolean);r.length>1?s=(r[0][0]+r[r.length-1][0]).toUpperCase():r.length===1&&(s=r[0].substring(0,2).toUpperCase()),this.config.reviews||(this.config.reviews=[]),this.config.reviews.push({initials:s,name:{en:e,ku:e},role:{en:"Customer",ku:"کڕیار"},quote:{en:t,ku:t}}),this.saveConfig(),this.renderReviews(),this.closeSubmitReviewModal(),this.showToast(this.t("toastSaved")||"Review submitted successfully","success")},closePanelModal(){this._draftEconomy&&(this._draftEconomy=null,this.applyEconomy()),this.activePanelTab==="theme"&&this.revertTheme();const n=document.getElementById("panelModal");n&&n.classList.remove("is-open")},renderPanelSidebar(){const n=document.getElementById("panelSidebar");if(!n)return;const e=this.session&&this.session.user&&this.session.user.role==="dev",t=this.session&&this.session.user&&this.session.user.role==="staff",s=t?this.session.user.permissions||[]:null,r=o=>`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${o}</svg>`,i=[{id:"brand",label:"Brand & Logo",icon:r('<circle cx="13.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" stroke="none"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" stroke="none"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>'),devOnly:!1},{id:"theme",label:this.t("tabTheme"),icon:r('<rect x="3" y="3" width="18" height="18" rx="4"/><rect x="7" y="7" width="5" height="5" rx="1"/><rect x="12" y="12" width="5" height="5" rx="1"/>'),devOnly:!1},{id:"about",label:"About Us",icon:r('<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>'),devOnly:!1},{id:"faq",label:"FAQ",icon:r('<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'),devOnly:!1},{id:"reviews",label:"Reviews",icon:r('<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>'),devOnly:!1},{id:"contact",label:"Contact",icon:r('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>'),devOnly:!1},{id:"socials",label:"Social Media",icon:r('<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>'),devOnly:!1},{id:"products",label:"Products",icon:r('<path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/>'),devOnly:!1},{id:"customers",label:this.t("tabCustomers")||"Customers",icon:r('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),devOnly:!1},{id:"economy",label:this.t("tabEconomy")||"Economy",icon:r('<circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/>'),devOnly:!1},{id:"fonts",label:this.t("tabFonts"),icon:r('<polyline points="4 7 4 4 20 4 20 7"/><line x1="9" x2="15" y1="20" y2="20"/><line x1="12" x2="12" y1="4" y2="20"/>'),devOnly:!1},{id:"users",label:"Users",icon:r('<path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5" fill="currentColor" stroke="none"/>'),devOnly:!1},{id:"data",label:"Data",icon:r('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>'),devOnly:!0}];n.innerHTML=i.filter(o=>!(o.devOnly&&!e||t&&!s.includes(o.id)||o.id==="users"&&t)).map(o=>`
        <button type="button" class="panel-tab-btn ${this.activePanelTab===o.id?"is-active":""}" onclick="app.switchPanelTab('${o.id}')">
          <span>${o.icon}</span>
          <span>${o.label}</span>
        </button>
      `).join("")},switchPanelTab(n){this.activePanelTab==="economy"&&n!=="economy"&&this._draftEconomy&&(this._draftEconomy=null,this.applyEconomy()),this.activePanelTab==="theme"&&n!=="theme"&&this.revertTheme(),this.activePanelTab=n,this.renderPanelSidebar(),this.renderPanelTab(n)},renderPanelTab(n){var r,i;const e=document.getElementById("panelContent");if(!e)return;const t=this.config,s=this.session&&this.session.user&&this.session.user.role==="dev";switch(n){case"theme":this.renderThemeTab(e);break;case"customers":this.renderCustomersTab(e);break;case"brand":this.draftLogo||this.initLogoDraft(),e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Brand & Announcement</h4>
          <form onsubmit="app.saveBrandSettings(event)">
            <div id="logoEditorContainer">
              ${this.getLogoEditorHtml()}
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Shop Name (English)</label>
                <input type="text" id="cfgShopNameEn" class="form-input" value="${t.shopName.en}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Shop Name (Kurdish)</label>
                <input type="text" id="cfgShopNameKu" class="form-input" value="${t.shopName.ku||""}" required />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Tagline (English)</label>
                <input type="text" id="cfgTaglineEn" class="form-input" value="${t.tagline.en}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Tagline (Kurdish)</label>
                <input type="text" id="cfgTaglineKu" class="form-input" value="${t.tagline.ku||""}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (English)</label>
              <input type="text" id="cfgAnnounceEn" class="form-input" value="${t.announcement.en.replace(/"/g,"&quot;")}" />
            </div>
            <div class="form-group">
              <label class="form-label">Announcement Bar (Kurdish)</label>
              <input type="text" id="cfgAnnounceKu" class="form-input" value="${(t.announcement.ku||"").replace(/"/g,"&quot;")}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"about":e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Our Story & Heritage</h4>
          <form onsubmit="app.saveAboutSettings(event)">
            <div class="form-group">
              <label class="form-label">Image URL</label>
              <input type="text" id="cfgAboutImage" class="form-input" value="${t.aboutUs.imageUrl||"https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=900&auto=format&fit=crop&q=80"}" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (EN)</label>
                <input type="text" id="cfgAboutEyebrowEn" class="form-input" value="${t.aboutUs.eyebrowEn||"Our Heritage"}" />
              </div>
              <div class="form-group">
                <label class="form-label">Eyebrow / Subtitle (KU)</label>
                <input type="text" id="cfgAboutEyebrowKu" class="form-input" value="${t.aboutUs.eyebrowKu||"کەلەپووری ئێمە"}" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Main Title (EN)</label>
                <input type="text" id="cfgAboutTitleEn" class="form-input" value="${t.aboutUs.titleEn||"Crafted with patience, baked with devotion"}" />
              </div>
              <div class="form-group">
                <label class="form-label">Main Title (KU)</label>
                <input type="text" id="cfgAboutTitleKu" class="form-input" value="${t.aboutUs.titleKu||"بە ئارامگرتن ئامادە کراوە، بە خۆشەویستی برژاوە"}" />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (English)</label>
              <textarea id="cfgAboutEn" class="form-textarea" rows="5">${t.aboutUs.en}</textarea>
            </div>
            <div class="form-group">
              <label class="form-label">Our Story Text (Kurdish)</label>
              <textarea id="cfgAboutKu" class="form-textarea" rows="5">${t.aboutUs.ku||""}</textarea>
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"faq":const o=t.faq||[];e.innerHTML=`
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <h4 style="font-family:var(--font-serif); margin:0;">FAQ Editor</h4>
            <button type="button" class="btn btn--primary btn--sm" onclick="app.addFaqItem()">+ Add Question</button>
          </div>
          <form onsubmit="app.saveFaqSettings(event)" id="faqForm">
            <div id="faqItemsContainer" style="display:flex; flex-direction:column; gap:16px;">
              ${o.map((p,g)=>ri.getFaqItemHtml(p,g)).join("")}
            </div>
            <button type="submit" class="btn btn--primary" style="margin-top: 24px; width: 100%;">${this.t("btnSaveConfig")||"Save FAQ"}</button>
          </form>
        `;break;case"reviews":const a=t.reviews||[];e.innerHTML=`
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 16px;">
            <h4 style="font-family:var(--font-serif); margin:0;">Reviews Editor</h4>
            <div>
              <button type="button" class="btn btn--ghost btn--sm" onclick="app.resetReviews()" style="margin-right:8px;">↺ Reset Reviews</button>
              <button type="button" class="btn btn--primary btn--sm" onclick="app.addReviewItem()">+ Add Review</button>
            </div>
          </div>
          <form onsubmit="app.saveReviewSettings(event)" id="reviewForm">
            <div id="reviewItemsContainer" style="display:flex; flex-direction:column; gap:16px;">
              ${a.map((p,g)=>ri.getReviewItemHtml(p,g)).join("")}
            </div>
            <button type="submit" class="btn btn--primary" style="margin-top: 24px; width: 100%;">${this.t("btnSaveConfig")||"Save Reviews"}</button>
          </form>
        `;break;case"contact":e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Contact & Kitchen Information</h4>
          <form onsubmit="app.saveContactSettings(event)">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">WhatsApp Number (digits only, no +)</label>
                <input type="text" id="cfgWhatsapp" class="form-input" value="${t.contact.whatsapp}" required />
              </div>
              <div class="form-group">
                <label class="form-label">Display Phone</label>
                <input type="text" id="cfgPhone" class="form-input" value="${t.contact.phone}" required />
              </div>
            </div>
            <div class="form-group">
              <label class="form-label">Email</label>
              <input type="email" id="cfgEmail" class="form-input" value="${t.contact.email}" required />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Kitchen Address (English)</label>
                <textarea id="cfgAddressEn" class="form-textarea">${t.contact.address.en}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Kitchen Address (Kurdish)</label>
                <textarea id="cfgAddressKu" class="form-textarea">${t.contact.address.ku||""}</textarea>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Opening Hours (English)</label>
                <textarea id="cfgHoursEn" class="form-textarea">${t.contact.hours.en}</textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Opening Hours (Kurdish)</label>
                <textarea id="cfgHoursKu" class="form-textarea">${t.contact.hours.ku||""}</textarea>
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
              <input type="url" id="cfgInsta" class="form-input" value="${t.socials.instagram}" />
            </div>
            <div class="form-group">
              <label class="form-label">Facebook URL</label>
              <input type="url" id="cfgFb" class="form-input" value="${t.socials.facebook}" />
            </div>
            <div class="form-group">
              <label class="form-label">TikTok URL</label>
              <input type="url" id="cfgTiktok" class="form-input" value="${t.socials.tiktok}" />
            </div>
            <div class="form-group">
              <label class="form-label">Snapchat URL</label>
              <input type="url" id="cfgSnap" class="form-input" dir="ltr" value="${this.esc(t.socials.snapchat||"")}" />
            </div>
            <button type="submit" class="btn btn--primary">Save Changes</button>
          </form>
        `;break;case"products":(!this.selectedProductId||!this.products.some(p=>p.id===this.selectedProductId))&&(this.selectedProductId=this.products.length>0?this.products[0].id:null);const c=this.products.find(p=>p.id===this.selectedProductId);this.pendingImageData=c&&c.img||"",e.innerHTML=`
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
              ${this.products.map(p=>`
                <option value="${p.id}" ${p.id===this.selectedProductId?"selected":""}>
                  ${p.emoji||"🎂"} ${p.name.en} ($${p.priceUSD}) ${p.img?"📷":""}
                </option>
              `).join("")}
            </select>
          </div>
          <div id="productEditorArea">
            <!-- Injected by renderProductEditor -->
          </div>
        `,this.renderProductEditor();break;case"fonts":{const p=this.session&&this.session.user?this.session.user:null;if(!p||p.role!=="admin"&&p.role!=="dev"){e.innerHTML=`<p style="color:var(--muted);">${this.t("usersNoAccess")}</p>`;break}const g=(H,Z)=>H.map(ae=>`<option value="${ae.value}" ${Z===ae.value?"selected":""}>${ae.label}</option>`).join(""),D=t.kurdishBodyFont||"Vazirmatn",R=t.kurdishDisplayFont||"Vazirmatn",M=t.englishBodyFont||"DM Sans",O=t.englishDisplayFont||"Cormorant Garamond";e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t("tabFonts")}</h4>
          <form onsubmit="app.saveFontSettings(event)">
            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-bottom:8px;">Kurdish / Arabic Typography (RTL)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgKuBody">${this.t("fieldKurdishBody")}</label>
                <select id="cfgKuBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${g(Fh,D)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgKuDisplay">${this.t("fieldKurdishDisplay")}</label>
                <select id="cfgKuDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${g(Fh,R)}
                </select>
              </div>
            </div>

            <div style="font-size:0.9rem;font-weight:600;color:var(--berry);margin-top:16px;margin-bottom:8px;">English / Latin Typography (LTR)</div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label" for="cfgEnBody">${this.t("fieldEnglishBody")}</label>
                <select id="cfgEnBody" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${g(Mh,M)}
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cfgEnDisplay">${this.t("fieldEnglishDisplay")}</label>
                <select id="cfgEnDisplay" class="form-select" onchange="app.handleFontPreviewChange()">
                  ${g(Mh,O)}
                </select>
              </div>
            </div>

            <div id="fontPreviewMount">
              <div id="fontPreviewFrame" class="font-preview-frame" style="margin-top:24px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:rtl;text-align:right;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t("fontPreview")} (کوردی)</div>
                <h4 id="fontPreviewHeading" style="font-size:1.6rem;margin-bottom:10px;font-family:'${R}',serif;">کێکی تایبەت بۆ ئاهەنگەکەت</h4>
                <p id="fontPreviewBody" style="font-size:.95rem;color:var(--muted);line-height:1.9;font-family:'${D}',sans-serif;">
                  کێک و کاپکێک و شیرینی بە بچووکی لە چێشتخانەکەی خۆمان بە دەست دروست دەکرێن — بە کەرەی ڕاستەقینە و ڤانیلای ڕاستەقینە.
                </p>
              </div>

              <div id="fontPreviewFrameEn" class="font-preview-frame" style="margin-top:16px;padding:24px;background:var(--shell);border-radius:16px;border:1px solid var(--line);direction:ltr;text-align:left;">
                <div style="font-size:.72rem;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:var(--muted);margin-bottom:14px">${this.t("fontPreview")} (English)</div>
                <h4 id="fontPreviewHeadingEn" style="font-size:1.6rem;margin-bottom:10px;font-family:'${O}',serif;">Bespoke Celebration Cakes</h4>
                <p id="fontPreviewBodyEn" style="font-size:.95rem;color:var(--muted);line-height:1.6;font-family:'${M}',sans-serif;">
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
        `,this.addPhonePreviewToggle(document.getElementById("fontPreviewMount"),{frameId:"fontPreviewFrame",mountId:"fontPreviewMount"});break}case"economy":const u=this.config.economy||ts,h=u.lastUpdatedRate?new Date(u.lastUpdatedRate).toLocaleDateString():"";e.innerHTML=`
          <div style="margin-bottom:20px;">
            <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;">
              <div>
                <h4 style="font-family:var(--font-serif);margin:0 0 4px 0;">${this.t("economyTitle")}</h4>
                <p style="font-size:0.86rem;color:var(--muted);margin:0;">${this.t("economyDesc")}</p>
              </div>
              <div style="display:flex;align-items:center;gap:8px;">
                <span id="rateTimestampBadge" style="font-size:0.75rem;color:var(--muted);">
                  ${h?`Rate updated: <span id="lastUpdatedRateText">${h}</span>`:""}
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
                      <span class="badge badge--admin economy-mobile-role-badge" style="display:none;font-size:0.68rem;padding:2px 6px;">${(((i=(r=this.session)==null?void 0:r.user)==null?void 0:i.role)||"admin").toUpperCase()}</span>
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
                        <option value="IQD" ${u.secondaryCurrency==="IQD"?"selected":""}>IQD — Iraqi Dinar</option>
                        <option value="EUR" ${u.secondaryCurrency==="EUR"?"selected":""}>EUR — Euro</option>
                        <option value="TRY" ${u.secondaryCurrency==="TRY"?"selected":""}>TRY — Turkish Lira</option>
                        <option value="AED" ${u.secondaryCurrency==="AED"?"selected":""}>AED — UAE Dirham</option>
                        <option value="None" ${u.secondaryCurrency==="None"?"selected":""}>None (USD Only)</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row" style="align-items:center;">
                    <div class="form-group">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                        <input type="checkbox" id="cfgShowSecondary" ${u.showSecondary!==!1?"checked":""} />
                        <span>${this.t("fieldShowSecondary")}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgCurrencySymbol">${this.t("fieldCurrencySymbol")}</label>
                      <input type="text" id="cfgCurrencySymbol" class="form-input" value="${(u.currencySymbol||"د.ع").replace(/"/g,"&quot;")}" maxlength="8" />
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
                      <input type="number" id="cfgExchangeRate" class="form-input" value="${u.exchangeRate||1310}" min="1" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:2px;">1 USD = X in secondary currency</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgRoundingRule">${this.t("fieldRoundingRule")}</label>
                      <select id="cfgRoundingRule" class="form-select">
                        <option value="250" ${parseInt(u.roundingRule,10)===250?"selected":""}>${this.t("roundNearest250")}</option>
                        <option value="500" ${parseInt(u.roundingRule,10)===500?"selected":""}>${this.t("roundNearest500")}</option>
                        <option value="1000" ${parseInt(u.roundingRule,10)===1e3?"selected":""}>${this.t("roundNearest1000")}</option>
                        <option value="1" ${parseInt(u.roundingRule,10)===1?"selected":""}>${this.t("roundNearest1")}</option>
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
                      <input type="number" id="cfgDeliveryFee" class="form-input" value="${u.deliveryFee??8}" min="0" step="0.5" inputmode="decimal" required />
                      <span id="deliveryZeroNote" style="display:none;font-size:0.76rem;color:#16a34a;font-weight:600;margin-top:3px;">${this.t("deliveryFreeForEveryone")}</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgFreeDeliveryOver">${this.t("fieldFreeDeliveryOver")}</label>
                      <input type="number" id="cfgFreeDeliveryOver" class="form-input" value="${u.freeDeliveryOver??60}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = all-order free delivery</span>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgMinimumOrder">${this.t("fieldMinimumOrder")}</label>
                      <input type="number" id="cfgMinimumOrder" class="form-input" value="${u.minimumOrder??0}" min="0" step="1" inputmode="numeric" required />
                      <span style="font-size:0.75rem;color:var(--muted);margin-top:3px;">0 = no minimum order</span>
                    </div>
                  </div>

                  <!-- Inline Amber Warning if Free Delivery is lower than Min Order -->
                  <div id="freeDeliveryWarn" class="eco-warning-box" style="display:none;" role="alert" aria-live="polite">
                    <span>⚠️</span> <span>${this.t("freeDeliveryWarning")}</span>
                  </div>

                  <div style="padding-top:4px;">
                    <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:600;font-size:0.88rem;">
                      <input type="checkbox" id="cfgPickupOnly" ${u.pickupOnly?"checked":""} />
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
                        <input type="checkbox" id="cfgTaxEnabled" ${u.taxEnabled?"checked":""} />
                        <span>${this.t("fieldTaxEnabled")}</span>
                      </label>
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxRate">${this.t("fieldTaxRate")}</label>
                      <input type="number" id="cfgTaxRate" class="form-input" value="${u.taxRate??0}" min="0" max="30" step="0.1" inputmode="decimal" />
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgTaxLabel">${this.t("fieldTaxLabel")}</label>
                      <input type="text" id="cfgTaxLabel" class="form-input" value="${(u.taxLabel||"VAT").replace(/"/g,"&quot;")}" maxlength="15" />
                    </div>
                    <div class="form-group" style="display:flex;align-items:center;padding-top:24px;">
                      <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.88rem;">
                        <input type="checkbox" id="cfgTaxIncluded" ${u.taxIncluded!==!1?"checked":""} />
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
                      <input type="text" id="cfgPromoCode" class="form-input" value="${(u.promoCode||"").replace(/"/g,"&quot;")}" placeholder="e.g. YUMMY10" maxlength="20" style="text-transform:uppercase;" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoType">${this.t("fieldPromoType")}</label>
                      <select id="cfgPromoType" class="form-select">
                        <option value="percent" ${u.promoType==="percent"?"selected":""}>${this.t("promoPercent")}</option>
                        <option value="fixed" ${u.promoType==="fixed"?"selected":""}>${this.t("promoFixed")}</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoValue">${this.t("fieldPromoValue")}</label>
                      <input type="number" id="cfgPromoValue" class="form-input" value="${u.promoValue??0}" min="0" step="1" inputmode="decimal" />
                    </div>
                    <div class="form-group">
                      <label class="form-label" for="cfgPromoExpiry">${this.t("fieldPromoExpiry")}</label>
                      <input type="date" id="cfgPromoExpiry" class="form-input" value="${u.promoExpiry||""}" />
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
        `,this.updateEconomyPreview();break;case"users":this.renderUsersTab(e);break;case"data":if(!s)return;const f={config:this.config,products:this.products,users:this.users};e.innerHTML=`
          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">Backup, Import & Factory Reset</h4>
          <div class="form-group">
            <label class="form-label">Export / Import Shop State (JSON)</label>
            <textarea id="dataJsonBox" class="form-textarea" style="font-family:monospace;font-size:0.8rem;min-height:160px;">${JSON.stringify(f,null,2)}</textarea>
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
            <h5 style="color:#b91c1c;font-weight:700;margin-bottom:6px;">Danger Zone: Factory Reset</h5>
            <p style="font-size:0.85rem;color:var(--muted);margin-bottom:12px;">Clears all custom products, configs, and user accounts. Restores default factory state.</p>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.factoryReset()">Reset All Data to Default</button>
          </div>
        `;break}},renderThemeTab(n){if(!n)return;const e=this.config.theme?this.config.theme.presetId:"berry",t=this.config.theme&&this.config.theme.mode||"light";let s="";Object.keys(qe).forEach(r=>{const i=qe[r],o=i.tokens;s+=`
        <div class="theme-preset-card ${r===e?"active":""}" onclick="app.previewTheme('${r}')">
          <div style="font-weight:600;font-size:0.95rem;color:var(--ink);">${i.label[this.lang]}</div>
          <div class="theme-swatches">
            <div class="theme-swatch" style="background:${o.cream}"></div>
            <div class="theme-swatch" style="background:${o.berry}"></div>
            <div class="theme-swatch" style="background:${o.ink}"></div>
            <div class="theme-swatch" style="background:${o.gold}"></div>
            <div class="theme-swatch" style="background:${o.blush}"></div>
          </div>
        </div>
      `}),n.innerHTML=`
      <div class="theme-panel-layout">
        <div>
          <div style="margin-bottom: 20px;">
            <div style="font-size:0.85rem;font-weight:600;color:var(--muted);margin-bottom:8px;">Appearance Mode</div>
            <div class="switch-group" style="display:inline-flex;">
              <button type="button" class="switch-btn ${t!=="dark"?"is-active":""}" onclick="app.setThemeMode('light')">☀️ Light</button>
              <button type="button" class="switch-btn ${t==="dark"?"is-active":""}" onclick="app.setThemeMode('dark')">🌙 Dark</button>
            </div>
          </div>

          <h4 style="font-family:var(--font-serif);margin-bottom:16px;">${this.t("themePresetTitle")}</h4>
          <div class="theme-presets" style="margin-bottom:24px;">
            ${s}
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
    `,this.addPhonePreviewToggle(document.getElementById("themePreviewMount"),{frameId:"themePreviewCard",mountId:"themePreviewMount"})},previewTheme(n){if(!qe[n])return;this.applyTheme(qe[n].tokens);const e=document.querySelectorAll(".theme-preset-card");e.forEach(s=>s.classList.remove("active"));const t=qe[n].label[this.lang];e.forEach(s=>{s.querySelector("div").textContent===t&&s.classList.add("active")}),this._previewThemeId=n},saveTheme(){const n=this._previewThemeId||(this.config.theme?this.config.theme.presetId:"berry");if(!qe[n])return;const e=document.getElementById("cfgAutoDark")?document.getElementById("cfgAutoDark").checked:this.config.theme?this.config.theme.autoDark:!1,t=this.config.theme&&this.config.theme.mode||"light";this.config.theme={presetId:n,tokens:qe[n].tokens,mode:t,autoDark:e},this.saveConfig(),this.applyTheme(this.config.theme.tokens),this.showToast(this.t("themeApplied"),"success"),this._previewThemeId=null,this.renderThemeTab(document.getElementById("panelContent"))},toggleAutoDark(n){this.config.theme&&(this.config.theme.autoDark=n,this.saveConfig(),this.applyTheme(this.config.theme.tokens),this.showToast(this.t("toastSaved"),"success"))},revertTheme(){if(this._previewThemeId){document.body.style.transition="background-color 0.3s ease, color 0.3s ease";const n=this.config.theme?this.config.theme.presetId:"berry";qe[n]&&this.applyTheme(qe[n].tokens),this._previewThemeId=null,setTimeout(()=>{document.body.style.transition=""},300),this.showToast(this.t("themeReverted"))}},renderUsersTab(n){if(!n)return;const e=this.session&&this.session.user?this.session.user:null;if(!e||e.role!=="admin"&&e.role!=="dev"){n.innerHTML=`<p style="color:var(--muted);">${this.t("usersNoAccess")}</p>`;return}const t=(this.userSearchQuery||"").toLowerCase().trim();let s=(this.users||[]).slice();t&&(s=s.filter(a=>a.name&&a.name.toLowerCase().includes(t)||a.username&&a.username.toLowerCase().includes(t)||a.phone&&a.phone.includes(t)));const r={dev:0,admin:1,staff:2,customer:3};s.sort((a,c)=>(r[a.role]??9)-(r[c.role]??9)||(a.name||"").localeCompare(c.name||""));const i=a=>!(e.id===a.id||e.username===a.username||a.role==="dev"&&e.role!=="dev"||a.role==="admin"&&e.role!=="dev"),o=s.length===0?`<tr><td colspan="5" style="text-align:center;padding:28px;color:var(--muted);">${this.t("usersEmpty")}</td></tr>`:s.map(a=>{const c=e.id===a.id||e.username===a.username,u=a.role==="dev"?"badge--dev":a.role==="admin"?"badge--admin":a.role==="staff"?"badge--staff":"badge--customer",h=Array.isArray(a.permissions)&&a.permissions.length?a.permissions.map(f=>this.t("perm_"+f)||f).join(", "):"—";return`
            <tr>
              <td><span class="badge ${u}">${this.t("role_"+a.role)||String(a.role).toUpperCase()}</span></td>
              <td><strong>${this.esc(a.name||"—")}</strong></td>
              <td dir="ltr">${this.esc(a.username||a.phone||"—")}</td>
              <td style="color:var(--muted);">${a.password?"••••••••":this.t("usersNoPassword")}</td>
              <td style="max-width:180px;">${a.role==="staff"?`<span class="user-perms">${this.esc(h)}</span>`:'<span class="user-perms">—</span>'}</td>
              <td style="text-align:right;white-space:nowrap;">
                ${a.role==="staff"||a.role!=="dev"&&i(a)?`
                  <button type="button" class="btn btn--secondary btn--xs" onclick="app.editUser('${a.id}')">${this.t("usersEdit")}</button>
                `:""}
                ${a.password&&i(a)?`
                  <button type="button" class="btn btn--secondary btn--xs" onclick="app.resetUserPassword('${a.id}')">${this.t("usersResetPw")}</button>
                `:""}
                ${i(a)?`
                  <button type="button" class="btn btn--ghost btn--xs user-delete-btn" onclick="app.deleteUser('${a.id}')">${this.t("usersDelete")}</button>
                `:c?`<span class="user-self-hint">${this.t("usersYou")}</span>`:""}
              </td>
            </tr>
          `}).join("");n.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
        <h4 style="font-family:var(--font-serif);margin:0;">${this.t("usersTitle")} (${s.length})</h4>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <input
            type="text"
            class="form-input"
            style="padding:6px 12px;font-size:0.85rem;width:190px;"
            placeholder="${this.t("usersSearch")}"
            value="${this.esc(this.userSearchQuery||"")}"
            oninput="app.handleUserSearch(this.value)"
          />
          <button type="button" class="btn btn--primary btn--sm" onclick="app.showAddStaffModal()">+ ${this.t("usersAddStaff")}</button>
        </div>
      </div>
      <p style="font-size:0.8rem;color:var(--muted);margin:0 0 12px 0;">${this.t("usersHint")}</p>
      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th>${this.t("usersColRole")}</th>
              <th>${this.t("usersColName")}</th>
              <th>${this.t("usersColLogin")}</th>
              <th>${this.t("usersColPassword")}</th>
              <th>${this.t("usersColPerms")}</th>
              <th style="text-align:right;">${this.t("usersColActions")}</th>
            </tr>
          </thead>
          <tbody>${o}</tbody>
        </table>
      </div>
    `},handleUserSearch(n){this.userSearchQuery=n;const e=document.getElementById("panelContent");if(e&&this.activePanelTab==="users"){this.renderUsersTab(e);const t=e.querySelector("input.form-input");if(t){t.focus();const s=t.value.length;t.setSelectionRange(s,s)}}},editUser(n){const e=(this.users||[]).find(i=>i.id===n);if(!e)return;const t=this.session&&this.session.user?this.session.user:null;if(t&&t.role==="admin"&&(e.role==="dev"||e.role==="admin"))return;const s=document.getElementById("editUserModal");if(!s)return;document.getElementById("editUserId").value=e.id,document.getElementById("editUserName").value=e.name||"",document.getElementById("editUserLogin").value=e.username||e.phone||"",document.getElementById("editUserPermsGroup").style.display=e.role==="staff"?"block":"none",s.querySelectorAll('input[name="editUserPerms"]').forEach(i=>{i.checked=Array.isArray(e.permissions)&&e.permissions.includes(i.value)}),s.classList.add("is-open")},submitEditUser(n){n.preventDefault();const e=document.getElementById("editUserId").value,t=(this.users||[]).find(o=>o.id===e);if(!t)return;const s=this.session&&this.session.user?this.session.user:null;if(s&&s.role==="admin"&&(t.role==="dev"||t.role==="admin"))return;t.name=document.getElementById("editUserName").value.trim()||t.name;const r=document.getElementById("editUserLogin").value.trim();if(r&&(t.role==="customer"?t.phone=r:t.username=r),t.role==="staff"){const o=[];document.querySelectorAll('#editUserModal input[name="editUserPerms"]:checked').forEach(a=>o.push(a.value)),t.permissions=o}this.saveUsers(),document.getElementById("editUserModal").classList.remove("is-open");const i=document.getElementById("panelContent");i&&this.activePanelTab==="users"&&this.renderUsersTab(i),this.showToast(this.t("toastSaved"),"success")},resetUserPassword(n){const e=(this.users||[]).find(o=>o.id===n);if(!e||!e.password)return;const t=this.session&&this.session.user?this.session.user:null;if(t&&t.role==="admin"&&(e.role==="dev"||e.role==="admin"))return;const s=prompt(this.t("usersNewPwPrompt").replace("{name}",e.name||e.username||""),"");if(s===null)return;const r=s.trim();if(r.length<4){this.showToast(this.t("staffPwTooShort")||"Password must be at least 4 characters.","error");return}e.password=r,this.saveUsers();const i=document.getElementById("panelContent");i&&this.activePanelTab==="users"&&this.renderUsersTab(i),this.showToast(this.t("toastSaved"),"success")},deleteUser(n){const e=this.session&&this.session.user?this.session.user:null,t=(this.users||[]).find(i=>i.id===n);if(!t)return;if(e&&(e.id===t.id||e.username===t.username)){this.showToast(this.t("usersCannotDeleteSelf"),"error");return}if(e&&e.role==="admin"&&(t.role==="dev"||t.role==="admin")){this.showToast(this.t("usersCannotDeleteElevated"),"error");return}const s=t.name||t.username||t.id;if(!confirm(this.t("usersConfirmDelete").replace("{name}",s)))return;this.users=this.users.filter(i=>i.id!==n),this.saveUsers(),Te&&Oh(Kt(Te,"users",n)).catch(i=>wt(i,Dt.DELETE,"users"));const r=document.getElementById("panelContent");r&&this.activePanelTab==="users"&&this.renderUsersTab(r),this.showToast(this.t("toastDeleted"),"success")},addPhonePreviewToggle(n,e){if(!n)return;const t=document.createElement("div");t.className="phone-preview-bar",t.setAttribute("role","group"),t.setAttribute("aria-label",this.t("phonePreviewLabel")),t.innerHTML=`
      <button type="button" class="phone-preview-btn is-active" data-phone-mode="desktop"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg> ${this.t("phonePreviewDesktop")}</button>
      <button type="button" class="phone-preview-btn" data-phone-mode="phone"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/></svg> ${this.t("phonePreviewPhone")}</button>
    `,n.parentNode.insertBefore(t,n),t.addEventListener("click",s=>{const r=s.target.closest(".phone-preview-btn");r&&this.setPhonePreviewMode(t,r.dataset.phoneMode,e)})},setPhonePreviewMode(n,e,t){if(!n)return;n.querySelectorAll(".phone-preview-btn").forEach(i=>i.classList.toggle("is-active",i.dataset.phoneMode===e));const s=document.getElementById(t.frameId),r=document.getElementById(t.mountId);if(!(!s||!r))if(e==="phone"){if(!s.classList.contains("phone-frame")){const i=document.createElement("div");i.className="phone-frame__notch",r.insertBefore(i,s),s.classList.add("phone-frame")}}else{const i=r.querySelector(":scope > .phone-frame__notch");i&&i.remove(),s.classList.remove("phone-frame")}},renderCustomersTab(n){if(!n)return;const e=new Map;(this.users||[]).filter(o=>o.role==="customer").forEach(o=>{e.set(o.id,{id:o.id,name:o.name||o.username||"Customer",phone:o.phone||o.mobile||"",createdAt:o.createdAt||Date.now(),orders:[]})}),(this.orders||[]).forEach(o=>{const a=o.customerId;e.has(a)?e.get(a).orders.push(o):e.set(a,{id:a,name:o.customerName||"Customer",phone:o.customerMobile||"",createdAt:o.createdAt||Date.now(),orders:[o]})});let t=Array.from(e.values());const s=(this.customerSearchQuery||"").toLowerCase().trim();s&&(t=t.filter(o=>o.name&&o.name.toLowerCase().includes(s)||o.phone&&o.phone.includes(s)));const r=this.customerSortOption||"lastOrder";r==="name"?t.sort((o,a)=>(o.name||"").localeCompare(a.name||"")):r==="lastOrder"?t.sort((o,a)=>{const c=o.orders.length>0?Math.max(...o.orders.map(h=>h.createdAt||0)):0;return(a.orders.length>0?Math.max(...a.orders.map(h=>h.createdAt||0)):0)-c}):r==="totalSpent"?t.sort((o,a)=>{const c=o.orders.reduce((h,f)=>h+(f.economy&&f.economy.total||0),0);return a.orders.reduce((h,f)=>h+(f.economy&&f.economy.total||0),0)-c}):r==="orderCount"&&t.sort((o,a)=>a.orders.length-o.orders.length);const i=t.length===0?`<tr><td colspan="6" style="text-align:center;padding:32px;color:var(--text-muted);">${this.t("customersEmpty")}</td></tr>`:t.map(o=>{const a=o.orders.reduce((h,f)=>h+(f.economy&&f.economy.total||0),0),c=o.orders.length,u=o.orders.length>0?new Date(Math.max(...o.orders.map(h=>h.createdAt||0))).toLocaleDateString(this.lang==="ku"?"ku":"en-US",{month:"short",day:"numeric",year:"numeric"}):"—";return`
            <tr>
              <td><strong>${o.name}</strong></td>
              <td>${o.phone||"—"}</td>
              <td><span class="badge badge--customer">${c}</span></td>
              <td style="font-weight:600;color:var(--berry);">${this.formatPrice(a)}</td>
              <td>${u}</td>
              <td>
                <button type="button" class="btn btn--xs btn--secondary" onclick="app.openCustomerDrawer('${o.id}')">
                  ${this.t("myOrdersDetails")}
                </button>
              </td>
            </tr>
          `}).join("");n.innerHTML=`
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:12px;">
        <h4 style="font-family:var(--font-serif);margin:0;">${this.t("tabCustomers")} (${t.length})</h4>
        <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <input 
            type="text" 
            class="form-input" 
            style="padding:6px 12px;font-size:0.85rem;width:200px;" 
            placeholder="${this.t("customersSearch")}" 
            value="${this.customerSearchQuery||""}"
            oninput="app.handleCustomerSearch(this.value)"
          />
          <select 
            class="form-select" 
            style="padding:6px 12px;font-size:0.85rem;"
            onchange="app.handleCustomerSort(this.value)"
          >
            <option value="lastOrder" ${r==="lastOrder"?"selected":""}>${this.t("customersSortLastOrder")}</option>
            <option value="totalSpent" ${r==="totalSpent"?"selected":""}>${this.t("customersSortTotalSpent")}</option>
            <option value="orderCount" ${r==="orderCount"?"selected":""}>${this.t("customersSortOrderCount")}</option>
            <option value="name" ${r==="name"?"selected":""}>${this.t("customersSortName")}</option>
          </select>
        </div>
      </div>

      <div class="panel-table-wrap">
        <table class="panel-table">
          <thead>
            <tr>
              <th>${this.t("customersSortName")}</th>
              <th>Phone</th>
              <th>${this.t("customerOrders")}</th>
              <th>${this.t("customerTotalSpent")}</th>
              <th>${this.t("customerLastOrder")}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${i}
          </tbody>
        </table>
      </div>
    `},handleCustomerSearch(n){this.customerSearchQuery=n;const e=document.getElementById("panelContent");e&&this.activePanelTab==="customers"&&this.renderCustomersTab(e)},handleCustomerSort(n){this.customerSortOption=n;const e=document.getElementById("panelContent");e&&this.activePanelTab==="customers"&&this.renderCustomersTab(e)},openCustomerDrawer(n){this.selectedStaffCustomerId=n;let e=document.getElementById("staffCustomerDrawer"),t=document.getElementById("staffCustomerBackdrop");e||(e=document.createElement("div"),e.id="staffCustomerDrawer",e.className="customer-drawer",document.body.appendChild(e)),t||(t=document.createElement("div"),t.id="staffCustomerBackdrop",t.className="customer-drawer-backdrop",t.onclick=()=>this.closeCustomerDrawer(),document.body.appendChild(t)),this.renderCustomerDrawerContent(),e.classList.add("is-open"),t.classList.add("is-open")},closeCustomerDrawer(){this.selectedStaffCustomerId=null;const n=document.getElementById("staffCustomerDrawer"),e=document.getElementById("staffCustomerBackdrop");n&&n.classList.remove("is-open"),e&&e.classList.remove("is-open")},updateOrderStatus(n,e){const t=this.orders.find(s=>s.id===n);if(t){t.status=e,this.saveOrders(),this.renderCustomerDrawerContent();const s=document.getElementById("panelContent");s&&this.activePanelTab==="customers"&&this.renderCustomersTab(s),this.showToast(this.t("orderStatusUpdated").replace("{status}",e),"success")}},saveCustomerPrivateNote(n,e){this.customerNotes[n]=e,this.saveCustomerNotes(),this.showToast(this.t("noteSaved"),"success")},renderCustomerDrawerContent(){const n=document.getElementById("staffCustomerDrawer");if(!n||!this.selectedStaffCustomerId)return;const e=this.selectedStaffCustomerId,t=(this.users||[]).find(u=>u.id===e),s=(this.orders||[]).filter(u=>u.customerId===e||t&&t.phone&&u.customerMobile===t.phone),r=t&&t.name||s.length>0&&s[0].customerName||"Customer",i=t&&t.phone||s.length>0&&s[0].customerMobile||"—",o=this.customerNotes[e]||"",a=s.reduce((u,h)=>u+(h.economy&&h.economy.total||0),0),c=s.length===0?`<div style="padding:20px;text-align:center;color:var(--text-muted);">${this.t("customerNoOrders")}</div>`:s.map(u=>{const h=new Date(u.createdAt).toLocaleDateString(this.lang==="ku"?"ku":"en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"}),f=(u.items||[]).map(g=>`${g.qty}× ${g.nameSnapshot} ($${((g.usdSnapshot||0)*g.qty).toFixed(2)})`).join("<br/>"),p=this.formatPrice(u.economy&&u.economy.total||0);return`
            <div style="background:var(--bg-glass);border:1px solid var(--gold-border);border-radius:10px;padding:12px;margin-bottom:12px;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span style="font-weight:700;font-size:0.85rem;">#${u.id.slice(-6).toUpperCase()}</span>
                <span style="font-size:0.75rem;color:var(--text-muted);">${h}</span>
              </div>
              <div style="font-size:0.85rem;line-height:1.5;margin-bottom:8px;">${f}</div>
              <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px dashed var(--gold-border);">
                <div style="font-weight:700;color:var(--berry);">${p}</div>
                <div style="display:flex;align-items:center;gap:6px;">
                  <label style="font-size:0.75rem;color:var(--text-muted);">${this.t("customerChangeStatus")}:</label>
                  <select class="form-select" style="padding:2px 8px;font-size:0.75rem;width:auto;" onchange="app.updateOrderStatus('${u.id}', this.value)">
                    <option value="pending" ${u.status==="pending"?"selected":""}>Pending</option>
                    <option value="baking" ${u.status==="baking"?"selected":""}>Baking</option>
                    <option value="delivered" ${u.status==="delivered"?"selected":""}>Delivered</option>
                    <option value="cancelled" ${u.status==="cancelled"?"selected":""}>Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          `}).join("");n.innerHTML=`
      <div class="customer-drawer-header">
        <div>
          <h3 style="margin:0;font-family:var(--font-serif);">${r}</h3>
          <p style="margin:4px 0 0;font-size:0.82rem;color:var(--text-muted);">${i} • ${s.length} orders • ${this.formatPrice(a)}</p>
        </div>
        <button type="button" class="btn btn--ghost btn--sm" onclick="app.closeCustomerDrawer()">✕</button>
      </div>
      <div class="customer-drawer-body">
        <div style="margin-bottom:20px;">
          <label class="form-label" style="font-weight:600;margin-bottom:6px;display:block;">${this.t("customerPrivateNote")}</label>
          <textarea 
            class="form-textarea" 
            rows="3" 
            placeholder="E.g. Prefers less sugar, regular customer..." 
            onchange="app.saveCustomerPrivateNote('${e}', this.value)"
          >${o}</textarea>
        </div>

        <h4 style="font-family:var(--font-serif);margin:0 0 12px;">${this.t("customerOrders")} (${s.length})</h4>
        ${c}
      </div>
    `},initLogoDraft(){const n=this.config||pn;let e=0;if(n.logoImage){const t=n.logoImage.length-(n.logoImage.indexOf(",")+1);e=Math.round(t*.75)}this.draftLogo={mode:n.logoMode||(n.logoImage?"image":n.logoUrl?"url":"emoji"),emoji:n.logoEmoji||"🎂",image:n.logoImage||"",url:n.logoUrl||n.logoImageUrl||"",imageBytes:e,isSvg:n.logoImage?n.logoImage.includes("image/svg"):!1,urlStatus:null,isReadyToSave:!1,fallback:!1}},getLogoEditorHtml(){this.draftLogo||this.initLogoDraft();const n=this.draftLogo,e=n.mode;let t="";const s=e==="image"&&!!(n.image&&n.image.trim()),r=e==="url"&&!!(n.url&&n.url.trim());n.fallback||e==="emoji"||!s&&!r?t=`<span class="logo-preview-emoji">${n.emoji||"🎂"}</span>`:e==="image"&&s?t=`<img src="${n.image}" class="logo-preview-img" alt="Logo preview" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`:e==="url"&&r&&(t=`<img src="${n.url}" class="logo-preview-img" alt="Logo preview" crossorigin="anonymous" onerror="app.handleLogoPreviewError()" onload="app.handleLogoPreviewSuccess()" />`);let i="";if(e==="emoji")i=`${this.t("logoModeEmoji")} · ${n.emoji||"🎂"}`;else if(e==="image"){const c=n.imageBytes>0?n.imageBytes>1024?Math.round(n.imageBytes/1024)+" KB":n.imageBytes+" B":"Active";i=`${this.t("logoModeUpload")} · ${c}`}else e==="url"&&(i=this.t("logoUrlLabel"));let o="";n.isReadyToSave?o=`<span class="logo-chip logo-chip--ready">✓ ${this.t("logoUploadReady")}</span>`:e==="url"&&n.urlStatus==="valid"?o=`<span class="logo-chip logo-chip--valid">✓ ${this.t("logoUrlValid")}</span>`:e==="url"&&n.urlStatus==="invalid"&&(o=`<span class="logo-chip logo-chip--error">✗ ${this.t("logoUrlInvalid")}</span>`);const a=e==="image"&&!!n.image||e==="url"&&!!n.url;return`
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
            <div class="logo-preview-box ${n.fallback?"is-fallback":""}" id="logoPreviewBox">
              ${t}
            </div>
            <div class="logo-preview-meta" id="logoPreviewMeta">${i}</div>
            ${o?`<div id="logoStatusChipArea">${o}</div>`:'<div id="logoStatusChipArea"></div>'}
            ${n.fallback?`<div class="logo-warning-note">${this.t("logoFallbackWarning")}</div>`:""}
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
                <input type="text" id="logoEmojiInput" class="form-input" maxlength="4" value="${(n.emoji||"🎂").replace(/"/g,"&quot;")}" oninput="app.handleLogoEmojiInput(this.value)" style="max-width:140px;font-size:1.3rem;text-align:center;" />
                <p style="font-size:0.78rem;color:var(--muted);margin:4px 0 8px 0;">${this.t("logoEmojiHint")}</p>
                <div class="quick-pick-emojis">
                  ${["🎂","🍰","🧁","🍩","🍪","🥐","🍫","☕"].map(c=>`
                    <button type="button" class="quick-pick-btn" onclick="app.selectQuickEmoji('${c}')" title="${c}" aria-label="Select ${c}">${c}</button>
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
                    <span>${n.image?this.t("logoReplaceBtn"):this.t("logoUploadBtn")}</span>
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
                <input type="url" id="logoUrlInput" class="form-input" dir="ltr" placeholder="https://..." value="${(n.url||"").replace(/"/g,"&quot;")}" oninput="app.handleLogoUrlInput(this.value)" />
                <p style="font-size:0.78rem;color:var(--muted);margin-top:4px;">${this.t("logoUrlHint")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `},updateLogoCardUI(){const n=document.getElementById("logoEditorContainer");n&&(n.innerHTML=this.getLogoEditorHtml())},setLogoMode(n){this.draftLogo||this.initLogoDraft(),this.draftLogo.mode=n,this.draftLogo.fallback=!1,this.updateLogoCardUI()},handleLogoEmojiInput(n){this.draftLogo||this.initLogoDraft(),this.draftLogo.emoji=n.trim()||"🎂",this.draftLogo.fallback=!1,this.updateLogoPreviewBox()},selectQuickEmoji(n){this.draftLogo||this.initLogoDraft(),this.draftLogo.emoji=n,this.draftLogo.fallback=!1;const e=document.getElementById("logoEmojiInput");e&&(e.value=n),this.updateLogoPreviewBox()},updateLogoPreviewBox(){const n=document.getElementById("logoPreviewBox"),e=document.getElementById("logoPreviewMeta"),t=this.draftLogo;!n||!t||t.mode==="emoji"&&(n.className="logo-preview-box",n.innerHTML=`<span class="logo-preview-emoji">${t.emoji||"🎂"}</span>`,e&&(e.textContent=`${this.t("logoModeEmoji")} · ${t.emoji||"🎂"}`))},async handleLogoFileUpload(n){const e=n.target.files&&n.target.files[0];if(e)try{const t=await KI(e);this.draftLogo||this.initLogoDraft(),this.draftLogo.image=t.dataUrl,this.draftLogo.imageBytes=t.approxBytes,this.draftLogo.isSvg=t.isSvg,this.draftLogo.mode="image",this.draftLogo.isReadyToSave=!0,this.draftLogo.fallback=!1,this.updateLogoCardUI(),this.showToast(this.t("toastPhotoReady")||"Logo ready to save","info")}catch(t){console.error("Logo upload error:",t),t.message==="FILE_TOO_LARGE"||t.message==="OUTPUT_TOO_LARGE"?this.showToast(this.t("logoUploadTooLarge"),"error"):this.showToast(this.t("logoUploadError"),"error")}finally{n.target.value=""}},handleLogoUrlInput(n){this.draftLogo||this.initLogoDraft();const e=n.trim();if(e.toLowerCase().startsWith("javascript:")||e.toLowerCase().startsWith("data:")){this.showToast(this.t("invalidUrl"),"error"),this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI();return}this.draftLogo.url=e,this.draftLogo.urlStatus=null,this.draftLogo.fallback=!1,this._logoUrlDebounce&&clearTimeout(this._logoUrlDebounce),this._logoUrlDebounce=setTimeout(()=>{if(!this.draftLogo.url){this.draftLogo.urlStatus=null,this.draftLogo.fallback=!1,this.updateLogoCardUI();return}const t=new Image;let s=!1;const r=setTimeout(()=>{s||(s=!0,this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI())},1500);t.onload=()=>{s||(s=!0,clearTimeout(r),this.draftLogo.urlStatus="valid",this.draftLogo.fallback=!1,this.updateLogoCardUI())},t.onerror=()=>{s||(s=!0,clearTimeout(r),this.draftLogo.urlStatus="invalid",this.draftLogo.fallback=!0,this.updateLogoCardUI())},t.crossOrigin="anonymous",t.src=this.draftLogo.url},300)},handleLogoPreviewError(){this.draftLogo&&(this.draftLogo.fallback=!0,this.updateLogoCardUI())},handleLogoPreviewSuccess(){this.draftLogo&&this.draftLogo.fallback&&(this.draftLogo.fallback=!1,this.updateLogoCardUI())},removeLogo(){this.draftLogo||this.initLogoDraft(),this.draftLogo.image="",this.draftLogo.url="",this.draftLogo.imageBytes=0,this.draftLogo.mode="emoji",this.draftLogo.fallback=!1,this.draftLogo.urlStatus=null,this.draftLogo.isReadyToSave=!1,this.updateLogoCardUI(),this.showToast(this.t("logoRemoved"),"info")},saveBrandSettings(n){if(n&&n.preventDefault(),this.config.shopName.en=document.getElementById("cfgShopNameEn").value.trim(),this.config.shopName.ku=document.getElementById("cfgShopNameKu").value.trim(),this.config.tagline.en=document.getElementById("cfgTaglineEn").value.trim(),this.config.tagline.ku=document.getElementById("cfgTaglineKu").value.trim(),this.config.announcement.en=document.getElementById("cfgAnnounceEn").value.trim(),this.config.announcement.ku=document.getElementById("cfgAnnounceKu").value.trim(),this.draftLogo){const e=this.draftLogo.emoji&&this.draftLogo.emoji.trim()||"🎂";this.config.logoMode=this.draftLogo.mode||"emoji",this.config.logoEmoji=e,this.config.logoImage=this.draftLogo.image||"",this.config.logoUrl=this.draftLogo.url||"",this.config.logoImageUrl=this.draftLogo.mode==="url"?this.draftLogo.url:this.draftLogo.mode==="image"?this.draftLogo.image:"",this.draftLogo.isReadyToSave=!1}this.saveConfig(),this.renderBranding(),this.showToast(this.t("toastSaved"),"success"),this.updateLogoCardUI()},saveAboutSettings(n){n.preventDefault(),this.config.aboutUs.en=document.getElementById("cfgAboutEn").value.trim(),this.config.aboutUs.ku=document.getElementById("cfgAboutKu").value.trim(),this.config.aboutUs.imageUrl=document.getElementById("cfgAboutImage").value.trim(),this.config.aboutUs.eyebrowEn=document.getElementById("cfgAboutEyebrowEn").value.trim(),this.config.aboutUs.eyebrowKu=document.getElementById("cfgAboutEyebrowKu").value.trim(),this.config.aboutUs.titleEn=document.getElementById("cfgAboutTitleEn").value.trim(),this.config.aboutUs.titleKu=document.getElementById("cfgAboutTitleKu").value.trim(),this.saveConfig(),this.renderBranding(),this.showToast(this.t("toastSaved"),"success")},getFaqItemHtml(n,e){return`
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeFaqItem(${e})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Question (EN)</label>
            <input type="text" class="form-input faq-q-en" value="${n.q.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Question (KU)</label>
            <input type="text" class="form-input faq-q-ku" value="${n.q.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Answer (EN)</label>
            <textarea class="form-input faq-a-en" required style="resize:vertical;min-height:60px;">${n.a.en}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Answer (KU)</label>
            <textarea class="form-input faq-a-ku" style="resize:vertical;min-height:60px;">${n.a.ku}</textarea>
          </div>
        </div>
      </div>
    `},addFaqItem(){this.config.faq||(this.config.faq=[]),this.config.faq.push({q:{en:"",ku:""},a:{en:"",ku:""}}),this.renderPanelTab("faq")},removeFaqItem(n){this.config.faq&&(this.config.faq.splice(n,1),this.renderPanelTab("faq"))},getReviewItemHtml(n,e){return`
      <div class="faq-editor-card" style="padding: 16px; border: 1px solid var(--line); border-radius: var(--radius-card); position: relative; background: var(--cream);">
        <button type="button" class="btn btn--xs btn--ghost" style="position:absolute; top:8px; right:8px; color:var(--berry);" onclick="app.removeReviewItem(${e})">✕ Remove</button>
        <div class="form-row">
          <div class="form-group" style="flex:0.3">
            <label class="form-label">Initials</label>
            <input type="text" class="form-input review-initials" value="${n.initials}" required maxlength="2" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Name (EN)</label>
            <input type="text" class="form-input review-name-en" value="${n.name.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Name (KU)</label>
            <input type="text" class="form-input review-name-ku" value="${n.name.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Role/Subtitle (EN)</label>
            <input type="text" class="form-input review-role-en" value="${n.role.en}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Role/Subtitle (KU)</label>
            <input type="text" class="form-input review-role-ku" value="${n.role.ku}" />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Quote (EN)</label>
            <textarea class="form-input review-quote-en" required style="resize:vertical;min-height:60px;">${n.quote.en}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Quote (KU)</label>
            <textarea class="form-input review-quote-ku" style="resize:vertical;min-height:60px;">${n.quote.ku}</textarea>
          </div>
        </div>
      </div>
    `},addReviewItem(){this.config.reviews||(this.config.reviews=[]),this.config.reviews.push({initials:"AN",name:{en:"Anonymous",ku:""},role:{en:"Customer",ku:""},quote:{en:"",ku:""}}),this.renderPanelTab("reviews")},removeReviewItem(n){this.config.reviews&&(this.config.reviews.splice(n,1),this.renderPanelTab("reviews"))},resetReviews(){confirm("Are you sure you want to reset all reviews to the default?")&&(this.config.reviews=JSON.parse(JSON.stringify(pn.reviews)),this.saveConfig(),this.renderReviews(),this.renderPanelTab("reviews"),this.showToast("Reviews reset successfully","success"))},saveReviewSettings(n){n.preventDefault(),this.config.reviews||(this.config.reviews=[]);const e=document.querySelectorAll(".review-initials"),t=document.querySelectorAll(".review-name-en"),s=document.querySelectorAll(".review-name-ku"),r=document.querySelectorAll(".review-role-en"),i=document.querySelectorAll(".review-role-ku"),o=document.querySelectorAll(".review-quote-en"),a=document.querySelectorAll(".review-quote-ku"),c=[];for(let u=0;u<e.length;u++)c.push({initials:e[u].value.trim(),name:{en:t[u].value.trim(),ku:s[u].value.trim()},role:{en:r[u].value.trim(),ku:i[u].value.trim()},quote:{en:o[u].value.trim(),ku:a[u].value.trim()}});this.config.reviews=c,this.saveConfig(),this.renderReviews(),this.showToast(this.t("toastSaved")||"Saved","success")},saveFaqSettings(n){n.preventDefault(),this.config.faq||(this.config.faq=[]);const e=document.querySelectorAll(".faq-q-en"),t=document.querySelectorAll(".faq-q-ku"),s=document.querySelectorAll(".faq-a-en"),r=document.querySelectorAll(".faq-a-ku"),i=[];for(let o=0;o<e.length;o++)i.push({q:{en:e[o].value.trim(),ku:t[o].value.trim()},a:{en:s[o].value.trim(),ku:r[o].value.trim()}});this.config.faq=i,this.saveConfig(),this.renderFAQ(),this.showToast(this.t("toastSaved")||"Saved","success")},saveContactSettings(n){n.preventDefault(),this.config.contact.whatsapp=document.getElementById("cfgWhatsapp").value.trim().replace(/\D/g,""),this.config.contact.phone=document.getElementById("cfgPhone").value.trim(),this.config.contact.email=document.getElementById("cfgEmail").value.trim(),this.config.contact.address.en=document.getElementById("cfgAddressEn").value.trim(),this.config.contact.address.ku=document.getElementById("cfgAddressKu").value.trim(),this.config.contact.hours.en=document.getElementById("cfgHoursEn").value.trim(),this.config.contact.hours.ku=document.getElementById("cfgHoursKu").value.trim(),this.saveConfig(),this.renderBranding(),this.showToast(this.t("toastSaved"),"success")},saveSocialSettings(n){n.preventDefault(),this.config.socials.instagram=document.getElementById("cfgInsta").value.trim(),this.config.socials.facebook=document.getElementById("cfgFb").value.trim(),this.config.socials.tiktok=document.getElementById("cfgTiktok").value.trim(),this.config.socials.snapchat=document.getElementById("cfgSnap").value.trim(),this.saveConfig(),this.renderBranding(),this.showToast(this.t("toastSaved"),"success")},handleFontPreviewChange(){const n=document.getElementById("cfgKuBody"),e=document.getElementById("cfgKuDisplay"),t=document.getElementById("cfgEnBody"),s=document.getElementById("cfgEnDisplay"),r=n?n.value:this.config&&this.config.kurdishBodyFont||"Vazirmatn",i=e?e.value:this.config&&this.config.kurdishDisplayFont||"Vazirmatn",o=t?t.value:this.config&&this.config.englishBodyFont||"DM Sans",a=s?s.value:this.config&&this.config.englishDisplayFont||"Cormorant Garamond",c=document.getElementById("fontPreviewHeading"),u=document.getElementById("fontPreviewBody");c&&(c.style.fontFamily=`'${i}', serif`),u&&(u.style.fontFamily=`'${r}', sans-serif`);const h=document.getElementById("fontPreviewHeadingEn"),f=document.getElementById("fontPreviewBodyEn");h&&(h.style.fontFamily=`'${a}', serif`),f&&(f.style.fontFamily=`'${o}', sans-serif`),document.documentElement.style.setProperty("--font-ku-body",`'${r}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-ku-display",`'${i}', serif`),this.lang==="ku"?(document.documentElement.style.setProperty("--font-body",`'${r}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${i}', serif`),document.documentElement.style.setProperty("--font-serif",`'${i}', serif`),document.documentElement.style.setProperty("--font-ui",`'${r}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${i}', serif`)):(document.documentElement.style.setProperty("--font-body",`'${o}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${a}', serif`),document.documentElement.style.setProperty("--font-serif",`'${a}', serif`),document.documentElement.style.setProperty("--font-ui",`'${o}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${a}', serif`))},saveFontSettings(n){n&&n.preventDefault();const e=document.getElementById("cfgKuBody"),t=document.getElementById("cfgKuDisplay"),s=document.getElementById("cfgEnBody"),r=document.getElementById("cfgEnDisplay");e&&(this.config.kurdishBodyFont=e.value),t&&(this.config.kurdishDisplayFont=t.value),s&&(this.config.englishBodyFont=s.value),r&&(this.config.englishDisplayFont=r.value),this.saveConfig(),this.applyFonts(),this.showToast(this.t("toastSaved"),"success")},applyFonts(){const n=this.lang==="ku",e=this.config&&this.config.kurdishBodyFont||"Vazirmatn",t=this.config&&this.config.kurdishDisplayFont||"Vazirmatn",s=this.config&&this.config.englishBodyFont||"DM Sans",r=this.config&&this.config.englishDisplayFont||"Cormorant Garamond";document.documentElement.style.setProperty("--font-ku-body",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-ku-display",`'${t}', serif`),n?(document.documentElement.style.setProperty("--font-body",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${t}', serif`),document.documentElement.style.setProperty("--font-serif",`'${t}', serif`),document.documentElement.style.setProperty("--font-ui",`'${e}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${t}', serif`)):(document.documentElement.style.setProperty("--font-body",`'${s}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-heading",`'${r}', serif`),document.documentElement.style.setProperty("--font-serif",`'${r}', serif`),document.documentElement.style.setProperty("--font-ui",`'${s}', system-ui, sans-serif`),document.documentElement.style.setProperty("--font-accent",`'${r}', serif`))},applyTheme(n){const e=document.documentElement.style;let s={...n||this.config.theme&&this.config.theme.tokens||qe.berry.tokens};const r=this.config&&this.config.theme&&this.config.theme.mode,i=this.config&&this.config.theme&&this.config.theme.autoDark,o=window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches,a=this.config&&this.config.theme&&this.config.theme.presetId,c=r==="dark"||r!=="light"&&i&&o||a==="midnight"&&r!=="light";c?(document.documentElement.setAttribute("data-theme","dark"),document.documentElement.classList.add("is-dark"),document.body.classList.add("is-dark"),s={...s,cream:"#15110E",shell:"#1E1814",surface:"#241D18",surfaceHover:"#2E241E",surfaceInput:"#1A1411",blush:"#342820",linen:"#221B16",berry:s.berry&&s.berry!=="#8E3B4A"&&s.berry!=="#1F2E4A"?s.berry:"#E07A5F",berryDark:"#C66247",berryDeep:"#F4A58E",cocoa:"#F7EFE8",cocoaSoft:"#D6C6B8",gold:"#E5B85C",goldSoft:"#F3D48E",ink:"#EDE3DA",muted:"#A89687",line:"#3A2E26",lineStrong:"#4F3F34",headerBg:"rgba(21, 17, 14, 0.94)",headerBgStuck:"rgba(21, 17, 14, 0.98)",footerBg:"#100C0A",footerText:"#EDE3DA",footerMuted:"rgba(237, 227, 218, 0.7)"}):(document.documentElement.setAttribute("data-theme","light"),document.documentElement.classList.remove("is-dark"),document.body.classList.remove("is-dark"),s={surface:"#FFFFFF",surfaceHover:"#FFF7F0",surfaceInput:"#FFFFFF",headerBg:"rgba(247, 241, 232, 0.94)",headerBgStuck:"rgba(247, 241, 232, 0.98)",footerBg:"#2C211B",footerText:"#FFFBF7",footerMuted:"rgba(255, 251, 247, 0.75)",...s}),i?document.documentElement.setAttribute("data-auto-dark","true"):document.documentElement.removeAttribute("data-auto-dark"),Object.entries(s).forEach(([h,f])=>{e.setProperty("--"+h.replace(/([A-Z])/g,"-$1").toLowerCase(),f)}),document.body.style.background=s.cream,document.body.style.color=s.ink;let u=document.querySelector('meta[name="theme-color"]');u||(u=document.createElement("meta"),u.name="theme-color",document.head.appendChild(u)),u.content=c?"#15110E":s.berry,this.updateThemeToggleUI(c)},updateThemeToggleUI(n){const e=document.getElementById("themeModeToggle"),t=document.getElementById("themeModeIcon"),s=document.getElementById("mobileThemeModeToggle"),r=document.getElementById("mobileThemeModeIcon"),i=n?"☀️":"🌙";t&&(t.textContent=i),r&&(r.textContent=i),e&&(e.setAttribute("aria-label",n?"Switch to light mode":"Switch to dark mode"),e.title=n?this.lang==="ku"?"دۆخی ڕووناک":"Switch to Light Mode":this.lang==="ku"?"دۆخی تاریک":"Switch to Dark Mode",e.classList.toggle("is-active",n)),s&&(s.setAttribute("aria-label",n?"Switch to light mode":"Switch to dark mode"),s.title=n?this.lang==="ku"?"دۆخی ڕووناک":"Switch to Light Mode":this.lang==="ku"?"دۆخی تاریک":"Switch to Dark Mode",s.classList.toggle("is-active",n))},toggleDarkMode(){this.config.theme||(this.config.theme={presetId:"berry",autoDark:!1});const e=(this.config.theme.mode||(document.documentElement.getAttribute("data-theme")==="dark"?"dark":"light"))==="dark"?"light":"dark";this.config.theme.mode=e,this.saveConfig();const t=this.config.theme.presetId||"berry",s=qe[t]&&qe[t].tokens?qe[t].tokens:this.config.theme.tokens;this.applyTheme(s);const r=e==="dark"?this.lang==="ku"?"دۆخی تاریک چالاککرا":"Dark theme activated":this.lang==="ku"?"دۆخی ڕووناک چالاککرا":"Light theme activated";this.showToast(r,"info")},setThemeMode(n){var i;this.config.theme||(this.config.theme={presetId:"berry",autoDark:!1}),this.config.theme.mode=n,this.saveConfig();const e=this.config.theme.presetId||"berry",t=qe[e]&&qe[e].tokens?qe[e].tokens:this.config.theme.tokens;this.applyTheme(t);const s=document.getElementById("panelContent");s&&((i=document.getElementById("panelTitle"))==null?void 0:i.textContent)===this.t("tabTheme")&&this.renderThemeTab(s);const r=n==="dark"?this.lang==="ku"?"دۆخی تاریک چالاککرا":"Dark theme activated":this.lang==="ku"?"دۆخی ڕووناک چالاککرا":"Light theme activated";this.showToast(r,"info")},toggleWatermarkSetting(n){this.config.showWatermark=!!n,this.saveConfig(),this.renderWatermark(),this.showToast(this.t("toastSaved"),"success")},getDraftEconomy(){var Z,ae,oe,se,w,C,_,A,I,S,v,Oe,it,Jn,Di,jn,Kn,wi,rr,ir;const n=this.config&&this.config.economy||ts;if(!document.getElementById("economySettingsForm"))return n;const t=((Z=document.getElementById("cfgSecondaryCurrency"))==null?void 0:Z.value)||n.secondaryCurrency,s=((ae=document.getElementById("cfgShowSecondary"))==null?void 0:ae.checked)??n.showSecondary,r=((se=(oe=document.getElementById("cfgCurrencySymbol"))==null?void 0:oe.value)==null?void 0:se.trim())||(t==="IQD"?"د.ع":t),i=Math.max(1,parseFloat((w=document.getElementById("cfgExchangeRate"))==null?void 0:w.value)||1310),o=parseInt((C=document.getElementById("cfgRoundingRule"))==null?void 0:C.value,10)||250,a=Math.max(0,parseFloat((_=document.getElementById("cfgDeliveryFee"))==null?void 0:_.value)||0),c=Math.max(0,parseFloat((A=document.getElementById("cfgFreeDeliveryOver"))==null?void 0:A.value)||0),u=Math.max(0,parseFloat((I=document.getElementById("cfgMinimumOrder"))==null?void 0:I.value)||0),h=!!((S=document.getElementById("cfgPickupOnly"))!=null&&S.checked),f=!!((v=document.getElementById("cfgTaxEnabled"))!=null&&v.checked),p=Math.min(30,Math.max(0,parseFloat((Oe=document.getElementById("cfgTaxRate"))==null?void 0:Oe.value)||0)),g=((Jn=(it=document.getElementById("cfgTaxLabel"))==null?void 0:it.value)==null?void 0:Jn.trim())||"VAT",D=!!((Di=document.getElementById("cfgTaxIncluded"))!=null&&Di.checked),R=((Kn=(jn=document.getElementById("cfgPromoCode"))==null?void 0:jn.value)==null?void 0:Kn.trim().toUpperCase())||"",M=((wi=document.getElementById("cfgPromoType"))==null?void 0:wi.value)||"percent",O=Math.max(0,parseFloat((rr=document.getElementById("cfgPromoValue"))==null?void 0:rr.value)||0),H=((ir=document.getElementById("cfgPromoExpiry"))==null?void 0:ir.value)||"";return{primaryCurrency:"USD",secondaryCurrency:t,showSecondary:s,currencySymbol:r,exchangeRate:i,roundingRule:o,autoRefreshRate:!1,deliveryFee:a,freeDeliveryOver:c,minimumOrder:u,pickupOnly:h,taxEnabled:f,taxRate:p,taxLabel:g,taxIncluded:D,promoCode:R,promoType:M,promoValue:O,promoExpiry:H,lastUpdatedRate:n.lastUpdatedRate}},isEconomyDirty(n,e){return!n||!e?!1:n.secondaryCurrency!==e.secondaryCurrency||n.showSecondary!==e.showSecondary||n.currencySymbol!==e.currencySymbol||n.exchangeRate!==e.exchangeRate||n.roundingRule!==e.roundingRule||n.deliveryFee!==e.deliveryFee||n.freeDeliveryOver!==e.freeDeliveryOver||n.minimumOrder!==e.minimumOrder||n.pickupOnly!==e.pickupOnly||n.taxEnabled!==e.taxEnabled||n.taxRate!==e.taxRate||n.taxLabel!==e.taxLabel||n.taxIncluded!==e.taxIncluded||n.promoCode!==e.promoCode||n.promoType!==e.promoType||n.promoValue!==e.promoValue||n.promoExpiry!==e.promoExpiry},handleEconomyInput(n){if(n&&n.target)if(n.target.id==="cfgPromoCode"&&(n.target.value=n.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g,"")),n.target.id==="cfgExchangeRate")this.onExchangeRateInput(n.target.value);else{const e=this.getDraftEconomy();this.applyEconomy(e)}this.updateEconomyPreview()},onExchangeRateInput(n){this._exchangeRateDebounceTimer&&clearTimeout(this._exchangeRateDebounceTimer),this._exchangeRateDebounceTimer=setTimeout(()=>{const e=this.getDraftEconomy();this.applyEconomy(e),this.updateEconomyPreview()},200)},applyEconomy(n=null){this._draftEconomy=n,this.applyPreferences(),this.renderMenu(),this.renderTray()},toggleMobilePreviewExpand(){const n=document.getElementById("economyPreviewStickyCard");if(!n)return;const e=n.classList.contains("is-collapsed");n.classList.toggle("is-collapsed",!e),n.classList.toggle("is-expanded",e);const t=document.getElementById("previewChevron");t&&(t.textContent=e?"▼":"▲")},showModalToast(n,e="success"){const t=document.getElementById("modalToastContainer");if(!t){this.showToast(n,e);return}const s=document.createElement("div");s.className=`modal-toast modal-toast--${e}`,s.innerHTML=`<span>✓</span> <span>${n}</span>`,t.appendChild(s),setTimeout(()=>{s.style.animation="modalToastOut 220ms cubic-bezier(.2,.8,.3,1) forwards",setTimeout(()=>s.remove(),220)},2800)},updateEconomyPreview(){const n=document.getElementById("economyLivePreviewCard");if(!n)return;const e=this.config&&this.config.economy||ts,t=this.getDraftEconomy(),s=this.isEconomyDirty(t,e),r=document.getElementById("btnSaveEconomy");r&&(r.disabled=!s);const i=document.getElementById("ecoCurrenciesSummary");i&&(i.textContent=t.showSecondary&&t.secondaryCurrency&&t.secondaryCurrency!=="None"?`USD + ${t.secondaryCurrency} (${t.currencySymbol||"د.ع"})`:"USD only");const o=document.getElementById("ecoExchangeSummary");if(o){const se=new Intl.NumberFormat("en-US").format(t.exchangeRate||1310),w=t.roundingRule>1?`Nearest ${t.roundingRule}`:"Exact (cents)";o.textContent=`1 USD = ${se} ${t.secondaryCurrency} · ${w}`}const a=document.getElementById("ecoDeliverySummary");if(a)if(t.pickupOnly)a.textContent="Pickup only";else{const se=t.freeDeliveryOver>0?`Free over $${t.freeDeliveryOver}`:"All-order free";a.textContent=`$${t.deliveryFee} flat · ${se} · Min $${t.minimumOrder}`}const c=document.getElementById("ecoTaxSummary");c&&(t.taxEnabled?c.textContent=`${t.taxRate}% (${t.taxLabel||"VAT"}) ${t.taxIncluded?"included":"+checkout"}`:c.textContent="Off");const u=document.getElementById("ecoDiscountsSummary");if(u)if(!t.promoCode)u.textContent="No active code";else{const se=t.promoType==="percent"?`${t.promoValue}%`:`$${t.promoValue}`;u.textContent=`${t.promoCode} (${se} off)`}const h=document.getElementById("promoValidityBadge");if(h){const se=t.promoCode;se?se.length<3?(h.style.display="inline-block",h.className="promo-pill promo-pill--short",h.textContent=this.t("promoTooShort")):t.promoExpiry&&new Date(t.promoExpiry+"T23:59:59")<new Date?(h.style.display="inline-block",h.className="promo-pill promo-pill--expired",h.textContent=this.t("promoExpired")):(h.style.display="inline-block",h.className="promo-pill promo-pill--active",h.textContent=this.t("promoActive")):h.style.display="none"}const f=document.getElementById("freeDeliveryWarn");if(f){const se=!t.pickupOnly&&t.freeDeliveryOver>0&&t.minimumOrder>0&&t.freeDeliveryOver<t.minimumOrder;f.style.display=se?"flex":"none"}const p=document.getElementById("deliveryZeroNote");p&&(p.style.display=!t.pickupOnly&&t.deliveryFee===0?"block":"none");const g=50,D=t.promoCode,R=this.computeCartBreakdown(g,D,t),M=t.showSecondary!==!1&&t.secondaryCurrency&&t.secondaryCurrency!=="None",O=R.total;let H="",Z="";if(M){const se=O*t.exchangeRate,w=parseInt(t.roundingRule,10)||250;let C=se;w>1?C=Math.round(se/w)*w:C=Math.round(se*100)/100;const _=t.currencySymbol||"د.ع";H=w>1?`${new Intl.NumberFormat("en-US").format(C)} ${_}`:`${_} ${C.toFixed(2)}`;const A=O*t.exchangeRate;w>1&&Math.abs(C-A)>.01&&(Z=`
          <div style="font-size:0.75rem;color:rgba(255,255,255,0.65);text-align:right;margin-top:2px;">
            Rounded from ${new Intl.NumberFormat("en-US").format(Math.round(A))} ${_} (nearest ${w})
          </div>
        `)}const ae=document.getElementById("mobilePreviewSummaryText");ae&&(ae.textContent=`$${O.toFixed(2)}${M?` · ${H}`:""}`);let oe=`
      <div class="economy-preview-line">
        <span>${this.t("subtotal")}</span>
        <strong>$${g.toFixed(2)}</strong>
      </div>
    `;R.discount>0&&(oe+=`
        <div class="economy-preview-line" style="color:#4ade80;">
          <span>${this.t("discount")} (${R.promoCodeName})</span>
          <strong>−$${R.discount.toFixed(2)}</strong>
        </div>
      `),R.isPickupOnly?oe+=`
        <div class="economy-preview-line">
          <span>${this.t("economyDelivery")}</span>
          <span style="color:#93c5fd;font-weight:600;">Pickup Only</span>
        </div>
      `:R.isFreeDelivery?oe+=`
        <div class="economy-preview-line">
          <span>${this.t("deliveryFee")}</span>
          <span style="color:#4ade80;font-weight:700;">${this.t("freeDelivery")}</span>
        </div>
      `:oe+=`
        <div class="economy-preview-line">
          <span>${this.t("deliveryFee")}</span>
          <strong>$${R.delivery.toFixed(2)}</strong>
        </div>
      `,R.tax>0?oe+=`
        <div class="economy-preview-line">
          <span>${this.t("tax")} (${R.taxLabel} ${R.taxRate}%)</span>
          <strong>+$${R.tax.toFixed(2)}</strong>
        </div>
      `:t.taxEnabled&&t.taxIncluded&&t.taxRate>0&&(oe+=`
        <div class="economy-preview-line" style="color:rgba(255,255,255,0.65);font-size:0.78rem;">
          <span>${t.taxLabel} (${t.taxRate}% included)</span>
          <span>Included</span>
        </div>
      `),oe+=`
      <div class="economy-preview-total">
        <span>${this.t("total")}</span>
        <div style="text-align:right;">
          <div style="font-size:1.2rem;font-weight:700;color:var(--gold-soft,#eab308);">$${O.toFixed(2)}</div>
          ${M?`<div style="font-size:0.88rem;color:rgba(255,255,255,0.75);margin-top:2px;">${H}</div>${Z}`:""}
        </div>
      </div>
    `,R.minOrderMet||(oe+=`
        <div class="economy-preview-alert">
          ⚠️ Min order ($${t.minimumOrder.toFixed(2)}) not met. Sample is $${g.toFixed(2)}.
        </div>
      `),n.innerHTML=oe},saveEconomySettings(n){n&&n.preventDefault();const e=document.getElementById("btnSaveEconomy");e&&(e.disabled=!0,e.innerHTML=`<span class="btn-spinner"></span> ${this.t("saveEconomy")}`);const t=this.getDraftEconomy();t.lastUpdatedRate=Date.now(),this.config.economy=t,this.config.iqdRate!==void 0&&delete this.config.iqdRate,this.saveConfig(),this._draftEconomy=null,this.applyEconomy();const s=document.getElementById("lastUpdatedRateText");s&&(s.textContent=new Date(t.lastUpdatedRate).toLocaleDateString()),setTimeout(()=>{e&&(e.innerHTML=this.t("saveEconomy"),e.disabled=!0),this.showModalToast(this.t("toastSaved"),"success"),this.updateEconomyPreview()},250)},selectProductForEditing(n){if(n==="new"){this.addNewProduct();return}this.selectedProductId=n;const e=this.products.find(t=>t.id===n);this.pendingImageData=e&&e.img||"",this.renderProductEditor()},renderProductEditor(){var r,i,o,a;const n=document.getElementById("productEditorArea");if(!n)return;const e=this.products.find(c=>c.id===this.selectedProductId);if(!e){n.innerHTML=`
        <div style="text-align:center;padding:36px 20px;background:var(--shell);border-radius:var(--radius-card);border:1px dashed var(--line);">
          <p style="color:var(--muted);margin-bottom:12px;">No product selected.</p>
          <button type="button" class="btn btn--primary btn--sm" onclick="app.addNewProduct()">${this.t("btnAddNewProduct")}</button>
        </div>
      `;return}const t=this.pendingImageData||e.img||"",s=!!(t&&t.trim()!=="");n.innerHTML=`
      <div style="background:var(--cream);padding:22px;border-radius:var(--radius-card);border:1px solid var(--line);margin-top:14px;">
        <h5 style="font-family:var(--font-serif);font-size:1.15rem;margin:0 0 16px 0;display:flex;align-items:center;gap:8px;">
          <span>${e.emoji||"🎂"}</span>
          <span>${e.name.en||"Untitled Product"}</span>
          <span style="font-size:0.85rem;color:var(--muted);font-family:var(--font-sans);font-weight:normal;">($${e.priceUSD})</span>
        </h5>

        <!-- Photo Uploader -->
        <div class="photo-uploader">
          <div class="photo-uploader__preview" id="prodPreview">
            ${s?`
              <img src="${t}" alt="${(e.name.en||"Product Preview").replace(/"/g,"&quot;")}" referrerpolicy="no-referrer" />
            `:`
              <div class="preview-emoji">${e.emoji||"🎂"}</div>
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
              <span id="uploadBtnText">${s?this.t("replacePhoto"):this.t("uploadPhoto")}</span>
              <input type="file" id="prodImageInput" accept="image/jpeg,image/png,image/webp" onchange="app.handlePhotoUpload(event)" />
            </label>
            <button type="button" class="btn btn--ghost btn--sm" id="btnRemovePhoto" style="${s?"display:inline-flex;":"display:none;"} color:#b91c1c; border-color:#fca5a5;" onclick="app.removeProductPhoto()">
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
              <input type="text" id="pEditEmoji" class="form-input" value="${e.emoji||"🎂"}" required />
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
              <input type="text" id="pEditNameEn" class="form-input" value="${(e.name.en||"").replace(/"/g,"&quot;")}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditNameKu">Name (Kurdish)</label>
              <input type="text" id="pEditNameKu" class="form-input" value="${(e.name.ku||"").replace(/"/g,"&quot;")}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditPrice">Price (USD)</label>
              <input type="number" id="pEditPrice" class="form-input" value="${e.priceUSD}" step="0.5" min="1" required />
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
              <input type="text" id="pEditUnitEn" class="form-input" value="${(((r=e.unit)==null?void 0:r.en)||'8" Cake (10-12 slices)').replace(/"/g,"&quot;")}" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditUnitKu">Serving Unit (Kurdish)</label>
              <input type="text" id="pEditUnitKu" class="form-input" value="${(((i=e.unit)==null?void 0:i.ku)||"کێکی ٨ ئینچ (١٠-١٢ پارچە)").replace(/"/g,"&quot;")}" required />
            </div>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescEn">Description (English)</label>
            <textarea id="pEditDescEn" class="form-textarea" rows="2">${((o=e.desc)==null?void 0:o.en)||""}</textarea>
          </div>

          <div class="form-group">
            <label class="form-label" for="pEditDescKu">Description (Kurdish)</label>
            <textarea id="pEditDescKu" class="form-textarea" rows="2">${((a=e.desc)==null?void 0:a.ku)||""}</textarea>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label" for="pEditExEn">Exclusions (English, comma separated)</label>
              <input type="text" id="pEditExEn" class="form-input" value="${(e.exclusions||[]).map(c=>c.en).join(", ").replace(/"/g,"&quot;")}" placeholder="e.g. Nuts, Frosting" />
            </div>
            <div class="form-group">
              <label class="form-label" for="pEditExKu">Exclusions (Kurdish, comma separated)</label>
              <input type="text" id="pEditExKu" class="form-input" value="${(e.exclusions||[]).map(c=>c.ku).join(", ").replace(/"/g,"&quot;")}" placeholder="e.g. گوێز, کرێم" />
            </div>
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:20px;flex-wrap:wrap;">
            <button type="submit" class="btn btn--primary">${this.t("btnSaveProduct")}</button>
            <button type="button" class="btn btn--ghost" style="color:#b91c1c;border-color:#fca5a5;" onclick="app.deleteProduct('${e.id}')">${this.t("btnDeleteProduct")}</button>
          </div>
        </form>
      </div>
    `},editProduct(n){this.selectProductForEditing(n)},async handlePhotoUpload(n){const e=n.target.files&&n.target.files[0];if(e)try{const t=await jI(e);this.pendingImageData=t;const s=document.getElementById("prodPreview");s&&(s.innerHTML=`<img src="${t}" alt="Product Preview" />`);const r=document.getElementById("uploadBtnText");r&&(r.textContent=this.t("replacePhoto"));const i=document.getElementById("btnRemovePhoto");i&&(i.style.display="inline-flex"),this.showToast(this.t("toastPhotoReady"),"info")}catch(t){console.error("Image processing error:",t),t.message==="OUTPUT_TOO_LARGE"||t.message==="FILE_TOO_LARGE"?this.showToast(this.t("prodPhotoTooLarge"),"error"):this.showToast(this.t("prodPhotoError"),"error")}finally{n.target.value=""}},removeProductPhoto(){this.pendingImageData="";const n=this.products.find(r=>r.id===this.selectedProductId);n&&(n.img="",this.saveProducts(),this.renderMenu());const e=document.getElementById("prodPreview");if(e){const r=n&&n.emoji||"🎂";e.innerHTML=`
        <div class="preview-emoji">${r}</div>
        <div class="preview-hint">${this.t("noPhotoHint")}</div>
      `}const t=document.getElementById("uploadBtnText");t&&(t.textContent=this.t("uploadPhoto"));const s=document.getElementById("btnRemovePhoto");s&&(s.style.display="none"),this.showToast(this.t("prodPhotoRemoved"),"info")},addNewProduct(){const n="p_"+Date.now(),e={id:n,category:"cakes",emoji:"🎂",img:"",priceUSD:35,tag:"none",name:{en:"New Artisanal Cake",ku:"کێکی دەستکردی نوێ"},desc:{en:"Handcrafted sponge layered with fresh cream and seasonal fruits.",ku:"کێکی دەستکرد بە کرێمی تازە و میوەی وەرزی."},unit:{en:'8" Cake (10-12 slices)',ku:"کێکی ٨ ئینچ (١٠-١٢ پارچە)"}};this.products.unshift(e),this.selectedProductId=n,this.pendingImageData="",this.saveProducts(),this.renderMenu(),this.renderPanelTab("products"),this.showToast(this.t("toastSaved"),"success")},saveProductData(n){n.preventDefault();const e=this.products.find(O=>O.id===this.selectedProductId);if(!e)return;const t=document.getElementById("pEditEmoji").value.trim()||"🎂",s=document.getElementById("pEditCat").value,r=document.getElementById("pEditNameEn").value.trim(),i=document.getElementById("pEditNameKu").value.trim(),o=parseFloat(document.getElementById("pEditPrice").value)||20,a=document.getElementById("pEditTag").value,c=document.getElementById("pEditUnitEn").value.trim(),u=document.getElementById("pEditUnitKu").value.trim(),h=document.getElementById("pEditDescEn").value.trim(),f=document.getElementById("pEditDescKu").value.trim(),p=document.getElementById("pEditExEn").value.split(",").map(O=>O.trim()).filter(Boolean),g=document.getElementById("pEditExKu").value.split(",").map(O=>O.trim()).filter(Boolean),D=[],R=Math.max(p.length,g.length);for(let O=0;O<R;O++)(p[O]||g[O])&&D.push({id:(p[O]||g[O]||`ex${O}`).replace(/\s+/g,"_").toLowerCase(),en:p[O]||"",ku:g[O]||""});e.exclusions=D.length>0?D:null,e.emoji=t,e.category=s,e.name={en:r,ku:i},e.priceUSD=o,e.tag=a,e.unit={en:c,ku:u},e.desc={en:h,ku:f},e.img=this.pendingImageData||"",this.saveProducts()&&(this.renderMenu(),this.renderPanelTab("products"),this.showToast(this.t("toastSaved"),"success"))},deleteProduct(n){const e=document.getElementById("customConfirmModal"),t=document.getElementById("confirmMessage"),s=document.getElementById("confirmCancelBtn"),r=document.getElementById("confirmOkBtn");t.textContent=this.t("prodDeleteConfirm")||"Are you sure you want to delete this product?";const i=()=>{e.classList.remove("is-open"),s.onclick=null,r.onclick=null};s.onclick=i,r.onclick=()=>{i(),this.products.length,this.products=this.products.filter(o=>o.id!==n),this.order=this.order.filter(o=>o.productId!==n),this.selectedProductId=this.products.length>0?this.products[0].id:null,this.pendingImageData=this.selectedProductId&&this.products.length>0&&this.products[0].img?this.products[0].img:"",this.saveProducts(),Te&&Oh(Kt(Te,"products",n)).catch(o=>wt(o,Dt.DELETE,"products")),this.renderMenu(),this.renderTray(),this.renderPanelTab("products"),this.showToast(this.t("toastDeleted")||"Deleted","success")},e.classList.add("is-open")},showAddStaffModal(){document.getElementById("promptUsername").value="",document.getElementById("promptPassword").value="",document.getElementById("promptName").value="",document.getElementById("promptRole").value="staff",document.querySelectorAll('input[name="staffPerms"]').forEach(e=>e.checked=!1),document.getElementById("customPromptModal").classList.add("is-open")},submitAddStaff(n){n.preventDefault();const e=document.getElementById("promptUsername").value.trim(),t=document.getElementById("promptPassword").value.trim(),s=document.getElementById("promptName").value.trim()||e,r=document.getElementById("promptRole").value,i=[];if(document.querySelectorAll('input[name="staffPerms"]:checked').forEach(o=>{i.push(o.value)}),t.length<4){this.showToast("Password must be at least 4 characters.","error");return}this.users.push({id:"s_"+Date.now(),username:e,password:t,name:s,role:r,permissions:i}),this.saveUsers(),this.renderPanelTab("users"),this.showToast(this.t("staffAdded")||"Staff added","success"),document.getElementById("customPromptModal").classList.remove("is-open")},importJsonData(){try{const n=document.getElementById("dataJsonBox"),e=JSON.parse(n.value);if(!e.config||!e.products||!e.users)throw new Error("Missing top-level keys");this.config=e.config,this.products=e.products,this.users=e.users,this.saveConfig(),this.saveProducts(),this.saveUsers(),this.renderAll(),this.showToast(this.t("backupImported"),"success")}catch{this.showToast(this.t("toastInvalidJson"),"error")}},copyJsonData(){const n=document.getElementById("dataJsonBox");n&&navigator.clipboard.writeText(n.value).then(()=>{this.showToast(this.t("copiedJson"),"success")}).catch(()=>{n.select(),document.execCommand("copy"),this.showToast(this.t("copiedJson"),"success")})},factoryReset(){confirm("Are you sure? This will wipe all changes, restore factory defaults, and log you out.")&&(localStorage.removeItem(ve.CONFIG),localStorage.removeItem(ve.PRODUCTS),localStorage.removeItem(ve.USERS),localStorage.removeItem(ve.SESSION),localStorage.removeItem(ve.PREF),this.loadState(),this.renderAll(),this.closePanelModal(),this.showToast(this.t("factoryResetDone"),"success"))},renderWatermark(){const n=document.getElementById("watermarkPill");if(!n)return;const e=this.config&&this.config.showWatermark!==!1;n.style.display=e?"inline-flex":"none"},showToast(n,e="info"){const t=document.getElementById("toastContainer");if(!t)return;const s=document.createElement("div");s.className=`toast ${e==="success"?"toast--success":e==="error"?"toast--error":""}`,s.textContent=n,t.appendChild(s),setTimeout(()=>{s.classList.add("is-show")},10),setTimeout(()=>{s.classList.remove("is-show"),setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},300)},2200)},toggleMobileMenu(){const n=document.getElementById("mobileNav"),e=document.getElementById("burgerBtn");if(!n||!e)return;const t=document.getElementById("mainHeader");t&&(n.style.top=`${Math.max(0,t.getBoundingClientRect().bottom)}px`);const s=n.classList.toggle("is-open");e.setAttribute("aria-expanded",s?"true":"false")},closeMobileMenu(){const n=document.getElementById("mobileNav"),e=document.getElementById("burgerBtn");n&&n.classList.remove("is-open"),e&&e.setAttribute("aria-expanded","false")},bindEvents(){window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",()=>{this.config&&this.config.theme&&this.config.theme.autoDark&&this.applyTheme(this.config.theme.tokens)});const n=document.getElementById("mainHeader");window.addEventListener("scroll",()=>{n&&(window.scrollY>15?n.classList.add("is-stuck"):n.classList.remove("is-stuck"))},{passive:!0}),this.setupScrollSpy(),["authModal","panelModal","historyModal"].forEach(e=>{const t=document.getElementById(e);t&&t.addEventListener("click",s=>{s.target===t&&t.classList.remove("is-open")})}),document.addEventListener("click",e=>{const t=document.getElementById("mobileNav"),s=document.getElementById("burgerBtn");t&&t.classList.contains("is-open")&&!t.contains(e.target)&&!s.contains(e.target)&&this.closeMobileMenu()}),window.addEventListener("keydown",e=>{if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();const t=document.getElementById("menuSearchInput");t&&(t.focus(),t.select())}e.key==="Escape"&&(document.activeElement&&document.activeElement.id==="menuSearchInput"&&document.activeElement.blur(),this.closeAuthModal(),this.closePanelModal(),this.closeHistoryModal(),this.closeCustomerDrawer(),this.closeMobileMenu())})},setupScrollSpy(){if(!("IntersectionObserver"in window))return;const n=document.querySelectorAll("#desktopNav .nav__link, #mobileNav .nav__link"),e=[...new Set([...n].map(o=>o.getAttribute("href")).filter(o=>o&&o.startsWith("#")))],t={features:"story"},s=[...e,"#features"].map(o=>document.querySelector(o)).filter(Boolean),r=new Set,i=new IntersectionObserver(o=>{o.forEach(u=>{u.isIntersecting?r.add(u.target):r.delete(u.target)});const a=s.find(u=>r.has(u)),c=a?`#${t[a.id]||a.id}`:null;n.forEach(u=>{const h=u.getAttribute("href")===c;u.classList.toggle("is-active",h),h?u.setAttribute("aria-current","location"):u.removeAttribute("aria-current")})},{rootMargin:"-45% 0px -50% 0px"});s.forEach(o=>i.observe(o))},setupIntersectionObserver(){if(!("IntersectionObserver"in window)||window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const n=new IntersectionObserver(t=>{t.forEach((s,r)=>{s.isIntersecting&&(setTimeout(()=>{s.target.style.opacity="1",s.target.style.transform="translateY(0)"},r%4*70),n.unobserve(s.target))})},{threshold:.12});document.querySelectorAll(".feature-card, .cake-card, .step-card, .review-card, .faq-item, .info-card").forEach(t=>{t.getBoundingClientRect().top<window.innerHeight||(t.style.opacity="0",t.style.transform="translateY(24px)",t.style.transition="opacity 0.4s ease, transform 0.4s ease",n.observe(t))})}};window.app=ri;document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>ri.init()):ri.init();
