const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),d=document.querySelector("body");let n=null;function a(){t.disabled=!t.disabled,e.disabled=!e.disabled}t.addEventListener("click",(function(){n||(n=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3),a())})),e.addEventListener("click",(function(){n&&(clearInterval(n),n=null,a())})),e.disabled=!0;
//# sourceMappingURL=01-color-switcher.01d70b35.js.map