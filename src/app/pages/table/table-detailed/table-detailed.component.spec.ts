import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetailedComponent } from './table-detailed.component';

describe('TableDetailedComponent', () => {
  let component: TableDetailedComponent;
  let fixture: ComponentFixture<TableDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDetailedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
