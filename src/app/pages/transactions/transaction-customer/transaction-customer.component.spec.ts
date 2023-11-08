import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCustomerComponent } from './transaction-customer.component';

describe('TransactionCustomerComponent', () => {
  let component: TransactionCustomerComponent;
  let fixture: ComponentFixture<TransactionCustomerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCustomerComponent]
    });
    fixture = TestBed.createComponent(TransactionCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
