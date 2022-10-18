import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarWithProfileComponent } from './toolbar-with-profile.component';

describe('ToolbarWithProfileComponent', () => {
  let component: ToolbarWithProfileComponent;
  let fixture: ComponentFixture<ToolbarWithProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarWithProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarWithProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
