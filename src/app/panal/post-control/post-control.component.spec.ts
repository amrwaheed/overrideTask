import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostControlComponent } from './post-control.component';

describe('PostControlComponent', () => {
  let component: PostControlComponent;
  let fixture: ComponentFixture<PostControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
