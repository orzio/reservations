import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCityItemComponent } from './room-city-item.component';

describe('RoomCityItemComponent', () => {
  let component: RoomCityItemComponent;
  let fixture: ComponentFixture<RoomCityItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCityItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
