let isOverGallery = false;
let scrollPos = 0;
const galleriElm = document.querySelector('.vandretGalleriWrapper');


/////////////////////////////////////////
const resize = () => {

  console.log("resize was run");

  const pageWidth = getDocWidth();
  console.log("pageWidth:", pageWidth);

  // check pagewidth
  if (pageWidth > 600) {

    setTimeout(function () {

      const imgElms = document.querySelectorAll('#images li');
      console.log("imgElms:", imgElms);

      let widthSum = 0;
      for (let i = 0; i < imgElms.length; i++) {
        const size = imgElms[i].getBoundingClientRect();
        const width = size.width;
        widthSum += width;
      }
      console.log("widthSum:", widthSum);

      // width is now correct!
      const imgWrapper = document.getElementById('images');
      console.log("imgWrapper:", imgWrapper);
      imgWrapper.style.width = widthSum + 2 + 'px'; // do i need to add the border?

    }, 1000);
  }

}


/////////////////////////////////////////
const initScroll = () => {

  console.log("init scroll was run")

  // is mouse over gallery?
  var div = document.getElementById("images");
  div.onmouseover = function() {
    // this.mouseIsOver = true;
    isOverGallery = true;
    console.log("isOverGallery:", isOverGallery);
    div.style.backgroundColor = 'pink';
  };
  div.onmouseout = function() {
    // this.mouseIsOver = false;
    isOverGallery = false;
    console.log("isOverGallery:", isOverGallery);
    div.style.backgroundColor = 'tomato';
  }
  /*
  div.onclick = function()   {
     if (isOverGallery)   {
        ....
     }
  }
  */

}


/////////////////////////////////////////
const handleScroll = (e) => {

  console.log("handleScroll was run");
  console.log("e:", e);

  const elm = document.querySelector('.vandretGalleriWrapper');
  console.log("elm.scrollLeft:", elm.scrollLeft);

  if (e.deltaY < 0) { console.log('scrolling up:', e.deltaY); }
  else if (e.deltaY > 0) { console.log('scrolling down:', e.deltaY); }
  
  // check if I am over document!
  if (isOverGallery === true) {
    console.log("isOverGallery is true");
    scrollPos += e.deltaY;
    // requestAnimationFrame(scrollX(scrollPos));
    scrollX(scrollPos); // still glitchy .. working on it!
  }

}


/////////////////////////////////////////
const scrollX = (x) => {
  galleriElm.scroll({
    top: 0,
    left: x,
    behavior: 'smooth'
  });
}


/////////////////////////////////////////
const getDocWidth = () => {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}


/////////////////////////////////////////
export {
  resize, getDocWidth, initScroll, handleScroll
}