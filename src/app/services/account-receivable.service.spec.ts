import { TestBed } from '@angular/core/testing';

import { AccountReceivableService } from './account-receivable.service';

describe('AccountReceivableService', () => {
  let service: AccountReceivableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountReceivableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
