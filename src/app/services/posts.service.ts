import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  urlAdd = "https://winter-sequence-308604.wl.r.appspot.com/api";
  //urlAdd = "http://localhost:"+"8080"+"/api";

  constructor(private httpClient:HttpClient) { }

  getAllPosts(endPoint:string){
    let url = this.urlAdd+"/posts"+"/"+endPoint;
    return this.httpClient.get(url);
  }

  getPostsWithId(endPoint:string,id:string){
    let url = this.urlAdd+"/posts"+"/"+endPoint+"?id="+id;
    return this.httpClient.get(url);
  }
}
