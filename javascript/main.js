// container
const carouselContainer = document.getElementById("carousel-container");

// slide wraper
const slidesWraper = document.getElementById("slides-wraper");

// nav
const nav = document.getElementById("nav");
const navIcons = nav.children;

// get next and prev buttons
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

// get all slide images
const images = slidesWraper.children;

// number of slide skip
let counter = 1;
const imgWidth = images[0].clientWidth;

const transitionSet = "transform 0.6s ease-in-out";
const transitionUnset = "none";

let slideId;

// close first and last images
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

// add clones to the slide wraper
slidesWraper.append(firstClone);
slidesWraper.prepend(lastClone);

//  start slide from second image
slidesWraper.style.transform = `translateX(${-imgWidth * 1}px)`;

function moveSlide(transition) {
  slidesWraper.style.transition = transition;
  slidesWraper.style.transform = `translateX(${-imgWidth * counter}px)`;

  //    make nav active
  Array.from(navIcons).map((nav, index) =>
    index + 1 === counter
      ? nav.classList.add("active")
      : nav.classList.remove("active")
  );
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

// when transition at end index move to the first index on background
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

// add click event on bottom nav indicators
Array.from(navIcons).forEach((nav, index) => {
  nav.addEventListener("click", () => {
    counter = index + 1;
    moveSlide(transitionSet);
  });
});

// on mouse over stop auto play
carouselContainer.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

// on mouse exit start autoplay
carouselContainer.addEventListener("mouseleave", () => {
  autoSlide();
});

function autoSlide() {
  slideId = setInterval(() => {
    counter++;
    moveSlide(transitionSet);
  }, 2000);
}

autoSlide();
