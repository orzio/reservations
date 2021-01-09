import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoomListReservationsComponent } from './manager-room-list-reservations.component';

describe('ManagerRoomListReservationsComponent', () => {
  let component: ManagerRoomListReservationsComponent;
  let fixture: ComponentFixture<ManagerRoomListReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRoomListReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRoomListReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
