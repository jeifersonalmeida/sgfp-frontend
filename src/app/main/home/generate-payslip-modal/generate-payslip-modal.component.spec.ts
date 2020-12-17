import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratePayslipModalComponent } from './generate-payslip-modal.component';

describe('GeneratePayslipModalComponent', () => {
  let component: GeneratePayslipModalComponent;
  let fixture: ComponentFixture<GeneratePayslipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneratePayslipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneratePayslipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
