(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[268],{61:function(e,t,s){(window.__NEXT_P=window.__NEXT_P||[]).push(["/module/[module]/[page]",function(){return s(1376)}])},3209:function(e,t,s){"use strict";s.d(t,{Z:function(){return c}});var n=s(5893);s(7294);var r=s(5697),a=s.n(r),o=s(1145),i=s.n(o);function c(e){let{children:t}=e;return(0,n.jsx)("div",{className:i().contentContainer,children:t})}c.propTypes={children:a().node.isRequired}},4563:function(e,t,s){"use strict";s.d(t,{Z:function(){return _}});var n=s(5893);s(7294);var r=s(5697),a=s.n(r),o=s(3081),i=s.n(o),c=s(7661);function _(e){let{banner:t}=e;return(0,n.jsx)("div",{className:i().hero,children:(0,n.jsx)(c.Z,{layout:"fill",objectFit:"cover",objectPosition:"center",publicId:t,className:i().hero__image,alt:"Bannner"})})}_.propTypes={banner:a().string.isRequired}},3033:function(e,t,s){"use strict";s.d(t,{Z:function(){return o}});var n=s(5893);s(7294);var r=s(4459),a=s.n(r);function o(){return(0,n.jsx)("div",{className:"".concat(a().loading),children:(0,n.jsxs)("div",{className:a().loading__content,children:[(0,n.jsx)("div",{}),(0,n.jsx)("div",{}),(0,n.jsx)("div",{})]})})}},1468:function(e,t,s){"use strict";s.d(t,{ZP:function(){return u}});var n=s(5893),r=s(7294),a=s(7650),o=s(6513),i=s(7870),c=s(5697),_=s.n(c);let d=[.6,-.05,.01,.99],l={initial:{y:32,opacity:0},animate:{y:0,opacity:1,transition:{duration:.8,ease:d,type:"spring"}}};function u(e){let{threshold:t,children:s}=e,c=(0,o._)(),[_,u]=(0,a.YD)({threshold:t});return(0,r.useEffect)(()=>{u&&c.start("visible")},[c,u]),(0,n.jsx)(i.E.div,{variants:l,children:(0,n.jsx)(i.E.div,{ref:_,animate:c,initial:"hidden",transition:{duration:1.2,ease:d},variants:{visible:{opacity:1,y:0},hidden:{opacity:0,y:32}},children:s})})}u.defaultProps={threshold:0},u.propTypes={threshold:_().number,children:_().node.isRequired}},1376:function(e,t,s){"use strict";s.r(t),s.d(t,{default:function(){return Y}});var n=s(5893),r=s(7294),a=s(1163),o=s(9927),i=s(9743),c=s(2560),_=s(5697),d=s.n(_),l=s(8234),u=s.n(l);function p(e){let{name:t,publicId:s}=e,r=new c.r({cloud:{cloudName:"dzabdxdw5"}}),a=r.video(s).toURL();return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)("h1",{className:u().contentAudio__title,children:"Listen: ".concat(t)}),(0,n.jsx)("div",{className:u().contentAudio,children:(0,n.jsx)(i.Z,{src:a,customAdditionalControls:[],customVolumeControls:[]})})]})}p.propTypes={publicId:d().number.isRequired,name:d().string.isRequired};var A=s(3209),g=s(7185),m=s.n(g);function h(e){let{summary:t}=e,s=new o._;return(s.set({html:!0,breaks:!0}),t)?(0,n.jsx)("span",{className:m().contentContainerSummary,dangerouslySetInnerHTML:{__html:s.render(t)}}):null}h.propTypes={summary:d().string.isRequired};var x=s(4986),j=s.n(x),f=s(7661);function v(e){let{publicId:t}=e;return(0,n.jsx)("div",{className:j().contentImage,children:(0,n.jsx)(f.Z,{width:1280,height:720,objectFit:"cover",publicId:t,className:j().contentImage__image,alt:"Content"})})}v.propTypes={publicId:d().number.isRequired};var y=s(7410),b=s(1365),N=s(2867),H={src:"/_next/static/media/fallback.1d0f5390.jpg",height:1080,width:1920,blurDataURL:"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoKCgoKCgsMDAsPEA4QDxYUExMUFiIYGhgaGCIzICUgICUgMy03LCksNy1RQDg4QFFeT0pPXnFlZXGPiI+7u/sBCgoKCgoKCwwMCw8QDhAPFhQTExQWIhgaGBoYIjMgJSAgJSAzLTcsKSw3LVFAODhAUV5PSk9ecWVlcY+Ij7u7+//CABEIAAUACAMBIgACEQEDEQH/xAAnAAEBAAAAAAAAAAAAAAAAAAAABwEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAArQP/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AH//2Q==",blurWidth:8,blurHeight:5},C=s(8944),I=s.n(C),P=s(5871);function E(e){let{publicId:t,poster:s}=e,r=new c.r({cloud:{cloudName:"dzabdxdw5"}}),a=[{type:"mp4",codecs:["avc1.4d002a"],transcode:(0,b.WP)((0,N.d7)())},{type:"webm",codecs:["vp8","vorbis"],transcode:(0,b.WP)((0,N.Oz)())}],o=r.video(t);return(0,n.jsx)("div",{className:I().contentVideo,children:(0,n.jsx)(y.xl,{cldVid:o,controls:!0,playsInline:!0,preload:"true",poster:s?(0,P.bb)(s,1280,720):H.src,sources:a,className:"".concat(I().contentVideo__player)})})}E.defaultProps={poster:null},E.propTypes={publicId:d().string.isRequired,poster:d().string};var w=s(7026),S=s(5154),U=s(120),q=s(1664),Q=s.n(q),Z=s(8055),R=s.n(Z),T=s(3033),V=s(1468);function L(e){let{item:t,module:s}=e;return(0,n.jsx)(V.ZP,{children:(0,n.jsxs)("div",{className:R().pageHeader,children:[s.assets&&(0,n.jsx)(f.Z,{width:200,height:160,objectFit:"cover",objectPosition:"top",publicId:s.assets.thumbnail,className:R().pageHeader__image,alt:t.name}),(0,n.jsxs)("div",{className:R().pageHeader__column,children:[(0,n.jsx)("h3",{className:R().pageHeader__title,children:t.name}),t.name&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)("span",{className:R().pageHeader__details,children:[(0,n.jsxs)("span",{className:R().pageHeader__detailsitem,children:[(0,n.jsx)("i",{className:"icon",children:(0,n.jsx)(S.m3W,{})}),"by ".concat(t.author)]}),(0,n.jsxs)("span",{className:R().pageHeader__detailsitem,children:[(0,n.jsx)("i",{className:"icon",children:(0,n.jsx)(S.Pll,{})}),"Last Updated: ".concat(U.ou.fromISO(t.updatedAt,{zone:"Africa/Johannesburg"}).toFormat("L/y"))]})]}),(0,n.jsxs)("span",{className:R().pageHeader__detailsitem,children:[(0,n.jsx)("i",{className:"icon",children:(0,n.jsx)(S.GWw,{})}),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(Q(),{href:"/module/".concat(t.moduleSlug),children:t.module})," /"," ",(0,n.jsx)(Q(),{href:"/module/".concat(t.moduleSlug),children:t.chapter})]})]})]})]}),(0,n.jsx)("div",{className:R().pageHeader__status,children:(()=>{if(!t.progress)return(0,n.jsx)(T.Z,{});let e=t.progress.findIndex(e=>e.current);return"Page: ".concat(e+1," of ").concat(t.progress.length)})()})]})})}L.propTypes={item:d().shape({progress:d().arrayOf(d().shape({completed:d().bool,current:d().bool})),moduleSlug:d().string,module:d().string,chapter:d().string,author:d().string,updatedAt:d().string,name:d().string}).isRequired,module:d().shape({assets:d().shape({thumbnail:d().string})}).isRequired};var k=s(4563),B=s(2734),F=s.n(B);function O(e){let{progress:t}=e;return t?(0,n.jsx)("div",{className:F().progress,children:t.map((e,t)=>(0,n.jsx)("div",{className:"".concat(F().progress__item," ").concat(e.completed?F().progress__active:""," ").concat(e.current?F().progress__current:"")},t))}):null}O.propTypes={progress:d().arrayOf(d().shape({current:d().bool,completed:d().bool})).isRequired};var D=s(3917),W=s.n(D);function J(e){let{page:t}=e,{progress:s,moduleSlug:r,chapter:a}=t;if(!s)return null;let{previous:o,next:i,nextName:c,previousName:_}=s.find(e=>e.current);return(0,n.jsxs)("div",{className:W().steps,children:[(0,n.jsxs)("a",{className:"".concat(W().steps__item," ").concat(W().steps__previous),href:"/module/".concat(r,"/").concat(o||""),children:[o&&(0,n.jsx)("i",{className:"icon",children:(0,n.jsx)(S._HU,{})}),(0,n.jsxs)("div",{className:W().steps__content,children:[o?"Back":"Overview",(0,n.jsx)("label",{className:W().steps__label,children:_||a})]})]}),(0,n.jsxs)("a",{className:"".concat(W().steps__item," ").concat(W().steps__next),href:"/module/".concat(r,"/").concat(i||""),children:[(0,n.jsxs)("div",{className:"".concat(W().steps__right," ").concat(W().steps__content),children:[i?"Next":"Completed",(0,n.jsx)("label",{className:W().steps__label,children:c||a})]}),i&&(0,n.jsx)("i",{className:"icon",children:(0,n.jsx)(S.H_v,{})})]})]})}J.propTypes={page:d().shape({moduleSlug:d().string,chapter:d().string,progress:d().arrayOf(d().shape({nextName:d().string,next:d().string,current:d().bool,completed:d().bool}))}).isRequired};var M=s(5527),z=s(2382),K=s(2268);function Y(){let e=(0,a.useRouter)(),[t,s]=(0,r.useState)({}),[i,c]=(0,r.useState)({}),{subscriptionStatus:_}=(0,z.Z)(),{service:d}=(0,M.Z)();(0,r.useEffect)(()=>{d&&!_.subscribed.hasAccess&&d.metadata.subscribe&&!e.query.preview&&(window.location.href=d.subscribeUrl)},[d,e.query,_]),(0,r.useEffect)(()=>{(0,K.f)(e.query.page,e.query.preview).then(e=>{s(e)}),(0,K.r)(e.query.module).then(e=>{c(e)})},[e.query]);let l=new o._;return(l.set({html:!0,breaks:!0}),i&&d&&t)?(0,n.jsxs)(n.Fragment,{children:[d.assets&&(0,n.jsx)(k.Z,{banner:d.assets.banner}),(0,n.jsxs)(w.Z,{children:[(0,n.jsx)(L,{item:t,module:i}),(0,n.jsxs)(A.Z,{children:[(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:l.render(t.introduction)}}),t.assets&&t.assets.audio&&(0,n.jsx)(p,{publicId:t.assets.audio,name:t.name}),t.assets&&t.assets.video&&(0,n.jsx)(E,{publicId:t.assets.video,poster:t.assets.image}),t.assets&&!t.assets.video&&t.assets.image&&(0,n.jsx)(v,{publicId:t.assets.image}),(0,n.jsx)("span",{dangerouslySetInnerHTML:{__html:l.render(t.description)}}),t.summary&&(0,n.jsx)(h,{summary:t.summary})]}),(0,n.jsx)(J,{page:t}),t.progress&&(0,n.jsx)(O,{progress:t.progress})]})]}):null}},2268:function(e,t,s){"use strict";s.d(t,{f:function(){return a},r:function(){return o}});var n=s(7041),r=s(1712);let a=async(e,t)=>{let s=(0,n.getCookie)("token"),a=s?"token=".concat(s,"&slug=").concat(encodeURI(e)):"&slug=".concat(encodeURI(e));t||await (0,r.v)({request:"/progress",body:{slug:encodeURI(e),token:s}});let o=(0,r.U)({request:"/page",params:a});return o},o=async e=>{let t=(0,n.getCookie)("token"),s=await (0,r.U)({request:"/module",params:"&slug=".concat(encodeURI(e),"&token=").concat(t)});return s}},1712:function(e,t,s){"use strict";s.d(t,{U:function(){return o},v:function(){return i}});var n=s(3144),r=s.n(n),a=s(5160);let o=async e=>{let{request:t,params:s,host:n}=e,o=(0,a.Z)(n),i="".concat(o).concat(t,"?").concat(s||""),c=await r()(i,{});return c.json()},i=async e=>{let{request:t,params:s,body:n}=e,o=(0,a.Z)(),i="".concat(o).concat(t,"?").concat(s||""),c=await r()(i,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)});return c.json()}},8234:function(e){e.exports={contentAudio:"ContentAudio_contentAudio__AUVyU",contentAudio__title:"ContentAudio_contentAudio__title__AR4ck"}},1145:function(e){e.exports={contentContainer:"ContentContainer_contentContainer__g_JXK"}},7185:function(e){e.exports={contentContainerSummary:"ContentContainerSummary_contentContainerSummary__FIJfu"}},4986:function(e){e.exports={contentImage:"ContentImage_contentImage__AS9Qv",contentImage__image:"ContentImage_contentImage__image__an91I"}},8944:function(e){e.exports={contentVideo:"ContentVideo_contentVideo__gBrgS",contentVideo__title:"ContentVideo_contentVideo__title__XpENW",contentVideo__player:"ContentVideo_contentVideo__player__eZY8t"}},3081:function(e){e.exports={hero:"Hero_hero__xPn0x"}},4459:function(e){e.exports={loading:"Loading_loading__4d9VT",loading__page:"Loading_loading__page__JRlQ6",loading__content:"Loading_loading__content__Tz0tq","circle-secondary":"Loading_circle-secondary__Bj6zf","circle-primary":"Loading_circle-primary__mexnd"}},8055:function(e){e.exports={pageHeader:"PageHeader_pageHeader__Q81aW",pageHeader__image:"PageHeader_pageHeader__image__d_BZ0",pageHeader__title:"PageHeader_pageHeader__title__re__0",pageHeader__description:"PageHeader_pageHeader__description__St1TV",pageHeader__details:"PageHeader_pageHeader__details__J1Q8Z",pageHeader__detailsitem:"PageHeader_pageHeader__detailsitem__SZ2NF",pageHeader__status:"PageHeader_pageHeader__status__nB7Yd",pageHeader__column:"PageHeader_pageHeader__column__zA0_l",pageHeader__container:"PageHeader_pageHeader__container__oVWFq"}},2734:function(e){e.exports={progress:"Progress_progress__UhoJV",progress__item:"Progress_progress__item__LKLsN",progress__active:"Progress_progress__active__rN5sl",progress__current:"Progress_progress__current__u38QW"}},3917:function(e){e.exports={steps:"Steps_steps__pnB5C",steps__item:"Steps_steps__item__GGaqK",steps__right:"Steps_steps__right__HVSPU",steps__next:"Steps_steps__next__CaOVL",steps__previous:"Steps_steps__previous__UyoHe",steps__label:"Steps_steps__label__xBZ9U",steps__content:"Steps_steps__content__7p7YC"}}},function(e){e.O(0,[789,692,120,454,774,888,179],function(){return e(e.s=61)}),_N_E=e.O()}]);