import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeskEditComponent } from './desk-edit.component';

describe('DeskEditComponent', () => {
  let component: DeskEditComponent;
  let fixture: ComponentFixture<DeskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeskEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
