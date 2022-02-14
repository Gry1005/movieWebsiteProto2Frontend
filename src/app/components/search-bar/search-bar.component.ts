import { Component, OnInit,  Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

import {PostsService} from '../../services/posts.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  constructor(private postService:PostsService,private httpClient:HttpClient) { }

  ngOnInit(): void {
    
  }

  handleClick()
  {
    if(this.model)
    {
      this.model = "";
    }
  }

  public model: any;
  searching = false;
  searchFailed = false;

  resList:any = [];

  getXMLHttp(rPath:string)
  {
    let xmlHttp=null;
    if (window.XMLHttpRequest)
    {// code for IE7, Firefox, Opera, etc.
        xmlHttp=new XMLHttpRequest();
    }

    if (xmlHttp!=null)
    {
        xmlHttp.open("GET", rPath, false);
        xmlHttp.send(null);
        let xmlDoc=xmlHttp.responseText;

        var results=JSON.parse(xmlDoc);

    }
    else
    {
        alert("Your browser does not support XMLHTTP.");
    }

    return results;
  }

  getData(endPoint:any,term:any){

    //!!!!
    let urlAdd = "https://winter-sequence-308604.wl.r.appspot.com/api";
    //let urlAdd = "http://localhost:"+"8080"+"/api";

    let url = urlAdd+"/posts"+"/"+endPoint+"?id="+term;
    return this.getXMLHttp(url);
  }

  search: OperatorFunction<string, readonly any[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      map((term) => {
        if(term === '') { return [] }
        else 
        {
          
          /*
          this.postService.getPostsWithId("multiSearch",term).subscribe((res)=>{
            this.resList = res;
          });
          */

          let results:any = this.getData("multiSearch",term);

          this.resList = results;

          /*
          for(let i=0;i<this.resList.length;i++)
          {
            let result={
              name: this.resList[i].title ? this.resList[i].title : this.resList[i].name,
              flag: this.resList[i].backdrop_path
            };

            results.push(result);
          }
          */

          return results.slice(0, 7);
        }
      })
    )

  //formatter = (x: {name: string}) => x.name;
  formatter = (x: {name: string}) => "";

}
