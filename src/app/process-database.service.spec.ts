import { TestBed, inject } from '@angular/core/testing';

import { ProcessDatabaseService } from './process-database.service';

describe('ProcessDatabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessDatabaseService]
    });
  });

  it('should be created', inject([ProcessDatabaseService], (service: ProcessDatabaseService) => {
    expect(service).toBeTruthy();
  }));
});
