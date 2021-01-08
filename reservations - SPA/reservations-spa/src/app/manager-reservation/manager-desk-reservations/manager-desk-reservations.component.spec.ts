import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerDeskReservationsComponent } from './manager-desk-reservations.component';

describe('ManagerDeskReservationsComponent', () => {
  let component: ManagerDeskReservationsComponent;
  let fixture: ComponentFixture<ManagerDeskReservationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManagerDeskReservationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerDeskReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
