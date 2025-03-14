import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndSummaryComponent } from './payment-and-summary.component';

describe('PaymentAndSummaryComponent', () => {
  let component: PaymentAndSummaryComponent;
  let fixture: ComponentFixture<PaymentAndSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentAndSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
