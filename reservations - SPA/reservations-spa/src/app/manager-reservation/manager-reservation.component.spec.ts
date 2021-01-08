import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerReservationComponent } from './manager-reservation.component';

describe('ManagerReservationComponent', () => {
  let component: ManagerReservationComponent;
  let fixture: ComponentFixture<ManagerReservationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerReservationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
