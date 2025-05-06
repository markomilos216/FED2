import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAndPaymentComponent } from './shipping-and-payment.component';

describe('ShippingAndPaymentComponent', () => {
  let component: ShippingAndPaymentComponent;
  let fixture: ComponentFixture<ShippingAndPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingAndPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
