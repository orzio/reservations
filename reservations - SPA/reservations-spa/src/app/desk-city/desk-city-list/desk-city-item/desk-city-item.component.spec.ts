import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskCityItemComponent } from './desk-city-item.component';

describe('DeskCityItemComponent', () => {
  let component: DeskCityItemComponent;
  let fixture: ComponentFixture<DeskCityItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskCityItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskCityItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
