(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[931],{3108:function(e,t,r){Promise.resolve().then(r.bind(r,2930))},2930:function(e,t,r){"use strict";r.d(t,{default:function(){return E}});var n=r(7437),s=r(5238),a=r(3149),o=r(2265),i=r(2988),l=r(7776);class u extends l.ExtrudeGeometry{constructor(e,t={}){let{bevelEnabled:r=!1,bevelSize:n=8,bevelThickness:s=10,font:a,height:o=50,size:i=100,lineHeight:l=1,letterSpacing:u=0,...c}=t;void 0===a?super():super(a.generateShapes(e,i,{lineHeight:l,letterSpacing:u}),{...c,bevelEnabled:r,bevelSize:n,bevelThickness:s,depth:o}),this.type="TextGeometry"}}var c=Object.defineProperty,h=(e,t,r)=>t in e?c(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,f=(e,t,r)=>(h(e,"symbol"!=typeof t?t+"":t,r),r);class p extends l.Loader{constructor(e){super(e)}load(e,t,r,n){let s=new l.FileLoader(this.manager);s.setPath(this.path),s.setRequestHeader(this.requestHeader),s.setWithCredentials(this.withCredentials),s.load(e,e=>{if("string"!=typeof e)throw Error("unsupported data type");let r=JSON.parse(e),n=this.parse(r);t&&t(n)},r,n)}loadAsync(e,t){return super.loadAsync(e,t)}parse(e){return new d(e)}}class d{constructor(e){f(this,"data"),this.data=e}generateShapes(e,t=100,r){let n=[],s={letterSpacing:0,lineHeight:1,...r},a=function(e,t,r,n){let s=Array.from(e),a=t/r.resolution,o=(r.boundingBox.yMax-r.boundingBox.yMin+r.underlineThickness)*a,i=[],u=0,c=0;for(let e=0;e<s.length;e++){let t=s[e];if("\n"===t)u=0,c-=o*n.lineHeight;else{let e=function(e,t,r,n,s){let a,o,i,u,c,h,f,p;let d=s.glyphs[e]||s.glyphs["?"];if(!d){console.error('THREE.Font: character "'+e+'" does not exists in font family '+s.familyName+".");return}let m=new l.ShapePath;if(d.o){let e=d._cachedOutline||(d._cachedOutline=d.o.split(" "));for(let s=0,l=e.length;s<l;)switch(e[s++]){case"m":a=parseInt(e[s++])*t+r,o=parseInt(e[s++])*t+n,m.moveTo(a,o);break;case"l":a=parseInt(e[s++])*t+r,o=parseInt(e[s++])*t+n,m.lineTo(a,o);break;case"q":i=parseInt(e[s++])*t+r,u=parseInt(e[s++])*t+n,c=parseInt(e[s++])*t+r,h=parseInt(e[s++])*t+n,m.quadraticCurveTo(c,h,i,u);break;case"b":i=parseInt(e[s++])*t+r,u=parseInt(e[s++])*t+n,c=parseInt(e[s++])*t+r,h=parseInt(e[s++])*t+n,f=parseInt(e[s++])*t+r,p=parseInt(e[s++])*t+n,m.bezierCurveTo(c,h,f,p,i,u)}}return{offsetX:d.ha*t,path:m}}(t,a,u,c,r);e&&(u+=e.offsetX+n.letterSpacing,i.push(e.path))}}return i}(e,t,this.data,s);for(let e=0,t=a.length;e<t;e++)Array.prototype.push.apply(n,a[e].toShapes(!1));return n}}f(d,"isFont"),f(d,"type");var m=r(9429);let g=null;async function y(e){return"string"==typeof e?await (await fetch(e)).json():e}async function b(e){var t;return t=await y(e),g||(g=new p),g.parse(t)}function x(e){return(0,m.Rq)(b,[e])}x.preload=e=>(0,m.MA)(b,[e]),x.clear=e=>(0,m.ZH)([e]);let w=["string","number"],j=e=>{let t="",r=[];return o.Children.forEach(e,e=>{w.includes(typeof e)?t+=e+"":r.push(e)}),[t,...r]},I=o.forwardRef(({font:e,letterSpacing:t=0,lineHeight:r=1,size:n=1,height:a=.2,bevelThickness:c=.1,bevelSize:h=.01,bevelEnabled:f=!1,bevelOffset:p=0,bevelSegments:d=4,curveSegments:m=8,smooth:g,children:y,...b},w)=>{o.useMemo(()=>(0,s.e)({RenamedTextGeometry:u}),[]);let I=o.useRef(null),A=x(e),v=(0,o.useMemo)(()=>({font:A,size:n,height:a,bevelThickness:c,bevelSize:h,bevelEnabled:f,bevelSegments:d,bevelOffset:p,curveSegments:m,letterSpacing:t,lineHeight:r}),[A,n,a,c,h,f,d,p,m,t,r]),[E,...S]=(0,o.useMemo)(()=>j(y),[y]),M=o.useMemo(()=>[E,v],[E,v]);return o.useLayoutEffect(()=>{g&&(I.current.geometry=function(e,t=1e-4){t=Math.max(t,Number.EPSILON);let r={},n=e.getIndex(),s=e.getAttribute("position"),a=n?n.count:s.count,o=0,i=Object.keys(e.attributes),u={},c={},h=[],f=["getX","getY","getZ","getW"];for(let t=0,r=i.length;t<r;t++){let r=i[t];u[r]=[];let n=e.morphAttributes[r];n&&(c[r]=Array(n.length).fill(0).map(()=>[]))}let p=Math.pow(10,Math.log10(1/t));for(let t=0;t<a;t++){let s=n?n.getX(t):t,a="";for(let t=0,r=i.length;t<r;t++){let r=i[t],n=e.getAttribute(r),o=n.itemSize;for(let e=0;e<o;e++)a+=`${~~(n[f[e]](s)*p)},`}if(a in r)h.push(r[a]);else{for(let t=0,r=i.length;t<r;t++){let r=i[t],n=e.getAttribute(r),a=e.morphAttributes[r],o=n.itemSize,l=u[r],h=c[r];for(let e=0;e<o;e++){let t=f[e];if(l.push(n[t](s)),a)for(let e=0,r=a.length;e<r;e++)h[e].push(a[e][t](s))}}r[a]=o,h.push(o),o++}}let d=e.clone();for(let t=0,r=i.length;t<r;t++){let r=i[t],n=e.getAttribute(r),s=new n.array.constructor(u[r]),a=new l.BufferAttribute(s,n.itemSize,n.normalized);if(d.setAttribute(r,a),r in c)for(let t=0;t<c[r].length;t++){let n=e.morphAttributes[r][t],s=new n.array.constructor(c[r][t]),a=new l.BufferAttribute(s,n.itemSize,n.normalized);d.morphAttributes[r][t]=a}}return d.setIndex(h),d}(I.current.geometry,g),I.current.geometry.computeVertexNormals())},[M,g]),o.useImperativeHandle(w,()=>I.current,[]),o.createElement("mesh",(0,i.Z)({},b,{ref:I}),o.createElement("renamedTextGeometry",{args:M}),S)});function A(e){let{character:t,index:r}=e,a=(0,o.useRef)(null);return(0,s.C)(()=>{a.current&&(a.current.rotation.y+=0!=r?.002*r:.002)}),(0,n.jsxs)(I,{font:"/oswald.json",ref:a,position:[r,0,0],children:[t,(0,n.jsx)("meshNormalMaterial",{})]})}function v(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(A,{character:"H",index:-2}),(0,n.jsx)(A,{character:"E",index:-1}),(0,n.jsx)(A,{character:"N",index:0}),(0,n.jsx)(A,{character:"R",index:1}),(0,n.jsx)(A,{character:"Y",index:2})]})}function E(){return(0,n.jsx)("div",{className:"h-1/2 w-full",children:(0,n.jsxs)(a.Xz,{camera:{position:[0,0,7],fov:45},children:[(0,n.jsx)("ambientLight",{intensity:.2}),(0,n.jsx)("directionalLight",{color:"red",position:[1,0,5]}),(0,n.jsx)("directionalLight",{color:"orange",position:[-1,0,5]}),(0,n.jsx)(v,{})]})})}},2988:function(e,t,r){"use strict";function n(){return(n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)({}).hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e}).apply(null,arguments)}r.d(t,{Z:function(){return n}})}},function(e){e.O(0,[689,149,971,23,744],function(){return e(e.s=3108)}),_N_E=e.O()}]);