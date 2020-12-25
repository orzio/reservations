import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCallendarComponent } from './room-callendar.component';

describe('RoomCallendarComponent', () => {
  let component: RoomCallendarComponent;
  let fixture: ComponentFixture<RoomCallendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCallendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCallendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
