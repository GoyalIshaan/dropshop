declare module 'react-slick' {
  import { Component } from 'react';

  export interface Settings {
    dots?: boolean;
    infinite?: boolean;
    speed?: number;
    slidesToShow?: number;
    slidesToScroll?: number;
    autoplay?: boolean;
    autoplaySpeed?: number;
    arrows?: boolean;
    pauseOnHover?: boolean;
    className?: string;
    adaptiveHeight?: boolean;
    centerMode?: boolean;
    focusOnSelect?: boolean;
    lazyLoad?: 'ondemand' | 'progressive';
    rtl?: boolean;
    swipeToSlide?: boolean;
    vertical?: boolean;
    // Add other props as needed
  }

  export default class Slider extends Component<Settings> {}
}
