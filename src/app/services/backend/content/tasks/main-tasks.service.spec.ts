import { TestBed } from '@angular/core/testing';

import { MainTasksService } from './main-tasks.service';

describe('MainTasksService', () => {
  let service: MainTasksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainTasksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
