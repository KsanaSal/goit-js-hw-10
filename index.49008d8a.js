var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},e={},n=/^\s+|\s+$/g,o=/^[-+]0x[0-9a-f]+$/i,r=/^0b[01]+$/i,i=/^0o[0-7]+$/i,u=parseInt,c="object"==typeof t&&t&&t.Object===Object&&t,a="object"==typeof self&&self&&self.Object===Object&&self,f=c||a||Function("return this")(),l=Object.prototype.toString,s=Math.max,d=Math.min,p=function(){return f.Date.now()};function g(t){var e=typeof t;return!!t&&("object"==e||"function"==e)}function v(t){if("number"==typeof t)return t;if(function(t){return"symbol"==typeof t||function(t){return!!t&&"object"==typeof t}(t)&&"[object Symbol]"==l.call(t)}(t))return NaN;if(g(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=g(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=t.replace(n,"");var c=r.test(t);return c||i.test(t)?u(t.slice(2),c?2:8):o.test(t)?NaN:+t}e=function(t,e,n){var o,r,i,u,c,a,f=0,l=!1,y=!1,m=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function h(e){var n=o,i=r;return o=r=void 0,f=e,u=t.apply(i,n)}function b(t){return f=t,c=setTimeout(w,e),l?h(t):u}function j(t){var n=t-a;return void 0===a||n>=e||n<0||y&&t-f>=i}function w(){var t=p();if(j(t))return T(t);c=setTimeout(w,function(t){var n=e-(t-a);return y?d(n,i-(t-f)):n}(t))}function T(t){return c=void 0,m&&o?h(t):(o=r=void 0,u)}function O(){var t=p(),n=j(t);if(o=arguments,r=this,a=t,n){if(void 0===c)return b(a);if(y)return c=setTimeout(w,e),h(a)}return void 0===c&&(c=setTimeout(w,e)),u}return e=v(e)||0,g(n)&&(l=!!n.leading,i=(y="maxWait"in n)?s(v(n.maxWait)||0,e):i,m="trailing"in n?!!n.trailing:m),O.cancel=function(){void 0!==c&&clearTimeout(c),f=0,o=a=r=c=void 0},O.flush=function(){return void 0===c?u:T(p())},O};const y=document.querySelector("#search-box");document.querySelector(".country-list"),document.querySelector(".country-info");y.addEventListener("input",e((t=>{var e;t.target.value.trim().length>0&&(e=t.target.value.trim(),fetch(`https://restcountries.com/v3.1/name/${e}?fields=name,capital,population,flags,languages`).then((t=>{if(!t.ok)throw new Error(t.status);return t.json()})).then((t=>{console.log(t),t.length>10?console.log("Too many matches found. Please enter a more specific name."):1===t.length?console.log("country-info"):console.log("country-list"),console.log(t.length)})).catch((()=>{console.log("Oops, there is no country with that name")})),console.log(t.target.value))}),300));
//# sourceMappingURL=index.49008d8a.js.map
