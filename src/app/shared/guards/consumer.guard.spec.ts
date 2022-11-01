import { TestBed } from '@angular/core/testing';

import { ConsumerGuard } from './consumer.guard';

describe('ConsumerGuard', () => {
  let guard: ConsumerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConsumerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
