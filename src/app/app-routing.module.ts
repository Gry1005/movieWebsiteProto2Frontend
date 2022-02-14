import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FirstPageComponent } from './components/first-page/first-page.component';
import {MovieContentComponent} from './components/movie-content/movie-content.component';
import { TvContentComponent } from './components/tv-content/tv-content.component';
import {MyListComponent} from './components/my-list/my-list.component'

const routes: Routes = [
  {
    path:'',component: FirstPageComponent
  },
  {
    path:'watch/movie/:id',component: MovieContentComponent
  },
  {
    path:'mylist',component: MyListComponent
  },
  {
    path:'watch/tv/:id',component: TvContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
