import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCardsFormComponent } from './payment-cards-form.component';

describe('PaymentCardsFormComponent', () => {
  let component: PaymentCardsFormComponent;
  let fixture: ComponentFixture<PaymentCardsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PaymentCardsFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentCardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
