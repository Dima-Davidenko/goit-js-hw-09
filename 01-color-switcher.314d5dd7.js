!function(){var t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]"),n=document.querySelector("body"),a=null;function d(){t.disabled=!t.disabled,e.disabled=!e.disabled}t.addEventListener("click",(function(){a||(a=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,"0"))}),1e3),d())})),e.addEventListener("click",(function(){a&&(clearInterval(a),a=null,d())})),e.disabled=!0}();
//# sourceMappingURL=01-color-switcher.314d5dd7.js.map
