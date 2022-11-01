import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerViewAllComponent } from './consumer-view-all.component';

describe('MainViewComponent', () => {
  let component: ConsumerViewAllComponent;
  let fixture: ComponentFixture<ConsumerViewAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerViewAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerViewAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
