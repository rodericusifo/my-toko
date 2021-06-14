import { TestBed } from '@angular/core/testing';

import { EStatementService } from './e-statement.service';

describe('EStatementService', () => {
  let service: EStatementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EStatementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
