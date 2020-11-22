import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCityComponent } from './room-city.component';

describe('RoomCityComponent', () => {
  let component: RoomCityComponent;
  let fixture: ComponentFixture<RoomCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
