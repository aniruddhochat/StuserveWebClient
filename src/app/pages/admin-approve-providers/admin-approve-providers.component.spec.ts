import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApproveProvidersComponent } from './admin-approve-providers.component';

describe('AdminApproveProvidersComponent', () => {
  let component: AdminApproveProvidersComponent;
  let fixture: ComponentFixture<AdminApproveProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminApproveProvidersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminApproveProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
