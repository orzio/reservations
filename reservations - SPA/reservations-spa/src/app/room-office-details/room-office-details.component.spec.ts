import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomOfficeDetailsComponent } from './room-office-details.component';

describe('RoomOfficeDetailsComponent', () => {
  let component: RoomOfficeDetailsComponent;
  let fixture: ComponentFixture<RoomOfficeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomOfficeDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomOfficeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
