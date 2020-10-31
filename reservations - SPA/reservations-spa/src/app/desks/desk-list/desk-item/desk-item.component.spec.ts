import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskItemComponent } from './desk-item.component';

describe('DeskItemComponent', () => {
  let component: DeskItemComponent;
  let fixture: ComponentFixture<DeskItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
