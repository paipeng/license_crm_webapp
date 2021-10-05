import { TestBed } from '@angular/core/testing';

import { IdcardInterceptor } from './idcard.interceptor';

describe('IdcardInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      IdcardInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: IdcardInterceptor = TestBed.inject(IdcardInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
