import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoSheetComponent } from './po-sheet.component';

describe('PoSheetComponent', () => {
  let component: PoSheetComponent;
  let fixture: ComponentFixture<PoSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
