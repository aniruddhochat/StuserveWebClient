import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthenticatedViewServicesComponent } from './unauthenticated-view-services.component';

describe('UnauthenticatedViewServicesComponent', () => {
  let component: UnauthenticatedViewServicesComponent;
  let fixture: ComponentFixture<UnauthenticatedViewServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnauthenticatedViewServicesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnauthenticatedViewServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
