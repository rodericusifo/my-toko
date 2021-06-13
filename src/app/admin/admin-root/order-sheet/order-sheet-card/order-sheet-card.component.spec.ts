import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSheetCardComponent } from './order-sheet-card.component';

describe('OrderSheetCardComponent', () => {
  let component: OrderSheetCardComponent;
  let fixture: ComponentFixture<OrderSheetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderSheetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSheetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
