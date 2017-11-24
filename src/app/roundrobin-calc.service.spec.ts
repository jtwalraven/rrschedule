import { TestBed, inject } from '@angular/core/testing';

import { RoundrobinCalcService } from './roundrobin-calc.service';

describe('RoundrobinCalcService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoundrobinCalcService]
    });
  });

  it('should be created', inject([RoundrobinCalcService], (service: RoundrobinCalcService) => {
    expect(service).toBeTruthy();
  }));
});
