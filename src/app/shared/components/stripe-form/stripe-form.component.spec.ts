import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StripeFormComponent } from './stripe-form.component';

describe('StripeFormComponent', () => {
  let component: StripeFormComponent;
  let fixture: ComponentFixture<StripeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StripeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StripeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
