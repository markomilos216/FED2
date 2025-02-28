import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalInfoShippingAndPaymentComponent } from './personal-info-shipping-and-payment.component';

describe('PersonalInfoShippingAndPaymentComponent', () => {
  let component: PersonalInfoShippingAndPaymentComponent;
  let fixture: ComponentFixture<PersonalInfoShippingAndPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PersonalInfoShippingAndPaymentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonalInfoShippingAndPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
