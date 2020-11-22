import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskCityListComponent } from './desk-city-list.component';

describe('DeskCityListComponent', () => {
  let component: DeskCityListComponent;
  let fixture: ComponentFixture<DeskCityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskCityListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskCityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
