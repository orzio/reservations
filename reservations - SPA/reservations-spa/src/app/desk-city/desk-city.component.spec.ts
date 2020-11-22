import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskCityComponent } from './desk-city.component';

describe('DeskCityComponent', () => {
  let component: DeskCityComponent;
  let fixture: ComponentFixture<DeskCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskCityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
