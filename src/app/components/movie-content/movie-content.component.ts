import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import {PostsService} from '../../services/posts.service';

@Component({
  selector: 'app-movie-content',
  templateUrl: './movie-content.component.html',
  styleUrls: ['./movie-content.component.css'],
  encapsulation: ViewEncapsulation.None,
  styles: [`
    .dark-modal .modal-content {
      background-color: #292b2c;
      color: white;
    }
    .dark-modal .close {
      color: white;
    }
    .light-blue-backdrop {
      background-color: #5cb3fd;
    }
  `]
})
export class MovieContentComponent implements OnInit {

  constructor(public route:ActivatedRoute, private postService:PostsService, private modalService: NgbModal) { }

  openVerticallyCentered(content:any, id:string) {

    //console.log('id:',id);

    this.postService.getPostsWithId("castDetail",id).subscribe((res)=>{
      this.castDetail = res;

      //console.log(this.castDetail);

      if(this.castDetail.gender==1)
      {
        this.castDetail.genderName="Female";
      }
      else if(this.castDetail.gender==2)
      {
        this.castDetail.genderName="Male";
      }
      else{
        this.castDetail.genderName="Not specified";
      }

      this.castDetail.alsoKnown="";

      for(let i=0;i<this.castDetail.also_known_as.length;i++)
      {
        if(i<this.castDetail.also_known_as.length-1)
        {
          this.castDetail.alsoKnown+=this.castDetail.also_known_as[i]+",";
        }
        else{
          this.castDetail.alsoKnown+=this.castDetail.also_known_as[i];
        }
        
      }

    });

    this.postService.getPostsWithId("castExternal",id).subscribe((res)=>{
      this.castEx = res;

      //console.log(this.castEx);
    });

    this.modalService.open(content, { centered: true, size:'lg' });
  }

  closeResult:string | undefined;

  inWatchList=false;

  private _success = new Subject<string>();
  private _remove = new Subject<string>();


  successMessage = '';
  removeMessage = '';

  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;
  @ViewChild('removeAlert', {static: false}) removeAlert!: NgbAlert;

  //Add to watchlist
  public changeSuccessMessage() 
  { 
    //Storage

    let mylist: any = localStorage.getItem('mylist');

    if(mylist)
    {
      let myArray = JSON.parse(mylist);
      myArray.push(this.movieDetail);
      localStorage.setItem('mylist',JSON.stringify(myArray));
    }
    else
    {
      let myArray = [];
      myArray.push(this.movieDetail);
      localStorage.setItem('mylist',JSON.stringify(myArray));
    }

    this.inWatchList = true;

    this.removeMessage='';

    this._success.next('Added to watchlist.'); 
  }

  //remove from watchlist
  public changeRemoveMessage()
  {
    //Storage
    let mylist: any = localStorage.getItem('mylist');

    if(mylist)
    {
      let myArray = JSON.parse(mylist);
      
      let index = -1;

      for(let i=0;i<myArray.length;i++)
      {
        if(myArray[i].id==this.id)
        {
          index = i;
          break;
        }
      }

      if(index!=-1)
      {
        myArray.splice(index,1);
      }

      localStorage.setItem('mylist',JSON.stringify(myArray));
    }

    this.inWatchList = false;

    this.successMessage = '';

    this._remove.next('Removed from watchlist.')
  }

  mobile = false;
  
  id:string = "";

  videoList:any=[];

  videoKey:string="";

  movieDetail:any={};

  hours = 0;

  minutes = 0;

  genres:any="";

  languages:any="";

  cast:any=[];

  reviews:any=[];

  castDetail:any={};

  castEx:any={};

  movieRec:any=[];

  movieSimi:any=[];

  twitterMsg="";

  faceBookMsg="";

  ngOnInit(): void {

    this.route.params.subscribe((data:any)=>{

      //console.log(data);

      if(this.id)
      {
        if(this.id!=data.id)
        {
          this.id=data.id;
          window.location.reload();
        }
        else
        {
          this.id=data.id;
        }
      }
      else
      {
        this.id=data.id;
      }
      

    })

    this.fetchData();

    //watchlist

    let mylist: any = localStorage.getItem('mylist');

    if(mylist)
    {
      let myArray = JSON.parse(mylist);

      let index = -1;

      for(let i=0;i<myArray.length;i++)
      {
        if(myArray[i].id==this.id)
        {
          index = i;
          break;
        }
      }

      if(index!=-1)
      {
        this.inWatchList = true;
        
        let mDetail = myArray[index];
        myArray.splice(index,1);
        myArray.push(mDetail);
        
        localStorage.setItem('mylist',JSON.stringify(myArray));
      }
      else
      {
        this.inWatchList = false;
      }

    }
    else
    {
      this.inWatchList = false;
    }

    //youtube player
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);

