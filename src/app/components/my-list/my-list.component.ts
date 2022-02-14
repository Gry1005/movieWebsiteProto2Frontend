import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.css']
})
export class MyListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //localStorage.clear();

    let mylist = localStorage.getItem('mylist');
    if(mylist)
    {
      this.myList = JSON.parse(mylist).reverse();
    }

    //console.log(this.myList);

     //mobile
     if (window.screen.width < 500) { // 768px portrait
      this.mobile = true;
    }

  }

  myList:any=[];

  showInd='';

  mobile = false;

}
