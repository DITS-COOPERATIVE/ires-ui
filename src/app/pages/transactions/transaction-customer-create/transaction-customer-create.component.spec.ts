import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionCustomerCreateComponent } from './transaction-customer-create.component';

describe('TransactionCustomerCreateComponent', () => {
  let component: TransactionCustomerCreateComponent;
  let fixture: ComponentFixture<TransactionCustomerCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionCustomerCreateComponent]
    });
    fixture = TestBed.createComponent(TransactionCustomerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
