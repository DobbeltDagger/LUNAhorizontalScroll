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
      imgWrapper.style.width = widthSum + 'px'; // do i need to add the border?

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
  // console.log("e:", e);

  // if (e.deltaY < 0) { console.log('scrolling up:', e.deltaY); }
  // else if (e.deltaY > 0) { console.log('scrolling down:', e.deltaY); }
  
  // check if I am over document!
  if (isOverGallery === true) {
    console.log("isOverGallery is true");
    scrollPos += e.deltaY;
    requestAnimationFrame(scrollX);
  }
}


/////////////////////////////////////////
// get the far right of scrollbar by taking width of "images" and subtracting width of "vandretGallery"
const scrollX = () => {

  // img elm
  const imgs = document.getElementById('images');
  const imgsInfo = imgs.getBoundingClientRect();
  const width = imgsInfo.width;

  const wrap = document.querySelector('.vandretGalleriWrapper');
  const wrapInfo = wrap.getBoundingClientRect();
  const wrapWidth = wrapInfo.width;

  // set boundaries
  if (scrollPos < 0) scrollPos = 0;
  if (scrollPos > (width - wrapWidth)) scrollPos = (width - wrapWidth);

  galleriElm.scroll({
    top: 0,
    left: scrollPos,
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