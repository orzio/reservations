import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoomReservationsComponent } from './manager-room-reservations.component';

describe('ManagerRoomReservationsComponent', () => {
  let component: ManagerRoomReservationsComponent;
  let fixture: ComponentFixture<ManagerRoomReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRoomReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRoomReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
