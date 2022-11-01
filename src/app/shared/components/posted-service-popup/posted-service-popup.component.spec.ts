import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostedServicePopupComponent } from './posted-service-popup.component';

describe('PostedServicePopupComponent', () => {
  let component: PostedServicePopupComponent;
  let fixture: ComponentFixture<PostedServicePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostedServicePopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostedServicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
