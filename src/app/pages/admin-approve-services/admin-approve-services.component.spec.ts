import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveServicesComponent } from './admin-approve-services.component';

describe('AdminApproveServicesComponent', () => {
  let component: AdminApproveServicesComponent;
  let fixture: ComponentFixture<AdminApproveServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
