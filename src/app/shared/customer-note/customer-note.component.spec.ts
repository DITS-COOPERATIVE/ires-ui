import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNoteComponent } from './customer-note.component';

describe('CustomerNoteComponent', () => {
  let component: CustomerNoteComponent;
  let fixture: ComponentFixture<CustomerNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomerNoteComponent]
    });
    fixture = TestBed.createComponent(CustomerNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
