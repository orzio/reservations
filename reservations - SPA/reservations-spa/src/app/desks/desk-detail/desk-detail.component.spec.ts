import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskDetailComponent } from './desk-detail.component';

describe('DeskDetailComponent', () => {
  let component: DeskDetailComponent;
  let fixture: ComponentFixture<DeskDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
