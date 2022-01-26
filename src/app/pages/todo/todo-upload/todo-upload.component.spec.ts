import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoUploadComponent } from './todo-upload.component';

describe('TodoUploadComponent', () => {
  let component: TodoUploadComponent;
  let fixture: ComponentFixture<TodoUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
