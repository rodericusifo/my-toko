import { TestBed } from '@angular/core/testing';

import { AuthGuardRoleService } from './auth-guard-role.service';

describe('AuthGuardRoleService', () => {
  let service: AuthGuardRoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardRoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
