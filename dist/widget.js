parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"FFi8":[function(require,module,exports) {
!function(e){var t,r="https://laike9m.github.io/zhihu-card/dist",i=0;function n(e,t){return e.getAttribute("data-"+t)}function a(t){var a=n(t,"theme")||"zhihu";cardurl=r+"/theme/"+a+".html";var h=n(t,"userhash");if(h){i+=1;var d=n(t,"width"),u=n(t,"height"),s=n(t,"key1")||"answer",o=n(t,"key2")||"agree",c=n(t,"key3")||"follower",l=n(t,"button")||"yes",f=n(t,"description")||"yes",g=n(t,"suffix")||"",m="zhcard-"+h+"-"+i,y=e.createElement("iframe");return y.setAttribute("id",m),y.setAttribute("frameborder",0),y.setAttribute("scrolling",0),y.setAttribute("allowtransparency",!0),y.src=cardurl.concat("?userhash=",h,"&identity=",m,"&button=",l,"&description=",f,"&key1=",s,"&key2=",o,"&key3=",c,"&suffix=",g),y.width=d||Math.min(t.parentNode.clientWidth||400,400),u&&(y.height=u),function(e){window.addEventListener&&window.addEventListener("message",function(t){e.id===t.data.sender&&(e.height=t.data.height)},!1)}(y),t.parentNode.replaceChild(y,t),y}}var h=function(r){if(e.querySelectorAll)return e.querySelectorAll("."+r);var i=e.getElementsByTagName("div"),n=[];for(t=0;t<i.length;t++)~i[t].className.split(" ").indexOf(r)&&n.push(i[t]);return n}("zhihu-card");for(t=0;t<h.length;t++)a(h[t])}(document);
},{}]},{},["FFi8"], null)
//# sourceMappingURL=/widget.js.map