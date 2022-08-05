import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTipsComponent } from './view-tips.component';

describe('ViewTipsComponent', () => {
  let component: ViewTipsComponent;
  let fixture: ComponentFixture<ViewTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
