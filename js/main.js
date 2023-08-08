//mecollabomandatory;nuOpen
//$('.menuOpen .open').on('click',function(){});
$(".menuOpen .open").click(function (e) {
  e.preventDefault();
  $(".menuOpen .menuclose").addClass("on");
});
$(".menuclose .close").click(function (e) {
  e.preventDefault();
  $(".menuOpen .menuclose").removeClass("on");
});

$(".menuclose ul li").click(function (e) {
  e.preventDefault();
  $(".menuOpen .menuclose").removeClass("on");
});



//스티커
let panoWrap = document.querySelector(".sj_panorama .pano_wrap");
let listWrap = panoWrap.querySelector(".list");
let item = listWrap.children;
console.log(item);
let listClone = null;
let itemWidth = item[0].offsetWidth;
console.log(itemWidth);
let itemLength = item.length; //10媛�
let listWidth = itemWidth * itemLength; //300px x 10 =3000px
let move = 0;
//let controls=document.querySelector('.sj_panorama .controls');
let controls = panoWrap.parentElement.querySelector(".controls");
let timer;

// function init(){}
// var init=function(){}
// var init=()=>{}
let init = function () {
  panoWrap.style.width = listWidth * 2 + "px";
  listWrap.style.width = listWidth + "px";
  panoWrap.appendChild(listWrap.cloneNode(true));
  listClone = panoWrap.children;
  //console.log(listClone)
  render();
  add();
  event();
};
let render = function () {
  move += 3;

  //console.log(Array.from(listClone))
  Array.from(listClone).forEach(function (clone) {
    clone.style.transform = `translateX(${-move}px)`;
  });

  timer = window.requestAnimationFrame(render);
};

let add = function () {
  //setInterval(function(){},10000);
  setInterval(function () {
    panoWrap.appendChild(listWrap.cloneNode(true));
    listClone = panoWrap.children;
  }, 10000);
};
let event = function () {
  controls.querySelector(".play_on").addEventListener("click", function (e) {
    e.preventDefault();
    //console.log(this)
    if (this.classList.contains("active")) {
      this.classList.remove("active");
      window.cancelAnimationFrame(timer);
    } else {
      this.classList.add("active");
      render();
    }
  });
};

window.addEventListener("load", function () {
  init();
});

////gif 화면
let docwidth = window.innerWidth;
let wrap = document.querySelector(".newspaperWrap");
let imgs = document.querySelectorAll(".newspaperWrap .hb");
let slideWidth = wrap.clientWidth;

wrap.addEventListener("mousemove", function (e) {
  let mouseX = e.clientX;
  console.log(mouseX);
  let offset = (mouseX / docwidth) * slideWidth - mouseX / 2;

  for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.transform = `translateX(${-offset}px)`;
  }
});

wrap.addEventListener("mouseleave", function () {
  for (let i = 0; i < imgs.length; i++) {
    imgs[i].style.transform = `translateX(0px)`;
    imgs[i].style.transition = "0.5s";
  }
});


////사진무한
let galleryWrapper = document.querySelectorAll(".hero_gallery_wrapper");

//console.log(galleryWidth)

let scroll = {
  current: [],
  target: [],
  ease: 0.05,
  speed: 0.25,
  limit: [],
};
let Init = () => {
  onResize();
  initAnimation();
};

let onResize = () => {
  galleryWrapper.forEach((wrapper, index) => {
    let galleryWidth = wrapper.getBoundingClientRect().width;
    scroll.limit[index] = galleryWidth - window.innerWidth;
  });
};
let initAnimation = () => {
  galleryWrapper.forEach((wrapper, index) => {
    scroll.current[index] = 0;
    scroll.target[index] = 0;
  });
};

let onScroll = function (e) {
  let speed = e.deltaY;

  galleryWrapper.forEach((wrapper, index) => {
    if (index % 2 == 0) {
      scroll.target[index] += speed * scroll.speed;
    } else {
      scroll.target[index] += speed * scroll.speed;
    }
  });
  return speed;
};
function clamp(max, number) {
  return Math.min(number, max);
}
function lerp(p1, p2, p3) {
  return p1 + (p2 - p1) * p3;
}
let update = () => {
  galleryWrapper.forEach((wrapper, index) => {
    scroll.target[index] = clamp(scroll.limit[index], scroll.target[index]);
    scroll.current[index] = lerp(
      scroll.current[index],
      scroll.target[index],
      scroll.ease
    );
    scroll.current[index] = parseFloat(scroll.current[index].toFixed(2));
    wrapper.style.transform = `translate3d(${-scroll.current[index]}px,0,0)`;
  });
  window.requestAnimationFrame(update);
};
update();
window.addEventListener("resize", onResize);
window.addEventListener("wheel", onScroll);
window.addEventListener("load", () => {
  Init();
});

//아코디언 사진
const items = document.querySelectorAll(".item");

const expand = (item, i) => {
  items.forEach((it, ind) => {
    if (i === ind) return;
    it.clicked = false;
  });
  gsap.to(items, {
    width: item.clicked ? "15vw" : "8vw",
    duration: 2,
    ease: "elastic(1, .6)",
  });

  item.clicked = !item.clicked;
  gsap.to(item, {
    width: item.clicked ? "42vw" : "15vw",
    duration: 2.5,
    ease: "elastic(1, .3)",
  });
};

items.forEach((item, i) => {
  item.clicked = false;
  item.addEventListener("click", () => expand(item, i));
});


//img trail

 let img1 = document.querySelector(".img-1"),
   img2 = document.querySelector(".img-2"),
   img3 = document.querySelector(".img-3"),
   img4 = document.querySelector(".img-4"),
   img5 = document.querySelector(".img-5");

 document.addEventListener("mousemove", function (e) {
   img1.setAttribute(
     "style",
     "top:" + (e.clientY - 200) + "px; left:" + (e.clientX - 100) + "px"
   );
   img2.setAttribute(
     "style",
     "top:" + (e.clientY - 200) + "px; left:" + (e.clientX - 100) + "px"
   );
   img3.setAttribute(
     "style",
     "top:" + (e.clientY - 200) + "px; left:" + (e.clientX - 100) + "px"
   );
   img4.setAttribute(
     "style",
     "top:" + (e.clientY - 200) + "px; left:" + (e.clientX - 100) + "px"
   );
   img5.setAttribute(
     "style",
     "top:" + (e.clientY - 200) + "px; left:" + (e.clientX - 100) + "px"
   );
 });
