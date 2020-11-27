import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeActionsModalComponent } from './employee-actions-modal.component';

describe('EmployeeActionsModalComponent', () => {
  let component: EmployeeActionsModalComponent;
  let fixture: ComponentFixture<EmployeeActionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeActionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
