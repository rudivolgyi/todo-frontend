import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacesDetailedComponent } from './workspaces-detailed.component';

describe('WorkspacesDetailedComponent', () => {
  let component: WorkspacesDetailedComponent;
  let fixture: ComponentFixture<WorkspacesDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspacesDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspacesDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
