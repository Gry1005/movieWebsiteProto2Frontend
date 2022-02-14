import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FirstPageComponent } from './components/first-page/first-page.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CardCarouselComponent } from './components/card-carousel/card-carousel.component';
import { MovieContentComponent } from './components/movie-content/movie-content.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { TvContentComponent } from './components/tv-content/tv-content.component';

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    CardCarouselComponent,
    MovieContentComponent,
    MyListComponent,
    SearchBarComponent,
    TvContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    YouTubePlayerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
