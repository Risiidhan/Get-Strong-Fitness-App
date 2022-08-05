import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipsComponent } from './edit-tips.component';

describe('EditTipsComponent', () => {
  let component: EditTipsComponent;
  let fixture: ComponentFixture<EditTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
