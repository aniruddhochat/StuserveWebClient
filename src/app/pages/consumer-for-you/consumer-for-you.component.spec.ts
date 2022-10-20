import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerForYouComponent } from './consumer-for-you.component';

describe('ConsumerForYouComponent', () => {
  let component: ConsumerForYouComponent;
  let fixture: ComponentFixture<ConsumerForYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsumerForYouComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsumerForYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
