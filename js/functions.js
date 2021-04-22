let isOverGallery = false;
let scrollPos = 0; // scroll position of the horizontal scroll bar
let scrollAmount = 0; // how much are we scrolling next time?
const scrollStep = 75; // steps (pixels) to scroll at a time 
const galleriElm = document.querySelector('.vandretGalleriWrapper');


/////////////////////////////////////////
const resize = () => {

  console.log("resize was run");
  const pageWidth = getDocWidth();

  // check pagewidth
  if (pageWidth > 600) {

    // make li's float left
    const lis = document.querySelectorAll('#images li');
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.float = 'left';
    }

    galleriElm.style.overflowX = 'scroll';
    // overflow-x: scroll;

    setTimeout(function () {

      const imgElms = document.querySelectorAll('#images li');
      let widthSum = 0;
      for (let i = 0; i < imgElms.length; i++) {
        const size = imgElms[i].getBoundingClientRect();
        widthSum += size.width;
      }
      // console.log("widthSum:", widthSum);

      // width is now correct!
      const imgWrapper = document.getElementById('images');
      console.log("imgWrapper:", imgWrapper);
      imgWrapper.style.width = Math.ceil(widthSum) + 'px'; // do i need to add the border?

    }, 1000);

  }
  else {
    // remove horisontal scroll

    galleriElm.style.overflowX = 'hidden';
    // overflow-x: hidden;

    const lis = document.querySelectorAll('#images li');
    for (let i = 0; i < lis.length; i++) {
      lis[i].style.float = 'none';
    }

    const imgWrapper = document.getElementById('images');
    console.log("imgWrapper:", imgWrapper);
    imgWrapper.style.width = 'auto'; // 100%'; // do i need to add the border?
  }

}


/////////////////////////////////////////
const initScroll = () => {

  console.log("init scroll was run")

  // is mouse over gallery?
  var div = document.getElementById("images");
  div.onmouseover = function() {
    isOverGallery = true;
    div.style.backgroundColor = 'pink';
  };
  div.onmouseout = function() {
    isOverGallery = false;
    div.style.backgroundColor = 'tomato';
  }
  /*
  div.onclick = function()   {
     if (isOverGallery)   {
        ....
     }
  }
  */

  // listen for scroll on horizontal scroll bar
  /*
  const wrapper = document.querySelector(".vandretGalleriWrapper");
  wrapper.addEventListener('scroll', function(e) {
    console.log("scroll!");
    scrollPos = wrapper.scrollLeft;
  })
  */


}


/////////////////////////////////////////
const handleScroll = (e) => {
  
  console.log("e:", e);
  // scrollPos = galleriElm.scrollLeft; // if I scrolled manually, get the pos here

  // make consistent scroll amount in FF and chrome
  if (e.deltaY < 0) { scrollAmount = -scrollStep; }
  else if (e.deltaY > 0) { scrollAmount = scrollStep; }
  console.log("scrollAmount:", scrollAmount);

  // in firefox deltaY is 3, in chrome its 100
  
  // check if I am over document!
  if (isOverGallery === true) {
    console.log("isOverGallery is true");
    scrollPos += scrollAmount; /* e.deltaY; */
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