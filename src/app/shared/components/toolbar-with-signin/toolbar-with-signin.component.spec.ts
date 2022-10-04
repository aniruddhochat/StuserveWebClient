import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarWithSigninComponent } from './toolbar-with-signin.component';

describe('ToolbarWithSigninComponent', () => {
  let component: ToolbarWithSigninComponent;
  let fixture: ComponentFixture<ToolbarWithSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarWithSigninComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarWithSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
