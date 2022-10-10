import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpTypeSelectComponent } from './sign-up-type-select.component';

describe('SignUpTypeSelectComponent', () => {
  let component: SignUpTypeSelectComponent;
  let fixture: ComponentFixture<SignUpTypeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpTypeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpTypeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
