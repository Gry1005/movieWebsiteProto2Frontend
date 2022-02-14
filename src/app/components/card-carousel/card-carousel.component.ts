import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.css']
})
export class CardCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //mobile
    if (window.screen.width < 500) { // 768px portrait
      this.mobile = true;
    }
  }

  @Input() set value(popularMovies:any[]){

    //console.log(popularMovies.length);

    this.movies = popularMovies;

    let j = -1;
  
    for (let i = 0; i < popularMovies.length; i++) {
        if (i % 6 == 0) {
            j++;
            this.moviesFormatted[j] = [];
            this.moviesFormatted[j].push(popularMovies[i]);
        }
        else {
            this.moviesFormatted[j].push(popularMovies[i]);
        }
    }

  };

  movies:any[] = [];

  moviesFormatted:any[] = [];

  showInd = "";

  mobile = false;

  /*
  images = [62, 83, 466, 965, 982, 1043, 738].map((n) => `https://picsum.photos/id/${n}/200/250`);

  imagesFormatted:any[] = [];
  */

  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;

  @ViewChild('carousel', {static : true}) carousel!: NgbCarousel;

  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }


}
