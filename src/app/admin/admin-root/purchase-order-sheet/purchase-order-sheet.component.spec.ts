import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderSheetComponent } from './purchase-order-sheet.component';

describe('PurchaseOrderSheetComponent', () => {
  let component: PurchaseOrderSheetComponent;
  let fixture: ComponentFixture<PurchaseOrderSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseOrderSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseOrderSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
