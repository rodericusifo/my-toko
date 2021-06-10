import { TestBed } from '@angular/core/testing';

import { DOService } from './do.service';

describe('DOService', () => {
  let service: DOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
