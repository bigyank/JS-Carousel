const slidesWraper = document.getElementById("slides-wraper");

// btn
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const images = slidesWraper.children;
let counter = 1;
const imgWidth = images[0].clientWidth;

const transitionSet = "transform 0.6s ease-in-out";
const transitionUnset = "none";
let slideId;

// first clone
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

// add clones
slidesWraper.append(firstClone);
slidesWraper.prepend(lastClone);

//  reset pic
slidesWraper.style.transform = `translateX(${-imgWidth * 1}px)`;

function moveSlide(transition) {
  slidesWraper.style.transition = transition;
  slidesWraper.style.transform = `translateX(${-imgWidth * counter}px)`;
}

nextBtn.addEventListener("click", () => {
  if (counter >= images.length - 1) return;
  counter++;
  moveSlide(transitionSet);
});

prevBtn.addEventListener("click", () => {
  if (counter <= 0) return;
  counter--;
  moveSlide(transitionSet);
});

slidesWraper.addEventListener("transitionend", () => {
  if (counter === images.length - 1) {
    counter = 1;
    moveSlide(transitionUnset);
  }
  if (counter === 0) {
    counter = images.length - 2;
    moveSlide(transitionUnset);
  }
});

slidesWraper.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

slidesWraper.addEventListener("mouseleave", () => {
  autoSlide();
});

function autoSlide() {
  slideId = setInterval(() => {
    counter++;
    moveSlide(transitionSet);
  }, 2000);
}

autoSlide();
