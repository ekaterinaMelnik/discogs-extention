export class Animate {
    constructor(selector) {
      this.timer = null;
      this.interval = null;
      this.selector = selector;
      this.nextFrame = undefined;
      this.activeAnimation = -1;
  
      this.keyframes = [{
          name: 'vinyl-rotate-start',
          duration: 1000
        },
        {
          name: 'vinyl-rotate-continue',
          interval: 500
        },
        {
          name: 'vinyl-rotate-end',
          duration: 2000
        },
      ];
    }
  
    get element() {
      return document.querySelector(this.selector);
    }
  
    next() {
      const currentKeyframe = this.keyframes[this.activeAnimation];
      const nextKeyframe = this.keyframes[this.activeAnimation + 1];
  
      requestAnimationFrame(() => {
        if (nextKeyframe) {
          const {
            name,
            duration,
            interval
          } = nextKeyframe;
          if (duration) {
            this.timer = setTimeout(() => this.next(), duration);
          }
          this.element.classList.add(name);
          this.activeAnimation = this.activeAnimation + 1;
        } else {
          this.timer = setTimeout(() => this.stop(), currentKeyframe.duration);
        }
      });
  
      return nextKeyframe;
    }
  
    stop() {
      this.element.classList.remove(
        ...this.keyframes.map(
          ({
            name
          }) => name)
      );
      clearTimeout(this.timer);
      this.activeAnimation = -1;
      this.timer = null;
    }
  
    start() {
      if (this.timer) {
        this.stop();
      }
      this.next();
    }
  }
  