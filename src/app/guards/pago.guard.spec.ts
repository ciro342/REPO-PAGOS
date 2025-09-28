import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pagoGuard } from './pago.guard';

describe('pagoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pagoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
