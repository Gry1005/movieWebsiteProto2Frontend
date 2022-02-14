import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieContentComponent } from './movie-content.component';

describe('MovieContentComponent', () => {
  let component: MovieContentComponent;
  let fixture: ComponentFixture<MovieContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
