import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsControlComponent } from './comments-control.component';

describe('CommentsControlComponent', () => {
  let component: CommentsControlComponent;
  let fixture: ComponentFixture<CommentsControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
