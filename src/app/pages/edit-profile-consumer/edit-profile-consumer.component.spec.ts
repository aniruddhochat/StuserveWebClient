import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileConsumerComponent } from './edit-profile-consumer.component';

describe('EditProfileConsumerComponent', () => {
  let component: EditProfileConsumerComponent;
  let fixture: ComponentFixture<EditProfileConsumerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProfileConsumerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditProfileConsumerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
