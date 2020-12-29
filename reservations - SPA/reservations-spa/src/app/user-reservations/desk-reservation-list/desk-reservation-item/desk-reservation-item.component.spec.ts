import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskReservationItemComponent } from './desk-reservation-item.component';

describe('DeskReservationItemComponent', () => {
  let component: DeskReservationItemComponent;
  let fixture: ComponentFixture<DeskReservationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskReservationItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskReservationItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
