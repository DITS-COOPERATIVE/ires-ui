import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInternalNoteComponent } from './customer-internal-note.component';

describe('CustomerInternalNoteComponent', () => {
  let component: CustomerInternalNoteComponent;
  let fixture: ComponentFixture<CustomerInternalNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerInternalNoteComponent]
    });
    fixture = TestBed.createComponent(CustomerInternalNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
