const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body");let o=null;function a(){t.disabled=!t.disabled}function l(){n.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}t.addEventListener("click",(function(){o||(o=setInterval(l,1e3),a())})),e.addEventListener("click",(function(){clearInterval(o),o=null,a()}));
//# sourceMappingURL=01-color-switcher.fd0e687f.js.map