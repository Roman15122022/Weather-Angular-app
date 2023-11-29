import {TestBed} from '@angular/core/testing';

import {YourCityService} from './yourcity.service';

describe('YourcityService', () => {
  let service: YourCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YourCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
