import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedToMeComponent } from './assigned-to-me.component';

describe('AssignedToMeComponent', () => {
  let component: AssignedToMeComponent;
  let fixture: ComponentFixture<AssignedToMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedToMeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedToMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
