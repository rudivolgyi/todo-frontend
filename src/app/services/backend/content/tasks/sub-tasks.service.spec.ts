import { TestBed } from '@angular/core/testing';

import { SubTasksService } from './sub-tasks.service';

describe('SubTasksService', () => {
  let service: SubTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
