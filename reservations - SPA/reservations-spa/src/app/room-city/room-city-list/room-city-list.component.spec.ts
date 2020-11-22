import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomCityListComponent } from './room-city-list.component';

describe('RoomCityListComponent', () => {
  let component: RoomCityListComponent;
  let fixture: ComponentFixture<RoomCityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomCityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
