import { resize, getDocWidth, initScroll, handleScroll } from './js/functions.js';

window.addEventListener("DOMContentLoaded", function() {

  initScroll();

  const elm = document.getElementById('images');
  elm.onwheel = handleScroll;
  
  window.onresize = resize;
  resize();
})