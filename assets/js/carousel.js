function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorsContainer = this.container.querySelector('#indicators-container');
  this.indicators = this.indicatorsContainer.querySelectorAll('.indicator ');
}

Carousel.prototype = {
  _initProps() {
    this.interval = 2000
    this.SLIDES_COUNT = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft'
    this.CODE_RIGHT_ARROW = 'ArrowRight'
    this.CODE_SPACE = 'Space'

    this.currentSlide = 0;
  },

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = '<span class="control control-pause" id="pause">Pause</span>';
    const PREV = '<span class="control control-prev" id="prev">Previous</span>';
    const NEXT = '<span class="control control-next" id="next">Next</span>';

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);

    this.pauseBtn = this.container.querySelector('#pause');
    this.prevBtn = this.container.querySelector('#prev');
    this.nextBtn = this.container.querySelector('#next');
  },

  _initListeners() {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this._prev.bind(this));
    this.nextBtn.addEventListener('click', this._next.bind(this));
    this.indicatorsContainer.addEventListener('click', this._indicate.bind(this));
    document.addEventListener('keydown', this._pressKey.bind(this));
  },

  _gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _gotoPrev() {
    this._gotoNth(this.currentSlide - 1);
  },

  _gotoNext() {
    this._gotoNth(this.currentSlide + 1);
  },

  _pause() {
    this.isPlaying = false;
    clearInterval(this.timerID);
    this.pauseBtn.innerHTML = 'Play';
  },

  _play() {
    this.isPlaying = true;
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this.pauseBtn.innerHTML = 'Pause';
  },

  _prev() {
    this._gotoPrev();
    this._pause();
  },

  _next() {
    this._gotoNext();
    this._pause();
  },

  _indicate(e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      const dataSlide = +target.getAttribute('data-slide-to');

      if (isNaN(dataSlide)) return;
      this._gotoNth(dataSlide);
    }

  },

  _pressKey(e) {
    console.log(e);
    if (e.code == this.CODE_LEFT_ARROW) this._prev()
    if (e.code == this.CODE_RIGHT_ARROW) this._next()
    if (e.code == this.CODE_SPACE) this.pausePlay()
  },

  pausePlay() {
    if (this.isPlaying) this._pause();
    else this._play();
  },

  init() {
    this._initProps();
    this._initControls();
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
    this._initListeners();
  },
};

Carousel.prototype.constructor = Carousel;