import { Component, OnInit, ViewChild,ElementRef, AfterViewInit, Input } from '@angular/core';
import {PostsService} from '../../services/posts.service';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css']
})
export class FirstPageComponent implements OnInit, AfterViewInit {

  constructor(private postService:PostsService) { }

  ngOnInit(): void {

    this.fetchData();

    //continueWatching
    let cList: any = localStorage.getItem('clist');

    if(cList)
    {
      this.continueList = JSON.parse(cList).reverse();
    }

    //mobile
    if (window.screen.width < 500) { // 768px portrait
      this.mobile = true;
    }

  }

  ngAfterViewInit() {
    console.log('我的元素：'+ this.carousel); 
  }

  mobile=false;

  showHint = false;

  currentPlayingMovies:any=[];

  continueList:any = [];

  popularMovies:any=[];

  topMovies:any=[];

  trendingMovies:any=[];

  popularTVs:any=[];

  topTVs:any=[];

  trendingTVs:any=[];

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

  fetchData(){

    this.postService.getAllPosts("currentPlayingMovies").subscribe((res) => {
      this.currentPlayingMovies = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("popularMovies").subscribe((res) => {
      this.popularMovies = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("topMovies").subscribe((res) => {
      this.topMovies = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("trendingMovies").subscribe((res) => {
      this.trendingMovies = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("popularTVs").subscribe((res) => {
      this.popularTVs = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("topTVs").subscribe((res) => {
      this.topTVs = res;
      //console.log(this.currentPlayingMovies);
    });

    this.postService.getAllPosts("trendingTVs").subscribe((res) => {
      this.trendingTVs = res;
      //console.log(this.currentPlayingMovies);
    });
    
  }

}
