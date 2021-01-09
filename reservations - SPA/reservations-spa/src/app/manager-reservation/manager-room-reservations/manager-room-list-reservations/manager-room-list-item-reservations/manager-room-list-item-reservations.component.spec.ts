import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerRoomListItemReservationsComponent } from './manager-room-list-item-reservations.component';

describe('ManagerRoomListItemReservationsComponent', () => {
  let component: ManagerRoomListItemReservationsComponent;
  let fixture: ComponentFixture<ManagerRoomListItemReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerRoomListItemReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerRoomListItemReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
