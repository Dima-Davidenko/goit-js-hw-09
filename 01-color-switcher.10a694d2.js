!function(){var t=document.querySelector("button[data-start]"),n=document.querySelector("button[data-stop]"),e=document.querySelector("body"),o=null;function a(){t.disabled=!t.disabled}function c(){e.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}t.addEventListener("click",(function(){o||(o=setInterval(c,1e3),a())})),n.addEventListener("click",(function(){clearInterval(o),o=null,a()}))}();
//# sourceMappingURL=01-color-switcher.10a694d2.js.map