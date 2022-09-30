import SwipeCarousel from "./carousel-swipe.js";

const carousel = new SwipeCarousel({
  containerID: '.slider',
  slideID: '.item',
  interval: 2500,
  isPlaying: false
});

carousel.init();