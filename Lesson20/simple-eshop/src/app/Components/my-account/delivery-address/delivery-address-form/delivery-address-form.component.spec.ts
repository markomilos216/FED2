import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryAddressFormComponent } from './delivery-address-form.component';

describe('DeliveryAddressFormComponent', () => {
  let component: DeliveryAddressFormComponent;
  let fixture: ComponentFixture<DeliveryAddressFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeliveryAddressFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeliveryAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
