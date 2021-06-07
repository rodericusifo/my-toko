import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoSheetFormComponent } from './po-sheet-form.component';

describe('PoSheetFormComponent', () => {
  let component: PoSheetFormComponent;
  let fixture: ComponentFixture<PoSheetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoSheetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoSheetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
