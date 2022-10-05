import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpConsumerComponent } from './sign-up-consumer.component';

describe('SignUpConsumerComponent', () => {
  let component: SignUpConsumerComponent;
  let fixture: ComponentFixture<SignUpConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpConsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