    //alert
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });

    this._remove.subscribe(message => this.removeMessage = message);
    this._remove.pipe(debounceTime(5000)).subscribe(() => {
      if (this.removeAlert) {
        this.removeAlert.close();
      }
    });

    //mobile
    if (window.screen.width < 500) { // 768px portrait
      this.mobile = true;
    }

  }

  twitterSend(){
    this.twitterMsg=
    "Watch "+this.movieDetail.title+"%20"+
    "&url=https://www.youtube.com/watch?v="+this.videoKey+
    "&hashtags=USC,CSCI571,FightOn";
  }

  faceBookSend(){
    this.faceBookMsg="https://www.facebook.com/sharer/sharer.php?u="+
    "https://www.youtube.com/watch?v="+this.videoKey+"%2F&amp;"+
    "src=sdkpreparse";
  }

  fetchData(){

    this.postService.getPostsWithId("movieDetail",this.id).subscribe((res) => {

      //console.log(res);

      this.movieDetail = res;

      this.hours = Math.floor(this.movieDetail.runtime / 60);
      this.minutes = this.movieDetail.runtime - this.hours*60;

      //genres

      for(let i=0;i<this.movieDetail.genres.length;i++)
      {
        if(i<this.movieDetail.genres.length-1)
        {
          this.genres+=this.movieDetail.genres[i].name+", ";
        }
        else
        {
          this.genres+=this.movieDetail.genres[i].name;
        }
      }

      //languages

      for(let i=0;i<this.movieDetail.spoken_languages.length;i++)
      {
        if(i<this.movieDetail.spoken_languages.length-1)
        {
          this.languages+=this.movieDetail.spoken_languages[i].english_name+", ";
        }
        else
        {
          this.languages+=this.movieDetail.spoken_languages[i].english_name;
        }
      }

      //localStorage

      let cList: any = localStorage.getItem('clist');

      if(cList)
      {
        let cArray = JSON.parse(cList);

        let index = -1;

        for(let i=0;i<cArray.length;i++)
        {
          if(cArray[i].id==this.id)
          {
            index = i;
            break;
          }
        }

        if(index!=-1)
        {
          cArray.splice(index,1);
          cArray.push(this.movieDetail);
        }
        else
        {
          if(cArray.length>=24)
          {
            cArray.splice(0,1);
          }
          cArray.push(this.movieDetail);
        }

        localStorage.setItem('clist',JSON.stringify(cArray));
      }
      else
      {
        let cArray = [];
        cArray.push(this.movieDetail);
        localStorage.setItem('clist',JSON.stringify(cArray));
      }
     
    });

    this.postService.getPostsWithId("movieVideo",this.id).subscribe((res)=>{
        
        this.videoList = res;

        //console.log(this.videoList);

        for(let i=0;i<this.videoList.length;i++)
        {
          if(this.videoList[i].site=="YouTube" && this.videoList[i].type == "Trailer")
          {
            this.videoKey = this.videoList[i].key;
            break;
          }
        }

        if(this.videoKey=="")
        {
          for(let i=0;i<this.videoList.length;i++)
          {
            if(this.videoList[i].site=="YouTube" && this.videoList[i].type == "Teaser")
            {
              this.videoKey = this.videoList[i].key;
              break;
            }
          }
        }

        if(this.videoKey=="")
        {
          this.videoKey = "tzkWB85ULJY";
        }
    });

    this.postService.getPostsWithId("movieCast",this.id).subscribe((res)=>{
        this.cast = res;

        //console.log(res);
    });

    this.postService.getPostsWithId("movieReviews",this.id).subscribe((res)=>{
      this.reviews = res;

      for(let i=0;i<this.reviews.length;i++)
      {
        if(this.reviews[i].author_details.avatar_path)
        {
          if(this.reviews[i].author_details.avatar_path.indexOf("http")==-1)
          {
            this.reviews[i].author_details.avatar_path = 'https://image.tmdb.org/t/p/original'+this.reviews[i].author_details.avatar_path;
          }
          else{
            this.reviews[i].author_details.avatar_path = this.reviews[i].author_details.avatar_path.substr(1);
          }
        }
        else
        {
          this.reviews[i].author_details.avatar_path="../../assets/images/avatar.jpg";
        } 

        if(!this.reviews[i].author_details.rating)
        {
          this.reviews[i].author_details.rating = 0;
        }

        this.reviews[i].created_at = new Date(this.reviews[i].created_at);

      }

    
    });

    this.postService.getPostsWithId("movieRec",this.id).subscribe((res)=>{
      this.movieRec = res;

      //console.log(res);
    });

    this.postService.getPostsWithId("movieSimilar",this.id).subscribe((res)=>{
      this.movieSimi = res;

      //console.log(res);
    });

  }

}
