import { TestBed } from '@angular/core/testing';

import { YourcityService } from './yourcity.service';

describe('YourcityService', () => {
  let service: YourcityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourcityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
