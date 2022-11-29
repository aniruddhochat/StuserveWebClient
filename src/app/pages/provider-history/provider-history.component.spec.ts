import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHistoryComponent } from './provider-history.component';

describe('ProviderHistoryComponent', () => {
  let component: ProviderHistoryComponent;
  let fixture: ComponentFixture<ProviderHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProviderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
