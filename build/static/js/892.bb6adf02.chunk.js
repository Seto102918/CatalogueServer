"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[892],{2989:function(e,s,a){a.r(s);var t=a(885),i=a(2791),n=a(6871),r=a(4569),l=a.n(r),o=a(6765),c=(a(165),a(6385)),d=a(184);s.default=function(){var e=(0,n.UO)(),s=(0,i.useState)(e.kode),a=(0,t.Z)(s,1)[0],r=(0,i.useState)({_id:"",kode:"",warna:"",harga:"",favorit:"",kategori:"",drive:[]}),m=(0,t.Z)(r,2),h=m[0],x=m[1],p=(0,i.useState)([]),u=(0,t.Z)(p,2),g=u[0],j=u[1],b=(0,i.useState)([]),v=(0,t.Z)(b,2),N=(v[0],v[1]);return(0,i.useEffect)((function(){l().get(c.h+"api/v1/gown/kode/"+a).then((function(e){x(e.data.hasil),N(e.data.recommend),j(e.data.hasil.drive)})).catch((function(e){console.log(e)}))}),[]),(0,d.jsxs)("div",{className:"Gown_Main",children:[(0,d.jsxs)("div",{className:"".concat(h.kategori," position-relative shadow-sm"),style:{backgroundRepeat:"no-repeat",backgroundSize:"cover"},children:[(0,d.jsx)("h2",{className:"display-2 text-white d-flex justify-content-center overflow-hidden position-relative align-items-center mb-0 text-center py-5",style:{textTransform:"uppercase",zIndex:"10"},children:h.kategori.replace("_"," ")+"s"}),(0,d.jsx)("div",{className:"bg-dark position-absolute top-0 start-0 end-0 bottom-0 bg-opacity-50 backdrop_blur",style:{zIndex:"0"}})]}),(0,d.jsxs)("section",{className:"mt-4 row mx-5",children:[(0,d.jsxs)(o.sj,{visibleSlides:1,totalSlides:g.length,step:1,naturalSlideWidth:1,naturalSlideHeight:1,hasMasterSpinner:!0,lockOnWindowScroll:!0,className:"bg-dark bg-opacity-25 backdrop_blur rounded overflow-hidden col p-0",style:{maxWidth:"40rem"},children:[(0,d.jsx)(o.iR,{className:"m-0",children:g.map((function(e,s){return(0,d.jsx)(o.Mi,{index:s,children:(0,d.jsx)(o.Ee,{src:"https://drive.google.com/uc?export=view&id=".concat(e),className:"imageWZoom"})},s)}))}),(0,d.jsxs)("div",{className:"container d-flex justify-content-center",children:[(0,d.jsx)(o.jp,{className:"position-absolute top-50 start-0 translate-middle-y bg-transparent d-grid mx-3",children:(0,d.jsx)("span",{className:"material-symbols-outlined overflow-hidden",children:"arrow_back"})}),(0,d.jsx)(o.P1,{className:"position-absolute top-50 end-0 translate-middle-y bg-transparent d-grid mx-3",children:(0,d.jsx)("span",{className:"material-symbols-outlined overflow-hidden",children:"arrow_forward"})}),(0,d.jsx)("div",{className:"d-flex position-absolute bottom-0",children:g.map((function(e,s){return(0,d.jsx)(o.oT,{slide:s,className:"btn btn-light my-3 mx-1"},s)}))})]})]}),(0,d.jsxs)("div",{className:"col",children:[(0,d.jsx)("h1",{className:"display-2 m-0",children:h.kode}),(0,d.jsxs)("h3",{className:"display-3 m-0",children:[(0,d.jsx)("span",{children:"Rp. "}),isNaN(h.harga)?"Error":h.harga.toLocaleString("id-ID",{minimumFractionDigits:0})]}),(0,d.jsx)("hr",{className:"bg-dark rounded",style:{height:"5px"}}),(0,d.jsxs)("h4",{className:"ms-3",children:["Warna: ",h.warna]})]})]}),(0,d.jsx)("div",{className:"BEEG",children:(0,d.jsxs)("div",{className:"row roc-cols-4",children:[(0,d.jsx)("h4",{children:"You Might Like..."}),(0,d.jsx)("div",{className:"row row-cols-4"})]})})]})}}}]);
//# sourceMappingURL=892.bb6adf02.chunk.js.map