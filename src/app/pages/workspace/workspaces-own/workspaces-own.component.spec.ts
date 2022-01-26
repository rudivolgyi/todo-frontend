import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacesOwnComponent } from './workspaces-own.component';

describe('WorkspacesOwnComponent', () => {
  let component: WorkspacesOwnComponent;
  let fixture: ComponentFixture<WorkspacesOwnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacesOwnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacesOwnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
