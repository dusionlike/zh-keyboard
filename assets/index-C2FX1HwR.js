var hy=Object.defineProperty;var dy=(e,t,n)=>t in e?hy(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var Yn=(e,t,n)=>dy(e,typeof t!="symbol"?t+"":t,n);function py(e,t){for(var n=0;n<t.length;n++){const s=t[n];if(typeof s!="string"&&!Array.isArray(s)){for(const r in s)if(r!=="default"&&!(r in e)){const a=Object.getOwnPropertyDescriptor(s,r);a&&Object.defineProperty(e,r,a.get?a:{enumerable:!0,get:()=>s[r]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))s(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function n(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(r){if(r.ep)return;r.ep=!0;const a=n(r);fetch(r.href,a)}})();/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const my=1e-7,gy=1e-4;class yy{constructor(t,n){this.backend=t,this.dataMover=n,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,n){this.dataIdsCount++,this.data.set(t,n)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}}class Kf{refCount(t){return Ce("refCount")}incRef(t){return Ce("incRef")}timerAvailable(){return!0}time(t){return Ce("time")}read(t){return Ce("read")}readSync(t){return Ce("readSync")}readToGPU(t,n){return Ce("readToGPU")}numDataIds(){return Ce("numDataIds")}disposeData(t,n){return Ce("disposeData")}write(t,n,s){return Ce("write")}move(t,n,s,r,a){return Ce("move")}createTensorFromGPUData(t,n,s){return Ce("createTensorFromGPUData")}memory(){return Ce("memory")}floatPrecision(){return Ce("floatPrecision")}epsilon(){return this.floatPrecision()===32?my:gy}dispose(){return Ce("dispose")}}function Ce(e){throw new Error(`'${e}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yl(e,t,n){return Math.max(e,Math.min(t,n))}function _r(e,t,n){const s=e[t];e[t]=e[n],e[n]=s}function T(e,t){if(!e)throw new Error(typeof t=="string"?t:t())}function Le(e,t,n=""){T(Ke(e,t),()=>n+` Shapes ${e} and ${t} must match`)}function vr(e){T(e!=null,()=>"The input to the tensor constructor must be a non-null value.")}function nt(e){if(e.length===0)return 1;let t=e[0];for(let n=1;n<e.length;n++)t*=e[n];return t}function by(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==null&&t[n]!==null&&e[n]!==t[n])return!1;return!0}function Ke(e,t){if(e===t)return!0;if(e==null||t==null||e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}function Yr(e){return e%1===0}function Ea(e,t){return t<=e.length?e:e+" ".repeat(t-e.length)}function wy(e,t){let n=1,s=-1;for(let a=0;a<e.length;++a)if(e[a]>=0)n*=e[a];else if(e[a]===-1){if(s!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${s} and dim ${a}`);s=a}else if(e[a]<0)throw Error(`Shapes can not be < 0. Found ${e[a]} at dim ${a}`);if(s===-1){if(t>0&&t!==n)throw Error(`Size(${t}) must match the product of shape ${e}`);return e}if(n===0)throw Error(`Cannot infer the missing size in [${e}] when there are 0 elements`);if(t%n!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${n}`);const r=e.slice();return r[s]=t/n,r}function ae(e,t){const n=t.length;return e=e==null?t.map((s,r)=>r):[].concat(e),T(e.every(s=>s>=-n&&s<n),()=>`All values in axis param must be in range [-${n}, ${n}) but got axis ${e}`),T(e.every(s=>Yr(s)),()=>`All values in axis param must be integers but got axis ${e}`),e.map(s=>s<0?n+s:s)}function ky(e,t){const n=[],s=[],r=t!=null&&Array.isArray(t)&&t.length===0,a=t==null||r?null:ae(t,e).sort();let o=0;for(let i=0;i<e.length;++i){if(a!=null){if(a[o]===i&&e[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${e[i]}' is not 1`);(a[o]==null||a[o]>i)&&e[i]===1&&(n.push(e[i]),s.push(i)),a[o]<=i&&o++}e[i]!==1&&(n.push(e[i]),s.push(i))}return{newShape:n,keptDims:s}}function ke(e,t){return Qt(e,t)}function Qt(e,t){let n=null;if(e==null||e==="float32")n=new Float32Array(t);else if(e==="int32")n=new Int32Array(t);else if(e==="bool")n=new Uint8Array(t);else if(e==="string")n=new Array(t);else throw new Error(`Unknown data type ${e}`);return n}function vy(e,t){for(let n=0;n<e.length;n++){const s=e[n];if(isNaN(s)||!isFinite(s))throw Error(`A tensor of type ${t} being uploaded contains ${s}.`)}}function Sy(e){return e==="bool"||e==="complex64"||e==="float32"||e==="int32"||e==="string"}function xy(e,t){return!(t==="complex64"||t==="float32"&&e!=="complex64"||t==="int32"&&e!=="float32"&&e!=="complex64"||t==="bool"&&e==="bool")}function vi(e){if(e==="float32"||e==="int32")return 4;if(e==="complex64")return 8;if(e==="bool")return 1;throw new Error(`Unknown dtype ${e}`)}function Ny(e){if(e==null)return 0;let t=0;return e.forEach(n=>t+=n.length),t}function No(e){return typeof e=="string"||e instanceof String}function Iy(e){return typeof e=="boolean"}function Ty(e){return typeof e=="number"}function ha(e){return Array.isArray(e)?ha(e[0]):e instanceof Float32Array?"float32":e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray?"int32":Ty(e)?"float32":No(e)?"string":Iy(e)?"bool":"float32"}function Si(e){return!!(e&&e.constructor&&e.call&&e.apply)}function yt(e){const t=e.length;if(t<2)return[];const n=new Array(t-1);n[t-2]=e[t-1];for(let s=t-3;s>=0;--s)n[s]=n[s+1]*e[s+1];return n}function Xf(e,t,n,s=!1){const r=new Array;if(t.length===1){const a=t[0]*(s?2:1);for(let o=0;o<a;o++)r[o]=n[e+o]}else{const a=t[0],o=t.slice(1),i=o.reduce((l,c)=>l*c)*(s?2:1);for(let l=0;l<a;l++)r[l]=Xf(e+l*i,o,n,s)}return r}function qe(e,t,n=!1){if(e.length===0)return t[0];const s=e.reduce((r,a)=>r*a)*(n?2:1);if(s===0)return[];if(s!==t.length)throw new Error(`[${e}] does not match the input size ${t.length}${n?" for a complex tensor":""}.`);return Xf(0,e,t,n)}function $y(e,t){if(Array.isArray(e))return e;if(t==="float32")return e instanceof Float32Array?e:new Float32Array(e);if(t==="int32")return e instanceof Int32Array?e:new Int32Array(e);if(t==="bool"||t==="string")return Uint8Array.from(new Int32Array(e));throw new Error(`Unknown dtype ${t}`)}function bl(e,t){const n=fe(e,t);for(let s=0;s<n.length;s++)n[s]=1;return n}function fe(e,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t==="bool")return new Uint8Array(e);throw new Error(`Unknown data type ${t}`)}function Yf(e,t){const n=e.reduce((s,r)=>s*r,1);if(t==null||t==="float32")return qe(e,new Float32Array(n));if(t==="int32")return qe(e,new Int32Array(n));if(t==="bool")return qe(e,new Uint8Array(n));throw new Error(`Unknown data type ${t}`)}function ze(e){e.forEach(t=>{T(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${e}].`)})}function pn(e,t,n){if(t===0)return 0;if(t===1)return e[0];let s=e[e.length-1];for(let r=0;r<e.length-1;++r)s+=n[r]*e[r];return s}function Sr(e,t,n){if(t===0)return[];if(t===1)return[e];const s=new Array(t);for(let r=0;r<s.length-1;++r)s[r]=Math.floor(e/n[r]),e-=s[r]*n[r];return s[s.length-1]=e,s}function As(e){return e&&e.then&&typeof e.then=="function"}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ku="tfjsflags";class _y{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=Ey,this.populateURLFlags()}setPlatform(t,n){this.platform!=null&&($t().getBool("IS_TEST")||$t().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=n}registerFlag(t,n,s){if(this.flagRegistry[t]={evaluationFn:n,setHook:s},this.urlFlags[t]!=null){const r=this.urlFlags[t];$t().getBool("IS_TEST")||$t().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${r}.`),this.set(t,r)}}async getAsync(t){return t in this.flags?this.flags[t]:(this.flags[t]=await this.evaluateFlag(t),this.flags[t])}get(t){if(t in this.flags)return this.flags[t];const n=this.evaluateFlag(t);if(As(n))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=n,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getString(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,n){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=n,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(n)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;const t=this.getQueryParams(this.global.location.search);ku in t&&t[ku].split(",").forEach(s=>{const[r,a]=s.split(":");this.urlFlags[r]=Ay(r,a)})}}function Ey(e){const t={};return e.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(n,...s)=>(Cy(t,s[0],s[1]),s.join("="))),t}function Cy(e,t,n){e[decodeURIComponent(t)]=decodeURIComponent(n||"")}function Ay(e,t){const n=t.toLowerCase();return n==="true"||n==="false"?n==="true":`${+n}`===n?+n:t}function $t(){return Zf}let Zf=null;function Dy(e){Zf=e}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let ti;function Jf(){if(ti==null){let e;if(typeof window<"u")e=window;else if(typeof global<"u")e=global;else if(typeof process<"u")e=process;else if(typeof self<"u")e=self;else throw new Error("Could not find a global object");ti=e}return ti}function Oy(){const e=Jf();return e._tfGlobals==null&&(e._tfGlobals=new Map),e._tfGlobals}function wl(e,t){const n=Oy();if(n.has(e))return n.get(e);{const s=t();return n.set(e,s),n.get(e)}}const Qf="Abs",kl="Acos",vl="Acosh",Io="Add",th="AddN",eh="All",nh="Any",sh="ArgMax",rh="ArgMin",Sl="Asin",xl="Asinh",Nl="Atan",Il="Atanh",Tl="Atan2",ah="AvgPool",Fy="AvgPoolGrad",oh="AvgPool3D",Ry="AvgPool3DGrad",ih="BatchMatMul",lh="BatchToSpaceND",ch="Bincount",$l="BitwiseAnd",uh="BroadcastArgs",_l="Cast",El="Ceil",Cl="ClipByValue",fh="Complex",hh="ComplexAbs",dh="Concat",ph="Conv2D",mh="Conv2DBackpropFilter",gh="Conv2DBackpropInput",yh="Conv3D",Py="Conv3DBackpropFilterV2",bh="Conv3DBackpropInputV2",Al="Cos",Dl="Cosh",wh="Cumprod",kh="Cumsum",vh="CropAndResize",Sh="DenseBincount",xh="DepthToSpace",Nh="DepthwiseConv2dNative",Ih="DepthwiseConv2dNativeBackpropFilter",Th="DepthwiseConv2dNativeBackpropInput",$h="Diag",_h="Dilation2D",vu="Dilation2DBackpropInput",Su="Dilation2DBackpropFilter",My="Draw",Ol="RealDiv",Eh="Einsum",Fl="Elu",Vy="EluGrad",Rl="Erf",Pl="Equal",Ml="Exp",Ch="ExpandDims",Vl="Expm1",Ah="FFT",Dh="Fill",Oh="FlipLeftRight",Ll="Floor",zl="FloorDiv",Fh="FusedBatchNorm",Rh="GatherV2",Ph="GatherNd",Bl="Greater",Wl="GreaterEqual",Hl="Identity",Mh="IFFT",Vh="Imag",Ul="IsFinite",jl="IsInf",ql="IsNan",Lh="LeakyRelu",Gl="Less",Kl="LessEqual",zh="LinSpace",Xl="Log",Yl="Log1p",Zl="LogicalAnd",Jl="LogicalNot",Ql="LogicalOr",Bh="LRN",Ly="LRNGrad",Wh="Max",tc="Maximum",Hh="MaxPool",zy="MaxPoolGrad",Uh="MaxPool3D",By="MaxPool3DGrad",jh="MaxPoolWithArgmax",qh="Mean",Gh="Min",ec="Minimum",Kh="MirrorPad",nc="Mod",Xh="Multinomial",sc="Multiply",Yh="Neg",rc="NotEqual",Zh="NonMaxSuppressionV3",Jh="NonMaxSuppressionV4",Qh="NonMaxSuppressionV5",td="OnesLike",ed="OneHot",nd="Pack",sd="PadV2",ac="Pow",rd="Prelu",ad="Prod",od="RaggedGather",id="RaggedRange",ld="RaggedTensorToTensor",cd="Range",ud="Real",oc="Reciprocal",ic="Relu",fd="Reshape",hd="ResizeNearestNeighbor",Wy="ResizeNearestNeighborGrad",dd="ResizeBilinear",Hy="ResizeBilinearGrad",lc="Relu6",pd="Reverse",cc="Round",uc="Rsqrt",md="ScatterNd",gd="TensorScatterUpdate",yd="SearchSorted",bd="Select",fc="Selu",wd="Slice",hc="Sin",dc="Sinh",pc="Sign",mc="Sigmoid",gc="Softplus",yc="Sqrt",kd="Sum",vd="SpaceToBatchND",Sd="SplitV",xd="Softmax",Nd="SparseFillEmptyRows",Id="SparseReshape",Td="SparseSegmentMean",$d="SparseSegmentSum",_d="SparseToDense",bc="SquaredDifference",Uy="Square",wc="StaticRegexReplace",Ed="StridedSlice",Cd="StringNGrams",Ad="StringSplit",Dd="StringToHashBucketFast",kc="Sub",vc="Tan",Sc="Tanh",xc="Tile",Od="TopK",Fd="Transform",Ca="Transpose",Rd="Unique",Pd="Unpack",Md="UnsortedSegmentSum",Vd="ZerosLike",Nc="Step",xu="FromPixels",Ld="RotateWithOffset",xi="_FusedMatMul",Ni="FusedConv2D",Ii="FusedDepthwiseConv2D";/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vs(...e){$t().getBool("IS_TEST")||$t().getBool("PROD")||console.warn(...e)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qa=wl("kernelRegistry",()=>new Map),jy=wl("gradRegistry",()=>new Map);function Ti(e,t){const n=zd(e,t);return qa.get(n)}function Nu(e){return jy.get(e)}function Iu(e){const t=qa.entries(),n=[];for(;;){const{done:s,value:r}=t.next();if(s)break;const[a,o]=r,[i]=a.split("_");i===e&&n.push(o)}return n}function qy(e){const{kernelName:t,backendName:n}=e,s=zd(t,n);qa.has(s)&&vs(`The kernel '${t}' for backend '${n}' is already registered`),qa.set(s,e)}function zd(e,t){return`${t}_${e}`}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bd(e){return e instanceof Float32Array||e instanceof Int32Array||e instanceof Uint8Array||e instanceof Uint8ClampedArray}function Gy(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}function Ky(e){if(Object.prototype.hasOwnProperty.call(e,"__esModule"))return e;var t=e.default;if(typeof t=="function"){var n=function s(){return this instanceof s?Reflect.construct(t,arguments,this.constructor):t.apply(this,arguments)};n.prototype=t.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(e).forEach(function(s){var r=Object.getOwnPropertyDescriptor(e,s);Object.defineProperty(n,s,r.get?r:{enumerable:!0,get:function(){return e[s]}})}),n}var ei,Tu;function Xy(){if(Tu)return ei;Tu=1,ei=t;var e=null;try{e=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function t(x,v,R){this.low=x|0,this.high=v|0,this.unsigned=!!R}t.prototype.__isLong__,Object.defineProperty(t.prototype,"__isLong__",{value:!0});function n(x){return(x&&x.__isLong__)===!0}t.isLong=n;var s={},r={};function a(x,v){var R,P,V;return v?(x>>>=0,(V=0<=x&&x<256)&&(P=r[x],P)?P:(R=i(x,(x|0)<0?-1:0,!0),V&&(r[x]=R),R)):(x|=0,(V=-128<=x&&x<128)&&(P=s[x],P)?P:(R=i(x,x<0?-1:0,!1),V&&(s[x]=R),R))}t.fromInt=a;function o(x,v){if(isNaN(x))return v?w:m;if(v){if(x<0)return w;if(x>=p)return E}else{if(x<=-y)return D;if(x+1>=y)return $}return x<0?o(-x,v).neg():i(x%d|0,x/d|0,v)}t.fromNumber=o;function i(x,v,R){return new t(x,v,R)}t.fromBits=i;var l=Math.pow;function c(x,v,R){if(x.length===0)throw Error("empty string");if(x==="NaN"||x==="Infinity"||x==="+Infinity"||x==="-Infinity")return m;if(typeof v=="number"?(R=v,v=!1):v=!!v,R=R||10,R<2||36<R)throw RangeError("radix");var P;if((P=x.indexOf("-"))>0)throw Error("interior hyphen");if(P===0)return c(x.substring(1),v,R).neg();for(var V=o(l(R,8)),M=m,L=0;L<x.length;L+=8){var W=Math.min(8,x.length-L),z=parseInt(x.substring(L,L+W),R);if(W<8){var H=o(l(R,W));M=M.mul(H).add(o(z))}else M=M.mul(V),M=M.add(o(z))}return M.unsigned=v,M}t.fromString=c;function u(x,v){return typeof x=="number"?o(x,v):typeof x=="string"?c(x,v):i(x.low,x.high,typeof v=="boolean"?v:x.unsigned)}t.fromValue=u;var f=65536,h=1<<24,d=f*f,p=d*d,y=p/2,g=a(h),m=a(0);t.ZERO=m;var w=a(0,!0);t.UZERO=w;var S=a(1);t.ONE=S;var k=a(1,!0);t.UONE=k;var I=a(-1);t.NEG_ONE=I;var $=i(-1,2147483647,!1);t.MAX_VALUE=$;var E=i(-1,-1,!0);t.MAX_UNSIGNED_VALUE=E;var D=i(0,-2147483648,!1);t.MIN_VALUE=D;var _=t.prototype;return _.toInt=function(){return this.unsigned?this.low>>>0:this.low},_.toNumber=function(){return this.unsigned?(this.high>>>0)*d+(this.low>>>0):this.high*d+(this.low>>>0)},_.toString=function(v){if(v=v||10,v<2||36<v)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(D)){var R=o(v),P=this.div(R),V=P.mul(R).sub(this);return P.toString(v)+V.toInt().toString(v)}else return"-"+this.neg().toString(v);for(var M=o(l(v,6),this.unsigned),L=this,W="";;){var z=L.div(M),H=L.sub(z.mul(M)).toInt()>>>0,K=H.toString(v);if(L=z,L.isZero())return K+W;for(;K.length<6;)K="0"+K;W=""+K+W}},_.getHighBits=function(){return this.high},_.getHighBitsUnsigned=function(){return this.high>>>0},_.getLowBits=function(){return this.low},_.getLowBitsUnsigned=function(){return this.low>>>0},_.getNumBitsAbs=function(){if(this.isNegative())return this.eq(D)?64:this.neg().getNumBitsAbs();for(var v=this.high!=0?this.high:this.low,R=31;R>0&&(v&1<<R)==0;R--);return this.high!=0?R+33:R+1},_.isZero=function(){return this.high===0&&this.low===0},_.eqz=_.isZero,_.isNegative=function(){return!this.unsigned&&this.high<0},_.isPositive=function(){return this.unsigned||this.high>=0},_.isOdd=function(){return(this.low&1)===1},_.isEven=function(){return(this.low&1)===0},_.equals=function(v){return n(v)||(v=u(v)),this.unsigned!==v.unsigned&&this.high>>>31===1&&v.high>>>31===1?!1:this.high===v.high&&this.low===v.low},_.eq=_.equals,_.notEquals=function(v){return!this.eq(v)},_.neq=_.notEquals,_.ne=_.notEquals,_.lessThan=function(v){return this.comp(v)<0},_.lt=_.lessThan,_.lessThanOrEqual=function(v){return this.comp(v)<=0},_.lte=_.lessThanOrEqual,_.le=_.lessThanOrEqual,_.greaterThan=function(v){return this.comp(v)>0},_.gt=_.greaterThan,_.greaterThanOrEqual=function(v){return this.comp(v)>=0},_.gte=_.greaterThanOrEqual,_.ge=_.greaterThanOrEqual,_.compare=function(v){if(n(v)||(v=u(v)),this.eq(v))return 0;var R=this.isNegative(),P=v.isNegative();return R&&!P?-1:!R&&P?1:this.unsigned?v.high>>>0>this.high>>>0||v.high===this.high&&v.low>>>0>this.low>>>0?-1:1:this.sub(v).isNegative()?-1:1},_.comp=_.compare,_.negate=function(){return!this.unsigned&&this.eq(D)?D:this.not().add(S)},_.neg=_.negate,_.add=function(v){n(v)||(v=u(v));var R=this.high>>>16,P=this.high&65535,V=this.low>>>16,M=this.low&65535,L=v.high>>>16,W=v.high&65535,z=v.low>>>16,H=v.low&65535,K=0,Y=0,Z=0,Q=0;return Q+=M+H,Z+=Q>>>16,Q&=65535,Z+=V+z,Y+=Z>>>16,Z&=65535,Y+=P+W,K+=Y>>>16,Y&=65535,K+=R+L,K&=65535,i(Z<<16|Q,K<<16|Y,this.unsigned)},_.subtract=function(v){return n(v)||(v=u(v)),this.add(v.neg())},_.sub=_.subtract,_.multiply=function(v){if(this.isZero())return m;if(n(v)||(v=u(v)),e){var R=e.mul(this.low,this.high,v.low,v.high);return i(R,e.get_high(),this.unsigned)}if(v.isZero())return m;if(this.eq(D))return v.isOdd()?D:m;if(v.eq(D))return this.isOdd()?D:m;if(this.isNegative())return v.isNegative()?this.neg().mul(v.neg()):this.neg().mul(v).neg();if(v.isNegative())return this.mul(v.neg()).neg();if(this.lt(g)&&v.lt(g))return o(this.toNumber()*v.toNumber(),this.unsigned);var P=this.high>>>16,V=this.high&65535,M=this.low>>>16,L=this.low&65535,W=v.high>>>16,z=v.high&65535,H=v.low>>>16,K=v.low&65535,Y=0,Z=0,Q=0,ot=0;return ot+=L*K,Q+=ot>>>16,ot&=65535,Q+=M*K,Z+=Q>>>16,Q&=65535,Q+=L*H,Z+=Q>>>16,Q&=65535,Z+=V*K,Y+=Z>>>16,Z&=65535,Z+=M*H,Y+=Z>>>16,Z&=65535,Z+=L*z,Y+=Z>>>16,Z&=65535,Y+=P*K+V*H+M*z+L*W,Y&=65535,i(Q<<16|ot,Y<<16|Z,this.unsigned)},_.mul=_.multiply,_.divide=function(v){if(n(v)||(v=u(v)),v.isZero())throw Error("division by zero");if(e){if(!this.unsigned&&this.high===-2147483648&&v.low===-1&&v.high===-1)return this;var R=(this.unsigned?e.div_u:e.div_s)(this.low,this.high,v.low,v.high);return i(R,e.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?w:m;var P,V,M;if(this.unsigned){if(v.unsigned||(v=v.toUnsigned()),v.gt(this))return w;if(v.gt(this.shru(1)))return k;M=w}else{if(this.eq(D)){if(v.eq(S)||v.eq(I))return D;if(v.eq(D))return S;var L=this.shr(1);return P=L.div(v).shl(1),P.eq(m)?v.isNegative()?S:I:(V=this.sub(v.mul(P)),M=P.add(V.div(v)),M)}else if(v.eq(D))return this.unsigned?w:m;if(this.isNegative())return v.isNegative()?this.neg().div(v.neg()):this.neg().div(v).neg();if(v.isNegative())return this.div(v.neg()).neg();M=m}for(V=this;V.gte(v);){P=Math.max(1,Math.floor(V.toNumber()/v.toNumber()));for(var W=Math.ceil(Math.log(P)/Math.LN2),z=W<=48?1:l(2,W-48),H=o(P),K=H.mul(v);K.isNegative()||K.gt(V);)P-=z,H=o(P,this.unsigned),K=H.mul(v);H.isZero()&&(H=S),M=M.add(H),V=V.sub(K)}return M},_.div=_.divide,_.modulo=function(v){if(n(v)||(v=u(v)),e){var R=(this.unsigned?e.rem_u:e.rem_s)(this.low,this.high,v.low,v.high);return i(R,e.get_high(),this.unsigned)}return this.sub(this.div(v).mul(v))},_.mod=_.modulo,_.rem=_.modulo,_.not=function(){return i(~this.low,~this.high,this.unsigned)},_.and=function(v){return n(v)||(v=u(v)),i(this.low&v.low,this.high&v.high,this.unsigned)},_.or=function(v){return n(v)||(v=u(v)),i(this.low|v.low,this.high|v.high,this.unsigned)},_.xor=function(v){return n(v)||(v=u(v)),i(this.low^v.low,this.high^v.high,this.unsigned)},_.shiftLeft=function(v){return n(v)&&(v=v.toInt()),(v&=63)===0?this:v<32?i(this.low<<v,this.high<<v|this.low>>>32-v,this.unsigned):i(0,this.low<<v-32,this.unsigned)},_.shl=_.shiftLeft,_.shiftRight=function(v){return n(v)&&(v=v.toInt()),(v&=63)===0?this:v<32?i(this.low>>>v|this.high<<32-v,this.high>>v,this.unsigned):i(this.high>>v-32,this.high>=0?0:-1,this.unsigned)},_.shr=_.shiftRight,_.shiftRightUnsigned=function(v){if(n(v)&&(v=v.toInt()),v&=63,v===0)return this;var R=this.high;if(v<32){var P=this.low;return i(P>>>v|R<<32-v,R>>>v,this.unsigned)}else return v===32?i(R,0,this.unsigned):i(R>>>v-32,0,this.unsigned)},_.shru=_.shiftRightUnsigned,_.shr_u=_.shiftRightUnsigned,_.toSigned=function(){return this.unsigned?i(this.low,this.high,!1):this},_.toUnsigned=function(){return this.unsigned?this:i(this.low,this.high,!0)},_.toBytes=function(v){return v?this.toBytesLE():this.toBytesBE()},_.toBytesLE=function(){var v=this.high,R=this.low;return[R&255,R>>>8&255,R>>>16&255,R>>>24,v&255,v>>>8&255,v>>>16&255,v>>>24]},_.toBytesBE=function(){var v=this.high,R=this.low;return[v>>>24,v>>>16&255,v>>>8&255,v&255,R>>>24,R>>>16&255,R>>>8&255,R&255]},t.fromBytes=function(v,R,P){return P?t.fromBytesLE(v,R):t.fromBytesBE(v,R)},t.fromBytesLE=function(v,R){return new t(v[0]|v[1]<<8|v[2]<<16|v[3]<<24,v[4]|v[5]<<8|v[6]<<16|v[7]<<24,R)},t.fromBytesBE=function(v,R){return new t(v[4]<<24|v[5]<<16|v[6]<<8|v[7],v[0]<<24|v[1]<<16|v[2]<<8|v[3],R)},ei}var Wd=Xy();const Hd=Gy(Wd),Yy=py({__proto__:null,default:Hd},[Wd]);/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ss=Hd||Yy;function To(e){return Ss.fromString(e,!0,16)}const Ud=To("c3a5c85c97cb3127"),ws=To("b492b66fbe98f273"),pe=To("9ae16a3b2f90404f");function $i(e){return e.xor(e.shru(47))}function jd(e,t,n){const s=e.slice(t,t+n);return Ss.fromBytes(Array.from(s),!0,!0)}function zt(e,t){return jd(e,t,8)}function $u(e,t){return jd(e,t,4)}function re(e,t){return t===0?e:e.shru(t).or(e.shl(64-t))}function ss(e,t,n=To("9ddfea08eb382d69")){let s=e.xor(t).mul(n);s=s.xor(s.shru(47));let r=t.xor(s).mul(n);return r=r.xor(r.shru(47)),r=r.mul(n),r}function Zy(e,t,n,s,r,a){r=r.add(e),a=re(a.add(r).add(s),21);const o=r;return r=r.add(t),r=r.add(n),a=a.add(re(r,44)),[r.add(s),a.add(o)]}function Sa(e,t,n,s){return Zy(zt(e,t),zt(e,t+8),zt(e,t+16),zt(e,t+24),n,s)}function Jy(e,t=e.length){if(t>=8){const n=pe.add(t*2),s=zt(e,0).add(pe),r=zt(e,t-8),a=re(r,37).mul(n).add(s),o=re(s,25).add(r).mul(n);return ss(a,o,n)}if(t>=4){const n=pe.add(t*2),s=$u(e,0);return ss(s.shl(3).add(t),$u(e,t-4),n)}if(t>0){const n=e[0],s=e[t>>1],r=e[t-1],a=n+(s<<8),o=t+(r<<2);return $i(pe.mul(a).xor(Ud.mul(o))).mul(pe)}return pe}function Qy(e,t=e.length){const n=pe.add(t*2),s=zt(e,0).mul(ws),r=zt(e,8),a=zt(e,t-8).mul(n),o=zt(e,t-16).mul(pe);return ss(re(s.add(r),43).add(re(a,30)).add(o),s.add(re(r.add(pe),18)).add(a),n)}function tb(e,t=e.length){const n=pe.add(t*2),s=zt(e,0).mul(pe),r=zt(e,8),a=zt(e,t-8).mul(n),o=zt(e,t-16).mul(pe),i=re(s.add(r),43).add(re(a,30)).add(o),l=ss(i,s.add(re(r.add(pe),18)).add(a),n),c=zt(e,16).mul(n),u=zt(e,24),f=i.add(zt(e,t-32)).mul(n),h=l.add(zt(e,t-24)).mul(n);return ss(re(c.add(u),43).add(re(f,30)).add(h),c.add(re(u.add(s),18)).add(f),n)}function eb(e,t=e.length){const n=Ss.fromNumber(81,!0);if(t<=32)return t<=16?Jy(e,t):Qy(e,t);if(t<=64)return tb(e,t);let s=n,r=n.mul(ws).add(113),a=$i(r.mul(pe).add(113)).mul(pe),o=[Ss.UZERO,Ss.UZERO],i=[Ss.UZERO,Ss.UZERO];s=s.mul(pe).add(zt(e,0));let l=0;const c=(t-1>>6)*64,u=c+(t-1&63)-63;do s=re(s.add(r).add(o[0]).add(zt(e,l+8)),37).mul(ws),r=re(r.add(o[1]).add(zt(e,l+48)),42).mul(ws),s=s.xor(i[1]),r=r.add(o[0]).add(zt(e,l+40)),a=re(a.add(i[0]),33).mul(ws),o=Sa(e,l,o[1].mul(ws),s.add(i[0])),i=Sa(e,l+32,a.add(i[1]),r.add(zt(e,l+16))),[a,s]=[s,a],l+=64;while(l!==c);const f=ws.add(a.and(255).shl(1));return l=u,i[0]=i[0].add(t-1&63),o[0]=o[0].add(i[0]),i[0]=i[0].add(o[0]),s=re(s.add(r).add(o[0]).add(zt(e,l+8)),37).mul(f),r=re(r.add(o[1]).add(zt(e,l+48)),42).mul(f),s=s.xor(i[1].mul(9)),r=r.add(o[0].mul(9).add(zt(e,l+40))),a=re(a.add(i[0]),33).mul(f),o=Sa(e,l,o[1].mul(f),s.add(i[0])),i=Sa(e,l+32,a.add(i[1]),r.add(zt(e,l+16))),[a,s]=[s,a],ss(ss(o[0],i[0],f).add($i(r).mul(Ud)).add(a),ss(o[1],i[1],f).add(s),f)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ic(e,t){return t==="string"?_s(e):Hs([e],t)}function nb(e,t){return e instanceof Float32Array&&t==="float32"||e instanceof Int32Array&&t==="int32"||e instanceof Uint8Array&&t==="bool"}function Hs(e,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(e)&&(e=Jr(e)),$t().getBool("DEBUG")&&vy(e,t),nb(e,t))return e;if(t==null||t==="float32"||t==="complex64")return new Float32Array(e);if(t==="int32")return new Int32Array(e);if(t==="bool"){const n=new Uint8Array(e.length);for(let s=0;s<n.length;++s)Math.round(e[s])!==0&&(n[s]=1);return n}else throw new Error(`Unknown data type ${t}`)}function ur(){return $t().platform.now()}function _s(e,t="utf-8"){return t=t||"utf-8",$t().platform.encode(e,t)}function Zr(e,t="utf-8"){return t=t||"utf-8",$t().platform.decode(e,t)}function Xe(e){return $t().platform.isTypedArray!=null?$t().platform.isTypedArray(e):Bd(e)}function Jr(e,t=[],n=!1){if(t==null&&(t=[]),typeof e=="boolean"||typeof e=="number"||typeof e=="string"||As(e)||e==null||Xe(e)&&n)t.push(e);else if(Array.isArray(e)||Xe(e))for(let s=0;s<e.length;++s)Jr(e[s],t,n);else{let s=-1;for(const r of Object.keys(e))/^([1-9]+[0-9]*|0)$/.test(r)&&(s=Math.max(s,Number(r)));for(let r=0;r<=s;r++)Jr(e[r],t,n)}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class sb{constructor(t,n){this.backendTimer=t,this.logger=n,n==null&&(this.logger=new ab)}profileKernel(t,n,s){let r;const a=()=>{r=s()};let o;const i=ur();if(this.backendTimer.timerAvailable())o=this.backendTimer.time(a);else{a();for(const c of r)c.dataSync();o=Promise.resolve({kernelMs:ur()-i})}if($t().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let c=0;c<r.length;c++){const u=r[c];u.data().then(f=>{rb(f,u.dtype,t)})}return{kernelName:t,outputs:r,inputs:n,timeMs:o.then(c=>c.kernelMs),extraInfo:o.then(c=>c.getExtraProfileInfo!=null?c.getExtraProfileInfo():"")}}logKernelProfile(t){const{kernelName:n,outputs:s,timeMs:r,inputs:a,extraInfo:o}=t;s.forEach(i=>{Promise.all([i.data(),r,o]).then(l=>{this.logger.logKernelProfile(n,i,l[0],l[1],a,l[2])})})}}function rb(e,t,n){if(t!=="float32")return!1;for(let s=0;s<e.length;s++){const r=e[s];if(isNaN(r)||!isFinite(r))return console.warn(`Found ${r} in the result of '${n}'`),!0}return!1}class ab{logKernelProfile(t,n,s,r,a,o){const i=typeof r=="number"?Ea(`${r}ms`,9):r.error,l=Ea(t,25),c=n.rank,u=n.size,f=Ea(n.shape.toString(),14);let h="";for(const d in a){const p=a[d];if(p!=null){const y=p.shape||n.shape,g=y.length;h+=`${d}: ${g}D ${g>0?y:""} `}}console.log(`%c${l}	%c${i}	%c${c}D ${f}	%c${u}	%c${h}	%c${o}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ob(e,t,n){const s={},r={};for(let l=0;l<t.length;l++)s[t[l].id]=!0;for(let l=0;l<e.length;l++){const c=e[l],u=c.inputs;for(const f in u){const h=u[f];let d=!1;for(let p=0;p<t.length;p++)if(s[h.id]){c.outputs.forEach(y=>s[y.id]=!0),d=!0,r[c.id]=!0;break}if(d)break}}const a={};a[n.id]=!0;const o={};for(let l=e.length-1;l>=0;l--){const c=e[l],u=c.inputs;for(let f=0;f<c.outputs.length;f++)if(a[c.outputs[f].id]){for(const h in u)a[u[h].id]=!0,o[c.id]=!0;break}}const i=[];for(let l=0;l<e.length;l++){const c=e[l];if(r[c.id]&&o[c.id]){const u={};for(const h in c.inputs){const d=c.inputs[h];s[d.id]&&(u[h]=d)}const f=Object.assign({},c);f.inputs=u,f.outputs=c.outputs,i.push(f)}}return i}function ib(e,t,n,s){for(let r=t.length-1;r>=0;r--){const a=t[r],o=[];if(a.outputs.forEach(l=>{const c=e[l.id];c!=null?o.push(c):o.push(null)}),a.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${a.kernelName}.`);const i=a.gradient(o);for(const l in a.inputs){if(!(l in i))throw new Error(`Cannot backprop through input ${l}. Available gradients found: ${Object.keys(i)}.`);const c=n(()=>i[l]());if(c.dtype!=="float32")throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input ${l} must have 'float32' dtype, but has '${c.dtype}'`);const u=a.inputs[l];if(!Ke(c.shape,u.shape))throw new Error(`Error in gradient for op ${a.kernelName}. The gradient of input '${l}' has shape '${c.shape}', which does not match the shape of the input '${u.shape}'`);if(e[u.id]==null)e[u.id]=c;else{const f=e[u.id];e[u.id]=s(f,c),f.dispose()}}}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _u=20,Er=3,ni=7;function lb(e,t,n,s){const r=yt(t),a=cb(e,t,n,r),o=t.length,i=Aa(e,t,n,r,a),l=["Tensor"];return s&&(l.push(`  dtype: ${n}`),l.push(`  rank: ${o}`),l.push(`  shape: [${t}]`),l.push("  values:")),l.push(i.map(c=>"    "+c).join(`
`)),l.join(`
`)}function cb(e,t,n,s){const r=nt(t),a=s[s.length-1],o=new Array(a).fill(0),i=t.length,l=n==="complex64"?Rr(e):e;if(i>1)for(let c=0;c<r/a;c++){const u=c*a;for(let f=0;f<a;f++)o[f]=Math.max(o[f],Fr(l[u+f],0,n).length)}return o}function Fr(e,t,n){let s;return Array.isArray(e)?s=`${parseFloat(e[0].toFixed(ni))} + ${parseFloat(e[1].toFixed(ni))}j`:No(e)?s=`'${e}'`:n==="bool"?s=qd(e):s=parseFloat(e.toFixed(ni)).toString(),Ea(s,t)}function qd(e){return e===0?"false":"true"}function Aa(e,t,n,s,r,a=!0){const o=n==="complex64"?2:1,i=t[0],l=t.length;if(l===0){if(n==="complex64"){const y=Rr(e);return[Fr(y[0],0,n)]}return n==="bool"?[qd(e[0])]:[e[0].toString()]}if(l===1){if(i>_u){const g=Er*o;let m=Array.from(e.slice(0,g)),w=Array.from(e.slice((i-Er)*o,i*o));return n==="complex64"&&(m=Rr(m),w=Rr(w)),["["+m.map((S,k)=>Fr(S,r[k],n)).join(", ")+", ..., "+w.map((S,k)=>Fr(S,r[i-Er+k],n)).join(", ")+"]"]}return["["+(n==="complex64"?Rr(e):Array.from(e)).map((g,m)=>Fr(g,r[m],n)).join(", ")+"]"]}const c=t.slice(1),u=s.slice(1),f=s[0]*o,h=[];if(i>_u){for(let y=0;y<Er;y++){const g=y*f,m=g+f;h.push(...Aa(e.slice(g,m),c,n,u,r,!1))}h.push("...");for(let y=i-Er;y<i;y++){const g=y*f,m=g+f;h.push(...Aa(e.slice(g,m),c,n,u,r,y===i-1))}}else for(let y=0;y<i;y++){const g=y*f,m=g+f;h.push(...Aa(e.slice(g,m),c,n,u,r,y===i-1))}const d=l===2?",":"";h[0]="["+(i>0?h[0]+d:"");for(let y=1;y<h.length-1;y++)h[y]=" "+h[y]+d;let p=`,
`;for(let y=2;y<l;y++)p+=`
`;return h[h.length-1]=" "+h[h.length-1]+"]"+(a?"":p),h}function Rr(e){const t=[];for(let n=0;n<e.length;n+=2)t.push([e[n],e[n+1]]);return t}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ee{constructor(t,n,s){if(this.dtype=n,this.shape=t.slice(),this.size=nt(t),s!=null){const r=s.length;T(r===this.size,()=>`Length of values '${r}' does not match the size inferred by the shape '${this.size}'.`)}if(n==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=s||Qt(n,this.size),this.strides=yt(t)}set(t,...n){n.length===0&&(n=[0]),T(n.length===this.rank,()=>`The number of provided coordinates (${n.length}) must match the rank (${this.rank})`);const s=this.locToIndex(n);this.values[s]=t}get(...t){t.length===0&&(t=[0]);let n=0;for(const r of t){if(r<0||r>=this.shape[n]){const a=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(a)}n++}let s=t[t.length-1];for(let r=0;r<t.length-1;++r)s+=this.strides[r]*t[r];return this.values[s]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let n=t[t.length-1];for(let s=0;s<t.length-1;++s)n+=this.strides[s]*t[s];return n}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];const n=new Array(this.shape.length);for(let s=0;s<n.length-1;++s)n[s]=Math.floor(t/this.strides[s]),t-=n[s]*this.strides[s];return n[n.length-1]=t,n}get rank(){return this.shape.length}toTensor(){return Ze().makeTensor(this.values,this.shape,this.dtype)}}let Ze=null,Xs=null;function ub(e){Ze=e}function fb(e){Xs=e}class me{constructor(t,n,s,r){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=n||"float32",this.size=nt(t),this.strides=yt(t),this.dataId=s,this.id=r,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){const t=await this.data();return Xs.buffer(this.shape,this.dtype,t)}bufferSync(){return Xs.buffer(this.shape,this.dtype,this.dataSync())}async array(){const t=await this.data();return qe(this.shape,t,this.dtype==="complex64")}arraySync(){return qe(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();const t=Ze().read(this.dataId);if(this.dtype==="string"){const n=await t;try{return n.map(s=>Zr(s))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t}dataToGPU(t){return this.throwIfDisposed(),Ze().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();const t=Ze().readSync(this.dataId);if(this.dtype==="string")try{return t.map(n=>Zr(n))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}async bytes(){this.throwIfDisposed();const t=await Ze().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||(this.kerasMask&&this.kerasMask.dispose(),Ze().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return Xs.print(this,t)}clone(){return this.throwIfDisposed(),Xs.clone(this)}toString(t=!1){const n=this.dataSync();return lb(n,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),Xs.cast(this,t)}variable(t=!0,n,s){return this.throwIfDisposed(),Ze().makeVariable(this,t,n,s)}}Object.defineProperty(me,Symbol.hasInstance,{value:e=>!!e&&e.data!=null&&e.dataSync!=null&&e.throwIfDisposed!=null});function Gd(){return wl("Tensor",()=>me)}Gd();class Ga extends me{constructor(t,n,s,r){super(t.shape,t.dtype,t.dataId,r),this.trainable=n,this.name=s}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!Ke(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);Ze().disposeTensor(this),this.dataId=t.dataId,Ze().incRef(this,null)}dispose(){Ze().disposeVariable(this),this.isDisposedInternal=!0}}Object.defineProperty(Ga,Symbol.hasInstance,{value:e=>e instanceof me&&e.assign!=null&&e.assign instanceof Function});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Eu;(function(e){e.R0="R0",e.R1="R1",e.R2="R2",e.R3="R3",e.R4="R4",e.R5="R5",e.R6="R6"})(Eu||(Eu={}));var _i;(function(e){e.float32="float32",e.int32="int32",e.bool="int32",e.complex64="complex64"})(_i||(_i={}));var Ei;(function(e){e.float32="float32",e.int32="int32",e.bool="bool",e.complex64="complex64"})(Ei||(Ei={}));var Ci;(function(e){e.float32="float32",e.int32="float32",e.bool="float32",e.complex64="complex64"})(Ci||(Ci={}));var Ai;(function(e){e.float32="complex64",e.int32="complex64",e.bool="complex64",e.complex64="complex64"})(Ai||(Ai={}));const hb={float32:Ci,int32:_i,bool:Ei,complex64:Ai};function xr(e,t){if(e==="string"||t==="string"){if(e==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${e} with ${t}`)}return hb[e][t]}function Kd(e){return e!=null&&typeof e=="object"&&"texture"in e&&e.texture instanceof WebGLTexture}function Xd(e){return typeof GPUBuffer<"u"&&e!=null&&typeof e=="object"&&"buffer"in e&&e.buffer instanceof GPUBuffer}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xt(e,t){if(e.dtype===t.dtype)return[e,t];const n=xr(e.dtype,t.dtype);return[e.cast(n),t.cast(n)]}function db(e,t){T(e.dtype===t.dtype,()=>`The dtypes of the first(${e.dtype}) and second(${t.dtype}) input must match`)}function Yd(e){const t=[];return Zd(e,t,new Set),t}function Zd(e,t,n){if(e==null)return;if(e instanceof me){t.push(e);return}if(!pb(e))return;const s=e;for(const r in s){const a=s[r];n.has(a)||(n.add(a),Zd(a,t,n))}}function pb(e){return Array.isArray(e)||typeof e=="object"}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function si(e){return e.kernelName!=null}class Cu{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(const t in this.registeredVariables)this.registeredVariables[t].dispose()}}class fr{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new Cu}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;const t=this.getSortedBackends();for(let n=0;n<t.length;n++){const s=t[n];if(await this.initializeBackend(s).success){await this.setBackend(s);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){const{name:t,asyncInit:n}=this.initializeBackendsAndReturnBest();if(n)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){const{asyncInit:n}=this.initializeBackend(t);if(n)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,n,s=1){return t in this.registryFactory?(vs(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:n,priority:s},!0)}async setBackend(t){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;const{success:n,asyncInit:s}=this.initializeBackend(t);if(!(s?await n:n))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new sb(this.backendInstance),!0}setupRegisteredKernels(){Iu(this.backendName).forEach(n=>{n.setupFunc!=null&&n.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){Iu(t).forEach(s=>{s.disposeFunc!=null&&s.disposeFunc(this.registry[t])})}initializeBackend(t){const n=this.registryFactory[t];if(n==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{const s=n.factory();if(s&&!(s instanceof Kf)&&typeof s.then=="function"){const r=++this.pendingBackendInitId,a=s.then(o=>r<this.pendingBackendInitId?!1:(this.registry[t]=o,this.pendingBackendInit=null,!0)).catch(o=>(r<this.pendingBackendInitId||(this.pendingBackendInit=null,vs(`Initialization of backend ${t} failed`),vs(o.stack||o.message)),!1));return this.pendingBackendInit=a,{success:a,asyncInit:!0}}else return this.registry[t]=s,{success:!0,asyncInit:!1}}catch(s){return vs(`Initialization of backend ${t} failed`),vs(s.stack||s.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,n)=>this.registryFactory[n].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){const t=this.getSortedBackends();for(let n=0;n<t.length;n++){const s=t[n],{success:r,asyncInit:a}=this.initializeBackend(s);if(a||r)return{name:s,asyncInit:a}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,n){const s=this.state.tensorInfo.get(n),r=s.backend,a=this.readSync(n),o=r.refCount(n);r.disposeData(n,!0),s.backend=t,t.move(n,a,s.shape,s.dtype,o),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,n){let s=null;if(n==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");n=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof n!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");s=t}let r;return this.scopedRun(()=>this.startScope(s),()=>this.endScope(r),()=>(r=n(),r instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),r))}scopedRun(t,n,s){t();try{const r=s();return n(),r}catch(r){throw n(),r}}nextTensorId(){return fr.nextTensorId++}nextVariableId(){return fr.nextVariableId++}clone(t){const n=O.runKernel(Hl,{x:t}),s={x:t},r=o=>({x:()=>{const i="float32",l={x:o},c={dtype:i};return O.runKernel(_l,l,c)}}),a=[];return this.addTapeNode(this.state.activeScope.name,s,[n],r,a,{}),n}runKernel(t,n,s){if(this.backendName==null&&this.backend,!(Ti(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:n,attrs:s})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,n,s){const r=this.backend.numDataIds();let a=0;s.forEach(l=>{a+=l.dtype==="complex64"?3:1});const o=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=r-n-a-o;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${t}'`)}runKernelFunc(t){let n,s=[];const r=this.isTapeOn(),a=this.state.numBytes,o=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let l;const c=si(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(si(t)){const{kernelName:p,inputs:y,attrs:g}=t;this.backendName==null&&this.backend;const m=Ti(p,this.backendName);T(m!=null,()=>`Cannot find registered kernel '${p}' for backend '${this.backendName}'`),i=()=>{const w=this.backend.numDataIds();l=m.kernelFunc({inputs:y,attrs:g,backend:this.backend});const S=Array.isArray(l)?l:[l];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(p,w,S);const k=S.map(I=>I.rank!=null?I:this.makeTensorFromTensorInfo(I));if(r){const I=this.getTensorsForGradient(p,y,k);s=this.saveTensorsForBackwardMode(I)}return k}}else{const{forwardFunc:p}=t,y=g=>{r&&(s=g.map(m=>this.keep(this.clone(m))))};i=()=>{const g=this.backend.numDataIds();l=this.tidy(()=>p(this.backend,y));const m=Array.isArray(l)?l:[l];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(c,g,m),m}}const{inputs:u,attrs:f}=t,h=si(t)?null:t.backwardsFunc;let d;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?n=i():(d=this.profiler.profileKernel(c,u,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(d),n=d.outputs)}),r&&this.addTapeNode(c,u,n,h,s,f),this.state.profiling&&this.state.activeProfile.kernels.push({name:c,bytesAdded:this.state.numBytes-a,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-o,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(u).map(p=>u[p]!=null?u[p].shape:null),outputShapes:n.map(p=>p.shape),kernelTimeMs:d.timeMs,extraInfo:d.extraInfo}),Array.isArray(l)?n:n[0]}saveTensorsForBackwardMode(t){return t.map(s=>this.keep(this.clone(s)))}getTensorsForGradient(t,n,s){const r=Nu(t);if(r!=null){const a=r.inputsToSave||[],o=r.outputsToSave||[];let i;r.saveAllInputs?(T(Array.isArray(n),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(n).map(c=>n[c])):i=a.map(c=>n[c]);const l=s.filter((c,u)=>o[u]);return i.concat(l)}return[]}makeTensor(t,n,s,r){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");s=s||"float32",r=r||this.backend;let a=t;s==="string"&&No(t[0])&&(a=t.map(l=>_s(l)));const o=r.write(a,n,s),i=new me(n,s,o,this.nextTensorId());if(this.trackTensor(i,r),s==="string"){const l=this.state.tensorInfo.get(o),c=Ny(a);this.state.numBytes+=c-l.bytes,l.bytes=c}return i}makeTensorFromDataId(t,n,s,r){s=s||"float32";const a={dataId:t,shape:n,dtype:s};return this.makeTensorFromTensorInfo(a,r)}makeTensorFromTensorInfo(t,n){const{dataId:s,shape:r,dtype:a}=t,o=new me(r,a,s,this.nextTensorId());return this.trackTensor(o,n),o}makeVariable(t,n=!0,s,r){s=s||this.nextVariableId().toString(),r!=null&&r!==t.dtype&&(t=t.cast(r));const a=new Ga(t,n,s,this.nextTensorId());if(this.state.registeredVariables[a.name]!=null)throw new Error(`Variable with name ${a.name} was already registered`);return this.state.registeredVariables[a.name]=a,this.incRef(a,this.backend),a}trackTensor(t,n){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let s=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(s=t.size*vi(t.dtype)),this.state.numBytes+=s,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:n||this.backend,dtype:t.dtype,shape:t.shape,bytes:s})),t instanceof Ga||this.track(t)}incRef(t,n){this.trackTensor(t,n),this.backend.incRef(t.dataId)}removeDataId(t,n){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===n&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;const n=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=n.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){const s=t.size*vi(t.dtype);this.state.numBytes-=s}n.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,n.backend)}disposeVariables(){for(const t in this.state.registeredVariables){const n=this.state.registeredVariables[t];this.disposeVariable(n)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){const t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}async profile(t){this.state.profiling=!0;const n=this.state.numBytes,s=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(r=>r.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-n,this.state.activeProfile.newTensors=this.state.numTensors-s;for(const r of this.state.activeProfile.kernels)r.kernelTimeMs=await r.kernelTimeMs,r.extraInfo=await r.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,n,s,r,a,o){const i={id:this.state.nextTapeNodeId++,kernelName:t,inputs:n,outputs:s,saved:a},l=Nu(t);l!=null&&(r=l.gradFunc),r!=null&&(i.gradient=c=>(c=c.map((u,f)=>{if(u==null){const h=s[f],d=fe(h.size,h.dtype);return this.makeTensor(d,h.shape,h.dtype)}return u}),r(c.length>1?c:c[0],a,o))),this.state.activeTape.push(i)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){const n={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(n.name=t),this.state.scopeStack.push(n),this.state.activeScope=n}endScope(t){const n=Yd(t),s=new Set(n.map(a=>a.id));for(let a=0;a<this.state.activeScope.track.length;a++){const o=this.state.activeScope.track[a];!o.kept&&!s.has(o.id)&&o.dispose()}const r=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],n.forEach(a=>{!a.kept&&a.scopeId===r.id&&this.track(a)})}gradients(t,n,s,r=!1){if(T(n.length>0,()=>"gradients() received an empty list of xs."),s!=null&&s.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${s.dtype}'`);const a=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));T(a instanceof me,()=>"The result y returned by f() must be a tensor.");const o=ob(this.state.activeTape,n,a);if(!r&&o.length===0&&n.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{const i={};i[a.id]=s??mb(a.shape),ib(i,o,c=>this.tidy(c),gb);const l=n.map(c=>i[c.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(c=>{for(const u of c.saved)u.dispose()}),this.state.activeTape=null),{value:a,grads:l}})}customGrad(t){return T(Si(t),()=>"The f passed in customGrad(f) must be a function."),(...n)=>{T(n.every(i=>i instanceof me),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let s;const r={};n.forEach((i,l)=>{r[l]=i});const a=(i,l)=>(s=t(...n,l),T(s.value instanceof me,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),T(Si(s.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),s.value),o=(i,l)=>{const c=s.gradFunc(i,l),u=Array.isArray(c)?c:[c];T(u.length===n.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),T(u.every(h=>h instanceof me),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");const f={};return u.forEach((h,d)=>{f[d]=()=>h}),f};return this.runKernelFunc({forwardFunc:a,backwardsFunc:o,inputs:r})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,n){return this.state.tensorInfo.get(t).backend.readToGPU(t,n)}async time(t){const n=ur(),s=await this.backend.time(t);return s.wallMs=ur()-n,s}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new Cu;for(const t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}}fr.nextTensorId=0;fr.nextVariableId=0;function mb(e){const t=bl(nt(e),"float32");return O.makeTensor(t,e,"float32")}function Jd(){const e=Jf();if(e._tfengine==null){const t=new _y(e);e._tfengine=new fr(t)}return Dy(e._tfengine.ENV),ub(()=>e._tfengine),e._tfengine}const O=Jd();function gb(e,t){const n={a:e,b:t};return O.runKernel(Io,n)}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yb(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $e=$t();$e.registerFlag("DEBUG",()=>!1,e=>{e&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});$e.registerFlag("IS_BROWSER",()=>yb());$e.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");$e.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));$e.registerFlag("IS_SAFARI",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Safari/.test(navigator.userAgent)&&/Apple/.test(navigator.vendor));$e.registerFlag("PROD",()=>!1);$e.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>$e.getBool("DEBUG"));$e.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);$e.registerFlag("IS_TEST",()=>!1);$e.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>$e.getBool("DEBUG"));$e.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);$e.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);$e.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fs(e,t){let n=e;if(Xe(e))return t==="string"?[]:[e.length];if(Kd(e)){const r=e.channels||"RGBA";return[e.height,e.width*r.length]}else if(Xd(e))return[e.buffer.size/(t==null?4:vi(t))];if(!Array.isArray(e))return[];const s=[];for(;Array.isArray(n)||Xe(n)&&t!=="string";)s.push(n.length),n=n[0];return Array.isArray(e)&&$t().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Qd(e,s,[]),s}function Qd(e,t,n){if(n=n||[],!Array.isArray(e)&&!Xe(e)){T(t.length===0,()=>`Element arr[${n.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}T(t.length>0,()=>`Element arr[${n.join("][")}] should be a primitive, but is an array of ${e.length} elements`),T(e.length===t[0],()=>`Element arr[${n.join("][")}] should have ${t[0]} elements, but has ${e.length} elements`);const s=t.slice(1);for(let r=0;r<e.length;++r)Qd(e[r],s,n.concat(r))}function Au(e,t,n,s){if(e!=="string_or_numeric"){if(e==null)throw new Error("Expected dtype cannot be null.");if(e!=="numeric"&&e!==t||e==="numeric"&&t==="string")throw new Error(`Argument '${n}' passed to '${s}' must be ${e} tensor, but got ${t} tensor`)}}function N(e,t,n,s="numeric"){if(e instanceof Gd())return Au(s,e.dtype,t,n),e;let r=ha(e);if(r!=="string"&&["bool","int32","float32"].indexOf(s)>=0&&(r=s),Au(s,r,t,n),e==null||!Xe(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string"){const l=e==null?"null":e.constructor.name;throw new Error(`Argument '${t}' passed to '${n}' must be a Tensor or TensorLike, but got '${l}'`)}const a=fs(e,r);!Xe(e)&&!Array.isArray(e)&&(e=[e]);const i=r!=="string"?Hs(e,r):Jr(e,[],!0);return O.makeTensor(i,a,r)}function Ka(e,t,n,s="numeric"){if(!Array.isArray(e))throw new Error(`Argument ${t} passed to ${n} must be a \`Tensor[]\` or \`TensorLike[]\``);return e.map((a,o)=>N(a,`${t}[${o}]`,n,s))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const tp="__op";function A(e){const t=Object.keys(e);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let n=t[0];const s=e[n];n.endsWith("_")&&(n=n.substring(0,n.length-1)),n=n+tp;const r=(...a)=>{O.startScope(n);try{const o=s(...a);return As(o)&&console.error("Cannot return a Promise inside of tidy."),O.endScope(o),o}catch(o){throw O.endScope(null),o}};return Object.defineProperty(r,"name",{value:n,configurable:!0}),r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bb(e,t){const n=N(e,"real","complex"),s=N(t,"imag","complex");Le(n.shape,s.shape,`real and imag shapes, ${n.shape} and ${s.shape}, must match in call to tf.complex().`);const r={real:n,imag:s};return O.runKernel(fh,r)}const is=A({complex_:bb});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hs(e,t,n,s){if(s==null)s=ha(e);else if(s==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(Xd(e)||Kd(e)){if(s!=="float32"&&s!=="int32")throw new Error(`Creating tensor from GPU data only supports 'float32'|'int32' dtype, while the dtype is ${s}.`);return O.backend.createTensorFromGPUData(e,t||n,s)}if(!Xe(e)&&!Array.isArray(e)&&typeof e!="number"&&typeof e!="boolean"&&typeof e!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){ze(t);const r=nt(t),a=nt(n);T(r===a,()=>`Based on the provided shape, [${t}], the tensor should have ${r} values but has ${a}`);for(let o=0;o<n.length;++o){const i=n[o],l=o===n.length-1?i!==nt(t.slice(o)):!0;T(n[o]===t[o]||!l,()=>`Error creating a new Tensor. Inferred shape (${n}) does not match the provided shape (${t}). `)}}return!Xe(e)&&!Array.isArray(e)&&(e=[e]),t=t||n,e=s!=="string"?Hs(e,s):Jr(e,[],!0),O.makeTensor(e,t,s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mn(e,t,n){const s=fs(e,n);return hs(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ds={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};class nn{static join(t){return new nn(t).slice()}constructor(t){if(this.shards=[],this.previousShardIndex=0,t==null||(t instanceof Array||(t=[t]),t=t.map(s=>Xe(s)?s.buffer:s),t.length===0))return;this.bufferUniformSize=t[0].byteLength;let n=0;for(let s=0;s<t.length;s++){const r=t[s];s!==t.length-1&&r.byteLength!==this.bufferUniformSize&&(this.bufferUniformSize=void 0);const a=n+r.byteLength;this.shards.push({buffer:r,start:n,end:a}),n=a}this.shards.length===0&&(this.byteLength=0),this.byteLength=this.shards[this.shards.length-1].end}slice(t=0,n=this.byteLength){if(this.shards.length===0)return new ArrayBuffer(0);if(t=isNaN(Number(t))?0:t,n=isNaN(Number(n))?0:n,t=Math.max(0,t),n=Math.min(this.byteLength,n),n<=t)return new ArrayBuffer(0);const s=this.findShardForByte(t);if(s===-1)throw new Error(`Could not find start shard for byte ${t}`);const r=n-t,a=new ArrayBuffer(r),o=new Uint8Array(a);let i=0;for(let l=s;l<this.shards.length;l++){const c=this.shards[l],f=t+i-c.start,h=i,p=Math.min(n,c.end)-c.start,y=new Uint8Array(c.buffer,f,p-f);if(o.set(y,h),i+=y.length,n<c.end)break}return a}findShardForByte(t){if(this.shards.length===0||t<0||t>=this.byteLength)return-1;if(this.bufferUniformSize!=null)return this.previousShardIndex=Math.floor(t/this.bufferUniformSize),this.previousShardIndex;function n(r){return t<r.start?-1:t>=r.end?1:0}if(n(this.shards[this.previousShardIndex])===0)return this.previousShardIndex;const s=wb(this.shards,n);return s===-1?-1:(this.previousShardIndex=s,this.previousShardIndex)}}function wb(e,t){let n=0,s=e.length;for(;n<=s;){const r=Math.floor((s-n)/2)+n,a=t(e[r]);if(a===0)return r;a<0?s=r:n=r+1}return-1}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Du(){return O}function Dt(e,t){return O.tidy(e,t)}function Te(e){Yd(e).forEach(n=>n.dispose())}function dn(e){return O.keep(e)}function Ou(e){return O.setBackend(e)}function kb(){return O.ready()}function vb(){return O.backendName}function Sb(e,t,n=1){return O.registerBackend(e,t,n)}function xb(){return O.backend}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ls=4;async function Nb(e,t){const n=[],s=[],r=Array.isArray(e)?e.map(o=>o.name):Object.keys(e);for(let o=0;o<r.length;++o){const i=r[o],l=Array.isArray(e)?e[o].tensor:e[i];if(l.dtype!=="float32"&&l.dtype!=="int32"&&l.dtype!=="bool"&&l.dtype!=="string"&&l.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${l.dtype}`);const c={name:i,shape:l.shape,dtype:l.dtype};if(l.dtype==="string"){const u=new Promise(async f=>{const h=await l.bytes(),d=h.reduce((g,m)=>g+m.length,0)+ls*h.length,p=new Uint8Array(d);let y=0;for(let g=0;g<h.length;g++){const m=h[g],w=new Uint8Array(new Uint32Array([m.length]).buffer);p.set(w,y),y+=ls,p.set(m,y),y+=m.length}f(p)});s.push(u)}else s.push(l.data());t!=null&&(c.group=t),n.push(c)}const a=await Promise.all(s);return{data:$b(a),specs:n}}function ep(e,t){const n=new nn(e),s={};let r=0;for(const a of t){const o=Ib(a,(i,l)=>n.slice(r+i,r+l));s[a.name]=np(a,n.slice(r,r+o)),r+=o}return s}function Ib(e,t){const n=nt(e.shape);let s;if("quantization"in e){const r=e.quantization;s=Ds[r.dtype]}else if(e.dtype==="string"){let r=0;for(let a=0;a<n;a++)r+=ls+new Uint32Array(t(r,r+ls))[0];return r}else s=Ds[e.dtype];return n*s}async function Tb(e,t){const n=nt(e.shape);let s;if("quantization"in e){const r=e.quantization;s=Ds[r.dtype]}else if(e.dtype==="string"){let r=0;for(let a=0;a<n;a++)r+=ls+new Uint32Array(await t(r,r+ls))[0];return r}else s=Ds[e.dtype];return n*s}function np(e,t){const n=e.name,s=e.dtype,r=e.shape,a=nt(r);let o,i=0;if("quantization"in e){const l=e.quantization;if(l.dtype==="uint8"||l.dtype==="uint16"){if(!("min"in l&&"scale"in l))throw new Error(`Weight ${e.name} with quantization ${l.dtype} doesn't have corresponding metadata min and scale.`)}else if(l.dtype==="float16"){if(s!=="float32")throw new Error(`Weight ${e.name} is quantized with ${l.dtype} which only supports weights of type float32 not ${s}.`)}else throw new Error(`Weight ${e.name} has unknown quantization dtype ${l.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);const c=Ds[l.dtype],u=l.dtype==="uint8"?new Uint8Array(t):new Uint16Array(t);if(s==="float32")if(l.dtype==="uint8"||l.dtype==="uint16"){o=new Float32Array(u.length);for(let f=0;f<u.length;f++){const h=u[f];o[f]=h*l.scale+l.min}}else if(l.dtype==="float16")o=Fb()(u);else throw new Error(`Unsupported quantization type ${l.dtype} for weight type float32.`);else if(s==="int32"){if(l.dtype!=="uint8"&&l.dtype!=="uint16")throw new Error(`Unsupported quantization type ${l.dtype} for weight type int32.`);o=new Int32Array(u.length);for(let f=0;f<u.length;f++){const h=u[f];o[f]=Math.round(h*l.scale+l.min)}}else throw new Error(`Unsupported dtype in weight '${n}': ${s}`);i+=a*c}else if(s==="string"){const l=nt(e.shape);o=[];for(let c=0;c<l;c++){const u=new Uint32Array(t.slice(i,i+ls))[0];i+=ls;const f=new Uint8Array(t.slice(i,i+u));o.push(f),i+=u}}else{const l=Ds[s];if(s==="float32")o=new Float32Array(t);else if(s==="int32")o=new Int32Array(t);else if(s==="bool")o=new Uint8Array(t);else if(s==="complex64"){o=new Float32Array(t);const c=new Float32Array(o.length/2),u=new Float32Array(o.length/2);for(let p=0;p<c.length;p++)c[p]=o[p*2],u[p]=o[p*2+1];const f=mn(c,r,"float32"),h=mn(u,r,"float32"),d=is(f,h);return f.dispose(),h.dispose(),d}else throw new Error(`Unsupported dtype in weight '${n}': ${s}`);i+=a*l}return mn(o,r,s)}async function Fu(e,t,n){let s=new Uint8Array(t);for(;s.byteLength<n;){const{done:r,value:a}=await e.read();if(r&&a==null){const i=n-s.byteLength;throw new Error(`Reader is done but ${i} bytes are still expected`)}const o=new Uint8Array(s.length+a.byteLength);o.set(s,0),o.set(new Uint8Array(a),s.length),s=o}return s.buffer}async function sp(e,t){const n={},s=e.getReader();let r=new ArrayBuffer(0);for(const a of t){const o=await Tb(a,async(c,u)=>(r=await Fu(s,r,u),r.slice(c,u)));r=await Fu(s,r,o);const i=r.slice(0,o);r=r.slice(o);const l=np(a,i);if(n[a.name]=l,vb()==="webgpu"){const c=xb();"uploadToGPU"in c&&nt(l.shape)>=$t().get("WEBGPU_CPU_HANDOFF_SIZE_THRESHOLD")&&c.uploadToGPU(l.dataId)}}return n}function $b(e){if(e===null)throw new Error(`Invalid input value: ${JSON.stringify(e)}`);let t=0;const n=[];e.forEach(a=>{if(t+=a.byteLength,n.push(a.byteLength===a.buffer.byteLength?a:new a.constructor(a)),!(a instanceof Float32Array||a instanceof Int32Array||a instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${a.constructor.name}`)});const s=new Uint8Array(t);let r=0;return n.forEach(a=>{s.set(new Uint8Array(a.buffer),r),r+=a.byteLength}),s.buffer}const Tc=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Ru(e){return Tc?Buffer.byteLength(e,"utf8"):new Blob([e]).size}function _b(e){if(Tc)return Buffer.from(e).toString("base64");const t=new Uint8Array(e);let n="";for(let s=0,r=t.length;s<r;s++)n+=String.fromCharCode(t[s]);return btoa(n)}function Eb(e){if(Tc){const s=Buffer.from(e,"base64");return s.buffer.slice(s.byteOffset,s.byteOffset+s.byteLength)}const t=atob(e),n=new Uint8Array(t.length);for(let s=0;s<t.length;++s)n.set([t.charCodeAt(s)],s);return n.buffer}function Cb(e){return nn.join(e)}function Pu(e){for(e=e.trim();e.endsWith("/");)e=e.slice(0,e.length-1);const n=e.split("/");return n[n.length-1]}function rp(e,t){const n={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy,weightsManifest:t};return e.signature!=null&&(n.signature=e.signature),e.userDefinedMetadata!=null&&(n.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(n.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(n.initializerSignature=e.initializerSignature),e.trainingConfig!=null&&(n.trainingConfig=e.trainingConfig),n}function ap(e,t,n){const s={modelTopology:e.modelTopology,format:e.format,generatedBy:e.generatedBy,convertedBy:e.convertedBy};if(e.trainingConfig!=null&&(s.trainingConfig=e.trainingConfig),e.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!n)throw new Error("modelJSON has weightsManifest but weightData is null");s.weightSpecs=t,s.weightData=n}return e.signature!=null&&(s.signature=e.signature),e.userDefinedMetadata!=null&&(s.userDefinedMetadata=e.userDefinedMetadata),e.modelInitializer!=null&&(s.modelInitializer=e.modelInitializer),e.initializerSignature!=null&&(s.initializerSignature=e.initializerSignature),s}async function $c(e,t){let n,s;return e.weightsManifest!=null&&([n,s]=await t(e.weightsManifest)),ap(e,n,s)}function da(e){if(e.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:e.modelTopology==null?0:Ru(JSON.stringify(e.modelTopology)),weightSpecsBytes:e.weightSpecs==null?0:Ru(JSON.stringify(e.weightSpecs)),weightDataBytes:e.weightData==null?0:new nn(e.weightData).byteLength}}function Di(e){const t=[];for(const n of e)t.push(...n.weights);return t}function Ab(){const e=n=>{let s=n<<13,r=0;for(;(s&8388608)===0;)r-=8388608,s<<=1;return s&=-8388609,r+=947912704,s|r},t=new Uint32Array(2048);t[0]=0;for(let n=1;n<1024;n++)t[n]=e(n);for(let n=1024;n<2048;n++)t[n]=939524096+(n-1024<<13);return t}function Db(){const e=new Uint32Array(64);e[0]=0,e[31]=1199570944,e[32]=2147483648,e[63]=3347054592;for(let t=1;t<31;t++)e[t]=t<<23;for(let t=33;t<63;t++)e[t]=2147483648+(t-32<<23);return e}function Ob(){const e=new Uint32Array(64);for(let t=0;t<64;t++)e[t]=1024;return e[0]=e[32]=0,e}function Fb(){const e=Ab(),t=Db(),n=Ob();return s=>{const r=new ArrayBuffer(4*s.length),a=new Uint32Array(r);for(let o=0;o<s.length;o++){const i=s[o],l=e[n[i>>10]+(i&1023)]+t[i>>10];a[o]=l}return new Float32Array(r)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Gt{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return Gt.instance==null&&(Gt.instance=new Gt),Gt.instance}static registerSaveRouter(t){Gt.getInstance().saveRouters.push(t)}static registerLoadRouter(t){Gt.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return Gt.getHandlers(t,"save")}static getLoadHandlers(t,n){return Gt.getHandlers(t,"load",n)}static getHandlers(t,n,s){const r=[];return(n==="load"?Gt.getInstance().loadRouters:Gt.getInstance().saveRouters).forEach(o=>{const i=o(t,s);i!==null&&r.push(i)}),r}}const Rb=e=>Gt.registerSaveRouter(e),Pb=e=>Gt.registerLoadRouter(e),Mb=e=>Gt.getSaveHandlers(e),Vb=(e,t)=>Gt.getLoadHandlers(e,t);/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Oi="tensorflowjs",Fi=1,Ts="models_store",ts="model_info_store";function op(){if(!$t().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");const e=typeof window>"u"?self:window,t=e.indexedDB||e.mozIndexedDB||e.webkitIndexedDB||e.msIndexedDB||e.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function Ri(e){const t=e.result;t.createObjectStore(Ts,{keyPath:"modelPath"}),t.createObjectStore(ts,{keyPath:"modelPath"})}class Os{constructor(t){if(this.indexedDB=op(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)}async load(){return this.databaseAction(this.modelPath)}databaseAction(t,n){return new Promise((s,r)=>{const a=this.indexedDB.open(Oi,Fi);a.onupgradeneeded=()=>Ri(a),a.onsuccess=()=>{const o=a.result;if(n==null){const i=o.transaction(Ts,"readonly"),c=i.objectStore(Ts).get(this.modelPath);c.onsuccess=()=>{if(c.result==null)return o.close(),r(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));s(c.result.modelArtifacts)},c.onerror=u=>(o.close(),r(c.error)),i.oncomplete=()=>o.close()}else{n.weightData=nn.join(n.weightData);const i=da(n),l=o.transaction(ts,"readwrite");let c=l.objectStore(ts),u;try{u=c.put({modelPath:this.modelPath,modelArtifactsInfo:i})}catch(h){return r(h)}let f;u.onsuccess=()=>{f=o.transaction(Ts,"readwrite");const h=f.objectStore(Ts);let d;try{d=h.put({modelPath:this.modelPath,modelArtifacts:n,modelArtifactsInfo:i})}catch(p){return r(p)}d.onsuccess=()=>s({modelArtifactsInfo:i}),d.onerror=p=>{c=l.objectStore(ts);const y=c.delete(this.modelPath);y.onsuccess=()=>(o.close(),r(d.error)),y.onerror=g=>(o.close(),r(d.error))}},u.onerror=h=>(o.close(),r(u.error)),l.oncomplete=()=>{f==null?o.close():f.oncomplete=()=>o.close()}}},a.onerror=o=>r(a.error)})}}Os.URL_SCHEME="indexeddb://";const ip=e=>$t().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Os.URL_SCHEME)?Lb(e.slice(Os.URL_SCHEME.length)):null;Gt.registerSaveRouter(ip);Gt.registerLoadRouter(ip);function Lb(e){return new Os(e)}function zb(e){return e.startsWith(Os.URL_SCHEME)?e.slice(Os.URL_SCHEME.length):e}class Bb{constructor(){this.indexedDB=op()}async listModels(){return new Promise((t,n)=>{const s=this.indexedDB.open(Oi,Fi);s.onupgradeneeded=()=>Ri(s),s.onsuccess=()=>{const r=s.result,a=r.transaction(ts,"readonly"),i=a.objectStore(ts).getAll();i.onsuccess=()=>{const l={};for(const c of i.result)l[c.modelPath]=c.modelArtifactsInfo;t(l)},i.onerror=l=>(r.close(),n(i.error)),a.oncomplete=()=>r.close()},s.onerror=r=>n(s.error)})}async removeModel(t){return t=zb(t),new Promise((n,s)=>{const r=this.indexedDB.open(Oi,Fi);r.onupgradeneeded=()=>Ri(r),r.onsuccess=()=>{const a=r.result,o=a.transaction(ts,"readwrite"),i=o.objectStore(ts),l=i.get(t);let c;l.onsuccess=()=>{if(l.result==null)return a.close(),s(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{const u=i.delete(t),f=()=>{c=a.transaction(Ts,"readwrite");const d=c.objectStore(Ts).delete(t);d.onsuccess=()=>n(l.result.modelArtifactsInfo),d.onerror=p=>s(l.error)};u.onsuccess=f,u.onerror=h=>(f(),a.close(),s(l.error))}},l.onerror=u=>(a.close(),s(l.error)),o.oncomplete=()=>{c==null?a.close():c.oncomplete=()=>a.close()}},r.onerror=a=>s(r.error)})}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const On="/",Ys="tensorflowjs_models",lp="info",Wb="model_topology",Hb="weight_specs",Ub="weight_data",jb="model_metadata";function cp(e){return{info:[Ys,e,lp].join(On),topology:[Ys,e,Wb].join(On),weightSpecs:[Ys,e,Hb].join(On),weightData:[Ys,e,Ub].join(On),modelMetadata:[Ys,e,jb].join(On)}}function up(e){for(const t of Object.values(e))window.localStorage.removeItem(t)}function qb(e){const t=e.split(On);if(t.length<3)throw new Error(`Invalid key format: ${e}`);return t.slice(1,t.length-1).join(On)}function Gb(e){return e.startsWith(Fs.URL_SCHEME)?e.slice(Fs.URL_SCHEME.length):e}class Fs{constructor(t){if(!$t().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=cp(this.modelPath)}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{const n=JSON.stringify(t.modelTopology),s=JSON.stringify(t.weightSpecs),r=da(t),a=nn.join(t.weightData);try{this.LS.setItem(this.keys.info,JSON.stringify(r)),this.LS.setItem(this.keys.topology,n),this.LS.setItem(this.keys.weightSpecs,s),this.LS.setItem(this.keys.weightData,_b(a));const o={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,initializerSignature:t.initializerSignature!=null?t.initializerSignature:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(o)),{modelArtifactsInfo:r}}catch{throw up(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${r.modelTopologyBytes}, weightSpecsBytes=${r.weightSpecsBytes}, weightDataBytes=${r.weightDataBytes}.`)}}}async load(){const t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");const n={},s=JSON.parse(this.LS.getItem(this.keys.topology));if(s==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);n.modelTopology=s;const r=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(r==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);n.weightSpecs=r;const a=this.LS.getItem(this.keys.modelMetadata);if(a!=null){const i=JSON.parse(a);n.format=i.format,n.generatedBy=i.generatedBy,n.convertedBy=i.convertedBy,i.signature!=null&&(n.signature=i.signature),i.userDefinedMetadata!=null&&(n.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(n.modelInitializer=i.modelInitializer),i.initializerSignature!=null&&(n.initializerSignature=i.initializerSignature),i.trainingConfig!=null&&(n.trainingConfig=i.trainingConfig)}const o=this.LS.getItem(this.keys.weightData);if(o==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return n.weightData=Eb(o),n}}Fs.URL_SCHEME="localstorage://";const fp=e=>$t().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Fs.URL_SCHEME)?Kb(e.slice(Fs.URL_SCHEME.length)):null;Gt.registerSaveRouter(fp);Gt.registerLoadRouter(fp);function Kb(e){return new Fs(e)}class Xb{constructor(){T($t().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),T(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){const t={},n=Ys+On,s=On+lp;for(let r=0;r<this.LS.length;++r){const a=this.LS.key(r);if(a.startsWith(n)&&a.endsWith(s)){const o=qb(a);t[o]=JSON.parse(this.LS.getItem(a))}}return t}async removeModel(t){t=Gb(t);const n=cp(t);if(this.LS.getItem(n.info)==null)throw new Error(`Cannot find model at path '${t}'`);const s=JSON.parse(this.LS.getItem(n.info));return up(n),s}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nr="://";class de{constructor(){this.managers={}}static getInstance(){return de.instance==null&&(de.instance=new de),de.instance}static registerManager(t,n){T(t!=null,()=>"scheme must not be undefined or null."),t.endsWith(nr)&&(t=t.slice(0,t.indexOf(nr))),T(t.length>0,()=>"scheme must not be an empty string.");const s=de.getInstance();T(s.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),s.managers[t]=n}static getManager(t){const n=de.getInstance().managers[t];if(n==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return n}static getSchemes(){return Object.keys(de.getInstance().managers)}}function Da(e){if(e.indexOf(nr)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${de.getSchemes().join(",")}`);return{scheme:e.split(nr)[0],path:e.split(nr)[1]}}async function hp(e,t,n=!1){T(e!==t,()=>`Old path and new path are the same: '${e}'`);const s=Gt.getLoadHandlers(e);T(s.length>0,()=>`Copying failed because no load handler is found for source URL ${e}.`),T(s.length<2,()=>`Copying failed because more than one (${s.length}) load handlers for source URL ${e}.`);const r=s[0],a=Gt.getSaveHandlers(t);T(a.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),T(a.length<2,()=>`Copying failed because more than one (${s.length}) save handlers for destination URL ${t}.`);const o=a[0],i=Da(e).scheme,l=Da(e).path,c=i===Da(e).scheme,u=await r.load();n&&c&&await de.getManager(i).removeModel(l);const f=await o.save(u);return n&&!c&&await de.getManager(i).removeModel(l),f.modelArtifactsInfo}async function Yb(){const e=de.getSchemes(),t={};for(const n of e){const s=await de.getManager(n).listModels();for(const r in s){const a=n+nr+r;t[a]=s[r]}}return t}async function Zb(e){const t=Da(e);return de.getManager(t.scheme).removeModel(t.path)}async function Jb(e,t){return hp(e,t,!1)}async function Qb(e,t){return hp(e,t,!0)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class t0{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,n){return fetch(t,n)}now(){return performance.now()}encode(t,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${n}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,n){return new TextDecoder(n).decode(t)}setTimeoutCustom(t,n){if(typeof window>"u"||!$t().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,n);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},n),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",s=>{if(s.source===window&&s.data.name===this.messageName){s.stopPropagation();const r=this.functionRefs[s.data.index];r(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}isTypedArray(t){return Bd(t)}}if($t().get("IS_BROWSER")){$t().setPlatform("browser",new t0);try{de.registerManager(Fs.URL_SCHEME,new Xb)}catch{}try{de.registerManager(Os.URL_SCHEME,new Bb)}catch{}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const e0={importFetch:()=>require("node-fetch")};let ri;class n0{constructor(){this.util=require("util"),this.textEncoder=new this.util.TextEncoder}fetch(t,n){return $t().global.fetch!=null?$t().global.fetch(t,n):(ri==null&&(ri=e0.importFetch()),ri(t,n))}now(){const t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,n){if(n!=="utf-8"&&n!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${n}`);return this.textEncoder.encode(t)}decode(t,n){return t.length===0?"":new this.util.TextDecoder(n).decode(t)}isTypedArray(t){return this.util.types.isFloat32Array(t)||this.util.types.isInt32Array(t)||this.util.types.isUint8Array(t)||this.util.types.isUint8ClampedArray(t)}}$t().get("IS_NODE")&&!$t().get("IS_BROWSER")&&$t().setPlatform("node",new n0);/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Et(e,t="float32",n){return t=t||"float32",ze(e),new ee(e,t,n)}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function s0(e,t){const n=N(e,"x","cast");if(!Sy(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&n.dtype!=="string"||t!=="string"&&n.dtype==="string")throw new Error("Only strings can be casted to strings");const s={x:n},r={dtype:t};return O.runKernel(_l,s,r)}const Zt=A({cast_:s0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function r0(e){const n={x:N(e,"x","clone","string_or_numeric")};return O.runKernel(Hl,n)}const rs=A({clone_:r0});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dp(e,t=!1){console.log(e.toString(t))}/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Jd();const a0={buffer:Et,cast:Zt,clone:rs,print:dp};fb(a0);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o0(e,t){let n=N(e,"a","add"),s=N(t,"b","add");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(Io,r)}const vt=A({add_:o0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function i0(e,t){let n=N(e,"a","floorDiv"),s=N(t,"b","floorDiv");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(zl,r)}const pp=A({floorDiv_:i0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function l0(e,t){let n=N(e,"a","div"),s=N(t,"b","div");if([n,s]=Xt(n,s),n.dtype==="int32"&&s.dtype==="int32")return pp(n,s);const r={a:n,b:s},a={};return O.runKernel(Ol,r,a)}const Wt=A({div_:l0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function c0(e,t){let n=N(e,"a","mul"),s=N(t,"b","mul");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(sc,r)}const lt=A({mul_:c0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u0(e){const t=N(e,"x","abs");if(t.dtype==="complex64"){const n={x:t};return O.runKernel(hh,n)}else{const n={x:t};return O.runKernel(Qf,n)}}const Pe=A({abs_:u0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function f0(e){const n={x:N(e,"x","acos")};return O.runKernel(kl,n)}const h0=A({acos_:f0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function d0(e){const n={x:N(e,"x","acosh")};return O.runKernel(vl,n)}const p0=A({acosh_:d0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function m0(e){T(Array.isArray(e),()=>"The argument passed to tf.addN() must be a list of tensors"),T(e.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${e.length}`);const t=e.map((r,a)=>N(r,`tensors${a}`,"addN")),n=t[0];t.forEach(r=>{if(r.dtype!==n.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(r=>{if(!Ke(r.shape,n.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});const s=t;return O.runKernel(th,s)}const g0=A({addN_:m0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function y0(e,t=null,n=!1){const r={x:N(e,"x","all","bool")},a={axis:t,keepDims:n};return O.runKernel(eh,r,a)}const b0=A({all_:y0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function w0(e,t=null,n=!1){const r={x:N(e,"x","any","bool")},a={axis:t,keepDims:n};return O.runKernel(nh,r,a)}const k0=A({any_:w0});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function v0(e,t=0){const s={x:N(e,"x","argMax")},r={axis:t};return O.runKernel(sh,s,r)}const S0=A({argMax_:v0});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function x0(e,t=0){const s={x:N(e,"x","argMin")},r={axis:t};return O.runKernel(rh,s,r)}const N0=A({argMin_:x0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function I0(e){const n={x:N(e,"x","asin")};return O.runKernel(Sl,n)}const T0=A({asin_:I0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $0(e){const n={x:N(e,"x","asinh")};return O.runKernel(xl,n)}const _0=A({asinh_:$0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E0(e){const n={x:N(e,"x","atan")};return O.runKernel(Nl,n)}const C0=A({atan_:E0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function A0(e,t){let n=N(e,"a","atan2"),s=N(t,"b","atan2");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(Tl,r)}const D0=A({atan2_:A0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function O0(e){const n={x:N(e,"x","atanh")};return O.runKernel(Il,n)}const F0=A({atanh_:O0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _c(e,t,n,s,r="NHWC",a){const o=e[3],i=[...t,o],l=Eo(r);return xn(e,i,n,a,s,null,null,l)}function Nr(e,t,n,s,r,a,o="channelsLast"){const[i,l]=Qr(t);let c;if(o==="channelsLast")c=[i,l,e[3],e[3]];else if(o==="channelsFirst")c=[i,l,e[1],e[1]];else throw new Error(`Unknown dataFormat ${o}`);return xn(e,c,n,s,r,a,!1,o)}function $o(e,t,n,s,r,a,o="NDHWC"){const[i,l,c]=Pi(t);let u,f;if(o==="NDHWC")f="channelsLast",u=[i,l,c,e[4],e[4]];else if(o==="NCDHW")f="channelsFirst",u=[i,l,c,e[1],e[1]];else throw new Error(`Unknown dataFormat ${o}`);return _o(e,u,n,s,r,!1,f,a)}function xn(e,t,n,s,r,a,o=!1,i="channelsLast"){let[l,c,u,f]=[-1,-1,-1,-1];if(i==="channelsLast")[l,c,u,f]=e;else if(i==="channelsFirst")[l,f,c,u]=e;else throw new Error(`Unknown dataFormat ${i}`);const[h,d,,p]=t,[y,g]=Qr(n),[m,w]=Qr(s),S=sr(h,m),k=sr(d,w),{padInfo:I,outHeight:$,outWidth:E}=M0(r,c,u,y,g,S,k,a,i),D=o?p*f:p;let _;return i==="channelsFirst"?_=[l,D,$,E]:i==="channelsLast"&&(_=[l,$,E,D]),{batchSize:l,dataFormat:i,inHeight:c,inWidth:u,inChannels:f,outHeight:$,outWidth:E,outChannels:D,padInfo:I,strideHeight:y,strideWidth:g,filterHeight:h,filterWidth:d,effectiveFilterHeight:S,effectiveFilterWidth:k,dilationHeight:m,dilationWidth:w,inShape:e,outShape:_,filterShape:t}}function _o(e,t,n,s,r,a=!1,o="channelsLast",i){let[l,c,u,f,h]=[-1,-1,-1,-1,-1];if(o==="channelsLast")[l,c,u,f,h]=e;else if(o==="channelsFirst")[l,h,c,u,f]=e;else throw new Error(`Unknown dataFormat ${o}`);const[d,p,y,,g]=t,[m,w,S]=Pi(n),[k,I,$]=Pi(s),E=sr(d,k),D=sr(p,I),_=sr(y,$),{padInfo:x,outDepth:v,outHeight:R,outWidth:P}=V0(r,c,u,f,m,w,S,E,D,_,i),V=a?g*h:g;let M;return o==="channelsFirst"?M=[l,V,v,R,P]:o==="channelsLast"&&(M=[l,v,R,P,V]),{batchSize:l,dataFormat:o,inDepth:c,inHeight:u,inWidth:f,inChannels:h,outDepth:v,outHeight:R,outWidth:P,outChannels:V,padInfo:x,strideDepth:m,strideHeight:w,strideWidth:S,filterDepth:d,filterHeight:p,filterWidth:y,effectiveFilterDepth:E,effectiveFilterHeight:D,effectiveFilterWidth:_,dilationDepth:k,dilationHeight:I,dilationWidth:$,inShape:e,outShape:M,filterShape:t}}function R0(e,t,n,s,r){s==null&&(s=mp(e,t,n));const a=e[0],o=e[1],i=ta((a-t+2*s)/n+1,r),l=ta((o-t+2*s)/n+1,r);return[i,l]}function P0(e,t,n,s,r,a){r==null&&(r=mp(e,t[0],s[0]));const o=[0,0,0,n];for(let i=0;i<3;i++)e[i]+2*r>=t[i]&&(o[i]=ta((e[i]-t[i]+2*r)/s[i]+1,a));return o}function mp(e,t,n,s=1){const r=sr(t,s);return Math.floor((e[0]*(n-1)-n+r)/2)}function Qr(e){return typeof e=="number"?[e,e,e]:e.length===2?[e[0],e[1],1]:e}function Pi(e){return typeof e=="number"?[e,e,e]:e}function sr(e,t){return t<=1?e:e+(e-1)*(t-1)}function M0(e,t,n,s,r,a,o,i,l){let c,u,f;if(typeof e=="number"){c={top:e,bottom:e,left:e,right:e,type:e===0?"VALID":"NUMBER"};const d=R0([t,n],a,s,e,i);u=d[0],f=d[1]}else if(e==="same"){u=Math.ceil(t/s),f=Math.ceil(n/r);const h=Math.max(0,(u-1)*s+a-t),d=Math.max(0,(f-1)*r+o-n),p=Math.floor(h/2),y=h-p,g=Math.floor(d/2),m=d-g;c={top:p,bottom:y,left:g,right:m,type:"SAME"}}else if(e==="valid")c={top:0,bottom:0,left:0,right:0,type:"VALID"},u=Math.ceil((t-a+1)/s),f=Math.ceil((n-o+1)/r);else if(typeof e=="object"){const h=l==="channelsLast"?e[1][0]:e[2][0],d=l==="channelsLast"?e[1][1]:e[2][1],p=l==="channelsLast"?e[2][0]:e[3][0],y=l==="channelsLast"?e[2][1]:e[3][1];c={top:h,bottom:d,left:p,right:y,type:h===0&&d===0&&p===0&&y===0?"VALID":"EXPLICIT"},u=ta((t-a+h+d)/s+1,i),f=ta((n-o+p+y)/r+1,i)}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outHeight:u,outWidth:f}}function V0(e,t,n,s,r,a,o,i,l,c,u){let f,h,d,p;if(e==="valid"&&(e=0),typeof e=="number"){f={top:e,bottom:e,left:e,right:e,front:e,back:e,type:e===0?"VALID":"NUMBER"};const g=P0([t,n,s,1],[i,l,c],1,[r,a,o],e,u);h=g[0],d=g[1],p=g[2]}else if(e==="same"){h=Math.ceil(t/r),d=Math.ceil(n/a),p=Math.ceil(s/o);const y=(h-1)*r+i-t,g=(d-1)*a+l-n,m=(p-1)*o+c-s,w=Math.floor(y/2),S=y-w,k=Math.floor(g/2),I=g-k,$=Math.floor(m/2),E=m-$;f={top:k,bottom:I,left:$,right:E,front:w,back:S,type:"SAME"}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:f,outDepth:h,outHeight:d,outWidth:p}}function ta(e,t){if(!t)return Math.trunc(e);switch(t){case"round":return Math.round(e);case"ceil":return Math.ceil(e);case"floor":return Math.floor(e);default:throw new Error(`Unknown roundingMode ${t}`)}}function Xa(e){const[t,n,s]=Qr(e);return t===1&&n===1&&s===1}function sn(e,t){return Xa(e)||Xa(t)}function hr(e){return Qr(e).every(t=>t>0)}function Eo(e){if(e==="NHWC")return"channelsLast";if(e==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${e}`)}function rn(e,t,n){if(n!=null){if(typeof t=="string")throw Error(`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);if(typeof t=="number")T(Yr(t),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${t}.`);else if(typeof t=="object")t.forEach(s=>{s.forEach(r=>{T(Yr(r),()=>`Error in ${e}: pad must be an integer when using dimRoundingMode ${n} but got pad ${r}.`)})});else throw Error(`Error in ${e}: Unknown padding parameter: ${t}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function L0(e,t){const s={x:N(e,"x","reshape","string_or_numeric")},r={shape:t};return O.runKernel(fd,s,r)}const X=A({reshape_:L0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function z0(e,t,n,s,r){const a=N(e,"x","avgPool","float32"),o=1;T(sn(n,o),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`);let i=a,l=!1;a.rank===3&&(l=!0,i=X(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),rn("avgPool",s,r);const c={x:i},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r};let f=O.runKernel(ah,c,u);return f=Zt(f,a.dtype),l?X(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const gp=A({avgPool_:z0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function B0(e,t,n,s,r,a="NDHWC"){const o=N(e,"x","avgPool3d","float32");let i=o,l=!1;o.rank===4&&(l=!0,i=X(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),T(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),T(a==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),T(typeof n=="number"&&n>0||Array.isArray(n)&&n[0]>0&&n[1]>0&&n[2]>0,()=>`Error in avgPool3d: Stride must be > 0, but got '${n}'`),rn("avgPool3d",s,r);const c={x:i},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r,dataFormat:a};let f=O.runKernel(oh,c,u);return f=Zt(f,i.dtype),l?X(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const W0=A({avgPool3d_:B0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function H0(e,t=0){T(e.length>=1,()=>"Pass at least one tensor to concat");const n=Ka(e,"tensors","concat","string_or_numeric");if(n[0].dtype==="complex64"&&n.forEach(a=>{if(a.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${a.dtype}. `)}),n.length===1)return rs(n[0]);const s=n,r={axis:t};return O.runKernel(dh,s,r)}const be=A({concat_:H0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function U0(e,t,n=!1,s=!1){let r=N(e,"a","matMul"),a=N(t,"b","matMul");[r,a]=Xt(r,a);const o={a:r,b:a},i={transposeA:n,transposeB:s};return O.runKernel(ih,o,i)}const Mt=A({matMul_:U0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j0(e){const n={x:N(e,"x","sigmoid","float32")};return O.runKernel(mc,n)}const rr=A({sigmoid_:j0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function q0(e,t,n){const s=N(e,"x","slice","string_or_numeric");if(s.rank===0)throw new Error("Slicing scalar is not possible");const r={x:s},a={begin:t,size:n};return O.runKernel(wd,r,a)}const Bt=A({slice_:q0});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G0(e){const n={x:N(e,"x","tanh","float32")};return O.runKernel(Sc,n)}const Mi=A({tanh_:G0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function K0(e,t,n,s,r,a){const o=N(e,"forgetBias","basicLSTMCell"),i=N(t,"lstmKernel","basicLSTMCell"),l=N(n,"lstmBias","basicLSTMCell"),c=N(s,"data","basicLSTMCell"),u=N(r,"c","basicLSTMCell"),f=N(a,"h","basicLSTMCell"),h=be([c,f],1),d=Mt(h,i),p=vt(d,l),y=p.shape[0],g=p.shape[1]/4,m=[y,g],w=Bt(p,[0,0],m),S=Bt(p,[0,g],m),k=Bt(p,[0,g*2],m),I=Bt(p,[0,g*3],m),$=vt(lt(rr(w),Mi(S)),lt(u,rr(vt(o,k)))),E=lt(Mi($),rr(I));return[$,E]}const X0=A({basicLSTMCell_:K0});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Y0(e,t,n){const s=N(e,"x","batchToSpaceND"),r=t.reduce((i,l)=>i*l);T(s.rank>=1+t.length,()=>`input rank is ${s.rank} but should be > than blockShape.length ${t.length}`),T(n.length===t.length,()=>`crops.length is ${n.length} but should be equal to blockShape.length  ${t.length}`),T(s.shape[0]%r===0,()=>`input tensor batch is ${s.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${r}`);const a={x:s},o={blockShape:t,crops:n};return O.runKernel(lh,a,o)}const yp=A({batchToSpaceND_:Y0});function Z0(e){let t;return e.rank===0||e.rank===1?t=X(e,[1,1,1,e.size]):e.rank===2?t=X(e,[1,1,e.shape[0],e.shape[1]]):e.rank===3?t=X(e,[1,e.shape[0],e.shape[1],e.shape[2]]):t=e,t}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function J0(e,t,n,s,r,a){a==null&&(a=.001);const o=N(e,"x","batchNorm"),i=N(t,"mean","batchNorm"),l=N(n,"variance","batchNorm");let c;r!=null&&(c=N(r,"scale","batchNorm"));let u;s!=null&&(u=N(s,"offset","batchNorm")),T(i.rank===l.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),T(u==null||i.rank===u.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),T(c==null||i.rank===c.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");const h={x:Z0(o),scale:c,offset:u,mean:i,variance:l},d={varianceEpsilon:a},p=O.runKernel(Fh,h,d);return X(p,o.shape)}const Co=A({batchNorm_:J0});function Q0(e,t,n,s,r,a){const o=N(e,"x","batchNorm"),i=N(t,"mean","batchNorm"),l=N(n,"variance","batchNorm");let c;r!=null&&(c=N(r,"scale","batchNorm"));let u;return s!=null&&(u=N(s,"offset","batchNorm")),T(o.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${o.rank}.`),T(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),T(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===2||u.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${u.rank}.`),Co(o,i,l,u,c,a)}const t1=A({batchNorm2d_:Q0});function e1(e,t,n,s,r,a){const o=N(e,"x","batchNorm"),i=N(t,"mean","batchNorm"),l=N(n,"variance","batchNorm");let c;r!=null&&(c=N(r,"scale","batchNorm"));let u;return s!=null&&(u=N(s,"offset","batchNorm")),T(o.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${o.rank}.`),T(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),T(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===3||u.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${u.rank}.`),Co(o,i,l,u,c,a)}const n1=A({batchNorm3d_:e1});function s1(e,t,n,s,r,a){const o=N(e,"x","batchNorm"),i=N(t,"mean","batchNorm"),l=N(n,"variance","batchNorm");let c;r!=null&&(c=N(r,"scale","batchNorm"));let u;return s!=null&&(u=N(s,"offset","batchNorm")),T(o.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${o.rank}.`),T(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),T(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${l.rank}.`),c!=null&&T(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${c.rank}.`),u!=null&&T(u.rank===4||u.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${u.rank}.`),Co(o,i,l,u,c,a)}const r1=A({batchNorm4d_:s1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function a1(e,t,n){const s=N(e,"x","bincount"),r=N(t,"weights","bincount");T(s.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${s.dtype}`),T(n>=0,()=>`size must be non-negative, but got ${n}.`),T(r.size===s.size||r.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${s.shape}, weights shape: ${r.shape}.`);const a={x:s,weights:r},o={size:n};return O.runKernel(ch,a,o)}const bp=A({bincount_:a1});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o1(e,t){const n=N(e,"x","bitwiseAnd"),s=N(t,"y","bitwiseAnd");if(!Ke(n.shape,s.shape))throw new Error(`BitwiseAnd: Tensors must have the same shape. x: ${n.shape}, y: ${s.shape}`);if(n.dtype!=="int32"||s.dtype!=="int32")throw new Error(`BitwiseAnd: Only supports 'int32' values in tensor, found type of x: ${n.dtype} and type of y: ${s.dtype}`);const r={a:n,b:s};return O.runKernel($l,r)}const i1=A({bitwiseAnd_:o1});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function l1(e,t){const n=N(e,"s0","broadcastArgs","int32"),s=N(t,"s1","broadcastArgs","int32");if(n.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${n.rank}`);if(s.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${s.rank}`);const r={s0:n,s1:s};return O.runKernel(uh,r)}const c1=A({broadcastArgs_:l1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u1(e,t){let n=N(e,"broadcastTo","x");const s=n.shape;if(ze(t),t.length<n.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${n.rank}.`);if(t.length>n.rank){const c=n.shape.slice();for(;c.length<t.length;)c.unshift(1);n=X(n,c)}const r=n.shape,a=Array.from(t);for(let c=t.length-1;c>=0;c--)if(r[c]===t[c])a[c]=1;else if(n.shape[c]!==1)throw new Error(`broadcastTo(): [${s}] cannot be broadcast to [${t}].`);if(a.map((c,u)=>c>1?u:-1).filter(c=>c>=0).length===0)return rs(n);const i={x:n},l={reps:a};return O.runKernel(xc,i,l)}const Lr=A({broadcastTo_:u1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function f1(e){const n={x:N(e,"x","ceil","float32")};return O.runKernel(El,n)}const h1=A({ceil_:f1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pa(e,t,n){ze(e),n=n||ha(t);const s={shape:e,value:t,dtype:n};return O.runKernel(Dh,{},s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function d1(e,t,n){const s=N(e,"x","clipByValue");if(T(t<=n,()=>`Error in clip: min (${t}) must be less than or equal to max (${n}).`),t===n)return pa(s.shape,t,s.dtype);const r={x:s},a={clipValueMin:t,clipValueMax:n};return O.runKernel(Cl,r,a)}const p1=A({clipByValue_:d1});function m1(e){return be(e,0)}const g1=A({concat1d_:m1});function y1(e,t){return be(e,t)}const b1=A({concat2d_:y1});function w1(e,t){return be(e,t)}const k1=A({concat3d_:w1});function v1(e,t){return be(e,t)}const S1=A({concat4d_:v1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function x1(e,t,n,s,r="NHWC",a=[1,1],o){const i=N(e,"x","conv2d","float32"),l=N(t,"filter","conv2d","float32");let c=i,u=!1;i.rank===3&&(u=!0,c=X(i,[1,i.shape[0],i.shape[1],i.shape[2]])),T(c.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${c.rank}.`),T(l.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${l.rank}.`),rn("conv2d",s,o);const f=r==="NHWC"?c.shape[3]:c.shape[1];T(f===l.shape[2],()=>`Error in conv2d: depth of input (${f}) must match input depth for filter ${l.shape[2]}.`),T(sn(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),T(hr(a),()=>"Error in conv2D: Dilated rates should be larger than 0."),T(hr(n),()=>"Error in conv2D: Strides should be larger than 0.");const h={x:c,filter:l},d={strides:n,pad:s,dataFormat:r,dilations:a,dimRoundingMode:o},p=O.runKernel(ph,h,d);return u?X(p,[p.shape[1],p.shape[2],p.shape[3]]):p}const Ao=A({conv2d_:x1});function N1(e,t,n,s,r="NWC",a=1,o){const i=N(e,"x","conv1d"),l=N(t,"filter","conv1d");let c=i,u=!1;i.rank===2&&(u=!0,c=X(i,[1,i.shape[0],i.shape[1]])),T(c.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${c.rank}.`),T(l.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${l.rank}.`),rn("conv1d",s,o),T(c.shape[2]===l.shape[1],()=>`Error in conv1d: depth of input (${c.shape[2]}) must match input depth for filter ${l.shape[1]}.`),T(sn(n,a),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${n} and dilation '${a}'`),T(hr(a),()=>"Error in conv1D: Dilated rates should be larger than 0."),T(hr(n),()=>"Error in conv1D: Stride should be larger than 0."),T(r==="NWC",()=>`Error in conv1d: got dataFormat of ${r} but only NWC is currently supported.`);const f=X(l,[1,l.shape[0],l.shape[1],l.shape[2]]),h=X(c,[c.shape[0],1,c.shape[1],c.shape[2]]),g=Ao(h,f,[1,n],s,"NHWC",[1,a],o);return u?X(g,[g.shape[2],g.shape[3]]):X(g,[g.shape[0],g.shape[2],g.shape[3]])}const I1=A({conv1d_:N1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T1(e,t,n,s,r,a="NHWC",o){T(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let i=e,l=t,c=!1;t.rank===3&&(c=!0,l=X(t,[1,t.shape[0],t.shape[1],t.shape[2]]),i=[1,e[0],e[1],e[2]]),T(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),T(l.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${l.rank}`),T(n.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${n.rank}`);const u=a==="NHWC"?i[3]:i[1],f=a==="NHWC"?l.shape[3]:l.shape[1];T(u===n.shape[2],()=>`Error in conv2dDerInput: depth of input (${u}) must match input depth for filter ${n.shape[2]}.`),T(f===n.shape[3],()=>`Error in conv2dDerInput: depth of output (${f}) must match output depth for filter ${n.shape[3]}.`),rn("conv2dDerInput",r,o);const h={dy:l,filter:n},d={strides:s,pad:r,dataFormat:a,dimRoundingMode:o,inputShape:i},p=O.runKernel(gh,h,d);return c?X(p,[p.shape[1],p.shape[2],p.shape[3]]):p}const wp=A({conv2DBackpropInput_:T1});function $1(e,t,n,s,r,a){const o=N(e,"x","conv2dTranspose"),i=N(t,"filter","conv2dTranspose");return wp(n,o,i,s,r,"NHWC",a)}const _1=A({conv2dTranspose_:$1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E1(e,t,n,s,r="NDHWC",a=[1,1,1]){const o=N(e,"x","conv3d"),i=N(t,"filter","conv3d");let l=o,c=!1;o.rank===4&&(c=!0,l=X(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),T(l.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${l.rank}.`),T(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),T(l.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${l.shape[4]}) must match input depth for filter ${i.shape[3]}.`),T(sn(n,a),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),T(r==="NDHWC",()=>`Error in conv3d: got dataFormat of ${r} but only NDHWC is currently supported.`),T(hr(a),()=>"Error in conv3D: Dilated rates should be larger than 0."),T(hr(n),()=>"Error in conv3D: Strides should be larger than 0.");const u={x:l,filter:i},f={strides:n,pad:s,dataFormat:r,dilations:a},h=O.runKernel(yh,u,f);return c?X(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const C1=A({conv3d_:E1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function A1(e,t,n,s,r){T(e.length===t.rank,()=>`Length of inShape (${e.length}) and rank of dy (${t.rank}) must match`);let a=e,o=t,i=!1;t.rank===4&&(i=!0,o=X(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),a=[1,e[0],e[1],e[2],e[3]]);const l=a[4],c=o.shape[4];T(a.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${a.length}.`),T(o.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${o.rank}`),T(n.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${n.rank}`),T(l===n.shape[3],()=>`Error in conv3dDerInput: depth of input (${l}) must match input depth for filter ${n.shape[3]}.`),T(c===n.shape[4],()=>`Error in conv3dDerInput: depth of output (${c}) must match output depth for filter ${n.shape[4]}.`);const u={dy:o,filter:n},f={pad:r,strides:s,inputShape:a},h=O.runKernel(bh,u,f);return i?X(h,[h.shape[1],h.shape[2],h.shape[3],h.shape[4]]):h}const D1=A({conv3DBackpropInput_:A1});function O1(e,t,n,s,r){const a=N(e,"x","conv3dTranspose"),o=N(t,"filter","conv3dTranspose");return D1(n,a,o,s,r)}const F1=A({conv3dTranspose_:O1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function R1(e){const n={x:N(e,"x","cos","float32")};return O.runKernel(Al,n)}const P1=A({cos_:R1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function M1(e){const n={x:N(e,"x","cosh","float32")};return O.runKernel(Dl,n)}const V1=A({cosh_:M1});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function L1(e,t=0,n=!1,s=!1){const a={x:N(e,"x","cumprod")},o={axis:t,exclusive:n,reverse:s};return O.runKernel(wh,a,o)}const z1=A({cumprod_:L1});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function B1(e,t=0,n=!1,s=!1){const a={x:N(e,"x","cumsum")},o={axis:t,exclusive:n,reverse:s};return O.runKernel(kh,a,o)}const W1=A({cumsum_:B1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function H1(e,t,n,s=!1){const r=N(e,"x","denseBincount"),a=N(t,"weights","denseBincount");T(r.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${r.dtype}`),T(r.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${r.rank}.`),T(n>=0,()=>`size must be non-negative, but got ${n}.`),T(a.size===r.size||a.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${r.shape}, weights shape: ${a.shape}.`);const o={x:r,weights:a},i={size:n,binaryOutput:s};return O.runKernel(Sh,o,i)}const U1=A({denseBincount_:H1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j1(e,t,n="NHWC"){const s=N(e,"x","depthToSpace","float32"),r=n==="NHWC"?s.shape[1]:s.shape[2],a=n==="NHWC"?s.shape[2]:s.shape[3],o=n==="NHWC"?s.shape[3]:s.shape[1];T(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),T(r*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${r} and ${t}  for depthToSpace with input shape
    ${s.shape}`),T(a*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${a} and ${t} for depthToSpace with input shape
        ${s.shape}`),T(o%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${o} for depthToSpace with input shape ${s.shape}`);const i={x:s},l={blockSize:t,dataFormat:n};return O.runKernel(xh,i,l)}const q1=A({depthToSpace_:j1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G1(e,t,n,s,r="NHWC",a=[1,1],o){const i=N(e,"x","depthwiseConv2d","float32"),l=N(t,"filter","depthwiseConv2d","float32");let c=i,u=!1;i.rank===3&&(u=!0,c=X(i,[1,i.shape[0],i.shape[1],i.shape[2]])),T(c.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${c.rank}.`),T(l.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${l.rank}.`);const f=r==="NHWC"?c.shape[3]:c.shape[1];T(f===l.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${f}) must match the inChannels dimension in filter ${l.shape[2]}.`),rn("depthwiseConv2d",s,o);const h={x:c,filter:l},d={strides:n,pad:s,dataFormat:r,dilations:a,dimRoundingMode:o},p=O.runKernel(Nh,h,d);return u?X(p,[p.shape[1],p.shape[2],p.shape[3]]):p}const Ec=A({depthwiseConv2d_:G1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function K1(e){const n={x:N(e,"x","diag")};return O.runKernel($h,n)}const X1=A({diag_:K1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Y1(e,t,n,s,r=[1,1],a="NHWC"){const o=N(e,"x","dilation2d"),i=N(t,"filter","dilation2d");T(o.rank===3||o.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${o.rank}.`),T(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),T(a==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${a}`);let l=o,c=!1;o.rank===3&&(l=X(o,[1,o.shape[0],o.shape[1],o.shape[2]]),c=!0),T(l.shape[3]===i.shape[2],()=>`Error in dilation2d:  input and filter must have the same depth: ${l.shape[3]} vs ${i.shape[2]}`);const u={x:l,filter:i},f={strides:n,pad:s,dilations:r},h=O.runKernel(_h,u,f);return c?X(h,[h.shape[1],h.shape[2],h.shape[3]]):h}const Z1=A({dilation2d_:Y1});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ya(e,t){const n=e.length,s=[];for(let r=0;r<n;r++){const a=n-1-r,o=e[a]||1;(t[t.length-1-r]||1)>1&&o===1&&s.unshift(a)}return s}function J1(e,t){const n=[];for(let s=0;s<t.length;s++){const r=e[e.length-s-1],a=t.length-s-1,o=t[a];(r==null||r===1&&o>1)&&n.unshift(a)}return n}function Yt(e,t){const n=Math.max(e.length,t.length),s=new Array(n);for(let r=0;r<n;r++){let a=e[e.length-r-1];a==null&&(a=1);let o=t[t.length-r-1];if(o==null&&(o=1),a===1)s[n-r-1]=o;else if(o===1)s[n-r-1]=a;else if(a!==o){const i=`Operands could not be broadcast together with shapes ${e} and ${t}.`;throw Error(i)}else s[n-r-1]=a}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Q1(e,t){let n=N(e,"a","equal","string_or_numeric"),s=N(t,"b","equal","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Pl,r)}const kp=A({equal_:Q1});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tw(e,t,n){const s=N(t,"a","where"),r=N(n,"b","where"),a=N(e,"condition","where","bool"),o=Yt(Yt(a.shape,s.shape),r.shape),i=Lr(a,o),l=Lr(s,o),c=Lr(r,o),u={condition:i,t:l,e:c};return O.runKernel(bd,u)}const as=A({where_:tw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ew(e){const n={x:N(e,"x","zerosLike")};return O.runKernel(Vd,n)}const Ve=A({zerosLike_:ew});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nw(e,t){let n=N(e,"a","div"),s=N(t,"b","div");[n,s]=Xt(n,s);const r=Wt(n,s),a=Ve(r),o=kp(s,a);return as(o,a,r)}const sw=A({divNoNan_:nw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rw(e,t){const n=N(e,"t1","dot"),s=N(t,"t2","dot");T((n.rank===1||n.rank===2)&&(s.rank===1||s.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${n.rank} and ${s.rank}.`);const r=n.rank===1?n.size:n.shape[1],a=s.rank===1?s.size:s.shape[0];if(T(r===a,()=>`Error in dot: inner dimensions of inputs must match, but got ${r} and ${a}.`),n.rank===1&&s.rank===1){const o=X(n,[1,-1]),i=X(s,[-1,1]),l=Mt(o,i);return X(l,[])}else if(n.rank===1&&s.rank===2){const o=X(n,[1,-1]),i=X(s,[s.shape[0],s.shape[1]]),l=Mt(o,i);return X(l,[l.size])}else if(n.rank===2&&s.rank===1){const o=X(s,[-1,1]),i=Mt(n,o);return X(i,[i.size])}else{const o=X(s,[s.shape[0],s.shape[1]]);return Mt(n,o)}}const aw=A({dot_:rw});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ow(e,...t){const n=t.map((r,a)=>N(r,`tensors${a}`,"einsum")),s={equation:e};return O.runKernel(Eh,n,s)}const Zs=A({einsum_:ow});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function iw(e){const n={x:N(e,"x","elu","float32")};return O.runKernel(Fl,n)}const vp=A({elu_:iw});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lw(e,t){const n=N(e,"x","ensureShape","string_or_numeric");if(!by(n.shape,t))throw new Error(`EnsureShape: Shape of tensor ${n.shape} is not compatible with expected shape ${t}`);return e}const cw=A({ensureShape_:lw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uw(e){let t=N(e,"x","erf");T(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=Zt(t,"float32"));const n={x:t};return O.runKernel(Rl,n)}const fw=A({erf_:uw});/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sp(e,t){for(let n=0;n<e.length;++n)if(e[e.length-n-1]!==t-1-n)return!1;return!0}function hw(e,t,n){const s=e.length+t.length,r=[];let a=0,o=0;for(let i=0;i<s;i++)n.indexOf(i)===-1?r.push(e[a++]):r.push(t[o++]);return r}function qn(e,t){const n=[],s=e.length;for(let a=0;a<s;a++)t.indexOf(a)===-1&&n.push(e[a]);const r=t.map(a=>e[a]);return[n,r]}function an(e,t){const n=t.map(s=>1);return hw(e,n,t)}function Us(e,t,n){T(Sp(t,n),()=>`${e} supports only inner-most axes for now. Got axes ${t} and rank-${n} input.`)}function Nn(e,t){if(Sp(e,t))return null;const n=[];for(let s=0;s<t;++s)e.indexOf(s)===-1&&n.push(s);return e.forEach(s=>n.push(s)),n}function xp(e){return e.map((t,n)=>[n,t]).sort((t,n)=>t[1]-n[1]).map(t=>t[0])}function In(e,t){const n=[];for(let s=t-e;s<t;++s)n.push(s);return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dw(e,t=null,n=!1){const r={x:N(e,"x","max")},a={reductionIndices:t,keepDims:n};return O.runKernel(Wh,r,a)}const ar=A({max_:dw});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pw(e,t=null,n=!1){const r={x:N(e,"x","min")},a={axis:t,keepDims:n};return O.runKernel(Gh,r,a)}const Vi=A({min_:pw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mw(e,t){let n=N(e,"base","pow"),s=N(t,"exp","pow");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(ac,r)}const ea=A({pow_:mw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function At(e,t){if((Xe(e)&&t!=="string"||Array.isArray(e))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&Xe(e)&&!(e instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return hs(e,[],[],t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gw(e){const n={x:N(e,"x","sqrt","float32")};return O.runKernel(yc,n)}const Ln=A({sqrt_:gw});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yw(e){const t=N(e,"x","square"),n={};return O.runKernel("Square",{x:t},n)}const Je=A({square_:yw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bw(e,t=null,n=!1){let s=N(e,"x","sum");s.dtype==="bool"&&(s=Zt(s,"int32"));const r={x:s},a={axis:t,keepDims:n};return O.runKernel(kd,r,a)}const qt=A({sum_:bw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ww(e,t="euclidean",n=null,s=!1){e=N(e,"x","norm");const r=Np(e,t,n);let a=r.shape;if(s){const o=ae(n,e.shape);a=an(r.shape,o)}return X(r,a)}function Np(e,t,n=null){if(e.rank===0)return Pe(e);if(e.rank!==1&&n===null)return Np(X(e,[-1]),t,n);if(e.rank===1||typeof n=="number"||Array.isArray(n)&&n.length===1){if(t===1)return qt(Pe(e),n);if(t===1/0)return ar(Pe(e),n);if(t===-1/0)return Vi(Pe(e),n);if(t==="euclidean"||t===2)return Ln(qt(ea(Pe(e),At(2,"int32")),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(n)&&n.length===2){if(t===1)return ar(qt(Pe(e),n[0]),n[1]-1);if(t===1/0)return ar(qt(Pe(e),n[1]),n[0]);if(t===-1/0)return Vi(qt(Pe(e),n[1]),n[0]);if(t==="fro"||t==="euclidean")return Ln(qt(Je(e),n));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${n}`)}const Do=A({norm_:ww});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kw(e,t=null,n=!1){return Do(e,"euclidean",t,n)}const vw=A({euclideanNorm_:kw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sw(e){const n={x:N(e,"x","exp")};return O.runKernel(Ml,n)}const Rs=A({exp_:Sw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xw(e,t=0){const n=N(e,"x","expandDims","string_or_numeric");T(t<=n.rank,()=>"Axis must be <= rank of the tensor");const s={input:n},r={dim:t};return O.runKernel(Ch,s,r)}const En=A({expandDims_:xw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Nw(e){const n={x:N(e,"x","expm1")};return O.runKernel(Vl,n)}const Iw=A({expm1_:Nw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tw(e,t){const n=N(e,"x","tile","string_or_numeric");T(n.rank===t.length,()=>`Error in transpose: rank of input ${n.rank} must match length of reps ${t}.`);const s={x:n},r={reps:t};return O.runKernel(xc,s,r)}const zr=A({tile_:Tw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $w(e,t,n,s="float32"){t==null&&(t=e);const r=Et([e,t],s),a=e<=t?e:t;for(let i=0;i<a;++i)r.set(1,i,i);const o=X(r.toTensor(),[e,t]);if(n==null)return o;if(n.length===1)return zr(En(o,0),[n[0],1,1]);if(n.length===2)return zr(En(En(o,0),0),[n[0],n[1],1,1]);if(n.length===3)return zr(En(En(En(o,0),0),0),[n[0],n[1],n[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${n.length}D.`)}const Ip=A({eye_:$w});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _w(e){const n={x:N(e,"x","floor","float32")};return O.runKernel(Ll,n)}const Tp=A({floor_:_w});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ew(e,t,n=0,s=0){const r=N(e,"x","gather"),a=N(t,"indices","gather","int32"),o={x:r,indices:a},i={axis:n,batchDims:s};return O.runKernel(Rh,o,i)}const $p=A({gather_:Ew});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cw(e,t){let n=N(e,"a","greater","string_or_numeric"),s=N(t,"b","greater","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Bl,r)}const Oo=A({greater_:Cw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Aw(e,t){let n=N(e,"a","greaterEqual","string_or_numeric"),s=N(t,"b","greaterEqual","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Wl,r)}const _p=A({greaterEqual_:Aw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dw(e){const n={input:N(e,"input","imag")};return O.runKernel(Vh,n)}const Fo=A({imag_:Dw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ow(e){const n={x:N(e,"x","isFinite")};return O.runKernel(Ul,n)}const Fw=A({isFinite_:Ow});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rw(e){const n={x:N(e,"x","isInf")};return O.runKernel(jl,n)}const Pw=A({isInf_:Rw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mw(e){const n={x:N(e,"x","isNaN")};return O.runKernel(ql,n)}const Vw=A({isNaN_:Mw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lw(e,t=.2){const s={x:N(e,"x","leakyRelu")},r={alpha:t};return O.runKernel(Lh,s,r)}const Ep=A({leakyRelu_:Lw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zw(e,t){let n=N(e,"a","less","string_or_numeric"),s=N(t,"b","less","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Gl,r)}const Li=A({less_:zw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Bw(e,t){let n=N(e,"a","lessEqual","string_or_numeric"),s=N(t,"b","lessEqual","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Kl,r)}const Cc=A({lessEqual_:Bw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ww(e,t,n){if(n<=0)throw new Error("The number of values should be positive.");const s={start:e,stop:t,num:n};return O.runKernel(zh,{},s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Hw(e,t=5,n=1,s=1,r=.5){const a=N(e,"x","localResponseNormalization");T(a.rank===4||a.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${a.rank}.`),T(Yr(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let o=a,i=!1;a.rank===3&&(i=!0,o=X(a,[1,a.shape[0],a.shape[1],a.shape[2]]));const l={x:o},c={depthRadius:t,bias:n,alpha:s,beta:r},u=O.runKernel(Bh,l,c);return i?X(u,[u.shape[1],u.shape[2],u.shape[3]]):u}const Uw=A({localResponseNormalization_:Hw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jw(e){const n={x:N(e,"x","log","float32")};return O.runKernel(Xl,n)}const na=A({log_:jw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qw(e){const n={x:N(e,"x","log1p")};return O.runKernel(Yl,n)}const Cp=A({log1p_:qw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Gw(e,t){T(Si(e),()=>"The f passed in variableGrads(f) must be a function"),T(t==null||Array.isArray(t)&&t.every(c=>c instanceof Ga),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");const n=t!=null;if(!n){t=[];for(const c in O.registeredVariables)t.push(O.registeredVariables[c])}const s=n?t.filter(c=>!c.trainable):null,r=t.length;t=t.filter(c=>c.trainable),T(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${r} variables is trainable.`);const a=!0,{value:o,grads:i}=O.gradients(e,t,null,a);T(i.some(c=>c!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),T(o.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${o.rank} tensor`);const l={};return t.forEach((c,u)=>{i[u]!=null&&(l[c.name]=i[u])}),s!=null&&s.forEach(c=>l[c.name]=null),{value:o,grads:l}}function zn(e){return O.customGrad(e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kw(e){const n={x:N(e,"x","neg")};return O.runKernel(Yh,n)}const gn=A({neg_:Kw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xw(e){const n={x:N(e,"x","softplus")};return O.runKernel(gc,n)}const Ap=A({softplus_:Xw});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yw(e){const t=N(e,"x","logSigmoid");return zn(s=>({value:gn(Ap(gn(s))),gradFunc:o=>lt(o,rr(gn(s)))}))(t)}const Zw=A({logSigmoid_:Yw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jw(e,t){let n=N(e,"a","sub"),s=N(t,"b","sub");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(kc,r)}const Tt=A({sub_:Jw});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qw(e,t=-1){const n=N(e,"logits","logSoftmax");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and axis was ${t}`);return zn((r,a)=>{const i=ar(r,t,!0),l=Tt(r,i),c=Tt(Zt(l,"float32"),na(qt(Rs(l),t,!0)));return a([c]),{value:c,gradFunc:(f,h)=>{const[d]=h,p=!0,y=Rs(d);return Tt(f,lt(qt(f,t,p),y))}}})(n)}const tk=A({logSoftmax_:Qw});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ek(e,t=null,n=!1){const s=N(e,"x","logSumExp"),r=ae(t,s.shape),a=ar(s,r,!0),o=Tt(s,a),i=Rs(o),l=qt(i,r),c=na(l),u=vt(X(a,c.shape),c);if(n){const f=an(u.shape,r);return X(u,f)}return u}const Dp=A({logSumExp_:ek});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nk(e,t){const n=N(e,"a","logicalAnd","bool"),s=N(t,"b","logicalAnd","bool");Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Zl,r)}const Za=A({logicalAnd_:nk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sk(e){const n={x:N(e,"x","logicalNot","bool")};return O.runKernel(Jl,n)}const Op=A({logicalNot_:sk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rk(e,t){const n=N(e,"a","logicalOr","bool"),s=N(t,"b","logicalOr","bool");Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(Ql,r)}const Fp=A({logicalOr_:rk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ak(e,t){const n=N(e,"a","logicalXor","bool"),s=N(t,"b","logicalXor","bool");return Yt(n.shape,s.shape),Za(Fp(e,t),Op(Za(e,t)))}const ok=A({logicalXor_:ak});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xa=2147483648;function ik(e,t,n="left"){const s=N(e,"sortedSequence","searchSorted"),r=N(t,"values","searchSorted"),a=s.shape[s.shape.length-1],o=r.shape[r.shape.length-1],i=X(s,[-1,a]),l=X(r,[-1,o]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==l.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(nt(l.shape)>=xa)throw new Error(`values tensor size must less than ${xa}`);if(i.shape[1]>=xa)throw new Error(`trailing dim_size must less than ${xa} for int32 output type, was ${i.shape[1]}`);const c={sortedSequence:i,values:l},u={side:n};return O.runKernel(yd,c,u)}const Ac=A({searchSorted_:ik});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lk(e,t){return Ac(e,t,"left")}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ck(e,t,n,s,r){const a=N(e,"x","maxPool"),o=1;let i=a,l=!1;a.rank===3&&(l=!0,i=X(a,[1,a.shape[0],a.shape[1],a.shape[2]])),T(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),T(sn(n,o),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${n} and dilations '${o}'`),rn("maxPool",s,r);const c={x:i},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r},f=O.runKernel(Hh,c,u);return l?X(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const Rp=A({maxPool_:ck});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uk(e,t=[1,1,1],n,s,r,a="NDHWC"){const o=N(e,"x","maxPool3d");let i=o,l=!1;o.rank===4&&(l=!0,i=X(o,[1,o.shape[0],o.shape[1],o.shape[2],o.shape[3]])),T(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),T(a==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${a}`),rn("maxPool3d",s,r);const c={x:i},u={filterSize:t,strides:n,pad:s,dimRoundingMode:r,dataFormat:a},f=O.runKernel(Uh,c,u);return l?X(f,[f.shape[1],f.shape[2],f.shape[3],f.shape[4]]):f}const fk=A({maxPool3d_:uk});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hk(e,t,n,s,r=!1){const o={x:N(e,"x","maxPoolWithArgmax")},i={filterSize:t,strides:n,pad:s,includeBatchInIndex:r},l=O.runKernel(jh,o,i);return{result:l[0],indexes:l[1]}}const dk=A({maxPoolWithArgmax_:hk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pk(e,t){let n=N(e,"a","maximum"),s=N(t,"b","maximum");[n,s]=Xt(n,s),n.dtype==="bool"&&(n=Zt(n,"int32"),s=Zt(s,"int32")),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(tc,r)}const Pp=A({maximum_:pk});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mk(e,t=null,n=!1){const r={x:N(e,"x","mean")},a={axis:t,keepDims:n};return O.runKernel(qh,r,a)}const Ja=A({mean_:mk});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dr(e,t="float32"){if(ze(e),t==="complex64"){const s=dr(e,"float32"),r=dr(e,"float32");return is(s,r)}const n=fe(nt(e),t);return O.makeTensor(n,e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $s(e,t="float32"){if(ze(e),t==="complex64"){const s=$s(e,"float32"),r=dr(e,"float32");return is(s,r)}const n=bl(nt(e),t);return O.makeTensor(n,e,t)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gk(e,t,{indexing:n="xy"}={}){if(n!=="xy"&&n!=="ij")throw new TypeError(`${n} is not a valid third argument to meshgrid`);if(e===void 0)return[];let s=N(e,"x","meshgrid",e instanceof me?e.dtype:"float32");if(t===void 0)return[s];let r=N(t,"y","meshgrid",t instanceof me?t.dtype:"float32");const a=nt(s.shape),o=nt(r.shape);return n==="xy"?(s=X(s,[1,-1]),r=X(r,[-1,1]),[Mt($s([o,1],s.dtype),s),Mt(r,$s([1,a],r.dtype))]):(s=X(s,[-1,1]),r=X(r,[1,-1]),[Mt(s,$s([1,o],s.dtype)),Mt($s([a,1],r.dtype),r)])}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yk(e,t){let n=N(e,"a","minimum"),s=N(t,"b","minimum");[n,s]=Xt(n,s),n.dtype==="bool"&&(n=Zt(n,"int32"),s=Zt(s,"int32")),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(ec,r)}const Qa=A({minimum_:yk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bk(e,t,n){T(n==="reflect"||n==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${n}.`);const s=N(e,"x","mirrorPad");if(s.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");T(t.length===s.rank,()=>`Padding doesn't match input. Must be ${s.rank}. Got ${t.length}.`);const r=n==="reflect"?1:0;for(let i=0;i<s.rank;i++)T(t[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),T(t[i][0]>=0&&t[i][0]<=s.shape[i]-r&&t[i][1]>=0&&t[i][1]<=s.shape[i]-r,()=>`Padding in dimension ${i} cannot be greater than or equal to ${s.shape[i]-r} or less than 0 for input of shape ${s.shape}`);const a={paddings:t,mode:n},o={x:s};return O.runKernel(Kh,o,a)}const wk=A({mirrorPad_:bk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kk(e,t){let n=N(e,"a","mod"),s=N(t,"b","mod");[n,s]=Xt(n,s);const r={a:n,b:s};return O.runKernel(nc,r)}const vk=A({mod_:kk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sk(e,t=null,n=!1){e=N(e,"x","moments");const s=ae(t,e.shape),r=Ja(e,s,n);let a=r.shape;n||(a=an(r.shape,s));const o=Je(Tt(Zt(e,"float32"),X(r,a))),i=Ja(o,s,n);return{mean:r,variance:i}}const xk=A({moments_:Sk});function Nk(e,t,n,s){const r=N(t,"data","multiRNNCell"),a=Ka(n,"c","multiRNNCell"),o=Ka(s,"h","multiRNNCell");let i=r;const l=[];for(let f=0;f<e.length;f++){const h=e[f](i,a[f],o[f]);l.push(h[0]),l.push(h[1]),i=h[1]}const c=[],u=[];for(let f=0;f<l.length;f+=2)c.push(l[f]),u.push(l[f+1]);return[c,u]}const Ik=A({multiRNNCell_:Nk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tk(e,t,n,s=!1){const r=N(e,"logits","multinomial"),a=r.size,o=r.rank;if(a<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${a}.`);if(o>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${o}`);n=n||Math.random();const l={logits:o===1?X(r,[1,-1]):r},c={numSamples:t,seed:n,normalized:s},u=O.runKernel(Xh,l,c);return o===1?X(u,[u.size]):u}const $k=A({multinomial_:Tk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _k(e,t){let n=N(e,"a","notEqual","string_or_numeric"),s=N(t,"b","notEqual","string_or_numeric");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s};return O.runKernel(rc,r)}const Mp=A({notEqual_:_k});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ek(e,t,n=1,s=0,r="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);const o={indices:N(e,"indices","oneHot","int32")},i={dtype:r,depth:t,onValue:n,offValue:s};return O.runKernel(ed,o,i)}const Ck=A({oneHot_:Ek});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ak(e){const n={x:N(e,"x","onesLike")};return O.runKernel(td,n)}const Dk=A({onesLike_:Ak});function Ok(e,t){const n=N(e,"v1","outerProduct"),s=N(t,"v2","outerProduct");T(n.rank===1&&s.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${n.rank} and ${s.rank}.`);const r=X(n,[-1,1]),a=X(s,[1,-1]);return Mt(r,a)}const Fk=A({outerProduct_:Ok});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rk(e,t,n=0){const s=N(e,"x","pad");if(s.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");const r={paddings:t,constantValue:n},a={x:s};return O.runKernel(sd,a,r)}const ma=A({pad_:Rk});function Pk(e,t,n=0){return T(t.length===2,()=>"Invalid number of paddings. Must be length of 2."),ma(e,[t],n)}const Mk=A({pad1d_:Pk});function Vk(e,t,n=0){return T(t.length===2&&t[0].length===2&&t[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),ma(e,t,n)}const Lk=A({pad2d_:Vk});function zk(e,t,n=0){return T(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),ma(e,t,n)}const Bk=A({pad3d_:zk});function Wk(e,t,n=0){return T(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),ma(e,t,n)}const Hk=A({pad4d_:Wk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uk(e,t,n){const s=N(e,"x","spaceToBatchND");T(s.rank>=1+t.length,()=>`input rank ${s.rank} should be > than [blockShape] ${t.length}`),T(n.length===t.length,()=>`paddings.shape[0] ${n.length} must be equal to [blockShape] ${t.length}`),T(s.shape.reduce((o,i,l)=>l>0&&l<=t.length?o&&(i+n[l-1][0]+n[l-1][1])%t[l-1]===0:o,!0),()=>`input spatial dimensions ${s.shape.slice(1)} with paddings ${n.toString()} must be divisible by blockShapes ${t.toString()}`);const r={x:s},a={blockShape:t,paddings:n};return O.runKernel(vd,r,a)}const Vp=A({spaceToBatchND_:Uk});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jk(e,t,n,s,r,a,o){r==null&&(r=[1,1]),a==null&&(a=1),s===0&&(s="valid");const i=N(e,"x","maxPool");let l=i,c=!1;i.rank===3&&(c=!0,l=X(i,[1,i.shape[0],i.shape[1],i.shape[2]])),T(sn(a,r),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${a} and dilations '${r}'`);const u=Nr(l.shape,t,a,r,s),f=[u.dilationHeight,u.dilationWidth];let h;s==="same"?h=Gk([u.filterHeight,u.filterWidth],f):h=[[0,0],[0,0]];const d=f[0]===1&&f[1]===1,[p,y]=qk([u.inHeight,u.inWidth],f,h),g=d?s:"valid",m=d?l:Vp(l,f,p),S=(n==="avg"?()=>gp(m,t,a,g,o):()=>Rp(m,t,a,g,o))(),k=d?S:yp(S,f,y);return c?X(k,[k.shape[1],k.shape[2],k.shape[3]]):k}function qk(e,t,n){const s=n.map(u=>u[0]),r=n.map(u=>u[1]),a=e.concat(s,r),o=t.map((u,f)=>(u-a[f]%u)%u),i=r.map((u,f)=>u+o[f]),l=t.map((u,f)=>[s[f],i[f]]),c=t.map((u,f)=>[0,o[f]]);return[l,c]}function Gk(e,t){const s=e.map((o,i)=>o+(o-1)*(t[i]-1)).map(o=>o-1),r=s.map(o=>Math.floor(o/2)),a=s.map((o,i)=>o-r[i]);return s.map((o,i)=>[r[i],a[i]])}const Kk=A({pool_:jk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xk(e,t){const n=N(e,"x","prelu"),s=N(t,"alpha","prelu"),r={x:n,alpha:s};return O.runKernel(rd,r)}const Lp=A({prelu_:Xk});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yk(e,t=null,n=!1){let s=N(e,"x","prod");s.dtype==="bool"&&(s=Zt(s,"int32"));const r={x:s},a={axis:t,keepDims:n};return O.runKernel(ad,r,a)}const Zk=A({prod_:Yk});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jk(e,t,n,s){const r=e.map((u,f)=>N(u,`tensors${f}`,"raggedGather","int32")),a=N(t,"paramsDenseValues","raggedGather"),o=N(n,"indices","raggedGather","int32"),i={paramsNestedSplits:r,paramsDenseValues:a,indices:o},l={outputRaggedRank:s},c=O.runKernel(od,i,l);return{outputNestedSplits:c.slice(0,c.length-1),outputDenseValues:c[c.length-1]}}const Qk=A({raggedGather_:Jk});/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tv(e,t,n){const s=N(e,"starts","raggedRange"),r=N(t,"limits","raggedRange",s.dtype),a=N(n,"deltas","raggedRange",s.dtype),o={starts:s,limits:r,deltas:a},i=O.runKernel(id,o);return{rtNestedSplits:i[0],rtDenseValues:i[1]}}const ev=A({raggedRange_:tv});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nv(e,t,n,s,r){const a=N(e,"shape","raggedTensorToTensor","int32"),o=N(t,"values","raggedTensorToTensor"),i=N(n,"defaultValue","raggedTensorToTensor",o.dtype),l=s.map((f,h)=>N(f,`tensors${h}`,"raggedTensorToTensor","int32")),c={shape:a,values:o,defaultValue:i,rowPartitionTensors:l},u={rowPartitionTypes:r};return O.runKernel(ld,c,u)}const sv=A({raggedTensorToTensor_:nv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rv(e,t,n){ze(e);const s=nt(e);let r=null;if(n==null||n==="float32")r=new Float32Array(s);else if(n==="int32")r=new Int32Array(s);else if(n==="bool")r=new Uint8Array(s);else throw new Error(`Unknown data type ${n}`);for(let a=0;a<s;a++)r[a]=t();return O.makeTensor(r,e,n)}const av=A({rand_:rv});var Oa={exports:{}},ov=Oa.exports,Mu;function iv(){return Mu||(Mu=1,(function(e){(function(t,n,s){function r(l){var c=this,u=i();c.next=function(){var f=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=f-(c.c=f|0)},c.c=1,c.s0=u(" "),c.s1=u(" "),c.s2=u(" "),c.s0-=u(l),c.s0<0&&(c.s0+=1),c.s1-=u(l),c.s1<0&&(c.s1+=1),c.s2-=u(l),c.s2<0&&(c.s2+=1),u=null}function a(l,c){return c.c=l.c,c.s0=l.s0,c.s1=l.s1,c.s2=l.s2,c}function o(l,c){var u=new r(l),f=c&&c.state,h=u.next;return h.int32=function(){return u.next()*4294967296|0},h.double=function(){return h()+(h()*2097152|0)*11102230246251565e-32},h.quick=h,f&&(typeof f=="object"&&a(f,u),h.state=function(){return a(u,{})}),h}function i(){var l=4022871197,c=function(u){u=String(u);for(var f=0;f<u.length;f++){l+=u.charCodeAt(f);var h=.02519603282416938*l;l=h>>>0,h-=l,h*=l,l=h>>>0,h-=l,l+=h*4294967296}return(l>>>0)*23283064365386963e-26};return c}n&&n.exports?n.exports=o:this.alea=o})(ov,e)})(Oa)),Oa.exports}var Fa={exports:{}},lv=Fa.exports,Vu;function cv(){return Vu||(Vu=1,(function(e){(function(t,n,s){function r(i){var l=this,c="";l.x=0,l.y=0,l.z=0,l.w=0,l.next=function(){var f=l.x^l.x<<11;return l.x=l.y,l.y=l.z,l.z=l.w,l.w^=l.w>>>19^f^f>>>8},i===(i|0)?l.x=i:c+=i;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,l.next()}function a(i,l){return l.x=i.x,l.y=i.y,l.z=i.z,l.w=i.w,l}function o(i,l){var c=new r(i),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,d=(c.next()>>>0)/4294967296,p=(h+d)/(1<<21);while(p===0);return p},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&a(u,c),f.state=function(){return a(c,{})}),f}n&&n.exports?n.exports=o:this.xor128=o})(lv,e)})(Fa)),Fa.exports}var Ra={exports:{}},uv=Ra.exports,Lu;function fv(){return Lu||(Lu=1,(function(e){(function(t,n,s){function r(i){var l=this,c="";l.next=function(){var f=l.x^l.x>>>2;return l.x=l.y,l.y=l.z,l.z=l.w,l.w=l.v,(l.d=l.d+362437|0)+(l.v=l.v^l.v<<4^(f^f<<1))|0},l.x=0,l.y=0,l.z=0,l.w=0,l.v=0,i===(i|0)?l.x=i:c+=i;for(var u=0;u<c.length+64;u++)l.x^=c.charCodeAt(u)|0,u==c.length&&(l.d=l.x<<10^l.x>>>4),l.next()}function a(i,l){return l.x=i.x,l.y=i.y,l.z=i.z,l.w=i.w,l.v=i.v,l.d=i.d,l}function o(i,l){var c=new r(i),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,d=(c.next()>>>0)/4294967296,p=(h+d)/(1<<21);while(p===0);return p},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&a(u,c),f.state=function(){return a(c,{})}),f}n&&n.exports?n.exports=o:this.xorwow=o})(uv,e)})(Ra)),Ra.exports}var Pa={exports:{}},hv=Pa.exports,zu;function dv(){return zu||(zu=1,(function(e){(function(t,n,s){function r(i){var l=this;l.next=function(){var u=l.x,f=l.i,h,d;return h=u[f],h^=h>>>7,d=h^h<<24,h=u[f+1&7],d^=h^h>>>10,h=u[f+3&7],d^=h^h>>>3,h=u[f+4&7],d^=h^h<<7,h=u[f+7&7],h=h^h<<13,d^=h^h<<9,u[f]=d,l.i=f+1&7,d};function c(u,f){var h,d=[];if(f===(f|0))d[0]=f;else for(f=""+f,h=0;h<f.length;++h)d[h&7]=d[h&7]<<15^f.charCodeAt(h)+d[h+1&7]<<13;for(;d.length<8;)d.push(0);for(h=0;h<8&&d[h]===0;++h);for(h==8?d[7]=-1:d[h],u.x=d,u.i=0,h=256;h>0;--h)u.next()}c(l,i)}function a(i,l){return l.x=i.x.slice(),l.i=i.i,l}function o(i,l){i==null&&(i=+new Date);var c=new r(i),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,d=(c.next()>>>0)/4294967296,p=(h+d)/(1<<21);while(p===0);return p},f.int32=c.next,f.quick=f,u&&(u.x&&a(u,c),f.state=function(){return a(c,{})}),f}n&&n.exports?n.exports=o:this.xorshift7=o})(hv,e)})(Pa)),Pa.exports}var Ma={exports:{}},pv=Ma.exports,Bu;function mv(){return Bu||(Bu=1,(function(e){(function(t,n,s){function r(i){var l=this;l.next=function(){var u=l.w,f=l.X,h=l.i,d,p;return l.w=u=u+1640531527|0,p=f[h+34&127],d=f[h=h+1&127],p^=p<<13,d^=d<<17,p^=p>>>15,d^=d>>>12,p=f[h]=p^d,l.i=h,p+(u^u>>>16)|0};function c(u,f){var h,d,p,y,g,m=[],w=128;for(f===(f|0)?(d=f,f=null):(f=f+"\0",d=0,w=Math.max(w,f.length)),p=0,y=-32;y<w;++y)f&&(d^=f.charCodeAt((y+32)%f.length)),y===0&&(g=d),d^=d<<10,d^=d>>>15,d^=d<<4,d^=d>>>13,y>=0&&(g=g+1640531527|0,h=m[y&127]^=d+g,p=h==0?p+1:0);for(p>=128&&(m[(f&&f.length||0)&127]=-1),p=127,y=512;y>0;--y)d=m[p+34&127],h=m[p=p+1&127],d^=d<<13,h^=h<<17,d^=d>>>15,h^=h>>>12,m[p]=d^h;u.w=g,u.X=m,u.i=p}c(l,i)}function a(i,l){return l.i=i.i,l.w=i.w,l.X=i.X.slice(),l}function o(i,l){i==null&&(i=+new Date);var c=new r(i),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,d=(c.next()>>>0)/4294967296,p=(h+d)/(1<<21);while(p===0);return p},f.int32=c.next,f.quick=f,u&&(u.X&&a(u,c),f.state=function(){return a(c,{})}),f}n&&n.exports?n.exports=o:this.xor4096=o})(pv,e)})(Ma)),Ma.exports}var Va={exports:{}},gv=Va.exports,Wu;function yv(){return Wu||(Wu=1,(function(e){(function(t,n,s){function r(i){var l=this,c="";l.next=function(){var f=l.b,h=l.c,d=l.d,p=l.a;return f=f<<25^f>>>7^h,h=h-d|0,d=d<<24^d>>>8^p,p=p-f|0,l.b=f=f<<20^f>>>12^h,l.c=h=h-d|0,l.d=d<<16^h>>>16^p,l.a=p-f|0},l.a=0,l.b=0,l.c=-1640531527,l.d=1367130551,i===Math.floor(i)?(l.a=i/4294967296|0,l.b=i|0):c+=i;for(var u=0;u<c.length+20;u++)l.b^=c.charCodeAt(u)|0,l.next()}function a(i,l){return l.a=i.a,l.b=i.b,l.c=i.c,l.d=i.d,l}function o(i,l){var c=new r(i),u=l&&l.state,f=function(){return(c.next()>>>0)/4294967296};return f.double=function(){do var h=c.next()>>>11,d=(c.next()>>>0)/4294967296,p=(h+d)/(1<<21);while(p===0);return p},f.int32=c.next,f.quick=f,u&&(typeof u=="object"&&a(u,c),f.state=function(){return a(c,{})}),f}n&&n.exports?n.exports=o:this.tychei=o})(gv,e)})(Va)),Va.exports}var La={exports:{}};const bv={},wv=Object.freeze(Object.defineProperty({__proto__:null,default:bv},Symbol.toStringTag,{value:"Module"})),kv=Ky(wv);var vv=La.exports,Hu;function Sv(){return Hu||(Hu=1,(function(e){(function(t,n,s){var r=256,a=6,o=52,i="random",l=s.pow(r,a),c=s.pow(2,o),u=c*2,f=r-1,h;function d(k,I,$){var E=[];I=I==!0?{entropy:!0}:I||{};var D=m(g(I.entropy?[k,S(n)]:k??w(),3),E),_=new p(E),x=function(){for(var v=_.g(a),R=l,P=0;v<c;)v=(v+P)*r,R*=r,P=_.g(1);for(;v>=u;)v/=2,R/=2,P>>>=1;return(v+P)/R};return x.int32=function(){return _.g(4)|0},x.quick=function(){return _.g(4)/4294967296},x.double=x,m(S(_.S),n),(I.pass||$||function(v,R,P,V){return V&&(V.S&&y(V,_),v.state=function(){return y(_,{})}),P?(s[i]=v,R):v})(x,D,"global"in I?I.global:this==s,I.state)}function p(k){var I,$=k.length,E=this,D=0,_=E.i=E.j=0,x=E.S=[];for($||(k=[$++]);D<r;)x[D]=D++;for(D=0;D<r;D++)x[D]=x[_=f&_+k[D%$]+(I=x[D])],x[_]=I;(E.g=function(v){for(var R,P=0,V=E.i,M=E.j,L=E.S;v--;)R=L[V=f&V+1],P=P*r+L[f&(L[V]=L[M=f&M+R])+(L[M]=R)];return E.i=V,E.j=M,P})(r)}function y(k,I){return I.i=k.i,I.j=k.j,I.S=k.S.slice(),I}function g(k,I){var $=[],E=typeof k,D;if(I&&E=="object")for(D in k)try{$.push(g(k[D],I-1))}catch{}return $.length?$:E=="string"?k:k+"\0"}function m(k,I){for(var $=k+"",E,D=0;D<$.length;)I[f&D]=f&(E^=I[f&D]*19)+$.charCodeAt(D++);return S(I)}function w(){try{var k;return h&&(k=h.randomBytes)?k=k(r):(k=new Uint8Array(r),(t.crypto||t.msCrypto).getRandomValues(k)),S(k)}catch{var I=t.navigator,$=I&&I.plugins;return[+new Date,t,$,t.screen,S(n)]}}function S(k){return String.fromCharCode.apply(0,k)}if(m(s.random(),n),e.exports){e.exports=d;try{h=kv}catch{}}else s["seed"+i]=d})(typeof self<"u"?self:vv,[],Math)})(La)),La.exports}var ai,Uu;function xv(){if(Uu)return ai;Uu=1;var e=iv(),t=cv(),n=fv(),s=dv(),r=mv(),a=yv(),o=Sv();return o.alea=e,o.xor128=t,o.xorwow=n,o.xorshift7=s,o.xor4096=r,o.tychei=a,ai=o,ai}var Ro=xv();/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Dc{constructor(t,n,s,r,a){this.mean=t,this.stdDev=n,this.dtype=s,this.nextVal=NaN,this.truncated=r,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);const o=a||Math.random();this.random=Ro.alea(o.toString())}nextValue(){if(!isNaN(this.nextVal)){const r=this.nextVal;return this.nextVal=NaN,r}let t,n,s=!1;for(;!s;){let r,a,o;do r=2*this.random()-1,a=2*this.random()-1,o=r*r+a*a;while(o>=1||o===0);const i=Math.sqrt(-2*Math.log(o)/o);t=this.mean+this.stdDev*r*i,n=this.mean+this.stdDev*a*i,(!this.truncated||this.isValidTruncated(t))&&(s=!0)}return(!this.truncated||this.isValidTruncated(n))&&(this.nextVal=this.convertValue(n)),this.convertValue(t)}convertValue(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)}isValidTruncated(t){return t<=this.upper&&t>=this.lower}}class Nv{constructor(t,n,s,r){this.alpha=t,this.beta=1/n,this.dtype=s;const a=r||Math.random();this.randu=Ro.alea(a.toString()),this.randn=new Dc(0,1,s,!1,this.randu()),t<1?this.d=t+2/3:this.d=t-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let t,n,s,r,a,o;for(;;){do r=this.randn.nextValue(),o=1+this.c*r;while(o<=0);if(o*=o*o,t=r*r,n=1-.331*t*t,s=.5*t+this.d*(1-o+Math.log(o)),a=this.randu(),a<n||Math.log(a)<s)break}return o=1/this.beta*this.d*o,this.alpha<1&&(o*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(o)}convertValue(t){return this.dtype==="float32"?t:Math.round(t)}}class Iv{constructor(t=0,n=1,s,r){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=t,this.range=n-t,this.dtype=s,r==null&&(r=Math.random()),typeof r=="number"&&(r=r.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${t} - ${n} <= 1 and dtype is not float`);this.random=Ro.alea(r)}convertValue(t){return this.canReturnFloat()?t:Math.round(t)}nextValue(){return this.convertValue(this.min+this.range*this.random())}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tv(e,t,n=1,s="float32",r){if(ze(e),n==null&&(n=1),s==null&&(s="float32"),s!=="float32"&&s!=="int32")throw new Error(`Unsupported data type ${s}`);const a=new Nv(t,n,s,r),o=Et(e,s);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const $v=A({randomGamma_:Tv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _v(e,t=0,n=1,s,r){if(ze(e),s!=null&&s==="bool")throw new Error(`Unsupported data type ${s}`);const a=new Dc(t,n,s,!1,r),o=Et(e,s);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const zp=A({randomNormal_:_v});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ev(e,t,n){if(t!=null&&t==="bool")throw new Error(`Unsupported data type ${t}`);return zp(e,0,1,t,n)}const Cv=A({randomStandardNormal_:Ev});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Av(e,t=0,n=1,s="float32",r){ze(e);const a=Et(e,s),o=new Iv(t,n,null,r);for(let i=0;i<a.values.length;i++)a.values[i]=o.nextValue();return a.toTensor()}const Oc=A({randomUniform_:Av});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dv(e,t,n,s){return Oc(e,t,n,"int32",s)}const Ov=A({randomUniformInt_:Dv});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sa(e,t,n=1,s="float32"){if(n===0)throw new Error("Cannot have a step of zero");const r={start:e,stop:t,step:n,dtype:s};return O.runKernel(cd,{},r)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fv(e){const n={input:N(e,"input","real")};return O.runKernel(ud,n)}const ra=A({real_:Fv});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rv(e){const n={x:N(e,"x","reciprocal")};return O.runKernel(oc,n)}const Pv=A({reciprocal_:Rv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mv(e){const n={x:N(e,"x","relu")};return O.runKernel(ic,n)}const Po=A({relu_:Mv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vv(e){const n={x:N(e,"x","relu6")};return O.runKernel(lc,n)}const Bp=A({relu6_:Vv});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lv(e,t){const s={x:N(e,"x","reverse")},r={dims:t};return O.runKernel(pd,s,r)}const Ps=A({reverse_:Lv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zv(e){const t=N(e,"x","reverse");return T(t.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),Ps(t,0)}const Bv=A({reverse1d_:zv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wv(e,t){const n=N(e,"x","reverse");return T(n.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${n.rank}.`),Ps(n,t)}const Hv=A({reverse2d_:Wv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Uv(e,t){const n=N(e,"x","reverse");return T(n.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${n.rank}.`),Ps(n,t)}const jv=A({reverse3d_:Uv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qv(e,t){const n=N(e,"x","reverse");return T(n.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${n.rank}.`),Ps(n,t)}const Gv=A({reverse4d_:qv});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kv(e){const n={x:N(e,"x","round")};return O.runKernel(cc,n)}const Wp=A({round_:Kv});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xv(e){const n={x:N(e,"x","rsqrt","float32")};return O.runKernel(uc,n)}const Yv=A({rsqrt_:Xv});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zv(e){const n={x:N(e,"x","selu")};return O.runKernel(fc,n)}const Jv=A({selu_:Zv});function Qv(e,t,n,s,r,a=[1,1],o="NHWC"){const i=N(e,"x","separableConv2d"),l=N(t,"depthwiseFilter","separableConv2d"),c=N(n,"pointwiseFilter","separableConv2d");let u=i,f=!1;if(i.rank===3&&(f=!0,u=X(i,[1,i.shape[0],i.shape[1],i.shape[2]])),o==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");T(u.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${u.rank}.`),T(l.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${l.rank}.`),T(c.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${l.rank}.`),T(c.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${c.shape[0]}.`),T(c.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${c.shape[1]}.`);const h=l.shape[2],d=l.shape[3];T(c.shape[2]===h*d,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${h*d}, but got ${c.shape[2]}.`);const p=Ec(u,l,s,r,o,a),g=Ao(p,c,1,"valid",o);return f?X(g,[g.shape[1],g.shape[2],g.shape[3]]):g}const tS=A({separableConv2d_:Qv});/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function eS(e,t){const n=N(e,"x","setdiff1d"),s=N(t,"y","setdiff1d");T(n.dtype===s.dtype,()=>`x and y should have the same dtype, but got x (${n.dtype}) and y (${s.dtype}).`),T(n.rank===1,()=>`x should be 1D tensor, but got x (${n.shape}).`),T(s.rank===1,()=>`y should be 1D tensor, but got y (${s.shape}).`);const r=await n.data(),a=await s.data(),o=new Set(a);let i=0;for(let u=0;u<r.length;u++)o.has(r[u])||i++;const l=new ee([i],n.dtype),c=new ee([i],"int32");for(let u=0,f=0;u<r.length;u++)o.has(r[u])||(l.values[f]=r[u],c.values[f]=u,f++);return[l.toTensor(),c.toTensor()]}const nS=eS;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sS(e){const n={x:N(e,"x","sign")};return O.runKernel(pc,n)}const rS=A({sign_:sS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function aS(e){const n={x:N(e,"x","sin","float32")};return O.runKernel(hc,n)}const oS=A({sin_:aS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function iS(e){const n={x:N(e,"x","sinh")};return O.runKernel(dc,n)}const lS=A({sinh_:iS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cS(e,t,n){const s=N(e,"x","slice1d");return T(s.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${s.rank} tensor`),Bt(s,[t],[n])}const uS=A({slice1d_:cS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fS(e,t,n){const s=N(e,"x","slice2d");return T(s.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${s.rank} tensor`),Bt(s,t,n)}const hS=A({slice2d_:fS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dS(e,t,n){const s=N(e,"x","slice3d");return T(s.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${s.rank} tensor`),Bt(s,t,n)}const pS=A({slice3d_:dS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mS(e,t,n){const s=N(e,"x","slice4d");return T(s.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${s.rank} tensor`),Bt(s,t,n)}const gS=A({slice4d_:mS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yS(e,t=-1){const n=N(e,"logits","softmax","float32");if(t===-1&&(t=n.rank-1),t!==n.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${n.rank} and dim was ${t}`);const s={logits:n},r={dim:t};return O.runKernel(xd,s,r)}const bS=A({softmax_:yS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wS(e){T(e.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${e.dtype}.`);const t={input:e};return O.runKernel(Ah,t)}const Fc=A({fft_:wS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kS(e){T(e.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${e.dtype}.`);const t={input:e};return O.runKernel(Mh,t)}const to=A({ifft_:kS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vS(e){const t=e.shape[e.shape.length-1],n=e.size/t;let s;if(t<=2){const r=X(e,[n,t]);s=to(r)}else{const r=[n,2*(t-1)],a=X(ra(e),[n,t]),o=X(Fo(e),[n,t]),i=Ps(Bt(a,[0,1],[n,t-2]),1),l=lt(Ps(Bt(o,[0,1],[n,t-2]),1),At(-1)),c=be([a,i],1),u=be([o,l],1),f=X(is(c,u),[r[0],r[1]]);s=to(f)}if(s=ra(s),e.rank===3&&e.shape[0]!==0){const r=s,a=e.shape[0];s=X(s,[a,s.shape[0]/a,s.shape[1]]),r.dispose()}return s}const Hp=A({irfft_:vS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function SS(e,t,n=0){const r={x:N(e,"x","split")},a={numOrSizeSplits:t,axis:n};return O.runKernel(Sd,r,a)}const aa=A({split_:SS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xS(e,t){T(e.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${e.dtype}`);let n=e.shape[e.shape.length-1];const s=e.size/n;let r;if(t!=null&&t<n){const p=e.shape.map(g=>0),y=e.shape.map(g=>g);y[e.shape.length-1]=t,r=Bt(e,p,y),n=t}else if(t!=null&&t>n){const p=e.shape.map(y=>y);p[e.shape.length-1]=t-n,r=be([e,dr(p)],e.shape.length-1),n=t}else r=e;const a=Ve(r),o=X(is(r,a),[s,n]),i=Fc(o),l=Math.floor(n/2)+1,c=ra(i),u=Fo(i),f=aa(c,[l,n-l],c.shape.length-1),h=aa(u,[l,n-l],u.shape.length-1),d=r.shape.slice();return d[r.shape.length-1]=l,X(is(f[0],h[0]),d)}const Rc=A({rfft_:xS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function NS(e,t){let n=N(e,"a","squaredDifference"),s=N(t,"b","squaredDifference");[n,s]=Xt(n,s),Yt(n.shape,s.shape);const r={a:n,b:s},a={};return O.runKernel(bc,r,a)}const Up=A({squaredDifference_:NS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function IS(e,t){const n=N(e,"x","squeeze","string_or_numeric");return X(n,ky(n.shape,t).newShape)}const Pc=A({squeeze_:IS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function TS(e,t=0){const n=Ka(e,"tensors","stack","string_or_numeric");T(n.length>=1,()=>"Pass at least one tensor to tf.stack"),n.length>0&&T(t<=n[0].rank,()=>"Axis must be <= rank of the tensor");const s=n,r={axis:t};return O.runKernel(nd,s,r)}const Bn=A({stack_:TS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $S(e,t=0){const s={x:N(e,"x","step")},r={alpha:t};return O.runKernel(Nc,s,r)}const jp=A({step_:$S});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _S(e,t,n,s,r=0,a=0,o=0,i=0,l=0){const u={x:N(e,"x","stridedSlice","string_or_numeric")},f={begin:t,end:n,strides:s,beginMask:r,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:l};return O.runKernel(Ed,u,f)}const ES=A({stridedSlice_:_S});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function CS(e){const n={x:N(e,"x","tan","float32")};return O.runKernel(vc,n)}const AS=A({tan_:CS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ue(e,t){vr(e);const n=fs(e,t);if(n.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return hs(e,null,n,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Br(e,t,n){if(vr(e),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");const s=fs(e,n);if(s.length!==2&&s.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return hs(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qp(e,t,n){if(vr(e),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");const s=fs(e,n);if(s.length!==3&&s.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return hs(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function DS(e,t,n){if(vr(e),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");const s=fs(e,n);if(s.length!==4&&s.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return hs(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function OS(e,t,n){if(vr(e),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");const s=fs(e,n);if(s.length!==5&&s.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return hs(e,t,s,n)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function FS(e,t,n){if(vr(e),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");const s=fs(e,n);if(s.length!==6&&s.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(s.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return t=t||s,hs(e,t,s,n)}function RS(e,t,n){const s=t.rank>1?t.shape[t.rank-1]:1,r=t.rank>1?t.rank-1:1,a=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${n.shape}, indices.shape: ${t.shape}, shape: ${e}, sliceDim: ${s}, and batchDim: ${r}.`;if(n.rank<r)throw new Error(a+` update.rank < ${r}. `);if(e.length<s+(n.rank-r))throw new Error(a+` Output shape length < ${s+(n.rank-r)}`);if(n.rank!==r+e.length-s)throw new Error(a+` update.rank != ${r+e.length-s}`);for(let o=0;o<r;++o)if(n.shape[o]!==t.shape[o])throw new Error(a+` updates.shape[${o}] (${n.shape[o]}) != indices.shape[${o}] (${t.shape[o]}).`);for(let o=0;o<n.rank-r;++o)if(n.shape[o+r]!==e[o+s])throw new Error(a+` updates.shape[${o+r}] (${n.shape[o+r]}) != shape[${o+r}] (${e[o+r]})`)}function Gp(e,t,n){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(e.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${e.rank}.`);if(t.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(n.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${n}`);if(n.length===0){if(t.size===0)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(e.size===0)throw new Error(`Updates specified for empty output. updates shape: ${e.shape}`)}RS(n,t,e)}function Mc(e,t,n){const s=t.shape.length,r=s>1?t.shape[s-1]:1,a=n.length;let o=1;for(let f=r;f<a;++f)o*=n[f];const i=r<1?1:r,l=nt(t.shape)/i,c=[...yt(n.slice(0,r)),1],u=nt(n);return{sliceRank:r,numUpdates:l,sliceSize:o,strides:c,outputSize:u}}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function PS(e,t,n){const s=N(e,"tensor","tensorScatterupdate"),r=N(t,"indices","tensorScatterupdate","int32"),a=N(n,"updates","tensorScatterupdate");if(Gp(a,r,s.shape),s.dtype!==a.dtype)throw new Error(`tensor and updates must have the same dtype, instead they are ${s.dtype} and ${a.dtype}.`);const o={tensor:s,indices:r,updates:a},i={};return O.runKernel(gd,o,i)}const MS=A({tensorScatterUpdate_:PS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function VS(e,t=1,n=!0){const s=N(e,"x","topk");if(s.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");const r=s.shape[s.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>r)throw new Error(`'k' passed to topk() must be <= the last dimension (${r}) but got ${t}`);const a={x:s},o={k:t,sorted:n},[i,l]=O.runKernel(Od,a,o);return{values:i,indices:l}}const LS=A({topk_:VS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zS(e,t=0,n=1,s,r){if(ze(e),s!=null&&s==="bool")throw new Error("Unsupported data type $ { dtype }");const a=new Dc(t,n,s,!0,r),o=Et(e,s);for(let i=0;i<o.values.length;i++)o.values[i]=a.nextValue();return o.toTensor()}const BS=A({truncatedNormal_:zS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function WS(e,t=0){const n=N(e,"x","unique","string_or_numeric");T(n.rank>0,()=>"The input tensor must be at least 1D");const s={x:n},r={axis:t},[a,o]=O.runKernel(Rd,s,r);return{values:a,indices:o}}const HS=A({unique_:WS});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function US(e,t,n){const s=N(e,"x","unsortedSegmentSum"),r=N(t,"segmentIds","unsortedSegmentSum","int32");T(Yr(n),()=>"numSegments must be of dtype int");const a={x:s,segmentIds:r},o={numSegments:n};return O.runKernel(Md,a,o)}const jS=A({unsortedSegmentSum_:US});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qS(e,t=0){const n=N(e,"x","unstack","string_or_numeric");T(t>=-n.shape.length&&t<n.shape.length,()=>`Axis = ${t} is not in [-${n.shape.length}, ${n.shape.length})`);const s={value:n},r={axis:t};return O.runKernel(Pd,s,r)}const js=A({unstack_:qS});/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function GS(e,t){return Ac(e,t,"right")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function KS(e,t=!0,n,s){return O.makeVariable(e,t,n,s)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Kp(e,t){const n=[];for(let a=0;a<t.length;a++)t[a]&&n.push(a);const s=Et(e,"int32"),r=Et([n.length,e.length],"int32");for(let a=0;a<n.length;a++){const o=s.indexToLoc(n[a]),i=a*e.length;r.values.set(o,i)}return r.toTensor()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function XS(e){const t=N(e,"condition","whereAsync","bool"),n=await t.data(),s=Kp(t.shape,n);return e!==t&&t.dispose(),s}const Xp=XS;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function YS(e,t,n){const s=N(e,"tensor","boolMask"),r=N(t,"mask","boolMask","bool"),a=n??0,o=r.rank,i=s.shape;T(o>0,()=>"mask cannot be scalar"),Le(i.slice(a,a+o),r.shape,"mask's shape must match the first K dimensions of tensor's shape,");let l=1;for(let y=a;y<a+o;y++)l*=i[y];const c=i.slice(0,a).concat([l],i.slice(a+o)),u=X(s,c),f=X(r,[-1]),h=await Xp(f),d=Pc(h,[1]),p=$p(u,d,a);return e!==s&&s.dispose(),t!==r&&r.dispose(),d.dispose(),u.dispose(),f.dispose(),h.dispose(),p}const ZS=YS;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function JS(e,t,n){const s=N(e,"x","transpose");if(t==null&&(t=s.shape.map((o,i)=>i).reverse()),T(s.rank===t.length,()=>`Error in transpose: rank of input ${s.rank} must match length of perm ${t}.`),t.forEach(o=>{T(o>=0&&o<s.rank,()=>`All entries in 'perm' must be between 0 and ${s.rank-1} but got ${t}`)}),s.rank<=1)return s.clone();const r={x:s},a={perm:t};return s.dtype==="complex64"?Dt(()=>{let o=ra(s),i=Fo(s);return o=O.runKernel(Ca,{x:o},a),i=O.runKernel(Ca,{x:i},a),n&&(i=gn(i)),is(o,i)}):O.runKernel(Ca,r,a)}const zi=A({transpose_:JS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function QS(e,t,n,s,r=!0){const a=N(e,"v","movingAverage"),o=N(t,"x","movingAverage"),i=N(n,"decay","movingAverage");db(a,o),T(Ke(a.shape,o.shape),()=>"Shape mismatch in v and x");const l=At(1),c=Tt(l,i);let u=lt(Tt(o,a),c);if(r){T(s!=null,()=>"When using zeroDebias: true, step is required.");const f=N(s,"step","movingAverage");u=Wt(u,Tt(l,ea(i,f)))}return vt(a,u)}const tx=A({movingAverage_:QS});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ex(e,t,n){ze(n);const s=N(e,"indices","scatterND","int32"),r=N(t,"updates","scatterND");Gp(r,s,n);const a={indices:s,updates:r},o={shape:n};return O.runKernel(md,a,o)}const nx=A({scatterND_:ex});function sx(e,t,n,s){if(e.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${e.dtype}.`);if(e.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${e.shape}.`);const r=e.rank>0?e.shape[0]:1,a=e.rank>1?e.shape[1]:1;if(n.length!==a)throw new Error(`outputShape has incorrect number of elements:, ${n.length}, should be: ${a}.`);const o=t.size;if(!(t.rank===0||t.rank===1&&o===r))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${r}]`);if(t.dtype!==s.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rx(e,t,n,s=0){ze(n);const r=N(e,"sparseIndices","sparseToDense","int32"),a=N(t,"sparseValues","sparseToDense","string_or_numeric"),o=N(s,"defaultValue","sparseToDense",a.dtype);sx(r,a,n,o);const i={sparseIndices:r,sparseValues:a,defaultValue:o},l={outputShape:n};return O.runKernel(_d,i,l)}const ax=A({sparseToDense_:rx});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ox(e,t){const n=N(t,"indices","gatherND","int32"),r={params:N(e,"x","gatherND","string_or_numeric"),indices:n};return O.runKernel(Ph,r)}const ix=A({gatherND_:ox});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lx(e,t){if(t==null)return e.shape.slice();if(Ke(e.shape,t))return t;if(e.shape.length===t.length){const n=[];for(let s=0;s<e.shape.length;s++)t[s]==null&&e.shape[s]!=null?n.push(e.shape[s]):n.push(t[s]);return n}return t}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cx(e,t,n,s){const r=N(e,"x","dropout");if(T(r.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${r.dtype} tensor instead.`),T(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return e instanceof me?r.clone():r;const a=lx(r,n),o=1-t,i=Wt(Tp(vt(Oc(a,0,1,"float32",s),o)),o);return lt(r,i)}const ux=A({dropout_:cx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Yp(e){return Math.floor(Math.pow(2,Math.ceil(Math.log(e)/Math.log(2))))}function Vc(e,t,n){const s=1-e%2,r=new Float32Array(e);for(let a=0;a<e;++a){const o=2*Math.PI*a/(e+s-1);r[a]=t-n*Math.cos(o)}return Ue(r,"float32")}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function fx(e,t,n=1){const s=N(e,"predictions","inTopK"),r=N(t,"targets","inTopK");T(s.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${s.rank}`),T(s.rank-1===r.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${s.rank} and targets rank ${r.rank}`),Le(s.shape.slice(0,s.shape.length-1),r.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");const a=s.shape[s.shape.length-1];T(n>0&&n<=a,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${a}), but got ${n}`);const o=await s.data(),i=await r.data(),[l,c]=[o.length/a,a],u=ke("bool",l);for(let f=0;f<l;f++){const h=f*c,d=o.subarray(h,h+c),p=[];for(let y=0;y<d.length;y++)p.push({value:d[y],index:y});p.sort((y,g)=>g.value-y.value),u[f]=0;for(let y=0;y<n;y++)if(p[y].index===i[f]){u[f]=1;break}}return e!==s&&s.dispose(),t!==r&&r.dispose(),mn(u,r.shape,"bool")}const hx=fx;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dx(e,t,n,s,r,a="NHWC",o){let i=e;e.rank===3&&(i=X(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l=t;l.rank===3&&(l=X(t,[1,t.shape[0],t.shape[1],t.shape[2]])),T(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),T(l.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${l.shape}.`),T(n.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${n}.`);const c=a==="NHWC"?i.shape[3]:i.shape[1],u=a==="NHWC"?l.shape[3]:l.shape[1];T(c===n[2],()=>`Error in conv2dDerFilter: depth of input ${c}) must match input depth in filter (${n[2]}.`),T(u===n[3],()=>`Error in conv2dDerFilter: depth of dy (${u}) must match output depth for filter (${n[3]}).`),rn("conv2dDerFilter",r,o);const f={x:i,dy:l},h={strides:s,pad:r,dataFormat:a,dimRoundingMode:o,filterShape:n};return O.runKernel(mh,f,h)}const px=A({conv2DBackpropFilter_:dx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Lc(e,t,n){if(n==null||n==="linear")return e;if(n==="relu")return lt(e,jp(t));throw new Error(`Cannot compute gradient for fused activation ${n}.`)}function zc(e,t){let n=t;const s=J1(e.shape,t.shape);return s.length>0&&(n=qt(n,s)),X(n,e.shape)}function Bc(e,t,n,s){if(t==="linear")return e;if(t==="relu")return Po(e);if(t==="elu")return vp(e);if(t==="relu6")return Bp(e);if(t==="prelu")return Lp(e,n);if(t==="leakyrelu")return Ep(e,s);if(t==="sigmoid")return rr(e);throw new Error(`Unknown fused activation ${t}.`)}const Wc=(e,t)=>!(e>0)||t==="linear";/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mx({x:e,filter:t,strides:n,pad:s,dataFormat:r="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(l=l||"linear",Wc(O.state.gradientDepth,l)===!1){T(r==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${r} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let $=Ao(e,t,n,s,r,a,o);return i!=null&&($=vt($,i)),Bc($,l,c,u)}const f=N(e,"x","conv2d","float32"),h=N(t,"filter","conv2d","float32");let d=f,p=!1;f.rank===3&&(p=!0,d=X(f,[1,f.shape[0],f.shape[1],f.shape[2]])),T(d.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${d.rank}.`),T(h.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${h.rank}.`),rn("fused conv2d",s,o);const y=r==="NHWC"?d.shape[3]:d.shape[1];T(h.shape[2]===y,()=>`Error in conv2d: depth of input (${y}) must match input depth for filter ${h.shape[2]}.`),T(sn(n,a),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`);const g=xn(d.shape,h.shape,n,a,s,o);let m;i!=null&&(m=N(i,"bias","fused conv2d"),[m]=Xt(m,f),r==="NHWC"?Yt(g.outShape,m.shape):(T(m.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${m.shape.length}.`),T(m.shape.length===0||m.shape[0]===g.outChannels||m.shape[0]===1,()=>`Error in fused conv2d: bias shape (${m.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let w;if(c!=null){const $=c.shape;if(T($.length<=1||$.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${$.length}.`),$.length===1)T($[0]===1||$[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the number of output channels (${g.outChannels}).`);else if($.length===3)try{Yt($,g.outShape)}catch{const D=`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(D)}w=N(c,"prelu weights","fused conv2d")}const S=($,E)=>{T(r==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${r} but only NHWC is currently supported.`);const[D,_,x,v]=E,R=Lc($,x,l);T(Xa(a),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${a}'`);const P=wp(_.shape,R,D,n,s),V=px(_,R,D.shape,n,s),M=[P,V];if(v!=null){const L=zc(v,R);M.push(L)}return M},k={x:d,filter:h,bias:m,preluActivationWeights:w},I={strides:n,pad:s,dataFormat:r,dilations:a,dimRoundingMode:o,activation:l,leakyreluAlpha:u};return i==null?zn((E,D,_)=>{let x=O.runKernel(Ni,k,I);return _([D,E,x]),p&&(x=X(x,[x.shape[1],x.shape[2],x.shape[3]])),{value:x,gradFunc:S}})(d,h):zn((E,D,_,x)=>{let v=O.runKernel(Ni,k,I);return x([D,E,v,_]),p&&(v=X(v,[v.shape[1],v.shape[2],v.shape[3]])),{value:v,gradFunc:S}})(d,h,m)}const gx=A({fusedConv2d_:mx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yx(e,t,n,s,r,a=[1,1],o){let i=e;e.rank===3&&(i=X(e,[1,e.shape[0],e.shape[1],e.shape[2]]));let l=t;l.rank===3&&(l=X(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={x:i,dy:l},u={strides:s,pad:r,dimRoundingMode:o,dilations:a,filterShape:n};return O.runKernel(Ih,c,u)}const bx=A({depthwiseConv2dNativeBackpropFilter_:yx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wx(e,t,n,s,r,a=[1,1],o){let i=t,l=!1;t.rank===3&&(l=!0,i=X(t,[1,t.shape[0],t.shape[1],t.shape[2]]));const c={dy:i,filter:n},u={strides:s,pad:r,dimRoundingMode:o,dilations:a,inputShape:e},f=O.runKernel(Th,c,u);return l?X(f,[f.shape[1],f.shape[2],f.shape[3]]):f}const kx=A({depthwiseConv2dNativeBackpropInput_:wx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vx({x:e,filter:t,strides:n,pad:s,dataFormat:r="NHWC",dilations:a=[1,1],dimRoundingMode:o,bias:i,activation:l="linear",preluActivationWeights:c,leakyreluAlpha:u}){if(Wc(O.state.gradientDepth,l)===!1){let I=Ec(e,t,n,s,r,a,o);return i!=null&&(I=vt(I,i)),Bc(I,l,c,u)}const f=N(e,"x","depthwiseConv2d","float32"),h=N(t,"filter","depthwiseConv2d","float32");let d=f,p=!1;f.rank===3&&(p=!0,d=X(f,[1,f.shape[0],f.shape[1],f.shape[2]])),T(d.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${d.rank}.`),T(h.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${h.rank}.`),T(d.shape[3]===h.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${d.shape[3]}) must match the inChannels dimension in filter ${h.shape[2]}.`),a==null&&(a=[1,1]),T(sn(n,a),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${n} and dilations '${a}'`),rn("fused depthwiseConv2d",s,o);const y=xn(d.shape,h.shape,n,a,s,o,!0);let g;i!=null&&(g=N(i,"bias","fused conv2d"),[g]=Xt(g,f),Yt(y.outShape,g.shape));let m;c!=null&&(m=N(c,"prelu weights","fused depthwiseConv2d"));const w=(I,$)=>{T(Xa(a),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${a}'`);const[E,D,_,x]=$,v=Lc(I,_,l),R=kx(D.shape,v,E,n,s,a,o),P=bx(D,v,E.shape,n,s,a,o);if(x!=null){const V=zc(g,v);return[R,P,V]}return[R,P]},S={x:d,filter:h,bias:g,preluActivationWeights:m},k={strides:n,pad:s,dataFormat:r,dilations:a,dimRoundingMode:o,activation:l,leakyreluAlpha:u};return i==null?zn(($,E,D)=>{let _=O.runKernel(Ii,S,k);return D([E,$,_]),p&&(_=X(_,[_.shape[1],_.shape[2],_.shape[3]])),{value:_,gradFunc:w}})(d,h):zn(($,E,D,_)=>{let x=O.runKernel(Ii,S,k);return _([E,$,x,D]),p&&(x=X(x,[x.shape[1],x.shape[2],x.shape[3]])),{value:x,gradFunc:w}})(d,h,g)}const Sx=A({fusedDepthwiseConv2d_:vx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function xx({a:e,b:t,transposeA:n=!1,transposeB:s=!1,bias:r,activation:a="linear",preluActivationWeights:o,leakyreluAlpha:i=.2}){if(Wc(O.state.gradientDepth,a)===!1){let v=Mt(e,t,n,s);return r!=null&&(v=vt(v,r)),Bc(v,a,o,i)}let l=N(e,"a","fused matMul"),c=N(t,"b","fused matMul");[l,c]=Xt(l,c);const u=n?l.shape[l.rank-2]:l.shape[l.rank-1],f=s?c.shape[c.rank-1]:c.shape[c.rank-2],h=n?l.shape[l.rank-1]:l.shape[l.rank-2],d=s?c.shape[c.rank-2]:c.shape[c.rank-1],p=l.shape.slice(0,-2),y=c.shape.slice(0,-2),g=nt(p),m=nt(y);T(u===f,()=>`Error in fused matMul: inner shapes (${u}) and (${f}) of Tensors with shapes ${l.shape} and ${c.shape} and transposeA=${n} and transposeB=${s} must match.`);const S=Yt(l.shape.slice(0,-2),c.shape.slice(0,-2)).concat([h,d]),k=n?X(l,[g,u,h]):X(l,[g,h,u]),I=s?X(c,[m,d,f]):X(c,[m,f,d]);let $;r!=null&&($=N(r,"bias","fused matMul"),[$]=Xt($,l),Yt(S,$.shape));let E;o!=null&&(E=N(o,"prelu weights","fused matMul"));const D=(v,R)=>{const[P,V,M,L]=R,W=Lc(X(v,M.shape),M,a);let z,H;if(!n&&!s?(z=Mt(W,V,!1,!0),H=Mt(P,W,!0,!1)):!n&&s?(z=Mt(W,V,!1,!1),H=Mt(W,P,!0,!1)):n&&!s?(z=Mt(V,W,!1,!0),H=Mt(P,W,!1,!1)):(z=Mt(V,W,!0,!0),H=Mt(W,P,!0,!0)),r!=null){const K=zc(L,W);return[z,H,K]}else return[z,H]},_={a:k,b:I,bias:$,preluActivationWeights:E},x={transposeA:n,transposeB:s,activation:a,leakyreluAlpha:i};return r==null?zn((R,P,V)=>{const M=O.runKernel(xi,_,x);return V([R,P,M]),{value:X(M,S),gradFunc:D}})(k,I):zn((R,P,V,M)=>{const L=O.runKernel(xi,_,x);return M([R,P,L,V]),{value:X(L,S),gradFunc:D}})(k,I,$)}const Nx=A({fusedMatMul_:xx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Ix=Object.freeze(Object.defineProperty({__proto__:null,conv2d:gx,depthwiseConv2d:Sx,matMul:Nx},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Tx(e){return Vc(e,.54,.46)}const $x=A({hammingWindow_:Tx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _x(e){return Vc(e,.5,.5)}const Zp=A({hannWindow_:_x});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ex(e,t,n,s=!1,r=0){let a=0;const o=[];for(;a+t<=e.size;)o.push(Bt(e,a,t)),a+=n;if(s)for(;a<e.size;){const i=a+t-e.size,l=be([Bt(e,a,t-i),pa([i],r)]);o.push(l),a+=n}return o.length===0?Br([],[0,t]):X(be(o),[o.length,t])}const Jp=A({frame_:Ex});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Cx(e,t,n,s,r=Zp){s==null&&(s=Yp(t));const a=Jp(e,t,n),o=lt(a,r(t));return Rc(o,s)}const Ax=A({stft_:Cx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dx(e,t,n,s,r="bilinear",a=0){const o=N(e,"image","cropAndResize"),i=N(t,"boxes","cropAndResize","float32"),l=N(n,"boxInd","cropAndResize","int32"),c=i.shape[0];T(o.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${o.rank}.`),T(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${c},4] but had shape ${i.shape}.`),T(l.rank===1&&l.shape[0]===c,()=>`Error in cropAndResize: boxInd must be have size [${c}] but had shape ${i.shape}.`),T(s.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${s.length}.`),T(s[0]>=1&&s[1]>=1,()=>`cropSize must be atleast [1,1], but was ${s}`),T(r==="bilinear"||r==="nearest",()=>`method must be bilinear or nearest, but was ${r}`);const u={image:o,boxes:i,boxInd:l},f={method:r,extrapolationValue:a,cropSize:s};return O.runKernel(vh,u,f)}const Ox=A({cropAndResize_:Dx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fx(e){const t=N(e,"image","flipLeftRight","float32");T(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);const n={image:t};return O.runKernel(Oh,n,{})}const Rx=A({flipLeftRight_:Fx});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Px(e){const t=N(e,"image","grayscaleToRGB"),n=t.rank-1,s=t.shape[n];T(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),T(s===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${s}.`);const r=new Array(t.rank);return r.fill(1,0,n),r[n]=3,zr(t,r)}const Mx=A({grayscaleToRGB_:Px});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vx(e){const t=N(e,"image","RGBToGrayscale"),n=t.rank-1,s=t.shape[n];T(t.rank>=2,()=>`Error in RGBToGrayscale: images must be at least rank 2, but got rank ${t.rank}.`),T(s===3,()=>`Error in RGBToGrayscale: last dimension of an RGB image should be size 3, but got size ${s}.`);const r=t.dtype,a=Zt(t,"float32"),o=Ue([.2989,.587,.114]);let i;switch(t.rank){case 2:i=Zs("ij,j->i",a,o);break;case 3:i=Zs("ijk,k->ij",a,o);break;case 4:i=Zs("ijkl,l->ijk",a,o);break;case 5:i=Zs("ijklm,m->ijkl",a,o);break;case 6:i=Zs("ijklmn,n->ijklm",a,o);break;default:throw new Error("Not a valid tensor rank.")}return i=En(i,-1),Zt(i,r)}const Lx=A({rgbToGrayscale_:Vx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zx(e,t,n=0,s=.5){const r=N(e,"image","rotateWithOffset","float32");T(r.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${r.rank}.`);const a={image:r},o={radians:t,fillValue:n,center:s};return O.runKernel(Ld,a,o)}const Bx=A({rotateWithOffset_:zx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ir(e,t,n,s,r,a){s==null&&(s=.5),r==null&&(r=Number.NEGATIVE_INFINITY),a==null&&(a=0);const o=e.shape[0];return n=Math.min(n,o),T(0<=s&&s<=1,()=>`iouThreshold must be in [0, 1], but was '${s}'`),T(e.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${e.rank}'`),T(e.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${e.shape[1]}`),T(t.rank===1,()=>"scores must be a 1D tensor"),T(t.shape[0]===o,()=>`scores has incompatible shape with boxes. Expected ${o}, but was ${t.shape[0]}`),T(0<=a&&a<=1,()=>`softNmsSigma must be in [0, 1], but was '${a}'`),{maxOutputSize:n,iouThreshold:s,scoreThreshold:r,softNmsSigma:a}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Wx(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY){const a=N(e,"boxes","nonMaxSuppression","float32"),o=N(t,"scores","nonMaxSuppression","float32"),i=Ir(a,o,n,s,r);n=i.maxOutputSize,s=i.iouThreshold,r=i.scoreThreshold;const l={maxOutputSize:n,iouThreshold:s,scoreThreshold:r};return O.runKernel(Zh,{boxes:a,scores:o},l)}const Hx=A({nonMaxSuppression_:Wx});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ux(e,t,n){const s=jx(e,t,n),r=s<0?-(s+1):s;e.splice(r,0,t)}function jx(e,t,n){return Gx(e,t,n||qx)}function qx(e,t){return e>t?1:e<t?-1:0}function Gx(e,t,n){let s=0,r=e.length,a=0,o=!1;for(;s<r;){a=s+(r-s>>>1);const i=n(t,e[a]);i>0?s=a+1:(r=a,o=!i)}return o?s:-s-1}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Qp(e,t,n,s,r){return Hc(e,t,n,s,r,0)}function tm(e,t,n,s,r,a){return Hc(e,t,n,s,r,0,!1,a,!0)}function em(e,t,n,s,r,a){return Hc(e,t,n,s,r,a,!0)}function Hc(e,t,n,s,r,a,o=!1,i=!1,l=!1){const c=[];for(let g=0;g<t.length;g++)t[g]>r&&c.push({score:t[g],boxIndex:g,suppressBeginIndex:0});c.sort(ju);const u=a>0?-.5/a:0,f=[],h=[];for(;f.length<n&&c.length>0;){const g=c.pop(),{score:m,boxIndex:w,suppressBeginIndex:S}=g;if(m<r)break;let k=!1;for(let I=f.length-1;I>=S;--I){const $=Kx(e,w,f[I]);if($>=s){k=!0;break}if(g.score=g.score*Xx(s,u,$),g.score<=r)break}g.suppressBeginIndex=f.length,k||(g.score===m?(f.push(w),h.push(g.score)):g.score>r&&Ux(c,g,ju))}const d=f.length,p=n-d;i&&p>0&&(f.push(...new Array(p).fill(0)),h.push(...new Array(p).fill(0)));const y={selectedIndices:f};return o&&(y.selectedScores=h),l&&(y.validOutputs=d),y}function Kx(e,t,n){const s=e.subarray(t*4,t*4+4),r=e.subarray(n*4,n*4+4),a=Math.min(s[0],s[2]),o=Math.min(s[1],s[3]),i=Math.max(s[0],s[2]),l=Math.max(s[1],s[3]),c=Math.min(r[0],r[2]),u=Math.min(r[1],r[3]),f=Math.max(r[0],r[2]),h=Math.max(r[1],r[3]),d=(i-a)*(l-o),p=(f-c)*(h-u);if(d<=0||p<=0)return 0;const y=Math.max(a,c),g=Math.max(o,u),m=Math.min(i,f),w=Math.min(l,h),S=Math.max(m-y,0)*Math.max(w-g,0);return S/(d+p-S)}function Xx(e,t,n){const s=Math.exp(t*n*n);return n<=e?s:0}function ju(e,t){return e.score-t.score||e.score===t.score&&t.boxIndex-e.boxIndex}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function Yx(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY){const a=N(e,"boxes","nonMaxSuppressionAsync"),o=N(t,"scores","nonMaxSuppressionAsync"),i=Ir(a,o,n,s,r);n=i.maxOutputSize,s=i.iouThreshold,r=i.scoreThreshold;const l=await Promise.all([a.data(),o.data()]),c=l[0],u=l[1],{selectedIndices:f}=Qp(c,u,n,s,r);return a!==e&&a.dispose(),o!==t&&o.dispose(),Ue(f,"int32")}const Zx=Yx;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jx(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,a=0){const o=N(e,"boxes","nonMaxSuppression"),i=N(t,"scores","nonMaxSuppression"),l=Ir(o,i,n,s,r,a);n=l.maxOutputSize,s=l.iouThreshold,r=l.scoreThreshold,a=l.softNmsSigma;const c={boxes:o,scores:i},u={maxOutputSize:n,iouThreshold:s,scoreThreshold:r,softNmsSigma:a},f=O.runKernel(Qh,c,u);return{selectedIndices:f[0],selectedScores:f[1]}}const Qx=A({nonMaxSuppressionWithScore_:Jx});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function tN(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,a=0){const o=N(e,"boxes","nonMaxSuppressionAsync"),i=N(t,"scores","nonMaxSuppressionAsync"),l=Ir(o,i,n,s,r,a);n=l.maxOutputSize,s=l.iouThreshold,r=l.scoreThreshold,a=l.softNmsSigma;const c=await Promise.all([o.data(),i.data()]),u=c[0],f=c[1],{selectedIndices:h,selectedScores:d}=em(u,f,n,s,r,a);return o!==e&&o.dispose(),i!==t&&i.dispose(),{selectedIndices:Ue(h,"int32"),selectedScores:Ue(d)}}const eN=tN;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nN(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,a=!1){const o=N(e,"boxes","nonMaxSuppression"),i=N(t,"scores","nonMaxSuppression"),l=Ir(o,i,n,s,r,null),c=l.maxOutputSize,u=l.iouThreshold,f=l.scoreThreshold,h={boxes:o,scores:i},d={maxOutputSize:c,iouThreshold:u,scoreThreshold:f,padToMaxOutputSize:a},p=O.runKernel(Jh,h,d);return{selectedIndices:p[0],validOutputs:p[1]}}const sN=A({nonMaxSuppressionPadded_:nN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function rN(e,t,n,s=.5,r=Number.NEGATIVE_INFINITY,a=!1){const o=N(e,"boxes","nonMaxSuppressionAsync"),i=N(t,"scores","nonMaxSuppressionAsync"),l=Ir(o,i,n,s,r,null),c=l.maxOutputSize,u=l.iouThreshold,f=l.scoreThreshold,[h,d]=await Promise.all([o.data(),i.data()]),{selectedIndices:p,validOutputs:y}=tm(h,d,c,u,f,a);return o!==e&&o.dispose(),i!==t&&i.dispose(),{selectedIndices:Ue(p,"int32"),validOutputs:At(y,"int32")}}const aN=rN;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oN(e,t,n=!1,s=!1){const r=N(e,"images","resizeBilinear");T(r.rank===3||r.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${r.rank}.`),T(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),T(s===!1||n===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let a=r,o=!1;r.rank===3&&(o=!0,a=X(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const i={images:a},l={alignCorners:n,halfPixelCenters:s,size:t},c=O.runKernel(dd,i,l);return o?X(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const iN=A({resizeBilinear_:oN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lN(e,t,n=!1,s=!1){const r=N(e,"images","resizeNearestNeighbor");T(r.rank===3||r.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${r.rank}.`),T(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),T(r.dtype==="float32"||r.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),T(s===!1||n===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let a=r,o=!1;r.rank===3&&(o=!0,a=X(r,[1,r.shape[0],r.shape[1],r.shape[2]]));const i={images:a},l={alignCorners:n,halfPixelCenters:s,size:t},c=O.runKernel(hd,i,l);return o?X(c,[c.shape[1],c.shape[2],c.shape[3]]):c}const cN=A({resizeNearestNeighbor_:lN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uN(e,t="binary",n=!1,s=.5){const r=N(e,"image","threshold"),a=.2989,o=.587,i=.114,l=r.shape[0]*r.shape[1];let c=lt(Ue([s]),255),u,f,h,d;if(T(r.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${r.rank}.`),T(r.shape[2]===3||r.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${r.shape[2]}.`),T(r.dtype==="int32"||r.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${r.dtype}.`),T(t==="otsu"||t==="binary",()=>`Method must be binary or otsu, but was ${t}`),r.shape[2]===3){[u,f,h]=aa(r,[1,1,1],-1);const g=lt(u,a),m=lt(f,o),w=lt(h,i);d=vt(vt(g,m),w)}else d=e;if(t==="otsu"){const g=bp(Zt(Wp(d),"int32"),mn([]),256);c=fN(g,l)}const p=n?Cc(d,c):Oo(d,c);return Zt(lt(p,255),"int32")}function fN(e,t){let n=Ue([-1]),s=Ue([0]),r=Ue([0]),a,o,i,l,c,u;for(let f=0;f<e.size-1;f++){a=Bt(e,0,f+1),o=Bt(e,f+1),c=Wt(qt(a),t),u=Wt(qt(o),t);const h=qt(lt(a,sa(0,a.size)));i=Wt(h,qt(a));const d=pa(o.shape,a.size),p=vt(sa(0,o.size),d),y=lt(o,p);l=Wt(qt(y),qt(o));const g=Tt(i,l),m=Tt(i,l),w=lt(c,u);r=lt(lt(w,g),m);const S=Oo(r,s);s=as(S,r,s),n=as(S,Ue([f]),n)}return n}const hN=A({threshold_:uN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dN(e,t,n="nearest",s="constant",r=0,a){const o=N(e,"image","transform","float32"),i=N(t,"transforms","transform","float32");T(o.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${o.rank}.`),T(i.rank===2&&(i.shape[0]===o.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),T(a==null||a.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${a}.`);const l={image:o,transforms:i},c={interpolation:n,fillMode:s,fillValue:r,outputShape:a};return O.runKernel(Fd,l,c)}const pN=A({transform_:dN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function mN(e,t,n){const s=N(e,"a","bandPart");T(s.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${s.rank}.`);const r=s.shape,[a,o]=s.shape.slice(-2);let i,l;typeof t=="number"?(T(t%1===0,()=>`bandPart(): numLower must be an integer, got ${t}.`),T(t<=a,()=>`bandPart(): numLower (${t}) must not be greater than the number of rows (${a}).`),i=N(t<0?a:t,"numLower","bandPart")):(T(t.dtype==="int32",()=>"bandPart(): numLower's dtype must be an int32."),i=as(Li(t,0),a,Qa(t,a))),typeof n=="number"?(T(n%1===0,()=>`bandPart(): numUpper must be an integer, got ${n}.`),T(n<=o,()=>`bandPart(): numUpper (${n}) must not be greater than the number of columns (${o}).`),l=N(n<0?o:n,"numUpper","bandPart")):(T(n.dtype==="int32",()=>"bandPart(): numUpper's dtype must be an int32."),l=as(Li(n,0),o,Qa(n,o)));const c=X(sa(0,a,1,"int32"),[-1,1]),u=sa(0,o,1,"int32"),f=Tt(c,u),h=Za(Cc(f,i),_p(f,gn(l))),d=dr([a,o],s.dtype);return X(Bn(js(X(s,[-1,a,o])).map(p=>as(h,p,d))),r)}const gN=A({bandPart_:mN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yN(e){let t;if(Array.isArray(e)){t=!1,T(e!=null&&e.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");const r=e[0].shape[0];for(let a=1;a<e.length;++a)T(e[a].shape[0]===r,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${e[a].shape[0]} vs. ${r})`)}else t=!0,e=aa(e,e.shape[0],0).map(r=>Pc(r,[0]));T(e.length<=e[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${e.length}) exceeds number of dimensions (${e[0].shape[0]}).`);const n=[],s=e;for(let r=0;r<e.length;++r)n.push(O.tidy(()=>{let a=s[r];if(r>0)for(let o=0;o<r;++o){const i=lt(qt(lt(n[o],a)),n[o]);a=Tt(a,i)}return Wt(a,Do(a,"euclidean"))}));return t?Bn(n,0):n}const bN=A({gramSchmidt_:yN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function wN(e,t=!1){if(T(e.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${e.rank}`),e.rank===2)return qu(e,t);{const n=e.shape.slice(0,e.shape.length-2).reduce((l,c)=>l*c),s=js(X(e,[n,e.shape[e.shape.length-2],e.shape[e.shape.length-1]]),0),r=[],a=[];s.forEach(l=>{const[c,u]=qu(l,t);r.push(c),a.push(u)});const o=X(Bn(r,0),e.shape),i=X(Bn(a,0),e.shape);return[o,i]}}function qu(e,t=!1){return O.tidy(()=>{T(e.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${e.shape.length}D Tensor.`);const n=e.shape[0],s=e.shape[1];let r=Ip(n),a=rs(e);const o=Br([[1]],[1,1]);let i=rs(o);const l=n>=s?s:n;for(let c=0;c<l;++c){const u=a,f=i,h=r;[i,a,r]=O.tidy(()=>{const d=Bt(a,[c,c],[n-c,1]),p=Do(d),y=Bt(a,[c,c],[1,1]),g=as(Oo(y,0),Br([[-1]]),Br([[1]])),m=Tt(y,lt(g,p)),w=Wt(d,m);w.shape[0]===1?i=rs(o):i=be([o,Bt(w,[1,0],[w.shape[0]-1,w.shape[1]])],0);const S=gn(Wt(Mt(g,m),p)),k=Bt(a,[c,0],[n-c,s]),I=lt(S,i),$=zi(i);if(c===0)a=Tt(k,Mt(I,Mt($,k)));else{const _=Tt(k,Mt(I,Mt($,k)));a=be([Bt(a,[0,0],[c,s]),_],0)}const E=zi(I),D=Bt(r,[0,c],[n,r.shape[1]-c]);if(c===0)r=Tt(D,Mt(Mt(D,i),E));else{const _=Tt(D,Mt(Mt(D,i),E));r=be([Bt(r,[0,0],[n,c]),_],1)}return[i,a,r]}),Te([u,f,h])}return!t&&n>s&&(r=Bt(r,[0,0],[n,s]),a=Bt(a,[0,0],[s,s])),[r,a]})}const kN=A({qr_:wN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var Ne;(function(e){e[e.NONE=0]="NONE",e[e.MEAN=1]="MEAN",e[e.SUM=2]="SUM",e[e.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(Ne||(Ne={}));function vN(e,t,n=Ne.SUM_BY_NONZERO_WEIGHTS){const s=N(e,"losses","computeWeightedLoss");let r=null;t!=null&&(r=N(t,"weights","computeWeightedLoss"));const a=r==null?s:lt(s,r);if(n===Ne.NONE)return a;if(n===Ne.SUM)return qt(a);if(n===Ne.MEAN){if(r==null)return Ja(a);{const o=s.size/r.size,i=Wt(qt(a),qt(r));return o>1?Wt(i,At(o)):i}}if(n===Ne.SUM_BY_NONZERO_WEIGHTS){if(r==null)return Wt(qt(a),At(s.size));{const o=lt(r,$s(s.shape)),i=Zt(qt(Mp(o,At(0))),"float32");return Wt(qt(a),i)}}throw Error(`Unknown reduction: ${n}`)}const Gn=A({computeWeightedLoss_:vN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function SN(e,t,n,s=Ne.SUM_BY_NONZERO_WEIGHTS){const r=N(e,"labels","absoluteDifference"),a=N(t,"predictions","absoluteDifference");let o=null;n!=null&&(o=N(n,"weights","absoluteDifference")),Le(r.shape,a.shape,"Error in absoluteDifference: ");const i=Pe(Tt(r,a));return Gn(i,o,s)}const xN=A({absoluteDifference_:SN});function NN(e,t,n,s,r=Ne.SUM_BY_NONZERO_WEIGHTS){const a=N(e,"labels","cosineDistance"),o=N(t,"predictions","cosineDistance");let i=null;s!=null&&(i=N(s,"weights","cosineDistance")),Le(a.shape,o.shape,"Error in cosineDistance: ");const l=At(1),c=Tt(l,qt(lt(a,o),n,!0));return Gn(c,i,r)}const IN=A({cosineDistance_:NN});function TN(e,t,n,s=Ne.SUM_BY_NONZERO_WEIGHTS){let r=N(e,"labels","hingeLoss");const a=N(t,"predictions","hingeLoss");let o=null;n!=null&&(o=N(n,"weights","hingeLoss")),Le(r.shape,a.shape,"Error in hingeLoss: ");const i=At(1);r=Tt(lt(At(2),r),i);const l=Po(Tt(i,lt(r,a)));return Gn(l,o,s)}const $N=A({hingeLoss_:TN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _N(e,t,n,s=1,r=Ne.SUM_BY_NONZERO_WEIGHTS){const a=N(e,"labels","huberLoss"),o=N(t,"predictions","huberLoss");let i=null;n!=null&&(i=N(n,"weights","huberLoss")),Le(a.shape,o.shape,"Error in huberLoss: ");const l=At(s),c=Pe(Tt(o,a)),u=Qa(c,l),f=Tt(c,u),h=vt(lt(At(.5),Je(u)),lt(l,f));return Gn(h,i,r)}const EN=A({huberLoss_:_N});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function CN(e,t,n,s=1e-7,r=Ne.SUM_BY_NONZERO_WEIGHTS){const a=N(e,"labels","logLoss"),o=N(t,"predictions","logLoss");let i=null;n!=null&&(i=N(n,"weights","logLoss")),Le(a.shape,o.shape,"Error in logLoss: ");const l=At(1),c=At(s),u=gn(lt(a,na(vt(o,c)))),f=lt(Tt(l,a),na(vt(Tt(l,o),c))),h=Tt(u,f);return Gn(h,i,r)}const AN=A({logLoss_:CN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function DN(e,t,n,s=Ne.SUM_BY_NONZERO_WEIGHTS){const r=N(e,"labels","meanSquaredError"),a=N(t,"predictions","meanSquaredError");let o=null;n!=null&&(o=N(n,"weights","meanSquaredError")),Le(r.shape,a.shape,"Error in meanSquaredError: ");const i=Up(r,a);return Gn(i,o,s)}const ON=A({meanSquaredError_:DN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function FN(e,t){const n=N(e,"labels","sigmoidCrossEntropyWithLogits"),s=N(t,"logits","sigmoidCrossEntropyWithLogits");Le(n.shape,s.shape,"Error in sigmoidCrossEntropyWithLogits: ");const r=Po(s),a=lt(s,n),o=Cp(Rs(gn(Pe(s))));return vt(Tt(r,a),o)}function RN(e,t,n,s=0,r=Ne.SUM_BY_NONZERO_WEIGHTS){let a=N(e,"multiClassLabels","sigmoidCrossEntropy");const o=N(t,"logits","sigmoidCrossEntropy");let i=null;if(n!=null&&(i=N(n,"weights","sigmoidCrossEntropy")),Le(a.shape,o.shape,"Error in sigmoidCrossEntropy: "),s>0){const c=At(s),u=At(1),f=At(.5);a=vt(lt(a,Tt(u,c)),lt(f,c))}const l=FN(a,o);return Gn(l,i,r)}const PN=A({sigmoidCrossEntropy_:RN});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function MN(e,t,n=-1){if(n===-1&&(n=t.rank-1),n!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${n}`);return zn((r,a,o)=>{const l=Dp(a,[n],!0),c=Tt(Zt(a,"float32"),l);o([r,c]);const u=gn(lt(c,r));return{value:qt(u,[n]),gradFunc:(d,p)=>{const[y,g]=p,m=an(d.shape,[n]);return[lt(X(d,m),Tt(Zt(y,"float32"),Rs(g))),lt(X(d,m),Tt(Rs(g),Zt(y,"float32")))]}}})(e,t)}function VN(e,t,n,s=0,r=Ne.SUM_BY_NONZERO_WEIGHTS){let a=N(e,"onehotLabels","softmaxCrossEntropy");const o=N(t,"logits","softmaxCrossEntropy");let i=null;if(n!=null&&(i=N(n,"weights","softmaxCrossEntropy")),Le(a.shape,o.shape,"Error in softmaxCrossEntropy: "),s>0){const c=At(s),u=At(1),f=At(a.shape[1]);a=vt(lt(a,Tt(u,c)),Wt(c,f))}const l=MN(a,o);return Gn(l,i,r)}const LN=A({softmaxCrossEntropy_:VN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zN(e,t,n,s){const r=N(e,"indices","sparseFillEmptyRows","int32"),a=N(t,"values","sparseFillEmptyRows"),o=N(n,"denseShape","sparseFillEmptyRows","int32"),i=N(s,"defaultValue","sparseFillEmptyRows",a.dtype);if(r.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${r.shape}`);if(a.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${a.shape}`);if(o.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${o.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);const l={indices:r,values:a,denseShape:o,defaultValue:i},c=O.runKernel(Nd,l);return{outputIndices:c[0],outputValues:c[1],emptyRowIndicator:c[2],reverseIndexMap:c[3]}}const BN=A({sparseFillEmptyRows_:zN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function WN(e,t,n){const s=N(e,"inputIndices","sparseReshape","int32"),r=N(t,"inputShape","sparseReshape","int32"),a=N(n,"newShape","sparseReshape","int32");if(s.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${s.shape}`);if(r.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${r.shape}`);if(a.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${a.shape}`);const o={inputIndices:s,inputShape:r,newShape:a},i=O.runKernel(Id,o);return{outputIndices:i[0],outputShape:i[1]}}const HN=A({sparseReshape_:WN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function UN(e,t,n){const s=N(e,"data","sparseSegmentMean"),r=N(t,"indices","sparseSegmentMean","int32"),a=N(n,"segmentIds","sparseSegmentMean","int32");if(s.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${r.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${a.shape}`);const o={data:s,indices:r,segmentIds:a};return O.runKernel(Td,o)}const jN=A({sparseSegmentMean_:UN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qN(e,t,n){const s=N(e,"data","sparseSegmentSum"),r=N(t,"indices","sparseSegmentSum","int32"),a=N(n,"segmentIds","sparseSegmentSum","int32");if(s.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${r.shape}`);if(a.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${a.shape}`);const o={data:s,indices:r,segmentIds:a};return O.runKernel($d,o)}const GN=A({sparseSegmentSum_:qN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function KN(e,t,n,s,r,a,o,i){const l=N(e,"data","stringNGrams","string");if(l.dtype!=="string")throw new Error("Data must be of datatype string");if(l.shape.length!==1)throw new Error(`Data must be a vector, saw: ${l.shape}`);const c=N(t,"dataSplits","stringNGrams");if(c.dtype!=="int32")throw new Error("Data splits must be of datatype int32");const u={separator:n,nGramWidths:s,leftPad:r,rightPad:a,padWidth:o,preserveShortSequences:i},f={data:l,dataSplits:c},h=O.runKernel(Cd,f,u);return{nGrams:h[0],nGramsSplits:h[1]}}const XN=A({stringNGrams_:KN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function YN(e,t,n=!0){const s=N(e,"input","stringSplit","string"),r=N(t,"delimiter","stringSplit","string");if(s.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${s.shape}`);if(r.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${r.shape}`);const a={skipEmpty:n},o={input:s,delimiter:r},i=O.runKernel(Ad,o,a);return{indices:i[0],values:i[1],shape:i[2]}}const ZN=A({stringSplit_:YN});/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function JN(e,t){const n=N(e,"input","stringToHashBucketFast","string"),s={numBuckets:t};if(t<=0)throw new Error("Number of buckets must be at least 1");const r={input:n};return O.runKernel(Dd,r,s)}const QN=A({stringToHashBucketFast_:JN});/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tI(e,t,n,s=!0){const r=N(e,"input","staticRegexReplace","string"),a={pattern:t,rewrite:n,replaceGlobal:s};return O.runKernel(wc,{x:r},a)}const eI=A({staticRegexReplace_:tI});/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const nI={fft:Fc,ifft:to,rfft:Rc,irfft:Hp},sI={hammingWindow:$x,hannWindow:Zp,frame:Jp,stft:Ax},rI={flipLeftRight:Rx,grayscaleToRGB:Mx,resizeNearestNeighbor:cN,resizeBilinear:iN,rgbToGrayscale:Lx,rotateWithOffset:Bx,cropAndResize:Ox,nonMaxSuppression:Hx,nonMaxSuppressionAsync:Zx,nonMaxSuppressionWithScore:Qx,nonMaxSuppressionWithScoreAsync:eN,nonMaxSuppressionPadded:sN,nonMaxSuppressionPaddedAsync:aN,threshold:hN,transform:pN},aI={bandPart:gN,gramSchmidt:bN,qr:kN},oI={absoluteDifference:xN,computeWeightedLoss:Gn,cosineDistance:IN,hingeLoss:$N,huberLoss:EN,logLoss:AN,meanSquaredError:ON,sigmoidCrossEntropy:PN,softmaxCrossEntropy:LN},iI={sparseFillEmptyRows:BN,sparseReshape:HN,sparseSegmentMean:jN,sparseSegmentSum:GN},lI={stringNGrams:XN,stringSplit:ZN,stringToHashBucketFast:QN,staticRegexReplace:eI};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const cI=new Map,uI=new Map;class fI{getClassName(){return this.constructor.className}static fromConfig(t,n){return new t(n)}}class xs{constructor(){this.classNameMap={}}static getMap(){return xs.instance==null&&(xs.instance=new xs),xs.instance}static register(t){xs.getMap().classNameMap[t.className]=[t,t.fromConfig]}}function hI(e,t,n){T(e.className!=null,()=>"Class being registered does not have the static className property defined."),T(typeof e.className=="string",()=>"className is required to be a string, but got type "+typeof e.className),T(e.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),typeof t>"u"&&(t="Custom"),typeof n>"u"&&(n=e.className);const s=n,r=t+">"+s;return xs.register(e),cI.set(r,e),uI.set(e,r),e}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class qs extends fI{minimize(t,n=!1,s){const{value:r,grads:a}=this.computeGradients(t,s);if(s!=null){const o=s.map(i=>({name:i.name,tensor:a[i.name]}));this.applyGradients(o)}else this.applyGradients(a);return Te(a),n?r:(r.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(t,n){return Gw(t,n)}dispose(){this.iterations_!=null&&Te(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:At(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(t){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(t){return this.iterations_=(await t[0].tensor.data())[0],t.slice(1)}}Object.defineProperty(qs,Symbol.hasInstance,{value:e=>e.minimize!=null&&e.computeGradients!=null&&e.applyGradients!=null});/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class dI extends qs{static get className(){return"Adadelta"}constructor(t,n,s=null){super(),this.learningRate=t,this.rho=n,this.epsilon=s,this.accumulatedGrads=[],this.accumulatedUpdates=[],s==null&&(this.epsilon=O.backend.epsilon())}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,r)=>{const a=O.registeredVariables[s],o=!1;this.accumulatedGrads[r]==null&&(this.accumulatedGrads[r]={originalName:`${s}/accum_grad`,variable:Dt(()=>Ve(a).variable(o))}),this.accumulatedUpdates[r]==null&&(this.accumulatedUpdates[r]={originalName:`${s}/accum_var`,variable:Dt(()=>Ve(a).variable(o))});const i=Array.isArray(t)?t[r].tensor:t[s];if(i==null)return;const l=this.accumulatedGrads[r].variable,c=this.accumulatedUpdates[r].variable;Dt(()=>{const u=vt(lt(l,this.rho),lt(Je(i),1-this.rho)),f=lt(Wt(Ln(vt(c,this.epsilon)),Ln(vt(l,this.epsilon))),i),h=vt(lt(c,this.rho),lt(Je(f),1-this.rho));l.assign(u),c.assign(h);const d=vt(lt(f,-this.learningRate),a);a.assign(d)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(Te(this.accumulatedGrads.map(t=>t.variable)),Te(this.accumulatedUpdates.map(t=>t.variable)))}async getWeights(){const t=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(t.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(t){t=await this.extractIterations(t);const n=t.length/2,s=!1;this.accumulatedGrads=t.slice(0,n).map(r=>({originalName:r.name,variable:r.tensor.variable(s)})),this.accumulatedUpdates=t.slice(n,n*2).map(r=>({originalName:r.name,variable:r.tensor.variable(s)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(t,n){return new t(n.learningRate,n.rho,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class pI extends qs{static get className(){return"Adagrad"}constructor(t,n=.1){super(),this.learningRate=t,this.initialAccumulatorValue=n,this.accumulatedGrads=[]}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,r)=>{const a=O.registeredVariables[s];this.accumulatedGrads[r]==null&&(this.accumulatedGrads[r]={originalName:`${s}/accumulator`,variable:Dt(()=>pa(a.shape,this.initialAccumulatorValue).variable(!1))});const o=Array.isArray(t)?t[r].tensor:t[s];if(o==null)return;const i=this.accumulatedGrads[r].variable;Dt(()=>{const l=vt(i,Je(o));i.assign(l);const c=vt(lt(Wt(o,Ln(vt(l,O.backend.epsilon()))),-this.learningRate),a);a.assign(c)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&Te(this.accumulatedGrads.map(t=>t.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);const n=!1;this.accumulatedGrads=t.map(s=>({originalName:s.name,variable:s.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(t,n){return new t(n.learningRate,n.initialAccumulatorValue)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class mI extends qs{static get className(){return"Adam"}constructor(t,n,s,r=null){super(),this.learningRate=t,this.beta1=n,this.beta2=s,this.epsilon=r,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],Dt(()=>{this.accBeta1=At(n).variable(),this.accBeta2=At(s).variable()}),r==null&&(this.epsilon=O.backend.epsilon())}applyGradients(t){const n=Array.isArray(t)?t.map(s=>s.name):Object.keys(t);Dt(()=>{const s=Tt(1,this.accBeta1),r=Tt(1,this.accBeta2);n.forEach((a,o)=>{const i=O.registeredVariables[a],l=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:Dt(()=>Ve(i).variable(l))}),this.accumulatedSecondMoment[o]==null&&(this.accumulatedSecondMoment[o]={originalName:`${a}/v`,variable:Dt(()=>Ve(i).variable(l))});const c=Array.isArray(t)?t[o].tensor:t[a];if(c==null)return;const u=this.accumulatedFirstMoment[o].variable,f=this.accumulatedSecondMoment[o].variable,h=vt(lt(u,this.beta1),lt(c,1-this.beta1)),d=vt(lt(f,this.beta2),lt(Je(c),1-this.beta2)),p=Wt(h,s),y=Wt(d,r);u.assign(h),f.assign(d);const g=vt(lt(Wt(p,vt(Ln(y),this.epsilon)),-this.learningRate),i);i.assign(g)}),this.accBeta1.assign(lt(this.accBeta1,this.beta1)),this.accBeta2.assign(lt(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&Te(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedSecondMoment!=null&&Te(this.accumulatedSecondMoment.map(t=>t.variable))}async getWeights(){const t=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(t.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(t){t=await this.extractIterations(t),Dt(()=>{this.accBeta1.assign(ea(this.beta1,this.iterations_+1)),this.accBeta2.assign(ea(this.beta2,this.iterations_+1))});const n=t.length/2,s=!1;this.accumulatedFirstMoment=t.slice(0,n).map(r=>({originalName:r.name,variable:r.tensor.variable(s)})),this.accumulatedSecondMoment=t.slice(n,n*2).map(r=>({originalName:r.name,variable:r.tensor.variable(s)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(t,n){return new t(n.learningRate,n.beta1,n.beta2,n.epsilon)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class gI extends qs{static get className(){return"Adamax"}constructor(t,n,s,r=null,a=0){super(),this.learningRate=t,this.beta1=n,this.beta2=s,this.epsilon=r,this.decay=a,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],Dt(()=>{this.iteration=At(0).variable(),this.accBeta1=At(n).variable()}),r==null&&(this.epsilon=O.backend.epsilon())}applyGradients(t){const n=Array.isArray(t)?t.map(s=>s.name):Object.keys(t);Dt(()=>{const s=Tt(1,this.accBeta1),r=Wt(-this.learningRate,vt(lt(this.iteration,this.decay),1));n.forEach((a,o)=>{const i=O.registeredVariables[a],l=!1;this.accumulatedFirstMoment[o]==null&&(this.accumulatedFirstMoment[o]={originalName:`${a}/m`,variable:Ve(i).variable(l)}),this.accumulatedWeightedInfNorm[o]==null&&(this.accumulatedWeightedInfNorm[o]={originalName:`${a}/v`,variable:Ve(i).variable(l)});const c=Array.isArray(t)?t[o].tensor:t[a];if(c==null)return;const u=this.accumulatedFirstMoment[o].variable,f=this.accumulatedWeightedInfNorm[o].variable,h=vt(lt(u,this.beta1),lt(c,1-this.beta1)),d=lt(f,this.beta2),p=Pe(c),y=Pp(d,p);u.assign(h),f.assign(y);const g=vt(lt(Wt(r,s),Wt(h,vt(y,this.epsilon))),i);i.assign(g)}),this.iteration.assign(vt(this.iteration,1)),this.accBeta1.assign(lt(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&Te(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedWeightedInfNorm!=null&&Te(this.accumulatedWeightedInfNorm.map(t=>t.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(t){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(t,n){return new t(n.learningRate,n.beta1,n.beta2,n.epsilon,n.decay)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class nm extends qs{static get className(){return"SGD"}constructor(t){super(),this.learningRate=t,this.setLearningRate(t)}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,r)=>{const a=Array.isArray(t)?t[r].tensor:t[s];if(a==null)return;const o=O.registeredVariables[s];Dt(()=>{const i=vt(lt(this.c,a),o);o.assign(i)})}),this.incrementIterations()}setLearningRate(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=dn(At(-t))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(t){if(t=await this.extractIterations(t),t.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(t,n){return new t(n.learningRate)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class yI extends nm{static get className(){return"Momentum"}constructor(t,n,s=!1){super(t),this.learningRate=t,this.momentum=n,this.useNesterov=s,this.accumulations=[],this.m=At(this.momentum)}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,r)=>{const a=O.registeredVariables[s];this.accumulations[r]==null&&(this.accumulations[r]={originalName:`${s}/momentum`,variable:Dt(()=>Ve(a).variable(!1))});const o=this.accumulations[r].variable,i=Array.isArray(t)?t[r].tensor:t[s];i!=null&&Dt(()=>{let l;const c=vt(lt(this.m,o),i);this.useNesterov?l=vt(lt(this.c,vt(i,lt(c,this.m))),a):l=vt(lt(this.c,c),a),o.assign(c),a.assign(l)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&Te(this.accumulations.map(t=>t.variable))}setMomentum(t){this.momentum=t}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);const n=!1;this.accumulations=t.map(s=>({originalName:s.name,variable:s.tensor.variable(n)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(t,n){return new t(n.learningRate,n.momentum,n.useNesterov)}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class bI extends qs{static get className(){return"RMSProp"}constructor(t,n=.9,s=0,r=null,a=!1){if(super(),this.learningRate=t,this.decay=n,this.momentum=s,this.epsilon=r,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=a,r==null&&(this.epsilon=O.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(t){(Array.isArray(t)?t.map(s=>s.name):Object.keys(t)).forEach((s,r)=>{const a=O.registeredVariables[s],o=!1;this.accumulatedMeanSquares[r]==null&&(this.accumulatedMeanSquares[r]={originalName:`${s}/rms`,variable:Dt(()=>Ve(a).variable(o))}),this.accumulatedMoments[r]==null&&(this.accumulatedMoments[r]={originalName:`${s}/momentum`,variable:Dt(()=>Ve(a).variable(o))}),this.accumulatedMeanGrads[r]==null&&this.centered&&(this.accumulatedMeanGrads[r]={originalName:`${s}/mg`,variable:Dt(()=>Ve(a).variable(o))});const i=Array.isArray(t)?t[r].tensor:t[s];if(i==null)return;const l=this.accumulatedMeanSquares[r].variable,c=this.accumulatedMoments[r].variable;Dt(()=>{const u=vt(lt(l,this.decay),lt(Je(i),1-this.decay));if(this.centered){const f=this.accumulatedMeanGrads[r].variable,h=vt(lt(f,this.decay),lt(i,1-this.decay)),d=Wt(lt(i,this.learningRate),Ln(Tt(u,vt(Je(h),this.epsilon)))),p=vt(lt(c,this.momentum),d);l.assign(u),f.assign(h),c.assign(p);const y=Tt(a,p);a.assign(y)}else{const f=vt(lt(l,this.decay),lt(Je(i),1-this.decay)),h=vt(lt(c,this.momentum),Wt(lt(i,this.learningRate),Ln(vt(f,this.epsilon))));l.assign(f),c.assign(h);const d=Tt(a,h);a.assign(d)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&Te(this.accumulatedMeanSquares.map(t=>t.variable)),this.accumulatedMeanGrads!=null&&this.centered&&Te(this.accumulatedMeanGrads.map(t=>t.variable)),this.accumulatedMoments!=null&&Te(this.accumulatedMoments.map(t=>t.variable))}async getWeights(){const t=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&t.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(t.map(n=>({name:n.originalName,tensor:n.variable})))}async setWeights(t){t=await this.extractIterations(t);const n=this.centered?t.length/3:t.length/2,s=!1;this.accumulatedMeanSquares=t.slice(0,n).map(r=>({originalName:r.name,variable:r.tensor.variable(s)})),this.accumulatedMoments=t.slice(n,n*2).map(r=>({originalName:r.name,variable:r.tensor.variable(s)})),this.centered&&(this.accumulatedMeanGrads=t.slice(n*2,n*3).map(r=>({originalName:r.name,variable:r.tensor.variable(s)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(t,n){return new t(n.learningRate,n.decay,n.momentum,n.epsilon,n.centered)}}/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wI=[dI,pI,mI,gI,yI,bI,nm];function kI(){for(const e of wI)hI(e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vI="model",SI=".json",xI=".weights.bin";function Gu(e){return new Promise(t=>setTimeout(t)).then(e)}class Ms{constructor(t){if(!$t().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(Ms.URL_SCHEME)&&(t=t.slice(Ms.URL_SCHEME.length)),(t==null||t.length===0)&&(t=vI),this.modelJsonFileName=t+SI,this.weightDataFileName=t+xI}async save(t){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");const n=nn.join(t.weightData),s=window.URL.createObjectURL(new Blob([n],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{const r=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],a=rp(t,r),o=window.URL.createObjectURL(new Blob([JSON.stringify(a)],{type:"application/json"})),i=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(i.download=this.modelJsonFileName,i.href=o,await Gu(()=>i.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){const l=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;l.download=this.weightDataFileName,l.href=s,await Gu(()=>l.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:da(t)}}}}Ms.URL_SCHEME="downloads://";class NI{constructor(t){if(t==null||t.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${t}`);this.jsonFile=t[0],this.weightsFiles=t.slice(1)}async load(){return new Promise((t,n)=>{const s=new FileReader;s.onload=r=>{const a=JSON.parse(r.target.result),o=a.modelTopology;if(o==null){n(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(a.weightsManifest==null){n(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){t({modelTopology:o});return}const l=$c(a,c=>this.loadWeights(c));t(l)},s.onerror=r=>n(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),s.readAsText(this.jsonFile)})}loadWeights(t){const n=[],s=[];for(const o of t)n.push(...o.weights),s.push(...o.paths);const r=this.checkManifestAndWeightFiles(t),a=s.map(o=>this.loadWeightsFile(o,r[o]));return Promise.all(a).then(o=>[n,o])}loadWeightsFile(t,n){return new Promise((s,r)=>{const a=new FileReader;a.onload=o=>{const i=o.target.result;s(i)},a.onerror=o=>r(`Failed to weights data from file of path '${t}'.`),a.readAsArrayBuffer(n)})}checkManifestAndWeightFiles(t){const n=[],s=this.weightsFiles.map(a=>Pu(a.name)),r={};for(const a of t)a.paths.forEach(o=>{const i=Pu(o);if(n.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(n.push(i),s.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);r[o]=this.weightsFiles[s.indexOf(i)]});if(n.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${n.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return r}}const II=e=>$t().getBool("IS_BROWSER")&&!Array.isArray(e)&&e.startsWith(Ms.URL_SCHEME)?TI(e.slice(Ms.URL_SCHEME.length)):null;Gt.registerSaveRouter(II);function TI(e="model"){return new Ms(e)}function $I(e){return new NI(e)}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ku(e,t,n,s){o(e),n=n??0,s=s??1,i(n,s);let r=0;const a=l=>(l.then(c=>{const u=n+ ++r/e.length*(s-n);return t(u),c}),l);function o(l){T(l!=null&&Array.isArray(l)&&l.length>0,()=>"promises must be a none empty array")}function i(l,c){T(l>=0&&l<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${l}`),T(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${c}`),T(c>=l,()=>`startFraction must be no more than endFraction, but got startFraction ${l} and endFraction ${c}`)}return Promise.all(e.map(a))}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */async function sm(e,t){t==null&&(t={});const n=t.fetchFunc==null?$t().platform.fetch:t.fetchFunc,s=e.map(f=>n(f,t.requestInit,{isBinary:!0})),i=(t.onProgress==null?await Promise.all(s):await Ku(s,t.onProgress,0,.5)).map(f=>f.arrayBuffer());return t.onProgress==null?await Promise.all(i):await Ku(i,t.onProgress,.5,1)}function _I(e,t){var n;const s=t.fetchFunc==null?$t().platform.fetch:t.fetchFunc;let r=0,a;return(n=t.onProgress)===null||n===void 0||n.call(t,0),new ReadableStream({pull:async o=>{for(var i;r<e.length;){a||(a=(await s(e[r],t.requestInit,{isBinary:!0})).body.getReader());const{done:l,value:c}=await a.read();if(l){r++,a=void 0,(i=t.onProgress)===null||i===void 0||i.call(t,r/e.length);continue}o.enqueue(c);return}o.close()}})}async function EI(e,t="",n,s){return rm(o=>sm(o,{requestInit:s}))(e,t,n)}function rm(e){return async(t,n="",s)=>{const r=t.map(()=>!1),a={},o=s!=null?s.map(()=>!1):[],i=[];if(t.forEach((d,p)=>{let y=0;d.weights.forEach(g=>{const m="quantization"in g?g.quantization.dtype:g.dtype,w=Ds[m]*nt(g.shape),S=()=>{r[p]=!0,a[p]==null&&(a[p]=[]),a[p].push({manifestEntry:g,groupOffset:y,sizeBytes:w})};s!=null?s.forEach((k,I)=>{k===g.name&&(S(),o[I]=!0)}):S(),i.push(g.name),y+=w})}),!o.every(d=>d)){const d=s.filter((p,y)=>!o[y]);throw new Error(`Could not find weights in manifest with names: ${d.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}const l=r.reduce((d,p,y)=>(p&&d.push(y),d),[]),c=[];l.forEach(d=>{t[d].paths.forEach(p=>{const y=n+(n.endsWith("/")?"":"/")+p;c.push(y)})});const u=await e(c),f={};let h=0;return l.forEach(d=>{const p=t[d].paths.length,y=new nn(u.slice(h,h+p));a[d].forEach(m=>{const w=y.slice(m.groupOffset,m.groupOffset+m.sizeBytes),S=ep(w,[m.manifestEntry]);for(const k in S)f[k]=S[k]}),h+=p}),f}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CI="application/octet-stream",AI="application/json";class Uc{constructor(t,n){if(this.DEFAULT_METHOD="POST",n==null&&(n={}),this.weightPathPrefix=n.weightPathPrefix,this.weightUrlConverter=n.weightUrlConverter,n.fetchFunc!=null?(T(typeof n.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=n.fetchFunc):this.fetch=$t().platform.fetch,T(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&T(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,n.requestInit!=null&&n.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=n.requestInit||{},this.loadOptions=n}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");const n=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);n.body=new FormData;const s=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],r=rp(t,s);if(n.body.append("model.json",new Blob([JSON.stringify(r)],{type:AI}),"model.json"),t.weightData!=null){const o=nn.join(t.weightData);n.body.append("model.weights.bin",new Blob([o],{type:CI}),"model.weights.bin")}const a=await this.fetch(this.path,n);if(a.ok)return{modelArtifactsInfo:da(t),responses:[a]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${a.status}.`)}async loadModelJSON(){const t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let n;try{n=await t.json()}catch{let o=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?o+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":o+=" Please make sure the server is serving valid JSON for this request.",new Error(o)}const s=n.modelTopology,r=n.weightsManifest;if(s==null&&r==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return n}async load(){if(this.loadOptions.streamWeights)return this.loadStream();const t=await this.loadModelJSON();return $c(t,n=>this.loadWeights(n))}async loadStream(){const t=await this.loadModelJSON(),n=await this.getWeightUrls(t.weightsManifest),s=Di(t.weightsManifest),r=()=>_I(n,this.loadOptions);return Object.assign(Object.assign({},t),{weightSpecs:s,getWeightStream:r})}async getWeightUrls(t){const n=Array.isArray(this.path)?this.path[1]:this.path,[s,r]=DI(n),a=this.weightPathPrefix||s,o=[],i=[];for(const l of t)for(const c of l.paths)this.weightUrlConverter!=null?i.push(this.weightUrlConverter(c)):o.push(a+c+r);return this.weightUrlConverter&&o.push(...await Promise.all(i)),o}async loadWeights(t){const n=await this.getWeightUrls(t),s=Di(t),r=await sm(n,this.loadOptions);return[s,r]}}Uc.URL_SCHEME_REGEX=/^https?:\/\//;function DI(e){const t=e.lastIndexOf("/"),n=e.lastIndexOf("?"),s=e.substring(0,t),r=n>t?e.substring(n):"";return[s+"/",r]}function Bi(e){return e.match(Uc.URL_SCHEME_REGEX)!=null}const am=(e,t)=>{if(typeof fetch>"u"&&(t==null||t.fetchFunc==null))return null;{let n=!0;if(Array.isArray(e)?n=e.every(s=>Bi(s)):n=Bi(e),n)return jc(e,t)}return null};Gt.registerSaveRouter(am);Gt.registerLoadRouter(am);function jc(e,t){return new Uc(e,t)}function OI(e,t){return jc(e,t)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class oi{constructor(t){this.modelArtifacts=t}load(){return this.modelArtifacts}}class om{constructor(t){this.saveHandler=t}save(t){return this.saveHandler(t)}}class FI{constructor(t){t.load&&(this.load=()=>Promise.resolve(t.load())),t.save&&(this.save=n=>Promise.resolve(t.save(n)))}}function RI(e,t,n,s){const r=arguments;return new FI(im(...r))}function im(e,t,n,s){return arguments.length===1?e.modelTopology!=null||e.weightSpecs!=null?new oi(e):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new oi({modelTopology:e})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new oi({modelTopology:e,weightSpecs:t,weightData:n,trainingConfig:s}))}function PI(e){return new om(e)}function MI(e){return new om(e)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lm=Object.freeze(Object.defineProperty({__proto__:null,CompositeArrayBuffer:nn,browserFiles:$I,browserHTTPRequest:OI,concatenateArrayBuffers:Cb,copyModel:Jb,decodeWeights:ep,decodeWeightsStream:sp,encodeWeights:Nb,fromMemory:RI,fromMemorySync:im,getLoadHandlers:Vb,getModelArtifactsForJSON:$c,getModelArtifactsForJSONSync:ap,getModelArtifactsInfoForJSON:da,getSaveHandlers:Mb,getWeightSpecs:Di,http:jc,isHTTPScheme:Bi,listModels:Yb,loadWeights:EI,moveModel:Qb,registerLoadRouter:Pb,registerSaveRouter:Rb,removeModel:Zb,weightsLoaderFactory:rm,withSaveHandler:PI,withSaveHandlerSync:MI},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */let gs;function VI(e,t=3){if(t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(e==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let n=!1,s=!1,r=!1,a=!1,o=!1,i=!1;if(e.data instanceof Uint8Array)n=!0;else if(typeof ImageData<"u"&&e instanceof ImageData)s=!0;else if(typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement)r=!0;else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement)a=!0;else if(e.getContext!=null)o=!0;else if(typeof ImageBitmap<"u"&&e instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${e.constructor.name}`);if(Ti(xu,O.backendName)!=null){const p={pixels:e},y={numChannels:t};return O.runKernel(xu,p,y)}const[c,u]=r?[e.videoWidth,e.videoHeight]:[e.width,e.height];let f;if(o)f=e.getContext("2d").getImageData(0,0,c,u).data;else if(s||n)f=e.data;else if(a||r||i){if(gs==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")gs=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else gs=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});gs.canvas.width=c,gs.canvas.height=u,gs.drawImage(e,0,0,c,u),f=gs.getImageData(0,0,c,u).data}let h;if(t===4)h=new Int32Array(f);else{const p=c*u;h=new Int32Array(p*t);for(let y=0;y<p;y++)for(let g=0;g<t;++g)h[y*t+g]=f[y*4+g]}return qp(h,[u,c,t],"int32")}const LI=A({fromPixels_:VI});function zI(e,t){const n=e.shape.length,s=t.shape.length;if(n<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${n}.`);if(s<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${s}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[s-1]>n)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[s-1]} vs. ${n}`);if(nt(e.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${e.shape}.`);const r=t.shape,a=r[r.length-1];let o=1;for(let f=0;f<r.length-1;++f)o*=r[f];const i=e.shape,l=r.slice();l.pop();let c=1;for(let f=a;f<n;++f)c*=i[f],l.push(i[f]);const u=[...yt(e.shape).map(f=>f/c),1].slice(0,a);return[l,o,c,u]}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Wi=-2,BI=-1;function WI(e,t,n){const s=e.shape.length;T(s===t.length,()=>`Error in slice${s}D: Length of begin ${t} must match the rank of the array (${s}).`),T(s===n.length,()=>`Error in slice${s}D: Length of size ${n} must match the rank of the array (${s}).`);for(let r=0;r<s;++r)T(t[r]+n[r]<=e.shape[r],()=>`Error in slice${s}D: begin[${r}] + size[${r}] (${t[r]+n[r]}) would overflow input.shape[${r}] (${e.shape[r]})`)}function HI(e,t,n){const s=[];for(let r=0;r<e.length;r++)s[r]=Math.ceil((t[r]-e[r])/n[r]);return s}function UI(e,t,n){let s=n.length;for(let r=0;r<n.length;r++)if(n[r]>1){s=r;break}for(let r=s+1;r<n.length;r++)if(t[r]>0||n[r]!==e[r])return!1;return!0}function jI(e,t){let n=e.length>0?e[e.length-1]:1;for(let s=0;s<e.length-1;s++)n+=e[s]*t[s];return n}function qI(e,t,n){let s;const r=e.shape.length;typeof t=="number"?s=[t,...new Array(r-1).fill(0)]:t.length<r?s=t.concat(new Array(r-t.length).fill(0)):s=t.slice(),s.forEach(o=>{T(o!==-1,()=>"slice() does not support negative begin indexing.")});let a;return n==null?a=new Array(r).fill(-1):typeof n=="number"?a=[n,...new Array(r-1).fill(-1)]:n.length<r?a=n.concat(new Array(r-n.length).fill(-1)):a=n,a=a.map((o,i)=>o>=0?o:(T(o===-1,()=>`Negative size values should be exactly -1 but got ${o} for the slice() size at index ${i}.`),e.shape[i]-s[i])),[s,a]}function GI(e,t,n,s,r,a,o,i,l){let c;if(s==null?(c=new Array(t.length),c.fill(1)):c=s,o!=null&&(o&o-1)!==0)throw new Error("Multiple ellipses in slice is not allowed.");let u=!1;const f={dims:c.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:n.slice(),strides:c.slice(),beginMask:r,endMask:a,ellipsisMask:o,newAxisMask:i,shrinkAxisMask:l};for(let S=0;S<f.dims;S++)u&&(1<<S&i)!==0&&f.numAddAxisAfterEllipsis++,1<<S&o&&(u=!0);u||(f.ellipsisMask|=1<<f.dims,f.dims++);const h={dims:e.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};KI(f,h);let d=!0,p=!0,y=!0;const g=[],m=[];for(let S=0;S<e.length;++S){if(h.strides[S]===0)throw Error(`strides[${S}] must be non-zero`);const k=!!(h.shrinkAxisMask&1<<S),I=e[S];if(I===-1){g.push(k?1:-1);continue}const $=[h.beginMask&1<<S,h.endMask&1<<S],E=[h.strides[S]>0?0:-1,h.strides[S]>0?I:I-1];if(k&&h.strides[S]<=0)throw Error("only stride 1 allowed on non-range indexing.");y=y&&h.strides[S]===1;const D=!!(h.beginMask&1<<S&&h.endMask&1<<S);if(h.beginValid&&h.endValid){if(k){const R=h.begin[S]<0?I+h.begin[S]:h.begin[S];if(h.begin[S]=R,h.end[S]=h.begin[S]+1,R<0||R>=I)throw Error(`slice index ${h.begin[S]} of dimension ${S} out of bounds.`)}else h.begin[S]=Xu(h.begin[S],0,h.strides[S],I,$,E),h.end[S]=Xu(h.end[S],1,h.strides[S],I,$,E);const v=h.strides[S]===1&&h.begin[S]===0&&h.end[S]===I;d=d&&v,p=p&&(S===0&&h.strides[S]===1||v)}else d=d&&h.strides[S]===1&&D,p=p&&(S===0&&h.strides[S]===1||D);let _,x=!1;if(h.beginValid&&h.endValid?(_=h.end[S]-h.begin[S],x=!0):k?(_=1,x=!0):D&&I>=0&&(h.strides[S]<0?_=-I:_=I,x=!0),x){let v;_===0||_<0!=h.strides[S]<0?v=0:v=Math.trunc(_/h.strides[S])+(_%h.strides[S]!==0?1:0),g.push(v)}else g.push(-1)}for(let S=0;S<h.finalShapeGatherIndices.length;++S){const k=h.finalShapeGatherIndices[S];k>=0?m.push(g[k]):k===Wi&&m.push(1)}return{finalShapeSparse:m.filter((S,k)=>h.finalShapeGatherIndices[k]!==Wi),finalShape:m,isIdentity:d,sliceDim0:p,isSimpleSlice:y,begin:h.begin,end:h.end,strides:h.strides}}function KI(e,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let n=0;t.beginValid=e.begin!=null,t.endValid=e.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let s=0;s<e.dims;s++)if(1<<s&e.ellipsisMask){const r=Math.min(t.dims-(e.dims-s)+1+e.numAddAxisAfterEllipsis,t.dims);for(;n<r;n++)t.begin[n]=0,t.end[n]=0,t.strides[n]=1,t.beginMask|=1<<n,t.endMask|=1<<n,t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[n]=s}else if(1<<s&e.newAxisMask)t.finalShapeGatherIndices.push(Wi),t.finalShapeGatherIndicesSparse.push(-1);else{if(n===t.begin.length)throw Error(`Index out of range using input dim ${n}; input has only ${t.dims} dims, ${t.begin.length}.`);e.begin!=null&&(t.begin[n]=e.begin[s]),e.end!=null&&(t.end[n]=e.end[s]),t.strides[n]=e.strides[s],e.beginMask&1<<s&&(t.beginMask|=1<<n),e.endMask&1<<s&&(t.endMask|=1<<n),e.shrinkAxisMask&1<<s?(t.finalShapeGatherIndices.push(BI),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<n):(t.finalShapeGatherIndices.push(n),t.finalShapeGatherIndicesSparse.push(s)),t.inputShapeGatherIndicesSparse[n]=s,n++}}function Xu(e,t,n,s,r,a){if(r[t])return n>0?a[t]:a[t+1&1];{const o=e<0?s+e:e;return o<a[0]?a[0]:o>a[1]?a[1]:o}}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function XI(e,t){const n=e[0].length;e.forEach((r,a)=>{T(r.length===n,()=>`Error in concat${n}D: rank of tensors[${a}] must be the same as the rank of the rest (${n})`)}),T(t>=0&&t<n,()=>`Error in concat${n}D: axis must be between 0 and ${n-1}.`);const s=e[0];e.forEach((r,a)=>{for(let o=0;o<n;o++)T(o===t||r[o]===s[o],()=>`Error in concat${n}D: Shape of tensors[${a}] (${r}) does not match the shape of the rest (${s}) along the non-concatenated axis ${a}.`)})}function ii(e,t){const n=e[0].slice();for(let s=1;s<e.length;s++)n[t]+=e[s][t];return n}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var fn;(function(e){e[e.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",e[e.VALUE_ROWIDS=1]="VALUE_ROWIDS",e[e.ROW_LENGTHS=2]="ROW_LENGTHS",e[e.ROW_SPLITS=3]="ROW_SPLITS",e[e.ROW_LIMITS=4]="ROW_LIMITS",e[e.ROW_STARTS=5]="ROW_STARTS"})(fn||(fn={}));function YI(e,t,n){let s=new Array;if(n==null&&t==null)return s;if(t==null)for(;s.length<e+n.length;)s.push(-1);else s=t.slice();if(n==null)return s;if(e+n.length!==s.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${e+n.length}, but shape.rank = ${s.length}`);for(let r=1;r<n.length;++r){const a=n[r],o=s[s.length-n.length+r],i=s[o];if(a>=0)if(i>=0){if(i!==a)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${r+e}] = ${a} but shape[${r+e}] = ${i}`)}else s[o]=a}return s}function ZI(e){const t={FIRST_DIM_SIZE:fn.FIRST_DIM_SIZE,VALUE_ROWIDS:fn.VALUE_ROWIDS,ROW_LENGTHS:fn.ROW_LENGTHS,ROW_SPLITS:fn.ROW_SPLITS,ROW_LIMITS:fn.ROW_LIMITS,ROW_STARTS:fn.ROW_STARTS},n=[];for(const s of e)if(s in t)n.push(t[s]);else break;return n}function JI(e){return e.length===0?0:e[0]===fn.FIRST_DIM_SIZE?e.length-1:e.length}function QI(e,t){if(e==null||t==null)return;const n=e.length,s=t.length;if(n>=s)throw new Error(`defaultValue.shape=${e} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${n} must be less than ragged tensor input flatValues.rank = ${s})`);for(let r=0;r<Math.min(n,s-1);++r){const a=e[r],o=t[r+1];if(a>=0&&o>=0&&a!==1&&a!==o)throw new Error(`defaultValue.shape=${e}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${r-e.length}] = ${a} but ragged tensor input.flatValues.shape[${r-e.length}] = ${o}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tT(e,t,n){const s=n*(typeof e=="number"?e:e[0]),r=t*(typeof e=="number"?e:e[1]);return[s,r]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cm(e,t,n,s=!0){let r=[];if(s)r=r.concat(t.slice(0)),r.push(e[0]/n),r=r.concat(e.slice(1));else{r=r.concat(e[0]);const a=t.length;for(let o=0;o<a;++o)r=r.concat([e[o+1]/t[o],t[o]]);r=r.concat(e.slice(a+1))}return r}function um(e,t,n=!0){const s=[];if(n){s.push(t);for(let r=t+1;r<e;++r)r<=2*t?(s.push(r),s.push(r-(t+1))):s.push(r)}else{const r=[],a=[];for(let o=1;o<e;++o)o>=t*2+1||o%2===1?a.push(o):r.push(o);s.push(...r),s.push(0),s.push(...a)}return s}function fm(e,t,n,s=!0){const r=[];s?r.push(e[0]/n):r.push(e[0]*n);for(let a=1;a<e.length;++a)a<=t.length?s?r.push(t[a-1]*e[a]):r.push(e[a]/t[a-1]):r.push(e[a]);return r}function eT(e,t){const n=[0];for(let s=0;s<t;++s)n.push(e[s][0]);return n}function nT(e,t,n){const s=e.slice(0,1);for(let r=0;r<n;++r)s.push(e[r+1]-t[r][0]-t[r][1]);return s}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const sT=1.7580993408473768,rT=1.0507009873554805;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const aT=.3275911,oT=.254829592,iT=-.284496736,lT=1.421413741,cT=-1.453152027,uT=1.061405429;/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pr(e,t){if(e.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${e.length}, imag: ${t.length}.`);const n=new Float32Array(e.length*2);for(let s=0;s<n.length;s+=2)n[s]=e[s/2],n[s+1]=t[s/2];return n}function fT(e){const t=new Float32Array(e.length/2),n=new Float32Array(e.length/2);for(let s=0;s<e.length;s+=2)t[s/2]=e[s],n[s/2]=e[s+1];return{real:t,imag:n}}function hT(e){const t=Math.ceil(e.length/4),n=new Float32Array(t),s=new Float32Array(t);for(let r=0;r<e.length;r+=4)n[Math.floor(r/4)]=e[r],s[Math.floor(r/4)]=e[r+1];return{real:n,imag:s}}function dT(e){const t=Math.floor(e.length/4),n=new Float32Array(t),s=new Float32Array(t);for(let r=2;r<e.length;r+=4)n[Math.floor(r/4)]=e[r],s[Math.floor(r/4)]=e[r+1];return{real:n,imag:s}}function hm(e,t){const n=e[t*2],s=e[t*2+1];return{real:n,imag:s}}function pT(e,t,n,s){e[s*2]=t,e[s*2+1]=n}function mT(e,t){const n=new Float32Array(e/2),s=new Float32Array(e/2);for(let r=0;r<Math.ceil(e/2);r++){const a=(t?2:-2)*Math.PI*(r/e);n[r]=Math.cos(a),s[r]=Math.sin(a)}return{real:n,imag:s}}function gT(e,t,n){const s=(n?2:-2)*Math.PI*(e/t),r=Math.cos(s),a=Math.sin(s);return{real:r,imag:a}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const li="->",yT=/->/g,Yu=",",Zu="...";function bT(e,t){e=e.replace(/\s/g,"");const n=(e.length-e.replace(yT,"").length)/li.length;if(n<1)throw new Error("Equations without an arrow are not supported.");if(n>1)throw new Error(`Equation must contain exactly one arrow ("${li}").`);const[s,r]=e.split(li);T(s.indexOf(Zu)===-1,()=>`The ellipsis notation ("${Zu}") is not supported yet.`);const a=s.split(Yu),o=a.length;if(t!==o)throw new Error(`Expected ${o} input tensors, received ${t}`);if(o>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");const i=[];for(let h=0;h<r.length;++h){const d=r[h];if(!a.some(p=>p.indexOf(d)!==-1))throw new Error(`Output subscripts contain the label ${d} not present in the input subscripts.`);i.indexOf(d)===-1&&i.push(d)}for(let h=0;h<s.length;++h){const d=s[h];i.indexOf(d)===-1&&d!==Yu&&i.push(d)}const l=new Array(a.length);for(let h=0;h<o;++h){if(new Set(a[h].split("")).size!==a[h].length)throw new Error(`Found duplicate axes in input component ${a[h]}. Support for duplicate axes in input is not implemented yet.`);l[h]=[];for(let d=0;d<a[h].length;++d)l[h].push(i.indexOf(a[h][d]))}const c=i.length,u=r.length,f=[];for(let h=u;h<c;++h)f.push(h);return{allDims:i,summedDims:f,idDims:l}}function wT(e,t){let n=new Array(e);n.fill(-1);for(let r=0;r<t.length;++r)n[t[r]]=r;const s=[];for(let r=0;r<e;++r)n[r]===-1&&s.push(r);return n=n.filter(r=>r!==-1),{permutationIndices:n,expandDims:s}}function kT(e,t,n){const s=new Array(e);for(let r=0;r<n.length;++r){const a=n[r].shape;for(let o=0;o<t[r].length;++o)s[t[r][o]]===void 0?s[t[r][o]]=a[o]:T(s[t[r][o]]===a[o],()=>`Expected dimension ${s[t[r][o]]} at axis ${o} of input shaped ${JSON.stringify(a)}, but got dimension ${a[o]}`)}}function vT(e,t){const n=e,s=[];let r=0;e.length===0&&n.push(-1),r=e.length+1;for(let o=0;o<r;++o)s.push([]);const a=[];for(let o=0;o<n.length;++o){const i=n[o],l=xT(t,i);for(const c of l)a.indexOf(c)===-1&&(s[o].push(c),a.push(c))}return{path:n,steps:s}}function ST(e){return e.every((t,n)=>t===n)}function xT(e,t){const n=[];for(let s=0;s<e.length;++s)(e[s].length===0||e[s].indexOf(t)!==-1||t===-1)&&n.push(s);return n}function NT(e,t,n=0){let s=[];if(typeof t=="number")T(e.shape[n]%t===0,()=>"Number of splits must evenly divide the axis."),s=new Array(t).fill(e.shape[n]/t);else{const r=t.reduce((o,i)=>(i===-1&&(o+=1),o),0);T(r<=1,()=>"There should be only one negative value in split array.");const a=t.indexOf(-1);if(a!==-1){const o=t.reduce((i,l)=>l>0?i+l:i);t[a]=e.shape[n]-o}T(e.shape[n]===t.reduce((o,i)=>o+i),()=>"The sum of sizes must match the size of the axis dimension."),s=t}return s}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function IT(e){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${e}`}function TT(e,t){return`indices(${e}, 0) is invalid: ${t} < 0`}function $T(e,t,n){return`indices(${e}, 0) is invalid: ${t} >= ${n}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _T(e,t){return`only one output dimension may be -1, not both ${e} and ${t}`}function ET(e,t){return`size ${e} must be non-negative, not ${t}`}function CT(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function AT(e,t){const n=nt(e),s=nt(t);return`Input to reshape is a SparseTensor with ${n}
  dense values, but the requested shape requires a multiple of ${s}. inputShape=${e} outputShape= ${t}`}function DT(e,t){const n=nt(e),s=nt(t);return`Input to reshape is a tensor with ${n} dense values, but the requested shape has ${s}. inputShape=${e} outputShape=${t}`}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ju(){return"segment ids must be >= 0"}function OT(){return"segment ids are not increasing"}function FT(e,t){return`Segment id ${e} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function RT(e,t,n){return`Bad: indices[${e}] == ${t} out of range [0, ${n})`}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function PT(e,t,n,s){const r=t.shape.length,a=e.shape.length;if(s!==0&&(s<-r||s>r))throw new Error(`Expect batchDims in the range of [-${r}, ${r}], but got ${s}`);if(s<0&&(s+=r),s>a)throw new Error(`batchDims (${s}) must be less than rank(x) (
    ${a}).`);if(n<s)throw new Error(`batchDims (${s}) must be less than or equal to axis (${n}).`);for(let f=0;f<s;++f)if(e.shape[f]!==t.shape[f])throw new Error(`x.shape[${f}]: ${e.shape[f]} should be equal to indices.shape[${f}]: ${t.shape[f]}.`);const o=e.shape[n],i=[];let l=1,c=1,u=1;for(let f=0;f<s;++f)i.push(e.shape[f]),l*=e.shape[f];for(let f=s;f<n;f++)i.push(e.shape[f]),c*=e.shape[f];for(let f=s;f<r;f++)i.push(t.shape[f]);for(let f=n+1;f<a;f++)i.push(e.shape[f]),u*=e.shape[f];return{batchSize:l,sliceSize:u,outerSize:c,dimSize:o,outputShape:i}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oa(e){try{return e.map(t=>Zr(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function MT(e){return e.map(t=>_s(t))}/**
 * @license
 * Copyright 2017 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */kI();/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const VT=$t();VT.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,e=>{e&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * =============================================================================
 */var Ae;(function(e){e[e.DT_INVALID=0]="DT_INVALID",e[e.DT_FLOAT=1]="DT_FLOAT",e[e.DT_DOUBLE=2]="DT_DOUBLE",e[e.DT_INT32=3]="DT_INT32",e[e.DT_UINT8=4]="DT_UINT8",e[e.DT_INT16=5]="DT_INT16",e[e.DT_INT8=6]="DT_INT8",e[e.DT_STRING=7]="DT_STRING",e[e.DT_COMPLEX64=8]="DT_COMPLEX64",e[e.DT_INT64=9]="DT_INT64",e[e.DT_BOOL=10]="DT_BOOL",e[e.DT_QINT8=11]="DT_QINT8",e[e.DT_QUINT8=12]="DT_QUINT8",e[e.DT_QINT32=13]="DT_QINT32",e[e.DT_BFLOAT16=14]="DT_BFLOAT16",e[e.DT_QINT16=15]="DT_QINT16",e[e.DT_QUINT16=16]="DT_QUINT16",e[e.DT_UINT16=17]="DT_UINT16",e[e.DT_COMPLEX128=18]="DT_COMPLEX128",e[e.DT_HALF=19]="DT_HALF",e[e.DT_RESOURCE=20]="DT_RESOURCE",e[e.DT_VARIANT=21]="DT_VARIANT",e[e.DT_UINT32=22]="DT_UINT32",e[e.DT_UINT64=23]="DT_UINT64",e[e.DT_FLOAT_REF=101]="DT_FLOAT_REF",e[e.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",e[e.DT_INT32_REF=103]="DT_INT32_REF",e[e.DT_UINT8_REF=104]="DT_UINT8_REF",e[e.DT_INT16_REF=105]="DT_INT16_REF",e[e.DT_INT8_REF=106]="DT_INT8_REF",e[e.DT_STRING_REF=107]="DT_STRING_REF",e[e.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",e[e.DT_INT64_REF=109]="DT_INT64_REF",e[e.DT_BOOL_REF=110]="DT_BOOL_REF",e[e.DT_QINT8_REF=111]="DT_QINT8_REF",e[e.DT_QUINT8_REF=112]="DT_QUINT8_REF",e[e.DT_QINT32_REF=113]="DT_QINT32_REF",e[e.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",e[e.DT_QINT16_REF=115]="DT_QINT16_REF",e[e.DT_QUINT16_REF=116]="DT_QUINT16_REF",e[e.DT_UINT16_REF=117]="DT_UINT16_REF",e[e.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",e[e.DT_HALF_REF=119]="DT_HALF_REF",e[e.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",e[e.DT_VARIANT_REF=121]="DT_VARIANT_REF",e[e.DT_UINT32_REF=122]="DT_UINT32_REF",e[e.DT_UINT64_REF=123]="DT_UINT64_REF"})(Ae||(Ae={}));var Qu;(function(e){(function(t){t[t.LEGACY=0]="LEGACY",t[t.V1=1]="V1",t[t.V2=2]="V2"})(e.CheckpointFormatVersion||(e.CheckpointFormatVersion={}))})(Qu||(Qu={}));/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LT={};function dm(e){return LT[e]}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function b(e,t,n,s,r){const a=t.inputParams[e];if(a&&a.inputIndexStart!==void 0){const i=a.inputIndexStart,l=a.inputIndexEnd===0?void 0:a.inputIndexEnd===void 0?i+1:a.inputIndexEnd,c=i<0?t.inputNames.length+i:i;if(a.type==="tensor")return ie(t.inputNames[c],n,s,r);if(a.type==="tensors"){const h=t.inputs.slice(i,l);return t.inputNames.slice(i,l).filter((p,y)=>{var g;return((g=h[y])===null||g===void 0?void 0:g.op)!=="NoOp"}).map(p=>ie(p,n,s,r))}const u=ie(t.inputNames[c],n,s,r),f=u.dataSync();return a.type==="number"?f[0]:qe(u.shape,f)}const o=t.attrParams[e];return o&&o.value}function ie(e,t,n,s){const[r,a]=Oe(e,n);if(s!=null){const i=s.getHashTableHandleByName(r);if(i!=null)return i}const o=n.currentContextIds.find(i=>!!t[eo(r,i)]);return o!==void 0?t[eo(r,o)][a]:void 0}function tf(e,t,n){return t[eo(e,n.currentContextId)]}function Cn(e,t){const[n,s,r]=Oe(e,t);return[eo(n,t&&t.currentContextId),s,r]}function eo(e,t){return t?`${e}-${t}`:e}function Oe(e,t){if(e==="")return["",0,void 0];const n=t!=null&&t.parseNodeNameCache!=null;if(n){const a=t.parseNodeNameCache.get(e);if(a!=null)return a}const s=e.split(":");let r;if(s.length===1)r=[e,0,void 0];else{const a=s[0],o=s.length===3?s[1]:void 0,i=Number(s[s.length-1]);r=[a,i,o]}return n&&t.parseNodeNameCache.set(e,r),r}function za(e,t,n){let s=b("pad",e,t,n);if(s==="explicit"){s=b("explicitPaddings",e,t,n);const r=[[0,0],[0,0],[0,0],[0,0]];for(let a=0;a<4;a++)r[a][0]=s[a*2],r[a][1]=s[a*2+1];return r}return s}function An(e){return e.kept?e:rs(e)}/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const zT=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],BT=Object.freeze(Object.defineProperty({__proto__:null,json:zT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const WT=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsFinite",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsInf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],HT=Object.freeze(Object.defineProperty({__proto__:null,json:WT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const UT=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}],jT=Object.freeze(Object.defineProperty({__proto__:null,json:UT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qT=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}],GT=Object.freeze(Object.defineProperty({__proto__:null,json:qT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const KT=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniformInt",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number"},{tfName:"maxval",name:"maxval",type:"number"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}],XT=Object.freeze(Object.defineProperty({__proto__:null,json:KT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const YT=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}],ZT=Object.freeze(Object.defineProperty({__proto__:null,json:YT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const JT=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}],QT=Object.freeze(Object.defineProperty({__proto__:null,json:JT},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const t2=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}],e2=Object.freeze(Object.defineProperty({__proto__:null,json:t2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const n2=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"InitializeTable",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]},{tfOpName:"InitializeTableV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],s2=Object.freeze(Object.defineProperty({__proto__:null,json:n2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const r2=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}],a2=Object.freeze(Object.defineProperty({__proto__:null,json:r2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const o2=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BitwiseAnd",category:"logical",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}]}],i2=Object.freeze(Object.defineProperty({__proto__:null,json:o2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const l2=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"MatrixBandPart",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"numLower",type:"tensor"},{start:1,name:"numUpper",type:"tensor"}]}],c2=Object.freeze(Object.defineProperty({__proto__:null,json:l2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const u2=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]}],f2=Object.freeze(Object.defineProperty({__proto__:null,json:u2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const h2=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}],d2=Object.freeze(Object.defineProperty({__proto__:null,json:h2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const p2=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]},{tfOpName:"TensorScatterUpdate",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"values",type:"tensor"}]}],m2=Object.freeze(Object.defineProperty({__proto__:null,json:p2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const g2=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}],y2=Object.freeze(Object.defineProperty({__proto__:null,json:g2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const b2=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}],w2=Object.freeze(Object.defineProperty({__proto__:null,json:b2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const k2=[{tfOpName:"StaticRegexReplace",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"pattern",name:"pattern",type:"string"},{tfName:"rewrite",name:"rewrite",type:"string"},{tfName:"replace_global",name:"replaceGlobal",type:"bool"}]},{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}],v2=Object.freeze(Object.defineProperty({__proto__:null,json:k2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2023 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const S2=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"EnsureShape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}],x2=Object.freeze(Object.defineProperty({__proto__:null,json:S2},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class ef{static get Instance(){return this._instance||(this._instance=new this)}constructor(){const t=[BT,HT,jT,GT,XT,ZT,QT,e2,s2,a2,i2,c2,f2,d2,m2,y2,w2,v2,x2],n=[].concat(...t.map(s=>s.json));this.opMappers=n.reduce((s,r)=>(s[r.tfOpName]=r,s),{})}transformGraph(t,n={}){const s=t.node,r=[],a=[],o=[],i=s.reduce((y,g)=>(y[g.name]=this.mapNode(g),g.op.startsWith("Placeholder")?r.push(y[g.name]):g.op==="Const"?a.push(y[g.name]):(g.input==null||g.input.length===0)&&o.push(y[g.name]),y),{});let l=[];const c=[];let u={},f={};n!=null&&(u=this.mapSignatureEntries(n.inputs),f=this.mapSignatureEntries(n.outputs));const h=Object.keys(i);h.forEach(y=>{const g=i[y];g.inputNames.forEach((m,w)=>{const[S,,k]=Cn(m),I=i[S];if(I.outputs!=null){const $=I.outputs.indexOf(k);if($!==-1){const E=`${S}:${$}`;g.inputNames[w]=E}}g.inputs.push(I),I.children.push(g)})}),Object.keys(f).length===0?h.forEach(y=>{const g=i[y];g.children.length===0&&c.push(g)}):Object.keys(f).forEach(y=>{const[g]=Cn(y),m=i[g];m!=null&&(m.signatureKey=f[y],c.push(m))}),Object.keys(u).length>0?Object.keys(u).forEach(y=>{const[g]=Cn(y),m=i[g];m&&(m.signatureKey=u[y],l.push(m))}):l=r;let d={};t.library!=null&&t.library.function!=null&&(d=t.library.function.reduce((y,g)=>(y[g.signature.name]=this.mapFunction(g),y),{}));const p={nodes:i,inputs:l,outputs:c,weights:a,placeholders:r,signature:n,functions:d};return o.length>0&&(p.initNodes=o),p}mapSignatureEntries(t){return Object.keys(t||{}).reduce((n,s)=>(n[t[s].name]=s,n),{})}mapNode(t){const n=dm(t.op)||this.opMappers[t.op]||{};t.attr==null&&(t.attr={});const s={name:t.name,op:t.op,category:n.category,inputNames:(t.input||[]).map(r=>r.startsWith("^")?r.slice(1):r),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:t.attr,outputs:n.outputs};return n.inputs!=null&&(s.inputParams=n.inputs.reduce((r,a)=>(r[a.name]={type:a.type,inputIndexStart:a.start,inputIndexEnd:a.end},r),{})),n.attrs!=null&&(s.attrParams=n.attrs.reduce((r,a)=>{const o=a.type;let i;switch(a.type){case"string":i=Hi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Hi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"string[]":i=Yi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Yi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"number":i=ji(t.attr,a.tfName,a.defaultValue||0),i===void 0&&a.tfDeprecatedName&&(i=ji(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"number[]":i=Xi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Xi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool":i=Ui(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Ui(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"bool[]":i=Ji(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Ji(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape":i=Ki(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Ki(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"shape[]":i=Zi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Zi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype":i=qi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=qi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"dtype[]":i=Gi(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=Gi(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"func":i=nf(t.attr,a.tfName,a.defaultValue),i===void 0&&a.tfDeprecatedName&&(i=nf(t.attr,a.tfDeprecatedName,a.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${a.type} for op: ${t.op}`)}return r[a.name]={value:i,type:o},r},{})),s}mapFunction(t){const n=t.nodeDef,s=[],r=[];let a={};n!=null&&(a=n.reduce((f,h)=>(f[h.name]=this.mapNode(h),h.op==="Const"&&r.push(f[h.name]),f),{}));const o=[],i=[];t.signature.inputArg.forEach(f=>{const[h]=Cn(f.name),d={name:h,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:qc(f.type),type:"dtype"}},children:[]};d.signatureKey=f.name,o.push(d),a[h]=d}),Object.keys(a).forEach(f=>{const h=a[f];h.inputNames.forEach((d,p)=>{const[y,,g]=Cn(d),m=a[y];if(m.outputs!=null){const w=m.outputs.indexOf(g);if(w!==-1){const S=`${y}:${w}`;h.inputNames[p]=S}}h.inputs.push(m),m.children.push(h)})});const c=t.ret;t.signature.outputArg.forEach(f=>{const[h,d]=Cn(c[f.name]),p=a[h];p!=null&&(p.defaultOutput=d,i.push(p))});const u=this.mapArgsToSignature(t);return{nodes:a,inputs:o,outputs:i,weights:r,placeholders:s,signature:u}}mapArgsToSignature(t){return{methodName:t.signature.name,inputs:t.signature.inputArg.reduce((n,s)=>(n[s.name]=this.mapArgToTensorInfo(s),n),{}),outputs:t.signature.outputArg.reduce((n,s)=>(n[s.name]=this.mapArgToTensorInfo(s,t.ret),n),{})}}mapArgToTensorInfo(t,n){let s=t.name;return n!=null&&(s=n[s]),{name:s,dtype:t.type}}}function N2(e){const t=$t().global;if(typeof t.atob<"u")return t.atob(e);if(typeof Buffer<"u")return new Buffer(e,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function pm(e,t){const n=Array.isArray(e)?String.fromCharCode.apply(null,e):N2(e);return t?n:n.toLowerCase()}function Hi(e,t,n,s=!1){const r=e[t];return r!=null?pm(r.s,s):n}function Ui(e,t,n){const s=e[t];return s?s.b:n}function ji(e,t,n){const s=e[t]||{},r=s.i!=null?s.i:s.f!=null?s.f:n;return typeof r=="number"?r:parseInt(r,10)}function qc(e){switch(typeof e=="string"&&(e=Ae[e]),e){case Ae.DT_FLOAT:case Ae.DT_HALF:return"float32";case Ae.DT_INT32:case Ae.DT_INT64:case Ae.DT_INT8:case Ae.DT_UINT8:return"int32";case Ae.DT_BOOL:return"bool";case Ae.DT_DOUBLE:return"float32";case Ae.DT_STRING:return"string";case Ae.DT_COMPLEX64:case Ae.DT_COMPLEX128:return"complex64";default:return null}}function nf(e,t,n){const s=e[t];return s&&s.func?s.func.name:n}function qi(e,t,n){const s=e[t];return s&&s.type?qc(s.type):n}function Gi(e,t,n){const s=e[t];return s&&s.list&&s.list.type?s.list.type.map(r=>qc(r)):n}function mm(e){if(!e.unknownRank)return e.dim!=null?e.dim.map(t=>typeof t.size=="number"?t.size:parseInt(t.size,10)):[]}function Ki(e,t,n){const s=e[t];return s&&s.shape?mm(s.shape):n}function Xi(e,t,n){const s=e[t];return s?((s.list.f&&s.list.f.length?s.list.f:s.list.i)||[]).map(r=>typeof r=="number"?r:parseInt(r,10)):n}function Yi(e,t,n,s=!1){const r=e[t];return r&&r.list&&r.list.s?r.list.s.map(a=>pm(a,s)):n}function Zi(e,t,n){const s=e[t];return s&&s.list&&s.list.shape?s.list.shape.map(r=>mm(r)):n}function Ji(e,t,n){const s=e[t];return s&&s.list&&s.list.b?s.list.b:n}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class I2{constructor(t,n,s){this.node=t,this.tensorMap=n,this.context=s,this.inputs=[],this.attrs={},this.inputs=t.inputNames.map(r=>this.getInput(r)),t.rawAttrs!=null&&(this.attrs=Object.keys(t.rawAttrs).reduce((r,a)=>(r[a]=this.getAttr(a),r),{}))}getInput(t){return ie(t,this.tensorMap,this.context)}getAttr(t,n){const s=this.node.rawAttrs[t];if(s.tensor!=null)return ie(t,this.tensorMap,this.context);if(s.i!=null||s.f!=null)return ji(this.node.rawAttrs,t,n);if(s.s!=null)return Hi(this.node.rawAttrs,t,n);if(s.b!=null)return Ui(this.node.rawAttrs,t,n);if(s.shape!=null)return Ki(this.node.rawAttrs,t,n);if(s.type!=null)return qi(this.node.rawAttrs,t,n);if(s.list!=null){if(s.list.i!=null||s.list.f!=null)return Xi(this.node.rawAttrs,t,n);if(s.list.s!=null)return Yi(this.node.rawAttrs,t,n);if(s.list.shape!=null)return Zi(this.node.rawAttrs,t,n);if(s.list.b!=null)return Ji(this.node.rawAttrs,t,n);if(s.list.type!=null)return Gi(this.node.rawAttrs,t,n)}return n}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ce=Object.freeze(Object.defineProperty({__proto__:null,OP_SCOPE_SUFFIX:tp,abs:Pe,acos:h0,acosh:p0,add:vt,addN:g0,all:b0,any:k0,argMax:S0,argMin:N0,asin:T0,asinh:_0,atan:C0,atan2:D0,atanh:F0,avgPool:gp,avgPool3d:W0,basicLSTMCell:X0,batchNorm:Co,batchNorm2d:t1,batchNorm3d:n1,batchNorm4d:r1,batchToSpaceND:yp,bincount:bp,bitwiseAnd:i1,booleanMaskAsync:ZS,broadcastArgs:c1,broadcastTo:Lr,buffer:Et,cast:Zt,ceil:h1,clipByValue:p1,clone:rs,complex:is,concat:be,concat1d:g1,concat2d:b1,concat3d:k1,concat4d:S1,conv1d:I1,conv2d:Ao,conv2dTranspose:_1,conv3d:C1,conv3dTranspose:F1,cos:P1,cosh:V1,cosineWindow:Vc,cumprod:z1,cumsum:W1,denseBincount:U1,depthToSpace:q1,depthwiseConv2d:Ec,diag:X1,dilation2d:Z1,div:Wt,divNoNan:sw,dot:aw,dropout:ux,einsum:Zs,elu:vp,enclosingPowerOfTwo:Yp,ensureShape:cw,equal:kp,erf:fw,euclideanNorm:vw,exp:Rs,expandDims:En,expm1:Iw,eye:Ip,fft:Fc,fill:pa,floor:Tp,floorDiv:pp,fused:Ix,gather:$p,gatherND:ix,greater:Oo,greaterEqual:_p,ifft:to,imag:Fo,image:rI,inTopKAsync:hx,irfft:Hp,isFinite:Fw,isInf:Pw,isNaN:Vw,leakyRelu:Ep,less:Li,lessEqual:Cc,linalg:aI,linspace:Ww,localResponseNormalization:Uw,log:na,log1p:Cp,logSigmoid:Zw,logSoftmax:tk,logSumExp:Dp,logicalAnd:Za,logicalNot:Op,logicalOr:Fp,logicalXor:ok,losses:oI,lowerBound:lk,matMul:Mt,max:ar,maxPool:Rp,maxPool3d:fk,maxPoolWithArgmax:dk,maximum:Pp,mean:Ja,meshgrid:gk,min:Vi,minimum:Qa,mirrorPad:wk,mod:vk,moments:xk,movingAverage:tx,mul:lt,multiRNNCell:Ik,multinomial:$k,neg:gn,norm:Do,notEqual:Mp,oneHot:Ck,ones:$s,onesLike:Dk,op:A,outerProduct:Fk,pad:ma,pad1d:Mk,pad2d:Lk,pad3d:Bk,pad4d:Hk,pool:Kk,pow:ea,prelu:Lp,print:dp,prod:Zk,raggedGather:Qk,raggedRange:ev,raggedTensorToTensor:sv,rand:av,randomGamma:$v,randomNormal:zp,randomStandardNormal:Cv,randomUniform:Oc,randomUniformInt:Ov,range:sa,real:ra,reciprocal:Pv,relu:Po,relu6:Bp,reshape:X,reverse:Ps,reverse1d:Bv,reverse2d:Hv,reverse3d:jv,reverse4d:Gv,rfft:Rc,round:Wp,rsqrt:Yv,scalar:At,scatterND:nx,searchSorted:Ac,selu:Jv,separableConv2d:tS,setdiff1dAsync:nS,sigmoid:rr,sign:rS,signal:sI,sin:oS,sinh:lS,slice:Bt,slice1d:uS,slice2d:hS,slice3d:pS,slice4d:gS,softmax:bS,softplus:Ap,spaceToBatchND:Vp,sparse:iI,sparseToDense:ax,spectral:nI,split:aa,sqrt:Ln,square:Je,squaredDifference:Up,squeeze:Pc,stack:Bn,step:jp,stridedSlice:ES,string:lI,sub:Tt,sum:qt,tan:AS,tanh:Mi,tensor:mn,tensor1d:Ue,tensor2d:Br,tensor3d:qp,tensor4d:DS,tensor5d:OS,tensor6d:FS,tensorScatterUpdate:MS,tile:zr,topk:LS,transpose:zi,truncatedNormal:BS,unique:HS,unsortedSegmentSum:jS,unstack:js,upperBound:GS,variable:KS,where:as,whereAsync:Xp,zeros:dr,zerosLike:Ve},Symbol.toStringTag,{value:"Module"}));/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const T2=(e,t,n,s=ce)=>{switch(e.op){case"BiasAdd":case"AddV2":case"Add":return[s.add(b("a",e,t,n),b("b",e,t,n))];case"AddN":return[s.addN(b("tensors",e,t,n))];case"FloorMod":case"Mod":return[s.mod(b("a",e,t,n),b("b",e,t,n))];case"Mul":return[s.mul(b("a",e,t,n),b("b",e,t,n))];case"RealDiv":case"Div":return[s.div(b("a",e,t,n),b("b",e,t,n))];case"DivNoNan":return[s.divNoNan(b("a",e,t,n),b("b",e,t,n))];case"FloorDiv":return[s.floorDiv(b("a",e,t,n),b("b",e,t,n))];case"Sub":return[s.sub(b("a",e,t,n),b("b",e,t,n))];case"Minimum":return[s.minimum(b("a",e,t,n),b("b",e,t,n))];case"Maximum":return[s.maximum(b("a",e,t,n),b("b",e,t,n))];case"Pow":return[s.pow(b("a",e,t,n),b("b",e,t,n))];case"SquaredDifference":return[s.squaredDifference(b("a",e,t,n),b("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $2=(e,t,n,s=ce)=>{switch(e.op){case"Abs":case"ComplexAbs":return[s.abs(b("x",e,t,n))];case"Acos":return[s.acos(b("x",e,t,n))];case"Acosh":return[s.acosh(b("x",e,t,n))];case"Asin":return[s.asin(b("x",e,t,n))];case"Asinh":return[s.asinh(b("x",e,t,n))];case"Atan":return[s.atan(b("x",e,t,n))];case"Atan2":return[s.atan2(b("x",e,t,n),b("y",e,t,n))];case"Atanh":return[s.atanh(b("x",e,t,n))];case"Ceil":return[s.ceil(b("x",e,t,n))];case"Complex":return[s.complex(b("real",e,t,n),b("imag",e,t,n))];case"Cos":return[s.cos(b("x",e,t,n))];case"Cosh":return[s.cosh(b("x",e,t,n))];case"Elu":return[s.elu(b("x",e,t,n))];case"Erf":return[s.erf(b("x",e,t,n))];case"Exp":return[s.exp(b("x",e,t,n))];case"Expm1":return[s.expm1(b("x",e,t,n))];case"Floor":return[s.floor(b("x",e,t,n))];case"Log":return[s.log(b("x",e,t,n))];case"Log1p":return[s.log1p(b("x",e,t,n))];case"Imag":return[s.imag(b("x",e,t,n))];case"Neg":return[s.neg(b("x",e,t,n))];case"Reciprocal":return[s.reciprocal(b("x",e,t,n))];case"Real":return[s.real(b("x",e,t,n))];case"Relu":return[s.relu(b("x",e,t,n))];case"Round":return[s.round(b("x",e,t,n))];case"Selu":return[s.selu(b("x",e,t,n))];case"Sigmoid":return[s.sigmoid(b("x",e,t,n))];case"Sin":return[s.sin(b("x",e,t,n))];case"Sign":return[s.sign(b("x",e,t,n))];case"Sinh":return[s.sinh(b("x",e,t,n))];case"Softplus":return[s.softplus(b("x",e,t,n))];case"Sqrt":return[s.sqrt(b("x",e,t,n))];case"Square":return[s.square(b("x",e,t,n))];case"Tanh":return[s.tanh(b("x",e,t,n))];case"Tan":return[s.tan(b("x",e,t,n))];case"ClipByValue":return[s.clipByValue(b("x",e,t,n),b("clipValueMin",e,t,n),b("clipValueMax",e,t,n))];case"Relu6":return[s.relu6(b("x",e,t,n))];case"Rsqrt":return[s.rsqrt(ie(e.inputNames[0],t,n))];case"LeakyRelu":return[s.leakyRelu(b("x",e,t,n),b("alpha",e,t,n))];case"Prelu":return[s.prelu(b("x",e,t,n),b("alpha",e,t,n))];case"IsNan":return[s.isNaN(ie(e.inputNames[0],t,n))];case"IsInf":return[s.isInf(ie(e.inputNames[0],t,n))];case"IsFinite":return[s.isFinite(ie(e.inputNames[0],t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function He(e,t,n=""){if(!(typeof e=="number"||typeof t=="number")){T(e.length===t.length,()=>n+` Shapes ${e} and ${t} must match`);for(let s=0;s<e.length;s++){const r=e[s],a=t[s];T(r<0||a<0||r===a,()=>n+` Shapes ${e} and ${t} must match`)}}}function sf(e){return!(typeof e=="number"||e.some(t=>t<0))}function Cr(e,t,n){let s=Qi(e,n);const r=!sf(s);if(r&&t.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${s}`);if(r&&t.forEach(a=>{s=Qi(a.shape,s)}),!sf(s))throw new Error(`Non-fully-defined elementShape: ${s}`);return s}function Qi(e,t){if(typeof e=="number")return t;if(typeof t=="number")return e;if(e.length!==t.length)throw new Error(`Incompatible ranks during merge: ${e} vs. ${t}`);const n=[];for(let s=0;s<e.length;++s){const r=e[s],a=t[s];if(r>=0&&a>=0&&r!==a)throw new Error(`Incompatible shape during merge: ${e} vs. ${t}`);n[s]=r>=0?r:a}return n}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class _2{constructor(t,n,s,r,a,o,i){this.name=t,this.dtype=n,this.maxSize=s,this.elementShape=r,this.identicalElementShapes=a,this.dynamicSize=o,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=At(0),dn(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(t){this.tensors.forEach(n=>{(t==null||!t.has(n.tensor.id))&&n.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||t>=this.size())throw new Error(`Tried to read from index ${t}, but array size is: ${this.size()}`);const n=this.tensors[t];if(n.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${t} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(n.cleared=!0),n.read=!0,n.tensor}readMany(t){return t.map(n=>this.read(n))}write(t,n){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||!this.dynamicSize&&t>=this.maxSize)throw new Error(`Tried to write to index ${t}, but array is not resizeable and size is: ${this.maxSize}`);const s=this.tensors[t]||{};if(n.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t},
          because the value dtype is ${n.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=n.shape),He(this.elementShape,n.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${t}.`),s.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been read.`);if(s.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been written.`);s.tensor=n,dn(n),s.written=!0,this.tensors[t]=s}writeMany(t,n){if(t.length!==n.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${t.length} is not the same as tensors size: ${n.length}.`);t.forEach((s,r)=>this.write(s,n[r]))}gather(t,n){if(n&&n!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${n}`);if(t)t=t.slice(0,this.size());else{t=[];for(let r=0;r<this.size();r++)t.push(r)}if(t.length===0)return mn([],[0].concat(this.elementShape));const s=this.readMany(t);return He(this.elementShape,s[0].shape,"TensorArray shape mismatch: "),Bn(s,0)}concat(t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${t}`);if(this.size()===0)return mn([],[0].concat(this.elementShape));const n=[];for(let r=0;r<this.size();r++)n.push(r);const s=this.readMany(n);return He(this.elementShape,s[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${s[0].shape})`),be(s,0)}scatter(t,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);if(t.length!==n.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${n.shape[0]}`);const s=Math.max(...t);if(!this.dynamicSize&&s>=this.maxSize)throw new Error(`Max index must be < array size (${s}  vs. ${this.maxSize})`);this.writeMany(t,js(n,0))}split(t,n){if(n.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${n.dtype}`);let s=0;const r=t.map(l=>(s+=l,s));if(s!==n.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${n.shape}`);if(!this.dynamicSize&&t.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${t.length}), and the TensorArray is not marked as dynamically resizeable`);const a=s===0?0:n.size/s,o=[];Dt(()=>{n=X(n,[1,s,a]);for(let l=0;l<t.length;++l){const u=[0,l===0?0:r[l-1],0],f=[1,t[l],a];o[l]=X(Bt(n,u,f),this.elementShape)}return o});const i=[];for(let l=0;l<t.length;l++)i[l]=l;this.writeMany(i,o)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class Vs{get id(){return this.idTensor.id}constructor(t,n,s,r=-1){this.tensors=t,this.elementShape=n,this.elementDtype=s,t!=null&&t.forEach(a=>{if(s!==a.dtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${a.dtype}`);He(n,a.shape,"TensorList shape mismatch: "),dn(a)}),this.idTensor=At(0),this.maxNumElements=r,dn(this.idTensor)}copy(){return new Vs([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(t){this.tensors.forEach(n=>{(t==null||!t.has(n.id))&&n.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(t,n,s=-1){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(s!==-1&&this.tensors.length!==s)throw new Error(`Operation expected a list with ${s} elements but got a list with ${this.tensors.length} elements.`);He(t,this.elementShape,"TensorList shape mismatch: ");const r=Cr(this.elementShape,this.tensors,t);return Dt(()=>{const a=this.tensors.map(o=>X(o,r));return Bn(a,0)})}popBack(t,n){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");const s=Cr(this.elementShape,this.tensors,t),r=this.tensors.pop();return r.kept=!1,He(r.shape,t,"TensorList shape mismatch: "),X(r,s)}pushBack(t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(He(t.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");dn(t),this.tensors.push(t)}resize(t){if(t<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${t}`);if(this.maxNumElements!==-1&&t>this.maxNumElements)throw new Error(`TensorListResize input size ${t} is greater maxNumElement ${this.maxNumElements}.`);const n=new Vs([],this.elementShape,this.elementDtype,this.maxNumElements);n.tensors.length=t;for(let s=0;s<Math.min(this.tensors.length,t);++s)n.tensors[s]=this.tensors[s];return n}getItem(t,n,s){if(s!==this.elementDtype)throw new Error(`Invalid data types; op elements ${s}, but list elements ${this.elementDtype}`);if(t<0||t>this.tensors.length)throw new Error(`Trying to access element ${t} in a list with ${this.tensors.length} elements.`);if(this.tensors[t]==null)throw new Error(`element at index ${t} is null.`);He(this.tensors[t].shape,n,"TensorList shape mismatch: ");const r=Cr(this.elementShape,this.tensors,n);return X(this.tensors[t],r)}setItem(t,n){if(n.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n.dtype}, but list elements ${this.elementDtype}`);if(t<0||this.maxNumElements!==-1&&t>=this.maxNumElements)throw new Error(`Trying to set element ${t} in a list with max ${this.maxNumElements} elements.`);He(this.elementShape,n.shape,"TensorList shape mismatch: "),dn(n),this.tensors[t]!=null&&(this.tensors[t].kept=!1),this.tensors[t]=n}gather(t,n,s){if(n!==this.elementDtype)throw new Error(`Invalid data types; op elements ${n}, but list elements ${this.elementDtype}`);He(this.elementShape,s,"TensorList shape mismatch: "),t=t.slice(0,this.size());const r=Cr(this.elementShape,this.tensors,s);return t.length===0?mn([],[0].concat(r)):Dt(()=>{const a=t.map(o=>X(this.tensors[o],r));return Bn(a,0)})}concat(t,n){if(t&&t!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${t}`);He(this.elementShape,n,"TensorList shape mismatch: ");const s=Cr(this.elementShape,this.tensors,n);return this.size()===0?mn([],[0].concat(s)):Dt(()=>{const r=this.tensors.map(a=>X(a,s));return be(r,0)})}}function E2(e,t,n){const s=e.dtype;if(e.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${e.shape}`);if(e.dtype!==n)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${n}`);const r=e.shape.slice(1);He(r,t,"TensorList shape mismatch: ");const a=js(e);return new Vs(a,t,s)}function C2(e,t,n,s){return new Vs([],e,t,s)}function A2(e,t,n,s){if(t.length!==e.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);const r=Math.max(...t);if(s!=null&&s!==-1&&r>=s)throw new Error(`Max index must be < array size (${r}  vs. ${s})`);const a=new Vs([],n,e.dtype,s),o=js(e,0);return t.forEach((i,l)=>{a.setItem(i,o[l])}),a}function D2(e,t,n){let s=0;const r=t.map(u=>(s+=u,s));if(s!==e.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${s}, and tensor's shape is: ${e.shape}`);const a=e.shape.slice(1),o=Qi(a,n),i=s===0?0:e.size/s,l=Dt(()=>{const u=[];e=X(e,[1,s,i]);for(let f=0;f<t.length;++f){const d=[0,f===0?0:r[f-1],0],p=[1,t[f],i];u[f]=X(Bt(e,d,p),o)}return e.dispose(),u}),c=new Vs([],n,e.dtype,t.length);for(let u=0;u<l.length;u++)c.setItem(u,l[u]);return c}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const O2=async(e,t,n)=>{switch(e.op){case"If":case"StatelessIf":{const s=b("thenBranch",e,t,n),r=b("elseBranch",e,t,n),a=b("cond",e,t,n),o=b("args",e,t,n);return(await a.data())[0]?n.functionMap[s].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap):n.functionMap[r].executeFunctionAsync(o,n.tensorArrayMap,n.tensorListMap)}case"While":case"StatelessWhile":{const s=b("body",e,t,n),r=b("cond",e,t,n),a=b("args",e,t,n),o=await n.functionMap[r].executeFunctionAsync(a,n.tensorArrayMap,n.tensorListMap),i=a.map(u=>u.id);let l=await o[0].data();o.forEach(u=>{!u.kept&&i.indexOf(u.id)===-1&&u.dispose()});let c=a;for(;l[0];){const u=c;c=await n.functionMap[s].executeFunctionAsync(c,n.tensorArrayMap,n.tensorListMap);const f=c.map(d=>d.id);u.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&f.indexOf(d.id)===-1&&d.dispose()});const h=await n.functionMap[r].executeFunctionAsync(c,n.tensorArrayMap,n.tensorListMap);l=await h[0].data(),h.forEach(d=>{!d.kept&&i.indexOf(d.id)===-1&&f.indexOf(d.id)===-1&&d.dispose()})}return c}case"LoopCond":{const s=b("pred",e,t,n);return[An(s)]}case"Switch":{const s=b("pred",e,t,n);let r=b("data",e,t,n);return r.kept||(r=An(r)),(await s.data())[0]?[void 0,r]:[r,void 0]}case"Merge":{const s=e.inputNames.find(r=>ie(r,t,n)!==void 0);if(s){const r=ie(s,t,n);return[An(r)]}return}case"Enter":{const s=b("frameName",e,t,n),r=b("tensor",e,t,n);return n.enterFrame(s),[An(r)]}case"Exit":{const s=b("tensor",e,t,n);return n.exitFrame(),[An(s)]}case"NextIteration":{const s=b("tensor",e,t,n);return n.nextIteration(),[An(s)]}case"TensorArrayV3":{const s=b("size",e,t,n),r=b("dtype",e,t,n),a=b("elementShape",e,t,n),o=b("dynamicSize",e,t,n),i=b("clearAfterRead",e,t,n),l=b("identicalElementShapes",e,t,n),c=b("name",e,t,n),u=new _2(c,r,s,a,l,o,i);return n.addTensorArray(u),[u.idTensor,At(1)]}case"TensorArrayWriteV3":{const s=b("tensorArrayId",e,t,n),r=b("index",e,t,n),a=b("tensor",e,t,n),o=n.getTensorArray(s.id);return o.write(r,a),[o.idTensor]}case"TensorArrayReadV3":{const s=b("tensorArrayId",e,t,n),r=b("index",e,t,n);return[n.getTensorArray(s.id).read(r)]}case"TensorArrayGatherV3":{const s=b("tensorArrayId",e,t,n),r=b("indices",e,t,n),a=b("dtype",e,t,n);return[n.getTensorArray(s.id).gather(r,a)]}case"TensorArrayScatterV3":{const s=b("tensorArrayId",e,t,n),r=b("indices",e,t,n),a=b("tensor",e,t,n),o=n.getTensorArray(s.id);return o.scatter(r,a),[o.idTensor]}case"TensorArrayConcatV3":{const s=b("tensorArrayId",e,t,n),r=n.getTensorArray(s.id),a=b("dtype",e,t,n);return[r.concat(a)]}case"TensorArraySplitV3":{const s=b("tensorArrayId",e,t,n),r=b("tensor",e,t,n),a=b("lengths",e,t,n),o=n.getTensorArray(s.id);return o.split(a,r),[o.idTensor]}case"TensorArraySizeV3":{const s=b("tensorArrayId",e,t,n),r=n.getTensorArray(s.id);return[At(r.size(),"int32")]}case"TensorArrayCloseV3":{const s=b("tensorArrayId",e,t,n),r=n.getTensorArray(s.id);return r.clearAndClose(),[r.idTensor]}case"TensorListSetItem":{const s=b("tensorListId",e,t,n),r=b("index",e,t,n),a=b("tensor",e,t,n),o=n.getTensorList(s.id);return o.setItem(r,a),[o.idTensor]}case"TensorListGetItem":{const s=b("tensorListId",e,t,n),r=b("index",e,t,n),a=b("elementShape",e,t,n),o=b("elementDType",e,t,n);return[n.getTensorList(s.id).getItem(r,a,o)]}case"TensorListScatterV2":case"TensorListScatter":{const s=b("indices",e,t,n),r=b("tensor",e,t,n),a=b("elementShape",e,t,n),o=b("numElements",e,t,n),i=A2(r,s,a,o);return n.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{const s=b("elementShape",e,t,n),r=b("elementDType",e,t,n);let a;e.op==="TensorListReserve"?a="numElements":a="maxNumElements";const o=b(a,e,t,n),i=e.op==="TensorListReserve"?-1:o,l=C2(s,r,o,i);return n.addTensorList(l),[l.idTensor]}case"TensorListGather":{const s=b("tensorListId",e,t,n),r=b("indices",e,t,n),a=b("elementShape",e,t,n),o=b("elementDType",e,t,n);return[n.getTensorList(s.id).gather(r,o,a)]}case"TensorListStack":{const s=b("tensorListId",e,t,n),r=b("elementShape",e,t,n),a=b("elementDType",e,t,n),o=b("numElements",e,t,n);return[n.getTensorList(s.id).stack(r,a,o)]}case"TensorListFromTensor":{const s=b("tensor",e,t,n),r=b("elementShape",e,t,n),a=b("elementDType",e,t,n),o=E2(s,r,a);return n.addTensorList(o),[o.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{const s=b("tensorListId",e,t,n),r=n.getTensorList(s.id),a=b("dtype",e,t,n),o=b("elementShape",e,t,n);return[r.concat(a,o)]}case"TensorListPushBack":{const s=b("tensorListId",e,t,n),r=b("tensor",e,t,n),a=n.getTensorList(s.id);return a.pushBack(r),[a.idTensor]}case"TensorListPopBack":{const s=b("tensorListId",e,t,n),r=b("elementShape",e,t,n),a=b("elementDType",e,t,n);return[n.getTensorList(s.id).popBack(r,a)]}case"TensorListSplit":{const s=b("tensor",e,t,n),r=b("elementShape",e,t,n),a=b("lengths",e,t,n),o=D2(s,a,r);return n.addTensorList(o),[o.idTensor]}case"TensorListLength":{const s=b("tensorListId",e,t,n),r=n.getTensorList(s.id);return[At(r.size(),"int32")]}case"TensorListResize":{const s=b("tensorListId",e,t,n),r=b("size",e,t,n),o=n.getTensorList(s.id).resize(r);return n.addTensorList(o),[o.idTensor]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rf(e,t,n){const[s,r]=b("fusedOps",e,t,n),a=s==="biasadd",o=!a,i=r==="prelu",l=s==="fusedbatchnorm",c=b("numArgs",e,t,n);if(a){if(i&&c!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&a&&c!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(l)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");const u=b("strides",e,t,n),f=za(e,t,n),h=b("dataFormat",e,t,n).toUpperCase(),d=b("dilations",e,t,n);let[p,y]=b("args",e,t,n);o&&(y=p,p=void 0);const g=b("leakyreluAlpha",e,t,n);return{stride:u,pad:f,dataFormat:h,dilations:d,biasArg:p,preluArg:y,activationFunc:r,leakyreluAlpha:g}}const F2=(e,t,n,s=ce)=>{switch(e.op){case"Conv1D":{const r=b("stride",e,t,n),a=b("pad",e,t,n),o=b("dataFormat",e,t,n).toUpperCase(),i=b("dilation",e,t,n);return[s.conv1d(b("x",e,t,n),b("filter",e,t,n),r,a,o,i)]}case"Conv2D":{const r=b("strides",e,t,n),a=za(e,t,n),o=b("dataFormat",e,t,n).toUpperCase(),i=b("dilations",e,t,n);return[s.conv2d(b("x",e,t,n),b("filter",e,t,n),[r[1],r[2]],a,o,[i[1],i[2]])]}case"_FusedConv2D":{const{stride:r,pad:a,dataFormat:o,dilations:i,biasArg:l,preluArg:c,activationFunc:u,leakyreluAlpha:f}=rf(e,t,n);return[s.fused.conv2d({x:b("x",e,t,n),filter:b("filter",e,t,n),strides:[r[1],r[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:l,activation:u,preluActivationWeights:c,leakyreluAlpha:f})]}case"FusedDepthwiseConv2dNative":{const{stride:r,pad:a,dataFormat:o,dilations:i,biasArg:l,preluArg:c,activationFunc:u,leakyreluAlpha:f}=rf(e,t,n);return[s.fused.depthwiseConv2d({x:b("x",e,t,n),filter:b("filter",e,t,n),strides:[r[1],r[2]],pad:a,dataFormat:o,dilations:[i[1],i[2]],bias:l,activation:u,preluActivationWeights:c,leakyreluAlpha:f})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{const r=b("outputShape",e,t,n),a=b("strides",e,t,n),o=za(e,t,n);return[s.conv2dTranspose(b("x",e,t,n),b("filter",e,t,n),r,[a[1],a[2]],o)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{const r=b("strides",e,t,n),a=za(e,t,n),o=b("dilations",e,t,n),i=b("dataFormat",e,t,n).toUpperCase();return[s.depthwiseConv2d(b("input",e,t,n),b("filter",e,t,n),[r[1],r[2]],a,i,[o[1],o[2]])]}case"Conv3D":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("dataFormat",e,t,n).toUpperCase(),i=b("dilations",e,t,n);return[s.conv3d(b("x",e,t,n),b("filter",e,t,n),[r[1],r[2],r[3]],a,o,[i[1],i[2],i[3]])]}case"AvgPool":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("kernelSize",e,t,n);return[s.avgPool(b("x",e,t,n),[o[1],o[2]],[r[1],r[2]],a)]}case"MaxPool":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("kernelSize",e,t,n);return[s.maxPool(b("x",e,t,n),[o[1],o[2]],[r[1],r[2]],a)]}case"MaxPoolWithArgmax":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("kernelSize",e,t,n),i=b("includeBatchInIndex",e,t,n),{result:l,indexes:c}=s.maxPoolWithArgmax(b("x",e,t,n),[o[1],o[2]],[r[1],r[2]],a,i);return[l,c]}case"AvgPool3D":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("kernelSize",e,t,n);return[s.avgPool3d(b("x",e,t,n),[o[1],o[2],o[3]],[r[1],r[2],r[3]],a)]}case"MaxPool3D":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("kernelSize",e,t,n);return[s.maxPool3d(b("x",e,t,n),[o[1],o[2],o[3]],[r[1],r[2],r[3]],a)]}case"Dilation2D":{const r=b("strides",e,t,n),a=b("pad",e,t,n),o=b("dilations",e,t,n),i=r[1],l=r[2],c=o[1],u=o[2];return[s.dilation2d(b("x",e,t,n),b("filter",e,t,n),[i,l],a,[c,u],"NHWC")]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const R2=(e,t,n,s=ce)=>{switch(e.op){case"Fill":{const r=b("shape",e,t,n),a=b("dtype",e,t,n),o=b("value",e,t,n);return[s.fill(r,o,a)]}case"LinSpace":{const r=b("start",e,t,n),a=b("stop",e,t,n),o=b("num",e,t,n);return[s.linspace(r,a,o)]}case"Multinomial":{const r=b("logits",e,t,n),a=b("numSamples",e,t,n),o=b("seed",e,t,n);return[s.multinomial(r,a,o)]}case"OneHot":{const r=b("indices",e,t,n),a=b("depth",e,t,n),o=b("onValue",e,t,n),i=b("offValue",e,t,n),l=b("dtype",e,t,n);return[s.oneHot(r,a,o,i,l)]}case"Ones":return[s.ones(b("shape",e,t,n),b("dtype",e,t,n))];case"OnesLike":return[s.onesLike(b("x",e,t,n))];case"RandomStandardNormal":return[s.randomStandardNormal(b("shape",e,t,n),b("dtype",e,t,n),b("seed",e,t,n))];case"RandomUniform":return[s.randomUniform(b("shape",e,t,n),b("minval",e,t,n),b("maxval",e,t,n),b("dtype",e,t,n))];case"RandomUniformInt":return[s.randomUniformInt(b("shape",e,t,n),b("minval",e,t,n),b("maxval",e,t,n),b("seed",e,t,n))];case"Range":{const r=b("start",e,t,n),a=b("stop",e,t,n),o=b("step",e,t,n);return[s.range(r,a,o,b("dtype",e,t,n))]}case"TruncatedNormal":{const r=b("shape",e,t,n),a=b("mean",e,t,n),o=b("stdDev",e,t,n),i=b("seed",e,t,n);return[s.truncatedNormal(r,a,o,b("dtype",e,t,n),i)]}case"Zeros":return[s.zeros(b("shape",e,t,n),b("dtype",e,t,n))];case"ZerosLike":return[s.zerosLike(b("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ci(e,t,n){const s=b("boxes",e,t,n),r=b("scores",e,t,n),a=b("maxOutputSize",e,t,n),o=b("iouThreshold",e,t,n),i=b("scoreThreshold",e,t,n),l=b("softNmsSigma",e,t,n);return{boxes:s,scores:r,maxOutputSize:a,iouThreshold:o,scoreThreshold:i,softNmsSigma:l}}const P2=async(e,t,n,s,r=ce)=>{switch(e.op){case"NonMaxSuppressionV5":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:l,scoreThreshold:c,softNmsSigma:u}=ci(e,t,n),f=await r.image.nonMaxSuppressionWithScoreAsync(a,o,i,l,c,u);return[f.selectedIndices,f.selectedScores]}case"NonMaxSuppressionV4":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:l,scoreThreshold:c}=ci(e,t,n),u=b("padToMaxOutputSize",e,t,n),f=await r.image.nonMaxSuppressionPaddedAsync(a,o,i,l,c,u);return[f.selectedIndices,f.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{const{boxes:a,scores:o,maxOutputSize:i,iouThreshold:l,scoreThreshold:c}=ci(e,t,n);return[await r.image.nonMaxSuppressionAsync(a,o,i,l,c)]}case"Where":{const a=r.cast(b("condition",e,t,n),"bool"),o=[await r.whereAsync(a)];return a.dispose(),o}case"ListDiff":return r.setdiff1dAsync(b("x",e,t,n),b("y",e,t,n));default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const M2=(e,t,n,s=ce)=>{switch(e.op){case"LowerBound":{const r=b("sortedSequence",e,t,n),a=b("values",e,t,n);return[s.lowerBound(r,a)]}case"TopKV2":{const r=b("x",e,t,n),a=b("k",e,t,n),o=b("sorted",e,t,n),i=s.topk(r,a,o);return[i.values,i.indices]}case"UpperBound":{const r=b("sortedSequence",e,t,n),a=b("values",e,t,n);return[s.upperBound(r,a)]}case"Unique":{const r=b("x",e,t,n),a=s.unique(r);return[a.values,a.indices]}case"UniqueV2":{const r=b("x",e,t,n),a=b("axis",e,t,n),o=s.unique(r,a);return[o.values,o.indices]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const V2=(e,t,n,s=ce)=>{switch(e.op){case"Const":return t[e.name];case"PlaceholderWithDefault":const r=b("default",e,t,n);return[ie(e.name,t,n)||r];case"Placeholder":return[ie(e.name,t,n)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{const u=b("x",e,t,n);return[An(u)]}case"IdentityN":return b("x",e,t,n).map(u=>An(u));case"Snapshot":const a=b("x",e,t,n);return[An(a)];case"Shape":return[s.tensor1d(b("x",e,t,n).shape,"int32")];case"ShapeN":return b("x",e,t,n).map(u=>s.tensor1d(u.shape));case"Size":return[s.scalar(b("x",e,t,n).size,"int32")];case"Rank":return[s.scalar(b("x",e,t,n).rank,"int32")];case"NoOp":return[s.scalar(1)];case"Print":const o=b("x",e,t,n),i=b("data",e,t,n),l=b("message",e,t,n),c=b("summarize",e,t,n);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(l);for(let u=0;u<i.length;u++)console.log(Array.prototype.slice.call(i[u].dataSync()).slice(0,c));return[o];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class L2{get id(){return this.handle.id}constructor(t,n){this.keyDType=t,this.valueDType=n,this.handle=At(0),this.tensorMap=new Map,dn(this.handle)}clearAndClose(){this.tensorMap.forEach(t=>t.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return At(this.size(),"int32")}async import(t,n){this.checkKeyAndValueTensor(t,n);const s=await t.data();return this.tensorMap.forEach(r=>r.dispose()),this.tensorMap.clear(),Dt(()=>{const r=js(n),a=s.length,o=r.length;T(a===o,()=>`The number of elements doesn't match, keys has ${a} elements, the values has ${o} elements.`);for(let i=0;i<a;i++){const l=s[i],c=r[i];dn(c),this.tensorMap.set(l,c)}return this.handle})}async find(t,n){this.checkKeyAndValueTensor(t,n);const s=await t.data();return Dt(()=>{const r=[];for(let a=0;a<s.length;a++){const o=s[a],i=this.findWithDefault(o,n);r.push(i)}return Bn(r)})}findWithDefault(t,n){const s=this.tensorMap.get(t);return s??n}checkKeyAndValueTensor(t,n){if(t.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${t.dtype}`);if(n.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${n.dtype}`)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const z2=async(e,t,n,s)=>{switch(e.op){case"HashTable":case"HashTableV2":{const r=s.getHashTableHandleByName(e.name);if(r!=null)return[r];{const a=b("keyDType",e,t,n),o=b("valueDType",e,t,n),i=new L2(a,o);return s.addHashTable(e.name,i),[i.handle]}}case"InitializeTable":case"InitializeTableV2":case"LookupTableImport":case"LookupTableImportV2":{const r=b("tableHandle",e,t,n,s),a=b("keys",e,t,n),o=b("values",e,t,n);return[await s.getHashTableById(r.id).import(a,o)]}case"LookupTableFind":case"LookupTableFindV2":{const r=b("tableHandle",e,t,n,s),a=b("keys",e,t,n),o=b("defaultValue",e,t,n);return[await s.getHashTableById(r.id).find(a,o)]}case"LookupTableSize":case"LookupTableSizeV2":{const r=b("tableHandle",e,t,n,s);return[s.getHashTableById(r.id).tensorSize()]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const B2=(e,t,n,s=ce)=>{switch(e.op){case"ResizeBilinear":{const r=b("images",e,t,n),a=b("size",e,t,n),o=b("alignCorners",e,t,n),i=b("halfPixelCenters",e,t,n);return[s.image.resizeBilinear(r,[a[0],a[1]],o,i)]}case"ResizeNearestNeighbor":{const r=b("images",e,t,n),a=b("size",e,t,n),o=b("alignCorners",e,t,n),i=b("halfPixelCenters",e,t,n);return[s.image.resizeNearestNeighbor(r,[a[0],a[1]],o,i)]}case"CropAndResize":{const r=b("image",e,t,n),a=b("boxes",e,t,n),o=b("boxInd",e,t,n),i=b("cropSize",e,t,n),l=b("method",e,t,n),c=b("extrapolationValue",e,t,n);return[s.image.cropAndResize(r,a,o,i,l,c)]}case"ImageProjectiveTransformV3":{const r=b("images",e,t,n),a=b("transforms",e,t,n),o=b("outputShape",e,t,n),i=b("fillValue",e,t,n),l=b("interpolation",e,t,n),c=b("fillMode",e,t,n);return[s.image.transform(r,a,l.toLowerCase(),c.toLowerCase(),i,o)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const W2=(e,t,n,s=ce)=>{switch(e.op){case"Equal":return[s.equal(b("a",e,t,n),b("b",e,t,n))];case"NotEqual":return[s.notEqual(b("a",e,t,n),b("b",e,t,n))];case"Greater":return[s.greater(b("a",e,t,n),b("b",e,t,n))];case"GreaterEqual":return[s.greaterEqual(b("a",e,t,n),b("b",e,t,n))];case"Less":return[s.less(b("a",e,t,n),b("b",e,t,n))];case"LessEqual":return[s.lessEqual(b("a",e,t,n),b("b",e,t,n))];case"LogicalAnd":return[s.logicalAnd(b("a",e,t,n),b("b",e,t,n))];case"LogicalNot":return[s.logicalNot(b("a",e,t,n))];case"LogicalOr":return[s.logicalOr(b("a",e,t,n),b("b",e,t,n))];case"Select":case"SelectV2":return[s.where(b("condition",e,t,n),b("a",e,t,n),b("b",e,t,n))];case"BitwiseAnd":return[s.bitwiseAnd(b("a",e,t,n),b("b",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const H2=(e,t,n,s=ce)=>{switch(e.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[s.matMul(b("a",e,t,n),b("b",e,t,n),b("transposeA",e,t,n),b("transposeB",e,t,n))];case"Einsum":return[s.einsum(b("equation",e,t,n),...b("tensors",e,t,n))];case"Transpose":return[s.transpose(b("x",e,t,n),b("perm",e,t,n))];case"_FusedMatMul":const[r,a]=b("fusedOps",e,t,n),o=r==="biasadd",i=a==="prelu",l=b("numArgs",e,t,n),c=b("leakyreluAlpha",e,t,n);if(o){if(i&&l!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&l!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}const[u,f]=b("args",e,t,n);return[s.fused.matMul({a:b("a",e,t,n),b:b("b",e,t,n),transposeA:b("transposeA",e,t,n),transposeB:b("transposeB",e,t,n),bias:u,activation:a,preluActivationWeights:f,leakyreluAlpha:c})];case"MatrixBandPart":return[s.linalg.bandPart(b("a",e,t,n),b("numLower",e,t,n),b("numUpper",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const U2=(e,t,n,s=ce)=>{switch(e.op){case"EuclideanNorm":return[s.euclideanNorm(b("x",e,t,n),b("axis",e,t,n),b("keepDims",e,t,n))];case"FusedBatchNorm":case"FusedBatchNormV2":return[s.batchNorm(b("x",e,t,n),b("mean",e,t,n),b("variance",e,t,n),b("offset",e,t,n),b("scale",e,t,n),b("epsilon",e,t,n))];case"FusedBatchNormV3":return[s.batchNorm(b("x",e,t,n),b("mean",e,t,n),b("variance",e,t,n),b("offset",e,t,n),b("scale",e,t,n),b("epsilon",e,t,n))];case"LRN":return[s.localResponseNormalization(b("x",e,t,n),b("radius",e,t,n),b("bias",e,t,n),b("alpha",e,t,n),b("beta",e,t,n))];case"Softmax":return[s.softmax(b("x",e,t,n))];case"LogSoftmax":return[s.logSoftmax(b("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const j2=(e,t,n,s=ce)=>{switch(e.op){case"RaggedGather":{const{outputNestedSplits:r,outputDenseValues:a}=s.raggedGather(b("paramsNestedSplits",e,t,n),b("paramsDenseValues",e,t,n),b("indices",e,t,n),b("outputRaggedRank",e,t,n));return r.concat(a)}case"RaggedRange":{const{rtNestedSplits:r,rtDenseValues:a}=s.raggedRange(b("starts",e,t,n),b("limits",e,t,n),b("splits",e,t,n));return[r,a]}case"RaggedTensorToTensor":return[s.raggedTensorToTensor(b("shape",e,t,n),b("values",e,t,n),b("defaultValue",e,t,n),b("rowPartitionTensors",e,t,n),b("rowPartitionTypes",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const q2=(e,t,n,s=ce)=>{switch(e.op){case"Max":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.max(b("x",e,t,n),i,l)]}case"Mean":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.mean(b("x",e,t,n),i,l)]}case"Min":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.min(b("x",e,t,n),i,l)]}case"Sum":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.sum(b("x",e,t,n),i,l)]}case"All":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.all(b("x",e,t,n),i,l)]}case"Any":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.any(b("x",e,t,n),i,l)]}case"ArgMax":{const i=b("axis",e,t,n);return[s.argMax(b("x",e,t,n),i)]}case"ArgMin":{const i=b("axis",e,t,n);return[s.argMin(b("x",e,t,n),i)]}case"Prod":{const i=b("axis",e,t,n),l=b("keepDims",e,t,n);return[s.prod(b("x",e,t,n),i,l)]}case"Cumprod":{const i=b("axis",e,t,n),l=b("exclusive",e,t,n),c=b("reverse",e,t,n);return[s.cumprod(b("x",e,t,n),i,l,c)]}case"Cumsum":{const i=b("axis",e,t,n),l=b("exclusive",e,t,n),c=b("reverse",e,t,n);return[s.cumsum(b("x",e,t,n),i,l,c)]}case"Bincount":const r=b("x",e,t,n),a=b("weights",e,t,n),o=b("size",e,t,n);return[s.bincount(r,a,o)];case"DenseBincount":{const i=b("x",e,t,n),l=b("weights",e,t,n),c=b("size",e,t,n),u=b("binaryOutput",e,t,n);return[s.denseBincount(i,l,c,u)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const G2=(e,t,n,s=ce)=>{switch(e.op){case"ConcatV2":case"Concat":{const r=b("n",e,t,n),a=b("axis",e,t,n);let o=b("tensors",e,t,n);return o=o.slice(0,r),[s.concat(o,a)]}case"Gather":{const r=b("x",e,t,n),a=b("indices",e,t,n);return[s.gather(r,s.cast(a,"int32"),0)]}case"GatherV2":{const r=b("axis",e,t,n),a=b("batchDims",e,t,n),o=b("x",e,t,n),i=b("indices",e,t,n);return[s.gather(o,s.cast(i,"int32"),r,a)]}case"Reverse":{const r=b("dims",e,t,n),a=[];for(let i=0;i<r.length;i++)r[i]&&a.push(i);const o=b("x",e,t,n);return[s.reverse(o,a)]}case"ReverseV2":{const r=b("axis",e,t,n),a=b("x",e,t,n);return[s.reverse(a,r)]}case"Slice":{const r=b("begin",e,t,n),a=b("size",e,t,n);return[s.slice(b("x",e,t,n),r,a)]}case"StridedSlice":{const r=b("begin",e,t,n),a=b("end",e,t,n),o=b("strides",e,t,n),i=b("beginMask",e,t,n),l=b("endMask",e,t,n),c=b("ellipsisMask",e,t,n),u=b("newAxisMask",e,t,n),f=b("shrinkAxisMask",e,t,n),h=b("x",e,t,n);return[s.stridedSlice(h,r,a,o,i,l,c,u,f)]}case"Pack":return Dt(()=>{const r=b("axis",e,t,n),a=b("tensors",e,t,n),o=a[0].shape,i=s.squeeze(a[0]).shape,l=a.map(c=>{const u=Ke(c.shape,o);if(!u&&!Ke(s.squeeze(c).shape,i))throw new Error("the input tensors shape does not match");return u?c:s.reshape(c,o)});return[s.stack(l,r)]});case"Unpack":{const r=b("axis",e,t,n),a=b("tensor",e,t,n);return s.unstack(a,r)}case"Tile":{const r=b("reps",e,t,n);return[s.tile(b("x",e,t,n),r)]}case"Split":case"SplitV":{const r=b("axis",e,t,n),a=b("numOrSizeSplits",e,t,n),o=b("x",e,t,n);return s.split(o,a,r)}case"ScatterNd":{const r=b("indices",e,t,n),a=b("values",e,t,n),o=b("shape",e,t,n);return[s.scatterND(r,a,o)]}case"GatherNd":{const r=b("x",e,t,n),a=b("indices",e,t,n);return[s.gatherND(r,a)]}case"SparseToDense":{const r=b("sparseIndices",e,t,n),a=b("outputShape",e,t,n),o=b("sparseValues",e,t,n),i=b("defaultValue",e,t,n);return[s.sparseToDense(r,o,a,o.dtype===i.dtype?i:s.cast(i,o.dtype))]}case"TensorScatterUpdate":{const r=b("indices",e,t,n),a=b("values",e,t,n),o=b("tensor",e,t,n);return[s.tensorScatterUpdate(o,r,a)]}default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const K2=(e,t,n,s=ce)=>{switch(e.op){case"SparseFillEmptyRows":{const{outputIndices:r,outputValues:a,emptyRowIndicator:o,reverseIndexMap:i}=s.sparse.sparseFillEmptyRows(b("indices",e,t,n),b("values",e,t,n),b("denseShape",e,t,n),b("defaultValue",e,t,n));return[r,a,o,i]}case"SparseReshape":{const{outputIndices:r,outputShape:a}=s.sparse.sparseReshape(b("inputIndices",e,t,n),b("inputShape",e,t,n),b("newShape",e,t,n));return[r,a]}case"SparseSegmentMean":return[s.sparse.sparseSegmentMean(b("data",e,t,n),b("indices",e,t,n),b("segmentIds",e,t,n))];case"SparseSegmentSum":return[s.sparse.sparseSegmentSum(b("data",e,t,n),b("indices",e,t,n),b("segmentIds",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const X2=(e,t,n,s=ce)=>{switch(e.op){case"FFT":return[s.fft(b("x",e,t,n))];case"IFFT":return[s.ifft(b("x",e,t,n))];case"RFFT":return[s.rfft(b("x",e,t,n))];case"IRFFT":return[s.irfft(b("x",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Y2=(e,t,n,s=ce)=>{switch(e.op){case"StaticRegexReplace":return[s.string.staticRegexReplace(b("input",e,t,n),b("pattern",e,t,n),b("rewrite",e,t,n),b("replaceGlobal",e,t,n))];case"StringNGrams":{const{nGrams:r,nGramsSplits:a}=s.string.stringNGrams(b("data",e,t,n),b("dataSplits",e,t,n),b("separator",e,t,n),b("nGramWidths",e,t,n),b("leftPad",e,t,n),b("rightPad",e,t,n),b("padWidth",e,t,n),b("preserveShortSequences",e,t,n));return[r,a]}case"StringSplit":{const{indices:r,values:a,shape:o}=s.string.stringSplit(b("input",e,t,n),b("delimiter",e,t,n),b("skipEmpty",e,t,n));return[r,a,o]}case"StringToHashBucketFast":return[s.string.stringToHashBucketFast(b("input",e,t,n),b("numBuckets",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Z2=(e,t,n,s=ce)=>{switch(e.op){case"Cast":return[s.cast(b("x",e,t,n),b("dtype",e,t,n))];case"ExpandDims":{const r=b("axis",e,t,n);return[s.expandDims(b("x",e,t,n),r)]}case"Squeeze":{const r=b("axis",e,t,n);return[s.squeeze(b("x",e,t,n),r)]}case"Reshape":return[s.reshape(b("x",e,t,n),b("shape",e,t,n))];case"EnsureShape":return[s.ensureShape(b("x",e,t,n),b("shape",e,t,n))];case"MirrorPad":return[s.mirrorPad(b("x",e,t,n),b("padding",e,t,n),b("mode",e,t,n))];case"PadV2":case"Pad":return[s.pad(b("x",e,t,n),b("padding",e,t,n),b("constantValue",e,t,n))];case"SpaceToBatchND":{const r=b("blockShape",e,t,n),a=b("paddings",e,t,n);return[s.spaceToBatchND(b("x",e,t,n),r,a)]}case"BatchToSpaceND":{const r=b("blockShape",e,t,n),a=b("crops",e,t,n);return[s.batchToSpaceND(b("x",e,t,n),r,a)]}case"DepthToSpace":{const r=b("blockSize",e,t,n),a=b("dataFormat",e,t,n).toUpperCase();return[s.depthToSpace(b("x",e,t,n),r,a)]}case"BroadcastTo":return[s.broadcastTo(b("x",e,t,n),b("shape",e,t,n))];case"BroadcastArgs":return[s.broadcastArgs(b("s0",e,t,n),b("s1",e,t,n))];default:throw TypeError(`Node type ${e.op} is not implemented`)}};/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function af(e,t,n,s,r=Dt){const a=((o,i,l)=>{switch(o.category){case"arithmetic":return r(()=>T2(o,i,l));case"basic_math":return r(()=>$2(o,i,l));case"control":return O2(o,i,l);case"convolution":return r(()=>F2(o,i,l));case"creation":return r(()=>R2(o,i,l));case"dynamic":return P2(o,i,l);case"evaluation":return r(()=>M2(o,i,l));case"image":return r(()=>B2(o,i,l));case"graph":return r(()=>V2(o,i,l));case"logical":return r(()=>W2(o,i,l));case"matrices":return r(()=>H2(o,i,l));case"normalization":return r(()=>U2(o,i,l));case"ragged":return r(()=>j2(o,i,l));case"reduction":return r(()=>q2(o,i,l));case"slice_join":return r(()=>G2(o,i,l));case"sparse":return r(()=>K2(o,i,l));case"spectral":return r(()=>X2(o,i,l));case"string":return r(()=>Y2(o,i,l));case"transformation":return r(()=>Z2(o,i,l));case"hash_table":return z2(o,i,l,s);case"custom":const c=dm(o.op);if(c&&c.customExecutor)return c.customExecutor(new I2(o,i,l));throw TypeError(`Custom op ${o.op} is not registered.`);default:throw TypeError(`Unknown op '${o.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(e,t,n);return As(a)?a.then(o=>[].concat(o)):[].concat(a)}class of{constructor(t={},n={},s={},r={},a){this.weightMap=t,this.tensorArrayMap=n,this.tensorListMap=s,this.functionMap=r,this.parseNodeNameCache=a,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(t,n){return{id:t,frameName:n,iterationId:0}}set currentContext(t){this.contexts!==t&&(this.contexts=t,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){const t=[];for(let n=0;n<this.contexts.length-1;n++){const s=this.contexts.slice(0,this.contexts.length-n);t.push(this.contextIdforContexts(s))}t.push(""),this._currentContextIds=t}contextIdforContexts(t){return t?t.map(n=>n.id===0&&n.iterationId===0?"":`${n.frameName}-${n.iterationId}`).join("/"):""}enterFrame(t){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,t)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;const t=Object.assign({},this.contexts[this.contexts.length-1]);t.iterationId+=1,t.id=this.lastId,this.contexts.splice(-1,1,t),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(t){return this.weightMap[t]}addTensorArray(t){this.tensorArrayMap[t.id]=t}getTensorArray(t){return this.tensorArrayMap[t]}addTensorList(t){this.tensorListMap[t.id]=t}getTensorList(t){return this.tensorListMap[t]}dispose(t){for(const n in this.tensorArrayMap)this.tensorArrayMap[n].clearAndClose(t);for(const n in this.tensorListMap)this.tensorListMap[n].clearAndClose(t)}}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lf(e,t,n,s){const r=new Set,a=[];let o=null,i=null;const l=new Set,c=new Set(Object.keys(e).map(h=>Oe(h)[0]));s=s||[];const u=new Set(s.map(h=>Oe(h.name)[0])),f=[...t];for(;f.length>0;){const h=f.pop();if((Ns(h)||a$(h)||o$(h))&&o==null&&(o=h,i=o.children.map(d=>d.name).filter(d=>r.has(d))),r.add(h.name),n[h.name]==null&&!c.has(h.name)&&!u.has(h.name)){if(h.inputs.length===0){a.push(h.name);continue}h.inputs.forEach(d=>{l.has(d.name)||(l.add(d.name),f.push(d))})}}return{inputs:e,outputs:t,usedNodes:r,missingInputs:a,dynamicNode:o,syncInputs:i}}function J2(e,t){const{usedNodes:n,inputs:s}=t,r=Object.keys(s).map(g=>Oe(g)[0]).map(g=>e.nodes[g]),a=e.initNodes||[],o=g=>n.has(typeof g=="string"?g:g.name);function i(g){return[...new Map(g.map(m=>[m.name,m])).values()]}const l=i([...r,...e.weights,...a]).filter(o),c=i([...l,...Object.values(e.nodes)]).filter(o),u=new Map(c.map(g=>[g.name,g])),f={};for(const g of c){f[g.name]=f[g.name]||0;for(const m of g.children)o(m)||(f[m.name]=Number.POSITIVE_INFINITY),f[m.name]=(f[m.name]||0)+1}const h=Object.entries(f).filter(([,g])=>g===0).map(([g])=>g),d=[...h];for(;h.length>0;){const g=h.pop(),m=u.get(g);for(const w of m.children.filter(o))--f[w.name]===0&&(d.push(w.name),h.push(w.name))}const p=d.map(g=>u.get(g)),y=Q2(p,l);return t$(y,l),y}function Q2(e,t){const n=new Map(e.map(o=>[o.name,o])),s=t.map(o=>o.name),r=new Set(s);for(;s.length>0;){const o=s.pop(),i=n.get(o);for(const l of i.children)!n.has(l.name)||r.has(l.name)||(r.add(l.name),s.push(l.name))}return e.filter(o=>r.has(o.name))}class Na extends Error{constructor(t){super(`NodesExecutionOrderError: ${t}`)}}function t$(e,t){const n=new Map(e.map((i,l)=>[i.name,l])),s=new Set(t.map(i=>i.name)),r=i=>s.has(typeof i=="string"?i:i.name),a=new Set(e.map(i=>i.name)),o=i=>a.has(typeof i=="string"?i:i.name);for(const i of e){for(const l of i.children.filter(o)){if(!n.has(l.name))throw new Na(`Child ${l.name} of node ${i.name} is unreachable.`);if(n.get(i.name)>n.get(l.name))throw new Na(`Node ${i.name} is scheduled to run after its child ${l.name}.`)}if(!r(i))for(const l of i.inputs){if(!n.has(l.name))throw new Na(`Input ${l.name} of node ${i.name} is unreachable.`);if(n.get(l.name)>n.get(i.name))throw new Na(`Node ${i.name} is scheduled to run before its input ${l.name}.`)}}}function e$(e){const t=new Map(e.map((i,l)=>[i.name,l])),n=Number.MAX_SAFE_INTEGER,s=e.map((i,l)=>Ns(i)?n:l),r=i=>{const l=s[t.get(i.name)];return l??-1},a=e.map((i,l)=>i.children.map(r).reduce((c,u)=>Math.max(c,u),s[l])),o=new Map;for(let i=0;i<e.length;++i){const l=a[i];if(l===n)continue;const c=e[i],u=e[l];o.has(u.name)||o.set(u.name,[]),o.get(u.name).push(c)}return o}const n$=new Set(["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"]),s$=new Set(["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"]),r$=new Set(["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"]);function Ns(e){return n$.has(e.op)}function a$(e){return s$.has(e.op)}function o$(e){return r$.has(e.op)}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class no{get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(t){const n=Object.keys(t).map(s=>t[s].map(r=>r.id));this._weightIds=[].concat(...n),this._weightMap=t}set resourceManager(t){this._resourceManager=t}get inputs(){return this._inputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(t=>t.signatureKey||t.name)}get outputNodes(){return this._outputs.map(t=>{const n=t.signatureKey||t.name;return t.defaultOutput?`${n}:${t.defaultOutput}`:n})}get functions(){return Object.keys(this._functions).reduce((t,n)=>(t[n]=this._functions[n].signature,t),{})}constructor(t,n){this.graph=t,this.parent=n,this.compiledMap=new Map,this.parseNodeNameCache=new Map,this._weightMap={},this.SEPARATOR=",",this._functions={},this._functionExecutorMap={},this.keepIntermediateTensors=!1,this._outputs=t.outputs,this._inputs=t.inputs,this._initNodes=t.initNodes,this._signature=t.signature,this._functions=t.functions,t.functions!=null&&Object.keys(t.functions).forEach(s=>{this._functionExecutorMap[s]=new no(t.functions[s],this)})}getCompilationKey(t,n){const s=t.map(a=>a.name).sort(),r=n.map(a=>a.name).sort();return s.join(this.SEPARATOR)+"--"+r.join(this.SEPARATOR)}compile(t,n){const s=lf(t,n,this.weightMap,this._initNodes),{missingInputs:r,dynamicNode:a,syncInputs:o}=s;if(a!=null)throw new Error(`This execution contains the node '${a.name}', which has the dynamic op '${a.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${o}]`);if(r.length>0){const c=n.map(f=>f.name),u=Object.keys(t);throw new Error(`Cannot compute the outputs [${c}] from the provided inputs [${u}]. Missing the following inputs: [${r}]`)}const i=J2(this.graph,s),l=e$(i);return{orderedNodes:i,nodeLiveUntilMap:l}}cloneAndKeepTensor(t){if(t==null)return null;const n=t.clone();return dn(n),n}cloneTensorList(t){return t?t.map(s=>this.cloneAndKeepTensor(s)):null}cloneTensorMap(t){return Object.fromEntries(Object.entries(t).map(([n,s])=>[n,this.cloneTensorList(s)]))}execute(t,n){this.disposeIntermediateTensors(),t=this.mapInputs(t);const s=Object.keys(t).sort();this.checkInputs(t),this.checkInputShapeAndType(t),n=this.mapOutputs(n),this.checkOutputs(n);const r=s.map(h=>this.graph.nodes[Oe(h)[0]]),a=n.map(h=>Oe(h)[0]),o=new Set(a);let i=a.map(h=>this.graph.nodes[h]);i.length===0&&(i=this._outputs);const l=this.getCompilationKey(r,i);let c=this.compiledMap.get(l);c==null&&(c=this.compile(t,i),this.compiledMap.set(l,c));try{this.keepIntermediateTensors=$t().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(h){this.keepIntermediateTensors=!1,console.warn(h.message)}const u={},f={};return Dt(()=>{const h=new of(this.weightMap,u,f,this.functionExecutorMap,this.parseNodeNameCache),d=Object.assign({},this.weightMap);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap)),Object.keys(t).forEach(m=>{const[w,S]=Oe(m,h),k=[];k[S]=t[m],d[w]=k,this.keepIntermediateTensors&&(this.clonedTensorsMap[w]=this.cloneTensorList(k))});const p=this.getFrozenTensorIds(d),{orderedNodes:y,nodeLiveUntilMap:g}=c;for(const m of y){if(d[m.name])continue;const w=af(m,d,h,this._resourceManager);if(As(w))throw new Error(`The execution of the op '${m.op}' returned a promise. Please use model.executeAsync() instead.`);d[m.name]=w,this.keepIntermediateTensors&&(this.clonedTensorsMap[m.name]=this.cloneTensorList(w)),this.checkTensorForDisposalWithNodeLiveUntilInfo(m,d,h,p,o,g.get(m.name))}return this.parent==null&&h.dispose(p),n.map(m=>ie(m,d,h))})}getFrozenTensorIds(t){const n=[].concat.apply([],Object.keys(t).map(s=>t[s]).map(s=>s.map(r=>r.id)));return new Set(n)}checkTensorForDisposal(t,n,s,r,a,o,i){if(!(Ns(n)||o.has(t))){for(const l of s[t])l!=null&&(i[l.id]=(i[l.id]||0)+n.children.length);for(const l of n.inputs){if(Ns(l))continue;const c=tf(l.name,s,r);if(c!=null)for(const u of c){if(!u||u.kept||a.has(u.id))continue;const f=i[u.id];f===1?(u.dispose(),delete i[u.id]):f!=null&&i[u.id]--}}}}checkTensorForDisposalWithNodeLiveUntilInfo(t,n,s,r,a,o){function i(l){return Ns(l)||a.has(l.name)}if(!(Ns(t)||o==null))for(const l of o){if(i(l))continue;const c=tf(l.name,n,s);for(const u of c)!u||u.kept||r.has(u.id)||u.dispose()}}async executeAsync(t,n){return this._executeAsync(t,n)}disposeIntermediateTensors(){this.clonedTensorsMap&&(Object.values(this.clonedTensorsMap).forEach(t=>{for(const n of t)n&&!n.isDisposed&&n.dispose()}),this.clonedTensorsMap=null)}getIntermediateTensors(){return this.clonedTensorsMap}async _executeAsync(t,n,s=!1,r={},a={}){this.disposeIntermediateTensors(),s||(t=this.mapInputs(t),this.checkInputs(t),this.checkInputShapeAndType(t),n=this.mapOutputs(n),this.checkOutputs(n));try{this.keepIntermediateTensors=$t().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(h){this.keepIntermediateTensors=!1,console.warn(h.message)}const o=new of(this.weightMap,r,a,this.functionExecutorMap,this.parseNodeNameCache);this.keepIntermediateTensors&&(this.clonedTensorsMap=this.cloneTensorMap(this.weightMap));const i=await this.executeWithControlFlow(t,o,n,s),l=n.map(h=>ie(h,i,o)),c=l.map(h=>h.id),u=Object.keys(t).map(h=>t[h].id),f=new Set([...c,...u,...this.weightIds]);return Object.values(i).forEach(h=>{h.forEach(d=>{d&&!d.isDisposed&&!f.has(d.id)&&d.dispose()})}),this.parent==null&&o.dispose(f),l}async executeFunctionAsync(t,n,s){const r=t.reduce((a,o,i)=>(a[this.inputs[i].name]=o,a),{});return this._executeAsync(r,this.outputNodes,!0,n,s)}async executeWithControlFlow(t,n,s,r){const a=Object.keys(t),o=a.map(k=>this.graph.nodes[Oe(k)[0]]),i=s.map(k=>Oe(k)[0]),l=new Set(i);let c=i.map(k=>this.graph.nodes[k]);c.length===0&&(c=this._outputs);const{usedNodes:u,missingInputs:f,dynamicNode:h,syncInputs:d}=lf(t,c,this.weightMap,this._initNodes),p=[...o,...this.graph.weights,...this._initNodes||[]].map(k=>({node:k,contexts:n.currentContext})),y=Object.assign({},this.weightMap);Object.keys(t).forEach(k=>{const[I,$]=Oe(k),E=[];E[$]=t[k],y[I]=E});const g={},m=this.getFrozenTensorIds(y),w={};for(;p.length>0;){const k=this.processStack(o,p,n,y,w,m,l,g,u);await Promise.all(k)}h==null&&!r&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");const S=c.filter(k=>!Ns(k)&&!ie(k.name,y,n)).map(k=>k.name);if(S.length>0){let k="";throw h!=null&&(k=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${d}]`),new Error(`Cannot compute the outputs [${S}] from the provided inputs [${a}]. Consider providing the following inputs: [${f}]. ${k}`)}return y}processStack(t,n,s,r,a,o,i,l,c){const u=[];for(;n.length>0;){const f=n.pop();s.currentContext=f.contexts;let h="";if(f.node.op==="Enter"&&b("isConstant",f.node,r,s)&&([h]=Cn(f.node.name,s)),r[f.node.name]==null){const d=af(f.node,r,s,this._resourceManager);h||([h]=Cn(f.node.name,s));const p=s.currentContext;As(d)?u.push(d.then(y=>(r[h]=y,this.keepIntermediateTensors&&(this.clonedTensorsMap[h]=this.cloneTensorList(y)),s.currentContext=p,this.checkTensorForDisposal(h,f.node,r,s,o,i,l),this.processChildNodes(f.node,n,s,r,a,c),y))):(r[h]=d,this.keepIntermediateTensors&&(this.clonedTensorsMap[h]=this.cloneTensorList(d)),this.checkTensorForDisposal(h,f.node,r,s,o,i,l),this.processChildNodes(f.node,n,s,r,a,c))}else this.processChildNodes(f.node,n,s,r,a,c)}return u}processChildNodes(t,n,s,r,a,o){t.children.forEach(i=>{const[l]=Cn(i.name,s);a[l]||!o.has(i.name)||(i.op==="Merge"?i.inputNames.some(c=>!!ie(c,r,s))&&(a[l]=!0,n.push({contexts:s.currentContext,node:i})):i.inputNames.every(c=>!!ie(c,r,s))&&(a[l]=!0,n.push({contexts:s.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(t=>this.weightMap[t].forEach(n=>n.dispose()))}checkInputShapeAndType(t){Object.keys(t).forEach(n=>{const s=t[n],[r]=Oe(n),a=this.graph.nodes[r];if(a.attrParams.shape&&a.attrParams.shape.value){const o=a.attrParams.shape.value,i=o.length===s.shape.length&&s.shape.every((l,c)=>o[c]===-1||o[c]===l);T(i,()=>`The shape of dict['${a.name}'] provided in model.execute(dict) must be [${o}], but was [${s.shape}]`)}a.attrParams.dtype&&a.attrParams.dtype.value&&T(s.dtype===a.attrParams.dtype.value,()=>`The dtype of dict['${a.name}'] provided in model.execute(dict) must be ${a.attrParams.dtype.value}, but was ${s.dtype}`)})}mapInputs(t){var n,s;const r={};for(const a in t){const o=(s=(n=this._signature)===null||n===void 0?void 0:n.inputs)===null||s===void 0?void 0:s[a];o!=null?r[o.name]=t[a]:r[a]=t[a]}return r}checkInputs(t){const n=Object.keys(t).filter(s=>{const[r]=Oe(s);return this.graph.nodes[r]==null});if(n.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${n}] that are not part of graph`)}mapOutputs(t){return t.map(n=>{var s,r;const a=(r=(s=this._signature)===null||s===void 0?void 0:s.outputs)===null||r===void 0?void 0:r[n];return a!=null?a.name:n},{})}checkOutputs(t){t.forEach(n=>{const[s]=Oe(n);if(!this.graph.nodes[s])throw new Error(`The output '${n}' is not found in the graph`)})}}class i${constructor(t={},n={}){this.hashTableNameToHandle=t,this.hashTableMap=n}addHashTable(t,n){this.hashTableNameToHandle[t]=n.handle,this.hashTableMap[n.id]=n}getHashTableHandleByName(t){return this.hashTableNameToHandle[t]}getHashTableById(t){return this.hashTableMap[t]}dispose(){for(const t in this.hashTableMap)this.hashTableMap[t].clearAndClose(),delete this.hashTableMap[t];for(const t in this.hashTableNameToHandle)this.hashTableNameToHandle[t].dispose(),delete this.hashTableNameToHandle[t]}}/**
 * @license
 * Copyright 2018 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const l$="?tfjs-format=file",c$="model.json";class u${get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}constructor(t,n={},s=lm){this.modelUrl=t,this.loadOptions=n,this.version="n/a",this.io=s,n==null&&(this.loadOptions={}),this.resourceManager=new i$}findIOHandler(){const t=this.modelUrl;if(t.load!=null)this.handler=t;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(t,this.loadOptions);else{const n=this.io.getLoadHandlers(t,this.loadOptions);if(n.length===0)n.push(this.io.browserHTTPRequest(t,this.loadOptions));else if(n.length>1)throw new Error(`Found more than one (${n.length}) load handlers for URL '${[t]}'`);this.handler=n[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");const t=this.handler.load();return As(t)?t.then(n=>n.getWeightStream==null?this.loadSync(n):this.loadStreaming(n)):this.loadSync(t)}loadSync(t){const n=this.io.decodeWeights(t.weightData,t.weightSpecs);return this.loadWithWeightMap(t,n)}async loadStreaming(t){if(t.getWeightStream==null)throw new Error("Model artifacts missing streamWeights function");const n=await sp(t.getWeightStream(),t.weightSpecs);return this.loadWithWeightMap(t,n)}loadWithWeightMap(t,n){this.artifacts=t;const s=this.artifacts.modelTopology;let r=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){const a=this.artifacts.userDefinedMetadata;a.signature!=null&&(r=a.signature),a.structuredOutputKeys!=null&&(this.structuredOutputKeys=a.structuredOutputKeys)}if(this.signature=r,this.version=`${s.versions.producer}.${s.versions.minConsumer}`,this.executor=new no(ef.Instance.transformGraph(s,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(n),this.executor.resourceManager=this.resourceManager,t.modelInitializer!=null&&t.modelInitializer.node!=null){const a=ef.Instance.transformGraph(t.modelInitializer);this.initializer=new no(a),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializerSignature=t.initializerSignature}return!0}async save(t,n){if(typeof t=="string"){const s=this.io.getSaveHandlers(t);if(s.length===0)throw new Error(`Cannot find any save handlers for URL '${t}'`);if(s.length>1)throw new Error(`Found more than one (${s.length}) save handlers for URL '${t}'`);t=s[0]}if(t.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return t.save(this.artifacts)}addStructuredOutputNames(t){if(this.structuredOutputKeys){const n=t instanceof me?[t]:t,s={};return n.forEach((r,a)=>s[this.structuredOutputKeys[a]]=r),s}return t}predict(t,n){const s=this.execute(t,this.outputNodes);return this.addStructuredOutputNames(s)}async predictAsync(t,n){const s=await this.executeAsync(t,this.outputNodes);return this.addStructuredOutputNames(s)}normalizeInputs(t){var n;if(!(t instanceof me)&&!Array.isArray(t)){const a=(n=this.signature)===null||n===void 0?void 0:n.inputs;if(a!=null)for(const o in a){const i=a[o];i.resourceId!=null&&(t[o]=this.resourceIdToCapturedInput[i.resourceId])}return t}t=Array.isArray(t)?t:[t];const s=Object.keys(this.resourceIdToCapturedInput).length;if(t.length+s!==this.inputNodes.length)throw new Error(`Input tensor count mismatch, the graph model has ${this.inputNodes.length-s} non-resource placeholders, while there are ${t.length} input tensors provided.`);let r=0;return this.inputNodes.reduce((a,o)=>{var i,l,c;const u=(c=(l=(i=this.signature)===null||i===void 0?void 0:i.inputs)===null||l===void 0?void 0:l[o])===null||c===void 0?void 0:c.resourceId;return u!=null?a[o]=this.resourceIdToCapturedInput[u]:a[o]=t[r++],a},{})}normalizeOutputs(t){return t=t||this.outputNodes,Array.isArray(t)?t:[t]}executeInitializerGraph(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.execute({},[]):this.initializer.execute({},Object.keys(this.initializerSignature.outputs))}async executeInitializerGraphAsync(){return this.initializer==null?[]:this.initializerSignature==null?this.initializer.executeAsync({},[]):this.initializer.executeAsync({},Object.keys(this.initializerSignature.outputs))}setResourceIdToCapturedInput(t){if(this.resourceIdToCapturedInput={},this.initializerSignature){const n=this.initializerSignature.outputs,s=Object.keys(n);for(let r=0;r<s.length;r++){const a=s[r],o=n[a];this.resourceIdToCapturedInput[o.resourceId]=t[r]}}}execute(t,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(this.executeInitializerGraph()),t=this.normalizeInputs(t),n=this.normalizeOutputs(n);const s=this.executor.execute(t,n);return s.length>1?s:s[0]}async executeAsync(t,n){this.resourceIdToCapturedInput==null&&this.setResourceIdToCapturedInput(await this.executeInitializerGraphAsync()),t=this.normalizeInputs(t),n=this.normalizeOutputs(n);const s=await this.executor.executeAsync(t,n);return s.length>1?s:s[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(t){return Object.keys(t).reduce((n,s)=>(n[s]=[t[s]],n),{})}dispose(){this.executor.dispose(),this.initializer&&(this.initializer.dispose(),this.resourceIdToCapturedInput&&Te(this.resourceIdToCapturedInput)),this.resourceManager.dispose()}}async function f$(e,t={},n=lm){if(e==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");t==null&&(t={}),t.fromTFHub&&typeof e=="string"&&(e=h$(e));const s=new u$(e,t,n);return await s.load(),s}function h$(e){return e.endsWith("/")||(e=e+"/"),`${e}${c$}${l$}`}/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ft(e,t){Array.isArray(e)||(e=[e]),e.forEach(n=>{n!=null&&T(n.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const d$=Kp;class Mo extends Kf{nextDataId(){return Mo.nextDataId++}constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new yy(this,Du())}write(t,n,s){this.firstUse&&(this.firstUse=!1,$t().get("IS_NODE")&&vs(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));const r={id:this.nextDataId()};return this.data.set(r,{values:t,dtype:s,refCount:1}),r}makeTensorInfo(t,n,s){let r;if(n==="string"&&s!=null&&s.length>0&&No(s[0])){const a=s.map(o=>_s(o));r=this.write(a,t,n)}else r=this.write(s,t,n);return{dataId:r,shape:t,dtype:n}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){const n=this.data.get(t);n.refCount++}decRef(t){if(this.data.has(t)){const n=this.data.get(t);n.refCount--}}move(t,n,s,r,a){this.data.set(t,{values:n,dtype:r,refCount:a})}numDataIds(){return this.data.numDataIds()}async read(t){return this.readSync(t)}readSync(t){const{dtype:n,complexTensorInfos:s}=this.data.get(t);if(n==="complex64"){const r=this.readSync(s.real.dataId),a=this.readSync(s.imag.dataId);return pr(r,a)}return $y(this.data.get(t).values,n)}bufferSync(t){const n=this.readSync(t.dataId);if(t.dtype==="string")try{const s=n.map(r=>Zr(r));return Et(t.shape,t.dtype,s)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return Et(t.shape,t.dtype,n)}makeOutput(t,n,s){return Du().makeTensorFromTensorInfo(this.makeTensorInfo(n,s,t),this)}disposeData(t,n=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!n&&this.data.get(t).refCount>0)return!1;const{complexTensorInfos:s}=this.data.get(t);s!=null&&(this.disposeData(s.real.dataId,!0),this.disposeData(s.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}async time(t){const n=ur();return t(),{kernelMs:ur()-n}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){ft([t],"where");const n=this.readSync(t.dataId);return d$(t.shape,n)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}}Mo.nextDataId=0;/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function p$(e){const t=new Float32Array(e.length);for(let n=0;n<e.length;++n)t[n]=Math.abs(e[n]);return t}const m$=e=>{const{x:t}=e.inputs,n=e.backend;ft(t,"abs");let s=new Float32Array(nt(t.shape));const r=n.data.get(t.dataId).values;return s=p$(r),n.makeOutput(s,t.shape,t.dtype)},g$={kernelName:Qf,backendName:"cpu",kernelFunc:m$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Jt(e){return(t,n,s,r,a)=>{const o=Yt(t,n),i=o.length,l=yt(o),c=nt(o),u=ke(a,c),f=t.length,h=n.length,d=yt(t),p=yt(n),y=Ya(t,o),g=Ya(n,o);if(y.length+g.length===0)for(let m=0;m<u.length;++m)u[m]=e(s[m%s.length],r[m%r.length]);else for(let m=0;m<u.length;++m){const w=Sr(m,i,l),S=w.slice(-f);y.forEach(E=>S[E]=0);const k=pn(S,f,d),I=w.slice(-h);g.forEach(E=>I[E]=0);const $=pn(I,h,p);u[m]=e(s[k],r[$])}return[u,o]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Re(e){const{inputs:t,backend:n}=e,{real:s,imag:r}=t,a=n.data.get(s.dataId).values,o=n.data.get(r.dataId).values,i=n.makeTensorInfo(s.shape,"complex64"),l=n.data.get(i.dataId);return l.complexTensorInfos={real:n.makeTensorInfo(s.shape,"float32",a),imag:n.makeTensorInfo(r.shape,"float32",o)},i}const y$={kernelName:fh,backendName:"cpu",kernelFunc:Re};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function so(e,t,n="float32"){if(n==="complex64"){const r=so(e,t,"float32"),a=so(e,t,"float32");return Re({inputs:{real:r,imag:a},backend:e})}const s=fe(nt(t),n);return e.makeTensorInfo(t,n,s)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kn(e){const{inputs:t,backend:n}=e,{x:s}=t;return n.incRef(s.dataId),{dataId:s.dataId,shape:s.shape,dtype:s.dtype}}const b$={kernelName:Hl,backendName:"cpu",kernelFunc:kn};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ls(e){const{inputs:t,backend:n}=e,{input:s}=t,r=n.data.get(s.dataId).complexTensorInfos.real,a=n.data.get(r.dataId).values;return n.makeTensorInfo(r.shape,r.dtype,a)}const w$={kernelName:ud,backendName:"cpu",kernelFunc:Ls};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function k$(e,t,n,s){if(s==="int32"){const r=Int32Array.from(e);return[t,"int32",r]}if(s==="bool"){const r=Hs([0],n),[a,o]=Jt((i,l)=>i!==l?1:0)(t,[],e,r,"bool");return[o,"bool",a]}throw new Error(`Error in Cast: failed to cast ${n} to ${s}`)}function cs(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{dtype:a}=s;if(a==="complex64"){if(r.dtype==="complex64")return kn({inputs:{x:r},backend:n});const u=so(n,r.shape,r.dtype),f=cs({inputs:{x:r},backend:n,attrs:{dtype:"float32"}}),h=Re({inputs:{real:f,imag:u},backend:n});return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(f),h}if(r.dtype==="complex64"){const u=Ls({inputs:{input:r},backend:n}),f=cs({inputs:{x:u},backend:n,attrs:{dtype:a}});return n.disposeIntermediateTensorInfo(u),f}if(!xy(r.dtype,a)){const u=kn({inputs:{x:r},backend:n});return{dataId:u.dataId,shape:u.shape,dtype:a}}const o=n.data.get(r.dataId).values,[i,l,c]=k$(o,r.shape,r.dtype,a);return n.makeTensorInfo(i,l,c)}const v$={kernelName:_l,backendName:"cpu",kernelFunc:cs};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function se(e,t,n,s){return n==null?({inputs:r,backend:a})=>{const{a:o,b:i}=r,l=a;ft([o,i],e);const c=l.data.get(o.dataId).values,u=l.data.get(i.dataId).values,f=o.dtype==="string"?oa(c):c,h=o.dtype==="string"?oa(u):u,d=s||o.dtype,[p,y]=t(o.shape,i.shape,f,h,d);return l.makeTensorInfo(y,d,p)}:({inputs:r,backend:a})=>{const{a:o,b:i}=r,l=a;if(o.dtype==="complex64"||i.dtype==="complex64"){const c=cs({inputs:{x:o},backend:l,attrs:{dtype:"complex64"}}),u=l.data.get(c.dataId),f=u.complexTensorInfos.real,h=u.complexTensorInfos.imag,d=l.data.get(f.dataId).values,p=l.data.get(h.dataId).values,y=cs({inputs:{x:i},backend:l,attrs:{dtype:"complex64"}}),g=l.data.get(y.dataId),m=g.complexTensorInfos.real,w=g.complexTensorInfos.imag,S=l.data.get(m.dataId).values,k=l.data.get(w.dataId).values,[I,$,E]=n(o.shape,i.shape,d,p,S,k),D=l.makeTensorInfo(E,"float32",I),_=l.makeTensorInfo(E,"float32",$),x=Re({inputs:{real:D,imag:_},backend:l});return l.disposeIntermediateTensorInfo(c),l.disposeIntermediateTensorInfo(y),l.disposeIntermediateTensorInfo(D),l.disposeIntermediateTensorInfo(_),x}else{const c=l.data.get(o.dataId).values,u=l.data.get(i.dataId).values,f=s||o.dtype,[h,d]=t(o.shape,i.shape,c,u,f);return l.makeTensorInfo(d,f,h)}}}function Gc(e){return(t,n,s,r,a,o)=>{const i=Yt(t,n),l=nt(i),c=i.length,u=yt(i),f=ke("float32",l),h=ke("float32",l),d=Ya(t,i),p=Ya(n,i),y=pr(s,r),g=pr(a,o),m=t.length,w=yt(t),S=n.length,k=yt(n);if(d.length+p.length===0)for(let I=0;I<f.length;I++){const $=I%y.length,E=I%g.length,D=e(y[$*2],y[$*2+1],g[E*2],g[E*2+1]);f[I]=D.real,h[I]=D.imag}else for(let I=0;I<f.length;I++){const $=Sr(I,c,u),E=$.slice(-m);d.forEach(R=>E[R]=0);const D=pn(E,m,w),_=$.slice(-S);p.forEach(R=>_[R]=0);const x=pn(_,S,k),v=e(y[D*2],y[D*2+1],g[x*2],g[x*2+1]);f[I]=v.real,h[I]=v.imag}return[f,h,i]}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const S$=Jt(((e,t)=>e+t)),x$=Gc(((e,t,n,s)=>({real:e+n,imag:t+s}))),mr=se(Io,S$,x$),N$={kernelName:Io,backendName:"cpu",kernelFunc:mr};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gm(e,t,n,s,r){const a=nt(s),o=fe(r,n);for(let i=0;i<e.length;i++){const l=e[i];if(l<0)throw new Error("Input x must be non-negative!");l>=r||(a>0?o[l]+=t[i]:o[l]+=1)}return o}function I$(e,t,n,s=!1){const r=e.shape[0],a=e.shape[1],o=Et([r,n],t.dtype);for(let i=0;i<r;i++)for(let l=0;l<a;l++){const c=e.get(i,l);if(c<0)throw new Error("Input x must be non-negative!");c>=n||(s?o.set(1,i,c):t.size>0?o.set(o.get(i,c)+t.get(i,l),i,c):o.set(o.get(i,c)+1,i,c))}return o}/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const T$=Jt(((e,t)=>e&t)),$$=se($l,T$),_$={kernelName:$l,backendName:"cpu",kernelFunc:$$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ds(e){return(t,n,s)=>{const r=Qt(n,t.length);for(let a=0;a<t.length;++a)r[a]=e(t[a],s);return r}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pt(e,t,n){const s=ds(t);return ps(e,s,n)}function ps(e,t,n){return({inputs:s,attrs:r,backend:a})=>{const{x:o}=s;ft(o,e);const i=a,l=i.data.get(o.dataId).values;let c;if(o.dtype==="string"){if(!Array.isArray(l))throw new Error("String tensor's value was not an instance of Array");c=oa(l)}else c=l;const u=n||o.dtype,f=t(c,u,r);return i.makeTensorInfo(o.shape,u,f)}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const E$=ds(e=>Math.ceil(e)),C$=ps(El,E$),A$={kernelName:El,backendName:"cpu",kernelFunc:C$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function D$(e,t,n,s){const r=Qt(n,nt(t));if(s&&n!=="string"){let a=0;e.forEach(o=>{const i=nt(o.shape);r.set(o.vals,a),a+=i})}else{let a=0;e.forEach(o=>{const i=n==="string"?oa(o.vals):o.vals;let l=0;for(let c=0;c<o.shape[0];++c){const u=c*t[1]+a;for(let f=0;f<o.shape[1];++f)r[u+f]=i[l++]}a+=o.shape[1]})}return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const O$=Jt((e,t)=>e===t?1:0),ym=se(Pl,O$,null,"bool"),F$={kernelName:Pl,backendName:"cpu",kernelFunc:ym};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const R$=ds(e=>Math.exp(e)),bm=ps(Ml,R$,"float32"),P$={kernelName:Ml,backendName:"cpu",kernelFunc:bm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const M$=ds(e=>Math.expm1(e)),V$=ps(Vl,M$),L$={kernelName:Vl,backendName:"cpu",kernelFunc:V$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const z$=ds(e=>Math.floor(e)),B$=ps(Ll,z$),W$={kernelName:Ll,backendName:"cpu",kernelFunc:B$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const H$=Jt((e,t)=>Math.floor(e/t)),U$=se(zl,H$,null,"int32"),j$={kernelName:zl,backendName:"cpu",kernelFunc:U$};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function q$(e,t,n,s,r,a,o,i,l){const c=Et([s,a],n);for(let u=0;u<s;u++){const f=[];let h=0;for(let d=0;d<r;d++){const p=e[u*r+d];h+=p*o[d],f.push(p)}if(h<0||h>=l/a)throw new Error(`Invalid indices: ${f} does not index into ${i}`);for(let d=0;d<a;d++)c.values[u*a+d]=t.get(...t.indexToLoc(h*a+d))}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function G$(e,t,n){const s=Et(n,e.dtype);for(let r=0;r<s.size;++r){const o=s.indexToLoc(r).slice(),i=o[0],l=o[2],c=t.locToIndex([i,l]);o[2]=t.values[c];const u=e.locToIndex(o);0<=u&&u<e.values.length&&(s.values[r]=e.values[u])}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const K$=Jt((e,t)=>e>t?1:0),X$=se(Bl,K$,null,"bool"),Y$={kernelName:Bl,backendName:"cpu",kernelFunc:X$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Z$=Jt((e,t)=>e>=t?1:0),J$=se(Wl,Z$,null,"bool"),Q$={kernelName:Wl,backendName:"cpu",kernelFunc:J$};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const t_=Jt((e,t)=>e<t?1:0),e_=se(Gl,t_,null,"bool"),n_={kernelName:Gl,backendName:"cpu",kernelFunc:e_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const s_=Jt((e,t)=>e<=t?1:0),r_=se(Kl,s_,null,"bool"),a_={kernelName:Kl,backendName:"cpu",kernelFunc:r_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function o_(e,t,n){const s=(t-e)/(n-1),r=fe(n,"float32");r[0]=e;for(let a=1;a<r.length;a++)r[a]=r[a-1]+s;return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const i_=ds(e=>Math.log(e)),l_=ps(Xl,i_),c_={kernelName:Xl,backendName:"cpu",kernelFunc:l_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function u_(e,t,n,s){const r=ke(s,nt(n));for(let a=0;a<r.length;++a){const o=a*t;let i=e[o];for(let l=0;l<t;++l){const c=e[o+l];(Number.isNaN(c)||c>i)&&(i=c)}r[a]=i}return r}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const f_=Jt(((e,t)=>Math.max(e,t))),h_=se(tc,f_),d_={kernelName:tc,backendName:"cpu",kernelFunc:h_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const p_=Jt(((e,t)=>Math.min(e,t))),m_=se(ec,p_),g_={kernelName:ec,backendName:"cpu",kernelFunc:m_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const wm=Jt(((e,t)=>e*t)),y_=Gc(((e,t,n,s)=>({real:e*n-t*s,imag:e*s+t*n}))),Vo=se(sc,wm,y_),b_={kernelName:sc,backendName:"cpu",kernelFunc:Vo};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function w_(e,t,n){const s=Ic(-1,n);return wm([],t,s,e,n)}function k_(e){const{inputs:t,backend:n}=e,{x:s}=t;ft(s,"neg");const r=n.data.get(s.dataId).values,[a,o]=w_(r,s.shape,s.dtype);return n.makeTensorInfo(o,s.dtype,a)}const v_={kernelName:Yh,backendName:"cpu",kernelFunc:k_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const S_=Jt(((e,t)=>e!==t?1:0)),x_=se(rc,S_,null,"bool"),N_={kernelName:rc,backendName:"cpu",kernelFunc:x_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function km(e,t,n,s,r){const a=t.length,o=nt(t),i=yt(t),l=yt(r),c=ke(n,nt(r));for(let u=0;u<o;++u){const f=Sr(u,a,i),h=new Array(f.length);for(let p=0;p<h.length;p++)h[p]=f[s[p]];const d=pn(h,a,l);c[d]=e[u]}return c}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function _e(e){const{inputs:t,attrs:n,backend:s}=e,{x:r}=t,{perm:a}=n;ft(r,"transpose");const o=r.shape.length,i=new Array(o);for(let f=0;f<i.length;f++)i[f]=r.shape[a[f]];const l=s.data.get(r.dataId).values,c=km(l,r.shape,r.dtype,a,i);return{dataId:s.write(c,i,r.dtype),shape:i,dtype:r.dtype}}const I_={kernelName:Ca,backendName:"cpu",kernelFunc:_e};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function T_(e,t,n,s){const[r,a]=qn(e,s),o=xr(t,"int32"),i=fe(nt(r),o),l=nt(a);for(let c=0;c<i.length;++c){const u=c*l;let f=1;for(let h=0;h<l;++h)f*=n[u+h];i[c]=f}return{outVals:i,outShape:r,outDtype:o}}function $_(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s;ft(r,"prod");const i=r.shape.length,l=ae(a,r.shape),c=Nn(l,i);let u=l,f=r;const h=[];c!=null&&(f=_e({inputs:{x:r},backend:n,attrs:{perm:c}}),h.push(f),u=In(u.length,i));const d=n.data.get(f.dataId).values,{outVals:p,outShape:y,outDtype:g}=T_(f.shape,f.dtype,d,u);let m=y;return o&&(m=an(y,l)),h.forEach(w=>n.disposeIntermediateTensorInfo(w)),n.makeTensorInfo(m,g,p)}const __={kernelName:ad,backendName:"cpu",kernelFunc:$_};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E_(e,t,n){e.forEach((s,r)=>{if(s<0||s>=n){const a=Sr(r,t.length,yt(t)).join(",");throw new Error(`indices[${a}] = ${s} is not in [0, ${n})`)}})}function C_(e,t){for(let n=0;n<e.length;++n){const s=e[n],r=n===e.length-1?t:e[n+1].length;if(s.length===0)throw new Error("Ragged splits may not be empty");if(s[0]<0)throw new Error("Ragged splits must be non-negative");if(s[s.length-1]>r)throw new Error("Ragged splits must not point past values");for(let a=1;a<s.length;++a)if(s[a-1]>s[a])throw new Error("Ragged splits must be sorted in ascending order")}}function A_(e,t,n,s){const r=[];let a=0;const o=t.length-1+n.length,i=new Array(o).fill(null).map(()=>[0]);C_(n,s);let l=1;for(let c=0;c<t.length-1;++c){l*=t[c];const u=t[c+1];for(let f=1;f<l+1;++f)i[c].push(f*u)}for(let c=0;c<e.length;++c){let u=e[c],f=e[c]+1;for(let h=0;h<n.length;++h){const d=n[h],p=h+t.length-1;if(p>=0){const y=i[p],g=y[y.length-1]-d[u];for(let m=u;m<f;++m)i[p].push(d[m+1]+g)}u=d[u],f=d[f]}f!==u&&(r.push([u,f]),a+=f-u)}return{outSplits:i,valueSlices:r,numValues:a}}function D_(e){const t=[];for(let n=0;n<e.length;++n){const s=e[n].length,r=Qt("int32",s);t.push(r),e[n].forEach((a,o)=>r[o]=a)}return t}function cf(e,t){const n=e.slice(0,t);for(;n.length<t;)n.push(1);for(let s=t;s<e.length;s++)n[t-1]*=e[s];return n}function O_(e,t,n,s,r,a){const o=cf(t,2)[1],i=cf(a,2)[1];let l=0;for(const c of n)for(let u=c[0];u<c[1];++u){for(let f=0;f<s;++f)r[l*i+f]=e[u*o+f];++l}}function F_(e,t,n,s,r){const a=t.slice();a[0]=r;const o=Qt(n,nt(a)),i=e.length,l=i===0?0:i/t[0];return O_(e,t,s,l,o,a),[o,a]}function R_(e,t,n,s,r,a,o,i){if(e.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");const l=t[0][0]-1;if(E_(a,o,l),s.length===0)throw new Error("params.rank must be nonzero");const c=s[0],{outSplits:u,valueSlices:f,numValues:h}=A_(a,o,e,c),d=D_(u),p=F_(n,s,r,f,h);return[d,p[0],p[1]]}/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const uf=2147483647;function P_(e,t,n,s,r,a,o){if(t.length>1)throw new Error("starts must be a scalar or vector");if(r.length>1)throw new Error("limits must be a scalar or vector");if(o.length>1)throw new Error("deltas must be a scalar or vector");const i=t.length===0,l=r.length===0,c=o.length===0,u=[];i||u.push(t[0]),l||u.push(r[0]),c||u.push(o[0]);for(let g=1;g<u.length;++g)if(u[g]!==u[g-1])throw new Error("starts, limits, and deltas must have the same shape");const f=u.length===0?1:u[0],h=Qt("int32",f+1);h[0]=0;for(let g=0;g<f;++g){const m=i?e[0]:e[g],w=l?s[0]:s[g],S=c?a[0]:a[g];if(S===0)throw new Error("Requires delta != 0");let k;if(S>0&&w<m||S<0&&w>m)k=0;else if(k=Math.ceil(Math.abs((w-m)/S)),k>uf)throw new Error(`Requires ((limit - start) / delta) <= ${uf}`);h[g+1]=h[g]+k}const d=h[f],p=Qt(n,d);let y=0;for(let g=0;g<f;++g){const m=h[g+1]-h[g];let w=i?e[0]:e[g];const S=c?a[0]:a[g];for(let k=0;k<m;++k)p[y++]=w,w+=S}return[h,p]}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */var We=fn;class ro{constructor(t,n,s,r,a,o,i,l,c,u){this.shape=t,this.shapeShape=n,this.values=s,this.valuesShape=r,this.valuesDType=a,this.defaultValue=o,this.defaultValueShape=i,this.rowPartitionValues=l,this.rowPartitionValuesShapes=c,this.rowPartitionTypes=ZI(u),this.raggedRank=JI(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===We.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===We.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){const n=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case We.VALUE_ROWIDS:return ro.getMaxWidthValueRowID(n);case We.ROW_SPLITS:return ro.getMaxWidthRowSplit(n);default:throw new Error(`Cannot handle partition type ${We[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){const n=t.length;if(n===0||n===1)return 0;let s=0;for(let r=0;r<n-1;++r){const a=t[r+1]-t[r];a>s&&(s=a)}return s}static getMaxWidthValueRowID(t){const n=t.length;if(n===0)return 0;let s=0,r=t[0],a=0;for(let o=1;o<n;++o){const i=t[o];i!==r&&(r=i,a=Math.max(o-s,a),s=o)}return Math.max(n-s,a)}tensorShapeFromTensor(t,n,s=!0){if(n.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return hf(t,s)}calculateOutputSize(t){const n=this.valuesShape,s=this.defaultValueShape;QI(s,n);const r=this.tensorShapeFromTensor(this.shape,this.shapeShape),o=YI(this.raggedRank,r,n);o[0]<0&&(o[0]=t);for(let i=1;i<=this.raggedRank;++i)o[i]<0&&(o[i]=this.getMaxWidth(i));return o}calculateFirstParentOutputIndex(t,n,s){const r=Math.min(t,s),a=[];let o=0;for(let i=0;i<r;++i,o+=n)a.push(o);for(let i=r;i<t;++i)a.push(-1);return T(a.length===t,()=>"Final length of result must be equal to firstDimension."),a}calculateOutputIndexRowSplit(t,n,s,r){const a=t.length,o=[];for(let i=0;i<a-1;++i){const l=t[i+1]-t[i];let c=Math.min(r,l),u=n[i];u===-1&&(c=0);for(let f=0;f<c;++f)o.push(u),u+=s;for(let f=0;f<l-c;++f)o.push(-1)}if(a>0&&o.length!==t[a-1])throw new Error("Invalid row split size.");return o}calculateOutputIndexValueRowID(t,n,s,r){const a=t.length,o=[];if(a===0)return[];let i=0,l=t[0];if(l>=n.length)throw new Error(`Got currentValueRowId=${l}, which is not less than ${n.length}`);let c=n[l];o.push(c);for(let u=1;u<a;++u){const f=t[u];if(f===l)c>=0&&(++i,i<r?c+=s:c=-1);else{if(i=0,l=f,f>=n.length)throw new Error(`Got nextValueRowId=${f} which is not less than ${n.length}`);c=n[f]}o.push(c)}if(o.length!==t.length)throw new Error("Invalid row ids.");return o}calculateOutputIndex(t,n,s,r){const a=this.getRowPartitionTensor(t),o=this.getRowPartitionTypeByDimension(t);switch(o){case We.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(a,n,s,r);case We.ROW_SPLITS:if(a.length-1>n.length)throw new Error(`Row partition size is greater than output size: ${a.length-1} > ${n.length}`);return this.calculateOutputIndexRowSplit(a,n,s,r);default:throw new Error(`Unsupported partition type: ${We[o]}`)}}getFirstDimensionSize(){const t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");const n=this.rowPartitionTypes[0];switch(n){case We.FIRST_DIM_SIZE:return t[0];case We.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case We.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${We[n]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");const n=this.getFirstDimensionSize(),s=this.calculateOutputSize(n),r=new Array(this.raggedRank+1);r[r.length-1]=1;for(let l=r.length-2;l>=0;--l)r[l]=r[l+1]*s[l+1];const a=hf(s,!1),o=Qt(this.valuesDType,nt(a));if(r[0]*s[0]>0){let l=this.calculateFirstParentOutputIndex(n,r[0],s[0]);for(let c=1;c<=this.raggedRank;++c)l=this.calculateOutputIndex(c-1,l,r[c],s[c]);this.setOutput(this.raggedRank,l,o,a)}return[a,o]}setOutput(t,n,s,r){if(s.length===0)return;const a=this.values,o=s;let i=r.slice();i=i.slice(t+1);const l=nt(i),c=n.length;let u=this.defaultValue;if(u.length!==l&&u.length!==1){const p=this.defaultValueShape;Dt(()=>{const y=X(u,p);u=Lr(y,i).dataSync()})}let f=0,h=0,d=0;for(let p=0;p<=c;++p){let y=p<c?n[p]:-1;if(y===d){++d;continue}if(h<d){const g=a.subarray(f*l),m=o.subarray(h*l),w=(d-h)*l;ff(m,g,w)}if(p>=c){const g=s.length;y=Math.floor(g/l)}if(y>d)if(this.defaultValue.length===1)o.subarray(d*l,y*l).fill(this.defaultValue[0]),d=y;else for(;y>d;){const g=o.slice(d*l);ff(g,u,l),++d}y<0?(f=p+1,h=d):(f=p,h=d,d=h+1)}}}function ff(e,t,n){for(let s=0;s<n;s++)e[s]=t[s]}function hf(e,t){const n=[];for(let s of e){if(s<0){if(!t)throw new Error(`Dimension ${s} must be >= 0`);if(s<-1)throw new Error(`Dimension ${s} must be >= -1`);s=-1}n.push(s)}return n}function M_(e,t,n,s,r,a,o,i,l,c){return new ro(e,t,n,s,r,a,o,i,l,c).compute()}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function V_(e,t,n,s){const r=e===t,a=e<t&&n<0,o=t<e&&n>1;if(r||a||o)return fe(0,s);const i=Math.abs(Math.ceil((t-e)/n)),l=fe(i,s);t<e&&n===1&&(n=-1),l[0]=e;for(let c=1;c<l.length;c++)l[c]=l[c-1]+n;return l}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const L_=ds(e=>1/Math.sqrt(e)),z_=ps(uc,L_),B_={kernelName:uc,backendName:"cpu",kernelFunc:z_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function er(e,t,n,s,r,a,o,i,l,c){const u=[s/r,r],f=e.values,h=t.values;if(s===0)return Et(n,t.dtype);const d=l instanceof ee?l:Et(u,t.dtype);typeof l=="string"||typeof l=="number"?d.values.fill(l):typeof l=="boolean"&&d.values.fill(+l);for(let p=0;p<a;p++){const y=[];let g=0;for(let m=0;m<o;m++){const w=f[p*o+m];y.push(w),g+=w*i[m]}if(g<0||g>=s/r)throw new Error(`Invalid indices: ${y} does not index into ${n}`);for(let m=0;m<r;m++)c?d.values[g*r+m]+=h[p*r+m]:d.values[g*r+m]=t.rank===0?h[0]:h[p*r+m]}return d}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const vm=Pt(mc,e=>1/(1+Math.exp(-e))),W_={kernelName:mc,backendName:"cpu",kernelFunc:vm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function H_(e,t,n,s,r){const a=UI(s,t,n),o=nt(n),i=yt(s);if(a){const f=jI(t,i);return r==="string"?e.slice(f,f+o):e.subarray(f,f+o)}const l=r==="string"?oa(e):e,c=Et(s,r,l),u=Et(n,r);for(let f=0;f<u.size;++f){const h=u.indexToLoc(f),d=h.map((p,y)=>p+t[y]);u.set(c.get(...d),...h)}return r==="string"?MT(u.values):u.values}function zs(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{begin:a,size:o}=s;ft(r,"slice");const[i,l]=qI(r,a,o);WI(r,i,l);const c=n.data.get(r.dataId).values,u=H_(c,i,l,r.shape,r.dtype);return n.makeTensorInfo(l,r.dtype,u)}const U_={kernelName:wd,backendName:"cpu",kernelFunc:zs};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function j_(e,t,n,s,r,a,o){const i=t[0],l=a[0],c=new Array(l),u=new Array(i),f=t[1];if(l===0){if(i!==0)throw new Error(IT(i));const g=Qt(n,0),m=Qt(r,0);return[g,[0,f],m,c,u]}let h=!0,d=0;const p=new Array(l).fill(0);for(let g=0;g<i;++g){const m=e[g*f];if(m<0)throw new Error(TT(g,m));if(m>=l)throw new Error($T(g,m,l));++p[m],h=h&&m>=d,d=m}let y=!0;for(let g=0;g<l;++g){const m=p[g]===0;c[g]=m,y=y&&!m,p[g]=Math.max(p[g],1),g>0&&(p[g]+=p[g-1])}if(y&&h){const g=e,m=s;for(let w=0;w<i;++w)u[w]=w;return[g,[i,f],m,c,u]}else{const g=p[l-1],m=Qt(n,g*f),w=Qt(r,g),S=new Array(l).fill(0);for(let k=0;k<i;++k){const I=e[k*f],$=S[I],E=(I===0?0:p[I-1])+$;S[I]++;for(let D=0;D<f;++D)m[E*f+D]=e[k*f+D];w[E]=s[k],u[k]=E}for(let k=0;k<l;++k)if(S[k]===0){const $=k===0?0:p[k-1];m[$*f+0]=k;for(let E=1;E<f;++E)m[$*f+E]=0;w[$]=o}return[m,[g,f],w,c,u]}}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function q_(e,t,n,s,r){const a=nt(s),o=t[0],i=r.length,l=[];let c=1,u=-1;for(let g=0;g<i;++g){const m=r[g];if(m===-1){if(u!==-1)throw new Error(_T(u,g));u=g,l.push(1)}else{if(m<0)throw new Error(ET(g,m));c*=m,l.push(m)}}if(u!==-1){if(c<=0)throw new Error(CT());const g=Math.trunc(a/c);if(c*g!==a)throw new Error(AT(s,l));l[u]=g}if(nt(l)!==a)throw new Error(DT(s,l));const h=s.length,d=[];if(h>0){d[h-1]=1;for(let g=h-2;g>=0;--g)d[g]=d[g+1]*s[g+1]}const p=[];if(i>0){p[i-1]=1;for(let g=i-2;g>=0;--g)p[g]=p[g+1]*l[g+1]}const y=Qt(n,o*i);for(let g=0;g<o;++g){let m=0;for(let w=0;w<h;++w)m+=e[g*h+w]*d[w];for(let w=0;w<i;++w)y[g*i+w]=Math.trunc(m/p[w]),m%=p[w]}return[y,[o,i],l]}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Sm(e,t,n,s,r,a=!1,o=0){const i=s.length,l=[t[0],e.length/t[0]],c=l[1],f=i>0?r[i-1]+1:0;if(f<0)throw new Error(Ju());const h=t.slice();h[0]=f;const d=h.reduce((S,k)=>S*k,1),p=Qt(n,d);if(i===0)return f>0&&p.fill(o),[p,h];if(f<=0)throw new Error(Ju());let y=0,g=1,m=0,w=r[y];for(;;){let S=0;if(g<i){if(S=r[g],w===S){++g;continue}if(w>=S)throw new Error(OT())}if(w<0||w>=f)throw new Error(FT(w,f));w>m&&p.fill(o,m*c,w*c);for(let k=y;k<g;++k){const I=s[k];if(I<0||I>=l[0])throw new Error(RT(k,s[k],l[0]));for(let $=0;$<c;$++)p[w*c+$]+=e[I*c+$]}if(a)for(let k=0;k<c;k++)p[w*c+k]/=g-y;if(y=g,++g,m=w+1,w=S,g>i)break}return m<f&&p.fill(o,m*c,f*c),[p,h]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const G_=Pt(yc,e=>Math.sqrt(e)),K_={kernelName:yc,backendName:"cpu",kernelFunc:G_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const X_=Jt(((e,t)=>{const n=e-t;return n*n})),Y_=se(bc,X_),Z_={kernelName:bc,backendName:"cpu",kernelFunc:Y_};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const J_=ds((e,t)=>{const{pattern:n,replaceGlobal:s,rewrite:r}=t;return e.replace(new RegExp(n,s?"g":""),r)}),Q_=ps(wc,J_),tE={kernelName:wc,backendName:"cpu",kernelFunc:Q_};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eE(e,t,n,s){const r=Et(e,t.dtype);for(let a=0;a<r.size;a++){const o=r.indexToLoc(a),i=new Array(o.length);for(let l=0;l<i.length;l++)i[l]=o[l]*n[l]+s[l];r.set(t.get(...i),...o)}return r}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */class nE{constructor(t,n,s,r,a,o){this.separator=_s(t),this.nGramWidths=n,this.leftPad=_s(s),this.rightPad=_s(r),this.padWidth=a,this.preserveShort=o}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,n){const s=this.getPadWidth(n);return Math.max(0,t+2*s-n+1)}createNGrams(t,n,s,r,a,o){for(let i=0;i<a;++i){const l=this.getPadWidth(o),c=Math.max(0,l-i),u=Math.max(0,l-(a-(i+1))),f=o-(c+u),h=n+(c>0?0:i-l);let d=0;d+=c*this.leftPad.length;for(let w=0;w<f;++w)d+=t[h+w].length;d+=u*this.rightPad.length;const p=c+u+f-1;d+=p*this.separator.length,s[r+i]=new Uint8Array(d);const y=s[r+i];let g=0;const m=w=>w.forEach(S=>y[g++]=S);for(let w=0;w<c;++w)m(this.leftPad),m(this.separator);for(let w=0;w<f-1;++w)m(t[h+w]),m(this.separator);if(f>0){m(t[h+f-1]);for(let w=0;w<u;++w)m(this.separator),m(this.rightPad)}else{for(let w=0;w<u-1;++w)m(this.rightPad),m(this.separator);m(this.rightPad)}}}compute(t,n){const s=t.length,r=n.length;if(r>0){let l=n[0];if(l!==0)throw new Error(`First split value must be 0, got ${l}`);for(let c=1;c<r;++c){let u=n[c]>=l;if(u=u&&n[c]<=s,!u)throw new Error(`Invalid split value ${n[c]}, must be in [${l}, ${s}]`);l=n[c]}if(l!==s)throw new Error(`Last split value must be data size. Expected ${s}, got ${l}`)}const a=r-1,o=Qt("int32",r);if(s===0||r===0){const l=new Array(s);for(let c=0;c<=a;++c)o[c]=0;return[l,o]}o[0]=0;for(let l=1;l<=a;++l){const c=n[l]-n[l-1];let u=0;this.nGramWidths.forEach(f=>{u+=this.getNumNGrams(c,f)}),this.preserveShort&&c>0&&u===0&&(u=1),o[l]=o[l-1]+u}const i=new Array(o[a]);for(let l=0;l<a;++l){const c=n[l];let u=o[l];if(this.nGramWidths.forEach(f=>{const h=n[l+1]-n[l],d=this.getNumNGrams(h,f);this.createNGrams(t,c,i,u,d,f),u+=d}),this.preserveShort&&u===o[l]){const f=n[l+1]-n[l];if(f===0)continue;const h=f+2*this.padWidth;this.createNGrams(t,c,i,u,1,h)}}return[i,o]}}function sE(e,t,n,s,r,a,o,i){return new nE(n,s,r,a,o,i).compute(e,t)}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rE(e,t,n,s){if(!e.length)return;if(t.length===0){for(let a=0;a<e.length;++a)s.push(e.subarray(a,a+1));return}if(t.length===1){const a=t[0];let o=e.indexOf(a);for(;o!==-1;){const i=e.subarray(0,o);(!n||i.length!==0)&&s.push(i),e=e.subarray(o+1),o=e.indexOf(a)}(!n||e.length!==0)&&s.push(e);return}let r=0;for(let a=0;a<e.length+1;a++)if(a===e.length||t.indexOf(e[a])!==-1){const o=e.subarray(r,a);(!n||o.length!==0)&&s.push(o),r=a+1}}function aE(e,t,n){const s=e.length,r=[];let a=0,o=0;const i=new Array(s);for(let h=0;h<s;++h){const d=r.length;rE(e[h],t,n,r);const p=r.length-d;i[h]=p,a+=p,o=Math.max(o,p)}const l=Qt("int32",a*2),c=new Array(a),u=[s,o];let f=0;for(let h=0;h<s;++h)for(let d=0;d<i[h];++d)l[f*2]=h,l[f*2+1]=d,c[f]=r[f],++f;return[l,c,u]}/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oE(e,t){const n=Qt("int32",e.length);for(let s=0;s<e.length;++s)n[s]=eb(e[s]).modulo(t).getLowBitsUnsigned();return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const iE=Jt(((e,t)=>e-t)),lE=Gc(((e,t,n,s)=>({real:e-n,imag:t-s}))),Kc=se(kc,iE,lE),cE={kernelName:kc,backendName:"cpu",kernelFunc:Kc};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uE(e,t){const n=new Array(e.rank);for(let r=0;r<n.length;r++)n[r]=e.shape[r]*t[r];const s=Et(n,e.dtype);for(let r=0;r<s.values.length;++r){const a=s.indexToLoc(r),o=new Array(e.rank);for(let l=0;l<o.length;l++)o[l]=a[l]%e.shape[l];const i=e.locToIndex(o);s.values[r]=e.values[i]}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Pr=(e,t)=>{const n=t.value-e.value;return n===0?e.index-t.index:n};function xm(e,t,n=0,s=e.length-1){for(;s>n;){if(s-n>600){const i=s-n+1,l=t-n+1,c=Math.log(i),u=.5*Math.exp(2*c/3),f=.5*Math.sqrt(c*u*(i-u)/i)*Math.sign(l-i/2),h=Math.max(n,Math.floor(t-l*u/i+f)),d=Math.min(s,Math.floor(t+(i-l)*u/i+f));xm(e,t,h,d)}const r=e[t];let a=n,o=s;for(_r(e,n,t),Pr(e[s],r)>0&&_r(e,n,s);a<o;){for(_r(e,a,o),a++,o--;Pr(e[a],r)<0;)a=a+1;for(;Pr(e[o],r)>0;)o=o-1}Pr(e[n],r)===0?_r(e,n,o):(o=o+1,_r(e,o,s)),o<=t&&(n=o+1),t<=o&&(s=o-1)}}function fE(e,t,n,s,r){const a=t[t.length-1],[o,i]=[e.length/a,a],l=ke(n,o*s),c=ke("int32",o*s);for(let f=0;f<o;f++){const h=f*i,d=e.subarray(h,h+i);let p=new Array(d.length);d.forEach((w,S)=>p[S]={value:w,index:S}),s<p.length&&(xm(p,s),p=p.slice(0,s)),r&&p.sort(Pr);const y=f*s,g=l.subarray(y,y+s),m=c.subarray(y,y+s);for(let w=0;w<s;w++)g[w]=p[w].value,m[w]=p[w].index}const u=t.slice();return u[u.length-1]=s,[Et(u,n,l),Et(u,"int32",c)]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hE(e,t,n,s){const r=ae(t,n)[0],a=[1,n[0],1];for(let p=0;p<r;p++)a[0]*=n[p];a[1]=n[r];for(let p=r+1;p<n.length;p++)a[2]*=n[p];const o=new Map,i=new Int32Array(n[r]),l=new ee(a,s,e),c=[],u=a[0]===1&&a[2]===1;for(let p=0;p<n[r];p++){let y;if(u)y=e[p].toString();else{const m=[];for(let w=0;w<a[0];w++)for(let S=0;S<a[2];S++)m.push(l.get(w,p,S));y=m.join(",")}const g=o.get(y);if(g!=null)i[p]=g;else{const m=o.size;o.set(y,m),i[p]=m,c.push(p)}}const f=a.slice();f[1]=o.size;const h=new ee(f,s);c.forEach((p,y)=>{for(let g=0;g<a[0];g++)for(let m=0;m<a[2];m++)h.set(l.get(g,p,m),g,y,m)});const d=n.slice();return d[r]=f[1],{outputValues:h.values,outputShape:d,indices:i}}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */Sb("cpu",()=>new Mo,1);/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const Nm=Pt(Fl,e=>e>=0?e:Math.exp(e)-1),dE={kernelName:Fl,backendName:"cpu",kernelFunc:Nm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Im(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{alpha:a}=s;ft([r],"leakyRelu");const o=nt(r.shape),i=n.data.get(r.dataId).values,l=ke("float32",o);for(let c=0;c<i.length;c++)l[c]=i[c]<0?a*i[c]:i[c];return n.makeTensorInfo(r.shape,"float32",l)}const pE={kernelName:Lh,backendName:"cpu",kernelFunc:Im};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const mE=Jt((e,t)=>e<0?t*e:e);function Tm(e){const{inputs:t,backend:n}=e,{x:s,alpha:r}=t;ft([s,r],"prelu");const a=n.data.get(s.dataId).values,o=n.data.get(r.dataId).values,[i,l]=mE(s.shape,r.shape,a,o,"float32");return n.makeTensorInfo(l,"float32",i)}const gE={kernelName:rd,backendName:"cpu",kernelFunc:Tm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $m=Pt(ic,e=>Math.max(0,e)),yE={kernelName:ic,backendName:"cpu",kernelFunc:$m};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _m=Pt(lc,e=>Math.min(Math.max(0,e),6)),bE={kernelName:lc,backendName:"cpu",kernelFunc:_m};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ao(e,t,n,s,r){if(n==="linear")return kn({inputs:{x:t},backend:e});if(n==="relu")return $m({inputs:{x:t},backend:e});if(n==="elu")return Nm({inputs:{x:t},backend:e});if(n==="relu6")return _m({inputs:{x:t},backend:e});if(n==="prelu")return Tm({inputs:{x:t,alpha:s},backend:e});if(n==="leakyrelu")return Im({inputs:{x:t},backend:e,attrs:{alpha:r}});if(n==="sigmoid")return vm({inputs:{x:t},backend:e});throw new Error(`Activation ${n} has not been implemented for the CPU backend.`)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Ht(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{shape:a}=s,o=nt(r.shape),i=wy(a,o),l=nt(i);T(o===l,()=>`The new shape (${i}) has ${l} elements and the old shape (${r.shape}) has ${o} elements. The new shape and old shape must have the same number of elements.`),n.incRef(r.dataId);const c=n.data.get(r.dataId);if(c.complexTensorInfos!=null){const u=c.complexTensorInfos.real,f=c.complexTensorInfos.imag;u.shape=i,f.shape=i}return{dataId:r.dataId,shape:i,dtype:r.dtype}}const wE={kernelName:fd,backendName:"cpu",kernelFunc:Ht};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Em(e){const{inputs:t,backend:n,attrs:s}=e,{a:r,b:a}=t,{transposeA:o,transposeB:i}=s;ft([r,a],"matMul");const l=r.shape.length,c=a.shape.length,u=o?r.shape[l-2]:r.shape[l-1],f=i?a.shape[c-1]:a.shape[c-2],h=o?r.shape[l-1]:r.shape[l-2],d=i?a.shape[c-2]:a.shape[c-1],p=r.shape.slice(0,-2),y=a.shape.slice(0,-2),g=nt(p),m=nt(y),S=Yt(r.shape.slice(0,-2),a.shape.slice(0,-2)).concat([h,d]);T(u===f,()=>`Error in matMul: inner shapes (${u}) and (${f}) of Tensors with shapes ${r.shape} and ${a.shape} and transposeA=${o} and transposeB=${i} must match.`);const k=o?[g,u,h]:[g,h,u],I=i?[m,d,f]:[m,f,d],$=Ht({inputs:{x:r},backend:n,attrs:{shape:k}}),E=Ht({inputs:{x:a},backend:n,attrs:{shape:I}}),D=o?$.shape[1]:$.shape[2],_=o?$.shape[2]:$.shape[1],x=i?E.shape[1]:E.shape[2],v=Math.max(g,m),R=n.data.get($.dataId).values,P=n.data.get(E.dataId).values,V=yt($.shape),M=yt(E.shape),[L,W,z]=o?[V[0],1,V[1]]:[V[0],V[1],1],[H,K,Y]=i?[1,M[1],M[0]]:[M[1],1,M[0]],Z=_*x,Q=Et([v,_,x],$.dtype),ot=Q.values,at=n.blockSize;for(let ct=0;ct<v;ct++){const dt=ct%g,mt=ct%m;for(let pt=0;pt<_;pt+=at){const kt=Math.min(pt+at,_);for(let It=0;It<x;It+=at){const C=Math.min(It+at,x);for(let F=0;F<D;F+=at){const B=Math.min(F+at,D);for(let q=pt;q<kt;q++)for(let U=It;U<C;U++){let G=0;for(let et=F;et<B;et++){const rt=R[dt*L+q*W+et*z],tt=P[et*H+U*K+mt*Y];G+=rt*tt}ot[ct*Z+(q*x+U)]+=G}}}}}return n.disposeIntermediateTensorInfo($),n.disposeIntermediateTensorInfo(E),n.makeTensorInfo(S,Q.dtype,Q.values)}const kE={kernelName:ih,backendName:"cpu",kernelFunc:Em};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function vE(e){const{inputs:t,backend:n,attrs:s}=e,{a:r,b:a,bias:o,preluActivationWeights:i}=t,{transposeA:l,transposeB:c,activation:u,leakyreluAlpha:f}=s;let h,d,p;const y=[];h=Em({inputs:{a:r,b:a},attrs:{transposeA:l,transposeB:c},backend:n}),o&&(d=mr({inputs:{a:h,b:o},backend:n}),y.push(h),h=d),u&&(p=ao(n,h,u,i,f),y.push(h),h=p);for(const m of y)n.disposeIntermediateTensorInfo(m);return h}const SE={kernelName:xi,backendName:"cpu",kernelFunc:vE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const xE=Pt(kl,e=>Math.acos(e)),NE={kernelName:kl,backendName:"cpu",kernelFunc:xE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const IE=Pt(vl,e=>Math.acosh(e)),TE={kernelName:vl,backendName:"cpu",kernelFunc:IE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $E(e){const{inputs:t,backend:n}=e,s=t;ft(t,"addN");const r=s.map(i=>n.data.get(i.dataId).values),a=Et(s[0].shape,s[0].dtype),o=a.values;for(let i=0;i<s.length;i++){const l=r[i];for(let c=0;c<o.length;c++)o[c]+=l[c]}return n.makeTensorInfo(a.shape,a.dtype,a.values)}const _E={kernelName:th,backendName:"cpu",kernelFunc:$E};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function EE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s;ft(r,"all");const i=ae(a,r.shape);let l=i;const c=Nn(l,r.shape.length);let u=r;c!=null&&(u=_e({inputs:{x:r},backend:n,attrs:{perm:c}}),l=In(l.length,r.shape.length)),Us("all",l,u.shape.length);const[f,h]=qn(u.shape,l),d=nt(h),p=fe(nt(f),u.dtype),y=n.data.get(u.dataId).values;for(let m=0;m<p.length;++m){const w=m*d;let S=y[w];for(let k=0;k<d;++k){const I=y[w+k];S=S&&I}p[m]=S}c!=null&&n.disposeIntermediateTensorInfo(u);const g=n.makeTensorInfo(f,u.dtype,p);if(o){const m=an(f,i),w=Ht({inputs:{x:g},backend:n,attrs:{shape:m}});return n.disposeIntermediateTensorInfo(g),w}return g}const CE={kernelName:eh,backendName:"cpu",kernelFunc:EE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function AE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s;ft(r,"any");const i=ae(a,r.shape);let l=i;const c=Nn(l,r.shape.length);let u=r;c!=null&&(u=_e({inputs:{x:r},backend:n,attrs:{perm:c}}),l=In(l.length,r.shape.length)),Us("any",l,u.shape.length);const[f,h]=qn(u.shape,l),d=nt(h),p=fe(nt(f),u.dtype),y=n.data.get(u.dataId).values;for(let m=0;m<p.length;++m){const w=m*d;let S=y[w];for(let k=0;k<d;++k){const I=y[w+k];S=S||I}p[m]=S}c!=null&&n.disposeIntermediateTensorInfo(u);const g=n.makeTensorInfo(f,u.dtype,p);if(o){const m=an(f,i),w=Ht({inputs:{x:g},backend:n,attrs:{shape:m}});return n.disposeIntermediateTensorInfo(g),w}return g}const DE={kernelName:nh,backendName:"cpu",kernelFunc:AE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function OE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a}=s;ft(r,"argMax");let o=ae(a,r.shape);const i=Nn(o,r.shape.length);let l=r;const c=[];i!=null&&(l=_e({inputs:{x:r},backend:n,attrs:{perm:i}}),c.push(l),o=In(o.length,l.shape.length)),o=[o[0]],Us("argMax",o,l.shape.length);const[u,f]=qn(l.shape,o),h=nt(u),d=fe(h,"int32"),p=nt(f),y=n.data.get(l.dataId).values;for(let g=0;g<d.length;++g){const m=g*p;let w=y[m],S=0;for(let k=0;k<p;++k){const I=y[m+k];I>w&&(w=I,S=k)}d[g]=S}return c.forEach(g=>n.disposeIntermediateTensorInfo(g)),n.makeTensorInfo(u,"int32",d)}const FE={kernelName:sh,backendName:"cpu",kernelFunc:OE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function RE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a}=s;ft(r,"argMin");let o=ae(a,r.shape);const i=Nn(o,r.shape.length);let l=r;const c=[];i!=null&&(l=_e({inputs:{x:r},backend:n,attrs:{perm:i}}),c.push(l),o=In(o.length,l.shape.length)),o=[o[0]],Us("argMin",o,l.shape.length);const[u,f]=qn(l.shape,o),h=nt(u),d=fe(h,"int32"),p=nt(f),y=n.data.get(l.dataId).values;for(let g=0;g<d.length;++g){const m=g*p;let w=y[m],S=0;for(let k=0;k<p;++k){const I=y[m+k];I<w&&(w=I,S=k)}d[g]=S}return c.forEach(g=>n.disposeIntermediateTensorInfo(g)),n.makeTensorInfo(u,"int32",d)}const PE={kernelName:rh,backendName:"cpu",kernelFunc:RE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ME=Pt(Sl,e=>Math.asin(e)),VE={kernelName:Sl,backendName:"cpu",kernelFunc:ME};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LE=Pt(xl,e=>Math.asinh(e)),zE={kernelName:xl,backendName:"cpu",kernelFunc:LE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const BE=Pt(Nl,e=>Math.atan(e)),WE={kernelName:Nl,backendName:"cpu",kernelFunc:BE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const HE=Jt((e,t)=>Math.atan2(e,t)),UE=se(Tl,HE),jE={kernelName:Tl,backendName:"cpu",kernelFunc:UE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const qE=Pt(Il,e=>Math.atanh(e)),GE={kernelName:Il,backendName:"cpu",kernelFunc:qE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Xc(e,t,n,s,r,a){const o=r.strideHeight,i=r.strideWidth,l=r.dilationHeight,c=r.dilationWidth,u=r.effectiveFilterHeight,f=r.effectiveFilterWidth,h=r.padInfo.top,d=r.padInfo.left,p=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,y=Et(r.outShape,n),g=y.values,m=r.outShape[1]*r.outShape[2]*r.outShape[3],w=r.outShape[2]*r.outShape[3],S=r.outShape[3];for(let k=0;k<r.batchSize;++k){const I=k*m,$=k*s[0];for(let E=0;E<r.inChannels;++E)for(let D=0;D<r.outHeight;++D){const _=D*o-h,x=Math.max(0,_),v=Math.min(r.inHeight,u+_),R=I+D*w;for(let P=0;P<r.outWidth;++P){const V=P*i-d,M=Math.max(0,V),L=Math.min(r.inWidth,f+V);let W=p,z=0,H=0;for(let Y=x;Y<v;Y+=l){const Z=$+Y*s[1];for(let Q=M;Q<L;Q+=c){const ot=Z+Q*s[2],at=e[ot+E];a==="max"&&at>W?W=at:a==="avg"&&(z+=at,H++)}if(isNaN(W))break}const K=R+P*S+E;g[K]=a==="avg"?z/H:W}}}return y}function Cm(e,t,n,s,r=!1,a=!1){const o=Et(s.outShape,"int32"),i=s.strideHeight,l=s.strideWidth,c=s.dilationHeight,u=s.dilationWidth,f=s.effectiveFilterHeight,h=s.effectiveFilterWidth,d=s.padInfo.top,p=s.padInfo.left,y=Et(t,n,e);for(let g=0;g<s.batchSize;++g)for(let m=0;m<s.inChannels;++m)for(let w=0;w<s.outHeight;++w){const S=w*i-d;let k=S;for(;k<0;)k+=c;const I=Math.min(s.inHeight,f+S);for(let $=0;$<s.outWidth;++$){const E=$*l-p;let D=E;for(;D<0;)D+=u;const _=Math.min(s.inWidth,h+E);let x=Number.NEGATIVE_INFINITY,v=-1;for(let R=k;R<I;R+=c){const P=R-S;for(let V=D;V<_;V+=u){const M=V-E,L=y.get(g,R,V,m);L>x&&(x=L,r?v=a?((g*s.inHeight+R)*s.inWidth+V)*s.inChannels+m:(R*s.inWidth+V)*s.inChannels+m:v=P*h+M)}}o.set(v,g,w,$,m)}}return o}function Am(e,t,n,s,r,a){const o=r.strideDepth,i=r.strideHeight,l=r.strideWidth,c=r.dilationDepth,u=r.dilationHeight,f=r.dilationWidth,h=r.effectiveFilterDepth,d=r.effectiveFilterHeight,p=r.effectiveFilterWidth,y=r.padInfo.front,g=r.padInfo.top,m=r.padInfo.left,w=a==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,S=Et(r.outShape,n),k=S.values,I=r.outShape[1]*r.outShape[2]*r.outShape[3]*r.outShape[4],$=r.outShape[2]*r.outShape[3]*r.outShape[4],E=r.outShape[3]*r.outShape[4],D=r.outShape[4];for(let _=0;_<r.batchSize;++_){const x=_*I,v=_*s[0];for(let R=0;R<r.inChannels;++R)for(let P=0;P<r.outDepth;++P){const V=P*o-y;let M=V;for(;M<0;)M+=c;const L=Math.min(r.inDepth,h+V),W=x+P*$;for(let z=0;z<r.outHeight;++z){const H=z*i-g;let K=H;for(;K<0;)K+=u;const Y=Math.min(r.inHeight,d+H),Z=W+z*E;for(let Q=0;Q<r.outWidth;++Q){const ot=Q*l-m;let at=ot;for(;at<0;)at+=f;const ct=Math.min(r.inWidth,p+ot),dt=Z+Q*D;let mt=w,pt=0,kt=0;for(let C=M;C<L;C+=c){const F=v+C*s[1];for(let B=K;B<Y;B+=u){const q=F+B*s[2];for(let U=at;U<ct;U+=f){const G=q+U*s[3],et=e[G+R];if(a==="max"&&et>mt?mt=et:a==="avg"&&(pt+=et,kt++),isNaN(mt))break}if(isNaN(mt))break}if(isNaN(mt))break}const It=dt+R;k[It]=a==="avg"?pt/Math.max(kt,1):mt}}}}return S}function KE(e,t){const n=Et(t.outShape,"int32"),s=t.strideDepth,r=t.strideHeight,a=t.strideWidth,o=t.dilationDepth,i=t.dilationHeight,l=t.dilationWidth,c=t.effectiveFilterDepth,u=t.effectiveFilterHeight,f=t.effectiveFilterWidth,h=t.padInfo.front,d=t.padInfo.top,p=t.padInfo.left;for(let y=0;y<t.batchSize;++y)for(let g=0;g<t.inChannels;++g)for(let m=0;m<t.outDepth;++m){const w=m*s-h;let S=w;for(;S<0;)S+=o;const k=Math.min(t.inDepth,c+w);for(let I=0;I<t.outHeight;++I){const $=I*r-d;let E=$;for(;E<0;)E+=i;const D=Math.min(t.inHeight,u+$);for(let _=0;_<t.outWidth;++_){const x=_*a-p;let v=x;for(;v<0;)v+=l;const R=Math.min(t.inWidth,f+x);let P=Number.NEGATIVE_INFINITY,V=-1;for(let M=S;M<k;M+=o){const L=M-w;for(let W=E;W<D;W+=i){const z=W-$;for(let H=v;H<R;H+=l){const K=H-x,Y=e.get(y,M,W,H,g);Y>=P&&(P=Y,V=L*u*f+z*u+K)}}}n.set(V,y,m,I,_,g)}}}return n}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function XE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t;ft(r,"avgPool");const{filterSize:a,strides:o,pad:i,dimRoundingMode:l}=s,c=1;T(sn(o,c),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${o} and dilations '${c}'`);const u=Nr(r.shape,a,o,c,i,l);let f;if(u.filterWidth===1&&u.filterHeight===1&&Ke(u.inShape,u.outShape))f=kn({inputs:{x:r},backend:n});else{const h=n.data.get(r.dataId).values,d=yt(r.shape),p=Xc(h,r.shape,r.dtype,d,u,"avg");f=n.makeTensorInfo(u.outShape,r.dtype,p.values)}return f}const YE={kernelName:ah,backendName:"cpu",kernelFunc:XE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ZE(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{filterSize:a,strides:o,pad:i,dimRoundingMode:l,dataFormat:c}=s;ft(r,"avgPool3d");const u=$o(r.shape,a,o,1,i,l,c),f=n.data.get(r.dataId).values,h=Am(f,r.shape,r.dtype,yt(r.shape),u,"avg");return n.makeTensorInfo(h.shape,"float32",h.values)}const JE={kernelName:oh,backendName:"cpu",kernelFunc:ZE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function QE(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:a}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:c}=s;ft([r,a],"avgPool3DGrad");const u=$o(a.shape,o,i,1,l,c),f=u.strideDepth,h=u.strideHeight,d=u.strideWidth,p=u.filterDepth,y=u.filterHeight,g=u.filterWidth,m=u.dilationDepth,w=u.dilationHeight,S=u.dilationWidth,k=u.effectiveFilterDepth,I=u.effectiveFilterHeight,$=u.effectiveFilterWidth,E=k-1-u.padInfo.front,D=$-1-u.padInfo.left,_=I-1-u.padInfo.top,x=Et(a.shape,"float32"),v=1/(p*y*g),R=n.bufferSync(r);for(let P=0;P<u.batchSize;++P)for(let V=0;V<u.inChannels;++V)for(let M=0;M<u.inDepth;++M)for(let L=0;L<u.inHeight;++L)for(let W=0;W<u.inWidth;++W){const z=M-E,H=L-_,K=W-D;let Y=0;for(let Z=0;Z<k;Z+=m){const Q=(z+Z)/f;if(!(Q<0||Q>=u.outDepth||Math.floor(Q)!==Q))for(let ot=0;ot<I;ot+=w){const at=(H+ot)/h;if(!(at<0||at>=u.outHeight||Math.floor(at)!==at))for(let ct=0;ct<$;ct+=S){const dt=(K+ct)/d;if(dt<0||dt>=u.outWidth||Math.floor(dt)!==dt)continue;const mt=R.get(P,Q,at,dt,V);Y+=mt}}}x.set(Y*v,P,M,L,W,V)}return n.makeTensorInfo(x.shape,x.dtype,x.values)}const tC={kernelName:Ry,backendName:"cpu",kernelFunc:QE};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function eC(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:a}=t,o=a;ft([r,a],"avgPoolGrad");const{filterSize:i,strides:l,pad:c}=s,u=Nr(o.shape,i,l,1,c),f=u.strideHeight,h=u.strideWidth,d=u.filterHeight,p=u.filterWidth,y=u.dilationHeight,g=u.dilationWidth,m=u.effectiveFilterHeight,w=u.effectiveFilterWidth,S=w-1-u.padInfo.left,k=m-1-u.padInfo.top,I=Et(o.shape,"float32"),$=1/(d*p),E=n.data.get(r.dataId).values,D=Et(r.shape,"float32",E);for(let _=0;_<u.batchSize;++_)for(let x=0;x<u.inChannels;++x)for(let v=0;v<u.inHeight;++v)for(let R=0;R<u.inWidth;++R){const P=v-k,V=R-S;let M=0;for(let L=0;L<m;L+=y){const W=(P+L)/f;if(!(W<0||W>=u.outHeight||Math.floor(W)!==W))for(let z=0;z<w;z+=g){const H=(V+z)/h;if(H<0||H>=u.outWidth||Math.floor(H)!==H)continue;const K=D.get(_,W,H,x);M+=K}}I.set(M*$,_,v,R,x)}return n.makeTensorInfo(I.shape,I.dtype,I.values)}const nC={kernelName:Fy,backendName:"cpu",kernelFunc:eC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function sC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,scale:a,offset:o,mean:i,variance:l}=t;T(i.shape.length===l.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),T(o==null||i.shape.length===o.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),T(a==null||i.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),ft([r,i,l,a,o],"batchNorm");let{varianceEpsilon:c}=s;c==null&&(c=.001);const u=n.data.get(r.dataId).values,f=n.data.get(i.dataId).values,h=n.data.get(l.dataId).values,d=a?n.data.get(a.dataId).values:new Float32Array([1]),p=o?n.data.get(o.dataId).values:new Float32Array([0]),y=new Float32Array(u.length),g=p.length,m=d.length,w=h.length,S=f.length;let k=0,I=0,$=0,E=0;for(let D=0;D<u.length;++D)y[D]=p[k++]+(u[D]-f[I++])*d[$++]/Math.sqrt(h[E++]+c),k>=g&&(k=0),I>=S&&(I=0),$>=m&&($=0),E>=w&&(E=0);return n.makeTensorInfo(r.shape,r.dtype,y)}const rC={kernelName:Fh,backendName:"cpu",kernelFunc:sC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function aC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockShape:a,crops:o}=s;ft([r],"batchToSpaceND");const i=a.reduce((m,w)=>m*w),l=cm(r.shape,a,i),c=um(l.length,a.length),u=fm(r.shape,a,i),f=eT(o,a.length),h=nT(u,o,a.length),d=Ht({inputs:{x:r},backend:n,attrs:{shape:l}}),p=_e({inputs:{x:d},backend:n,attrs:{perm:c}}),y=Ht({inputs:{x:p},backend:n,attrs:{shape:u}}),g=zs({inputs:{x:y},backend:n,attrs:{begin:f,size:h}});return n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(y),g}const oC={kernelName:lh,backendName:"cpu",kernelFunc:aC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function iC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,weights:a}=t,{size:o}=s,i=n.data.get(r.dataId).values,l=n.data.get(a.dataId).values,c=gm(i,l,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,c)}const lC={kernelName:ch,backendName:"cpu",kernelFunc:iC};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function cC(e){const{inputs:t,backend:n}=e,{s0:s,s1:r}=t,a=n.data.get(s.dataId).values,o=n.data.get(r.dataId).values,i=Yt(Array.from(a),Array.from(o));return n.makeTensorInfo([i.length],"int32",Int32Array.from(i))}const uC={kernelName:uh,backendName:"cpu",kernelFunc:cC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fC=Pt(Cl,(e,t)=>{const n=t;return e>n.clipValueMax?n.clipValueMax:e<n.clipValueMin?n.clipValueMin:e}),hC={kernelName:Cl,backendName:"cpu",kernelFunc:fC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const dC=e=>{const{x:t}=e.inputs,n=e.backend,s=new Float32Array(nt(t.shape)),r=n.data.get(t.dataId),a=r.complexTensorInfos.real,o=r.complexTensorInfos.imag,i=n.data.get(a.dataId).values,l=n.data.get(o.dataId).values;for(let c=0;c<i.length;c++){const u=i[c],f=l[c];s[c]=Math.hypot(u,f)}return n.makeOutput(s,t.shape,"float32")},pC={kernelName:hh,backendName:"cpu",kernelFunc:dC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gr(e){const{inputs:t,backend:n}=e,{input:s}=t,r=n.data.get(s.dataId).complexTensorInfos.imag,a=n.data.get(r.dataId).values;return n.makeTensorInfo(r.shape,r.dtype,a)}const mC={kernelName:Vh,backendName:"cpu",kernelFunc:gr};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function yr(e){const{inputs:t,backend:n,attrs:s}=e,{axis:r}=s,a=ae(r,t[0].shape)[0],o=t.map(y=>y.shape);XI(o,a);let i=ii(t.map(y=>y.shape),a);if(nt(i)===0)return n.makeTensorInfo(i,t[0].dtype,[]);const l=t.filter(y=>nt(y.shape)>0);if(l.length===1)return kn({inputs:{x:l[0]},backend:n});if(l[0].dtype==="complex64"){const y=l.map(k=>Ls({inputs:{input:k},backend:n})),g=l.map(k=>gr({inputs:{input:k},backend:n})),m=yr({inputs:y,backend:n,attrs:{axis:a}}),w=yr({inputs:g,backend:n,attrs:{axis:a}}),S=Re({inputs:{real:m,imag:w},backend:n});return y.forEach(k=>n.disposeIntermediateTensorInfo(k)),g.forEach(k=>n.disposeIntermediateTensorInfo(k)),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(w),S}const c=l.map(y=>{const m=[-1,nt(y.shape.slice(a))];return Ht({inputs:{x:y},backend:n,attrs:{shape:m}})}),u=c.map(y=>({vals:n.data.get(y.dataId).values,shape:y.shape}));i=ii(c.map(y=>y.shape),1);const f=c[0].shape[0]===1,h=D$(u,i,t[0].dtype,f),d=ii(l.map(y=>y.shape),a),p=n.makeTensorInfo(d,t[0].dtype,h);return c.forEach(y=>n.disposeIntermediateTensorInfo(y)),p}const gC={kernelName:dh,backendName:"cpu",kernelFunc:yr};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Dm(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:a}=t,{strides:o,pad:i,dataFormat:l,dilations:c,dimRoundingMode:u}=s;ft([r,a],"conv2d");const f=Eo(l),h=xn(r.shape,a.shape,o,c,i,u,!1,f),d=h.filterHeight,p=h.filterWidth,y=h.dilationHeight,g=h.dilationWidth,m=h.padInfo.left,w=h.padInfo.top,S=h.dataFormat==="channelsLast",k=new ee(h.outShape,r.dtype),I=yt(r.shape),$=yt(a.shape),E=I[0],D=S?I[1]:I[2],_=S?I[2]:1,x=S?1:I[1],v=k.strides[0],R=S?k.strides[1]:k.strides[2],P=S?k.strides[2]:1,V=S?1:k.strides[1],M=n.data.get(r.dataId).values,L=n.data.get(a.dataId).values,W=k.values;for(let z=0;z<h.batchSize;++z){const H=z*E,K=z*v;for(let Y=0;Y<h.outHeight;++Y){const Z=K+Y*R,Q=Y*h.strideHeight-w;for(let ot=0;ot<d;++ot){const at=Q+ot*y;if(at<0||at>=h.inHeight)continue;const ct=ot*$[0],dt=H+at*D;for(let mt=0;mt<h.outWidth;++mt){const pt=Z+mt*P,kt=mt*h.strideWidth-m;for(let It=0;It<p;++It){const C=kt+It*g;if(C<0||C>=h.inWidth)continue;const F=ct+It*$[1],B=dt+C*_;let q=F;for(let U=0;U<h.inChannels;++U){const G=M[B+U*x];for(let et=0;et<h.outChannels;++et)W[pt+et*V]+=G*L[q+et];q+=h.outChannels}}}}}}return n.makeTensorInfo(k.shape,k.dtype,W)}const yC={kernelName:ph,backendName:"cpu",kernelFunc:Dm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:a}=t,{strides:o,pad:i,dataFormat:l,dimRoundingMode:c,filterShape:u}=s;ft([r,a],"conv2dBackpropFilter");const f=Eo(l),h=xn(r.shape,u,o,1,i,c,!1,f),{strideHeight:d,strideWidth:p,filterHeight:y,filterWidth:g}=h,m=h.dataFormat==="channelsLast",w=new ee(h.filterShape,"float32"),S=h.padInfo.left,k=h.padInfo.top,I=n.data.get(r.dataId).values,$=n.data.get(a.dataId).values,E=new ee(r.shape,r.dtype,I),D=new ee(a.shape,a.dtype,$);for(let _=0;_<y;++_){const x=Math.max(0,Math.ceil((k-_)/d)),v=Math.min(h.outHeight,(h.inHeight+k-_)/d);for(let R=0;R<g;++R){const P=Math.max(0,Math.ceil((S-R)/p)),V=Math.min(h.outWidth,(h.inWidth+S-R)/p);for(let M=0;M<h.inChannels;++M)for(let L=0;L<h.outChannels;++L){let W=0;for(let z=0;z<h.batchSize;++z)for(let H=x;H<v;++H){const K=_+H*d-k;for(let Y=P;Y<V;++Y){const Z=R+Y*p-S;m?W+=E.get(z,K,Z,M)*D.get(z,H,Y,L):W+=E.get(z,M,K,Z)*D.get(z,L,H,Y)}}w.set(W,_,R,M,L)}}}return n.makeTensorInfo(w.shape,w.dtype,w.values)}const wC={kernelName:mh,backendName:"cpu",kernelFunc:bC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function kC(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:a}=t,{inputShape:o,strides:i,pad:l,dataFormat:c,dimRoundingMode:u}=s;ft([r,a],"conv2dBackpropInput");const f=yt(a.shape),h=yt(r.shape);let d=Eo(c);const p=xn(o,a.shape,i,1,l,u,!1,d),y=new ee(p.inShape,"float32"),g=y.values,m=n.data.get(r.dataId).values,w=n.data.get(a.dataId).values,[S,k,I]=f,{batchSize:$,filterHeight:E,filterWidth:D,inChannels:_,inHeight:x,inWidth:v,outChannels:R,outHeight:P,outWidth:V,strideHeight:M,strideWidth:L}=p;d=p.dataFormat;const W=E-1-p.padInfo.top,z=D-1-p.padInfo.left,H=d==="channelsLast",K=y.strides[0],Y=H?y.strides[1]:y.strides[2],Z=H?y.strides[2]:1,Q=H?1:y.strides[1],ot=h[0],at=H?h[1]:h[2],ct=H?h[2]:1,dt=H?1:h[1];for(let mt=0;mt<$;++mt)for(let pt=0;pt<_;++pt)for(let kt=0;kt<x;++kt){const It=kt-W,C=Math.max(0,Math.ceil(It/M)),F=Math.min(P,(E+It)/M);for(let B=0;B<v;++B){const q=B-z,U=Math.max(0,Math.ceil(q/L)),G=Math.min(V,(D+q)/L);let et=0;for(let tt=C;tt<F;++tt){const J=tt*M-It;for(let ht=U;ht<G;++ht){const it=ht*L-q,ut=ot*mt+at*tt+ct*ht,gt=S*(E-1-J)+k*(D-1-it)+I*pt;for(let St=0;St<R;++St){const Ct=m[ut+dt*St],_t=w[gt+St];et+=Ct*_t}}}const rt=K*mt+Y*kt+Z*B+Q*pt;g[rt]=et}}return n.makeTensorInfo(y.shape,y.dtype,y.values)}const vC={kernelName:gh,backendName:"cpu",kernelFunc:kC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function SC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:a}=t,{strides:o,pad:i,dilations:l}=s;ft([r,a],"conv3d");const c=_o(r.shape,a.shape,o,l,i),{filterDepth:u,filterHeight:f,filterWidth:h,dilationDepth:d,dilationHeight:p,dilationWidth:y,padInfo:g}=c,m=g.front,w=g.left,S=g.top,k=new ee(c.outShape,r.dtype),I=n.data.get(r.dataId).values,$=n.data.get(a.dataId).values,E=k.values,D=yt(r.shape),_=yt(a.shape);for(let x=0;x<c.batchSize;++x){const v=x*D[0],R=x*k.strides[0];for(let P=0;P<c.outDepth;++P){const V=R+P*k.strides[1],M=P*c.strideDepth-m;for(let L=0;L<u;++L){const W=M+L*d;if(W<0||W>=c.inDepth)continue;const z=L*_[0],H=v+W*D[1];for(let K=0;K<c.outHeight;++K){const Y=V+K*k.strides[2],Z=K*c.strideHeight-S;for(let Q=0;Q<f;++Q){const ot=Z+Q*p;if(ot<0||ot>=c.inHeight)continue;const at=z+Q*_[1],ct=H+ot*D[2];for(let dt=0;dt<c.outWidth;++dt){const mt=Y+dt*c.outChannels,pt=dt*c.strideWidth-w;for(let kt=0;kt<h;++kt){const It=pt+kt*y;if(It<0||It>=c.inWidth)continue;const C=at+kt*_[2],F=ct+It*c.inChannels;let B=C;for(let q=0;q<c.inChannels;++q){const U=I[F+q];for(let G=0;G<c.outChannels;++G)E[mt+G]+=U*$[B+G];B+=c.outChannels}}}}}}}}return n.makeTensorInfo(k.shape,k.dtype,k.values)}const xC={kernelName:yh,backendName:"cpu",kernelFunc:SC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function NC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:a}=t,{strides:o,pad:i,filterShape:l}=s;ft([r,a],"conv3dBackpropFilterV2");const c=yt(r.shape),u=yt(a.shape),f=_o(r.shape,l,o,1,i),h=f.strideDepth,d=f.strideHeight,p=f.strideWidth,y=f.filterDepth,g=f.filterHeight,m=f.filterWidth,w=new ee(f.filterShape,"float32"),S=w.values,[k,I,$,E]=w.strides,D=n.data.get(a.dataId).values,[_,x,v,R]=u,P=n.data.get(r.dataId).values,[V,M,L,W]=c,z=f.padInfo.front,H=f.padInfo.left,K=f.padInfo.top;for(let Y=0;Y<y;++Y){const Z=Math.max(0,Math.ceil((z-Y)/h)),Q=Math.min(f.outDepth,(f.inDepth+z-Y)/h),ot=Y*k;for(let at=0;at<g;++at){const ct=Math.max(0,Math.ceil((K-at)/d)),dt=Math.min(f.outHeight,(f.inHeight+K-at)/d),mt=at*I+ot;for(let pt=0;pt<m;++pt){const kt=Math.max(0,Math.ceil((H-pt)/p)),It=Math.min(f.outWidth,(f.inWidth+H-pt)/p),C=pt*$+mt;for(let F=0;F<f.inChannels;++F){const B=F*E+C;for(let q=0;q<f.outChannels;++q){let U=0;for(let G=0;G<f.batchSize;++G){const et=G*V,rt=G*_;for(let tt=Z;tt<Q;++tt){const ht=(Y+tt*h-z)*M+et,it=tt*x+rt;for(let ut=ct;ut<dt;++ut){const St=(at+ut*d-K)*L+ht,Ct=ut*v+it;for(let _t=kt;_t<It;++_t){const oe=(pt+_t*p-H)*W+St,Ee=_t*R+Ct;U+=P[oe+F]*D[Ee+q]}}}}S[B+q]=U}}}}}return n.makeTensorInfo(w.shape,w.dtype,w.values)}const IC={kernelName:Py,backendName:"cpu",kernelFunc:NC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function TC(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:a}=t,{pad:o,strides:i,inputShape:l}=s;ft([r],"conv3dBackpropInputV2");const c=yt(r.shape),u=yt(a.shape),f=_o(l,a.shape,i,1,o),h=new ee(f.inShape,"float32"),d=h.values,[p,y,g,m]=h.strides,w=n.data.get(r.dataId).values,[S,k,I,$]=c,E=n.data.get(a.dataId).values,[D,_,x,v]=u,{batchSize:R,filterDepth:P,filterHeight:V,filterWidth:M,inChannels:L,inDepth:W,inHeight:z,inWidth:H,outChannels:K,outDepth:Y,outHeight:Z,outWidth:Q,strideDepth:ot,strideHeight:at,strideWidth:ct}=f,dt=P-1-f.padInfo.front,mt=V-1-f.padInfo.top,pt=M-1-f.padInfo.left;for(let kt=0;kt<R;++kt)for(let It=0;It<L;++It)for(let C=0;C<W;++C){const F=C-dt,B=Math.max(0,Math.ceil(F/ot)),q=Math.min(Y,(P+F)/ot);for(let U=0;U<z;++U){const G=U-mt,et=Math.max(0,Math.ceil(G/at)),rt=Math.min(Z,(V+G)/at);for(let tt=0;tt<H;++tt){const J=tt-pt,ht=Math.max(0,Math.ceil(J/ct)),it=Math.min(Q,(M+J)/ct);let ut=0;for(let gt=B;gt<q;++gt){const St=gt*ot-F;for(let Ct=et;Ct<rt;++Ct){const _t=Ct*at-G;for(let te=ht;te<it;++te){const oe=te*ct-J,Ee=S*kt+k*gt+I*Ct+$*te,Be=D*(P-1-St)+_*(V-1-_t)+x*(M-1-oe)+v*It;for(let on=0;on<K;++on){const va=w[Ee+on],ve=E[Be+on];ut+=va*ve}}}}d[p*kt+y*C+g*U+m*tt+It]=ut}}}return n.makeTensorInfo(h.shape,h.dtype,h.values)}const $C={kernelName:bh,backendName:"cpu",kernelFunc:TC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _C=Pt(Al,e=>Math.cos(e)),EC={kernelName:Al,backendName:"cpu",kernelFunc:_C};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CC=Pt(Dl,e=>Math.cosh(e)),AC={kernelName:Dl,backendName:"cpu",kernelFunc:CC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function DC(e){const{inputs:t,backend:n,attrs:s}=e,{image:r,boxes:a,boxInd:o}=t,{cropSize:i,method:l,extrapolationValue:c}=s,[u,f,h,d]=r.shape,p=a.shape[0],[y,g]=i,m=Et([p,y,g,d],"float32"),w=n.data.get(a.dataId).values,S=n.data.get(o.dataId).values,k=n.data.get(r.dataId).values,I=yt(r.shape),$=yt(m.shape);for(let E=0;E<p;E++){const D=E*4,_=w[D],x=w[D+1],v=w[D+2],R=w[D+3],P=S[E];if(P>=u)continue;const V=y>1?(v-_)*(f-1)/(y-1):0,M=g>1?(R-x)*(h-1)/(g-1):0;for(let L=0;L<y;L++){const W=y>1?_*(f-1)+L*V:.5*(_+v)*(f-1);if(W<0||W>f-1){for(let z=0;z<g;z++)for(let H=0;H<d;H++){const K=H+z*$[2]+L*$[1]+E*$[0];m.values[K]=c}continue}if(l==="bilinear"){const z=Math.floor(W),H=Math.ceil(W),K=W-z;for(let Y=0;Y<g;Y++){const Z=g>1?x*(h-1)+Y*M:.5*(x+R)*(h-1);if(Z<0||Z>h-1){for(let ct=0;ct<d;ct++){const dt=ct+Y*$[2]+L*$[1]+E*$[0];m.values[dt]=c}continue}const Q=Math.floor(Z),ot=Math.ceil(Z),at=Z-Q;for(let ct=0;ct<d;ct++){let dt=ct+Q*I[2]+z*I[1]+P*I[0];const mt=k[dt];dt=ct+ot*I[2]+z*I[1]+P*I[0];const pt=k[dt];dt=ct+Q*I[2]+H*I[1]+P*I[0];const kt=k[dt];dt=ct+ot*I[2]+H*I[1]+P*I[0];const It=k[dt],C=mt+(pt-mt)*at,F=kt+(It-kt)*at;dt=ct+Y*$[2]+L*$[1]+E*$[0],m.values[dt]=C+(F-C)*K}}}else for(let z=0;z<g;++z){const H=g>1?x*(h-1)+z*M:.5*(x+R)*(h-1);if(H<0||H>h-1){for(let Z=0;Z<d;Z++){const Q=Z+z*$[2]+L*$[1]+E*$[0];m.values[Q]=c}continue}const K=Math.round(H),Y=Math.round(W);for(let Z=0;Z<d;Z++){const Q=Z+K*I[2]+Y*I[1]+P*I[0],ot=Z+z*$[2]+L*$[1]+E*$[0];m.values[ot]=k[Q]}}}}return n.makeTensorInfo(m.shape,m.dtype,m.values)}const OC={kernelName:vh,backendName:"cpu",kernelFunc:DC};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function FC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,exclusive:o,reverse:i}=s;ft(r,"cumprod");const l=Nn([a],r.shape.length);let c=r;l!=null&&(c=_e({inputs:{x:r},backend:n,attrs:{perm:l}}));const u=In(1,r.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const f=xr(c.dtype,"int32"),h=bl(nt(c.shape),f),d=n.data.get(c.dataId).values,p=c.shape[c.shape.length-1],y=i?(m,w)=>m+p-w-1:(m,w)=>m+w;for(let m=0;m<d.length;m+=p)for(let w=0;w<p;w++){const S=y(m,w);if(w===0)h[S]=o?1:d[S];else{const k=y(m,w-1);h[S]=o?d[k]*h[k]:d[S]*h[k]}}const g=n.makeTensorInfo(c.shape,f,h);if(l!=null){const m=xp(l),w=_e({inputs:{x:g},backend:n,attrs:{perm:m}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(c),w}return g}const RC={kernelName:wh,backendName:"cpu",kernelFunc:FC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function PC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,exclusive:o,reverse:i}=s;ft(r,"cumsum");const l=Nn([a],r.shape.length);let c=r;l!=null&&(c=_e({inputs:{x:r},backend:n,attrs:{perm:l}}));const u=In(1,r.shape.length)[0];if(u!==c.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${c.shape.length-1} but got axis=${u}`);const f=xr(c.dtype,"int32"),h=fe(nt(c.shape),f),d=n.data.get(c.dataId).values,p=c.shape[c.shape.length-1],y=i?(m,w)=>m+p-w-1:(m,w)=>m+w;for(let m=0;m<d.length;m+=p)for(let w=0;w<p;w++){const S=y(m,w);if(w===0)h[S]=o?0:d[S];else{const k=y(m,w-1);h[S]=o?d[k]+h[k]:d[S]+h[k]}}const g=n.makeTensorInfo(c.shape,f,h);if(l!=null){const m=xp(l),w=_e({inputs:{x:g},backend:n,attrs:{perm:m}});return n.disposeIntermediateTensorInfo(g),n.disposeIntermediateTensorInfo(c),w}return g}const MC={kernelName:kh,backendName:"cpu",kernelFunc:PC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function VC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,weights:a}=t,{size:o,binaryOutput:i}=s;if(r.shape.length===1){const l=n.data.get(r.dataId).values,c=n.data.get(a.dataId).values,u=gm(l,c,a.dtype,a.shape,o);return n.makeTensorInfo([o],a.dtype,u)}else if(r.shape.length===2){const l=n.bufferSync(r),c=n.bufferSync(a),u=I$(l,c,o,i);return n.makeTensorInfo(u.shape,a.dtype,u.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${r.shape.length}.`)}const LC={kernelName:Sh,backendName:"cpu",kernelFunc:VC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function zC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockSize:a,dataFormat:o}=s;T(o==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${o}`);const i=r.shape[0],l=r.shape[1],c=r.shape[2],u=r.shape[3],f=l*a,h=c*a,d=u/(a*a),p=n.data.get(r.dataId).values,y=new Float32Array(i*f*h*d);let g=0;for(let m=0;m<i;++m)for(let w=0;w<f;++w){const S=Math.floor(w/a),k=w%a;for(let I=0;I<h;++I){const $=Math.floor(I/a),E=I%a,D=(k*a+E)*d;for(let _=0;_<d;++_){const v=_+D+u*($+c*(S+l*m));y[g++]=p[v]}}}return n.makeTensorInfo([i,f,h,d],r.dtype,y)}const BC={kernelName:xh,backendName:"cpu",kernelFunc:zC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Om(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:a}=t,{strides:o,pad:i,dilations:l,dimRoundingMode:c}=s;ft([r,a],"depthwiseConv2DNative");const u=yt(r.shape),f=yt(a.shape);let h=l;h==null&&(h=[1,1]),T(sn(o,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${o} and dilations '${h}'`);const d=xn(r.shape,a.shape,o,h,i,c,!0),{filterHeight:p,filterWidth:y,dilationHeight:g,dilationWidth:m,padInfo:w}=d,S=w.left,k=w.top,I=d.outChannels/d.inChannels,$=new ee(d.outShape,r.dtype),E=n.data.get(r.dataId).values,D=n.data.get(a.dataId).values,_=$.values;for(let x=0;x<d.batchSize;++x){const v=x*u[0],R=x*$.strides[0];for(let P=0;P<d.outHeight;++P){const V=R+P*$.strides[1],M=P*d.strideHeight-k;for(let L=0;L<p;++L){const W=M+L*g;if(W<0||W>=d.inHeight)continue;const z=L*f[0],H=v+W*u[1];for(let K=0;K<d.outWidth;++K){const Y=V+K*$.strides[2],Z=K*d.strideWidth-S;for(let Q=0;Q<y;++Q){const ot=Z+Q*m;if(ot<0||ot>=d.inWidth)continue;const at=z+Q*f[1],ct=H+ot*d.inChannels;let dt=Y,mt=at;for(let pt=0;pt<d.inChannels;++pt){const kt=E[ct+pt];for(let It=0;It<I;++It)_[dt+It]+=kt*D[mt+It];dt+=I,mt+=I}}}}}}return n.makeTensorInfo($.shape,$.dtype,$.values)}const WC={kernelName:Nh,backendName:"cpu",kernelFunc:Om};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function HC(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,dy:a}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:c,filterShape:u}=s;ft([r,a],"depthwiseConv2dNativeBackpropFilter");const f=xn(r.shape,u,o,i,l,c,!0),{strideHeight:h,strideWidth:d,filterHeight:p,filterWidth:y}=f,g=new ee(f.filterShape,"float32"),m=f.padInfo.left,w=f.padInfo.top,S=f.outChannels/f.inChannels,k=n.data.get(r.dataId).values,I=new ee(r.shape,r.dtype,k),$=n.data.get(a.dataId).values,E=new ee(a.shape,a.dtype,$);for(let D=0;D<p;++D){const _=Math.max(0,Math.ceil((w-D)/h)),x=Math.min(f.outHeight,(f.inHeight+w-D)/h);for(let v=0;v<y;++v){const R=Math.max(0,Math.ceil((m-v)/d)),P=Math.min(f.outWidth,(f.inWidth+m-v)/d);for(let V=0;V<f.outChannels;++V){const M=Math.trunc(V/S),L=V%S;let W=0;for(let z=0;z<f.batchSize;++z)for(let H=_;H<x;++H){const K=D+H*h-w;for(let Y=R;Y<P;++Y){const Z=v+Y*d-m;W+=I.get(z,K,Z,M)*E.get(z,H,Y,V)}}g.set(W,D,v,M,L)}}}return n.makeTensorInfo(g.shape,g.dtype,g.values)}const UC={kernelName:Ih,backendName:"cpu",kernelFunc:HC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jC(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,filter:a}=t,{strides:o,dilations:i,pad:l,dimRoundingMode:c,inputShape:u}=s;ft([r,a],"depthwiseConv2DNativeBackpropInput");const f=yt(r.shape),h=yt(a.shape),d=xn(u,a.shape,o,i,l,c,!0),p=new ee(d.inShape,"float32"),y=p.values,[g,m,w]=p.strides,S=n.data.get(r.dataId).values,[k,I,$]=f,E=n.data.get(a.dataId).values,[D,_,x]=h,{batchSize:v,filterHeight:R,filterWidth:P,inChannels:V,inHeight:M,inWidth:L,outChannels:W,outHeight:z,outWidth:H,strideHeight:K,strideWidth:Y}=d,Z=R-1-d.padInfo.top,Q=P-1-d.padInfo.left,ot=W/V;for(let at=0;at<v;++at)for(let ct=0;ct<V;++ct)for(let dt=0;dt<M;++dt){const mt=dt-Z,pt=Math.max(0,Math.ceil(mt/K)),kt=Math.min(z,(R+mt)/K);for(let It=0;It<L;++It){const C=It-Q,F=Math.max(0,Math.ceil(C/Y)),B=Math.min(H,(P+C)/Y);let q=0;for(let U=pt;U<kt;++U){const G=U*K-mt;for(let et=F;et<B;++et){const rt=et*Y-C,tt=k*at+I*U+$*et,J=D*(R-1-G)+_*(P-1-rt)+x*ct;for(let ht=0;ht<ot;++ht){const it=ct*ot+ht,ut=S[tt+it],gt=E[J+ht];q+=ut*gt}}}y[g*at+m*dt+w*It+ct]=q}}return n.makeTensorInfo(p.shape,p.dtype,p.values)}const qC={kernelName:Th,backendName:"cpu",kernelFunc:jC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function GC(e){const{inputs:t,backend:n}=e,{x:s}=t,r=nt(s.shape),a=n.data.get(s.dataId).values,o=Et([r,r],s.dtype),i=o.values;for(let c=0;c<a.length;c++)i[c*r+c]=a[c];const l=[...s.shape,...s.shape];return n.makeTensorInfo(l,o.dtype,o.values)}const KC={kernelName:$h,backendName:"cpu",kernelFunc:GC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const XC={kernelName:_h,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r}=e,{strides:a,pad:o,dilations:i}=n,l=t,c=l.data.get(s.dataId).values,u=s.shape.length,f=l.data.get(r.dataId).values,h=r.shape.length,{batchSize:d,inHeight:p,inWidth:y,inChannels:g,outHeight:m,outWidth:w,padInfo:S,strideHeight:k,strideWidth:I,filterHeight:$,filterWidth:E,dilationHeight:D,dilationWidth:_,outShape:x}=_c(s.shape,r.shape,a,o,"NHWC",i),v=nt(x),R=x.length,P=Qt(s.dtype,v);for(let M=0;M<d;++M)for(let L=0;L<m;++L){const W=L*k-S.top;for(let z=0;z<w;++z){const H=z*I-S.left;for(let K=0;K<g;++K){let Y=Number.MIN_SAFE_INTEGER;for(let Q=0;Q<$;++Q){const ot=W+Q*D;if(ot>=0&&ot<p)for(let at=0;at<E;++at){const ct=H+at*_;if(ct>=0&&ct<y){const dt=pn([M,ot,ct,K],u,yt(s.shape)),mt=pn([Q,at,K],h,yt(r.shape)),pt=c[dt]+f[mt];pt>Y&&(Y=pt)}}}const Z=pn([M,L,z,K],R,yt(x));P[Z]=Y}}}return{dataId:l.write(Hs(P,s.dtype),x,s.dtype),shape:x,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const YC={kernelName:Su,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r,dy:a}=e,{strides:o,pad:i,dilations:l}=n,c=t,u=qe(s.shape,c.data.get(s.dataId).values),f=qe(r.shape,c.data.get(r.dataId).values),{batchSize:h,inHeight:d,inWidth:p,inChannels:y,outHeight:g,outWidth:m,padInfo:w,strideHeight:S,strideWidth:k,filterHeight:I,filterWidth:$,dilationHeight:E,dilationWidth:D,outShape:_}=_c(s.shape,r.shape,o,i,"NHWC",l);T(a.rank===_.length,()=>`Error in ${Su}, dy must have the same rank as output ${_.length}, but got ${a.rank}`);const x=qe(_,c.data.get(a.dataId).values),v=Yf(r.shape,r.dtype);for(let P=0;P<h;++P)for(let V=0;V<g;++V){const M=V*S-w.top;for(let L=0;L<m;++L){const W=L*k-w.left;for(let z=0;z<y;++z){let H=Number.MIN_SAFE_INTEGER,K=0,Y=0;for(let Z=0;Z<I;++Z){const Q=M+Z*E;if(Q>=0&&Q<d)for(let ot=0;ot<$;++ot){const at=W+ot*D;if(at>=0&&at<p){const ct=u[P][Q][at][z]+f[Z][ot][z];ct>H&&(H=ct,K=Z,Y=ot)}}}v[K][Y][z]+=x[P][V][L][z]}}}return{dataId:c.write(Hs(v,s.dtype),r.shape,r.dtype),shape:r.shape,dtype:r.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ZC={kernelName:vu,backendName:"cpu",kernelFunc:({inputs:e,backend:t,attrs:n})=>{const{x:s,filter:r,dy:a}=e,{strides:o,pad:i,dilations:l}=n,c=t,u=qe(s.shape,c.data.get(s.dataId).values),f=qe(r.shape,c.data.get(r.dataId).values),{batchSize:h,inHeight:d,inWidth:p,inChannels:y,outHeight:g,outWidth:m,padInfo:w,strideHeight:S,strideWidth:k,filterHeight:I,filterWidth:$,dilationHeight:E,dilationWidth:D,outShape:_}=_c(s.shape,r.shape,o,i,"NHWC",l);T(a.rank===_.length,()=>`Error in ${vu}, dy must have the same rank as output ${_.length}, but got ${a.rank}`);const x=qe(_,c.data.get(a.dataId).values),v=Yf(s.shape,s.dtype);for(let P=0;P<h;++P)for(let V=0;V<g;++V){const M=V*S-w.top;for(let L=0;L<m;++L){const W=L*k-w.left;for(let z=0;z<y;++z){let H=Number.MIN_SAFE_INTEGER,K=M<0?0:M,Y=W<0?0:W;for(let Z=0;Z<I;++Z){const Q=M+Z*E;if(Q>=0&&Q<d)for(let ot=0;ot<$;++ot){const at=W+ot*D;if(at>=0&&at<p){const ct=u[P][Q][at][z]+f[Z][ot][z];ct>H&&(H=ct,K=Q,Y=at)}}}v[P][K][Y][z]+=x[P][V][L][z]}}}return{dataId:c.write(Hs(v,s.dtype),s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2023 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function JC(e){const{inputs:t,backend:n,attrs:s}=e,{image:r}=t,{canvas:a,options:o}=s,{contextOptions:i,imageOptions:l}=o||{},c=(l==null?void 0:l.alpha)||1,u=(i==null?void 0:i.contextType)||"2d";if(u!=="2d")throw new Error(`Context type ${i.contextType} is not supported by the CPU backend.`);const f=a.getContext(u,(i==null?void 0:i.contextAttributes)||{});if(f==null)throw new Error(`Could not get the context with ${u} type.`);const[h,d]=r.shape.slice(0,2),p=r.shape.length===2?1:r.shape[2],y=n.data.get(r.dataId).values,g=r.dtype==="float32"?255:1,m=new Uint8ClampedArray(d*h*4);for(let S=0;S<h*d;++S){const k=[0,0,0,255*c];for(let $=0;$<p;$++){const E=y[S*p+$];if(r.dtype==="float32"){if(E<0||E>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${E}.`)}else if(r.dtype==="int32"&&(E<0||E>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${E}.`);p===1?(k[0]=E*g,k[1]=E*g,k[2]=E*g):k[$]=E*g}const I=S*4;m[I+0]=Math.round(k[0]),m[I+1]=Math.round(k[1]),m[I+2]=Math.round(k[2]),m[I+3]=Math.round(k[3])}a.width=d,a.height=h;const w=new ImageData(m,d,h);return f.putImageData(w,0,0),r}const QC={kernelName:My,backendName:"cpu",kernelFunc:JC};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function ga(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s;ft(r,"sum");let i;r.dtype==="bool"?i=cs({inputs:{x:r},backend:n,attrs:{dtype:"int32"}}):i=kn({inputs:{x:r},backend:n});const l=i.shape.length,c=ae(a,i.shape),u=Nn(c,l);let f=c,h=i;u!=null&&(h=_e({inputs:{x:i},backend:n,attrs:{perm:u}}),f=In(f.length,l)),Us("sum",f,h.shape.length);const[d,p]=qn(h.shape,f),y=xr(h.dtype,"int32");let g=so(n,d,y);const m=nt(p),w=n.data.get(g.dataId).values,S=n.data.get(h.dataId).values;for(let k=0;k<w.length;++k){const I=k*m;let $=0;for(let E=0;E<m;++E)$+=S[I+E];w[k]=$}if(o){const k=an(g.shape,c),I=g;g=Ht({inputs:{x:g},backend:n,attrs:{shape:k}}),n.disposeIntermediateTensorInfo(I)}return n.disposeIntermediateTensorInfo(i),u!=null&&n.disposeIntermediateTensorInfo(h),g}const t3={kernelName:kd,backendName:"cpu",kernelFunc:ga};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function e3(e){const{inputs:t,backend:n,attrs:s}=e,{equation:r}=s,a=t,{allDims:o,summedDims:i,idDims:l}=bT(r,a.length);kT(o.length,l,a);const{path:c,steps:u}=vT(i,l),f=u.length;let h=null,d=o.length;const p=[];for(let y=0;y<f;++y){for(const g of u[y]){const{permutationIndices:m,expandDims:w}=wT(d,l[g]);let S;ST(m)?S=a[g]:(S=_e({inputs:{x:a[g]},backend:n,attrs:{perm:m}}),p.push(S));const k=S.shape.slice();for(let I=0;I<w.length;++I)k.splice(w[I],0,1);Ke(S.shape,k)||(S=Ht({inputs:{x:S},backend:n,attrs:{shape:k}}),p.push(S)),h===null?h=S:(h=Vo({inputs:{a:S,b:h},backend:n}),p.push(h))}y<f-1&&(c[y]>=0&&(h=ga({inputs:{x:h},backend:n,attrs:{axis:c[y]-(o.length-d),keepDims:!1}}),p.push(h)),d--)}for(const y of p)y!==h&&n.disposeIntermediateTensorInfo(y);return h}const n3={kernelName:Eh,backendName:"cpu",kernelFunc:e3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function s3(e){const{inputs:t,backend:n}=e,{dy:s,y:r}=t;ft([s,r],"eluGrad");const a=new Float32Array(nt(r.shape)),o=n.data.get(r.dataId).values,i=n.data.get(s.dataId).values;for(let l=0;l<o.length;++l){const c=o[l];c>=0?a[l]=i[l]:a[l]=i[l]*(c+1)}return n.makeTensorInfo(r.shape,"float32",a)}const r3={kernelName:Vy,backendName:"cpu",kernelFunc:s3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const a3=aT,o3=oT,i3=iT,l3=lT,c3=cT,u3=uT,f3=Pt(Rl,e=>{const t=Math.sign(e),n=Math.abs(e),s=1/(1+a3*n);return t*(1-((((u3*s+c3)*s+l3)*s+i3)*s+o3)*s*Math.exp(-n*n))}),h3={kernelName:Rl,backendName:"cpu",kernelFunc:f3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oo(e){const{inputs:t,backend:n,attrs:s}=e,{input:r}=t,{dim:a}=s,o=r.shape.length,i=r.shape.slice();let l=a;return a<0&&(T(-(o+1)<=a,()=>`Axis must be in the interval [${-(o+1)}, ${o}]`),l=o+a+1),i.splice(l,0,1),Ht({inputs:{x:r},backend:n,attrs:{shape:i}})}const d3={kernelName:Ch,backendName:"cpu",kernelFunc:oo};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const p3=Jt((e,t)=>e/t),Yc=se(Ol,p3),tl={kernelName:Ol,backendName:"cpu",kernelFunc:Yc};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Fm(e,t,n){const s=e.shape,r=s[0],a=s[1],o=n.data.get(e.dataId),i=o.complexTensorInfos.real,l=o.complexTensorInfos.imag,c=[r,a],u=nt(c),f=ke("float32",u),h=ke("float32",u);for(let g=0;g<r;g++){const m=zs({inputs:{x:i},backend:n,attrs:{begin:[g,0],size:[1,a]}}),w=zs({inputs:{x:l},backend:n,attrs:{begin:[g,0],size:[1,a]}}),S=Re({inputs:{real:m,imag:w},backend:n}),{real:k,imag:I}=m3(S,t,n),$=pr(k,I);for(let E=0;E<a;E++){const D=hm($,E);f[g*a+E]=D.real,h[g*a+E]=D.imag}n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(w),n.disposeIntermediateTensorInfo(S)}const d=n.makeTensorInfo(c,"float32",f),p=n.makeTensorInfo(c,"float32",h),y=Re({inputs:{real:d,imag:p},backend:n});return n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(p),y}function m3(e,t,n){const s=nt(e.shape),r=n.data.get(e.dataId),a=n.data.get(r.complexTensorInfos.real.dataId).values,o=n.data.get(r.complexTensorInfos.imag.dataId).values;if(g3(s)){const i=el(a,o,s,t,n),l=[e.shape[0],e.shape[1]];if(t){const c=n.makeTensorInfo(l,"float32",i.real),u=n.makeTensorInfo(l,"float32",i.imag),f=n.makeTensorInfo([],"float32",Ic(s,"float32")),h=kn({inputs:{x:f},backend:n}),d=tl.kernelFunc({inputs:{a:c,b:f},backend:n}),p=tl.kernelFunc({inputs:{a:u,b:h},backend:n}),y=n.data.get(d.dataId).values,g=n.data.get(p.dataId).values;return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(p),{real:y,imag:g}}return i}else{const i=pr(a,o),l=y3(i,s,t);return fT(l)}}function g3(e){return(e&e-1)===0}function el(e,t,n,s,r){if(n===1)return{real:e,imag:t};const a=pr(e,t),o=n/2,i=hT(a),l=i.real,c=i.imag,u=[l.length],f=r.makeTensorInfo(u,"float32",l),h=r.makeTensorInfo(u,"float32",c),d=Re({inputs:{real:f,imag:h},backend:r}),p=dT(a),y=p.real,g=p.imag,m=[y.length],w=r.makeTensorInfo(m,"float32",y),S=r.makeTensorInfo(m,"float32",g),k=Re({inputs:{real:w,imag:S},backend:r}),I=el(l,c,o,s,r),$=I.real,E=I.imag,D=[$.length],_=r.makeTensorInfo(D,"float32",$),x=r.makeTensorInfo(D,"float32",E),v=Re({inputs:{real:_,imag:x},backend:r}),R=el(y,g,o,s,r),P=R.real,V=R.imag,M=[P.length],L=r.makeTensorInfo(M,"float32",P),W=r.makeTensorInfo(M,"float32",V),z=Re({inputs:{real:L,imag:W},backend:r}),H=mT(n,s),K=[H.real.length],Y=r.makeTensorInfo(K,"float32",H.real),Z=r.makeTensorInfo(K,"float32",H.imag),Q=Re({inputs:{real:Y,imag:Z},backend:r}),ot=Vo({inputs:{a:Q,b:z},backend:r}),at=mr({inputs:{a:v,b:ot},backend:r}),ct=Kc({inputs:{a:v,b:ot},backend:r}),dt=Ls({inputs:{input:at},backend:r}),mt=Ls({inputs:{input:ct},backend:r}),pt=gr({inputs:{input:at},backend:r}),kt=gr({inputs:{input:ct},backend:r}),It=yr({inputs:[dt,mt],backend:r,attrs:{axis:0}}),C=yr({inputs:[pt,kt],backend:r,attrs:{axis:0}}),F=r.data.get(It.dataId).values,B=r.data.get(C.dataId).values;return r.disposeIntermediateTensorInfo(f),r.disposeIntermediateTensorInfo(h),r.disposeIntermediateTensorInfo(d),r.disposeIntermediateTensorInfo(w),r.disposeIntermediateTensorInfo(S),r.disposeIntermediateTensorInfo(k),r.disposeIntermediateTensorInfo(_),r.disposeIntermediateTensorInfo(x),r.disposeIntermediateTensorInfo(v),r.disposeIntermediateTensorInfo(L),r.disposeIntermediateTensorInfo(W),r.disposeIntermediateTensorInfo(z),r.disposeIntermediateTensorInfo(Y),r.disposeIntermediateTensorInfo(Z),r.disposeIntermediateTensorInfo(Q),r.disposeIntermediateTensorInfo(ot),r.disposeIntermediateTensorInfo(at),r.disposeIntermediateTensorInfo(ct),r.disposeIntermediateTensorInfo(dt),r.disposeIntermediateTensorInfo(pt),r.disposeIntermediateTensorInfo(mt),r.disposeIntermediateTensorInfo(kt),r.disposeIntermediateTensorInfo(It),r.disposeIntermediateTensorInfo(C),{real:F,imag:B}}function y3(e,t,n){const s=new Float32Array(t*2);for(let r=0;r<t;r++){let a=0,o=0;for(let i=0;i<t;i++){const l=gT(r*i,t,n),c=hm(e,i);a+=c.real*l.real-c.imag*l.imag,o+=c.real*l.imag+c.imag*l.real}n&&(a/=t,o/=t),pT(s,a,o,r)}return s}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function b3(e){const{inputs:t,backend:n}=e,{input:s}=t,r=nt(s.shape),a=s.shape[s.shape.length-1],o=r/a,i=Ht({inputs:{x:s},backend:n,attrs:{shape:[o,a]}}),l=Fm(i,!1,n),c=Ht({inputs:{x:l},backend:n,attrs:{shape:s.shape}});return n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(l),c}const w3={kernelName:Ah,backendName:"cpu",kernelFunc:b3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Zc(e){const{backend:t,attrs:n}=e,{shape:s,value:r,dtype:a}=n,o=a||ha(r),i=Qt(o,nt(s));return v3(i,r,o),t.makeTensorInfo(s,o,i)}const k3={kernelName:Dh,backendName:"cpu",kernelFunc:Zc};function v3(e,t,n){e.fill(t)}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const S3={kernelName:Oh,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:s}=e,r=n,a=ke(s.dtype,nt(s.shape)),[o,i,l,c]=s.shape,u=r.data.get(s.dataId).values;for(let h=0;h<o;h++){const d=h*l*i*c;for(let p=0;p<i;p++){const y=p*(l*c);for(let g=0;g<l;g++){const m=g*c;for(let w=0;w<c;w++){const S=Math.round(l-g-1),k=d+y+m+w;let I=u[k];if(S>=0&&S<l){const $=S*c,E=d+y+$+w;I=u[E]}a[k]=I}}}}return{dataId:r.write(a,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function x3(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:a,bias:o,preluActivationWeights:i}=t,{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h,activation:d,leakyreluAlpha:p}=s;let y=Dm({inputs:{x:r,filter:a},backend:n,attrs:{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h}});if(o){const g=y;if(u==="NCHW"&&o.shape.length===1&&o.shape[0]!==1){const m=Ht({inputs:{x:o},backend:n,attrs:{shape:[o.shape[0],1,1]}});y=mr({inputs:{a:y,b:m},backend:n}),n.disposeIntermediateTensorInfo(m)}else y=mr({inputs:{a:y,b:o},backend:n});n.disposeIntermediateTensorInfo(g)}if(d){const g=y;if(u==="NCHW"&&d==="prelu"&&i.shape.length===1&&i.shape[0]!==1){const m=Ht({inputs:{x:i},backend:n,attrs:{shape:[i.shape[0],1,1]}});y=ao(n,y,d,m,p),n.disposeIntermediateTensorInfo(m)}else y=ao(n,y,d,i,p);n.disposeIntermediateTensorInfo(g)}return y}const N3={kernelName:Ni,backendName:"cpu",kernelFunc:x3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function I3(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,filter:a,bias:o,preluActivationWeights:i}=t,{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h,activation:d,leakyreluAlpha:p}=s;let y=Om({inputs:{x:r,filter:a},backend:n,attrs:{strides:l,pad:c,dataFormat:u,dilations:f,dimRoundingMode:h}});if(o){const g=y;y=mr({inputs:{a:y,b:o},backend:n}),n.disposeIntermediateTensorInfo(g)}if(d){const g=y;y=ao(n,y,d,i,p),n.disposeIntermediateTensorInfo(g)}return y}const T3={kernelName:Ii,backendName:"cpu",kernelFunc:I3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function $3(e){const{inputs:t,backend:n}=e,{params:s,indices:r}=t,a=nt(s.shape),o=r.shape,i=o[o.length-1],[l,c,u,f]=zI(s,r);if(c===0)return n.makeTensorInfo(l,s.dtype,[]);const h=n.data.get(r.dataId).values,d=n.bufferSync(s),p=q$(h,d,s.dtype,c,i,u,f,s.shape,a);return n.makeTensorInfo(l,s.dtype,p.values)}const _3={kernelName:Ph,backendName:"cpu",kernelFunc:$3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function E3(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,indices:a}=t,{axis:o,batchDims:i}=s;ft([r,a],"gatherV2");const l=ae(o,r.shape)[0],c=n.data.get(a.dataId).values,u=r.shape[l];for(let k=0;k<c.length;++k){const I=c[k];T(I<=u-1&&I>=0,()=>`GatherV2: the index value ${I} is not in [0, ${u-1}]`)}let f=i;i==null&&(f=0);const h=nt(a.shape),d=PT(r,a,l,f),p=Ht({inputs:{x:r},backend:n,attrs:{shape:[d.batchSize,d.outerSize,d.dimSize,d.sliceSize]}}),y=Ht({inputs:{x:a},backend:n,attrs:{shape:[d.batchSize,h/d.batchSize]}}),g=[d.batchSize,d.outerSize,h/d.batchSize,d.sliceSize],m=n.bufferSync(y),w=n.bufferSync(p),S=G$(w,m,g);return n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(y),n.makeTensorInfo(d.outputShape,S.dtype,S.values)}const C3={kernelName:Rh,backendName:"cpu",kernelFunc:E3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function A3(e){const{inputs:t,backend:n}=e,{input:s}=t,r=nt(s.shape),a=s.shape[s.shape.length-1],o=r/a,i=Ht({inputs:{x:s},backend:n,attrs:{shape:[o,a]}}),l=Fm(i,!0,n),c=Ht({inputs:{x:l},backend:n,attrs:{shape:s.shape}});return n.disposeIntermediateTensorInfo(i),n.disposeIntermediateTensorInfo(l),c}const D3={kernelName:Mh,backendName:"cpu",kernelFunc:A3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const O3=Pt(Ul,e=>Number.isFinite(e)?1:0,"bool"),F3={kernelName:Ul,backendName:"cpu",kernelFunc:O3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const R3=Pt(jl,e=>Math.abs(e)===1/0?1:0,"bool"),P3={kernelName:jl,backendName:"cpu",kernelFunc:R3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const M3=Pt(ql,e=>Number.isNaN(e)?1:0,"bool"),V3={kernelName:ql,backendName:"cpu",kernelFunc:M3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function L3(e){const{backend:t,attrs:n}=e,{start:s,stop:r,num:a}=n,o=o_(s,r,a);return t.makeTensorInfo([o.length],"float32",o)}const z3={kernelName:zh,backendName:"cpu",kernelFunc:L3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const B3=Pt(Yl,e=>Math.log1p(e)),W3={kernelName:Yl,backendName:"cpu",kernelFunc:B3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const H3=Jt((e,t)=>e&&t),U3=se(Zl,H3,null,"bool"),j3={kernelName:Zl,backendName:"cpu",kernelFunc:U3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const q3=Pt(Jl,e=>e?0:1,"bool"),G3={kernelName:Jl,backendName:"cpu",kernelFunc:q3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const K3=Jt((e,t)=>e||t),X3=se(Ql,K3,null,"bool"),Y3={kernelName:Ql,backendName:"cpu",kernelFunc:X3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Z3(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{depthRadius:a,bias:o,alpha:i,beta:l}=s;ft(r,"LRN");const c=r.shape[3],u=c-1,f=n.data.get(r.dataId).values,h=nt(r.shape),d=new Float32Array(h);function p(y){const g=y%c;let m=y-g+Math.max(0,g-a);const w=y-g+Math.min(g+a,u);let S=0;for(;m<=w;m++){const k=f[m];S+=k*k}return S}for(let y=0;y<h;y++){const g=p(y),m=f[y]*Math.pow(o+i*g,-l);d[y]=m}return n.makeTensorInfo(r.shape,r.dtype,d)}const J3={kernelName:Bh,backendName:"cpu",kernelFunc:Z3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Q3(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,y:a,dy:o}=t,{depthRadius:i,bias:l,alpha:c,beta:u}=s;ft(o,"LRNGrad");const f=nt(o.shape),h=o.shape[3],d=n.data.get(o.dataId).values,p=n.data.get(r.dataId).values,y=n.data.get(a.dataId).values,g=new Float32Array(f),m=f;for(let w=0;w<m;w++){const S=w%h,k=w-S+Math.max(0,S-i),I=w-S+Math.min(h,S+i+1);let $=0;for(let E=k;E<I;E++)$+=Math.pow(p[E],2);$=c*$+l;for(let E=k;E<I;E++){let D=-2*c*u*p[E]*y[w]/$;w===E&&(D+=Math.pow($,-u)),D*=d[w],g[E]+=D}}return n.makeTensorInfo(o.shape,r.dtype,g)}const tA={kernelName:Ly,backendName:"cpu",kernelFunc:Q3};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Rm(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{reductionIndices:a,keepDims:o}=s,i=n;let l=r.shape;const c=l.length,u=ae(a,l);let f=u;const h=Nn(f,c);let d=i.data.get(r.dataId).values;if(h!=null){const k=new Array(c);for(let I=0;I<k.length;I++)k[I]=l[h[I]];d=km(d,l,r.dtype,h,k),f=In(f.length,c),l=k}ft(r,"max"),Us("max",f,c);const[p,y]=qn(l,f),g=nt(y),m=u_(d,g,p,r.dtype),w=i.write(m,p,r.dtype);let S=p;return o&&(S=an(p,u)),{dataId:w,shape:S,dtype:r.dtype}}const eA={kernelName:Wh,backendName:"cpu",kernelFunc:Rm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t;ft(r,"maxPool");const{filterSize:a,strides:o,pad:i,dimRoundingMode:l}=s,c=1;T(sn(o,c),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${o} and dilations '${c}'`);const u=Nr(r.shape,a,o,c,i,l);let f;if(u.filterWidth===1&&u.filterHeight===1&&Ke(u.inShape,u.outShape))f=kn({inputs:{x:r},backend:n});else{const h=n.data.get(r.dataId).values,d=yt(r.shape),p=Xc(h,r.shape,r.dtype,d,u,"max");f=n.makeTensorInfo(u.outShape,r.dtype,p.values)}return f}const sA={kernelName:Hh,backendName:"cpu",kernelFunc:nA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{filterSize:a,strides:o,pad:i,dimRoundingMode:l,dataFormat:c}=s;ft(r,"maxPool3d");const u=$o(r.shape,a,o,1,i,l,c),f=n.data.get(r.dataId).values,h=Am(f,r.shape,r.dtype,yt(r.shape),u,"max");return n.makeTensorInfo(h.shape,"float32",h.values)}const aA={kernelName:Uh,backendName:"cpu",kernelFunc:rA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oA(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:a}=t,{filterSize:o,strides:i,pad:l,dimRoundingMode:c}=s;ft([r,a],"maxPool3DGrad");const u=$o(a.shape,o,i,1,l,c),f=n.bufferSync(a),h=KE(f,u),d=u.strideDepth,p=u.strideHeight,y=u.strideWidth,g=u.dilationDepth,m=u.dilationHeight,w=u.dilationWidth,S=u.effectiveFilterDepth,k=u.effectiveFilterHeight,I=u.effectiveFilterWidth,$=S-1-u.padInfo.front,E=I-1-u.padInfo.left,D=k-1-u.padInfo.top,_=Et(a.shape,"float32"),x=n.bufferSync(r);for(let v=0;v<u.batchSize;++v)for(let R=0;R<u.inChannels;++R)for(let P=0;P<u.inDepth;++P)for(let V=0;V<u.inHeight;++V)for(let M=0;M<u.inWidth;++M){const L=P-$,W=V-D,z=M-E;let H=0;for(let K=0;K<S;K+=g){const Y=(L+K)/d;if(!(Y<0||Y>=u.outDepth||Math.floor(Y)!==Y))for(let Z=0;Z<k;Z+=m){const Q=(W+Z)/p;if(!(Q<0||Q>=u.outHeight||Math.floor(Q)!==Q))for(let ot=0;ot<I;ot+=w){const at=(z+ot)/y;if(at<0||at>=u.outWidth||Math.floor(at)!==at)continue;const ct=S*k*I-1-h.get(v,Y,Q,at,R),dt=K*k*I+Z*I+ot,mt=ct===dt?1:0;if(mt===0)continue;const pt=x.get(v,Y,Q,at,R);H+=pt*mt}}}_.set(H,v,P,V,M,R)}return n.makeTensorInfo(_.shape,_.dtype,_.values)}const iA={kernelName:By,backendName:"cpu",kernelFunc:oA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lA(e){const{inputs:t,backend:n,attrs:s}=e,{dy:r,input:a,output:o}=t,i=a;ft([a,o],"maxPoolGrad");const{filterSize:l,strides:c,pad:u,dimRoundingMode:f}=s,h=Nr(i.shape,l,c,1,u,f),d=n.data.get(i.dataId).values,p=Et(h.outShape,i.dtype,Cm(d,i.shape,i.dtype,h).values),y=h.strideHeight,g=h.strideWidth,m=h.dilationHeight,w=h.dilationWidth,S=h.effectiveFilterHeight,k=h.effectiveFilterWidth,I=k-1-h.padInfo.left,$=S-1-h.padInfo.top,E=Et(i.shape,"float32"),D=n.data.get(r.dataId).values,_=Et(r.shape,"float32",D);for(let x=0;x<h.batchSize;++x)for(let v=0;v<h.inChannels;++v)for(let R=0;R<h.inHeight;++R)for(let P=0;P<h.inWidth;++P){const V=R-$,M=P-I;let L=0;for(let W=0;W<S;W+=m){const z=(V+W)/y;if(!(z<0||z>=h.outHeight||Math.floor(z)!==z))for(let H=0;H<k;H+=w){const K=(M+H)/g;if(K<0||K>=h.outWidth||Math.floor(K)!==K)continue;const Y=S*k-1-p.get(x,z,K,v),Z=W*k+H,Q=Y===Z?1:0;if(Q===0)continue;const ot=_.get(x,z,K,v);L+=ot*Q}}E.set(L,x,R,P,v)}return n.makeTensorInfo(E.shape,E.dtype,E.values)}const cA={kernelName:zy,backendName:"cpu",kernelFunc:lA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uA(e,t,n,s,r){const a=yt(t),o=Xc(e,t,n,a,r,"max"),i=Cm(e,t,n,r,!0,s);return[o.values,i.values]}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const fA={kernelName:jh,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{x:s}=e,{filterSize:r,strides:a,pad:o,includeBatchInIndex:i}=t,l=n;ft(s,"MaxPoolWithArgmax");const c=l.data.get(s.dataId).values,u=Nr(s.shape,r,a,[1,1],o),[f,h]=uA(c,s.shape,s.dtype,i,u),d=l.write(f,u.outShape,s.dtype),p=l.write(h,u.outShape,s.dtype);return[{dataId:d,shape:u.outShape,dtype:s.dtype},{dataId:p,shape:u.outShape,dtype:"int32"}]}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s,i=ae(a,r.shape),c=qn(r.shape,i)[1],u=nt(c),f=[],h=n.makeTensorInfo([],"float32",new Float32Array([u]));f.push(h);const d=cs({inputs:{x:r},backend:n,attrs:{dtype:"float32"}});f.push(d);const p=Yc({inputs:{a:d,b:h},backend:n});f.push(p);const y=ga({inputs:{x:p},backend:n,attrs:{axis:a,keepDims:o}});return f.forEach(g=>n.disposeIntermediateTensorInfo(g)),y}const dA={kernelName:qh,backendName:"cpu",kernelFunc:hA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{axis:a,keepDims:o}=s;ft(r,"min");const i=ae(a,r.shape);let l=i;const c=Nn(l,r.shape.length);let u=r;c!=null&&(u=_e({inputs:{x:r},backend:n,attrs:{perm:c}}),l=In(l.length,r.shape.length)),Us("min",l,u.shape.length);const[f,h]=qn(u.shape,l),d=nt(h),p=fe(nt(f),u.dtype),y=n.data.get(u.dataId).values;for(let m=0;m<p.length;++m){const w=m*d;let S=y[w];for(let k=0;k<d;++k){const I=y[w+k];(Number.isNaN(I)||I<S)&&(S=I)}p[m]=S}c!=null&&n.disposeIntermediateTensorInfo(u);const g=n.makeTensorInfo(f,u.dtype,p);if(o){const m=an(f,i),w=Ht({inputs:{x:g},backend:n,attrs:{shape:m}});return n.disposeIntermediateTensorInfo(g),w}return g}const mA={kernelName:Gh,backendName:"cpu",kernelFunc:pA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{paddings:a,mode:o}=s;ft(r,"mirrorPad");const i=a.map((S,k)=>S[0]+r.shape[k]+S[1]),l=a.map(S=>S[0]),c=a.map((S,k)=>S[0]+r.shape[k]),u=o==="reflect"?0:1,f=n.data.get(r.dataId).values,h=r.shape.length,d=yt(r.shape),p=nt(i),y=i.length,g=yt(i),m=ke(r.dtype,p);for(let S=0;S<p;S++){let k=Sr(S,y,g);for(let $=0;$<y;$++)k[$]<l[$]?k[$]=l[$]*2-k[$]-u:k[$]>=c[$]&&(k[$]=(c[$]-1)*2-k[$]+u);k=k.map(($,E)=>$-l[E]);const I=pn(k,h,d);m[S]=f[I]}return{dataId:n.write(m,i,r.dtype),shape:i,dtype:r.dtype}}const yA={kernelName:Kh,backendName:"cpu",kernelFunc:gA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const bA=Jt(((e,t)=>{const n=e%t;return e<0&&t<0||e>=0&&t>=0?n:(n+t)%t})),wA=se(nc,bA),kA={kernelName:nc,backendName:"cpu",kernelFunc:wA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Pm(e){const{inputs:t,backend:n,attrs:s}=e,{logits:r}=t,{dim:a}=s,o=r.shape.length;let i=a;if(i===-1&&(i=o-1),i!==o-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${o} and dim was ${i}`);const l=ae([i],r.shape),c=Rm({inputs:{x:r},backend:n,attrs:{reductionIndices:l,keepDims:!1}}),u=an(c.shape,l),f=Ht({inputs:{x:c},backend:n,attrs:{shape:u}}),h=Kc({inputs:{a:r,b:f},backend:n}),d=bm({inputs:{x:h},backend:n}),p=ga({inputs:{x:d},backend:n,attrs:{axis:l,keepDims:!1}}),y=Ht({inputs:{x:p},backend:n,attrs:{shape:u}}),g=Yc({inputs:{a:d,b:y},backend:n});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(h),n.disposeIntermediateTensorInfo(d),n.disposeIntermediateTensorInfo(p),n.disposeIntermediateTensorInfo(y),g}const vA={kernelName:xd,backendName:"cpu",kernelFunc:Pm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function SA(e){const{inputs:t,backend:n,attrs:s}=e,{logits:r}=t,{numSamples:a,seed:o,normalized:i}=s;ft(r,"multinomial");const l=i?r:Pm({inputs:{logits:r},backend:n,attrs:{dim:-1}}),c=l.shape[0],u=l.shape[1],f=n.data.get(l.dataId).values,h=[c,a],d=fe(nt(h),"int32");for(let p=0;p<c;++p){const y=p*u,g=new Float32Array(u-1);g[0]=f[y];for(let S=1;S<g.length;++S)g[S]=g[S-1]+f[y+S];const m=Ro.alea(o.toString()),w=p*a;for(let S=0;S<a;++S){const k=m();d[w+S]=g.length;for(let I=0;I<g.length;I++)if(k<g[I]){d[w+S]=I;break}}}return i||n.disposeIntermediateTensorInfo(l),n.makeTensorInfo(h,"int32",d)}const xA={kernelName:Xh,backendName:"cpu",kernelFunc:SA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const NA=Qp;function IA(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:a}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l}=s;ft(r,"NonMaxSuppression");const c=n.data.get(r.dataId).values,u=n.data.get(a.dataId).values,{selectedIndices:f}=NA(c,u,o,i,l);return n.makeTensorInfo([f.length],"int32",new Int32Array(f))}const TA={kernelName:Zh,backendName:"cpu",kernelFunc:IA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const $A=tm;function _A(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:a}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,padToMaxOutputSize:c}=s;ft(r,"NonMaxSuppressionPadded");const u=n.data.get(r.dataId).values,f=n.data.get(a.dataId).values,{selectedIndices:h,validOutputs:d}=$A(u,f,o,i,l,c);return[n.makeTensorInfo([h.length],"int32",new Int32Array(h)),n.makeTensorInfo([],"int32",new Int32Array([d]))]}const EA={kernelName:Jh,backendName:"cpu",kernelFunc:_A};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CA=em;function AA(e){const{inputs:t,backend:n,attrs:s}=e,{boxes:r,scores:a}=t,{maxOutputSize:o,iouThreshold:i,scoreThreshold:l,softNmsSigma:c}=s;ft(r,"NonMaxSuppressionWithScore");const u=n.data.get(r.dataId).values,f=n.data.get(a.dataId).values,h=o,d=i,p=l,y=c,{selectedIndices:g,selectedScores:m}=CA(u,f,h,d,p,y);return[n.makeTensorInfo([g.length],"int32",new Int32Array(g)),n.makeTensorInfo([m.length],"float32",new Float32Array(m))]}const DA={kernelName:Qh,backendName:"cpu",kernelFunc:AA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function OA(e){const{inputs:t,backend:n,attrs:s}=e,{indices:r}=t,{dtype:a,depth:o,onValue:i,offValue:l}=s;ft(r,"oneHot");const c=nt(r.shape),u=new Float32Array(c*o);u.fill(l);const f=n.data.get(r.dataId).values;for(let h=0;h<c;++h)f[h]>=0&&f[h]<o&&(u[h*o+f[h]]=i);return n.makeTensorInfo([...r.shape,o],a,u)}const FA={kernelName:ed,backendName:"cpu",kernelFunc:OA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function io(e){const{inputs:t,backend:n}=e,{x:s}=t;if(s.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(s.dtype==="complex64"){const r=Ls({inputs:{input:s},backend:n}),a=io({inputs:{x:r},backend:n}),o=gr({inputs:{input:s},backend:n}),i=io({inputs:{x:o},backend:n}),l=Re({inputs:{real:a,imag:i},backend:n});return n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(i),l}else return Zc({backend:n,attrs:{shape:s.shape,value:0,dtype:s.dtype}})}const RA={kernelName:Vd,backendName:"cpu",kernelFunc:io};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Mm(e){const{inputs:t,backend:n}=e,{x:s}=t;if(s.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(s.dtype==="complex64"){const r=Ls({inputs:{input:s},backend:n}),a=Mm({inputs:{x:r},backend:n}),o=gr({inputs:{input:s},backend:n}),i=io({inputs:{x:o},backend:n}),l=Re({inputs:{real:a,imag:i},backend:n});return n.disposeIntermediateTensorInfo(r),n.disposeIntermediateTensorInfo(a),n.disposeIntermediateTensorInfo(o),n.disposeIntermediateTensorInfo(i),l}else return Zc({backend:n,attrs:{shape:s.shape,value:1,dtype:s.dtype}})}const PA={kernelName:td,backendName:"cpu",kernelFunc:Mm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function Vm(e){const{inputs:t,backend:n,attrs:s}=e,{axis:r}=s;if(t.length===1)return oo({inputs:{input:t[0]},backend:n,attrs:{dim:r}});const a=t[0].shape,o=t[0].dtype;t.forEach(u=>{Le(a,u.shape,"All tensors passed to stack must have matching shapes"),T(o===u.dtype,()=>"All tensors passed to stack must have matching dtypes")});const i=[],l=t.map(u=>{const f=oo({inputs:{input:u},backend:n,attrs:{dim:r}});return i.push(f),f}),c=yr({inputs:l,backend:n,attrs:{axis:r}});return i.forEach(u=>n.disposeIntermediateTensorInfo(u)),c}const MA={kernelName:nd,backendName:"cpu",kernelFunc:Vm};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function VA(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{paddings:a,constantValue:o}=s;ft(r,"pad");const i=a.map((w,S)=>w[0]+r.shape[S]+w[1]),l=a.map(w=>w[0]),c=n.data.get(r.dataId).values,u=nt(r.shape),f=r.shape.length,h=yt(r.shape),d=nt(i),p=i.length,y=yt(i),g=ke(r.dtype,d);o!==0&&g.fill(o);for(let w=0;w<u;w++){const k=Sr(w,f,h).map(($,E)=>$+l[E]),I=pn(k,p,y);g[I]=c[w]}return{dataId:n.write(g,i,r.dtype),shape:i,dtype:r.dtype}}const Lm={kernelName:sd,backendName:"cpu",kernelFunc:VA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const LA=Jt((e,t)=>Math.pow(e,t)),zA=se(ac,LA),BA={kernelName:ac,backendName:"cpu",kernelFunc:zA};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function WA(e){const{inputs:t,backend:n,attrs:s}=e,{paramsNestedSplits:r,paramsDenseValues:a,indices:o}=t,{outputRaggedRank:i}=s,l=r.map(m=>n.data.get(m.dataId).values),c=r.map(m=>m.shape),u=n.data.get(a.dataId).values,f=n.data.get(o.dataId).values,[h,d,p]=R_(l,c,u,a.shape,a.dtype,f,o.shape),y=h.map(m=>n.makeTensorInfo([m.length],"int32",m)),g=n.makeTensorInfo(p,a.dtype,d);return y.concat([g])}const HA={kernelName:od,backendName:"cpu",kernelFunc:WA};/**
 * @license
 * Copyright 2022 Google LLC.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function UA(e){const{inputs:t,backend:n}=e,{starts:s,limits:r,deltas:a}=t,o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,l=n.data.get(a.dataId).values,[c,u]=P_(o,s.shape,s.dtype,i,r.shape,l,a.shape),f=n.makeTensorInfo([c.length],"int32",c),h=n.makeTensorInfo([u.length],s.dtype,u);return[f,h]}const jA={kernelName:id,backendName:"cpu",kernelFunc:UA};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function qA(e){const{inputs:t,backend:n,attrs:s}=e,{shape:r,values:a,defaultValue:o,rowPartitionTensors:i}=t,{rowPartitionTypes:l}=s,c=n.data.get(r.dataId).values,u=n.data.get(a.dataId).values,f=n.data.get(o.dataId).values,h=i.map(g=>n.data.get(g.dataId).values),d=i.map(g=>g.shape),[p,y]=M_(c,r.shape,u,a.shape,a.dtype,f,o.shape,h,d,l);return n.makeTensorInfo(p,a.dtype,y)}const GA={kernelName:ld,backendName:"cpu",kernelFunc:qA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function KA(e){const{backend:t,attrs:n}=e,{start:s,stop:r,dtype:a,step:o}=n,i=V_(s,r,o,a);return t.makeTensorInfo([i.length],a,i)}const XA={kernelName:cd,backendName:"cpu",kernelFunc:KA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const YA=Pt(oc,e=>1/e),ZA={kernelName:oc,backendName:"cpu",kernelFunc:YA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function JA(e){const{inputs:t,backend:n,attrs:s}=e,{images:r}=t,{alignCorners:a,halfPixelCenters:o,size:i}=s;ft(r,"resizeBilinear");const l=yt(r.shape),[c,u]=i,[f,h,d,p]=r.shape,y=n.data.get(r.dataId).values,g=new Float32Array(nt([f,c,u,p])),m=[a&&c>1?h-1:h,a&&u>1?d-1:d],w=[a&&c>1?c-1:c,a&&u>1?u-1:u];let S=0;const k=m[0]/w[0],I=m[1]/w[1];for(let $=0;$<f;$++)for(let E=0;E<c;E++){let D;o?D=k*(E+.5)-.5:D=k*E;const _=Math.max(0,Math.floor(D)),x=D-_,v=Math.min(h-1,Math.ceil(D)),R=$*l[0]+_*l[1],P=$*l[0]+v*l[1];for(let V=0;V<u;V++){let M;o?M=I*(V+.5)-.5:M=I*V;const L=Math.max(0,Math.floor(M)),W=M-L,z=Math.min(d-1,Math.ceil(M)),H=R+L*l[2],K=P+L*l[2],Y=R+z*l[2],Z=P+z*l[2];for(let Q=0;Q<p;Q++){const ot=y[H+Q],at=y[K+Q],ct=y[Y+Q],dt=y[Z+Q],mt=ot+(ct-ot)*W,pt=at+(dt-at)*W,kt=mt+(pt-mt)*x;g[S++]=kt}}}return n.makeTensorInfo([f,c,u,p],"float32",g)}const QA={kernelName:dd,backendName:"cpu",kernelFunc:JA};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tD(e){const{inputs:t,backend:n,attrs:s}=e,{images:r,dy:a}=t,{alignCorners:o}=s;ft([a,r],"resizeBilinearGrad");const i=yt(r.shape),[l,c,u,f]=r.shape,[,h,d]=a.shape,p=new Float32Array(l*c*u*f),y=[o&&h>1?c-1:c,o&&d>1?u-1:u],g=[o&&h>1?h-1:h,o&&d>1?d-1:d],m=y[0]/g[0],w=y[1]/g[1],S=n.data.get(a.dataId).values;let k=0;for(let I=0;I<l;I++){const $=I*i[0];for(let E=0;E<h;E++){const D=E*m,_=Math.floor(D),x=Math.min(Math.ceil(D),c-1),v=$+_*i[1],R=$+x*i[1],P=D-_,V=1-P;for(let M=0;M<d;M++){const L=M*w,W=Math.floor(L),z=Math.min(Math.ceil(L),u-1),H=L-W,K=1-H,Y=v+W*i[2],Z=v+z*i[2],Q=R+W*i[2],ot=R+z*i[2],at=V*K,ct=V*H,dt=P*K,mt=P*H;for(let pt=0;pt<f;pt++){const kt=S[k++];p[Y+pt]+=kt*at,p[Z+pt]+=kt*ct,p[Q+pt]+=kt*dt,p[ot+pt]+=kt*mt}}}}return n.makeTensorInfo([l,u,c,f],"float32",p)}const eD={kernelName:Hy,backendName:"cpu",kernelFunc:tD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nD(e){const{inputs:t,backend:n,attrs:s}=e,{images:r}=t,{alignCorners:a,halfPixelCenters:o,size:i}=s;ft(r,"resizeNearestNeighbor");const l=yt(r.shape),[c,u]=i,[f,h,d,p]=r.shape,y=n.data.get(r.dataId).values,g=new Float32Array(f*c*u*p),m=[a&&c>1?h-1:h,a&&u>1?d-1:d],w=[a&&c>1?c-1:c,a&&u>1?u-1:u],S=m[0]/w[0],k=m[1]/w[1];let I=0;for(let $=0;$<f;$++){const E=$*l[0];for(let D=0;D<c;D++){const _=o?S*(D+.5):S*D;let x=Math.min(h-1,a?Math.round(_):Math.floor(_));o&&(x=Math.max(0,x));const v=E+x*l[1];for(let R=0;R<u;R++){const P=o?k*(R+.5):k*R;let V=Math.min(d-1,a?Math.round(P):Math.floor(P));o&&(V=Math.max(0,V));const M=v+V*l[2];for(let L=0;L<p;L++){const W=y[M+L];g[I++]=W}}}}return n.makeTensorInfo([f,c,u,p],r.dtype,g)}const sD={kernelName:hd,backendName:"cpu",kernelFunc:nD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function rD(e){const{inputs:t,backend:n,attrs:s}=e,{images:r,dy:a}=t,{alignCorners:o}=s;ft([a,r],"resizeNearestNeighborGrad");const i=yt(r.shape),l=yt(a.shape),[c,u,f,h]=r.shape,[,d,p]=a.shape,y=new Float32Array(c*u*f*h),g=n.data.get(a.dataId).values,m=[o&&d>1?u-1:u,o&&p>1?f-1:f],w=[o&&d>1?d-1:d,o&&p>1?p-1:p],S=m[0]/w[0],k=m[1]/w[1],I=1/S,$=1/k,E=Math.ceil(I)*2+2,D=Math.ceil($)*2+2;for(let _=0;_<c;_++){const x=_*i[0];for(let v=0;v<u;v++){const R=x+v*i[1],P=Math.floor(v*I),V=Math.floor(P-E/2);for(let M=0;M<f;M++){const L=R+M*i[2],W=Math.floor(M*$),z=Math.floor(W-D/2);for(let H=0;H<h;H++){let K=0;for(let Y=0;Y<E;Y++){const Z=Y+V;if(Z<0||Z>=d)continue;const Q=x+Z*l[1],ot=Z*S,at=Math.min(u-1,o?Math.round(ot):Math.floor(ot));if(v===at)for(let ct=0;ct<D;ct++){const dt=ct+z;if(dt<0||dt>=p)continue;const mt=Q+dt*l[2],pt=dt*k,kt=Math.min(f-1,o?Math.round(pt):Math.floor(pt));M===kt&&(K+=g[mt+H])}}y[L+H]=K}}}}return n.makeTensorInfo(r.shape,r.dtype,y)}const aD={kernelName:Wy,backendName:"cpu",kernelFunc:rD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function oD(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{dims:a}=s;ft(r,"reverse");const o=r.shape.length,i=ae(a,r.shape);if(o===0)return kn({inputs:{x:r},backend:n});const l=new ee(r.shape,r.dtype),c=n.bufferSync(r);for(let u=0;u<l.size;u++){const f=l.indexToLoc(u),h=f.slice();i.forEach(d=>h[d]=r.shape[d]-1-h[d]),l.set(c.get(...h),...f)}return n.makeTensorInfo(l.shape,l.dtype,l.values)}const iD={kernelName:pd,backendName:"cpu",kernelFunc:oD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const lD={kernelName:Ld,backendName:"cpu",kernelFunc:({inputs:e,attrs:t,backend:n})=>{const{image:s}=e,{radians:r,fillValue:a,center:o}=t,i=n,l=ke(s.dtype,nt(s.shape)),[c,u,f,h]=s.shape,[d,p]=tT(o,u,f),y=255,g=Math.sin(r),m=Math.cos(r),w=i.data.get(s.dataId).values;for(let k=0;k<c;k++){const I=k*f*u*h;for(let $=0;$<u;$++){const E=$*(f*h);for(let D=0;D<f;D++){const _=D*h;for(let x=0;x<h;x++){const v=[c,$,D,x],R=v[2],P=v[1];let V=(R-d)*m-(P-p)*g,M=(R-d)*g+(P-p)*m;V=Math.round(V+d),M=Math.round(M+p);let L=a;if(typeof a!="number"&&(x===3?L=y:L=a[x]),V>=0&&V<f&&M>=0&&M<u){const z=M*(f*h),H=V*h,K=I+z+H+x;L=w[K]}const W=I+E+_+x;l[W]=L}}}}return{dataId:i.write(l,s.shape,s.dtype),shape:s.shape,dtype:s.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const cD=Pt(cc,e=>{const t=Math.floor(e);return e-t<.5?Math.floor(e):e-t>.5?Math.ceil(e):t%2===0?t:t+1}),uD={kernelName:cc,backendName:"cpu",kernelFunc:cD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function fD(e){const{inputs:t,backend:n,attrs:s}=e,{indices:r,updates:a}=t,{shape:o}=s,{sliceRank:i,numUpdates:l,sliceSize:c,strides:u,outputSize:f}=Mc(a,r,o),h=!0,d=n.bufferSync(r),p=n.bufferSync(a),y=er(d,p,o,f,c,l,i,u,0,h);return n.makeTensorInfo(o,y.dtype,y.values)}const hD={kernelName:md,backendName:"cpu",kernelFunc:fD};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function dD(e,t){let n=0,s=e.length,r=0;for(;n<s;)r=Math.floor((n+s)/2),e[r]<t?n=r+1:s=r;return s}function pD(e,t){let n=0,s=e.length,r=0;for(;n<s;)r=Math.floor((n+s)/2),e[r]<=t?n=r+1:s=r;return s}function mD(e,t,n,s,r,a){const o=Qt("int32",n*r);for(let i=0;i<n;++i){const l=e.slice(i*s,(i+1)*s),c=i*r;for(let u=0;u<r;++u)o[c+u]=a==="left"?dD(l,t[u+c]):pD(l,t[u+c])}return o}/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function gD(e){const{inputs:t,backend:n,attrs:s}=e,{sortedSequence:r,values:a}=t,{side:o}=s,i=n.data.get(r.dataId).values,l=n.data.get(a.dataId).values,c=mD(i,l,r.shape[0],r.shape[1],a.shape[1],o);return n.makeTensorInfo(a.shape,"int32",c)}const yD={kernelName:yd,backendName:"cpu",kernelFunc:gD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function bD(e){const{inputs:t,backend:n}=e,{condition:s,t:r,e:a}=t;ft([s,r,a],"select");const o=s.shape.length,i=n.data.get(s.dataId).values,l=n.data.get(r.dataId).values,c=n.data.get(a.dataId).values,u=xr(r.dtype,a.dtype),f=fe(nt(r.shape),u);let h=0;const d=o===0||o>1||r.shape.length===1?1:nt(r.shape.slice(1));for(let p=0;p<i.length;p++)for(let y=0;y<d;y++)i[p]===1?f[h++]=l[p]:f[h++]=c[p];return n.makeTensorInfo(r.shape,u,f)}const wD={kernelName:bd,backendName:"cpu",kernelFunc:bD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const kD=sT,vD=rT,SD=Pt(fc,e=>e>=0?vD*e:kD*(Math.exp(e)-1)),xD={kernelName:fc,backendName:"cpu",kernelFunc:SD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const ND=Pt(pc,e=>e<0?-1:e>0?1:0),ID={kernelName:pc,backendName:"cpu",kernelFunc:ND};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const TD=Pt(hc,e=>Math.sin(e)),$D={kernelName:hc,backendName:"cpu",kernelFunc:TD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _D=Pt(dc,e=>Math.sinh(e)),ED={kernelName:dc,backendName:"cpu",kernelFunc:_D};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const CD=11920928955078125e-23,df=Math.log(CD)+2,AD=Pt(gc,e=>{const t=e>-df,n=e<df,s=Math.exp(e);let r;return n?r=s:t?r=e:r=Math.log(1+s),r}),DD={kernelName:gc,backendName:"cpu",kernelFunc:AD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function OD(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{blockShape:a,paddings:o}=s;ft([r],"spaceToBatchND");const i=nt(a),l=[[0,0]];l.push(...o);for(let $=1+a.length;$<r.shape.length;++$)l.push([0,0]);const c=Lm.kernelFunc({inputs:{x:r},backend:n,attrs:{paddings:l,constantValue:0}}),u=cm(c.shape,a,i,!1),f=um(u.length,a.length,!1),h=fm(c.shape,a,i,!1),y=Ht({inputs:{x:c},backend:n,attrs:{shape:u}}),w=_e({inputs:{x:y},backend:n,attrs:{perm:f}}),I=Ht({inputs:{x:w},backend:n,attrs:{shape:h}});return n.disposeIntermediateTensorInfo(c),n.disposeIntermediateTensorInfo(y),n.disposeIntermediateTensorInfo(w),I}const FD={kernelName:vd,backendName:"cpu",kernelFunc:OD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function RD(e){const{inputs:t,backend:n}=e,{indices:s,values:r,denseShape:a,defaultValue:o}=t;if(a.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${a.shape}`);if(s.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${s.shape}`);if(r.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${r.shape}`);if(o.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${o.shape}`);const i=n.data.get(s.dataId).values,l=n.data.get(r.dataId).values,c=n.data.get(a.dataId).values,u=n.data.get(o.dataId).values[0],[f,h,d,p,y]=j_(i,s.shape,s.dtype,l,r.dtype,c,u);return[n.makeTensorInfo(h,s.dtype,f),n.makeTensorInfo([h[0]],r.dtype,d),n.makeTensorInfo([p.length],"bool",new Uint8Array(p.map(g=>Number(g)))),n.makeTensorInfo([y.length],s.dtype,new Int32Array(y))]}const PD={kernelName:Nd,backendName:"cpu",kernelFunc:RD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function MD(e){const{inputs:t,backend:n}=e,{inputIndices:s,inputShape:r,newShape:a}=t;if(s.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${s.shape}`);if(r.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${r.shape}`);if(a.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${a.shape}`);const o=Array.from(n.data.get(r.dataId).values),i=n.data.get(s.dataId).values,l=Array.from(n.data.get(a.dataId).values),[c,u,f]=q_(i,s.shape,s.dtype,o,l);return[n.makeTensorInfo(u,s.dtype,c),n.makeTensorInfo([f.length],a.dtype,new Int32Array(f))]}const VD={kernelName:Id,backendName:"cpu",kernelFunc:MD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function LD(e){const{inputs:t,backend:n}=e,{data:s,indices:r,segmentIds:a}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${r.shape}`);if(a.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${a.shape}`);if(r.shape[0]!==a.shape[0])throw new Error("segmentIds and indices should have same size.");const o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,l=n.data.get(a.dataId).values,[c,u]=Sm(o,s.shape,s.dtype,i,l,!0);return n.makeTensorInfo(u,s.dtype,c)}const zD={kernelName:Td,backendName:"cpu",kernelFunc:LD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function BD(e){const{inputs:t,backend:n}=e,{data:s,indices:r,segmentIds:a}=t;if(s.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(r.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${r.shape}`);if(a.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${a.shape}`);if(r.shape[0]!==a.shape[0])throw new Error("segmentIds and indices should have same size.");const o=n.data.get(s.dataId).values,i=n.data.get(r.dataId).values,l=n.data.get(a.dataId).values,[c,u]=Sm(o,s.shape,s.dtype,i,l);return n.makeTensorInfo(u,s.dtype,c)}const WD={kernelName:$d,backendName:"cpu",kernelFunc:BD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function HD(e){const{inputs:t,backend:n,attrs:s}=e,{sparseIndices:r,sparseValues:a,defaultValue:o}=t,{outputShape:i}=s,{sliceRank:l,numUpdates:c,sliceSize:u,strides:f,outputSize:h}=Mc(a,r,i),d=!1,p=n.bufferSync(r);let y;switch(a.dtype){case"bool":{const g=n.bufferSync(a),m=!!n.data.get(o.dataId).values[0];y=er(p,g,i,h,u,c,l,f,m,d);break}case"float32":{const g=n.bufferSync(a),m=n.data.get(o.dataId).values[0];y=er(p,g,i,h,u,c,l,f,m,d);break}case"int32":{const g=n.bufferSync(a),m=n.data.get(o.dataId).values[0];y=er(p,g,i,h,u,c,l,f,m,d);break}case"string":{const g=n.bufferSync(a),m=Zr(n.data.get(o.dataId).values[0]);y=er(p,g,i,h,u,c,l,f,m,d);break}default:throw new Error(`Unsupported type ${a.dtype}`)}return n.makeTensorInfo(i,y.dtype,y.values)}const UD={kernelName:_d,backendName:"cpu",kernelFunc:HD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function jD(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{numOrSizeSplits:a,axis:o}=s,i=ae(o,r.shape)[0],l=NT(r,a,i),c=new Array(r.shape.length).fill(0),u=r.shape.slice();return l.map(f=>{const h=[...u];h[i]=f;const d=zs({inputs:{x:r},backend:n,attrs:{begin:c,size:h}});return c[i]+=f,d})}const qD={kernelName:Sd,backendName:"cpu",kernelFunc:jD};/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const GD={kernelName:Uy,backendName:"cpu",kernelFunc:({inputs:e,backend:t})=>{const{x:n}=e,s=t;ft(n,"square");const r=s.data.get(n.dataId).values,a=new Float32Array(r.length);for(let i=0;i<r.length;++i){const l=r[i];a[i]=l*l}return{dataId:s.write(a,n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const KD=Pt(Nc,(e,t)=>{const n=t;return isNaN(e)?NaN:e>0?1:n.alpha}),XD={kernelName:Nc,backendName:"cpu",kernelFunc:KD};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function YD(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{begin:a,end:o,strides:i,beginMask:l,endMask:c,ellipsisMask:u,newAxisMask:f,shrinkAxisMask:h}=s;ft(r,"stridedSlice");const{finalShapeSparse:d,finalShape:p,isIdentity:y,sliceDim0:g,isSimpleSlice:m,begin:w,end:S,strides:k}=GI(r.shape,a,o,i,l,c,u,f,h);let I;if(y)I=Ht({inputs:{x:r},backend:n,attrs:{shape:p}});else if(g||m){T(r.shape.length>=1,()=>`Input must have rank at least 1, got: ${r.shape.length}`);const $=HI(w,S,k),E=zs({inputs:{x:r},backend:n,attrs:{begin:w,size:$}});I=Ht({inputs:{x:E},backend:n,attrs:{shape:p}}),n.disposeIntermediateTensorInfo(E)}else{const $=n.bufferSync(r),E=eE(d,$,k,w);I=n.makeTensorInfo(p,E.dtype,E.values)}return I}const ZD={kernelName:Ed,backendName:"cpu",kernelFunc:YD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function JD(e){const{inputs:t,backend:n,attrs:s}=e,{separator:r,nGramWidths:a,leftPad:o,rightPad:i,padWidth:l,preserveShortSequences:c}=s,{data:u,dataSplits:f}=t,h=n.data.get(u.dataId).values,d=n.data.get(f.dataId).values,[p,y]=sE(h,d,r,a,o,i,l,c);return[n.makeTensorInfo([p.length],"string",p),n.makeTensorInfo(f.shape,"int32",y)]}const QD={kernelName:Cd,backendName:"cpu",kernelFunc:JD};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function tO(e){const{inputs:t,backend:n,attrs:s}=e,{skipEmpty:r}=s,{input:a,delimiter:o}=t;if(a.dtype!=="string")throw new Error("Input must be of datatype string");if(a.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${a.shape}`);if(o.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${o.shape}`);const i=n.data.get(a.dataId).values,l=n.data.get(o.dataId).values[0],[c,u,f]=aE(i,l,r),h=u.length;return[n.makeTensorInfo([h,2],"int32",c),n.makeTensorInfo([h],"string",u),n.makeTensorInfo([2],"int32",new Int32Array(f))]}const eO={kernelName:Ad,backendName:"cpu",kernelFunc:tO};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function nO(e){const{inputs:t,backend:n,attrs:s}=e,{numBuckets:r}=s,{input:a}=t;if(a.dtype!=="string")throw new Error("Input must be of datatype string");if(r<=0)throw new Error("Number of buckets must be at least 1");const o=n.data.get(a.dataId).values,i=oE(o,r);return n.makeTensorInfo(a.shape,"int32",i)}const sO={kernelName:Dd,backendName:"cpu",kernelFunc:nO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const rO=Pt(vc,e=>Math.tan(e)),aO={kernelName:vc,backendName:"cpu",kernelFunc:rO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const oO=Pt(Sc,e=>Math.tanh(e)),iO={kernelName:Sc,backendName:"cpu",kernelFunc:oO};/**
 * @license
 * Copyright 2022 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function lO(e){const{inputs:t,backend:n}=e,{tensor:s,indices:r,updates:a}=t,{sliceRank:o,numUpdates:i,sliceSize:l,strides:c,outputSize:u}=Mc(a,r,s.shape),f=!1,h=n.bufferSync(r),d=n.bufferSync(a),p=n.bufferSync(s),y=er(h,d,s.shape,u,l,i,o,c,p,f);return n.makeTensorInfo(s.shape,y.dtype,y.values)}const cO={kernelName:gd,backendName:"cpu",kernelFunc:lO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function uO(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{reps:a}=s;ft(r,"tile");const o=uE(n.bufferSync(r),a);return n.makeTensorInfo(o.shape,o.dtype,o.values)}const fO={kernelName:xc,backendName:"cpu",kernelFunc:uO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function hO(e){const{inputs:t,backend:n,attrs:s}=e,{x:r}=t,{k:a,sorted:o}=s;ft(r,"topk");const i=n.data.get(r.dataId).values,[l,c]=fE(i,r.shape,r.dtype,a,o);return[n.makeTensorInfo(l.shape,l.dtype,l.values),n.makeTensorInfo(c.shape,c.dtype,c.values)]}const dO={kernelName:Od,backendName:"cpu",kernelFunc:hO};/**
 * @license
 * Copyright 2021 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function pO(e){const{inputs:t,attrs:n,backend:s}=e,{image:r,transforms:a}=t,{interpolation:o,fillMode:i,fillValue:l,outputShape:c}=n,[u,f,h,d]=r.shape,[p,y]=c??[f,h],g=[u,p,y,d],m=yt(r.shape),w=m[0],S=m[1],k=m[2],I=yt(g),$=I[0],E=I[1],D=I[2],_=ke(r.dtype,nt(g));_.fill(l);const x=s.data.get(r.dataId).values,v=s.data.get(a.dataId).values;for(let P=0;P<u;++P){const V=a.shape[0]===1?v:v.subarray(P*8,P*8+8);for(let M=0;M<p;++M)for(let L=0;L<y;++L)for(let W=0;W<d;++W){let z;const H=V[6]*L+V[7]*M+1;if(H===0)continue;const K=(V[0]*L+V[1]*M+V[2])/H,Y=(V[3]*L+V[4]*M+V[5])/H,Z=pf(K,h,i),Q=pf(Y,f,i);switch(o){case"nearest":z=kO(x,f,h,w,S,k,P,Q,Z,W,l);break;case"bilinear":z=vO(x,f,h,w,S,k,P,Q,Z,W,l);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${o}`)}const ot=P*$+M*E+L*D+W;_[ot]=z}return s.makeTensorInfo(g,r.dtype,_)}return{dataId:s.write(_,g,r.dtype),shape:r.shape,dtype:r.dtype}}const mO={kernelName:Fd,backendName:"cpu",kernelFunc:pO};function pf(e,t,n){switch(n){case"reflect":return gO(e,t);case"wrap":return yO(e,t);case"nearest":return wO(e,t);case"constant":default:return bO(e)}}function gO(e,t){let n=e;if(n<0)if(t<=1)n=0;else{const s=2*t;n<s&&(n=s*Math.trunc(-n/s)+n),n=n<-t?n+s:-n-1}else if(n>t-1)if(t<=1)n=0;else{const s=2*t;n-=s*Math.trunc(n/s),n>=t&&(n=s-n-1)}return yl(0,n,t-1)}function yO(e,t){let n=e;if(n<0)if(t<=1)n=0;else{const s=t-1;n+=t*(Math.trunc(-n/s)+1)}else if(n>t-1)if(t<=1)n=0;else{const s=t-1;n-=t*Math.trunc(n/s)}return yl(0,n,t-1)}function bO(e,t){return e}function wO(e,t){return yl(0,e,t-1)}function Mr(e,t,n,s,r,a,o,i,l,c,u){const f=o*s+i*r+l*a+c;return 0<=i&&i<t&&0<=l&&l<n?e[f]:u}function kO(e,t,n,s,r,a,o,i,l,c,u){const f=Math.round(i),h=Math.round(l);return Mr(e,t,n,s,r,a,o,f,h,c,u)}function vO(e,t,n,s,r,a,o,i,l,c,u){const f=Math.floor(i),h=Math.floor(l),d=f+1,p=h+1,y=(p-l)*Mr(e,t,n,s,r,a,o,f,h,c,u)+(l-h)*Mr(e,t,n,s,r,a,o,f,p,c,u),g=(p-l)*Mr(e,t,n,s,r,a,o,d,h,c,u)+(l-h)*Mr(e,t,n,s,r,a,o,d,p,c,u);return(d-i)*y+(i-f)*g}/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the License);
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an AS IS BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function SO(e){const{inputs:t,attrs:n,backend:s}=e,{axis:r}=n,{x:a}=t;ft(a,"unique");const o=s.data.get(a.dataId).values,{outputValues:i,outputShape:l,indices:c}=hE(o,r,a.shape,a.dtype);return[s.makeTensorInfo(l,a.dtype,i),s.makeTensorInfo([c.length],"int32",c)]}const xO={kernelName:Rd,backendName:"cpu",kernelFunc:SO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function NO(e){const{inputs:t,backend:n,attrs:s}=e,{value:r}=t;let{axis:a}=s;a<0&&(a+=r.shape.length);const o=r.shape.length,i=r.shape[a],l=new Array(o-1);let c=0;for(let d=0;d<o;d++)d!==a&&(l[c++]=r.shape[d]);const u=new Array(o).fill(0),f=r.shape.slice();f[a]=1;const h=new Array(i);for(let d=0;d<h.length;d++){u[a]=d;const p=zs({inputs:{x:r},backend:n,attrs:{begin:u,size:f}});h[d]=Ht({inputs:{x:p},backend:n,attrs:{shape:l}}),n.disposeIntermediateTensorInfo(p)}return h}const IO={kernelName:Pd,backendName:"cpu",kernelFunc:NO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */function TO(e){const{inputs:t,backend:n,attrs:s}=e,{x:r,segmentIds:a}=t,{numSegments:o}=s;ft(r,"unsortedSegmentSum");const i=r.shape.length,l=a.shape.length,c=[],u=[],f=i-l;let h=a;for(let p=0;p<f;++p){const y=oo({inputs:{input:h},backend:n,attrs:{dim:p+1}});h=y,u.push(y)}for(let p=0;p<o;++p){const y=Ic(p,"int32"),g=n.makeTensorInfo([],"int32",y),m=ym({inputs:{a:g,b:h},backend:n}),w=cs({inputs:{x:m},backend:n,attrs:{dtype:"float32"}}),S=Vo({inputs:{a:w,b:r},backend:n}),k=ga({inputs:{x:S},backend:n,attrs:{axis:0,keepDims:!1}});c.push(k),u.push(g),u.push(m),u.push(w),u.push(S),u.push(k)}const d=Vm({inputs:c,backend:n,attrs:{axis:0}});return u.forEach(p=>n.disposeIntermediateTensorInfo(p)),d}const $O={kernelName:Md,backendName:"cpu",kernelFunc:TO};/**
 * @license
 * Copyright 2020 Google LLC. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */const _O=[SE,g$,NE,TE,N$,_E,CE,DE,FE,PE,VE,zE,WE,jE,GE,YE,JE,tC,nC,kE,rC,oC,lC,_$,uC,v$,A$,hC,y$,pC,gC,yC,wC,vC,xC,IC,$C,EC,AC,OC,RC,MC,LC,BC,WC,UC,qC,KC,XC,YC,ZC,QC,n3,dE,r3,F$,h3,P$,d3,L$,w3,k3,S3,W$,j$,N3,T3,_3,C3,Y$,Q$,b$,D3,mC,F3,P3,V3,pE,n_,a_,z3,c_,W3,j3,G3,Y3,J3,tA,eA,d_,sA,aA,iA,cA,fA,dA,mA,g_,yA,kA,xA,b_,v_,TA,EA,DA,N_,FA,PA,MA,Lm,BA,gE,__,HA,jA,GA,XA,w$,tl,ZA,yE,bE,wE,QA,eD,sD,aD,iD,lD,uD,B_,hD,yD,wD,xD,W_,ID,$D,ED,U_,vA,DD,FD,PD,VD,zD,WD,UD,qD,K_,GD,Z_,tE,XD,ZD,QD,eO,sO,cE,t3,aO,iO,cO,fO,dO,mO,I_,xO,IO,$O,RA];for(const e of _O)qy(e);var EO=class{constructor(e){Yn(this,"model");Yn(this,"dict",[]);Yn(this,"canvas");Yn(this,"ctx");Yn(this,"modelPath");Yn(this,"dictPath");Yn(this,"backend");this.modelPath=e.modelPath,this.dictPath=e.dictPath,this.backend=e.backend||"cpu",this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=64,this.ctx=this.canvas.getContext("2d",{willReadFrequently:!0})}async initialize(e){const t=await fetch(this.dictPath).then(n=>n.text());return this.dict=t.split(`
`),this.model=await f$(this.modelPath,{streamWeights:!0,onProgress:e==null?void 0:e.onProgress}),this.backend==="webgl"?(await Ou("webgl"),await kb(),await this.recognize([10,10,0,20,20,1])):await Ou("cpu"),!0}async recognize(e){if(!this.model)throw new Error("Model not initialized");const{canvas:t,ctx:n,model:s,dict:r}=this;n.fillStyle="white",n.fillRect(0,0,t.width,t.height);const a=e.length/3,o=Array.from({length:a},(m,w)=>({x:e[3*w],y:e[3*w+1],isEnd:e[3*w+2]===1}));let i=1/0,l=1/0,c=-1/0,u=-1/0;for(const{x:m,y:w}of o)m<i&&(i=m),m>c&&(c=m),w<l&&(l=w),w>u&&(u=w);const f=c-i||1,h=u-l||1,d=(i+c)/2,p=(l+u)/2,y=Math.min(t.width*.9/f,t.height*.9/h);n.strokeStyle="black",n.lineWidth=2,n.lineCap="round",n.lineJoin="round";let g=null;for(const m of o){const w=t.width/2+(m.x-d)*y,S=t.height/2+(m.y-p)*y;g&&!g.isEnd?(n.beginPath(),n.moveTo(t.width/2+(g.x-d)*y,t.height/2+(g.y-p)*y),n.lineTo(w,S),n.stroke()):(n.beginPath(),n.moveTo(w,S)),g=m}return Dt(()=>{const m=LI(t,3),w=Zt(m,"float32"),S=Wt(w,255),k=En(S,0),I=s.predict(k).dataSync();return Array.from(I.keys()).sort((E,D)=>I[D]-I[E]).slice(0,10).map(E=>E<r.length?r[E]:"").filter(Boolean)})}async close(){var e;(e=this.model)==null||e.dispose(),this.model=void 0}};/**
* @vue/shared v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function Jc(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const Ot={},or=[],yn=()=>{},zm=()=>!1,Lo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),Qc=e=>e.startsWith("onUpdate:"),le=Object.assign,tu=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},CO=Object.prototype.hasOwnProperty,Rt=(e,t)=>CO.call(e,t),wt=Array.isArray,ir=e=>ya(e)==="[object Map]",zo=e=>ya(e)==="[object Set]",mf=e=>ya(e)==="[object Date]",Nt=e=>typeof e=="function",ne=e=>typeof e=="string",vn=e=>typeof e=="symbol",Vt=e=>e!==null&&typeof e=="object",Bm=e=>(Vt(e)||Nt(e))&&Nt(e.then)&&Nt(e.catch),Wm=Object.prototype.toString,ya=e=>Wm.call(e),AO=e=>ya(e).slice(8,-1),Hm=e=>ya(e)==="[object Object]",eu=e=>ne(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,Wr=Jc(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Bo=e=>{const t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},DO=/-\w/g,Wn=Bo(e=>e.replace(DO,t=>t.slice(1).toUpperCase())),OO=/\B([A-Z])/g,ms=Bo(e=>e.replace(OO,"-$1").toLowerCase()),Um=Bo(e=>e.charAt(0).toUpperCase()+e.slice(1)),ui=Bo(e=>e?`on${Um(e)}`:""),Fe=(e,t)=>!Object.is(e,t),Ba=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},jm=(e,t,n,s=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:s,value:n})},nu=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let gf;const Wo=()=>gf||(gf=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function Bs(e){if(wt(e)){const t={};for(let n=0;n<e.length;n++){const s=e[n],r=ne(s)?MO(s):Bs(s);if(r)for(const a in r)t[a]=r[a]}return t}else if(ne(e)||Vt(e))return e}const FO=/;(?![^(]*\))/g,RO=/:([^]+)/,PO=/\/\*[^]*?\*\//g;function MO(e){const t={};return e.replace(PO,"").split(FO).forEach(n=>{if(n){const s=n.split(RO);s.length>1&&(t[s[0].trim()]=s[1].trim())}}),t}function bn(e){let t="";if(ne(e))t=e;else if(wt(e))for(let n=0;n<e.length;n++){const s=bn(e[n]);s&&(t+=s+" ")}else if(Vt(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const VO="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",LO=Jc(VO);function qm(e){return!!e||e===""}function zO(e,t){if(e.length!==t.length)return!1;let n=!0;for(let s=0;n&&s<e.length;s++)n=Ws(e[s],t[s]);return n}function Ws(e,t){if(e===t)return!0;let n=mf(e),s=mf(t);if(n||s)return n&&s?e.getTime()===t.getTime():!1;if(n=vn(e),s=vn(t),n||s)return e===t;if(n=wt(e),s=wt(t),n||s)return n&&s?zO(e,t):!1;if(n=Vt(e),s=Vt(t),n||s){if(!n||!s)return!1;const r=Object.keys(e).length,a=Object.keys(t).length;if(r!==a)return!1;for(const o in e){const i=e.hasOwnProperty(o),l=t.hasOwnProperty(o);if(i&&!l||!i&&l||!Ws(e[o],t[o]))return!1}}return String(e)===String(t)}function Gm(e,t){return e.findIndex(n=>Ws(n,t))}const Km=e=>!!(e&&e.__v_isRef===!0),ye=e=>ne(e)?e:e==null?"":wt(e)||Vt(e)&&(e.toString===Wm||!Nt(e.toString))?Km(e)?ye(e.value):JSON.stringify(e,Xm,2):String(e),Xm=(e,t)=>Km(t)?Xm(e,t.value):ir(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[s,r],a)=>(n[fi(s,a)+" =>"]=r,n),{})}:zo(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>fi(n))}:vn(t)?fi(t):Vt(t)&&!wt(t)&&!Hm(t)?String(t):t,fi=(e,t="")=>{var n;return vn(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let he;class BO{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.__v_skip=!0,this.parent=he,!t&&he&&(this.index=(he.scopes||(he.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=he;try{return he=this,t()}finally{he=n}}}on(){++this._on===1&&(this.prevScope=he,he=this)}off(){this._on>0&&--this._on===0&&(he=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,s;for(n=0,s=this.effects.length;n<s;n++)this.effects[n].stop();for(this.effects.length=0,n=0,s=this.cleanups.length;n<s;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,s=this.scopes.length;n<s;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const r=this.parent.scopes.pop();r&&r!==this&&(this.parent.scopes[this.index]=r,r.index=this.index)}this.parent=void 0}}}function Ym(){return he}function WO(e,t=!1){he&&he.cleanups.push(e)}let Ut;const hi=new WeakSet;class Zm{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,he&&he.active&&he.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,hi.has(this)&&(hi.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Qm(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,yf(this),tg(this);const t=Ut,n=Qe;Ut=this,Qe=!0;try{return this.fn()}finally{eg(this),Ut=t,Qe=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)au(t);this.deps=this.depsTail=void 0,yf(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?hi.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){nl(this)&&this.run()}get dirty(){return nl(this)}}let Jm=0,Hr,Ur;function Qm(e,t=!1){if(e.flags|=8,t){e.next=Ur,Ur=e;return}e.next=Hr,Hr=e}function su(){Jm++}function ru(){if(--Jm>0)return;if(Ur){let t=Ur;for(Ur=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Hr;){let t=Hr;for(Hr=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(s){e||(e=s)}t=n}}if(e)throw e}function tg(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function eg(e){let t,n=e.depsTail,s=n;for(;s;){const r=s.prevDep;s.version===-1?(s===n&&(n=r),au(s),HO(s)):t=s,s.dep.activeLink=s.prevActiveLink,s.prevActiveLink=void 0,s=r}e.deps=t,e.depsTail=n}function nl(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(ng(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function ng(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===ia)||(e.globalVersion=ia,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!nl(e))))return;e.flags|=2;const t=e.dep,n=Ut,s=Qe;Ut=e,Qe=!0;try{tg(e);const r=e.fn(e._value);(t.version===0||Fe(r,e._value))&&(e.flags|=128,e._value=r,t.version++)}catch(r){throw t.version++,r}finally{Ut=n,Qe=s,eg(e),e.flags&=-3}}function au(e,t=!1){const{dep:n,prevSub:s,nextSub:r}=e;if(s&&(s.nextSub=r,e.prevSub=void 0),r&&(r.prevSub=s,e.nextSub=void 0),n.subs===e&&(n.subs=s,!s&&n.computed)){n.computed.flags&=-5;for(let a=n.computed.deps;a;a=a.nextDep)au(a,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function HO(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Qe=!0;const sg=[];function Hn(){sg.push(Qe),Qe=!1}function Un(){const e=sg.pop();Qe=e===void 0?!0:e}function yf(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=Ut;Ut=void 0;try{t()}finally{Ut=n}}}let ia=0;class UO{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Ho{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(t){if(!Ut||!Qe||Ut===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==Ut)n=this.activeLink=new UO(Ut,this),Ut.deps?(n.prevDep=Ut.depsTail,Ut.depsTail.nextDep=n,Ut.depsTail=n):Ut.deps=Ut.depsTail=n,rg(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const s=n.nextDep;s.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=s),n.prevDep=Ut.depsTail,n.nextDep=void 0,Ut.depsTail.nextDep=n,Ut.depsTail=n,Ut.deps===n&&(Ut.deps=s)}return n}trigger(t){this.version++,ia++,this.notify(t)}notify(t){su();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{ru()}}}function rg(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let s=t.deps;s;s=s.nextDep)rg(s)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const sl=new WeakMap,Es=Symbol(""),rl=Symbol(""),la=Symbol("");function ge(e,t,n){if(Qe&&Ut){let s=sl.get(e);s||sl.set(e,s=new Map);let r=s.get(n);r||(s.set(n,r=new Ho),r.map=s,r.key=n),r.track()}}function Fn(e,t,n,s,r,a){const o=sl.get(e);if(!o){ia++;return}const i=l=>{l&&l.trigger()};if(su(),t==="clear")o.forEach(i);else{const l=wt(e),c=l&&eu(n);if(l&&n==="length"){const u=Number(s);o.forEach((f,h)=>{(h==="length"||h===la||!vn(h)&&h>=u)&&i(f)})}else switch((n!==void 0||o.has(void 0))&&i(o.get(n)),c&&i(o.get(la)),t){case"add":l?c&&i(o.get("length")):(i(o.get(Es)),ir(e)&&i(o.get(rl)));break;case"delete":l||(i(o.get(Es)),ir(e)&&i(o.get(rl)));break;case"set":ir(e)&&i(o.get(Es));break}}ru()}function Gs(e){const t=Ft(e);return t===e?t:(ge(t,"iterate",la),Ge(e)?t:t.map(en))}function Uo(e){return ge(e=Ft(e),"iterate",la),e}function Zn(e,t){return jn(e)?br(Cs(e)?en(t):t):en(t)}const jO={__proto__:null,[Symbol.iterator](){return di(this,Symbol.iterator,e=>Zn(this,e))},concat(...e){return Gs(this).concat(...e.map(t=>wt(t)?Gs(t):t))},entries(){return di(this,"entries",e=>(e[1]=Zn(this,e[1]),e))},every(e,t){return Tn(this,"every",e,t,void 0,arguments)},filter(e,t){return Tn(this,"filter",e,t,n=>n.map(s=>Zn(this,s)),arguments)},find(e,t){return Tn(this,"find",e,t,n=>Zn(this,n),arguments)},findIndex(e,t){return Tn(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Tn(this,"findLast",e,t,n=>Zn(this,n),arguments)},findLastIndex(e,t){return Tn(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Tn(this,"forEach",e,t,void 0,arguments)},includes(...e){return pi(this,"includes",e)},indexOf(...e){return pi(this,"indexOf",e)},join(e){return Gs(this).join(e)},lastIndexOf(...e){return pi(this,"lastIndexOf",e)},map(e,t){return Tn(this,"map",e,t,void 0,arguments)},pop(){return Ar(this,"pop")},push(...e){return Ar(this,"push",e)},reduce(e,...t){return bf(this,"reduce",e,t)},reduceRight(e,...t){return bf(this,"reduceRight",e,t)},shift(){return Ar(this,"shift")},some(e,t){return Tn(this,"some",e,t,void 0,arguments)},splice(...e){return Ar(this,"splice",e)},toReversed(){return Gs(this).toReversed()},toSorted(e){return Gs(this).toSorted(e)},toSpliced(...e){return Gs(this).toSpliced(...e)},unshift(...e){return Ar(this,"unshift",e)},values(){return di(this,"values",e=>Zn(this,e))}};function di(e,t,n){const s=Uo(e),r=s[t]();return s!==e&&!Ge(e)&&(r._next=r.next,r.next=()=>{const a=r._next();return a.done||(a.value=n(a.value)),a}),r}const qO=Array.prototype;function Tn(e,t,n,s,r,a){const o=Uo(e),i=o!==e&&!Ge(e),l=o[t];if(l!==qO[t]){const f=l.apply(e,a);return i?en(f):f}let c=n;o!==e&&(i?c=function(f,h){return n.call(this,Zn(e,f),h,e)}:n.length>2&&(c=function(f,h){return n.call(this,f,h,e)}));const u=l.call(o,c,s);return i&&r?r(u):u}function bf(e,t,n,s){const r=Uo(e);let a=n;return r!==e&&(Ge(e)?n.length>3&&(a=function(o,i,l){return n.call(this,o,i,l,e)}):a=function(o,i,l){return n.call(this,o,Zn(e,i),l,e)}),r[t](a,...s)}function pi(e,t,n){const s=Ft(e);ge(s,"iterate",la);const r=s[t](...n);return(r===-1||r===!1)&&cu(n[0])?(n[0]=Ft(n[0]),s[t](...n)):r}function Ar(e,t,n=[]){Hn(),su();const s=Ft(e)[t].apply(e,n);return ru(),Un(),s}const GO=Jc("__proto__,__v_isRef,__isVue"),ag=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(vn));function KO(e){vn(e)||(e=String(e));const t=Ft(this);return ge(t,"has",e),t.hasOwnProperty(e)}class og{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,s){if(n==="__v_skip")return t.__v_skip;const r=this._isReadonly,a=this._isShallow;if(n==="__v_isReactive")return!r;if(n==="__v_isReadonly")return r;if(n==="__v_isShallow")return a;if(n==="__v_raw")return s===(r?a?rF:ug:a?cg:lg).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(s)?t:void 0;const o=wt(t);if(!r){let l;if(o&&(l=jO[n]))return l;if(n==="hasOwnProperty")return KO}const i=Reflect.get(t,n,we(t)?t:s);if((vn(n)?ag.has(n):GO(n))||(r||ge(t,"get",n),a))return i;if(we(i)){const l=o&&eu(n)?i:i.value;return r&&Vt(l)?ol(l):l}return Vt(i)?r?ol(i):iu(i):i}}class ig extends og{constructor(t=!1){super(!1,t)}set(t,n,s,r){let a=t[n];const o=wt(t)&&eu(n);if(!this._isShallow){const c=jn(a);if(!Ge(s)&&!jn(s)&&(a=Ft(a),s=Ft(s)),!o&&we(a)&&!we(s))return c||(a.value=s),!0}const i=o?Number(n)<t.length:Rt(t,n),l=Reflect.set(t,n,s,we(t)?t:r);return t===Ft(r)&&(i?Fe(s,a)&&Fn(t,"set",n,s):Fn(t,"add",n,s)),l}deleteProperty(t,n){const s=Rt(t,n);t[n];const r=Reflect.deleteProperty(t,n);return r&&s&&Fn(t,"delete",n,void 0),r}has(t,n){const s=Reflect.has(t,n);return(!vn(n)||!ag.has(n))&&ge(t,"has",n),s}ownKeys(t){return ge(t,"iterate",wt(t)?"length":Es),Reflect.ownKeys(t)}}class XO extends og{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const YO=new ig,ZO=new XO,JO=new ig(!0);const al=e=>e,Ia=e=>Reflect.getPrototypeOf(e);function QO(e,t,n){return function(...s){const r=this.__v_raw,a=Ft(r),o=ir(a),i=e==="entries"||e===Symbol.iterator&&o,l=e==="keys"&&o,c=r[e](...s),u=n?al:t?br:en;return!t&&ge(a,"iterate",l?rl:Es),le(Object.create(c),{next(){const{value:f,done:h}=c.next();return h?{value:f,done:h}:{value:i?[u(f[0]),u(f[1])]:u(f),done:h}}})}}function Ta(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function tF(e,t){const n={get(r){const a=this.__v_raw,o=Ft(a),i=Ft(r);e||(Fe(r,i)&&ge(o,"get",r),ge(o,"get",i));const{has:l}=Ia(o),c=t?al:e?br:en;if(l.call(o,r))return c(a.get(r));if(l.call(o,i))return c(a.get(i));a!==o&&a.get(r)},get size(){const r=this.__v_raw;return!e&&ge(Ft(r),"iterate",Es),r.size},has(r){const a=this.__v_raw,o=Ft(a),i=Ft(r);return e||(Fe(r,i)&&ge(o,"has",r),ge(o,"has",i)),r===i?a.has(r):a.has(r)||a.has(i)},forEach(r,a){const o=this,i=o.__v_raw,l=Ft(i),c=t?al:e?br:en;return!e&&ge(l,"iterate",Es),i.forEach((u,f)=>r.call(a,c(u),c(f),o))}};return le(n,e?{add:Ta("add"),set:Ta("set"),delete:Ta("delete"),clear:Ta("clear")}:{add(r){!t&&!Ge(r)&&!jn(r)&&(r=Ft(r));const a=Ft(this);return Ia(a).has.call(a,r)||(a.add(r),Fn(a,"add",r,r)),this},set(r,a){!t&&!Ge(a)&&!jn(a)&&(a=Ft(a));const o=Ft(this),{has:i,get:l}=Ia(o);let c=i.call(o,r);c||(r=Ft(r),c=i.call(o,r));const u=l.call(o,r);return o.set(r,a),c?Fe(a,u)&&Fn(o,"set",r,a):Fn(o,"add",r,a),this},delete(r){const a=Ft(this),{has:o,get:i}=Ia(a);let l=o.call(a,r);l||(r=Ft(r),l=o.call(a,r)),i&&i.call(a,r);const c=a.delete(r);return l&&Fn(a,"delete",r,void 0),c},clear(){const r=Ft(this),a=r.size!==0,o=r.clear();return a&&Fn(r,"clear",void 0,void 0),o}}),["keys","values","entries",Symbol.iterator].forEach(r=>{n[r]=QO(r,e,t)}),n}function ou(e,t){const n=tF(e,t);return(s,r,a)=>r==="__v_isReactive"?!e:r==="__v_isReadonly"?e:r==="__v_raw"?s:Reflect.get(Rt(n,r)&&r in s?n:s,r,a)}const eF={get:ou(!1,!1)},nF={get:ou(!1,!0)},sF={get:ou(!0,!1)};const lg=new WeakMap,cg=new WeakMap,ug=new WeakMap,rF=new WeakMap;function aF(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function oF(e){return e.__v_skip||!Object.isExtensible(e)?0:aF(AO(e))}function iu(e){return jn(e)?e:lu(e,!1,YO,eF,lg)}function iF(e){return lu(e,!1,JO,nF,cg)}function ol(e){return lu(e,!0,ZO,sF,ug)}function lu(e,t,n,s,r){if(!Vt(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const a=oF(e);if(a===0)return e;const o=r.get(e);if(o)return o;const i=new Proxy(e,a===2?s:n);return r.set(e,i),i}function Cs(e){return jn(e)?Cs(e.__v_raw):!!(e&&e.__v_isReactive)}function jn(e){return!!(e&&e.__v_isReadonly)}function Ge(e){return!!(e&&e.__v_isShallow)}function cu(e){return e?!!e.__v_raw:!1}function Ft(e){const t=e&&e.__v_raw;return t?Ft(t):e}function lF(e){return!Rt(e,"__v_skip")&&Object.isExtensible(e)&&jm(e,"__v_skip",!0),e}const en=e=>Vt(e)?iu(e):e,br=e=>Vt(e)?ol(e):e;function we(e){return e?e.__v_isRef===!0:!1}function jt(e){return fg(e,!1)}function lo(e){return fg(e,!0)}function fg(e,t){return we(e)?e:new cF(e,t)}class cF{constructor(t,n){this.dep=new Ho,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:Ft(t),this._value=n?t:en(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,s=this.__v_isShallow||Ge(t)||jn(t);t=s?t:Ft(t),Fe(t,n)&&(this._rawValue=t,this._value=s?t:en(t),this.dep.trigger())}}function j(e){return we(e)?e.value:e}function os(e){return Nt(e)?e():j(e)}const uF={get:(e,t,n)=>t==="__v_raw"?e:j(Reflect.get(e,t,n)),set:(e,t,n,s)=>{const r=e[t];return we(r)&&!we(n)?(r.value=n,!0):Reflect.set(e,t,n,s)}};function hg(e){return Cs(e)?e:new Proxy(e,uF)}class fF{constructor(t){this.__v_isRef=!0,this._value=void 0;const n=this.dep=new Ho,{get:s,set:r}=t(n.track.bind(n),n.trigger.bind(n));this._get=s,this._set=r}get value(){return this._value=this._get()}set value(t){this._set(t)}}function hF(e){return new fF(e)}class dF{constructor(t,n,s){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Ho(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=ia-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=s}notify(){if(this.flags|=16,!(this.flags&8)&&Ut!==this)return Qm(this,!0),!0}get value(){const t=this.dep.track();return ng(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function pF(e,t,n=!1){let s,r;return Nt(e)?s=e:(s=e.get,r=e.set),new dF(s,r,n)}const $a={},co=new WeakMap;let ks;function mF(e,t=!1,n=ks){if(n){let s=co.get(n);s||co.set(n,s=[]),s.push(e)}}function gF(e,t,n=Ot){const{immediate:s,deep:r,once:a,scheduler:o,augmentJob:i,call:l}=n,c=k=>r?k:Ge(k)||r===!1||r===0?Rn(k,1):Rn(k);let u,f,h,d,p=!1,y=!1;if(we(e)?(f=()=>e.value,p=Ge(e)):Cs(e)?(f=()=>c(e),p=!0):wt(e)?(y=!0,p=e.some(k=>Cs(k)||Ge(k)),f=()=>e.map(k=>{if(we(k))return k.value;if(Cs(k))return c(k);if(Nt(k))return l?l(k,2):k()})):Nt(e)?t?f=l?()=>l(e,2):e:f=()=>{if(h){Hn();try{h()}finally{Un()}}const k=ks;ks=u;try{return l?l(e,3,[d]):e(d)}finally{ks=k}}:f=yn,t&&r){const k=f,I=r===!0?1/0:r;f=()=>Rn(k(),I)}const g=Ym(),m=()=>{u.stop(),g&&g.active&&tu(g.effects,u)};if(a&&t){const k=t;t=(...I)=>{k(...I),m()}}let w=y?new Array(e.length).fill($a):$a;const S=k=>{if(!(!(u.flags&1)||!u.dirty&&!k))if(t){const I=u.run();if(r||p||(y?I.some(($,E)=>Fe($,w[E])):Fe(I,w))){h&&h();const $=ks;ks=u;try{const E=[I,w===$a?void 0:y&&w[0]===$a?[]:w,d];w=I,l?l(t,3,E):t(...E)}finally{ks=$}}}else u.run()};return i&&i(S),u=new Zm(f),u.scheduler=o?()=>o(S,!1):S,d=k=>mF(k,!1,u),h=u.onStop=()=>{const k=co.get(u);if(k){if(l)l(k,4);else for(const I of k)I();co.delete(u)}},t?s?S(!0):w=u.run():o?o(S.bind(null,!0),!0):u.run(),m.pause=u.pause.bind(u),m.resume=u.resume.bind(u),m.stop=m,m}function Rn(e,t=1/0,n){if(t<=0||!Vt(e)||e.__v_skip||(n=n||new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,we(e))Rn(e.value,t,n);else if(wt(e))for(let s=0;s<e.length;s++)Rn(e[s],t,n);else if(zo(e)||ir(e))e.forEach(s=>{Rn(s,t,n)});else if(Hm(e)){for(const s in e)Rn(e[s],t,n);for(const s of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,s)&&Rn(e[s],t,n)}return e}/**
* @vue/runtime-core v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function ba(e,t,n,s){try{return s?e(...s):e()}catch(r){jo(r,t,n)}}function Sn(e,t,n,s){if(Nt(e)){const r=ba(e,t,n,s);return r&&Bm(r)&&r.catch(a=>{jo(a,t,n)}),r}if(wt(e)){const r=[];for(let a=0;a<e.length;a++)r.push(Sn(e[a],t,n,s));return r}}function jo(e,t,n,s=!0){const r=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:o}=t&&t.appContext.config||Ot;if(t){let i=t.parent;const l=t.proxy,c=`https://vuejs.org/error-reference/#runtime-${n}`;for(;i;){const u=i.ec;if(u){for(let f=0;f<u.length;f++)if(u[f](e,l,c)===!1)return}i=i.parent}if(a){Hn(),ba(a,null,10,[e,l,c]),Un();return}}yF(e,n,r,s,o)}function yF(e,t,n,s=!0,r=!1){if(r)throw e;console.error(e)}const xe=[];let un=-1;const lr=[];let Jn=null,Js=0;const dg=Promise.resolve();let uo=null;function uu(e){const t=uo||dg;return e?t.then(this?e.bind(this):e):t}function bF(e){let t=un+1,n=xe.length;for(;t<n;){const s=t+n>>>1,r=xe[s],a=ca(r);a<e||a===e&&r.flags&2?t=s+1:n=s}return t}function fu(e){if(!(e.flags&1)){const t=ca(e),n=xe[xe.length-1];!n||!(e.flags&2)&&t>=ca(n)?xe.push(e):xe.splice(bF(t),0,e),e.flags|=1,pg()}}function pg(){uo||(uo=dg.then(gg))}function wF(e){wt(e)?lr.push(...e):Jn&&e.id===-1?Jn.splice(Js+1,0,e):e.flags&1||(lr.push(e),e.flags|=1),pg()}function wf(e,t,n=un+1){for(;n<xe.length;n++){const s=xe[n];if(s&&s.flags&2){if(e&&s.id!==e.uid)continue;xe.splice(n,1),n--,s.flags&4&&(s.flags&=-2),s(),s.flags&4||(s.flags&=-2)}}}function mg(e){if(lr.length){const t=[...new Set(lr)].sort((n,s)=>ca(n)-ca(s));if(lr.length=0,Jn){Jn.push(...t);return}for(Jn=t,Js=0;Js<Jn.length;Js++){const n=Jn[Js];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}Jn=null,Js=0}}const ca=e=>e.id==null?e.flags&2?-1:1/0:e.id;function gg(e){try{for(un=0;un<xe.length;un++){const t=xe[un];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),ba(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;un<xe.length;un++){const t=xe[un];t&&(t.flags&=-2)}un=-1,xe.length=0,mg(),uo=null,(xe.length||lr.length)&&gg()}}let je=null,yg=null;function fo(e){const t=je;return je=e,yg=e&&e.type.__scopeId||null,t}function kF(e,t=je,n){if(!t||e._n)return e;const s=(...r)=>{s._d&&Ef(-1);const a=fo(t);let o;try{o=e(...r)}finally{fo(a),s._d&&Ef(1)}return o};return s._n=!0,s._c=!0,s._d=!0,s}function $n(e,t){if(je===null)return e;const n=Zo(je),s=e.dirs||(e.dirs=[]);for(let r=0;r<t.length;r++){let[a,o,i,l=Ot]=t[r];a&&(Nt(a)&&(a={mounted:a,updated:a}),a.deep&&Rn(o),s.push({dir:a,instance:n,value:o,oldValue:void 0,arg:i,modifiers:l}))}return e}function ys(e,t,n,s){const r=e.dirs,a=t&&t.dirs;for(let o=0;o<r.length;o++){const i=r[o];a&&(i.oldValue=a[o].value);let l=i.dir[s];l&&(Hn(),Sn(l,n,8,[e.el,i,e,t]),Un())}}function vF(e,t){if(Ie){let n=Ie.provides;const s=Ie.parent&&Ie.parent.provides;s===n&&(n=Ie.provides=Object.create(s)),n[e]=t}}function Wa(e,t,n=!1){const s=Yo();if(s||cr){let r=cr?cr._context.provides:s?s.parent==null||s.ce?s.vnode.appContext&&s.vnode.appContext.provides:s.parent.provides:void 0;if(r&&e in r)return r[e];if(arguments.length>1)return n&&Nt(t)?t.call(s&&s.proxy):t}}const SF=Symbol.for("v-scx"),xF=()=>Wa(SF);function ho(e,t){return qo(e,null,t)}function NF(e,t){return qo(e,null,{flush:"sync"})}function Mn(e,t,n){return qo(e,t,n)}function qo(e,t,n=Ot){const{immediate:s,deep:r,flush:a,once:o}=n,i=le({},n),l=t&&s||!t&&a!=="post";let c;if(fa){if(a==="sync"){const d=xF();c=d.__watcherHandles||(d.__watcherHandles=[])}else if(!l){const d=()=>{};return d.stop=yn,d.resume=yn,d.pause=yn,d}}const u=Ie;i.call=(d,p,y)=>Sn(d,u,p,y);let f=!1;a==="post"?i.scheduler=d=>{De(d,u&&u.suspense)}:a!=="sync"&&(f=!0,i.scheduler=(d,p)=>{p?d():fu(d)}),i.augmentJob=d=>{t&&(d.flags|=4),f&&(d.flags|=2,u&&(d.id=u.uid,d.i=u))};const h=gF(e,t,i);return fa&&(c?c.push(h):l&&h()),h}function IF(e,t,n){const s=this.proxy,r=ne(e)?e.includes(".")?bg(s,e):()=>s[e]:e.bind(s,s);let a;Nt(t)?a=t:(a=t.handler,n=t);const o=ka(this),i=qo(r,a.bind(s),n);return o(),i}function bg(e,t){const n=t.split(".");return()=>{let s=e;for(let r=0;r<n.length&&s;r++)s=s[n[r]];return s}}const TF=Symbol("_vte"),$F=e=>e.__isTeleport,_F=Symbol("_leaveCb");function hu(e,t){e.shapeFlag&6&&e.component?(e.transition=t,hu(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}function Kn(e,t){return Nt(e)?le({name:e.name},t,{setup:e}):e}function wg(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function kf(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}const po=new WeakMap;function jr(e,t,n,s,r=!1){if(wt(e)){e.forEach((y,g)=>jr(y,t&&(wt(t)?t[g]:t),n,s,r));return}if(qr(s)&&!r){s.shapeFlag&512&&s.type.__asyncResolved&&s.component.subTree.component&&jr(e,t,n,s.component.subTree);return}const a=s.shapeFlag&4?Zo(s.component):s.el,o=r?null:a,{i,r:l}=e,c=t&&t.r,u=i.refs===Ot?i.refs={}:i.refs,f=i.setupState,h=Ft(f),d=f===Ot?zm:y=>kf(u,y)?!1:Rt(h,y),p=(y,g)=>!(g&&kf(u,g));if(c!=null&&c!==l){if(vf(t),ne(c))u[c]=null,d(c)&&(f[c]=null);else if(we(c)){const y=t;p(c,y.k)&&(c.value=null),y.k&&(u[y.k]=null)}}if(Nt(l))ba(l,i,12,[o,u]);else{const y=ne(l),g=we(l);if(y||g){const m=()=>{if(e.f){const w=y?d(l)?f[l]:u[l]:p()||!e.k?l.value:u[e.k];if(r)wt(w)&&tu(w,a);else if(wt(w))w.includes(a)||w.push(a);else if(y)u[l]=[a],d(l)&&(f[l]=u[l]);else{const S=[a];p(l,e.k)&&(l.value=S),e.k&&(u[e.k]=S)}}else y?(u[l]=o,d(l)&&(f[l]=o)):g&&(p(l,e.k)&&(l.value=o),e.k&&(u[e.k]=o))};if(o){const w=()=>{m(),po.delete(e)};w.id=-1,po.set(e,w),De(w,n)}else vf(e),m()}}}function vf(e){const t=po.get(e);t&&(t.flags|=8,po.delete(e))}Wo().requestIdleCallback;Wo().cancelIdleCallback;const qr=e=>!!e.type.__asyncLoader,kg=e=>e.type.__isKeepAlive;function EF(e,t){vg(e,"a",t)}function CF(e,t){vg(e,"da",t)}function vg(e,t,n=Ie){const s=e.__wdc||(e.__wdc=()=>{let r=n;for(;r;){if(r.isDeactivated)return;r=r.parent}return e()});if(Go(t,s,n),n){let r=n.parent;for(;r&&r.parent;)kg(r.parent.vnode)&&AF(s,t,n,r),r=r.parent}}function AF(e,t,n,s){const r=Go(t,e,s,!0);wa(()=>{tu(s[t],r)},n)}function Go(e,t,n=Ie,s=!1){if(n){const r=n[e]||(n[e]=[]),a=t.__weh||(t.__weh=(...o)=>{Hn();const i=ka(n),l=Sn(t,n,e,o);return i(),Un(),l});return s?r.unshift(a):r.push(a),a}}const Xn=e=>(t,n=Ie)=>{(!fa||e==="sp")&&Go(e,(...s)=>t(...s),n)},DF=Xn("bm"),Tr=Xn("m"),OF=Xn("bu"),FF=Xn("u"),Sg=Xn("bum"),wa=Xn("um"),RF=Xn("sp"),PF=Xn("rtg"),MF=Xn("rtc");function VF(e,t=Ie){Go("ec",e,t)}const LF=Symbol.for("v-ndc");function wn(e,t,n,s){let r;const a=n,o=wt(e);if(o||ne(e)){const i=o&&Cs(e);let l=!1,c=!1;i&&(l=!Ge(e),c=jn(e),e=Uo(e)),r=new Array(e.length);for(let u=0,f=e.length;u<f;u++)r[u]=t(l?c?br(en(e[u])):en(e[u]):e[u],u,void 0,a)}else if(typeof e=="number"){r=new Array(e);for(let i=0;i<e;i++)r[i]=t(i+1,i,void 0,a)}else if(Vt(e))if(e[Symbol.iterator])r=Array.from(e,(i,l)=>t(i,l,void 0,a));else{const i=Object.keys(e);r=new Array(i.length);for(let l=0,c=i.length;l<c;l++){const u=i[l];r[l]=t(e[u],u,l,a)}}else r=[];return r}const il=e=>e?jg(e)?Zo(e):il(e.parent):null,Gr=le(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>il(e.parent),$root:e=>il(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Ng(e),$forceUpdate:e=>e.f||(e.f=()=>{fu(e.update)}),$nextTick:e=>e.n||(e.n=uu.bind(e.proxy)),$watch:e=>IF.bind(e)}),mi=(e,t)=>e!==Ot&&!e.__isScriptSetup&&Rt(e,t),zF={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:s,data:r,props:a,accessCache:o,type:i,appContext:l}=e;if(t[0]!=="$"){const h=o[t];if(h!==void 0)switch(h){case 1:return s[t];case 2:return r[t];case 4:return n[t];case 3:return a[t]}else{if(mi(s,t))return o[t]=1,s[t];if(r!==Ot&&Rt(r,t))return o[t]=2,r[t];if(Rt(a,t))return o[t]=3,a[t];if(n!==Ot&&Rt(n,t))return o[t]=4,n[t];cl&&(o[t]=0)}}const c=Gr[t];let u,f;if(c)return t==="$attrs"&&ge(e.attrs,"get",""),c(e);if((u=i.__cssModules)&&(u=u[t]))return u;if(n!==Ot&&Rt(n,t))return o[t]=4,n[t];if(f=l.config.globalProperties,Rt(f,t))return f[t]},set({_:e},t,n){const{data:s,setupState:r,ctx:a}=e;return mi(r,t)?(r[t]=n,!0):s!==Ot&&Rt(s,t)?(s[t]=n,!0):Rt(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:s,appContext:r,props:a,type:o}},i){let l;return!!(n[i]||e!==Ot&&i[0]!=="$"&&Rt(e,i)||mi(t,i)||Rt(a,i)||Rt(s,i)||Rt(Gr,i)||Rt(r.config.globalProperties,i)||(l=o.__cssModules)&&l[i])},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Rt(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function mo(e){return wt(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}function ll(e,t){return!e||!t?e||t:wt(e)&&wt(t)?e.concat(t):le({},mo(e),mo(t))}let cl=!0;function BF(e){const t=Ng(e),n=e.proxy,s=e.ctx;cl=!1,t.beforeCreate&&Sf(t.beforeCreate,e,"bc");const{data:r,computed:a,methods:o,watch:i,provide:l,inject:c,created:u,beforeMount:f,mounted:h,beforeUpdate:d,updated:p,activated:y,deactivated:g,beforeDestroy:m,beforeUnmount:w,destroyed:S,unmounted:k,render:I,renderTracked:$,renderTriggered:E,errorCaptured:D,serverPrefetch:_,expose:x,inheritAttrs:v,components:R,directives:P,filters:V}=t;if(c&&WF(c,s,null),o)for(const W in o){const z=o[W];Nt(z)&&(s[W]=z.bind(n))}if(r){const W=r.call(n,n);Vt(W)&&(e.data=iu(W))}if(cl=!0,a)for(const W in a){const z=a[W],H=Nt(z)?z.bind(n,n):Nt(z.get)?z.get.bind(n,n):yn,K=!Nt(z)&&Nt(z.set)?z.set.bind(n):yn,Y=ue({get:H,set:K});Object.defineProperty(s,W,{enumerable:!0,configurable:!0,get:()=>Y.value,set:Z=>Y.value=Z})}if(i)for(const W in i)xg(i[W],s,n,W);if(l){const W=Nt(l)?l.call(n):l;Reflect.ownKeys(W).forEach(z=>{vF(z,W[z])})}u&&Sf(u,e,"c");function L(W,z){wt(z)?z.forEach(H=>W(H.bind(n))):z&&W(z.bind(n))}if(L(DF,f),L(Tr,h),L(OF,d),L(FF,p),L(EF,y),L(CF,g),L(VF,D),L(MF,$),L(PF,E),L(Sg,w),L(wa,k),L(RF,_),wt(x))if(x.length){const W=e.exposed||(e.exposed={});x.forEach(z=>{Object.defineProperty(W,z,{get:()=>n[z],set:H=>n[z]=H,enumerable:!0})})}else e.exposed||(e.exposed={});I&&e.render===yn&&(e.render=I),v!=null&&(e.inheritAttrs=v),R&&(e.components=R),P&&(e.directives=P),_&&wg(e)}function WF(e,t,n=yn){wt(e)&&(e=ul(e));for(const s in e){const r=e[s];let a;Vt(r)?"default"in r?a=Wa(r.from||s,r.default,!0):a=Wa(r.from||s):a=Wa(r),we(a)?Object.defineProperty(t,s,{enumerable:!0,configurable:!0,get:()=>a.value,set:o=>a.value=o}):t[s]=a}}function Sf(e,t,n){Sn(wt(e)?e.map(s=>s.bind(t.proxy)):e.bind(t.proxy),t,n)}function xg(e,t,n,s){let r=s.includes(".")?bg(n,s):()=>n[s];if(ne(e)){const a=t[e];Nt(a)&&Mn(r,a)}else if(Nt(e))Mn(r,e.bind(n));else if(Vt(e))if(wt(e))e.forEach(a=>xg(a,t,n,s));else{const a=Nt(e.handler)?e.handler.bind(n):t[e.handler];Nt(a)&&Mn(r,a,e)}}function Ng(e){const t=e.type,{mixins:n,extends:s}=t,{mixins:r,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,i=a.get(t);let l;return i?l=i:!r.length&&!n&&!s?l=t:(l={},r.length&&r.forEach(c=>go(l,c,o,!0)),go(l,t,o)),Vt(t)&&a.set(t,l),l}function go(e,t,n,s=!1){const{mixins:r,extends:a}=t;a&&go(e,a,n,!0),r&&r.forEach(o=>go(e,o,n,!0));for(const o in t)if(!(s&&o==="expose")){const i=HF[o]||n&&n[o];e[o]=i?i(e[o],t[o]):t[o]}return e}const HF={data:xf,props:Nf,emits:Nf,methods:Vr,computed:Vr,beforeCreate:Se,created:Se,beforeMount:Se,mounted:Se,beforeUpdate:Se,updated:Se,beforeDestroy:Se,beforeUnmount:Se,destroyed:Se,unmounted:Se,activated:Se,deactivated:Se,errorCaptured:Se,serverPrefetch:Se,components:Vr,directives:Vr,watch:jF,provide:xf,inject:UF};function xf(e,t){return t?e?function(){return le(Nt(e)?e.call(this,this):e,Nt(t)?t.call(this,this):t)}:t:e}function UF(e,t){return Vr(ul(e),ul(t))}function ul(e){if(wt(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function Se(e,t){return e?[...new Set([].concat(e,t))]:t}function Vr(e,t){return e?le(Object.create(null),e,t):t}function Nf(e,t){return e?wt(e)&&wt(t)?[...new Set([...e,...t])]:le(Object.create(null),mo(e),mo(t??{})):t}function jF(e,t){if(!e)return t;if(!t)return e;const n=le(Object.create(null),e);for(const s in t)n[s]=Se(e[s],t[s]);return n}function Ig(){return{app:null,config:{isNativeTag:zm,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let qF=0;function GF(e,t){return function(s,r=null){Nt(s)||(s=le({},s)),r!=null&&!Vt(r)&&(r=null);const a=Ig(),o=new WeakSet,i=[];let l=!1;const c=a.app={_uid:qF++,_component:s,_props:r,_container:null,_context:a,_instance:null,version:xR,get config(){return a.config},set config(u){},use(u,...f){return o.has(u)||(u&&Nt(u.install)?(o.add(u),u.install(c,...f)):Nt(u)&&(o.add(u),u(c,...f))),c},mixin(u){return a.mixins.includes(u)||a.mixins.push(u),c},component(u,f){return f?(a.components[u]=f,c):a.components[u]},directive(u,f){return f?(a.directives[u]=f,c):a.directives[u]},mount(u,f,h){if(!l){const d=c._ceVNode||tn(s,r);return d.appContext=a,h===!0?h="svg":h===!1&&(h=void 0),e(d,u,h),l=!0,c._container=u,u.__vue_app__=c,Zo(d.component)}},onUnmount(u){i.push(u)},unmount(){l&&(Sn(i,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(u,f){return a.provides[u]=f,c},runWithContext(u){const f=cr;cr=c;try{return u()}finally{cr=f}}};return c}}let cr=null;function Tg(e,t,n=Ot){const s=Yo(),r=Wn(t),a=ms(t),o=$g(e,r),i=hF((l,c)=>{let u,f=Ot,h;return NF(()=>{const d=e[r];Fe(u,d)&&(u=d,c())}),{get(){return l(),n.get?n.get(u):u},set(d){const p=n.set?n.set(d):d;if(!Fe(p,u)&&!(f!==Ot&&Fe(d,f)))return;const y=s.vnode.props;y&&(t in y||r in y||a in y)&&(`onUpdate:${t}`in y||`onUpdate:${r}`in y||`onUpdate:${a}`in y)||(u=d,c()),s.emit(`update:${t}`,p),Fe(d,p)&&Fe(d,f)&&!Fe(p,h)&&c(),f=d,h=p}}});return i[Symbol.iterator]=()=>{let l=0;return{next(){return l<2?{value:l++?o||Ot:i,done:!1}:{done:!0}}}},i}const $g=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Wn(t)}Modifiers`]||e[`${ms(t)}Modifiers`];function KF(e,t,...n){if(e.isUnmounted)return;const s=e.vnode.props||Ot;let r=n;const a=t.startsWith("update:"),o=a&&$g(s,t.slice(7));o&&(o.trim&&(r=n.map(u=>ne(u)?u.trim():u)),o.number&&(r=n.map(nu)));let i,l=s[i=ui(t)]||s[i=ui(Wn(t))];!l&&a&&(l=s[i=ui(ms(t))]),l&&Sn(l,e,6,r);const c=s[i+"Once"];if(c){if(!e.emitted)e.emitted={};else if(e.emitted[i])return;e.emitted[i]=!0,Sn(c,e,6,r)}}const XF=new WeakMap;function _g(e,t,n=!1){const s=n?XF:t.emitsCache,r=s.get(e);if(r!==void 0)return r;const a=e.emits;let o={},i=!1;if(!Nt(e)){const l=c=>{const u=_g(c,t,!0);u&&(i=!0,le(o,u))};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}return!a&&!i?(Vt(e)&&s.set(e,null),null):(wt(a)?a.forEach(l=>o[l]=null):le(o,a),Vt(e)&&s.set(e,o),o)}function Ko(e,t){return!e||!Lo(t)?!1:(t=t.slice(2).replace(/Once$/,""),Rt(e,t[0].toLowerCase()+t.slice(1))||Rt(e,ms(t))||Rt(e,t))}function If(e){const{type:t,vnode:n,proxy:s,withProxy:r,propsOptions:[a],slots:o,attrs:i,emit:l,render:c,renderCache:u,props:f,data:h,setupState:d,ctx:p,inheritAttrs:y}=e,g=fo(e);let m,w;try{if(n.shapeFlag&4){const k=r||s,I=k;m=hn(c.call(I,k,u,f,d,h,p)),w=i}else{const k=t;m=hn(k.length>1?k(f,{attrs:i,slots:o,emit:l}):k(f,null)),w=t.props?i:YF(i)}}catch(k){Kr.length=0,jo(k,e,1),m=tn(us)}let S=m;if(w&&y!==!1){const k=Object.keys(w),{shapeFlag:I}=S;k.length&&I&7&&(a&&k.some(Qc)&&(w=ZF(w,a)),S=wr(S,w,!1,!0))}return n.dirs&&(S=wr(S,null,!1,!0),S.dirs=S.dirs?S.dirs.concat(n.dirs):n.dirs),n.transition&&hu(S,n.transition),m=S,fo(g),m}const YF=e=>{let t;for(const n in e)(n==="class"||n==="style"||Lo(n))&&((t||(t={}))[n]=e[n]);return t},ZF=(e,t)=>{const n={};for(const s in e)(!Qc(s)||!(s.slice(9)in t))&&(n[s]=e[s]);return n};function JF(e,t,n){const{props:s,children:r,component:a}=e,{props:o,children:i,patchFlag:l}=t,c=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&l>=0){if(l&1024)return!0;if(l&16)return s?Tf(s,o,c):!!o;if(l&8){const u=t.dynamicProps;for(let f=0;f<u.length;f++){const h=u[f];if(Eg(o,s,h)&&!Ko(c,h))return!0}}}else return(r||i)&&(!i||!i.$stable)?!0:s===o?!1:s?o?Tf(s,o,c):!0:!!o;return!1}function Tf(e,t,n){const s=Object.keys(t);if(s.length!==Object.keys(e).length)return!0;for(let r=0;r<s.length;r++){const a=s[r];if(Eg(t,e,a)&&!Ko(n,a))return!0}return!1}function Eg(e,t,n){const s=e[n],r=t[n];return n==="style"&&Vt(s)&&Vt(r)?!Ws(s,r):s!==r}function QF({vnode:e,parent:t},n){for(;t;){const s=t.subTree;if(s.suspense&&s.suspense.activeBranch===e&&(s.el=e.el),s===e)(e=t.vnode).el=n,t=t.parent;else break}}const Cg={},Ag=()=>Object.create(Cg),Dg=e=>Object.getPrototypeOf(e)===Cg;function tR(e,t,n,s=!1){const r={},a=Ag();e.propsDefaults=Object.create(null),Og(e,t,r,a);for(const o in e.propsOptions[0])o in r||(r[o]=void 0);n?e.props=s?r:iF(r):e.type.props?e.props=r:e.props=a,e.attrs=a}function eR(e,t,n,s){const{props:r,attrs:a,vnode:{patchFlag:o}}=e,i=Ft(r),[l]=e.propsOptions;let c=!1;if((s||o>0)&&!(o&16)){if(o&8){const u=e.vnode.dynamicProps;for(let f=0;f<u.length;f++){let h=u[f];if(Ko(e.emitsOptions,h))continue;const d=t[h];if(l)if(Rt(a,h))d!==a[h]&&(a[h]=d,c=!0);else{const p=Wn(h);r[p]=fl(l,i,p,d,e,!1)}else d!==a[h]&&(a[h]=d,c=!0)}}}else{Og(e,t,r,a)&&(c=!0);let u;for(const f in i)(!t||!Rt(t,f)&&((u=ms(f))===f||!Rt(t,u)))&&(l?n&&(n[f]!==void 0||n[u]!==void 0)&&(r[f]=fl(l,i,f,void 0,e,!0)):delete r[f]);if(a!==i)for(const f in a)(!t||!Rt(t,f))&&(delete a[f],c=!0)}c&&Fn(e.attrs,"set","")}function Og(e,t,n,s){const[r,a]=e.propsOptions;let o=!1,i;if(t)for(let l in t){if(Wr(l))continue;const c=t[l];let u;r&&Rt(r,u=Wn(l))?!a||!a.includes(u)?n[u]=c:(i||(i={}))[u]=c:Ko(e.emitsOptions,l)||(!(l in s)||c!==s[l])&&(s[l]=c,o=!0)}if(a){const l=Ft(n),c=i||Ot;for(let u=0;u<a.length;u++){const f=a[u];n[f]=fl(r,l,f,c[f],e,!Rt(c,f))}}return o}function fl(e,t,n,s,r,a){const o=e[n];if(o!=null){const i=Rt(o,"default");if(i&&s===void 0){const l=o.default;if(o.type!==Function&&!o.skipFactory&&Nt(l)){const{propsDefaults:c}=r;if(n in c)s=c[n];else{const u=ka(r);s=c[n]=l.call(null,t),u()}}else s=l;r.ce&&r.ce._setProp(n,s)}o[0]&&(a&&!i?s=!1:o[1]&&(s===""||s===ms(n))&&(s=!0))}return s}const nR=new WeakMap;function Fg(e,t,n=!1){const s=n?nR:t.propsCache,r=s.get(e);if(r)return r;const a=e.props,o={},i=[];let l=!1;if(!Nt(e)){const u=f=>{l=!0;const[h,d]=Fg(f,t,!0);le(o,h),d&&i.push(...d)};!n&&t.mixins.length&&t.mixins.forEach(u),e.extends&&u(e.extends),e.mixins&&e.mixins.forEach(u)}if(!a&&!l)return Vt(e)&&s.set(e,or),or;if(wt(a))for(let u=0;u<a.length;u++){const f=Wn(a[u]);$f(f)&&(o[f]=Ot)}else if(a)for(const u in a){const f=Wn(u);if($f(f)){const h=a[u],d=o[f]=wt(h)||Nt(h)?{type:h}:le({},h),p=d.type;let y=!1,g=!0;if(wt(p))for(let m=0;m<p.length;++m){const w=p[m],S=Nt(w)&&w.name;if(S==="Boolean"){y=!0;break}else S==="String"&&(g=!1)}else y=Nt(p)&&p.name==="Boolean";d[0]=y,d[1]=g,(y||Rt(d,"default"))&&i.push(f)}}const c=[o,i];return Vt(e)&&s.set(e,c),c}function $f(e){return e[0]!=="$"&&!Wr(e)}const du=e=>e==="_"||e==="_ctx"||e==="$stable",pu=e=>wt(e)?e.map(hn):[hn(e)],sR=(e,t,n)=>{if(t._n)return t;const s=kF((...r)=>pu(t(...r)),n);return s._c=!1,s},Rg=(e,t,n)=>{const s=e._ctx;for(const r in e){if(du(r))continue;const a=e[r];if(Nt(a))t[r]=sR(r,a,s);else if(a!=null){const o=pu(a);t[r]=()=>o}}},Pg=(e,t)=>{const n=pu(t);e.slots.default=()=>n},Mg=(e,t,n)=>{for(const s in t)(n||!du(s))&&(e[s]=t[s])},rR=(e,t,n)=>{const s=e.slots=Ag();if(e.vnode.shapeFlag&32){const r=t._;r?(Mg(s,t,n),n&&jm(s,"_",r,!0)):Rg(t,s)}else t&&Pg(e,t)},aR=(e,t,n)=>{const{vnode:s,slots:r}=e;let a=!0,o=Ot;if(s.shapeFlag&32){const i=t._;i?n&&i===1?a=!1:Mg(r,t,n):(a=!t.$stable,Rg(t,r)),o=t}else t&&(Pg(e,t),o={default:1});if(a)for(const i in r)!du(i)&&o[i]==null&&delete r[i]},De=uR;function oR(e){return iR(e)}function iR(e,t){const n=Wo();n.__VUE__=!0;const{insert:s,remove:r,patchProp:a,createElement:o,createText:i,createComment:l,setText:c,setElementText:u,parentNode:f,nextSibling:h,setScopeId:d=yn,insertStaticContent:p}=e,y=(C,F,B,q=null,U=null,G=null,et=void 0,rt=null,tt=!!F.dynamicChildren)=>{if(C===F)return;C&&!Dr(C,F)&&(q=dt(C),Z(C,U,G,!0),C=null),F.patchFlag===-2&&(tt=!1,F.dynamicChildren=null);const{type:J,ref:ht,shapeFlag:it}=F;switch(J){case Xo:g(C,F,B,q);break;case us:m(C,F,B,q);break;case yi:C==null&&w(F,B,q,et);break;case Kt:R(C,F,B,q,U,G,et,rt,tt);break;default:it&1?I(C,F,B,q,U,G,et,rt,tt):it&6?P(C,F,B,q,U,G,et,rt,tt):(it&64||it&128)&&J.process(C,F,B,q,U,G,et,rt,tt,kt)}ht!=null&&U?jr(ht,C&&C.ref,G,F||C,!F):ht==null&&C&&C.ref!=null&&jr(C.ref,null,G,C,!0)},g=(C,F,B,q)=>{if(C==null)s(F.el=i(F.children),B,q);else{const U=F.el=C.el;F.children!==C.children&&c(U,F.children)}},m=(C,F,B,q)=>{C==null?s(F.el=l(F.children||""),B,q):F.el=C.el},w=(C,F,B,q)=>{[C.el,C.anchor]=p(C.children,F,B,q,C.el,C.anchor)},S=({el:C,anchor:F},B,q)=>{let U;for(;C&&C!==F;)U=h(C),s(C,B,q),C=U;s(F,B,q)},k=({el:C,anchor:F})=>{let B;for(;C&&C!==F;)B=h(C),r(C),C=B;r(F)},I=(C,F,B,q,U,G,et,rt,tt)=>{if(F.type==="svg"?et="svg":F.type==="math"&&(et="mathml"),C==null)$(F,B,q,U,G,et,rt,tt);else{const J=C.el&&C.el._isVueCE?C.el:null;try{J&&J._beginPatch(),_(C,F,U,G,et,rt,tt)}finally{J&&J._endPatch()}}},$=(C,F,B,q,U,G,et,rt)=>{let tt,J;const{props:ht,shapeFlag:it,transition:ut,dirs:gt}=C;if(tt=C.el=o(C.type,G,ht&&ht.is,ht),it&8?u(tt,C.children):it&16&&D(C.children,tt,null,q,U,gi(C,G),et,rt),gt&&ys(C,null,q,"created"),E(tt,C,C.scopeId,et,q),ht){for(const Ct in ht)Ct!=="value"&&!Wr(Ct)&&a(tt,Ct,null,ht[Ct],G,q);"value"in ht&&a(tt,"value",null,ht.value,G),(J=ht.onVnodeBeforeMount)&&cn(J,q,C)}gt&&ys(C,null,q,"beforeMount");const St=lR(U,ut);St&&ut.beforeEnter(tt),s(tt,F,B),((J=ht&&ht.onVnodeMounted)||St||gt)&&De(()=>{J&&cn(J,q,C),St&&ut.enter(tt),gt&&ys(C,null,q,"mounted")},U)},E=(C,F,B,q,U)=>{if(B&&d(C,B),q)for(let G=0;G<q.length;G++)d(C,q[G]);if(U){let G=U.subTree;if(F===G||Bg(G.type)&&(G.ssContent===F||G.ssFallback===F)){const et=U.vnode;E(C,et,et.scopeId,et.slotScopeIds,U.parent)}}},D=(C,F,B,q,U,G,et,rt,tt=0)=>{for(let J=tt;J<C.length;J++){const ht=C[J]=rt?Dn(C[J]):hn(C[J]);y(null,ht,F,B,q,U,G,et,rt)}},_=(C,F,B,q,U,G,et)=>{const rt=F.el=C.el;let{patchFlag:tt,dynamicChildren:J,dirs:ht}=F;tt|=C.patchFlag&16;const it=C.props||Ot,ut=F.props||Ot;let gt;if(B&&bs(B,!1),(gt=ut.onVnodeBeforeUpdate)&&cn(gt,B,F,C),ht&&ys(F,C,B,"beforeUpdate"),B&&bs(B,!0),(it.innerHTML&&ut.innerHTML==null||it.textContent&&ut.textContent==null)&&u(rt,""),J?x(C.dynamicChildren,J,rt,B,q,gi(F,U),G):et||z(C,F,rt,null,B,q,gi(F,U),G,!1),tt>0){if(tt&16)v(rt,it,ut,B,U);else if(tt&2&&it.class!==ut.class&&a(rt,"class",null,ut.class,U),tt&4&&a(rt,"style",it.style,ut.style,U),tt&8){const St=F.dynamicProps;for(let Ct=0;Ct<St.length;Ct++){const _t=St[Ct],te=it[_t],oe=ut[_t];(oe!==te||_t==="value")&&a(rt,_t,te,oe,U,B)}}tt&1&&C.children!==F.children&&u(rt,F.children)}else!et&&J==null&&v(rt,it,ut,B,U);((gt=ut.onVnodeUpdated)||ht)&&De(()=>{gt&&cn(gt,B,F,C),ht&&ys(F,C,B,"updated")},q)},x=(C,F,B,q,U,G,et)=>{for(let rt=0;rt<F.length;rt++){const tt=C[rt],J=F[rt],ht=tt.el&&(tt.type===Kt||!Dr(tt,J)||tt.shapeFlag&198)?f(tt.el):B;y(tt,J,ht,null,q,U,G,et,!0)}},v=(C,F,B,q,U)=>{if(F!==B){if(F!==Ot)for(const G in F)!Wr(G)&&!(G in B)&&a(C,G,F[G],null,U,q);for(const G in B){if(Wr(G))continue;const et=B[G],rt=F[G];et!==rt&&G!=="value"&&a(C,G,rt,et,U,q)}"value"in B&&a(C,"value",F.value,B.value,U)}},R=(C,F,B,q,U,G,et,rt,tt)=>{const J=F.el=C?C.el:i(""),ht=F.anchor=C?C.anchor:i("");let{patchFlag:it,dynamicChildren:ut,slotScopeIds:gt}=F;gt&&(rt=rt?rt.concat(gt):gt),C==null?(s(J,B,q),s(ht,B,q),D(F.children||[],B,ht,U,G,et,rt,tt)):it>0&&it&64&&ut&&C.dynamicChildren&&C.dynamicChildren.length===ut.length?(x(C.dynamicChildren,ut,B,U,G,et,rt),(F.key!=null||U&&F===U.subTree)&&Vg(C,F,!0)):z(C,F,B,ht,U,G,et,rt,tt)},P=(C,F,B,q,U,G,et,rt,tt)=>{F.slotScopeIds=rt,C==null?F.shapeFlag&512?U.ctx.activate(F,B,q,et,tt):V(F,B,q,U,G,et,tt):M(C,F,tt)},V=(C,F,B,q,U,G,et)=>{const rt=C.component=yR(C,q,U);if(kg(C)&&(rt.ctx.renderer=kt),bR(rt,!1,et),rt.asyncDep){if(U&&U.registerDep(rt,L,et),!C.el){const tt=rt.subTree=tn(us);m(null,tt,F,B),C.placeholder=tt.el}}else L(rt,C,F,B,U,G,et)},M=(C,F,B)=>{const q=F.component=C.component;if(JF(C,F,B))if(q.asyncDep&&!q.asyncResolved){W(q,F,B);return}else q.next=F,q.update();else F.el=C.el,q.vnode=F},L=(C,F,B,q,U,G,et)=>{const rt=()=>{if(C.isMounted){let{next:it,bu:ut,u:gt,parent:St,vnode:Ct}=C;{const Be=Lg(C);if(Be){it&&(it.el=Ct.el,W(C,it,et)),Be.asyncDep.then(()=>{De(()=>{C.isUnmounted||J()},U)});return}}let _t=it,te;bs(C,!1),it?(it.el=Ct.el,W(C,it,et)):it=Ct,ut&&Ba(ut),(te=it.props&&it.props.onVnodeBeforeUpdate)&&cn(te,St,it,Ct),bs(C,!0);const oe=If(C),Ee=C.subTree;C.subTree=oe,y(Ee,oe,f(Ee.el),dt(Ee),C,U,G),it.el=oe.el,_t===null&&QF(C,oe.el),gt&&De(gt,U),(te=it.props&&it.props.onVnodeUpdated)&&De(()=>cn(te,St,it,Ct),U)}else{let it;const{el:ut,props:gt}=F,{bm:St,m:Ct,parent:_t,root:te,type:oe}=C,Ee=qr(F);bs(C,!1),St&&Ba(St),!Ee&&(it=gt&&gt.onVnodeBeforeMount)&&cn(it,_t,F),bs(C,!0);{te.ce&&te.ce._hasShadowRoot()&&te.ce._injectChildStyle(oe);const Be=C.subTree=If(C);y(null,Be,B,q,C,U,G),F.el=Be.el}if(Ct&&De(Ct,U),!Ee&&(it=gt&&gt.onVnodeMounted)){const Be=F;De(()=>cn(it,_t,Be),U)}(F.shapeFlag&256||_t&&qr(_t.vnode)&&_t.vnode.shapeFlag&256)&&C.a&&De(C.a,U),C.isMounted=!0,F=B=q=null}};C.scope.on();const tt=C.effect=new Zm(rt);C.scope.off();const J=C.update=tt.run.bind(tt),ht=C.job=tt.runIfDirty.bind(tt);ht.i=C,ht.id=C.uid,tt.scheduler=()=>fu(ht),bs(C,!0),J()},W=(C,F,B)=>{F.component=C;const q=C.vnode.props;C.vnode=F,C.next=null,eR(C,F.props,q,B),aR(C,F.children,B),Hn(),wf(C),Un()},z=(C,F,B,q,U,G,et,rt,tt=!1)=>{const J=C&&C.children,ht=C?C.shapeFlag:0,it=F.children,{patchFlag:ut,shapeFlag:gt}=F;if(ut>0){if(ut&128){K(J,it,B,q,U,G,et,rt,tt);return}else if(ut&256){H(J,it,B,q,U,G,et,rt,tt);return}}gt&8?(ht&16&&ct(J,U,G),it!==J&&u(B,it)):ht&16?gt&16?K(J,it,B,q,U,G,et,rt,tt):ct(J,U,G,!0):(ht&8&&u(B,""),gt&16&&D(it,B,q,U,G,et,rt,tt))},H=(C,F,B,q,U,G,et,rt,tt)=>{C=C||or,F=F||or;const J=C.length,ht=F.length,it=Math.min(J,ht);let ut;for(ut=0;ut<it;ut++){const gt=F[ut]=tt?Dn(F[ut]):hn(F[ut]);y(C[ut],gt,B,null,U,G,et,rt,tt)}J>ht?ct(C,U,G,!0,!1,it):D(F,B,q,U,G,et,rt,tt,it)},K=(C,F,B,q,U,G,et,rt,tt)=>{let J=0;const ht=F.length;let it=C.length-1,ut=ht-1;for(;J<=it&&J<=ut;){const gt=C[J],St=F[J]=tt?Dn(F[J]):hn(F[J]);if(Dr(gt,St))y(gt,St,B,null,U,G,et,rt,tt);else break;J++}for(;J<=it&&J<=ut;){const gt=C[it],St=F[ut]=tt?Dn(F[ut]):hn(F[ut]);if(Dr(gt,St))y(gt,St,B,null,U,G,et,rt,tt);else break;it--,ut--}if(J>it){if(J<=ut){const gt=ut+1,St=gt<ht?F[gt].el:q;for(;J<=ut;)y(null,F[J]=tt?Dn(F[J]):hn(F[J]),B,St,U,G,et,rt,tt),J++}}else if(J>ut)for(;J<=it;)Z(C[J],U,G,!0),J++;else{const gt=J,St=J,Ct=new Map;for(J=St;J<=ut;J++){const ve=F[J]=tt?Dn(F[J]):hn(F[J]);ve.key!=null&&Ct.set(ve.key,J)}let _t,te=0;const oe=ut-St+1;let Ee=!1,Be=0;const on=new Array(oe);for(J=0;J<oe;J++)on[J]=0;for(J=gt;J<=it;J++){const ve=C[J];if(te>=oe){Z(ve,U,G,!0);continue}let ln;if(ve.key!=null)ln=Ct.get(ve.key);else for(_t=St;_t<=ut;_t++)if(on[_t-St]===0&&Dr(ve,F[_t])){ln=_t;break}ln===void 0?Z(ve,U,G,!0):(on[ln-St]=J+1,ln>=Be?Be=ln:Ee=!0,y(ve,F[ln],B,null,U,G,et,rt,tt),te++)}const va=Ee?cR(on):or;for(_t=va.length-1,J=oe-1;J>=0;J--){const ve=St+J,ln=F[ve],bu=F[ve+1],wu=ve+1<ht?bu.el||zg(bu):q;on[J]===0?y(null,ln,B,wu,U,G,et,rt,tt):Ee&&(_t<0||J!==va[_t]?Y(ln,B,wu,2):_t--)}}},Y=(C,F,B,q,U=null)=>{const{el:G,type:et,transition:rt,children:tt,shapeFlag:J}=C;if(J&6){Y(C.component.subTree,F,B,q);return}if(J&128){C.suspense.move(F,B,q);return}if(J&64){et.move(C,F,B,kt);return}if(et===Kt){s(G,F,B);for(let it=0;it<tt.length;it++)Y(tt[it],F,B,q);s(C.anchor,F,B);return}if(et===yi){S(C,F,B);return}if(q!==2&&J&1&&rt)if(q===0)rt.beforeEnter(G),s(G,F,B),De(()=>rt.enter(G),U);else{const{leave:it,delayLeave:ut,afterLeave:gt}=rt,St=()=>{C.ctx.isUnmounted?r(G):s(G,F,B)},Ct=()=>{G._isLeaving&&G[_F](!0),it(G,()=>{St(),gt&&gt()})};ut?ut(G,St,Ct):Ct()}else s(G,F,B)},Z=(C,F,B,q=!1,U=!1)=>{const{type:G,props:et,ref:rt,children:tt,dynamicChildren:J,shapeFlag:ht,patchFlag:it,dirs:ut,cacheIndex:gt}=C;if(it===-2&&(U=!1),rt!=null&&(Hn(),jr(rt,null,B,C,!0),Un()),gt!=null&&(F.renderCache[gt]=void 0),ht&256){F.ctx.deactivate(C);return}const St=ht&1&&ut,Ct=!qr(C);let _t;if(Ct&&(_t=et&&et.onVnodeBeforeUnmount)&&cn(_t,F,C),ht&6)at(C.component,B,q);else{if(ht&128){C.suspense.unmount(B,q);return}St&&ys(C,null,F,"beforeUnmount"),ht&64?C.type.remove(C,F,B,kt,q):J&&!J.hasOnce&&(G!==Kt||it>0&&it&64)?ct(J,F,B,!1,!0):(G===Kt&&it&384||!U&&ht&16)&&ct(tt,F,B),q&&Q(C)}(Ct&&(_t=et&&et.onVnodeUnmounted)||St)&&De(()=>{_t&&cn(_t,F,C),St&&ys(C,null,F,"unmounted")},B)},Q=C=>{const{type:F,el:B,anchor:q,transition:U}=C;if(F===Kt){ot(B,q);return}if(F===yi){k(C);return}const G=()=>{r(B),U&&!U.persisted&&U.afterLeave&&U.afterLeave()};if(C.shapeFlag&1&&U&&!U.persisted){const{leave:et,delayLeave:rt}=U,tt=()=>et(B,G);rt?rt(C.el,G,tt):tt()}else G()},ot=(C,F)=>{let B;for(;C!==F;)B=h(C),r(C),C=B;r(F)},at=(C,F,B)=>{const{bum:q,scope:U,job:G,subTree:et,um:rt,m:tt,a:J}=C;_f(tt),_f(J),q&&Ba(q),U.stop(),G&&(G.flags|=8,Z(et,C,F,B)),rt&&De(rt,F),De(()=>{C.isUnmounted=!0},F)},ct=(C,F,B,q=!1,U=!1,G=0)=>{for(let et=G;et<C.length;et++)Z(C[et],F,B,q,U)},dt=C=>{if(C.shapeFlag&6)return dt(C.component.subTree);if(C.shapeFlag&128)return C.suspense.next();const F=h(C.anchor||C.el),B=F&&F[TF];return B?h(B):F};let mt=!1;const pt=(C,F,B)=>{let q;C==null?F._vnode&&(Z(F._vnode,null,null,!0),q=F._vnode.component):y(F._vnode||null,C,F,null,null,null,B),F._vnode=C,mt||(mt=!0,wf(q),mg(),mt=!1)},kt={p:y,um:Z,m:Y,r:Q,mt:V,mc:D,pc:z,pbc:x,n:dt,o:e};return{render:pt,hydrate:void 0,createApp:GF(pt)}}function gi({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function bs({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function lR(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Vg(e,t,n=!1){const s=e.children,r=t.children;if(wt(s)&&wt(r))for(let a=0;a<s.length;a++){const o=s[a];let i=r[a];i.shapeFlag&1&&!i.dynamicChildren&&((i.patchFlag<=0||i.patchFlag===32)&&(i=r[a]=Dn(r[a]),i.el=o.el),!n&&i.patchFlag!==-2&&Vg(o,i)),i.type===Xo&&(i.patchFlag===-1&&(i=r[a]=Dn(i)),i.el=o.el),i.type===us&&!i.el&&(i.el=o.el)}}function cR(e){const t=e.slice(),n=[0];let s,r,a,o,i;const l=e.length;for(s=0;s<l;s++){const c=e[s];if(c!==0){if(r=n[n.length-1],e[r]<c){t[s]=r,n.push(s);continue}for(a=0,o=n.length-1;a<o;)i=a+o>>1,e[n[i]]<c?a=i+1:o=i;c<e[n[a]]&&(a>0&&(t[s]=n[a-1]),n[a]=s)}}for(a=n.length,o=n[a-1];a-- >0;)n[a]=o,o=t[o];return n}function Lg(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Lg(t)}function _f(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function zg(e){if(e.placeholder)return e.placeholder;const t=e.component;return t?zg(t.subTree):null}const Bg=e=>e.__isSuspense;function uR(e,t){t&&t.pendingBranch?wt(e)?t.effects.push(...e):t.effects.push(e):wF(e)}const Kt=Symbol.for("v-fgt"),Xo=Symbol.for("v-txt"),us=Symbol.for("v-cmt"),yi=Symbol.for("v-stc"),Kr=[];let Me=null;function bt(e=!1){Kr.push(Me=e?null:[])}function fR(){Kr.pop(),Me=Kr[Kr.length-1]||null}let ua=1;function Ef(e,t=!1){ua+=e,e<0&&Me&&t&&(Me.hasOnce=!0)}function Wg(e){return e.dynamicChildren=ua>0?Me||or:null,fR(),ua>0&&Me&&Me.push(e),e}function xt(e,t,n,s,r,a){return Wg(st(e,t,n,s,r,a,!0))}function es(e,t,n,s,r){return Wg(tn(e,t,n,s,r,!0))}function Hg(e){return e?e.__v_isVNode===!0:!1}function Dr(e,t){return e.type===t.type&&e.key===t.key}const Ug=({key:e})=>e??null,Ha=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?ne(e)||we(e)||Nt(e)?{i:je,r:e,k:t,f:!!n}:e:null);function st(e,t=null,n=null,s=0,r=null,a=e===Kt?0:1,o=!1,i=!1){const l={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Ug(t),ref:t&&Ha(t),scopeId:yg,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:s,dynamicProps:r,dynamicChildren:null,appContext:null,ctx:je};return i?(mu(l,n),a&128&&e.normalize(l)):n&&(l.shapeFlag|=ne(n)?8:16),ua>0&&!o&&Me&&(l.patchFlag>0||a&6)&&l.patchFlag!==32&&Me.push(l),l}const tn=hR;function hR(e,t=null,n=null,s=0,r=null,a=!1){if((!e||e===LF)&&(e=us),Hg(e)){const i=wr(e,t,!0);return n&&mu(i,n),ua>0&&!a&&Me&&(i.shapeFlag&6?Me[Me.indexOf(e)]=i:Me.push(i)),i.patchFlag=-2,i}if(SR(e)&&(e=e.__vccOpts),t){t=dR(t);let{class:i,style:l}=t;i&&!ne(i)&&(t.class=bn(i)),Vt(l)&&(cu(l)&&!wt(l)&&(l=le({},l)),t.style=Bs(l))}const o=ne(e)?1:Bg(e)?128:$F(e)?64:Vt(e)?4:Nt(e)?2:0;return st(e,t,n,s,r,o,a,!0)}function dR(e){return e?cu(e)||Dg(e)?le({},e):e:null}function wr(e,t,n=!1,s=!1){const{props:r,ref:a,patchFlag:o,children:i,transition:l}=e,c=t?pR(r||{},t):r,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:c,key:c&&Ug(c),ref:t&&t.ref?n&&a?wt(a)?a.concat(Ha(t)):[a,Ha(t)]:Ha(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:i,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Kt?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:l,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&wr(e.ssContent),ssFallback:e.ssFallback&&wr(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return l&&s&&hu(u,l.clone(u)),u}function yo(e=" ",t=0){return tn(Xo,null,e,t)}function ns(e="",t=!1){return t?(bt(),es(us,null,e)):tn(us,null,e)}function hn(e){return e==null||typeof e=="boolean"?tn(us):wt(e)?tn(Kt,null,e.slice()):Hg(e)?Dn(e):tn(Xo,null,String(e))}function Dn(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:wr(e)}function mu(e,t){let n=0;const{shapeFlag:s}=e;if(t==null)t=null;else if(wt(t))n=16;else if(typeof t=="object")if(s&65){const r=t.default;r&&(r._c&&(r._d=!1),mu(e,r()),r._c&&(r._d=!0));return}else{n=32;const r=t._;!r&&!Dg(t)?t._ctx=je:r===3&&je&&(je.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else Nt(t)?(t={default:t,_ctx:je},n=32):(t=String(t),s&64?(n=16,t=[yo(t)]):n=8);e.children=t,e.shapeFlag|=n}function pR(...e){const t={};for(let n=0;n<e.length;n++){const s=e[n];for(const r in s)if(r==="class")t.class!==s.class&&(t.class=bn([t.class,s.class]));else if(r==="style")t.style=Bs([t.style,s.style]);else if(Lo(r)){const a=t[r],o=s[r];o&&a!==o&&!(wt(a)&&a.includes(o))&&(t[r]=a?[].concat(a,o):o)}else r!==""&&(t[r]=s[r])}return t}function cn(e,t,n,s=null){Sn(e,t,7,[n,s])}const mR=Ig();let gR=0;function yR(e,t,n){const s=e.type,r=(t?t.appContext:e.appContext)||mR,a={uid:gR++,vnode:e,type:s,parent:t,appContext:r,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new BO(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(r.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Fg(s,r),emitsOptions:_g(s,r),emit:null,emitted:null,propsDefaults:Ot,inheritAttrs:s.inheritAttrs,ctx:Ot,data:Ot,props:Ot,attrs:Ot,slots:Ot,refs:Ot,setupState:Ot,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=KF.bind(null,a),e.ce&&e.ce(a),a}let Ie=null;const Yo=()=>Ie||je;let bo,hl;{const e=Wo(),t=(n,s)=>{let r;return(r=e[n])||(r=e[n]=[]),r.push(s),a=>{r.length>1?r.forEach(o=>o(a)):r[0](a)}};bo=t("__VUE_INSTANCE_SETTERS__",n=>Ie=n),hl=t("__VUE_SSR_SETTERS__",n=>fa=n)}const ka=e=>{const t=Ie;return bo(e),e.scope.on(),()=>{e.scope.off(),bo(t)}},Cf=()=>{Ie&&Ie.scope.off(),bo(null)};function jg(e){return e.vnode.shapeFlag&4}let fa=!1;function bR(e,t=!1,n=!1){t&&hl(t);const{props:s,children:r}=e.vnode,a=jg(e);tR(e,s,a,t),rR(e,r,n||t);const o=a?wR(e,t):void 0;return t&&hl(!1),o}function wR(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,zF);const{setup:s}=n;if(s){Hn();const r=e.setupContext=s.length>1?vR(e):null,a=ka(e),o=ba(s,e,0,[e.props,r]),i=Bm(o);if(Un(),a(),(i||e.sp)&&!qr(e)&&wg(e),i){if(o.then(Cf,Cf),t)return o.then(l=>{Af(e,l)}).catch(l=>{jo(l,e,0)});e.asyncDep=o}else Af(e,o)}else qg(e)}function Af(e,t,n){Nt(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:Vt(t)&&(e.setupState=hg(t)),qg(e)}function qg(e,t,n){const s=e.type;e.render||(e.render=s.render||yn);{const r=ka(e);Hn();try{BF(e)}finally{Un(),r()}}}const kR={get(e,t){return ge(e,"get",""),e[t]}};function vR(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,kR),slots:e.slots,emit:e.emit,expose:t}}function Zo(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(hg(lF(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Gr)return Gr[n](e)},has(t,n){return n in t||n in Gr}})):e.proxy}function SR(e){return Nt(e)&&"__vccOpts"in e}const ue=(e,t)=>pF(e,t,fa),xR="3.5.28";/**
* @vue/runtime-dom v3.5.28
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let dl;const Df=typeof window<"u"&&window.trustedTypes;if(Df)try{dl=Df.createPolicy("vue",{createHTML:e=>e})}catch{}const Gg=dl?e=>dl.createHTML(e):e=>e,NR="http://www.w3.org/2000/svg",IR="http://www.w3.org/1998/Math/MathML",_n=typeof document<"u"?document:null,Of=_n&&_n.createElement("template"),TR={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,s)=>{const r=t==="svg"?_n.createElementNS(NR,e):t==="mathml"?_n.createElementNS(IR,e):n?_n.createElement(e,{is:n}):_n.createElement(e);return e==="select"&&s&&s.multiple!=null&&r.setAttribute("multiple",s.multiple),r},createText:e=>_n.createTextNode(e),createComment:e=>_n.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>_n.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,s,r,a){const o=n?n.previousSibling:t.lastChild;if(r&&(r===a||r.nextSibling))for(;t.insertBefore(r.cloneNode(!0),n),!(r===a||!(r=r.nextSibling)););else{Of.innerHTML=Gg(s==="svg"?`<svg>${e}</svg>`:s==="mathml"?`<math>${e}</math>`:e);const i=Of.content;if(s==="svg"||s==="mathml"){const l=i.firstChild;for(;l.firstChild;)i.appendChild(l.firstChild);i.removeChild(l)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},$R=Symbol("_vtc");function _R(e,t,n){const s=e[$R];s&&(t=(t?[t,...s]:[...s]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const wo=Symbol("_vod"),Kg=Symbol("_vsh"),ER={name:"show",beforeMount(e,{value:t},{transition:n}){e[wo]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Or(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:s}){!t!=!n&&(s?t?(s.beforeEnter(e),Or(e,!0),s.enter(e)):s.leave(e,()=>{Or(e,!1)}):Or(e,t))},beforeUnmount(e,{value:t}){Or(e,t)}};function Or(e,t){e.style.display=t?e[wo]:"none",e[Kg]=!t}const CR=Symbol(""),AR=/(?:^|;)\s*display\s*:/;function DR(e,t,n){const s=e.style,r=ne(n);let a=!1;if(n&&!r){if(t)if(ne(t))for(const o of t.split(";")){const i=o.slice(0,o.indexOf(":")).trim();n[i]==null&&Ua(s,i,"")}else for(const o in t)n[o]==null&&Ua(s,o,"");for(const o in n)o==="display"&&(a=!0),Ua(s,o,n[o])}else if(r){if(t!==n){const o=s[CR];o&&(n+=";"+o),s.cssText=n,a=AR.test(n)}}else t&&e.removeAttribute("style");wo in e&&(e[wo]=a?s.display:"",e[Kg]&&(s.display="none"))}const Ff=/\s*!important$/;function Ua(e,t,n){if(wt(n))n.forEach(s=>Ua(e,t,s));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const s=OR(e,t);Ff.test(n)?e.setProperty(ms(s),n.replace(Ff,""),"important"):e[s]=n}}const Rf=["Webkit","Moz","ms"],bi={};function OR(e,t){const n=bi[t];if(n)return n;let s=Wn(t);if(s!=="filter"&&s in e)return bi[t]=s;s=Um(s);for(let r=0;r<Rf.length;r++){const a=Rf[r]+s;if(a in e)return bi[t]=a}return t}const Pf="http://www.w3.org/1999/xlink";function Mf(e,t,n,s,r,a=LO(t)){s&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(Pf,t.slice(6,t.length)):e.setAttributeNS(Pf,t,n):n==null||a&&!qm(n)?e.removeAttribute(t):e.setAttribute(t,a?"":vn(n)?String(n):n)}function Vf(e,t,n,s,r){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Gg(n):n);return}const a=e.tagName;if(t==="value"&&a!=="PROGRESS"&&!a.includes("-")){const i=a==="OPTION"?e.getAttribute("value")||"":e.value,l=n==null?e.type==="checkbox"?"on":"":String(n);(i!==l||!("_value"in e))&&(e.value=l),n==null&&e.removeAttribute(t),e._value=n;return}let o=!1;if(n===""||n==null){const i=typeof e[t];i==="boolean"?n=qm(n):n==null&&i==="string"?(n="",o=!0):i==="number"&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(r||t)}function Qn(e,t,n,s){e.addEventListener(t,n,s)}function FR(e,t,n,s){e.removeEventListener(t,n,s)}const Lf=Symbol("_vei");function RR(e,t,n,s,r=null){const a=e[Lf]||(e[Lf]={}),o=a[t];if(s&&o)o.value=s;else{const[i,l]=PR(t);if(s){const c=a[t]=LR(s,r);Qn(e,i,c,l)}else o&&(FR(e,i,o,l),a[t]=void 0)}}const zf=/(?:Once|Passive|Capture)$/;function PR(e){let t;if(zf.test(e)){t={};let s;for(;s=e.match(zf);)e=e.slice(0,e.length-s[0].length),t[s[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):ms(e.slice(2)),t]}let wi=0;const MR=Promise.resolve(),VR=()=>wi||(MR.then(()=>wi=0),wi=Date.now());function LR(e,t){const n=s=>{if(!s._vts)s._vts=Date.now();else if(s._vts<=n.attached)return;Sn(zR(s,n.value),t,5,[s])};return n.value=e,n.attached=VR(),n}function zR(e,t){if(wt(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(s=>r=>!r._stopped&&s&&s(r))}else return t}const Bf=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,BR=(e,t,n,s,r,a)=>{const o=r==="svg";t==="class"?_R(e,s,o):t==="style"?DR(e,n,s):Lo(t)?Qc(t)||RR(e,t,n,s,a):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):WR(e,t,s,o))?(Vf(e,t,s),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&Mf(e,t,s,o,a,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!ne(s))?Vf(e,Wn(t),s,a,t):(t==="true-value"?e._trueValue=s:t==="false-value"&&(e._falseValue=s),Mf(e,t,s,o))};function WR(e,t,n,s){if(s)return!!(t==="innerHTML"||t==="textContent"||t in e&&Bf(t)&&Nt(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="sandbox"&&e.tagName==="IFRAME"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const r=e.tagName;if(r==="IMG"||r==="VIDEO"||r==="CANVAS"||r==="SOURCE")return!1}return Bf(t)&&ne(n)?!1:t in e}const kr=e=>{const t=e.props["onUpdate:modelValue"]||!1;return wt(t)?n=>Ba(t,n):t};function HR(e){e.target.composing=!0}function Wf(e){const t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event("input")))}const Vn=Symbol("_assign");function Hf(e,t,n){return t&&(e=e.trim()),n&&(e=nu(e)),e}const Ks={created(e,{modifiers:{lazy:t,trim:n,number:s}},r){e[Vn]=kr(r);const a=s||r.props&&r.props.type==="number";Qn(e,t?"change":"input",o=>{o.target.composing||e[Vn](Hf(e.value,n,a))}),(n||a)&&Qn(e,"change",()=>{e.value=Hf(e.value,n,a)}),t||(Qn(e,"compositionstart",HR),Qn(e,"compositionend",Wf),Qn(e,"change",Wf))},mounted(e,{value:t}){e.value=t??""},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:s,trim:r,number:a}},o){if(e[Vn]=kr(o),e.composing)return;const i=(a||e.type==="number")&&!/^0\d/.test(e.value)?nu(e.value):e.value,l=t??"";i!==l&&(document.activeElement===e&&e.type!=="range"&&(s&&t===n||r&&e.value.trim()===l)||(e.value=l))}},UR={deep:!0,created(e,t,n){e[Vn]=kr(n),Qn(e,"change",()=>{const s=e._modelValue,r=Xg(e),a=e.checked,o=e[Vn];if(wt(s)){const i=Gm(s,r),l=i!==-1;if(a&&!l)o(s.concat(r));else if(!a&&l){const c=[...s];c.splice(i,1),o(c)}}else if(zo(s)){const i=new Set(s);a?i.add(r):i.delete(r),o(i)}else o(Yg(e,a))})},mounted:Uf,beforeUpdate(e,t,n){e[Vn]=kr(n),Uf(e,t,n)}};function Uf(e,{value:t,oldValue:n},s){e._modelValue=t;let r;if(wt(t))r=Gm(t,s.props.value)>-1;else if(zo(t))r=t.has(s.props.value);else{if(t===n)return;r=Ws(t,Yg(e,!0))}e.checked!==r&&(e.checked=r)}const jR={created(e,{value:t},n){e.checked=Ws(t,n.props.value),e[Vn]=kr(n),Qn(e,"change",()=>{e[Vn](Xg(e))})},beforeUpdate(e,{value:t,oldValue:n},s){e[Vn]=kr(s),t!==n&&(e.checked=Ws(t,s.props.value))}};function Xg(e){return"_value"in e?e._value:e.value}function Yg(e,t){const n=t?"_trueValue":"_falseValue";return n in e?e[n]:t}const qR=["ctrl","shift","alt","meta"],GR={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>"button"in e&&e.button!==0,middle:e=>"button"in e&&e.button!==1,right:e=>"button"in e&&e.button!==2,exact:(e,t)=>qR.some(n=>e[`${n}Key`]&&!t.includes(n))},Lt=(e,t)=>{if(!e)return e;const n=e._withMods||(e._withMods={}),s=t.join(".");return n[s]||(n[s]=((r,...a)=>{for(let o=0;o<t.length;o++){const i=GR[t[o]];if(i&&i(r,t))return}return e(r,...a)}))},KR=le({patchProp:BR},TR);let jf;function XR(){return jf||(jf=oR(KR))}const YR=((...e)=>{const t=XR().createApp(...e),{mount:n}=t;return t.mount=s=>{const r=JR(s);if(!r)return;const a=t._component;!Nt(a)&&!a.render&&!a.template&&(a.template=r.innerHTML),r.nodeType===1&&(r.textContent="");const o=n(r,!1,ZR(r));return r instanceof Element&&(r.removeAttribute("v-cloak"),r.setAttribute("data-v-app","")),o},t});function ZR(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function JR(e){return ne(e)?document.querySelector(e):e}var QR=Object.defineProperty,tP=(e,t,n)=>t in e?QR(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,Ye=(e,t,n)=>tP(e,typeof t!="symbol"?t+"":t,n);function Jo(e){return Ym()?(WO(e),!0):!1}const eP=typeof window<"u"&&typeof document<"u";typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const nP=e=>e!=null,sP=Object.prototype.toString,rP=e=>sP.call(e)==="[object Object]",pl=()=>{};function aP(e,t){function n(...s){return new Promise((r,a)=>{Promise.resolve(e(()=>t.apply(this,s),{fn:t,thisArg:this,args:s})).then(r).catch(a)})}return n}function oP(e,t={}){let n,s,r=pl;const a=i=>{clearTimeout(i),r(),r=pl};let o;return i=>{const l=os(e),c=os(t.maxWait);return n&&a(n),l<=0||c!==void 0&&c<=0?(s&&(a(s),s=void 0),Promise.resolve(i())):new Promise((u,f)=>{r=t.rejectOnCancel?f:u,o=i,c&&!s&&(s=setTimeout(()=>{n&&a(n),s=void 0,u(o())},c)),n=setTimeout(()=>{s&&a(s),s=void 0,u(i())},l)})}}function Xr(e){return Array.isArray(e)?e:[e]}function iP(e){return Yo()}function lP(e,t=200,n={}){return aP(oP(t,n),e)}function cP(e,t=!0,n){iP()?Tr(e,n):t?e():uu(e)}function uP(e,t,n){return Mn(e,t,{...n,immediate:!0})}const $r=eP?window:void 0;function Pn(e){var t;const n=os(e);return(t=n==null?void 0:n.$el)!=null?t:n}function ko(...e){const t=[],n=()=>{t.forEach(i=>i()),t.length=0},s=(i,l,c,u)=>(i.addEventListener(l,c,u),()=>i.removeEventListener(l,c,u)),r=ue(()=>{const i=Xr(os(e[0])).filter(l=>l!=null);return i.every(l=>typeof l!="string")?i:void 0}),a=uP(()=>{var i,l;return[(l=(i=r.value)==null?void 0:i.map(c=>Pn(c)))!=null?l:[$r].filter(c=>c!=null),Xr(os(r.value?e[1]:e[0])),Xr(j(r.value?e[2]:e[1])),os(r.value?e[3]:e[2])]},([i,l,c,u])=>{if(n(),!(i!=null&&i.length)||!(l!=null&&l.length)||!(c!=null&&c.length))return;const f=rP(u)?{...u}:u;t.push(...i.flatMap(h=>l.flatMap(d=>c.map(p=>s(h,d,p,f)))))},{flush:"post"}),o=()=>{a(),n()};return Jo(n),o}function fP(){const e=lo(!1),t=Yo();return t&&Tr(()=>{e.value=!0},t),e}function Zg(e){const t=fP();return ue(()=>(t.value,!!e()))}function hP(e,t,n={}){const{window:s=$r,...r}=n;let a;const o=Zg(()=>s&&"MutationObserver"in s),i=()=>{a&&(a.disconnect(),a=void 0)},l=ue(()=>{const h=os(e),d=Xr(h).map(Pn).filter(nP);return new Set(d)}),c=Mn(l,h=>{i(),o.value&&h.size&&(a=new MutationObserver(t),h.forEach(d=>a.observe(d,r)))},{immediate:!0,flush:"post"}),u=()=>a==null?void 0:a.takeRecords(),f=()=>{c(),i()};return Jo(f),{isSupported:o,stop:f,takeRecords:u}}function dP(e,t,n={}){const{window:s=$r,document:r=s==null?void 0:s.document,flush:a="sync"}=n;if(!s||!r)return pl;let o;const i=u=>{o==null||o(),o=u},l=ho(()=>{const u=Pn(e);if(u){const{stop:f}=hP(r,h=>{h.map(d=>[...d.removedNodes]).flat().some(d=>d===u||d.contains(u))&&t(h)},{window:s,childList:!0,subtree:!0});i(f)}},{flush:a}),c=()=>{l(),i()};return Jo(c),c}function pP(e={}){var t;const{window:n=$r,deep:s=!0,triggerOnRemoval:r=!1}=e,a=(t=e.document)!=null?t:n==null?void 0:n.document,o=()=>{var c;let u=a==null?void 0:a.activeElement;if(s)for(;u!=null&&u.shadowRoot;)u=(c=u==null?void 0:u.shadowRoot)==null?void 0:c.activeElement;return u},i=lo(),l=()=>{i.value=o()};if(n){const c={capture:!0,passive:!0};ko(n,"blur",u=>{u.relatedTarget===null&&l()},c),ko(n,"focus",l,c)}return r&&dP(i,l,{document:a}),l(),i}function mP(e,t,n={}){const{window:s=$r,...r}=n;let a;const o=Zg(()=>s&&"ResizeObserver"in s),i=()=>{a&&(a.disconnect(),a=void 0)},l=ue(()=>{const f=os(e);return Array.isArray(f)?f.map(h=>Pn(h)):[Pn(f)]}),c=Mn(l,f=>{if(i(),o.value&&s){a=new ResizeObserver(t);for(const h of f)h&&a.observe(h,r)}},{immediate:!0,flush:"post"}),u=()=>{i(),c()};return Jo(u),{isSupported:o,stop:u}}function Jg(e,t={width:0,height:0},n={}){const{window:s=$r,box:r="content-box"}=n,a=ue(()=>{var f,h;return(h=(f=Pn(e))==null?void 0:f.namespaceURI)==null?void 0:h.includes("svg")}),o=lo(t.width),i=lo(t.height),{stop:l}=mP(e,([f])=>{const h=r==="border-box"?f.borderBoxSize:r==="content-box"?f.contentBoxSize:f.devicePixelContentBoxSize;if(s&&a.value){const d=Pn(e);if(d){const p=d.getBoundingClientRect();o.value=p.width,i.value=p.height}}else if(h){const d=Xr(h);o.value=d.reduce((p,{inlineSize:y})=>p+y,0),i.value=d.reduce((p,{blockSize:y})=>p+y,0)}else o.value=f.contentRect.width,i.value=f.contentRect.height},n);cP(()=>{const f=Pn(e);f&&(o.value="offsetWidth"in f?f.offsetWidth:t.width,i.value="offsetHeight"in f?f.offsetHeight:t.height)});const c=Mn(()=>Pn(e),f=>{o.value=f?t.width:0,i.value=f?t.height:0});function u(){l(),c()}return{width:o,height:i,stop:u}}var gP=class{constructor(e,t={}){Ye(this,"canvas"),Ye(this,"ctx"),Ye(this,"lastX",0),Ye(this,"lastY",0),Ye(this,"strokeData",[]),Ye(this,"clearTimerId",null),Ye(this,"isDrawing",!1),Ye(this,"options"),Ye(this,"handleStart",s=>{s.preventDefault(),this.isDrawing=!0;const{offsetX:r,offsetY:a}=this.getEventCoordinates(s);this.startDrawing(r,a),this.resetClearTimer()}),Ye(this,"handleMove",s=>{if(!this.isDrawing)return;s.preventDefault();const{offsetX:r,offsetY:a}=this.getEventCoordinates(s);this.draw(r,a),this.resetClearTimer()}),Ye(this,"handleEnd",s=>{this.isDrawing&&(s.preventDefault(),this.isDrawing=!1,this.endStroke(),this.startClearTimer(),this.options.onDrawEnd&&this.options.onDrawEnd())}),this.canvas=e,this.options={clearDelay:1e3,...t};const n=this.canvas.getContext("2d");if(!n)throw new Error("Failed to get 2D rendering context");this.ctx=n,this.setupCanvas(),this.attachEvents()}setupCanvas(){this.ctx.lineJoin="round",this.ctx.lineCap="round",this.ctx.lineWidth=3,this.ctx.strokeStyle="#000",this.clearCanvas(),this.drawGrid()}drawGrid(){const e=this.canvas.width,t=this.canvas.height;this.ctx.save(),this.ctx.strokeStyle="#ddd",this.ctx.lineWidth=1,this.ctx.setLineDash([3,3]),this.ctx.beginPath(),this.ctx.moveTo(0,t/2),this.ctx.lineTo(e,t/2),this.ctx.moveTo(e/2,0),this.ctx.lineTo(e/2,t),this.ctx.stroke(),this.ctx.setLineDash([]),this.ctx.beginPath(),this.ctx.rect(0,0,e,t),this.ctx.stroke(),this.ctx.restore()}clearCanvas(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.drawGrid(),this.strokeData=[],this.resetClearTimer()}startDrawing(e,t){this.lastX=e,this.lastY=t,this.ctx.strokeStyle="#000",this.ctx.lineWidth=3,this.ctx.setLineDash([]),this.strokeData.push(e,t,0)}draw(e,t){this.ctx.beginPath(),this.ctx.moveTo(this.lastX,this.lastY),this.ctx.lineTo(e,t),this.ctx.stroke(),this.lastX=e,this.lastY=t,this.strokeData.push(e,t,0)}endStroke(){this.strokeData.length>=3&&(this.strokeData[this.strokeData.length-1]=1)}getStrokeData(){return this.strokeData}resetClearTimer(){this.clearTimerId&&(window.clearTimeout(this.clearTimerId),this.clearTimerId=null)}startClearTimer(){this.resetClearTimer(),this.clearTimerId=window.setTimeout(()=>{this.clearCanvas(),this.clearTimerId=null},this.options.clearDelay)}getEventCoordinates(e){if(e instanceof MouseEvent)return{offsetX:e.offsetX,offsetY:e.offsetY};{const t=e.touches[0]||e.changedTouches[0],n=e.target.getBoundingClientRect();return{offsetX:t.clientX-n.left,offsetY:t.clientY-n.top}}}attachEvents(){this.canvas.addEventListener("mousedown",this.handleStart),this.canvas.addEventListener("mousemove",this.handleMove),this.canvas.addEventListener("mouseup",this.handleEnd),this.canvas.addEventListener("mouseleave",this.handleEnd),this.canvas.addEventListener("touchstart",this.handleStart,{passive:!1}),this.canvas.addEventListener("touchmove",this.handleMove,{passive:!1}),this.canvas.addEventListener("touchend",this.handleEnd),this.canvas.addEventListener("touchcancel",this.handleEnd)}detachEvents(){this.canvas.removeEventListener("mousedown",this.handleStart),this.canvas.removeEventListener("mousemove",this.handleMove),this.canvas.removeEventListener("mouseup",this.handleEnd),this.canvas.removeEventListener("mouseleave",this.handleEnd),this.canvas.removeEventListener("touchstart",this.handleStart),this.canvas.removeEventListener("touchmove",this.handleMove),this.canvas.removeEventListener("touchend",this.handleEnd),this.canvas.removeEventListener("touchcancel",this.handleEnd)}destroy(){this.detachEvents(),this.resetClearTimer()}getCanvas(){return this.canvas}getContext(){return this.ctx}};let yP={defaultMode:"en",enableHandwriting:!1,position:"static",disableWhenNoFocus:!0},Qg=null,ty=null;function Qs(){return yP}function bP(e){Qg=e}function ml(){return Qg}function wP(e){ty=e}function kP(){return ty}function vP(e,t,n,s=0){if(!e||!t||n==="static")return null;let r,a;if(n==="bottom")r=window.innerHeight-t.offsetHeight,a=0;else{const o=e.getBoundingClientRect(),i=t.offsetWidth;r=o.bottom+window.scrollY+s,a=o.left+window.scrollX+o.width/2-i/2;const l=window.innerWidth;a+i>l&&(a=l-i-10),a<10&&(a=10)}return{top:`${r}px`,left:`${a}px`}}function qf(e){if(!e)return!1;if(e.tagName==="TEXTAREA")return!0;if(e.tagName==="INPUT"){const t=(e.type||"text").toLowerCase();return!["checkbox","radio","button","submit","reset","file","image","range","color","hidden","date","datetime-local","month","week","time"].includes(t)}return!1}function SP(e,t,n){e.value=t,TP(e,n),e.dispatchEvent(new Event("input",{bubbles:!0}))}function xP(e,t,n,s=""){return e.slice(0,t)+s+e.slice(t+n)}function ey(e,t=""){const n=Number(e.getAttribute("maxlength"));let s=e.selectionStart??0;const r=e.selectionEnd??s;let a;if(t.length>0)a=r-s;else{const l=r-s;if(l>0)a=l;else if(s>0)a=1,s--;else return}if(t.length>0&&n&&e.value.length-a+t.length>n)return;const o=xP(e.value,s,a,t),i=s+t.length;SP(e,o,i)}function NP(e,t){ey(e,t)}function IP(e){ey(e)}function TP(e,t){e.selectionStart=t,e.selectionEnd=t}function $P(e={}){const t=e.delay??400,n=e.interval??60;let s,r;function a(){s&&(clearTimeout(s),s=void 0),r&&(clearInterval(r),r=void 0)}function o(i){a(),i(),s=setTimeout(()=>{r=setInterval(()=>{i()},n)},t)}return{start:o,stop:a}}function _P(e=!1){const t=jt(!1),n=jt(0);async function s(){const a=ml();if(a)try{t.value=await a.initialize({onProgress:o=>{n.value=o}})}catch(o){console.error("初始化手写识别服务失败:",o),t.value=!1}else console.warn("未注册手写识别服务"),t.value=!1}async function r(){const a=ml();if(a&&t.value)try{await a.close(),t.value=!1}catch(o){console.error("关闭手写识别服务失败:",o)}}return Tr(()=>{e&&s()}),wa(()=>{r()}),{recognizerInitialized:t,recognizerProgress:n}}const gu="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M21,11H6.83L10.41,7.41L9,6L3,12L9,18L10.41,16.58L6.83,13H21V11Z'%20/%3e%3c/svg%3e",yu="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M19,7V11H5.83L9.41,7.41L8,6L2,12L8,18L9.41,16.58L5.83,13H21V7H19Z'%20/%3e%3c/svg%3e";function Qo(){const e=$P();function t(s,r){var a,o;s.preventDefault(),(o=(a=s.currentTarget)==null?void 0:a.setPointerCapture)==null||o.call(a,s.pointerId),e.start(r)}function n(){e.stop()}return Sg(()=>{e.stop()}),{startRepeat:t,stopRepeat:n}}const EP={class:"zhk-candidate-list"},CP=["onClick"],ny=Kn({__name:"CandidateList",props:{candidates:{}},emits:["select"],setup(e,{emit:t}){const n=t;function s(r){n("select",r)}return(r,a)=>(bt(),xt("div",EP,[(bt(!0),xt(Kt,null,wn(e.candidates,(o,i)=>(bt(),xt("button",{key:`candidate-${i}`,class:"zhk-candidate-list__item",onClick:l=>s(i)},ye(o),9,CP))),128))]))}}),AP={class:"handwriting-input"},DP={class:"handwriting-buttons"},OP={class:"handwriting-canvas-container"},FP={class:"progress-bar"},RP={class:"progress-text"},PP=["width","height"],MP={class:"handwriting-buttons"},VP=Kn({__name:"HandwritingInput",props:{recognizerInitialized:{type:Boolean},recognizerProgress:{}},emits:["key","exit"],setup(e,{emit:t}){const n=e,s=t,r=jt(null),a=jt(null);let o=null;const i=jt(!1),{height:l}=Jg(a);function c(){o&&o.clearCanvas()}function u(){r.value&&(o&&o.destroy(),o=new gP(r.value,{onDrawEnd:p}))}const f=jt([]),{startRepeat:h,stopRepeat:d}=Qo();async function p(){if(!o||o.getStrokeData().length===0||i.value)return;const g=ml();if(g){i.value=!0;try{const m=[...o.getStrokeData()],w=await g.recognize(m);f.value=w}catch(m){console.error("识别笔迹失败:",m)}finally{i.value=!1}}else console.warn("手写识别服务不可用")}wa(()=>{o&&o.destroy()}),ho(()=>{r.value&&l.value&&n.recognizerInitialized&&uu(()=>{u()})});function y(g){const m=f.value[g];m&&(s("key",{key:m}),f.value=[],c())}return(g,m)=>(bt(),xt("div",AP,[tn(ny,{candidates:f.value,onSelect:y},null,8,["candidates"]),st("div",{ref_key:"containerRef",ref:a,class:"handwriting-content"},[st("div",DP,[st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[0]||(m[0]=w=>j(h)(w,()=>s("key",{key:"。"}))),onPointerup:m[1]||(m[1]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[2]||(m[2]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[3]||(m[3]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[4]||(m[4]=Lt(()=>{},["prevent"]))}," 。 ",32),st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[5]||(m[5]=w=>j(h)(w,()=>s("key",{key:"？"}))),onPointerup:m[6]||(m[6]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[7]||(m[7]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[8]||(m[8]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[9]||(m[9]=Lt(()=>{},["prevent"]))}," ？ ",32),st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[10]||(m[10]=w=>j(h)(w,()=>s("key",{key:"！"}))),onPointerup:m[11]||(m[11]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[12]||(m[12]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[13]||(m[13]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[14]||(m[14]=Lt(()=>{},["prevent"]))}," ！ ",32),st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[15]||(m[15]=w=>j(h)(w,()=>s("key",{key:"、"}))),onPointerup:m[16]||(m[16]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[17]||(m[17]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[18]||(m[18]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[19]||(m[19]=Lt(()=>{},["prevent"]))}," 、 ",32)]),st("div",OP,[e.recognizerInitialized?(bt(),xt("canvas",{key:1,ref_key:"canvasRef",ref:r,class:"handwriting-canvas",width:j(l),height:j(l)},null,8,PP)):(bt(),xt("div",{key:0,class:"handwriting-loading",style:Bs({width:`${j(l)}px`,height:`${j(l)}px`})},[m[37]||(m[37]=st("div",{class:"loading-text"}," 正在加载手写识别... ",-1)),st("div",FP,[st("div",{class:"progress-fill",style:Bs({width:`${e.recognizerProgress*100}%`})},null,4)]),st("div",RP,ye(Math.round(e.recognizerProgress*100))+"% ",1)],4))]),st("div",MP,[st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[20]||(m[20]=w=>j(h)(w,()=>s("key",{key:"delete",isControl:!0}))),onPointerup:m[21]||(m[21]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[22]||(m[22]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[23]||(m[23]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[24]||(m[24]=Lt(()=>{},["prevent"]))},[...m[38]||(m[38]=[st("img",{src:gu,alt:"删除"},null,-1)])],32),st("button",{class:"handwriting-btn handwriting-btn--function",onClick:m[25]||(m[25]=w=>s("exit")),onContextmenu:m[26]||(m[26]=Lt(()=>{},["prevent"]))}," 拼音 ",32),st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[27]||(m[27]=w=>j(h)(w,()=>s("key",{key:"，"}))),onPointerup:m[28]||(m[28]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[29]||(m[29]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[30]||(m[30]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[31]||(m[31]=Lt(()=>{},["prevent"]))}," ， ",32),st("button",{class:"handwriting-btn handwriting-btn--function",onPointerdown:m[32]||(m[32]=w=>j(h)(w,()=>s("key",{key:"enter",isControl:!0}))),onPointerup:m[33]||(m[33]=(...w)=>j(d)&&j(d)(...w)),onPointerleave:m[34]||(m[34]=(...w)=>j(d)&&j(d)(...w)),onPointercancel:m[35]||(m[35]=(...w)=>j(d)&&j(d)(...w)),onContextmenu:m[36]||(m[36]=Lt(()=>{},["prevent"]))},[...m[39]||(m[39]=[st("img",{src:yu,alt:"回车"},null,-1)])],32)])],512)]))}}),LP="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M6,18H18V16H6M12,8.41L16.59,13L18,11.58L12,5.58L6,11.58L7.41,13L12,8.41Z'%20/%3e%3c/svg%3e",sy="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M3%2015H5V19H19V15H21V19C21%2020.1%2020.1%2021%2019%2021H5C3.9%2021%203%2020.1%203%2019V15Z'%20/%3e%3c/svg%3e",zP="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z'%20/%3e%3c/svg%3e",BP={class:"zhk-selection"},WP={class:"zhk-selection__list"},HP=["onClick"],UP=Kn({__name:"CandidateSelection",props:{candidates:{}},emits:["select","close"],setup(e,{emit:t}){const n=t;function s(o){n("select",o)}function r(){n("close")}function a(o){const i=Array.from(o).length;return i>=2&&i<=3?2:i>=4?3:1}return(o,i)=>(bt(),xt("div",BP,[st("div",WP,[(bt(!0),xt(Kt,null,wn(e.candidates,(l,c)=>(bt(),xt("div",{key:c,class:bn(["zhk-selection__text",[`zhk-selection__text--span-${a(l)}`]]),onClick:u=>s(c)},ye(l),11,HP))),128))]),st("div",{class:"zhk-selection__func"},[st("button",{class:"zhk-selection__func-btn",onClick:r}," 返回 ")])]))}}),jP={class:"zhk-candidate"},qP={class:"zhk-candidate__container"},GP={key:0,class:"zhk-candidate__pinyin"},KP={class:"zhk-candidate__bottom-container"},XP=Kn({__name:"CandidateBar",props:{modelValue:{required:!0},modelModifiers:{}},emits:ll(["key","input"],["update:modelValue"]),setup(e,{expose:t,emit:n}){const s=n,r=Tg(e,"modelValue");let a=null;const o=jt(null),i=ue(()=>{var f;return((f=o.value)==null?void 0:f.candidates.map(h=>h.text))??[]}),l=jt(!1);Tr(async()=>{if(a=kP(),!a)throw new Error("未找到拼音引擎实例，请确保已正确注册引擎");r.value&&(o.value=await a.processInput(r.value))}),wa(()=>{a==null||a.clearInput(),a=null}),Mn(r,async f=>{const h=a;if(h){if(f===""){h.clearInput(),o.value=null;return}o.value=await h.processInput(f)}});async function c(f){if(!a)return;const h=await a.pickCandidate(f);o.value=h,h.preeditBody||(s("input",h.committed||""),r.value="",o.value=null,l.value=!1)}t({handleSelection:c});const u=ue(()=>{const f=o.value;return f?f.preeditHead+f.preeditBody:""});return(f,h)=>(bt(),xt("div",jP,[st("div",qP,[u.value?(bt(),xt("div",GP,ye(u.value),1)):ns("",!0),st("div",KP,[i.value.length>0?(bt(),es(ny,{key:0,candidates:i.value,onSelect:c},null,8,["candidates"])):ns("",!0),i.value.length>0?(bt(),xt("button",{key:1,class:"zhk-candidate__more",onClick:h[0]||(h[0]=d=>l.value=!0)},[...h[2]||(h[2]=[st("img",{src:zP,alt:"更多"},null,-1)])])):ns("",!0)])]),l.value?(bt(),es(UP,{key:0,candidates:i.value,onSelect:c,onClose:h[1]||(h[1]=d=>l.value=!1)},null,8,["candidates"])):ns("",!0)]))}}),YP={class:"zhk-base"},ZP={class:"zhk-base__row"},JP=["onPointerdown"],QP=["disabled"],tM={key:1,src:LP,class:"zhk-base__key-icon",alt:"Shift"},eM=["onPointerdown"],nM={class:"zhk-base__row"},sM={class:"zhk-base__toggle-main"},rM={class:"zhk-base__toggle-sub"},aM=Kn({__name:"KeyboardBase",props:ll({enableHandwriting:{type:Boolean}},{modelValue:{default:"en"},modelModifiers:{}}),emits:ll(["key"],["update:modelValue"]),setup(e,{emit:t}){const n=e,s=t,r=Tg(e,"modelValue"),a=ue(()=>r.value==="en_cap"),o=ue(()=>r.value==="zh"),i=ue(()=>o.value?!0:a.value);function l(_,x=!1){s("key",{key:_,isControl:x})}function c(){o.value?r.value="hand":r.value=a.value?"en":"en_cap"}function u(){r.value="num"}function f(){r.value="symbol"}const h=["1","2","3","4","5","6","7","8","9","0"],d=[["q","w","e","r","t","y","u","i","o","p"],["a","s","d","f","g","h","j","k","l"],["z","x","c","v","b","n","m"]],p=jt(""),y=jt(null),{startRepeat:g,stopRepeat:m}=Qo();function w(){if(r.value==="zh"&&p.value){p.value=p.value.slice(0,-1);return}l("delete",!0)}function S(){var _;if(r.value==="zh"&&p.value){(_=y.value)==null||_.handleSelection(0);return}l(" ")}function k(){if(r.value==="zh"&&p.value){l(p.value),p.value="";return}l("enter",!0)}function I(_){if(r.value==="zh"){p.value+=_;return}const x=a.value?_.toUpperCase():_;l(x)}function $(){r.value=r.value==="zh"?"en":"zh"}const E=ue(()=>n.enableHandwriting?"手写":"-"),D=ue(()=>!n.enableHandwriting);return(_,x)=>(bt(),xt("div",YP,[st("div",ZP,[r.value==="zh"?(bt(),es(XP,{key:0,ref_key:"candidateBarRef",ref:y,modelValue:p.value,"onUpdate:modelValue":x[0]||(x[0]=v=>p.value=v),onInput:x[1]||(x[1]=v=>l(v,!1))},null,8,["modelValue"])):(bt(),xt(Kt,{key:1},wn(h,(v,R)=>st("button",{key:`number-${R}`,class:"zhk-base__key zhk-base__key--letter",onPointerdown:P=>j(g)(P,()=>I(v)),onPointerup:x[2]||(x[2]=(...P)=>j(m)&&j(m)(...P)),onPointerleave:x[3]||(x[3]=(...P)=>j(m)&&j(m)(...P)),onPointercancel:x[4]||(x[4]=(...P)=>j(m)&&j(m)(...P)),onContextmenu:x[5]||(x[5]=Lt(()=>{},["prevent"]))},ye(v),41,JP)),64))]),(bt(),xt(Kt,null,wn(d,(v,R)=>st("div",{key:`row-${R}`,class:"zhk-base__row"},[R===2?(bt(),xt("button",{key:0,class:bn(["zhk-base__key zhk-base__key--function zhk-base__key--shift",{"zhk-base__key--active":!o.value&&a.value,"zhk-base__key--disabled":o.value&&D.value}]),disabled:o.value&&D.value,onClick:c,onContextmenu:x[6]||(x[6]=Lt(()=>{},["prevent"]))},[o.value?(bt(),xt(Kt,{key:0},[yo(ye(E.value),1)],64)):(bt(),xt("img",tM))],42,QP)):ns("",!0),(bt(!0),xt(Kt,null,wn(v,(P,V)=>(bt(),xt("button",{key:`key-${R}-${V}`,class:"zhk-base__key zhk-base__key--letter",onPointerdown:M=>j(g)(M,()=>I(P)),onPointerup:x[7]||(x[7]=(...M)=>j(m)&&j(m)(...M)),onPointerleave:x[8]||(x[8]=(...M)=>j(m)&&j(m)(...M)),onPointercancel:x[9]||(x[9]=(...M)=>j(m)&&j(m)(...M)),onContextmenu:x[10]||(x[10]=Lt(()=>{},["prevent"]))},ye(i.value?P.toUpperCase():P),41,eM))),128)),R===2?(bt(),xt("button",{key:1,class:"zhk-base__key zhk-base__key--function zhk-base__key--delete",onPointerdown:x[11]||(x[11]=P=>j(g)(P,()=>w())),onPointerup:x[12]||(x[12]=(...P)=>j(m)&&j(m)(...P)),onPointerleave:x[13]||(x[13]=(...P)=>j(m)&&j(m)(...P)),onPointercancel:x[14]||(x[14]=(...P)=>j(m)&&j(m)(...P)),onContextmenu:x[15]||(x[15]=Lt(()=>{},["prevent"]))},[...x[39]||(x[39]=[st("img",{src:gu,class:"zhk-base__key-icon",alt:"Delete"},null,-1)])],32)):ns("",!0)])),64)),st("div",nM,[st("button",{class:"zhk-base__key zhk-base__key--function",onClick:f,onContextmenu:x[16]||(x[16]=Lt(()=>{},["prevent"]))}," 符 ",32),st("button",{class:"zhk-base__key zhk-base__key--function",onClick:u,onContextmenu:x[17]||(x[17]=Lt(()=>{},["prevent"]))}," 123 ",32),st("button",{class:"zhk-base__key",onPointerdown:x[18]||(x[18]=v=>j(g)(v,()=>l(","))),onPointerup:x[19]||(x[19]=(...v)=>j(m)&&j(m)(...v)),onPointerleave:x[20]||(x[20]=(...v)=>j(m)&&j(m)(...v)),onPointercancel:x[21]||(x[21]=(...v)=>j(m)&&j(m)(...v)),onContextmenu:x[22]||(x[22]=Lt(()=>{},["prevent"]))}," ， ",32),st("button",{class:"zhk-base__key zhk-base__key--space",onPointerdown:x[23]||(x[23]=v=>j(g)(v,()=>S())),onPointerup:x[24]||(x[24]=(...v)=>j(m)&&j(m)(...v)),onPointerleave:x[25]||(x[25]=(...v)=>j(m)&&j(m)(...v)),onPointercancel:x[26]||(x[26]=(...v)=>j(m)&&j(m)(...v)),onContextmenu:x[27]||(x[27]=Lt(()=>{},["prevent"]))},[...x[40]||(x[40]=[st("img",{src:sy,class:"zhk-base__key-icon",alt:"Space"},null,-1)])],32),st("button",{class:"zhk-base__key",onPointerdown:x[28]||(x[28]=v=>j(g)(v,()=>l("。"))),onPointerup:x[29]||(x[29]=(...v)=>j(m)&&j(m)(...v)),onPointerleave:x[30]||(x[30]=(...v)=>j(m)&&j(m)(...v)),onPointercancel:x[31]||(x[31]=(...v)=>j(m)&&j(m)(...v)),onContextmenu:x[32]||(x[32]=Lt(()=>{},["prevent"]))}," 。 ",32),st("button",{class:"zhk-base__key zhk-base__key--function",onClick:$,onContextmenu:x[33]||(x[33]=Lt(()=>{},["prevent"]))},[st("span",sM,ye(r.value==="zh"?"中":"英"),1),st("span",rM,"/"+ye(r.value==="zh"?"英":"中"),1)],32),st("button",{class:"zhk-base__key zhk-base__key--function",onPointerdown:x[34]||(x[34]=v=>j(g)(v,()=>k())),onPointerup:x[35]||(x[35]=(...v)=>j(m)&&j(m)(...v)),onPointerleave:x[36]||(x[36]=(...v)=>j(m)&&j(m)(...v)),onPointercancel:x[37]||(x[37]=(...v)=>j(m)&&j(m)(...v)),onContextmenu:x[38]||(x[38]=Lt(()=>{},["prevent"]))},[...x[41]||(x[41]=[st("img",{src:yu,class:"zhk-base__key-icon",alt:"Enter"},null,-1)])],32)])]))}}),oM={class:"num-keyboard"},iM={class:"num-keyboard__container"},lM={class:"num-keyboard__left"},cM={class:"num-keyboard__rows"},uM=["onClick","onPointerdown"],fM={key:1,src:sy,class:"zhk-base__key-icon",alt:"Space"},hM={class:"num-keyboard__right"},dM=["onPointerdown"],pM=["src","alt"],mM={key:1},gM=Kn({__name:"NumericKeyboard",props:{keyboardRows:{default:()=>Qs().numKeys||[["1","2","3"],["4","5","6"],["7","8","9"],["back","0","space"]]}},emits:["key","exit"],setup(e,{emit:t}){const n=t,s=[{key:"delete",icon:gu,text:"",alt:"Delete"},{key:".",icon:"",text:".",alt:"."},{key:"@",icon:"",text:"@",alt:"@"},{key:"enter",icon:yu,text:"",alt:"Enter"}];function r(u){n("key",{key:u})}function a(u,f=!0){n("key",{key:u,isControl:f})}function o(){n("exit")}const{startRepeat:i,stopRepeat:l}=Qo();function c(u,f){u==="back"||(u==="space"&&(u=" "),u==="delete"||u==="enter"?i(f,()=>a(u)):i(f,()=>r(u)))}return(u,f)=>(bt(),xt("div",oM,[st("div",iM,[st("div",lM,[st("div",cM,[(bt(!0),xt(Kt,null,wn(e.keyboardRows,(h,d)=>(bt(),xt("div",{key:`row-${d}`,class:"num-keyboard__row"},[(bt(!0),xt(Kt,null,wn(h,(p,y)=>(bt(),xt("button",{key:`key-${d}-${y}`,class:bn(["num-keyboard__key",{"num-keyboard__key--back":p==="back","num-keyboard__key--space":p==="space"}]),onClick:g=>p==="back"&&o(),onPointerdown:g=>c(p,g),onPointerup:f[0]||(f[0]=(...g)=>j(l)&&j(l)(...g)),onPointerleave:f[1]||(f[1]=(...g)=>j(l)&&j(l)(...g)),onPointercancel:f[2]||(f[2]=(...g)=>j(l)&&j(l)(...g)),onContextmenu:f[3]||(f[3]=Lt(()=>{},["prevent"]))},[p==="back"?(bt(),xt(Kt,{key:0},[yo(" 返回 ")],64)):p==="space"?(bt(),xt("img",fM)):(bt(),xt(Kt,{key:2},[yo(ye(p),1)],64))],42,uM))),128))]))),128))])]),st("div",hM,[(bt(),xt(Kt,null,wn(s,(h,d)=>st("button",{key:`func-${d}`,class:"num-keyboard__key num-keyboard__key--function",onPointerdown:p=>c(h.key,p),onPointerup:f[4]||(f[4]=(...p)=>j(l)&&j(l)(...p)),onPointerleave:f[5]||(f[5]=(...p)=>j(l)&&j(l)(...p)),onPointercancel:f[6]||(f[6]=(...p)=>j(l)&&j(l)(...p)),onContextmenu:f[7]||(f[7]=Lt(()=>{},["prevent"]))},[h.icon?(bt(),xt("img",{key:0,src:h.icon,class:"num-keyboard__key-icon",alt:h.alt},null,8,pM)):(bt(),xt("span",mM,ye(h.text),1))],40,dM)),64))])])]))}}),yM="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M18,20V10H6V20H18M18,8A2,2%200%200,1%2020,10V20A2,2%200%200,1%2018,22H6C4.89,22%204,21.1%204,20V10A2,2%200%200,1%206,8H15V6A3,3%200%200,0%2012,3A3,3%200%200,0%209,6H7A5,5%200%200,1%2012,1A5,5%200%200,1%2017,6V8H18M12,17A2,2%200%200,1%2010,15A2,2%200%200,1%2012,13A2,2%200%200,1%2014,15A2,2%200%200,1%2012,17Z'%20/%3e%3c/svg%3e",bM="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2024%2024'%3e%3cpath%20d='M12,17C10.89,17%2010,16.1%2010,15C10,13.89%2010.89,13%2012,13A2,2%200%200,1%2014,15A2,2%200%200,1%2012,17M18,20V10H6V20H18M18,8A2,2%200%200,1%2020,10V20A2,2%200%200,1%2018,22H6C4.89,22%204,21.1%204,20V10C4,8.89%204.89,8%206,8H7V6A5,5%200%200,1%2012,1A5,5%200%200,1%2017,6V8H18M12,3A3,3%200%200,0%209,6V8H15V6A3,3%200%200,0%2012,3Z'%20/%3e%3c/svg%3e",wM={class:"symbol-keyboard"},kM={class:"symbol-keyboard__content"},vM={class:"symbol-keyboard__functions"},SM={class:"symbol-keyboard__lang-selector"},xM={class:"symbol-keyboard__control-group"},NM=["src"],IM=["src"],TM={class:"symbol-keyboard__symbols-container"},$M={class:"symbol-keyboard__symbols-grid"},_M=["onClick","onPointerdown"],EM="!@#$%^&*(){}[]<>/\\|:;\"',.?+-=_~`€£¥₹©®™°",CM="！＠＃￥％…＆＊（）｛｝［］＜＞／＼｜：；＂＇，。？＋－＝＿～·€£¥₹©®™°",AM=Kn({__name:"SymbolKeyboard",emits:["key","exit"],setup(e,{emit:t}){const n=t,s=jt("en"),r=ue(()=>s.value==="zh"?CM:EM),a=jt(!1),{startRepeat:o,stopRepeat:i}=Qo();function l(d,p){a.value&&o(p,()=>c(d))}function c(d){n("key",{key:d}),a.value||n("exit")}function u(){n("exit")}function f(d){s.value=d}function h(){a.value=!a.value}return(d,p)=>(bt(),xt("div",wM,[st("div",kM,[st("div",vM,[st("div",SM,[st("button",{class:bn(["symbol-keyboard__lang-btn",{"symbol-keyboard__lang-btn--active":s.value==="zh"}]),onClick:p[0]||(p[0]=y=>f("zh")),onContextmenu:p[1]||(p[1]=Lt(()=>{},["prevent"]))}," 中文 ",34),st("button",{class:bn(["symbol-keyboard__lang-btn",{"symbol-keyboard__lang-btn--active":s.value==="en"}]),onClick:p[2]||(p[2]=y=>f("en")),onContextmenu:p[3]||(p[3]=Lt(()=>{},["prevent"]))}," 英文 ",34)]),st("div",xM,[st("button",{class:bn(["symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--lock",{"symbol-keyboard__key--locked":a.value}]),onClick:h,onContextmenu:p[4]||(p[4]=Lt(()=>{},["prevent"]))},[a.value?(bt(),xt("img",{key:1,src:j(bM),alt:"Lock closed"},null,8,IM)):(bt(),xt("img",{key:0,src:j(yM),alt:"Lock open"},null,8,NM))],34),st("button",{class:"symbol-keyboard__key symbol-keyboard__key--function symbol-keyboard__key--back",onClick:u,onContextmenu:p[5]||(p[5]=Lt(()=>{},["prevent"]))}," 返回 ",32)])]),st("div",TM,[st("div",$M,[(bt(!0),xt(Kt,null,wn(r.value,(y,g)=>(bt(),xt("button",{key:`key-${g}`,class:"symbol-keyboard__key",onClick:m=>!a.value&&c(y),onPointerdown:m=>l(y,m),onPointerup:p[6]||(p[6]=(...m)=>j(i)&&j(i)(...m)),onPointerleave:p[7]||(p[7]=(...m)=>j(i)&&j(i)(...m)),onPointercancel:p[8]||(p[8]=(...m)=>j(i)&&j(i)(...m)),onContextmenu:p[9]||(p[9]=Lt(()=>{},["prevent"]))},ye(y),41,_M))),128))])])])]))}}),DM={key:0,class:"zhk__disabled-overlay"},OM=Kn({__name:"ZhKeyboard",props:{defaultMode:{type:String,default:()=>Qs().defaultMode},enableHandwriting:{type:Boolean,default:()=>Qs().enableHandwriting},position:{type:String,default:()=>Qs().position},floatMarginTop:{type:Number,default:()=>Qs().floatMarginTop??0},disableWhenNoFocus:{type:Boolean,default:()=>Qs().disableWhenNoFocus},numKeys:{type:Array||void 0}},emits:["key"],setup(e,{emit:t}){const n=e,s=t,r=jt(n.defaultMode),a=jt(n.defaultMode),o=jt([]),i=jt(!1),l=jt(null),c=jt(null),{recognizerInitialized:u,recognizerProgress:f}=_P(n.enableHandwriting);Mn(r,(E,D)=>{E!==D&&(a.value=D)});const h=pP(),d=ue(()=>h.value&&qf(h.value)?h.value:null),p=ue(()=>n.position==="static"||!!(h.value&&qf(h.value))),{height:y}=Jg(c);ho(()=>{if(d.value){const E=d.value.dataset.inputmode;E&&(r.value=E)}});const g=ue(()=>n.disableWhenNoFocus===!1?!1:!d.value);function m(){if(!y.value)return;const E=vP(d.value,c.value,n.position,n.floatMarginTop);l.value=E}ho(m);const w=lP(m,100);ko(window,"scroll",w,{passive:!0}),ko(window,"resize",w,{passive:!0});function S(E){if(E.isControl){switch(E.key){case"delete":IP(d.value);break;case"more":i.value=!0;break}return}else k(E.key);s("key",E)}function k(E){NP(d.value,E)}function I(){r.value==="hand"?a.value="zh":["num","symbol"].includes(a.value)&&(a.value=n.defaultMode),r.value=a.value}function $(E){o.value=E}return(E,D)=>$n((bt(),xt("div",{ref_key:"keyboardRef",ref:c,class:bn(["zhk",{"zhk--floating":e.position==="float","zhk--bottom":e.position==="bottom","zhk--disabled":g.value}]),style:Bs({"--keyboard-height":`${j(y)}px`,...l.value}),onMousedown:D[1]||(D[1]=Lt(()=>{},["prevent"]))},[g.value||!p.value||!j(y)?(bt(),xt("div",DM,[...D[2]||(D[2]=[st("span",null,"请选择输入框以启用键盘",-1)])])):(bt(),xt(Kt,{key:1},[r.value==="hand"?(bt(),es(VP,{key:0,"recognizer-initialized":j(u),"recognizer-progress":j(f),onKey:S,onExit:I,onRecognize:$},null,8,["recognizer-initialized","recognizer-progress"])):r.value==="num"?(bt(),es(gM,{key:1,"keyboard-rows":e.numKeys,onKey:S,onExit:I},null,8,["keyboard-rows"])):r.value==="symbol"?(bt(),es(AM,{key:2,onKey:S,onExit:I})):r.value==="en"||r.value==="en_cap"||r.value==="zh"?(bt(),es(aM,{key:3,modelValue:r.value,"onUpdate:modelValue":D[0]||(D[0]=_=>r.value=_),"enable-handwriting":e.enableHandwriting,onKey:S},null,8,["modelValue","enable-handwriting"])):ns("",!0)],64))],38)),[[ER,p.value]])}});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ry=Symbol("Comlink.proxy"),FM=Symbol("Comlink.endpoint"),RM=Symbol("Comlink.releaseProxy"),ki=Symbol("Comlink.finalizer"),ja=Symbol("Comlink.thrown"),ay=e=>typeof e=="object"&&e!==null||typeof e=="function",PM={canHandle:e=>ay(e)&&e[ry],serialize(e){const{port1:t,port2:n}=new MessageChannel;return iy(e,t),[n,[n]]},deserialize(e){return e.start(),cy(e)}},MM={canHandle:e=>ay(e)&&ja in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},oy=new Map([["proxy",PM],["throw",MM]]);function VM(e,t){for(const n of e)if(t===n||n==="*"||n instanceof RegExp&&n.test(t))return!0;return!1}function iy(e,t=globalThis,n=["*"]){t.addEventListener("message",function s(r){if(!r||!r.data)return;if(!VM(n,r.origin)){console.warn(`Invalid origin '${r.origin}' for comlink proxy`);return}const{id:a,type:o,path:i}=Object.assign({path:[]},r.data),l=(r.data.argumentList||[]).map(Is);let c;try{const u=i.slice(0,-1).reduce((h,d)=>h[d],e),f=i.reduce((h,d)=>h[d],e);switch(o){case"GET":c=f;break;case"SET":u[i.slice(-1)[0]]=Is(r.data.value),c=!0;break;case"APPLY":c=f.apply(u,l);break;case"CONSTRUCT":{const h=new f(...l);c=UM(h)}break;case"ENDPOINT":{const{port1:h,port2:d}=new MessageChannel;iy(e,d),c=HM(h,[h])}break;case"RELEASE":c=void 0;break;default:return}}catch(u){c={value:u,[ja]:0}}Promise.resolve(c).catch(u=>({value:u,[ja]:0})).then(u=>{const[f,h]=xo(u);t.postMessage(Object.assign(Object.assign({},f),{id:a}),h),o==="RELEASE"&&(t.removeEventListener("message",s),ly(t),ki in e&&typeof e[ki]=="function"&&e[ki]())}).catch(u=>{const[f,h]=xo({value:new TypeError("Unserializable return value"),[ja]:0});t.postMessage(Object.assign(Object.assign({},f),{id:a}),h)})}),t.start&&t.start()}function LM(e){return e.constructor.name==="MessagePort"}function ly(e){LM(e)&&e.close()}function cy(e,t){const n=new Map;return e.addEventListener("message",function(r){const{data:a}=r;if(!a||!a.id)return;const o=n.get(a.id);if(o)try{o(a)}finally{n.delete(a.id)}}),gl(e,n,[],t)}function _a(e){if(e)throw new Error("Proxy has been released and is not useable")}function uy(e){return tr(e,new Map,{type:"RELEASE"}).then(()=>{ly(e)})}const vo=new WeakMap,So="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(vo.get(e)||0)-1;vo.set(e,t),t===0&&uy(e)});function zM(e,t){const n=(vo.get(t)||0)+1;vo.set(t,n),So&&So.register(e,t,e)}function BM(e){So&&So.unregister(e)}function gl(e,t,n=[],s=function(){}){let r=!1;const a=new Proxy(s,{get(o,i){if(_a(r),i===RM)return()=>{BM(a),uy(e),t.clear(),r=!0};if(i==="then"){if(n.length===0)return{then:()=>a};const l=tr(e,t,{type:"GET",path:n.map(c=>c.toString())}).then(Is);return l.then.bind(l)}return gl(e,t,[...n,i])},set(o,i,l){_a(r);const[c,u]=xo(l);return tr(e,t,{type:"SET",path:[...n,i].map(f=>f.toString()),value:c},u).then(Is)},apply(o,i,l){_a(r);const c=n[n.length-1];if(c===FM)return tr(e,t,{type:"ENDPOINT"}).then(Is);if(c==="bind")return gl(e,t,n.slice(0,-1));const[u,f]=Gf(l);return tr(e,t,{type:"APPLY",path:n.map(h=>h.toString()),argumentList:u},f).then(Is)},construct(o,i){_a(r);const[l,c]=Gf(i);return tr(e,t,{type:"CONSTRUCT",path:n.map(u=>u.toString()),argumentList:l},c).then(Is)}});return zM(a,e),a}function WM(e){return Array.prototype.concat.apply([],e)}function Gf(e){const t=e.map(xo);return[t.map(n=>n[0]),WM(t.map(n=>n[1]))]}const fy=new WeakMap;function HM(e,t){return fy.set(e,t),e}function UM(e){return Object.assign(e,{[ry]:!0})}function xo(e){for(const[t,n]of oy)if(n.canHandle(e)){const[s,r]=n.serialize(e);return[{type:"HANDLER",name:t,value:s},r]}return[{type:"RAW",value:e},fy.get(e)||[]]}function Is(e){switch(e.type){case"HANDLER":return oy.get(e.name).deserialize(e.value);case"RAW":return e.value}}function tr(e,t,n,s){return new Promise(r=>{const a=jM();t.set(a,r),e.start&&e.start(),e.postMessage(Object.assign({id:a},n),s)})}function jM(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}const qM={class:"root-container"},GM={class:"container"},KM={class:"input-grid"},XM={class:"input-container"},YM={class:"input-container"},ZM={class:"input-container"},JM={class:"input-container"},QM={class:"controls"},tV={class:"checkbox-container"},eV={class:"checkbox-item"},nV={class:"position-container"},sV={class:"radio-group"},rV=["id","value"],aV=["for"],oV={class:"keyboard-wrapper"},iV=Kn({__name:"App",setup(e){const t=jt(""),n=jt(""),s=jt(""),r=jt(""),a=jt(400),o=jt(300),i=jt("float"),l=jt(!0),c={static:"键盘固定在页面中",float:"键盘将在点击输入框时显示",bottom:"键盘固定在屏幕底部"};return Tr(()=>{window.innerWidth<960&&(i.value="bottom")}),(u,f)=>(bt(),xt("div",qM,[st("div",GM,[f[14]||(f[14]=st("div",{class:"header"},[st("h1",null,"中文虚拟键盘测试"),st("div",{class:"github-link"},[st("a",{href:"https://github.com/dusionlike/zh-keyboard",target:"_blank",rel:"noopener noreferrer"},[st("img",{src:"https://img.shields.io/github/stars/dusionlike/zh-keyboard?style=social",alt:"GitHub stars"})])])],-1)),st("div",KM,[st("div",XM,[f[8]||(f[8]=st("label",null,"英文输入:",-1)),$n(st("input",{"onUpdate:modelValue":f[0]||(f[0]=h=>t.value=h),type:"text","data-inputmode":"en",inputmode:"none",placeholder:"点击这里使用英文输入"},null,512),[[Ks,t.value]])]),st("div",YM,[f[9]||(f[9]=st("label",null,"中文拼音输入:",-1)),$n(st("input",{"onUpdate:modelValue":f[1]||(f[1]=h=>n.value=h),type:"text","data-inputmode":"zh",inputmode:"none",placeholder:"点击这里使用中文拼音"},null,512),[[Ks,n.value]])]),st("div",ZM,[f[10]||(f[10]=st("label",null,"手写输入:",-1)),$n(st("input",{"onUpdate:modelValue":f[2]||(f[2]=h=>s.value=h),type:"text","data-inputmode":"hand",inputmode:"none",placeholder:"点击这里使用手写"},null,512),[[Ks,s.value]])]),st("div",JM,[f[11]||(f[11]=st("label",null,"数字输入:",-1)),$n(st("input",{"onUpdate:modelValue":f[3]||(f[3]=h=>r.value=h),type:"text","data-inputmode":"num",inputmode:"none",placeholder:"点击这里使用数字键盘"},null,512),[[Ks,r.value]])])]),st("div",QM,[i.value!=="bottom"?(bt(),xt(Kt,{key:0},[st("label",null,"键盘宽度: "+ye(a.value)+"px",1),$n(st("input",{"onUpdate:modelValue":f[4]||(f[4]=h=>a.value=h),type:"range",min:"400",max:"1080",step:"10",class:"width-slider"},null,512),[[Ks,a.value]]),st("label",null,"键盘高度: "+ye(o.value)+"px",1),$n(st("input",{"onUpdate:modelValue":f[5]||(f[5]=h=>o.value=h),type:"range",min:"300",max:"1000",step:"10",class:"width-slider"},null,512),[[Ks,o.value]])],64)):ns("",!0),st("div",tV,[st("div",eV,[$n(st("input",{id:"disable-when-no-focus","onUpdate:modelValue":f[6]||(f[6]=h=>l.value=h),type:"checkbox"},null,512),[[UR,l.value]]),f[12]||(f[12]=st("label",{for:"disable-when-no-focus"},"当无焦点时禁用键盘",-1))])]),st("div",nV,[f[13]||(f[13]=st("label",null,"键盘定位方式:",-1)),st("div",sV,[(bt(),xt(Kt,null,wn(c,(h,d)=>st("div",{key:d,class:"radio-item"},[$n(st("input",{id:`pos-${d}`,"onUpdate:modelValue":f[7]||(f[7]=p=>i.value=p),type:"radio",value:d,name:"position"},null,8,rV),[[jR,i.value]]),st("label",{for:`pos-${d}`},ye(h),9,aV)])),64))])])])]),st("div",oV,[tn(j(OM),{position:i.value,style:Bs(i.value==="bottom"?{width:"100%",height:"auto"}:{width:`${a.value}px`,height:`${o.value}px`}),"enable-handwriting":"","disable-when-no-focus":l.value},null,8,["position","style","disable-when-no-focus"])])]))}});bP(new EO({modelPath:new URL(""+new URL("../models/handwrite/model.json",import.meta.url).href,import.meta.url).href,dictPath:new URL(""+new URL("../models/dict.txt",import.meta.url).href,import.meta.url).href}));const lV=new Worker(new URL(""+new URL("pinyin-engine.worker-DS_sKBrd.js",import.meta.url).href,import.meta.url),{type:"module"}),cV=cy(lV);wP(cV);YR(iV).mount("#app");
