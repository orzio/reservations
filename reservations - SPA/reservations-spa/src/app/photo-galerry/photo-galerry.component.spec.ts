import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGalerryComponent } from './photo-galerry.component';

describe('PhotoGalerryComponent', () => {
  let component: PhotoGalerryComponent;
  let fixture: ComponentFixture<PhotoGalerryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoGalerryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGalerryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
