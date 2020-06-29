import { TestBed, async, inject } from '@angular/core/testing';

import { SetpassGuard } from './setpass.guard';

describe('SetpassGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetpassGuard]
    });
  });

  it('should ...', inject([SetpassGuard], (guard: SetpassGuard) => {
    expect(guard).toBeTruthy();
  }));
});
