import { TestBed } from '@angular/core/testing';

import { UOMService } from './uom.service';

describe('UOMService', () => {
  let service: UOMService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UOMService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
