import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoOwnsComponent } from './todo-owns.component';

describe('TodoOwnsComponent', () => {
  let component: TodoOwnsComponent;
  let fixture: ComponentFixture<TodoOwnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoOwnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoOwnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
