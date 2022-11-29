import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderPendingComponent } from './provider-pending.component';

describe('ProviderPendingComponent', () => {
  let component: ProviderPendingComponent;
  let fixture: ComponentFixture<ProviderPendingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderPendingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
